<template>
  <el-card>
    <div class="main-top">
      <div class="flex-between margin-bottom20">
        <div style="font-weight: 700">归因分析服务</div>
        <el-button type="danger" size="mini">回滚</el-button>
      </div>
      <el-descriptions>
        <el-descriptions-item
          v-for="item in desc"
          :key="item.label"
          :label="item.label"
        >
          <div v-if="item.label == '变更流程ID' || item.label == '发布人'">
            <span class="text-color">{{ item.value }}</span>
          </div>
          <div v-else>
            {{ item.value }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="main-bot">
      <el-tabs type="border-card">
        <el-tab-pane label="灰度变更">
          <div class="flex-between margin-bottom">
            <div>
              发布开始时间： 2022-4-2918:33:21 发布结束时间： 2022-4-29 18:33:21
            </div>
            <el-button size="mini" type="danger">开始下一批</el-button>
          </div>
          <el-steps
            style="padding-left: 30%"
            :space="400"
            :active="1"
            finish-status="success"
          >
            <el-step title="流程开始"></el-step>
            <el-step title="部署应用"></el-step>
            <el-step title="流程结束"></el-step>
          </el-steps>
          <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title"> 应用指标 </template>
              <div id="echartsbox" style="padding: 0px 30px">
                <div class="flex-box">
                  <line-chart
                    height="300px"
                    width="50%"
                    :chartData="chartData1"
                    title="总请求数-新老版本对比"
                  />
                  <bar-chart
                    height="300px"
                    width="50%"
                    :chartData="chartData2"
                    title="请求比例-新老版本对比"
                  />
                </div>
                <div class="flex-box">
                  <line-chart
                    height="300px"
                    width="33%"
                    :chartData="chartData1"
                    title="平均错误数-新老版本对比"
                  />
                  <line-chart
                    height="300px"
                    width="33%"
                    :chartData="chartData1"
                    title="响应时间-新老版本对比"
                  />
                  <line-chart
                    height="300px"
                    width="33%"
                    :chartData="chartData1"
                    title="单机请求数-新老版本对比"
                  />
                </div>
                <div class="flex-box margin-bottom20">
                  <div class="margin-right">选择接口</div>
                  <el-input
                    v-model="value"
                    style="width: 300px"
                    size="small"
                  ></el-input>
                </div>
                <div class="flex-box">
                  <line-chart
                    height="300px"
                    width="33%"
                    :chartData="chartData1"
                    title="平均错误数-新老版本对比"
                  />
                  <line-chart
                    height="300px"
                    width="33%"
                    :chartData="chartData1"
                    title="响应时间-新老版本对比"
                  />
                  <line-chart
                    height="300px"
                    width="33%"
                    :chartData="chartData1"
                    title="单机请求数-新老版本对比"
                  />
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <span> 应用异常</span>
              </template>
              <div></div>
              <div></div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title"> 系统指标 </template>
              <el-table
                header-row-class-name="headerStyle"
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div style="padding: 0 80px">
                      <el-table
                        :data="tableData"
                        style="width: 100%"
                        header-row-class-name="headerStyle"
                      >
                        <el-table-column label="Pod信息" prop="podInfo">
                        </el-table-column>
                        <el-table-column label="Pod名称" prop="podName">
                        </el-table-column>
                        <el-table-column label="状态" prop="podStatus">
                          <template slot-scope="scope">
                            <i class="el-icon-success success"></i>
                            <span>执行成功</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="任务名称" prop="name">
                </el-table-column>
                <el-table-column label="状态" prop="status">
                  <template slot-scope="scope">
                    <i class="el-icon-success success"></i>
                    <span>执行成功</span>
                  </template>
                </el-table-column>
                <el-table-column label="信息" prop="info"> </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="灰度后第一批变更">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import LineChart from "@/components/Chart/LineChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";

export default {
  name: "",
  components: { LineChart, BarChart },
  props: {},
  data() {
    return {
      width: "",
      activeNames: "1",
      desc: [
        {
          label: "变更流程ID",
          value: "IDxSlwkdS83SlaAEIS",
        },
        {
          label: "分布分批数",
          value: 2,
        },
        {
          label: "分批处理方式",
          value: "自动分批间隔5分钟",
        },
        {
          label: "执行状态",
          value: "执行中",
        },
        {
          label: "发布人",
          value: "王东东",
        },
        {
          label: "发布时间",
          value: "2022-4-29 18:33:21",
        },
        {
          label: "描述信息",
          value: "版本：2022-4-29 18:33:211包名 xxxx.jar",
        },
        {
          label: "変更类型",
          value: "部署座用",
        },
      ],
      chartData1: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "老版本",
            data: [12, 32, 10, 14, 8, 20, 10],
          },
          {
            name: "新版本",
            data: [10, 32, 10, 24, 20, 30, 21],
          },
        ],
      },
      chartData2: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "老版本",
            data: [12, 32, 10, 14, 8, 20, 10],
          },
          {
            name: "新版本",
            data: [10, 32, 10, 24, 20, 30, 21],
          },
        ],
      },
      value: "/Calculate/",
      tableData: [
        {
          name: "部署应用",
          status: true,
          info: "",
          podInfo: "",
          podName: "Demo-group-1-2-554dds829c3-hmqql",
          podStatus: "10333",
        },
      ],
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main-top {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
