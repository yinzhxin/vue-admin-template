<template>
  <div>
    <div style="display: flex; margin-top: 20px">
      <BarLineChart
        :width="'100%'"
        :height="'300px'"
        :chart-data="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="chartData1.color"
        :title="`调用统计/每天`"
      />
    </div>

    <h3>SQL 语句列表</h3>
    <div style="margin: 20px 20px 0">
      <Table
        :table-data="table.tableData"
        :columns="table.columns"
        size="mini"
      />

      <div style="padding: 20px 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="table.page.total"
          :current-page="table.page.current"
          :page-size="table.page.size"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/views/echarts/LineChart.vue";
import BarLineChart from "@/views/echarts/BarLineChart.vue";
import Table from "@/views/components/Table.vue";

export default {
  name: "",
  components: { LineChart, BarLineChart, Table },
  data() {
    return {
      // 图表工具栏
      toolbox: {
        feature: {
          dataZoom: {
            show: true, // 显示数据区域缩放工具
            title: {
              zoom: "区域缩放",
              back: "区域缩放还原",
            },
          },
        },
      },
      // 主题颜色
      color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42", "#F56C6C"],

      // 图表图例
      legend: {
        top: 10,
      },

      // 柱状图数据
      chartData1: {
        data: [
          {
            name: "调用统计/每天",
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: "调用统计率/每天",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0],
            yAxisIndex: 1, //索引从0开始
          },
        ],
        color: ["#5087ED", "#68BBC4"],
        xAxisData: [
          "08月01日",
          "08月02日",
          "08月03日",
          "08月04日",
          "08月05日",
          "08月06日",
          "08月07日",
          "08月08日",
          "08月09日",
          "08月10日",
          "08月11日",
          "08月12日",
          "08月13日",
          "08月14日",
          "08月15日",
        ],
      },

      table: {
        tableData: [
          {
            app: "Provider-demo-group-1",
            type: "Redis",
            command: "DEL",
            spendTime: "1.4",
            times: "19.2",
          },
          {
            app: "Provider-demo-group-1",
            type: "Redis",
            command: "RPUSH",
            spendTime: "1.4",
            times: "19.2",
          },
          {
            app: "Provider-demo-group-1",
            type: "Redis",
            command: "EVAL",
            spendTime: "1.4",
            times: "19.2",
          },
        ],
        columns: [
          { label: "所属应用", index: "app", width: "200px" },
          {
            label: "数据库类型",
            index: "type",
            render: (h, data) => {
              return (
                <div>
                  <el-tag type="danger">{data.row.type}</el-tag>
                </div>
              );
            },
          },
          { label: "操作命令", index: "command", width: "180px" },
          {
            label: "平均耗时",
            index: "spendTime",
            render: (h, data) => {
              return <div>{data.row.spendTime} ms</div>;
            },
          },
          {
            label: "调用次数",
            index: "times",
            render: (h, data) => {
              return <div>{data.row.times} K</div>;
            },
          },
          {
            label: "操作",
            index: "operation",
            render: (h, data) => {
              return (
                <div>
                  <el-button size="small" type="text">
                    {" "}
                    调用统计{" "}
                  </el-button>

                  <el-button size="small" type="text">
                    {" "}
                    接口调用{" "}
                  </el-button>
                </div>
              );
            },
            width: "180px",
          },
        ],
        page: {
          current: 1, // 当前页数--handleCurrentChange
          size: 20, // 每页条数--handleSizeChange
          total: 1, // 总页数
        },
      },
    };
  },

  methods: {
    // 分页器
    handleSizeChange(val) {
      this.table.page.size = val;
    },

    handleCurrentChange(val) {
      this.table.page.current = val;
    },
  },
};
</script>
