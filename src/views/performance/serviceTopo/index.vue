<template>
  <div class="dashboard-container">
    <!-- 表单 -->
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <!-- 拓扑图/列表 -->
          <el-form-item label="" style="margin-right: 10px">
            <el-radio-group v-model="form.radio">
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
              v-model="form.region1"
              placeholder="所属应用"
              multiple
              clearable
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 所属服务 -->
          <el-form-item label="">
            <el-select
              v-model="form.region2"
              placeholder="所属服务"
              multiple
              clearable
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">
              搜索
            </el-button>
            <el-button class="clearBtn" @click="onSubmit('form')">
              清空
            </el-button>
          </el-form-item>
        </el-form>

        <div style="margin-bottom: 10px" v-if="!isTotalTopo">
          <i class="el-icon-back toTotalTopo" @click="handleBack">
            返回总拓扑图
          </i>
          <el-select v-model="toTotalTopo" multiple clearable>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <!-- 拓扑图 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="topo">
          <div class="topo-container">
            <!-- 创建容器 -->
            <div id="container" style="background: #f6f9fc"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import G6 from "@antv/g6";
import { nodes, edges, combos } from "./data.js";

export default {
  name: "ServiceTopo",

  data() {
    return {
      form: {
        radio: "topo",
        region1: "",
        region2: "",
      },

      toTotalTopo: "", // 返回总拓扑图右边的选框
      isTotalTopo: true,

      graph: null, // 图表实例
      graphData: "", // 图表数据
      graphStreamData: "", // 上下游图表数据
    };
  },

  mounted() {
    this.initGraph();
  },

  beforeDestroy() {
    // 清除数据
    this.graphData = "";
    // 销毁画布
    this.graph.destroy();
  },

  methods: {
    // 查询表单
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },

    // 跳转到链路追踪路由
    redirectTo(page) {
      this.$router.push({ name: "LinkTracing" });
    },

    // 返回总拓扑
    handleBack() {
      this.isTotalTopo = !this.isTotalTopo;
      this.graphStreamData = "";
      this.updateData(this.graphData);
      this.renderGraph();
    },

    // 更新图表数据
    updateData(newData) {
      this.graph.data(newData);
    },

    // 渲染图表
    renderGraph() {
      this.graph.render();
    },

    // 初始化图表
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
        handleMenuClick: (target, item) => {
          console.log(target.innerHTML, item);
          if (target.innerHTML == "查看链路") {
            this.redirectTo("链路");
          } else if (target.innerHTML == "查看上下游") {
            // 要查询的节点id
            const nodeId = item._cfg.id;
            // 获取上游和下游所有节点，上游节点--"source"，下游节点--"target"
            const allNodes = this.graph.getNeighbors(nodeId, undefined);
            // 根据获取的节点获取它们的id
            const allNodeIds = allNodes.map((node) => node.get("id"));
            console.log("上游和下游节点的ID: ", allNodeIds);
            // 上下游节点的id和要查询id
            const ids = [...allNodeIds, nodeId];
            // 筛选
            const resNodes = nodes.filter((node) => ids.includes(node.id));
            console.log("筛选结果: ", resNodes);
            // 更新图表数据
            this.graphStreamData = { nodes: resNodes, edges, combos };
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
        // 需要加上父级容器的 padding-left 16、自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24、画布兄弟元素高度、自身偏移量 10
        offsetY: 0,
        // 在什么类型的元素上响应，是节点
        itemTypes: ["node"],
      });

      // 提示框组件
      const tooltip = new G6.Tooltip({
        // tooltip相对于鼠标位置的偏移量，用于设置提示框的位置偏移，默认值是 (10, 10)
        offsetX: 10,
        offsetY: 10,
        // 允许出现 tooltip 的 item 类型，是节点
        itemTypes: ["node"],
        // 自定义 tooltip 内容
        getContent: (e) => {
          const node_type = e.item.getType();
          const node = e.item.getModel();
          // console.log(e);
          let comboTitle = "未分组";
          if (node.comboId == "a") {
            comboTitle = "animeter101/eoitek-shopping (5) / 未分组";
          } else if (node.comboId == "b") {
            comboTitle = "animeter101/eoitek-bank (0) / 未分组";
          }
          // console.log(node);
          // 创建一个容器元素 outDiv，并设置其样式和内容
          const outDiv = document.createElement("div");
          // 设置容器宽度为内容适应宽度
          outDiv.style.width = "fit-content";
          outDiv.style.padding = "0";
          // 使用 HTML 字符串构建 Tooltip 的内容
          outDiv.innerHTML = `
                <strong>${node.label}-${node.id}</strong> <br />
                <span>${comboTitle}</span><br /><br />
                <div> 请求数：219 </div>
                <div> 错误率：219 </div>
                <div> 平均响应时间：219
                    <div id="chart-${node.id}" style="width: 200px; height: 100px;"></div>
                </div>

                <div>
                    告警数：
                    紧急:<span style="color:red">1</span><span /><span />
                    严重:<span style="color:orange">0</span>
                </div>
                `;

          // 获取包含折线图的元素，用于绘制折线图
          const chartContainer = outDiv.querySelector(`#chart-${node.id}`);

          // 基于准备好的 DOM，初始化 echarts 实例
          const chart = echarts.init(chartContainer);

          // 定义折线图数据
          const data = {
            categories: ["1", "2", "3", "4", "5", "6"],
            series: [
              {
                name: "数据集",
                type: "line",
                data: [12, 19, 3, 5, 2, 3],
              },
            ],
          };

          // 配置折线图选项
          const options = {
            xAxis: {
              type: "category",
              data: data.categories,
            },
            yAxis: {
              type: "value",
            },
            series: data.series,
          };

          // 使用刚指定的配置项和数据显示图表
          chart.setOption(options);

          // 返回 outDiv，作为 Tooltip 实例的内容
          return outDiv;
        },
      });

      // 设置节点样式--主要是颜色展示和变化
      nodes.forEach((node) => {
        if (node.state === "1") {
          node.color = "#F7F3EF";
          node.stateStyles = {
            hover: {
              stroke: "#FFD270",
            },
          };
        } else if (node.state === "2") {
          node.color = "#E5F3F3";
          node.stateStyles = {
            hover: {
              stroke: "#0FC7C1",
            },
          };
        } else if (node.state === "3") {
          node.color = "#F2EDF0";
          node.stateStyles = {
            hover: {
              stroke: "#E37C81",
            },
          };
        }
      });

      // 数据对象，节点、边、分组
      this.graphData = { nodes, edges, combos };

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 600; // 根据容器的高计算出图的高，可自定义

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
        // 布局算法配置对象
        layout: {
          type: "comboForce", // comboForce力导向布局，用于对包含组合的图进行布局，默认为random布局
          preventOverlap: true, // 防止节点重叠
          // nodeSize: 30  // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize
          groupByTypes: false, // 若希望在带有 combo 的图上，节点、边、combo 的层级符合常规逻辑，需要将 groupByTypes 设置为 false
          // nodeSpacing: (d) => 20, // 指定节点之间的最小空间距离为 8
          // center: [500, 500], // 可选，默认为图的中心
          linkDistance: 400, // 布局时，边的距离长度
          nodeStrength: 200, // 可选
          edgeStrength: 0.1, // 可选
          // curveOffset: -100, // 设置曲线偏移量为负值
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
        defaultCombo: {},
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

      // 节点动态设置样式
      this.graph.node((node) => {
        return {
          style: {
            fill: "#fff",
            stroke: node.color,
            lineWidth: 10,
          },
          icon: {
            show: true,
            img: node.img,
            width: 60,
            height: 60,
          },
        };
      });

      this.updateData(this.graphData);

      this.renderGraph();

      // 图实例监听--graph.on("元素类型:事件名", (e) => {})--主要是节点的动态样式变化
      // 鼠标进入节点
      this.graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        this.graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
      });

      // 鼠标离开节点
      this.graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        this.graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.topo {
  background-color: #fff;
  .topo-container {
    padding: 10px;
    height: 625px;
    background-image: linear-gradient(#f4f4f4 1px, transparent 0),
      linear-gradient(90deg, #f4f4f4 1px, transparent 0);
  }
}

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

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #d9f3f2;
}

.toTotalTopo {
  font-size: 22px;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;
}
</style>
