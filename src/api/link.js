import request from '@/utils/request'

/**
 * 查询链路分页列表
 * @returns
 */
export function getTraceList(params) {
  return request({
    url: '/trace/queryTraceList',
    method: 'get',
    params: {
      traceId: params.traceId,
      status: params.status,
      appName: params.appName,
      appSystemGroup: params.appSystemGroup,
    }
  })
}

/**
 * 链路详情
 * @returns
 */
export function getTraceInfo(params) {
  return request({
    url: '/trace/getTraceInfoById',
    method: 'get',
    params: {
      traceId: params.traceId,
    }
  })
}

/**
 * 日志详情
 * @returns
 */
export function getLogInfo(params) {
  return request({
    url: '/log/getLogInfoById',
    method: 'get',
    params: {
      logId: params.logId,
    }
  })
}

/**
 * span详情
 * @returns
 */
export function getSpanInfo(params) {
  return request({
    url: '/span/getSpanInfoById',
    method: 'get',
    params: {
      spanId: params.spanId,
    }
  })
}


/**
 * 获取所有系统
 * @returns
 */
export function getAllSystem() {
  return request({
    url: '/system/getAllSystem',
    method: 'get',
  })
}

/**
 * 获取某个系统下所有服务
 * @returns
 */
export function getAllService(params) {
  return request({
    url: '/system/findAllServiceBySystem',
    method: 'get',
    params: {
      systemName: params.systemName,
    }
  })
}







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
export function getAppList() {
  return request({
    url: '/app/list',
    method: 'get',
  })
}