import { highlightMerge, transHighlightText } from '@utils/common/globalSearch'
import { isLargerSpan } from '@utils/common/widthCalculator'
import type { DataTableColumns } from 'naive-ui'
import { NNumberAnimation, NTag, NTooltip } from 'naive-ui'

import { defaultSpan, sorterRender } from '@/components/commonFrag'
import ImgView from '@/components/views/imgView.vue'
import { INVESTOR_TYPE } from '@/constants/enum'
import { handleAmount } from '@/interface/common'
import { useCompanyStore } from '@/store/view/company'

import { timeFormat, toInvestorDetail } from './utils'

export function companyColumns(): DataTableColumns<Tz.Api.Front.EntityEmp.Page.CompanyInfo> {
  const companyStore = useCompanyStore()
  return [
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
              onClick={() => {
                companyStore.goDetail(row.id)
              }}
            >
              {row.name}
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
                {isLargerSpan(row.name, 150) ? (
                  <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                    <div>{row.name}</div>
                  </NTooltip>
                ) : (
                  <span
                    class="cursor ellipsis text-weight-hover__primary"
                    onClick={() => {
                      companyStore.goDetail(row.id)
                    }}
                  >
                    {row.name}
                  </span>
                )}
                <div style="flex-shrink:0">
                  {row.rounds === '21' ? (
                    <NTag class="ml-10px tiny-tag__border" type={'warning'} size={'tiny'}>
                      {'已上市'}
                    </NTag>
                  ) : (
                    row.roundsName && (
                      <NTag class="ml-10px tiny-tag__border" type={'primary'} size={'tiny'}>
                        {row.roundsName}
                      </NTag>
                    )
                  )}
                </div>
              </div>
              {isLargerSpan(row.name, 203) ? (
                <NTooltip placement="top-start" trigger={'hover'} v-slots={slots}>
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
      render(row) {
        if (row.tracks) {
          try {
            const arr = JSON.parse(row.tracks)
            const slots = {
              trigger: () => (
                <div style="margin:-10px 0;">
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
      title: '累计融资额',
      key: 'countFinAmount',
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      width: 114,
      render(row): any {
        if (![-1, 0].includes(row.countFinAmount)) {
          const num: any = handleAmount(row.countFinAmount)
          return h(
            <div>
              ¥
              <NNumberAnimation precision={num.precision} show-separator active={false} from={num.val} to={num.val} />
              {num.unit}
            </div>
          )
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '最新获投',
      key: 'newInvestDate',
      sorter: true,
      sortOrder: 'descend',
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.newInvestDate) {
          return timeFormat(row.newInvestDate, row.timeTypeEvent)
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '融资额',
      key: 'newFinAmount',
      width: 116,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.newFinAmount) {
          if (row.newFinAmount !== '未披露') {
            return row.newFinAmount + row.currencyName
          }
          return row.newFinAmount
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '本轮投资方',
      key: 'curInvestor',
      width: 187,
      render(row) {
        if (row.rounds === '21') {
          return '公开发行'
        }
        if (row.curInvestor) {
          try {
            const arr = JSON.parse(row.curInvestor)
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
            console.log('errorData', row.curInvestor)
            return 'error'
          }
        } else {
          return '未披露'
        }
      }
    }
  ]
}

export function globalSearchColumns(): DataTableColumns<Tz.Api.Front.GlobalSearch.Emp.Post.Emp> {
  const companyStore = useCompanyStore()
  return [
    {
      title: '企业名称',
      key: 'name',
      width: 246,
      ellipsis: true,
      render(row) {
        const introduction = transHighlightText(row.highlight.introduction)
        const name = transHighlightText(row.highlight.name)
        const slots = {
          trigger: () => (
            <div class="mt-5px text-12 color-#999 w-186px ellipsis" v-html={introduction || row.introduction} />
          )
        }
        const nameSlots = {
          trigger: () => (
            <span
              class="text-weight-hover__primary cursor ellipsis"
              onClick={() => {
                companyStore.goDetail(row.id)
              }}
              v-html={name || row.name}
            />
          )
        }
        return h(
          <div style="display:flex;">
            <div class="flex mr-10px">
              <ImgView size={40} src={row.logo} />
            </div>
            <div>
              <div class="flex w-176px" style="justify-content:flex-start">
                {isLargerSpan(row.name, 120) ? (
                  <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                    <div>{row.name}</div>
                  </NTooltip>
                ) : (
                  <span
                    class="text-weight-hover__primary cursor ellipsis"
                    onClick={() => {
                      companyStore.goDetail(row.id)
                    }}
                    v-html={name || row.name}
                  />
                )}
                <div style="flex-shrink:0">
                  {row.rounds === '21' ? (
                    <NTag class="ml-10px tiny-tag__border" type={'warning'} size={'tiny'}>
                      {'已上市'}
                    </NTag>
                  ) : (
                    row.roundsName && (
                      <NTag class="ml-10px tiny-tag__border" type={'primary'} size={'tiny'}>
                        {row.roundsName}
                      </NTag>
                    )
                  )}
                </div>
              </div>
              {isLargerSpan(row.name, 183) ? (
                <NTooltip placement="top-start" trigger={'hover'} v-slots={slots}>
                  <div>{row.introduction}</div>
                </NTooltip>
              ) : (
                <div class="mt-5px text-12 color-#999 w-206px ellipsis" v-html={introduction || row.introduction} />
              )}
            </div>
          </div>
        )
      }
    },
    {
      title: '简介',
      key: 'businessScope',
      ellipsis: {
        tooltip: { maxWidth: 500 }
      },
      render(row) {
        if (row.businessScope) {
          const businessScope = transHighlightText(row.highlight.businessScope)
          return <span v-html={businessScope || row.businessScope} />
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '赛道',
      key: 'tracks',
      width: 134,
      // ellipsis: true,
      render(row) {
        if (row.tracks) {
          try {
            row.tracks = highlightMerge(row.highlight.tracks, row.tracks)
            const arr = JSON.parse(row.tracks)
            const slots = {
              trigger: () => (
                <div style="margin:-2px 0;">
                  {arr.map((item: any) => (
                    <div class="ellipsis w-122px" v-html={transHighlightText(item.code_name)} />
                  ))}
                </div>
              )
            }
            return h(
              <NTooltip placement={'top-start'} trigger={'hover'} v-slots={slots}>
                <div>
                  {arr.map((item: any) => (
                    <div v-html={transHighlightText(item.code_path)} />
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
      title: '全称',
      key: 'icRegName',
      width: 208,
      ellipsis: {
        tooltip: true
      },
      render(row) {
        if (row.icRegName) {
          const icRegName = transHighlightText(row.highlight.icRegName)
          return <span v-html={icRegName || row.icRegName} />
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}
