import dayjs from 'dayjs'

/**
 * @desc  格式化时间
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(time: any = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date: any = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @desc  函数节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let previous = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = +new Date()

    if (now - previous > wait) {
      fn.apply(this, args)
      previous = now
    }
  }
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */

export function debounce<T extends (...args: any[]) => void>(method: T, wait: number, immediate?: boolean) {
  let timeout: number | null
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(this, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(this, args)
      }, wait)
    }
  }
}

/**
 * @desc 转百分比
 */
export function toPrecent(num: number | string) {
  let res = ''
  if (num !== undefined) {
    if (typeof num === 'string' && num.substr(-1, 1) === '%') {
      const beforeStr = num.substring(0, num.length - 1) as any
      if (!isNaN(beforeStr - 0)) {
        res = num
      }
    } else if (!isNaN((num as any) - 0)) {
      num = ((num as any) - 0) * 100

      res = keepTwoDecimalFull(num) + '%'
    } else {
      return num
    }
  }
  return res
}

/**
 * @desc 数字千分位分割 目前只针对整数部分
 */
export function numDivide(num: number | string, keepTwoDecimals: boolean = true) {
  if (isNaN(parseFloat(num + ''))) {
    return num
  }

  const arr = ((keepTwoDecimals ? keepTwoDecimalFull(num) : num) + '').split('.')

  const int = arr[0].split('')

  const decimal = arr[1] ? `.${arr[1]}` : ''

  return (
    int.reverse().reduce((str, curr, index) => `${curr}${index % 3 === 0 && index !== 0 ? ',' : ''}${str}`, '') +
    `${decimal}`
  )
}

export function keepTwoDecimalFull(num: number | string) {
  if (isNaN(parseFloat(num + ''))) {
    return num
  }

  num = +num

  const arr = (Math.round(num * 100) / 100 + '').split('.')

  const int = arr[0]

  const decimal = (arr[1] || '').padEnd(2, '0')

  return `${int}.${decimal}`
}

// 这里只考虑了params为Record<string, string>的情况
export const getHashByParameter = (url: string, params: Record<string, any> = {}) => {
  return Object.keys(params)
    .sort()
    .reduce((acc, curr, index) => {
      if (index === 0) {
        return `${acc}?${curr}=${params[curr]}`
      }
      return `${acc}&${curr}=${params[curr]}`
    }, url)
}
