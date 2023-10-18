<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="24" style="display: flex; align-items: center">
        <!-- Provider-demo -->
        <h2 style="margin: 0">Provider-demo</h2>
        <!-- 问号 -->
        <el-tooltip effect="dark" placement="top" style="margin: 0 10px">
          <template slot="content">
            <div style="max-width: 350px">Provider-demo</div>
          </template>
          <i class="el-icon-question" style="font-size: 25px" />
        </el-tooltip>
        <!-- t -->
        <el-button style="font-size: 15px" type="text">{{ text }}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <el-card class="box-card" shadow="nerver">
          <!-- 头部 -->
          <div slot="header" class="box-card-header">
            <el-tooltip effect="dark" placement="top" style="">
              <template slot="content">
                <div style="max-width: 350px">Provider-demo</div>
              </template>
              <i class="el-icon-question" style="font-size: 18px" />
            </el-tooltip>
            <div>
              <span>响应时间 / 请求数 / 错误数 / 异常数 </span>
              <i class="el-icon-s-fold"></i>
            </div>
          </div>
          <!-- 内容 -->
          <el-select v-model="value" placeholder="请选择" class="selectbox">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <h3>Provider-demo</h3>

          <ul>
            <li v-for="item in ulList" :key="item.name">
              <div>
                <div style="margin-bottom: 15px">
                  <span class="dot"></span>
                  <span style="font-size: 18px">{{ item.name }}</span>
                </div>
                <div>
                  <el-tag style="margin-right: 5px; font-size: 16px">
                    {{ item.tag[0] }}
                  </el-tag>
                  <el-tag style="font-size: 16px">{{ item.tag[1] }}</el-tag>
                </div>
              </div>

              <div>
                {{ item.text[0] }}ms / {{ item.text[1] }} / {{ item.text[2] }} /
                {{ item.text[3] }}
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="17">
        <el-tabs
          type="border-card"
          v-model="activeTab"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-if=""
            v-for="item in tabList"
            :key="item.value"
            :label="item.label"
            :name="item.value"
          >
            <keep-alive>
              <component :is="item.value" v-if="activeTab == item.value" />
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//概览
import Overview from "./components/Overview.vue";
// JVM监控
import JvmMonitor from "./components/JvmMonitor.vue";
// 主机监控
import HostMonitor from "./components/HostMonitor.vue";
// Pod监控
import PodMonitor from "./components/PodMonitor.vue";
// SQL调用分析
import SqlAnalysis from "./components/SqlAnalysis.vue";
// NoSQL调用分析
import NosqlAnalysis from "./components/NosqlAnalysis.vue";
// 异常分析
import AnoAnalysis from "./components/AnoAnalysis.vue";
// 错误分析
import ErrAnalysis from "./components/ErrAnalysis.vue";
// 上游应用
import UpApplication from "./components/UpApplication.vue";
// 日志
import Log from "./components/Log.vue";

export default {
  name: "InstanceMonitor",
  components: {
    Overview,
    JvmMonitor,
    HostMonitor,
    PodMonitor,
    SqlAnalysis,
    NosqlAnalysis,
    AnoAnalysis,
    ErrAnalysis,
    UpApplication,
    Log,
  },
  data() {
    return {
      text: "概览",
      activeTab: "Overview", // 绑定到当前激活的标签页
      tabList: [
        { label: "概览", value: "Overview" },
        { label: "JVM监控", value: "JvmMonitor" },
        { label: "主机监控", value: "HostMonitor" },
        { label: "Pod监控", value: "PodMonitor" },
        { label: "SQL调用分析", value: "SqlAnalysis" },
        { label: "NoSQL调用分析", value: "NosqlAnalysis" },
        { label: "异常分析", value: "AnoAnalysis" },
        { label: "错误分析", value: "ErrAnalysis" },
        { label: "上游应用", value: "UpApplication" },
        { label: "下游应用", value: "DownApplication" },
        { label: "接口快照", value: "Interface" },
        { label: "日志", value: "Log" },
      ],
      options: [],
      value: "",
      ulList: [
        {
          name: "provider-demo-group-1",
          tag: ["az1-xs-b", "ecs.b"],
          text: ["5", "1", "1", "0"],
        },
        {
          name: "provider-demo-group-2",
          tag: ["az1-xs-b", "ecs.b"],
          text: ["5", "1", "1", "0"],
        },
        {
          name: "provider-demo-group-3",
          tag: ["az1-xs-b", "ecs.b"],
          text: ["5", "1", "1", "0"],
        },
        {
          name: "provider-demo-group-4",
          tag: ["az1-xs-b", "ecs.b"],
          text: ["5", "1", "1", "0"],
        },
        {
          name: "provider-demo-group-5",
          tag: ["az1-xs-b", "ecs.b"],
          text: ["5", "1", "1", "0"],
        },
      ],
    };
  },

  mounted() {},

  methods: {
    // tab组件的切换函数,根据传入的组件名称切换
    handleClick(tab, event) {
      console.log(tab.name);
      this.text = this.tabList.filter(
        (item) => item.value === tab.name
      )[0].label;
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-content {
  padding: 20px;
  background: #fff;
  min-height: 200px;
  overflow: hidden;
}
.box-card {
  ::v-deep .el-card__header {
    padding: 18px 10px;
  }
  .box-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  cursor: pointer;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0 10px 0;
    margin: 0;
    // border: 0.5px solid #ebeef5;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid #e8e8e8;
      &:before {
        content: none;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
/* 选择器 */
.selectbox {
  width: 100%;
}
/* 小圆点 */
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #67c23a;
  margin-right: 5px;
}
</style>
