import type { RouteLocationNormalized } from 'vue-router'

type PreloadTask = (to: RouteLocationNormalized, from: RouteLocationNormalized) => void

// 浏览器空闲时间调度任务
function scheduler(callback: () => void, timeout?: number) {
  if (typeof window.requestIdleCallback === 'function') {
    requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, timeout)
  }
}

/**
 * 创建空闲时任务
 */
const trackDetailPreload: PreloadTask = () => {
  scheduler(function () {
    // 执行
  })
}

// 注册空闲任务
export const PRELOAD_TASK: PreloadTask[] = [trackDetailPreload]
