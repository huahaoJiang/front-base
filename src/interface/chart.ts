export interface IChartParams {
  yAxis?: IyAxisCfg
  xAxis?: IxAxisCfg
  series?: ISeriesCfg[]
  tooltip?: Record<string, any>
}

export interface ISeriesCfg {
  name: string
  data: number[]
}
export interface IyAxisCfg {
  data: string[]
}
export interface IxAxisCfg {
  data: string[]
}

export interface IChartsParams {
  xField?: string
  yField?: string
  seriesField?: string
  data: Record<string, any>[]
}
