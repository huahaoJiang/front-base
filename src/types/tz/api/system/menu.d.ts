declare namespace Tz {
  namespace Api {
    namespace System {
      namespace Menu {
        namespace Routes {
          interface MenuItem {
            name: string
            path: string
            remark: string
            sort: number
            source: string
            id: string
            hasChildren: boolean
            code: string
            children?: MenuItem[]
            alias: string
          }
          namespace Get {
            type Res = MenuItem[]
          }
        }
      }
    }
  }
}
