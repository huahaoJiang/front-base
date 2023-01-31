declare namespace Tz {
  namespace Model {
    namespace Front {
      namespace Track {
        interface TrackDetail {
          name: string
          code: string
          remark6: string
          remark1: string
          remark2: string
          hasChildren: boolean
          id: string
          introduce: string
          empCountYear: number
          finAmount: number
          finAmountYear: number
          finEventCount: number
          finEventCountYear: number
          investorCount: number
          investorCountYear: number
          empHead: string
          chainRatio: number
          level: number
          empCount: number
          marketCount: number
          unicornCount: number
          fastFinCount: number
          children?: TrackDetail[]
          firstLevelCode: string
          firstLevelName: string
          secondLevelCode: string
          secondLevelName: string
          thirdLevelCode: string
          thirdLevelName: string
          fourthLevelCode: string
          fourthLevelName: string
          fifthLevelCode: string
          fifthLevelName: string

          marketCountYear: number
          /** 总市值 */
          totalMv: number
          totalMvYear: number

          /** A股数量	 */
          aShareCount: number
          /** 美股数量 */
          usaShareCount: number
          /** 港股数量 */
          hkShareCount: number
          /** 其他市场数量 */
          otherShareCount: number
        }

        interface TrackTag {
          code: string
          code_name: string
          code_path?: string
        }
      }
    }
  }
}
