<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <!-- 所属应用 -->
          <el-form-item label="">
            <el-select
              v-model="form.app"
              placeholder="所属应用"
              multiple
              clearable
            >
              <el-option
                v-for="item in appOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 所属服务 -->
          <el-form-item label="">
            <el-select
              v-model="form.server"
              placeholder="所属服务"
              multiple
              clearable
            >
              <el-option
                v-for="item in serviceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8" style="">
        <div style="display: flex; background-color: #fff">
          <div style="background-color: #fff">
            <img
              src="/topo_images/cube.svg"
              alt=""
              width="100px"
              height="100px"
              color="#83C0FF"
            />
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              background-color: #fff;
            "
          >
            <div style="color: gray">服务</div>
            <div style="font-size: 30px">7</div>
          </div>
        </div>
      </el-col>

      <el-col :span="8" style="">
        <div style="display: flex; background-color: #fff">
          <div style="background-color: #fff">
            <img
              src="/topo_images/cube.svg"
              alt=""
              width="100px"
              height="100px"
              color="#83C0FF"
            />
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              background-color: #fff;
            "
          >
            <div style="color: gray">Endpoint</div>
            <div style="font-size: 30px">7</div>
          </div>
        </div>
      </el-col>

      <el-col :span="8" style="">
        <div style="display: flex; background-color: #fff">
          <div style="background-color: #fff">
            <img
              src="/topo_images/cube.svg"
              alt=""
              width="100px"
              height="100px"
              color="#83C0FF"
            />
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              background-color: #fff;
            "
          >
            <div style="color: gray">实例</div>
            <div style="font-size: 30px">7</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <h2>错误率排名</h2>

    <el-row :gutter="20" style="margin-bottom: 0">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <el-tag type="success" style="font-size: 16px; margin-right: 10px">
              Top5
            </el-tag>
            <span style="font-size: 16px; font-weight: bold">服务</span>
          </div>
          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span>{{ item.name }}</span>
                  <!-- 在
                  <span style="color: #409eff">{{ item.module }}</span>
                  下载了日志
                  <span style="color: #409eff">{{ item.content }}</span> -->
                </div>
                <div style="color: #9e9e9e; font-size: 14px">总请求数：100</div>
              </div>

              <div style="margin: 0 30px 0 0">
                <el-progress
                  :show-text="false"
                  type="circle"
                  :percentage="50"
                  status="exception"
                  :width="60"
                ></el-progress>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <el-tag style="font-size: 16px; margin-right: 10px"> Top5 </el-tag>
            <span style="font-size: 16px; font-weight: bold">Endpoint</span>
          </div>
          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span>{{ item.name }}</span>
                  <!-- 在
                  <span style="color: #409eff">{{ item.module }}</span>
                  下载了日志
                  <span style="color: #409eff">{{ item.content }}</span> -->
                </div>
                <div style="color: #9e9e9e; font-size: 14px">总请求数：100</div>
              </div>

              <div style="margin: 0 30px 0 0">
                <el-progress
                  :show-text="false"
                  type="circle"
                  :percentage="50"
                  status="exception"
                  :width="60"
                ></el-progress>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <el-tag type="warning" style="font-size: 16px; margin-right: 10px">
              Top5
            </el-tag>
            <span style="font-size: 16px; font-weight: bold">实例</span>
          </div>
          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span>{{ item.name }}</span>
                  <!-- 在
                  <span style="color: #409eff">{{ item.module }}</span>
                  下载了日志
                  <span style="color: #409eff">{{ item.content }}</span> -->
                </div>
                <div style="color: #9e9e9e; font-size: 14px">总请求数：100</div>
              </div>

              <div style="margin: 0 30px 0 0">
                <el-progress
                  :show-text="false"
                  type="circle"
                  :percentage="50"
                  status="exception"
                  :width="60"
                ></el-progress>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>

    <div style="display: flex; align-items: center">
      <h2>响应时间排名</h2>
      <el-select
        v-model="responseValue"
        placeholder="请选择"
        clearable
        style="width: 10%; margin-left: 10px"
      >
        <el-option
          v-for="item in responseOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <el-tag type="success" style="font-size: 16px; margin-right: 10px">
              Top5
            </el-tag>
            <span style="font-size: 16px; font-weight: bold">服务</span>
          </div>
          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span>{{ item.name }}</span>
                  <!-- 在
                  <span style="color: #409eff">{{ item.module }}</span>
                  下载了日志
                  <span style="color: #409eff">{{ item.content }}</span> -->
                </div>
                <div style="color: #9e9e9e; font-size: 14px">总请求数：100</div>
              </div>

              <div style="margin: 0 30px 0 0">
                <el-progress
                  :show-text="false"
                  type="circle"
                  :percentage="50"
                  status="exception"
                  :width="60"
                ></el-progress>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <el-tag style="font-size: 16px; margin-right: 10px"> Top5 </el-tag>
            <span style="font-size: 16px; font-weight: bold">Endpoint</span>
          </div>
          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span>{{ item.name }}</span>
                  <!-- 在
                  <span style="color: #409eff">{{ item.module }}</span>
                  下载了日志
                  <span style="color: #409eff">{{ item.content }}</span> -->
                </div>
                <div style="color: #9e9e9e; font-size: 14px">总请求数：100</div>
              </div>

              <div style="margin: 0 30px 0 0">
                <el-progress
                  :show-text="false"
                  type="circle"
                  :percentage="50"
                  status="exception"
                  :width="60"
                ></el-progress>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <el-tag type="warning" style="font-size: 16px; margin-right: 10px">
              Top5
            </el-tag>
            <span style="font-size: 16px; font-weight: bold">实例</span>
          </div>
          <ul>
            <li v-for="item in data3" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span>{{ item.name }}</span>
                  <!-- 在
                  <span style="color: #409eff">{{ item.module }}</span>
                  下载了日志
                  <span style="color: #409eff">{{ item.content }}</span> -->
                </div>
                <div style="color: #9e9e9e; font-size: 14px">总请求数：100</div>
              </div>

              <div style="margin: 0 30px 0 0">
                <el-progress
                  :show-text="false"
                  type="circle"
                  :percentage="50"
                  status="exception"
                  :width="60"
                ></el-progress>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SystemOverview",
  components: {},
  data() {
    return {
      data3: [
        {
          name: "shop_user1",
          module: "UPM",
          // content: "5月迭代",
        },
        {
          name: "shop_user2",
          module: "UPM",
          // content: "5月迭代",
        },
        {
          name: "shop_user3",
          module: "UPM",
          // content: "5月迭代",
        },
        {
          name: "shop_user4",
          module: "UPM",
          // content: "5月迭代",
        },
        {
          name: "shop_user5",
          module: "UPM",
          // content: "5月迭代",
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
        // { label: "app1", value: "app1" },
        // { label: "app2", value: "app2" },
        // { label: "app3", value: "app3" },
        // { label: "app4", value: "app4" },
        // { label: "app5", value: "app5" },
      ],

      // 所属服务
      serviceOption: [
        // { label: "service1", value: "service1" },
        // { label: "service2", value: "service2" },
        // { label: "service3", value: "service3" },
        // { label: "service4", value: "service4" },
        // { label: "service5", value: "service5" },
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
    handleTo() {
      this.$router.push({
        name: "LinkTracing",
        // query: { serverId: id }, // 应用服务节点的'名称/id'
      });
    },

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
.box-card {
  cursor: pointer;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 20px 30px 0;
    margin: 0;
    border: 0.5px solid #ebeef5;
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
</style>
