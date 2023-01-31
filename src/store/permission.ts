import { createSessionStorage } from '@utils/cache'
import { renderMenuIcon } from '@utils/icon'
import { defineStore } from 'pinia'

import { getMenu } from '@/api/auth'
import type { IMenuItem, IRoute } from '@/interface/router'
import { DetailMenu } from '@/interface/router'
import { asyncRoutes, excludeConfigRoutes } from '@/router/view'
import { detailRoutes } from '@/router/view/detail'

const storage = createSessionStorage()
const currentMenuKey = 'CURRENT_MENU'
const specIconCodes = ['informationIndex', 'informationTopic', 'assessment']

function translateMenus(menus: Tz.Api.System.Menu.Routes.MenuItem[]): IMenuItem[] {
  return menus.map(menu => {
    return {
      label: menu.name,
      key: menu.name,
      path: menu.path,
      code: menu.code,
      icon: specIconCodes.includes(menu.code)
        ? renderMenuIcon(menu.code, '14px', 'margin-top:-2px')
        : renderMenuIcon(menu.code),
      index: menu.sort,
      children: menu.children ? translateMenus(menu.children) : undefined
    }
  })
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      accessRoutes: [] as IRoute[],
      menus: [] as IMenuItem[] | null,
      tracksMenu: DetailMenu as IMenuItem,
      currentMenu: (storage.get(currentMenuKey) || {}) as IMenuItem
    }
  },
  getters: {
    currentMenuTitle(state) {
      return state.currentMenu.label
    }
  },
  actions: {
    generateRoutes(): IRoute[] {
      const routeConnectMap: Record<string, IRoute[]> = {
        Insight: detailRoutes
      }
      const routerList: IRoute[] = []
      const routes = asyncRoutes
        .filter(route => {
          return !!this.menus?.find(menu => route.name === menu.code)
        })
        .map(route => {
          if (Object.keys(routeConnectMap).includes(route.name)) {
            routerList.push(...routeConnectMap[route.name])
            delete routeConnectMap[route.name]
          }
          return route
        })
      routerList.unshift(...routes)
      return this.isExcludeRouterAppend(routerList, routeConnectMap)
    },
    // 写死判断是否添加全局搜索路由
    isExcludeRouterAppend(routerList: IRoute[], routeConnectMap: Record<string, IRoute[]>) {
      const nameList = Object.keys(routeConnectMap)
      if (!nameList.length) {
        return routerList.concat(excludeConfigRoutes)
      } else {
        return routerList
      }
    },
    async getCurrentMenus() {
      const res = await getMenu()
      if (res.code === 200) {
        if (res.data.length) {
          this.menus = translateMenus(res.data[0].children || [])
          if (this.menus) {
            this.currentMenu = this.menus[0]
            storage.set(currentMenuKey, this.menus[0])
          }
          return true
        } else {
          this.menus = null
          return false
        }
      }
    },
    setCurrentMenu(path: IMenuItem['path']) {
      if (path !== this.currentMenu?.path && !path.startsWith(this.currentMenu?.path)) {
        const currentMenu = this.menus?.find(menu => menu.path === path || path.startsWith(menu.path))
        if (currentMenu) {
          this.currentMenu = currentMenu
          storage.set(currentMenuKey, currentMenu)
        }
      }
    },
    setTracksMenu(menu: IMenuItem = DetailMenu) {
      this.tracksMenu = menu
      this.setDetailMenu()
    },
    setDetailMenu() {
      this.currentMenu = this.tracksMenu
      storage.set(currentMenuKey, this.tracksMenu)
    }
  }
})
