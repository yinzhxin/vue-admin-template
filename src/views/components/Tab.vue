<template>
  <!-- 基于el-tabs二次封装 -->
  <el-tabs v-model="temp" @tab-click="handleClick" class="my-el-tabs">
    <el-tab-pane
      :label="item.label"
      v-for="(item, index) in temList"
      :key="index"
      :name="item.name"
    >
      <slot :name="item.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "mElTabs", props: { activeName: { type: String, },
tabList: { type: Array, default: [], }, }, data() { return {
//用临时变量代替。防止出现子组件修改父组件数据报错，很讨厌报错 temp:
this.activeName, temList: this.tabList, }; }, methods: {
//点击方法拉出去，用的时候更灵活 handleClick(tab) { this.$emit('changeTabs',tab)
}, }, computed: {}, watch:{ //这是引用的时候想通过父组件事件修改当前tabs选中项
activeName:{ handler(n,o){ this.temp=n } } }

}
</script>
