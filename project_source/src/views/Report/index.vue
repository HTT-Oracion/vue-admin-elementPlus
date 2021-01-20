<template>
  <my-breadcrumb firstName="数据统计" secondName="数据报表"></my-breadcrumb>
  <el-card>
    <v-echarts :option="realOptions" style="width: 600px; height: 400px" />
  </el-card>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { onMounted, reactive, toRefs } from 'vue'
import { VEcharts } from 'vue3-echarts'
import { getReportRequest } from '@/api/report'
export default {
  name: 'Report',
  components: {
    MyBreadcrumb,
    VEcharts
  },
  setup () {
    const state = reactive({
      realOptions: {}
    })
    const options = {
      title: {
        text: '用户来源'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#E9EEF3'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ]
    }
    const getEchartData = async () => {
      state.realOptions = await getReportRequest(options)
    }
    onMounted(() => {
      getEchartData()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
</style>