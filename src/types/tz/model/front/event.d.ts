import type { TIME_TYPE } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Model {
      namespace Front {
        namespace Event {
          interface Item {
            id: string
            entityId: string
            tracks: string
            marketName: string
            empRounds: string
            empRoundsName: string
            eventInestor: string
            moneyPublish: string
            regionName: string
            establishTime: string
            time: string
            entityName: string
            logo?: string
            moneyAmount: number
            rounds: string
            roundsName: string
            businessScope: string
            introduction: string
            sourceUrl: string
            timeTypeEmp: TIME_TYPE
            timeTypeEvent: TIME_TYPE
            currencyName: string
          }
        }
      }
    }
  }
}

export {}
