<template>
  <div :id="id" :style="{ height: height + 'px' }" />
</template>

<script lang="ts" setup>
import type { BarOptions } from '@antv/g2plot'
import { Bar } from '@antv/g2plot'
import type { PropType } from 'vue'

import { BaseCfg, mergeCfg } from '@/components/g2Plot/utils'
import { handlerCfg } from '@/components/g2Plot/utils/base'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  chartCfg: {
    type: Object as PropType<Omit<BarOptions, 'data'>>,
    default() {
      return {}
    }
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  height: {
    type: Number,
    default() {
      return 300
    }
  }
})
const barPlot = ref()

watch(
  () => props.data,
  params => {
    if (params.length) {
      dataUpdate(params)
    }
  },
  { immediate: true }
)

function dataUpdate(data: Record<string, any>[]) {
  barPlot.value?.changeData(data)
}

onMounted(() => {
  barPlot.value = new Bar(props.id, {
    data: props.data,
    ...mergeCfg<BarOptions>({
      xField: 'x',
      yField: 'y',
      seriesField: 'name',
      xAxis: BaseCfg.genValueAxis(props.chartCfg.yAxis),
      yAxis: BaseCfg.genItemAxis(props.chartCfg.xAxis),
      legend: BaseCfg.generateLegends(props.chartCfg.legend),
      tooltip: BaseCfg.genTooltip(props.chartCfg.tooltip),
      padding: [40, 20, 50, 60],
      animation: BaseCfg.genAnimationCfg('scale-in-x')
    }),
    ...handlerCfg(props.chartCfg)
  })
  barPlot.value.render()
})
</script>

<style scoped></style>
