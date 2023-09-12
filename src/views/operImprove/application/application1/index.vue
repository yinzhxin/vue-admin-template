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
            ></div>
            <!-- 创建容器 -->
            <div id="container"></div>
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
      // 准备数据
      const data = {
        // 点集
        nodes: [
          {
            id: "node1", // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          },
          {
            id: "node2", // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          },
        ],
        // 边集
        edges: [
          {
            source: "node1", // String，必须，起始点 id
            target: "node2", // String，必须，目标点 id
          },
        ],
      };

      const graph = new G6.Graph({
        container: "container", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
      });

      graph.data(data); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图
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
