export function transHighlightText(str?: string) {
  if (str) {
    return str.replaceAll('<em>', '<span style="color:#FB8832">').replaceAll('</em>', '</span>')
  } else {
    return ''
  }
}
export function highlightMerge(highStr: string | undefined, str: string) {
  if (highStr) {
    return str.replace(highStr.replaceAll('<em>', '').replaceAll('</em>', ''), highStr)
  } else {
    return str
  }
}

export function noSideSpace(value: string) {
  if (value?.length) {
    return value.trim()
  } else {
    return value
  }
}

export function transTitleText(title: string) {
  return insert_spacing(
    title
      .replace(/【首发】/g, ' ')
      .replace(/[！!|【】]/g, ' ')
      .replace(/,/g, '，')
      .replace(/[?]/g, '？')
  )
}

function insert_spacing(str: string) {
  const ruleCNEN = /([A-Za-z_+])([\u4e00-\u9fa5]+)/gi
  const ruleENCN = /([\u4e00-\u9fa5]+)([A-Za-z_+])/gi
  const ruleCNNum = /([\u4e00-\u9fa5]+)(\d)/gi
  const ruleNumCN = /(\d)([\u4e00-\u9fa5]+)/gi
  return str
    .replace(ruleCNEN, '$1 $2')
    .replace(ruleENCN, '$1 $2')
    .replace(ruleCNNum, '$1 $2')
    .replace(ruleNumCN, '$1 $2')
}
