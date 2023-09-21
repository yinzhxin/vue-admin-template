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
      <el-form inline v-model="form">
        <el-form-item label="系统">
          <el-select
            v-model="form.project"
            @focus="setMinWidthEmpty"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in projectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="1h">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <i class="el-icon-refresh" @click="handleRefresh"></i>
        </el-form-item>
      </el-form>
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
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
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
        margin-right: -460px;
      }
    }
  }
}

::v-deep .select {
  display: flex;
  align-items: center;
  & > * {
    margin-right: -380px;
    margin-top: 20px;
  }
  .el-icon-refresh {
    font-size: 30px;
    font-weight: 700;
    vertical-align: middle;
    cursor: pointer;
    color: #0fc7c1;
  }
}
</style>
