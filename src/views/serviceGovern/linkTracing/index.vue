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
            <el-input
              v-model="form.appId"
              placeholder="请输入所属应用"
              clearable
            />
            <!-- <el-select
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
            </el-select> -->
          </el-form-item>
          <!-- 所属服务 -->
          <el-form-item label="">
            <el-select v-model="form.serverId" placeholder="所属服务" clearable>
              <el-option
                v-for="item in serviceList"
                :key="item.serviceId"
                :label="item.serviceName"
                :value="item.serviceId"
              />
            </el-select>
          </el-form-item>
          <!-- Endpoint 名称 -->
          <el-form-item label="">
            <el-input
              v-model="form.Endpoint"
              placeholder="请输入Endpoint 名称"
              clearable
            />
            <!-- <el-select
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
            </el-select> -->
          </el-form-item>
          <!-- instanceId -->
          <el-form-item label="">
            <el-input
              v-model="form.instanceId"
              placeholder="请输入实例名称"
              clearable
            />
            <!-- <el-select
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
            </el-select> -->
          </el-form-item>
          <!-- status：成功1/失败0 -->
          <el-form-item label="">
            <el-select
              v-model="form.status"
              placeholder="请求状态"
              clearable
              @change="handleStatus"
            >
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
            <el-button class="clearBtn" @click="handleClear('form')">
              清空
            </el-button>
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
        <span>{{ rowObj.traceId }}</span>
        <i
          class="el-icon-document-copy"
          style="cursor: pointer"
          :data-clipboard-text="rowObj.traceId"
          @click="handleCopy"
        ></i>
      </div>

      <div class="traceContent">
        <div>
          <div style="margin-bottom: 20px">
            请求时间：{{ rowObj.requestTime }}
          </div>
          <div>Span 数：{{ rowObj.spanSum }}</div>
        </div>
        <div>
          <div style="margin-bottom: 20px">
            状态：
            <el-tag
              style="font-size: 18px"
              type="success"
              v-if="rowObj.status == 1"
            >
              成功
            </el-tag>
            <el-tag style="font-size: 18px" type="danger" v-else> 失败 </el-tag>
          </div>
          <div>深度：{{ rowObj.deep }}</div>
        </div>
        <div>
          <div style="margin-bottom: 20px">
            总耗时：{{ rowObj.totalTime }} ms
          </div>
          <div style="height: 30px"></div>
        </div>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-style">
        <el-tab-pane label="树形" name="1" :lazy="true">
          <div class="drawer-content">
            <!-- 树状图表 -->
            <div style="width: 45%; height: 100%">
              <span style="font-size: 12px; color: gray">接口名称</span>

              <div id="container" ref="container" />
            </div>

            <!-- 柱状图 -->
            <BarYChart
              id="bar"
              :height="'100%'"
              :width="'95%'"
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
            :table-data="tableSpan.tableSpanData"
            :columns="tableSpan.columns"
          />
          <div style="padding: 20px 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="tableSpan.page.count"
              :current-page="tableSpan.page.current"
              :page-size="tableSpan.page.size"
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

    <!-- 节点的抽屉 -->
    <el-drawer
      :show-close="false"
      :append-to-body="true"
      :visible.sync="nodeDrawerVisible"
      :before-close="closeNodeDrawer"
      custom-class="drawer-style"
      size="70%"
    >
      <el-tabs
        v-model="activeNameNode"
        @tab-click="handleNodeClick"
        class="tab-style"
      >
        <el-tab-pane label="基本信息" name="1">
          <div class="baseInfo">
            <div>
              <strong>Span 名称：</strong>
              <span>{{ spanInfo.spanName }}</span>
            </div>

            <div style="display: flex; align-items: center">
              <strong>状态：</strong>
              <el-tag
                style="font-size: 18px"
                type="success"
                v-if="spanInfo.status == 1"
              >
                成功
              </el-tag>
              <el-tag style="font-size: 18px" type="danger" v-else>
                失败
              </el-tag>
            </div>

            <div>
              <strong>自身耗时：</strong>
              <span>{{ spanInfo.spendTime }} ms</span>
            </div>
            <div>
              <strong>耗时：</strong>
              <span>{{ spanInfo.spendTime }} ms</span>
            </div>
          </div>

          <el-card style="margin: 20px; margin-left: 10px">
            <div slot="header">
              执行情况
              <el-tag type="success" size="small">status</el-tag>
            </div>
            <div
              v-for="(o, index) in spanStatusList"
              :key="index"
              class="imple"
            >
              <div style="width: 50%">{{ o.title }}</div>
              <div>
                <strong> {{ o.value }}</strong>
                <i
                  v-if="o.title == 'db_statement' && o.value"
                  class="el-icon-document-copy"
                  style="cursor: pointer; color: #409eff; margin-left: 10px"
                  :data-clipboard-text="o.value"
                  @click="handleCopy"
                ></i>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="日志详情" name="2">
          <div class="baseInfo">
            <div>
              <strong>异常堆栈</strong>
              <el-tooltip effect="dark" placement="top">
                <template slot="content">
                  <div style="max-width: 350px">
                    {{ "异常堆栈" }}
                  </div>
                </template>
                <i class="el-icon-question" />
              </el-tooltip>
            </div>
          </div>
          <el-card class="logInfo" :body-style="{ backgroundColor: '#F2F6FC' }">
            <div slot="header">
              <strong> 2023-10-10 13:34:08 </strong>
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
import { traceData, tableSpanData, treeData } from "@/mock/linkTracing";

