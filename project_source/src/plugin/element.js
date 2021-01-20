import { createApp } from 'vue'
import App from '@/App'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
import {
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElSubmenu,
  ElRadioGroup,
  ElRadioButton,
  ElCard,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCalendar,
  ElCarousel,
  ElCarouselItem,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElDialog,
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElSwitch,
  ElMessageBox,
  ElSelect,
  ElOption,
  ElTag,
  ElTree,
  ElAlert,
  ElCascader,
  ElTabPane,
  ElTabs,
  ElStep,
  ElSteps,
  ElCheckbox,
  ElCheckboxGroup,
  ElUpload,
  ElTimeline,
  ElTimelineItem,
  ElLoading
} from 'element-plus'
const app = createApp(App)
locale.use(lang)
app.config.globalProperties.$msg = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app
  .use(ElButton)
  .use(ElContainer)
  .use(ElHeader)
  .use(ElAside)
  .use(ElMenu)
  .use(ElMain)
  .use(ElMenuItemGroup)
  .use(ElMenuItem)
  .use(ElSubmenu)
  .use(ElRadioGroup)
  .use(ElRadioButton)
  .use(ElCard)
  .use(ElBreadcrumb)
  .use(ElBreadcrumbItem)
  .use(ElCalendar)
  .use(ElCarousel)
  .use(ElCarouselItem)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElInput)
  .use(ElDialog)
  .use(ElRow)
  .use(ElCol)
  .use(ElTable)
  .use(ElTableColumn)
  .use(ElPagination)
  .use(ElSwitch)
  .use(ElSelect)
  .use(ElOption)
  .use(ElTag)
  .use(ElTree)
  .use(ElAlert)
  .use(ElCascader)
  .use(ElTabPane)
  .use(ElTabs)
  .use(ElStep)
  .use(ElSteps)
  .use(ElCheckbox)
  .use(ElCheckboxGroup)
  .use(ElUpload)
  .use(ElTimeline)
  .use(ElTimelineItem)
  .use(ElLoading)
  .use(ElMessageBox)
export default app
