<template>
  <div class="dashboard-container">
    <el-form
      :inline="true"
      :model="formInline"
      style="display: flex; justify-content: space-between"
    >
      <el-form-item label="选择泳道组">
        <el-select
          v-model="formInline.value2"
          placeholder="请选择"
          style="width: 200px"
        >
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <i class="el-icon-plus createLane" @click="handleCreate">创建</i>
      </el-form-item>

      <el-form-item label="监控时间">
        <el-time-select
          v-model="formInline.value1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never" class="grid-content" style="height: 521px">
          <div slot="header">
            <strong>泳道组涉及应用</strong>
            <el-button type="text" style="float: right; padding: 3px 0">
              编辑
            </el-button>
          </div>

          <div style="margin-bottom: 10px">
            上游应用/网关
            <el-tag type="info" class="tag-style"> sc-gateway </el-tag>
          </div>

          <el-input
            placeholder="请输入"
            suffix-icon="el-icon-search"
            style="margin-bottom: 20px"
            v-model="searchValue"
          >
          </el-input>

          <div style="margin-bottom: 10px">
            <el-tag
              type="info"
              class="tag-style"
              v-for="item in tagList"
              :key="item.value"
            >
              {{ item.label }}
            </el-tag>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'250px'"
            :chartData="chartData2"
            :title="`入口应用监控(总)`"
            :xAxisData="xAxisData"
            :isAreaStyle="false"
            :color="['#409EFF']"
          />
        </div>

        <div class="grid-content" style="margin-top: 20px">
          <LineChart
            :width="'100%'"
            :height="'250px'"
            :chartData="chartData2"
            :title="`入口应用监控(未打标部分)`"
            :xAxisData="xAxisData"
            :isAreaStyle="false"
            :color="['#F56C6C']"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="never" class="grid-content">
          <div slot="header">
            <strong>流控分配</strong>
          </div>

          <div class="flow-style">
            <div>
              <el-button type="primary" size="small" @click="handleCreate"
                >创建泳道</el-button
              >

              <el-select
                v-model="name"
                placeholder="流控泳道名称"
                style="width: 200px; margin: 0 10px"
                size="small"
              >
                <el-option
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <el-input
                placeholder="请输入流控泳道名称"
                suffix-icon="el-icon-search"
                style="width: 240px"
                size="small"
                v-model="nameValue"
              >
              </el-input>
            </div>

            <div>
              <el-button type="text">优先级设置</el-button>
              <i class="el-icon-refresh"></i>
            </div>
          </div>

          <div style="margin: 20px 0">
            <Table :table-data="tableData" :columns="columns" size="small" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-drawer
      :visible.sync="drawer"
      :before-close="handleClose"
      direction="rtl"
      size="50%"
    >
      <template v-slot:title>
        <h2>
          <i class="el-icon-back" style="font-weight: 700"></i>创建流控泳道
        </h2>
      </template>

      <div style="margin: 0 20px">
        <el-form ref="form" :model="form" label-width="0px">
          <strong> 流控泳道名称 </strong>
          <el-form-item label="">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <strong> 接收打标流量应用 </strong>
          <el-form-item label="">
            <el-select v-model="form.app1" placeholder="" style="width: 100%">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-select v-model="form.app2" placeholder="" style="width: 100%">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <!-- <el-button type="text"> + 添加泳道应用 (不超过泳道范围) </el-button> -->
            <i class="el-icon-plus createLane">添加泳道应用 (不超过泳道范围)</i>
          </el-form-item>

          <strong> 流控规则 </strong>
          <el-form-item label="">
            <el-switch v-model="form.rule"></el-switch>
          </el-form-item>

          <strong> Path </strong>
          <el-form-item label="">
            <el-input
              v-model="form.path"
              placeholder="HTTP 相对路径，严格匹配"
            />
          </el-form-item>

          <strong> 条件模式 </strong>
          <el-form-item label="">
            <el-radio-group v-model="form.mode">
              <el-radio label="同时满足下列条件" name="1"></el-radio>
              <el-radio label="满足下列任一条件" name="2"></el-radio>
            </el-radio-group>
          </el-form-item>

          <strong> 条件列表 </strong>
          <!-- <Table :table-data="tableData" :columns="columns" size="small" /> -->
          <table border="0" style="width: 100%">
            <thead>
              <tr class="headerStyle">
                <th>
                  <div class="cell">参数类型</div>
                </th>
                <th>
                  <div class="cell">参数</div>
                </th>
                <th>
                  <div class="cell">条件</div>
                </th>
                <th>
                  <div class="cell">值</div>
                </th>
                <th>
                  <div class="cell">操作</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="tr-style"
                v-for="(domain, index) in limitForm.nodeUpdateItems"
                :key="domain.id"
              >
                <td>
                  <el-form-item class="td-style">
                    <el-input v-model="domain.type"> </el-input>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item class="td-style">
                    <el-input v-model="domain.params"> </el-input>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item class="td-style">
                    <el-select v-model="domain.condition" style="width: 100%">
                      <el-option
                        v-for="item in []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item class="td-style">
                    <el-input v-model="domain.value"> </el-input>
                  </el-form-item>
                </td>

                <td style="margin-bottom: 10px">
                  <el-button
                    icon="el-icon-delete"
                    type="text"
                    @click="handleDeleteLabel('nodeUpdateItems', domain, index)"
                  />
                </td>
              </tr>

              <!-- <tr>
                <td colspan="5">
                  <div
                    class="cursor-pointer text-center hover-div"
                    @click="handleAddLabel('nodeUpdateItems')"
                  >
                    <i class="el-icon-circle-plus-outline" />
                    添加
                  </div>
                </td>
              </tr> -->
            </tbody>
          </table>

          <el-form-item label="">
            <!-- <el-button type="text"> + 添加规则条件 </el-button> -->
            <i
              class="el-icon-edit createLane"
              @click="handleAddLabel('nodeUpdateItems')"
              >添加规则条件</i
            >
          </el-form-item>

          <div class="drawer-footer">
            <el-button type="primary">确定</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import LineChart from "@/views/echarts/LineChart.vue";
