<template>
  <transition name="fade">
    <div class="meedu-dialog-mask">
      <div class="meedu-dialog-box">
        <div class="meedu-dialog-header">添加导航</div>
        <div class="meedu-dialog-body">
          <el-form ref="form" :model="form" :rules="rules" label-width="200px">
            <el-form-item label="父导航" prop="parent_id">
              <el-select
                v-model="form.parent_id"
                placeholder="请选择"
                class="w-200px"
              >
                <el-option
                  v-for="item in parentNavs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="sort" label="排序">
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

            <el-form-item label="导航名" prop="name">
              <el-input v-model="form.name" class="w-200px"></el-input>
            </el-form-item>

            <el-form-item label="链接地址" prop="url">
              <div class="d-flex">
                <div>
                  <el-input
                    @input="handlerValue"
                    v-model="form.url"
                    class="w-200px"
                  ></el-input>
                </div>
                <div class="ml-15">
                  <el-link type="primary" @click="showLinkWin = true">
                    选择链接
                  </el-link>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="新窗口打开" prop="blank" v-if="linkStatus">
              <el-switch
                v-model="form.blank"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
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

export default {
  components: {
    PcLink,
  },
  data() {
    return {
      loading: false,
      linkStatus: false,
      showLinkWin: false,
      form: {
        platform: "PC",
        parent_id: null,
        sort: null,
        name: null,
        blank: 0,
        url: null,
      },
      parentNavs: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入导航名",
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
        url: [
          {
            required: true,
            message: "请输入链接地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getCreateParams();
  },
  methods: {
    handlerValue() {
      if (this.form.url.match("https://") || this.form.url.match("http://")) {
        this.linkStatus = true;
      } else {
        this.linkStatus = false;
      }
    },
    getCreateParams() {
      this.$api.System.Navs.Create().then((res) => {
        this.parentNavs = res.data.navs;
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
      this.$api.System.Navs.Store(this.form)
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
