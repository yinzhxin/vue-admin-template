<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="5" style="padding-right: 0px">
        <div class="grid-content">
          <el-menu
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            class="el-menu-demo"
            :default-openeds="['1', '2']"
          >
            <el-submenu index="1">
              <template slot="title">
                <span>全部</span>
              </template>

              <el-submenu index="2">
                <template slot="title">xxxxxx平台</template>
                <el-menu-item index="1-1-1">归因分析服务</el-menu-item>
                <el-menu-item index="1-1-2">用户行为间隔分析</el-menu-item>
                <el-menu-item index="1-1-3">非金融维护服务</el-menu-item>
                <el-menu-item index="1-1-4">授权交易服务</el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <template slot="title">xxxxxx系统</template>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">xxxxxx平台</template>
              </el-submenu>
              <el-submenu index="1-4">
                <template slot="title">xxxxxx系统</template>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>

      <el-col :span="19" style="padding-left: 0px">
        <div class="topo">
          <div class="container">
            <div
              style="height: 170px; background: #fff; border: 2px solid #c8c8c8"
            >
            
            
            </div>
            <div ref="canvasContainer"></div>
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
      const container = this.$refs.canvasContainer;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const graph = new G6.Graph({
        container,
        width,
        height,
        modes: {
          default: ["drag-canvas", "drag-node"], // 可根据需求配置交互模式
        },
      });

      // 添加 Combo
      const comboId = "combo"; // 设定一个唯一的 ID
      graph.add("combo", {
        id: comboId,
      });

      // 添加节点
      const node1 = graph.addItem("node", { id: "node1", x: 100, y: 100 });
      const node2 = graph.addItem("node", { id: "node2", x: 200, y: 200 });
      const node3 = graph.addItem("node", { id: "node3", x: 300, y: 300 });
      const node4 = graph.addItem("node", { id: "node4", x: 400, y: 400 });

      // 将节点添加到 Combo
      const combo = graph.getGroup("combo");
      graph.addChildren([node1, node2, node3, node4], combo);

      // 绘制 Combo 包围盒
      graph.updateCombo(combo, {
        padding: 10,
      });

      // 渲染图形
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
  .container {
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
