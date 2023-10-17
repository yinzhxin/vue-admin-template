<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-button>全部折叠/展开</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.spendTime" placeholder="">
          <el-option label="响应时间" value="spendTime"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.name"
          placeholder="请输入应用名称或接口名称"
          style="width: 280px"
        >
        </el-input>
      </el-form-item>
      <el-form-item> 搜索结果数量：1 </el-form-item>
    </el-form>

    <el-alert
      title="consumer-k8s"
      type="info"
      effect="light"
      :closable="false"
    />

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'33%'"
        :height="'280px'"
        :title="title1"
        :chartData="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'33%'"
        :height="'280px'"
        :title="title2"
        :chartData="chartData2.data"
        :xAxisData="chartData2.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'33%'"
        :height="'280px'"
        :title="title3"
        :chartData="chartData3.data"
        :xAxisData="chartData3.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>
  </div>
</template>

<script>
import Table from "@/views/components/Table.vue";
import LineChart from "@/views/echarts/LineChart.vue";

export default {
  name: "",
  components: { Table, LineChart },
  data() {
    return {
      formInline: {
        spendTime: "spendTime",
        name: "",
      },

      // 图表工具栏
      toolbox: {
        feature: {
          dataZoom: {
            show: true, // 显示数据区域缩放工具
            title: {
              zoom: "区域缩放",
              back: "区域缩放还原",
            },
          },
        },
      },
      // 主题颜色
      color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42"],

      // 图表图例
      legend: {
        top: 20,
        // left: 40,
        // right: "50%",
      },

      // 图表数据
      title1: "响应时间",
      chartData1: {
        data: [
          {
            data: [0, 0, 1.2, 0],
            name: "响应时间",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title2: "请求数",
      chartData2: {
        data: [
          {
            data: [0, 1, 0, 0],
            name: "请求数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title3: "错误数",
      chartData3: {
        data: [
          {
            data: [0, 0, 0, 0],
            name: "错误数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },
    };
  },

  methods: {},
};
</script>
