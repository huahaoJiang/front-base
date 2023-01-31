<template>
  <div>
    <div v-show="data[0].length" class="w-1178px">
      <div :id="id" class="w-full" :style="{ height: height + 'px' }" />
      <div :id="id + '_sum'" class="mt-1px w-full" style="height: 78px" />
    </div>
    <n-space v-if="!data[0].length" justify="center">
      <n-image :width="300" preview-disabled :height="260" :src="TableDefault" />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import type { HeatmapOptions } from '@antv/g2plot'
import { Heatmap } from '@antv/g2plot'
import type { PropType } from 'vue'

import TableDefault from '@/assets/images/404.png'
import { BaseCfg, mergeCfg } from '@/components/g2Plot/utils'
import { handlerCfg } from '@/components/g2Plot/utils/base'

const emits = defineEmits(['update:track', 'click:element'])

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  chartCfg: {
    type: Object as PropType<Omit<HeatmapOptions, 'data'>>,
    default() {
      return {}
    }
  },
  data: {
    type: Array as PropType<Record<string, any>[][]>,
    required: true
  },
  height: {
    type: Number,
    default() {
      return 400
    }
  }
})

const heatPlot = ref()
const heatSumPlot = ref()

watch(
  () => props.data,
  params => {
    if (params.length) {
      dataUpdate(params)
    }
  },
  { immediate: true }
)

function dataUpdate(data: Record<string, any>[][]) {
  nextTick(() => {
    // heatPlot.value?.changeData(data[0])
    heatPlot.value?.update({
      data: data[0],
      ...mergeMap(data[0])
    })
    heatSumPlot.value?.changeData(data[1])
  })
}

onMounted(() => {
  heatPlot.value = new Heatmap(props.id, {
    data: props.data[0],
    ...mergeMap()
  })
  heatSumPlot.value = new Heatmap(props.id + '_sum', {
    data: props.data[1],
    ...mergeSumMap()
  })

  heatPlot.value.on('axis-label:click', (args: any) => {
    emits('update:track', args.target.attrs.text)
  })
  heatPlot.value.on('element:click', (args: any) => {
    const { code, x, value } = args.data.data || {}
    emits('click:element', { tracks: code, time: `${x}-1-1`, timeEnd: `${x}-12-31`, value })
  })
  heatSumPlot.value.on('element:click', (args: any) => {
    const { code, x, value } = args.data.data || {}
    emits('click:element', { tracks: code, time: `${x}-1-1`, timeEnd: `${x}-12-31`, value })
  })

  heatPlot.value.render()
  heatSumPlot.value.render()
})

onBeforeUnmount(() => {
  heatPlot.value.off('axis-label:click')
  heatPlot.value.off('element:click')
  heatSumPlot.value.off('element:click')
})
const heatMapBaseCfg: Omit<HeatmapOptions, 'data'> = {
  xField: 'x',
  yField: 'y',
  colorField: 'value',
  legend: false,
  // animation: BaseCfg.genAnimationCfg('wave-in'),
  interactions: [{ type: 'element-active' }],
  state: {
    active: {
      style: {
        fillOpacity: 0.8,
        lineWidth: 0,
        strokeOpacity: 0.4,
        stroke: '#eee'
      }
    }
  },
  heatmapStyle: {
    stroke: '#fff'
  },
  yAxis: {
    grid: null
  },
  meta: {
    y: {}
  },
  tooltip: BaseCfg.genTooltip(props.chartCfg.tooltip),
  ...handlerCfg(props.chartCfg)
}
const mergeMap = (data?: Record<string, any>[]) => {
  return mergeCfg<HeatmapOptions>({
    ...heatMapBaseCfg,
    color: ['#DAEBF1', '#489DBA'],
    padding: [20, 20, 0, 110],
    xAxis: {
      tickLine: null,
      line: null,
      label: null
    },
    yAxis: {
      grid: null,
      label: {
        style: {
          adjustPosition: true,
          cursor: data?.length && data[0]?.code.length < 5 ? 'pointer' : 'default'
        }
      }
    },
    label: {
      style: {
        fill: '#054163',
        fontSize: 13,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .25)'
      }
    }
  })
}
const mergeSumMap = () => {
  return mergeCfg<HeatmapOptions>({
    ...heatMapBaseCfg,
    color: ['#489DBA'],
    padding: [0, 20, 40, 110],
    xAxis: {
      tickLine: null,
      line: null,
      label: {
        offset: 12,
        style: {
          fontSize: 12,
          fill: '#666',
          textBaseline: 'top'
        }
      }
    },
    label: {
      style: {
        fill: '#fff',
        fontSize: 13,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .25)'
      }
    }
  })
}
</script>

<style scoped></style>
