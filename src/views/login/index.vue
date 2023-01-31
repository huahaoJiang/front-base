<!--
<template>
  <div class="login-bg" f-c-c>
    <div class="w-585px h-330px"></div>
    <div class="login-wrapper" flex>
      <div class="p-40 border-r border-transparent l-content">
        <img src="@/assets/images/banner.png" height="120" alt="login_banner" />
      </div>

      <div class="w-full f-c-c flex-col bg-white r-content">
        <h5 class="w-full p-12 text-20 color-#333 font-weight">{{ title }}</h5>
        <div class="cut-way">
          <n-image
            preview-disabled
            class="cursor cut-img"
            v-if="currentWay === LoginWay.user"
            :src="CutToQr"
            :width="50"
            @click="handleCutWay(LoginWay.qr)"
          />
          <n-image
            preview-disabled
            class="cursor cut-img"
            :src="CutToUser"
            v-if="currentWay === LoginWay.qr"
            :width="50"
            @click="handleCutWay(LoginWay.user)"
          />
        </div>
        <UserWay v-if="currentWay === LoginWay.user" />
        <QrWay v-show="currentWay === LoginWay.qr" />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CutToQr from '@/assets/images/login/toQrCode.png'
import CutToUser from '@/assets/images/login/toUser.png'
import { useLoginStore } from '@/store/login'

import QrWay from './qrCode.vue'
import UserWay from './user.vue'

enum LoginWay {
  user = 'user',
  qr = 'qr'
}
const currentWay = ref(LoginWay.qr)
const title = ref('飞书扫码登录')

const loginStore = useLoginStore()
const router = useRouter()
const query = unref(router.currentRoute).query
const baseUrl = window.location.origin + import.meta.env.VITE_PUBLIC_PATH
if (query.redirect) {
  let url = baseUrl + (query.redirect as string).substring(1)
  loginStore.setRedirect(url)
} else {
  loginStore.setRedirect(baseUrl)
}

function handleCutWay(way: LoginWay) {
  currentWay.value = way
  switch (way) {
    case LoginWay.user:
      title.value = '欢迎登录'
      break
    case LoginWay.qr:
      title.value = '飞书扫码登录'
      break
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  height: 100vh;
  background-image: url(@/assets/images/login_bg.png);
  background-size: cover;
}

.login-wrapper {
  border-radius: 8px;
  box-shadow: 1.5px 3.99px 27px 0px rgb(0 0 0 / 10%);
  background-color: rgba(255, 255, 255, 0.2);
}
.l-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  flex-shrink: 0;
}
.r-content {
  position: relative;
  padding: 20px 40px 60px 40px;
  width: 300px;
  border-radius: 8px;
}
.cut-way {
  position: absolute;
  right: 20px;
  top: 20px;
}
.cut-img {
  opacity: 0.7;
  transition: all 0.15s linear;
  &:hover {
    opacity: 1;
  }
}
</style>
-->
