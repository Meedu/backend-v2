<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="学习步骤"></back-bar>

    <div class="float-left mb-30">
      <p-button
        text="添加步骤"
        p="addons.learnPaths.step.store"
        @click="
          $router.push({
            name: 'LearningStepCreate',
            query: { path_id: id },
          })
        "
        type="primary"
      >
      </p-button>
    </div>

    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="list"
        class="float-left"
      >
        <el-table-column prop="sort" sortable label="排序" min-width="7%">
        </el-table-column>
        <el-table-column prop="name" label="学习步骤" min-width="15%">
        </el-table-column>
        <el-table-column label="课程数" min-width="11%">
          <template slot-scope="scope">
            <span>{{ scope.row.courses_count }}课程</span>
          </template>
        </el-table-column>
        <el-table-column label="步骤简介" min-width="57%">
          <template slot-scope="scope">
            <div v-html="scope.row.desc"></div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="10%"
          align="right"
        >
          <template slot-scope="scope">
            <!--<p-link
              text="课程"
              p="addons.learnPaths.relation.list"
              type="primary"
              @click="
                $router.push({
                  name: 'Steprelation',
                  query: { id: scope.row.id },
                })
              "
            ></p-link>-->
            <p-link
              text="编辑"
              p="addons.learnPaths.step.update"
              type="primary"
              @click="
                $router.push({
                  name: 'LearningStepUpdate',
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
                  text="删除"
                  p="addons.learnPaths.step.delete"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "learnstep-list",
      id: this.$route.query.id,
      total: 0,
      loading: false,
      list: [],
    };
  },
  activated() {
    this.getData();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      // this.filter.path_id = "";
      this.getData();
    },
    paginationSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.size = size;
      this.getData();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.id = this.$route.query.id;
      let params = { path_id: this.id };
      this.$api.Course.LearnPath.NewStep.List(params).then((res) => {
        this.loading = false;
        this.list = res.data;
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
          this.$api.Course.LearnPath.NewStep.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getData();
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
