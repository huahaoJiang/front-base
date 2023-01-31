<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in trackDetailRef" :key="item.key" @click="handleBreadClick(item.key)">
      {{ item.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
// import { useTrackStore } from '@/store/view/track'

// const trackStore = useTrackStore()

// const trackDetailRef = computed(() => trackStore.trackLocation)
// const router = useRouter()
// const route = useRoute()

function handleBreadClick(key: string) {
  console.log(key)
  // trackStore.goHref('/track/allTrack', key)
}
</script>
