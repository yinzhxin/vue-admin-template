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
      <el-col :span="12">
        <div class="grid-content">
          <div class="title-style">
            <p>EverDB</p>
            <el-button
              class="btn-style"
              type="text"
              icon="el-icon-message-solid"
            >
            </el-button>
          </div>

          <ul>
            <li v-for="item in ulList.data" :index="item.title">
              <div>{{ item.title }}</div>
              <div>{{ item.num }}</div>
            </li>
          </ul>

          <el-table
            class="elTable"
            :data="tableData2"
            border
            style="width: 100%; padding: 15px 15px 100px"
            :header-cell-style="{
              backgroundColor: '#E8E8E9',
              borderColor: '#E8E8E9',
            }"
            :cell-style="{ border: '1px solid #E8E8E9' }"
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
      <el-col :span="12">
        <div class="grid-content">
          <div class="title-style">
            <p>EverDB</p>
            <el-button
              class="btn-style"
              type="text"
              icon="el-icon-message-solid"
            >
            </el-button>
          </div>

          <ul>
            <li v-for="item in ulList.data" :index="item.title">
              <div>{{ item.title }}</div>
              <div>{{ item.num }}</div>
            </li>
          </ul>

          <el-table
            class="elTable"
            :data="tableData2"
            border
            style="width: 100%; padding: 15px 15px 100px"
            :header-cell-style="{
              backgroundColor: '#E8E8E9',
              borderColor: '#E8E8E9',
            }"
            :cell-style="{ border: '1px solid #E8E8E9' }"
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
        </div></el-col
      >
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="title-style">
            <p>EverDB</p>
            <el-button
              class="btn-style"
              type="text"
              icon="el-icon-message-solid"
            >
            </el-button>
          </div>

          <ul>
            <li v-for="item in ulList.data" :index="item.title">
              <div>{{ item.title }}</div>
              <div>{{ item.num }}</div>
            </li>
          </ul>

          <el-table
            class="elTable"
            :data="tableData2"
            border
            style="width: 100%; padding: 15px 15px 100px"
            :header-cell-style="{
              backgroundColor: '#E8E8E9',
            }"
            :cell-style="{ border: '1px solid #E8E8E9' }"
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
        </div></el-col
      >
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="title-style">
            <p>EverDB</p>
            <el-button
              class="btn-style"
              type="text"
              icon="el-icon-message-solid"
            >
            </el-button>
          </div>

          <ul>
            <li v-for="item in ulList.data" :index="item.title">
              <div>{{ item.title }}</div>
              <div>{{ item.num }}</div>
            </li>
          </ul>

          <el-table
            class="elTable"
            :data="tableData2"
            border
            style="width: 100%; padding: 15px 15px 100px"
            :header-cell-style="{
              backgroundColor: '#E8E8E9',
              borderColor: '#E8E8E9',
            }"
            :cell-style="{ border: '1px solid #E8E8E9' }"
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
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
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

      ulList: {
        data: [
          { title: "集群leader", num: "正常" },
          { title: "CPU总数", num: "12" },
          { title: "节点健康状态", num: "3/3" },
          { title: "内存总量", num: "12" },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$bg: #fff;
$title-bg: #cde3ed;
$bell-color: #67c23a;
$li-underline: #e8e8e8;

.grid-content {
  background: $bg;
  min-height: 100px;
}

.title-style {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 5px;
  background: $title-bg;
  .btn-style {
    float: right;
    padding: 3px 0;
    color: $bell-color;
    font-size: 25px;
  }
}

/* 横线列表样式 */
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 15px 15px 0;

  li {
    display: flex;
    justify-content: space-between;
    width: 48%;
    border-bottom: 2px solid $li-underline;
    // 上 右 下 左
    padding: 0 0 10px 10px;
    margin: 0 15px 20px 0;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}

// .el-table--border,
// .el-table--group {
//   border: 0px solid #ebeef5;
// }
</style>
