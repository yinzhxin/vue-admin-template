<template>
  <el-card>
    <div style="font-weight: 700" class="margin-bottom20">应用列表</div>
    <div class="flex-between margin-bottom20">
      <div class="flex-box margin-right">
        <div
          :class="{ 'is-active': item.isActive }"
          class="box"
          v-for="item in tabsList"
          :key="item.value"
          @click="handleChange(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <el-input
        placeholder="搜索服务"
        suffix-icon="el-icon-search"
        style="width: 20%"
        size="mini"
      ></el-input>
    </div>
    <component :is="activeTabs"></component>
  </el-card>
</template>

<script>
import Node from "./components/node.vue";
import Cluster from "./components/cluster.vue";
export default {
  name: "",
  components: { Node, Cluster },
  props: {},
  data() {
    return {
      activeTabs: "Node",
      tabsList: [
        { label: "项目", value: "Project", isActive: false },
        { label: "集群", value: "Cluster", isActive: false },
        { label: "节点", value: "Node", isActive: true },
        { label: "命名空间", value: "Namespace", isActive: false },
        { label: "应用服务", value: "AppService", isActive: false },
        { label: "工作负载", value: "WorkLoad", isActive: false },
        { label: "容器组", value: "PodGroup", isActive: false },
        { label: "容器", value: "Pod", isActive: false },
        { label: "存储卷", value: "Storage", isActive: false },
        { label: "中间件", value: "Middleware", isActive: false },
        { label: "单元化", value: "Unitization", isActive: false },
        { label: "告警规则", value: "AlarmRule", isActive: false },
        { label: "处置工单", value: "WorkOrder", isActive: false },
      ],
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {
    handleChange(item) {
      this.activeTabs = item.value;
      this.tabsList.map((el) => {
        if (el.value == item.value) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.box {
  padding: 0 10px;
  width: 80px;
  height: 30px;
  border-radius: 25px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
}
.is-active {
  background-color: #f2f3f9;
  color: #3f9eff;
}
</style>
