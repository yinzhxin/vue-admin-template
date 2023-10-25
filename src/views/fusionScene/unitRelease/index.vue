<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <el-form-item label="">
            <span style="font-weight: 700; font-size: 20px">应用选择</span>
          </el-form-item>

          <el-form-item label="">
            <el-input
              v-model="form.value"
              placeholder="应用查找"
              style="width: 300px"
            />
          </el-form-item>

          <el-form-item label="">
            <el-button>查找</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6" v-for="item in 4" :key="item">
        <div class="grid-content">
          <div class="title-style">
            <strong>资源配额</strong>
            <el-button type="text">配置</el-button>
          </div>
          <div class="content-style">
            <div>业务单元 3x3</div>
            <div>灰度单元 3x3</div>
            <div>公共单元 3x3</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="step-style">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div>发布流程：归因分析服务_业务单元_整体发布</div>
            <el-button type="text">编辑流程</el-button>
          </div>
          <el-steps :active="step" style="margin-top: 20px">
            <el-step title="流程开始"></el-step>
            <el-step title="信息确认"></el-step>
            <el-step title="备单元发布"></el-step>
            <el-step title="备单元拔测"></el-step>
            <el-step title="流量切换至备单元"></el-step>
            <el-step title="主单元发布"></el-step>
            <el-step title="主单元拔测"></el-step>
            <el-step title="流量切换至主单元"></el-step>
            <el-step title="确认结束"></el-step>
          </el-steps>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="nerver">
          <div slot="header">
            <strong>{{ title }}</strong>
          </div>
          <div v-if="step == 2">
            <el-form :inline="true" :model="formInline">
              <el-form-item label="应用1"> </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="formInline.user" placeholder="" />
              </el-form-item>
              <el-form-item label="版本号">
                <el-input v-model="formInline.user" placeholder="" />
              </el-form-item>
              <br />
              <el-form-item label="应用2"> </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="formInline.user" placeholder="" />
              </el-form-item>
              <el-form-item label="版本号">
                <el-input v-model="formInline.user" placeholder="" />
              </el-form-item>
            </el-form>

            <Table
              :table-data="tableData2"
              :columns="columns2"
              :tableStyle="{ marginBottom: '25px' }"
            />

            <el-form :inline="true" :model="form" ref="form">
              <el-form-item label="关联工单"></el-form-item>

              <el-form-item label="">
                <el-input
                  v-model="form.value"
                  placeholder="应用查找"
                  style="width: 300px"
                />
              </el-form-item>

              <el-form-item label="">
                <el-button>查询</el-button>
              </el-form-item>
              <br />
              <el-form-item label="附加信息"></el-form-item>

              <el-form-item label="">
                <el-input
                  type="textarea"
                  v-model="form.value"
                  placeholder="多行输入"
                  style="width: 300px"
                  :rows="5"
                />
              </el-form-item>
            </el-form>

            <div style="display: flex; justify-content: center">
              <el-button type="primary" @click="handleNext">下一步</el-button>
              <el-button @click="handlePrev">上一步</el-button>
            </div>
          </div>

          <div v-if="step == 3">
            <el-form ref="form" :model="formInline" label-width="120px">
              <el-form-item label="应用运行环境">
                <el-select
                  v-model="form.env"
                  placeholder="标准Java运行环境"
                  style="width: 450px"
                >
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Java环境">
                <el-select
                  v-model="form.envJava"
                  placeholder="Open JDK 8"
                  style="width: 450px"
                >
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="文件上传方式">
                <el-select
                  v-model="form.envJava"
                  placeholder="上传JAR包"
                  style="width: 450px"
                >
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="上传JAR包">
                <el-upload
                  class="upload-style"
                  ref="upload"
                  action
                  :limit="fileLimit"
                  :file-list="fileList"
                  :show-file-list="false"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :before-upload="beforeUpload"
                >
                  <!-- action="/api/file/fileUpload" -->
                  <el-button class="btn">
                    <i class="el-icon-paperclip"></i>选择文件
                  </el-button>
                </el-upload>
              </el-form-item>

              <el-form-item label="版本">
                <el-input
                  v-model="form.env"
                  style="width: 300px; margin-right: 20px"
                ></el-input>
                <el-button type="text">用时间戳作为版本号</el-button>
              </el-form-item>

              <el-form-item label="时区">
                <el-select
                  v-model="form.envJava"
                  placeholder="UTC+8"
                  style="width: 450px"
                >
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="AZ">
                <el-select
                  v-model="form.envJava"
                  placeholder=""
                  style="width: 450px"
                >
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <Table
              :table-data="tableData3"
              :columns="columns3a"
              :tableStyle="{ marginBottom: '25px' }"
            />

            <Table
              :table-data="tableData3"
              :columns="columns3b"
              :tableStyle="{ marginBottom: '25px' }"
            />

            <div style="display: flex; justify-content: center">
              <el-button type="primary">执行</el-button>
              <el-button type="primary" @click="handleNext">下一步</el-button>
              <el-button @click="handlePrev">上一步</el-button>
            </div>
          </div>

          <div v-if="step == 4">
            <el-button @click="addTab(activeTab)" class="addBtn" size="small">
              <i class="el-icon-plus"></i>
            </el-button>
            <el-tabs
              type="border-card"
              v-model="activeTab"
              @tab-click="handleClick"
              editable
              @edit="handleTabsEdit"
            >
              <el-tab-pane
                v-if=""
                v-for="item in tabList"
                :key="item.title"
                :label="item.title"
                :name="item.title"
              >
                <keep-alive>
                  <component is="Overview" />
                </keep-alive>
              </el-tab-pane>
            </el-tabs>

            <div
              style="display: flex; justify-content: center; margin-top: 20px"
            >
              <el-button type="primary">执行</el-button>
              <el-button type="primary" @click="handleNext">下一步</el-button>
              <el-button @click="handlePrev">上一步</el-button>
            </div>
          </div>

          <div v-if="step == 5">
            <!-- 三个图表 -->
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <LineChart
                    :width="'100%'"
                    :height="'310px'"
                    :title="`入口应用监控(总)`"
                    :chartData="chartData1.data"
                    :xAxisData="chartData1.xAxisData"
                    :color="chartData1.color"
                  />
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content">
                  <LineChart
                    :width="'100%'"
                    :height="'310px'"
                    :title="`入口应用监控(未监视部分)`"
                    :chartData="chartData2.data"
                    :xAxisData="chartData2.xAxisData"
                    :color="chartData2.color"
                  />
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-card shadow="never" class="grid-content">
                  <div slot="header">
                    <strong>流控分配</strong>
                  </div>

                  <div class="flow-style">
                    <div>
                      <el-button type="primary" size="small"
                        >创建泳道</el-button
                      >

                      <el-select
                        v-model="name"
                        placeholder="流控泳道名称"
                        style="width: 200px; margin: 0 10px"
                        size="small"
                      >
                        <el-option
                          v-for="item in nameOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>

                      <el-input
                        placeholder="请输入流控泳道名称"
                        suffix-icon="el-icon-search"
                        style="width: 240px"
                        size="small"
                        v-model="nameValue"
                      >
                      </el-input>
                    </div>

                    <div>
                      <el-button type="text">优先级设置</el-button>
                      <i class="el-icon-refresh"></i>
                    </div>
                  </div>

                  <div style="margin: 20px 0">
                    <Table
                      :table-data="tableData4"
                      :columns="columns4"
                      size="small"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <div
              style="display: flex; justify-content: center; margin-top: 20px"
            >
              <el-button type="primary">执行</el-button>
              <el-button type="primary" @click="handleNext">下一步</el-button>
              <el-button @click="handlePrev">上一步</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Table from "@/views/components/Table.vue";
