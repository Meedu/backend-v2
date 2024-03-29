<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="新建学习路径"
          p="addons.learnPaths.path.store"
          @click="$router.push({ name: 'LearningPathCreate' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="学习路径分类"
          p="addons.learnPaths.category.list"
          @click="$router.push({ name: 'LearningPathCategories' })"
          type="primary"
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.keywords"
            placeholder="课程关键字"
          ></el-input>
        </div>
        <div class="ml-10">
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
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" min-width="6%">
          </el-table-column>
          <el-table-column label="学习路径" min-width="22%">
            <template slot-scope="scope">
              <thumb-bar
                :value="scope.row.thumb"
                :width="120"
                :height="90"
                :title="scope.row.name"
              ></thumb-bar>
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="category.name" min-width="8%">
          </el-table-column>
          <el-table-column label="价格" min-width="12%">
            <template slot-scope="scope">
              <div>现价：{{ scope.row.charge }}元</div>
              <div style="color: #666" class="original-charge">
                原价：{{ scope.row.original_charge }}元
              </div>
            </template>
          </el-table-column>
          <el-table-column label="包含步骤" min-width="8%">
            <template slot-scope="scope">
              <span>{{ scope.row.steps_count }}个步骤</span>
            </template>
          </el-table-column>
          <el-table-column label="包含课程" min-width="8%">
            <template slot-scope="scope">
              <span>{{ scope.row.courses_count }}个课程</span>
            </template>
          </el-table-column>
          <el-table-column label="上架时间" min-width="14%">
            <template slot-scope="scope">
              {{ scope.row.published_at | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="是否显示" min-width="8%">
            <template slot-scope="scope">
              <span class="c-green" v-if="scope.row.is_show === 1">· 显示</span>
              <span class="c-red" v-else>· 隐藏</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="14%"
            align="right"
          >
            <template slot-scope="scope">
              <p-link
                text="步骤"
                p="addons.learnPaths.step.list"
                type="primary"
                @click="
                  $router.push({
                    name: 'LearningStep',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="学员"
                p="addons.learnPaths.path.users"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LearningUser',
                    query: { id: scope.row.id },
                  })
                "
              ></p-link>
              <el-dropdown>
                <el-link type="primary" class="el-dropdown-link ml-5">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
                <el-dropdown-menu slot="dropdown">
                  <p-dropdown-item
                    text="编辑"
                    p="addons.learnPaths.path.update"
                    type="primary"
                    @click="
                      $router.push({
                        name: 'LearningPathUpdate',
                        query: { id: scope.row.id },
                      })
                    "
                  >
                  </p-dropdown-item>
                  <p-dropdown-item
                    text="删除"
                    p="addons.learnPaths.path.delete"
                    type="danger"
                    @click="destory(scope.row.id)"
                  >
                  </p-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "learnpath-list",
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      loading: false,
      filter: {
        category_id: null,
        keywords: null,
      },
      results: [],
      filterData: {
        categories: [],
      },
    };
  },
  activated() {
    this.params();
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
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.category_id = null;
      this.filter.keywords = null;
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
    params() {
      this.$api.Course.LearnPath.Path.Category.Create().then((res) => {
        let categories = res.data;
        let box = [];
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].children.length > 0) {
            box.push(categories[i]);
            let children = categories[i].children;
            for (let j = 0; j < children.length; j++) {
              children[j].name = "|----" + children[j].name;
              box.push(children[j]);
            }
          } else {
            box.push(categories[i]);
          }
        }
        this.filterData.categories = box;
      });
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Course.LearnPath.Path.List(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
        this.total = res.data.total;
      });
    },
    destory(item) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.$api.Course.LearnPath.Path.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>

<style lang="less" scoped>
.original-charge {
  text-decoration: line-through;
}
</style>
