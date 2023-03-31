import type { IRoute } from '@/interface/router'
import EntityLayout from '@/layout/entityDetail.vue'

export const basicRoutes: IRoute[] = [
  {
    path: '/',
    name: 'Layout',
    component: EntityLayout,
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: EntityLayout,
    children: [
      {
        name: 'homeIndex',
        path: '',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    name: 'REDIRECT',
    path: '/redirect',
    component: EntityLayout,
    isHidden: true,
    children: [
      {
        name: 'REDIRECT_NAME',
        path: '',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    name: 'ErrorPage',
    path: '/error-page',
    component: EntityLayout,
    redirect: '/error-page/404',
    meta: {
      title: '错误页',
      icon: 'mdi:alert-circle-outline',
      index: 4
    },
    children: [
      {
        name: 'ERROR-404',
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          title: '404',
          icon: 'mdi:alert-circle-outline'
        }
      },
      {
        name: 'ERROR-403',
        path: '403',
        component: () => import('@/views/error-page/403.vue'),
        meta: {
          title: '没有权限',
          icon: 'mdi:alert-circle-outline'
        }
      },
      {
        name: 'ERROR-500',
        path: '500',
        component: () => import('@/views/error-page/500.vue'),
        meta: {
          title: '内部错误',
          icon: 'mdi:alert-circle-outline'
        }
      }
    ]
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    isHidden: true,
    meta: {
      title: '403',
      icon: 'mdi:alert-circle-outline'
    }
  },
  {
    name: '500',
    path: '/500',
    isHidden: true,
    component: () => import('@/views/error-page/500.vue'),
    meta: {
      title: '500',
      icon: 'mdi:alert-circle-outline'
    }
  },
  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页'
    },
    beforeEnter: to => {
      const query = to.query
      if (query.redirect && query.redirect.indexOf('error-page') !== -1) {
        delete to.query.redirect
      }
    }
  }
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/error-page/404',
  isHidden: true
}
