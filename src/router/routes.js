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

  // 概览 
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '概览', icon: 'dashboard' }
      }
    ]
  },

  // 运维提升
  {
    path: '/operImprove',
    name: 'OperImprove',
    component: Layout,
    redirect: '/operImprove/business/overview',
    meta: { title: '运维提升', icon: 'el-icon-message' },
    children: [
      // 业务运维
      {
        path: 'business',
        name: 'Business',
        component: () => import('@/views/operImprove/business/index'),
        redirect: '/operImprove/business/overview',
        meta: { title: '业务运维' },
        children: [
          {
            path: 'overview',
            name: 'BusOverview',
            component: () => import('@/views/operImprove/business/overview'),
            meta: { title: '业务总览' }
          },
          {
            path: 'business1',
            name: 'Business1',
            component: () => import('@/views/operImprove/business/business1'),
            meta: { title: '业务运维1' },
          },
          {
            path: 'business2',
            name: 'Business2',
            component: () => import('@/views/operImprove/business/business2'),
            meta: { title: '业务运维2' }
          }
        ]
      },

      // 应用运维
      {
        path: 'application',
        name: 'Application',
        component: () => import('@/views/operImprove/application/index'), // Parent router-view
        redirect: '/operImprove/application/overview',
        meta: { title: '应用运维' },
        children: [
          {
            path: 'overview',
            name: 'AppOverview',
            component: () => import('@/views/operImprove/application/overview'),
            meta: { title: '应用总览' }
          },
          {
            path: 'application1',
            name: 'Application1',
            component: () => import('@/views/operImprove/application/application1'),
            meta: { title: '应用运维1' },
          },
          {
            path: 'application2',
            name: 'Application2',
            component: () => import('@/views/operImprove/application/application2'),
            meta: { title: '应用运维2' }
          }
        ]
      },

      // 基础设施运维
      {
        path: 'structure',
        name: 'Structure',
        component: () => import('@/views/operImprove/structure/index'),
        redirect: '/operImprove/structure/overview',
        meta: { title: '基础设施运维' },
        children: [
          {
            path: 'overview',
            name: 'StrutOverview',
            component: () => import('@/views/operImprove/structure/overview'),
            meta: { title: '基础设施总览' }
          },
          {
            path: 'structure1',
            name: 'Structure1',
            component: () => import('@/views/operImprove/structure/structure1'),
            meta: { title: '基础设施运维1' },
          },
          {
            path: 'structure2',
            name: 'Structure2',
            component: () => import('@/views/operImprove/structure/structure2'),
            meta: { title: '基础设施运维2' }
          }
        ]
      },

      // 系统资源运维
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/operImprove/resource/index'),
        redirect: '/operImprove/resource/overview',
        meta: { title: '系统资源运维' },
        children: [
          {
            path: 'overview',
            name: 'ResOverview',
            component: () => import('@/views/operImprove/resource/overview'),
            meta: { title: '系统资源总览' }
          },
          {
            path: 'resource1',
            name: 'Resource1',
            component: () => import('@/views/operImprove/resource/resource1'),
            meta: { title: '系统资源运维1' },
          },
          {
            path: 'resource2',
            name: 'Resoucre2',
            component: () => import('@/views/operImprove/resource/resource2'),
            meta: { title: '系统资源运维2' }
          }
        ]
      },
    ]
  },

  // 提升处置
  {
    path: '/handImprove',
    name: 'HandImprove',
    component: Layout,
    redirect: '/handImprove/manager1',
    meta: { title: '处置提升', icon: 'el-icon-user' },
    children: [
      {
        path: 'manager1',
        name: 'Manager1',
        component: () => import('@/views/handImprove/manager1/index'),
        meta: { title: '融合运维管理1' }
      },
      {
        path: 'manager2',
        name: 'Manager2',
        component: () => import('@/views/handImprove/manager2/index'),
        meta: { title: '融合运维管理2' }
      }
    ]
  },

  // 服务拓扑
  {
    path: '/serviceTopology',
    name: 'Topology',
    component: Layout,
    redirect: '/serviceTopology/topology1',
    meta: { title: '服务拓扑', icon: 'el-icon-connection' },
    children: [
      {
        path: 'topology1',
        name: 'Topology1',
        component: () => import('@/views/serviceTopology/topology1/index'),
        meta: { title: '拓扑图1' }
      },
      {
        path: 'topology2',
        name: 'Topology2',
        component: () => import('@/views/serviceTopology/topology2/index'),
        meta: { title: '拓扑图2' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]