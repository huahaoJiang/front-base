<template xmlns:icon-mdi="">
  <n-icon mr20 size="18" style="cursor: pointer" @click="handleLinkClick">
    <icon-mdi:github />
  </n-icon>
</template>

<script setup lang="ts">
function handleLinkClick() {
  window.open('https://github.com/zclzone/vue-naive-admin')
}
</script>

<style lang="scss" scoped></style>
