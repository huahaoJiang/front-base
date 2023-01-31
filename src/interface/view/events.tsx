import { isLargerSpan } from '@utils/common/widthCalculator'
import type { DataTableColumns } from 'naive-ui'
import { NTag, NTooltip } from 'naive-ui'

import { defaultSpan, sorterRender } from '@/components/commonFrag'
import ImgView from '@/components/views/imgView.vue'
import { INVESTOR_TYPE } from '@/constants/enum'
import { useCompanyStore } from '@/store/view/company'

import { timeFormat, toInvestorDetail } from './utils'

export function eventsColumns(): DataTableColumns<Tz.Model.Front.Event.Item> {
  const companyStore = useCompanyStore()
  return [
    {
      title: '事件时间',
      key: 'time',
      width: 100,
      sorter: true,
      sortOrder: 'descend',
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.time) {
          return timeFormat(row.time, row.timeTypeEvent)
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '企业名称',
      key: 'name',
      width: 266,
      ellipsis: true,
      render(row) {
        const slots = {
          trigger: () => <div class="mt-5px text-12 color-#999 w-206px ellipsis">{row.introduction}</div>
        }
        const nameSlots = {
          trigger: () => (
            <span
              class="text-weight-hover__primary cursor ellipsis"
              onClick={() => companyStore.goDetail(row.entityId)}
            >
              {row.entityName}
            </span>
          )
        }
        return h(
          <div style="display:flex;">
            <div class="flex mr-10px">
              <ImgView size={30} src={row.logo} />
            </div>
            <div>
              <div class="flex w-206px" style="justify-content:flex-start">
                {isLargerSpan(row.entityName, 150) ? (
                  <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                    <div>{row.entityName}</div>
                  </NTooltip>
                ) : (
                  <span
                    class="text-weight-hover__primary cursor ellipsis"
                    onClick={() => companyStore.goDetail(row.entityId)}
                  >
                    {row.entityName}
                  </span>
                )}
                <div style="flex-shrink:0">
                  {row.empRounds === '21' ? (
                    <NTag class="ml-10px tiny-tag__border" type={'warning'} size={'tiny'}>
                      {'已上市'}
                    </NTag>
                  ) : (
                    row.empRoundsName && (
                      <NTag class="ml-10px tiny-tag__border" type={'primary'} size={'tiny'}>
                        {row.empRoundsName}
                      </NTag>
                    )
                  )}
                </div>
              </div>
              {isLargerSpan(row.introduction, 203) ? (
                <NTooltip placement="bottom-start" trigger={'hover'} v-slots={slots}>
                  <div>{row.introduction}</div>
                </NTooltip>
              ) : (
                <div class="mt-5px text-12 color-#999 w-206px ellipsis">{row.introduction}</div>
              )}
            </div>
          </div>
        )
      }
    },
    {
      title: '赛道',
      key: 'tracks',
      // ellipsis: true,
      width: 108,
      render(row) {
        if (row.tracks) {
          try {
            const arr = JSON.parse(row.tracks)
            const slots = {
              trigger: () => (
                <div style="margin:-12px 0">
                  {arr.map((item: any) => (
                    <div class="ellipsis w-94px">{item.code_name}</div>
                  ))}
                </div>
              )
            }
            return h(
              <NTooltip placement={'top-start'} trigger={'hover'} v-slots={slots}>
                <div>
                  {arr.map((item: any) => (
                    <div>{item.code_path}</div>
                  ))}
                </div>
              </NTooltip>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.tracks)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '地区',
      key: 'regionName',
      width: 102,
      render(row) {
        if (row.regionName) {
          try {
            const obj = JSON.parse(row.regionName)
            return obj.name
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.regionName)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '成立时间',
      key: 'establishTime',
      width: 100,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.establishTime) {
          return timeFormat(row.establishTime, row.timeTypeEmp)
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '事件类型',
      key: 'roundsName',
      width: 100,
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
      width: 116,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
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
        if (row.eventInestor && row.eventInestor != '[]') {
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
    }
  ]
}

export function eventsDistributionColumns(): DataTableColumns<Tz.Model.Front.Event.Item> {
  // @ts-expect-error ...
  return eventsColumns().filter(item => !['regionName', 'tracks'].includes(item.key))
}
