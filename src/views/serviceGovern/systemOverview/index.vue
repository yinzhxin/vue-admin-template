<template>
  <div class="dashboard-container">
    <div class="left margin-right">
      <MenuTree :treeData="treeData" />
    </div>
    <div class="right">
      <BaseInfoCard class="margin-bottom" title="归因分析服务" :desc="desc" />
      <el-tabs type="border-card">
        <el-tab-pane label="概览">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content">
                <div class="rating" v-for="item in cardData" :key="item.title">
                  <div class="margin-bottom20">{{ item.title }}</div>
                  <div class="margin-bottom20 fontSize24">
                    {{ item.num }}
                    <span class="fontSize16" v-if="item.title == '平均响应时间'"
                      >ms</span
                    >
                    <span
                      class="fontSize16"
                      v-else-if="
                        item.title == '错误数' ||
                        item.title == 'Full GC' ||
                        item.title == '慢SQL'
                      "
                      >次</span
                    >
                    <span
                      class="fontSize16"
                      v-else-if="item.title == '异常' || item.title == '慢调用'"
                      >个</span
                    >
                  </div>
                  <div class="margin-bottom">
                    周同比
                    <i class="el-icon-caret-top error" v-if="item.week > 0" />
                    <img
                      src="@/assets/icons/rect.svg"
                      alt=""
                      class="img-box"
                      v-else
                    />
                    {{ item.week }}%
                  </div>
                  <div>
                    日同比
                    <i class="el-icon-caret-top error" v-if="item.day > 0" />
                    <img
                      src="@/assets/icons/rect.svg"
                      alt=""
                      class="img-box"
                      v-else
                    />
                    {{ item.day }}%
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div class="right-bottom margin-top">
        <div class="bottom-left margin-right">
          <el-card class="box-card margin-bottom" style="width: 100%">
            <div class="margin-bottom flex-between">
              <div>接入性能</div>
              <div>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  style="width: 150px"
                >
                </el-date-picker>
                <span style="margin: 0 10px">AZ</span>
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  size="mini"
                  style="width: 150px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-button type="primary" size="mini">查询</el-button>
            </div>

            <el-table
              :data="tableData"
              border
              style="width: 100%"
              size="mini"
              max-height="140"
            >
              <el-table-column
                v-for="col in columns"
                :key="col.index"
                :label="col.label"
                :width="col.width"
                :show-overflow-tooltip="col['show-overflow-tooltip']"
                :fixed="col.fixed"
              >
                <template slot-scope="scope">{{
                  scope.row[col.index]
                }}</template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="box-card">
            <div class="margin-bottom flex-between">
              <div>发布记录</div>
              <div>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  class="margin-right"
                  size="mini"
                >
                </el-date-picker>
                <el-button type="primary" size="mini">查询</el-button>
              </div>
            </div>
            <el-table
              :data="tableData2"
              border
              style="width: 100%"
              size="mini"
              max-height="140"
            >
              <el-table-column
                v-for="col in columns2"
                :key="col.index"
                :label="col.label"
              >
                <template slot-scope="scope">{{
                  scope.row[col.index]
                }}</template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
        <el-card class="bottom-right">
          <line-chart width="100%" height="450px" :chartData="chartData" />
          <el-button
            type="text"
            icon="el-icon-refresh-right"
            class="button"
          ></el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTree from "@/components/MenuTree";
import BaseInfoCard from "@/components/BaseInfoCard.vue";
import LineChart from "@/components/Chart/LineChart.vue";
import Table from "@/views/components/Table";

