<template>
  <my-breadcrumb firstName="商品管理" secondName="分类参数"></my-breadcrumb>
  <el-card>
    <el-alert
      title=" 注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon
      :closable="false"
    >
    </el-alert>
    <el-row class="select-opt">
      <el-col>
        <span>选择商品分类: </span>
        <el-cascader
          v-model="selectedValue"
          :options="paramsList"
          :props="cascaderProps"
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 动态参数 -->
      <el-tab-pane label="动态参数" name="many">
        <el-button
          type="primary"
          size="mini"
          :disabled="isBtnDisable"
          @click="addFormVisible = true"
        >
          添加参数
        </el-button>
        <!-- 动态参数的表格 -->
        <el-table :data="manyTableData" border stripe ref="tableRef">
          <el-table-column type="expand">
            <template #default="scope">
              <el-tag
                closable
                v-for="(item, index) in scope.row.attr_vals"
                :key="index"
                @close="handleClosed(index, scope.row)"
              >
                {{ item }}
              </el-tag>
              <!-- 新tag 文本框 -->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="newTagInput"
                size="small"
                @keyup="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <!-- 添加新 tag 按钮 -->
              <el-button v-else size="small" @click="showInput(scope.row)"
                >+ Mew Tag
              </el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" @click="editParams(scope.row.attr_id)"
                >编辑</el-button
              >
              <el-button type="danger" @click="deleteParams(scope.row.attr_id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 静态属性 -->
      <el-tab-pane label="静态属性" name="only">
        <el-button
          type="primary"
          size="mini"
          :disabled="isBtnDisable"
          @click="addFormVisible = true"
        >
          添加参数
        </el-button>
        <!-- 静态属性的表格 -->
        <el-table :data="onlyTableData" border stripe>
          <el-table-column type="expand">
            <template #default="scope">
              <el-tag
                closable
                v-for="(item, index) in scope.row.attr_vals"
                :key="index"
                @close="handleClosed(index, scope.row)"
              >
                {{ item }}
              </el-tag>
              <!-- 新tag 文本框 -->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="newTagInput"
                size="small"
                @keyup="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <!-- 添加新 tag 按钮 -->
              <el-button v-else size="small" @click="showInput(scope.row)"
                >+ Mew Tag
              </el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" @click="editParams(scope.row.attr_id)"
                >编辑</el-button
              >
              <el-button type="danger" @click="deleteParams(scope.row.attr_id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <!-- 添加参数对话框 -->
  <el-dialog
    :title="'添加' + titleText"
    v-model="addFormVisible"
    width="50%"
    @close="cancelAdd"
  >
    <el-form
      :model="addForm"
      :rules="addParamsRules"
      ref="addFormRef"
      label-width="100px"
    >
      <el-form-item prop="attr_name" :label="titleText">
        <el-input v-model="addForm.attr_name"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="cancelAdd">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 修改参数对话框 -->
  <el-dialog
    :title="'修改' + titleText"
    v-model="editParamsVisible"
    width="50%"
    @close="cancelEdit"
  >
    <el-form
      :model="editForm"
      :rules="editParamsRules"
      ref="editFormRef"
      label-width="100px"
    >
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="editForm.attr_name"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { resetTh } from '@/utils/viewTools'
import { addParamsRules, editParamsRules } from '@/utils/validateRules'
import {
  getParamsListRequest,
  getParamsRequest, addAttrRequest,
  deleteParamsRequest, currentParamRequest,
  editParamsRequest, addParamsRequest
} from '@/api/goods'
export default {
  name: 'Params',
  components: {
    MyBreadcrumb
  },
  setup () {
    const newTagInput = ref('')
    const addFormRef = ref('')
    const editFormRef = ref('')
    const tableRef = ref('')
    const state = reactive({
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedValue: [],
      paramsList: [],
      activeName: 'many',
      manyTableData: [],
      onlyTableData: [],
      // 添加属性的对话框
      addFormVisible: false,
      // 编辑属性的对话框
      editParamsVisible: false,
      addForm: {},
      editForm: {}
    })
    const staticState = {
      addParamsRules,
      editParamsRules
    }
    const catId = computed(() => {
      if (state.selectedValue.length === 3) return Number(state.selectedValue[2])
      return null
    })
    const isBtnDisable = computed(() => {
      if (state.selectedValue.length !== 3) return true
      return false
    })
    const titleText = computed(() => {
      if (state.activeName === 'many') return '动态参数'
      return '静态参数'
    })
    // 确认添加参数
    const confirmAdd = () => {
      addFormRef.value.validate(async valid => {
        if (!valid) return
        await addParamsRequest(catId.value, tate.addForm.attr_name, state.activeName)
        cancelAdd()
        getParamsData()
      })
    }
    // 取消添加参数
    const cancelAdd = () => {
      state.addFormVisible = false
      addFormRef.value.resetFields()
    }
    // 取消编辑
    const cancelEdit = () => {
      state.editParamsVisible = false
      editFormRef.value.resetFields()
    }
    // 确认编辑
    const confirmEdit = () => {
      editFormRef.value.validate(async valid => {
        if (!valid) return
        await editParamsRequest(catId.value, state.editForm, state.activeName)
        getParamsData()
        cancelEdit()
      })
    }
    // 按钮
    // 编辑属性
    const editParams = async (id) => {
      state.editForm = await currentParamRequest(catId.value, id, state.activeName)
      state.editParamsVisible = true
    }
    // 删除属性 
    const deleteParams = async id => {
      const data = await deleteParamsRequest(catId.value, id)
      data && getParamsData()
    }
    const handleChange = () => {
      getParamsData()
    }
    // 切换动态/静态选项卡
    const handleClick = () => {
      getParamsData()
    }
    // 显示 添加新tag 的文本框
    const showInput = (row) => {
      row.inputVisible = true
      nextTick(() => {
        newTagInput.value.focus()
      })
    }
    // 删除tag
    const handleClosed = (index, row) => {
      row.attr_vals.splice(index, 1)
      saveAttr(row)
    }
    // 添加新Tag 的文本框
    const handleInputConfirm = (row) => {
      if (row.inputValue.trim().length === 0) {
        hideInput(row)
        return
      }
      row.attr_vals.push(row.inputValue.trim())
      hideInput(row)
      saveAttr(row)
    }
    // 保存添加的tag
    const saveAttr = async (row) => {
      await addAttrRequest(catId.value, row)
    }
    // 隐藏添加tag的输入框
    const hideInput = (row) => {
      row.inputValue = ''
      row.inputVisible = false
    }
    // 获取动态 / 静态 params 的列表
    const getParamsData = async () => {
      if (state.selectedValue.length !== 3) {
        state.selectedValue = []
        state.manyTableData = []
        state.onlyTableData = []
        return
      }
      const data = await getParamsRequest(catId.value, state.activeName)
      data.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : []
        hideInput(item)
      })
      switch (state.activeName) {
        case "many":
          state.manyTableData = data.data
          break
        case "only":
          state.onlyTableData = data.data
          break
        default:
          break
      }
    }
    // 获取级联选择器的列表
    const getParamsList = async () => {
      state.paramsList = await getParamsListRequest()
    }
    onMounted(() => {
      getParamsList()
      resetTh(tableRef)
    })
    return {
      ...toRefs(state),
      ...staticState,
      newTagInput,
      tableRef,
      addFormRef,
      editFormRef,
      titleText,
      isBtnDisable,
      handleClick,
      handleChange,
      handleClosed,
      handleInputConfirm,
      showInput,
      editParams,
      deleteParams,
      cancelEdit,
      confirmEdit,
      cancelAdd,
      confirmAdd
    }
  }
}
</script>

<style lang="less" scoped>
.select-opt {
  margin: 15px 0;
}
.el-cascader {
  margin-left: 5px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 100px;
}
</style>