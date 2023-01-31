import { INVESTOR_TYPE, TIME_TYPE } from '@/constants/enum'
import { useCompanyStore } from '@/store/view/company'
import { useOrganizationStore } from '@/store/view/organization'

export interface Inverstor {
  entity_id: string
  type: INVESTOR_TYPE
  is_pub: string
}

export function toInvestorDetail({ entity_id, type, is_pub }: Inverstor) {
  const companyStore = useCompanyStore()
  const orgStore = useOrganizationStore()

  if (is_pub !== '0') return

  if (type === INVESTOR_TYPE.COMPANY) {
    return companyStore.goDetail(entity_id)
  }

  if (type === INVESTOR_TYPE.ORGANIZATION) {
    return orgStore.goDetail(entity_id)
  }
}

export function timeFormat(time: string, type: TIME_TYPE) {
  if (type === TIME_TYPE.YEAR) {
    return time.substring(0, 4)
  }
  if (type === TIME_TYPE.MONTH) {
    return time.substring(0, 7)
  }

  return time.substring(0, 10)
}
