<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="24" style="display: flex; align-items: center">
        <h2 style="margin-right: 20px">API 快速访问</h2>

        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
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
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <keep-alive>
              <component :is="item.name" v-if="activeTab == item.name" />
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

export default {
  name: "ApiQuickAccess",
  components: {
    Overview,
    JvmMonitor,
    HostMonitor,
    PodMonitor,
    SqlAnalysis,
  },
  data() {
    return {
      activeTab: "Overview", // 绑定到当前激活的标签页
      tabList: [
        { title: "概览", name: "Overview" },
        { title: "JVM监控", name: "JvmMonitor" },
        { title: "主机监控", name: "HostMonitor" },
        { title: "Pod监控", name: "PodMonitor" },
        { title: "SQL调用分析", name: "SqlAnalysis" },
      ],
      options: [],
      value: "",
    };
  },

  mounted() {},

  methods: {
    // tab组件的切换函数,根据传入的组件名称切换
    handleClick(tab, event) {
      console.log(tab.name);
    },

    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.tabList.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.activeTab = newTabName;
      }
      if (action === "remove") {
        let tabs = this.tabList;
        let activeName = this.activeTab;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.activeTab = activeName;
        this.tabList = tabs.filter((tab) => tab.name !== targetName);
      }
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
