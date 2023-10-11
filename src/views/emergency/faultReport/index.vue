<template>
  <el-card>
     <div slot="header" class="clearfix">
      <span class="header_left">RT诊断报告</span>
      <span class="header_right">
        <span>故障编号:</span>
        <span>{{faultNum}}</span>
      </span>
     </div>
     <div class="container">
       <el-descriptions column="1" >
          <el-descriptions-item label="诊断应用">
            <a class="span_color">{{desc.app}}</a>
          </el-descriptions-item>
          <el-descriptions-item label="诊断时间">{{desc.time}}</el-descriptions-item>
          <el-descriptions-item label="故障现象">
             {{desc.symptoms}}
          </el-descriptions-item>
       </el-descriptions> 
       <el-divider></el-divider>
       <div class="margin-bottom20">故障定性</div>
       <div class="font_size14">
          <span>应用<span class='span_color'>{{desc.app}}</span>的主机<span class='span_color'>{{desc.host}}</span>的RT较其他主机较高，RT高调用主要集中在调用服务<span class='span_color'>{{desc.service}}</span>上</span>
        </div>
        <el-divider></el-divider>
     
       <div class="margin-bottom20">根因分析</div>
       <div class="font_size14 margin-bottom">(1) 可能的原因：应用的主机<span class="span_color">{{desc.host}}</span>发生FullGc，耗时为544.0</div>
       <div class="font_size14">(2) 可能的原因：应用当前jvm参数配置可优化，请将配置- Xms2560，-Xms2560m，- Xnn1200m添加到java进程启动参数中</div>
       <el-divider></el-divider>
       <div class="margin-bottom20">数据支持</div>
       <div>
         <div class="font_size14 margin-bottom">检测目的：检测应用RT在指定的时间点是否突增，检测结果：应用RT在2023/02/29 8:51:00突增</div>
         <div >
          <line-chart height='300px' title="应用demo-caculator-prod提供的HTTP服务的RT走势图" :chartData="chartData1"/>
         </div>
       </div>
       <div>
         <div class="font_size14 margin-bottom">检测目的：检测不同主机RT分布是否均匀，检测结果：主机<span class="span_color">{{desc.host}}</span>RT相比其他过大</div>
         <div class='flex-box'>
          <bar-chart height='300px' title="主机prod-ldx82sksa9se0的rt分布" :chartData="chartData2"/>
          <line-chart height='300px' title="主机prod-ldx82sksa9se0的rt走势图" :chartData="chartData1"/>
         </div>
       </div>
       <div>
         <div class="font_size14 margin-bottom">检测目的：检测是否存在FullGC，检测结果：发现FullGC</div>
          <div >
          <line-chart height='300px' title="应用demo-caculator-prod的主机prod-ldx82sksa9se0的FullGC耗时走势图，在2023/02/29 8:51:00存在发生了FullGC" :chartData="chartData1"/>
         </div>
       </div>
       <div>
         <div class="font_size14 margin-bottom">检测目的：检测线程数量是否突增，检测结果：线程数未突增</div>
         <div >
          <line-chart height='300px' title="应用demo-caculator-prod的主机prod-ldx82sksa9se0的阻塞线程数走势图" :chartData="chartData1"/>
         </div>
       </div>
       <div>
         <div class="font_size14 margin-bottom">检测目的：检测网络流量是否突增，检测结果：网络流量未突增</div>
          <div >
          <line-chart height='300px' title="应用demo-caculator-prod的主机prod-ldx82sksa9se0的指标NetlnBytes的走势图" :chartData="chartData1"/>
         </div>
       </div>
       <div>
         <div class="font_size14">检测目的：检测<span class="span_color">{{desc.host}}</span>的CPU使用率是否突增，检测结果：CPU使用率正常</div>
         <div >
          <line-chart height='300px' title="应用demo-caculator-prod的主机prod-ldx82sksa9se0的指标UserCpu的走势图" :chartData="chartData1"/>
         </div>
       </div>
          <div>
         <div class="font_size14 margin-bottom">检测目的：检测在<span class="span_color">{{desc.host}}</span>上对本次RT突增影响最大的服务，检测结果：服务<span class="span_color">/demo-caculator/test</span>的影响最大，且主要由于其RT变化引起</div>
         <div class='flex-box'>
          <bar-chart height='300px' title="主机prod-ldx82sksa9se0上的各服务对此次rt突增的影响占比" :chartData="chartData2"/>
          <line-chart height='300px' title="服务/demo-caculator/test的RT/QPS走势图" :chartData="chartData3"/>
         </div>
       </div>
     </div>
  </el-card>
</template>

<script>
import LineChart from '@/components/Chart/LineChart.vue'
import BarChart from '@/components/Chart/BarChart.vue'
export default {
  name:'',
  components: {LineChart,BarChart},
  props: {},
  data() {
    return {
      faultNum:'Req-warn-9dks8k8zkas-220429',
      desc:{
        app:'demo-caculator-prod',
        time:'2023/02/29 8:11:00-2023/02/29 9:11:00',
        symptoms:'应用ccm-caculator-prod提供的RT在2023/02/29 8:51:00出现突增，突增至228.324ms',
        host:'prod-ldx82sksa9se0',
        service:'/demo-caculator/test'
      },
      chartData1:{
        xData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yData:[{
            name: 'aa',
            data: [120, 132, 101, 134, 90, 230, 210]
        }]
      },
      chartData2:[
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
       chartData3:{
        xData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yData:[{
            name: 'aa',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'bb',
            data: [102, 202, 181, 164, 190, 130, 210]
        }]
      },
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.header_left{
  display:inline-block;
  width:20%;
  font-size:20px
}
.header_right{
  display:inline-block;
  width:80%;
  font-size:12px;
}
.container{
  padding:10px;
  .font_size14{
    font-size:14px
  }
  .span_color{
     color:#3f9eff
  }
}

</style>
