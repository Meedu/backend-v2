<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="管理员角色"></back-bar>
    <div class="float-left mb-30">
      <p-button
        text="新建管理员角色"
        p="administrator_role.store"
        @click="$router.push({ name: 'AdminrolesCreate' })"
        type="primary"
      ></p-button>
    </div>
    <div class="float-left" v-loading="loading">
      <div class="float-left">
        <el-table
          :data="users"
          :header-cell-style="{ background: '#f1f2f9' }"
          class="float-left"
          @sort-change="sortChange"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column prop="display_name" label="角色名" width="120">
          </el-table-column>
          <el-table-column label="描述"
            ><template slot-scope="scope">
              <span>{{ scope.row.description }} </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.slug !== 'administrator'">
                <p-link
                  text="编辑"
                  p="administrator_role.update"
                  type="primary"
                  @click="
                    $router.push({
                      name: 'AdminrolesUpdate',
                      query: { id: scope.row.id },
                    })
                  "
                ></p-link>
                <p-link
                  text="删除"
                  p="administrator_role.destroy"
                  class="ml-5"
                  type="danger"
                  @click="destory(scope.row.id)"
                ></p-link>
              </template>
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
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
      },
      total: 0,
      loading: false,
      users: [],
      filterData: {
        tags: [],
        roles: [],
      },
    };
  },
  mounted() {
    this.getAdminroles();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.getAdminroles();
    },
    paginationSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.size = size;
      this.getAdminroles();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getAdminroles();
    },
    sortChange(column) {
      this.pagination.sort = column.prop;
      this.pagination.order = column.order === "ascending" ? "asc" : "desc";
      this.getAdminroles();
    },
    getAdminroles() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = {};
      Object.assign(params, this.pagination);
      this.$api.System.adminroles.List(params).then((res) => {
        this.loading = false;
        this.users = res.data.data;
        this.total = res.data.total;
      });
    },
    importUser() {},
    //删除管理员
    destory(id) {
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
          this.$api.System.adminroles
            .Destory(id)
            .then(() => {
              this.loading = false;
              this.$message.success(this.$t("common.success"));
              this.paginationReset();
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
