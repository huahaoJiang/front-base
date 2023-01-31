import { createWebStorage } from './web-storage'

export const createLocalStorage = function <T extends Record<string, any>>(option = { prefixKey: '' }) {
  return createWebStorage<T>({
    prefixKey: option.prefixKey || '',
    storage: localStorage
  })
}

export const createSessionStorage = function <T extends Record<string, any>>(option = { prefixKey: '' }) {
  return createWebStorage<T>({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage
  })
}
