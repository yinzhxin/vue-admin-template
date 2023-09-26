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

export const data = {
  id: "root",
  label: "GET:/demo/{name}",
  subLabel: "shop_user",
  chartData: [
    {
      duringTime: 3,
      pendingTime: 78,
      stayingTime: 19,
    },
  ],
  children: [
    {
      id: "root/1",
      label: "balance/api/auth",
      subLabel: "shop_user",
      chartData: [
        {
          duringTime: 4,
          pendingTime: 34,
          stayingTime: 62,
        },
      ],
      children: [
        {
          id: "root/1/1",
          label: "/api/auth",
          subLabel: "shop_user",
          chartData: [
            {
              duringTime: 0,
              pendingTime: 0,
              stayingTime: 100,
            },
          ],
          children: [
            {
              id: "root/1/1/1",
              label: "POST/api/auth22",
              subLabel: "shop_user",
              status: "error",
              chartData: [
                {
                  duringTime: 5,
                  pendingTime: 35,
                  stayingTime: 60,
                },
              ],
              children: [
                {
                  id: "root/1/1/1/1",
                  label: "balance/api/auth11",
                  subLabel: "shop_user",
                  chartData: [
                    {
                      duringTime: 25,
                      pendingTime: 5,
                      stayingTime: 70,
                    },
                  ],
                  children: [
                    {
                      id: "root/1/1/1/1/1",
                      label: "/api/auth33",
                      subLabel: "shop_user",
                      chartData: [
                        {
                          duringTime: 15,
                          pendingTime: 45,
                          stayingTime: 40,
                        },
                      ],
                      children: [
                        {
                          id: "root/1/1/1/1/1/1",
                          label: "POST/api/auth55",
                          subLabel: "shop_user",
                          chartData: [
                            {
                              duringTime: 30,
                              pendingTime: 10,
                              stayingTime: 60,
                            },
                          ],
                          children: [
                            {
                              id: "root/1/1/1/1/1/1/1",
                              label: "Kafka/api/auth0",
                              subLabel: "shop_user",
                              chartData: [
                                {
                                  duringTime: 20,
                                  pendingTime: 40,
                                  stayingTime: 40,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "root/1/1/2",
              label: "balance/api/auth9",
              subLabel: "shop_user",
              chartData: [
                {
                  duringTime: 25,
                  pendingTime: 30,
                  stayingTime: 45,
                },
              ],
              children: [
                {
                  id: "root/1/1/2/1",
                  label: "/api/auth8",
                  subLabel: "shop_user",
                  chartData: [
                    {
                      duringTime: 30,
                      pendingTime: 35,
                      stayingTime: 35,
                    },
                  ],
                  children: [
                    {
                      id: "root/1/1/2/1/1",
                      label: "POST/api/auth7",
                      subLabel: "shop_user",
                      chartData: [
                        {
                          duringTime: 40,
                          pendingTime: 10,
                          stayingTime: 50,
                        },
                      ],
                      children: [
                        {
                          id: "root/1/1/2/1/1/1",
                          label: "balance/api/auth6",
                          subLabel: "shop_user",
                          chartData: [
                            {
                              duringTime: 35,
                              pendingTime: 35,
                              stayingTime: 40,
                            },
                          ],
                          children: [
                            {
                              id: "root/1/1/2/1/1/1/1",
                              label: "/api/auth1",
                              subLabel: "shop_user",
                              chartData: [
                                {
                                  duringTime: 15,
                                  pendingTime: 15,
                                  stayingTime: 70,
                                },
                              ],
                              children: [
                                {
                                  id: "root/1/1/2/1/1/1/1/1",
                                  label: "POST/api/auth2",
                                  subLabel: "shop_user",
                                  chartData: [
                                    {
                                      duringTime: 10,
                                      pendingTime: 40,
                                      stayingTime: 50,
                                    },
                                  ],
                                  children: [
                                    {
                                      id: "root/1/1/2/1/1/1/1/1/1",
                                      label: "com/api/auth3",
                                      subLabel: "shop_user",
                                      chartData: [
                                        {
                                          duringTime: 35,
                                          pendingTime: 25,
                                          stayingTime: 40,
                                        },
                                      ],
                                      children: [
                                        {
                                          id: "root/1/1/2/1/1/1/1/1/1/1",
                                          label: "letter/api/auth4",
                                          subLabel: "shop_user",
                                          chartData: [
                                            {
                                              duringTime: 15,
                                              pendingTime: 30,
                                              stayingTime: 55,
                                            },
                                          ],
                                        },
                                        {
                                          id: "root/1/1/2/1/1/1/1/1/1/2",
                                          label: "connect/api/auth5",
                                          subLabel: "shop_user",
                                          chartData: [
                                            {
                                              duringTime: 17,
                                              pendingTime: 33,
                                              stayingTime: 50,
                                            },
                                          ],
                                        },
                                        {
                                          id: "root/1/1/2/1/1/1/1/1/1/3",
                                          label: "connect/api/auth511",
                                          subLabel: "shop_user",
                                          chartData: [
                                            {
                                              duringTime: 17,
                                              pendingTime: 33,
                                              stayingTime: 50,
                                            },
                                          ],
                                        },
                                        {
                                          id: "root/1/1/2/1/1/1/1/1/1/4",
                                          label: "connect/api/auth511",
                                          subLabel: "shop_user",
                                          chartData: [
                                            {
                                              duringTime: 17,
                                              pendingTime: 33,
                                              stayingTime: 50,
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}


export const tableData2 = [
  {
    Endpoint: "/api/audit",
    server: "shop_auth",
    spanNum: 2,
    spendTime: "23ms",
    spendTimeSelf: "1"
  },
  {
    Endpoint: "/api/audit",
    server: "shop_gateway",
    spanNum: 1,
    spendTime: "45ms",
    spendTimeSelf: "1"
  },
  {
    Endpoint: "/api/crediCard",
    server: "bank_parrnet",
    spanNum: 2,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/crediCard",
    server: "bank_crediCard",
    spanNum: 2,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/order",
    server: "bank_user",
    spanNum: 2,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/pay",
    server: "bank_parrent",
    spanNum: 1,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/pay",
    server: "bank_parrent",
    spanNum: 1,
    spendTime: "5ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/point",
    server: "bank_crediCard",
    spanNum: 1,
    spendTime: "23ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/point",
    server: "bank_crediCard",
    spanNum: 1,
    spendTime: "23ms",
    spendTimeSelf: "2"
  },
  {
    Endpoint: "/api/user",
    server: "shop_auth",
    spanNum: 1,
    spendTime: "12ms",
    spendTimeSelf: "2"
  },
]


export const treeData = {
  id: "auth",
  children: [
    {
      id: "shop_gateway",
      children: [
        {
          id: "shop_auth",
          children: [
            {
              id: "shop_audit",
              children: [
                { id: "123.234.555.45:2203" }
              ]
            },
            {
              id: "shop_user",
              children: [
                {
                  id: "shop_order",
                  children: [
                    { id: "123.445.567.78:34" },
                    {
                      id: "bank_parrent",
                      children: [
                        {
                          id: "bank_crediCard",
                          children: [
                            { id: "bank_point" }
                          ]
                        },
                      ]
                    },
                    { id: "100.900.234.34:3304" }
                  ]
                }
              ]
            }
          ]
        },
      ]
    },
  ]
}

