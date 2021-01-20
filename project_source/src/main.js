import app from '@/plugin/element'
import router from './router'
import store from './store'

/* 导入全局样式 */
import '@/assets/css/global.css'
import { quillEditor } from 'vue3-quill'

app
  .use(store)
  .use(router)
  .use(quillEditor)
  .mount('#app')
