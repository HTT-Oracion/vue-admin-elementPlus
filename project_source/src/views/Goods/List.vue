<template>
  <my-breadcrumb firstName="商品管理" secondName="商品列表"></my-breadcrumb>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          v-model="queryInfo.query"
          placeholder="请输入内容"
          clearable
          @clear="getGoodsList"
          @keyup.enter="getGoodsList"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="getGoodsList"></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="toAddPage">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table :data="goodsList" border stripe ref="tableRef">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column
        label="商品价格"
        prop="goods_price"
        width="95px"
      ></el-table-column>
      <el-table-column
        label="商品重量"
        prop="goods_weight"
        width="80px"
      ></el-table-column>
      <el-table-column label="创建时间" width="140px">
        <template #default="scope">
          {{ format(scope.row.add_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >
            编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.goods_id)"
          >
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 12]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getGoodsRequest, deleteGoodRequest } from '@/api/goods'
import { resetTh, unDeveloped, formatDate } from '@/utils/viewTools'
import MyBreadcrumb from '@/components/MyBreadcrumb'
export default {
  name: 'Goods',
  components: {
    MyBreadcrumb
  },
  setup () {
    const router = useRouter()
    const tableRef = ref('')
    const state = reactive({
      goodsList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    })
    const format = (dateTime) => {
      return formatDate(dateTime)
    }
    // 前往添加页面
    const toAddPage = () => {
      router.push('/goods/add')
    }
    // 操作按钮
    // 编辑
    const handleEdit = () => {
      unDeveloped('该功能暂未开发!')
    }
    // 删除
    const handleDelete = async (id) => {
      const data = await deleteGoodRequest(id)
      data && getGoodsList()
    }
    // 分页器
    const handleSizeChange = (newSize) => {
      state.queryInfo.pagesize = newSize
      getGoodsList()
    }
    const handleCurrentChange = (newPage) => {
      state.queryInfo.pagenum = newPage
      getGoodsList()
    }
    const getGoodsList = async () => {
      const { goodsList, total } = await getGoodsRequest(state.queryInfo)
      state.goodsList = goodsList
      state.total = total
    }
    onMounted(() => {
      getGoodsList()
      resetTh(tableRef)
    })
    return {
      ...toRefs(state),
      tableRef,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      getGoodsList,
      toAddPage,
      format
    }
  }
}
</script>

<style>
</style>