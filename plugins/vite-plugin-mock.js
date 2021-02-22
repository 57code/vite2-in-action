import path from 'path'

let mockRouteMap = {};

function matchRoute(req) {
  let url = req.url;
  let method = req.method.toLowerCase();
  let routeList = mockRouteMap[method];

  return routeList && routeList.find((item) => item.path === url);
}

function createRoute(mockConfList) {
  mockConfList.forEach((mockConf) => {
    let method = mockConf.type || 'get';
    let path = mockConf.url;
    let handler = mockConf.response;
    // 路由对象
    let route = { path, method: method.toLowerCase(), handler };
    if (!mockRouteMap[method]) {
      mockRouteMap[method] = [];
    }
    console.log('create mock api: ', route.method, route.path);
    // 存入映射对象中
    mockRouteMap[method].push(route);
  });
}

// 实现一个send方法，可以设置：
// 1.Content-Length
// 2.Content-Type
// 3.StatusCode
function send(body) {
  let chunk = JSON.stringify(body);
  // Content-Length
  if (chunk) {
    // convert chunk to Buffer and calculate
    chunk = Buffer.from(chunk, 'utf-8');
    this.setHeader('Content-Length', chunk.length);
  }
  // content-type
  this.setHeader('Content-Type', 'application/json');

  // status
  this.statusCode = 200;

  // respond
  this.end(chunk, 'utf8');
}

// 默认导出的插件工厂函数
export default function (options = {}) {
  // 获取mock文件入口，默认index
  options.entry = options.entry || './mock/index.js';

  // 转换为绝对路径
  if (!path.isAbsolute(options.entry)) {
    options.entry = path.resolve(process.cwd(), options.entry);
  }

  // 返回的插件
  return {
    configureServer: function ({ app }) {
      // 定义路由表
      const mockObj = require(options.entry);
      // 创建路由表
      createRoute(mockObj);

      // 定义中间件：路由匹配
      const middleware = (req, res, next) => {

        // 1.执行匹配过程
        let route = matchRoute(req);

        // 2.存在匹配，则这是一个mock请求
        if (route) {
          console.log('mock request', route.method, route.path);
          res.send = send;
          route.handler(req, res);
        } else {
          // 如果没有匹配，则执行后续操作
          next();
        }
      };

      // 最终目标给app注册一个中间件
      app.use(middleware);
    },
  };
}
