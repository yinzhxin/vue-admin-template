<template>
  <div class="navbar">
    <div>
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb class="breadcrumb-container" />
    </div>

    <div class="select">
      <el-select size="small" v-model="value1"></el-select>
      <el-select size="small" v-model="value2"> </el-select>
      <el-button size="small" icon="el-icon-refresh"></el-button>
    </div>

    <div class="right-menu">
      <el-badge class="notice">
        <i class="el-icon-bell"></i>
      </el-badge>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
          <el-button type="text">Admin</el-button>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 主页 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      value1: "animeter101/eoitek-shopping (5)",
      value2: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  // position: relative;
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        margin-top: 3px;
        position: relative;
        cursor: pointer;

        .el-button--text {
          padding-left: 8px;
          padding-right: 0;
          font-size: 18px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .notice {
      font-weight: 600;
      font-size: 25px;
      top: -15px;
      // left: -12px;
      cursor: pointer;
      & > *:first-child {
        margin-right: 10px;
      }
    }
  }
}

::v-deep .select {
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
  }
}
</style>
