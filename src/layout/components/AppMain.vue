<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.app-main {
  padding: 20px;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f0f2f5;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