export default {
  name: "",
  components: { MenuTree, BaseInfoCard, LineChart, Table },
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
      // 事件总览数据
      cardData: [
        { title: "总请求量", num: 700, week: 7, day: 7 },
        { title: "平均响应时间", num: 2.8, week: 25.3, day: 25.3 },
        { title: "错误数", num: 0, week: 20, day: 20 },
        { title: "Full GC", num: 0, week: 0, day: 0 },
        { title: "慢SQL", num: 0, week: 0, day: 0 },
        { title: "异常", num: 0, week: 0, day: 0 },
        { title: "慢调用", num: 0, week: 0, day: 0 },
      ],
      tableData: [
        {
          AZ: "AZ1",
          deploy: "NRCP-SUBNOA-MS-Manager-Master",
          instanceNum: 0,
          healthNum: 0,
          downNum: 0,
          num: 0,
          successNum: 0,
          successRate: "100%",
        },
        {
          AZ: "AZ1",
          deploy: "NRCP-SUBNOA-MS-Manager-Master",
          instanceNum: 0,
          healthNum: 0,
          downNum: 0,
          num: 0,
          successNum: 0,
          successRate: "100%",
        },
        {
          AZ: "AZ1",
          deploy: "NRCP-SUBNOA-MS-Manager-Master",
          instanceNum: 0,
          healthNum: 0,
          downNum: 0,
          num: 0,
          successNum: 0,
          successRate: "100%",
        },
        {
          AZ: "AZ1",
          deploy: "NRCP-SUBNOA-MS-Manager-Master",
          instanceNum: 0,
          healthNum: 0,
          downNum: 0,
          num: 0,
          successNum: 0,
          successRate: "100%",
        },
        {
          AZ: "AZ1",
          deploy: "NRCP-SUBNOA-MS-Manager-Master",
          instanceNum: 0,
          healthNum: 0,
          downNum: 0,
          num: 0,
          successNum: 0,
          successRate: "100%",
        },
        {
          AZ: "AZ1",
          deploy: "NRCP-SUBNOA-MS-Manager-Master",
          instanceNum: 0,
          healthNum: 0,
          downNum: 0,
          num: 0,
          successNum: 0,
          successRate: "100%",
        },
      ],
      columns: [
        {
          label: "AZ",
          index: "AZ",
          width: 50,
          "show-overflow-tooltip": true,
          fixed: true,
        },
        {
          label: "部署",
          index: "deploy",
          "show-overflow-tooltip": true,
          fixed: true,
        },
        {
          label: "实例服务数量",
          index: "instanceNum",
          "show-overflow-tooltip": true,
          width: 100,
        },
        {
          label: "健康服务实例数量",
          index: "healthNum",
          "show-overflow-tooltip": true,
          width: 120,
        },
        {
          label: "宕机服务实例数",
          index: "downNum",
          "show-overflow-tooltip": true,
          width: 110,
        },
        {
          label: "请求数量",
          index: "num",
          "show-overflow-tooltip": true,
          width: 70,
        },
        {
          label: "请求成功数量",
          index: "successNum",
          "show-overflow-tooltip": true,
          width: 100,
        },

        {
          label: "成功率",
          index: "successRate",
          "show-overflow-tooltip": true,
          width: 60,
        },
      ],
      tableData2: [
        {
          lot: "20230429153539",
          deployNum: 3,
          releaseStatus: "发布完成",
          releaseType: "正常发布",
        },
        {
          lot: "20230429153539",
          deployNum: 3,
          releaseStatus: "发布完成",
          releaseType: "正常发布",
        },
        {
          lot: "20230429153539",
          deployNum: 3,
          releaseStatus: "发布完成",
          releaseType: "正常发布",
        },
      ],
      columns2: [
        {
          label: "批次",
          index: "lot",
          width: 50,
        },
        {
          label: "部署数量",
          index: "deployNum",
        },
        {
          label: "发布状态",
          index: "releaseStatus",
        },
        {
          label: "发布类型",
          index: "releaseType",
        },
      ],
      chartData: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "请求量/分钟",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "平均响应时间/分钟",
            data: [50, 32, 10, 34, 90, 30, 21],
          },
        ],
      },
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
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
    .grid-content {
      min-height: 200px;
      display: flex;
      justify-content: space-around;
      .rating {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        span {
          font-weight: 500;
          /* 第二个span的样式 */
          &:nth-child(2) {
            font-size: 25px;
            margin: 20px 0;
            color: #409eff;
          }
        }
      }
    }
    .right-bottom {
      display: flex;
      height: 450px;
      .bottom-left {
        width: 60%;
        height: 100%;
      }
      .bottom-right {
        position: relative;
        width: 40%;
        height: 100%;
        .button {
          position: absolute;
          top: 20px;
          right: 30px;
          z-index: 10;
        }
      }
    }
  }
}
.el-row {
  margin-bottom: 0;
}
.img-box {
  width: 16px;
  height: 10px;
}
</style>
