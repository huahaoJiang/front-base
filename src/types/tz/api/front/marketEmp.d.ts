import type { DATE_TYPE } from '@/constants/enum'

declare global {
  namespace Tz {
    namespace Api {
      namespace Front {
        namespace MarketEmp {
          namespace MarketEmpCount {
            namespace Get {
              type Req = {
                trackCode: string
              }

              type Res = {
                year: string
                globalIdent: string
                /** 累计 */
                numSum: number
                /** 增量 */
                numUp: number
                regionName: string
              }[]
            }
          }

          namespace MarketValue {
            namespace Get {
              type Req = {
                trackCode: string
                dateType: DATE_TYPE
              }

              type Res = {
                globalIdent: string
                /** 时间 */
                mydate: string
                /** 季 */
                quarter: string
                /** 总市值 */
                totalMarketValue: number
                /** 平均市值 */
                avgMarketValue: number
                regionName: string
                y?: number
              }[]
            }
          }

          namespace MarketShareIndex {
            namespace Get {
              type Req = {
                tsCode: string
                dateType: DATE_TYPE
              }

              type Res = {
                dateType: DATE_TYPE
                mydate: string
                /** 市盈率 */
                pe: number
                /** 市销率 */
                ps: number
                quarter: string
                /** 总市值 */
                totalMv: number
              }[]
            }
          }
        }
      }
    }
  }
}

export {}
