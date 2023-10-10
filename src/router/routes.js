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
      // {
      //   path: 'systemOverview',
      //   name: 'SystemOverview',
      //   component: () => import('@/views/serviceGovern/systemOverview/index'),
      //   meta: { title: '系统概览' }
      // },
      {
        path: 'serviceTopo',
        name: 'ServiceTopo',
        component: () => import('@/views/serviceGovern/serviceTopo/index'),
        meta: { title: '服务拓扑' }
      },
      {
        path: 'linkTracing',
        name: 'LinkTracing',
        component: () => import('@/views/serviceGovern/linkTracing/index'),
        meta: { title: '链路追踪' }
      },
      {
        path: 'instanceMonitor',
        name: 'InstanceMonitor',
        component: () => import('@/views/serviceGovern/instanceMonitor/index'),
        meta: { title: '实例监控' }
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
            redirect: '/monitor/otherResource/database/instanceMonitor',
            meta: { title: '数据库' },
            alwaysShow: true,
            children: [
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
        path: 'alarmCenter',
        name: 'AlarmCenter',
        component: () => import('@/views/emergency/alarmCenter/index'),
        meta: { title: '告警中心' }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
