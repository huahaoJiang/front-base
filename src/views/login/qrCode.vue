<template>
  <div style="height: 273px">
    <!--    <div class="color-#999 text-12pxt text-center">请使用飞书移动端扫描二维码</div>-->
    <div class="mt-26px" id="login_container"></div>
  </div>
</template>
<script setup>
const redirectUrl = import.meta.env.VITE_REDIRECT_URL
const clientId = import.meta.env.VITE_APP_ID
const goto = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&state=STATE`
let QRLoginObj = null

const handleMessage = function (event) {
  const origin = event.origin
  if (QRLoginObj.matchOrigin(origin)) {
    let loginTmpCode = event.data
    window.location.href = `${goto}&tmp_code=${loginTmpCode}`
  }
}
if (typeof window.addEventListener != 'undefined') {
  window.addEventListener('message', handleMessage, false)
} else if (typeof window.attachEvent != 'undefined') {
  window.attachEvent('onmessage', handleMessage)
}

onMounted(() => {
  initQrCode()
})
onUnmounted(() => {
  destroyQrCode()
})
function initQrCode() {
  if (QRLoginObj === null) {
    QRLoginObj = window.QRLogin({
      id: 'login_container',
      goto: goto,
      width: '250',
      height: '260',
      style: 'padding:4px;border: 0;margin-top: -10px;'
    })
  }
}

function destroyQrCode() {
  QRLoginObj = null
  window.addEventListener('message', null)
  window.attachEvent = null
}
</script>
