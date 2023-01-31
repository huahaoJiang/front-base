import type { Options } from '@antv/g2plot'
import { isNumber } from '@utils/is'

const lineStyleCfg = {
  style: {
    stroke: '#eee',
    lineWidth: 1,
    lineDash: [2, 2],
    strokeOpacity: 1,
    shadowColor: '#eee',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    cursor: 'pointer'
  }
}
/**
 * 类目轴配置
 */
const genItemAxis = (cfg?: Options['xAxis']): Options['xAxis'] => ({
  line: { ...lineStyleCfg },
  tickLine: { length: 0 },
  ...cfg
})

/**
 * 数值轴配置
 */
const genValueAxis = (cfg?: Options['yAxis']): Options['yAxis'] => ({
  grid: {
    line: { ...lineStyleCfg }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tickMethod: (cfg: any): false | number[] => {
    if (!isNumber(cfg.max)) return false
    let avg = Math.ceil(cfg.max / 100)
    if (avg === 0) {
      avg++
    }
    const tick = avg * 25
    return [0, tick, tick * 2, tick * 3, tick * 4]
  },
  ...cfg
})
/**
 * 动画配置
 * @animation 'wave-in' | 'scale-in-x' | 'scale-in-y' | 'zoom-in' | 'fade-in'
 */
const genAnimationCfg = (
  animation: 'wave-in' | 'scale-in-x' | 'scale-in-y' | 'zoom-in' | 'fade-in',
  time: number = 2000
) => ({
  appear: {
    animation: animation,
    duration: time
  }
})
/**
 * 生成legend配置
 */
const generateLegends = (cfg?: Options['legend']): Options['legend'] => {
  return {
    layout: 'horizontal',
    position: 'bottom',
    itemSpacing: 30,
    itemName: {
      style: {
        fill: '#666',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular, sans-serif',
        fontStyle: 'normal'
      }
    },
    marker: {
      symbol: () => {
        //4 6 4
        return [
          ['M', 1, 10],
          ['L', 7, 10],
          ['L', 8, 9],
          ['L', 8, 3],
          ['L', 7, 2],
          ['L', 1, 2],
          ['L', 0, 3],
          ['L', 0, 9]
        ]
      },
      style: oldStyle => {
        return {
          r: 4,
          fill: oldStyle.stroke || oldStyle.fill
        }
      }
    },
    ...cfg
  }
}
/**
 * 悬浮层配置
 */
const genTooltip = (cfg?: Options['tooltip']) => ({
  domStyles: {
    'g2-tooltip-title': { fontSize: '14px', color: '#333', fontFamily: 'PingFangSC-Medium, sans-serif' },
    'g2-tooltip-marker': { borderRadius: '2px' }
  },
  ...cfg
})

export function handlerCfg(cfg: any) {
  const config = Object.assign({}, cfg)
  config.xAxis && delete config.xAxis
  config.yAxis && delete config.yAxis
  config.legend && delete config.legend
  config.tooltip && delete config.tooltip
  return config
}
export default { genItemAxis, genValueAxis, generateLegends, genAnimationCfg, genTooltip }
