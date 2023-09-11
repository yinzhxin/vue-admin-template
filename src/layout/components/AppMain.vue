<template>
  <section class="app-main" :style="styles">
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
      // console.log("$route.path: ", this.$route.path);
      if (this.$route.path === "/operImprove/application/application1") {
        this.styles.backgroundColor = "#fff";
        this.styles.padding = "0px";
      } else {
        this.styles.backgroundColor = "#eef0f3";
        this.styles.padding = "20px";
      }
      return this.$route.path;
    },
  },
  data() {
    return {
      styles: {
        backgroundColor: "#eef0f3",
        padding: "20px",
      },
    };
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* background: #eef0f3; */
  padding: 20px;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
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
