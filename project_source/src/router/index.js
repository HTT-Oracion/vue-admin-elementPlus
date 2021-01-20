import { createRouter, createWebHistory } from 'vue-router'
import { getItem } from '@/utils/storage'
import { USER_TOKEN } from '@/utils/constants'
import Login from '@/views/Login'
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home', name: 'Home', component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import(/* webpackChunkName: "welcome" */ '@/views/Welcome') },
      { path: '/users', component: () => import(/* webpackChunkName: "user" */ '@/views/User') },
      { path: '/roles', component: () => import(/* webpackChunkName: "roles" */ '@/views/Power/Roles') },
      { path: '/rights', component: () => import(/* webpackChunkName: "rights" */ '@/views/Power/Rights') },
      { path: '/goods', component: () => import(/* webpackChunkName: "goods" */ '@/views/Goods/List') },
      { path: '/goods/add', component: () => import(/* webpackChunkName: "addGood" */ '@/views/Goods/AddGood') },
      { path: '/params', component: () => import(/* webpackChunkName: "params" */ '@/views/Goods/Params') },
      { path: '/categories', component: () => import(/* webpackChunkName: "categories" */ '@/views/Goods/Categories') },
      { path: '/orders', component: () => import(/* webpackChunkName: "orders" */ '@/views/Orders') },
      { path: '/reports', component: () => import(/* webpackChunkName: "report" */ '@/views/Report') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = getItem(USER_TOKEN)
  if (!user) return next('/login')
  next()
})
export default router
