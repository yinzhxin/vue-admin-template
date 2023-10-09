<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <!-- 类型 -->
          <el-form-item label="">
            <el-select
              v-model="form.type"
              placeholder="类型"
              multiple
              clearable
            >
              <el-option
                v-for="item in typeList"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId"
              />
            </el-select>
          </el-form-item>
          <!-- 数据库实例 -->
          <el-form-item label="">
            <el-select
              v-model="form.instance"
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
      </el-col>
    </el-row>

    <div class="grid-content" style="min-height: 0; margin-bottom: 20px">
      <el-row :gutter="20">
        <el-col :span="4">
          <div>执行总次数</div>
          <div style="margin-top: 10px">
            <span style="font-size: 35px; font-weight: bold">{{ 1658 }}</span>
            次
          </div>
        </el-col>
        <el-col :span="4">
          <div>执行错误率</div>
          <div style="margin-top: 10px">
            <span style="font-size: 35px; font-weight: bold; color: red">{{
              33.66
            }}</span>
            %
          </div>
        </el-col>
        <el-col :span="4">
          <div>平均响应时间</div>
          <div style="margin-top: 10px">
            <span style="font-size: 35px; font-weight: bold">{{ 1.9 }}</span>
            ms
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content" style="height: 310px">
          <BarChart
            :width="'100%'"
            :height="'110%'"
            :title="title"
            :chartData="chartData.data"
            :xAxisData="chartData.xAxisData"
            :color="chartData.color"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content" style="height: 310px">
          <BarChart
            :width="'100%'"
            :height="'110%'"
            :title="title2"
            :chartData="chartData2.data"
            :xAxisData="chartData2.xAxisData"
            :color="chartData2.color"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content" style="height: 310px">
          <LineChart
            :width="'100%'"
            :height="'110%'"
            :title="title3"
            :chartData="chartData3.data"
            :xAxisData="chartData3.xAxisData"
            :color="chartData3.color"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          type="border-card"
        >
          <el-tab-pane label="慢 SQL 分析" name="1">
            <el-form :inline="true" :model="formSql" ref="formSql">
              <el-form-item label="">
                <el-input
                  v-model="formSql.traceId"
                  placeholder="请输入 SQL 语句"
                  clearable
                />
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="formSql.traceId"
                  placeholder="请输入耗时"
                  clearable
                />
              </el-form-item>
            </el-form>

            <Table
              :table-data="table.tableData"
              :columns="table.columns"
              @row-click="handleRowClick"
            />
          </el-tab-pane>
          <el-tab-pane label="慢 SQL 记录" name="2"> </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 抽屉 -->
    <el-drawer
      custom-class="drawer-wrapper"
      direction="rtl"
      size="70%"
      :visible.sync="drawerVisible"
      :before-close="closeDrawer"
      :destroy-on-close="true"
    >
      <template v-slot:title>
        <h3>SQL 详情</h3>
      </template>

      <div style="margin: 0 20px 20px">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <i class="el-icon-refresh" @click="handleRefresh"></i>
      </div>

      <el-collapse accordion style="margin: 0 20px 20px">
        <el-collapse-item>
          <template slot="title">
            <h2>结构化 SQL {{ drawerTitle }}</h2>
          </template>
          <div>SQL</div>
        </el-collapse-item>
      </el-collapse>

      <div
        class="grid-content"
        style="
          min-height: 100px;
          margin: 0 20px 20px;
          border: 1px solid #c0c4cc;
        "
      >
        <el-row :gutter="20">
          <el-col :span="4">
            <div>慢执行数</div>
            <div style="margin-top: 10px">
              <span
                style="font-size: 35px; font-weight: bold; color: #e6a23c"
                >{{ 127 }}</span
              >
              次
            </div>
          </el-col>
          <el-col :span="4">
            <div>慢执行平均耗时</div>
            <div style="margin-top: 10px">
              <span
                style="font-size: 35px; font-weight: bold; color: #e6a23c"
                >{{ 3.2 }}</span
              >
              ms
            </div>
          </el-col>
          <el-col :span="4">
            <div>总执行错误率</div>
            <div style="margin-top: 10px">
              <span
                style="font-size: 35px; font-weight: bold; color: #f56c6c"
                >{{ 100 }}</span
              >
              %
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="20" style="margin-left: 10px; margin-right: 10px">
        <el-col :span="8">
          <div
            class="grid-content"
            style="height: 310px; border: 1px solid #c0c4cc"
          >
            <BarChart
              :width="'100%'"
              :height="'110%'"
              :title="title"
              :chartData="chartData.data"
              :xAxisData="chartData.xAxisData"
              :color="chartData.color"
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div
            class="grid-content"
            style="height: 310px; border: 1px solid #c0c4cc"
          >
            <BarChart
              :width="'100%'"
              :height="'110%'"
              :title="title2"
              :chartData="chartData2.data"
              :xAxisData="chartData2.xAxisData"
              :color="chartData2.color"
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div
            class="grid-content"
            style="height: 310px; border: 1px solid #c0c4cc"
          >
            <LineChart
              :width="'100%'"
              :height="'110%'"
              :title="title3"
              :chartData="chartData3.data"
              :xAxisData="chartData3.xAxisData"
              :color="chartData3.color"
            />
          </div>
        </el-col>
      </el-row>

      <div style="margin: 0 20px">
        <h3>慢执行记录</h3>
        <el-form :inline="true" :model="form" ref="form">
          <!-- 类型 -->
          <el-form-item label="">
            <el-select
              v-model="form.type"
              placeholder="类型"
              multiple
              clearable
            >
              <el-option
                v-for="item in typeList"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId"
              />
            </el-select>
          </el-form-item>
          <!-- 数据库实例 -->
          <el-form-item label="">
            <el-select
              v-model="form.instance"
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

      <div style="margin: 0 20px 20px">
        <Table
          :table-data="table2.tableData"
          :columns="table2.columns"
          @row-click="handleRowClick2"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";
import LineChart from "./LineChart.vue";
import Table from "@/views/components/Table.vue";

export default {
  name: "DatabaseMonitor",
  components: { BarChart, LineChart, Table },
  data() {
    return {
      title: "SQL 执行数",
      title2: "SQL 执行错误数",
      title3: "SQL 执行平均耗时",
      form: {},
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
              return (
                <div style="cursor:pointer;">
                  {data.row.sql}
                </div>
              );
            },
          },
          { label: "总执行错误率", index: "errorRate" },
          { label: "慢执行次数", index: "exeTimes" },
          { label: "慢执行平均耗时", index: "spendTime" },
          { label: "最大执行时间", index: "maxExeTime" },
          { label: "最近慢执行时间", index: "time" },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 10, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },

      // 表格数据
      table2: {
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

      rowObj: "", // 表格行数据
      drawerTitle: "", // 点击表格出现的抽屉组件的标题
      drawerVisible: false,

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

    handleRowClick2(row) {
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
.el-icon-refresh {
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
  color: #409eff;
  margin: 0 10px;
  line-height: 10px;
}
</style>
