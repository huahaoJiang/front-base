<template xmlns:icon-mdi="">
  <n-icon size="20" style="cursor: pointer" @click="appStore.switchCollapsed">
    <icon-mdi:format-indent-increase v-if="appStore.collapsed" />
    <icon-mdi:format-indent-decrease v-else />
  </n-icon>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
</script>
