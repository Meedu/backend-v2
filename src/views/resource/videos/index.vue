<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <el-button type="primary" @click="openUploadItem()">
          上传视频
        </el-button>
        <p-button
          text="批量删除"
          p="media.video.delete.multi"
          @click="destorymulti()"
          type="danger"
        >
        </p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.keywords"
            placeholder="关键字"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="results"
        @selection-change="handleSelectionChange"
        class="float-left"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="视频名称"> </el-table-column>
        <el-table-column label="视频时长" width="150">
          <template slot-scope="scope">
            <duration-text
              v-if="!loading"
              :duration="scope.row.duration"
            ></duration-text>
          </template>
        </el-table-column>
        <el-table-column label="大小" width="150">
          <template slot-scope="scope">
            <div>{{ scope.row.size_mb }}MB</div>
          </template>
        </el-table-column>
        <el-table-column label="转码" width="150">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.storage_driver === 'aliyun' &&
                checkTrans(scope.row.storage_file_id)
              "
              >已转码</span
            >
            <span
              v-else-if="
                scope.row.storage_driver === 'tencent' &&
                checkTenTrans(scope.row.storage_file_id)
              "
              >已转码</span
            >
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" width="200">
          <template slot-scope="scope">
            <div>{{ scope.row.created_at | dateFormat }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" :width="120">
          <template slot-scope="scope">
            <p-link
              v-if="scope.row.storage_driver === 'aliyun'"
              text="转码"
              p="ali-hls-transcode.submit"
              @click="submit(scope.row.storage_file_id)"
              type="primary"
            ></p-link>
            <p-link
              v-else-if="scope.row.storage_driver === 'tencent'"
              text="转码"
              p="addons.TencentCloudHls.transcode.submit"
              @click="tenSubmit(scope.row.storage_file_id)"
              type="primary"
            ></p-link>
          </template>
        </el-table-column>
      </el-table>

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
    <transition name="fade" v-if="visible">
      <div class="upload-dialog-mask">
        <upload-video-item
          @close="visible = false"
          @change="completeUpload"
        ></upload-video-item>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DurationText from "@/components/duration-text";
import UploadVideoItem from "@/components/upload-video-item";
export default {
  components: {
    DurationText,
    UploadVideoItem,
  },
  data() {
    return {
      pageName: "resource-videos-list",
      pagination: {
        page: 1,
        size: 10,
      },
      spids: {
        ids: [],
      },
      filter: {
        keywords: null,
      },
      total: 0,
      loading: false,
      results: [],
      visible: false,
      records: {},
      tenRecords: {},
    };
  },
  computed: {
    ...mapState(["user", "enabledAddons", "systemConfig"]),
    isNoService() {
      return this.systemConfig.video.default_service === "";
    },
    isLocalService() {
      return this.systemConfig.video.default_service === "local";
    },
    isTenService() {
      return this.systemConfig.video.default_service === "tencent";
    },
    isAliService() {
      return this.systemConfig.video.default_service === "aliyun";
    },
  },
  watch: {
    visible() {
      this.paginationReset();
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
    checkTrans(val) {
      return typeof this.records[val] !== "undefined";
    },
    checkTenTrans(val) {
      return typeof this.tenRecords[val] !== "undefined";
    },
    openUploadItem() {
      if (this.isNoService) {
        this.$message.warning("请先在系统配置的视频存储中完成参数配置");
        return;
      }
      this.visible = true;
    },
    completeUpload(val) {
      this.visible = false;
    },
    fileSizeConversion(byte) {
      var size = `${(byte / (1024 * 1024)).toFixed(2)}`;
      const sizeStr = `${size}`;
      const index = sizeStr.indexOf(".");
      const dou = sizeStr.substr(index + 1, 2);
      if (dou == "00") {
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      }
      return size;
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.type = null;
      this.filter.keywords = null;
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    //保存选中结果
    handleSelectionChange(val) {
      var newbox = [];
      for (var i = 0; i < val.length; i++) {
        newbox.push(val[i].id);
      }
      this.spids.ids = newbox;
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.filter);
      Object.assign(params, this.pagination);
      this.$api.Resource.VideosList(params).then((res) => {
        this.loading = false;
        this.results = res.data.data;
        this.total = res.data.total;
        var newbox = [];
        var tenbox = [];
        for (var i = 0; i < this.results.length; i++) {
          if (this.results[i].storage_driver === "aliyun") {
            newbox.push(this.results[i].storage_file_id);
          }
          if (this.results[i].storage_driver === "tencent") {
            tenbox.push(this.results[i].storage_file_id);
          }
        }
        if (newbox.length > 0 && this.enabledAddons["AliyunHls"]) {
          this.getAliRecords(newbox);
        }
        if (tenbox.length > 0 && this.enabledAddons["TencentCloudHls"]) {
          this.getTenRecords(tenbox);
        }
      });
    },
    destorymulti() {
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
          //点击确定按钮的操作
          if (this.loading) {
            return;
          }

          this.loading = true;
          this.$api.Resource.VideosDestroyMulti(this.spids)
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
    getAliRecords(newbox) {
      this.$api.Resource.AliyunTranscodeRecords({
        file_ids: newbox,
      })
        .then((res) => {
          if (res.data.records) {
            this.records = res.data.records;
          }
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    getTenRecords(newbox) {
      this.$api.Resource.TencentTranscodeRecords({
        file_ids: newbox,
      })
        .then((res) => {
          if (res.data) {
            this.tenRecords = res.data;
          }
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    submit(fileId) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.loading) {
            return;
          }
          let ids = [];
          ids.push(fileId);
          this.loading = true;
          this.$api.Resource.AliyunTranscode({
            file_ids: ids,
          })
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.loading = false;
              this.getData();
            })
            .catch((e) => {
              this.$message.error(e.message);
              this.loading = false;
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
    tenSubmit(fileId) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.loading) {
            return;
          }
          let ids = [];
          ids.push(fileId);
          this.loading = true;
          this.$api.Resource.TencentTranscode({
            file_ids: ids,
          })
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.loading = false;
              this.getData();
            })
            .catch((e) => {
              this.$message.error(e.message);
              this.loading = false;
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
.upload-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2001;
  transform: translateZ(1000px); /*这里是给safari用的*/
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
