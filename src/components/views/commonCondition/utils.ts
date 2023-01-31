import { ConditionTypeEnum } from '@/interface/common'
import type { IViewTag } from '@/interface/view/condition'

export function isNoFilter(key: string) {
  return key === '0' || key === null
}

export function handlerParams(viewTag: IViewTag, queryCondition: any) {
  switch (viewTag.type) {
    case ConditionTypeEnum.time:
      if (isNoFilter(viewTag.keyValue)) {
        queryCondition[viewTag.key] = undefined
        queryCondition[`${viewTag.key}End`] = undefined
      } else if (viewTag.keyValue === 'date-picker') {
        const arr = viewTag.titleValue.split(' 至 ')
        //自定义时间展示中文的情况
        const startTimeArr = arr[0].split('：')
        if (startTimeArr.length === 2) {
          queryCondition[viewTag.key] = startTimeArr[1]
        } else {
          queryCondition[viewTag.key] = arr[0]
        }
        queryCondition[`${viewTag.key}End`] = arr[1]
      } else {
        const arr = handleTimeParams(viewTag.keyValue)
        queryCondition[viewTag.key] = arr[0]
        queryCondition[`${viewTag.key}End`] = arr[1]
      }
      break
    case ConditionTypeEnum.money:
      if (isNoFilter(viewTag.keyValue)) {
        queryCondition[viewTag.key] = undefined
        queryCondition[`${viewTag.key}End`] = undefined
      } else {
        const arr = viewTag.keyValue.split('-')
        queryCondition[viewTag.key] = arr[0]
        queryCondition[`${viewTag.key}End`] = arr[1]
      }
      break
    case ConditionTypeEnum.cnRegion:
      if (isNoFilter(viewTag.keyValue)) {
        queryCondition[viewTag.key] = '00'
      } else {
        queryCondition[viewTag.key] = viewTag.keyValue
      }
      break
    case ConditionTypeEnum.usaRegion:
      if (isNoFilter(viewTag.keyValue)) {
        queryCondition[viewTag.key] = '02'
      } else {
        queryCondition[viewTag.key] = viewTag.keyValue
      }
      break
    case ConditionTypeEnum.euRegion:
      if (isNoFilter(viewTag.keyValue)) {
        queryCondition[viewTag.key] = '80'
      } else {
        queryCondition[viewTag.key] = viewTag.keyValue
      }
      break
    default:
      if (viewTag.multiple) {
        if (isNoFilter(viewTag.keyValue)) {
          queryCondition[viewTag.key] = undefined
        } else {
          let arrStr = queryCondition[viewTag.key]
          let value: string
          //写死 viewTag.title === '主投轮次'
          if (viewTag.title === '主投轮次') {
            value = viewTag.titleValue
          } else {
            value = viewTag.keyValue
          }
          if (arrStr) {
            const keyValStr = viewTag.keyValue.split(',')
            if (keyValStr.length > 1) {
              const multipleI = arrStr.indexOf(value)
              if (multipleI === -1) {
                arrStr += `,${value}`
                queryCondition[viewTag.key] = arrStr
              } else {
                arrStr = arrStr.replace(value, '')
                const list = arrStr.split(',')
                if (list.length > 1) {
                  queryCondition[viewTag.key] = list.filter((item: any) => !!item).join(',')
                } else {
                  queryCondition[viewTag.key] = undefined
                }
              }
            } else {
              const list = arrStr.split(',')
              const conditionI = list.findIndex((item: any) => item === value)
              if (conditionI === -1) {
                list.push(value)
              } else {
                list.splice(conditionI, 1)
              }
              queryCondition[viewTag.key] = list.length > 0 ? list.join(',') : undefined
            }
          } else {
            queryCondition[viewTag.key] = value
          }
        }
      } else {
        if (isNoFilter(viewTag.keyValue)) {
          queryCondition[viewTag.key] = undefined
        } else {
          queryCondition[viewTag.key] = viewTag.keyValue
        }
      }
  }
  return queryCondition
}

function handleTimeParams(value: string): string[] {
  let returnValue: string[] = []
  switch (value) {
    case '1':
      returnValue = getTimeParamsByDays(365 / 2)
      break
    case '2':
      returnValue = getTimeParamsByDays(365)
      break
    case '3':
      returnValue = getTimeParamsByDays(365 * 3 + 1)
      break
    default:
      if (value.startsWith('before')) {
        const val = value.substring(6)
        returnValue = ['1970-1-1', `${val}-12-31`]
      } else {
        returnValue = [`${value}-1-1`, `${value}-12-31`]
      }
  }
  return returnValue
}
function getTimeParamsByDays(days: number) {
  const currentDate = new Date()
  return [
    new Date(currentDate.getTime() - days * 24 * 3600 * 1000).toLocaleDateString().replaceAll('/', '-'),
    currentDate.toLocaleDateString().replaceAll('/', '-')
  ]
}
