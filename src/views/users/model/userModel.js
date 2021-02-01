import { reactive, onMounted, ref } from "vue";
import request from "utils/request";

export function useList() {
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
      url: "/getUsers",
      method: "get",
      params: state.listQuery,
    })
      .then(({ data, total }) => {
        // 设置列表数据
        state.list = data;
        state.total = total;
      })
      .finally(() => {
        state.loading = false;
      });
  }

  // 删除项
  function delItem(id) {
    state.loading = true;

    return request({
      url: "/deleteUser",
      method: "get",
      params: { id },
    }).finally(() => {
      state.loading = false;
    });
  }

  // 首次获取数据
  getList();

  return { state, getList, delItem };
}

const defaultData = {
  name: "",
  age: undefined,
};

export function useItem(isEdit, id) {
  const model = ref(Object.assign({}, defaultData));

  // 初始化时，根据isEdit判定是否需要获取玩家详情
  onMounted(() => {
    if (isEdit && id) {
      // 获取玩家详情
      request({
        url: "/getUser",
        method: "get",
        params: { id },
      }).then(({ data }) => {
        model.value = data;
      });
    }
  });

  const updateUser = () => {
    return request({
      url: "/updateUser",
      method: "post",
      data: model.value,
    });
  };

  const addUser = () => {
    return request({
      url: "/addUser",
      method: "post",
      data: model.value,
    });
  };

  return { model, updateUser, addUser };
}
