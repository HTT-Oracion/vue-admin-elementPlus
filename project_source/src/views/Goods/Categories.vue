<template>
  <my-breadcrumb firstName="商品管理" secondName="商品分类"></my-breadcrumb>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="toAddCate">添加分类</el-button>
      </el-col>
    </el-row>
    <el-table :data="cateList" border striped ref="tableRef">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="商品名称" prop="cat_name"> </el-table-column>
      <el-table-column label="是否有效">
        <template #default="scope">
          <i
            v-if="scope.row.cat_deleted"
            class="el-icon-error"
            style="color: red"
          ></i>
          <i v-else class="el-icon-success" style="color: lightgreen"></i>
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template #default="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" type="success"
            >二级</el-tag
          >
          <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="undevelop(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="undevelop"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </el-card>
  <el-dialog
    title="添加分类"
    v-model="addCateVisible"
    width="50%"
    @close="cancelAddCate"
  >
    <el-form
      label-width="100px"
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
    >
      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="addForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类:">
        <el-cascader
          v-model="selectedVal"
          :options="parentCateList"
          :props="cateProps"
          @change="handleChange"
          clearable
        >
        </el-cascader>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="cancelAddCate">取消</el-button>
        <el-button type="primary" @click="confirmAddCate">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { resetTh, unDeveloped } from '@/utils/viewTools'
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { addCateRequest } from '@/api/goods/add'
import { getCateListRequest, getParentListReq } from '@/api/goods/cate'
export default {
  name: 'Categories',
  components: {
    MyBreadcrumb
  },
  setup () {
    const addFormRef = ref('')
    const tableRef = ref('')
    const state = reactive({
      cateList: [],
      queryInfo: {
        tpye: 3,
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      addCateVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ]
      },
      selectedVal: [],
      parentCateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    })
    // 添加分类按钮
    const toAddCate = () => {
      getParentCateList()
      state.addCateVisible = true
    }
    // 级联选择器change
    const handleChange = (val) => {
      // console.log(state.selectedVal.length);
      if (state.selectedVal.length > 0) {
        state.addForm.cat_pid = state.selectedVal[state.selectedVal.length - 1]
        // 等级
        state.addForm.cat_level = state.selectedVal.length
        return;
      } else {
        state.addForm.cat_pid = 0
        state.addForm.cat_level = 0
      }
    }
    // 取消添加分类
    const cancelAddCate = () => {
      addFormRef.value.resetFields()
      state.selectedVal = []
      state.addForm.cat_level = 0
      state.addForm.cat_pid = 0
      state.addCateVisible = false
    }
    // 确认添加分类
    const confirmAddCate = () => {
      addFormRef.value.validate(async valid => {
        if (!valid) return
        await addCateRequest(state.addForm)
        cancelAddCate()
        getCateList()
      })
    }
    // 分页器
    const handleSizeChange = (newSize) => {
      state.queryInfo.pagesize = newSize
      getCateList()
    }
    const handleCurrentChange = (newPage) => {
      state.queryInfo.pagenum = newPage
      getCateList()
    }
    // 获取父级分类列表
    const getParentCateList = async () => {
      state.parentCateList = await getParentListReq()
    }
    // 获取分类列表
    const getCateList = async () => {
      const { cateList, total } = await getCateListRequest(state.queryInfo)
      state.cateList = cateList
      state.total = total
    }
    const undevelop = (row) => {
      unDeveloped('功能未开发')
    }
    onMounted(() => {
      getCateList()
      resetTh(tableRef)
    })
    return {
      ...toRefs(state),
      addFormRef,
      tableRef,
      undevelop,
      getCateList,
      handleSizeChange,
      handleCurrentChange,
      handleChange,
      toAddCate,
      cancelAddCate,
      confirmAddCate
    }
  }
}
</script>

<style>
</style>