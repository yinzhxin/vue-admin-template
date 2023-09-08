<template>
  <div class="dashboard-container">
    <el-form
      :inline="true"
      :model="formInline"
      style="display: flex; justify-content: space-between"
    >
      <el-form-item label="数据采样间隔选择">
        <el-time-select
          v-model="value"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="数据更新事件点">
        <span>2023年05月09日 09:45</span>
      </el-form-item>
      <el-form-item label="数据更新频率">
        <el-select v-model="value" placeholder="请选择" style="width: 300px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple" style="height: 640px">
          <div
            style="
              height: 50px;
              padding: 0 5px;
              background: #cde3ed;
              display: flex;
              justify-content: space-between;
            "
          >
            <p>EverDB</p>
            <el-button
              style="
                float: right;
                padding: 3px 0;
                color: #67c23a;
                font-size: 25px;
              "
              type="text"
              icon="el-icon-message-solid"
            >
              <!-- 操作按钮 -->
            </el-button>
          </div>
          <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="title" label="" width=""> </el-table-column>
            <el-table-column prop="radio" label="" width="50" fixed="right">
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="18">
        <el-row>
          <el-col :span="24" style="margin-bottom: 20px">
            <div class="bg-purple" style="height: 200px">
              <LineChart
                :width="'100%'"
                :height="'120%'"
                :chartData="chartData1"
                :title="`QPS / TPS`"
              />
            </div>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <div class="bg-purple" style="height: 200px">
              <LineChart
                :width="'100%'"
                :height="'120%'"
                :chartData="chartData2"
                :title="'数据库连接总数 / 数据库活跃连接总数'"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="bg-purple" style="height: 200px">
              <LineChart
                :width="'100%'"
                :height="'120%'"
                :chartData="chartData3"
                :title="'连接拒绝总数 / 慢SQL超时接次数 / 锁超时次数'"
              />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div
            style="
              height: 50px;
              background: #cde3ed;
              display: flex;
              align-items: center;
            "
          >
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 600px; margin-left: 5px"
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

          <el-table
            :data="tableData2"
            border
            style="width: 100%"
            :header-cell-style="{ backgroundColor: '#E8E8E9' }"
            size="mini"
          >
            <el-table-column
              v-for="item in columns"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :formatter="item.formatter"
            >
            </el-table-column>
            <!-- <el-table-column label="操作" width="150">
              <template #default="scope">
                <el-button size="small" type="text"> 查看 </el-button>
                <el-button size="small" type="text"> 订阅 </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LineChart from "./components/LineChart";
export default {
  name: "Dashboard",
  components: { LineChart },
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
          node: "az3-DB-server0",
          source: "正常",
          type: "主",
          connectionCount: 25,
          activeConnections: 10,
          blockedSessions: 2,
          lockTimeouts: 0,
          statementConflicts: 3,
          cacheHitRate: "98.5%",
          qps: 1200,
          tps: 800,
          spaceUsage: "70%",
          logSpaceUsage: "35%",
          diskUsage: "60%",
          memoryUsage: "40%",
          cpuUsage: "20%",
        },
        {
          node: "az3-DB-server1",
          source: "正常",
          type: "主",
          connectionCount: 25,
          activeConnections: 10,
          blockedSessions: 2,
          lockTimeouts: 0,
          statementConflicts: 3,
          cacheHitRate: "98.5%",
          qps: 1200,
          tps: 800,
          spaceUsage: "70%",
          logSpaceUsage: "35%",
          diskUsage: "60%",
          memoryUsage: "40%",
          cpuUsage: "20%",
        },
      ],

      columns: [
        { label: "节点", prop: "node" },
        { label: "状态", prop: "source" },
        { label: "主从", prop: "type" },
        { label: "链接数", prop: "connectionCount" },
        { label: "活跃连接数", prop: "activeConnections" },
        { label: "阻塞会话数", prop: "blockedSessions" },
        { label: "锁超时间", prop: "lockTimeouts" },
        { label: "语句冲突次数", prop: "statementConflicts" },
        { label: "缓存命中率", prop: "cacheHitRate" },
        { label: "QPS", prop: "qps" },
        { label: "TPS", prop: "tps" },
        { label: "空间使用率", prop: "spaceUsage" },
        { label: "日志空间使用率", prop: "logSpaceUsage" },
        { label: "磁盘使用率", prop: "diskUsage" },
        { label: "内存使用率", prop: "memoryUsage" },
        { label: "CPU使用率", prop: "cpuUsage" },
      ],

      chartData1: [
        {
          data: [0.35, 0.35, 0, 0.35, 0, 0.35, 0.35],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          data: [0.25, 0.25, 0.25, 0, 0.25, 0.25, 0],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
      ],

      chartData2: [
        {
          data: [9, 9, 9, 9, 9, 9, 9],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          data: [5, 5, 5, 4, 5, 5, 5],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
      ],

      chartData3: [
        {
          data: [9, 9, 9, 9, 9, 9, 9],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          data: [8, 9, 6, 6, 7, 6, 6],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          data: [5, 5, 5, 4, 5, 5, 5],
          type: "line",
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
// }
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  // border-radius: 4px;
}
.bg-purple {
  background: #ffffff;
}
.grid-content {
  // border-radius: 4px;
  min-height: 100px;
}

.el-card__header {
  padding: 0px !important;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
