<template>
  <div class="wrap-container">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="form">
      <!-- 拓扑图/列表 -->
      <el-form-item label="">
        <el-radio-group v-model="form.radio" @change="handleChange">
          <el-radio-button label="list">
            <i class="el-icon-tickets"></i>
            列表
          </el-radio-button>
          <el-radio-button label="topo">
            <i class="el-icon-share"></i>
            拓扑图
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 所属应用 -->
      <el-form-item label="">
        <el-select
          v-model="form.app"
          placeholder="所属应用"
          multiple
          clearable
        >
          <el-option label="app1" value="app1"></el-option>
          <el-option label="app2" value="app2"></el-option>
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
          <el-option label="server1" value="server1"></el-option>
          <el-option label="server1" value="server1"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSearch('form')">
          搜索
        </el-button>
        <el-button class="clearBtn" @click="handleClear('form')">
          清空
        </el-button>
      </el-form-item>
    </el-form>

    <div v-if="!isTotalTopo&&form.radio == 'topo'" class="back-div">
      <i class="el-icon-back toTotalTopo" @click="handleBack">
        返回总拓扑图
      </i>
      <el-select v-model="toTotalTopo" @click="handleChangeserverId">
        <el-option
          v-for="item in serverIdOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <!-- 拓扑图 / 列表 -->
    <div class="topo">
      <div v-if="form.radio == 'topo'">
        <!-- 创建容器 -->
        <div id="container"></div>
      </div>

      <template v-else>
        <!-- 列表 -->
        <Table :table-data="table.tableData" :columns="table.columns" />
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
      </template>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import G6 from "@antv/g6";
import { getTopo } from "@/api/topo";
import Table from "@/views/components/Table";

