export default [
  {
    url: "/api/users",
    method: "get",
    response: () => {
      return {
        code: 0,
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
