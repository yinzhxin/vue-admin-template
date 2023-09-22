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
                :key="item.label"
                :label="item.label"
                :value="item.value"
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
                v-for="item in serverSelection"
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
              placeholder="Endpoint 名称"
              multiple
              clearable
            >
              <el-option
                v-for="item in EndpointSelection"
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
                :key="item.label"
                :label="item.label"
                :value="item.value"
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
            <el-button type="primary" @click="onSubmit('form')">
              搜索
            </el-button>
            <el-button class="clearBtn" @click="onSubmit">清空</el-button>
          </el-form-item>
          <!-- 提示问号 -->
          <el-tooltip effect="dark" placement="top" class="tooltip">
            <template slot="content">
              <div style="max-width: 350px">??????????????</div>
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
              :total="table.page.count"
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
      style="overflow: scroll"
      direction="rtl"
      size="70%"
      :visible.sync="drawerVisible"
      :before-close="closeDrawer"
    >
      <template v-slot:title>
        <h3>{{ drawerTitle }}</h3>
      </template>

      <div class="traceId">
        <el-tag style="font-size: 18px; color: #0fc7c1">TraceID</el-tag>
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
            <!-- <div id="container-wrapper" ref="containerWrapper"> -->
            <div id="container" ref="container" />
            <!-- </div> -->
            <!-- 柱状图 -->
            <BarYChart
              :height="'125%'"
              :width="'100%'"
              :duringTime="duringTime"
              :pendingTime="pendingTime"
              :stayingTime="stayingTime"
              :labelList="labelList"
              :label="label"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Span列表" name="2"></el-tab-pane>
        <el-tab-pane label="拓扑图" name="3"></el-tab-pane>
      </el-tabs>

      <el-drawer
        :append-to-body="true"
        :visible.sync="dialogVisible"
        custom-class="my-drawer"
        size="70%"
      >
        <template v-slot:title>
          <h3>抽屉标题</h3>
        </template>
        <el-tabs
          v-model="activeName2"
          @tab-click="handleClick"
          style="margin-left: 10px"
        >
          <el-tab-pane label="基本信息" name="1">
            <div
              style="
                display: flex;
                margin: 20px;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <div style="margin-right: 80px; margin-bottom: 20px">
                Span 名称：XXXXXXXXXXXXX-YYYYYYY
              </div>
              <div style="margin-right: 80px; margin-bottom: 20px">
                状态：<el-tag size="small" type="danger">失败</el-tag>
              </div>
              <div style="margin-right: 80px; margin-bottom: 20px">
                自身耗时：100 ms
              </div>
              <div style="margin-right: 80px; margin-bottom: 20px">
                耗时：30 ms
              </div>
            </div>

            <el-card style="margin: 20px; margin-left: 10px">
              <div slot="header" class="clearfix">
                <span>
                  执行情况
                  <el-tag type="success" size="small">标签二</el-tag>
                </span>
              </div>
              <div
                v-for="o in 10"
                :key="o"
                style="margin-bottom: 15px; display: flex; font-size: 20px"
              >
                <div>
                  {{ "db_instance " }}
                </div>
                <div style="margin-left: 100px">
                  {{ "devdfdefqrfdqfdqd" }}
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="日志详情" name="2">
            <div
              style="
                display: flex;
                margin: 20px;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <div style="margin-right: 80px; margin-bottom: 20px">
                异常堆栈
              </div>
            </div>

            <el-card style="margin: 20px; margin-left: 10px" class="my-card">
              <div slot="header" class="clearfix">
                <span>
                  <strong>2023-10-10 13:34:08</strong>
                </span>
              </div>
              <div
                v-for="o in 10"
                :key="o"
                style="margin-bottom: 15px; display: flex; font-size: 20px"
              >
                <div>
                  {{ "db_instance " }}
                </div>
                <div style="margin-left: 100px">
                  {{ "devdfdefqrfdqfdqd" }}
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="基础信息" name="3"></el-tab-pane>
          <el-tab-pane label="服务监管" name="4"></el-tab-pane>
        </el-tabs>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Table from "@/views/components/Table.vue";
import BarYChart from "./BarYChart";
import { tableData } from "@/mock/linkTracing";
import { data } from "./data.js";
import Clipboard from "clipboard";

// import { getAppList, getProjectList, getTraceList } from "@/api/link";

