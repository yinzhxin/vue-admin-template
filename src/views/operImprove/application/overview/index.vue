<template>
  <div class="dashboard-container">
    <h1 style="margin-top: 0">事件总览</h1>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <div class="rating-container">
            <div class="rating" v-for="item in eventData" :key="item.title">
              <span>{{ item.title }}</span>
              <span>{{ item.num }}</span>
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
            :width="'100%'"
            :height="'300px'"
            :chart-data="chartData1.data"
            :color="chartData1.color"
            :label="chartData1.label"
            :radius="chartData1.radius"
            :center="chartData1.center"
            :title="`不同来源事件占比`"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <BarChart
            :width="'100%'"
            :height="'300px'"
            :chart-data="chartData2"
            :title="`不同来源事件数量走势`"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <h3 style="margin-left: 20px">事件查询</h3>
          <el-form
            ref="eventForm"
            :model="eventForm"
            :rules="eventRules"
            label-width="120px"
            size="medium"
            inline
          >
            <el-form-item label="事件来源" prop="resource">
              <el-select v-model="eventForm.resource" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="事件类型" prop="type">
              <el-input v-model="eventForm.type"></el-input>
            </el-form-item>

            <el-form-item label="事件等级" prop="level">
              <el-select v-model="eventForm.level" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="事件关键字" prop="keyword">
              <el-input v-model="eventForm.keyword"></el-input>
            </el-form-item>

            <el-form-item label="集群ID" prop="clusterId">
              <el-select v-model="eventForm.clusterId" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="应用PID" prop="appId">
              <el-select v-model="eventForm.appId" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="接口/服务名" prop="serverName">
              <el-input v-model="eventForm.serverName"></el-input>
            </el-form-item>

            <el-form-item label="主机IP" prop="hostIp">
              <el-input v-model="eventForm.hostIp"></el-input>
            </el-form-item>

            <el-form-item label="POD名" prop="pod">
              <el-input v-model="eventForm.pod"></el-input>
            </el-form-item>

            <el-form-item label="        ">
              <el-button type="primary" @click="onSubmit('eventForm')">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <Table 
          :table-list="tableData" 
          :columns="columns" 
      
          />
          <!-- <el-table
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
          </el-table> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import RadiusPieChart from "@/views/echarts/RadiusPieChart.vue";
import BarChart from "@/views/echarts/BarChart_application.vue";
import Table from "@/views/components/Table.vue";
import { Divider } from "element-ui";

export default {
  name: "AppOverview",
  components: { RadiusPieChart, BarChart, Table },
  data() {
    return {
      // 饼图数据
      chartData1: {
        data: [
          {
            label: "应用扩缩容",
            value: 10,
          },
          {
            label: "扩缩容达到上下线",
            value: 5,
          },
        ],
        color: ["#5087ED", "#66BBC3"],
        radius: ["45%", "70%"],
        center: ["35%", "55%"],
        label: {
          show: true, // 是否显示标签，默认为false
          position: "center", // 标签的位置，示例中设置为居中显示
          fontSize: "35px", // 标签文本的字体大小，示例中设置为35px
          // 自定义的格式化函数：将 total 变量和固定文本拼接在一起显示
          formatter(params) {
            return [`{a|15}`, "{b|事件总数}"].join("\n"); // 示例中
          },
          // 富文本标签样式配置
          rich: {
            a: {
              fontSize: 30, // 字体大小
              color: "#333333", // 字体颜色
              // fontWeight: "bold", // 字体粗细
            },
            b: {
              fontSize: 16,
              color: "#666666",
              marginTop: 100, // 上边距
              // fontStyle: "italic", // 字体风格
            },
          },
        },
      },

      // 柱状图数据
      chartData2: [
        {
          name: "应用扩缩容",
          data: [1, 2, 2, 3, 2],
        },
        {
          name: "扩缩容达到上下线",
          data: [1, 1, 1, 1, 1],
        },
      ],

      // 事件总览数据
      eventData: [
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

      // 事件查询表单数据
      eventForm: {
        resource: "",
        type: "",
        level: "",
        keyword: "",
        clusterId: "",
        appId: "",
        serverName: "",
        hostIp: "",
        pod: "",
      },

      // 事件查询表单校验规则
      eventRules: {
        resource: [
          { required: true, message: "请选择事件来源", trigger: "change" },
        ],
        type: [{ required: true, message: "请填写事件类型", trigger: "blur" }],
      },

      // label index 必填
      // width fixed 选填 自定义列宽、自定义固定列
      // 默认：显示溢出提示文本、列是左对齐、关闭列的排序功能、最小宽度是50
      columns: [
        { label: "时间", index: "time" },
        { label: "来源", index: "source" },
        { label: "类型", index: "type" },
        { label: "等级", index: "level" },
        { label: "摘要", index: "summary", width: "280px" },
        {
          label: "上下文",
          index: "context",
          width: "300px",
        },
        {
          label: "操作",
          index: "operation",
          width: "100px",
          render: (h, data) => {
            return (
              <div>
                <el-button size="small" type="text">
                  {" "}
                  查看{" "}
                </el-button>

                <el-button size="small" type="text">
                  {" "}
                  订阅{" "}
                </el-button>
              </div>
            );
          },
        },
        // {
        //   label: "操作",
        //   index: "operation",
        //   width: "100px",
        //   render(h) {},
        // },
        // { prop: "w", label: "w" },
        // {
        //   prop: "x",
        //   label: "x",
        //   formatter: (row) => {
        //     return row.x.toFixed(3);
        //   },
        // },
        // {
        //   prop: "d",
        //   label: "d",
        //   formatter: (row) => {
        //     return row.d.toFixed(2);
        //   },
        // },
        // {
        //   label: "操作",
        //   render: (h, data) => {
        //     return (
        //       <el-button
        //         type="primary"
        //         onClick={() => {
        //           this.handleClick(data.row);
        //         }}
        //       >
        //         点我获取行数据
        //       </el-button>
        //     );
        //   },
        // },
      ],

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
    };
  },

  methods: {
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #ffffff;
$font-color: #4b4b4b;

.grid-content {
  background: $bg;
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
    color: $font-color;
    /* 第二个span的样式 */
    &:nth-child(2) {
      font-size: 25px;
      margin: 20px 0;
      color: #409eff;
    }
  }
}
</style>
