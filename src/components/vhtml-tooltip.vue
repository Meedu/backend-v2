<template>
  <el-tooltip
    class="cursor-pointer"
    effect="light"
    placement="top"
    popper-class="tip-class"
  >
    <div>{{ title }}</div>
    <div slot="content">
      <div v-html="label"></div>
    </div>
  </el-tooltip>
</template>
<script>
export default {
  props: ["label"],
  computed: {
    title() {
      if (!this.label) {
        return "";
      }
      let value = this.removeHtmlStyle(this.label);
      if (value.length > 7 && window.innerWidth >= 1700) {
        return value.slice(0, 7) + "...";
      } else if (value.length > 6 && window.innerWidth >= 1600) {
        return value.slice(0, 6) + "...";
      } else if (value.length > 4 && window.innerWidth < 1600) {
        return value.slice(0, 4) + "...";
      }
      return value;
    },
  },
  mounted() {},
  methods: {
    removeHtmlStyle(html) {
      let relStyle = /style\s*?=\s*?([‘"])[\s\S]*?\1/g; //去除样式
      let relTag = /<.+?>/g; //去除标签
      let relClass = /class\s*?=\s*?([‘"])[\s\S]*?\1/g; // 清除类名
      let newHtml = "";
      if (html) {
        newHtml = html.replace(relStyle, "");
        newHtml = newHtml.replace(relTag, "");
        newHtml = newHtml.replace(relClass, "");
      }
      return newHtml;
    },
  },
};
</script>
<style lang="less" scoped>
.cursor-pointer {
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
