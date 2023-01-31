import type { TIME_TYPE } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Model {
      namespace Front {
        namespace EntityFin {
          interface BaseOrg {
            id: string
            region: string
            logo?: string
            regionName: string
            establishTime: string
            investEmpMarket: number
            investEmpMarketYear: number
            investNumEmp: number
            investNumEmpYear: number
            investNumTotal: number
            investNumYear: number
            name: string
            timeType: TIME_TYPE
            finTypeName: string
            investEmp: string
            mainTrack: string
            mainRounds: string
          }
        }
      }
    }
  }
}

export {}
