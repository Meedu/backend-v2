<template>
  <div class="block-box-comp">
    <div class="title">
      <div class="text">
        {{ config.title }}
      </div>
    </div>
    <div class="body">
      <div class="ms-item" v-for="(item, index) in config.items" :key="index">
        <div class="ms-thumb">
          <div class="ms-icon">秒杀中</div>
          <template v-if="item.goods_thumb">
            <thumb-bar
              v-if="item.goods_type === 'book'"
              :value="item.goods_thumb"
              :border="4"
              :width="67.5"
              :height="90"
            ></thumb-bar>
            <thumb-bar
              v-else
              :value="item.goods_thumb"
              :width="120"
              :height="90"
            ></thumb-bar>
          </template>
          <img
            v-else
            src="@/assets/images/decoration/h5/course-back.png"
            width="120"
            height="90"
          />
        </div>

        <div class="ms-body">
          <div class="ms-title">
            {{ item.goods_title }}
          </div>
          <div class="ms-info">
            <div class="ms-sub" v-if="item.goods_type_text">
              {{ item.goods_type_text }}
            </div>
            <div class="ms-original_charge">
              原价:￥{{ item.original_charge || "XX" }}
            </div>
            <div class="ms-charge" v-if="!item.charge">
              <span class="free">免费</span>
            </div>
            <div class="ms-charge" v-else-if="item.charge > 0">
              <span class="unit">￥</span>{{ item.charge }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// config.title 块标题
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.block-box-comp {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 25px 15px;
  background-color: white;

  .title {
    width: 100%;
    height: auto;
    float: left;
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .text {
      flex: 1;
      font-size: 19px;
      font-weight: 600;
      color: #333333;
      line-height: 19px;
    }

    .more {
      font-size: 13px;
      font-weight: 400;
      color: #999999;
      line-height: 13px;
    }
  }

  .body {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;

    .ms-item {
      width: 100%;
      height: auto;
      float: left;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .ms-thumb {
        position: relative;
        width: 120px;
        height: auto;
        border-radius: 4px;
        margin-right: 10px;
        overflow: hidden;
        .ms-icon {
          position: absolute;
          width: 52px;
          height: 22px;
          background: #ff4d4f;
          border-radius: 4px 0px 4px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          right: 0;
          bottom: 0;
          z-index: 100;
        }
        img {
          border-radius: 4px;
        }
      }

      .ms-body {
        flex: 1;
        padding-top: 5px;

        .ms-title {
          width: 100%;
          height: 40px;
          font-size: 15px;
          font-weight: 500;
          color: #171923;
          line-height: 20px;
          float: left;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 15px;
        }

        .ms-info {
          width: 100%;
          height: auto;
          float: left;
          display: flex;
          align-items: center;
          .ms-sub {
            width: auto;
            height: 20px;
            background: rgba(#3ca7fa, 0.1);
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 400;
            padding: 0 5px;
            color: #3ca7fa;
          }
          .ms-original_charge {
            width: auto;
            height: 12px;
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            line-height: 12px;
            margin-left: 10px;
          }

          .ms-charge {
            flex: 1;
            text-align: right;
            color: #ff4d4f;
            font-size: 18px;
            font-weight: 500;
            line-height: 20px;
            .unit {
              font-size: 14px;
              line-height: 20px;
            }
            .free {
              color: #04c877;
            }
          }
        }
      }
    }
  }
}
</style>
