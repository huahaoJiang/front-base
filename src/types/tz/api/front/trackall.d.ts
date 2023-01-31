declare namespace Tz {
  namespace Api {
    namespace Front {
      namespace TrackAll {
        namespace List {
          namespace Get {
            type Req = {
              code: string
              tracks?: string
            }

            interface TrackItem extends Tz.Model.Front.Track.TrackDetail {
              children?: Tz.Model.Front.Track.TrackDetail
            }

            type Res = Tz.Utils.Response.Pagination.Data<TrackItem>
          }
        }

        namespace Detail {
          namespace Get {
            type Req = {
              code: string
            }

            type Res = Tz.Model.Front.Track.TrackDetail
          }
        }
      }
    }
  }
}
