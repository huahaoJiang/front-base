import { NIcon } from 'naive-ui'
import { h } from 'vue'

import Icons from '@/../public/icons'

export function renderIcon(className: string = '') {
  return () => h(<i class={className} />)
}

export function renderMenuIcon(iconName: string = '', size = '14px', style: string = '') {
  if (iconName) {
    return () => h(<NIcon size={size} style={style} v-html={(Icons as any)[toLowerLine(iconName)]}></NIcon>)
  } else {
    return null
  }
}

function toLowerLine(str: string) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1)
  }
  return temp
}

function toLowerLine(str: string) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1)
  }
  return temp
}
