<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加试题"></back-bar>

    <div class="float-left step-box mb-30">
      <el-steps :active="step + 1" finish-status="finish">
        <el-step title="确认试题类型"></el-step>
        <el-step title="完善试题信息"></el-step>
      </el-steps>
    </div>

    <div class="float-left" v-show="step === 0">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="所属分类" prop="category_id">
          <div class="d-flex">
            <div>
              <el-select class="w-200px" v-model="form.category_id">
                <el-option
                  v-for="(item, index) in presetData.categories"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="ml-10">
              <p-link
                text="分类管理"
                type="primary"
                @click="$router.push({ name: 'ExamQuestionCategories' })"
                p="addons.Paper.question_category.list"
              >
              </p-link>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="试题类型" prop="type">
          <el-select class="w-200px" v-model="form.type">
            <el-option
              v-for="(item, index) in presetData.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="试题难度" prop="level">
          <el-select class="w-200px" v-model="form.level">
            <el-option
              v-for="(item, index) in presetData.levels"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="float-left pl-200" v-show="step === 1">
      <q-choice @change="change" v-if="form.type === 1"></q-choice>
      <q-select @change="change" v-else-if="form.type === 2"></q-select>
      <q-input @change="change" v-else-if="form.type === 3"></q-input>
      <q-qa @change="change" v-else-if="form.type === 4"></q-qa>
      <q-judge @change="change" v-else-if="form.type === 5"></q-judge>
      <q-cap @change="change" v-else-if="form.type === 6"></q-cap>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button
            @click="save"
            v-if="step === 1"
            :loading="loading"
            type="primary"
          >
            保存
          </el-button>

          <el-button @click="formValidate" v-if="step === 0" :loading="loading">
            下一步
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="step = 0" v-if="step === 1" :loading="loading">
            上一步
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()"> 取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QChoice from "./components/choice.vue";
import QSelect from "./components/select.vue";
import QInput from "./components/input.vue";
import QJudge from "./components/judge.vue";
import QQa from "./components/qa.vue";
import QCap from "./components/cap.vue";

export default {
  components: {
    QChoice,
    QSelect,
    QInput,
    QJudge,
    QQa,
    QCap,
  },
  data() {
    return {
      loading: false,
      step: 0,
      form: {
        category_id: null,
        type: null,
        level: null,
        content: null,
        score: null,
        answer: null,
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
        option6: null,
        option7: null,
        option8: null,
        option9: null,
        option10: null,
        remark: null,
      },
      rules: {
        category_id: [
          {
            required: true,
            message: "分类不能为空",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "难度不能为空",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "blur",
          },
        ],
      },
      presetData: {
        categories: [],
        levels: [],
        types: [],
      },
      capList: null,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Exam.Question.Create().then((res) => {
        this.presetData.categories = res.data.categories;
        this.presetData.levels = res.data.levels;
        this.presetData.types = res.data.types;
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.step = 1;
        }
      });
    },
    change(question, list) {
      Object.assign(this.form, question);
      if (list) {
        this.capList = list;
      } else {
        this.capList = null;
      }
    },
    save() {
      if (this.loading) {
        return;
      }
      if (
        (this.form.type === 1 || this.form.type === 2) &&
        !this.form.option2
      ) {
        this.$message.error("至少得有两个选项");
        return;
      }
      if (this.form.type === 6 && this.capList) {
        let status = false;
        this.capList.forEach((item, index) => {
          let num = index + 1;
          if (typeof item.score === "undefined" || item.score === null) {
            this.$message.error("请填写第" + num + "题子题分数");
            status = true;
            return;
          }
        });
        if (status) {
          return;
        }
      }
      if (this.form.type === 6 && !this.form.score) {
        this.$message.warning("请至少添加一个子题");
        return;
      }
      if (this.form.type === 3 && !this.form.score) {
        this.$message.warning("请填写每空分数");
        return;
      }
      if (!this.form.score) {
        this.$message.warning("试题分数不能为空");
        return;
      }
      if (!this.form.content) {
        this.$message.warning("试题内容不能为空");
        return;
      }

      if (
        (this.form.type === 1 ||
          this.form.type === 3 ||
          this.form.type === 5) &&
        this.form.answer === null
      ) {
        this.$message.warning("试题答案不能为空");
        return;
      }

      if (this.form.type === 2 && this.form.answer.length === 0) {
        this.$message.warning("试题答案不能为空");
        return;
      }
      this.loading = true;
      this.$api.Exam.Question.Store(this.form)
        .then(() => {
          this.loading = false;
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

<style lang="less" scoped>
.step-box {
  box-sizing: border-box;
  padding: 30px 200px;
}

.pl-200 {
  padding: 0 200px;
  box-sizing: border-box;
}
</style>
