<template>
  <div class="meedu-main-body">
    <div class="float-left j-b-flex mb-30">
      <div class="d-flex">
        <p-button
          text="新建优惠码"
          p="promoCode.store"
          @click="$router.push({ name: 'Createcode' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="批量生成"
          p="promoCode.generator"
          @click="$router.push({ name: 'CreateMulticode' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="批量导入"
          p="promoCode.store"
          @click="$router.push({ name: 'CodeImport' })"
          type="primary"
        >
        </p-button>
        <p-button
          text="批量删除"
          p="promoCode.destroy.multi"
          @click="destorymulti()"
          type="danger"
        >
        </p-button>
      </div>

      <div class="d-flex">
        <div>
          <el-input
            class="w-150px"
            v-model="filter.key"
            placeholder="优惠码"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            class="w-150px"
            v-model="filter.user_id"
            placeholder="学员ID"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-button @click="paginationReset()">清空</el-button>
          <el-button @click="firstPageLoad()" type="primary"> 筛选 </el-button>
        </div>
        <div class="drawerMore d-flex ml-10" @click="drawer = true">
          <template v-if="showStatus">
            <img src="../../assets/img/icon-filter-h.png" />
            <span class="act">已选</span>
          </template>
          <template v-else>
            <img src="../../assets/img/icon-filter.png" />
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
          @selection-change="handleSelectionChange"
          class="float-left"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="120"> </el-table-column>
          <el-table-column
            prop="invited_user_reward"
            width="300"
            label="优惠码"
          >
            <template slot-scope="scope">
              <div class="mb-10">{{ scope.row.code }}</div>
              <div>面值：{{ scope.row.invited_user_reward }}元</div>
              <div>奖励：{{ scope.row.invite_user_reward }}元</div>
            </template>
          </el-table-column>

          <el-table-column label="可使用次数" width="300">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.use_times === 0">
                不限制
              </el-tag>
              <el-tag type="info" v-else>
                {{ scope.row.use_times || 0 }}次
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="已使用次数" width="150">
            <template slot-scope="scope">
              {{ scope.row.used_times || 0 }}次
            </template>
          </el-table-column>

          <el-table-column label="过期时间" width="200">
            <template slot-scope="scope">{{
              scope.row.expired_at | dateFormat
            }}</template>
          </el-table-column>

          <el-table-column label="添加时间">
            <template slot-scope="scope">{{
              scope.row.created_at | dateFormat
            }}</template>
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
            v-model="filter.key"
            placeholder="优惠码"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-input
            class="w-300px"
            v-model="filter.user_id"
            placeholder="学员ID"
          ></el-input>
        </div>

        <div class="j-flex mt-20">
          <el-date-picker
            v-model="filter.expired_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="过期时间-开始"
            end-placeholder="过期时间-结束"
          >
          </el-date-picker>
        </div>

        <div class="j-flex mt-20">
          <el-date-picker
            v-model="filter.created_at"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="添加时间-开始"
            end-placeholder="添加时间-结束"
          >
          </el-date-picker>
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
      pageName: "promocode-list",
      pagination: {
        video_id: this.$route.query.id,
        course_id: this.$route.query.course_id,
        page: 1,
        size: 10,
      },
      filter: {
        user_id: null,
        key: null,
        created_at: null,
        expired_at: null,
      },
      spids: {
        ids: [],
      },
      total: 0,
      loading: false,
      list: [],
      drawer: false,
    };
  },
  computed: {
    showStatus() {
      if (
        this.filter.user_id ||
        this.filter.key ||
        this.filter.created_at ||
        this.filter.expired_at
      ) {
        return true;
      }
      return false;
    },
  },
  watch: {
    "$route.query.id"() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.key = null;
      this.filter.created_at = null;
      this.filter.expired_at = null;
      this.spids.ids = [];
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
      this.drawer = false;
    },
    paginationReset() {
      this.pagination.page = 1;
      this.filter.user_id = null;
      this.filter.key = null;
      this.filter.created_at = null;
      this.filter.expired_at = null;
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
      this.pagination.video_id = this.$route.query.id;
      this.pagination.course_id = this.$route.query.course_id;
      Object.assign(params, this.filter, this.pagination);
      this.$api.Order.PromoCode.PromoCode(params).then((res) => {
        this.loading = false;
        this.list = res.data.data;
        this.total = res.data.total;
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
          this.$api.Order.PromoCode.DestroyMulti(this.spids)
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
