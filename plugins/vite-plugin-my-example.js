export default function myExample () {
  return {
    name: 'my-example', // 名称用于警告和错误展示
    resolveId ( source ) {
      if (source === 'virtual-module') {
        return source; // 返回source表明命中，vite不再询问其他插件处理该id请求
      }
      return null; // 返回null表明是其他id要继续处理
    },
    load ( id ) {
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"'; // 返回"virtual-module"模块源码
      }
      return null; // 其他id继续处理
    }
  };
}