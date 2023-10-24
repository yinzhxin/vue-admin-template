<template>
  <div class="dashboard-container">
    <div class="left margin-right">
      <MenuTree :treeData="treeData" />
    </div>
    <div class="right">
      <BaseInfoCard class="margin-bottom" title="归因分析服务" :desc="desc" />

      <div style="width: 100%; height: 100%; background: #fff">
        <!-- <img src="../../../assets/panorama.svg" style="width: 100%; height: auto" /> -->
        <Drage />
        <Drage1 />
        <Drage3 />
        <Drage2 />
      </div>
    </div>
  </div>
</template>

<script>
// import G6 from "@antv/g6";
import MenuTree from "@/components/MenuTree";
import BaseInfoCard from "@/components/BaseInfoCard.vue";
import LineChart from "@/components/Chart/LineChart.vue";
import Drage from "./components/Drage.vue";
import Drage1 from "./components/Drage1.vue";
import Drage2 from "./components/Drage2.vue";
import Drage3 from "./components/Drage3.vue";

export default {
  name: "ApplicationPanorama",
  components: {
    MenuTree,
    BaseInfoCard,
    LineChart,
    Drage,
    Drage1,
    Drage2,
    Drage3,
  },
  props: {},
  data() {
    return {
      treeData: [
        {
          id: '1',
          label: "XXXX平台",
          icon: "el-icon-s-tools",
          children: [
            {
              id: '11',
              label: "归因分析服务",
            },
            {
              id: '12',
              label: "用户行为间隔分析",
            },
            {
              id: '13',
              label: "非金融维护服务",
            },
            {
              id: '14',
              label: "授权交易服务",
            },
          ],
        },
        {
          id: '2',
          label: "XXXX系统",
          icon: "el-icon-user-solid",
          children: [
            {
              id: '21',
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: '22',
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: '3',
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: '31',
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: '32',
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: '4',
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: '41',
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: '42',
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: '5',
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: '51',
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: '52',
              label: "二级 22",
              newVal: "",
            },
          ],
        },
      ],
      desc: [
        {
          label: "应用ID",
          value: "IDxSwkdS83SlaAEIS",
        },
        {
          label: "创建时间",
          value: "2023-4-22 09:21:39",
        },
        {
          label: "集群类型",
          value: "K8s集群",
        },
        {
          label: "k8s命名空间",
          value: "default",
        },
        {
          label: "更新时间",
          value: "2023-4-22 09:21:39",
        },
        {
          label: "集群名称",
          value: "Test测试集群",
        },
        {
          label: "规格",
          cpu: 2,
          mem: 2,
        },
        {
          label: "部署类型",
          value: "FatJar",
        },
        {
          label: "YAML",
          value: "编辑",
        },
        {
          label: "状态",
          value: "9/9个Pod运行中",
        },
        {
          label: "部署包",
          value: "NRCP-Man-1.0.0-SNAPSHOT.jar",
        },
        {
          label: "负责人",
          value: "王东东",
        },
      ],

      // graph: null,
    };
  },

  // mounted() {
  //   this.initGraph();
  // },

  // beforeDestroy() {
  //   // 销毁画布
  //   this.graph.destroy();
  //   // 实例销毁
  //   this.graph = null;
  // },

  methods: {
    // 更新图表数据，初次渲染也调用data方法
    updateData(newData) {
      this.graph.data(newData);
    },

    // 渲染图表
    renderGraph() {
      this.graph.render();
    },

    // 初始化图表
    initGraph() {
      const toolbar = new G6.ToolBar({
        position: { x: 0, y: 30 },
      });

      const data = {
        id: "root",
        img: "user",
        label: "User",
        children: [
          {
            id: "root/1",
            img: "request",
            label: "主动请求",
            children: [
              {
                id: "root/2/3",
                img: "request",
                label: "创建",
              },
            ],
          },
          {
            id: "root/2",
            img: "request",
            label: "自动请求",
            children: [
              {
                id: "root/2/1",
                img: "request",
                label: "创建",
              },
            ],
          },
          {
            id: "root/3",
            img: "request",
            label: "查询请求",
            children: [
              {
                id: "root/3/1",
                img: "request",
                label: "查询执行",
                children: [
                  {
                    id: "root/3/1/1",
                    img: "right",
                    label: "User",
                  },
                ],
              },
            ],
          },
        ],
      };

      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: "#5B8FF9",
                fill: "#C6E5FF",
                lineWidth: 3,
              },
              name: "rect-shape",
            });
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold",
                },
                name: "text-shape",
              });
            }
            return rect;
          },
        },
        "single-node"
      );

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth || 1190;
      const height = container.scrollHeight || 300;
      console.log(width, height);
      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        layout: {
          type: "dagre",
          rankdir: "LR", // 可选，默认为图的中心
          ranksep: 70,
          controlPoints: true,
        },
        defaultNode: {
          type: "sql",
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5",
          },
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef",
          },
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas", "click-select"],
        },
        fitView: true,
      });

      this.graph.node((node) => {
        if (node.id == "person") {
          node.img = "/topo_images/person.svg";
          node.size = 30;
        }
        if (node.id == "server") {
          node.img = "/topo_images/server.svg";
          node.size = 30;
        }
        return {};
      });

      // 图初始化数据
      this.updateData(data);
      // 渲染画布
      this.renderGraph();
      this.graph.zoom(1);
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  height: 100%;
  .left {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
  }
  .right {
    flex: 4;
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
  }
}
.el-row {
  margin-bottom: 0;
}
</style>
