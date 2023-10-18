<template>
  <el-row :gutter="16">
    <el-col
      v-for="(item, index) in nodeList"
      :key="index"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
    >
      <div class="card-box">
        <div class="flex-between margin-bottom">
          <div class="flex-box">
            <img
              class="img margin-right"
              src="@/assets/icons/node.svg"
              alt=""
            />
            <div class="img">{{ item.name }}</div>
          </div>
          <el-tag
            :type="
              item.status == 1
                ? 'success'
                : item.status == 0
                ? 'danger'
                : 'warning'
            "
            size="mini"
          >
            <i
              :class="
                item.status == 1
                  ? 'el-icon-success'
                  : item.status == 0
                  ? 'el-icon-error'
                  : 'el-icon-warning'
              "
            ></i>
            {{
              item.status == 1 ? "正常" : item.status == 0 ? "停止" : "待处理"
            }}</el-tag
          >
        </div>
        <el-descriptions style="padding-left: 10px" column="1">
          <el-descriptions-item label="节点ip">{{
            item.ip
          }}</el-descriptions-item>
          <el-descriptions-item label="节点类型">{{
            item.type
          }}</el-descriptions-item>
          <el-descriptions-item label="资源总量">{{
            item.resourceNum
          }}</el-descriptions-item>
          <el-descriptions-item label="创建时间"
            >{{ item.time }}
          </el-descriptions-item>
          <el-descriptions-item label="所属集群">{{
            item.cluster
          }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" plain size="mini" class="button"
          >详情</el-button
        >
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Node",
  components: {},
  props: {},
  data() {
    return {
      nodeList: [
        {
          name: "master1",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 1,
        },
        {
          name: "master2",
          ip: "15.51.0.18",
          type: "计算节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 0,
        },
        {
          name: "master3",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 1,
        },
        {
          name: "master4",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 2,
        },
        {
          name: "master1",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 1,
        },
        {
          name: "master2",
          ip: "15.51.0.18",
          type: "计算节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 0,
        },
        {
          name: "master3",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 1,
        },
        {
          name: "master4",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 2,
        },
        {
          name: "master1",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 1,
        },
        {
          name: "master2",
          ip: "15.51.0.18",
          type: "计算节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 0,
        },
        {
          name: "master3",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 1,
        },
        {
          name: "master4",
          ip: "15.51.0.18",
          type: "控制节点",
          resourceNum: "24C94.31Gi",
          time: "2022年3月20日",
          cluster: "qke-hgw5-devbga",
          status: 2,
        },
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
.card-box {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  height: 230px;
  border: 1px solid #ccc;
}
.img {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
