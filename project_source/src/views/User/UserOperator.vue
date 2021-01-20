<template>
  <!-- 添加用户 -->
  <el-dialog
    title="添加用户"
    v-model="addDialog"
    width="50%"
    @close="closeAddDailog"
  >
    <el-form
      label-width="70px"
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button @click="cancelAddUser">取消</el-button>
        <el-button type="primary" @click="confirmAddUser">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 编辑用户 -->
  <el-dialog
    title="编辑用户信息"
    v-model="editDialog"
    width="50%"
    @close="closeEditDailog"
  >
    <el-form
      ref="editFormRef"
      label-width="70px"
      :model="editForm"
      :rules="editFormRules"
    >
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input
      ></el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input
      ></el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 分配角色 -->
  <el-dialog
    title="分配角色"
    v-model="settingDialog"
    width="50%"
    @close="closeSettingDailog"
  >
    <el-form ref="settingFormRef" :model="settingForm" label-width="70px">
      <el-form-item label="当前用户">
        <el-input v-model="settingForm.username"></el-input>
      </el-form-item>
      <el-form-item label="当前角色">
        <el-input v-model="settingForm.role_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="roleId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="cancelSettingRole">取消</el-button>
        <el-button type="primary" @click="confirmSettingRole">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addFormRules, editFormRules } from '@/utils/validateRules'
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue'
import { editUserRequest, getRolesRequest, addUserRequest } from '@/api/user'
import { successMsg, errMsg } from '@/utils/viewTools'
export default {
  name: 'UserOperator',
  props: {
    addDialog: Boolean,
    editDialog: Boolean,
    settingDialog: Boolean,
    editForm: Object,
    settingForm: Object,
    id: String | Number
  },
  emits: ['updateuser', 'update:addDialog', 'update:editDialog', 'update:settingDialog'],
  setup (props, { emit }) {
    const addFormRef = ref('')
    const editFormRef = ref('')
    const settingFormRef = ref('')
    const { ctx } = getCurrentInstance()
    const state = reactive({
      addForm: {
        username: 'jack1111',
        password: '123213213',
        email: '123213213@qq.com',
        mobile: '13999999999'
      },
      addFormRules: addFormRules,
      editFormRules: editFormRules,
      rolesList: [],
      //选中的角色id
      roleId: ''
    })
    // 取消添加用户
    const cancelAddUser = () => {
      closeAddDailog()
    }
    /* 添加用户  */
    const confirmAddUser = async () => {
      console.log(addFormRef.value);
      addFormRef.value.validate(async valid => {
        if (!valid) return
        await addUserRequest(state.addForm)
        cancelAddUser()
        emit('updateuser')
      })
    }
    // 取消修改用户信息
    const cancelEdit = () => {
      closeEditDailog()
    }
    // 修改用户信息
    const confirmEdit = async () => {
      editFormRef.value.validate(async valid => {
        if (!valid) return
        await editUserRequest(editFormRef)
        closeEditDailog()
        successMsg('修改用户成功!')
        emit('updateuser')
      })
    }
    // 取消分配角色
    const cancelSettingRole = () => {
      closeSettingDailog()
    }
    // 分配角色
    const confirmSettingRole = async () => {
      errMsg('当前接口失效，无法分配角色，请尝试其他操作');
      await closeSettingDailog()
    }
    // 获取角色列表
    const getRolesList = async () => {
      state.rolesList = await getRolesRequest()
    }
    const closeAddDailog = () => {
      emit('update:addDialog', false)
      addFormRef.value.resetFields()
    }
    const closeEditDailog = () => {
      emit('update:editDialog', false)
      editFormRef.value.resetFields()
    }
    const closeSettingDailog = () => {
      emit('update:settingDialog', false)
      settingFormRef.value.resetFields()
    }
    onMounted(() => {
      getRolesList()
    })
    return {
      ...toRefs(state),
      closeAddDailog,
      closeEditDailog,
      closeSettingDailog,
      cancelAddUser,
      confirmAddUser,
      cancelEdit,
      confirmEdit,
      cancelSettingRole,
      confirmSettingRole,
      addFormRef,
      editFormRef,
      settingFormRef
    }
  }
}
</script>

<style>
</style>