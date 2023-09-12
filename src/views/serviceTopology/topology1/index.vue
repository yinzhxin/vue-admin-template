<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="24" style="padding-left: 0px">
        <div class="topo">
          <div class="topo-container">
            <!-- <div
              style="height: 170px; background: #fff; border: 2px solid #c8c8c8"
            ></div> -->

            <!-- 创建容器 -->
            <div id="container" style="background: #e8e8e8"></div>
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
      // 数据对象
      const data = {
        // 结点
        // 节点表示图中的数据点或实体，可以是一个单独的节点，也可以属于一个组合。
        // 组合是一种将多个节点组织在一起的方式，用于表示节点之间的关联或层次结构。
        // 节点和组合的关系可以通过comboId属性进行关联。
        // 在给定的节点信息中，
        //    节点0到节点24属于组合"a"，
        //    节点16到节点19属于组合"b"，
        //    节点23到节点31属于组合"c"，
        //    节点32和节点33属于组合"d"。
        // 而节点20、21、22、25、26则没有指定所属的组合，它们是独立的节点。
        nodes: [
          {
            // 节点的唯一标志符
            id: "0",
            // 节点所属于的组合的标志符
            comboId: "a",
          },
          {
            id: "1",
            comboId: "a",
          },

          {
            id: "5",
            comboId: "a",
          },
          {
            id: "6",
            comboId: "a",
          },

          {
            id: "16",
            comboId: "b",
          },

          {
            id: "20",
          },

          {
            id: "23",
            comboId: "c",
          },
          {
            id: "24",
            comboId: "a",
          },
          {
            id: "25",
          },
          {
            id: "26",
          },
          {
            id: "27",
            comboId: "c",
          },
          {
            id: "28",
            comboId: "c",
          },

          {
            id: "32",
            comboId: "d",
          },
          {
            id: "33",
            comboId: "d",
          },
        ],
        // 边
        edges: [
          {
            // 边的起始节点
            source: "a",
            // 边的终止节点
            target: "b",
            // 边的标签，用于描述边的关系
            label: "Combo A - Combo B",
            // 边的大小
            size: 3,
            // 标签的配置信息对象
            labelCfg: {
              autoRotate: true,
              style: {
                stroke: "#fff",
                lineWidth: 5,
                fontSize: 20,
              },
            },
            // 边的样式配置对象
            style: {
              stroke: "red",
            },
          },
          {
            source: "a",
            target: "33",
            label: "Combo-Node",
            size: 3,
            labelCfg: {
              autoRotate: true,
              style: {
                stroke: "#fff",
                lineWidth: 5,
                fontSize: 20,
              },
            },
            style: {
              stroke: "blue",
            },
          },
          {
            source: "0",
            target: "1",
          },
          {
            source: "0",
            target: "2",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
          {
            source: "0",
            target: "5",
          },
          {
            source: "0",
            target: "7",
          },
          {
            source: "0",
            target: "8",
          },
          {
            source: "0",
            target: "9",
          },
          {
            source: "0",
            target: "10",
          },
          {
            source: "0",
            target: "11",
          },
          {
            source: "0",
            target: "13",
          },
          {
            source: "0",
            target: "14",
          },
          {
            source: "0",
            target: "15",
          },
          {
            source: "0",
            target: "16",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "7",
            target: "13",
          },
          {
            source: "8",
            target: "14",
          },
          {
            source: "9",
            target: "10",
          },
          {
            source: "10",
            target: "22",
          },
          {
            source: "10",
            target: "14",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "10",
            target: "24",
          },
          {
            source: "10",
            target: "21",
          },
          {
            source: "10",
            target: "20",
          },
          {
            source: "11",
            target: "24",
          },
          {
            source: "11",
            target: "22",
          },
          {
            source: "11",
            target: "14",
          },
          {
            source: "12",
            target: "13",
          },
          {
            source: "16",
            target: "17",
          },
          {
            source: "16",
            target: "18",
          },
          {
            source: "16",
            target: "21",
          },
          {
            source: "16",
            target: "22",
          },
          {
            source: "17",
            target: "18",
          },
          {
            source: "17",
            target: "20",
          },
          {
            source: "18",
            target: "19",
          },
          {
            source: "19",
            target: "20",
          },
          {
            source: "19",
            target: "33",
          },
          {
            source: "19",
            target: "22",
          },
          {
            source: "19",
            target: "23",
          },
          {
            source: "20",
            target: "21",
          },
          {
            source: "21",
            target: "22",
          },
          {
            source: "22",
            target: "24",
          },
          {
            source: "22",
            target: "25",
          },
          {
            source: "22",
            target: "26",
          },
          {
            source: "22",
            target: "23",
          },
          {
            source: "22",
            target: "28",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "31",
          },
          {
            source: "22",
            target: "32",
          },
          {
            source: "22",
            target: "33",
          },
          {
            source: "23",
            target: "28",
          },
          {
            source: "23",
            target: "27",
          },
          {
            source: "23",
            target: "29",
          },
          {
            source: "23",
            target: "30",
          },
          {
            source: "23",
            target: "31",
          },
          {
            source: "23",
            target: "33",
          },
          {
            source: "32",
            target: "33",
          },
        ],
        // 分组
        combos: [
          {
            // 唯一的标志符，用来标识不同分组
            id: "a",
            // 分组的标签，显示在图标上
            label: "Combo A",
          },
          {
            id: "b",
            label: "Combo B",
          },
          {
            id: "c",
            label: "Combo C",
          },
          {
            id: "d",
            label: "Combo D",
            // 分组的父级分组的标识符。
            // 创建分组之间的层级关系。d 分组的父级分组是 b
            parentId: "b",
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
          nodeSpacing: (d) => 8,
        },
        // 默认节点的样式，包括尺寸、填充色、描边线宽
        defaultNode: {
          size: 15,
          color: "#5B8FF9",
          style: {
            lineWidth: 2,
            fill: "#C6E5FF",
          },
        },
        // 默认边的样式，包括尺寸、颜色s
        defaultEdge: {
          size: 2,
          color: "orange",
        },
        // 指定图的行为模式，这里使用了默认模式，包括拖拽组合、拖拽节点、拖拽画布、缩放画布等行为
        modes: {
          default: ["drag-combo", "drag-node", "drag-canvas", "zoom-canvas"],
        },
      });

      // 将数据对象传入图形实例并且渲染图表
      graph.data(data);
      graph.render();

      // // 准备数据
      // const data = {
      //   // 点集
      //   nodes: [
      //     {
      //       id: "node1", // String，该节点存在则必须，节点的唯一标识
      //       x: 100, // Number，可选，节点位置的 x 值
      //       y: 200, // Number，可选，节点位置的 y 值
      //     },
      //     {
      //       id: "node2", // String，该节点存在则必须，节点的唯一标识
      //       x: 300, // Number，可选，节点位置的 x 值
      //       y: 200, // Number，可选，节点位置的 y 值
      //     },
      //   ],
      //   // 边集
      //   edges: [
      //     {
      //       source: "node1", // String，必须，起始点 id
      //       target: "node2", // String，必须，目标点 id
      //     },
      //   ],
      // };

      // const graph = new G6.Graph({
      //   container: "container", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      //   width: 800, // Number，必须，图的宽度
      //   height: 500, // Number，必须，图的高度
      // });

      // graph.data(data); // 读取 Step 2 中的数据源到图上
      // graph.render(); // 渲染图
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

/* 在此处定义样式规则 */
::v-deep .e .active-item {
  background-color: #f00; /* 使用您想要的背景颜色 */
}
</style>
