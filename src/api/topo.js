import request from '@/utils/request'

// 获取全量项目名称
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