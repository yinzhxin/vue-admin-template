<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <div class="grid-content">
          <el-form :inline="true" :model="formInline" ref="form">
            <el-form-item label="">
              <el-select v-model="formInline.region" placeholder="所属应用">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">
                搜索
              </el-button>
              <el-button class="clearBtn" @click="onSubmit">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="topo">
          <div class="topo-container">
            <!-- 上半部分 -->
            <!-- <div class="topo-top"></div> -->
            <!-- 创建容器 -->
            <div id="container" style="background: #f6f9fc"></div>
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

export default {
  name: "ServiceTopo",

  data() {
    return {
      dialogVisible: false,
      formInline: {
        user: "",
        region: "",
      },
    };
  },

  mounted() {
    this.initGraph();
    // console.log(window.location);
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

    initGraph() {
      // 自定义节点
      let res = G6.registerNode("img-jsx", {
        jsx: (cfg, group) => {
          return `
        <group style={{display: flex, flex-direction: column, align-items: center}} id="group">
          <circle
            style={{
              stroke: ${cfg.color},
              r: 100,
              fill: '${cfg.color}',
              marginLeft: 75,
              cursor: 'pointer'
            }}
            cy="50%"
            name="circle"
            draggable="true"
            >
              <image
                style={{
                  img: ${cfg.img},
                  width: 120,
                  height: 120,
                  marginLeft: 17,
                  marginTop: -56,
                  cursor: 'pointer'
                }}
                draggable="true"
              />
          </circle>

          <text style={{
            marginTop: -40,
            marginLeft: -200,
            fill: '#333',
            fontSize: 45,
            }}
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            draggable="true"
          >
          ${cfg.label}
          </text>

      </group>
      `;
        },
        /**
         * 绘制后的附加操作，默认没有任何操作
         * @param  {Object} cfg combo 的配置项
         * @param  {G.Group} group 图形分组，combo 中的图形对象的容器
         */
        afterDraw(cfg, group) {},
        /**
         * 更新 combo ，combo 文本
         * @override
         * @param  {Object} cfg combo 的配置项
         * @param  {Combo} combo combo item
         */
        update(cfg, combo) {},
        /**
         * 更新 combo 后的操作，一般同 afterDraw 配合使用
         * @override
         * @param  {Object} cfg combo 的配置项
         * @param  {Combo} combo combo item
         */
        afterUpdate(cfg, combo) {},
        /**
         * 设置 combo 的状态，主要是交互状态，业务状态请在 draw 方法中实现
         * 单图形的 combo 仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
         * @param  {String} name 状态名称
         * @param  {Object} value 状态值
         * @param  {Combo} combo combo item
         */
        setState(name, value, combo) {
          console.log(name, value, combo);
        },
        /**
         * 获取锚点（相关边的连入点）
         * @param  {Object} cfg combo 的配置项
         * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
         */
        getAnchorPoints(cfg) {},
      });
      // console.log(res);

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

      // 数据对象，节点、边、分组数组
      const data = {
        nodes: [
          {
            id: "1", // 节点的唯一标志符
            comboId: "a", // 节点所属于的组合的标志符
            label: "shop_gateway", // 标签文字
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube2.svg",
            color: "#F7F3EF",
          },
          {
            id: "2",
            comboId: "a",
            label: "shop_auth",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube2.svg",
            color: "#F7F3EF",
          },
          {
            id: "3",
            comboId: "a",
            label: "shop_user",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube2.svg",
            color: "#F7F3EF",
          },
          {
            id: "4",
            comboId: "a",
            label: "shop_audit",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "5",
            comboId: "a",
            label: "shop_kafka",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "6",
            comboId: "a",
            label: "shop_order",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "7",
            label: "192.168.31.107:6379",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/data.svg",
            color: "#E5F3F3",
          },
          {
            id: "8",
            label: "192.168.110.101:9092",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/kafka.svg",
            color: "#E5F3F3",
          },
          {
            id: "9",
            label: "192.168.110.115:3306",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/mysql.svg",
            color: "#F2EDF0",
          },
          {
            id: "10",
            comboId: "b",
            label: "bank1",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "11",
            comboId: "b",
            label: "bank1",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "12",
            comboId: "b",
            label: "bank1",
            img:
              "http://localhost:" +
              window.location.port +
              "/topo_images/cube.svg",
            color: "#E5F3F3",
          },
        ],
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

          //! 6 --> 7
          {
            source: "6",
            target: "7",
            // 边的大小
            size: 10,
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

            // parentId: "b",// 父级分组的标识符 分组之间的层级关系 a的父级分组是b
            collapsed: false, // 默认不折叠
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

      const tooltip2 = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        // v4.2.1 起支持配置 trigger，click 代表点击后出现 tooltip。默认为 mouseenter
        trigger: "click",
        // the types of items that allow the tooltip show up
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node", "edge"],
        // custom the tooltip's content
        // 自定义 tooltip 内容
        getContent: (e) => {
          const outDiv = document.createElement("div");
          outDiv.style.width = "fit-content";
          //outDiv.style.padding = '0px 0px 20px 0px';
          outDiv.innerHTML = `

      <h4>Custom Content</h4>
      <ul>
        <li>Type: ${e.item.getType()}</li>
      </ul>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`;
          return outDiv;
        },
      });

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 675;

      // 创建图形实例
      const graph = new G6.Graph({
        // 指定图形的容器
        container: "container",
        // 指定画布宽高
        width,
        height,
        // 使图形自适应容器大小
        fitView: true,
        // 表示缩放时，图形和容器边界之间的最小距离
        fitViewPadding: 0,
        // 设置图的最小缩放值，表示非常大的缩放比例即几乎不缩小
        minZoom: 0.00000001,
        // 布局算法配置对象
        layout: {
          type: "comboForce", // comboForce力导向布局算法，用于对包含组合的图进行布局
          preventOverlap: true, // 防止节点重叠
          groupByTypes: false, // 若希望在带有 combo 的图上，节点、边、combo 的层级符合常规逻辑，需要将 groupByTypes 设置为 false
          // nodeSpacing: (d) => 20, // 指定节点之间的最小空间距离为 8
          // center: [500, 500], // 可选，默认为图的中心
          linkDistance: 700, // 可选，边长
          nodeStrength: 500, // 可选
          edgeStrength: 0.1, // 可选
          onTick: () => {
            // console.log("ticking可选");
          },
          onLayoutEnd: () => {
            // console.log("combo force layout done 可选");
          },
        },
        // 默认节点的样式: 尺寸、填充色、描边线宽
        defaultNode: {
          className: "node", // 添加类名为 "node"
          type: "img-jsx",
          size: 100,
          color: "#5B8FF9",
          style: {
            lineWidth: 2,
            fill: "#C6E5FF",
          },
          nodeStateStyles: {
            hover: {
              // keyShape 的状态样式
              fill: "#d3adf7",
            },
          },
          labelCfg: {
            position: "bottom", // 将标签文字放置在节点中心
            style: {
              fill: "red", // 设置标签文字颜色
              fontSize: 18, // 设置标签文字大小
            },
          },
        },
        // 默认边的样式，包括尺寸、颜色s
        defaultEdge: {
          size: 2,
          color: "orange",
          shape: "arrow", // 直线箭头
          edgeSpacing: 50, // 边和边之间的间距
        },
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
        plugins: [tooltip, tooltip2],
      });

      // 将数据对象传入图形实例并且渲染图表
      graph.data(data);

      graph.render();

      // 事件
      // graph.on("node:mouseenter", (evt) => {
      //   console.log("enter");
      //   graph.setItemState(evt.item, "hover", true);
      // });

      // graph.on("node:mouseleave", (evt) => {
      //   console.log("leave");
      //   graph.setItemState(evt.item, "hover", false);
      // });

      //  graph.getNodes() 方法用于获取图表中的所有节点。
      // 该方法返回一个包含图表中所有节点的数组。每个节点都是一个包含节点属性和状态的对象
      const nodes = graph.getNodes();
      console.log("node ==> ", nodes);

      nodes.forEach((item) => {
        let res = item.getModel();
        let res2 = res.style;
        console.log(res2);
      });

      nodes.forEach((node) => {
        const shape = node.getKeyShape();
        console.log(shape);
        shape.on("mouseenter", () => {
          const group = shape.getParent();
          const shadow = group.find(
            (element) => element.get("className") === "node-shadow"
          );

          if (shadow) {
            shadow.attr("shadowBlur", 10);
            shadow.attr("shadowColor", "#ddd");
          }
        });

        shape.on("mouseleave", () => {
          const group = shape.getParent();
          const shadow = group.find(
            (element) => element.get("className") === "node-shadow"
          );
          if (shadow) {
            shadow.attr("shadowBlur", 0);
            shadow.attr("shadowColor", "");
          }
        });
      });

      // graph.on("node:click", (evt) => {
      //   const node = evt.item;
      //   const model = node.getModel();

      //   // 隐藏自定义的Tooltip
      //   node.getComponent("customTooltip").hide();

      //   // 显示另一个Tooltip
      //   graph.showTooltip({
      //     x: evt.x,
      //     y: evt.y,
      //     title: "点击的Tooltip",
      //     items: [
      //       {
      //         name: "节点名称",
      //         value: model.label,
      //       },
      //     ],
      //   });
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.topo {
  background-color: #fff;
  .topo-container {
    padding: 10px;
    height: 700px;
    background-image: linear-gradient(#f4f4f4 1px, transparent 0),
      linear-gradient(90deg, #f4f4f4 1px, transparent 0);
    background-size: 10px 10px;
    .topo-top {
      height: 170px;
      background-color: #fff;
      border: 2px solid #c8c8c8;
    }
  }
}

// 清除按钮点击后变色
.clearBtn:mouseout {
  /* 在鼠标移出时的样式 */
  /* 例如，恢复默认背景颜色为白色 */
  background-color: white;
}
// .clearBtn {
//   // color: #409eff;
//   // background: #ecf5ff;
//   border-color: #b3d8ff;
// }
</style>

<style lang="">
/* 
      // 监听节点拖拽事件
      graph.on("node:dragstart", (evt) => {
        const { item } = evt;
        // 获取拖拽节点的初始位置
        const model = item.getModel();
        console.log("节点初始位置：", model.x, model.y);
      });

      graph.on("node:drag", (evt) => {
        const { item, dx, dy } = evt;
        // 更新节点位置
        const model = item.getModel();
        graph.updateItem(item, {
          x: model.x + dx,
          y: model.y + dy,
        });
        // 获取更新后的节点位置
        console.log("节点当前位置：", model.x + dx, model.y + dy);
      });

      graph.on("node:dragend", (evt) => {
        const { item } = evt;
        // 获取最终节点位置
        const model = item.getModel();
        console.log("节点最终位置：", model.x, model.y);
      }); */

/* 自定义节点 */
/* 

            // 自定义节点
      G6.registerNode("customNode", {
        draw(cfg, group) {
          console.log(cfg, group);
          // 获取节点对应的文件夹路径
          const folderPath = cfg.folderPath;

          // 创建图像形状并设置样式
          // const image = group.addShape("image", {
          //   attrs: {
          //     x: cfg.x - cfg.size / 2, // 根据节点位置和大小确定图像位置
          //     y: cfg.y - cfg.size / 2,
          //     width: cfg.size,
          //     height: cfg.size,
          //     img: folderPath, // 使用文件夹路径作为图像资源
          //     // 其他样式属性...
          //   },
          // });

          const image2 = group.addShape("image", {
            attrs: {
              // x: 0,
              // y: 0,
              // fill: "blue",
              img: "http://localhost:"+window.location.port+"/topo_images/mysql.svg",
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: "image-shape",
          });

          return image2;
        }, */
/* }); */

/* 
          //! a-b
          {
            // 边的起始节点
            source: "a",
            // 边的终止节点
            target: "b",
            // 边的标签，用于描述边的关系
            label: "shopping ——> bank",
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
          }, */
</style>
