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
        <div class="grid-content" style="height: 640px">
          <div
            style="
              height: 50px;
              padding: 0 5px;
              background: #cde3ed;
              display: flex;
              justify-content: space-between;
            "
          >
            <p>Redis</p>
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
            <div class="grid-content" style="height: 310px">
              <LineChart
                :width="'100%'"
                :height="'110%'"
                :chartData="chartData1"
                :title="`QPS`"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content" style="height: 310px">
              <LineChart
                :width="'100%'"
                :height="'110%'"
                :chartData="chartData2"
                :title="'连接使用率'"
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

      chartData1: [2000, 2100, 2000, 2000, 2200, 2000, 2000],

      chartData2: [90, 90, 90, 90, 90, 90, 90],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  background: #ffffff;
  min-height: 100px;
}

.el-card__header {
  padding: 0px !important;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
