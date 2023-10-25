<template>
  <el-card>
    <el-button class="margin-bottom" type="primary" @click="handleCreate"
      >创建权限策略</el-button
    >
    <el-table
      class="margin-bottom20"
      border
      :data="tableData"
      header-row-class-name="headerStyle"
    >
      <el-table-column v-for="col in columns" :key="col.id" :label="col.label">
        <template slot-scope="scope">
          <div v-if="col.id == 'actions'">
            <el-button type="text">克隆</el-button>
            <el-button type="text">查看详情</el-button>
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
  </el-card>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          name: "Super Admin",
          remark: "超级管理员",
          type: "系统策略",
        },
        {
          name: "App Admin",
          remark: "应用管理员",
          type: "系统策略",
        },
        ,
        {
          name: "App Operator",
          remark: "应用运维人员",
          type: "系统策略",
        },
      ],
      columns: [
        {
          id: "name",
          label: "权限策略名称",
        },
        {
          id: "remark",
          label: "备注",
        },
        {
          id: "type",
          label: "策略类型",
        },
        {
          id: "actions",
          label: "操作",
        },
      ],
      currentPage: 1,
      pageSize: 20,
      total: 100,
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {
    handleCreate() {
      this.$router.push({
        name: "Create",
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
