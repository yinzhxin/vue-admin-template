import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export const tableData = Mock.mock({
  'data|10': [{
    'Endpoint|1': ['cpass-cert-manager-rules', 'cpass-kube-proxy-rules', 'cpass-coredns-rules', 'cpass-prometheus-1-rules'],
    'server|1': 'shop_user',
    'namespace|1': ['cert-manager', 'kube-system', 'cpaas-system'],
    app: ['cert-manager', 'kube-proxy', 'coredns', 'global', '全部节点'],
    'status|1': ['success', 'fail'],
    'spendTime|1': ["0ms", "45ms", "30ms", "5ms"],
    requestTime: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    traceId: () => uuidv4()
  }]
})
