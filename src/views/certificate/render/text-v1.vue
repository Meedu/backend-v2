<template>
  <vue-drag-resize
    :key="current"
    @clicked="change"
    ref="dragitem"
    w="auto"
    h="auto"
    :x="x"
    :y="y"
    :isResizable="false"
    @dragging="onDrag"
    :parentLimitation="true"
    :isActive="isActive"
  >
    <div
      class="text"
      :style="{
        'font-size': size * config.size + 'px',
        color: config.color,
      }"
    >
      {{ config.text }}
    </div>
    <div
      class="item-options"
      :style="{
        top: '-2px',
        right: '-38px',
      }"
    >
      <div class="btn-item" @click="blockDestroy()" v-if="isActive">
        <i class="el-icon-delete-solid"></i>
      </div>
    </div>
  </vue-drag-resize>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export default {
  components: {
    VueDragResize,
  },
  props: ["config", "current", "status", "maxw", "size"],
  data() {
    return {};
  },
  watch: {
    "config.text"() {
      this.$emit("fresh", true);
    },
  },
  computed: {
    x() {
      return this.size * this.config.x;
    },
    y() {
      return this.size * this.config.y;
    },
    isActive() {
      return this.status === this.current;
    },
  },
  mounted() {},
  methods: {
    change() {
      this.$emit("change", this.current);
    },
    onDrag(e) {
      const moveX = e.left / this.size;
      const moveY = e.top / this.size;
      this.$emit("dragend", "text-v1", this.current, moveX, moveY);
    },
    blockDestroy() {
      this.$confirm("确认删除？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("del", this.current);
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
<style lang="less" scoped>
.text {
  width: auto;
  height: auto;
  display: flex;
  cursor: pointer;
}
.text-v1-box {
  width: 100%;
  height: 100%;
}
.item-options {
  position: absolute;
  width: auto;
  height: 36px;
  cursor: pointer;

  .btn-item {
    color: white;
    background-color: @primary-color;
    width: 36px;
    height: 36px;
    float: left;
    text-align: center;
    line-height: 36px;

    &:hover {
      background-color: rgba(@primary-color, 0.8);
    }

    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    &:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
}
</style>
