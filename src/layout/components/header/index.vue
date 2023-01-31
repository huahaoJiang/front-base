<template>
  <header class="header">
    <div class="content">
      <div class="h-left">
        <SideLogo />
        <HeaderMenu />
      </div>
      <div class="h-right">
        <GlobalSearch v-if="showGlobalSearch" />
        <UserAvatar />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import SideLogo from './components/HeaderLogo.vue'
import HeaderMenu from './components/HeaderMenu.vue'
import UserAvatar from './components/UserAvatar.vue'
const router = useRouter()
const showGlobalSearch = computed(() => {
  return router.hasRoute('GlobalSearch')
})
</script>

<style lang="scss" scoped>
.header {
  padding: 0 15px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #054163;
  .content {
    width: 1310px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    .h-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 838px;
    }
    .h-right {
      display: flex;
      width: 430px;
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
.tabs__header {
  position: relative;
  transition: all 0.15s linear;
  &:after {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    bottom: -2px;
    width: 28px;
    height: 4px;
    background-color: #faa706;
  }
}
:deep(.n-menu-item-content--selected) {
  @extend .tabs__header;
}
:deep(.n-menu-item-content--child-active) {
  @extend .tabs__header;
}
</style>
