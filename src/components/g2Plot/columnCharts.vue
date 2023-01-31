<template>
  <div :id="id" :style="{ height: height + 'px' }" />
</template>

<script lang="ts" setup>
import type { ColumnOptions } from '@antv/g2plot'
import { Column } from '@antv/g2plot'
import type { PropType } from 'vue'

import { BaseCfg, mergeCfg } from '@/components/g2Plot/utils'
import { handlerCfg } from '@/components/g2Plot/utils/base'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  chartCfg: {
    type: Object as PropType<Omit<ColumnOptions, 'data'>>,
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
const columnPlot = ref()

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
  columnPlot.value?.changeData(data)
}

onMounted(() => {
  columnPlot.value = new Column(props.id, {
    data: props.data,
    ...mergeCfg<ColumnOptions>({
      xField: 'x',
      yField: 'y',
      seriesField: 'name',
      yAxis: BaseCfg.genValueAxis(props.chartCfg.yAxis),
      xAxis: BaseCfg.genItemAxis(props.chartCfg.xAxis),
      legend: BaseCfg.generateLegends(props.chartCfg.legend),
      tooltip: BaseCfg.genTooltip(props.chartCfg.tooltip),
      isGroup: true,
      padding: [40, 20, 60, 40],
      animation: BaseCfg.genAnimationCfg('scale-in-y')
    }),
    ...handlerCfg(props.chartCfg)
  })

  columnPlot.value.render()
})
</script>

<style scoped></style>
