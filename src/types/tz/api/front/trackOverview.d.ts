import type { eventDistributeTypeEnum, INVESTOR_TYPE } from '@/constants/enum'
import type { EMP_TYPE_MAP } from '@/store/view/overview/utils'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Front {
        namespace TrackOverview {
          namespace TrackEmpEt {
            namespace Get {
              type Res = {
                empNum: number
                globalIdent: string
                year: string
                regionName: string
              }[]
            }
          }

          namespace TrackEmpRegionEtypeEmpnum {
            namespace Get {
              type Res = {
                globalIdent: string
                etype: keyof typeof EMP_TYPE_MAP
                empNum: number
                empnames: string
              }[]
            }
          }

          namespace TrackRoundsRegionEmp {
            namespace Get {
              type Res = {
                roundsName: string
                globalIdent: string
                regionName: string
                entityEmpNum: number
              }[]
            }
          }

          namespace TrackRoundsRegionFin {
            namespace Get {
              type Res = {
                globalIdent: string
                finEventNum: number
                finEventNumNyear: number
                roundsName: string
              }[]
            }
          }

          namespace TrackFinEventDate {
            namespace Get {
              type Res = {
                globalIdent: string
                mydate: string
                quarter: string
                finAmount: number
                finAmountAvg: number
                finEventCount: number
                regionName: string
              }[]
            }
          }

          namespace TrackFinEventnumDetail {
            interface InvestorItem {
              entityFinName: string
              entityFinId: string
              finEventCount: number
              regionChina: string
              regionEur: string
              regionUsa: string
              isPub: string
              type: INVESTOR_TYPE
            }
            namespace Get {
              type Res = InvestorItem[]
            }
          }

          namespace TrackFinRegionIpoTop5 {
            namespace Get {
              type Res = {
                globalIdent: string
                entityFinName: string
                entityFinId: string
                ipoEventCount: number
                isPub: string
                type: INVESTOR_TYPE
              }[]
            }
          }

          namespace TrackFinRegionEventnumTop5 {
            namespace Get {
              type Res = {
                globalIdent: string
                entityFinName: string
                entityFinId: string
                finEventCount: number
                isPub: string
                type: INVESTOR_TYPE
              }[]
            }
          }

          namespace TrackFinRegionEventnumByDate {
            namespace Get {
              type Res = {
                globalIdent: string
                mydate: string
                quarter: string
                investorNum: number
                regionName: string
              }[]
            }
          }

          namespace TrackRegion {
            namespace Get {
              type Res = {
                finEventNum: number
                entityEmpNum: number
                investorNum: number
              }[]
            }
          }

          namespace TrackRegionByChain {
            namespace Get {
              type Res = {
                regionCode: string
                num: number
                regionName: string
                type: eventDistributeTypeEnum
              }[]
            }
          }
        }
      }
    }
  }
}

export {}
