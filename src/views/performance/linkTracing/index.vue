<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <!-- <div class="grid-content"> -->
        <el-form :inline="true" :model="formInline" ref="form">
          <el-form-item label="">
            <el-input v-model="formInline.region" placeholder="所属应用">
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.region" placeholder="所属应用">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">
              搜索
            </el-button>
            <el-button class="clearBtn" @click="onSubmit">清空</el-button>
          </el-form-item>
        </el-form>
        <!-- </div> -->
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <Table :table-data="tableData" :columns="columns" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import G6 from "@antv/g6";
import Table from "@/views/components/Table.vue";

export default {
  name: "ServiceTopo",
  components: { Table },
  data() {
    return {
      dialogVisible: false,
      formInline: {
        user: "",
        region: "",
      },
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
        {
          time: "2023-04-04 23:07:45",
          source: "K8S",
          type: "资源不足",
          level: "Normal",
          summary: "availible DB resource left less then: 20%",
          context: "xxxxxxxxx xxxxxxxxxxxxxxxx xx xxxxxxxxxxxxxx",
        },
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

  mounted() {},

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    open() {
      // this.initGraph2()
      this.dialogVisible = true;
    },

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
  padding: 10px;
  background: $bg;
  min-height: 200px;
  overflow: hidden;
}
</style>