import Table from "@/views/components/Table.vue";
import { nanoid } from "nanoid";

export default {
  name: "EscapeObservationMain",
  components: { LineChart, Table },
  data() {
    return {
      formInline: {
        value1: "",
        value2: "",
      },
      groupOptions: [],
      nameOptions: [],
      name: "",
      searchValue: "",
      nameValue: "",
      tagList: [
        { value: "sc-a", label: "sc-a" },
        { value: "sc-b", label: "sc-a" },
        { value: "sc-c", label: "sc-a" },
        { value: "sc-b-red", label: "sc-a" },
        { value: "sc-b-blue", label: "sc-b-blue" },
        { value: "sc-a-blue", label: "sc-a-blue" },
      ],
      // 折线图横坐标
      xAxisData: ["14:51", "14:52", "14:53", "14:54", "14:55"],

      // 折线图数据

      chartData1: [
        {
          name: "QPS应用监控(总)",
          data: [100, 140, 225, 100, 140],
        },
      ],

      chartData2: [
        {
          name: "QPS应用监控(未打标部分)",
          data: [90, 130, 90, 150, 130],
        },
      ],

      columns: [
        {
          label: "流控泳道名称",
          index: "name",
          render(h, data) {
            return (
              <div style="cursor:pointer;color:#409EFF">{data.row.name}</div>
            );
          },
        },
        {
          label: "流控规则及状态",
          index: "status",
          render(h, data) {
            return (
              <div>
                <div>
                  {data.row.status == "已开启" ? (
                    <div>
                      <span style="color:#67C23A">
                        <i class="el-icon-success" />
                      </span>
                      <span>{data.row.status}</span>
                    </div>
                  ) : (
                    <span style="color:#F56C6C">
                      <i class="el-icon-error" />
                    </span>
                  )}
                </div>
                <div>条件:AND</div>
              </div>
            );
          },
        },
        {
          label: "摘要",
          index: "summary",
        },
        {
          label: "打标规则流量对应应用",
          index: "app",
          render(h, data) {
            return (
              <div>
                {data.row.app.map((item) => (
                  <el-tag type="info" style="margin-right:5px">
                    {item}
                  </el-tag>
                ))}
              </div>
            );
          },
        },
        {
          label: "优先级",
          index: "priority",
          width: "100px",
        },
        {
          label: "操作",
          index: "operation",
          width: "130px",
          render: (h, data) => {
            return (
              <div>
                <el-button size="small" type="text">
                  {" "}
                  编辑{" "}
                </el-button>

                <el-button size="small" type="text">
                  {" "}
                  删除{" "}
                </el-button>

                <el-button size="small" type="text">
                  {" "}
                  关闭{" "}
                </el-button>
              </div>
            );
          },
        },
      ],

      tableData: [
        {
          name: "red",
          status: "已开启",
          summary: "availible DB resource left less then: 20%",
          app: ["sc-a", "sc-b", "sc-c", "sc-d"],
          priority: "1",
        },
      ],

      drawer: false,

      form: {
        name: "",
        app: "",
        app2: "",
        rule: "",
        path: "",
        mode: "同时满足下列条件",
      },

      limitForm: {
        nodeUpdateItems: [
          {
            id: nanoid(),
            type: "",
            params: "",
            condition: "",
            value: "",
          },
        ],
      },
    };
  },

  methods: {
    handleCreate() {
      this.drawer = true;
    },

    handleClose() {
      this.drawer = false;
      this.limitForm = {
        nodeUpdateItems: [
          {
            id: nanoid(),
            type: "",
            params: "",
            condition: "",
            value: "",
          },
        ],
      };
    },
    handleAddLabel(filed) {
      const obj = {
        id: nanoid(),
        type: "",
        params: "",
        condition: "",
        value: "",
      };
      this.limitForm[filed].push(obj);
    },
    // 删除
    handleDeleteLabel(filed, item, index) {
      this.limitForm[filed].splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #ffffff;
$title-bg: #cde3ed;
$li-underline: #e8e8e8;

.grid-content {
  background: $bg;
  min-height: 250px;
}

.createLane {
  font-size: 17px;
  font-weight: 700;
  margin-right: 10px;
  color: #409eff;
  cursor: pointer;
}

.flow-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-refresh {
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
    cursor: pointer;
  }
}

.tag-style {
  border-radius: 20px;
  margin-right: 10px;
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 23px;
}

.tr-style {
  .td-style {
    margin-bottom: 0;
  }
}
</style>
