<template>
  <div class="container">
    <el-form ref="form" :model="playerForm" :rules="rules">
      <el-form-item prop="accountname" label="账户名称">
        <el-input v-model="playerForm.accountname"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称">
        <el-input v-model="playerForm.nickname"></el-input>
      </el-form-item>

      <!-- 上传组件 -->
      <el-upload
        action="/api/upload"
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form-item>
        <el-button @click="submitForm" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useNotify, Message } from "element3";
import { ElUploadInternalFileDetail } from "element3/types/upload";
import { defineComponent, onMounted, reactive, ref, unref } from "vue";
import { useRoute } from "vue-router";
import { createPlayer, getPlayer, updatePlayer } from "../../../api/players";
import { Player } from "../../../api/types";

const defaultPlayerData: Player = {
  accountname: "",
  nickname: "",
  avatar: "",
};

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // 表单数据
    const playerForm = ref<Player>(Object.assign({}, defaultPlayerData));

    // 获取路由
    const route = useRoute();

    // 初始化时，根据isEdit判定是否需要获取玩家详情
    onMounted(() => {
      if (props.isEdit) {
        const id = route.params.id + "";
        if (id) {
          fetchData(parseInt(id));
        }
      }
    });

    // 获取玩家详情
    async function fetchData(id: number) {
      try {
        const { data } = await getPlayer(id);
        playerForm.value = data.player;
      } catch (error) {
        console.error(error);
      }
    }

    // 提交表单
    const loading = ref(false); // 加载状态
    const form = ref<any>(null);
    const rules = reactive({
      accountname: [{ required: true, message: "用户名为必填项" }],
      nickname: [{ required: true, message: "昵称为必填项" }],
    });

    function submitForm() {
      // 校验
      form.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

          // 提交
          try {
            if (props.isEdit) {
              await updatePlayer(playerForm.value.id, unref(playerForm));
            } else {
              await createPlayer(unref(playerForm));
            }

            // 操作成功提示信息
            useNotify().success({
              title: "操作成功",
              message: "新增玩家数据成功",
              duration: 2000,
            });

            // 加载状态还原
            loading.value = false;
          } catch (error) {
            console.error(error);
          }
        }
      });
    }

    // 图片上传
    const imageUrl = ref("");

    // 校验
    function beforeAvatarUpload(file: ElUploadInternalFileDetail) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        Message({
          message: "上传头像图片大小不能超过1Mb！",
          type: "error",
        });
      }

      return isLt1M;
    }

    // 上传成功预览
    function handleAvatarSuccess(resp: any, file: ElUploadInternalFileDetail) {
      console.log(resp);

      // 预览
      imageUrl.value = URL.createObjectURL(file.raw);
      playerForm.value.avatar = file.name;
    }

    return {
      playerForm,
      form,
      rules,
      submitForm,
      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,
    };
  },
});
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
