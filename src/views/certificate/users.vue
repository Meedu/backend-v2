<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="证书授予学员"></back-bar>
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <!--<p-button
          text="添加学员"
          p="addons.cert.user.import"
          @click="showUserAddWin = true"
          type="primary"
        ></p-button>-->
        <p-button
          text="批量授予"
          p="addons.cert.user.import"
          type="primary"
          @click="importDialog = true"
        >
        </p-button>
        <p-button
          text="撤销授予"
          p="addons.cert.user.destroy"
          type="danger"
          @click="delUser"
        ></p-button>
      </div>
      <div class="d-flex">
        <div>
          <el-input
            v-model="filter.user_id"
            class="w-200px"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary">筛选</el-button>
          <!--<el-button @click="importexcel" type="primary">导出表格</el-button>-->
        </div>
      </div>
    </div>
    <div class="float-left" v-loading="loading">
      <el-table
        :header-cell-style="{ background: '#f1f2f9' }"
        :data="list"
        @selection-change="handleSelectionChange"
        class="float-left"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="user_id" label="学员ID" width="150">
        </el-table-column>
        <el-table-column label="学员">
          <template slot-scope="scope">
            <div class="user-item d-flex" v-if="scope.row.user">
              <div class="avatar">
                <img :src="scope.row.user.avatar" width="40" height="40" />
              </div>
              <div class="ml-10">{{ scope.row.user.nick_name }}</div>
            </div>
            <span class="c-red" v-else>学员不存在</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.user">{{ scope.row.user.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证书编号" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.cert_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="200">
          <template slot-scope="scope">{{
            scope.row.created_at | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <p-link
              p="addons.cert.download"
              text="下载"
              type="primary"
              @click="download(scope.row.user_id)"
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

    <user-add-comp
      :show="showUserAddWin"
      @close="showUserAddWin = false"
      @confirm="userAddChange"
    ></user-add-comp>
    <user-import-comp
      :show="importDialog"
      :id="pagination.id"
      type="cert"
      name="证书授予批量导入模板"
      @close="importDialog = false"
      @change="getData"
    ></user-import-comp>
  </div>
</template>

<script>
import config from "@/js/config";
import moment from "moment";
import UserAddComp from "@/components/user-add";
import UserImportComp from "@/components/user-import";

export default {
  components: {
    UserAddComp,
    UserImportComp,
  },
  data() {
    return {
      pageName: "certificateUsers-list",
      showUserAddWin: false,
      importDialog: false,
      pagination: {
        id: this.$route.query.id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
      },
      total: 0,
      loading: false,
      list: [],
      selectedRows: null,
    };
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.user_id = null;
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
    firstPageLoad() {
      this.pagination.page = 1;
      this.getData();
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
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
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    download(uid) {
      window.open(
        config.url +
          "/backend/addons/Cert/cert/" +
          this.$route.query.id +
          "/" +
          uid +
          "/download?token=" +
          this.$utils.getToken()
      );
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      this.pagination.id = this.$route.query.id;
      Object.assign(params, this.pagination);
      Object.assign(params, this.filter);
      this.$api.Certificate.User.List(this.pagination.id, params).then(
        (res) => {
          this.loading = false;
          this.list = res.data.data;
          this.total = res.data.total;
        }
      );
    },
    delUser() {
      if (this.selectedRows === null || this.selectedRows.length === 0) {
        this.$message.warning("请选择需要删除的学员");
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [];
          this.selectedRows.forEach((item) => {
            ids.push(item.user_id);
          });

          this.$api.Certificate.User.Delete(this.pagination.id, {
            user_ids: ids,
          })
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.firstPageLoad();
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        })
        .catch(() => {});
    },
    userAddChange(rows) {
      let ids = [];
      rows.forEach((item) => {
        ids.push(item.id);
      });

      this.$api.Certificate.User.Import(this.pagination.id, {
        user_ids: ids,
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.firstPageLoad();
          this.showUserAddWin = false;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    importexcel() {
      if (this.loading) {
        return;
      }
      this.loading = true;

      let params = {
        page: 1,
        size: this.total,
      };
      Object.assign(params, this.filter);

      this.$api.Certificate.User.List(this.pagination.id, params).then(
        (res) => {
          if (res.data.data.total === 0) {
            this.$message.error("数据为空");
            this.loading = false;
            return;
          }

          let filename = "证书授予批量导入模板.xlsx";
          let sheetName = "sheet1";

          let data = [["学员ID", "学员", "手机号", "价格", "时间"]];
          res.data.data.data.forEach((item) => {
            data.push([
              item.user_id,
              item.user.nick_name,
              item.user.mobile,
              item.charge === 0 ? "-" : "￥" + item.charge,
              moment(item.created_at).format("YYYY-MM-DD HH:mm"),
            ]);
          });

          this.$utils.exportExcel(data, filename, sheetName);
          this.loading = false;
        }
      );
    },
  },
};
</script>
