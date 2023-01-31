declare namespace Tz {
  namespace Model {
    namespace Front {
      namespace TrackContent {
        interface FileStore {
          businessId: string
          fileBucket: string
          fileFormat: string
          fileLocal: string
          fileName: string
          fileName2: string
          filePath: string
          fileSize: string
          fileSource: string
          id: string
          status: string
          type: string
        }
        interface AnalyzeData {
          attribute: string
          attributeValue: string
          businessId: string
          channelType: string
          content: string
          contentName: string
          contentSort: string
          fileStores: FileStore[]
          id: string
          indicationId: string
          sourceName: string
          publishTime: string
          indicationName: string
          region: string
          source: string
          sourceUrl: string
          title: string
          trackCode: string
          trackName: string
          parentId: string
          showDetail: boolean
          child: AnalyzeData[]
          infoEventTypeVOList: any[]
          status: string
        }
      }
    }
  }
}
