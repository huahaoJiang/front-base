<template>
  <n-menu
    class="header-menu"
    mode="horizontal"
    accordion
    :options="menuOptions"
    :value="currentRoute.meta && currentRoute.meta.highlight ? currentRoute.meta.highlight : currentRoute.meta.title"
    @update:value="handleMenuSelect"
    @click="handleClick"
  ></n-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
import { isExternal } from '@/utils/is'

const router = useRouter()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const { currentRoute } = router
const menuOptions = computed(() => {
  return permissionStore.menus?.sort((a, b) => a.index - b.index) || []
})

function handleMenuSelect(key: string, item: any) {
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    if (item.path === currentRoute.value.path && !currentRoute.value.meta?.keepAlive) {
      appStore.reloadPage()
    } else {
      router.push(item.path)
    }
  }
}
function handleClick(e: any) {
  const MenuName = e.target.outerText
  const routes = router.getRoutes().filter(route => route.meta.title === MenuName)
  if (routes.length > 1) {
    routes.forEach(item => {
      if (item.meta.isTop) {
        router.push(item)
      }
    })
  } else {
    if (routes[0]?.children.length) {
      router.push(routes[0])
    }
  }
}
</script>
<style scoped lang="scss">
:deep(.n-menu-item) {
  .n-menu-item-content {
    height: 60px;
  }
  height: 60px;
}

:deep(.n-menu-item-content__icon) {
  width: 0px !important;
}
:deep(.n-menu-item-content-header) {
  padding: 8px 6px;
  font-family: PingFangSC-Light, sans-serif;
  font-weight: 500;
}
:deep(.n-menu-item-content--child-active .n-menu-item-content-header) {
  font-family: PingFangSC-Regular, sans-serif;
}
</style>
