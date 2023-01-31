import type { TIME_TYPE } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Model {
      namespace Front {
        namespace EntityEmp {
          interface BaseCompanyInfo {
            id: string
            tracks: string
            regionName: string
            marketName: string
            establishTime: string
            name: string
            logo?: string
            rounds: string
            roundsName: string
            introduction: string
            timeTypeEmp: TIME_TYPE
            timeTypeEvent: TIME_TYPE
            currencyName: string
            address: string
            businessScope: string
            email: string
            mphone1: string
            region: string
            tags: string
            telephone1: string
            website: string

            tagList: { tag_code: string; tag_name: string }[]
            regionView: { name: string; detail_name: string }
            trackList: (Tz.Model.Front.Track.TrackTag & { isActive: boolean })[]
          }
        }
      }
    }
  }
}

export {}
