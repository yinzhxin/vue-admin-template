export const nodes = [
  {
    id: "1", // 节点的唯一标志符
    comboId: "a", // 节点所属分组的标志符
    label: "shop_gateway", // 节点的标签文字
    state: "1",// 状态 --> 显示颜色
    img: "http://localhost:" + window.location.port + "/topo_images/cube2.svg",
  },
  {
    id: "2",
    comboId: "a",
    label: "shop_auth",
    state: "1",
    img: "http://localhost:" + window.location.port + "/topo_images/cube2.svg",
  },
  {
    id: "3",
    comboId: "a",
    label: "shop_user",
    state: "1",
    img: "http://localhost:" + window.location.port + "/topo_images/cube2.svg",
  },
  {
    id: "4",
    comboId: "a",
    label: "shop_audit",
    state: "2",
    img: "http://localhost:" + window.location.port + "/topo_images/cube.svg",

  },
  {
    id: "5",
    comboId: "a",
    label: "shop_kafka",
    state: "2",
    img: "http://localhost:" + window.location.port + "/topo_images/cube.svg",
  },
  {
    id: "6",
    comboId: "a",
    label: "shop_order",
    state: "2",
    img: "http://localhost:" + window.location.port + "/topo_images/cube.svg",
  },
  {
    id: "7",
    label: "192.168.31.107:6379",
    state: "2",
    img: "http://localhost:" + window.location.port + "/topo_images/data.svg",
  },
  {
    id: "8",
    label: "192.168.110.101:9092",
    state: "2",
    img: "http://localhost:" + window.location.port + "/topo_images/kafka.svg",
  },
  {
    id: "9",
    label: "192.168.110.115:3306",
    state: "3",
    img: "http://localhost:" + window.location.port + "/topo_images/mysql.svg",
  },
  // {
  //   id: "10",
  //   comboId: "b",
  //   label: "bank1",
  //   state: "2",
  //   img: "http://localhost:" + window.location.port + "/topo_images/cube.svg",
  // },
  // {
  //   id: "11",
  //   comboId: "b",
  //   label: "bank1",
  //   state: "2",
  //   img: "http://localhost:" + window.location.port + "/topo_images/cube.svg",
  // },
  // {
  //   id: "12",
  //   comboId: "b",
  //   label: "bank1",
  //   state: "2",
  //   img: "http://localhost:" + window.location.port + "/topo_images/cube.svg",
  // },
]


export const edges = [
  //! 1 --> 2
  {
    source: "1",
    target: "2",
  },

  //! 2 --> 3
  {
    source: "2",
    target: "3",
  },

  //! 2 --> 4
  {
    source: "2",
    target: "4",
  },

  //! 3 --> 6
  {
    source: "3",
    target: "6",
  },

  //! 6 --> b
  {
    source: "6",
    target: "b",
  },

  //! 6 --> 7 <==
  {
    source: "6",
    target: "7",
  },

  //! 6 --> 9
  {
    source: "6",
    target: "9",
  },

  //! 3 --> 9
  {
    source: "3",
    target: "9",
  },

  //! 4 --> 8
  {
    source: "4",
    target: "8",
  },

  //! 8 --> 5
  {
    source: "8",
    target: "5",
  },

  // //! 8 --> 8
  // {
  //   source: "8",
  //   target: "8",
  // },

  //! 6 --> 10
  {
    source: "6",
    target: "10",
  },

  //! 10--> 11
  {
    source: "10",
    target: "11",
  },

  //! 11 --> 12
  {
    source: "11",
    target: "12",
  },
]


export const combos = [
  {
    id: "a", // 唯一的标志符，标识不同分组
    label: "animeter101/eoitek-shopping (5)", // 分组的标签
    labelCfg: {
      style: {
        fontSize: 40, // 标签文字大小
      },
    },
    size: [300, 300], // 宽 / 高
    // 分组样式
    style: {
      lineDash: [50, 4], // 边框虚线样式，虚线的线段长度 / 间隔长度
      lineWidth: 12, // 边框线宽
      stroke: "#DEDEED", // 边框颜色
    },
    collapsed: false, // 默认不折叠
  },
  // {
  //   id: "b",
  //   label: "animeter101/eoitek-bank (0)",
  //   labelCfg: {
  //     style: {
  //       fontSize: 40,
  //     },
  //   },
  //   size: [300, 300],
  //   style: {
  //     lineDash: [50, 4], // 线段长度和间隔长度
  //     lineWidth: 12,
  //     stroke: "#8A8AE0",
  //   },
  //   collapsed: true,
  // },
]