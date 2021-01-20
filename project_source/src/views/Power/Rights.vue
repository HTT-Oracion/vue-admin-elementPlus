<template>
  <my-breadcrumb firstName="权限管理" secondName="权限列表"></my-breadcrumb>
  <el-card>
    <el-table border scripe :data="rightsList" ref="tableRef">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级">
        <template #default="scope">
          <el-tag v-if="scope.row.level === '0'">一级</el-tag>
          <el-tag v-else-if="scope.row.level === '1'" type="success"
            >二级</el-tag
          >
          <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { resetTh } from '@/utils/viewTools'
import { getRightsListRequest } from '@/api/power'
export default {
  name: 'Rigths',
  components: {
    MyBreadcrumb
  },
  setup () {
    const tableRef = ref('')
    const state = reactive({
      rightsList: []
    })
    const getRightsList = async () => {
      state.rightsList = await getRightsListRequest()
    }
    onMounted(() => {
      getRightsList()
      resetTh(tableRef)
    })
    return {
      ...toRefs(state),
      tableRef
    }
  }
}
</script>

<style lang="less" scoped>
</style>