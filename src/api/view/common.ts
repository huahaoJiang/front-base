import { request } from '@utils/http'

export function getCompanyTableData(params: Tz.Api.Front.EntityEmp.Page.Get.Req) {
  return request<Tz.Api.Front.EntityEmp.Page.Get.Res>({
    url: '/tz-front/entityemp/page',
    method: 'get',
    params
  })
}

export function getEventList(params: Tz.Api.Front.Finevent.Page.Get.Req) {
  return request<Tz.Api.Front.Finevent.Page.Get.Res>({
    url: '/tz-front/finevent/page',
    method: 'get',
    params
  })
}

export function getOrganizationList(params: Tz.Api.Front.EntityFin.Page.Get.Req) {
  return request<Tz.Api.Front.EntityFin.Page.Get.Res>({
    url: '/tz-front/entityfin/page',
    method: 'get',
    params
  })
}

export function getOrgListByTrack(params: Tz.Api.Front.EntityFin.FindFinByTrack.Get.Req) {
  return request<Tz.Api.Front.EntityFin.FindFinByTrack.Get.Res>({
    url: '/tz-front/entityfin/findFinByTrack',
    method: 'get',
    params
  })
}

export function getTrackTableData(params: Tz.Api.Front.TrackAll.List.Get.Req) {
  return request<Tz.Api.Front.TrackAll.List.Get.Res>({
    url: '/tz-front/trackall/list',
    method: 'get',
    params
  })
}

export function getTrackDetail(params: Tz.Api.Front.TrackAll.Detail.Get.Req) {
  return request<Tz.Api.Front.TrackAll.Detail.Get.Res>({
    url: '/tz-front/trackall/detail',
    method: 'get',
    params
  })
}

export const getFileUrl = (fileName: string) => {
  return request<Tz.Api.Resource.File.GetPreviewFileUrl.Get.Res>({
    url: '/tz-resource/file/getPreviewFileUrl',
    method: 'get',
    params: {
      fileName
    }
  })
}

export const getSketchImgUrl = (bucketName: string, fileName: string) => {
  return request<Tz.Api.Resource.File.GetPreviewFileUrlByBucket.Get.Res>({
    url: '/tz-resource/file/getPreviewFileUrlByBucket',
    method: 'get',
    params: {
      bucketName,
      fileName
    }
  })
}

export const getIndicationDetail = (trackCode: string) => {
  return request<Tz.Api.Front.TrackContent.IndicationDetail.Get.Res>({
    url: '/tz-front/trackcontent/indicationDetail',
    method: 'get',
    params: {
      trackCode
    }
  })
}
export const getTrackContent = (trackCode: string, channelType: string) => {
  return request<Tz.Api.Front.TrackContent.Detail.Get.Res>({
    url: '/tz-front/trackcontent/detail',
    method: 'get',
    params: {
      trackCode,
      channelType
    }
  })
}

export const getRelatedPolicyPage = (params: Tz.Api.Front.TrackContent.RelatedPolicyPage.Get.Req) => {
  return request<Tz.Api.Front.TrackContent.RelatedPolicyPage.Get.Res>({
    url: '/tz-front/trackcontent/relatedPolicyPage',
    method: 'get',
    params
  })
}
export const getRegion = (code: string) => {
  return request<Tz.Api.System.Region.Select.Get.Res>({
    url: '/blade-system/region/select',
    method: 'get',
    params: {
      code
    }
  })
}
