import { refreshToken } from '@/api/auth'
import { useUserStore } from '@/store/user'

import { createLocalStorage } from './cache'

const TOKEN_CODE = 'access_token'
const REFRESH_TOKEN_CODE = 'refresh_token'
const DURATION = 24 * 60 * 60

export const lsToken = createLocalStorage()

export function getToken() {
  return lsToken.get(TOKEN_CODE)
}

export function setToken(token: string) {
  lsToken.set(TOKEN_CODE, token, DURATION)
}

export function setRefreshToken(token: string) {
  lsToken.set(REFRESH_TOKEN_CODE, token, DURATION)
}

export function removeToken() {
  lsToken.remove(TOKEN_CODE)
}

export async function refreshAccessToken() {
  const tokenItem = lsToken.getItem(TOKEN_CODE)
  const refreshTokenItem = lsToken.getItem(REFRESH_TOKEN_CODE)
  if (!tokenItem) {
    return
  }
  const { time } = tokenItem
  // token生成或者刷新后60分钟内不执行刷新
  if (new Date().getTime() - time <= 1000 * 60 * 60) return
  console.log(tokenItem, refreshTokenItem, 30)
  try {
    const res = await refreshToken(refreshTokenItem.value)
    if (res.code === 200) {
      const userStore = useUserStore()
      const data = res.data
      userStore.setUserInfo({ id: data.userId, name: data.userName, avatar: data.avatar, role: [] })
      setToken(data.accessToken)
      setRefreshToken(data.refreshToken)
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
