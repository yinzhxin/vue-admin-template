<template>
  <div class="dashboard-container">
    <h1 style="margin-top: 0">事件总览</h1>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <div class="rating-container">
            <div class="rating" v-for="item in data" :key="item.title">
              <span>{{ item.title }}</span>
              <span style="font-size: 25px; margin: 20px 0; color: #409eff">
                {{ item.num }}
              </span>
              <span>次数 (7日) : {{ item.times1 }}</span>
              <span>次数 (30日) : {{ item.times2 }}</span>
              <el-button type="text">订阅</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <RadiusPieChart
            :chart-data="chartData1"
            :width="'100%'"
            :height="'300px'"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <BarChart
            :chart-data="chartData2"
            :width="'100%'"
            :height="'300px'"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <h3 style="margin-left: 20px">事件查询</h3>
          <el-form
            ref="form"
            :model="sizeForm"
            label-width="120px"
            size="medium"
            inline
          >
            <el-form-item label="事件来源">
              <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="事件类型">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>

            <el-form-item label="事件等级">
              <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="事件关键字">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>

            <el-form-item label="集群ID">
              <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="应用PID">
              <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="接口/服务名">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>

            <el-form-item label="主机IP">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>

            <el-form-item label="POD名">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>

            <el-form-item label="        ">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{ backgroundColor: '#E8E8E9' }"
          >
            <el-table-column
              v-for="item in columns"
              :key="item.index"
              :label="item.label"
              :width="item.width"
            >
              <template slot-scope="scope">
                <div v-if="item.index == 'context'">
                  <el-input
                    type="textarea"
                    v-model="scope.row.context"
                    :rows="14"
                    resize="vertical"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    size="small"
                  />
                </div>
                <div v-else>
                  {{ scope.row[item.index] }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text"> 查看 </el-button>
                <el-button size="small" type="text"> 订阅 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import RadiusPieChart from "./components/RadiusPieChart";
import BarChart from "./components/BarChart";

export default {
  name: "Dashboard",
  components: { RadiusPieChart, BarChart },
  data() {
    return {
      chartData1: [
        {
          label: "应用扩缩容",
          value: 10,
          itemStyle: { color: "#5087ED" },
        },
        {
          label: "扩缩容达到上下线",
          value: 5,
          itemStyle: { color: "#66BBC3" },
        },
      ],

      chartData2: [
        {
          name: "应用扩缩容",
          type: "bar",
          data: [1, 2, 2, 3, 2],
        },
        {
          name: "扩缩容达到上下线",
          type: "bar",
          data: [1, 1, 1, 1, 1],
        },
      ],

      data: [
        { title: "应用变更失败", num: 0, times1: 0, times2: 0 },
        { title: "应用扩缩容", num: 10, times1: 10, times2: 10 },
        { title: "扩缩容达到上下限", num: 0, times1: 0, times2: 0 },
        { title: "Pod启动失败", num: 0, times1: 0, times2: 0 },
        { title: "镜像拉取失败", num: 0, times1: 0, times2: 0 },
        { title: "Pod被驱逐", num: 0, times1: 0, times2: 0 },
        { title: "K8S集群资源不足", num: 0, times1: 0, times2: 0 },
        { title: "K8S节点OOM", num: 0, times1: 0, times2: 0 },
        { title: "K8S节点重启", num: 0, times1: 0, times2: 0 },
        { title: "K8S节点FD不足", num: 0, times1: 0, times2: 0 },
      ],

      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      tableData: [
        {
          time: "2023-04-04 23:07:45",
          source: "K8S",
          type: "资源不足",
          level: "Normal",
          summary: "availible DB resource left less then: 20%",
          context: "xxxxxxxxx xxxxxxxxxxxxxxxx xx xxxxxxxxxxxxxx",
        },
      ],

      columns: [
        { label: "时间", index: "time" },
        { label: "来源", index: "source" },
        { label: "类型", index: "type" },
        { label: "等级", index: "level" },
        { label: "摘要", index: "summary", width: "280px" },
        { label: "上下文", index: "context", width: "300px" },
      ],
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
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
  min-height: 200px;
  overflow: hidden;
}
.rating-container {
  display: flex;
  padding: 30px 0 10px;
}
.rating {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-weight: 500;
    color: #4b4b4b;
  }
}
</style>
