import { toLogin } from '@utils/auth'
import { createLocalStorage } from '@utils/cache'
import { removeToken } from '@utils/token'
import { defineStore } from 'pinia'

import type { IUserInfo } from '@/interface/user'
import { resetRouter } from '@/router'
import { usePermissionStore } from '@/store/permission'

const storage = createLocalStorage()

const userInfoKey = 'USER_INFO'
export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: (storage.get(userInfoKey) || {}) as IUserInfo
    }
  },
  getters: {
    userId(state) {
      return state.userInfo.id
    },
    name(state) {
      return state.userInfo.name
    },
    avatar(state) {
      return state.userInfo.avatar
    },
    role(state) {
      return state.userInfo.role || []
    }
  },
  actions: {
    getUserInfo(): IUserInfo {
      if (this.userId) {
        return this.userInfo
      } else {
        return storage.get(userInfoKey)
      }
    },
    logout(): void {
      removeToken()
      const permission = usePermissionStore()
      permission.menus = []
      permission.setCurrentMenu('')
      storage.clear()
      resetRouter()
      toLogin()
    },
    setUserInfo(userInfo = {} as IUserInfo): void {
      this.userInfo = userInfo
      storage.set(userInfoKey, userInfo)
    }
  }
})
