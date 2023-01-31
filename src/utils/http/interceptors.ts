import { toLogin } from '@utils/auth'
import { isNullOrUndef } from '@utils/is'
import { getToken } from '@utils/token'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Base64 } from 'js-base64'

import { router } from '@/router'

import { isWithoutToken } from './helpers'

const envConfig = import.meta.env
const Authorization = `Basic ${Base64.encode(`${envConfig.VITE_CLIENT_ID}:${envConfig.VITE_CLIENT_SECRET}`)}`
export function reqResolve(config: AxiosRequestConfig) {
  // 防止缓存，给get请求加上时间戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() }
  }
  config.headers && (config.headers['Authorization'] = Authorization)
  // 处理不需要token的请求(登录)
  if (isWithoutToken(config)) {
    return config
  }
  const token = getToken()

  if (!token) {
    /**
     * * 未登录或者token过期的情况下
     * * 跳转登录页重新登录，携带当前路由及参数，登录成功会回到原来的页面
     */
    toLogin()
    return Promise.reject({ code: '-1', message: '未登录' })
  }

  /**
   * * jwt token
   * ! 认证方案: Bearer
   */
  config.headers && (config.headers['Blade-Auth'] = 'bearer ' + getToken())
  // config.headers && (config.headers.Authorization = config.headers?.Authorization || 'Bearer ' + token)

  return config
}

export function repResolve<T>(response: AxiosResponse<Tz.Utils.Response.Tz<T>>) {
  return response
}

export function repReject(error: any) {
  error = error ?? {}
  let { code, message } = error
  const { response } = error
  console.error(response)
  if (isNullOrUndef(code)) {
    // 未知错误
    code = -1
    !message && (message = '接口异常！')
  } else {
    if (response) {
      const { msg, status } = response
      switch (status) {
        case 401:
          message = msg || '登录已过期'
          // setToken('')
          router.push('/login')
          break
        case 403:
          message = msg || '没有权限'
          break
        case 404:
          message = msg || '资源或接口不存在'
          break
        default:
          message = msg || '服务端异常'
          break
      }
    }
  }
  // console.error(`【${code}】 ${message}`)
  return Promise.reject({ code, message, error })
}
