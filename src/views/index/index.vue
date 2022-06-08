<template>
  <div class="el_content">
    <div class="el_top_row1">
      <div class="el_row_item">
        <span class="item_title">今日收入</span>
        <p>{{ formatNumber(list.today_paid_sum || 0, 0) }}</p>
        <div class="item_info">
          <span>昨日收入：{{ numberForHuman(list.yesterday_paid_sum) }}</span>
          <span>
            较昨日：
            <strong :class="{ 'c-danger': todayPaidRate < 0 }">
              {{ todayPaidRate }}%
            </strong>
          </span>
        </div>
      </div>
      <div class="el_row_item">
        <span class="item_title">今日付费用户</span>
        <p>{{ list.today_paid_user_num || 0 }}</p>
        <div class="item_info">
          <span>
            昨日付费用户：
            {{ formatNumber(list.yesterday_paid_user_num, 0) }}
          </span>
          <span>
            较昨日：
            <strong :class="{ 'c-danger': todayPaidUserCountRate < 0 }">
              {{ todayPaidUserCountRate }}%
            </strong>
          </span>
        </div>
      </div>
      <div class="el_row_item2">
        <div class="el_item">
          <span>总用户</span>
          <span class="el_item_num flex-1">
            {{ formatNumber(list.user_count, 0) }}
          </span>
          <span class="el_item_increase">
            今日新增：
            <strong :class="{ 'c-danger': userCountIncRate < 0 }">
              {{ userCountIncRate }}%
            </strong>
          </span>
        </div>
        <div class="el_item">
          <span>本月收益</span>
          <span class="el_item_num flex-1">
            {{ formatNumber(list.this_month_paid_sum || 0, 0) }}
          </span>
          <span class="el_item_increase">
            较上月：
            <strong :class="{ 'c-danger': thisMonthPaidRate < 0 }">
              {{ thisMonthPaidRate }}%
            </strong>
          </span>
        </div>
      </div>
    </div>
    <div style="display: none">
      <img src="https://addons.meedu.vip/api/v1/stat?v=v4.6" />
    </div>
    <div class="el_top_row2" v-if="user">
      <div class="tit">{{ $t("index.quick_acsess") }}</div>
      <a
        v-if="checkPermission('course')"
        @click="
          $router.push({
            name: 'Vod',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/demand.png" />
        <span>{{ $t("index.demand_course") }}</span>
      </a>
      <a
        v-if="
          enabledAddons['Zhibo'] && checkPermission('addons.Zhibo.course.list')
        "
        @click="
          $router.push({
            name: 'LiveCourse',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/live.png" />
        <span>{{ $t("index.live_course") }}</span>
      </a>
      <a
        v-if="
          enabledAddons['MeeduTopics'] &&
          checkPermission('addons.meedu_topics.topic.list')
        "
        @click="
          $router.push({
            name: 'Topic',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/tuwen.png" />
        <span>{{ $t("index.graphic_course") }}</span>
      </a>
      <a
        v-if="
          enabledAddons['MeeduBooks'] &&
          checkPermission('addons.meedu_books.book.list')
        "
        @click="
          $router.push({
            name: 'Meedubook',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/ebook.png" />
        <span>{{ $t("index.ebook") }}</span>
      </a>
      <a
        v-if="
          enabledAddons['LearningPaths'] &&
          checkPermission('addons.learnPaths.path.list')
        "
        @click="
          $router.push({
            name: 'LearningPath',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/course.png" />
        <span>学习路径</span>
      </a>
      <a
        v-if="
          enabledAddons['Paper'] && checkPermission('addons.Paper.paper.list')
        "
        @click="
          $router.push({
            name: 'ExamPaper',
          })
        "
        class="el_row2_item"
      >
        <img src="../../assets/home/testpaper.png" />
        <span>{{ $t("index.testpaper") }}</span>
      </a>
    </div>
    <div class="el_top_row3">
      <div class="tit">{{ $t("index.statistical_analysis") }}</div>
      <div class="selchartbox">
        <el-button
          style="margin-right: 30px"
          :type="flagE === index + 1 ? 'primary' : ''"
          v-for="(item, index) in navList"
          :key="item.id"
          @click="handleClickBtnE(index)"
          >{{ item.name }}</el-button
        >
      </div>
      <div class="selcharttimebox">
        <el-date-picker
          v-model="time"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          :start-placeholder="$t('index.start_time')"
          :end-placeholder="$t('index.end_time')"
          :picker-options="pickerOptions"
        />
        <el-button class="ml-10" @click="getchartsdata()" type="primary" plain>
          筛选
        </el-button>
      </div>
      <el-col class="formbox">
        <div
          id="chartLine"
          style="
            width: 100%;
            height: 252px;
            margin-left: -30px;
            margin-bottom: 20px;
          "
        ></div>
      </el-col>
    </div>
    <div class="copyright">
      <p class="mb-10">Powered By MeEdu</p>
      <p class="info">
        <span>PHP{{ systemInfo.php_version }} </span>
        <span class="mx-10">主程序{{ systemInfo.meedu_version }}</span>
        <span>后管v4.6.4</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const accounting = require("accounting");

export default {
  data() {
    return {
      list: [],
      navList: [
        { name: "每日注册用户" },
        { name: "每日创建订单" },
        { name: "每日已支付订单" },
        { name: "每日营收" },
      ],
      flagE: 1,
      time: "",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        },
      },
      start_at: 0,
      end_at:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      systemInfo: {
        laravel_version: null,
        meedu_version: null,
        php_version: null,
      },
    };
  },
  computed: {
    ...mapState(["enabledAddons", "user"]),
    todayPaidRate() {
      return this.sumrate(
        this.list.today_paid_sum,
        this.list.yesterday_paid_sum
      );
    },
    todayPaidUserCountRate() {
      return this.sumrate(
        this.list.today_paid_user_num,
        this.list.yesterday_paid_user_num
      );
    },
    userCountIncRate() {
      if (
        typeof this.list.today_register_user_count === "undefined" ||
        typeof this.list.user_count === "undefined" ||
        isNaN(this.list.today_register_user_count) ||
        isNaN(this.list.user_count) ||
        this.list.user_count === 0
      ) {
        return 0;
      }
      return (
        parseInt(
          (this.list.today_register_user_count / this.list.user_count).toFixed(
            3
          ) * 10000
        ) / 100
      );
    },
    thisMonthPaidRate() {
      return this.sumrate(
        this.list.this_month_paid_sum,
        this.list.last_month_paid_sum
      );
    },
  },
  mounted() {
    document.title = "MeEdu后台管理";
    this.getStatData();
    this.fun_date(-7);
    this.getZXTdata();
    this.getSystemInfo();
    this.getEnabledAddons();
  },
  methods: {
    ...mapMutations(["setEnabledAddons"]),
    checkPermission(val) {
      return typeof this.user.permissions[val] !== "undefined";
    },
    formatNumber(num, fixed) {
      return accounting.formatNumber(num, fixed);
    },
    getStatData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Dashboard.Index().then((res) => {
        this.loading = false;
        this.list = res.data;
      });
    },
    getSystemInfo() {
      this.$api.Dashboard.SystemInfo().then((res) => {
        this.systemInfo.laravel_version = res.data.laravel_version;
        this.systemInfo.meedu_version = res.data.meedu_version;
        this.systemInfo.php_version = res.data.php_version;
      });
    },
    sumrate(num1, num2) {
      if (typeof num1 !== "number" || typeof num2 !== "number") {
        return 0;
      }
      if (num1 === 0) {
        // 今天未有增长
        return 0;
      }
      if (num2 === 0) {
        // 昨天无增长，今天有增长 => 100%
        return 100;
      }

      return parseInt(((num1 - num2) / num2).toFixed(2) * 10000) / 100;
    },
    fun_date(aa) {
      let date1 = new Date();
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() + aa);
      let time2 =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate();
      this.start_at = time2;
    },
    getchartsdata() {
      if (this.time != "") {
        let timedata = this.time.slice(",");
        this.start_at = timedata[0];
        this.end_at = timedata[1];
      }
      this.getZXTdata();
    },
    handleClickBtnE(index) {
      this.flagE = index + 1;
      this.getZXTdata();
    },
    getZXTdata() {
      this.loading = true;
      var uid = "userRegister";
      if (this.flagE == 2) {
        uid = "orderCreated";
      } else if (this.flagE == 3) {
        uid = "orderPaidCount";
      } else if (this.flagE == 4) {
        uid = "orderPaidSum";
      } else {
        uid = "userRegister";
      }
      let databox = {
        start_at: this.start_at,
        end_at: this.end_at,
      };
      this.$api.Stat.Statistic(uid, databox).then((resp) => {
        this.drawLineChart(resp.data.dataset, resp.data.labels);
        this.loading = false;
      });
    },
    drawLineChart(val, xset) {
      const echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("chartLine"));
      var yset = this.$t("index.new_registered_users");
      if (this.flagE == 2) {
        yset = this.$t("index.daily_order_creation");
      } else if (this.flagE == 3) {
        yset = this.$t("index.daily_order_payment");
      } else if (this.flagE == 4) {
        yset = this.$t("index.total_dailypayment_orders");
      } else {
        yset = this.$t("index.new_registered_users");
      }
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [yset],
          x: "right",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xset,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: yset,
            type: "line",
            // 设置折线图颜色
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4876FF",
                },
              },
            },
            stack: "总量",
            data: val,
          },
        ],
      });
    },
    getEnabledAddons() {
      // 获取已开启的插件
      this.$api.System.Addons.LocalList().then((res) => {
        let enabledAddons = {};
        let count = 0;

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].enabled) {
            count += 1;
            enabledAddons[res.data[i].sign] = 1;
          }
        }

        this.setEnabledAddons(enabledAddons, count);
      });
    },
    numberForHuman(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(2) + "亿";
      } else if (num >= 10000000) {
        return (num / 10000000).toFixed(2) + "千万";
      } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "百万";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(2) + "万";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + "千";
      }
      return num;
    },
  },
};
</script>
<style lang="less" scoped>
.el_content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .el_top_row1 {
    width: 100%;
    height: 204px !important;
    display: flex;
    flex-direction: row;
    position: relative;
    .el_row_item {
      width: 32.5%;
      height: 204px !important;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
      border-radius: 8px;
      margin-right: 20px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      .item_title {
        width: 100%;
        padding-left: 10px;
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        margin-bottom: 40px;
        line-height: 16px;
      }
      p {
        width: 100%;
        padding-left: 10px;
        height: 36px;
        font-size: 36px;

        font-weight: 600;
        color: #333333;
        line-height: 36px;
      }
      .item_info {
        margin-top: 30px;
        width: 100%;
        min-height: 42px;
        background: #f1f2f9;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        span {
          width: 50%;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
          strong {
            color: #3ca7fa;
          }
        }
      }
    }
    .el_row_item2 {
      width: 32.6%;
      height: 204px !important;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      .el_item {
        width: 100%;
        height: 92px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
        border-radius: 8px;
        padding-left: 30px;
        padding-right: 30px;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          width: 70px;
          display: block;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
          strong {
            color: #3ca7fa;
          }
        }
        .el_item_num {
          margin-left: 15px;
          width: auto;
          height: 36px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 36px;
          text-align: left;
        }
        .el_item_increase {
          width: auto;
        }
      }
      .el_item:last-of-type {
        margin-bottom: 0px;
      }
    }
  }
  .el_top_row2 {
    width: 100%;
    height: 262px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
    border-radius: 8px;
    margin-top: 20px;
    padding: 66px 100px 30px 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    a {
      cursor: pointer;
    }
    .tit {
      position: absolute;
      height: 16px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
      top: 30px;
      left: 30px;
    }

    .el_row2_item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 80px;
      height: 116px;
      img {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
      }
      span {
        width: 80px;
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 16px;
        text-align: center;
      }
    }
  }
  .el_top_row3 {
    width: 100%;
    height: 558px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
    border-radius: 8px;
    margin-top: 20px;
    padding: 76px 30px 0px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    .tit {
      position: absolute;
      height: 16px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
      top: 30px;
      left: 30px;
    }
    .selchartbox {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }
    .selcharttimebox {
      margin-top: 50px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }
  }
  .copyright {
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 50px;
    font-size: 16px;
    font-weight: 300;
    color: #999999;
    padding-bottom: 30px;
    line-height: 16px;
    padding-bottom: 15px;

    .info {
      font-size: 12px;
    }
  }
}

.c-danger {
  color: #ff5858 !important;
}
</style>
