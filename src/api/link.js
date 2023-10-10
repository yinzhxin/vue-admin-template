import request from '@/utils/request'

/**
 * 获取全量项目名称
 * @returns
 */
export function getProjectList() {
  return request({
    url: '/project/list',
    method: 'get',
  })
}

/**
 * 获取全量实例名称
 * @returns
 */
export function getInstanceList() {
  return request({
    url: '/instance/list',
    method: 'get',
  })
}

/**
 * 获取全量应用名称
 * @returns
 */
export function getAppList2() {
  return request({
    url: '/app/list',
    method: 'get',
  })
}

/**
 * 查询链路分页列表
 * @returns
 */
export function getTraceList(params) {
  return request({
    url: '/trace/list',
    method: 'get',
    params: {
      projectId: params.projectId,
      traceId: params.traceId,
      appId: params.appId,
      instanceId: params.instanceId,
      status: params.status,
      spendTime: params.spendTime,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  })
}

/**
 * span详情
 * @returns
 */
export function getSpanInfo2(params) {
  return request({
    url: '/span/info',
    method: 'get',
    params: {
      spanId: 'dkfjgh2378ysdjkhb23768ys'
    }
  })
}

