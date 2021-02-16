module.exports = [
  {
    url: '/api/users',
    type: 'get',
    response: function (req, res) {
      return res.send([
        { username: 'tom', age: 18 },
        { username: 'jerry', age: 18 },
      ],
      );
    }
  }
]