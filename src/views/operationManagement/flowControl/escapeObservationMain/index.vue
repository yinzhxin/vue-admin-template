<template>
  <div class="dashboard-container">
    <el-form
      :inline="true"
      :model="formInline"
      style="display: flex; justify-content: space-between"
    >
      <el-form-item label="选择泳道组">
        <el-select
          v-model="formInline.value2"
          placeholder="请选择"
          style="width: 300px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <i class="el-icon-back toTotalTopo">创建泳道</i>
      </el-form-item>

      <el-form-item label="监控时间">
        <el-time-select
          v-model="formInline.value1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never" class="grid-content">
          <div slot="header">
            <strong>泳道组涉及应用</strong>
            <el-button type="text" style="float: right; padding: 3px 0">
              编辑
            </el-button>
          </div>

          <div style="margin-bottom: 10px">
            上游应用/网关
            <el-tag type="info" class="tag-style"> sc-gateway </el-tag>
          </div>

          <el-input
            placeholder="请输入"
            suffix-icon="el-icon-search"
            style="margin-bottom: 20px"
            v-model="searchValue"
          >
          </el-input>

          <div style="margin-bottom: 10px">
            <el-tag type="info" class="tag-style"> sc-a </el-tag>
            <el-tag type="info" class="tag-style"> sc-b </el-tag>
            <el-tag type="info" class="tag-style"> sc-c </el-tag>
            <el-tag type="info" class="tag-style"> sc-b-red </el-tag>
            <el-tag type="info" class="tag-style"> sc-b-blue </el-tag>
            <el-tag type="info" class="tag-style"> sc-a-blue </el-tag>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'200%'"
            :chartData="chartData2"
            :title="`入口应用监控(总)`"
            :xAxisData="xAxisData"
            :isShowStyle="false"
            :color="['#5470C6', '#91CC75', '#FAC858']"
          />
          <LineChart
            :width="'100%'"
            :height="'200%'"
            :chartData="chartData3"
            :title="`入口应用监控(未打标部分)`"
            :xAxisData="xAxisData"
            :isShowStyle="false"
            :color="['#5470C6', '#91CC75', '#FAC858']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from "@/views/echarts/LineChart.vue";

export default {
  name: "Business1",
  components: { LineChart },
  data() {
    return {
      formInline: {
        value1: "",
        value2: "",
      },

      value: "",
      options: [],

      searchValue: "",

      // 列表和折线图数据
      dbList: [
        {
          title: "TPS / QPS",
          ulData: [
            { title: "数据节点总数", num: "102" },
            { title: "计算节点数", num: "0" },
            { title: "全局事务节点数", num: "0" },
          ],
          chartData: [
            {
              name: "a",
              data: [0, 0, 0, 0, 0, 0, 0],
            },
          ],
        },
        {
          title: "磁盘实用率(%)",
          ulData: [
            { title: "主数据节点数", num: "9" },
            { title: "TPS", num: "0" },
            { title: "活跃连接数", num: "0" },
          ],
          chartData: [
            {
              name: "a",
              data: [2, 2, 2, 2, 2, 2, 2],
            },
          ],
        },
        {
          title: "连接使用率(%)",
          ulData: [
            { title: "全局事务节点数", num: "7" },
            { title: "连接总数", num: "0" },
            { title: "锁超时时间", num: "0.00" },
          ],
          chartData: [
            {
              name: "a",
              data: [20, 22, 30, 32, 20, 22, 30],
            },
          ],
        },
        {
          title: "内存 / CPU使用率(%)",
          ulData: [
            { title: "连接拒绝数", num: "102" },
            { title: "慢Sql超时数量", num: "0" },
            { title: ".", num: "." },
          ],
          chartData: [
            {
              name: "a",
              data: [60, 60, 60, 60, 60, 60, 60],
            },
            {
              name: "b",
              data: [50, 50, 50, 50, 50, 50, 50],
            },
          ],
        },
      ],

      // 列表
      ulList: {
        msgmid: [
          { title: "活动数 / 总数", num: "18/18" },
          { title: "消息堆积量", num: "9.00" },
          { title: "TPS", num: "0.00" },
        ],
        storage: [
          { title: "存储桶数量", num: "2" },
          { title: "对象总数", num: "2124214343" },
          { title: "下载流量", num: "0.00" },
          { title: "上传流量", num: "0.00" },
          { title: "GET类请求次数", num: "78" },
          { title: "PUT类请求次数", num: "0.00" },
        ],
        redis: [
          { title: "活动数 / 总数", num: "18/18" },
          { title: "客户端连接数", num: "2342" },
          { title: "总QPS", num: "2344.55" },
        ],
        center: [
          { title: "集群Leader", num: "√" },
          { title: "指定服务健康检查", num: "3/3" },
        ],
        server: [
          { title: "集群Leader", num: "√" },
          { title: "指定服务健康检查", num: "0/0" },
        ],
      },

      // 折线图横坐标
      xAxisData: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],

      // 折线图数据

      chartData2: [{ name: "a", data: [0, 0, 0.5, 0, 0, 0, 0] }],

      chartData3: [
        {
          name: "a",
          data: [0, 80, 0, 80, 0, 80, 0],
        },
      ],

      chartData4: [
        {
          name: "a",
          data: [3000, 2400, 2200, 3000, 2200, 2000, 2800],
        },
      ],

      chartData5: [
        {
          name: "a",
          data: [0.23, 0.25, 0.22, 0.25, 0.3, 0.24, 0.23],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$bg: #ffffff;
$title-bg: #cde3ed;
$li-underline: #e8e8e8;

.grid-content {
  background: $bg;
  min-height: 400px;
}
.title {
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 0 5px;
  background: $title-bg;
}

/* 横线列表样式 */
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 15px 15px 0;

  li {
    display: flex;
    justify-content: space-between;
    width: 48%;
    border-bottom: 2px solid $li-underline;
    // 上 右 下 左
    padding: 0 10px 10px 0;
    margin: 0 0 20px 15px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  &.ul-style {
    li {
      width: 100%;
      margin-right: 0;
    }
  }
}

.toTotalTopo {
  font-size: 20px;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;
}

.tag-style {
  border-radius: 20px;
  margin-right: 10px;
}
</style>
