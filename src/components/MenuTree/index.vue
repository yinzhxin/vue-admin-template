<template>
  <el-menu
    style="height: 100%; overflow-y: auto"
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
  >
    <el-submenu v-for="item in treeData" :key="item.id" :index="item.id">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item v-for="el in item.children" :key="el.id" :index="el.id">{{
        el.label
      }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "MenuTree",
  components: {},
  props: {
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      defaultActive: 11,
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
