import { NIcon } from 'naive-ui'

import SvgIcon from '@/components/common/svgIcon.vue'

export const defaultSpan = () => h(<span class="color-#999">-</span>)

export const sorterRender = ({ order }: { order: boolean | 'ascend' | 'descend' }) => {
  if (order === false)
    return h(<NIcon style="margin-left: -4px" size="1.3em" component={h(<SvgIcon name={'sort'}></SvgIcon>)}></NIcon>)
  if (order === 'ascend')
    return h(
      <NIcon style="margin-left: -4px" size="1.3em" component={h(<SvgIcon name={'sort-ascend'}></SvgIcon>)}></NIcon>
    )
  if (order === 'descend')
    return h(
      <NIcon style="margin-left: -4px" size="1.3em" component={h(<SvgIcon name={'sort-descend'}></SvgIcon>)}></NIcon>
    )
}
