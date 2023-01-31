import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { getHashByParameter } from '../index'
import HttpCache from './cache'
import { repReject, repResolve, reqResolve } from './interceptors'

const httpCache = new HttpCache(100)

const defaultOptions = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 15000
}
const axiosInstance = axios.create({
  ...defaultOptions
})

axiosInstance.interceptors.request.use(reqResolve)
axiosInstance.interceptors.response.use(repResolve, repReject)

export function request<T = any>(
  params: AxiosRequestConfig & { tz_cache?: boolean; mock?: boolean } & Required<
      Pick<AxiosRequestConfig, 'method' | 'url'>
    >
): Promise<Tz.Utils.Response.Tz<T>> {
  const { method, tz_cache = false, url, params: pet, mock = false } = params

  let hashKey = ''

  if (method.toLowerCase() === 'get' && tz_cache) {
    hashKey = getHashByParameter(url, pet)

    const result = httpCache.get(hashKey)

    if (result) return Promise.resolve(result)
  }

  if (mock) {
    params.baseURL = import.meta.env.VITE_APP_MOCK_PREFIX
  }

  return axiosInstance({
    ...params
  }).then((res: AxiosResponse<Tz.Utils.Response.Tz<T>>) => {
    if (res.data.success && tz_cache && hashKey) {
      httpCache.set(hashKey, res.data)
    }

    return res.data
  })
}
