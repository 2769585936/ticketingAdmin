<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import md5 from 'md5'
import { useAdminStore } from '@/store/index'
const formObj = ref({
  userName: '',
  password: ''
})

const { loginAdmin } = useAdminStore()

const adminLogin = async () => {
  if (!formObj.value.password.length || !formObj.value.password.length) {
    return ElMessage({
      type: 'error',
      message: '请填写完整的用户名和密码',
      center: true
    })
  }
  const reqObj = {
    userName: formObj.value.userName,
    password: md5(formObj.value.password) // md5 加密
  }
  const res = await request.post('/login', reqObj).catch(e => {})
  if (res) {
    // 跳转到首页
    console.log(res)
    loginAdmin({
      admin: res.data,
      token: res.token
    })
  }
}
</script>
<template>
  <div class="login-main">
    <video src="https://api.favnow.com/background.php" autoplay loop muted></video>
    <el-form :model="formObj" class="login-form" size="large">
      <el-form-item>
        <el-input v-model.trim="formObj.userName" @keyup.enter="adminLogin" type="text" autocomplete="off" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="formObj.password" @keyup.enter="adminLogin" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button class="btn-click" style="width: 100%" @click="adminLogin">登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-main {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: 10%;
  video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .login-form {
    width: 330px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: auto;
    // background: rgba(22, 22, 22, 0.2);
    backdrop-filter: blur(4px);

    & :deep(.el-input__wrapper) {
      background-color: rgba(123, 123, 123, 0.3);
      backdrop-filter: blur(20px);
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.4);
      & input::placeholder {
        padding-left: 10px;
        color: #ddd;
      }
      & input {
        caret-color: rgba(255, 255, 255, 0.8);
        color: #fff;
      }
    }

    .btn-click {
      background-color: rgba(123, 123, 123, 0.3);
      backdrop-filter: blur(20px);
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.4);
      color: #fff;
      font-size: 20px;
      border: none !important;
    }
  }
}
</style>
