<template>
  <transition name="fade">
    <div class="meedu-dialog-mask">
      <div class="meedu-cate-dialog-box">
        <div class="meedu-dialog-header">{{ text }}</div>
        <div class="meedu-dialog-body">
          <div class="float-left">
            <el-form
              ref="form"
              class="float-left"
              :model="form"
              :rules="rules"
              label-width="100px"
            >
              <el-form-item label="章节名称" prop="name">
                <el-input
                  v-model="form.name"
                  class="w-300px"
                  placeholder="填写章节名称"
                ></el-input>
              </el-form-item>

              <el-form-item label="排序" prop="sort">
                <div class="d-flex">
                  <div>
                    <el-input
                      type="number"
                      v-model="form.sort"
                      class="w-300px"
                    ></el-input>
                  </div>
                  <div class="ml-10">
                    <helper-text
                      text="填写整数，数字越小排序越靠前"
                    ></helper-text>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="meedu-dialog-footer">
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
          <el-button @click="close"> 取消 </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["id", "courseId", "text"],
  data() {
    return {
      form: {
        bid: null,
        sort: null,
        name: null,
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
            message: "章节名称不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.form.bid = this.courseId;
    this.form.name = null;
    this.form.sort = null;

    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      this.$api.Meedubook.Book.Chapters.Detail(this.id).then((res) => {
        var data = res.data;
        this.form.name = data.name;
        this.form.sort = data.sort;
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.confirm();
        }
      });
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      if (this.text === "添加章节") {
        this.$api.Meedubook.Book.Chapters.Store(this.form)
          .then(() => {
            this.loading = false;
            this.$message.success(this.$t("common.success"));
            this.$emit("success");
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      } else {
        this.$api.Meedubook.Book.Chapters.Update(this.id, this.form)
          .then(() => {
            this.loading = false;
            this.$message.success(this.$t("common.success"));
            this.$emit("success");
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      }
    },
  },
};
</script>