import {
  getTraceList,
  getTraceInfo,
  getSpanInfo,
  getLogInfo,
} from "@/api/link";

export default {
  name: "LinkTracing",
  components: { Table, BarYChart },
  computed: {
    ser() {
      return this.$store.state.link.serviceOptions;
    },
  },
  data() {
    return {
      serverId: "", // query参数

      form: {
        traceId: "",
        appId: "",
        instanceId: "",
        serverId: "",
        Endpoint: "",
        status: "",
        spendTime: "",
      },
      // !所属应用
      appList: [],
      // !实例名称
      instanceList: [],
      // !所属服务
      serviceList: [],
      // !Endpoint 名称
      endpointList: [],

      graph: null,
      graphData: "",

      graphTree: null,

      canvasWidth: 0, // 画布宽度
      canvasHeight: 0, // 画布高度

      // 柱状图数据
      duringTime: [],
      pendingTime: [],
      stayingTime: [],
      labelList: [], // label和其对应颜色
      label: [], // label

      nodeDrawerVisible: false,
      drawerVisible: false,
      activeName: "1",
      activeNameNode: "1",

      spanRadio: "all",

      rowObj: "", // 表格行数据
      drawerTitle: "", // 点击表格出现的抽屉组件的标题
      spanInfo: "",
      spanStatusList: [],
      spanArray: [],
      logInfo: "",

      // 表格数据
      table: {
        tableData: [],
        columns: [
          {
            label: "Endpoint 名称",
            index: "endPoint",
            render(h, data) {
              return (
                <div style="cursor:pointer">
                  {data.row.status == "0" ? (
                    <span style="display: inline-block; width:2px; height:25px; background-color:#f56c6c; vertical-align:middle; margin-right:5px"></span>
                  ) : (
                    <span> </span>
                  )}
                  {data.row.endPoint}
                </div>
              );
            },
            width: "300px",
          },
          { label: "所属服务", index: "appName" },
          { label: "所属应用", index: "appSystemGroup" },
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
          { label: "请求时间", index: "requestTime", sortable: true },
          { label: "TraceID", index: "traceId" },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 20, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },

      linkList: [],

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
        "#00ABF6",
        "#99D9EA",
        "#22B14C",
        "#B5E61D",
        "#9A60B5",
        "#BE76D6",
        "#CF81F7",
        "#EA7CC8",
        "#EE8AF9",
        "#3F48C1",
        "#0094D2",
        "#00A2E3",
        "#00ABF4",
        "#99D9E5",
        "#22B146",
        "#B5E617",
        "#9A60B1",
        "#BE76D2",
        "#CF81F3",
        "#EA7CC4",
        "#EE8AF5",
        "#3F48C6",
        "#0094D7",
        "#00A2E9",
        "#00ABFA",
        "#99D9E1",
        "#22B14E",
        "#B5E610",
      ],

      stackList: [
        { title: "event", value: "error" },
        { title: "kind", value: "java.sql.SQLSyntaxErrorException" },
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

      tableSpan: {
        tableSpanData,
        columns: [
          { label: "Endpoint", index: "spanName" },
          { label: "所属服务", index: "appId" },
          { label: "Span 数量", index: "spanNum" },
          {
            label: "耗时",
            index: "spendTime",
            sortable: true,
            render(h, data) {
              return <div style="cursor:pointer">{data.row.spendTime} ms</div>;
            },
          },
          {
            label: "平均自身耗时",
            index: "averageTime",
            sortable: true,
            render(h, data) {
              return (
                <div style="cursor:pointer">
                  {data.row.averageTime} ms
                  <el-progress percentage={data.row.averageTime} />
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

      nodeCount: "",
    };
  },

  mounted() {
    this.serverId = this.$route.query.serverId;
    this.queryList();
    this.serviceList = this.$store.state.link.serviceOptions;
  },

  beforeDestroy() {
    // 清除数据
    this.graphData = "";
    // 销毁画布
    this.graph.destroy();
    // 实例销毁
    this.graph = null;
  },

  methods: {
    // 链路列表
    queryList() {
      getTraceList({
        traceId: "",
        status: "",
        appName: "",
        appSystemGroup: "",
        // [traceId] 链路id，可选筛选条件
        // [appName] 所属服务，可选筛选条件
        // [status] 状态，可选条件 1成功 0失败
        // [appSystemGroup] 所属应用，可选条件
        // 以上四个条件均不传默认查询全部
      })
        .then((res) => {
          // console.log(res);
          this.linkList = res;
          this.table.tableData = res;
          this.table.page.total = res.length;
          // this.table.page.current = 1;
          // this.table.page.size = 10;
          // this.table.page.total = 10;
        })
        .catch((err) => {
          console.log(err);
        });
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

    buildTree(array) {
      const nodeMap = {};
      const tree = [];

      array.forEach((item) => {
        nodeMap[item.spanId] = item;
      });

      array.forEach((item) => {
        const parentId = item.parentId;
        if (parentId) {
          const parent = nodeMap[parentId];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        } else {
          tree.push(item);
        }
      });

      console.log("tree-----", tree);

      return tree;
    },

    // 处理数据
    processData(data) {
      const result = { label: [], chartData: [], labelList: [], nodeCount: 0 };

      this.extractData(data, 0, result);

      this.labelList = result.labelList;
      this.label = result.label;

      console.log(this.label);
      console.log(this.labelList);

      for (let i = 0; i < result.chartData.length; i++) {
        for (let j = 0; j < result.chartData[i].length; j++) {
          this.duringTime.push(result.chartData[i][j].time1);
          this.pendingTime.push(result.chartData[i][j].time2);
          this.stayingTime.push(result.chartData[i][j].time3);
        }
      }

      // console.log(result.chartData)
      this.nodeCount = result.nodeCount;
      console.log("节点的总数: ", result.nodeCount);
    },

    // 递归遍历树节点并设置颜色和提取数据
    extractData(obj, level, result) {
      const color = this.colorList[level];
      obj.color = color;
      // console.log(obj);

      if (obj.hasOwnProperty("spanTime") || obj.hasOwnProperty("spanName")) {
        result.labelList.push({ label: obj.spanName, color: obj.color });
        result.label.push(obj.spanName);
        // result.labelList.push({
        //   id: obj.spanId,
        //   color: obj.color,
        // });
        // result.label.push(obj.spanId);
        result.chartData.push(obj.spanTime);
        // console.log(`每个节点 ==>Label: ${obj.spanName}, Level: ${level}`);
        result.nodeCount++; // 节点计数加一
      }

      if (obj.children && Array.isArray(obj.children)) {
        for (const child of obj.children) {
          this.extractData(child, level + 1, result);
        }
      }
    },

    // 复制
    handleCopy(evt) {
      let clipboard = new Clipboard(".el-icon-document-copy");
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy(); // 释放内存
      });
      clipboard.on("error", (e) => {
        this.$message.error("Error!");
        clipboard.destroy(); // 释放内存
      });
    },

    // 点击表格行，获取链路详情
    handleRowClick(row) {
      this.rowObj = row;
      this.drawerTitle = row.endPoint;
      // 获取链路信息
      getTraceInfo({ traceId: row.traceId })
        .then((res) => {
          // console.log(res);
          if (res.spans) {
            this.spanArray = res.spans;
            this.tableSpan.tableSpanData = this.spanArray;
            this.graphData = this.buildTree(this.spanArray);
            this.processData(this.graphData[0]);
            this.openDrawer();
          } else {
            this.tableSpan.tableSpanData = [];
            this.drawerVisible = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleStatus(val) {
      if (val == "1") {
        this.table.tableData = this.linkList.filter((item) => {
          return item.status == 1;
        });
      } else if (val == "0") {
        this.table.tableData = this.linkList.filter((item) => {
          return item.status == 0;
        });
      } else {
        this.table.tableData = this.linkList;
      }
    },

    // 打开抽屉
    openDrawer() {
      this.$nextTick(() => {
        this.initGraph();
      });
      this.drawerVisible = true;
    },

    // 关闭抽屉
    closeDrawer(done) {
      // console.log("!!!");
      this.activeName = "1";
      this.drawerVisible = false;

      this.duringTime = [];
      this.pendingTime = [];
      this.stayingTime = [];
      this.labelList = [];
      this.label = [];

      this.graph.destroy(); // 销毁图形实体
      this.graph = null;
      this.graphData = "";
    },

    // tab组件的切换函数,
    handleClick(tab, event) {
      if (tab.label == "拓扑图") {
        this.$nextTick(() => {
          this.initGraph_tree();
        });
      } else {
        if (this.graphTree) {
          this.graphTree.destroy();
          this.graphTree = null;
        }
      }
      // else if (tab.label == "树形") {
      //   if (this.graphTree) {
      //     this.graphTree.destroy();
      //     this.graphTree = null;
      //   }
      // }
      // else if (tab.label == "表格") {
      //   if (this.graphTree) {
      //     this.graphTree.destroy();
      //     this.graphTree = null;
      //   }
      // }
    },

    // 打开内部的抽屉组件
    openNodeDrawer() {
      // 请求span详情/基本信息
      getSpanInfo({ spanId: "span10" })
        .then((res) => {
          console.log(res);
          this.spanInfo = res;
          this.spanStatusList = [
            { title: "db_Instance", value: res.dbInstance },
            { title: "db_Type", value: res.dbType },
            { title: "apm_component", value: "Mysql" },
            { title: "db_statement", value: res.statement },
            { title: "apm_layer", value: res.layer },
            { title: "apm_addr", value: res.addr },
            { title: "apm_custom_application", value: "未分组" },
          ];
        })
        .catch((err) => {
          console.log(err);
        });

      this.nodeDrawerVisible = true;
    },

    // 关闭内部的抽屉组件
    closeNodeDrawer() {
      this.activeNameNode = "1";
      this.nodeDrawerVisible = false;
    },

    // 节点的tab组件的切换函数
    handleNodeClick(tab, event) {
      if (tab.label == "日志详情") {
        // 请求日志详情
        getLogInfo({ logId: this.spanInfo.logId })
          .then((res) => {
            console.log(res);
            this.logInfo = res;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (tab.label == "基本信息") {
        // 请求span详情/基本信息
        getSpanInfo({ spanId: "span10" })
          .then((res) => {
            console.log(res);
            this.spanInfo = res;
            this.spanStatusList = [
              { title: "db_Instance", value: res.dbInstance },
              { title: "db_Type", value: res.dbType },
              { title: "apm_component", value: "Mysql" },
              { title: "db_statement", value: res.statement },
              { title: "apm_layer", value: res.layer },
              { title: "apm_addr", value: res.addr },
              { title: "apm_custom_application", value: "未分组" },
            ];
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
          this.canvasWidth = self.$refs.container.clientWidth;
          this.canvasHeight = self.$refs.container.clientHeight;
          // todo 修改画布的大小
          self.graph.changeSize(this.canvasWidth, this.canvasHeight);
          // todo 将图移动到画布中心位置
          self.graph.fitCenter();
        };
      }, 20);
    },

    // 初始化画布
    initGraph() {
      // 点击事件，点击节点打开抽屉组件
      G6.registerBehavior("behaviorName", {
        getEvents: () => ({ "node:click": "onClick" }),
        onClick: (evt) => this.openNodeDrawer(),
      });

      const container = document.getElementById("container");
      // 获取柱状图的高，让树状图的高度等于柱状图的高度
      const barHeight = document.getElementById("bar").scrollHeight;
      const width = container.scrollWidth || 340;
      const height = container.scrollHeight || barHeight - 20;
      console.log("bar ==>", document.getElementById("bar").scrollHeight);
      console.log("画布的宽高 ==>", width, height);

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        fitView: true, // 开启后图自动适配画布大小
        modes: {
          default: ["behaviorName"],
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
            return height / this.nodeCount;
          },
          getWidth: () => {
            return 5;
          },
          getSide: (d) => {
            return "right"; // 子节点在当前节点的哪侧
          },
        },
      });

      // 动态配置节点样式
      this.graph.node((node) => {
        // 节点大小
        node.size = 20;
        // 节点连线
        node.anchorPoints = [
          [0.5, 0],
          [0.5, 1],
        ];
        // 节点样式
        node.style = {
          fill: "#fff",
          stroke: node.color,
          lineWidth: 5,
          cursor: "pointer",
          overflow: "hidden",
          textOverflow: "ellipsis",
        };
        // 节点状态样式
        node.stateStyles = {
          hover: {
            fill: "#f5f5f5", // 设置hover状态的背景颜色为灰色
            shadowColor: "#888", // 设置阴影颜色
            shadowBlur: 0, // 设置阴影模糊程度
          },
        };
        let label = `${node.spanName} \n ${node.appId}`;

        // console.log(node);

        return {
          label,
          labelCfg: {
            style: {
              fontSize: 20,
              fill: node.status == 0 ? "red" : "gray",
            },
            position: "right",
          },
        };
      });

      // console.log(this.graphData);

      this.updateData(this.graphData[0]);
      this.renderGraph();
      // this.graph.translate(0, 45);

      // 鼠标进入节点
      this.graph.on("node:mouseenter", (e) => {
        // 获取鼠标进入的节点元素对象
        const nodeItem = e.item;
        // 设置当前节点的 hover 状态为 true
        this.graph.setItemState(nodeItem, "hover", true);
      });

      // 鼠标离开节点
      this.graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item;
        this.graph.setItemState(nodeItem, "hover", false);
      });
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
        fitView: true,
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
      });

      // 动态配置节点
      this.graphTree.node((node) => {
        node.color = "#ECF5FF";
        node.style = {
          fill: "#fff",
          stroke: "#ECF5FF",
          lineWidth: 10,
          cursor: "pointer",
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
            offset: 30,
            style: {
              fontSize: 25,
            },
            // maxWidth: 100, // 设置合适的最大宽度
          },
        };
      });

      this.graphTree.data(treeData);
      this.graphTree.render();
      this.graphTree.zoom(1.5);

      // 鼠标进入节点
      this.graphTree.on("node:mouseenter", (e) => {
        // 获取鼠标进入的节点元素对象
        const nodeItem = e.item;
        // 设置当前节点的 hover 状态为 true
        this.graphTree.setItemState(nodeItem, "hover", true);
      });

      // 鼠标离开节点
      this.graphTree.on("node:mouseleave", (e) => {
        const nodeItem = e.item;
        this.graphTree.setItemState(nodeItem, "hover", false);
      });
    },
  },

  watch: {
    ser: {
      handler: function (newV, oldV) {
        console.log("serviceOptions 改变了");
        this.serviceList = newV;
      },
      deep: true,
      immediate: true,
    },
    // graph: {
    //   handler: function (newV, oldV) {
    //     console.log("newV ==> ", newV, "oldV ==> ", oldV);
    //   },
    //   deep: true,
    //   immediate: true,
    // },
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

/* trace 详情样式 */
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
.drawer-style {
  .el-drawer__body {
    padding: 0 20px;
  }
}

/* 树状图的样式 */
.tree-style {
  width: 200px;
  margin-right: 20px;
  overflow: auto;
  height: calc(100vh - 0px);
}

/* 日志详情 */
.logInfo {
  color: black;
  margin: 20px;
  margin-left: 10px;
  // font-size: 20px;
}

/* 基本信息 */
.baseInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 20px -20px 10px;
  div {
    margin-right: 80px;
    margin-bottom: 20px;
  }
}

.imple {
  display: flex;
  // justify-content: space-between;
  justify-content: flex-start;
  margin-bottom: 15px;
  width: 70%;
  // font-size: 20px;
}
</style>

<style>
/* 公共抽屉样式，增加y轴滚轮 */
.el-drawer.rtl {
  overflow-y: scroll;
}
</style>
