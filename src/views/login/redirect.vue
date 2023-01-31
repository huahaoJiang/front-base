<template></template>
<script setup lang="ts">
import { setRefreshToken, setToken } from '@utils/token'

import { loginByQrCode } from '@/api/auth'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const router = useRouter()
const query = unref(router.currentRoute).query
async function handleLogin() {
  try {
    $message.loading('正在验证...')
    const res = await loginByQrCode({ code: query.code as string, refreshToken: false })
    if (res.code === 200) {
      const data = res.data
      $message.success('登录成功')
      setToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      userStore.setUserInfo({ id: data.userId, name: data.userName, avatar: data.avatar, role: [] })
      if (query.redirect) {
        window.location.href = query.redirect as string
      } else {
        router.push('/')
      }
    } else {
      $message.warning(res.msg as string)
      reLogin()
    }
  } catch (error: any) {
    $message.error(error.message)
    reLogin()
  }
}

if (query.code) {
  handleLogin()
} else {
  $message.error('缺少参数：code')
  reLogin()
}
function reLogin() {
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}
</script>
