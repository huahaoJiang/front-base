import type { DataTableBaseColumn } from 'naive-ui'
import { NEllipsis } from 'naive-ui'

import { defaultSpan, sorterRender } from '@/components/commonFrag'
import ImgView from '@/components/views/imgView.vue'
import { useCompanyStore } from '@/store/view/company'
import { numDivide } from '@/utils/index'

import { secondaryMarketAmountTransform } from '../common'
import { timeFormat } from './utils'

export function listedCompanyColumns(): DataTableBaseColumn<
  { rowSpan?: number } & Tz.Model.Front.EntityEmp.BaseCompanyInfo &
    Tz.Model.Entity.Share.BaseShareInfo & { entityId: string }
>[] {
  const companyStore = useCompanyStore()
  return [
    {
      title: '企业名称',
      key: 'name',
      width: 216,
      ellipsis: true,
      rowSpan: rowData => rowData.rowSpan || 1,
      render(row) {
        return h(
          <div style="display:flex;">
            <div class="flex mr-10px">
              <ImgView size={30} src={row.logo} />
            </div>
            <div>
              <div
                onClick={() => {
                  companyStore.goDetail(row.entityId)
                }}
              >
                <NEllipsis class="text-weight-hover__primary cursor" style="max-width: 153px">
                  {row.name}
                </NEllipsis>
              </div>
              <NEllipsis class="mt-5px text-12 color-#999" style="max-width: 153px">
                {row.introduction}
              </NEllipsis>
            </div>
          </div>
        )
      }
    },
    {
      title: '成立时间',
      key: 'establishTime',
      width: 92,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      rowSpan: rowData => rowData.rowSpan || 1,
      render(row) {
        if (row.establishTime) {
          return timeFormat(row.establishTime, row.timeTypeEmp)
        }
        return defaultSpan()
      }
    },
    {
      title: '股票代码',
      key: 'symbol',
      width: 90,
      render(row) {
        if (row.symbol) {
          return row.symbol
        }
        return defaultSpan()
      }
    },
    {
      title: '交易所',
      key: 'exchange',
      width: 97,
      render(row) {
        if (row.exchange) {
          return h(<NEllipsis>{row.exchange}</NEllipsis>)
        }
        return defaultSpan()
      }
    },
    {
      title: '上市时间',
      key: 'listDate',
      width: 92,
      sorter: true,
      sortOrder: 'descend',
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.listDate) {
          return timeFormat(row.listDate, row.timeTypeEvent)
        }
        return defaultSpan()
      }
    },
    {
      title: '市值',
      key: 'totalMv',
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (typeof row.totalMv === 'number') {
          const { val, unit } = secondaryMarketAmountTransform(row.totalMv)
          return `${row.currType}${val}${unit}`
        }
        return defaultSpan()
      }
    },
    {
      title: '收入',
      key: 'income',
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (typeof row.income === 'number') {
          const { val, unit, signBit } = secondaryMarketAmountTransform(row.income)
          return `${signBit}${row.currType}${val}${unit}`
        }
        return defaultSpan()
      }
    },
    {
      title: '净利润',
      key: 'netProfits',
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (typeof row.netProfits === 'number') {
          const { val, unit, signBit } = secondaryMarketAmountTransform(row.netProfits)
          return `${signBit}${row.currType}${val}${unit}`
        }
        return defaultSpan()
      }
    },
    {
      title: '市盈率',
      key: 'pe',
      width: 75,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (typeof row.pe !== 'number') return defaultSpan()
        if (row.pe >= 0) {
          return numDivide(row.pe)
        }
        return '亏损'
      }
    },
    {
      title: '市销率',
      key: 'ps',
      width: 75,
      sorter: true,
      sortOrder: false,
      renderSorterIcon: sorterRender,
      render(row) {
        if (typeof row.ps === 'number') {
          return numDivide(row.ps)
        }
        return defaultSpan()
      }
    }
  ]
}
