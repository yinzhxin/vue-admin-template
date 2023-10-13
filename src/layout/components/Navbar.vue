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
          v-model="form.system"
          @change="handleChange"
          clearable
          size="small"
          class="selectbox"
        >
          <!-- <span slot="prefix">系统</span> -->
          <template slot="prefix">
            <div class="pl-10px">系统：</div>
          </template>
          <el-option
            v-for="item in systemOptions"
            :key="item.systemId"
            :label="item.systemName"
            :value="item.systemId"
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
          <el-button type="text" style="margin: 0 15px 0 10px">Admin</el-button>
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
import { mapGetters, mapActions } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getAllSystem, getAllService } from "@/api/link";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  mounted() {
    getAllSystem().then((res) => {
      this.systemOptions = res;
    });
    if (this.form.system) {
      getAllService({ system: this.form.system }).then((res) => {
        this.serviceOptions = res;
        // this.serviceOptions = [
        //   { serviceId: "test-init", serviceName: "test-init" },
        // ];
        this.setServiceOptions(this.serviceOptions);
      });
    }
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      form: {
        system: "eoitek-shoping", // 目前默认是 eoitek-shoping
        time: "",
      },
      systemOptions: [],
      serviceOptions: [],
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
    // 刷新按钮
    handleRefresh() {
      // alert("刷新");
    },
    // 选择器
    handleChange(val) {
      getAllSystem({ system: val }).then((res) => {
        getAllService({ system: val }).then((res) => {
          this.serviceOptions = res;
          
          // if (val == "eoitek-shoping") {
          //   this.serviceOptions = [
          //     { serviceId: "eoitek-shoping", serviceName: "eoitek-shoping" },
          //   ];
          // } else if (val == "eoitek-bank") {
          //   this.serviceOptions = [
          //     { serviceId: "eoitek-bank", serviceName: "eoitek-bank" },
          //   ];
          // } else {
          //   this.serviceOptions = [
          //     { serviceId: "eoitek-dd", serviceName: "eoitek-dd" },
          //   ];
          // }

          this.setServiceOptions(this.serviceOptions);
        });
      });
    },
    ...mapActions({ setServiceOptions: "link/setServiceOptions" }),
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
    .select {
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
      color: #409eff;
      margin: 0 10px;
    }
  }
}
.selectbox {
  margin-right: 10px;
  width: 300px;
  ::v-deep .el-input__inner {
    padding-left: 38px;
  }
}
</style>
