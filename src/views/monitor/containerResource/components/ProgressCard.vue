<template>
  <div class="box-card-component">
    <div v-for="data in chartData" :key="data.name" class="progress-item">
      <span style="width: 50px">{{ data.name }}</span>
      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content" class="tooltip-div">
          <div>{{ data.name }}</div>
          <div>使用率：{{ data.percent }}%</div>
          <div class="sign-div"><span />已使用：{{ data.ysy }}</div>
          <div class="sign-div zpe-div"><span />总配额：{{ data.zpe }}</div>
        </div>
        <el-progress
          :percentage="data.percent"
          :show-text="false"
          :stroke-width="10"
        />
      </el-tooltip>
      <span style="width: 80px; text-align: right">{{ data.description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressCard",
  components: {},
  filters: {},
  props: {
    chartData: {
      type: Array,
      default: () => {
        return [
          {
            name: "CPU",
            percent: 0,
            description: "0/核",
            ysy: "0核",
            zpe: "0核",
          },
          {
            name: "内存",
            percent: 0,
            description: "0/0Gi",
            ysy: "0Gi",
            zpe: "0Gi",
          },
          {
            name: "存储",
            percent: 0,
            description: "0/0Gi",
            ysy: "0Gi",
            zpe: "0Gi",
          },
          {
            name: "Pods数",
            percent: 0,
            description: "0/0个",
            ysy: "0个",
            zpe: "0个",
          },
          {
            name: "PVC数",
            percent: 0,
            description: "0/0个",
            ysy: "0",
            zpe: "0",
          },
        ];
      },
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
  // computed: {
  //   ...mapGetters(["name", "avatar", "roles"]),
  // },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.dataList = this.chartData;
      },
      deep: true,
    },
  },
  mounted() {
    this.dataList = this.chartData;
  },
};
</script>

<style lang="scss" scoped>
.box-card-component {
  // margin-top: 22px;
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  overflow: hidden;
  .progress-item {
    margin-bottom: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
    .el-progress {
      flex: 1;
      margin: 0 10px;
    }
  }
}
.tooltip-div {
  > div {
    line-height: 1.5;
  }
}
.sign-div {
  span {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1F84FD;
    margin-right: 3px;
  }
}
.zpe-div {
  span {
    background: #E8E8E8;
  }
}
</style>
