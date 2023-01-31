declare namespace Tz {
  namespace Api {
    namespace Front {
      namespace HomePage {
        namespace MonthData {
          namespace Get {
            interface ChartData {
              date: string
              num: number
            }

            interface Item {
              trackCode: string
              trackName: string
              empNum: number
              ipoEmpNum: number

              eventNum: number
              eventNumRadio: string
              eventNumLine: ChartData[]

              moneyAmount: string
              moneyAmountRadio: string
              moneyAmountLine: ChartData[]

              totalMv: string
              totalMvRadio: string
              totalMvLine: ChartData[]
            }

            type Res = Item[]
          }
        }
      }
    }
  }
}
