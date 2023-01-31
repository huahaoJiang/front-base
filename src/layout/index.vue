<template>
  <n-layout style="height: 100%; background-color: #f5f5f5">
    <n-layout-header :style="{ height: useTheme.header.height + 'px' }">
      <AppHeader />
    </n-layout-header>

    <div style="height: calc(100vh - 60px); width: 100%; overflow: auto" id="layout">
      <n-layout
        has-sider
        style="width: 1280px; margin: 0 auto; min-height: 100%; background-color: #f5f5f5"
        :style="{ marginTop: 7 + 'px' }"
        :native-scrollbar="false"
      >
        <n-layout-sider
          style="position: fixed; bottom: 8px; border-radius: 4px"
          :style="{ top: useTheme.header.height + 8 + 'px' }"
          collapse-mode="width"
          :width="160"
          :native-scrollbar="false"
          card-shadow
        >
          <SideBar />
        </n-layout-sider>
        <n-layout style="margin-left: 168px; margin-bottom: 7px; min-height: 100%; background-color: transparent">
          <Watermark :width="300" :sec-width="400">
            <AppMain />
          </Watermark>
          <n-layout-footer class="footer">
            <div style="margin-left: 80px">京ICP备20006013号-3</div>
          </n-layout-footer>
        </n-layout>
      </n-layout>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/theme'

import AppMain from './components/AppMain.vue'
import AppHeader from './components/header/index.vue'
import SideBar from './components/sidebar/index.vue'
import Watermark from './components/watermark.vue'

const useTheme = useThemeStore()
</script>

<style lang="scss" scoped>
.n-layout-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
