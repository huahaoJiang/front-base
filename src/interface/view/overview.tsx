import { WidthCalculator } from '@utils/common/widthCalculator'
import type { DataTableColumns } from 'naive-ui'

import { defaultSpan } from '@/components/commonFrag'
import type { eventDistributeTypeEnum } from '@/constants/enum'
import { eventWDistributeEnum, INVESTOR_TYPE } from '@/constants/enum'
import { useCompanyStore } from '@/store/view/company'
import { useTrackStore } from '@/store/view/track'

import { toInvestorDetail } from './utils'

export const EMP_REGION_CODE_MAP = {
  [eventWDistributeEnum.china]: '00',
  [eventWDistributeEnum.usa]: '02',
  [eventWDistributeEnum.eu]: '80',
  [eventWDistributeEnum.other]: '90'
}
export interface IEmpRow {
  region: eventWDistributeEnum
  regionName?: string
  ipoEmp?: string
  ipoEmpNum?: number
  fastEmp?: string
  fastEmpNum?: number
  unicornEmp?: string
  unicornEmpNum?: number
}

export interface IInvestRow {
  region: string
  regionName: string
  mostList: InvestCol[]
  ipoList: InvestCol[]
}

export interface InvestCol {
  name: string
  code: string
  num: number
  type: INVESTOR_TYPE
  is_pub: string
}

export type IWorldData = Record<eventDistributeTypeEnum, number[]>

