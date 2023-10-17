<template>
  <div class="dashboard-container">
    <!-- 查询表单 -->
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <!-- 类型 -->
          <el-form-item label="">
            <el-select v-model="form.type" clearable class="selectbox">
              <template slot="prefix">
                <div class="pl-10px">类型：</div>
              </template>
              <el-option
                v-for="item in typeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 数据库实例 -->
          <el-form-item label="">
            <el-select v-model="form.instance" clearable class="selectbox2">
              <template slot="prefix">
                <div class="pl-10px">数据库实例：</div>
              </template>
              <el-option
                v-for="item in instanceList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 三个统计数字 -->
    <div class="grid-content title-num">
      <el-row :gutter="20">
        <el-col :span="4">
          <div>执行总次数</div>
          <div style="margin-top: 10px">
            <span class="num">{{ 1658 }}</span>
            次
          </div>
        </el-col>
        <el-col :span="4">
          <div>执行错误率</div>
          <div style="margin-top: 10px">
            <span class="num" style="color: red">{{ 33.66 }}</span>
            %
          </div>
        </el-col>
        <el-col :span="4">
          <div>平均响应时间</div>
          <div style="margin-top: 10px">
            <span class="num">{{ 1.9 }}</span>
            ms
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 三个图表 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <BarChart
            :width="'100%'"
            :height="'310px'"
            :title="title1"
            :chartData="chartData.data"
            :xAxisData="chartData.xAxisData"
            :color="chartData.color"
            :alignWithLabel="chartData.alignWithLabel"
            :interval="chartData.interval"
            :grid="grid"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
          <BarChart
            :width="'100%'"
            :height="'310px'"
            :title="title2"
            :chartData="chartData2.data"
            :xAxisData="chartData2.xAxisData"
            :color="chartData2.color"
            :alignWithLabel="chartData2.alignWithLabel"
            :interval="chartData2.interval"
            :grid="grid"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :title="title3"
            :chartData="chartData3.data"
            :xAxisData="chartData3.xAxisData"
            :color="chartData3.color"
          />
        </div>
      </el-col>
    </el-row>

    <!-- tab组件 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          type="border-card"
        >
          <el-tab-pane name="1">
            <template slot="label">
              慢 SQL 分析
              <el-tag size="mini" type="success">Top 50</el-tag>
            </template>
            <el-form :inline="true" :model="formSql" ref="formSql">
              <el-form-item label="">
                <el-input
                  v-model="formSql.sql"
                  placeholder="请输入 SQL 语句"
                  clearable
                />
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="formSql.spendTime"
                  clearable
                  class="inputbox"
                >
                  <template slot="prefix">
                    <div class="pl-10px">类型：</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <Table
              :table-data="table.tableData"
              :columns="table.columns"
              @row-click="handleRowClick"
            />
          </el-tab-pane>

          <el-tab-pane name="2">
            <template slot="label">
              慢 SQL 记录
              <!-- <el-tag size="mini" type="success">Top 50</el-tag> -->
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 抽屉 -->
    <el-drawer
      class="drawer-wrapper"
      direction="rtl"
      size="70%"
      :visible.sync="drawerVisible"
      :before-close="closeDrawer"
      :destroy-on-close="true"
    >
      <template v-slot:title>
        <h3>SQL 详情</h3>
      </template>

      <div style="margin-bottom: 20px">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button class="el-icon-refresh" @click="handleRefresh"></el-button>
      </div>

      <el-collapse accordion style="margin-bottom: 20px">
        <el-collapse-item>
          <template slot="title">
            <h2>结构化 SQL {{ drawerTitle }}</h2>
          </template>
          <div>SQL</div>
        </el-collapse-item>
      </el-collapse>

      <div
        class="grid-content title-num"
        style="border: 1px solid #c0c4cc;margin"
      >
        <el-row :gutter="20">
          <el-col :span="4">
            <div>慢执行数</div>
            <div style="margin-top: 10px">
              <span class="num" style="color: #e6a23c">{{ 127 }}</span>
              次
            </div>
          </el-col>
          <el-col :span="4">
            <div>慢执行平均耗时</div>
            <div style="margin-top: 10px">
              <span class="num" style="color: #e6a23c">{{ 3.2 }}</span>
              ms
            </div>
          </el-col>
          <el-col :span="4">
            <div>总执行错误率</div>
            <div style="margin-top: 10px">
              <span class="num" style="color: #f56c6c">{{ 100 }}</span>
              %
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content" style="border: 1px solid #c0c4cc">
            <BarChart
              :width="'100%'"
              :height="'290px'"
              :title="title4"
              :chartData="chartData4.data"
              :xAxisData="chartData4.xAxisData"
              :color="chartData4.color"
              :alignWithLabel="chartData4.alignWithLabel"
              :interval="chartData4.interval"
              :grid="grid"
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content" style="border: 1px solid #c0c4cc">
            <LineChart
              :width="'100%'"
              :height="'290px'"
              :title="title5"
              :chartData="chartData5.data"
              :xAxisData="chartData5.xAxisData"
              :color="chartData5.color"
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content" style="border: 1px solid #c0c4cc">
            <RadiusPieChart
              :width="'100%'"
              :height="'290px'"
              :title="title6"
              :chart-data="chartData6.data"
              :color="chartData6.color"
              :radius="chartData6.radius"
              :center="chartData6.center"
              :isShowLegend="chartData6.isShowLegend"
            />
          </div>
        </el-col>
      </el-row>

      <div>
        <h3>慢执行记录</h3>
        <el-form :inline="true" :model="formRecord" ref="formRecord">
          <!-- 类型 -->
          <el-form-item label="">
            <el-select
              v-model="formRecord.type"
              placeholder="类型"
              multiple
              clearable
            >
              <el-option
                v-for="item in typeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 数据库实例 -->
          <el-form-item label="">
            <el-select
              v-model="formRecord.instance"
              placeholder="数据库实例"
              multiple
              clearable
            >
              <el-option
                v-for="item in instanceList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div style="margin-bottom: 20px">
        <Table
          :table-data="tableRecord.tableData"
          :columns="tableRecord.columns"
          @row-click="handleRowClickSql"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import LineChart from "./components/LineChart.vue";
