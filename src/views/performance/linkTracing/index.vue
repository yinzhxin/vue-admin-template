<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <!-- 筛选表单 -->
        <el-form :inline="true" :model="form" ref="form">
          <!-- TraceID -->
          <el-form-item label="">
            <el-input
              v-model="form.traceId"
              placeholder="请输入TraceID"
              clearable
            />
          </el-form-item>
          <!-- 所属应用，分组 -->
          <el-form-item label="">
            <el-select
              v-model="form.group"
              placeholder="所属应用"
              multiple
              clearable
            >
              <el-option
                v-for="item in appSelection"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 所属服务 -->
          <el-form-item label="">
            <el-select
              v-model="form.group2"
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
          <!-- ndpoint 名称 -->
          <el-form-item label="">
            <el-select
              v-model="form.ndpoint"
              placeholder="ndpoint 名称"
              multiple
              clearable
            >
              <el-option
                v-for="item in ndpointSelection"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 实例名称 -->
          <el-form-item label="">
            <el-select
              v-model="form.instance"
              placeholder="实例名称"
              multiple
              clearable
            >
              <el-option
                v-for="item in instanceSelection"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 状态：成功/失败 -->
          <el-form-item label="">
            <el-select v-model="form.status" placeholder="">
              <el-option label="成功" value="success"></el-option>
              <el-option label="失败" value="fail"></el-option>
            </el-select>
          </el-form-item>
          <!-- 总耗时 -->
          <el-form-item label="">
            <el-input v-model="form.time" placeholder="请输入" clearable />
          </el-form-item>
          <!-- 按钮：搜索/清空 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">
              搜索
            </el-button>
            <el-button class="clearBtn" @click="onSubmit">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <div style="margin: 10px 0 15px 0">
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
          <div style="margin: 20px 0 15px 0">
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
      :title="drawerTitle"
      :visible.sync="drawerVisible"
      :before-close="closeDrawer"
      size="70%"
    >
      <div class="tabText">
        <div style="margin-right: 80px; margin-bottom: 20px">
          <el-tag style="color: #0fc7c1">TraceID</el-tag>
        </div>
        <div style="margin-right: 80px; margin-bottom: 20px">
          请求时间：2023-10-10 20：13：45
        </div>
        <div style="margin-right: 80px; margin-bottom: 20px">
          状态：<el-tag type="danger">失败</el-tag>
        </div>
        <div style="margin-right: 80px; margin-bottom: 20px">
          总耗时：100 ms
        </div>
        <div style="margin-right: 80px; margin-bottom: 20px">Span 数：30</div>
        <div style="margin-right: 80px; margin-bottom: 20px">深度：16</div>
      </div>

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin-left: 10px"
      >
        <el-tab-pane label="树形" name="1"></el-tab-pane>
        <el-tab-pane label="Span列表" name="2"></el-tab-pane>
        <el-tab-pane label="拓扑图" name="3"></el-tab-pane>
      </el-tabs>

      <div class="drawer-content">
        <div
          id="container"
          style="height: 200%; width: 40%;"
        />
        <BarYChart :height="'100%'" :width="'100%'" />
      </div>

      <el-drawer
        title="TraceId: 11ebdfda-d943-4508-8a41-130774c1a12f"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        size="70%"
        custom-class="my-drawer"
      >
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
import { tableData } from "@/mock/test/linkTracing";
import BarYChart from "./BarYChart";
import { data } from "./data.js";

