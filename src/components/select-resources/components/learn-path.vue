<template>
  <div class="float-left" v-loading="loading">
    <div class="float-left mb-15">
      <div class="float-left d-flex">
        <div class="d-flex">
          <el-input
            class="w-150px"
            v-model="pagination.keywords"
            placeholder="关键字"
          ></el-input>
        </div>

        <div class="ml-10">
          <el-button @click="paginationReset">清空</el-button>
          <el-button @click="firstPageLoad" type="primary">筛选</el-button>
        </div>
      </div>
    </div>
    <el-table
      :header-cell-style="{ background: '#f1f2f9' }"
      :data="courses"
      highlight-current-row
      @current-change="tableItemChoice"
      class="float-left"
    >
      <el-table-column label width="55">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="radio"
            ><span></span
          ></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="路径ID" width="120"> </el-table-column>
      <el-table-column label="路径">
        <template slot-scope="scope">
          <div class="d-flex">
            <div>
              <img :src="scope.row.thumb" width="100" height="80" />
            </div>
            <div class="ml-15">{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="120">
        <template slot-scope="scope"> ￥{{ scope.row.charge }} </template>
      </el-table-column>
    </el-table>

    <div class="float-left mt-15 text-center">
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
</template>

<script>
export default {
  data() {
    return {
      link: null,
      pagination: {
        page: 1,
        size: 10,
        sort: "created_at",
        order: "desc",
        keywords: null,
      },
      radio: "",
      loading: false,
      total: 0,
      courses: [],
    };
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    paginationReset() {
      this.pagination.page = 1;
      this.pagination.keywords = null;
      this.getCourse();
    },
    paginationSizeChange(size) {
      this.pagination.page = 1;
      this.pagination.size = size;
      this.getCourse();
    },
    paginationPageChange(page) {
      this.pagination.page = page;
      this.getCourse();
    },
    firstPageLoad() {
      this.pagination.page = 1;
      this.getCourse();
    },
    tableItemChoice(row) {
      if (row) {
        this.radio = row.id;
        this.$emit("change", {
          resource_type: "learnPath",
          id: row.id,
          title: row.name,
          thumb: row.thumb,
          charge: row.charge,
          original_charge: row.charge,
        });
      }
    },
    getCourse() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Course.LearnPath.Path.List(this.pagination).then((res) => {
        this.loading = false;
        this.courses = res.data.data;
        this.total = res.data.total;
      });
    },
  },
};
</script>
