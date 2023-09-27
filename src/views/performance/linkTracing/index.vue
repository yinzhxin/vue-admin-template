<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <!-- traceId -->
          <el-form-item label="">
            <el-input
              v-model="form.traceId"
              placeholder="请输入TraceID"
              clearable
            />
          </el-form-item>
          <!-- appId -->
          <el-form-item label="">
            <el-select
              v-model="form.appId"
              placeholder="所属应用"
              multiple
              clearable
            >
              <el-option
                v-for="item in appList"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId"
              />
            </el-select>
          </el-form-item>
          <!-- 所属服务 -->
          <el-form-item label="">
            <el-select
              v-model="form.serverId"
              placeholder="所属服务"
              multiple
              clearable
            >
              <el-option
                v-for="item in serviceList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- Endpoint 名称 -->
          <el-form-item label="">
            <el-select
              v-model="form.Endpoint"
              value-key="label"
              placeholder="Endpoint 名称"
              multiple
              clearable
            >
              <el-option
                v-for="item in endpointList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- instanceId -->
          <el-form-item label="">
            <el-select
              v-model="form.instanceId"
              placeholder="实例名称"
              multiple
              clearable
            >
              <el-option
                v-for="item in instanceList"
                :key="item.instanceId"
                :label="item.instanceName"
                :value="item.instanceId"
              />
            </el-select>
          </el-form-item>
          <!-- status：成功1/失败0 -->
          <el-form-item label="">
            <el-select v-model="form.status" placeholder="请求状态" clearable>
              <el-option label="成功" value="1"></el-option>
              <el-option label="失败" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!-- spendTime -->
          <el-form-item label="">
            <el-input
              v-model="form.spendTime"
              placeholder="请输入总耗时"
              clearable
            />
          </el-form-item>
          <!-- 按钮：搜索/清空 -->
          <el-form-item>
            <el-button type="primary" @click="handleSearch('form')">
              搜索
            </el-button>
            <el-button class="clearBtn" @click="handleClear('form')"
              >清空</el-button
            >
          </el-form-item>
          <!-- 提示问号 -->
          <el-tooltip effect="dark" placement="top" class="tooltip">
            <template slot="content">
              <div style="max-width: 350px">
                {{ serverId || "linkTracing" }}
              </div>
            </template>
            <i class="el-icon-question" />
          </el-tooltip>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <div style="margin-bottom: 20px">
            <el-radio-group v-model="spanRadio">
              <el-radio-button label="root">Root Span</el-radio-button>
              <el-radio-button label="entry">入口 Span</el-radio-button>
              <el-radio-button label="all">所有 Span</el-radio-button>
            </el-radio-group>
          </div>

          <Table
            :table-data="table.tableData"
            :columns="table.columns"
            @row-click="handleRowClick"
          />

          <div style="padding-top: 20px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="table.page.total"
              :current-page="table.page.current"
              :page-size="table.page.size"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
        </div>
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
        <h3>{{ drawerTitle }}</h3>
      </template>

      <div class="traceId">
        <el-tag style="font-size: 18px; color: #409eff">TraceID</el-tag>
        <span data-clipboard-text>{{ rowObj.traceId }}</span>
        <i class="el-icon-document-copy"></i>
      </div>

      <div class="traceContent">
        <div>
          <div style="margin-bottom: 20px">
            请求时间：{{ rowObj.requestTime }}
          </div>
          <div>Span 数：{{ "30" }}</div>
        </div>
        <div>
          <div style="margin-bottom: 20px">
            状态：
            <el-tag style="font-size: 18px" type="danger">
              失败
              <!-- {{ rowObj.status == "fail" ? "失败" : "成功" }} -->
            </el-tag>
          </div>
          <div>深度：{{ "17" }}</div>
        </div>
        <div>
          <div style="margin-bottom: 20px">总耗时：{{ rowObj.spendTime }}</div>
          <div style="height: 30px"></div>
        </div>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-style">
        <el-tab-pane label="树形" name="1">
          <div class="drawer-content">
            <!-- 树状图表 -->
            <div style="width: 50%; height: 100%">
              <div id="container" ref="container" />
            </div>

            <!-- 柱状图 -->
            <BarYChart
              :height="'100%'"
              :width="'100%'"
              :duringTime="duringTime"
              :pendingTime="pendingTime"
              :stayingTime="stayingTime"
              :labelList="labelList"
              :label="label"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Span列表" name="2">
          <Table
            size="mini"
            :table-data="table2.tableData2"
            :columns="table2.columns"
          />
          <div style="padding: 20px 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="table2.page.count"
              :current-page="table2.page.current"
              :page-size="table2.page.size"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="拓扑图" name="3">
          <div id="container-tree" ref="container-tree" />
        </el-tab-pane>
      </el-tabs>
    </el-drawer>

    <el-drawer
      :append-to-body="true"
      :visible.sync="nodeDrawerVisible"
      custom-class="my-drawer"
      size="70%"
    >
      <template v-slot:title>
        <h3>TraceId: 根节点 label</h3>
      </template>
      <el-tabs
        v-model="activeName2"
        @tab-click="handleClick2"
        style="margin-left: 10px"
      >
        <el-tab-pane label="基本信息" name="1">
          <div class="baseInfo">
            <div>Span 名称：XXXXXXXXXXXXX-YYYYYYY</div>
            <div>状态：<el-tag size="small" type="danger">失败</el-tag></div>
            <div>自身耗时：100 ms</div>
            <div>耗时：30 ms</div>
          </div>
          <el-card style="margin: 20px; margin-left: 10px">
            <div slot="header">
              <span>
                执行情况
                <el-tag type="success" size="small">status</el-tag>
              </span>
            </div>
            <div v-for="(o, index) in statusList" :key="index" class="imple">
              <div>{{ o.title }}</div>
              <div>
                <strong> {{ o.value }}</strong>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="日志详情" name="2">
          <div class="baseInfo">
            <div>异常堆栈</div>
          </div>
          <el-card class="log" shadow="never">
            <div slot="header">
              <span> 2023-10-10 13:34:08 </span>
            </div>
            <div v-for="(o, index) in stackList" :key="index">
              <div>
                <strong> {{ o.title }}</strong>
              </div>
              <div>{{ o.value }}</div>
              <br />
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="基础信息" name="3"></el-tab-pane>
        <el-tab-pane label="服务监管" name="4"></el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Clipboard from "clipboard";
