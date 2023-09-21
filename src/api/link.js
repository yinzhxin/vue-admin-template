import request from '@/utils/request'

// 获取全量项目名称
export function getAppList() {
  return request({
    url: '/app/list ',
    method: 'get',
  })
}

// 获取全量实例名称
export function getInstanceList() {
  return request({
    url: '/instance/list ',
    method: 'get',
  })
}

// 获取全量项目名称
export function getProjectList() {
  return request({
    url: '/project/list ',
    method: 'get',
  })
}

// 查询链路分页列表
export function getTraceList(params) {
  return request({
    url: '/trace/list ',
    method: 'get',
    params
  })
}

// projectId = iukjnzxchvih48978ysaf &
// traceId=asdfxcvlkj435kjsnbdvknxcvasdkjdshf &
// appId=98kiokjbcxv0783jnhi12 &
// instanceId=kjiohbsdbv8934mnbzxvjhfuieurhmbv &
// status=0 &
// spendTime=34 &
// pageNum=1 &
// pageSize=10
