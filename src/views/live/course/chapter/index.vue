<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="直播课程章节"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="添加章节"
        p="addons.Zhibo.course_chapter.store"
        @click="addChapter"
        type="primary"
      >
      </p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :header-cell-style="{ background: '#f1f2f9' }"
          :data="results"
          class="float-left"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="sort" label="排序" width="120">
          </el-table-column>
          <el-table-column prop="name" label="章节名"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <p-link
                text="编辑"
                type="primary"
                @click="updateChapter(scope.row.id)"
                p="addons.Zhibo.course_chapter.update"
              ></p-link>
              <p-link
                text="删除"
                class="ml-5"
                p="addons.Zhibo.course_chapter.delete"
                type="danger"
                @click="destory(scope.row.id)"
              ></p-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <chapters-dialog
      :key="updateId"
      v-if="showAddWin"
      :text="tit"
      :id="updateId"
      :courseId="id"
      @close="showAddWin = false"
      @success="successEvt"
    ></chapters-dialog>
  </div>
</template>

<script>
import ChaptersDialog from "./components/chapters-dialog";
export default {
  components: {
    ChaptersDialog,
  },
  data() {
    return {
      pageName: "liveChapter-list",
      id: this.$route.query.id,
      loading: false,
      results: [],
      showAddWin: false,
      tit: null,
      updateId: null,
    };
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
    addChapter() {
      this.tit = "添加章节";
      this.updateId = null;
      this.showAddWin = true;
    },
    updateChapter(id) {
      this.tit = "编辑章节";
      this.updateId = id;
      this.showAddWin = true;
    },
    successEvt() {
      this.showAddWin = false;
      this.getResults();
    },
    getResults() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.id = this.$route.query.id;
      let params = {
        id: this.id,
      };
      this.$api.Course.Live.Course.Chapter.List(params).then((res) => {
        this.loading = false;
        this.results = res.data;
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
          this.$api.Course.Live.Course.Chapter.Destory(item)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.getResults();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.warning(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
