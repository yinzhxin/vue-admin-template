<template>
  <div>
    <div style="display: flex; margin-top: 20px">
      <BarChart
        :width="'100%'"
        :height="'300px'"
        :chart-data="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="chartData1.color"
        :title="`异常统计/每天`"
      />
    </div>

    <h3>异常列表</h3>
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
import BarChart from "@/views/echarts/BarChart.vue";
import Table from "@/views/components/Table.vue";

export default {
  name: "",
  components: { LineChart, BarChart, Table },
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

      // 图表图例
      legend: {
        top: 10,
      },

      // 柱状图数据
      chartData1: {
        data: [
          {
            name: "Direct",
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: [
              320, 302, 301, 334, 390, 330, 320, 320, 302, 301, 334, 390, 330,
              320, 330,
            ],
          },
          {
            name: "Mail Ad",
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: [
              120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230,
              210, 120,
            ],
          },
          {
            name: "Affiliate Ad",
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: [
              220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330,
              310, 230,
            ],
          },
          {
            name: "Video Ad",
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: [
              150, 212, 201, 154, 190, 330, 410, 150, 212, 201, 154, 190, 330,
              410, 300,
            ],
          },
        ],
        color: ["#5087ED", "#68BBC4", "#58A55C", "#F2BD42"],
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
            times: "19.2",
            stack:
              "Caused by: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: Table 'jd_item.item' doesn't exist at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method) ~[na:na] at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62) ~[na:na] at java.base/jdk.internal.reflect.",
          },
          {
            times: "19.2",
            stack:
              "Caused by: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: Table 'jd_item.item' doesn't exist at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method) ~[na:na] at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62) ~[na:na] at java.base/jdk.internal.reflect.",
          },
        ],
        columns: [
          {
            label: "错误数",
            index: "times",
            render: (h, data) => {
              return <div>{data.row.times} K</div>;
            },
            width: "100px",
          },
          {
            label: "异常堆栈",
            index: "stack",
            render: (h, data) => {
              return (
                <div>
                  <el-input
                    readonly
                    size="small"
                    type="textarea"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    v-model={data.row.stack}
                  ></el-input>
                </div>
              );
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

                  <el-button size="small" type="text">
                    {" "}
                    详情{" "}
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
