<template>
  <div
    :style="{
      color: result,
    }"
    v-if="type === 'time'"
  >
    <duration-text :duration="value"></duration-text>
  </div>
  <span
    :style="{
      color: result,
    }"
    v-else
    >{{ value }}</span
  >
</template>

<script>
import DurationText from "@/components/duration-text";
export default {
  components: {
    DurationText,
  },
  props: ["value", "total", "type"],
  data() {
    return {
      result: "rgba(4,200,119,0.2)",
    };
  },
  mounted() {
    if (this.total > 0) {
      let opacity = this.value / this.total;
      if (opacity === 0) {
        this.result = "rgba(4,200,119,0.2)";
      } else {
        if (opacity > 0.1) {
          this.result = "rgba(4,200,119," + opacity.toFixed(2) + ")";
        }
      }
    }
  },
};
</script>
