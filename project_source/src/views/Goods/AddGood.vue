<template>
  <my-breadcrumb firstName="商品管理" secondName="添加商品"></my-breadcrumb>
  <el-card>
    <el-alert
      title="消息提示的文案"
      type="info"
      center
      show-icon
      :closable="false"
    >
    </el-alert>
    <el-steps
      :space="200"
      :active="activeIndex - 0"
      finish-status="success"
      align-center
    >
      <el-step title="基本信息" name="0"></el-step>
      <el-step title="商品参数" name="1"></el-step>
      <el-step title="商品属性" name="2"></el-step>
      <el-step title="商品图片" name="3"></el-step>
      <el-step title="商品内容" name="4"></el-step>
      <el-step title="完成" name="5"></el-step>
    </el-steps>
    <!-- 表单 -->
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="addFormRules"
      label-width="100px"
      label-position="top"
    >
      <el-tabs
        v-model="activeIndex"
        :tab-position="'left'"
        :before-leave="beforeTabLeave"
        @tab-click="tabClicked"
      >
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addForm.goods_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addForm.goods_cat"
              :options="cateList"
              :props="cateListProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form-item
            v-for="item in manyList"
            :key="item.attr_id"
            :label="item.attr_name"
          >
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                v-for="(val, i) in item.attr_vals"
                :label="val"
                :key="i"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <el-form-item
            :label="item.attr_name"
            v-for="item in onlyList"
            :key="item.attr_id"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            :action="actionURL"
            :headers="headerObj"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor
            v-model:value="addForm.goods_introduce"
            :options="editorOption"
            :disabled="editorDisabled"
          />
          <el-button type="primary" class="addBtn" @click="confirmAddGood"
            >添加商品</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
  <!-- 图片对话框 -->
  <el-dialog title="图片预览" v-model="dialogVisible" width="50%">
    <img :src="previewPath" alt="" style="width: 100%" />
  </el-dialog>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { addGoodsRules } from '@/utils/validateRules'
import { getItem } from '@/utils/storage'
import { errMsg } from '@/utils/viewTools'
import { getCorrectParams, getParamsListRequest } from '@/api/goods'
import { addGoodRequest } from '@/api/goods/add'
import { useRouter } from 'vue-router'
import _ from 'lodash'
export default {
  name: 'AddGood',
  components: {
    MyBreadcrumb
  },
  setup () {
    const router = useRouter()
    const addFormRef = ref('')
    const catId = computed(() => {
      if (state.addForm.goods_cat.length === 3) return state.addForm.goods_cat[2]
      return null
    })
    const state = reactive({
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addFormRules: addGoodsRules,
      cateListProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      cateList: [],
      // 动态参数列表
      manyList: [],
      // 静态参数列表
      onlyList: [],
      actionURL: 'http://timemeetyou.com:8889/api/private/v1/upload',
      headerObj: {
        Authorization: getItem('token')
      },
      dialogVisible: false,
      previewPath: '',
      //富文本编辑器value
      content: '',
      editorDisabled: false,
      editorOption: {
        placeholder: 'core',
        modules: {
        }
      }
    })

    const handleData = (data, type, form) => {
      switch (type) {
        case 'many':
          data.map(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(' ')
            }
            form.attrs.push(newInfo)
          })
          break
        case 'only':
          data.map(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            }
            form.attrs.push(newInfo)
          })
          break
        default:
          break;
      }
    }
    // 添加商品
    const confirmAddGood = () => {
      addFormRef.value.validate(async valid => {
        if (!valid) return errMsg('请填写必要项')
        handleData(state.manyList, 'many', state.addForm)
        handleData(state.onlyList, 'only', state.addForm)
        const form = _.cloneDeep(state.addForm)
        form.goods_cat = form.goods_cat.join(',')
        // console.log(form);
        await addGoodRequest(form, router)
      })
    }
    // 图片上传的相关函数
    const handlePreview = ({ response }) => {
      state.previewPath = response.data.url
      state.dialogVisible = true
      console.log('preview img', response.data.url);
    }
    const handleRemove = ({ response }) => {
      const index = state.addForm.pics.findIndex(i => i.pic = response.data.tmp_path)
      if (index !== -1) state.addForm.pics.splice(index, 1)
      console.log('remove success', state.addForm.pics);
    }
    const handleSuccess = (res) => {
      const picInfo = {
        pics: res.data.tmp_path
      }
      state.addForm.pics.push(picInfo)
      console.log('upload success', state.addForm.pics);
    }
    // 级联选择器 change
    const handleChange = () => {
      if (state.addForm.goods_cat.length !== 3) {
        state.addForm.goods_cat = []
      }
    }
    // tab before-leave
    const beforeTabLeave = (active, prevActive) => {
      // console.log(active, prevActive);
      if (prevActive === '0' && state.addForm.goods_cat.length !== 3) {
        errMsg('请选择商品分类')
        return false
      }
    }
    // 点击tab触发的事件
    const tabClicked = () => {
      console.log(state.activeIndex);
      switch (state.activeIndex) {
        case '1':
          getManyList()
          break
        case '2':
          getOnlyList()
          break
        default:
          break
      }
    }
    const getManyList = async () => {
      state.manyList = await getCorrectParams(catId.value, 'many')
      console.log('动态参数', state.manyList);
    }
    const getOnlyList = async () => {
      state.onlyList = await getCorrectParams(catId.value, 'only')
      console.log('静态属性', state.onlyList);
    }
    const getCateList = async () => {
      state.cateList = await getParamsListRequest()
    }
    onMounted(() => {
      getCateList()
    })
    return {
      ...toRefs(state),
      addFormRef,
      tabClicked,
      beforeTabLeave,
      handleChange,
      handlePreview,
      handleRemove,
      handleSuccess,
      confirmAddGood
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.addBtn {
  margin-top: 10px;
}
</style>