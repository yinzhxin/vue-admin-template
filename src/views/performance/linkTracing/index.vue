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
            <el-time-picker
              is-range
              v-model="form.time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
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
          <div style="margin: 15px 0">
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
        </div>
        <!-- <BarYChart
          :width="'100%'"
          :height="'300%'"
          :chart-data="chartData3"
          :title="`计算组件`"
        /> -->
      </el-col>
    </el-row>

    <el-drawer
      style="overflow: auto"
      :title="drawerTitle"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      @open="handleOpenDrawer"
      size="70%"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="树形" name="1"></el-tab-pane>
        <el-tab-pane label="Span列表" name="2"></el-tab-pane>
        <el-tab-pane label="拓扑图" name="3"></el-tab-pane>
      </el-tabs>
      <div style="display: flex">
        <div
          id="container"
          style="background: #f6f9fc; height: 1000px; width: 400px"
        ></div>

        <BarYChart
          :width="'1000px'"
          :height="'1000px'"
          :chart-data="chartData3"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import * as echarts from "echarts";
import G6 from "@antv/g6";
import Table from "@/views/components/Table.vue";
import { tableData } from "@/mock/test/linkTracing";

import BarYChart from "./BarYChart";

export default {
  name: "LinkTracing",
  components: { Table, BarYChart },
  data() {
    return {
      // getTreedata: [
      //   {
      //     id: 1,
      //     indexTitle: 1,
      //     indexList: [
      //       {
      //         id: 1,
      //         indexTitle: "indexTitle",
      //         indexList: [
      //           {
      //             id: 1,
      //             indexName: "indexName",
      //             newData: "newData",
      //             tarData: "tarData",
      //             status: 1,
      //           },
      //           {
      //             id: 2,
      //             indexName: "indexName2",
      //             newData: "newData2",
      //             tarData: "tarData2",
      //             status: 1,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      // treedata: [],

      data: {
        id: "Modeling Methods",
        children: [
          {
            id: "Consensus",
            children: [
              {
                id: "Models diversity",
                children: [
                  {
                    id: "Different initializations",
                  },
                  {
                    id: "Different parameter choices",
                  },
                  {
                    id: "Different architectures",
                  },
                  {
                    id: "Different modeling methods",
                  },
                  {
                    id: "Different training sets",
                  },
                  {
                    id: "Different feature sets",
                  },
                ],
              },
              {
                id: "Methods",
                children: [
                  {
                    id: "Classifier selection",
                  },
                  {
                    id: "Classifier fusion",
                  },
                ],
              },
              {
                id: "Common",
                children: [
                  {
                    id: "Bagging",
                  },
                  {
                    id: "Boosting",
                  },
                  {
                    id: "AdaBoost",
                  },
                ],
              },
            ],
          },
        ],
      },

      drawer: false,
      drawerTitle: "",
      activeName: "1",

      spanRadio: "all",
      form: {
        traceId: "",
        app: "no",
        server: "shop_user",
        ndpoint: "",
        instance: "",
        status: "fail",
        time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
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
              return <div style="cursor:pointer">{data.row.ndpoint}</div>;
            },
          },
          { label: "所属服务", index: "server" },
          { label: "所属应用", index: "app" },
          { label: "状态", index: "status" },
          { label: "耗时", index: "time", sortable: true },
          { label: "请求时间", index: "requestTime", sortable: true },
          { label: "TraceID", index: "traceId" },
        ],
      },

      // 柱状图
      chartData3: {
        fields: [{ name: "运行中", flied: "yxz" }],
        data: [
          { label: "", yxz: "4" },
          { label: "", yxz: "0" },
          { label: "", yxz: "0" },
          { label: "", yxz: "4" },
          { label: "", yxz: "0" },
          { label: "", yxz: "0" },
          { label: "", yxz: "4" },
          { label: "", yxz: "0" },
          { label: "", yxz: "0" },
          { label: "", yxz: "4" },
          { label: "", yxz: "0" },
          { label: "", yxz: "0" },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    changeDrawer() {
      this.drawer = true;
    },
    handleOpenDrawer() {
      this.$nextTick(() => {
        this.initGraph();
      });
    },
    handleRowClick(row) {
      console.log(row);
      this.drawerTitle = row.ndpoint;
      this.changeDrawer();
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(done) {
      this.$confirm("确认关闭吗？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    open() {
      // this.initGraph2()
      this.dialogVisible = true;
    },

    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },

    initGraph() {
      const container = document.getElementById("container");
      const width = 400;
      const height = container.scrollHeight || 500;
      const graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        modes: {
          // default: ["zoom-canvas"],
        },
        defaultNode: {
          size: 10,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: "cubic-vertical",
        },
        layout: {
          type: "indented",
          direction: "H",
          indent: 20,
          getHeight: () => {
            return 5;
          },
          getWidth: () => {
            return 40;
          },
          getSide: (d) => {
            if (d.id === "Regression" || d.id === "Classification")
              return "left";
            return "right";
          },
        },
      });

      let centerX = 0;
      graph.node(function (node) {
        if (node.id === "Modeling Methods") {
          centerX = node.x;
        }
        return {
          label: node.id,
          labelCfg: {
            position: "right",
            // node.children && node.children.length > 0
            //   ? "left"
            //   : node.x > centerX
            //   ? "right"
            //   : "left",
            offset: 5,
          },
        };
      });

      graph.data(this.data);
      graph.render();
      graph.fitView();

      graph.translate(0, -20);
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

// .container {
//   overflow: auto;
// }

.el-drawer__body > * {
  margin-bottom: -15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
