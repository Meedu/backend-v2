<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="新建试题"
          p="addons.Paper.question.store"
          @click="
            $router.push({
              name: 'ExamQuestionCreate',
            })
          "
          type="primary"
        >
        </p-button>
        <p-button
          text="试题分类"
          p="addons.Paper.question_category.list"
          @click="$router.push({ name: 'ExamQuestionCategories' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="试题批量导入"
          p="addons.Paper.question.import.csv"
          @click="
            $router.push({
              name: 'ExamQuestionImport',
            })
          "
          type="primary"
        >
        </p-button>
        <p-button
          text="批量删除"
          p="addons.Paper.question.delete"
          @click="destorymulti()"
          type="danger"
        >
        </p-button>
        <!--<option-bar text="试题库配置" value="考试练习"></option-bar>-->
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
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
        <div class="drawerMore d-flex ml-10" @click="drawer = true">
          <template v-if="showStatus">
            <img src="../../../assets/img/icon-filter-h.png" />
            <span class="act">已选</span>
          </template>
          <template v-else>
            <img src="../../../assets/img/icon-filter.png" />
            <span>更多</span>
          </template>
        </div>
      </div>
    </div>
    <div class="float-left mb-30 check-num">已选择{{ spids.ids.length }}项</div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="category.name" label="分类" width="200">
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="100">
          </el-table-column>
          <el-table-column prop="level_text" label="难度" width="100">
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <question-render :question="scope.row"></question-render>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                p="addons.Paper.question.update"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'ExamQuestionUpdate',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
            </template>
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
    <el-drawer :size="260" :visible.sync="drawer" :with-header="false">
      <div class="n-padding-box">
        <div class="tit flex">更多筛选</div>
        <div class="j-flex">
          <el-select
            class="w-200px"
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
        <div class="j-flex mt-20">
          <el-select class="w-200px" placeholder="类型" v-model="filter.type">
            <el-option
              v-for="(item, index) in filterData.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="j-flex mt-20">
          <el-select class="w-200px" placeholder="难度" v-model="filter.level">
            <el-option
              v-for="(item, index) in filterData.levels"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="j-b-flex mt-30">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog
      :visible.sync="confirmDialog"
      width="500px"
      @close="confirmDialog = false"
    >
      <div class="pt-20 pb-10 text-center">
        <span>确认删除选中试题？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false">取消</el-button>
        <el-button @click="confirm()" :loading="loading" type="primary"
          >确认删除</el-button
        >
      </span>
    </el-dialog>
    <el-dialog :visible.sync="visible" width="500px" @close="visible = false">
      <div class="pt-20 pb-10 text-center">
        <span>{{ successTotal }}道试题删除成功，</span>
        <span class="c-red">{{ failureTotal }}道试题删除失败(已成卷) </span>
      </div>
      <div class="pb-10 text-center">
        <span>已成卷试题请先在关联试卷/模拟试卷/练习中删除该试题！</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="showPaperDetail()" type="primary"
          >成卷详情</el-button
        >
      </span>
    </el-dialog>
    <paperDetail-dialog
      v-if="showDialog"
      :results="failureResult"
      @close="showDialog = false"
    ></paperDetail-dialog>
  </div>
</template>

<script>
import QuestionRender from "@/components/question-render";
import PaperDetailDialog from "./components/paperDetail-dialog";

export default {
  components: {
    QuestionRender,
    PaperDetailDialog,
  },
  data() {
    return {
      pageName: "question-list",
      pagination: {
        page: 1,
        size: 20,
      },
      filter: {
        category_id: null,
        type: null,
        level: null,
      },
      total: 0,
      loading: false,
      results: [],
      spids: {
        ids: [],
      },
      filterData: {
        categories: [],
        levels: [],
        types: [],
      },
      drawer: false,
      failureResult: null,
      visible: false,
      confirmDialog: false,
      failureTotal: 0,
      successTotal: 0,
      showDialog: false,
    };
  },
  computed: {
    showStatus() {
      if (this.filter.level || this.filter.category_id || this.filter.type) {
        return true;
      }
      return false;
    },
  },
  activated() {
    this.getResults();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    firstPageLoad() {
      this.pagination.page = 1;
      this.getResults();
      this.drawer = false;
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.level = null;
      this.filter.category_id = null;
      this.filter.type = null;
      this.getResults();
      this.drawer = false;
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
      this.spids.ids = newbox;
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Exam.Question.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data.data;
        this.total = res.data.data.total;
        this.filterData.types = res.data.types;
        this.filterData.categories = res.data.categories;
        this.filterData.levels = res.data.levels;
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Exam.Question.DestoryMulti(this.spids)
        .then((res) => {
          this.confirmDialog = false;
          if (res.data.failure.total > 0) {
            this.successTotal = res.data.success.total;
            this.failureTotal = res.data.failure.total;
            this.loading = false;
            this.failureResult = res.data.failure.data;
            this.visible = true;
            this.getResults();
          } else {
            this.loading = false;
            this.failureResult = null;
            this.$message.success(this.$t("common.success"));
            this.getResults();
          }
        })
        .catch((e) => {
          this.confirmDialog = false;
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    destorymulti() {
      if (this.spids.ids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }
      this.confirmDialog = true;
    },
    showPaperDetail() {
      this.visible = false;
      this.showDialog = true;
    },
  },
};
</script>
