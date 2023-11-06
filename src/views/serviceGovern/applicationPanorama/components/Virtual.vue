<template>
  <el-card class="card-style">
    <template #header>
      <div class="card-header">
        <h1>虚拟层</h1>
      </div>
    </template>

    <div style="width: 1200px; height: 500px; display: flex">
      <div class="az1-container" style="margin-right: 10px">
        AZ1
        <div class="az1-style">
          <div class="az1-item-style">
            <!-- namespace -->
            <div class="az1-item-style-left">
              <div v-for="(item, index) in imgArr" :key="index">
                <img :src="item.imgUrl" width="60px" height="80px" />
                <span>{{ item.name }}</span>
              </div>
            </div>

            <!-- K8s工作节点 -->
            <div class="az1-item-style-center">
              <div v-for="(item, index) in imgArr2" :key="index">
                <img :src="item.imgUrl" width="60px" height="80px" />
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>

          <div class="az1-item-style-right">
            ELB
            <div>
              <img
                src="../../../../assets/panorama/tree.svg"
                width="60px"
                height="75px"
              />
              <span>网元</span>
            </div>
            <div>
              <img
                src="../../../../assets/panorama/tree.svg"
                width="60px"
                height="75px"
              />
              <span>网元</span>
            </div>
          </div>
        </div>

        <div class="az1-style" style="width: 100%">
          <div class="az1-item-style" style="width: 97%">
            <div class="az1-item-style-left">
              <div v-for="(item, index) in imgArr" :key="index">
                <img :src="item.imgUrl" width="60px" height="100px" />
                <span>{{ item.name }}</span>
              </div>
            </div>

            <br />

            <div class="az1-item-style-center">
              <div v-for="(item, index) in imgArr2" :key="index">
                <img :src="item.imgUrl" width="60px" height="100px" />
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="az1-container" style="margin-right: 10px">
        AZ1
        <div class="az1-style">
          <div class="az1-item-style">
            <!-- namespace -->
            <div class="az1-item-style-left">
              <div v-for="(item, index) in imgArr" :key="index">
                <img :src="item.imgUrl" width="60px" height="80px" />
                <span>{{ item.name }}</span>
              </div>
            </div>

            <!-- K8s工作节点 -->
            <div class="az1-item-style-center">
              <div v-for="(item, index) in imgArr2" :key="index">
                <img :src="item.imgUrl" width="60px" height="80px" />
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>

          <div class="az1-item-style-right">
            ELB
            <div>
              <img
                src="../../../../assets/panorama/tree.svg"
                width="60px"
                height="75px"
              />
              <span>网元</span>
            </div>
            <div>
              <img
                src="../../../../assets/panorama/tree.svg"
                width="60px"
                height="75px"
              />
              <span>网元</span>
            </div>
          </div>
        </div>

        <div class="az1-style" style="width: 100%">
          <div class="az1-item-style" style="width: 97%">
            <div class="az1-item-style-left">
              <div v-for="(item, index) in imgArr" :key="index">
                <img :src="item.imgUrl" width="60px" height="100px" />
                <span>{{ item.name }}</span>
              </div>
            </div>

            <br />

            <div class="az1-item-style-center">
              <div v-for="(item, index) in imgArr2" :key="index">
                <img :src="item.imgUrl" width="60px" height="100px" />
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      graph: null,

      imgArr: [
        {
          imgUrl: require("../../../../assets/panorama/html.svg"),
          name: "Nod",
        },
        {
          imgUrl: require("../../../../assets/panorama/html.svg"),
          name: "Nod",
        },
        {
          imgUrl: require("../../../../assets/panorama/html.svg"),
          name: "Nod",
        },
        {
          imgUrl: require("../../../../assets/panorama/html.svg"),
          name: "Nod",
        },
      ],
      imgArr2: [
        { imgUrl: require("../../../../assets/panorama/net.svg"), name: "Nod" },
        { imgUrl: require("../../../../assets/panorama/net.svg"), name: "Nod" },
        { imgUrl: require("../../../../assets/panorama/net.svg"), name: "Nod" },
        { imgUrl: require("../../../../assets/panorama/net.svg"), name: "Nod" },
      ],
    };
  },

  mounted() {},

  beforeDestroy() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.card-style {
  display: flex;
  ::v-deep .el-card__header {
    // padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #bbb;
    writing-mode: tb;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.az1-container {
  border: 1px solid black;
  padding: 10px;
  width: 50%;
}

.az1-style {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
}
.az1-item-style {
  display: flex;
  flex-direction: column;
  width: 70%;
  // margin: 10px;
}
.az1-item-style-left {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px;
  margin-bottom: 0px;
  border: 1px solid black;
}

.az1-item-style-center {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 10px;
  border: 1px solid black;
}

.az1-item-style-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin: 10px;
  border: 1px solid black;
}
</style>
