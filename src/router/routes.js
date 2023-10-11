/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 个人主页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '个人主页', icon: 'el-icon-user' }
      }
    ]
  },

  // 监控和大屏展示
  {
    path: '/monitor',
    // name: 'Monitor',
    component: Layout,
    redirect: '/monitor/containerResource',
    meta: { title: '监控和大屏展示', icon: 'el-icon-menu' },
    children: [
      // 容器资源总览
      {
        path: 'containerResource',
        name: 'ContainerResource',
        component: () => import('@/views/monitor/containerResource/index'),
        meta: { title: '容器资源总览' }
      },

      // 其他资源总览
      {
        path: 'otherResource',
        // name: 'OtherResource',
        component: () => import('@/views/monitor/otherResource/index'),
        redirect: '/monitor/otherResource/resourceOverview',
        meta: { title: '其他资源总览' },
        children: [
          {
            path: 'resourceOverview',
            name: 'ResourceOverview',
            component: () => import('@/views/monitor/otherResource/resourceOverview'),
            meta: { title: '资源总览' }
          },
          {
            path: 'baseResource',
            name: 'BaseResource',
            component: () => import('@/views/monitor/otherResource/baseResource'),
            meta: { title: '基础资源' },
          },
          {
            path: 'registerCenter',
            name: 'RegisterCenter',
            component: () => import('@/views/monitor/otherResource/registerCenter'),
            meta: { title: '注册中心' }
          },
          {
            path: 'redis',
            name: 'Redis',
            component: () => import('@/views/monitor/otherResource/redis'),
            meta: { title: 'Redis' }
          },
          {
            path: 'database',
            // name: 'Database',
            component: () => import('@/views/monitor/otherResource/database/index'),
            redirect: '/monitor/otherResource/database/instanceMonitorMain',
            meta: { title: '数据库' },
            alwaysShow: true,
            children: [
              {
                path: 'instanceMonitorMain',
                name: 'InstanceMonitorMain',
                component: () => import('@/views/monitor/otherResource/database/instanceMonitorMain'),
                meta: { title: '数据库' }
              },
              {
                path: 'instanceMonitor',
                name: 'InstanceMonitorDatabase',
                component: () => import('@/views/monitor/otherResource/database/instanceMonitor'),
                meta: { title: '数据库实例监控' }
              },
            ]
          },
        ]
      },
      // Prometheus
      {
        path: 'prometheusResource',
        name: 'PrometheusResource',
        component: () => import('@/views/monitor/prometheus/index'),
        meta: { title: 'Prometheus' }
      },

    ]
  },

  // 事件应急处置
  {
    path: '/emergency',
    name: 'Emergency',
    component: Layout,
    redirect: '/emergency/eventOverview',
    meta: { title: '事件应急处置', icon: 'el-icon-bell' },
    children: [
      {
        path: 'eventOverview',
        name: 'EventOverview',
        component: () => import('@/views/emergency/eventOverview/index'),
        meta: { title: '事件总览' }
      },
      {
        path: 'eventHandling',
        name: 'EventHandling',
        component: () => import('@/views/emergency/eventHandling/index'),
        meta: { title: '事件处置' }
      },
      {
        path: 'faultReport',
        name: 'FaultReport',
        component: () => import('@/views/emergency/faultReport/index'),
        meta: { title: '故障报告' }
      },
      {
        path: 'alarmCenter',
        name: 'AlarmCenter',
        component: () => import('@/views/emergency/alarmCenter/index'),
        meta: { title: '告警中心' }
      },
    ]
  },

  // 服务治理
  {
    path: '/serviceGovern',
    // name: 'ServiceGovern',
    component: Layout,
    redirect: '/serviceGovern/serviceTopo',
    meta: { title: '服务治理', icon: 'el-icon-connection' },
    children: [
      // {
      //   path: 'systemList',
      //   name: 'SystemList',
      //   component: () => import('@/views/serviceGovern/systemList/index'),
      //   meta: { title: '系统列表' }
      // },
      {
        path: 'systemOverview',
        name: 'SystemOverview',
        component: () => import('@/views/serviceGovern/systemOverview/index'),
        meta: { title: '应用总览' }
      },
      {
        path: 'applicationPanorama',
        name: 'applicationPanorama',
        component: () => import('@/views/serviceGovern/applicationPanorama/index'),
        meta: { title: '应用全景图' }
      },
      {
        path: 'serviceTopo',
        name: 'ServiceTopo',
        component: () => import('@/views/serviceGovern/serviceTopo/index'),
        meta: { title: '服务链路' }
      },
      {
        path: 'linkTracing',
        name: 'LinkTracing',
        component: () => import('@/views/serviceGovern/linkTracing/index'),
        meta: { title: '链路追踪',activeMenu:'/serviceGovern/serviceTopo' },
        hidden:true
      },
      {
        path: 'currentLimitingDegradation',
        name: 'CurrentLimitingDegradation',
        component: () => import('@/views/serviceGovern/currentLimitingDegradation/index'),
        meta: { title: '限流降级' }
      },
      {
        path: 'instanceMonitor',
        name: 'InstanceMonitor',
        component: () => import('@/views/serviceGovern/instanceMonitor/index'),
        meta: { title: '实例监控' }
      }
    ]
  },

  // 运维管理
  {
    path: '/operationManagement',
    name: 'OperationManagement',
    component: Layout,
    redirect: '/operationManagement/progressManagement',
    meta: { title: '运维管理', icon: 'el-icon-menu' },
    children: [
      // 进度管理
      {
        path: 'progressManagement',
        name: 'ProgressManagement',
        component: () => import('@/views/operationManagement/progressManagement/index'),
        meta: { title: '进度管理' }
      },
      // 资源汇总
      {
        path: 'resourceSummary',
        name: 'ResourceSummary',
        component: () => import('@/views/operationManagement/resourceSummary/index'),
        meta: { title: '资源汇总' },
      },
      // 流量控制
      {
        path: 'flowControl',
        // name: 'FlowControl',
        component: () => import('@/views/operationManagement/flowControl/index'),
        redirect: '/operationManagement/flowControl/escapeObservationMain',
        meta: { title: '流量控制' },
        alwaysShow: true,
        children: [
          {
            path: 'escapeObservationMain',
            name: 'EscapeObservationMain',
            component: () => import('@/views/operationManagement/flowControl/escapeObservationMain/index'),
            meta: { title: '流量控制' },
          },
          {
            path: 'escapeObservation',
            name: 'EscapeObservation',
            component: () => import('@/views/operationManagement/flowControl/escapeObservation/index'),
            meta: { title: '流量逃逸观测' },
          },
        ]
      },
      // 部署-单批发布
      {
        path: 'deploymentSingleBatchRelease',
        name: 'DeploymentSingleBatchRelease',
        component: () => import('@/views/operationManagement/deploymentSingleBatchRelease/index'),
        meta: { title: '部署-单批发布' }
      },
      // 部署-灰度发布
      {
        path: 'deploymentGrayscalePublishing',
        name: 'DeploymentGrayscalePublishing',
        component: () => import('@/views/operationManagement/deploymentGrayscalePublishing/index'),
        meta: { title: '部署-灰度发布' }
      },
      {
        path: 'deploymentGrayscalePublishingAfter',
        name: 'DeploymentGrayscalePublishingAfter',
        component: () => import('@/views/operationManagement/deploymentGrayscalePublishing/afterPublication'),
        meta: { title: '发布后',activeMenu:'/operationManagement/deploymentGrayscalePublishing' },
        hidden:true
      },
      // API快速访问
      {
        path: 'apiQuickAccess',
        name: 'ApiQuickAccess',
        component: () => import('@/views/operationManagement/apiQuickAccess/index'),
        meta: { title: 'API快速访问' }
      },
      // 批量运维
      {
        path: 'batchOperationMaintenance',
        name: 'PrometheusResource',
        component: () => import('@/views/operationManagement/batchOperationMaintenance/index'),
        meta: { title: '批量运维' }
      },
    ]
  },
  // 融合场景
  {
    path: '/fusionScene',
    name: 'FusionScene',
    component: Layout,
    redirect: '/fusionScene/unitTrafficSwitching',
    meta: { title: '融合场景', icon: 'el-icon-bell' },
    children: [
      // 单元流量切换
      {
        path: 'unitTrafficSwitching',
        name: 'UnitTrafficSwitching',
        component: () => import('@/views/fusionScene/unitTrafficSwitching/index'),
        meta: { title: '单元流量切换' }
      },
      // 单元发布
      {
        path: 'unitRelease',
        name: 'UnitRelease',
        component: () => import('@/views/fusionScene/unitRelease/index'),
        meta: { title: '单元发布' }
      },
    ]
  },
  // 系统管理
  {
    path: '/systemManagement',
    name: 'FusionScene',
    component: Layout,
    redirect: '/systemManagement/operationLog',
    meta: { title: '系统管理', icon: 'el-icon-bell' },
    children: [
      // 操作日志
      {
        path: 'operationLog',
        name: 'OperationLog',
        component: () => import('@/views/systemManagement/operationLog/index'),
        meta: { title: '操作日志' }
      },
      // 权限助手
      {
        path: 'permissionAssistant',
        name: 'PermissionAssistant',
        component: () => import('@/views/systemManagement/permissionAssistant/index'),
        meta: { title: '权限助手' }
      },
      // 角色
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/systemManagement/role/index'),
        meta: { title: '角色' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
