<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="新建直播课"
          @click="createLive()"
          type="primary"
          p="addons.Zhibo.course.store"
        >
        </p-button>
        <p-button
          text="直播课分类"
          @click="$router.push({ name: 'LiveCourseCategory' })"
          type="primary"
          p="addons.Zhibo.course_category.list"
        >
        </p-button>
        <p-button
          text="讲师管理"
          @click="$router.push({ name: 'LiveTeacher' })"
          type="primary"
          p="addons.Zhibo.teacher.list"
        >
        </p-button>
        <p-button
          text="课程评论"
          @click="$router.push({ name: 'LiveCourseComment' })"
          type="primary"
          p="addons.Zhibo.course_comment"
        >
        </p-button>
        <option-bar
          text="直播服务配置"
          value="SystemLiveConfig"
          :query="{ referer: this.$route.path }"
        ></option-bar>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
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
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="list"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
          class="float-left"
        >
          <el-table-column prop="id" sortable label="ID" min-width="6%">
          </el-table-column>
          <el-table-column label="直播课程" min-width="22%">
            <template slot-scope="scope">
              <thumb-bar
                :value="scope.row.thumb"
                :width="120"
                :height="90"
                :title="scope.row.title"
              ></thumb-bar>
            </template>
          </el-table-column>
          <el-table-column prop="category.name" label="分类" min-width="8%">
          </el-table-column>
          <el-table-column label="讲师/助教" min-width="8%">
            <template slot-scope="scope">
              <span>{{ scope.row.teacher.name }}</span>
              <span v-if="scope.row.assistant"
                >/{{ scope.row.assistant.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            property="charge"
            sortable
            min-width="8%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.charge }}元</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销量"
            property="join_user_times"
            sortable
            min-width="8%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.join_user_times }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下一场直播时间" min-width="18%">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 2">
                <span class="c-gray">· {{ scope.row.status_text }}</span>
              </template>
              <template v-else>
                <span v-if="scope.row.next_video.length === 0">-</span>
                <span v-else>
                  {{ scope.row.next_video.published_at | dateFormat }}</span
                >
              </template>
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
                text="排课"
                type="primary"
                @click="
                  $router.push({
                    name: 'LiveCourseVideo',
                    query: { id: scope.row.id, title: scope.row.title },
                  })
                "
                p="addons.Zhibo.course_video.list"
              ></p-link>
              <p-link
                text="学员"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'LiveCourseUsers',
                    query: { id: scope.row.id },
                  })
                "
                p="addons.Zhibo.course.users"
              ></p-link>
              <el-dropdown>
                <el-link type="primary" class="el-dropdown-link ml-5">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
                <el-dropdown-menu slot="dropdown">
                  <p-dropdown-item
                    text="统计"
                    type="primary"
                    @click="
                      $router.push({
                        name: 'LiveCourseStats',
                        query: { id: scope.row.id },
                      })
                    "
                    p="addons.Zhibo.course.stats"
                  >
                  </p-dropdown-item>
                  <p-dropdown-item
                    text="编辑"
                    type="primary"
                    @click="
                      $router.push({
                        name: 'LiveCourseUpdate',
                        query: { id: scope.row.id },
                      })
                    "
                    p="addons.Zhibo.course.update"
                  >
                  </p-dropdown-item>
                  <p-dropdown-item
                    text="删除"
                    :underline="false"
                    type="danger"
                    @click="destory(scope.row.id)"
                    p="addons.Zhibo.course.delete"
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
    <el-drawer :size="360" :visible.sync="drawer" :with-header="false">
      <div class="n-padding-box">
        <div class="tit flex">更多筛选</div>
        <div class="j-flex">
          <el-input
            class="w-300px"
            v-model="filter.keywords"
            placeholder="课程名称关键字"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-select
            class="w-300px"
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
          <el-select
            class="w-300px"
            placeholder="讲师"
            v-model="filter.teacher_id"
          >
            <el-option
              v-for="(item, index) in filterData.teachers"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="j-flex mt-20">
          <el-select class="w-300px" placeholder="状态" v-model="filter.status">
            <el-option
              v-for="(item, index) in filterData.statusList"
              :key="index"
              :label="item.name"
              :value="item.key"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "live-list",
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      filter: {
        category_id: null,
        teacher_id: null,
        keywords: null,
        status: -1,
      },
      total: 0,
      loading: false,
      list: [],
      filterData: {
        categories: [],
        teachers: [],
        statusList: [],
      },
      drawer: false,
    };
  },
  computed: {
    showStatus() {
      if (
        this.filter.teacher_id ||
        this.filter.category_id ||
        this.filter.status !== -1 ||
        this.filter.keywords
      ) {
        return true;
      }
      return false;
    },
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
    createLive() {
      this.$router.push({ name: "LiveCourseCreate" });
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
      this.drawer = false;
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.teacher_id = null;
      this.filter.category_id = null;
      this.filter.keywords = null;
      this.filter.status = -1;
      this.getData();
      this.drawer = false;
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
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter, this.pagination);
      this.$api.Course.Live.Course.List(params).then((res) => {
        this.loading = false;
        this.list = res.data.data.data;
        this.total = res.data.data.total;

        this.filterData.teachers = res.data.teachers;
        this.filterData.statusList = res.data.statusList;

        let categories = res.data.categories;
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
          this.$api.Course.Live.Course.Destory(item)
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
