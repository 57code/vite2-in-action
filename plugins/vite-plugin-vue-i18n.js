export default {
  // code是快中的代码，id是当前请求的链接
  transform(code, id) {
    // 判断是否是一个i18n请求
    if(!/vue&type=i18n/.test(id)) {
      return 
    }
    return `export default Comp => {
      Comp.i18n = ${code}
    }`
  }
}