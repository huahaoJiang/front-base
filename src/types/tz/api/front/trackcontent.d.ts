import type { SortEnum } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Front {
        namespace TrackContent {
          namespace IndicationDetail {
            namespace Get {
              type Res = Tz.Model.Front.TrackContent.AnalyzeData[]
            }
          }

          namespace Detail {
            namespace Get {
              type Res = Tz.Model.Front.TrackContent.AnalyzeData[]
            }
          }

          namespace RelatedPolicyPage {
            interface Item {
              id: string
              sourceUrl: string
              source: string
              region: string
              regionName: string
              title: string
              content: string
              attribute: string
              attributeValue: string
              updatedTime: string
              current: number
              showDetail: boolean
              publishTime: string
            }

            namespace Get {
              type Req = {
                current: number
                size: number
                trackCode: string
                region: string
                updatedTimeSort?: SortEnum
              }

              type Res = Tz.Utils.Response.Pagination.Data<Item>
            }
          }
        }
      }
    }
  }
}

export {}
