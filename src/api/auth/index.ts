import { request } from '@utils/http'

export const loginByUsername = (params: Tz.Api.Auth.Token.Post.Req) => {
  console.log(import.meta.env, 4)
  return request<Tz.Api.Auth.Token.Post.Res>({
    url: '/blade-auth/token',
    method: 'post',
    params: {
      grantType: 'password',
      tenantId: import.meta.env.VITE_TENANT_ID || '629622',
      type: 'account',
      ...params
    }
  })
}

export const loginByQrCode = (params: Tz.Api.Auth.Token.Post.Req) => {
  return request<Tz.Api.Auth.Token.Post.Res>({
    url: '/blade-auth/token',
    method: 'post',
    params: {
      grantType: 'social',
      tenantId: import.meta.env.VITE_TENANT_ID || '629622',
      source: 'feishu',
      state: 'STATE',
      ...params
    }
  })
}

export const refreshToken = (refreshToken: string) => {
  return request<Tz.Api.Auth.Token.Post.Res>({
    url: '/blade-auth/token',
    method: 'post',
    params: {
      grantType: 'refresh_token',
      refreshToken
    }
  })
}

export function getMenu() {
  return request<Tz.Api.System.Menu.Routes.Get.Res>({
    url: '/blade-system/menu/routes',
    method: 'get'
  })
}
