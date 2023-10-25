<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="HTTP 请求"> </el-form-item>

        <el-form-item label="目标类型">
          <el-select v-model="formInline.type" placeholder="">
            <el-option label="应用" value="app"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应用">
          <el-select v-model="formInline.app" placeholder="">
            <el-option label="归因分析服务" value="one"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实例">
          <el-select v-model="formInline.instance" placeholder="">
            <el-option label="prod-instance" value="prod-instance"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路径">
          <el-select
            v-model="formInline.url"
            placeholder=""
            style="width: 300px"
          >
            <el-option label="/cal/test" value="/cal/test"></el-option>
          </el-select>
        </el-form-item>

        <br />

        <el-form-item label="">
          <el-select v-model="formInline.method" placeholder="">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
            <el-option label="DELETE" value="delete"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-input
            v-model="formInline.name"
            placeholder="name"
            style="width: 1010px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Params" name="first">
        <div style="color: #c0c4cc">Query参数</div>

        <el-table :data="tableData2" border stripe style="width: 100%">
          <el-table-column prop="name" label="参数名">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.edit"
                v-model="scope.row.name"
                placeholder="参数名"
              ></el-input>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数值">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.edit"
                v-model="scope.row.value"
                placeholder="参数值"
              ></el-input>
              <span v-else>{{ scope.row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.edit"
                  size="mini"
                  @click="confirmAdd(scope.row)"
                >
                  <!-- <i class="el-icon-check" aria-hidden="true"></i> -->
                  确认
                </el-button>
                <el-button
                  v-if="scope.row.edit"
                  size="mini"
                  @click="deleteData(scope.row, scope.$index)"
                >
                  取消
                </el-button>
              </div>

              <div v-if="!scope.row.edit">
                <el-button
                  type="text"
                  size="medium"
                  @click="editData(scope.row)"
                >
                  <i class="el-icon-edit" aria-hidden="true"></i>编辑
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  @click="deleteData(scope.row, scope.$index)"
                >
                  <i class="el-icon-delete" aria-hidden="true"></i>删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 20px">
          <el-button size="mini" @click="addData">
            <i class="el-icon-plus" />
            添加参数
          </el-button>
          <el-button type="primary" size="mini" @click="submitData">
            提交
          </el-button>
        </div>

        <div style="color: #c0c4cc; margin-top: 50px">拔测结果</div>

        <Table :table-data="tableData" :columns="columns" size="mini"/>
      </el-tab-pane>

      <el-tab-pane label="Body" name="second">Body</el-tab-pane>
      <el-tab-pane label="Header" name="third">Header</el-tab-pane>
      <el-tab-pane label="Cookies" name="fourth">Cookies</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import Table from "@/views/components/Table";

export default {
  name: "",
  components: { Table },
  data() {
    return {
      formInline: {
        type: "app",
        app: "one",
        instance: "prod-instance",
        url: "/cal/test",
        method: "get",
        name: "",
      },

      activeName: "first",

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

      columns: [
        { label: "状态", index: "status" },
        { label: "返回值", index: "result" },
        { label: "延迟", index: "delay" },
      ],

      tableData: [],

      tableData2: [],
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // handleAddLabel(filed) {
    //   const obj = {
    //     id: nanoid(),
    //     type: "",
    //     params: "",
    //     condition: "",
    //     value: "",
    //   };
    //   this.limitForm[filed].push(obj);
    // },
    // // 删除
    // handleDeleteLabel(filed, item, index) {
    //   this.limitForm[filed].splice(index, 1);
    // },

    //添加
    addData() {
      this.tableData2.push({
        edit: true,
      });
    },
    //确认添加
    confirmAdd(row) {
      row.edit = false;
    },
    //修改
    editData(row) {
      row.edit = true;
    },
    //删除
    deleteData(row, index) {
      this.tableData2.splice(index, 1);
    },
    submitData() {
      alert(JSON.stringify(this.tableData2));
    },
  },
};
</script>

<style lang="scss" scoped></style>
