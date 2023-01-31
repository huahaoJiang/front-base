import type { Options } from '@antv/g2plot'

import base from './base'
export const BaseCfg = base

const ColorMap = ['#489DBA', '#55C5F2', '#FFBD59', '#ED6E79']

const baseCfg: Omit<Options, 'data'> = {
  padding: [20, 20, 70, 40],
  color: ColorMap,
  state: {
    active: {
      style: element => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const color = element.model.color || '#eee'
        return {
          fillOpacity: 1,
          lineWidth: 2,
          strokeOpacity: 0.8,
          stroke: color
        }
      }
    }
  }
}

export const mergeCfg = <T extends Options>(options: Omit<T, 'data'>): Omit<T, 'data'> => ({ ...baseCfg, ...options })
