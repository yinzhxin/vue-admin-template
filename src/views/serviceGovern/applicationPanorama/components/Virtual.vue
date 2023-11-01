<template>
  <el-card class="card-style">
    <template #header>
      <div class="card-header">
        <h1>虚拟层</h1>
      </div>
    </template>

    <div style="width: 1200px; height: 800px; display: flex">
      <div class="box" style="margin-right: 10px">
        AZ1
        <div class="az1-style">
          <div class="az1-item-style">

            <div class="az1-item-style-left">
         <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"/>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
         
            </div>
          
            <br />

            <div class="az1-item-style-center">
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
           <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
            </div>

          </div>

          <div class="az1-item-style-right">
          ELB
          <div>
          <img src="../../../../assets/panorama/tree.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/tree.svg" width="60px" height="100px"></img>
          </div>
          </div>
        </div>

        <div class="az1-style" style="width:100%">
          <div class="az1-item-style" style="width:97%">

            <div class="az1-item-style-left">
         <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"/>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
         
            </div>
          
            <br />

            <div class="az1-item-style-center">
           <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
           <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
            </div>

          </div>


        </div>
      </div>


    <div class="box" style="margin-right: 10px">
        AZ2
        <div class="az1-style">
          <div class="az1-item-style">

            <div class="az1-item-style-left">
         <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"/>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
         
            </div>
          
            <br />

            <div class="az1-item-style-center">
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
           <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
            </div>

          </div>

          <div class="az1-item-style-right">
          ELB
          <div>
          <img src="../../../../assets/panorama/tree.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/tree.svg" width="60px" height="100px"></img>
          </div>
          </div>
        </div>

        <div class="az1-style" style="width:100%">
          <div class="az1-item-style" style="width:97%">

            <div class="az1-item-style-left">
         <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"/>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
          <div>
            <img src="../../../../assets/panorama/html.svg" width="60px" height="100px"></img>
          </div>
         
            </div>
          
            <br />

            <div class="az1-item-style-center">
           <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
           <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
          <div>
          <img src="../../../../assets/panorama/net.svg" width="60px" height="100px"></img>
          </div>
            </div>

          </div>


        </div>
      </div>

    </div>
  </el-card>
</template>

<script>
import G6 from "@antv/g6";

