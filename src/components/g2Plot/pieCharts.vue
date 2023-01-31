<template>
  <div :id="id" :style="{ height: height + 'px' }" />
</template>

<script lang="ts" setup>
import type { Datum, PieOptions } from '@antv/g2plot'
import { measureTextWidth, Pie } from '@antv/g2plot'
import type { PropType } from 'vue'

import { BaseCfg, mergeCfg } from '@/components/g2Plot/utils'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  chartCfg: {
    type: Object as PropType<Omit<PieOptions, 'data'>>,
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
const piePlot = ref()

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
  piePlot.value?.changeData(data)
}

function renderStatistic(containerWidth: number, text: string, style: any) {
  const textWidth = measureTextWidth(text, style)
  const textHeight = style.lineHeight || style.fontSize
  const R = containerWidth / 2
  let scale = 1
  if (containerWidth < textWidth) {
    scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
  }
  const textStyleStr = `width:${containerWidth}px;`
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
}

onMounted(() => {
  piePlot.value = new Pie(props.id, {
    data: props.data,
    ...mergeCfg<PieOptions>({
      padding: [20],
      appendPadding: 20,
      angleField: 'value',
      colorField: 'name',
      legend: false,
      radius: 1,
      innerRadius: 0.64,
      tooltip: {
        formatter: (datum: Datum) => {
          return { name: datum.name, value: `${datum.value} (${datum.percent}%)` }
        }
      },
      label: {
        type: 'outer',
        offset: '50%',
        layout: { type: 'fixed-overlap' },
        labelLine: {
          style: {
            stroke: '#ccc',
            lineWidth: 1
          }
        },
        formatter: (datum: Datum) => {
          return `${datum.name}: ${(datum.percent * 100).toFixed(2) || 0}%`
        }
      },
      animation: BaseCfg.genAnimationCfg('wave-in'),
      statistic: {
        title: {
          offsetY: -4,
          style: {
            fontSize: '14px'
          },
          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect()
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
            const text = datum ? datum.name : '总计'
            return renderStatistic(d, text, { fontSize: 12 })
          }
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '24px'
          },
          customHtml: (container, view, datum, data: any) => {
            const { width } = container.getBoundingClientRect()
            const text = datum ? `${datum.value}` : `${data.reduce((r: any, d: any) => r + d.value, 0)}`
            return renderStatistic(width, text, { fontSize: 12 })
          }
        }
      },
      // 添加 中心统计文本 交互
      interactions: [{ type: 'element-single-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }]
    }),
    ...props.chartCfg
  })
  piePlot.value.render()
})
</script>

<style scoped></style>
