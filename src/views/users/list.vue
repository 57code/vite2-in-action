<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="/users/create">
        <el-button type="success" icon="el-icon-edit">创建用户</el-button>
      </router-link>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="账户名" prop="name">
      </el-table-column>
      <el-table-column align="center" label="年龄" prop="age">
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope)"
            >更新</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-remove"
            @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { Msgbox, Message } from "element3";
import Pagination from "comps/Pagination.vue";
import fetchData from "./model/userModel";
import request from 'utils/request'
export default {
  name: "UserList",
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表数据
    const router = useRouter();
    const { state, getList, delItem } = fetchData("/users");

    // 用户更新
    function handleEdit({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id },
      });
    }

    // 删除玩家
    function handleDelete({ $index, row }) {
      // Msgbox.confirm("确定删除当前玩家信息？", "警告", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      // }).then(async () => {
      //   delItem(row.id, $index).then(() => {
      //     // 通知用户
      //     Message.success("删除成功！");
      //   });
      // });

      // delItem(row.id, $index).then(() => {
      //     // 通知用户
      //     Message.success("删除成功！");
      //   });

      request({
        url: '/users/' + row.id,
        method: "delete",
      })
        .then(() => {
          console.log("删除成功");
        })
        .catch((error) => {
          debugger
          console.log(error);
        });
    }

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>
