declare namespace Tz {
  namespace Api {
    namespace Entity {
      namespace ShareDay {
        namespace Day {
          namespace Get {
            type Req = {
              tsCode: string
            }

            type Res = Tz.Model.Entity.Share.ShareDetail[]
          }
        }
      }
    }
  }
}
