import request from '@/utils/request'
const mockApi = "https://www.fastmock.site/mock/e3785eb81b7de9f9ab57c9cc0811bfed/dev"

/**
 * 获取全量项目名称
 * @returns
 */
export function getProjectList() {
  return request({
    url: mockApi + '/project/list',
    method: 'get',
  })
}

/**
 * 获取全量实例名称
 * @returns
 */
export function getInstanceList() {
  return request({
    url: mockApi + '/instance/list',
    method: 'get',
  })
}

/**
 * 获取全量应用名称
 * @returns
 */
export function getAppList() {
  return request({
    url: mockApi + '/app/list',
    method: 'get',
  })
}

/**
 * 查询链路分页列表
 * @returns
 */
export function getTraceList(params) {
  return request({
    url: mockApi + '/trace/list',
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
 * 链路详情
 * @returns
 */
export function getTraceInfo(params) {
  return request({
    url: mockApi + '/trace/info',
    method: 'get',
    params: {
      traceId: params.traceId
    }
  })
}

/**
 * span详情
 * @returns
 */
export function getSpanInfo(params) {
  return request({
    url: mockApi + '/span/info',
    method: 'get',
    params: {
      spanId: params.spanId
    }
  })
}


export const traceData = {
  id: "root",
  topLabel: "GET:/demo/{name}",
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
      topLabel: "balance/api/auth",
      subLabel: "shop_user",
      error: true,
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
          topLabel: "/api/auth",
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
              topLabel: "POST/api/auth22",
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
                  topLabel: "balance/api/auth11",
                  subLabel: "shop_user",
                  error: true,
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
                      topLabel: "/api/auth33",
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
                          topLabel: "POST/api/auth55",
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
                              topLabel: "Kafka/api/auth0",
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
              topLabel: "balance/api/auth9",
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
                  topLabel: "/api/auth8",
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
                      topLabel: "POST/api/auth7",
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
                          topLabel: "balance/api/auth6",
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
                              topLabel: "/api/auth1",
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
                                  topLabel: "POST/api/auth2",
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
                                      topLabel: "com/api/auth3",
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
                                          topLabel: "letter/api/auth4",
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
                                          topLabel: "connect/api/auth5",
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
    {
      id: "root/2",
      topLabel: "balance/api/authbbb",
      subLabel: "shop_user",
      chartData: [
        {
          duringTime: 4,
          pendingTime: 34,
          stayingTime: 62,
        },
      ],
    },
    {
      id: "root/3",
      topLabel: "balance/api/lll",
      subLabel: "shop_user",
      chartData: [
        {
          duringTime: 6,
          pendingTime: 32,
          stayingTime: 62,
        },
      ],
    }
  ],
}


export const tableSpanData = [
  {
    endpoint: "/api/audit",
    server: "shop_auth",
    spanNum: 2,
    spendTime: "23ms",
    spendTimeSelf: "1"
  },
  {
    endpoint: "/api/audit",
    server: "shop_gateway",
    spanNum: 1,
    spendTime: "45ms",
    spendTimeSelf: "1"
  },
  {
    endpoint: "/api/crediCard",
    server: "bank_parrnet",
    spanNum: 2,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/crediCard",
    server: "bank_crediCard",
    spanNum: 2,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/order",
    server: "bank_user",
    spanNum: 2,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/pay",
    server: "bank_parrent",
    spanNum: 1,
    spendTime: "45ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/pay",
    server: "bank_parrent",
    spanNum: 1,
    spendTime: "5ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/point",
    server: "bank_crediCard",
    spanNum: 1,
    spendTime: "23ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/point",
    server: "bank_crediCard",
    spanNum: 1,
    spendTime: "23ms",
    spendTimeSelf: "2"
  },
  {
    endpoint: "/api/user",
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