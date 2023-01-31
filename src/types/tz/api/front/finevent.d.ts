import type { SortEnum } from '@/constants/enum'

declare global {
  declare namespace Tz {
    namespace Api {
      namespace Front {
        namespace Finevent {
          namespace Page {
            namespace Get {
              type Req = {
                tracks?: string
                typeList?: string
                isDisclose?: '0' | '1'
                region?: string
                invest?: string
                time?: string
                timeEnd?: string
                moneyPublish?: string
                moneyAmount?: string
                moneyAmountEnd?: string
                timeSort?: SortEnum
                roundsSort?: SortEnum
                establishTimeSort?: SortEnum
                moneyPublishSort?: SortEnum
                entityName?: string
                eventInestor?: string
                roundsList?: string
                trackList?: string
                leadType?: string
                leadTypeList?: string
                dataSwitch?: string
              } & Tz.Utils.Request.Pagination.Params

              type Res = Tz.Utils.Response.Pagination.Data<Tz.Model.Front.Event.Item>
            }
          }

          namespace HomePageEvent {
            namespace Get {
              type Req = {
                /** 1:国内 2：国外 3：IPO */
                type: string
              }

              type Res = Tz.Model.Front.Event.Item[]
            }
          }
        }
      }
    }
  }
}

export {}