export default {
  name: "LinkTracing",
  components: { Table, BarYChart },
  data() {
    return {
      data,
      graph: "",

      dialogVisible: false,

      drawerVisible: false,
      drawerTitle: "",

      activeName: "1",
      activeName2: "1",

      spanRadio: "all",

      form: {
        traceId: "",
        app: "no",
        server: "shop_user",
        ndpoint: "",
        instance: "",
        status: "fail",
        time: "",
      },

      // 所属应用
      appSelection: [
        { label: "未分组", value: "no" },
        { label: "aaa", value: "aaa" },
        { label: "bbb", value: "bbb" },
        { label: "ccc", value: "ccc" },
      ],
      // 所属服务
      serverSelection: [
        { label: "未服务", value: "no" },
        { label: "shop_user", value: "shop_user" },
        { label: "shop_xxx", value: "shop_xxx" },
        { label: "shop_yyy", value: "shop_yyy" },
      ],
      // ndpoint 名称
      ndpointSelection: [
        { label: "aaa", value: "aaa" },
        { label: "bbb", value: "bbb" },
        { label: "ccc", value: "ccc" },
        { label: "ddd", value: "ddd" },
      ],
      // 实例名称
      instanceSelection: [
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
            label: "ndpoint 名称",
            index: "ndpoint",
            render(h, data) {
              return (
                <div style="cursor:pointer">
                  {data.row.status == "fail" ? (
                    <span style="display: inline-block; width:2px; height:25px; background-color:#f56c6c; vertical-align:middle; margin-right:5px"></span>
                  ) : (
                    <span> </span>
                  )}
                  {data.row.ndpoint}
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
          { label: "耗时", index: "time", sortable: true },
          { label: "请求时间", index: "requestTime", sortable: true },
          { label: "TraceID", index: "traceId" },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 20, // 每页条数--handleSizeChange
          count: 1, // 总页数
        },
      },
    };
  },

  created() {},

  methods: {
    // 分页器
    handleSizeChange() {},
    handleCurrentChange() {},

    // 处理数据
    processData(data) {
      const result = {
        label: [],
        chartData: [],
      };

      this.extractData(data, result);

      const duringTime = [];
      const pendingTime = [];
      const stayingTime = [];

      for (let i = 0; i < result.chartData.length; i++) {
        for (let j = 0; j < result.chartData[i].length; j++) {
          duringTime.push(result.chartData[i][j].duringTime);
          pendingTime.push(result.chartData[i][j].pendingTime);
          stayingTime.push(result.chartData[i][j].stayingTime);
        }
      }
    },

    // 递归
    extractData(obj, result) {
      if (obj.hasOwnProperty("chartData") || obj.hasOwnProperty("label")) {
        result.label.push(obj.label);
        result.chartData.push(obj.chartData);
      }

      if (obj.hasOwnProperty("children") && Array.isArray(obj.children)) {
        obj.children.forEach((child) => {
          this.extractData(child, result);
        });
      }
    },

    // 点击表格行
    handleRowClick(row) {
      // console.log("每行的数据", row);
      this.drawerTitle = "TraceId: 根节点的label";
      this.openDrawer();
    },

    // 打开抽屉
    openDrawer() {
      this.array = [];
      this.processData(this.data);
      this.$nextTick(() => {
        this.initGraph();
      });
      this.drawerVisible = true;
    },

    // 关闭抽屉
    closeDrawer(done) {
      this.drawerVisible = false;
      this.graph.destroy(); // 销毁图形实体
    },

    // handleOpenDrawer() {
    //   this.$nextTick(() => {
    //     this.initGraph();
    //   });
    // },

    // tab组件的切换函数
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 打开内部的抽屉组件
    open() {
      // this.initGraph2()
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

    // 初始化画布
    initGraph() {
      // 自定义事件
      G6.registerBehavior("behaviorName", {
        getEvents() {
          return {
            "node:click": "onClick",
          };
        },
        onClick: (evt) => {
          console.log("自定义事件 ==>", evt);
          // console.log(this)
          const node = evt.item;
          const graph = this.graph;
          const point = { x: evt.x, y: evt.y };
          const model = node.getModel();
          // ==================TODO=====================
          // this.dialogVisible = true;
          this.open();
        },
      });

      const container = document.getElementById("container");
      const width =  600;
      const height = container.scrollHeight || 2000;
      console.log(width, height);
      const graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        // 模式
        modes: {
          default: ["behaviorName"], // 禁止拖拽和缩放
        },
        // 全局配置节点
        defaultNode: {
          size: 10,
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
          ],
        },
        // 全局配置边
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 10,
            offset: 10,
            lineWidth: 2,
          },
        },
        // 布局
        layout: {
          type: "indented",
          direction: "H",
          indent: 20,
          getHeight: () => {
            return 30;
          },
          getWidth: () => {
            return 8;
          },
          getSide: (d) => {
            return "right";
          },
        },
      });

      // 动态配置节点
      graph.node((node) => {
        if (node.depth === 0) {
          node.style = {
            fill: "#fff",
            stroke: "#9A60B4",
            lineWidth: 3,
          };
        } else if (node.depth === 1) {
          node.style = {
            fill: "#fff",
            stroke: "#BE76DE",
            lineWidth: 3,
          };
        } else if (node.depth === 2) {
          node.style = {
            fill: "#fff",
            stroke: "#CF81F2",
            lineWidth: 3,
          };
        } else if (node.depth === 3) {
          node.style = {
            fill: "#fff",
            stroke: "#EA7CCC",
            lineWidth: 3,
          };
        } else if (node.depth === 4) {
          node.style = {
            fill: "#fff",
            stroke: "#EE8AF8",
            lineWidth: 3,
          };
        } else if (node.depth === 5) {
          node.style = {
            fill: "#fff",
            stroke: "#3F48CC",
            lineWidth: 3,
          };
        } else if (node.depth === 6) {
          node.style = {
            fill: "#fff",
            stroke: "#0094D4",
            lineWidth: 3,
          };
        } else if (node.depth === 7) {
          node.style = {
            fill: "#fff",
            stroke: "#00A2E8",
            lineWidth: 3,
          };
        } else if (node.depth === 8) {
          node.style = {
            fill: "#fff",
            stroke: "#00ABF5",
            lineWidth: 3,
          };
        } else if (node.depth === 9) {
          node.style = {
            fill: "#fff",
            stroke: "#99D9EA",
            lineWidth: 3,
          };
        } else if (node.depth === 10) {
          node.style = {
            fill: "#fff",
            stroke: "#22B14C",
            lineWidth: 3,
          };
        } else if (node.depth === 11) {
          node.style = {
            fill: "#fff",
            stroke: "#B5E61D",
            lineWidth: 3,
          };
        }

        return {
          label: node.label,
          labelCfg: {
            position: "right",
            // offset: 5,
          },
        };
      });

      graph.data(this.data);
      graph.render();
      graph.fitView();
      // graph.translate(0, 55);

      this.graph = graph;
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #ffffff;
$font-color: #4b4b4b;

.grid-content {
  padding: 10px;
  background: $bg;
  min-height: 200px;
  overflow: hidden;
}

.el-drawer__body > * {
  margin-bottom: -15px;
}

.drawer-content {
  height: 100%;
  overflow-y: hidden;
  display: flex;
  // justify-content: center;
}

.tabText {
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 20px;
}

.el-button--primary {
  background-color: #0fc7c1;
  border-color: #0fc7c1;
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #0fc7c1;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #d9f3f2;
}

// .el-tabs__item {
//   padding: 0 40px;
//   font-size: 20px;
// }
// .el-tabs__item.is-active {
//   color: #0fc7c1;
// }
.my-card {
  background-color: #eaeaea;
  color: black;
}
</style>

<style>
.el-drawer.rtl {
  overflow: scroll;
}
</style>