export default {
  data() {
    return {
      graph: null,
    };
  },

  mounted() {
    // this.initGraph();
  },

  beforeDestroy() {
    // // 销毁画布
    // this.graph.destroy();
    // // 实例销毁
    // this.graph = null;
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
      const data = {
        nodes: [
          {
            id: "1",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo",
          },
          {
            id: "2",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo",
          },
          {
            id: "3",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo",
          },
          {
            id: "4",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo",
          },
          {
            id: "5",
            img: "/panorama/tree.svg",
            label: "网元",
            comboId: "combo",
          },
          {
            id: "6",
            img: "/panorama/net.svg",
            label: "Nod AZ",
            comboId: "combo",
          },
          {
            id: "7",
            img: "/panorama/net.svg",
            label: "Nod AZ",
            comboId: "combo",
          },
          {
            id: "8",
            img: "/panorama/net.svg",
            label: "Nod AZ",
            comboId: "combo",
          },
          {
            id: "9",
            img: "/panorama/net.svg",
            label: "DRID",
            comboId: "combo",
          },
          {
            id: "10",
            img: "/panorama/net.svg",
            label: "DB",
            comboId: "combo",
          },
          {
            id: "11",
            img: "/panorama/net.svg",
            label: "Redis",
            comboId: "combo",
          },
          {
            id: "12",
            img: "/panorama/net.svg",
            label: "云硬盘",
            comboId: "combo",
          },
          {
            id: "13",
            img: "/panorama/net.svg",
            label: "云硬盘",
            comboId: "combo",
          },
          {
            id: "14",
            img: "/panorama/net.svg",
            label: "本地盘",
            comboId: "combo",
          },

          // 第二个
          {
            id: "15",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo2",
          },
          {
            id: "16",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo2",
          },
          {
            id: "17",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo2",
          },
          {
            id: "18",
            img: "/panorama/html.svg",
            label: "PodAZ",
            comboId: "combo2",
          },
          {
            id: "19",
            img: "/panorama/tree.svg",
            label: "网元",
            comboId: "combo2",
          },
          {
            id: "20",
            img: "/panorama/net.svg",
            label: "Nod AZ",
            comboId: "combo2",
          },
          {
            id: "21",
            img: "/panorama/net.svg",
            label: "Nod AZ",
            comboId: "combo2",
          },
          {
            id: "22",
            img: "/panorama/net.svg",
            label: "Nod AZ",
            comboId: "combo2",
          },
          {
            id: "23",
            img: "/panorama/net.svg",
            label: "DRID",
            comboId: "combo2",
          },
          {
            id: "24",
            img: "/panorama/net.svg",
            label: "DB",
            comboId: "combo2",
          },
          {
            id: "25",
            img: "/panorama/net.svg",
            label: "Redis",
            comboId: "combo2",
          },
          {
            id: "26",
            img: "/panorama/net.svg",
            label: "云硬盘",
            comboId: "combo",
          },
          {
            id: "27",
            img: "/panorama/net.svg",
            label: "云硬盘",
            comboId: "combo2",
          },
          {
            id: "28",
            img: "/panorama/net.svg",
            label: "本地盘",
            comboId: "combo2",
          },
        ],
        combos: [
          {
            id: "combo",
            label: "Combo",
          },
          {
            id: "combo2",
            label: "Combo2",
          },
        ],
      };

      // 获取容器图形
      const container = document.getElementById("virtual");
      const width = container.scrollWidth || 1400;
      const height = container.scrollHeight || 1000;
      console.log(width, height);
      this.graph = new G6.Graph({
        container: "virtual",
        width,
        height,
        fitView: true,
        fitViewPadding: 20,
        // layout: {
        //   controlPoints: true,
        //   type: "grid",
        //   rankdir: "LR", // 图的延展方向，节点对齐方式，可选： 'TB' | 'BT' | 'LR' | 'RL'
        //   // nodeSize: 20,
        //   // ranker: "network-simplex", // 节点分层算法，可选：'tight-tree' 'longest-path' 'network-simplex'
        //   // ranksep: 50, // 图的各个层次之间的间距
        //   nodesep: 5, // 同层各个节点之间的间距
        //   ranksep: 10, // 图的各个层次之间的间距
        // },
        layout: {
          type: "comboForce",
          preventOverlap: true,
          nodeSpacing: 20, // 调整节点间距
          comboSpacing: 50, // 调整 combo 间距
          direction: "LR", // 设置布局方向为从左到右
        },
        defaultNode: {
          type: "image", // 类型
          size: 30, // 大小
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 8,
              fill: "black",
            },
          },
        },
        nodeStateStyles: {},
        defaultCombo: {
          type: "rect",
          /* The minimum size of the combo. combo 最小大小 */
          size: [50, 50],
          /* style for the keyShape */
          // style: {
          //   lineWidth: 1,
          // },
          labelCfg: {
            /* label's offset to the keyShape */
            // refY: 10,
            /* label's position, options: center, top, bottom, left, right */
            position: "top",
            /* label's style */
            // style: {
            //   fontSize: 18,
            // },
          },
        },
        modes: {
          default: [
            "zoom-canvas",
            "drag-canvas",
            "drag-node",
            "drag-combo",
            "collapse-expand-combo",
          ],
        },
      });

      data.nodes.forEach((node) => {
        node.stateStyles = {
          hover: {
            cursor: "pointer",
          },
        };
      });

      this.graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item;
        this.graph.setItemState(nodeItem, "hover", true);
      });

      this.graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item;
        this.graph.setItemState(nodeItem, "hover", false);
      });

      // 图初始化数据
      this.updateData(data);
      // 渲染画布
      this.renderGraph();
      // this.graph.zoom(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  display: flex;
  ::v-deep .el-card__header {
    // padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #bbb;
    writing-mode: tb;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.box {
  border: 1px solid black;
  padding: 10px;
  width: 50%;
}
.az1-style{
width: 100%; 
height: 300px; 
display: flex;
justify-content: space-between;
}
.az1-item-style{
   display: flex;
                 flex-direction: column;
              width: 70%;
              // margin: 10px;
}
.az1-item-style-left{
    display: flex;
    align-items: center;
     width: 100%;
    height:50%;
              margin: 10px;
              border: 1px solid black;
}

.az1-item-style-center{
 display: flex;
              align-items: center;
              width: 100%;
              height:50%;
              margin: 10px;
              border: 1px solid black;
}

.az1-item-style-right{
   display: flex;
              flex-direction: column;
              align-items: center;
              width: 25%;
              margin: 10px;
              border: 1px solid black
}

</style>