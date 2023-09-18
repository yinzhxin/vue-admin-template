import Mock from 'mockjs'

export const tableData = Mock.mock({
  'data|10': [{
    'ndpoint|1': ['cpass-cert-manager-rules', 'cpass-kube-proxy-rules', 'cpass-coredns-rules', 'cpass-prometheus-1-rules'],
    'server|1': ['cert-manager', 'kube-proxy', 'coredns', 'global', '全部节点'],
    'namespace|1': ['cert-manager', 'kube-system', 'cpaas-system'],
    app: 'shop_user',
    'status|1': ['success', 'fail'],
    'time|1': ["0ms", "45ms", "30ms", "5ms"],
    requestTime: '@date',
    traceId: '@word'
  }]
})
