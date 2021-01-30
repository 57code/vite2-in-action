const mockList = [
  { id:1,name:'tom', age: 18},
  { id:2,name:'jerry', age: 18},
  { id:3,name:'mike', age: 18},
  { id:4,name:'jack', age: 18},
  { id:5,name:'larry', age: 18},
  { id:6,name:'white', age: 18},
  { id:7,name:'peter', age: 18},
  { id:8,name:'james', age: 18},
]

module.exports = [
  // {
  //   url: "/api/users",
  //   type: "get",
  //   response: () => {
  //     return {
  //       code: 20000,
  //       data: { id: 1, name: "tom", age: 18 },
  //     };
  //   },
  // },
  // {
  //   url: "/api/users",
  //   type: "get",
  //   response: (config) => {
  //     // 从查询参数中获取分页、过滤关键词等参数
  //     const { page = 1, limit = 5 } = config.query;

  //     // 分页
  //     const data = mockList.filter(
  //       (item, index) => index < limit * page && index >= limit * (page - 1)
  //     );

  //     return {
  //       code: 20000,
  //       data,
  //       total: mockList.length,
  //     };
  //   },
  // },
  {
    url: "/api/users",
    type: "post",
    response: () => {
      // 直接返回
      return {
        code: 20000,
      };
    },
  },
  {
    url: "/api/users",
    type: "put",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  {
    url: "/api/users",
    type: "delete",
    response: ({query}) => {
      console.log('delete user', query.id);
      return {
        code: 20000,
      };
    },
  },
];
