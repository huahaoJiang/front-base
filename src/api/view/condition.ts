import { request } from '@utils/http'

// 后边 这里所有类型和condition组件一起重构
export function getDictData(url: string) {
  return request({
    url: url,
    method: 'get'
  })
}
export function getTrackInvest(trackCode: string) {
  return request({
    url: '/tz-front/entityfin/listtop30',
    method: 'get',
    params: {
      code: trackCode
    }
  })
}

export const getCompanyOptions = (current: number, name: string) => {
  return request({
    url: '/tz-entity/entitycompany/page',
    method: 'get',
    params: {
      name,
      current,
      size: 10,
      isPub: '0'
    }
  })
}

export const getInvestOptions = (current: number, name: string) => {
  return request({
    url: '/tz-entity/entityfin/page',
    method: 'get',
    params: {
      name,
      current,
      size: 10,
      isPub: '0'
    }
  })
}
