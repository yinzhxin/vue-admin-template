<template>
  <el-card class="main">
   <el-form :inline="true" :model="form"  label-suffix=":">
       <el-form-item label="应用名称">
         <el-input v-model="form.name" placeholder="单行输入"></el-input>
       </el-form-item>
       <el-form-item label="时间范围">
          <el-date-picker
             v-model="form.date"
             type="datetimerange"
             start-placeholder="开始日期"
             end-placeholder="结束日期">
          </el-date-picker>
       </el-form-item>
       <el-form-item label="操作人">
         <el-input v-model="form.operator" placeholder="单行输入"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" >搜索</el-button>
       </el-form-item>
   </el-form>
   <div  class="flex-box margin-bottom20" >
    <span>选择分类：</span>
    <div class="flex-box">
      <div :style="{color:item.color}" class="category-box" v-for="(item,index) in category" :key="index" @click="handleChange">{{item.label}}</div>
    </div>
   </div>
   <div class="select-box margin-bottom20">
      <el-tag type="info" class='tag-style'>全部</el-tag>
   </div>
    <el-table class="margin-bottom20" border :data="tableData" header-row-class-name="headerStyle">
      <el-table-column v-for="col in columns" :key="col.id" :label="col.label">
      <template slot-scope="scope">
         <div v-if="col.id=='status'">
          <i v-if="scope.row[col.id]==true" class='el-icon-check success'></i>
          <i v-else class='el-icon-close error'></i>
          {{scope.row[col.id]==true?'成功':'失败'}}</div>
        <div v-else-if="col.id=='actions'">
        <el-button type="text">查看</el-button>
        </div>
          <div v-else>{{scope.row[col.id]}}</div>
      </template>
      </el-table-column>
    </el-table>
     <el-pagination
      style="float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   
  </el-card>
</template>

<script>
export default {
  name:'',
  components: {},
  props: {},
  data() {
    return {
      form:{
        name:'',
        date:'',
        operator:''
      },
      category:[
        {
          label:'全部',
          color:'#3f9eff'
        },
        {
          label:'资源管理',
           color:''
        },
        {
          label:'应用管理',
          color:''
        },
        {
          label:'监控报警',
          color:''
        },
        {
          label:'批量运维',
          color:''
        },
        {
          label:'账号管理',
          color:''
        },
        {
          label:'限流降级',
          color:''
        },
      ],
      tableData:[
        {
          time:'2023-8-30 17:21:21',
          type:'应用管理',
          status:true,
          operator:'3232113131313131131',
          desc:'回滚应用：sc-demo',
          source:'concole'
        },
         {
          time:'2023-8-30 17:21:21',
          type:'应用管理',
          status:false,
          operator:'3232113131313131131',
          desc:'回滚应用：sc-demo',
          source:'concole'
        }
      ],
      columns:[
        {
        id:'time',
        label:'执行时间',
        },
        {
        id:'type',
        label:'操作类型',
        },
        {
        id:'status',
        label:'状态',
        },
        {
        id:'operator',
        label:'操作人',
        },
        {
        id:'desc',
        label:'描述信息',
        },
        {
        id:'source',
        label:'来源',
        },
        {
        id:'actions',
        label:'操作',
        },
      ],
      currentPage:1,
      pageSize:20,
      total:100
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {
    handleChange(){
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.main{
  padding-bottom:20px;
}
.category-box{
  margin-right:20px;
  text-align:center;
  
}
.select-box{
  width:100%;
  min-height:60px;
  padding: 10px 20px;
  border:1px solid #ccc;
  .tag-style {
  padding:0 20px;
  border-radius: 20px;
}
}

</style>
