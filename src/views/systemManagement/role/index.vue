<template>
  <el-card>
    <el-button class="margin-bottom" type="primary">创建角色</el-button>
    <el-table
      class="margin-bottom20"
      border
      :data="tableData"
      header-row-class-name="headerStyle"
    >
      <el-table-column v-for="col in columns" :key="col.id" :label="col.label">
        <template slot-scope="scope">
          <div v-if="col.id == 'actions'">
            <el-button type="text" @click="handleView(scope.row)"
              >查看权限</el-button
            >
            <el-button type="text" @click="handleManager(scope.row)"
              >管理权限</el-button
            >
            <el-button type="text">删除</el-button>
          </div>
          <div v-else>{{ scope.row[col.id] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="margin-bottom20"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="查看权限"
      :visible="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="fontSize16 margin-bottom">
        角色{{ dialogRole.role }} ( 共{{ dialogRole.num }}个权限 )
      </div>
      <el-tree
        :data="data"
        :props="defaultProps"
        style="height: 300px; overflow-y: auto"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="管理权限"
      :visible="managerVisible"
      width="50%"
      :before-close="handleCloseDialog"
    >
      <div class="fontSize16 margin-bottom">角色: {{ dialogRole.role }}</div>
      <tree-transfer
        :title="['可选权限', '已选权限']"
        :from_data="fromData"
        :to_data="toData"
        :defaultProps="{ label: 'label' }"
        :button_text="['添加', '删除']"
        @addBtn="add"
        @removeBtn="remove"
        mode="transfer"
        height="400px"
        openAll
      >
      </tree-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="managerVisible = false"
          >确 定</el-button
        >
        <el-button @click="managerVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import treeTransfer from "el-tree-transfer";
export default {
  name: "",
  components: { treeTransfer },
  props: {},
  data() {
    return {
      tableData: [
        {
          role: "Super Admin",
          num: "70",
        },
        {
          role: "应用管理员",
          num: "70",
        },
      ],
      columns: [
        {
          id: "role",
          label: "角色",
        },
        {
          id: "num",
          label: "权限个数",
        },
        {
          id: "actions",
          label: "操作",
        },
      ],
      currentPage: 1,
      pageSize: 20,
      total: 100,
      dialogVisible: false,
      managerVisible: false,
      dialogRole: {},
      data: [
        {
          label: "概览",
          children: [
            {
              label: "二级 1-1",
              children: [],
            },
          ],
        },
        {
          label: "应用管理",
          children: [
            {
              label: "应用列表",
              children: [
                {
                  label: "创建应用",
                },
                {
                  label: "基本信息",
                  children: [
                    {
                      label: "二级 1-1",
                      children: [],
                    },
                  ],
                },
                {
                  label: "日志管理",
                  children: [
                    {
                      label: "二级 1-1",
                      children: [],
                    },
                  ],
                },
                {
                  label: "应用监控",
                  children: [
                    {
                      label: "二级 1-1",
                      children: [],
                    },
                  ],
                },
                {
                  label: "告警管理",
                  children: [
                    {
                      label: "二级 1-1",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "流量管理",
          children: [
            {
              label: "二级 1-1",
              children: [],
            },
          ],
        },
        {
          label: "资源管理",
          children: [
            {
              label: "二级 1-1",
              children: [],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      fromData: [
        {
          id: "1",
          pid: 0, //自定义pid的参数名，默认为"pid" 必填：false
          label: "应用管理",
          children: [
            {
              id: "1-1",
              pid: "1",
              label: "应用列表",
              children: [
                {
                  id: "1-1-1",
                  pid: "1-1",
                  label: "基本信息",
                  children: [
                    {
                      id: "1-1-1-1",
                      pid: "1-1-1",
                      label: "体检详情",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "2",
          pid: 0, //自定义pid的参数名，默认为"pid" 必填：false
          label: "流量管理",
          children: [
            {
              id: "2-1",
              pid: "2",
              label: "微服务治理",
              children: [
                {
                  id: "2-1-1",
                  pid: "2-1",
                  label: "HSF",
                  children: [
                    {
                      id: "2-1-1-1",
                      pid: "2-1-1",
                      label: "服务分组",
                      children: [
                        {
                          id: "2-1-1-1-1",
                          pid: "2-1-1-1",
                          label: "menu1",
                          children: [],
                        },
                        {
                          id: "2-1-1-1-2",
                          pid: "2-1-1-1",
                          label: "menu2",
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      toData: [],
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleView(row) {
      this.dialogRole = row;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCloseDialog() {
      this.managerVisible = false;
    },
    handleManager(row) {
      this.dialogRole = row;
      this.managerVisible = true;
    },
    add(fromData, toData, obj) {
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    remove(fromData, toData, obj) {
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
::v-deep .transfer {
  .component-transfer {
    .transfer-title {
      margin-top: 0;
    }
  }
}
</style>
