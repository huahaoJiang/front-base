<template xmlns:icon-ant-design="">
  <n-icon mr20 size="18" style="cursor: pointer" @click="toggle">
    <icon-ant-design:fullscreen-outlined v-if="isFullscreen" />
    <icon-ant-design:fullscreen-outlined v-else />
  </n-icon>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>
