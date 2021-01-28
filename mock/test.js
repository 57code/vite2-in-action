export default [
  {
    url: "/api/users",
    method: "get",
    response: () => {
      return {
        code: 20000,
        data: [
          {
            name: "tom",
          },
          {
            name: "jerry",
          },
        ],
      };
    },
  },
];