import Table from "@/views/components/Table.vue";
import BarYChart from "./BarYChart";
import {
  getProjectList,
  getAppList,
  getInstanceList,
  getTraceList,
  getTraceInfo,
  traceData,
  tableData2,
  treeData,
} from "@/mock/linkTracing";

export default {
  name: "LinkTracing",
  components: { Table, BarYChart },
  data() {
    return {
      serverId: "", // query参数
      projectId: "",
      projectList: [],
      form: {
        traceId: "",
        appId: [],
        instanceId: [],
        serverId: [],
        Endpoint: [],
        status: "",
        spendTime: "",
      },
      // !所属应用
      appList: [],
      // !实例名称
      instanceList: [],
      // !所属服务
      serviceList: [
        { label: "shop_aaa", value: "shop_aaa" },
        { label: "shop_xxx", value: "shop_xxx" },
        { label: "shop_yyy", value: "shop_yyy" },
      ],
      // !Endpoint 名称
      endpointList: [
        { label: "aaa", value: "aaa" },
        { label: "bbb", value: "bbb" },
        { label: "ccc", value: "ccc" },
        { label: "ddd", value: "ddd" },
      ],

      graph: null,
      graphData: "",
      canvasWidth: 0, // 画布宽度
      canvasHeight: 0, // 画布高度

      graphTree: null,

      // 柱状图数据
      duringTime: [],
      pendingTime: [],
      stayingTime: [],
      labelList: [],
      label: [],

      nodeDrawerVisible: false,
      drawerVisible: false,
      activeName: "1",
      activeName2: "1",
      spanRadio: "all",
      rowObj: "", // 表格行数据
      drawerTitle: "", // 点击表格出现的抽屉组件的标题

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

      // 颜色数组--12种
      colorList: [
        "#9A60B4",
        "#BE76DE",
        "#CF81F2",
        "#EA7CCC",
        "#EE8AF8",
        "#3F48CC",
        "#0094D4",
        "#00A2E8",
        "#00ABF5",
        "#99D9EA",
        "#22B14C",
        "#B5E61D",
      ],

      statusList: [
        { title: "db_Instance", value: "upuser_dev" },
        { title: "db_Type", value: "sql" },
        { title: "apm_component", value: "Mysql" },
        { title: "db_statement", value: "INSERT INFO tb_name VALUES" },
        { title: "apm_layer", value: "Database" },
        { title: "apm_addr", value: "123.234.4456:3304" },
        { title: "apm_custom_application", value: "未分组" },
      ],

      stackList: [
        { title: "event", value: "error" },
        { title: "errorkind", value: "java.sql.SQLSyntaxErrorException" },
        { title: "massage", value: "Tbale 'urgent_dev_tb_user does not exist" },
        {
          title: "stack",
          value: `
  Exception in thread "main" java.lang.NullPointerException: Attempt to invoke virtual method "int java.lang.String.length()" on a null object reference
	at com.example.MyClass.myMethod(MyClass.java:15)
	at com.example.Main.main(Main.java:8)
  Exception in thread "main" java.lang.NullPointerException: Attempt to invoke virtual method "int java.lang.String.length()" on a null object reference
	at com.example.MyClass.myMethod(MyClass.java:15)
	at com.example.Main.main(Main.java:8)
  Exception in thread "main" java.lang.NullPointerException: Attempt to invoke virtual method "int java.lang.String.length()" on a null object reference
	at com.example.MyClass.myMethod(MyClass.java:15)
	at com.example.Main.main(Main.java:8)
`,
        },
      ],

      table2: {
        tableData2,
        columns: [
          { label: "Endpoint", index: "endpoint" },
          { label: "所属服务", index: "server" },
          { label: "Span 数量", index: "spanNum" },
          { label: "耗时", index: "spendTime", sortable: true },
          {
            label: "平均自身耗时",
            index: "spendTimeSelf",
            sortable: true,
            render(h, data) {
              return (
                <div style="cursor:pointer">
                  {data.row.spendTimeSelf}ms
                  <el-progress percentage={data.row.spendTimeSelf * 10} />
                </div>
              );
            },
          },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 20, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },
    };
  },

  // watch: {
  //   graph: {
  //     handler: function (newV, oldV) {
  //       console.log("newV ==> ", newV, "oldV ==> ", oldV);
  //     },
  //     deep: true,
  //   },
  // },

  mounted() {
    this.serverId = this.$route.query.serverId;
    // this.form.serverId.push(this.serverId);

    getProjectList().then((res) => {
      // console.log(res);
    });
    getAppList().then((res) => {
      this.appList = res;
    });
    getInstanceList().then((res) => {
      this.instanceList = res;
    });
    this.queryList();
  },

  methods: {
    // 链路列表
    queryList() {
      getTraceList({
        projectId: this.projectId,
        traceId: this.form.traceId,
        appId: this.form.appId,
        instanceId: this.form.instanceId,
        status: this.form.status,
        spendTime: this.form.spendTime,
        pageNum: this.table.page.current,
        pageSize: this.table.page.size,
      })
        .then((res) => {
          this.table.tableData = res;
          this.table.page.current = 1;
          this.table.page.size = 10;
          this.table.page.total = 10;
        })
        .catch(() => {});
    },

    // 分页器
    handleSizeChange(val) {
      this.table.page.size = val;
      this.queryList();
    },

    handleCurrentChange(val) {
      this.table.page.current = val;
      this.queryList();
    },

    // 处理数据
    processData(data) {
      const result = { label: [], chartData: [], labelList: [] };

      this.extractData(data, 0, result);

      this.labelList = result.labelList;
      this.label = result.label;

      for (let i = 0; i < result.chartData.length; i++) {
        for (let j = 0; j < result.chartData[i].length; j++) {
          this.duringTime.push(result.chartData[i][j].duringTime);
          this.pendingTime.push(result.chartData[i][j].pendingTime);
          this.stayingTime.push(result.chartData[i][j].stayingTime);
        }
      }
    },

    // 递归遍历树节点并设置颜色和提取数据
    extractData(obj, level, result) {
      const color = this.colorList[level];
      obj.color = color;

      if (obj.hasOwnProperty("chartData") || obj.hasOwnProperty("label")) {
        result.labelList.push({ label: obj.label, color: obj.color });
        result.label.push(obj.label);
        result.chartData.push(obj.chartData);
      }

      if (obj.children && Array.isArray(obj.children)) {
        for (const child of obj.children) {
          this.extractData(child, level + 1, result);
        }
      }
    },

    // 点击表格行
    handleRowClick(row) {
      this.rowObj = row;
      this.drawerTitle = row.endpoint;
      // getTraceInfo({ traceId: row.traceId }).then((res) => {
      //   console.log(res)
      // });
      this.openDrawer();
    },

    // 打开抽屉
    openDrawer() {
      this.graphData = traceData;
      this.processData(this.graphData);
      this.$nextTick(() => {
        this.initGraph();
      });
      this.drawerVisible = true;
    },

    // 关闭抽屉
    closeDrawer(done) {
      this.drawerVisible = false;

      this.duringTime = [];
      this.pendingTime = [];
      this.stayingTime = [];
      this.labelList = [];
      this.label = [];

      this.graph.destroy(); // 销毁图形实体
      this.graph = null;
    },

    // tab组件的切换函数
    handleClick(tab, event) {
      if (tab.label == "拓扑图") {
        this.$nextTick(() => {
          this.initGraph_tree();
        });
      } else {
        this.graphTree.destroy();
        this.graphTree = null;
      }
    },

    // tab组件的切换函数2
    handleClick2(tab, event) {
      // console.log(tab, event);
    },

    // 打开内部的抽屉组件
    openNodeDrawer() {
      this.nodeDrawerVisible = true;
    },

    // 搜索
    handleSearch(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.queryList();
          return true;
        } else {
          return false;
        }
      });
    },

    // 清空
    handleClear(ruleForm) {
      this.form = {
        traceId: "",
        appId: [],
        instanceId: [],
        serverId: [],
        Endpoint: [],
        status: "",
        spendTime: "",
      };
    },

    // 更新图表数据
    updateData(newData) {
      this.graph.data(newData);
    },

    // 渲染图表
    renderGraph() {
      this.graph.render();
    },

    // 浏览器窗口发生变化时，画布自适应窗口大小
    initSize() {
      const self = this; // 因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        // todo 浏览器窗口发生变化时
        window.onresize = function () {
          // todo 获取div parentContent 的宽度和高度
          this.canvasWidth = self.$refs.containerWrapper.clientWidth;
          this.canvasHeight = self.$refs.containerWrapper.clientHeight;
          // todo 修改画布的大小
          self.graph.changeSize(this.canvasWidth, this.canvasHeight);
          // todo 将图移动到画布中心位置
          self.graph.fitCenter();
        };
      }, 20);
    },

    // 初始化画布
    initGraph() {
      G6.registerBehavior("behaviorName", {
        getEvents: () => ({ "node:click": "onClick" }),
        onClick: (evt) => this.openNodeDrawer(),
      });

      const container = document.getElementById("container");
      const width = container.scrollWidth || 350;
      const height = container.scrollHeight * 3 || 1000;

      console.log(width, height);

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        modes: {
          default: ["behaviorName", "zoom-canvas"],
        },
        defaultNode: {
          size: 10,
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
          ],
          style: {},
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 10,
            offset: 10,
            lineWidth: 2,
          },
        },
        layout: {
          type: "indented",
          direction: "H",
          indent: 20,
          getHeight: () => {
            return 14;
          },
          getWidth: () => {
            return 9;
          },
          getSide: (d) => {
            return "right";
          },
        },
      });

      // 动态配置节点
      this.graph.node((node) => {
        node.style = {
          fill: "#fff",
          stroke: node.color,
          lineWidth: 3,
        };

        return {
          label: node.label,
          labelCfg: {
            position: "right",
          },
        };
      });

      this.updateData(this.graphData);
      this.renderGraph();
      this.graph.translate(0, 45);
      graph.fitView();

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },

    // 初始化画布
    initGraph_tree() {
      const container = document.getElementById("container-tree");
      // container.style.backgroundColor = "#e6e6e6"; // 设置容器的背景颜色为白色
      const width = container.scrollWidth;
      const height = container.scrollHeight || 420;
      console.log(width, height);
      const minimap = new G6.Minimap({
        size: [150, 75],
      });
      const toolbar = new G6.ToolBar({
        position: { x: 0, y: 0 },
      });
      this.graphTree = new G6.TreeGraph({
        container: "container-tree",
        width,
        height,
        zoom: 0.2,
        modes: {
          default: ["collapse-expand", "zoom-canvas"],
        },
        plugins: [minimap, toolbar],
        defaultNode: {
          type: "crect",
          size: [100, 40],
        },
        defaultEdge: {
          type: "cubic-horizontal",
          // 边的样式配置信息对象
          style: {
            stroke: "#999", // 边的颜色，默认为空字符串表示使用默认颜色
            arrow: true, // 是否显示箭头
            endArrow: {
              path: G6.Arrow.vee(), // 箭头的路径描述
              d: 2, // 箭头的大小，默认为空，需填入具体数值
            },
          },
        },
        layout: {
          type: "compactBox",
          direction: "LR",
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 100;
          },
          getVGap: function getVGap() {
            return 70;
          },
          getHGap: function getHGap() {
            return 70;
          },
          getWidth: function getWidth(d) {
            return G6.Util.getTextSize(d.id, 25)[0] + 120;
          },
        },
        fitView: true,
      });

      // 动态配置节点
      this.graphTree.node((node) => {
        node.color = "#ECF5FF";
        node.style = {
          fill: "#fff",
          stroke: "#ECF5FF",
          lineWidth: 10,
        };
        node.icon = {
          show: true,
          img: "/topo_images/cube.svg",
          width: 80,
          height: 80,
        };
        node.stateStyles = {
          hover: {
            stroke: "#409EFF",
          },
        };

        return {
          label: node.id,
          labelCfg: {
            position: "bottom",
          },
        };
      });

      this.graphTree.data(treeData);
      this.graphTree.render();
      this.graphTree.zoom(1.5);
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

