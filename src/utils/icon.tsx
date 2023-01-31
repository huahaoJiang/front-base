import { Icon } from '@iconify/vue'
import type { IconProps } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

import SvgIcon from '@/components/common/svgIcon.vue'
export function renderIcon(icon: string = '', props: IconProps = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}

export function renderMenuIcon(iconName: string = '', size = '14px', style: string = '') {
  if (iconName) {
    return () =>
      h(<NIcon style={style} size={size} component={h(<SvgIcon name={'icon-' + iconName}></SvgIcon>)}></NIcon>)
  } else {
    return null
  }
}
