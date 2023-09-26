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
    <div class="right-menu">
      <div class="select">
        <el-select
          v-model="form.project"
          clearable
          size="small"
          style="margin-right:10px;width:300px;"
        >
          <span slot="prefix">系统</span>
          <el-option
            v-for="item in projectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        >
        </el-date-picker>
        <i class="el-icon-refresh" @click="handleRefresh"></i>
      </div>
      <el-badge class="notice">
        <i class="el-icon-bell"></i>
      </el-badge>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="30" :src="circleUrl"></el-avatar>
          <el-button type="text" style="margin:0 15px 0 10px;">Admin</el-button>
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
      form: {
        project: "animeter101/eoitek-shopping (5)",
        time: "",
      },
      projectOption: [
        {
          value: "animeter101/eoitek-shopping (5)",
          label: "animeter101/eoitek-shopping (5)",
        },
        {
          value: "animeter101/eoitek-shopping (0)",
          label: "animeter101/eoitek-shopping (0)",
        },
      ],
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
    handleRefresh() {
      alert("刷新");
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
    flex: 1;
    height: 100%;
    line-height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;

    &:focus {
      outline: none;
    }
    .select{
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
      }
    }

    .notice {
      font-weight: 600;
      font-size: 25px;
      cursor: pointer;
      margin-right: 10px;
    }
    .el-icon-refresh {
      font-size: 25px;
      font-weight: 700;
      cursor: pointer;
      color: #409EFF;
      margin: 0 10px;
    }
  }
}
</style>
