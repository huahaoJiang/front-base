declare namespace Tz {
  namespace Model {
    namespace Entity {
      namespace Chart {
        namespace Line {
          type Data =
            | {
                x: string
                y: number
                name: string
                sort?: number
              }
            | Record<string, string | number>
        }
        namespace Bar {
          type Data =
            | {
                x: number
                y: string
                name: string
                sort?: number
              }
            | Record<string, string | number>
        }
        namespace HeatMap {
          type Data = {
            x: string
            y: string
            value: number
            code?: string
          }
        }
      }
    }
  }
}
