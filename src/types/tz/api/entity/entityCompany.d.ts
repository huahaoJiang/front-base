import type { SortEnum, TIME_TYPE } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Entity {
        namespace EntityCompany {
          namespace pageMarket {
            namespace Get {
              type Req = Tz.Utils.Request.Pagination.Params & {
                /** 特色推荐 */
                tags?: string
                /** 赛道 */
                tracks?: string
                /** 上市市场 */
                marketList?: string
                /** 上市时间 开始 */
                marketTime?: string
                /** 上市时间 结束 */
                marketTimeEnd?: string
                /** 成立时间 开始 */
                establishTime?: string
                /** 成立时间 结束 */
                establishTimeEnd?: string
                /** 区域 */
                region?: string
                /** 名称 */
                name?: string
                /** 企业id */
                entityId?: string

                /** 排序 */
                /** 上市时间  */
                listDateSort?: SortEnum
                /** 成立时间 */
                establishTimeSort?: SortEnum
                /** 市值 */
                totalMvSort?: SortEnum
                /** 收入 */
                incomeSort?: SortEnum
                /** 净利润 */
                netProfitsSort?: SortEnum
                /** 市盈率 */
                peSort?: SortEnum
                /** 市销率 */
                psSort?: SortEnum
              }

              type Res = Tz.Utils.Response.Pagination.Data<
                { entityId: string } & Tz.Model.Front.EntityEmp.BaseCompanyInfo & {
                    dwsShareList: (Tz.Model.Entity.Share.BaseShareInfo & { timeTypeEvent: TIME_TYPE })[]
                  }
              >
            }
          }

          namespace MarketEmpDetail {
            namespace Get {
              type Req = {
                tsCode: string
              }

              type Res = Tz.Model.Entity.Share.ShareDetail
            }
          }

          namespace EmpTrackDa {
            namespace Get {
              type Req = {
                entityId: string
                trackCode: string
              }

              type Res = {
                /** 企业数 */
                empNum: number
                /** 收入 */
                income: number
                /** 收入排名 */
                incomeRank: number
                /** 市值 */
                totalMv: number
                /** 市值排名 */
                totalMvRank: number
                /** 上市时间 */
                marketTime: string
                /** 上市时间排名 */
                marketTimeRank: number
                currTypeTotalMv: string
                currTypeIncome: string

                timeTypeEvent: TIME_TYPE
              }
            }
          }
        }
      }
    }
  }
}

export {}
