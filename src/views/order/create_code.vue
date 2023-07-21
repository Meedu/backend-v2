<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="新建优惠码"></back-bar>

    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="优惠码" prop="code">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                v-model="form.code"
                placeholder="优惠码"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="请勿使用大写U或者小写u开头"></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="到期时间" prop="expired_at">
          <div class="d-flex">
            <div>
              <el-date-picker
                v-model="form.expired_at"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="请选择日期"
                :picker-options="expireTimeOption"
              >
              </el-date-picker>
            </div>
            <div class="ml-10">
              <helper-text
                text="过期时间到了之后优惠码便无法使用了。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="面值" prop="invited_user_reward">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                type="number"
                v-model="form.invited_user_reward"
                placeholder="面值"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。不支持小数。可在收银台抵扣的金额。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="可使用次数" prop="use_times">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                type="number"
                v-model="form.use_times"
                placeholder="可使用次数"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="请输入整数。0意味着不限制。"></helper-text>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="formValidate" :loading="loading" type="primary"
              >保存</el-button
            >
          </div>
          <div class="ml-24">
            <el-button @click="$router.back()">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        code: null,
        expired_at: null,
        invited_user_reward: null,
        use_times: null,
      },
      rules: {
        code: [
          {
            required: true,
            message: "优惠码不能为空",
            trigger: "blur",
          },
        ],
        expired_at: [
          {
            required: true,
            message: "到期时间不能为空",
            trigger: "blur",
          },
        ],
        invited_user_reward: [
          {
            required: true,
            message: "抵扣金额不能为空",
            trigger: "blur",
          },
        ],
        use_times: [
          {
            required: true,
            message: "可使用次数不能为空",
            trigger: "blur",
          },
        ],
      },
      expireTimeOption: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          //超过此刻可选
          return date.getTime() < Date.now();
        },
      },
    };
  },
  methods: {
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
      this.$api.Order.PromoCode.Create(this.form)
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
