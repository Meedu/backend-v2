<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑电子书"></back-bar>

    <div class="float-left" v-if="course">
      <el-form
        ref="form"
        :model="course"
        :rules="rules"
        class="float-left"
        label-width="200px"
      >
        <div class="float-left">
          <el-form-item prop="cid" label="所属分类">
            <div class="d-flex">
              <div>
                <el-select class="w-300px" v-model="course.cid">
                  <el-option
                    v-for="(item, index) in categories"
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
                  p="addons.meedu_books.book_category.list"
                  type="primary"
                  @click="$router.push({ name: 'MeedubookCategory' })"
                ></p-link>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="电子书名称" prop="name">
            <el-input
              v-model="course.name"
              class="w-300px"
              placeholder="请输入电子书名称"
            ></el-input>
          </el-form-item>

          <el-form-item prop="thumb" label="电子书封面">
            <upload-image
              v-model="course.thumb"
              helper="长宽比3:4，建议尺寸：300x400像素"
              width="90"
              height="120"
              name="上传封面"
            ></upload-image>
          </el-form-item>

          <el-form-item label="免费" prop="is_free">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="is_free"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="价格" prop="charge" v-if="is_free === 0">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  placeholder="单位：元"
                  v-model="course.charge"
                  class="w-300px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text text="最小单位“元”，不支持小数"></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item
            label="会员免费"
            prop="is_vip_free"
            v-if="course.charge > 0"
          >
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="course.is_vip_free"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text
                  text="如果开启该选项，则购买VIP会员的学员可以无需购买即可观看该电子书。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="上架时间" prop="published_at">
            <div class="d-flex">
              <div>
                <el-date-picker
                  style="width: 300px"
                  v-model="course.published_at"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </div>
              <div class="ml-10">
                <helper-text text="上架时间越晚，排序越靠前"></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="隐藏">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="course.is_show"
                  :active-value="0"
                  :inactive-value="1"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text text="打开后电子书在前台隐藏显示"></helper-text>
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="short_desc" label="简短介绍">
            <el-input
              class="w-800px"
              rows="4"
              maxlength="150"
              type="textarea"
              show-word-limit
              v-model="course.short_desc"
              placeholder="简短介绍"
            ></el-input>
          </el-form-item>

          <el-form-item prop="original_desc" label="详情介绍">
            <div class="w-800px">
              <quill-editor
                :height="800"
                v-model="course.original_desc"
              ></quill-editor>
            </div>
          </el-form-item>
        </div>
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
import QuillEditor from "@/components/quill-editor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    QuillEditor,
    UploadImage,
  },
  data() {
    return {
      is_free: null,
      book_id: this.$route.query.id,
      course: null,
      rules: {
        cid: [
          {
            required: true,
            message: "分类不能为空",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "电子书名称不能为空",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传封面",
            trigger: "blur",
          },
        ],
        short_desc: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        original_desc: [
          {
            required: true,
            message: "详细介绍不能为空",
            trigger: "blur",
          },
        ],
        published_at: [
          {
            required: true,
            message: "上架时间不能为空",
            trigger: "blur",
          },
        ],
      },
      categories: [],
      loading: false,
      tab: {
        active: "base",
        list: [
          {
            name: "基础信息",
            key: "base",
          },
          {
            name: "可选信息",
            key: "dev",
          },
        ],
      },
      original_charge: null,
    };
  },
  watch: {
    is_free(val) {
      if (val === 1) {
        this.course.charge = 0;
      } else {
        this.course.charge = this.original_charge;
      }
    },
  },
  mounted() {
    this.params();
    this.getDetail();
  },
  methods: {
    params() {
      this.$api.Meedubook.Book.Create().then((res) => {
        this.categories = res.data.categories;
      });
    },
    getDetail() {
      this.$api.Meedubook.Book.Detail(this.book_id).then((res) => {
        this.course = res.data;
        this.original_charge = this.course.charge;
        if (this.course.charge > 0) {
          this.is_free = 0;
        } else {
          this.is_free = 1;
        }
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
      if (this.course.charge % 1 !== 0) {
        this.$message.error("电子书价格必须为整数");
        return;
      }
      if (this.course.short_desc.length > 150) {
        this.$message.error("简短介绍字数超出");
        return;
      }
      this.loading = true;
      this.course.render_desc = this.course.original_desc;
      this.$api.Meedubook.Book.Update(this.book_id, this.course)
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
