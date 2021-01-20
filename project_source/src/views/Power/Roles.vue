<template>
  <my-breadcrumb
    firstName="权限管理"
    secondName="订单角色列表列表"
  ></my-breadcrumb>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="unDevelop">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="rolesList"
      border
      stripe
      style="width: 100%"
      ref="rolesTableRef"
    >
      <el-table-column label="详细" type="expand">
        <template #default="scope">
          <el-row
            v-for="(item1, index1) in scope.row.children"
            :key="item1.id"
            :class="['bd-bottom', 'vcenter', index1 === 0 ? 'bd-top' : '']"
          >
            <el-col :span="5">
              <el-tag closable @close="removeRight(scope.row, item1.id)">
                {{ item1.authName }}
              </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 二级权限 -->
            <el-col :span="19">
              <!-- 二级 -->
              <el-row
                v-for="(item2, index2) in item1.children"
                :key="item2.id"
                :class="[index2 === 0 ? '' : 'bd-top', 'vcenter']"
              >
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="removeRight(scope.row, item2.id)"
                  >
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    closable
                    @close="removeRight(scope.row, item3.id)"
                  >
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作" width="300px">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="unDevelop"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="unDevelop"
            >删除</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="handleSetting(scope.row)"
            >权限分配</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 分配权限对话框 -->
  <el-dialog
    title="分配权限"
    v-model="settingRightVisible"
    width="50%"
    @close="cancelSetting"
  >
    <el-tree
      :data="rightsList"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defKeys"
      :props="treeProps"
      ref="settingRightsRef"
    >
    </el-tree>
    <div class="btns">
      <el-button type="info" @click="cancelSetting">取消</el-button>
      <el-button type="primary" @click="confirmSetting">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue'
import { resetTh, unDeveloped } from '@/utils/viewTools'
import {
  getRolesRequest, getRightsRequest, setRightsRequest,
  deleteRightsRequest
} from '@/api/power'
export default {
  name: 'Roles',
  components: {
    MyBreadcrumb
  },
  setup () {
    const rolesTableRef = ref('')
    const settingRightsRef = ref('')
    const state = reactive({
      rolesList: [],
      settingRightVisible: false,
      rightsList: [],
      // 当前选中的角色ID
      roleId: '',
      // 勾选的权限的数组
      defKeys: [],
      // 树形控件
      treeProps: {
        label: 'authName',
        children: 'children'
      }
    })
    // 删除权限
    const removeRight = async (role, rightId) => {
      const data = await deleteRightsRequest(role.id, rightId)
      role.children = data ? data : role.children
    }
    // 操作按钮
    // 权限分配btn
    const handleSetting = (role) => {
      state.roleId = role.id
      getRightsList()
      getLeafKeys(role, state.defKeys)
      state.settingRightVisible = true
    }
    // defKeys 数组
    const getLeafKeys = (node, arr) => {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => getLeafKeys(item, arr))
    }
    // 取消分配权限
    const cancelSetting = () => {
      state.settingRightVisible = false
      state.dfkeys = []
    }
    // 分配权限
    const confirmSetting = async () => {
      console.log(settingRightsRef.value);
      const { getCheckedKeys, getHalfCheckedKeys } = settingRightsRef.value
      const keys = [
        ...getCheckedKeys(),
        ...getHalfCheckedKeys()
      ]
      const keyStr = keys.join(',')
      await setRightsRequest(state.roleId, keyStr)
      getRolesList()
      cancelSetting()
    }
    // 获取权限列表
    const getRightsList = async () => {
      state.rightsList = await getRightsRequest()
    }
    // 获取角色列表
    const getRolesList = async () => {
      state.rolesList = await getRolesRequest()
    }
    // 未开发提示
    const unDevelop = () => {
      unDeveloped('该功能还未开发')
    }
    onMounted(() => {
      getRolesList()
      resetTh(rolesTableRef)
    })
    return {
      ...toRefs(state),
      rolesTableRef,
      settingRightsRef,
      removeRight,
      handleSetting,
      cancelSetting,
      confirmSetting,
      unDevelop
    }
  }
}
</script>

<style lang="less" scoped>
.bd-top {
  border-top: 1px solid #eee;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 7px;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>