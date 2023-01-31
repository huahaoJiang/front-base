<template>
  <n-watermark
    class="w-full"
    :image="Watermark"
    :image-width="81"
    :width="width"
    :height="height"
    :x-offset="12"
    :y-offset="120"
    :rotate="-25"
  >
    <n-watermark
      :content="userInfo.name"
      :font-size="13"
      font-color="rgba(51,51,51,0.06)"
      :font-weight="1000"
      :width="width"
      :height="height"
      :x-offset="95"
      :y-offset="122"
      :rotate="-25"
    >
      <n-watermark
        :image="Watermark"
        :image-width="81"
        :width="secWidth"
        :height="height"
        :x-offset="12 + xOffset"
        :x-gap="-yGap"
        :y-offset="120 + yOffset"
        :rotate="-25"
      >
        <n-watermark
          :content="userInfo.name"
          :font-size="13"
          font-color="rgba(51,51,51,0.06)"
          :font-weight="1000"
          :width="secWidth"
          :x-gap="-yGap"
          :height="height"
          :x-offset="95 + xOffset"
          :y-offset="122 + yOffset"
          :rotate="-25"
        >
          <slot></slot>
        </n-watermark>
      </n-watermark>
    </n-watermark>
  </n-watermark>
</template>

<script lang="ts" setup>
import Watermark from '@/assets/images/403.png'
import { useUserStore } from '@/store/user'

const userInfo = useUserStore()
const props = defineProps({
  width: {
    type: Number,
    default() {
      return 320
    }
  },
  secWidth: {
    type: Number,
    default() {
      return 427
    }
  }
})
const xOffset = (props.secWidth - props.width) / 2
const height = 316
const yOffset = 208
const yGap = ((props.secWidth - props.width) * 4) / 5
</script>

<style scoped></style>
