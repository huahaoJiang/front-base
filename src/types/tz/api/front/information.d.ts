declare namespace Tz {
  namespace Api {
    namespace Front {
      namespace Information {
        namespace Page {
          namespace Get {
            import AnalyzeData = Tz.Model.Front.TrackContent.AnalyzeData

            type Req = {
              trackCode?: string
              eventType?: string
            } & Tz.Utils.Request.Pagination.Params

            type Res = Tz.Utils.Response.Pagination.Data<AnalyzeData>
          }
        }

        namespace HomePageInfo {
          namespace Get {
            type Req = {
              /** 1 行业动态 2研发进展 */
              type: string
            }

            type Res = Tz.Model.Front.Info.InfoDetail[]
          }
        }

        namespace Topic {
          namespace Get {
            type Topic = {
              topicName: string
              topicPublishTime: string
              sourceUrl: string
            }

            type Req = Tz.Utils.Request.Pagination.Params

            type Res = Tz.Utils.Response.Pagination.Data<Topic>
          }
        }
      }
    }
  }
}
