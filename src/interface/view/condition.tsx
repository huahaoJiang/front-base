import { ConditionTypeEnum } from '@/interface/common'

export interface IQueryCondition {
  id: string
  tags: string
  tracks: string
  regionName: string
  establishTime: string
  newInvestDate: string
  name: string
  rounds: string
  roundsName: string
  curInvestor: string
  businessScope: string
}
export interface IConditionItem {
  title: string
  key: string
  multiple: boolean
  expand?: boolean
  dictUrl?: string
  dictData: IDictData[]
  type: ConditionTypeEnum
  timeValue?: null
  level?: number
  isLeaf?: boolean
  children?: IConditionItem[]
  code?: string
  height?: string
  maxHeight?: string
  rotate?: string
  hideDivider?: boolean
}
export interface IDictData {
  key: string
  value?: string
  title?: string
  keyValue?: string
  dictKey?: string
  dictValue?: string
  isActive: boolean
  children?: IDictData[]
}
export interface IViewTag {
  key: string
  type: IConditionItem['type']
  title: string
  keyValue: string
  titleValue: string
  multiple: boolean
}
export function queryConditions(): IConditionItem[] {
  return [
    {
      title: '特色推荐',
      key: 'tags',
      type: ConditionTypeEnum.tag,
      multiple: false,
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        },
        {
          key: '110204',
          value: '独角兽',
          isActive: false
        },
        {
          key: '110210',
          value: '极速融资',
          isActive: false
        }
      ]
    },
    {
      title: '行业赛道',
      key: 'tracks',
      type: ConditionTypeEnum.track,
      multiple: false,
      dictUrl: '/tz-system/track/lazy-tree?code=1',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '企业状态',
      key: 'roundsList',
      multiple: true,
      type: ConditionTypeEnum.rounds,
      expand: true,
      height: '28px',
      maxHeight: '56px',
      rotate: 'rotate(0)',
      dictUrl: '/tz-system/roundsdict/page?businessId=22&size=30&current=1',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '时间',
      key: 'time',
      type: ConditionTypeEnum.time,
      multiple: false,
      dictData: timeListInit()
    },
    {
      title: '国家地区',
      key: 'region',
      type: ConditionTypeEnum.region,
      multiple: false,
      dictUrl: '/blade-system/region/select',
      dictData: []
    },
    {
      title: '地区选择',
      key: 'cnRegion',
      type: ConditionTypeEnum.cnRegion,
      multiple: false,
      expand: true,
      height: '28px',
      rotate: 'rotate(0)',
      maxHeight: '58px',
      dictData: []
    },
    {
      title: '地区选择',
      key: 'usaRegion',
      type: ConditionTypeEnum.usaRegion,
      multiple: false,
      expand: true,
      height: '28px',
      rotate: 'rotate(0)',
      maxHeight: '120px',
      dictData: []
    },
    {
      title: '地区选择',
      key: 'euRegion',
      type: ConditionTypeEnum.euRegion,
      multiple: false,
      expand: true,
      height: '28px',
      maxHeight: '86px',
      rotate: 'rotate(0)',
      dictData: []
    },
    {
      title: '事件类型',
      key: 'eventRounds',
      type: ConditionTypeEnum.rounds,
      multiple: true,
      expand: true,
      height: '28px',
      maxHeight: '56px',
      rotate: 'rotate(0)',
      dictUrl: '/tz-system/roundsdict/page?businessList=12,30&size=30&current=1',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '主投轮次',
      key: 'mainRound',
      type: ConditionTypeEnum.rounds,
      multiple: true,
      expand: false,
      dictUrl: '/tz-system/roundsdict/page?businessId=13&size=30&current=1',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '交易金额',
      key: 'moneyAmount',
      type: ConditionTypeEnum.money,
      multiple: false,
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        },
        {
          key: '1-500',
          value: '¥0-500万',
          isActive: false
        },
        {
          key: '500-1000',
          value: '¥500-1000万',
          isActive: false
        },
        {
          key: '1000-5000',
          value: '¥1000-5000万',
          isActive: false
        },
        {
          key: '5000-10000',
          value: '¥5000万-1亿',
          isActive: false
        },
        {
          key: '10000-50000',
          value: '¥1-5亿',
          isActive: false
        },
        {
          key: '50000-100000',
          value: '¥5-10亿',
          isActive: false
        },
        {
          key: '100000-200000',
          value: '¥10-20亿',
          isActive: false
        },
        {
          key: '200000-500000',
          value: '¥20-50亿',
          isActive: false
        },
        {
          key: '500000-',
          value: '¥50亿及以上',
          isActive: false
        }
      ]
    },
    {
      title: '投资方',
      key: 'eventInestor',
      multiple: false,
      type: ConditionTypeEnum.invest,
      dictData: []
    },
    {
      title: '上市市场',
      key: 'marketList',
      multiple: true,
      type: ConditionTypeEnum.dict,
      dictUrl: '/blade-system/dict/dictionary2?code=IPO_Market',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '事件分类',
      key: 'eventType',
      multiple: false,
      expand: true,
      height: '28px',
      maxHeight: '56px',
      type: ConditionTypeEnum.dict,
      dictUrl: '/blade-system/dict/dictionary2?code=Info_Event_Type',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '主投赛道',
      key: 'mainTrack',
      multiple: true,
      type: ConditionTypeEnum.tag,
      dictUrl: '/tz-system/track/lazy-tree?code=1',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '机构类型',
      key: 'orgType',
      multiple: true,
      type: ConditionTypeEnum.tag,
      dictUrl: '/blade-system/dict/dictionary2?code=fin_entity_type',
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        }
      ]
    },
    {
      title: '投资类型',
      key: 'investType',
      type: ConditionTypeEnum.tag,
      multiple: true,
      dictData: [
        {
          key: '0',
          value: '不限',
          isActive: true
        },
        {
          key: '独投',
          value: '独投',
          isActive: false
        },
        {
          key: '合投',
          value: '合投',
          isActive: false
        },
        {
          key: '领投',
          value: '领投',
          isActive: false
        },
        {
          key: '跟投',
          value: '跟投',
          isActive: false
        }
      ]
    }
  ]
}

const timeListInit = () => {
  let currentYear = new Date().getFullYear()
  const array = new Array(9).fill('').map((item, index) => {
    const year = currentYear--
    if (index === 8) {
      return {
        key: 'before' + year,
        value: year + '及以前',
        isActive: false
      }
    }
    return {
      key: year.toString(),
      value: year.toString(),
      isActive: false
    }
  })
  return [
    {
      key: '0',
      value: '不限',
      isActive: true
    },
    {
      key: '1',
      value: '近半年',
      isActive: false
    },
    {
      key: '2',
      value: '近一年',
      isActive: false
    },
    {
      key: '3',
      value: '近三年',
      isActive: false
    },
    ...array
  ]
}
export interface ITagObj {
  key: string
  value: string
  keyValue?: string
}
