import request from '@/utils/request'

// 获取拓扑图
export function getTopo(params) {
  return request({
    url: '/topology/genNodeAccess',
    method: 'get',
    params: {
      startTime: params.startTime,
      endTime: params.endTime,
      systemName: params.systemName
    }
  })
}