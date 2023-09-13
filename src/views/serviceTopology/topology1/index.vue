<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="topo">
          <div class="topo-container">
            <!-- <div
              style="height: 170px; background: #fff; border: 2px solid #c8c8c8"
            ></div> -->

            <!-- 创建容器 -->
            <div id="container" style="background: #f6f9fc"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
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
              img: "http://localhost:9529/G6_images/mysql.svg",
            },
            // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
            name: "image-shape",
          });

          return image2;
        },
      });

      // <group style="display: flex; flex-direction: column; align-items: center;">
      G6.registerNode(
        "rect-jsx",
        (cfg) => `
        <group style={{display: flex, flex-direction: column, align-items: center}}>
          <circle 
            style={{
              stroke: ${cfg.color},
              r: 80,
              fill: '${cfg.color}',
              marginLeft: 75,
              cursor: 'pointer'
            }} 
            name="circle" 
            draggable="true"
            >
              <image 
                style={{ 
                  img: ${cfg.img}, 
                  width: 100, 
                  height: 100,  
                  marginLeft: 25,  
                  marginTop: -50,
                  cursor: 'pointer' 
                }} 
                draggable="true"
              />
          </circle>

          <text style={{ 
            marginTop: -40, 
            marginLeft: -60, 
            fill: '#333', 
            fontSize: 25,
            }}
            draggable="true"
          >
          ${cfg.label}
          </text>
      </group>
      `
      );

      // const data = {
      //   nodes: [
      //     {
      //       x: 150,
      //       y: 150,
      //       description: "ant_type_name_...",
      //       label: "Type / ReferType",
      //       color: "#2196f3",
      //       meta: {
      //         creatorName: "a_creator",
      //       },
      //       id: "node1",
      //       type: "rect-jsx",
      //     },
      //     {
      //       x: 350,
      //       y: 150,
      //       description: "node2_name...",
      //       label: "JSX Node",
      //       color: "#2196f3",
      //       meta: {
      //         creatorName: "a_creator",
      //       },
      //       id: "node2",
      //       type: "rect-jsx",
      //     },
      //   ],
      //   edges: [{ source: "node1", target: "node2" }],
      // };

      // 数据对象
      const data = {
        nodes: [
          {
            id: "1", // 节点的唯一标志符
            comboId: "a", // 节点所属于的组合的标志符
            label: "shop_gateway", // 标签文字
            img: "http://localhost:9529/G6_images/cube2.svg",
            color: "#F7F3EF",
          },
          {
            id: "2",
            comboId: "a",
            label: "shop_auth",
            img: "http://localhost:9529/G6_images/cube2.svg",
            color: "#F7F3EF",
          },
          {
            id: "3",
            comboId: "a",
            label: "shop_user",
            img: "http://localhost:9529/G6_images/cube2.svg",
            color: "#F7F3EF",
          },
          {
            id: "4",
            comboId: "a",
            label: "shop_audit",
            img: "http://localhost:9529/G6_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "5",
            comboId: "a",
            label: "shop_kafka",
            img: "http://localhost:9529/G6_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "6",
            comboId: "a",
            label: "shop_order",
            img: "http://localhost:9529/G6_images/cube.svg",
            color: "#E5F3F3",
          },
          {
            id: "7",
            label: "192.168.31.107:6379",
            img: "http://localhost:9529/G6_images/data.svg",
            color: "#E5F3F3",
          },
          {
            id: "8",
            label: "192.168.110.101:9092",
            img: "http://localhost:9529/G6_images/kafka.svg",
            color: "#E5F3F3",
          },
          {
            id: "9",
            label: "192.168.110.115:3306",
            img: "http://localhost:9529/G6_images/mysql.svg",
            color: "#F2EDF0",
          },
        ],
        // 边
        edges: [
          //! a-b
          // {
          //   // 边的起始节点
          //   source: "a",
          //   // 边的终止节点
          //   target: "b",
          //   // 边的标签，用于描述边的关系
          //   label: "shopping ——> bank",
          //   // 边的大小
          //   size: 3,
          //   // 标签的配置信息对象
          //   labelCfg: {
          //     autoRotate: true, // 标签是否自动旋转
          //     style: {
          //       stroke: "#fff", // 标签文字的边框颜色
          //       lineWidth: 5, // 标签文字的边框线宽
          //       fontSize: 20, // 标签文字的字号大小
          //     },
          //   },
          //   // 边的样式配置信息对象
          //   style: {
          //     stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
          //     arrow: true, // 是否显示箭头
          //     endArrow: {
          //       path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
          //       d: 2, // 箭头的大小，默认为空，需填入具体数值
          //     },
          //   },
          // },

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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
                d: 2, // 箭头的大小，默认为空，需填入具体数值
              },
            },
          },

          //! 6 --> 7
          {
            source: "6",
            target: "7",
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
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
              stroke: "#C3CED8", // 边的颜色，默认为空字符串表示使用默认颜色
              arrow: true, // 是否显示箭头
              endArrow: {
                path: "M 10,-5 L 0,0 L 10,5 Z", // 箭头的路径描述
                d: 2, // 箭头的大小，默认为空，需填入具体数值
              },
            },
          },
        ],
        // 分组
        combos: [
          {
            // 唯一的标志符，用来标识不同分组
            id: "a",
            // 分组的标签，显示在图标上
            label: "animeter101/eoitek-shopping (5)",
            labelCfg: {
              style: {
                fontSize: 30,
              },
            },
            // 分组的宽度为200，高度为100
            size: [700, 700],
            // 分组样式
            style: {
              lineDash: [10, 4], // 边框虚线样式，数组中的两个值分别表示虚线的线段长度和间隔长度
              lineWidth: 4, // 边框线宽
              stroke: "#DEDEED", // 边框颜色
            },
            // 父级分组的标识符 分组之间的层级关系 a的父级分组是b
            // parentId: "b",
          },
          {
            id: "b",
            label: "animeter101/eoitek-bank (0)",
            labelCfg: {
              style: {
                fontSize: 30,
              },
            },
            // 分组的宽度为200，高度为100
            size: [200, 200],
            // 分组样式
            style: {
              lineDash: [10, 4], // 边框虚线样式，数组中的两个值分别表示虚线的线段长度和间隔长度
              lineWidth: 4, // 边框线宽
              stroke: "#8A8AE0", // 边框颜色
            },
          },
        ],
      };

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

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
        fitViewPadding: 50,
        // 设置图的最小缩放值，表示非常大的缩放比例即几乎不缩小
        minZoom: 0.00000001,
        // 布局算法配置对象
        layout: {
          // comboForce”力导向布局算法，用于对包含组合的图进行布局
          type: "comboForce",
          // 指定节点之间的最小空间距离为 8
          // nodeSpacing: (d) => 20,
          // center: [500, 500], // 可选，默认为图的中心
          linkDistance: 200, // 可选，边长
          nodeStrength: 900, // 可选
          edgeStrength: 0.1, // 可选
          onTick: () => {
            // 可选
            console.log("ticking");
          },
          onLayoutEnd: () => {
            // 可选
            console.log("combo force layout done");
          },
        },
        // 默认节点的样式，包括尺寸、填充色、描边线宽
        defaultNode: {
          // type: "customNode",
          type: "rect-jsx",
          //   show: true,
          //   type: "circle",
          // },
          size: 60,
          color: "#5B8FF9",
          // style: {
          //   lineWidth: 2,
          //   fill: "#C6E5FF",
          // },
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
        },
        // 指定图的行为模式，默认模式: 拖拽组合、拖拽节点、拖拽画布、缩放画布
        modes: {
          default: ["drag-combo", "drag-node", "drag-canvas", "zoom-canvas"],
        },
      });

      // 将数据对象传入图形实例并且渲染图表
      graph.data(data);

      graph.render();
    },
  },
};
</script>

<style lang="scss" scoped>
.topo {
  // margin-top: 20px;
  background-color: #fff;
  // padding: 20px;
  .topo-container {
    padding: 10px;
    height: 800px;
    background-image: linear-gradient(#f4f4f4 1px, transparent 0),
      linear-gradient(90deg, #f4f4f4 1px, transparent 0);
    background-size: 6px 6px;
  }
}
</style>
