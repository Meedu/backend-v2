<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑练习分类"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="父级" prop="parent_id">
          <el-select clearable v-model="user.parent_id">
            <el-option
              v-for="(item, index) in categories"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名" prop="name">
          <el-input v-model="user.name" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                v-model="user.sort"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。小数排在前面，大数排在后面。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: this.$route.query.id,
        sort: null,
        name: null,
        parent_id: null,
      },
      rules: {
        sort: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "分类名不能为空",
            trigger: "blur",
          },
        ],
      },
      categories: [],
      loading: false,
    };
  },
  mounted() {
    this.detail();
  },
  methods: {
    params(id) {
      this.$api.Exam.Practice.Category.Create().then((res) => {
        let categories = res.data.categories;
        let new_arr = [];
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id !== id) {
            new_arr.push(categories[i]);
          }
        }
        this.categories = new_arr;
      });
    },
    detail() {
      this.$api.Exam.Practice.Category.Detail(this.user.id).then((res) => {
        var data = res.data.data;
        this.user.name = data.name;
        this.user.parent_id = data.parent_id;
        this.user.sort = data.sort;
        this.params(data.id);
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.confirm();
        }
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Exam.Practice.Category.Update(this.user.id, this.user)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.back();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
