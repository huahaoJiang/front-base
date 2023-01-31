declare namespace Tz {
  namespace Utils {
    namespace Response {
      interface Tz<T = any> {
        success: boolean
        code: number
        msg: string
        data: T
        message: string
      }

      namespace Pagination {
        interface Data<T = any> {
          current: number
          pages: number
          size: number
          total: number
          records: T[]
        }
      }
    }
  }
}
