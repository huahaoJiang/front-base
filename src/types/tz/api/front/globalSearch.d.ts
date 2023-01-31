import type { SearchType } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Front {
        namespace GlobalSearch {
          type Req = {
            type: SearchType
            current: number
            rowCount: number
            searchPhrase: string
            searchType: 'simple' | '' | 'hard'
          }
          namespace Emp {
            namespace Post {
              type Emp = {
                roundsName?: string
                rounds?: string
                logo?: string
                tracks?: string
                introduction: string
                id: string
                icRegName: string
                businessScope: string
                name: string
                highlight: Omit<Emp, 'highlight'>
              }

              type Res = Tz.Utils.Response.Pagination.Data<Emp>
            }
          }
          namespace Org {
            namespace Post {
              interface Org extends Tz.Api.Front.EntityFin.Org {
                icRegName: string
                businessScope: string
                highlight: Omit<Org, 'highlight'>
              }

              type Res = Tz.Utils.Response.Pagination.Data<Org>
            }
          }
          namespace Info {
            namespace Post {
              interface Info extends Tz.Model.Front.TrackContent.AnalyzeData {
                highlight: Tz.Model.Front.TrackContent.AnalyzeData
              }
              type Res = Tz.Utils.Response.Pagination.Data<Info>
            }
          }
          namespace Track {
            namespace Post {
              interface Track extends Tz.Model.Front.Track.TrackDetail {
                content: string
                trackName: string
                trackCode: string
                highlight: Omit<Track, 'highlight'>
              }
              type Res = Tz.Utils.Response.Pagination.Data<Track>
            }
          }
        }
      }
    }
  }
}

export {}
