<template>
  <div class="dashboard-container">
    <el-form :model="ruleForm" inline ref="ruleForm" label-width="100px">
      <div>
        <el-form-item label="">
          <el-select v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="ruleForm.indicator" placeholder="指标集">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="ruleForm.alarmSource" placeholder="告警来源">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="ruleForm.alarmStrategy" placeholder="告警策略">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="">
          <el-input v-model="ruleForm.desc" placeholder="添加搜索条件"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">筛选</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="warp-div">
      <el-row class="box_row">
        <el-col class="box_col">
          <div class="card-box">
            <div class="left-box">
              <img src="../../assets/icons/bomb.svg" alt="" class="img-box">
            </div>
            <div>
              <div class="margin-bottom">紧急</div>
              <div class="span" style="color:#e33635">10</div>
            </div>
          </div>
        </el-col>
        <el-col class="box_col">
          <div class="flex-box">
            <div class="card-box">
              <div class="left-box">
                <img src="../../assets/icons/bell.svg" alt="" class="img-box">
              </div>
              <div>
                <div class="margin-bottom">严重</div>
                <div class="span" style="color:#fe9837">0</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="box_col">
          <div class="flex-box">
            <div class="card-box">
              <div class="left-box">
                <img src="../../assets/icons/ladybugs.svg" alt="" class="img-box">
              </div>
              <div>
                <div class="margin-bottom">一般</div>
                <div class="span" style="color:#f7e13a">0</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="box_col">
          <div class="flex-box">
            <div class="card-box">
              <div class="left-box">
                <img src="../../assets/icons/cricle.svg" alt="" class="img-box">
              </div>
              <div>
                <div class="margin-bottom">次要</div>
                <div class="span" style="color:#2db9e2">0</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="box_col lastLine">
          <div class="flex-box">
            <div class="card-box">
              <div class="left-box">
                <img src="../../assets/icons/notice.svg" alt="" class="img-box">
              </div>
              <div>
                <div class="margin-bottom">通知</div>
                <div class="span" style="color:#b2b2b2">0</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="flex-between">
        <div>
          <el-button class="margin-right">批量关闭</el-button>
          <el-select v-model="alarmTrend" style="width:120px" class="margin-right">
            <el-option label="告警趋势" value="alarmTrend"></el-option>
          </el-select>
          <el-button>刷新<i class="el-icon-refresh"></i></el-button>
        </div>
        <div>
          <el-form inline="true" label-suffix=":">
            <el-form-item label="状态">
              <el-radio-group v-model="status">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="打开"></el-radio-button>
                <el-radio-button label="关闭"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="压缩告警">
              <el-radio-group v-model="compressionAlarm">
                <el-radio-button label="是"></el-radio-button>
                <el-radio-button label="否"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="">
              <el-button icon="el-icon-s-tools">显示列</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" @row-click="openDrawer">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="等级" width="120">
          <template slot-scope="scope">
            <el-badge is-dot class="item" style="margin-top:5px">
            </el-badge>
            {{ scope.row.level }}</template>
        </el-table-column>
        <el-table-column label="最后发生时间" sortable prop="time">
        </el-table-column>
        <el-table-column prop="objName" label="对象" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span style="color:#3f9eff">{{ scope.row.objName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="message" label="告警消息" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column fixed="right" label="" width="150">
          <template slot="header">
            <div>
              <span>操作</span>
              <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">图表</el-button>
            <el-button type="text" size="small">关闭</el-button>
            <el-button type="text" size="small">仪表盘</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer :visible.sync="drawer" direction="rtl" size="60%">
        <template slot="title">
          <div>
            <el-button type="danger" size="small" class="margin-right">紧急</el-button>
            <strong>2022-12-21 12:11:21</strong>
          </div>
        </template>
        <div class="drawer_main">
          <div class="flex-between">
            <h3>服务错误数超出阀值</h3>
            <div>
              <i class="el-icon-success success" />
              <span class="margin-right">打开</span>
              <el-button size="small">关闭</el-button>
            </div>
          </div>
          <el-descriptions :column="3" direction="vertical" class="descriptions_div">
            <el-descriptions-item label="告警对象"><strong
                style="color:#0fc7c1">api_service/shop_gateway</strong></el-descriptions-item>
            <el-descriptions-item label="主机"><strong>-</strong></el-descriptions-item>
            <el-descriptions-item label="IP地址"><strong>-</strong>
            </el-descriptions-item>
            <el-descriptions-item label="告警策略"><strong style="color:#0fc7c1">service 错误数</strong>
            </el-descriptions-item>
            <el-descriptions-item label="指标集"><strong>service 错误数</strong></el-descriptions-item>
            <el-descriptions-item label="指标"><strong>requests_count</strong></el-descriptions-item>
            <el-descriptions-item label="告警发生次数"><strong>8</strong></el-descriptions-item>
            <el-descriptions-item label="首次发生时间"><strong>2022-12-11 18:21:31</strong></el-descriptions-item>
            <el-descriptions-item label="最后发生时间"><strong>2022-12-11 18:21:31</strong></el-descriptions-item>
          </el-descriptions>
          <div>
            <h3>APM</h3>
            <el-button @click="handleTopo">查看拓扑图</el-button>
            <el-button>查看服务监控</el-button>
            <el-button>查看相关链路</el-button>
          </div>
          <div>
            <h3>标签</h3>
            <div class="label_box margin-bottom">
              <el-tag type="success" class="margin-right">role:server</el-tag>
              <el-tag type="success" class="margin-right">role:server</el-tag>
              <el-tag type="success" class="margin-right">role:server</el-tag>
              <el-tag type="success" class="margin-right">role:server</el-tag>
            </div>
            <div class="flex-between">
              <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" size="small">
              </el-date-picker>
              <div>
                <span class="margin-right">聚合间隔</span>
                <el-select v-model="value">
                  <el-option label="自定义"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        name: '',
        indicator: '',
        alarmSource: '',
        alarmStrategy: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      alarmTrend: 'alarmTrend',
      tableData: [{
        level: '紧急',
        time: '2022-12-21 12:21:21',
        objName: 'apm_service/shop_order',
        ip: '-',
        message: '服务错误数超出筏值'
      },
      {
        level: '紧急',
        time: '2022-12-21 12:11:21',
        objName: 'apm_service/shop_order',
        ip: '-',
        message: '服务错误数超出筏值'
      },

      ],
      status: '打开',
      compressionAlarm: '是',
      drawer: false,
      time: ''

    };
  },
  watch: {},
  created() { },
  computed: {},
  methods: {
    openDrawer() {
      this.drawer = true
    },
    handleTopo() {
      this.$router.push({
        name: 'ServiceTopo'
      })
    }
  },
  mounted() { }
};
</script>
<style lang="scss" scoped>
.warp-div{
  background: #fff;
  padding: 20px;
}
.box_row {
  display: flex;
  flex-wrap: wrap;
}

.box_col {
  border-radius: 8px;
  margin-right: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100px;
  width: calc((100% - 40px)/5);
  align-items: center;
}

.lastLine {
  margin-right: 0 !important;
}

.img-box {
  width: 30px;
  height: 30px
}

.span {
  font-size: 24px;
}

.card-box {
  display: flex;
  align-items: center;

  .left-box {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }

}

.drawer_main {
  padding: 0 20px 0;
}

.label_box {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
