export const data = {
  id: "root",
  label: "GET:/demo/{name}",
  subText: "shop_user",
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
      subText: "shop_user",
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
          subText: "shop_user",
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
              label: "POST/api/auth",
              subText: "shop_user",
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
                  label: "balance/api/auth",
                  subText: "shop_user",
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
                      label: "/api/auth",
                      subText: "shop_user",
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
                          label: "POST/api/auth",
                          subText: "shop_user",
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
                              label: "Kafka/api/auth",
                              subText: "shop_user",
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
              label: "balance/api/auth",
              subText: "shop_user",
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
                  label: "/api/auth",
                  subText: "shop_user",
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
                      label: "POST/api/auth",
                      subText: "shop_user",
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
                          label: "balance/api/auth",
                          subText: "shop_user",
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
                              label: "/api/auth",
                              subText: "shop_user",
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
                                  label: "POST/api/auth",
                                  subText: "shop_user",
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
                                      label: "com/api/auth",
                                      subText: "shop_user",
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
                                          label: "letter/api/auth",
                                          subText: "shop_user",
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
                                          label: "connect/api/auth",
                                          subText: "shop_user",
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