<template>
  <div class="dashboard-container">
    <!-- 表单 -->
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <!-- 拓扑图/列表 -->
          <el-form-item label="" style="margin-right: 10px">
            <el-radio-group v-model="form.radio">
              <el-radio-button label="list">列表</el-radio-button>
              <el-radio-button label="topo">拓扑图</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- 所属应用 -->
          <el-form-item label="">
            <el-select v-model="form.region" placeholder="所属应用">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 所属服务 -->
          <el-form-item label="">
            <el-select v-model="form.region" placeholder="所属服务">
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
      </el-col>
    </el-row>

    <!-- 拓扑图 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="topo">
          <div class="topo-container">
            <!-- 上半部分 -->
            <!-- <div class="topo-top"></div> -->
            <!-- 创建容器 -->
            <div
              id="container"
              style="background: #f6f9fc"
              v-if="containerVisible"
            ></div>

            <!-- 创建容器 -->
            <div
              id="container2"
              style="background: #f6f9fc"
              v-if="containerVisible2"
            ></div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <div id="dialog"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import G6 from "@antv/g6";
import { nodes, nodes2 } from "./data.js";

export default {
  name: "ServiceTopo",

  data() {
    return {
      dialogVisible: false,
      containerVisible: true,
      containerVisible2: false,
      form: {
        radio: "topo",
        user: "",
        region: "",
      },

      graph: null, // 图表实例
      graphData: "", // 图标数据
    };
  },

  mounted() {
    this.initGraph();
  },

  beforeDestroy() {
    this.graph.destroy();
  },

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
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

    redirectTo(page) {
      // 在此处添加具体的路由跳转逻辑
      // alert(`跳转到 ${page} 页面`);
      this.$router.push({ name: "LinkTracing" });
    },

    viewStream() {
      this.containerVisible = false;
      this.containerVisible = true;

      this.$nextTick(() => {
        this.initGraph2();
      });
    },

    initGraph() {
      // 自定义事件 ==> G6.registerBehavior(behaviorName: string, behavior: BehaviorOption)
      // Behavior 代表了一种在图表上行为的特定方式，例如拖动、缩放、单击
      // 使用 G6.registerBehavior 方法来注册自定义行为，并在 getEvents() 方法中指定要绑定的事件类型及其对应的回调函数
      G6.registerBehavior(
        //! 自定义事件的名字
        "behaviorName",
        //! 配置对象
        {
          // 注册了一个名为 behaviorName 的自定义行为
          // 在 getEvents() 方法中指定了三个事件类型 'node:click'、'mousemove' 和 'edge:click'
          // 这些事件将自动生成并绑定到指定的  ----节点和边----  元素上
          // Bind the event and its callback
          getEvents() {
            return {
              "node:click": "onClick",
              mousemove: "onMousemove",
              "edge:click": "onEdgeClick",
            };
          },
          /**
           * Handle the callback for node:click
           * @override
           * @param  {Object} evt The handler
           */
          onClick: (evt) => {
            console.log("自定义事件 ==>", evt);
            // console.log(this)
            const node = evt.item;
            const graph = this.graph;
            const point = { x: evt.x, y: evt.y };
            const model = node.getModel();
            // TODO
            // this.dialogVisible = true;
            this.open();
          },
          /**
           * Handle the callback for mousemove
           * @override
           * @param  {Object} evt The handler
           */
          onMousemove(evt) {
            // TODO
          },
          /**
           * Handle the callback for :click
           * @override
           * @param  {Object} evt The handler
           */
          onEdgeClick(evt) {
            // TODO
          },
        }
      );

      const contextMenu = new G6.Menu({
        getContent(evt) {
          // let header;
          // if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
          //   header = "Canvas ContextMenu";
          // } else if (evt.item) {
          //   const itemType = evt.item.getType();
          //   header = `${itemType.toUpperCase()} ContextMenu`;
          // }
          return `
    <div style="cursor:pointer;margin:10px">
      <h3>查看上下游</h3>
      <h3>查看服务详情</h3>
      <h3  @click="this.redirectTo('链路')">查看链路</h3>
      <h3>查看告警</h3>
    </div>`;
        },
        handleMenuClick: (target, item) => {
          console.log(target.innerHTML, item);
          if (target.innerHTML == "查看链路") {
            this.redirectTo("链路");
          } else if (target.innerHTML == "查看上下游") {
            this.viewStream();
          }
        },
        // offsetX and offsetY include the padding of the parent container
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: 0,
        // the types of items that allow the menu show up
        // 在哪些类型的元素上响应
        itemTypes: ["node"],
      });

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

      // 数据对象，节点、边、分组数组
      const data = {
        // 节点对象属性：id是必须的
        nodes,
        // 边对象属性：target、source是必须的
        edges: [
          //! 1 --> 2
          {
            source: "1",
            target: "2",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 2 --> 3
          {
            source: "2",
            target: "3",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 2 --> 4
          {
            source: "2",
            target: "4",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 3 --> 6
          {
            source: "3",
            target: "6",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 6 --> b
          {
            source: "6",
            target: "b",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 6 --> 7 <==
          {
            source: "6",
            target: "7",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 6 --> 9
          {
            source: "6",
            target: "9",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 3 --> 9
          {
            source: "3",
            target: "9",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 4 --> 8
          {
            source: "4",
            target: "8",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 8 --> 5
          {
            source: "8",
            target: "5",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
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

          //! 8 --> 8
          {
            source: "8",
            target: "8",
            // 边的大小
            size: 6,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
            // 边的样式配置信息对象
            style: {
              stroke: "#999", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: G6.Arrow.vee(), // 箭头的路径描述
                d: 2, // 箭头的大小，默认为空，需填入具体数值
              },
            },
            curveOffset: -100, // 设置曲线偏移量为负值
          },

          //! 6 --> 10
          {
            source: "6",
            target: "10",
            // 边的大小
            size: 6,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
            // 边的样式配置信息对象
            style: {
              stroke: "#999", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: G6.Arrow.vee(), // 箭头的路径描述
                d: 2, // 箭头的大小，默认为空，需填入具体数值
              },
            },
            curveOffset: -50, // 设置曲线偏移量为负值
          },

          //! 10--> 11
          {
            source: "10",
            target: "11",
            // 边的大小
            size: 6,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
            // 边的样式配置信息对象
            style: {
              stroke: "#999", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: G6.Arrow.vee(), // 箭头的路径描述
                d: 2, // 箭头的大小，默认为空，需填入具体数值
              },
            },
            curveOffset: -100, // 设置曲线偏移量为负值
          },

          //! 11 --> 12
          {
            source: "11",
            target: "12",
            // 边的大小
            size: 6,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true, // 标签是否自动旋转
              style: {
                stroke: "#fff", // 标签文字的边框颜色
                lineWidth: 5, // 标签文字的边框线宽
                fontSize: 20, // 标签文字的字号大小
              },
            },
            // 边的样式配置信息对象
            style: {
              stroke: "#999", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: G6.Arrow.vee(), // 箭头的路径描述
                d: 2, // 箭头的大小，默认为空，需填入具体数值
              },
            },
            curveOffset: -100, // 设置曲线偏移量为负值
          },
        ],
        // 分组对象属性
        combos: [
          {
            id: "a", // 唯一的标志符，标识不同分组
            label: "animeter101/eoitek-shopping (5)", // 分组的标签
            labelCfg: {
              style: {
                fontSize: 60, // 标签文字大小
              },
            },
            size: [700, 700], // 宽 / 高
            // 分组样式
            style: {
              lineDash: [50, 4], // 边框虚线样式，虚线的线段长度 / 间隔长度
              lineWidth: 12, // 边框线宽
              stroke: "#DEDEED", // 边框颜色
            },

            // label: {
            //   position: "bottom-right", // 图标位置
            //   offset: [-10, 10], // 图标偏移量
            //   style: {
            //     fontSize: 24,
            //     fill: "#1890FF",
            //     cursor: "pointer",
            //   },
            // },

            // parentId: "b",// 父级分组的标识符 分组之间的层级关系 a的父级分组是b
            collapsed: false, // 默认不折叠

            // linkPoints: {
            //   top: true,
            //   bottom: true,
            //   left: true,
            //   right: true,
            //   // ... 四个圆的样式可以在这里指定
            // },
          },
          {
            id: "b",
            label: "animeter101/eoitek-bank (0)",
            labelCfg: {
              style: {
                fontSize: 60,
              },
            },
            size: [300, 300],
            style: {
              lineDash: [50, 4], // 线段长度和间隔长度
              lineWidth: 12,
              stroke: "#8A8AE0",
            },
            collapsed: true,
          },
        ],
      };

      // 提示框组件
      const tooltip = new G6.Tooltip({
        // 配置 Tooltip 相对于鼠标位置的偏移量，用于设置提示框的位置偏移，默认值是 (10, 10)
        offsetX: 10,
        offsetY: 10,
        // 允许出现 tooltip 的 item 类型
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

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 630;

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
          linkDistance: 200, // 布局时，边的距离长度
          nodeStrength: 200, // 可选
          edgeStrength: 0.1, // 可选
          onTick: () => {
            // console.log("ticking可选");
          },
          onLayoutEnd: () => {
            // console.log("combo force layout done 可选");
          },
        },
        // !!!!!!!!!!!!!!!!!!!!实例化图时全局配置，使用 graph.node(nodeFn)配置 > 数据中动态配置 > 实例化图时全局配置
        // 默认节点的样式: 尺寸、填充色、描边线宽，包括节点的一般属性和样式属性（style）
        // 用户在实例化 Graph 时候可以通过 defaultNode 配置节点，这里的配置是全局的配置，将会在所有节点上生效
        defaultNode: {
          /* node type, the priority is lower than the type in the node data */
          type: "donut",
          /* node size */
          size: 60,
          /* style for the keyShape */
          // style: {
          //   fill: '#9EC9FF',
          //   stroke: '#5B8FF9',
          //   lineWidth: 3,
          // },
          labelCfg: {
            /* label's position, options: center, top, bottom, left, right */
            position: "bottom",
            /* label's offset to the keyShape, 4 by default */
            //   offset: 12,
            /* label's style */
            //   style: {
            //     fontSize: 20,
            //     fill: '#ccc',
            //     fontWeight: 500
            //   }
          },
          /* configurations for four linkpoints */
          // linkPoints: {
          //   top: true,
          //   right: true,
          //   bottom: true,
          //   left: true,
          //   /* linkPoints' size, 8 by default */
          //   //   size: 5,
          //   /* linkPoints' style */
          //   //   fill: '#ccc',
          //   //   stroke: '#333',
          //   //   lineWidth: 2,
          // },
          /* icon configuration */
          icon: {
            /* whether show the icon, false by default */
            show: true,
            /* icon's img address, string type */
            img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
            /* icon's size, 20 * 20 by default: */
            //   width: 40,
            //   height: 40
          },
        },
        // 默认边的样式：同上
        defaultEdge: {
          size: 2,
          color: "orange",
          shape: "arrow", // 直线箭头
          edgeSpacing: 20, // 边和边之间的间距
          autoRotate: true, // 边上的标签文本根据边的方向旋转
          // 该边连入 source 点的第 1 个 anchorPoint，
          sourceAnchor: 1,
          // 该边连入 source 点的第 1 个 anchorPoint，
          targetAnchor: 1,
        },
        // 默认分组的样式：同上
        defaultCombo: {
          style: {
            comboSpacing: 40, // Combo 和 Combo 之间的间距
          },
        },
        // 指定图的行为模式，默认模式: 拖拽组合、拖拽节点、拖拽画布、缩放画布
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
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          // hover: {
          //   stroke:"#0FC7C1  #FFD270  #E37C81"
          // },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          // click: {
          //   stroke: "#000",
          //   lineWidth: 3,
          // },
        },

        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: "steelblue",
          },
        },

        // 开启动画
        animate: true,
      });

      this.graph.node((node) => {
        console.log("node: ", node);
        return {
          /* node type, the priority is lower than the type in the node data */
          type: "donut",

          /* node size */
          size: 100,

          /* style for the keyShape */
          style: {
            fill: "#fff",
            stroke: node.color,
            lineWidth: 10,
          },

          labelCfg: {
            /* label's position, options: center, top, bottom, left, right */
            position: "bottom",
            /* label's offset to the keyShape, 4 by default */
            // offset: 12,
            /* label's style */
            style: {
              fontSize: 25,
              fill: "black",
              fontWeight: 500,
            },
          },

          /* configurations for four linkpoints */
          // linkPoints: {
          //   top: true,
          //   right: true,
          //   bottom: true,
          //   left: true,
          //   /* linkPoints' size, 8 by default */
          //   size: 5,
          //   /* linkPoints' style */
          //   fill: "#ccc",
          //   stroke: "#333",
          //   lineWidth: 2,
          // },

          /* icon configuration */
          icon: {
            /* whether show the icon, false by default */
            show: true,
            /* icon's img address, string type */
            img: node.img,
            /* icon's size, 20 * 20 by default: */
            width: 60,
            height: 60,
          },
        };
      });

      this.updateData(data);
      this.renderGraph();

      // 在图实例 graph 上监听--graph.on("元素类型:事件名", (e) => { });
      // 
      // 鼠标进入节点
      this.graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        console.log(nodeItem);
        graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
      });

      // 鼠标离开节点
      graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
      });

      // 点击节点
      // graph.on("node:click", (e) => {
      //   // 先将所有当前是 click 状态的节点置为非 click 状态
      //   const clickNodes = graph.findAllByState("node", "click");
      //   clickNodes.forEach((cn) => {
      //     graph.setItemState(cn, "click", false);
      //   });
      //   const nodeItem = e.item; // 获取被点击的节点元素对象
      //   graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
      // });

      // 点击边
      // graph.on("edge:click", (e) => {
      //   // 先将所有当前是 click 状态的边置为非 click 状态
      //   const clickEdges = graph.findAllByState("edge", "click");
      //   clickEdges.forEach((ce) => {
      //     graph.setItemState(ce, "click", false);
      //   });
      //   const edgeItem = e.item; // 获取被点击的边元素对象
      //   graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
      // });

      //  graph.getNodes() 方法用于获取图表中的所有节点。
      // 该方法返回一个包含图表中所有节点的数组。每个节点都是一个包含节点属性和状态的对象
      // const nodes = graph.getNodes();
      // console.log("node ==> ", nodes);

      // nodes.forEach((item) => {
      //   let res = item.getModel();
      //   let res2 = res.style;
      //   console.log(res2);
      // });

      // nodes.forEach((node) => {
      //   const shape = node.getKeyShape();
      //   console.log(shape);
      //   shape.on("mouseenter", () => {
      //     const group = shape.getParent();
      //     const shadow = group.find(
      //       (element) => element.get("className") === "node-shadow"
      //     );

      //     if (shadow) {
      //       shadow.attr("shadowBlur", 10);
      //       shadow.attr("shadowColor", "red");
      //     }
      //   });

      //   shape.on("mouseleave", () => {
      //     const group = shape.getParent();
      //     const shadow = group.find(
      //       (element) => element.get("className") === "node-shadow"
      //     );
      //     if (shadow) {
      //       shadow.attr("shadowBlur", 0);
      //       shadow.attr("shadowColor", "");
      //     }
      //   });
      // });
    },

    // 更新图表数据
    updateData(newData) {
      this.graph.data(newData);
    },
    // 渲染图表
    renderGraph() {
      this.graph.render();
    },
  },
};
</script>

<style lang="scss" scoped>
.topo {
  background-color: #fff;
  .topo-container {
    padding: 10px;
    height: 650px;
    background-image: linear-gradient(#f4f4f4 1px, transparent 0),
      linear-gradient(90deg, #f4f4f4 1px, transparent 0);
    background-size: 10px 10px;
    // .topo-top {
    //   height: 170px;
    //   background-color: #fff;
    //   border: 2px solid #c8c8c8;
    // }
  }
}

.el-button--primary {
  color: #fff;
  background-color: #0fc7c1;
  /* border-color: #409EFF; */
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #0fc7c1;
  /* border-color: #409EFF; */
  // -webkit-box-shadow: -1px 0 0 0 #409EFF;
  /* box-shadow: -1px 0 0 0 #409EFF; */
}
</style>
