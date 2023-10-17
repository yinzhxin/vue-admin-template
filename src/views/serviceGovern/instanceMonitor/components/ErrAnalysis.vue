<template>
  <div>
    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title1"
        :chartData="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title2"
        :chartData="chartData2.data"
        :xAxisData="chartData2.xAxisData"
        :color="color"
        :legend="chartData2.legend"
        :isAreaStyle="false"
      />
    </div>

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
import Table from "@/views/components/Table.vue";

export default {
  name: "",
  components: { LineChart, Table },
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

      // 图表数据
      title1: "错误数/每分钟",
      chartData1: {
        data: [
          {
            data: [0, 1, 0, 0],
            name: "HTTP入口",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title2: "HTTP-状态码统计",
      chartData2: {
        data: [
          {
            data: [0, 0, 0, 0],
            name: "200",
          },
          {
            data: [0, 0, 0, 0],
            name: "2xx",
          },
          {
            data: [0, 0, 0, 0],
            name: "3xx",
          },
          {
            data: [0, 0, 0, 0],
            name: "4xx",
          },
          {
            data: [0, 1, 0, 0],
            name: "5xx",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        legend: {
          top: 20,
        },
      },

      table: {
        tableData: [
          {
            time: "2023-9-1 16:06:50",
            interface: "/usere/login",
            app: "Provider-demo",
            spendTime: "1.4",
            status: "异常",
            traceId: "csacsacd001",
          },
          {
            time: "2023-9-1 16:06:57",
            interface: "/us/login",
            app: "Provider-demo",
            spendTime: "0.7",
            status: "异常",
            traceId: "csacsacd002",
          },
          {
            time: "2023-9-1 16:07:01",
            interface: "/eswf/esdw",
            app: "Provider-demo",
            spendTime: "0.2",
            status: "异常",
            traceId: "csacsacd003",
          },
        ],
        columns: [
          {
            label: "产生时间",
            index: "time",
          },
          {
            label: "接口名称",
            index: "interface",
          },
          {
            label: "所属应用",
            index: "app",
          },
          {
            label: "耗时",
            index: "spendTime",
            render: (h, data) => {
              return <div>{data.row.spendTime} ms</div>;
            },
          },
          {
            label: "状态",
            index: "status",
            render: (h, data) => {
              return (
                <div>
                  {data.row.status == "正常" ? (
                    <span style="color:#67C23A">
                      <i class="el-icon-success" />
                    </span>
                  ) : (
                    <span style="color:#F56C6C">
                      <i class="el-icon-error" />
                    </span>
                  )}
                </div>
              );
            },
            width: "80px",
          },
          {
            label: "TraceId",
            index: "traceId",
            render(h, data) {
              return (
                <div style="cursor:pointer;color:#409EFF">
                  {data.row.traceId}
                </div>
              );
            },
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
