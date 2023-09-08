<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="intro">
          <div class="avatar">
            <el-avatar :size="100" :src="circleUrl"></el-avatar>
          </div>
          <div>
            <el-button type="text" style="font-size: 25px"> Admin </el-button>
            <div style="font-size: 18px; color: #4d4d4d">
              系统管理员 | XX银行 — 平台数据技术事业群 — 基础平台部 — 系统管理员
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content rating-container">
          <div class="rating show-num" v-for="item in data1" :key="item.title">
            <span style="font-size: 20px; color: #9e9e9e">
              {{ item.title }}
            </span>
            <span style="font-size: 40px; margin-top: -80px">
              {{ item.num }}
            </span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <strong>接入应用</strong>
              <el-button type="text" style="float: right; padding: 3px 0">
                全部应用
              </el-button>
            </div>
            <div class="rating-container">
              <div
                class="rating access-app"
                v-for="item in data2"
                :key="item.num"
              >
                <div>
                  <img
                    src="@/assets/letter.svg"
                    width="25px"
                    style="margin-right: 10px"
                  />
                  {{ item.title }}
                </div>
                <div style="align-items: center">
                  <i class="el-icon-info"></i>
                  <span> 事件总量</span>
                  <span style="margin-left: 65px">{{ item.num }}</span>
                </div>
                <div>
                  <span>{{ item.team }}</span>
                  <span style="margin-left: 100px">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content" style="height: 257px">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <strong>快速开始 / 便携导航</strong>
            </div>
          </el-card>
          <div class="button-group">
            <el-button type="text">操作</el-button>
            <el-button type="text">操作</el-button>
            <el-button type="text">操作</el-button>
            <el-button type="text">操作</el-button>
            <el-button type="text">操作</el-button>
            <el-button type="text">操作</el-button>
            <el-button type="text">操作</el-button>
            <el-button size="mini">添加</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <strong>消息</strong>
              <el-button type="text" style="float: right; padding: 3px 0">
                更多消息
              </el-button>
            </div>
            <ul>
              <li v-for="item in data3" :key="index">
                <div style="margin: 0 30px 0 0">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div>
                  <div style="margin-bottom: 15px">
                    <span>{{ item.name }}</span
                    >在
                    <span style="color: #409eff">{{ item.module }}</span>
                    下载了日志
                    <span style="color: #409eff">{{ item.content }}</span>
                  </div>
                  <div style="color: #9e9e9e; font-size: 14px">5 天前</div>
                </div>
              </li>
            </ul>
          </el-card>
        </div>
      </el-col>

      <el-col :span="6">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <strong>团队运维指数</strong>
                </div>
                <div class="radar-chart">
                  <RadarChart :width="'90%'" :height="'400%'" />
                </div>
              </el-card>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <strong>团队</strong>
                  <el-button type="text" style="float: right; padding: 3px 0">
                    全部团队
                  </el-button>
                </div>

                <div class="team-container">
                  <div class="team-row">
                    <div style="margin: 10px 20px 0 10px">
                      <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    </div>
                    <div>一线运维团队</div>
                  </div>
                  <div class="team-row">
                    <div style="margin: 10px 20px 0 10px">
                      <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    </div>
                    <div>一线运维团队</div>
                  </div>
                </div>
                <div class="team-container">
                  <div class="team-row">
                    <div style="margin: 10px 20px 0 10px">
                      <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    </div>
                    <div>一线运维团队</div>
                  </div>
                  <div class="team-row">
                    <div style="margin: 10px 20px 0 10px">
                      <el-avatar :size="30" :src="circleUrl"></el-avatar>
                    </div>
                    <div>一线运维团队</div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import RadarChart from "./components/RadarChart.vue";

export default {
  name: "Dashboard",
  components: { RadarChart },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      data1: [
        { title: "应用接入", num: "56" },
        { title: "问题处置", num: "8 / 24" },
        { title: "主机数量", num: "2,233" },
      ],

      data2: [
        {
          title: "新核心系统",
          num: "1/1",
          team: "xx团队",
          time: "5 小时前",
        },
        {
          title: "XX 平台",
          num: "1/1",
          team: "xx团队",
          time: "5 小时前",
        },
        {
          title: "XX 平台",
          num: "1/1",
          team: "xx团队",
          time: "5 小时前",
        },
        {
          title: "XX 平台",
          num: "1/1",
          team: "xx团队",
          time: "5 小时前",
        },
        {
          title: "XX 平台",
          num: "1/1",
          team: "xx团队",
          time: "5 小时前",
        },
      ],

      data3: [
        {
          name: "朱老师",
          module: "UPM",
          content: "5月迭代",
        },
        {
          name: "朱老师",
          module: "UPM",
          content: "5月迭代",
        },
        {
          name: "朱老师",
          module: "UPM",
          content: "5月迭代",
        },
        {
          name: "朱老师",
          module: "UPM",
          content: "5月迭代",
        },
        {
          name: "朱老师",
          module: "UPM",
          content: "5月迭代",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  min-height: 100px;
  background: #ffffff;
}
.intro {
  min-height: 200px;
  background: #ffffff;
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    margin: 30px 30px 0 30px;
    font-size: 100px;
  }
}
.rating-container {
  display: flex;
  height: 200px;
}
.rating {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.show-num {
  line-height: 140px;
  position: relative; /* 设置相对定位 */
  flex: 1;
  padding-right: 40px; /* 调整右侧间距以避免文字与竖线重叠 */
  text-align: center; /* 文字水平居中 */
}
.show-num:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%; /* 将竖线垂直居中 */
  right: 20px;
  transform: translateY(-50%); /* 调整片段位置 */
  width: 2px; /* 设置竖线长度 */
  height: 50%; /* 设置竖线高度 */
  background-color: #ebeef5; /* 设置竖线颜色 */
}
.access-app {
  padding-left: 20px;
  border: 0.5px solid #ebeef5;
  display: flex;
  justify-content: space-evenly !important;
  flex-direction: column !important;
  align-items: flex-start;
  div {
    display: flex;
    align-items: flex-end;
  }
  span {
    color: #9e9e9e;
  }
}
.el-card {
  border-radius: 0px;
}
::v-deep .el-card__body {
  padding: 0px;
}
::v-deep .el-card__header {
  border: 0.5px solid #ebeef5;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 20px 30px 0;
  margin: 0;
  border: 0.5px solid #ebeef5;
}
li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1.5px solid #e8e8e9;
}
li:before {
  content: none;
}
li:nth-child(2n) {
  margin-right: 0;
}
.button-group {
  padding-top: 30px;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-left: 1.5px solid #ebeef5;
  border-right: 1.5px solid #ebeef5;
}
.button-group * {
  flex-basis: 15%; /* 每个按钮占据 25% 的宽度 */
  margin-right: 30px;
  margin-top: 15px;
  font-size: 18px;
}
.button-group > :first-child {
  margin-left: 10px;
}
.radar-chart {
  border: 0.5px solid #ebeef5;
}
.team-container {
  display: flex;
  justify-content: space-around;
  .team-row {
    display: flex;
    align-items: center;
  }
}
</style>
