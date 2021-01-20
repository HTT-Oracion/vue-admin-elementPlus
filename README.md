# 项目

- 运行项目：

```
进入 project_source 文件夹

npm install 

// 运行
npm start

// 打包
npm run build
```

- 项目API根地址：

```
'http://timemeetyou.com:8889/api/private/v1/'
```

- Token

```
http.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user
}
```

```store```

```
state: {
    user: getItem(USER_TOKEN),
}
```

- 路由守卫  (未登录则不跳转)

```
 import store from '@/store'
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = getItem(USER_TOKEN)
  if (!user) return next('/login')
  next()
})
```

``` axios``` 拦截器

```
const http = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 1000 * 12,
  ...
})
http.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user
  store.commit('setLoading', true)
  NProgress.start()
  return config
})
```

vue3.0 新特性的使用注意：

在组件中 使用store, router：

```
import { useStore } form 'vuex'
import { useRouter} from 'vue-router'
const store = useStore()
const router = useRouter()
```

vue2.x 里 使用 this， 在 vue 3.x 组件里，this 为 ```undefined```, 如果一定要使用 this，方案：

```
import {getCurrentInstance} from 'vue'
const {ctx} = getCurrentInstance()
```

在 vue 2.x  ```this.$http.get(`/login`)```，vue 3.x 中：

```
// main
import axios from 'axios'
app.config.globalProperties.$http = axios

// 组件
import {getCurrentInstance} from 'vue'
const {ctx} = getCurrentInstance()

const getList = asnyc () =>{
  const {data} = await ctx.$http.get('list')
}
```

但是，这只适用于生成环境，在发布环境下，会报错  ```ctx undefined```

我的解决方法： 所有的 请求都进行封装，或者直接组件引入 axios



# 优化

1.  element 按需加载

```
npm install babel-plugin-component -D
```

再```.babelrc```:

```
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-plus",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

2. 路由懒加载

```
{ path: '/home', component: ()=> import('@/view/Home')}
```

3.  引入 loading，nprogress

```
http.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user
  store.commit('setLoading', true)
  NProgress.start()
  return config
})

http.interceptors.response.use(response => {
  const { data } = response
  if (data) {
    store.commit('setLoading', false)
    NProgress.done()
    return response
  }
}, err => Promise.reject(err))
```

4.  引入cdn

修改 vue.config.js

```
module.exports = {
  publicPath: './',
  configureWebpack: {
  externals: {
   vue: 'Vue',
   axios:'axios',
   'vue-router':'VueRouter',
   vuex: 'Vuex',
   'element-plus':'ELEMENT'
  }
  }
}
```

在 index.html 里引入外链：

```
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
...
```

# 缺漏

cdn加速服务 ： https://www.bootcdn.cn/

- echarts和quill都使用的是 vue3- ,没有外链，导致打包体积过大 ,
- nprogress 的没用cdn外链优化

-  由于接口的问题，一些功能暂未实现

- 没有实现响应式
-  一些vue全家桶的功能没用上， 如路由传参，自定义hooks等