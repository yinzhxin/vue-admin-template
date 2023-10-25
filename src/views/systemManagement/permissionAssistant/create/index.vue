<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>创建权限策略</span>
    </div>
    <el-steps class="margin-bottom" :active="active" finish-status="success">
      <el-step title="创建自定义权限策略"></el-step>
      <el-step title="策略预览"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form label-position="top" label-width="80px" :model="form">
      <el-form-item label="策略名称">
        <el-input v-model="form.name" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          v-model="form.remark"
          placeholder="多行输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleAdd">新增权限语句</el-button>
      </el-form-item>
    </el-form>

    <el-table
      class="margin-bottom20"
      border
      :data="tableData"
      header-row-class-name="headerStyle"
    >
      <el-table-column v-for="col in columns" :key="col.id" :label="col.label">
        <template slot-scope="scope">
          <div v-if="col.id == 'actions'">
            <el-button type="text">删除</el-button>
          </div>
          <div v-else>{{ scope.row[col.id] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="margin-bottom20 flex-end"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-button type="primary">下一步</el-button>
    <el-drawer
      title="加授权语句"
      :visible="drawerVisible"
      :before-close="handleClose"
      size="60%"
    >
      <div class="demo-drawer__content" style="padding: 20px">
        <el-form :model="dialogForm" label-width="100" label-position="top">
          <el-form-item label="权限效力">
            <el-radio-group v-model="dialogForm.radio">
              <el-radio :label="true">允许</el-radio>
              <el-radio :label="false">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="操作与资源授权">
            <div class="box">
              <div class="left-box">
                <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[1]"
                  :default-checked-keys="[1.1]"
                >
                </el-tree>
              </div>
              <div class="right-box">
                <div>操作</div>
                <div>创建命名空间</div>
                <div>资源</div>
                <div>地域</div>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div>
                  <el-button type="text"
                    ><i class="el-icon-plus"></i>添加资源</el-button
                  >
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary">下一步</el-button>
        </div>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      form: {
        name: "",
        remark: "",
      },
      tableData: [],
      columns: [
        {
          id: "validityAuthority",
          label: "权限效力",
        },
        {
          id: "operationName",
          label: "操作名称",
        },
        {
          id: "resource",
          label: "资源",
        },
        {
          id: "actions",
          label: "操作",
        },
      ],
      currentPage: 1,
      pageSize: 20,
      total: 100,
      drawerVisible: false,
      dialogForm: {
        radio: true,
      },
      data: [
        {
          id: 1,
          label: "命名空间",
          children: [
            {
              id: 1.1,
              label: "创建命名空间",
            },
            {
              id: 1.2,
              label: "删除命名空间",
            },
            {
              id: 1.3,
              label: "查看命名空间",
            },
          ],
        },
        {
          id: 2,
          label: "集群",
          children: [],
        },
        {
          id: 3,
          label: "应用",
          children: [],
        },
        {
          id: 4,
          label: "微服务",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
    handleAdd() {
      this.drawerVisible = true;
    },
    handleClose() {
      this.drawerVisible = false;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  min-height: 400px;
  border: 1px solid #ccc;
  .left-box {
    flex: 1;
    padding: 10px 20px;
    border-right: 1px solid #ccc;
  }
  .right-box {
    flex: 2;
    padding: 10px 20px;
  }
}
</style>
