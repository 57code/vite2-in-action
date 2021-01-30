import { reactive } from "vue";
import request from "utils/request";

export default function (url) {
  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [], // 列表数据
    total: 0,
    listQuery: {
      page: 1,
      limit: 5,
    },
  });

  // 获取列表
  function getList() {
    state.loading = true;

    return request({
      url,
      method: "get",
      params: state.listQuery,
    })
      .then(({ data, total }) => {
        // 设置列表数据
        state.list = data;
        state.loading = false;
        state.total = total;
      })
      .catch(() => {
        console.log(error);
      });
  }

  // 删除项
  function delItem(id, idx) {
    state.loading = true;

    return request({
      url,
      method: "delete",
      params: { id },
    })
      .then(() => {
        state.loading = false;
        // 从数据中删除当前行
        state.list.splice(idx, 1);
      })
      .catch((error) => {
        console.log(error);
        state.loading = false;
      });
  }

  // 首次获取数据
  getList();

  return { state, getList, delItem };
}
