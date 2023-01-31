import type { DataTableColumns } from 'naive-ui'

import { defaultSpan } from '@/components/commonFrag'
import { INVESTOR_TYPE } from '@/constants/enum'

import { timeFormat, toInvestorDetail } from './utils'

export const empLinkedList = [
  { title: '基本信息', href: 'empBasic' },
  { title: '企业画像', href: 'empTag' },
  { title: '投融资', href: 'events' },
  { title: '赛道分析', href: 'trackAnalyze' },
  { title: '股价信息', href: 'shareInfo' },
  { title: '上市对标', href: 'marketAnalysis' }
]

export function finColumns(): DataTableColumns<Tz.Model.Front.Event.Item> {
  return [
    {
      title: '事件时间',
      key: 'time',
      width: 120,
      render(row) {
        if (row.time) {
          return timeFormat(row.time, row.timeTypeEvent)
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '事件类型',
      key: 'roundsName',
      width: 120,
      render(row) {
        if (row.roundsName) {
          return row.roundsName
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '交易金额',
      key: 'moneyPublish',
      width: 128,
      render(row) {
        if (row.moneyPublish) {
          if (row.moneyPublish !== '未披露') {
            return row.moneyPublish + row.currencyName
          }
          return row.moneyPublish
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '投资方',
      key: 'eventInestor',
      render(row) {
        if (row.rounds === '21') {
          return '公开发行'
        }
        if (row.eventInestor) {
          try {
            const arr = JSON.parse(row.eventInestor)
            return h(
              <div style="margin:-12px 0">
                {arr.map((item: any, index: number) => (
                  <span>
                    <span
                      class={
                        item.is_pub === '0' && [INVESTOR_TYPE.COMPANY, INVESTOR_TYPE.ORGANIZATION].includes(item.type)
                          ? 'text-hover__primary cursor'
                          : ''
                      }
                      onClick={() => toInvestorDetail(item)}
                    >
                      {item.entity_name}
                    </span>
                    {item.lead_ident === '0' && <span>(领投)</span>}
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.eventInestor)
            return 'error'
          }
        } else {
          return '未披露'
        }
      }
    },
    {
      title: '信息来源',
      key: 'sourceUrl',
      width: 120,
      render(row) {
        if (row.sourceUrl) {
          return h(
            <a class="color-#489dba" href={row.sourceUrl} target={'_blank'}>
              查看
            </a>
          )
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}
export enum eventsTabEnum {
  'fin' = 'fin',
  'invest' = 'invest'
}
