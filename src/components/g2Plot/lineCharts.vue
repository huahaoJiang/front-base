<template>
  <div :id="id" :style="{ height: height + 'px' }" />
</template>

<script lang="ts" setup>
import type { LineOptions } from '@antv/g2plot'
import { Line } from '@antv/g2plot'
import type { PropType } from 'vue'

import { BaseCfg, mergeCfg } from '@/components/g2Plot/utils'
import { handlerCfg } from '@/components/g2Plot/utils/base'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  chartCfg: {
    type: Object as PropType<Omit<LineOptions, 'data'>>,
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
      return 320
    }
  }
})
const linePlot = ref()

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
  linePlot.value?.changeData(data)
}

onMounted(() => {
  linePlot.value = new Line(props.id, {
    data: props.data,
    ...mergeCfg<LineOptions>({
      xField: 'x',
      yField: 'y',
      seriesField: 'name',
      connectNulls: true,
      yAxis: BaseCfg.genValueAxis(props.chartCfg.yAxis),
      xAxis: BaseCfg.genItemAxis(props.chartCfg.xAxis),
      legend: BaseCfg.generateLegends(props.chartCfg.legend),
      tooltip: BaseCfg.genTooltip(props.chartCfg.tooltip),
      smooth: true,
      meta: {
        x: {
          range: [0, 1]
        }
      },
      area: {
        style: {
          fill: 'l(270) 0:rgba(85, 197, 242, 0) 0.5:rgba(85, 197, 242, 0.1) 1:rgba(85, 197, 242, 0.15)'
        }
      },
      animation: BaseCfg.genAnimationCfg('wave-in')
    }),
    ...handlerCfg(props.chartCfg)
  })

  linePlot.value.render()
})
</script>

<style scoped></style>
