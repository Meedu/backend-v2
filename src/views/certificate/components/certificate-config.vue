<template>
  <div class="config-index-box" v-if="block">
    <div class="config" v-if="block.sign === 'text-v1'">
      <div class="title">
        <div class="text">文本</div>
      </div>
      <div class="config-item" v-if="block.config">
        <div class="config-item-body">
          <div class="float-left">
            <div class="w-100 form-label mb-15">文字内容</div>
            <div class="w-100 float-left import-box">
              <div class="label-item mr-10 mb-8">插入变量：</div>
              <div
                class="import-item mr-10 mb-8"
                @click="addNick"
                type="primary"
              >
                用户名
              </div>
              <div
                class="import-item mr-10 mb-8"
                @click="addMobile"
                type="primary"
              >
                手机号
              </div>
              <div class="import-item mr-10 mb-8" @click="addNo" type="primary">
                证书编号
              </div>
              <div
                class="import-item mr-10 mb-8"
                @click="addRealname"
                type="primary"
              >
                真实姓名
              </div>
              <div
                class="import-item mr-10 mb-8"
                @click="addIdno"
                type="primary"
              >
                身份证号
              </div>
              <div
                class="import-item mr-10 mb-8"
                @click="addAge"
                type="primary"
              >
                年龄
              </div>
              <div
                class="import-item mr-10 mb-8"
                @click="addGender"
                type="primary"
              >
                性别
              </div>
            </div>
            <div class="float-left d-flex">
              <el-input
                class="w-100"
                type="textarea"
                rows="4"
                resize="none"
                placeholder="此处填写文字内容"
                v-model="block.config.text"
              ></el-input>
            </div>
          </div>
        </div>
        <!--<div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">字体</div>
            <div class="flex-1 ml-15">
              <el-select class="w-100" v-model="block.config.font">
                <el-option label="默认" value="default"> </el-option>
              </el-select>
            </div>
          </div>
        </div>-->
        <div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">大小</div>
            <div class="flex-1 ml-15">
              <el-input
                class="w-100"
                type="number"
                v-model="block.config.size"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">颜色</div>
            <div class="flex-1 ml-15">
              <el-color-picker
                class="w-100"
                v-model="block.config.color"
              ></el-color-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="config" v-else-if="block.sign === 'image-v1'">
      <div class="title">
        <div class="text">图片</div>
      </div>
      <div class="config-item" v-if="block.config">
        <div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">宽度</div>
            <div class="flex-1 ml-15">
              <el-input
                class="w-100"
                type="number"
                v-model="block.config.width"
                disabled
              ></el-input>
            </div>
          </div>
        </div>
        <div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">高度</div>
            <div class="flex-1 ml-15">
              <el-input
                class="w-100"
                type="number"
                disabled
                v-model="block.config.height"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="config-item-body">
          <div class="float-left d-flex">
            <el-button @click="showUploadImage = true">上传图片</el-button>
          </div>
          <div class="float-left d-flex w-100 mt-15">
            <img class="pre-icon" :src="block.config.url" />
          </div>
        </div>
      </div>
    </div>
    <div class="config" v-else-if="block.sign === 'qrcode-v1'">
      <div class="title">
        <div class="text">证书二维码</div>
      </div>
      <div class="config-item" v-if="block.config">
        <div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">宽度</div>
            <div class="flex-1 ml-15">
              <el-input
                class="w-100"
                type="number"
                disabled
                v-model="block.config.width"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="config-item-body">
          <div class="float-left d-flex">
            <div class="form-label">高度</div>
            <div class="flex-1 ml-15">
              <el-input
                class="w-100"
                type="number"
                disabled
                v-model="block.config.height"
              ></el-input>
            </div>
          </div>
        </div>
        <!--<div class="config-item-body">
          <div class="float-left">
            <div class="w-100 form-label mb-15">网址</div>
            <div class="w-100 float-left import-box">
              <div class="label-item mr-10 mb-8">插入变量：</div>
              <div
                class="import-item mr-10 mb-8"
                @click="addMobile"
                type="primary"
              >
                手机号
              </div>
              <div class="import-item mr-10 mb-8" @click="addNo" type="primary">
                证书编号
              </div>
              <div
                class="import-item mr-10 mb-8"
                @click="addIdno"
                type="primary"
              >
                身份证号
              </div>
            </div>
            <div class="float-left d-flex mb-15">
              <el-input
                class="w-100"
                type="textarea"
                rows="4"
                resize="none"
                placeholder="支持填写URL或引用变量信息"
                v-model="block.config.text"
              ></el-input>
            </div>
            <div class="float-left d-flexx">
              <helper-text
                text="二维码网址仅支持英文、数字和符号。"
              ></helper-text>
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <select-image
      :show="showUploadImage"
      :from="1"
      @close="showUploadImage = false"
      @selected="uploadImage"
    ></select-image>
  </div>
</template>
<script>
import SelectImage from "@/components/select-image";
export default {
  props: ["block", "index"],
  components: {
    SelectImage,
  },
  data() {
    return {
      loading: false,
      status: false,
      showUploadImage: false,
    };
  },
  watch: {
    showUploadImage() {
      this.$emit("change", this.showUploadImage);
    },
  },
  mounted() {},
  methods: {
    addNick() {
      this.block.config.text += "${user.nick_name}";
    },
    addMobile() {
      this.block.config.text += "${user.mobile}";
    },
    addNo() {
      this.block.config.text += "${cert.no}";
    },
    addRealname() {
      this.block.config.text += "${profile.real_name}";
    },
    addIdno() {
      this.block.config.text += "${profile.id_number}";
    },
    addAge() {
      this.block.config.text += "${profile.age}";
    },
    addGender() {
      this.block.config.text += "${profile.gender}";
    },
    uploadImage(src) {
      if (this.block.sign === "image-v1") {
        this.block.config.url = src;
        this.showUploadImage = false;
      }
    },
    update() {
      this.$emit("update", this.index, this.block.sign, this.block.config);
    },
    createQrcode() {
      this.status = !this.status;
      this.$emit("create", this.status);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-textarea__inner {
  border-radius: 0 0 4px 4px;
}
.pre-icon {
  max-width: 100%;
}
.import-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 15px 0px 15px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 4px 4px 0 0;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  .label-item {
    color: #666666;
  }
  .import-item {
    cursor: pointer;
    color: #3ca7fa;
    :hover {
      opacity: 0.8;
    }
  }
}
.config-index-box {
  width: 100%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  padding: 30px;
  position: relative;

  .title {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    border-left: 5px solid #3ca7fa;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    margin-bottom: 30px;
  }
  .config-item {
    width: 100%;
    height: auto;
    float: left;

    .config-item-body {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      padding-top: 15px;
      padding-bottom: 15px;

      .form-label {
        width: 64px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
      }

      .courses-list-box {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, minmax(0, 1fr));

        .course-item {
          position: relative;
          cursor: pointer;

          img {
            border-radius: 4px;
          }

          .default-box {
            border-radius: 4px;
            width: 78px;
            height: 58px;
            border: 1px dashed #dcdfe6;
            font-size: 12px;
            color: #3ca7fa;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .btn-del {
            position: absolute;
            top: -17px;
            right: -17px;
          }
        }
      }
    }
  }
}
</style>
