import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/index',
    name: 'index',
    component: Layout,
    hidden: true
  },
  {
    path: '/movie',
    name: 'movie',
    component: Layout,
    meta: {
      title: '电影管理',
      cache: true,
      icon: 'icon-dianyingpiao'
    },
    children: [
      {
        path: 'detail',
        name: 'detail',
        meta: {
          title: '电影详情',
          cache: true,
          icon: 'icon-dianyingpiao'
        }
      },
      {
        path: 'cinema',
        name: 'cinema',
        meta: {
          title: '影院信息',
          cache: true,
          icon: 'icon-yingyuan'
        },
        component: () => import('@/views/movie/cinema.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    meta: {
      title: '用户管理',
      cache: true,
      icon: 'icon-yonghuguanli'
    },
    children: [
      {
        path: 'userfind',
        name: 'userfind',
        meta: {
          title: '用户查询',
          cache: true,
          icon: 'icon-yonghuchaxun'
        },
        component: () => import('@/views/user/index.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Layout,
    meta: {
      title: '订单管理',
      cache: true,
      icon: 'icon-dingdan'
    },
    children: [
      {
        path: 'orderfind',
        name: 'page-name',
        meta: {
          title: '订单查询',
          cache: true,
          icon: 'icon-dingdan'
        },
        component: () => import('@/views/order/index.vue')
      }
    ]
  }
]

const router = createRouter<any>({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login'
      // component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      redirect: '/index',
      component: Layout
    },
    ...routes
  ]
})

export default router
export { routes }
