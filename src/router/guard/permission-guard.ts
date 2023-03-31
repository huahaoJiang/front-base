import type { Router } from 'vue-router'

import { getToken } from '@/utils/token'

const WHITE_LIST = ['/login', '/login/redirect']

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to: any, from: any, next: any) => {
    // 空白跳转页逻辑
    const token = getToken()
    if (token) {
      // 判断拦截
      next()
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }
  })
}
