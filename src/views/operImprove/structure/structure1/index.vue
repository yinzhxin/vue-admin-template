<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div class="title-style">
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2"><p>存储</p></div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />
                <div class="bottom-style">116.99 / 1671.35T</div>
              </div>
            </el-col>

            <el-col :span="16">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div class="num-style">
                  <div>
                    <div>118</div>
                    <div>总数</div>
                  </div>
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />

                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div class="title-style2">
                  <p>物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />

                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div class="title-style">
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>存储</p>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />
                <div class="bottom-style">116.99 / 1671.35T</div>
              </div>
            </el-col>

            <el-col :span="16">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div class="num-style">
                  <div>
                    <div>118</div>
                    <div>总数</div>
                  </div>
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />

                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div class="title-style2">
                  <p>物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />

                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div class="title-style">
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>存储</p>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />
                <div class="bottom-style">116.99 / 1671.35T</div>
              </div>
            </el-col>

            <el-col :span="16">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div class="num-style">
                  <div>
                    <div>118</div>
                    <div>总数</div>
                  </div>
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />

                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div class="title-style2">
                  <p>物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />

                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content">
          <div class="sss"><i class="el-icon-info icon"></i></div>
          <div class="title-style">
            <p>EverDB</p>
          </div>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="8">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>存储</p>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />
                <div class="bottom-style">116.99 / 1671.35T</div>
              </div>
            </el-col>

            <el-col :span="16">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>容器</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <div class="num-style">
                  <div>
                    <div>118</div>
                    <div>总数</div>
                  </div>
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>

                <BarYChart :width="'100%'" :height="'115%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin: 0 10px 20px">
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="title-style2">
                  <p>虚机</p>
                  <el-button type="text">更多...</el-button>
                </div>
                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />
                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="border: 2px solid #eee; border-radius: 5px">
                <div class="sss"><i class="el-icon-info icon"></i></div>
                <div class="title-style2">
                  <p>物理机</p>
                  <el-button type="text">更多...</el-button>
                </div>

                <RadiusPieChart
                  :width="'100%'"
                  :height="'150%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :radius="chartData.radius"
                  :center="chartData.center"
                  :isShowLegend="chartData.isShowLegend"
                />
                <div
                  class="num-style"
                  style="height: 50px; margin-bottom: 30px"
                >
                  <div>
                    <div>118</div>
                    <div>正常</div>
                  </div>
                  <div>
                    <div>0</div>
                    <div>异常</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import RadiusPieChart from "@/views/echarts/RadiusPieChart.vue";
import BarYChart from "./components/BarYChart";

export default {
  name: "Structure1",
  components: { RadiusPieChart, BarYChart },
  computed: {},
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },

      tableData: [
        { radio: "3/3", title: "数据结点数量" },
        { radio: "3/3", title: "主节点数" },
        { radio: "3/3", title: "总连接数" },
        { radio: "3/3", title: "总活跃链接数" },
        { radio: "3/3", title: "阻塞会话数" },
      ],

      tableData2: [
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
      ],

      columns: [
        { label: "节点", prop: "node" },
        { label: "状态", prop: "status" },
        { label: "QPS", prop: "qps" },
        { label: "CPU使用率", prop: "cpuUsage" },
        { label: "内存使用率", prop: "memoryUsage" },
        { label: "磁盘使用率", prop: "diskUsage" },
      ],

      // 饼图数据
      chartData: {
        data: [
          {
            label: "正常",
            value: 60,
          },
          {
            label: "异常",
            value: 1,
          },
        ],
        color: ["#94D2F4", "#BD3026"],
        radius: ["45%", "65%"],
        center: ["50%", "45%"],
        isShowLegend: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.grid-content {
  background: #ffffff;
  min-height: 100px;
  overflow: hidden;
}

.title-style {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding-left: 60px;
  background: #fff;
}

.title-style2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 10px;
  p {
    font-size: 16px;
  }
}

.bottom-style {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 10px;
}

.num-style {
  padding-bottom: -100px;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    div:first-of-type {
      margin-bottom: 10px;
    }
  }
}

/* 警告红点样式 */
.sss {
  width: 16px;
  height: 16px;
  color: #e02727;
  float: left;
  margin-left: -5px;
  margin-top: -5px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 999;
  position: absolute;
  .icon {
    font-size: large;
    margin-left: -1px;
    margin-top: -1px;
  }
}

.el-table--border,
.el-table--group {
  border: 0px solid #ebeef5;
}
// .elTable {
//   border: 1px solid #e8e8e9;
//   border-top-width: 0px;
// }
</style>
