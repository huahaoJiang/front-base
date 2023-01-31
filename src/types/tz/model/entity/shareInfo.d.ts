declare namespace Tz {
  namespace Model {
    namespace Entity {
      namespace Share {
        interface BaseShareInfo {
          /** 币种 */
          currType: string
          /** 交易所 */
          exchange: string
          exchangeName: string
          /** 收入 */
          income: number
          /** 上市时间 */
          listDate: string
          market: string
          /** 净利润 */
          netProfits: number
          /** 净利率 */
          netProfitsRate: number
          /** 市盈率 */
          pe: number
          /** 市销率 */
          ps: number
          /** 总市值 */
          totalMv: number
          /** 股票代码 */
          symbol: string
          /**  */
          tsCode: string
        }

        interface ShareDetail extends BaseShareInfo {
          /** 股票简称 */
          symbolName: string
          /** 股价 收盘价 */
          close: number
          /** 涨跌额	 */
          changeAmount: number
          /** 涨跌幅 */
          pctChg: number
          /** 开盘价 股价 */
          open: number
          /** 昨收价 */
          preClose: number
          /** 最高价 */
          high: number
          /** 最低价 */
          low: number
          /** 今年至今 */
          beginToNow: number
          /** 交易日期 */
          tradeDate: number
        }
      }
    }
  }
}
