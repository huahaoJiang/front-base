<template>
  <div mt-35 w-full>
    <n-input
      v-model:value="loginInfo.name"
      autofocus
      class="text-16 items-center h-50 pl-10"
      placeholder="请输入用户名"
      :maxlength="20"
    >
    </n-input>
  </div>
  <div class="mt-35 w-full">
    <n-input
      v-model:value="loginInfo.password"
      class="text-16 items-center h-50 pl-10"
      type="password"
      show-password-on="mousedown"
      placeholder="密码"
      :maxlength="20"
      @keydown.enter="handleLogin"
    ></n-input>
  </div>
  <!--  <div class="mt-30px w-full">
    <n-button text @click="fsLogin" class="color-#666">飞书授权</n-button>
  </div>-->
  <div class="w-full mt-55px">
    <n-button class="w-285px h-40 rounded-5 text-16" type="primary" @click="handleLogin">登录</n-button>
  </div>
</template>

<script setup lang="ts">
import { createLocalStorage } from '@utils/cache'
import { setRefreshToken, setToken } from '@utils/token'

import { loginByUsername } from '@/api/auth'
import { useUserStore } from '@/store/user'

const router = useRouter()
const query = unref(router.currentRoute).query

const userStore = useUserStore()
const loginInfo = ref({
  name: '',
  password: ''
})
const ls = createLocalStorage({ prefixKey: 'login_' })
const lsLoginInfo = ls.get('loginInfo')
if (lsLoginInfo) {
  loginInfo.value.name = lsLoginInfo.name || ''
  loginInfo.value.password = lsLoginInfo.password || ''
}
async function handleLogin() {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    $message.loading('正在验证...')
    const res = await loginByUsername({ account: name, password: password.toString(), refreshToken: false })
    if (res.code === 200) {
      const data = res.data
      $message.success('登录成功')
      ls.set('loginInfo', { name, password })
      setToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      userStore.setUserInfo({ id: data.userId, name: data.userName, avatar: data.avatar, role: [] })
      const baseUrl = window.location.origin + import.meta.env.VITE_PUBLIC_PATH
      if (query.redirect) {
        window.location.href = baseUrl + (query.redirect as string).substring(1)
      } else {
        window.location.href = baseUrl
      }
    } else {
      $message.warning(res.msg as string)
    }
  } catch (error: any) {
    $message.error(error.message)
  }
}
/*function fsLogin() {
  const redirectUrl = 'http://192.168.5.155:8443/oauth/render/feishu'
  window.location.href = redirectUrl
}*/
</script>

<style scoped></style>
