import type { INVESTOR_TYPE, SortEnum } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Front {
        namespace EntityFin {
          type Params = {
            region?: string
            establishTime?: string
            establishTimeEnd?: string
            investEmpMarket?: number
            investEmpMarketYear?: number
            investNumEmp?: number
            investNumEmpYear?: number
            investNumTotal?: number
            investNumYear?: number
            establishTimeSort?: SortEnum
            investNumYearSort?: SortEnum
            investNumTotalSort?: SortEnum
            name?: string
            trackList?: string
            tracks?: string
            roundsList?: string
            typeList?: string
            isTrack?: boolean
          } & Tz.Utils.Request.Pagination.Params

          interface Org extends Tz.Model.Front.EntityFin.BaseOrg {
            curInvestor: string
          }

          namespace Page {
            namespace Get {
              type Req = Params

              type Res = Tz.Utils.Response.Pagination.Data<Org>
            }
          }

          namespace FindFinByTrack {
            namespace Get {
              type Req = Params

              type Res = Tz.Utils.Response.Pagination.Data<Org>
            }
          }

          namespace Detail {
            namespace Get {
              interface IMostData {
                entity_id: string
                entity_name: string
                logo: string
                count: string
                is_pub: string
                type: INVESTOR_TYPE
              }

              interface Res extends Tz.Model.Front.EntityFin.BaseOrg {
                compNumber: number
                coopInvestMost: string
                independentNum: number
                followNum: number
                jointNum: number
                leadNum: number
                nextRoundsEmp: number
                nextRoundsEmpYear: number
                nextCoopMost: string
                upperCoopMost: string
                finType: string
                businessScope: string
                roundsName: string
                marketName: string
                introduction: string
                website: string

                regionView: { name: string; detail_name: string }
                upperCoopMostData: IMostData[]
                nextCoopMostData: IMostData[]
                coopInvestMostData: IMostData[]
              }
            }
          }

          namespace EntityFinRounds {
            namespace Get {
              type Res = {
                id: string
                investNum: number
                investNumNyear: number
                name: string
                rounds: string
                roundsName: string
                trackCode: string
                trackname: string
              }[]
            }
          }

          namespace EntityFinTrackEventNum {
            interface InvestNum {
              id: string
              investNum: number
              name: string
              trackCode: string
              trackname: string
              year: string
            }

            namespace Get {
              type Res = InvestNum[]
            }
          }

          namespace EntityFinYear {
            namespace Get {
              type Entity = {
                id: string
                investEmpMarket: number
                investNumEmp: number
                investNumTotal: number
                name: string
                nextRoundsEmp: number
                year: string
              }
              type Res = Entity[]
              type ChartMap = Partial<Record<keyof Entity, string>>
            }
          }

          namespace Listtop30 {
            namespace Get {
              // type Res = {}[]
            }
          }
        }
      }
    }
  }
}

export {}
