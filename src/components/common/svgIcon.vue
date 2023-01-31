<template>
  <svg aria-hidden="true" v-bind="$attrs" :width="size" :height="size">
    <use :xlink:href="iconName" class="svg-icon" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#333333'
    },
    size: {
      type: String,
      default: '1.2em'
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`)
    const svgClass = computed(() => {
      if (props.name) {
        return `svg-icon icon-${props.name}`
      }
      return 'svg-icon' // svg 标签
    })
    return {
      iconName,
      svgClass
    }
  }
})
</script>

<style lang="scss">
.svg-icon {
  margin-left: 6px;
}
</style>
