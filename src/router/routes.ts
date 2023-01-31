import type { IRoute } from '@/interface/router'
import EntityLayout from '@/layout/entityDetail.vue'
import Layout from '@/layout/index.vue'
import { useLoginStore } from '@/store/login'

export const basicRoutes: IRoute[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/desk'
  },
  {
    name: 'REDIRECT',
    path: '/redirect',
    component: Layout,
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
  },
  {
    name: 'LoginRedirect',
    path: '/login/redirect',
    component: () => import('@/views/login/redirect.vue'),
    meta: {
      title: '空白页'
    },
    beforeEnter: to => {
      const redirect = useLoginStore().redirect
      if (redirect) {
        to.query = { ...to.query, redirect }
      }
    }
  },
  {
    name: 'generateLogo',
    path: '/generateLogo',
    component: EntityLayout,
    redirect: '/generateLogo/index',
    meta: {
      title: 'logo'
    },
    children: [
      {
        name: 'generateLogoIndex',
        path: 'index',
        component: () => import('@/views/generateLogo/index.vue'),
        meta: {
          title: '生成logo'
        }
      }
    ],
    isHidden: true
  }
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/error-page/404',
  isHidden: true
}

// const modules = import.meta.globEager('./modules/*.js')
// const asyncRoutes: IRoute[] = []
// Object.keys(modules).forEach(key => {
//   asyncRoutes.push(...modules[key].default)
// })
//
// export { asyncRoutes }
