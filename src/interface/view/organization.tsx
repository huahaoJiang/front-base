import { transHighlightText } from '@utils/common/globalSearch'
import { isLargerSpan } from '@utils/common/widthCalculator'
import type { DataTableColumns } from 'naive-ui'
import { NNumberAnimation, NTooltip } from 'naive-ui'

import { defaultSpan, sorterRender } from '@/components/commonFrag'
import ImgView from '@/components/views/imgView.vue'
import { useCompanyStore } from '@/store/view/company'
import { useOrganizationStore } from '@/store/view/organization'

import { timeFormat } from './utils'

export function orgColumns(): DataTableColumns<Tz.Api.Front.EntityFin.Org> {
  const orgStore = useOrganizationStore()
  return [
    {
      title: '机构名称',
      key: 'name',
      width: 186,
      ellipsis: true,
      render(row) {
        const nameSlots = {
          trigger: () => (
            <span
              class="text-weight-hover__primary cursor ellipsis w-130px"
              style="line-height:30px"
              onClick={() => orgStore.goDetail(row.id)}
            >
              {row.name}
            </span>
          )
        }
        return h(
          <div style="display:flex;justify-content: flex-start">
            <div class="mr-10px">
              <ImgView size={30} src={row.logo} />
            </div>
            <div>
              {isLargerSpan(row.name, 127) ? (
                <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                  <div>{row.name}</div>
                </NTooltip>
              ) : (
                <span
                  class="text-weight-hover__primary cursor ellipsis"
                  style="line-height:30px"
                  onClick={() => orgStore.goDetail(row.id)}
                >
                  {row.name}
                </span>
              )}
            </div>
          </div>
        )
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
          return timeFormat(row.establishTime, row.timeType)
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '总部',
      key: 'regionName',
      width: 102,
      render(row) {
        if (row.regionName) {
          try {
            const obj = JSON.parse(row.regionName)
            return obj.name || defaultSpan()
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
      title: '机构类型',
      key: 'finTypeName',
      width: 102,
      render(row) {
        if (row.finTypeName) {
          return row.finTypeName
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '累计投资',
      key: 'investNumTotal',
      sorter: true,
      sortOrder: 'descend',
      renderSorterIcon: sorterRender,
      width: 114,
      render(row): any {
        if (![-1, 0].includes(row.investNumTotal)) {
          return h(
            <NNumberAnimation
              precision={0}
              show-separator
              active={false}
              from={row.investNumTotal}
              to={row.investNumTotal}
            />
          )
        } else {
          return 0
        }
      }
    },
    {
      title: '近一年投资',
      key: 'investNumYear',
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      width: 120,
      render(row): any {
        if (![-1, 0].includes(row.investNumYear)) {
          return h(
            <NNumberAnimation
              precision={0}
              show-separator
              active={false}
              from={row.investNumYear}
              to={row.investNumYear}
            />
          )
        } else {
          return 0
        }
      }
    },
    {
      title: '主投轮次',
      key: 'mainRounds',
      width: 126,
      render(row): any {
        if (row.mainRounds) {
          try {
            const arr = JSON.parse(row.mainRounds)
            return h(
              <div>
                {arr.map((item: any, index: number) => (
                  <span>
                    <span>{item.round_name}</span>
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.mainRounds)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '主投赛道',
      key: 'tracks',
      // ellipsis: true,
      width: 156,
      render(row) {
        if (row.mainTrack) {
          try {
            const arr = JSON.parse(row.mainTrack)
            return h(
              <div style="margin:-12px 0;">
                {arr.map((item: any, index: number) => (
                  <span>
                    <span>{item.track_name}</span>
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.mainTrack)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}

export function trackOrgColumns(): DataTableColumns<Tz.Api.Front.EntityFin.Org> {
  const orgStore = useOrganizationStore()
  const companyStore = useCompanyStore()
  return [
    {
      title: '机构名称',
      key: 'name',
      width: 186,
      ellipsis: true,
      render(row) {
        const nameSlots = {
          trigger: () => (
            <span
              class="text-weight-hover__primary cursor ellipsis w-130px"
              style="line-height:30px"
              onClick={() => orgStore.goDetail(row.id)}
            >
              {row.name}
            </span>
          )
        }
        return h(
          <div style="display:flex;justify-content: flex-start">
            <div class="mr-10px">
              <ImgView size={30} src={row.logo} />
            </div>
            <div>
              {isLargerSpan(row.name, 127) ? (
                <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                  <div>{row.name}</div>
                </NTooltip>
              ) : (
                <span
                  class="text-weight-hover__primary cursor ellipsis"
                  style="line-height:30px"
                  onClick={() => orgStore.goDetail(row.id)}
                >
                  {row.name}
                </span>
              )}
            </div>
          </div>
        )
      }
    },
    {
      title: '成立时间',
      key: 'establishTime',
      width: 110,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.establishTime) {
          return timeFormat(row.establishTime, row.timeType)
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '总部',
      key: 'regionName',
      width: 112,
      render(row) {
        if (row.regionName) {
          try {
            const obj = JSON.parse(row.regionName)
            return obj.name || defaultSpan()
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
      title: '机构类型',
      key: 'finTypeName',
      width: 112,
      render(row) {
        if (row.finTypeName) {
          return row.finTypeName
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '本赛道累计投资',
      key: 'investNumTotal',
      sorter: true,
      sortOrder: 'descend',
      renderSorterIcon: sorterRender,
      width: 164,
      render(row): any {
        if (![-1, 0].includes(row.investNumTotal)) {
          return h(
            <NNumberAnimation
              precision={0}
              show-separator
              active={false}
              from={row.investNumTotal}
              to={row.investNumTotal}
            />
          )
        } else {
          return 0
        }
      }
    },
    {
      title: '本赛道近一年投资',
      key: 'investNumYear',
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      width: 160,
      render(row): any {
        if (![-1, 0].includes(row.investNumYear)) {
          return h(
            <NNumberAnimation
              precision={0}
              show-separator
              active={false}
              from={row.investNumYear}
              to={row.investNumYear}
            />
          )
        } else {
          return 0
        }
      }
    },
    {
      title: '投资案例',
      key: 'investEmp',
      render(row) {
        if (row.investEmp) {
          try {
            const arr = JSON.parse(row.investEmp)
            return h(
              <div style="margin:-12px 0;">
                {arr.map((item: any, index: number) => (
                  <span>
                    {item.is_pub === '0' && (
                      <span
                        class="text-hover__primary cursor"
                        onClick={() => {
                          companyStore.goDetail(item.entity_id)
                        }}
                      >
                        {item.entity_name}
                      </span>
                    )}
                    {item.is_pub !== '0' && <span>{item.entity_name}</span>}
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.mainTrack)
            return 'error'
          }
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}

export function globalSearchOrgColumns(): DataTableColumns<Tz.Api.Front.GlobalSearch.Org.Post.Org> {
  const orgStore = useOrganizationStore()
  return [
    {
      title: '机构名称',
      key: 'name',
      width: 166,
      ellipsis: true,
      render(row) {
        const name = transHighlightText(row.highlight.name)
        const nameSlots = {
          trigger: () => (
            <span
              class="text-weight-hover__primary cursor ellipsis w-110px"
              style="line-height:30px"
              onClick={() => orgStore.goDetail(row.id)}
              v-html={name || row.name}
            />
          )
        }
        return h(
          <div style="display:flex;justify-content: flex-start">
            <div class="mr-10px">
              <ImgView size={30} src={row.logo} />
            </div>
            <div>
              {isLargerSpan(row.name, 107) ? (
                <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                  <div>{row.name}</div>
                </NTooltip>
              ) : (
                <span
                  class="text-weight-hover__primary cursor ellipsis"
                  style="line-height:30px"
                  onClick={() => orgStore.goDetail(row.id)}
                  v-html={name || row.name}
                />
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
      title: '总部',
      key: 'regionName',
      width: 122,
      render(row) {
        if (row.regionName) {
          try {
            const obj = JSON.parse(row.regionName)
            return obj.name || defaultSpan()
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
      title: '累计投资',
      key: 'investNumTotal',
      width: 80,
      render(row): any {
        if (![-1, 0].includes(row.investNumTotal)) {
          return h(
            <NNumberAnimation
              precision={0}
              show-separator
              active={false}
              from={row.investNumTotal}
              to={row.investNumTotal}
            />
          )
        } else {
          return 0
        }
      }
    },
    {
      title: '近一年投资',
      key: 'investNumYear',
      width: 90,
      render(row): any {
        if (![-1, 0].includes(row.investNumYear)) {
          return h(
            <NNumberAnimation
              precision={0}
              show-separator
              active={false}
              from={row.investNumYear}
              to={row.investNumYear}
            />
          )
        } else {
          return 0
        }
      }
    },
    {
      title: '主投赛道',
      key: 'tracks',
      // ellipsis: true,
      width: 156,
      render(row) {
        if (row.mainTrack) {
          try {
            const arr = JSON.parse(row.mainTrack)
            return h(
              <div style="margin:-2px 0;">
                {arr.map((item: any, index: number) => (
                  <span>
                    <span>{item.track_name}</span>
                    {index !== arr.length - 1 && <span>、</span>}
                  </span>
                ))}
              </div>
            )
          } catch (err: any) {
            console.log('errorInfo', err)
            console.log('errorData', row.mainTrack)
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
