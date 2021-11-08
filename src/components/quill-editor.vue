<template>
  <div class="quill-editor-box">
    <div
      ref="myQuillEditor"
      class="quill-editor"
      :style="{ height: (height || 'auto') + 'px' }"
    >
      <slot name="toolbar"></slot>
      <div ref="editor"></div>
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
import _Quill from "quill";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import debounce from "lodash/debounce";

import SelectImage from "@/components/select-image";

export default {
  components: {
    SelectImage,
  },
  props: ["value", "height"],
  data() {
    return {
      quill: null,
      showUploadImage: false,
      editorIndex: 0,
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"],
          ],
        },
        placeholder: "请输入内容...",
        readOnly: false,
      },
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    init() {
      this.quill = new _Quill(this.$refs["myQuillEditor"], this.editorOption);

      // 初始值
      this.quill.pasteHTML(this.value || "");

      // 自定义imageHandler
      this.quill.getModule("toolbar").addHandler("image", () => {
        this.showUploadImage = true;
      });

      // 监听记录Index
      this.quill.on("selection-change", (range, oldRange) => {
        if (oldRange === null || oldRange.index === 0) {
          this.editorIndex = this.quill.getLength();
        } else {
          this.editorIndex = oldRange.index;
        }
        console.log(this.editorIndex);
      });

      // 值变化
      this.quill.on(
        "text-change",
        debounce(() => {
           let html = this.$refs.myQuillEditor.children[0].innerHTML
          if (html === "<p><br></p>") {
            html = "";
          }
          this.onEditorChange(html);
        }, 400)
      );
    },
    onEditorChange(val) {
      this.$emit("input", val);
    },
    uploadImage(imgUrl) {
      this.quill.insertEmbed(this.editorIndex, "image", imgUrl);
      this.showUploadImage = false;
    },
  },
};
</script>

<style lang="less" scoped>
.quill-editor-box {
  width: 100%;
  height: auto;
  float: left;
}
</style>

<style lang="less">
.quill-editor-box {
  .ql-picker-label::before {
    position: absolute;
  }
  .ql-picker-label {
    svg {
      display: block;
    }
  }
}
</style>