import LineChart from "./components/LineChart.vue";
import Overview from "./components/Overview.vue";

export default {
  name: "UnitTrafficSwitching",
  components: { Table, Overview, LineChart },
  props: {},
  data() {
    return {
      title: "",
      form: {},
      step: 2,
      formInline: {},
      tableData2: [
        {
          type: "主单元",
          az: "AZ1",
          num: 30,
        },
        {
          type: "主单元",
          az: "AZ1",
          num: 30,
        },
      ],
      columns2: [
        { label: "单元类型", index: "type" },
        { label: "AZ", index: "az" },
        { label: "数量", index: "num" },
      ],
      tableData3: [],
      columns3a: [
        { label: "任务名称", index: "name" },
        { label: "状态", index: "status" },
        { label: "信息", index: "msg" },
      ],
      columns3b: [
        { label: "Pod信息", index: "msg" },
        { label: "Pod名称", index: "name" },
        { label: "状态", index: "status" },
      ],
      fileLimit: 1, //上传文件个数的限制
      fileList: [], //上传文件的列表

      activeTab: "url1", // 绑定到当前激活的标签页
      tabList: [{ title: "url1", name: "Overview" }],
      num: 1,

      chartData1: {
        data: [
          120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
          210, 200,
        ],
        xAxisData: [
          "00:00",
          "00:04",
          "00:08",
          "00:12",
          "00:16",
          "00:20",
          "00:24",
          "00:28",
          "00:32",
          "00:36",
          "00:40",
          "00:44",
          "00:48",
          "00:52",
          "00:56",
          "01:00",
        ],
        color: ["#409EFF"],
      },

      chartData2: {
        data: [
          120, 200, 150, 80, 70, 110, 90, 160, 220, 100, 130, 180, 140, 190,
          210, 200,
        ],
        xAxisData: [
          "00:00",
          "00:04",
          "00:08",
          "00:12",
          "00:16",
          "00:20",
          "00:24",
          "00:28",
          "00:32",
          "00:36",
          "00:40",
          "00:44",
          "00:48",
          "00:52",
          "00:56",
          "01:00",
        ],
        color: ["#E6A23C"],
      },

      nameOptions: [],
      nameValue: "",
      name: "",

      columns4: [
        {
          label: "流控泳道名称",
          index: "name",
          render(h, data) {
            return (
              <div style="cursor:pointer;color:#409EFF">{data.row.name}</div>
            );
          },
        },
        {
          label: "流控规则及状态",
          index: "status",
          render(h, data) {
            return (
              <div>
                <div>
                  {data.row.status == "已开启" ? (
                    <div>
                      <span style="color:#67C23A">
                        <i class="el-icon-success" />
                      </span>
                      <span>{data.row.status}</span>
                    </div>
                  ) : (
                    <span style="color:#F56C6C">
                      <i class="el-icon-error" />
                    </span>
                  )}
                </div>
                <div>条件:AND</div>
              </div>
            );
          },
        },
        {
          label: "摘要",
          index: "summary",
        },
        {
          label: "打标规则流量对应应用",
          index: "app",
          render(h, data) {
            return (
              <div>
                {data.row.app.map((item) => (
                  <el-tag type="info" style="margin-right:5px">
                    {item}
                  </el-tag>
                ))}
              </div>
            );
          },
        },
        {
          label: "优先级",
          index: "priority",
          width: "100px",
        },
        {
          label: "操作",
          index: "operation",
          width: "130px",
          render: (h, data) => {
            return (
              <div>
                <el-button size="small" type="text">
                  {" "}
                  编辑{" "}
                </el-button>

                <el-button size="small" type="text">
                  {" "}
                  删除{" "}
                </el-button>

                <el-button size="small" type="text">
                  {" "}
                  关闭{" "}
                </el-button>
              </div>
            );
          },
        },
      ],

      tableData4: [
        {
          name: "red",
          status: "已开启",
          summary: "availible DB resource left less then: 20%",
          app: ["sc-a", "sc-b", "sc-c", "sc-d"],
          priority: "1",
        },
      ],
    };
  },
  watch: {
    step: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val === 2) {
          this.title = "信息确认";
        } else if (val == 3) {
          this.title = "备单元发布";
        } else if (val == 4) {
          this.title = "备单元拔测";
        } else if (val == 5) {
          this.title = "流量切换至备单元";
        }
      },
    },
  },
  created() {},
  computed: {},
  methods: {
    handleNext() {
      if (9 > this.step >= 1) {
        this.step++;
      }
    },

    handlePrev() {
      if (this.step >= 2) {
        this.step--;
      }
    },
    handleRemove() {}, //上传之后，移除的事件
    handleExceed() {}, //超出上传文件个数的错误回调
    beforeUpload() {}, //文件通过接口上传之前，一般用来判断规则

    // tab组件的切换函数,根据传入的组件名称切换
    handleClick(tab, event) {
      console.log(tab.name);
    },

    handleTabsEdit(targetName, action) {
      // if (action === "add") {
      //   let newTabName = ++this.tabIndex + "";
      //   this.tabList.push({
      //     title: "New Tab",
      //     name: newTabName,
      //     content: "New Tab content",
      //   });
      //   this.activeTab = newTabName;
      // }
      if (action === "remove") {
        let tabs = this.tabList;
        let activeName = this.activeTab;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.title === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.title;
              }
            }
          });
        }

        this.activeTab = activeName;
        this.tabList = tabs.filter((tab) => tab.title !== targetName);
        this.num--;
      }
    },

    addTab(targetName) {
      let newTabName = "url" + ++this.num;
      this.tabList.push({
        title: newTabName,
        name: "Overview",
      });

      this.activeTab = newTabName;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.grid-content {
  padding: 5px 10px;
  background: #fff;
  min-height: 150px;
  overflow: hidden;
}
.step-style {
  padding: 10px 10px;
  background: #fff;
  min-height: 120px;
  overflow: hidden;
}
.title-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.content-style {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.flow-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-refresh {
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
