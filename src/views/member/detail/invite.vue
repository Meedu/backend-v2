<template>
  <div class="float-left">
    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      v-loading="loading"
      :data="list"
      class="float-left"
    >
      <el-table-column prop="id" label="邀请学员ID" width="200">
      </el-table-column>
      <el-table-column label="邀请学员">
        <template slot-scope="scope">
          <div class="user-item d-flex">
            <div class="avatar mr-10">
              <img :src="scope.row.avatar" width="40" height="40" />
            </div>
            <div class="nickname">{{ scope.row.nick_name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        width="400"
      ></el-table-column>
      <el-table-column prop="created_at" label="注册时间" width="215">
        <template slot-scope="scope">{{
          scope.row.created_at | dateFormat
        }}</template></el-table-column
      >
      <el-table-column prop="created_at" label="邀请关系有效期至" width="215">
        <template slot-scope="scope">{{
          scope.row.invite_user_expired_at | dateFormat
        }}</template></el-table-column
      >
    </el-table>

    <div class="float-left mt-15">
      <el-pagination
        background
        :page-size="pagination.size"
        :current-page="pagination.page"
        layout="prev, pager, next, total"
        @current-change="pageChange"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      list: [],
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    pageChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.UserInviteRecords(this.id, this.pagination).then(
        (res) => {
          this.loading = false;

          this.list = res.data.data.data;
          this.total = res.data.data.total;
        }
      );
    },
  },
};
</script>
