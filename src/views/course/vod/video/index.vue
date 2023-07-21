<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="课时管理"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加课时"
        p="video.store"
        @click="
          $router.push({
            name: 'VideosCreate',
            query: { course_id: $route.query.course_id },
          })
        "
        type="primary"
      >
      </p-button>
      <p-button
        text="章节管理"
        p="course_chapter"
        @click="
          $router.push({
            name: 'CourseChapters',
            query: { course_id: $route.query.course_id },
          })
        "
        type="primary"
      >
      </p-button>
      <p-button
        text="删除"
        p="video.destroy"
        type="danger"
        @click="destoryMulti()"
      ></p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="videos"
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'published_at', order: 'ascending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="3%"></el-table-column>
          <el-table-column prop="id" sortable label="ID" min-width="6%">
          </el-table-column>
          <el-table-column label="课时" min-width="38%">
            <template slot-scope="scope">
              <template>
                <template v-if="scope.row.chapter">
                  <span>{{ scope.row.chapter.title }}</span>
                  <span class="mx-5">/</span>
                </template>
                <span>{{ scope.row.title }}</span>
              </template>
            </template>
          </el-table-column>
          <!--<el-table-column property="charge" label="价格" sortable width="120"
            ><template slot-scope="scope">
              <span>￥{{ scope.row.charge }} </span>
            </template>
          </el-table-column>-->
          <el-table-column
            property="duration"
            label="课时时长"
            sortable
            min-width="15%"
            ><template slot-scope="scope">
              <duration-text
                v-if="!loading"
                :duration="scope.row.duration"
              ></duration-text>
            </template>
          </el-table-column>
          <el-table-column sortable label="上架时间" min-width="16%">
            <template slot-scope="scope">{{
              scope.row.published_at | dateFormat
            }}</template>
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
                text="学员"
                p="video.watch.records"
                type="primary"
                @click="
                  $router.push({
                    name: 'VideoWatchRecords',
                    query: { course_id: scope.row.course_id, id: scope.row.id },
                  })
                "
              ></p-link>
              <p-link
                text="编辑"
                p="video.update"
                type="primary"
                class="ml-5"
                @click="
                  $router.push({
                    name: 'VideosUpdate',
                    query: { course_id: scope.row.course_id, id: scope.row.id },
                  })
                "
              ></p-link>
              <el-dropdown>
                <el-link type="primary" class="el-dropdown-link ml-5">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-link>
                <el-dropdown-menu slot="dropdown">
                  <p-dropdown-item
                    text="单独订阅"
                    p="video.subscribes"
                    type="primary"
                    @click="
                      $router.push({
                        name: 'VideoSubscribe',
                        query: {
                          course_id: scope.row.course_id,
                          video_id: scope.row.id,
                        },
                      })
                    "
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
          :page-sizes="[10, 20, 50, 100, 200, 500]"
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
import { mapState } from "vuex";
import DurationText from "@/components/duration-text";

export default {
  components: {
    DurationText,
  },
  data() {
    return {
      pageName: "video-list",
      pagination: {
        cid: this.$route.query.course_id,
        page: 1,
        size: 100,
        sort: "published_at",
        order: "asc",
      },
      total: 0,
      loading: false,
      videos: [],
      spids: {
        ids: [],
      },
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  watch: {
    "$route.query.course_id"() {
      this.pagination.page = 1;
    },
  },
  activated() {
    this.getVideos();
    this.$utils.scrollTopSet(this.pageName);
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.scrollTopRecord(this.pageName);
    next();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getVideos();
    },
    paginationSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.size = size;
      this.getVideos();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getVideos();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getVideos();
    },
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getVideos() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.cid = this.$route.query.course_id;
      Object.assign(params, this.pagination, {
        cid: this.$route.query.course_id,
      });
      this.$api.Course.Vod.Videos.List(params).then((res) => {
        this.loading = false;
        this.videos = res.data.videos.data;
        this.total = res.data.videos.total;
      });
    },
    importUser() {},
    destoryMulti() {
      if (this.spids.ids == "") {
        this.$message.error("请选择需要操作的数据");
        return;
      }

      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.loading) {
            return;
          }

          this.loading = true;
          this.$api.Course.Vod.Videos.DestoryMulti(this.spids)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getVideos();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {});
    },
  },
};
</script>
