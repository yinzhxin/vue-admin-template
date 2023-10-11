<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="24" style="display: flex; align-items: center">
        <!-- Provider-demo -->
        <h2 style="margin: 0">Provider-demo</h2>
        <!-- 问号 -->
        <el-tooltip effect="dark" placement="top" style="margin: 0 10px">
          <template slot="content">
            <div style="max-width: 350px">Provider-demo</div>
          </template>
          <i class="el-icon-question" style="font-size: 25px" />
        </el-tooltip>
        <!-- t -->
        <el-button style="font-size: 15px" type="text">{{ text }}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="nerver">
          <!-- 头部 -->
          <div slot="header" class="box-card-header">
            <el-tooltip effect="dark" placement="top" style="">
              <template slot="content">
                <div style="max-width: 350px">Provider-demo</div>
              </template>
              <i class="el-icon-question" style="font-size: 18px" />
            </el-tooltip>
            <div>
              <span>响应时间/请求数/错误数/异常数</span>
              <i class="el-icon-s-fold"></i>
            </div>
          </div>
          <!-- 内容 -->
          <el-select v-model="value" placeholder="请选择" class="selectbox">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <h3>Provider-demo</h3>

          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span
                    style="
                      display: inline-block;
                      width: 10px;
                      height: 10px;
                      border-radius: 50%;
                      background-color: green;
                      margin-right: 5px;
                    "
                  ></span>

                  <span>{{ item.name }}</span>
                </div>
                <div style="color: #9e9e9e; font-size: 14px">
                  <el-tag style="margin-right: 5px">az1-xs-b</el-tag>
                  <el-tag>ecs.b</el-tag>
                </div>
              </div>

              <div>5ms / 1 / 1 / 0</div>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="18">
        <!-- <el-card class="box-card" shadow="hover"> -->
        <!-- <div slot="header">
            <strong>Endpoint</strong>
          </div> -->
        <el-tabs type="border-card">
          <el-tab-pane label="概览">
            <div style="display: flex">
              <LineChart
                :width="'50%'"
                :height="'300px'"
                :title="title3"
                :chartData="chartData3.data"
                :xAxisData="chartData3.xAxisData"
                :color="chartData3.color"
              />
              <LineChart
                :width="'50%'"
                :height="'300px'"
                :title="title3"
                :chartData="chartData3.data"
                :xAxisData="chartData3.xAxisData"
                :color="chartData3.color"
              />
            </div>

            <div style="display: flex">
              <LineChart
                :width="'50%'"
                :height="'300px'"
                :title="title3"
                :chartData="chartData3.data"
                :xAxisData="chartData3.xAxisData"
                :color="chartData3.color"
              />
              <LineChart
                :width="'50%'"
                :height="'300px'"
                :title="title3"
                :chartData="chartData3.data"
                :xAxisData="chartData3.xAxisData"
                :color="chartData3.color"
              />
            </div>
          </el-tab-pane>

          <el-tab-pane label="JVM监控">JVM监控</el-tab-pane>
          <el-tab-pane label="主机监控">主机监控</el-tab-pane>
          <el-tab-pane label="Pod监控">定时任务补偿</el-tab-pane>
          <el-tab-pane label="SQL调用分析">定时任务补偿</el-tab-pane>
          <el-tab-pane label="NoSQL调用分析">定时任务补偿</el-tab-pane>
          <el-tab-pane label="异常分析">定时任务补偿</el-tab-pane>
          <el-tab-pane label="错误分析">定时任务补偿</el-tab-pane>
          <el-tab-pane label="上游应用">定时任务补偿</el-tab-pane>
          <el-tab-pane label="下游应用">定时任务补偿</el-tab-pane>
          <el-tab-pane label="接口快照">定时任务补偿</el-tab-pane>
          <el-tab-pane label="日志">定时任务补偿</el-tab-pane>
        </el-tabs>
        <!-- </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  name: "InstanceMonitor",
  components: { LineChart },
  data() {
    return {
      text: "概览",
      data3: [
        {
          name: "provider-demo-group-1",
          module: "UPM",
        },
        {
          name: "provider-demo-group-2",
          module: "UPM",
        },
        {
          name: "provider-demo-group-3",
          module: "UPM",
        },
        {
          name: "provider-demo-group-4",
          module: "UPM",
        },
        {
          name: "provider-demo-group-5",
          module: "UPM",
        },
      ],

      responseOptions: [
        { label: "P50", value: "50" },
        { label: "P75", value: "75" },
        { label: "P90", value: "90" },
        { label: "P95", value: "95" },
        { label: "P99", value: "99" },
      ],

      responseValue: "50",

      // 所属应用
      appOption: [
        { label: "app1", value: "app1" },
        { label: "app2", value: "app2" },
        { label: "app3", value: "app3" },
        { label: "app4", value: "app4" },
        { label: "app5", value: "app5" },
      ],

      // 所属服务
      serviceOption: [
        { label: "service1", value: "service1" },
        { label: "service2", value: "service2" },
        { label: "service3", value: "service3" },
        { label: "service4", value: "service4" },
        { label: "service5", value: "service5" },
      ],
      title: "SQL 执行数",
      title2: "SQL 执行错误数",
      title3: "SQL 执行平均耗时",
      radio: "卡片",
      form: {
        sort: "告警加权值",
      },
      typeList: [],
      instanceList: [],
      // 表格数据
      table: {
        tableData: [],
        columns: [
          {
            label: "Endpoint 名称",
            index: "endpoint",
            render(h, data) {
              return (
                <div style="cursor:pointer">
                  {data.row.status == "0" ? (
                    <span style="display: inline-block; width:2px; height:25px; background-color:#f56c6c; vertical-align:middle; margin-right:5px"></span>
                  ) : (
                    <span> </span>
                  )}
                  {data.row.endpoint}
                </div>
              );
            },
            width: "300px",
          },
          { label: "所属服务", index: "server" },
          { label: "所属应用", index: "appName" },
          {
            label: "状态",
            index: "status",
            render: (h, data) => {
              return (
                <div>
                  {data.row.status == "1" ? (
                    <span style="font-size:16px">
                      <i class="el-icon-success" style="color:#67C23A" />
                      <span />
                      成功
                    </span>
                  ) : (
                    <span style="font-size:16px">
                      <i class="el-icon-error" style="color:#F56C6C" />
                      <span />
                      失败
                    </span>
                  )}
                </div>
              );
            },
          },
          {
            label: "耗时",
            index: "spendTime",
            sortable: true,
            render(h, data) {
              return <div>{data.row.spendTime} ms</div>;
            },
          },
          { label: "请求时间", index: "executeTime", sortable: true },
          { label: "TraceID", index: "traceId" },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 10, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },

      chartData: {
        data: [
          120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
          210, 200,
        ],
        xAxisData: [
          "00:00",
          "00:04",
          "00:08",
          "00:12",
          "00:16",
          "00:20",
          "00:24",
          "00:28",
          "00:32",
          "00:36",
          "00:40",
          "00:44",
          "00:48",
          "00:52",
          "00:56",
          "01:00",
        ],
        color: ["#0FC7C1"],
      },

      chartData2: {
        data: [
          120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
          210, 200,
        ],
        xAxisData: [
          "00:00",
          "00:04",
          "00:08",
          "00:12",
          "00:16",
          "00:20",
          "00:24",
          "00:28",
          "00:32",
          "00:36",
          "00:40",
          "00:44",
          "00:48",
          "00:52",
          "00:56",
          "01:00",
        ],
        color: ["#F56C6C"],
      },

      chartData3: {
        data: [
          120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
          210, 200,
        ],
        xAxisData: [
          "00:00",
          "00:04",
          "00:08",
          "00:12",
          "00:16",
          "00:20",
          "00:24",
          "00:28",
          "00:32",
          "00:36",
          "00:40",
          "00:44",
          "00:48",
          "00:52",
          "00:56",
          "01:00",
        ],
        color: ["#409EFF"],
      },

      activeName: "1",
      formSql: {},

      rowObj: "", // 表格行数据
      drawerTitle: "", // 点击表格出现的抽屉组件的标题
      drawerVisible: false,

      time: "",
    };
  },

  mounted() {},

  methods: {
    // tab组件的切换函数,
    handleClick(tab, event) {},
  },
};
</script>

<style lang="scss" scoped>
.grid-content {
  padding: 20px;
  background: #fff;
  min-height: 200px;
  overflow: hidden;
}
.box-card {
  ::v-deep .el-card__header {
    padding: 18px 10px;
  }
  .box-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  cursor: pointer;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0 10px 0;
    margin: 0;
    // border: 0.5px solid #ebeef5;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid #e8e8e8;
      &:before {
        content: none;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
.selectbox {
  width: 100%;
}
</style>