export function EmpColumns(): DataTableColumns<IEmpRow> {
  return [
    {
      title: '地区',
      key: 'regionName',
      render(row) {
        if (row.regionName) {
          return row.regionName
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '上市企业',
      key: 'ipoEmp',
      width: 335,
      render(row) {
        return parseColumns(row.ipoEmp, row.ipoEmpNum, '/track/ipoCompany', row.region)
      }
    },
    {
      title: '独角兽',
      key: 'unicornEmp',
      width: 335,
      render(row) {
        return parseColumns(row.unicornEmp, row.unicornEmpNum, '/track/unicornCompany', row.region)
      }
    },
    {
      title: '极速融资',
      key: 'fastEmp',
      width: 335,
      render(row) {
        return parseColumns(row.fastEmp, row.fastEmpNum, '/track/fastCompany', row.region)
      }
    }
  ]
}

function parseColumns(
  columns: string | undefined,
  num: number | undefined,
  path: string,
  region: eventWDistributeEnum
) {
  const companyStore = useCompanyStore()
  const trackStore = useTrackStore()
  const router = useRouter()

  if (columns) {
    try {
      const arr = JSON.parse(columns)
      const filterArr = handleEmpData(arr, 280)
      return h(
        <div style="position: relative;padding-right:30px">
          {filterArr.map((item: any, index: number) => (
            <span>
              <span
                class="text-hover__primary cursor"
                onClick={() => {
                  companyStore.goDetail(item.entity_id)
                }}
              >
                {item.entity_name}
              </span>
              {index !== filterArr.length - 1 && <span>、</span>}
            </span>
          ))}
          <div
            class="text-hover__primary cursor"
            onClick={() => {
              router.push({
                path: path,
                query: { code: trackStore.tracksDetail.code, region: EMP_REGION_CODE_MAP[region] }
              })
            }}
            style="position:absolute;right:2px;top:2px"
          >
            [ {num || 0} ]
          </div>
        </div>
      )
    } catch (err: any) {
      console.log('errorInfo', err)
      console.log('errorData', columns)
      return 'error'
    }
  } else {
    return defaultSpan()
  }
}

export function InvestColumns(): DataTableColumns<IInvestRow> {
  return [
    {
      title: '地区',
      key: 'regionName',
      render(row) {
        if (row.regionName) {
          return row.regionName
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '出手次数多的投资方',
      key: 'mostList',
      width: 500,
      render(row) {
        if (row.mostList.length) {
          const filterArr = handleInvestData(row.mostList, 470)
          return h(
            <div>
              {filterArr.map((item, index: number) => (
                <span
                  class={
                    item.is_pub === '0' && [INVESTOR_TYPE.COMPANY, INVESTOR_TYPE.ORGANIZATION].includes(item.type)
                      ? 'text-hover__primary cursor'
                      : ''
                  }
                >
                  <span onClick={() => toInvestorDetail({ ...item, entity_id: item.code })}>{item.name}</span>
                  <span>({item.num})</span>
                  {index !== filterArr.length - 1 && <span>&nbsp;&nbsp;</span>}
                </span>
              ))}
            </div>
          )
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '上市企业的投资方',
      key: 'ipoList',
      width: 500,
      render(row) {
        if (row.ipoList.length) {
          const filterArr = handleInvestData(row.ipoList, 470)
          return h(
            <div>
              {filterArr.map((item, index: number) => (
                <span>
                  <span
                    class={
                      item.is_pub === '0' && [INVESTOR_TYPE.COMPANY, INVESTOR_TYPE.ORGANIZATION].includes(item.type)
                        ? 'text-hover__primary cursor'
                        : ''
                    }
                    onClick={() => toInvestorDetail({ ...item, entity_id: item.code })}
                  >
                    {item.name}
                  </span>
                  <span class="cursor">({item.num})</span>
                  {index !== filterArr.length - 1 && <span>&nbsp;&nbsp;</span>}
                </span>
              ))}
            </div>
          )
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}

export function InvestDetailColumns(): DataTableColumns<Tz.Api.Front.TrackOverview.TrackFinEventnumDetail.InvestorItem> {
  return [
    {
      title: '投资方',
      key: 'regionName',
      render(row) {
        if (row.entityFinName) {
          const data = {
            entity_id: row.entityFinId,
            is_pub: row.isPub,
            ...row
          }
          return h(
            <div
              class={
                row.isPub === '0' && [INVESTOR_TYPE.COMPANY, INVESTOR_TYPE.ORGANIZATION].includes(row.type)
                  ? 'text-hover__primary cursor'
                  : ''
              }
            >
              <span onClick={() => toInvestorDetail(data)}>{row.entityFinName}</span>
              <span> ({row.finEventCount})</span>
            </div>
          )
        } else {
          return defaultSpan()
        }
      }
    },
    {
      title: '中国投资企业',
      key: 'regionChina',
      width: 310,
      render(row) {
        return parseInvestDetailColumns(row.regionChina)
      }
    },
    {
      title: '美国投资企业',
      key: 'regionUsa',
      width: 310,
      render(row) {
        return parseInvestDetailColumns(row.regionUsa)
      }
    },
    {
      title: '欧洲投资企业',
      key: 'regionEur',
      width: 310,
      render(row) {
        return parseInvestDetailColumns(row.regionEur)
      }
    }
  ]
}

function parseInvestDetailColumns(columns: string) {
  const companyStore = useCompanyStore()
  if (columns) {
    try {
      const arr = JSON.parse(columns)
      const filterArr = handleInvestDetailData(arr, 280)
      return h(
        <div>
          {filterArr.map((item: any, index: number) => (
            <span class="text-hover__primary cursor">
              <span
                onClick={() => {
                  companyStore.goDetail(item.entity_id)
                }}
              >
                {item.entity_name}
              </span>
              <span> ({item.count})</span>
              {index !== filterArr.length - 1 && <span>&nbsp;&nbsp;</span>}
            </span>
          ))}
        </div>
      )
    } catch (err: any) {
      console.log('errorInfo', err)
      console.log('errorData', columns)
      return 'error'
    }
  } else {
    return defaultSpan()
  }
}

function handleEmpData(arr: { entity_name: string; entity_id: string }[], maxWidth: number) {
  const calculator = new WidthCalculator()
  const filterArr = arr.filter(item => {
    if (calculator.append(item.entity_name) < maxWidth) {
      calculator.append('、')
      return true
    } else {
      return false
    }
  })
  calculator.remove()
  return filterArr
}

function handleInvestData(arr: InvestCol[], maxWidth: number) {
  const calculator = new WidthCalculator()
  const filterArr = arr.filter(item => {
    if (calculator.append(`${item.name}(${item.num})`) < maxWidth) {
      calculator.append('、')
      return true
    } else {
      return false
    }
  })
  calculator.remove()
  return filterArr
}

function handleInvestDetailData(arr: { entity_name: string; entity_id: string; count: number }[], maxWidth: number) {
  const calculator = new WidthCalculator()
  const filterArr = arr.filter(item => {
    if (calculator.append(`${item.entity_name}(${item.count})`) < maxWidth) {
      calculator.append('、')
      return true
    } else {
      return false
    }
  })
  calculator.remove()
  return filterArr
}
