import { transHighlightText } from '@utils/common/globalSearch'
import { isLargerSpan } from '@utils/common/widthCalculator'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NImage, NNumberAnimation, NSpace, NTooltip } from 'naive-ui'

import Icon from '@/assets/icons/questionCircle.svg'
import { defaultSpan } from '@/components/commonFrag'
import { PARTICULAR_TRACK_CODE } from '@/constants/code'
import { handleAmount } from '@/interface/common'
import { useCompanyStore } from '@/store/view/company'
import { useTrackStore } from '@/store/view/track'

export function trackColumns(): DataTableColumns<Tz.Api.Front.TrackAll.List.Get.TrackItem> {
  const trackStore = useTrackStore()
  const companyStore = useCompanyStore()
  return [
    {
      title: () => {
        return h(
          <NSpace>
            <span>赛道名称({trackStore.total})</span>
            <NButton text type={'primary'} size={'small'} onClick={trackStore.updateExpand}>
              {trackStore.expandAll ? '全部收起' : '全部展开'}
            </NButton>
          </NSpace>
        )
      },
      key: 'name',
      width: 218,
      ellipsis: true,
      render(row) {
        if (row.name) {
          const width = 180 - row.level * 16 + 'px'
          const isTooltip = isLargerSpan(row.name, (180 - row.level * 16) / 14)
          const view = () =>
            row.empCount > -1 ? (
              <div
                onClick={() => {
                  trackStore.goTrackDetail(row.id)
                }}
                class={'text-weight-hover__primary cursor td-ellipsis'}
                style={'width:' + width}
              >
                {row.name}
              </div>
            ) : (
              <div style={'width:' + width} class={'td-ellipsis'}>
                {row.name}
              </div>
            )
          const slots = {
            trigger: () => view()
          }
          return h(
            isTooltip ? (
              <NTooltip placement="top-start" trigger={'hover'} v-slots={slots}>
                <span>{row.name}</span>
              </NTooltip>
            ) : (
              view()
            )
          )
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '赛道简介',
      key: 'introduce',
      width: 252,
      ellipsis: true,
      render(row) {
        const introduce = (row.introduce || '').replace(/<[^<>]+>/g, '')
        const slots = {
          trigger: () => <span class="color-#666">{introduce}</span>
        }
        if (introduce) {
          return (
            <NTooltip placement="top-start" width={500} trigger={'hover'} v-slots={slots}>
              <span>{introduce}</span>
            </NTooltip>
          )
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '企业数',
      key: 'empCount',
      width: 80,
      render(row) {
        return h(<NNumberAnimation show-separator active={false} from={row.empCount} to={row.empCount} />)
      }
    },
    {
      title: '融资事件数',
      key: 'introduce',
      width: 102,
      render(row) {
        return h(<NNumberAnimation show-separator active={false} from={row.finEventCount} to={row.finEventCount} />)
      }
    },
    {
      title: () => {
        const slots = {
          trigger: () => h(<NImage preview-disabled width={12} src={Icon}></NImage>)
        }
        return h(
          <div>
            <span class="mr-2px">近一年融资额(环比)</span>
            <NTooltip trigger={'hover'} v-slots={slots}>
              <span>{trackStore.tableTooltip}</span>
            </NTooltip>
          </div>
        )
      },
      key: 'finAmountYear',
      width: 165,
      render(row) {
        try {
          const num: any = handleAmount(row.finAmountYear)
          return h(
            <div>
              ¥
              <NNumberAnimation precision={num.precision} show-separator active={true} from={num.val} to={num.val} />
              {num.unit}
              {row.chainRatio === null ? (
                <span class="color-#666 ml-4px">{'(-)'}</span>
              ) : row.chainRatio >= 0 ? (
                <span class="color-#07c160 ml-4px">{`(+${row.chainRatio}%)`}</span>
              ) : (
                <span class="color-#fa5151 ml-4px">{`(${row.chainRatio}%)`}</span>
              )}
            </div>
          )
        } catch (err: any) {
          console.log('errorInfo', err)
          console.log('errorData', row.finAmountYear)
          return 'error'
        }
      }
    },
    {
      title: '头部企业',
      key: 'empHead',
      render(row) {
        if (row.empHead && row.empHead !== '[]') {
          try {
            const arr = JSON.parse(row.empHead)
            return h(
              <div style="margin:-12px 0">
                {arr.map((item: any, index: number) => (
                  <span>
                    {item.is_pub === '0' ? (
                      <span
                        class="text-hover__primary cursor"
                        onClick={() => {
                          companyStore.goDetail(item.entity_id)
                        }}
                      >
                        {item.entity_name}
                      </span>
                    ) : (
                      <span>{item.entity_name}</span>
                    )}
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.empHead)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}

export function globalSearchTrackColumns(): DataTableColumns<Tz.Api.Front.GlobalSearch.Track.Post.Track> {
  const trackStore = useTrackStore()
  const companyStore = useCompanyStore()
  return [
    {
      title: '赛道名称',
      key: 'name',
      width: 138,
      ellipsis: {
        tooltip: { maxWidth: 500 }
      },
      render(row) {
        if (row.name) {
          const name = transHighlightText(row.highlight.name)
          return (
            <span
              style="line-height:45px"
              onClick={() => {
                trackStore.goTrackDetail(row.id)
              }}
              class={'text-hover__primary cursor'}
              v-html={name || row.name}
            />
          )
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '赛道简介',
      key: 'introduce',
      ellipsis: {
        tooltip: { maxWidth: 500 }
      },
      render(row) {
        if (row.introduce) {
          // const introduce = (row.highlight.introduce || '').replace(/<[^<>]+>/g, '')
          const introduce = transHighlightText(row.highlight.introduce)
          return <span v-html={introduce || row.introduce} />
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '企业数',
      key: 'empCount',
      width: 75,
      render(row) {
        return h(<NNumberAnimation show-separator active={false} from={row.empCount} to={row.empCount} />)
      }
    },
    {
      title: '融资事件数',
      key: 'introduce',
      width: 92,
      render(row) {
        return h(<NNumberAnimation show-separator active={false} from={row.finEventCount} to={row.finEventCount} />)
      }
    },
    {
      title: () => {
        const slots = {
          trigger: () => h(<NImage preview-disabled width={12} src={Icon}></NImage>)
        }
        return h(
          <div>
            <span class="mr-2px">近一年融资额(环比)</span>
            <NTooltip trigger={'hover'} v-slots={slots}>
              <span>{trackStore.tableTooltip}</span>
            </NTooltip>
          </div>
        )
      },
      key: 'finAmountYear',
      width: 145,
      render(row) {
        try {
          const num: any = handleAmount(row.finAmountYear)
          return h(
            <div>
              ¥
              <NNumberAnimation precision={num.precision} show-separator active={true} from={num.val} to={num.val} />
              {num.unit}
              {!row.chainRatio && row.chainRatio !== 0 ? (
                <span class="color-#666 ml-4px">{'(-)'}</span>
              ) : row.chainRatio >= 0 ? (
                <span class="color-#07c160 ml-4px">{`(+${row.chainRatio}%)`}</span>
              ) : (
                <span class="color-#fa5151 ml-4px">{`(${row.chainRatio}%)`}</span>
              )}
            </div>
          )
        } catch (err: any) {
          console.log('errorInfo', err)
          console.log('errorData', row.finAmountYear)
          return 'error'
        }
      }
    },
    {
      title: '头部企业',
      key: 'empHead',
      width: 220,
      render(row) {
        if (row.empHead && row.empHead !== '[]') {
          try {
            const arr = JSON.parse(row.empHead)
            return h(
              <div style="margin:-2px 0">
                {arr.map((item: any, index: number) => (
                  <span>
                    {item.is_pub === '0' ? (
                      <span
                        class="text-hover__primary cursor"
                        onClick={() => {
                          companyStore.goDetail(item.entity_id)
                        }}
                      >
                        {item.entity_name}
                      </span>
                    ) : (
                      <span>{item.entity_name}</span>
                    )}
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.empHead)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}

const keyList = [
  'finEventCount',
  'empCount',
  'empCount',
  'marketCount',
  'unicornCount',
  'fastFinCount',
  'investorCount',
  'investorCount'
] as const

const pathList = [
  '/track/allEvents',
  '/track/company',
  '/track/allCompany',
  ['/track/secondaryMarket', '/track/ipoCompany'],
  '/track/unicornCompany',
  '/track/fastCompany',
  '/track/organization',
  '/track/trackInvest'
]

// 个别静态赛道
const staticPathList = [
  '/track/clinical-trials',
  '/track/thesis',
  '/track/product',
  '/track/scientific-research-institution',
  '/track/specialist'
]

export function getMenuList(detail: Tz.Model.Front.Track.TrackDetail) {
  const { code, empCount } = detail
  const menuList = [
    '/track/sketch',
    '/track/market',
    '/track/policy',
    '/track/analyze',
    '/track/CNCompany',
    '/track/USACompany',
    '/track/EUCompany'
  ] as string[]

  if (empCount) {
    menuList.unshift('/track/overview')
  }

  // 静态个别赛道
  if (PARTICULAR_TRACK_CODE.includes(code)) {
    menuList.splice(0, 1, '/track/static-overview')
    menuList.push(...staticPathList)
  }

  //数据库写死，1为最后一级
  if (detail.remark6 !== '1') {
    menuList.push('/track/allTrack')
  }
  keyList.forEach((key, index) => {
    if (detail[key] > 0) {
      const path = pathList[index]
      Array.isArray(path) ? menuList.push(...path) : menuList.push(path)
    }
  })

  //二级赛道以下不展示咨询
  if (detail.level < 2) {
    menuList.push('/track/information')
  }
  return menuList
}
