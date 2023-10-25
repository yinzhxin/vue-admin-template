<template>
  <div class="dashboard-container">
    <div class="left margin-right">
      <MenuTree :treeData="treeData" />
    </div>
    <div class="right">
      <BaseInfoCard class="margin-bottom" title="归因分析服务" :desc="desc" />

      <div style="width: 100%; height: auto; background: #fff">
        <!-- <img src="../../../assets/panorama.svg" style="width: 100%; height: auto" /> -->
        <!-- 业务逻辑层 -->
        <Business />
        <!-- 应用逻辑层 -->
        <Application />
        <!-- 虚拟层 -->
        <Virtual />
        <!-- 物理层 -->
        <Physics />
      </div>
    </div>
  </div>
</template>

<script>
import MenuTree from "@/components/MenuTree";
import BaseInfoCard from "@/components/BaseInfoCard.vue";

import Business from "./components/Business.vue";
import Application from "./components/Application.vue";
import Physics from "./components/Physics.vue";
import Virtual from "./components/Virtual.vue";

export default {
  name: "ApplicationPanorama",
  components: {
    MenuTree,
    BaseInfoCard,
    Business,
    Application,
    Physics,
    Virtual,
  },
  props: {},
  data() {
    return {
      treeData: [
        {
          id: "1",
          label: "XXXX平台",
          icon: "el-icon-s-tools",
          children: [
            {
              id: "11",
              label: "归因分析服务",
            },
            {
              id: "12",
              label: "用户行为间隔分析",
            },
            {
              id: "13",
              label: "非金融维护服务",
            },
            {
              id: "14",
              label: "授权交易服务",
            },
          ],
        },
        {
          id: "2",
          label: "XXXX系统",
          icon: "el-icon-user-solid",
          children: [
            {
              id: "21",
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: "22",
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: "3",
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: "31",
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: "32",
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: "4",
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: "41",
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: "42",
              label: "二级 22",
              newVal: "",
            },
          ],
        },
        {
          id: "5",
          label: "XXXX平台",
          icon: "el-icon-s-order",
          children: [
            {
              id: "51",
              label: "二级 1-1",
              newVal: "",
            },
            {
              id: "52",
              label: "二级 22",
              newVal: "",
            },
          ],
        },
      ],
      desc: [
        {
          label: "应用ID",
          value: "IDxSwkdS83SlaAEIS",
        },
        {
          label: "创建时间",
          value: "2023-4-22 09:21:39",
        },
        {
          label: "集群类型",
          value: "K8s集群",
        },
        {
          label: "k8s命名空间",
          value: "default",
        },
        {
          label: "更新时间",
          value: "2023-4-22 09:21:39",
        },
        {
          label: "集群名称",
          value: "Test测试集群",
        },
        {
          label: "规格",
          cpu: 2,
          mem: 2,
        },
        {
          label: "部署类型",
          value: "FatJar",
        },
        {
          label: "YAML",
          value: "编辑",
        },
        {
          label: "状态",
          value: "9/9个Pod运行中",
        },
        {
          label: "部署包",
          value: "NRCP-Man-1.0.0-SNAPSHOT.jar",
        },
        {
          label: "负责人",
          value: "王东东",
        },
      ],
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  height: 100%;
  .left {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
  }
  .right {
    flex: 4;
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
  }
}
.el-row {
  margin-bottom: 0;
}
</style>
