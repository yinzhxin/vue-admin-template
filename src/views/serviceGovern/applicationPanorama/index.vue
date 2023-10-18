<template>
  <div class="dashboard-container">
    <div class="left margin-right">
      <MenuTree :treeData="treeData" />
    </div>
    <div class="right">
      <BaseInfoCard class="margin-bottom" title="归因分析服务" :desc="desc" />
    </div>

    <div>
      <div id="container" style=""></div>
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import MenuTree from "@/components/MenuTree";
import BaseInfoCard from "@/components/BaseInfoCard.vue";
import LineChart from "@/components/Chart/LineChart.vue";

export default {
  name: "",
  components: { MenuTree, BaseInfoCard, LineChart },
  props: {},
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "XXXX平台",
          icon: "el-icon-s-tools",
          children: [
            {
              id: 11,
              label: "归因分析服务",
            },
            {
              id: 12,
              label: "用户行为间隔分析",
            },
            {
              id: 13,
              label: "非金融维护服务",
            },
            {
              id: 14,
              label: "授权交易服务",
            },
          ],
        },
        {
          id: 2,
          label: "XXXX系统",
          icon: "el-icon-user-solid",
          children: [
            {
              id: 21,
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: 22,
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: 3,
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: 31,
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: 32,
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: 4,
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: 41,
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: 42,
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: 5,
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: 51,
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: 52,
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

      graph: null,
    };
  },

  mounted() {
    this.initGraph();
  },

  beforeDestroy() {
    // 销毁画布
    this.graph.destroy();
    // 实例销毁
    this.graph = null;
  },

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
        id: "person",
        children: [
          {
            id: "server",
          },
        ],
      };

      G6.Util.traverseTree(data, (d) => {
        d.leftIcon = {
          style: {
            fill: "#e6fffb",
            stroke: "#e6fffb",
          },
          img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
        };
        return true;
      });

      const defaultLayout = {
        type: "compactBox",
        direction: "TB",
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 40;
        },
        getHGap: function getHGap() {
          return 70;
        },
      };

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth || 1190;
      const height = container.scrollHeight || 300;
      console.log(width, height);

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        plugins: [toolbar],
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          type: "image",
          size: [60, 60],
        },
        defaultEdge: {
          style: {
            lineDash: [4, 4], // 虚线样式
            stroke: "blue", // 线条颜色
            lineWidth: 1, // 线条宽度
          },
        },

        layout: defaultLayout,
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

      this.graph.edge((edge) => {
        const label = "4000次/小时 HTTP"; // 标签文字

        const labelCfg = {
          position: "middle",
          style: {
            fill: "#F56C6C", // 文字颜色
            fontSize: 8, // 文字大小
            textAlign: "center",
            textBaseline: "middle",
          },
        };
        return { label, labelCfg };
      });

      // 图初始化数据
      this.updateData(data);
      // 渲染画布
      this.renderGraph();
      // this.graph.zoom(1);
      this.graph.fitView();
    },
  },
  mounted() {},
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
  }
  .right {
    flex: 4;
    height: 100%;
    overflow-y: auto;
  }
}
.el-row {
  margin-bottom: 0;
}
</style>