export default {
  name: "ServiceTopo",
  components: { Table },

  data() {
    return {
      form: {
        radio: "topo", // 默认拓扑图
        app: "", // 所属应用
        server: "", // 所属服务
      },

      toTotalTopo: "", // 返回总拓扑图右边的选框
      serverIdOption: "", // 返回总拓扑图右边的选框的选项数组
      isTotalTopo: true, // 是否是总拓扑图

      graph: null, // 图表实例
      graphData: "", // 图表数据
      graphStreamData: "", // 上下游图表数据

      edgesArray: "",
      nodesArray: "",
      combosArray: "",

      // 表格数据
      table: {
        tableData: "",
        columns: [
          {
            label: "服务名称",
            index: "serverName",
            render(h, data) {
              return (
                <div style="cursor:pointer;color:#0fc7c1">
                  {data.row.serverName}
                </div>
              );
            },
            width: "300px",
          },
          { label: "所属应用", index: "serverSystemGroup" },
          { label: "实例数", index: "instanceNum" },
          { label: "Apdex", index: "apdex" },
          { label: "请求数", index: "reqNum", sortable: true },
          { label: "平均吞吐量", index: "avgThroughput", sortable: true },
          { label: "错误率", index: "errorRate", sortable: true },
          { label: "平均响应时间", index: "avgResponseTime", sortable: true },
          { label: "P75响应时间", index: "p75ResponseTime", sortable: true },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 20, // 每页条数--handleSizeChange
          count: 1, // 总页数
        },
      },
    };
  },

  watch: {
    graphData: {
      handler: function (newV, oldV) {
        console.log("总拓扑图 ==> newV ==>", newV, "oldV ==>", oldV);
      },
      deep: true,
    },
    graphStreamData: {
      handler: function (newV, oldV) {
        console.log("上下游拓扑图 ==> newV ==>", newV, "oldV ==>", oldV);
      },
      deep: true,
    },
  },

  mounted() {
    getTopo({
      startTime: 0,
      endTime: 0,
      systemName: "eoitek-shoping",
    })
      .then((res) => {
        this.table.tableData = res.nodes;

        // 边
        this.edgesArray = res.access.map((item) => {
          const newItem = { ...item };
          // 起始id
          newItem.source = newItem["source_id"];
          // 目的id
          newItem.target = newItem["target_id"];
          // 边的文本文字
          newItem.label = `${item["request_num"]}req ${item["average_time"]}ms`;

          delete newItem["source_id"];
          delete newItem["target_id"];
          delete newItem["request_num"];

          return newItem;
        });

        // 节点
        this.nodesArray = res.nodes.map((item) => {
          const newItem = { ...item };
          newItem.id = newItem["serverId"]; // "serverId" / "serverName"
          newItem.label = newItem["serverId"];
          newItem.comboId = newItem["serverSystem"]; // "eoitek-shoping"
          newItem.imgType = newItem["serverType"]; // "web"

          return newItem;
        });

        // 分组，是默认一个
        this.combosArray = [
          {
            id: "eoitek-shoping", // 唯一的标志符，标识不同分组
            label: "eoitek-shoping", // 分组的标签
            collapsed: false, // 默认不折叠
          },
        ];

        // 初始化服务选项数组
        this.serverIdOption = this.nodesArray.map((item) => {
          return { label: item.label, value: item.label };
        });

        // 初始化总拓扑图
        this.initGraph();
      })
      .catch(() => {});
  },

  beforeDestroy() {
    // 清除数据
    this.graphData = "";
    this.graphStreamData = "";
    // 销毁画布
    this.graph.destroy();
    // 实例销毁
    this.graph = null;
  },

  methods: {
    // 分页器
    handleSizeChange() {},
    handleCurrentChange() {},

    // 搜索
    handleSearch(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },

    // 清空
    handleClear(ruleForm) {
      // 表单清空
      this.form = {
        radio: "topo",
        app: "",
        server: "",
      };

      // 1.返回总拓扑图
      // this.isTotalTopo = true;
      // this.updateData(this.graphData);
      // this.renderGraph();

      // 2.重新初始化
      this.isTotalTopo = true;
      this.graph.destroy();
      this.graph = null;
      this.initGraph();
    },

    // 单选切换
    handleChange(value) {
      if (value == "topo") {
        this.isTotalTopo = true
        // 切换到topo，因切换到list时，实例被销毁，要重新初始化
        this.initGraph();
        // 实例被销毁，不用下面的方法
        // this.updateData(this.graphData);
        // this.renderGraph();
      } else {
        // 销毁实体
        this.graph.destroy();
        // 数据清空
        this.graph = null;
        this.graphData = {
          nodes: [],
          edges: [],
          combos: [],
        };
      }
    },

    // 跳转到链路追踪路由
    redirectTo(id) {
      this.$router.push({
        name: "LinkTracing",
        query: { serverId: id }, // 应用服务节点的'名称/id'
      });
    },

    // 右键菜单
    handleMenuClick(target, item) {
      // console.log(target.innerHTML, item);
      // 要查询的节点id--应用服务节点
      const nodeId = item._cfg.id;
      if (target.innerHTML == "查看链路") {
        this.redirectTo(item._cfg.model.label);
      } else if (target.innerHTML == "查看上下游") {
        this.toTotalTopo = item._cfg.model.label;
        // 获取上游和下游所有节点，上游节点--"source"，下游节点--"target"
        const allNodes = this.graph.getNeighbors(nodeId, undefined);
        // 根据获取的节点获取它们的id
        const allNodeIds = allNodes.map((node) => node.get("id"));
        // console.log("上游和下游节点的ID: ", allNodeIds);
        // 上下游节点的id和要查询id
        const ids = [...allNodeIds, nodeId];
        // 筛选
        const resNodes = this.nodesArray.filter((node) =>
          ids.includes(node.id)
        );
        // console.log("筛选结果: ", resNodes);

        const edgeIds = this.getEdgeIdsByNodeId(nodeId);
        // console.log("节点 " + nodeId + " 相关的边的 ID: ", edgeIds);
        const edgesInfo = this.getEdgesInfoByIds(edgeIds);
        // console.log(edgesInfo);

        // 更新图表数据
        this.graphStreamData = {
          nodes: resNodes,
          edges: this.edgesArray,
          combos: this.combosArray,
        };
        // 初始化图表数据
        this.updateData(this.graphStreamData);
        // 渲染
        this.renderGraph();
        // 显示返回总拓扑的标志
        this.isTotalTopo = !this.isTotalTopo;
      } else if (target.innerHTML == "查看告警") {
        alert("查看告警");
      } else if (target.innerHTML == "查看服务详情") {
        alert("查看服务详情");
      }
    },

    // 获取节点的边的 ID
    getEdgeIdsByNodeId(nodeId) {
      const edges = this.graph.getEdges();
      const edgeIds = edges
        .filter(
          (edge) =>
            edge.getSource().get("id") === nodeId ||
            edge.getTarget().get("id") === nodeId
        )
        .map((edge) => edge.get("id"));
      return edgeIds;
    },

    // 获取边的详细信息
    getEdgesInfoByIds(edgeIds) {
      const edgeInfoArray = [];
      for (const edgeId of edgeIds) {
        const edge = this.graph.findById(edgeId);
        if (edge) {
          const sourceNode = edge.getSource();
          const targetNode = edge.getTarget();
          const sourceNodeId = sourceNode.get("id");
          const targetNodeId = targetNode.get("id");
          const label = edge.get("label");
          edgeInfoArray.push({
            id: edgeId,
            sourceNodeId,
            targetNodeId,
            label,
          });
        }
      }
      return edgeInfoArray;
    },

    // 返回总拓扑
    handleBack() {
      this.isTotalTopo = !this.isTotalTopo;
      this.graphStreamData = "";

      // 重新渲染
      this.updateData(this.graphData);
      this.renderGraph();

      // 重新初始化
      this.graph = null;
      this.graphData = "";
      this.initGraph();
    },

    // 服务名称
    handleChangeserverId(val) {},

    // 更新图表数据，初次渲染也调用data方法
    updateData(newData) {
      this.graph.data(newData);
    },

    // 渲染图表
    renderGraph() {
      this.graph.render();
    },

    // 初始化图表
    initCharts(charts) {
      charts.forEach((chart) => {
        console.log("cc");
        const { container, options } = chart;
        const echartsInstance = echarts.init(container);
        echartsInstance.setOption(options);
      });
    },

    // 初始化图表--在初始化和tab栏切换时候调用
    initGraph() {
      // ContextMenu 是右键菜单，通常是对节点进行进一步操作的组件。
      // 例如：通过右键菜单实现节点的复制，删除，反选，对选择的节点发起新画布分析，或者进行打标，发起关系扩散，数据请求之类的高级自定义行为。
      // 图分析产品中的 右键菜单往往是和 浏览器网页 的右键菜单 交互与展示形式保持一致，但是也有特殊的形状类型，比如右键仪表盘菜单。
      const contextMenu = new G6.Menu({
        getContent(evt) {
          return `
            <div style="cursor:pointer; margin:-5px 10px;">
                <h3> <i class="el-icon-connection"></i> <span />查看上下游</h3>
                <h3> <i class="el-icon-document"></i> <span />查看服务详情</h3>
                <h3> <i class="el-icon-share"></i> <span />查看链路</h3>
                <h3> <i class="el-icon-bell"></i> <span />查看告警</h3>
            </div>`;
        },
        handleMenuClick: this.handleMenuClick,
        // 需要加上父级容器的 padding-left 16、自身偏移量 10
        offsetX: 16 + 20,
        // 需要加上父级容器的 padding-top 24、画布兄弟元素高度、自身偏移量 10
        offsetY: 0,
        // 在什么类型的元素上响应，是节点
        itemTypes: ["node"],
      });

      // 提示框组件
      const tooltip = new G6.Tooltip({
        // tooltip相对于鼠标位置的偏移量，用于设置提示框的位置偏移，默认值是 (10, 10)
        offsetX: 30,
        offsetY: 10,
        // 允许出现 tooltip 的 item 类型，是节点
        itemTypes: ["node"],
        // 自定义 tooltip 内容
        getContent: (e) => {
          console.log("tooltip");
          const node_type = e.item.getType();
          const node = e.item.getModel();
          const comboTitle = `${node.serverSystem} / ${node.serverSystemGroup}`;
          // 创建一个容器元素 outDiv，并设置其样式和内容
          const outDiv = document.createElement("div");
          // 设置容器宽度为内容适应宽度
          outDiv.style.width = "fit-content";
          outDiv.style.padding = "0";
          // 使用 HTML 字符串构建 Tooltip 的内容
          // <div id="chart-${node.id}" style="width: 200px; height: 100px;"></div>
          outDiv.innerHTML = `
                <strong style="font-size: 15px"> ${node.label} </strong> <br />

                <span style="font-size: 14px"> ${comboTitle} </span>

                <div style="display: flex; align-items: center; flex-direction: row; justify-content:space-between">
                    <div> 请求数：${node.requestNum} </div>
                    <div id="chart-requestGraph${node.label}" style="width: 300px; height: 80px;"></div>
                </div>

                <div style="display: flex; align-items: center; flex-direction: row; justify-content:space-between">
                    <div> 错误率：${node.errorRate} </div>
                    <div id="chart-errorGraph${node.label}" style="width: 300px; height: 80px;"></div>
                </div>

                <div style="display: flex; align-items: center; flex-direction: row; justify-content:space-between">
                    <div> 平均响应时间：${node.responseTime} </div>
                    <div id='chart-responseGraph${node.label}' style="width: 300px; height: 80px;"></div>
                </div>

                <div>
                    告警数：
                    紧急:
                    <span style="color:red"> ${node.urgentAlarmNum} </span>
                    严重:
                    <span style="color:orange"> ${node.severeAlarmNum} </span>
                </div>
                `;

          // const chartContainer = outDiv.querySelector(`#chart-requestGraph`);
          // const chart = echarts.init(chartContainer);
          let data = node.requestGraph;
          let dateList = data.map((item) => item.value); // 获取数据中的数值--x
          let valueList = data.map((item) => item.name); // 获取数据中的标签--y

          let data1 = node.errorGraph;
          let dateList1 = data1.map((item) => item.value); // 获取数据中的数值--x
          let valueList1 = data1.map((item) => item.name); // 获取数据中的标签--y

          let data2 = node.responseGraph;
          let dateList2 = data2.map((item) => item.value); // 获取数据中的数值--x
          let valueList2 = data2.map((item) => item.name); // 获取数据中的标签--y

          // console.log(data,data1,data2)

          // const options = {
          //   // grid: {
          //   //   top: 20,
          //   //   bottom: 20,
          //   //   left: 30,
          //   //   right: 20,
          //   // },
          //   xAxis: [
          //     {
          //       type: "category",
          //       data: dateList,
          //       axisLine: {
          //         show: false, // 隐藏轴线
          //       },
          //       axisTick: {
          //         show: false, // 隐藏刻度
          //       },
          //       axisLabel: {
          //         show: false, // 隐藏刻度文本
          //       },
          //       splitLine: {
          //         show: false, // 隐藏背景中的横线
          //       },
          //     },
          //   ],
          //   yAxis: [
          //     {
          //       type: "value",
          //       axisLine: {
          //         show: false, // 隐藏轴线
          //       },
          //       axisTick: {
          //         show: false, // 隐藏刻度
          //       },
          //       axisLabel: {
          //         show: false, // 隐藏刻度文本
          //       },
          //       splitLine: {
          //         show: false, // 隐藏背景中的横线
          //       },
          //     },
          //   ],
          //   series: [
          //     {
          //       type: "line",
          //       data: valueList,
          //       smooth: true,
          //       symbol: "none", // 隐藏小圆点
          //       //给折线图下方添加阴影
          //       areaStyle: {
          //         normal: {
          //           color: new echarts.graphic.LinearGradient(
          //             0,
          //             0,
          //             0,
          //             1,
          //             [
          //               {
          //                 offset: 0,
          //                 color: "rgba(59, 34, 201,.4)",
          //               },
          //               {
          //                 offset: 1,
          //                 color: "rgba(16, 25, 112,0.2)",
          //               },
          //             ],
          //             false
          //           ),
          //           shadowColor: "rgba(59, 34, 201,1)",
          //           shadowBlur: 10,
          //         },
          //       },
          //       // itemStyle: {
          //       //   normal: {
          //       //     show: false,
          //       //     color: "#3282FF", //改变折线点的颜色
          //       //     lineStyle: {
          //       //       color: "#3282FF", //改变折线颜色
          //       //     },
          //       //   },
          //       //   emphasis: {
          //       //     show: true,
          //       //     color: "#3282FF",
          //       //     borderColor: "#ffffff",
          //       //     label: {
          //       //       show: true, //开启显示
          //       //       position: "top", //在上方显示
          //       //       textStyle: {
          //       //         //数值样式
          //       //         color: "#fff",
          //       //         fontSize: 16,
          //       //         padding: [10, 10, 10, 10],
          //       //         backgroundColor: "rgba(24, 71, 185, .6)",
          //       //         borderRadius: 4,
          //       //       },
          //       //     },
          //       //   },
          //       // },
          //     },
          //   ],
          // };
          // chart.setOption(options);

          const charts = [
            {
              container: outDiv.querySelector(
                `#chart-requestGraph${node.label}`
              ),
              options: {
                // grid: {
                //   top: 20,
                //   bottom: 20,
                //   left: 30,
                //   right: 20,
                // },
                xAxis: [
                  {
                    type: "category",
                    data: dateList,
                    // axisLine: {
                    //   show: false, // 隐藏轴线
                    // },
                    // axisTick: {
                    //   show: false, // 隐藏刻度
                    // },
                    // axisLabel: {
                    //   show: false, // 隐藏刻度文本
                    // },
                    // splitLine: {
                    //   show: false, // 隐藏背景中的横线
                    // },
                  },
                ],
                yAxis: [
                  {
                    type: "value",
                    // axisLine: {
                    //   // show: false, // 隐藏轴线
                    // },
                    // axisTick: {
                    //   // show: false, // 隐藏刻度
                    // },
                    // axisLabel: {
                    //   // show: false, // 隐藏刻度文本
                    // },
                    // splitLine: {
                    //   show: false, // 隐藏背景中的横线
                    // },
                  },
                ],
                series: [
                  {
                    type: "line",
                    data: valueList,
                    smooth: true,
                    symbol: "none", // 隐藏小圆点
                    //给折线图下方添加阴影
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "rgba(59, 34, 201,.4)",
                            },
                            {
                              offset: 1,
                              color: "rgba(16, 25, 112,0.2)",
                            },
                          ],
                          false
                        ),
                        shadowColor: "#3282FF",
                        shadowBlur: 10,
                      },
                    },
                  },
                ],
              },
            },
            {
              container: outDiv.querySelector(`#chart-errorGraph${node.label}`),
              data: node.responseTimeGraph,
              options: {
                // grid: {
                //   top: 20,
                //   bottom: 20,
                //   left: 30,
                //   right: 20,
                // },
                xAxis: [
                  {
                    type: "category",
                    data: dateList1,
                    // axisLine: {
                    //   show: false, // 隐藏轴线
                    // },
                    // axisTick: {
                    //   show: false, // 隐藏刻度
                    // },
                    // axisLabel: {
                    //   show: false, // 隐藏刻度文本
                    // },
                    // splitLine: {
                    //   show: false, // 隐藏背景中的横线
                    // },
                  },
                ],
                yAxis: [
                  {
                    type: "value",
                    // axisLine: {
                    //   show: false, // 隐藏轴线
                    // },
                    // axisTick: {
                    //   show: false, // 隐藏刻度
                    // },
                    // axisLabel: {
                    //   show: false, // 隐藏刻度文本
                    // },
                    // splitLine: {
                    //   show: false, // 隐藏背景中的横线
                    // },
                  },
                ],
                series: [
                  {
                    type: "line",
                    data: valueList1,
                    smooth: true,
                    symbol: "none", // 隐藏小圆点
                    //给折线图下方添加阴影
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "rgba(59, 34, 201,.4)",
                            },
                            {
                              offset: 1,
                              color: "rgba(16, 25, 112,0.2)",
                            },
                          ],
                          false
                        ),
                        shadowColor: "#3282FF",
                        shadowBlur: 10,
                      },
                    },
                    // itemStyle: {
                    //   normal: {
                    //     show: false,
                    //     color: "#3282FF", //改变折线点的颜色
                    //     lineStyle: {
                    //       color: "#3282FF", //改变折线颜色
                    //     },
                    //   },
                    //   emphasis: {
                    //     show: true,
                    //     color: "#3282FF",
                    //     borderColor: "#ffffff",
                    //     label: {
                    //       show: true, //开启显示
                    //       position: "top", //在上方显示
                    //       textStyle: {
                    //         //数值样式
                    //         color: "#fff",
                    //         fontSize: 16,
                    //         padding: [10, 10, 10, 10],
                    //         backgroundColor: "rgba(24, 71, 185, .6)",
                    //         borderRadius: 4,
                    //       },
                    //     },
                    //   },
                    // },
                  },
                ],
              },
            },
            {
              container: outDiv.querySelector(
                `#chart-responseGraph${node.label}`
              ),
              data: node.newGraph,
              options: {
                // grid: {
                //   top: 20,
                //   bottom: 20,
                //   left: 30,
                //   right: 20,
                // },
                xAxis: [
                  {
                    type: "category",
                    data: dateList2,
                    // axisLine: {
                    //   show: false, // 隐藏轴线
                    // },
                    // axisTick: {
                    //   show: false, // 隐藏刻度
                    // },
                    // axisLabel: {
                    //   show: false, // 隐藏刻度文本
                    // },
                    // splitLine: {
                    //   show: false, // 隐藏背景中的横线
                    // },
                  },
                ],
                yAxis: [
                  {
                    type: "value",
                    // axisLine: {
                    //   show: false, // 隐藏轴线
                    // },
                    // axisTick: {
                    //   show: false, // 隐藏刻度
                    // },
                    // axisLabel: {
                    //   show: false, // 隐藏刻度文本
                    // },
                    // splitLine: {
                    //   show: false, // 隐藏背景中的横线
                    // },
                  },
                ],
                series: [
                  {
                    type: "line",
                    data: valueList2,
                    smooth: true,
                    symbol: "none", // 隐藏小圆点
                    //给折线图下方添加阴影
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "rgba(59, 34, 201,.4)",
                            },
                            {
                              offset: 1,
                              color: "rgba(16, 25, 112,0.2)",
                            },
                          ],
                          false
                        ),
                        shadowColor: "#3282FF",
                        shadowBlur: 10,
                      },
                    },
                    // itemStyle: {
                    //   normal: {
                    //     show: false,
                    //     color: "#3282FF", //改变折线点的颜色
                    //     lineStyle: {
                    //       color: "#3282FF", //改变折线颜色
                    //     },
                    //   },
                    //   emphasis: {
                    //     show: true,
                    //     color: "#3282FF",
                    //     borderColor: "#ffffff",
                    //     label: {
                    //       show: true, //开启显示
                    //       position: "top", //在上方显示
                    //       textStyle: {
                    //         //数值样式
                    //         color: "#fff",
                    //         fontSize: 16,
                    //         padding: [10, 10, 10, 10],
                    //         backgroundColor: "rgba(24, 71, 185, .6)",
                    //         borderRadius: 4,
                    //       },
                    //     },
                    //   },
                    // },
                  },
                ],
              },
            },
          ];

          this.initCharts(charts);

          // 返回 outDiv，作为 Tooltip 实例的内容
          return outDiv;
        },
      });

      // The symbols for the marker inside the combo
      const collapseIcon = (x, y, r) => {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y],
        ];
      };

      const expandIcon = (x, y, r) => {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y],
          ["M", x - r + r, y - r + 4],
          ["L", x, y + r - 4],
        ];
      };

      G6.registerCombo(
        "cCircle",
        {
          drawShape: function draw(cfg, group) {
            const self = this;
            // 获取形状样式，其中 style.r 对应于内置矩形组合图中的 R
            const style = self.getShapeStyle(cfg);
            console.log(style);
            // 添加一个圆形作为键形状，与扩展的“圆形”类型组合相同
            const circle = group.addShape("circle", {
              attrs: {
                ...style,
                x: 0,
                y: 0,
                r: style.r,
              },
              draggable: true,
              name: "combo-keyShape",
            });
            // 在底部添加标记
            const marker = group.addShape("marker", {
              attrs: {
                ...style,
                fill: "#fff",
                opacity: 1,
                x: 0,
                y: style.r,
                r: 30,
                symbol: collapseIcon,
                lineWidth: 7,
                lineDash: [0, 0],
              },
              draggable: true,
              name: "combo-marker-shape",
            });

            console.log(marker);

            return circle;
          },
          // 定义标记的更新逻辑
          afterUpdate: function afterUpdate(cfg, combo) {
            const self = this;
            // 获取形状样式，其中 style.r 对应于内置矩形组合图中的 R
            const style = self.getShapeStyle(cfg);
            // 从 combo 对象中获取图形组 group
            const group = combo.get("group");
            // 在组合的图形组中查找标记形状
            const marker = group.find(
              (ele) => ele.get("name") === "combo-marker-shape"
            );
            // 更新标记形状
            marker.attr({
              x: 0,
              y: style.r,
              // 组合数据中的属性“折叠”表示组合的折叠状态，根据“折叠”更新符号
              symbol: cfg.collapsed ? expandIcon : collapseIcon,
            });
          },
        },
        "circle"
      );

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 700;

      // 创建图形实例
      this.graph = new G6.Graph({
        // 指定图形的容器--必须
        container: "container",
        // 指定图形的宽高--必须
        width,
        height,
        // 使图形自适应容器大小
        fitView: true,
        // 表示缩放时，图形和容器边界之间的最小距离，画布上四周的留白宽度
        fitViewPadding: 0, //或者是数组[10,20,30,40]
        fitCenter: true,
        // 设置图的最小缩放值，表示非常大的缩放比例即几乎不缩小
        minZoom: 0.00000001,
        // 若希望在带有 combo 的图上，节点、边、combo 的层级符合常规逻辑，需要将 groupByTypes 设置为 false
        // groupByTypes: false,
        // 布局算法配置对象
        layout: {
          type: "comboForce", // comboForce力导向布局，用于对包含组合的图进行布局，默认为random布局
          preventOverlap: true, // 防止节点重叠
          preventNodeOverlap: true,
          collideStrength: 1,
          nodeSize: 100, // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize

          // nodeSpacing: (d) => 20, // 指定节点之间的最小空间距离为 8
          center: [300, 300], // 可选，默认为图的中心
          linkDistance: 450, // 布局时边的距离长度，指定两个连接的节点之间的期望距离。值越大，节点之间的距离越远。
          nodeStrength: 200, // 节点的力量，用于决定节点受到的引力和斥力的强度。值越大，节点之间相互排斥的力量越强。
          edgeStrength: 1, // 边的力量，用于决定边的长度对布局的影响程度。值越小，边在布局中的长度越紧凑。
          // curveOffset: -100, // 设置曲线偏移量为负值。在布局中，边的形状可以是直线或曲线，通过调整此偏移量可以改变曲线的弯曲程度。
        },
        // 默认节点样式
        defaultNode: {
          type: "donut",
          size: 100,
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 25,
              fill: "black",
            },
          },
        },
        // 默认边的样式
        defaultEdge: {
          size: 3,
          // 边的样式配置信息对象
          style: {
            stroke: "#999", // 边的颜色，默认为空字符串表示使用默认颜色
            arrow: true, // 是否显示箭头
            endArrow: {
              path: G6.Arrow.vee(), // 箭头的路径描述
              d: 2, // 箭头的大小，默认为空，需填入具体数值
            },
          },
          // 标签的配置信息对象
          labelCfg: {
            autoRotate: true, // 标签是否自动旋转
            style: {
              stroke: "#fff", // 标签文字的边框颜色
              lineWidth: 5, // 标签文字的边框线宽
              fontSize: 20, // 标签文字的字号大小
            },
          },
          edgeSpacing: 20, // 边和边之间的间距
          autoRotate: true, // 边上的标签文本根据边的方向旋转
          sourceAnchor: 1, // 该边连入 source 点的第 1 个 anchorPoint
          targetAnchor: 1, // 该边连入 source 点的第 1 个 anchorPoint
        },
        // 默认分组的样式
        defaultCombo: {
          type: "cCircle",
          labelCfg: {
            style: {
              fontSize: 40, // 标签文字大小
            },
          },
          size: [300, 300], // 宽 / 高
          // 分组样式
          style: {
            lineDash: [30, 4], // 边框虚线样式，虚线的线段长度 / 间隔长度
            lineWidth: 5, // 边框线宽
            stroke: "#DEDEDE", // 边框颜色
          },
        },
        // 指定图的行为模式，默认模式: 拖拽组合、拖拽节点、拖拽画布、缩放画布、自定义点击行为
        modes: {
          default: [
            "drag-combo",
            "drag-node",
            "drag-canvas",
            "zoom-canvas",
            "behaviorName",
            {
              type: "collapse-expand-combo",
              trigger: "click",
              relayout: false, // 收缩展开后，不重新布局
            },
          ],
        },
        // 插件
        plugins: [tooltip, contextMenu],
        // 节点不同状态下的样式集合
        nodeStateStyles: {},
        // 边不同状态下的样式集合
        edgeStateStyles: {},
        // 开启动画
        animate: true,
      });

      // 动态设置节点样式--主要是颜色展示和变化
      this.nodesArray.forEach((node) => {
        switch (node.serverType) {
          case "web":
            node.color = "#E5F3F3";
            node.style = {
              fill: "#fff",
              stroke: "#E5F3F3",
              lineWidth: 10,
            };
            node.icon = {
              show: true,
              img: "/topo_images/cube.svg",
              width: 60,
              height: 60,
            };
            node.stateStyles = {
              hover: {
                stroke: "#0FC7C1",
              },
            };
            break;
          case "kafka":
            node.color = "#E5F3F3";
            node.style = {
              fill: "#fff",
              stroke: "#E5F3F3",
              lineWidth: 10,
            };
            node.icon = {
              show: true,
              img: "/topo_images/kafka.svg",
              width: 60,
              height: 60,
            };
            node.stateStyles = {
              hover: {
                stroke: "#0FC7C1",
              },
            };
            break;
          case "mysql":
            node.color = "#F2EDF0";
            node.style = {
              fill: "#fff",
              stroke: "#F2EDF0",
              lineWidth: 10,
            };
            node.icon = {
              show: true,
              img: "/topo_images/mysql.svg",
              width: 60,
              height: 60,
            };
            node.stateStyles = {
              hover: {
                stroke: "#E37C81",
              },
            };
            break;
          case "redis":
            node.color = "#E5F3F3";
            node.style = {
              fill: "#fff",
              stroke: "#E5F3F3",
              lineWidth: 10,
            };
            node.icon = {
              show: true,
              img: "/topo_images/redis.svg",
              width: 60,
              height: 60,
            };
            node.stateStyles = {
              hover: {
                stroke: "#0FC7C1",
              },
            };
            break;
          default:
            // 未知的 serverType
            break;
        }
      });

      // 数据对象，节点、边、分组
      this.graphData = {
        nodes: this.nodesArray,
        edges: this.edgesArray,
        combos: this.combosArray,
      };

      // 图初始化数据
      this.updateData(this.graphData);

      // 渲染画布
      this.renderGraph();

      // 图实例监听--graph.on("元素类型:事件名", (e) => {})--主要是节点的动态样式变化
      // 鼠标进入节点
      this.graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        this.graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true

        // 获取与节点相关联的所有边
        const edges = nodeItem.getEdges();
        // 设置边的样式
        edges.forEach((edge) => {
          const group = edge.getContainer(); // 获取边所在的容器
          const shape = edge.getKeyShape(); // 获取边的图形
          shape.attr("stroke", "#0fc7c1"); // 修改边的描边颜色
        });
      });

      // 鼠标离开节点
      this.graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        this.graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false

        // 获取与节点相关联的所有边
        const edges = nodeItem.getEdges();
        // 清除特效样式
        edges.forEach((edge) => {
          const group = edge.getContainer(); // 获取边所在的容器
          const shape = edge.getKeyShape(); // 获取边的图形
          shape.attr("stroke", "gray"); // 恢复边的描边颜色
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.topo {
  min-height: 700px;
  .el-pagination{
    margin-top:10px;
  }
}
.back-div{
  display: flex;
  align-items: center;
  .toTotalTopo {
    font-size: 22px;
    font-weight: 700;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
