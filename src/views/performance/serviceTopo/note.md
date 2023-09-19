## 基本概念

### 图的元素

图的元素特指图上的**节点** `Node` 和**边** `Edge` 。

G6 内置了一系列 [内置的节点](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/nodes/default-node) 和 [内置的边](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/edges/defaultEdge)，供用户自由选择。

G6 不同的内置节点或不同的内置边主要区别在于元素的 [图形 Shape](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/shape/shape-keyshape)，例如，节点可以是圆形、矩形、图片等。



## 元素的属性

节点和边的属性分为两种

1. **样式属性 `style`**：对应 Canvas 中的各种样式，在元素[状态 State](https://g6.antv.antgroup.com/zh/docs/manual/middle/states/state) 发生变化时，可以被改变

2. **其他属性**：例如图形类型（ `type`）、id（`id` ）一类在元素[状态 State](https://g6.antv.antgroup.com/zh/docs/manual/middle/states/state) 发生变化时不能被改变的属性

G6 设定 hover 或 click 节点，造成节点状态的改变，只能自动改变节点的**样式属性**（如 `fill`、`stroke` 等**）**，**其他属性**（如 `type` 等）不能被改变。

如果需要改变其他属性，要通过  [graph.updateItem](https://g6.antv.antgroup.com/zh/docs/api/graph-func/item#graphupdateitemitem-model-stack) 手动配置。

**样式属性**是一个名为  `style` 的对象， `style` 字段与其他属性并行。

边元素的属性数据结构与节点元素相似，只是其他属性中多了 `source` 和 `target` 字段，代表起始和终止节点id



细化在图 1 中 **Tutorial 案例** 的视觉需求，我们需要完成：

- 视觉效果：
  - R1: 节点的描边和填充色，对应节点样式属性：`fill`，`stroke`；
  - R2: 节点上标签文本的颜色，对应节点其他属性：`labelCfg`；
  - R3: 边的透明度和颜色，对应边样式属性：`opacity`，`stroke`；
  - R4: 边上标签文本的方向和颜色，对应边其他属性：`labelCfg`；
- 数据与视觉映射：
  - R5: 根据数据中节点的 `class` 属性映射节点的形状，对应节点其他属性：`type`；
  - R6: 根据数据中边的 `weight` 属性映射边的粗细，对应边样式属性：`lineWidth`。

```js
{
  id: 'node0',          // 元素的 id
  type: 'circle',       // 元素的图形
  size: 40,             // 元素的大小
  visible: true,        // 控制初次渲染显示与隐藏，若为 false，代表隐藏。默认不隐藏即true
  label: 'node0'        // 标签文字
  labelCfg: {           // 标签配置属性
    positions: 'center',// 标签的属性，标签在元素中的位置
    style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
      fontSize: 12      // 标签的样式属性，文字字体大小
      // ...            // 标签的其他样式属性
    }
  }
  // ...,               // 其他属性
  style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
    fill: '#000',       // 样式属性，元素的填充色
    stroke: '#888',     // 样式属性，元素的描边色
    // ...              // 其他样式属性
  }
}
```

图的元素（Item）包含图上的节点 Node 、边 Edge 和 Combo 三大类。

每个图元素由一个或多个 [图形（Shape）](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/shape/shape-keyshape) 组成，且都会有自己的唯一关键图形（keyShape）。

G6 内置了一系列具有不同基本图形样式的节点/边/ Combo，例如，节点可以是圆形、矩形、图片等。

G6 中所有内置的元素样式详见 [内置节点](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/nodes/default-node)，[内置边](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/edges/defaultEdge)，[内置 Combo](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/combos/default-combo)。

除了使用内置的节点/边/ Combo 外，G6 还允许用户通过自己搭配和组合 shape 进行节点/边/ Combo 的自定义，详见 [自定义节点](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/nodes/custom-node)，[自定义边](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/edges/custom-edge)，[自定义 Combo](https://g6.antv.antgroup.com/zh/docs/manual/middle/elements/combos/custom-combo)。

图元素具有公共的通用属性和通用方法。图元素的属性包括：

- 样式属性，通过 `style` 字段对象进行配置，和元素的关键图形相关，例如 `fill`，`stroke`。可在[元素状态](https://g6.antv.antgroup.com/zh/docs/manual/middle/states/state)改变时被改变。
- 其他属性，例如 `id`、`type`，不能在元素状态改变是进行改变，可通过 [graph.updateItem](https://g6.antv.antgroup.com/zh/docs/api/graph-func/item#graphupdateitemitem-model-stack) 进行手动更新。
- 完整的元素属性列表参考：[元素配置项](https://g6.antv.antgroup.com/zh/docs/api/Items/item-properties)。除了各类元素共有的通用属性外，每种节点/边/ Combo 都有各自的特有属性。

图元素实例上具有对元素进行更新、销毁、获取属性、修改状态等[通用方法](https://g6.antv.antgroup.com/zh/docs/api/Items/item-methods)，同时，对于实例的变更也可以通过调用 [graph](https://g6.antv.antgroup.com/zh/docs/api/Graph) 上的方法进行。

```
使用 graph.node()
该方法可以为不同节点进行不同的配置。
提示:
该方法必须在 render 之前调用，否则不起作用；
由于该方法优先级最高，将覆盖其他地方对节点的配置，这可能将造成一些其他配置不生效的疑惑；
该方法在增加元素、更新元素时会被调用，如果数据量大、每个节点上需要更新的内容多时，可能会有性能问题。
```





```
该示例使用了内置 rect 节点，节点的 keyShape 是中间的 rect，
其他 Shape 包括上下左右四个 circle 以及一个 text。
代码设置了节点的样式 style，仅在 rect 上生效，其他 Shape 都以默认样式渲染。

该节点上的其他图形需要使用其他配置项进行配置。
例如，上下左右四个 circle 的样式需要在 linkPoints 中配置，文本样式需要在 labelCfg 中配置。
```





````
“chardata”:[{
      	durdingTime:1,
        pendingTime:94,
        stayingTime:0
      }]
````



```
 {
        id: "root",
        label: "GET:/demo/{name}",
        subText: "shop_user",
        chartData: [
          {
            duringTime: 1,
            pendingTime: 94,
            stayingTime: 0,
          },
        ],
        children: [
          {
            id: "root/1",
            label: "balance/api/auth",
            subText: "shop_user",
            chartData: [
              {
                duringTime: 1,
                pendingTime: 94,
                stayingTime: 0,
              },
            ],

          },
        ],
      },
```





````
    // data: [
          //   "connect/api/auth",
          //   "letter/api/auth",
          //   "com/api/auth",
          //   "POST/api/auth",
          //   "/api/auth",
          //   "balance/api/auth",
          //   "Kafka/api/auth",
          //   "POST/api/auth",
          //   "/api/auth",
          //   "balance/api/auth",
          //   "GET:/demo/{name}",
          //   "balance/api/auth",
          //   "/api/auth",
          //   "POST/api/auth",
          //   "balance/api/auth",
          // ],
````



`````
    if (node.depth === 0) {
          node.style = {
            fill: "#fff",
            stroke: "#9A60B4",
            lineWidth: 3,
          };
        } else if (node.depth === 1) {
          node.style = {
            fill: "#fff",
            stroke: "#BE76DE",
            lineWidth: 3,
          };
        } else if (node.depth === 2) {
          node.style = {
            fill: "#fff",
            stroke: "#CF81F2",
            lineWidth: 3,
          };
        } else if (node.depth === 3) {
          node.style = {
            fill: "#fff",
            stroke: "#EA7CCC",
            lineWidth: 3,
          };
        } else if (node.depth === 4) {
          node.style = {
            fill: "#fff",
            stroke: "#EE8AF8",
            lineWidth: 3,
          };
        }
`````

```
else if (node.depth === 2 || node.depth === 5) {
          node.style = {
            fill: "#fff",
            stroke: "#5470C6",
            lineWidth: 3,
          };
        } else if (node.depth === 3 || node.depth === 6) {
          node.style = {
            fill: "#fff",
            stroke: "#73C0DE",
            lineWidth: 3,
          };
        } else if (node.depth === 4 || node.depth === 7 || node.depth === 10) {
          node.style = {
            fill: "#fff",
            stroke: "#91CC75",
            lineWidth: 3,
          };
        }
```