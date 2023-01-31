import type { DataTableColumns } from 'naive-ui'
import { NTooltip } from 'naive-ui'

import { defaultSpan } from '@/components/commonFrag'
import ImgView from '@/components/views/imgView.vue'
import { INVESTOR_TYPE } from '@/constants/enum'

import { toInvestorDetail } from './utils'

export const orgLinkedList = [
  { title: '基本信息', href: 'orgBasic' },
  { title: '投资偏好', href: 'preference' },
  { title: '投资事件', href: 'investEvents' },
  { title: '投资趋势', href: 'investTrend' },
  { title: '合作方', href: 'partner', bound: 300 }
]

export function partnerColumns(): DataTableColumns<Tz.Api.Front.EntityFin.Detail.Get.IMostData> {
  return [
    {
      title: '机构名称',
      key: 'entity_name',
      width: 186,
      ellipsis: true,
      render(row) {
        const nameSlots = {
          trigger: () => (
            <span
              class={
                row.is_pub === '0' && [INVESTOR_TYPE.COMPANY, INVESTOR_TYPE.ORGANIZATION].includes(row.type)
                  ? 'text-hover__primary cursor ellipsis w-160px'
                  : 'ellipsis w-160px'
              }
              style="line-height:30px"
              onClick={() => toInvestorDetail(row)}
            >
              {row.entity_name}
            </span>
          )
        }
        return h(
          <div style="display:flex;justify-content: flex-start">
            <div class="mr-10px">
              <ImgView size={30} src={row.logo} />
            </div>
            <div>
              {row.entity_name.length > 23 ? (
                <NTooltip placement="top-start" trigger={'hover'} v-slots={nameSlots}>
                  <div>{row.entity_name}</div>
                </NTooltip>
              ) : (
                <span
                  class={
                    row.is_pub === '0' && [INVESTOR_TYPE.COMPANY, INVESTOR_TYPE.ORGANIZATION].includes(row.type)
                      ? 'text-hover__primary cursor ellipsis'
                      : 'ellipsis'
                  }
                  style="line-height:30px"
                  onClick={() => toInvestorDetail(row)}
                >
                  {row.entity_name}
                </span>
              )}
            </div>
          </div>
        )
      }
    },
    {
      title: '合作次数',
      key: 'count',
      width: 100,
      align: 'right',
      render(row) {
        if (row.count) {
          return row.count + '次'
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}
