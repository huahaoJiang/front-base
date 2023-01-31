export enum ConditionTypeEnum {
  'rounds' = 'rounds',
  'time' = 'time',
  'track' = 'track',
  'tag' = 'tag',
  'region' = 'region',
  'cnRegion' = 'cnRegion',
  'usaRegion' = 'usaRegion',
  'euRegion' = 'euRegion',
  'money' = 'money',
  'invest' = 'invest',
  'dict' = 'dict',
  'select' = 'select'
}

export enum TrackAnalyzeEnum {
  sketch = '2',
  analyze = '3',
  market = '5'
}
export function handleAmount(amount: number): { val: number; unit: AmountUnit; precision: number } {
  if (amount < 10000) {
    return {
      val: amount as number,
      unit: '万',
      precision: 0
    }
  } else if (amount >= 100000000) {
    const sum = amount / 100000000
    return {
      val: parseFloat(sum.toFixed(2)),
      unit: '万亿',
      precision: 2
    }
  } else if (amount >= 10000) {
    const sum = amount / 10000
    return {
      val: parseFloat(sum.toFixed(2)),
      unit: '亿',
      precision: 2
    }
  } else {
    return {
      val: 0,
      unit: '万',
      precision: 0
    }
  }
}

export type AmountUnit = '万' | '亿' | '万亿' | ''

export function handleAmountTransform(amount: number, unit: AmountUnit, precision: number = 2) {
  if (unit === '万') {
    return parseInt(String(amount))
  }
  if (unit === '亿') {
    return parseFloat((amount / 10000).toFixed(precision))
  }
  if (unit === '万亿') {
    return parseFloat((amount / 100000000).toFixed(precision))
  }
}

export function secondaryMarketAmountTransform(amount: number) {
  const signBit = amount < 0 ? '-' : ''
  amount = Math.abs(amount)
  if (amount < 10000) {
    return {
      signBit,
      val: Number(amount.toFixed(2)),
      unit: '万'
    }
  } else if (amount < 100000000) {
    return {
      signBit,
      val: Number((amount / 10000).toFixed(2)),
      unit: '亿'
    }
  } else {
    return {
      signBit,
      val: Number((amount / 100000000).toFixed(2)),
      unit: '万亿'
    }
  }
}

export interface IConditionColumns {
  title?: string
  key: string
  multiple?: boolean
  hideDivider?: boolean
  value?: string
  maxLevel?: number
  default?: string | string[]
}
