<template>
  <my-breadcrumb firstName="用户管理" secondName="用户列表"></my-breadcrumb>
  <!-- 卡片视图区 -->
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getUserList"
          @keyup.enter="getUserList"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="getUserList"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表格 -->
    <el-table
      :data="userList"
      ref="userTableRef"
      style="width: 100%"
      border
      stripe
      class="user-table"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <!-- <span>{{ scope.row.mg_state }}</span> -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeUserState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete(scope.row.id)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="handleSetting(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
  <user-operator
    v-model:addDialog="addDialogVisible"
    v-model:editDialog="editDialogVisible"
    v-model:settingDialog="settingDialogVisible"
    @updateuser="getUserList"
    :editForm="editForm"
    :settingForm="settingForm"
    :id="id"
  />
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { resetTh } from '@/utils/viewTools'
import {
  showCurrentUser,
  deteleUserRequest,
  changeStateRequest,
  getUsersRequest
} from '@/api/user'
import UserOperator from './UserOperator'
import MyBreadcrumb from '@/components/MyBreadcrumb'

export default {
  name: 'User',
  components: {
    UserOperator,
    MyBreadcrumb
  },
  setup () {
    const userTableRef = ref('')
    const state = reactive({
      userList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      editForm: {},
      settingForm: {},
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      settingDialogVisible: false,
      id: ''
    })
    // 操作按钮
    // 编辑用户信息
    const handleEdit = async id => {
      state.editForm = await showCurrentUser(id)
      state.editDialogVisible = true
    }
    // 删除用户
    const handleDelete = async id => {
      state.id = id
      const data = await deteleUserRequest(id)
      getUserList()
    }
    const handleSetting = row => {
      state.settingForm = row
      state.settingDialogVisible = true
    }
    //更改用户状态
    const changeUserState = async (row) => {
      row.mg_state = await changeStateRequest(row)
    }
    //获取用户列表
    const getUserList = async () => {
      const { userList, total } = await getUsersRequest(state.queryInfo)
      state.userList = userList
      state.total = total
    }
    // 分页器 
    const handleSizeChange = (newSize) => {
      state.queryInfo.pagesize = newSize
      getUserList()
    }
    const handleCurrentChange = (newPageNum) => {
      state.queryInfo.pagenum = newPageNum
      getUserList()
    }
    onMounted(() => {
      getUserList()
      resetTh(userTableRef)
    })
    return {
      ...toRefs(state),
      userTableRef,
      changeUserState,
      handleEdit,
      handleDelete,
      handleSetting,
      handleSizeChange,
      handleCurrentChange,
      getUserList
    }
  }
}
</script>

<style lang="less" scoped>
.user-table {
  margin: 18px 0;
}
</style>