import { isNullOrUndef } from '@utils/is'

export class WebStorage<T extends Record<string, any>> {
  private storage: Storage
  private prefixKey: string
  constructor(option: any) {
    this.storage = option.storage
    this.prefixKey = option.prefixKey
  }

  getKey<Key extends string & keyof T>(key: Key) {
    return `${this.prefixKey}${key}`.toUpperCase()
  }

  set<Key extends string & keyof T>(key: Key, value: T[Key], expire = 3600 * 24) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire) ? new Date().getTime() + expire * 1000 : null
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get<Key extends string & keyof T>(key: Key) {
    const { value } = this.getItem(key)
    return value
  }

  getItem<Key extends string & keyof T>(
    key: Key,
    def = { time: 0, value: null }
  ): { value: T[Key] | null; time: number } {
    const val = this.storage.getItem(this.getKey(key))
    if (!val) return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      this.remove(key)
      return def
    } catch (error) {
      this.remove(key)
      return def
    }
  }

  remove<Key extends string & keyof T>(key: Key) {
    this.storage.removeItem(this.getKey(key))
  }
  clear() {
    this.storage.clear()
  }
}

export function createWebStorage<T extends Record<string, any>>({ prefixKey = '', storage = sessionStorage }) {
  return new WebStorage<T>({ prefixKey, storage })
}
