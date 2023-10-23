<template>
  <el-card>
    <div style="font-weight: 700" class="margin-bottom20">归因分析服务</div>
    <div class="flex-box margin-bottom">
      <div class="top-left">
        <el-form class="form" label-width="110px" :model="ruleForm">
          <el-form-item label="应用运行环境">
            <el-select
              v-model="ruleForm.appEnvironment"
              placeholder="请选择"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in appEnvironmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
          <el-form-item label="Java环境">
            <el-select
              v-model="ruleForm.javaEnvironment"
              placeholder="请选择"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in javaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
          <el-form-item label="文件上传方式">
            <el-select
              v-model="ruleForm.fileMode"
              placeholder="请选择"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in fileModeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
          <el-form-item label="上传JAR包">
            <div class="flex-between">
              <el-upload class="upload-demo" action="">
                <el-button type="primary" size="small">选择文件</el-button>
              </el-upload>
              <el-input
                placeholder="文件"
                style="width: 80%; margin-left: 10px"
                disabled
                size="small"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="版本">
            <div class="flex-between">
              <el-input
                style="width: 60%"
                v-model="ruleForm.edition"
                size="small"
              ></el-input>
              <span class="text-color">用时间戳作为版本号</span>
            </div>
          </el-form-item>
          <el-form-item label="时区">
            <el-select
              v-model="ruleForm.timeZone"
              placeholder="请选择"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
        </el-form>
      </div>
      <div class="top-right">
        <div class="tr-left">
          <el-form class="form" label-width="130px" :model="ruleForm">
            <el-form-item label="AZ">
              <el-select
                v-model="ruleForm.az"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in azOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-form-item>
            <el-form-item label="首批灰度数量">
              <el-input-number
                class="margin-bottom margin-right"
                v-model="ruleForm.num"
                controls-position="right"
                @change="handleChange"
                size="small"
                :min="1"
                :max="10"
              ></el-input-number>
              <span>(应用当前实例数3)</span>
              <div style="font-size: 12px; color: #ccc; line-height: 0px">
                建议首批灰度实例数不超过因公实例总数的50%
              </div>
              <div style="font-size: 12px; color: #f56c6c">
                灰度分组发布后，需要手动剩余分批发布
              </div>
            </el-form-item>
            <el-form-item label="剩余批次">
              <el-input-number
                class="margin-bottom"
                v-model="ruleForm.remainingLot"
                controls-position="right"
                @change="handleChange"
                size="small"
                :min="1"
                :max="10"
              ></el-input-number>
              <div style="font-size: 12px; color: #ccc; line-height: 0px">
                首批发布后，剩余的应用实例按照数量分批次发布
              </div>
            </el-form-item>
            <el-form-item label="批次内部署间隔">
              <el-input-number
                class="margin-right"
                v-model="ruleForm.deployInterval"
                controls-position="right"
                @change="handleChange"
                size="small"
                :min="1"
                :max="10"
              ></el-input-number>
              <span>秒</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="tr-right">
          <div class="margin-bottom20">当前发布流程</div>
          <el-steps style="height: 300px" direction="vertical" :active="1">
            <el-step title="开始发布"></el-step>
            <el-step title="【策略生效】恢复发布1台">
              <template slot="description">
                <span class="error"
                  >如果继续发布剩余批次或回滚灰度分组，发布策略将被立即删除，应用开始接收正常流量</span
                >
              </template>
            </el-step>
            <el-step title="【手动开始】灰度后第一批：2台"></el-step>
            <el-step title="发布结束"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <div class="bot">
      <el-tabs class="bot-left" v-model="activeName" type="border-card">
        <el-tab-pane label="按内容灰度" name="content">
          <div class="flex-box">
            <el-form
              class="form content-left"
              label-width="70px"
              :model="ruleForm"
            >
              <el-form-item label="协议类型">
                <el-radio-group v-model="ruleForm.protocolType">
                  <el-radio label="Spring Cloud"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="path">
                <el-input v-model="ruleForm.path" size="small"></el-input>
              </el-form-item>
              <el-form-item label="条件模式">
                <el-radio-group v-model="ruleForm.conditionalMode">
                  <el-radio label="同时满足下列条件"></el-radio>
                  <el-radio label="满足下列任一条件"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="条件列表">
                <table style="width: 100%">
                  <thead class="headerStyle">
                    <tr>
                      <th>
                        <div class="cell">参数类型</div>
                      </th>
                      <th>
                        <div class="cell">参数</div>
                      </th>
                      <th>
                        <div class="cell">条件</div>
                      </th>
                      <th>
                        <div class="cell">值</div>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in ruleForm.conditionList"
                      :key="index"
                    >
                      <td>
                        <el-form-item >
                          <el-select
                            v-model="item.argumentType"
                            placeholder="Cookie"
                            size="mini"
                          >
                            <el-option
                              label="Cookie"
                              value="Cookie"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item >
                          <el-select
                            v-model="item.argument"
                            placeholder="Cookie字段名"
                            size="mini"
                          >
                            <el-option label="" value=""></el-option>
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item >
                          <el-select
                            v-model="item.Conditions"
                            placeholder="请选择"
                            size="mini"
                          >
                            <el-option label="" value=""></el-option>
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item >
                          <el-input v-model="item.value" size="mini">
                          </el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-button
                          class="error"
                          type="text"
                          icon="el-icon-delete"
                           @click="handleDelete('conditionList', item, index)"
                        ></el-button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-button
                          type="text"
                          icon="el-icon-plus"
                          @click="handleAdd"
                          >添加规则条件</el-button
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
            </el-form>
            <div class="content-right">
              <div>按请求内容灰度</div>
              <div style="color: #ccc; font-size: 12px">
                把请求内容符合指定条件的流量作为灰度流量
              </div>
              <div id="container"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按比例灰度" name="scale">
          <div class="flex-box" style="min-height: 300px">
            <el-form
              class="form content-left"
              label-width="70px"
              :model="ruleForm"
            >
              <el-form-item label="流量比例">
                <el-input-number
                  class="margin-right"
                  v-model="ruleForm.flowRatio"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
                  :min="1"
                  :max="20"
                ></el-input-number>
                <span>%</span>
                <div>流量会按配置的比例被转发到当前的灰度分组</div>
              </el-form-item>
            </el-form>
            <div class="content-right">111</div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="bot-right">
        <el-collapse
          class="margin-bottom"
          style="
            height: 450px;
            border: 1px solid #ccc;
            padding: 0 20px 5px 20px;
            overflow-y: auto;
          "
        >
          <el-collapse-item>
            <template slot="title"> 启动命令 </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title"> 环境变量 </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title"> 持久化存储 </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title"> 本地存储 </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title"> 应用生命周期管理 </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title"> 日志收集设置 </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-button type="primary" style="float: right" @click="handleRoute"
          >确认</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        appEnvironment: "标准java运行环境",
        az: "all",
        javaEnvironment: "Open JDK 8",
        fileMode: "上传JAR包",
        edition: "2023-4-29 11:12:13",
        timeZone: "UTC+8",
        num: 1,
        remainingLot: 1,
        deployInterval: 1,
        protocolType: "Spring Cloud",
        path: "HTTP相对路径，例如/a/b，注意是严格匹配，留空代表匹配任何路径",
        conditionalMode: "同时满足下列条件",
        flowRatio: 20,
        conditionList: [
          {
            argumentType: "",
            argument: "",
            Conditions: "",
            value: "1",
          },
        ],
      },
      appEnvironmentOptions: [
        {
          label: "标准java运行环境",
          value: "标准java运行环境",
        },
      ],
      azOptions: [
        {
          label: "全部",
          value: "all",
        },
      ],
      javaOptions: [
        {
          label: "Open JDK 8",
          value: "Open JDK 8",
        },
      ],
      fileModeOptions: [
        {
          label: "上传JAR包",
          value: "上传JAR包",
        },
      ],
      timeOptions: [
        {
          label: "UTC+8",
          value: "UTC+8",
        },
      ],
      activeName: "content",
      graph: null,
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.initGraph();
  },
  beforeDestroy() {
    // 销毁画布
    this.graph.destroy();
    // 实例销毁
    this.graph = null;
  },
  computed: {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleAdd() {
      let obj = {
        argumentType: "",
        argument: "",
        Conditions: "",
        value: "1",
      };
      this.ruleForm.conditionList.push(obj);
    },
     handleDelete(filed, item, index) {
      this.ruleForm[filed].splice(index, 1);
    },
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
            id: "node5",
            label: "上游应用",
            x: 100,
            y: 0,
            size: [300, 80],
          },
          {
            id: "node1",
            label: "v1",
            x: 250,
            y: 150,
            comboId: "combo",
          },
          {
            id: "node2",
            label: "v1",
            x: 350,
            y: 150,
            comboId: "combo",
          },
          {
            id: "node3",
            label: "v2",
            x: 250,
            y: 150,
            comboId: "combo3",
          },
          {
            id: "node4",
            label: "v2",
            x: 350,
            y: 150,
            comboId: "combo3",
          },
        ],
        edges: [
          {
            source: "node5",
            target: "combo",
            label: "arg%100<=40",
          },
          {
            source: "node5",
            target: "combo3",
            label: "",
          },
        ],
        combos: [
          {
            id: "combo",
            label: "灰度单元",
            x: 200,
            y: 200,
          },
          {
            id: "combo3",
            label: "正常单元",
            x: 0,
            y: 200,
          },
        ],
      };

      const container = document.getElementById("container");
      const width = container.scrollWidth || 800;
      const height = container.scrollHeight || 200;

      this.graph = new G6.Graph({
        container: "container",
        width,
        height,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
        modes: {
          default: [
            "drag-canvas",
            "drag-node",
            "drag-combo",
            "collapse-expand-combo",
          ],
        },
        defaultNode: {
          type: "rect",
          size: [30, 30],
          labelCfg: {
            position: "center",
          },
        },
        defaultEdge: {
          type: "polyline",
          style: {
            offset: 10,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5",
          },
          labelCfg: {
            autoRotate: true,
            refY: -10,
          },
        },

        defaultCombo: {
          type: "rect",
          /* The minimum size of the combo. combo 最小大小 */
          size: [50, 50],
          /* style for the keyShape */
          // style: {
          //   lineWidth: 1,
          // },
          labelCfg: {
            position: "top",
          },
        },
      });

      // 图初始化数据
      this.updateData(data);
      // 渲染画布
      this.renderGraph();
      // this.graph.zoom(1);
      this.graph.fitView();
    },
    handleRoute() {
      this.$router.push({
        name: "DeploymentGrayscalePublishingAfter",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.top-left {
  flex: 1.2;
  margin-right: 10px;
  padding: 20px 20px 0px 0;
  border: 1px solid #ccc;
}
.top-right {
  display: flex;
  flex: 2;
  padding: 20px 0;
  border: 1px solid #ccc;
  .tr-left {
    width: 55%;
    border-right: 1px solid #ccc;
  }
  .tr-right {
    padding-left: 30px;
    width: 45%;
  }
}
.bot {
  display: flex;
  .bot-left {
    width: 60%;
    height: 500px;
    margin-right: 10px;
    .content-left {
      flex: 2;
      height: 430px;
      overflow-y: auto;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
    .content-right {
      flex: 1.3;
      padding: 80px 0 0 0;
      text-align: center;
    }
  }
  .bot-right {
    width: 40%;
    height: 500px;
  }
}

</style>
