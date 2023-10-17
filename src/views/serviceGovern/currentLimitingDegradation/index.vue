<template>
  <div class="dashboard-container">
    <div class="left margin-right">
      <MenuTree :treeData="treeData" />
    </div>
    <div class="right">
      <BaseInfoCard class="margin-bottom" title="归因分析服务" :desc="desc" />
      <el-card class="margin-bottom">
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <div class="flex-between" style="width: 100%">
                <div>
                  <span style="margin-right: 80px">限流规则</span>
                  <span><el-switch v-model="switch1"> </el-switch></span>
                </div>
                <div style="float: right">
                  <span class="margin-right20">AZ</span>
                  <el-select v-model="az" placeholder="请选择">
                    <el-option
                      v-for="item in azOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </template>
            <el-form
              class="margin-top20"
              :model="limitForm"
              label-width="150px"
              label-suffix=":"
            >
              <el-form-item label="接口名称">
                <el-input v-model="limitForm.name"></el-input>
              </el-form-item>
              <el-form-item label="单机QPS阈值">
                <el-input v-model="limitForm.threshold"></el-input>
              </el-form-item>
              <el-form-item label="统计维度">
                <el-radio-group v-model="limitForm.statistical">
                  <el-radio label="当前接口"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="流控方式">
                <el-radio-group v-model="limitForm.system">
                  <el-radio label="快速失败"></el-radio>
                  <el-radio label="Warm Up"></el-radio>
                  <el-radio label="等待排队"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <div class="flex-between" style="width: 100%">
                <div>
                  <span style="margin-right: 80px">降级规则</span>
                  <span><el-switch v-model="switch1"> </el-switch></span>
                </div>
                <div style="float: right">
                  <span class="margin-right20">AZ</span>
                  <el-select v-model="az" placeholder="请选择">
                    <el-option
                      v-for="item in azOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </template>
            <el-form
              class="margin-top20"
              :model="downgradeForm"
              label-width="150px"
              label-suffix=":"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="接口名称">
                    <el-input
                      v-model="downgradeForm.name"
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="慢调用RT">
                    <el-input
                      v-model="downgradeForm.rt"
                    ></el-input> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="统计窗口时长">
                    <el-input
                      v-model="downgradeForm.time"
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="降级阈值">
                    <el-input
                      v-model="downgradeForm.threshold"
                    ></el-input> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="最小请求数目">
                    <el-input
                      v-model="downgradeForm.minNum"
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="熔断时长">
                    <el-input
                      class="margin-right20"
                      v-model="downgradeForm.fusingTime"
                      style="width: 40%"
                    ></el-input>
                    <span>降级时间间隔（单位：秒）</span>
                  </el-form-item></el-col
                >
              </el-row>
              <el-form-item label="阈值类型">
                <el-radio-group v-model="downgradeForm.type">
                  <el-radio label="慢调用比例（%）"></el-radio>
                  <el-radio label="异常比例（%）"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <div class="flex-between" style="width: 100%">
                <div>
                  <span style="margin-right: 80px">隔离规则</span>
                  <span><el-switch v-model="switch1"> </el-switch></span>
                </div>
                <div style="float: right">
                  <span class="margin-right20">AZ</span>
                  <el-select v-model="az" placeholder="请选择">
                    <el-option
                      v-for="item in azOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </template>
            <el-form
              class="margin-top20"
              :model="limitForm"
              label-width="150px"
              label-suffix=":"
            >
              <el-form-item label="接口名称">
                <el-input v-model="limitForm.name"></el-input>
              </el-form-item>
              <el-form-item label="统计维度">
                <el-radio-group v-model="limitForm.statistical">
                  <el-radio label="当前接口"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="并发数阈值">
                <el-input v-model="limitForm.threshold"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card>
        <div class="flex-box">
          <line-chart height="300px" :chartData="chartData1" />
          <line-chart height="300px" :chartData="chartData2" />
        </div>
        <div class="flex-box">
          <line-chart height="300px" :chartData="chartData3" />
          <line-chart height="300px" :chartData="chartData4" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
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
      azOptions: [
        {
          value: "az1",
          label: "az1",
        },
        {
          value: "az2",
          label: "az2",
        },
      ],
      az: "",
      switch1: false,
      limitForm: {
        name: "/Caculator/x1",
        threshold: "100",
        statistical: "当前接口",
        system: "快速失败",
      },
      downgradeForm: {
        name: "/Caculator/x1",
        rt: "请求统计时间超过该值则为慢调用",
        time: 100,
        threshold: 0.8,
        minNum: 10,
        fusingTime: 10,
        type: "慢调用比例（%）",
      },
      chartData1: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "通过QPS",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "拒绝QPS",
            data: [50, 32, 10, 34, 90, 30, 21],
          },
        ],
      },
      chartData2: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "RT（ms）",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      },
      chartData3: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "并发数",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      },
      chartData4: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [
          {
            name: "异常",
            data: [120, 132, 101, 134, 90, 230, 210],
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
  }
}
.el-row {
  margin-bottom: 0;
}
</style>
