<template>
  <my-breadcrumb firstName="订单管理" secondName="订单列表"></my-breadcrumb>
  <el-card>
    <el-row>
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getOrderList"
          @keyup.enter="getOrderList"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="getOrderList"></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="orderList" border striped style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号"> </el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="100px">
      </el-table-column>
      <el-table-column label="是否付款" width="100px">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.pay_status === '1'"
            >已付款</el-tag
          >
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100px">
      </el-table-column>
      <el-table-column label="下单时间" width="120px">
        <template #default="scope">
          {{ format(scope.row.update_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="addressVisible = true"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-location"
            size="mini"
            @click="showExpressDetail(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      border
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
  <!-- 地址 -->
  <el-dialog
    title="修改地址"
    v-model="addressVisible"
    width="50%"
    @close="cancelEditAddr"
  >
    <el-form
      :model="addrForm"
      :rules="addrRules"
      label-width="100px"
      ref="addrFormRef"
    >
      <el-form-item label="省市区/县" prop="addr1">
        <el-cascader
          v-model="selectedVal"
          :options="cityData"
          :props="cityProps"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="addr2">
        <el-input v-model="addrForm.addr2"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelEditAddr">取 消</el-button>
        <el-button type="primary" @click="cancelEditAddr">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 物流进度 -->
  <el-dialog title="物流信息" v-model="expressVisible" width="50%">
    <!-- <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline> -->
  </el-dialog>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { formatDate } from '@/utils/viewTools'
import { addrRules } from '@/utils/validateRules'
import { getOrdersRequest, getExpressRequest } from '@/api/order'
import cityData from '@/utils/cityData'
export default {
  name: 'Orders',
  components: {
    MyBreadcrumb
  },
  setup () {
    const addrFormRef = ref('')
    const state = reactive({
      orderList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      addressVisible: false,
      addrForm: {
        addr1: [],
        addr2: ''
      },
      addrRules,
      selectedVal: [],
      cityData,
      cityProps: {
        expandTrigger: 'hover'
      },
      // 物流信息
      expressVisible: false,
      expressList: []
    })

    // 取消编辑地址
    const cancelEditAddr = () => {
      state.addressVisible = false
      state.selectedVal = []
      state.addrForm = {}
    }
    const showExpressDetail = (row) => {
      getExpressList()
    }
    const closeExpressDialog = () => {
      state.expressVisible = false
      state.expressList = []
    }
    // 分页器
    const handleSizeChange = (newSize) => {
      state.queryInfo.pagesize = newSize
      getOrderList()
    }
    const handleCurrentChange = (newPage) => {
      state.queryInfo.pagenum = newPage
      getOrderList()
    }
    // 获取物流信息
    const getExpressList = async () => {
      await getExpressRequest()
    }
    const getOrderList = async () => {
      const { orderList, total } = await getOrdersRequest(state.queryInfo)
      state.orderList = orderList
      state.total = total
      console.log('orderList', state.orderList);
    }
    const format = (dateTime) => {
      return formatDate(dateTime)
    }

    onMounted(() => {
      getOrderList()
    })
    return {
      ...toRefs(state),
      addrFormRef,
      format,
      handleSizeChange,
      handleCurrentChange,
      getOrderList,
      getExpressList,
      cancelEditAddr,
      showExpressDetail,
      closeExpressDialog
    }
  }
}
</script>

<style lang="less" scoped>
</style>