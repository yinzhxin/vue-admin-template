<template>
  <div class="wrap-container">
    <el-form :model="ruleForm" :rules="rules" inline ref="ruleForm" label-width="100px">
      <div>
        <el-form-item label="" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="region">
          <el-select v-model="ruleForm.region" placeholder="指标集">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="region">
          <el-select v-model="ruleForm.region" placeholder="告警来源">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="region">
          <el-select v-model="ruleForm.region" placeholder="告警策略">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="添加搜索条件"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">筛选</el-button>
        </el-form-item>
      </div>
    </el-form>

    <Table :table-data="tableData" :columns="columns" :height="500" />
  </div>
</template>

<script>
import Table from "@/views/components/Table.vue";
export default {
  name:'',
  components: {Table},
  props: {},
  data() {
    return {
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
      tableData:[
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        }
      ],
      columns: [
        { label: "节点", index: "node" },
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
        },
        { label: "QPS", index: "qps" },
        { label: "CPU使用率", index: "cpuUsage" },
        { label: "内存使用率", index: "memoryUsage" },
        { label: "磁盘使用率", index: "diskUsage" },
      ],
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>

</style>
