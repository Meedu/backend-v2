<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="支付配置"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <div class="title">支付宝支付</div>
        <el-form-item label="支付宝支付">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.payment.alipay.enabled']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="支付宝AppId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['pay.alipay.app_id']"
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="支付宝公钥">
          <div class="d-flex float-left" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                type="textarea"
                :rows="3"
                v-model="form.config['pay.alipay.ali_public_key']"
              >
              </el-input>
            </div>
            <div class="ml-10">
              <el-button @click="uploadAliPublicClient" type="primary"
                >选择crt证书</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="应用私钥">
          <div class="d-flex float-left" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                type="textarea"
                :rows="3"
                v-model="form.config['pay.alipay.private_key']"
              >
              </el-input>
            </div>
            <div class="ml-10">
              <el-button @click="uploadAliPrivateClient" type="primary"
                >选择TXT</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="支付宝根证书">
          <div class="d-flex float-left" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                type="textarea"
                :rows="3"
                v-model="form.config['pay.alipay.alipay_root_cert']"
              >
              </el-input>
            </div>
            <div class="ml-10">
              <el-button @click="uploadAliRootCertClient" type="primary"
                >选择crt证书</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="应用公钥证书">
          <div class="d-flex float-left" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                type="textarea"
                :rows="3"
                v-model="form.config['pay.alipay.app_cert_public_key']"
              >
              </el-input>
            </div>
            <div class="ml-10">
              <el-button @click="uploadAliCertPublicClient" type="primary"
                >选择crt证书</el-button
              >
            </div>
          </div>
        </el-form-item>
        <div class="title">微信支付</div>
        <el-form-item label="微信扫码支付">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.payment.wechat.enabled']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="微信JSAPI支付">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.payment.wechat-jsapi.enabled']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="微信支付公众号AppId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['pay.wechat.app_id']"
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          v-if="enabledAddons['TemplateOne']"
          label="微信支付手机应用AppId"
        >
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['pay.wechat.appid']"
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="微信支付MchId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['pay.wechat.mch_id']"
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="微信支付Key">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input class="w-200px" v-model="form.config['pay.wechat.key']">
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="微信证书Client">
          <div class="d-flex float-left" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                type="textarea"
                :rows="3"
                v-model="form.config['pay.wechat.cert_client']"
              >
              </el-input>
            </div>
            <div class="ml-10">
              <el-button @click="uploadCertClient" type="primary"
                >选择证书</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="微信证书Key">
          <div class="d-flex float-left" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                type="textarea"
                :rows="3"
                v-model="form.config['pay.wechat.cert_key']"
              >
              </el-input>
            </div>
            <div class="ml-10">
              <el-button @click="uploadKeyClient" type="primary"
                >选择证书</el-button
              >
            </div>
          </div>
        </el-form-item>

        <div class="title">手动支付</div>
        <el-form-item label="手动打款">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.payment.handPay.enabled']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="手动打款说明">
          <div class="d-flex w-800px" style="margin-left: 3px">
            <quill-editor
              :height="400"
              v-model="form.config['meedu.payment.handPay.introduction']"
              v-if="renderComponent"
            ></quill-editor>
          </div>
        </el-form-item>
      </el-form>
      <div style="display: none">
        <input type="file" ref="cert-client-file" @change="clientChange" />
        <input type="file" ref="cert-key-file" @change="keyChange" />
        <input type="file" ref="ali-public-file" @change="publicChange" />
        <input type="file" ref="ali-root-cert-file" @change="rootCertChange" />
        <input
          type="file"
          ref="ali-cert-public-file"
          @change="certPublicChange"
        />
        <input type="file" ref="ali-private-file" @change="privateChange" />
      </div>
      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="save" :loading="loading" type="primary"
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
import { mapState } from "vuex";
import QuillEditor from "@/components/quill-editor";
export default {
  components: { QuillEditor },
  data() {
    return {
      key: "支付",
      config: null,
      loading: false,
      renderComponent: true,
      form: {
        config: {
          "meedu.payment.alipay.enabled": null,
          "pay.alipay.app_id": null,
          "pay.alipay.ali_public_key": null,
          "pay.alipay.alipay_root_cert": null,
          "pay.alipay.app_cert_public_key": null,
          "pay.alipay.private_key": null,
          "meedu.payment.wechat.enabled": null,
          "pay.wechat.app_id": null,
          "pay.wechat.appid": null,
          "pay.wechat.mch_id": null,
          "pay.wechat.key": null,
          "meedu.payment.handPay.enabled": null,
          "meedu.payment.handPay.introduction": "",
          "pay.wechat.cert_key": null,
          "pay.wechat.cert_client": null,
          "meedu.payment.wechat-jsapi.enabled": null,
        },
      },
      upload: {
        loading: false,
      },
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    uploadCertClient() {
      if (this.upload.loading) {
        return;
      }
      this.$refs["cert-client-file"].click();
    },
    uploadKeyClient() {
      if (this.upload.loading) {
        return;
      }
      this.$refs["cert-key-file"].click();
    },
    uploadAliPublicClient() {
      if (this.upload.loading) {
        return;
      }
      this.$refs["ali-public-file"].click();
    },
    uploadAliRootCertClient() {
      if (this.upload.loading) {
        return;
      }
      this.$refs["ali-root-cert-file"].click();
    },
    uploadAliCertPublicClient() {
      if (this.upload.loading) {
        return;
      }
      this.$refs["ali-cert-public-file"].click();
    },
    uploadAliPrivateClient() {
      if (this.upload.loading) {
        return;
      }
      this.$refs["ali-private-file"].click();
    },
    clientChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      this.upload.loading = true;
      let file = e.target.files[0];
      // 文件扩展名检测
      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "pem") {
        this.$message.error("请选择pem文件");
        this.upload.loading = false;
        return;
      }
      // 读取数据
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let data = e.target.result;
        this.upload.loading = false;
        this.form.config["pay.wechat.cert_client"] = data;
      };
    },
    keyChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      this.upload.loading = true;
      let file = e.target.files[0];
      // 文件扩展名检测
      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "pem") {
        this.$message.error("请选择pem文件");
        this.upload.loading = false;
        return;
      }
      // 读取数据
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let data = e.target.result;
        this.upload.loading = false;
        this.form.config["pay.wechat.cert_key"] = data;
      };
    },
    publicChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      this.upload.loading = true;
      let file = e.target.files[0];
      // 文件扩展名检测
      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "crt") {
        this.$message.error("请选择crt文件");
        this.upload.loading = false;
        return;
      }
      // 读取数据
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let data = e.target.result;
        this.upload.loading = false;
        this.form.config["pay.alipay.ali_public_key"] = data;
      };
    },
    rootCertChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      this.upload.loading = true;
      let file = e.target.files[0];
      // 文件扩展名检测
      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "crt") {
        this.$message.error("请选择crt文件");
        this.upload.loading = false;
        return;
      }
      // 读取数据
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let data = e.target.result;
        this.upload.loading = false;
        this.form.config["pay.alipay.alipay_root_cert"] = data;
      };
    },
    certPublicChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      this.upload.loading = true;
      let file = e.target.files[0];
      // 文件扩展名检测
      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "crt") {
        this.$message.error("请选择crt文件");
        this.upload.loading = false;
        return;
      }
      // 读取数据
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let data = e.target.result;
        this.upload.loading = false;
        this.form.config["pay.alipay.app_cert_public_key"] = data;
      };
    },
    privateChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      this.upload.loading = true;
      let file = e.target.files[0];
      // 文件扩展名检测
      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "txt") {
        this.$message.error("请选择txt文件");
        this.upload.loading = false;
        return;
      }
      // 读取数据
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let data = e.target.result;
        this.upload.loading = false;
        this.form.config["pay.alipay.private_key"] = data;
      };
    },
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["支付"];
        for (let index in configData) {
          if (configData[index].key === "meedu.payment.alipay.enabled") {
            this.form.config["meedu.payment.alipay.enabled"] =
              configData[index].value;
          } else if (configData[index].key === "pay.alipay.app_id") {
            this.form.config["pay.alipay.app_id"] = configData[index].value;
          } else if (configData[index].key === "pay.alipay.ali_public_key") {
            this.form.config["pay.alipay.ali_public_key"] =
              configData[index].value;
          } else if (configData[index].key === "pay.alipay.alipay_root_cert") {
            this.form.config["pay.alipay.alipay_root_cert"] =
              configData[index].value;
          } else if (
            configData[index].key === "pay.alipay.app_cert_public_key"
          ) {
            this.form.config["pay.alipay.app_cert_public_key"] =
              configData[index].value;
          } else if (configData[index].key === "pay.alipay.private_key") {
            this.form.config["pay.alipay.private_key"] =
              configData[index].value;
          } else if (configData[index].key === "meedu.payment.wechat.enabled") {
            this.form.config["meedu.payment.wechat.enabled"] =
              configData[index].value;
          } else if (configData[index].key === "pay.wechat.app_id") {
            this.form.config["pay.wechat.app_id"] = configData[index].value;
          } else if (configData[index].key === "pay.wechat.appid") {
            this.form.config["pay.wechat.appid"] = configData[index].value;
          } else if (configData[index].key === "pay.wechat.mch_id") {
            this.form.config["pay.wechat.mch_id"] = configData[index].value;
          } else if (configData[index].key === "pay.wechat.key") {
            this.form.config["pay.wechat.key"] = configData[index].value;
          } else if (
            configData[index].key === "meedu.payment.handPay.enabled"
          ) {
            this.form.config["meedu.payment.handPay.enabled"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.payment.handPay.introduction"
          ) {
            this.form.config["meedu.payment.handPay.introduction"] =
              configData[index].value;
          } else if (configData[index].key === "pay.wechat.cert_key") {
            this.form.config["pay.wechat.cert_key"] = configData[index].value;
          } else if (configData[index].key === "pay.wechat.cert_client") {
            this.form.config["pay.wechat.cert_client"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.payment.wechat-jsapi.enabled"
          ) {
            this.form.config["meedu.payment.wechat-jsapi.enabled"] =
              configData[index].value;
          }
        }

        setTimeout(() => {
          this.loading = false;
          this.renderComponent = false;
          this.$nextTick(() => {
            this.renderComponent = true;
          });
        }, 500);
      });
    },
    save() {
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.$api.System.Config.Save(this.form).then(() => {
        this.$message.success(this.$t("common.success"));
        this.loading = false;

        this.getConfig();
        this.$router.back();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 30px !important;
}
.meedu-main-body {
  width: 100%;
}
.title {
  width: 100%;
  height: 16px;
  border-left: 4px solid #3ca7fa;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: #333333;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
