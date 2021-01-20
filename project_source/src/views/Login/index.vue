<template>
  <div class="login-wrap">
    <div class="login-box">
      <h1 class="title">后台管理系统</h1>
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="50px"
      >
        <el-form-item prop="username" label="账号">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button>重置</el-button>
          <el-button type="primary" @click="confirmLogin" v-loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { loginFormRules } from '@/utils/validateRules'
import { loginRequest } from '@/api/login'
export default {
  name: 'Login',
  setup () {
    const router = useRouter()
    const store = useStore()
    const loginFormRef = ref('')
    const state = reactive({
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules,
      loading: false
    })
    const confirmLogin = async () => {
      loginFormRef.value.validate(async valid => {
        if (!valid) return
        loginRequest(loginFormRef, router, store)
      })
    }
    watch(() => store.state.loading, () => {
      state.loading = store.state.loading
    })
    return {
      ...toRefs(state),
      loginFormRef,
      confirmLogin
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  background: #2b4b6b;
  height: 100%;
  .title {
    text-align: center;
  }
  .login-box {
    position: absolute;
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #ccc;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .el-input {
      margin: 2px 0;
    }
  }
}
</style>