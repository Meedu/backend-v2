<template>
  <transition name="fade">
    <div class="meedu-dialog-mask">
      <div class="meedu-dialog-box">
        <div class="meedu-dialog-header">添加幻灯片</div>
        <div class="meedu-dialog-body">
          <el-form ref="form" :model="form" :rules="rules" label-width="200px">
            <el-form-item label="排序" prop="sort">
              <div class="d-flex">
                <div>
                  <el-input v-model="form.sort" class="w-200px"></el-input>
                </div>
                <div class="ml-10">
                  <helper-text
                    text="填写整数，数字越小排序越靠前"
                  ></helper-text>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="幻灯片" prop="thumb">
              <upload-image
                v-model="form.thumb"
                :width="400"
                :height="100"
                helper="推荐1200x400 宽高比3:1"
              ></upload-image>
            </el-form-item>

            <el-form-item label="链接地址">
              <div class="d-flex">
                <div>
                  <el-input v-model="form.url" class="w-200px"></el-input>
                </div>
                <div class="ml-15">
                  <el-link type="primary" @click="showLinkWin = true">
                    选择链接
                  </el-link>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="meedu-dialog-footer">
          <el-button type="primary" @click="formValidate" :loading="loading">
            确定
          </el-button>
          <el-button @click="close" class="ml-30">取消</el-button>
        </div>
      </div>

      <pc-link
        @close="showLinkWin = false"
        @change="linkChange"
        :show="showLinkWin"
        :selected="form.url"
      ></pc-link>
    </div>
  </transition>
</template>

<script>
import PcLink from "@/components/pc-link/index";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    PcLink,
    UploadImage,
  },
  data() {
    return {
      loading: false,
      showLinkWin: false,
      form: {
        platform: "PC",
        sort: null,
        thumb: null,
        url: null,
      },
      parentNavs: [],
      rules: {
        thumb: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入排序数值",
            trigger: "blur",
          },
        ],
        // url: [
        //   {
        //     required: true,
        //     message: "请输入链接地址",
        //     trigger: "blur",
        //   },
        // ],
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
      this.$api.System.Sliders.Store(this.form)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$emit("close");
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    close() {
      this.$emit("close");
    },
    linkChange(link) {
      this.form.url = link.url;
      this.showLinkWin = false;
    },
  },
};
</script>
