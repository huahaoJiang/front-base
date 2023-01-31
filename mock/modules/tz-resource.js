export default [
  {
    url: '/mock/tz-resource/file/getPreviewFileUrl',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: ''
      }
    }
  }
]
