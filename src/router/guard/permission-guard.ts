import type { Router, RouteRecordRaw } from 'vue-router'

import { NOT_FOUND_ROUTE } from '@/router/routes'
import { usePermissionStore } from '@/store/permission'
import { toLogin } from '@/utils/auth'
import { getToken, refreshAccessToken, removeToken } from '@/utils/token'

const WHITE_LIST = ['/login', '/login/redirect']

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStore()
  router.beforeEach(async (to: any, from: any, next: any) => {
    // 空白跳转页逻辑
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        next()
      } else {
        if (permissionStore.menus?.length) {
          // 已经拿到菜单信息
          await refreshAccessToken()
          if (to.path.startsWith('/track')) {
            permissionStore.setDetailMenu()
            if (from.query.code && !to.query.code) {
              const queryKeys = Object.keys(to.query)
              to.fullPath = queryKeys.length
                ? to.fullPath + '&code=' + from.query.code
                : to.fullPath + '?code=' + from.query.code
              to.query.code = from.query.code
            }
          } else {
            permissionStore.setCurrentMenu(to.path)
          }
          next()
        } else {
          if (!permissionStore.menus) {
            next()
          } else {
            await permissionStore
              .getCurrentMenus()
              .then(res => {
                if (res) {
                  const accessRoutes = permissionStore.generateRoutes()
                  accessRoutes.forEach(route => {
                    !router.hasRoute(route.name) && router.addRoute(route as RouteRecordRaw)
                  })
                  router.addRoute(NOT_FOUND_ROUTE)
                  next({ ...to, replace: true })
                } else {
                  next('/error-page/403')
                }
              })
              .catch(error => {
                removeToken()
                toLogin()
                $message.error(error.message || '获取菜单信息失败！')
                return
              })
          }
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }
  })
}
