<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加章节组卷"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <el-button @click="addmulti()" type="primary"> 批量添加 </el-button>
      </div>
      <div class="d-flex">
        <div>
          <el-select
            class="w-150px"
            placeholder="分类"
            v-model="filter.category_id"
          >
            <el-option
              v-for="(item, index) in filterData.categories"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-select class="w-150px" placeholder="类型" v-model="filter.type">
            <el-option
              v-for="(item, index) in filterData.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-select class="w-150px" placeholder="难度" v-model="filter.level">
            <el-option
              v-for="(item, index) in filterData.levels"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left mb-30 check-num">
      已选择{{ spids.qids.length }}项
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="results"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="category.name" label="分类" width="300">
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="150">
          </el-table-column>
          <el-table-column prop="level_text" label="难度" width="150">
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <question-render :question="scope.row"></question-render>
            </template>
            <!-- <template slot-scope="scope">
              <div
                v-html="
                  scope.row.content.length > 130
                    ? scope.row.content.slice(0, 130) + '...'
                    : scope.row.content
                "
              ></div>
            </template> -->
          </el-table-column>
        </el-table>
      </div>
      <div class="float-left mt-30 text-center">
        <el-pagination
          @size-change="paginationSizeChange"
          @current-change="paginationPageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="confirmDialog"
      width="500px"
      @close="confirmDialog = false"
    >
      <div class="pt-20 pb-10 text-center">
        <span>确认添加选中试题？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false">取消</el-button>
        <el-button @click="confirm()" :loading="loading" type="primary"
          >确认添加</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QuestionRender from "@/components/question-render";
export default {
  components: {
    QuestionRender,
  },
  data() {
    return {
      pagination: {
        page: 1,
        size: 20,
        id: this.$route.query.id,
      },
      filter: {
        category_id: null,
        tyoe: null,
        level: null,
      },
      loading: false,
      results: [],
      total: 0,
      spids: {
        id: this.$route.query.id,
        qids: [],
      },
      filterData: {
        categories: [],
        levels: [],
        types: [],
      },
      confirmDialog: false,
    };
  },

  mounted() {
    this.getResults();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.level = null;
      this.filter.category_id = null;
      this.filter.type = null;
      this.getResults();
    },
    paginationSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.size = size;
      this.getResults();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getResults();
    },
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.qids = newbox;
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Practice.Chapter.Question.Create(
        this.pagination.id,
        params
      ).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.types = res.data.types;
        this.filterData.categories = res.data.categories;
        this.filterData.levels = res.data.levels;
      });
    },
    addmulti() {
      if (this.spids.qids.length === 0) {
        this.$message.error("请选择需要操作的数据");
        return;
      }
      this.confirmDialog = true;
    },
    confirm() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      this.$api.Exam.Practice.Chapter.Question.StoreMulti(
        this.pagination.id,
        this.spids
      )
        .then((res) => {
          this.loading = false;
          this.$message.success(res.message);
          this.confirmDialog = false;
          this.getResults();
        })
        .catch((e) => {
          this.loading = false;
          this.confirmDialog = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
