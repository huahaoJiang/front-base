<template>
  <div>
    <div class="titles ellipsis">{{ menuTitleRef }}</div>
    <n-menu
      class="side-menu"
      accordion
      ref="sideMenu"
      :indent="18"
      :collapsed-icon-size="22"
      :collapsed-width="64"
      :options="menuOptions"
      :value="(currentRoute.meta && currentRoute.meta.title) || currentRoute.name"
      @update:value="handleMenuSelect"
    ></n-menu>
  </div>
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
  const current = permissionStore.currentMenu
  console.log(current, 32)
  return current.children
})
const menuTitleRef = computed(() => {
  return permissionStore.currentMenuTitle
})

const sideMenu = ref()
watch(currentRoute, val => {
  if (val.path.indexOf('Company') !== -1) {
    sideMenu.value.showOption(val.meta.title)
  }
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
</script>

<style lang="scss" scoped>
.titles {
  font-family: PingFangSC-Medium, sans-serif;
  font-size: 14px;
  color: #333;
  padding: 8px 0px;
  margin: 10px 10px 0 20px;
  width: 120px;
  border-bottom: 1px solid #f5f5f5;
}
.side-menu:not(.n-menu--collapsed) {
  .svg-icon {
    color: #444444;
  }
  :deep(.n-menu-item-content) {
    .n-menu-item-content-header {
      color: #444444;
    }
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected .n-menu-item-content-header,
    &:hover .n-menu-item-content-header {
      color: #6fabc0;
    }
    &:hover .svg-icon {
      color: var(--primaryHoverColor);
    }
  }
}
.n-menu .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content__icon .svg-icon,
.n-menu-item-content--child-active .n-menu-item-content__icon .svg-icon {
  color: var(--primaryColor);
}
</style>
