type CacheResultType<T = any> = {
  data: T
  expire: number
}

class HttpCache {
  private capacity: number

  private cache: Map<string, CacheResultType>

  constructor(capacity: number) {
    if (capacity < 0) {
      throw new Error('capacity必须是一个正数')
    }
    this.capacity = capacity

    this.cache = new Map()
  }

  get(key: string) {
    const data = this.cache.get(key)

    if (!data) return

    this.cache.delete(key)

    if (data.expire < Date.now()) return

    this.cache.set(key, data)

    return data.data
  }

  set(key: string, value: any, cacheTime: number = 60 * 60) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, { data: value, expire: Date.now() + cacheTime * 1000 })
  }
}

export default HttpCache