import BarChart from "@/views/echarts/BarChart.vue";
import RadiusPieChart from "@/views/echarts/RadiusPieChart.vue";
import Table from "@/views/components/Table.vue";

export default {
  name: "InstanceMonitorDatabase",
  components: { BarChart, LineChart, RadiusPieChart, Table },
  data() {
    return {
      // 主页查询表单
      form: {
        type: "MySql",
        instance: "123.345.567.789:11",
      },

      typeList: [{ label: "MySql", value: "MySql" }],
      instanceList: [
        { label: "123.345.567.789:1", value: "123.345.567.789:1" },
      ],

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

      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      // SQL 执行数
      title1: "SQL 执行数",
      chartData: {
        data: [
          {
            name: "慢执行统计",
            data: [
              120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
              210, 200,
            ],
          },
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
        alignWithLabel: true,
        interval: {
          interval: (index, value) => {
            if (index == 2 || index == 7 || index == 12) return true;
          },
        },
      },
      // SQL 执行错误数
      title2: "SQL 执行错误数",
      chartData2: {
        data: [
          {
            name: "SQL 执行错误数",
            data: [
              120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
              210, 200,
            ],
          },
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
        alignWithLabel: true,
        interval: {
          interval: (index, value) => {
            if (index == 2 || index == 7 || index == 12) return true;
          },
        },
      },
      // SQL 执行平均耗时
      title3: "SQL 执行平均耗时",
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

      title4: "慢执行统计",
      chartData4: {
        data: [
          {
            name: "慢执行统计",
            data: [
              120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
              210, 200,
            ],
          },
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
        color: ["#E6A23C"],
        alignWithLabel: true,
        interval: {
          interval: (index, value) => {
            if (index == 2 || index == 7 || index == 12) return true;
          },
        },
      },

      title5: "慢执行平均耗时",
      chartData5: {
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
        color: ["#E6A23C"],
      },

      title6: "来源服务",
      chartData6: {
        data: [
          {
            label: "正常",
            value: 60,
          },
          {
            label: "异常",
            value: 1,
          },
        ],
        color: ["#94D2F4", "#BD3026"],
        radius: ["45%", "65%"],
        center: ["50%", "55%"],
        isShowLegend: false,
      },

      // tab切换
      activeName: "1",

      // 慢sql查询
      formSql: {
        sql: "",
        spendTime: "",
      },

      // 表格数据
      table: {
        tableData: [
          {
            sql: "SELECT * FROM table1",
            errorRate: 0.02,
            exeTimes: 5,
            spendTime: 200,
            maxExeTime: 500,
            time: "2023-10-01 10:30:00",
          },
          {
            sql: "SELECT * FROM table2",
            errorRate: 0.01,
            exeTimes: 8,
            spendTime: 180,
            maxExeTime: 400,
            time: "2023-10-02 11:00:00",
          },
          {
            sql: "SELECT * FROM table10",
            errorRate: 0.03,
            exeTimes: 3,
            spendTime: 220,
            maxExeTime: 600,
            time: "2023-10-09 09:00:00",
          },
        ],
        columns: [
          {
            label: "SQL 语句",
            index: "sql",
            render(h, data) {
              return <div style="cursor:pointer;">{data.row.sql}</div>;
            },
          },
          {
            label: "总执行错误率",
            index: "errorRate",
            render(h, data) {
              return <div>{data.row.errorRate} %</div>;
            },
          },
          { label: "慢执行次数", index: "exeTimes" },
          {
            label: "慢执行平均耗时",
            index: "spendTime",
            render(h, data) {
              return <div>{data.row.spendTime} ms</div>;
            },
          },
          {
            label: "最大执行时间",
            index: "maxExeTime",
            render(h, data) {
              return <div>{data.row.maxExeTime} ms</div>;
            },
          },
          { label: "最近慢执行时间", index: "time" },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 10, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },

      // 抽屉 表格数据
      tableRecord: {
        tableData: [
          {
            startTime: "2023-10-01 10:00:00",
            service: "Service A",
            status: "1",
            spendTime: 100,
            traceId: "123456789",
          },
          {
            startTime: "2023-10-02 11:30:00",
            service: "Service B",
            status: "0",
            spendTime: 150,
            traceId: "987654321",
          },
          {
            startTime: "2023-10-09 09:15:00",
            service: "Service C",
            status: "1",
            spendTime: 200,
            traceId: "567890123",
          },
        ],
        columns: [
          { label: "开始时间", index: "startTime" },
          { label: "来源服务", index: "service" },
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
          { label: "耗时", index: "spendTime" },
          {
            label: "TraceID",
            index: "traceId",
            render(h, data) {
              return (
                <div style="cursor:pointer;color:#409EFF">
                  {data.row.traceId}
                </div>
              );
            },
          },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 10, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },

      // 抽屉 表单
      formRecord: {
        type: "MySql",
        instance: "123.345.567.789:11",
      },

      rowObj: "", // 表格行数据
      drawerTitle: "", // 点击表格出现的抽屉组件的标题
      drawerVisible: false, // 抽屉组件是否显示

      time: "",
    };
  },

  mounted() {},

  methods: {
    handleRowClick(row) {
      this.rowObj = row;
      this.drawerTitle = row.sql;
      this.openDrawer();
    },

    // 打开抽屉
    openDrawer() {
      this.drawerVisible = true;
    },

    // 关闭抽屉
    closeDrawer(done) {
      // console.log("!!!");
      this.activeName = "1";
      this.drawerVisible = false;
    },

    // tab组件的切换函数,
    handleClick(tab, event) {},

    handleRefresh() {},

    handleRowClickSql(row) {
      this.$router.push({
        name: "LinkTracing",
        // query: { serverId: id }, // 应用服务节点的'名称/id'
      });
    },
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
.title-num {
  min-height: 0;
  margin-bottom: 20px;
  .num {
    font-size: 35px;
    font-weight: bold;
  }
}
.el-icon-refresh {
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: #409eff;
  margin: 0 10px;
  line-height: 15px;
}
.selectbox {
  width: 250px;
  ::v-deep .el-input__inner {
    padding-left: 50px;
  }
}
.selectbox2 {
  width: 300px;
  ::v-deep .el-input__inner {
    padding-left: 90px;
  }
}
.inputbox {
  ::v-deep .el-input__inner {
    padding-left: 40px;
  }
}
.drawer-wrapper {
  ::v-deep .el-drawer__header {
    margin-bottom: 0px;
    padding: 0 20px 0;
  }
  ::v-deep .el-drawer__body {
    padding: 0 20px 0;
  }
}
</style>