export default {
  name: "LinkTracing",
  components: { Table, BarYChart },
  data() {
    return {
      serverId: "",
      graphData: "",
      graph: "",
      isFirstRender: true,
      canvasWidth: 0, // 画布宽度
      canvasHeight: 0, // 画布高度

      // 柱状图数据
      duringTime: [],
      pendingTime: [],
      stayingTime: [],
      labelList: [],
      label: [],

      dialogVisible: false,
      drawerVisible: false,
      drawerTitle: "",
      activeName: "1",
      activeName2: "1",
      spanRadio: "all",
      rowObj: "",
      form: {
        serverId: [],
        Endpoint: "",
        traceId: "",
        appId: ["no"],
        instanceId: "",
        status: "",
        spendTime: "",
      },

      // !所属应用
      appList: [
        { label: "未分组", value: "no" },
        { label: "aaa", value: "aaa" },
        { label: "bbb", value: "bbb" },
        { label: "ccc", value: "ccc" },
      ],
      // !实例名称
      instanceList: [
        { label: "aaa", value: "aaa" },
        { label: "bbb", value: "bbb" },
        { label: "ccc", value: "ccc" },
        { label: "ddd", value: "ddd" },
      ],
      // 所属服务
      serverSelection: [
        { label: "未服务", value: "no" },
        { label: "shop_aaa", value: "shop_aaa" },
        { label: "shop_xxx", value: "shop_xxx" },
        { label: "shop_yyy", value: "shop_yyy" },
      ],
      // Endpoint 名称
      EndpointSelection: [
        { label: "aaa", value: "aaa" },
        { label: "bbb", value: "bbb" },
        { label: "ccc", value: "ccc" },
        { label: "ddd", value: "ddd" },
      ],

      // 表格数据
      table: {
        tableData: tableData.data,
        columns: [
          {
            label: "Endpoint 名称",
            index: "Endpoint",
            render(h, data) {
              return (
                <div style="cursor:pointer">
                  {data.row.status == "fail" ? (
                    <span style="display: inline-block; width:2px; height:25px; background-color:#f56c6c; vertical-align:middle; margin-right:5px"></span>
                  ) : (
                    <span> </span>
                  )}
                  {data.row.Endpoint}
                </div>
              );
            },
            width: "300px",
          },
          { label: "所属服务", index: "server" },
          { label: "所属应用", index: "app" },
          {
            label: "状态",
            index: "status",
            render: (h, data) => {
              return (
                <div>
                  {data.row.status == "success" ? (
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
          { label: "耗时", index: "spendTime", sortable: true },
          { label: "请求时间", index: "requestTime", sortable: true },
          { label: "TraceID", index: "traceId" },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 20, // 每页条数--handleSizeChange
          count: 1, // 总页数
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
    };
  },

  mounted() {
    this.serverId = this.$route.query.serverId;
    // console.log(this.serverId);
    this.form.serverId.push(this.serverId);
    this.isFirstRender = true;

    // var clipboard = new Clipboard(".el-icon-document-copy");
    // clipboard.on("success", function (e) {
    //   console.info("Action:", e.action);
    //   console.info("Text:", e.text);
    //   console.info("Trigger:", e.trigger);

    //   e.clearSelection();
    // });
    // clipboard.on("error", function (e) {
    //   console.error("Action:", e.action);
    //   console.error("Trigger:", e.trigger);
    // });
  },

  methods: {
    // 分页器
    handleSizeChange() {},
    handleCurrentChange() {},

    // 处理数据
    processData(data) {
      const result = { label: [], chartData: [], labelList: [] };

      this.extractData(data, 0, result);
      this.labelList = result.labelList;
      this.label = result.label;
      // console.log(this.labelList);

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

    // 复制粘贴

    // 点击表格行
    handleRowClick(row) {
      this.drawerTitle = "TraceId: 根节点 label";
      this.rowObj = row;
      this.openDrawer();
    },

    // 打开抽屉
    openDrawer() {
      this.graphData = data;
      this.processData(this.graphData);
      this.$nextTick(() => {
        this.initGraph();
        // this.initSize();
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
      // this.graph.destroy(); // 销毁图形实体
      // this.graph.clear(); // 清除画布元素。hnb
      this.graphData = "";
    },

    // tab组件的切换函数
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 打开内部的抽屉组件
    open() {
      this.dialogVisible = true;
    },

    // 按钮
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
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
        onClick: (evt) => this.open(),
      });

      const container = document.getElementById("container");
      const width = 350;
      const height = container.scrollHeight * 2 || 1000;

      console.log(width, height);

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        modes: {
          default: ["behaviorName"],
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
            return 20;
          },
          getWidth: () => {
            return 10;
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

      if (this.isFirstRender == true) {
        console.log(this.isFirstRender);
        this.renderGraph();
      }

      this.isFirstRender = false;
      // this.graph.fitView(0);
      // this.graph.fitCenter();
      // this.graph.zoom(1);
      this.graph.translate(0, 45);

      //在拉取新数据重新渲染页面之前先获取点（0， 0）在画布上的位置
      const lastPoint = this.graph.getCanvasByPoint(0, 0);

      //获取重新渲染之后点（0， 0）在画布的位置
      const newPoint = this.graph.getCanvasByPoint(0, 0);

      const res = this.graph.getZoom();

      console.log(lastPoint, newPoint);
      console.log(res);

      //移动画布相对位移
      // graph.translate(lastPoint.x - newPoint.x, lastPoint.y - newPoint.y);
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

/* 问号提示组件的样式 */
.tooltip {
  margin-top: 7px;
  font-size: 25px;
  color: #0fc7c1;
}

/* 抽屉的抽屉的相关样式 */
.my-card {
  background-color: #eaeaea;
  color: black;
}

/*  */
.traceId {
  font-size: 18px;
  margin-left: 13px;
  margin-top: 20px;
  color: #0fc7c1;
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
  margin-left: 20px;
}

/* 树状和柱状的父容器样式 */
.drawer-content {
  height: 100vh;
  display: flex;
  overflow-y: scroll;
}

/* 按钮样式 */
.el-button--primary {
  background-color: #0fc7c1;
  border-color: #0fc7c1;
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #0fc7c1;
  border-color: #0fc7c1;
  -webkit-box-shadow: -1px 0 0 0 #0fc7c1;
  box-shadow: -1px 0 0 0 #0fc7c1;
}

/* 列表悬停样式 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #d9f3f2;
}

/* 抽屉样式 */
::v-deep .el-drawer__header {
  padding: 0px 20px 0;
  margin-bottom: 0;
}

#container-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>

<style>
/* 抽屉样式 增加滚轮 */
/* .el-drawer.rtl {
  overflow: scroll;
} */
</style>