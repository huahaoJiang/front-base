declare namespace Tz {
  namespace Api {
    namespace System {
      namespace Region {
        namespace Select {
          interface Item {
            ancestors: string
            cityCode: string
            cityName: string
            code: string
            districtCode: string
            districtName: string
            level: number
            name: string
            parentCode: string
            provinceCode: string
            provinceName: string
            remark: string
            sort: number
            topCode: string
            topName: string
            townCode: string
            townName: string
            villageCode: string
            villageName: string
          }
          namespace Get {
            type Res = Item[]
          }
        }
      }
    }
  }
}
