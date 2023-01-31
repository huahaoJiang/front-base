<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div class="avatar">
      <img :src="userStore.avatar" />
      <span style="color: #ecf1fe">{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
import { renderIcon } from '@/utils/icon'

export default defineComponent({
  name: 'avatar',
  setup() {
    const userStore = useUserStore()
    const options = [
      {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon('mdi:exit-to-app', { size: 14 })
      }
    ]

    const handleSelect = (key: string) => {
      if (key === 'logout') {
        $dialog.confirm({
          title: '提示',
          type: 'info',
          content: '确认退出？',
          confirm() {
            userStore.logout()
            $message.success('已退出登录')
          }
        })
      }
    }
    return {
      userStore,
      options,
      handleSelect
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
