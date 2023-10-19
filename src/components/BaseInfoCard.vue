<template>
  <el-card class="box-card">
    <div class="margin-bottom20">
      <span style="font-weight: 700" class="margin-right">{{ title }}</span>
      <i class="el-icon-success success"></i>
      <span style="float: right">
        <el-button size="mini">实例监控</el-button>
        <el-button size="mini">应用全景图</el-button>
        <el-button size="mini">服务链路</el-button>
        <el-button size="mini">分布式配置</el-button>
        <el-button size="mini">弹性伸缩</el-button>
        <el-button size="mini">限流/隔离/降级</el-button>
        <el-button size="mini">部署</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </span>
    </div>
    <el-descriptions title="基本信息">
      <el-descriptions-item
        v-for="item in desc"
        :key="item.label"
        :label="item.label"
      >
        <div
          v-if="
            item.label == '应用ID' ||
            item.label == '部署包' ||
            item.label == 'YAML' ||
            item.label == '负责人' ||
            item.label == '状态'
          "
        >
          <span class="text-color">{{ item.value }}</span>
        </div>
        <div v-else-if="item.label == '规格'">
          <span> CPU核数：{{ item.cpu }} </span>
          <span> 内存：{{ item.mem }}GB </span>
        </div>
        <div v-else>
          {{ item.value }}
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
export default {
  name: "BaseInfoCard",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },

  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
