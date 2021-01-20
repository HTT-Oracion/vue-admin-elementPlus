import {
  ElMessage,
  ElMessageBox
} from 'element-plus'

const successMsg = (msg, show) => {
  ElMessage({
    message: msg,
    type: 'success',
    showClose: show || false
  })
}
const errMsg = (msg, show) => {
  ElMessage({
    message: msg,
    type: 'warning',
    showClose: show || false
  })
}
const infoMsg = (msg, show) => {
  ElMessage({
    message: msg,
    type: 'info',
    showClose: show || false
  })
}

// MessageBox
const confirm = (mainTitle, tip, type = 'warning') => {
  return ElMessageBox.confirm(mainTitle, tip, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  }).catch(err => err)
}

// 表头错位
const resetTh = (table) => {
  setTimeout(() => {
    table.value.doLayout()
  }, 0);
}

// 未开发提示
const unDeveloped = (msg, show) => {
  return infoMsg(msg, show)
}
// 格式化时间
const formatDate = (dateTime) => {
  const date = new Date(dateTime)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const h = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${y}-${m} ${h}:${mm}:${ss}`
}
export {
  successMsg,
  errMsg,
  infoMsg,
  confirm,
  resetTh,
  unDeveloped,
  formatDate
}