/* 进度条样式 */
::v-deep .el-progress__text {
  display: none;
}

/* 问号提示组件的样式 */
.tooltip {
  margin-top: 7px;
  font-size: 25px;
  color: #409eff;
}

.traceId {
  font-size: 18px;
  margin-left: 13px;
  margin-top: 20px;
  color: #409eff;
  span {
    color: black;
    margin: 0 10px;
  }
}

.traceContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 20px;
  font-size: 18px;
}

/* tab组件的样式 */
.tab-style {
  margin: 0 20px;
}

/* 树状和柱状的父容器样式 */
.drawer-content {
  display: flex;
  // 用屏幕可视高度减去 头部与底部的高度，就是中间元素的高度
  height: calc(100vh - 0px);
}

/* 抽屉样式，头部 */
::v-deep .el-drawer__header {
  padding: 0px 20px 0;
  margin-bottom: 0;
}

/* 抽屉的抽屉的相关样式 */
.log {
  background-color: #eaeaea;
  color: black;
  margin: 20px;
  margin-left: 10px;
  font-size: 20px;
}
.baseInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 20px -20px 20px;
  div {
    margin-right: 80px;
    margin-bottom: 20px;
  }
}
.imple {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 20px;
  width: 50%;
}
</style>

<style>
/* 公共抽屉样式，增加y轴滚轮 */
.el-drawer.rtl {
  overflow-y: scroll;
}
</style>
