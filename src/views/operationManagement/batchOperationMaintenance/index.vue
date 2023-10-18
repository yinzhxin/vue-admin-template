<template>
  <el-card>
    <div class="flex-box margin-bottom20">
      <div class="title-left">批量运维</div>
      <div class="title-right">
        所属服务空间:
        <el-select v-model="serviceSpace" placeholder="请选择" size="small">
          <el-option
            v-for="item in serviceSpaceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按集群" name="cluster">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="选择集群" prop="cluster">
            <el-select
              v-model="form.cluster"
              placeholder="请选择集群"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="命令" prop="command">
            <el-input type="textarea" v-model="form.command"></el-input>
            <el-tag style="width: 100%" type="warning"
              >输入命令，命令将以admin账户执行</el-tag
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary">执行</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="按应用" name="app">配置管理</el-tab-pane>
      <el-tab-pane label="按实例" name="example">角色管理</el-tab-pane>
    </el-tabs>
    <el-tabs>
      <el-tab-pane label="执行记录">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          header-row-class-name="headerStyle"
        >
          <el-table-column
            v-for="col in column"
            :key="col.id"
            :label="col.label"
            :sortable="col.sortable"
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="col.id == 'command'">
                <el-button type="text">{{ scope.row[col.id] }}</el-button>
              </div>
              <div v-else-if="col.id == 'detail'">
                <el-button type="text">查看详情</el-button>
              </div>
              <div v-else>{{ scope.row[col.id] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      serviceSpace: "默认服务空间",
      serviceSpaceOptions: [],
      activeName: "cluster",
      form: {
        cluster: "",
        command: "",
      },
      rules: {
        cluster: [
          { required: true, message: "集群是必选项", trigger: "change" },
        ],
        command: [{ required: true, message: "命令是必填项", trigger: "blur" }],
      },
      tableData: [
        {
          operator: "admin",
          createTime: "2022-12-12 12:12:12",
          endTime: "2022-12-12 12:12:12",
          command: "aaaaaaaaa",
          status: "已完成",
        },
        {
          operator: "admin",
          createTime: "2022-12-12 12:12:12",
          endTime: "2022-12-12 12:12:12",
          command: "aaaaaaaaa",
          status: "已完成",
        },
      ],
      column: [
        { id: "operator", label: "操作人" },
        { id: "createTime", label: "创建时间", sortable: true },
        { id: "endTime", label: "结束时间", sortable: true },
        { id: "command", label: "命令" },
        { id: "status", label: "状态", sortable: true },
        { id: "detail", label: "详情" },
      ],
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.title-left {
  margin-right: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}
.title-right {
  height: 40px;
  line-height: 40px;
}
</style>
