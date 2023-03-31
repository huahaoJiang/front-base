<template>
  <n-layout style="height: 100%; background-color: #f5f5f5">
    <n-layout-header :style="{ height: useTheme.header.height + 'px' }">
      <AppHeader />
    </n-layout-header>
    <div id="layout" class="entity__layout">
      <n-layout
        has-sider
        style="width: 1284px; margin: 0 auto; min-height: 100%; background-color: #f5f5f5"
        :style="{ paddingTop: 7 + 'px' }"
        :native-scrollbar="false"
        class="document-scroll-container"
      >
        <Watermark><AppMain /></Watermark>
      </n-layout>
      <n-layout-footer class="footer">
        <div>京ICP备20006013号-3</div>
      </n-layout-footer>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/theme'

import AppMain from './components/AppMain.vue'
import AppHeader from './components/header/index.vue'
import Watermark from './components/watermark.vue'

const useTheme = useThemeStore()
</script>

<style lang="scss" scoped>
#layout {
  transition: all 0.3s linear;
}
.n-layout-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.entity__layout {
  height: calc(100vh - 60px);
  width: 100%;
  overflow: auto;
  position: relative;
  transition: all 0.15s linear;
}
</style>
