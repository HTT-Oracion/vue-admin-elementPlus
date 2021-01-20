<template>
  <el-container class="home-container">
    <el-header>
      <span>后台管理系统</span>
      <el-button type="info" @click="dialogVisible = true">退出</el-button>
      <!-- 提示框 -->
      <el-dialog title="确认退出吗" v-model="dialogVisible" width="20%">
        <span>是否确认退出?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="danger" @click="logout">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 切换按钮 -->
        <div class="toggle-btn" @click="isCollapse = !isCollapse">|||</div>
        <el-menu
          background-color="#323744"
          active-text-color="#369bff"
          text-color="#fff"
          unique-opened
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in meunList"
            :key="item.id"
          >
            <template #title>
              <i :class="iconList[item.id]"></i>
              <span v-show="!isCollapse">
                {{ item.authName }}
              </span>
            </template>
            <el-menu-item
              v-for="subitem in item.children"
              :index="'/' + subitem.path"
              :key="subitem.id"
              @click="changeActiveItem('/' + subitem.path)"
            >
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main v-loading="loading">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getMenuRequest } from '@/api/home'
import { getItem } from '@/utils/storage'
import { ACTIVE_PATH } from '@/utils/constants'
import { logoutRequest } from '@/api/login'
export default {
  name: 'Home',
  setup () {
    const router = useRouter()
    const store = useStore()
    const iconList = {
      125: 'el-icon-user-solid',
      103: 'el-icon-star-on',
      101: 'el-icon-s-goods',
      102: 'el-icon-s-order',
      145: 'el-icon-s-data'
    }
    const state = reactive({
      meunList: [],
      isCollapse: false,
      dialogVisible: false,
      activePath: '',
      loading: false
    })
    const logout = () => {
      logoutRequest(router)
    }
    const changeActiveItem = (active) => {
      store.commit('setActivePath', active)
      state.activePath = active
    }
    const getMeunList = async () => {
      state.meunList = await getMenuRequest()
    }
    watch(() => store.state.loading, () => {
      state.loading = store.state.loading
    })
    onMounted(() => {
      getMeunList()
      state.activePath = getItem(ACTIVE_PATH) || ''
    })
    return {
      ...toRefs(state),
      iconList,
      logout,
      changeActiveItem
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    background: #373c41;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    span {
      margin: 10px auto;
    }
  }
  .el-aside {
    text-align: center;
    background-color: #323744;
    color: #fff;
    i {
      margin-right: 10px;
    }
    .el-menu {
      border-right: none;
    }
    .toggle-btn {
      height: 20px;
      line-height: 20px;
      background-color: #485164;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf2;
  }
}
</style>