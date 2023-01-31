<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#app {
  height: 100%;
  .n-config-provider {
    height: inherit;
  }
}
/*:deep(.n-card.n-card--bordered) {
  border: 1px solid transparent;
}*/
</style>
