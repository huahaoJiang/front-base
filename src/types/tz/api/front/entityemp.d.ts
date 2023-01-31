import type { SortEnum, TIME_TYPE } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Front {
        namespace EntityEmp {
          namespace Page {
            interface CompanyInfo extends Tz.Model.Front.EntityEmp.BaseCompanyInfo {
              newInvestDate: string
              countFinAmount: number
              newFinAmount: string
              curInvestor: string
            }

            namespace Get {
              type Req = {
                tracks?: string
                region?: string
                market?: string
                marketTime?: string
                establishTime?: string
                establishTimeEnd?: string
                newInvestDate?: string
                newInvestDateEnd?: string
                newFinAmountSort?: SortEnum
                newInvestDateSort?: SortEnum
                establishTimeSort?: SortEnum
                countFinAmountSort?: SortEnum
                name?: string
                entityId?: string
                trackCode?: string
                curInvestor?: string
                trackList?: string
                tags?: string
                roundsList?: string
                isListed?: string
                trackCodelike?: string
                dataSwitch?: string
              } & Tz.Utils.Request.Pagination.Params

              type Res = Tz.Utils.Response.Pagination.Data<CompanyInfo>
            }
          }

          namespace Detail {
            namespace Get {
              type Res = Tz.Model.Front.EntityEmp.BaseCompanyInfo & {
                shareInfoVOList: (Tz.Model.Entity.Share.BaseShareInfo & {
                  showPart: boolean
                  showIndexPart: boolean
                  showMonthPart: boolean
                  showWeekPart: boolean
                })[]
                shareTags: (Tz.Model.Entity.Share.BaseShareInfo & { showPart: boolean })[]
                showMarketPart: boolean
              }
            }
          }

          namespace EmpTrackDa {
            namespace Get {
              type Res = {
                behindRoundsNum: string
                countFinAmount: number
                countFinAmountRank: number
                empNum: number
                roundsName: string
                establishTime: string
                establishTimeRank: number
                frontRoundsNum: string
                id: string
                name: string
                rounds: string
                roundsNum: string
                timeTypeEmp: TIME_TYPE
              }
            }
          }
        }
      }
    }
  }
}

export {}
