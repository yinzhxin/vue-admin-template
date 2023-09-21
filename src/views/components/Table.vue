<template>
  <el-table
    ref="table"
    empty-text="暂无数据"
    border
    stripe
    fit
    :header-cell-style="{ backgroundColor: '#eceff3', color: '#606266' }"
    :style="tableStyle"
    :data="tableData"
    :height="inTableHeight"
    :max-height="maxHeight"
    @selection-change="selectionChange"
    @row-click="rowClick"
  >
    <!-- :highlight-current-row="true" -->
    <!-- 选择框列 -->
    <el-table-column
      v-if="isShowSelect"
      type="selection"
      fixed="left"
      width="55"
      align="center"
    />

    <!-- 序号列 -->
    <el-table-column
      v-if="isShowIndex"
      type="index"
      fixed="left"
      width="55"
      align="center"
    />

    <template v-for="item in columns">
      <!-- 特殊处理列 -->
      <el-table-column
        v-if="item.render"
        :key="item.index"
        :prop="item.index ? item.index : null"
        :label="item.label ? item.label : null"
        :width="item.width ? item.width : null"
        :sortable="item.sortable ? item.sortable : false"
        :align="item.align ? item.align : 'left'"
        :fixed="item.fixed ? item.fixed : null"
        :show-overflow-tooltip="item.tooltip"
        min-width="50"
      >
        <template slot-scope="scope">
          <ex-slot
            :render="item.render"
            :row="scope.row"
            :index="scope.$index"
            :column="item"
          />
        </template>
      </el-table-column>

      <!-- 正常列 -->
      <el-table-column
        v-else
        :key="item.index"
        :prop="item.index ? item.index : null"
        :label="item.label ? item.label : null"
        :width="item.width ? item.width : null"
        :fixed="item.fixed ? item.fixed : null"
        :sortable="item.sortable ? item.sortable : false"
        :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
        :align="item.align ? item.align : 'left'"
        :formatter="item.formatter"
        min-width="50"
      />
    </template>

    <!-- 操作列 -->
    <!-- <el-table-column
      label="操作"
      width="100"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-button size="small" type="text"> 查看 </el-button>
        <el-button size="small" type="text"> 订阅 </el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
// 自定义内容的组件
var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, context) => {
    const params = {
      row: context.props.row,
      index: context.props.index,
    };
    if (context.props.column) {
      params.column = context.props.column;
    }
    return context.props.render(h, params);
  },
};

export default {
  components: { exSlot },
  props: {
    tableData: {
      required: true,
      type: Array,
      default: () => [],
    },

    columns: {
      required: true,
      type: Array,
      default: () => [],
    },

    // 表格高度
    height: {
      type: [Number, String, Function],
      default: () => null,
    },

    "max-height": {
      type: [Number, String],
      default: () => null,
    },

    // 表格自定义样式，默认宽度100%
    tableStyle: {
      type: Object,
      default: () => ({ width: "100%" ,fontSize:"16px"}),
    },

    // 是否显示选择框列，默认不显示
    isShowSelect: {
      type: Boolean,
      default: () => false,
    },

    // 是否显示序号列，默认不显示
    isShowIndex: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      inTableHeight: null,
    };
  },

  // created() {
  //   //该阶段可以接收父组件的传递参数
  //   this.inTableHeight = this.height;
  // },

  // mounted() {
  //   this.$nextTick(() => {
  //     //表格高度自适应浏览器大小
  //     this.changeTableHight();
  //     if (!this.height) {
  //       window.onresize = () => {
  //         this.changeTableHight();
  //       };
  //     }
  //   });
  // },

  // destroyed() {
  //   //高度自适应事件注销
  //   window.onresize = null;
  // },

  // watch: {
  //   /**
  //    * 数据变化后 高度自适应
  //    */
  //   tableData() {
  //     this.$nextTick(() => {
  //       this.changeTableHight();
  //     });
  //   },
  // },

  methods: {
    /**
     * 选择框选择后更改,事件分发
     */
    selectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    /**
     * 点击事件
     */
    rowClick(row, column, event) {
      // console.log("rowClick", row, column, event)
      this.$emit("row-click", row, column, event);
    },
    /**
     * 高度自适应
     * 当表格展示空间小于460按460px展示，大于的时候高度填充
     */
    changeTableHight() {
      if (this.height) {
        //如果有传进来高度就取消自适应
        this.inTableHeight = this.height;
        this.$refs.table.doLayout();
        return;
      }
      let tableHeight = window.innerHeight || document.body.clientHeight;
      //高度设置
      let disTop = this.$refs.table.$el;
      //如果表格上方有元素则减去这些高度适应窗口，66是底下留白部分
      tableHeight -= disTop.offsetTop + 66;
      if (disTop.offsetParent) tableHeight -= disTop.offsetParent.offsetTop;
      this.inTableHeight = tableHeight < 460 ? 460 : tableHeight;
      //重绘表格
      this.$refs.table.doLayout();
    },
  },
};
</script>

<style>
/*

ref="table"             表格实例
empty-text="暂无数据"    表格没有数据时显示的文本内容
style="width: 100%"     表格的宽度为 100%
border                  表格带边框
stripe                  斑马纹效果
fit                     表格具有自适应宽度
highlight-current-row： 鼠标悬停在行上时高亮当前行

:header-cell-style="{ backgroundColor: '#E8E8E9' }"   表头样式
:cell-style="{ backgroundColor: '#E8E8E9' }"          单元格样式

:data="tableData"       数据源
:height="inTableHeight" 动态设置表格的高度
Table 的高度，默认为自动高度。
如果 height 为 number 类型，单位 px；
如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，
Table 的高度会受控于外部样式。	

@selection-change="selectionChange"：当表格选中行改变时触发 selectionChange 方法。
@row-click="rowClick"：当表格行被点击时触发 rowClick 方法。






v-else：当前 el-table-column 组件是默认的表格列，而非一个自定义列
!将当前列在 columns 数组中的索引作为唯一的 key 值
:key="index"
!将该列绑定到数据源的属性名，如果 item.index 存在，则使用它作为值，否则使用 null
:prop="item.index ? item.index : null"
!设置列的显示名称，如果 item.label 存在，则使用它作为值，否则使用 null。
:label="item.label ? item.label : null"
!设置列的宽度，如果 item.width 存在，则使用它作为值，否则使用 null。
:width="item.width ? item.width : null"
!设置是否可以对该列进行排序，如果 item.sortable 存在且为真，则启用排序功能，否则禁用排序。
:sortable="item.sortable ? item.sortable : false"
!设置列的对齐方式，如果 item.align 存在，则使用它作为值，否则使用默认值 'left'。
:align="item.align ? item.align : 'left'"
!设置列是否固定，如果 item.fixed 存在，则使用它作为值（可以是 'left'、'right' 或 true），否则使用 null，表示不固定。
:fixed="item.fixed ? item.fixed : null"：
!设置列的格式化函数，用于将数据转换为特定的格式，如果未配置，则使用默认的格式化方式。
:formatter="item.formatter"
!设置是否显示溢出提示文本，如果 item.tooltip 为真，则启用提示文本，否则禁用提示文本。
:show-overflow-tooltip="item.tooltip"
!设置列的最小宽度为 50px。
min-width="50"
*/
</style>
