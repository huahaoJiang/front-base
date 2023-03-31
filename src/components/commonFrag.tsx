import { NIcon } from 'naive-ui'

export const defaultSpan = () => h(<span class="color-#999">-</span>)

export const sorterRender = ({ order }: { order: boolean | 'ascend' | 'descend' }) => {
  if (order === false)
    return h(
      <NIcon style="margin-left: -4px" size="1.3em">
        <i class="i-tj-sort" style="margin-top:-8px" />
      </NIcon>
    )
  if (order === 'ascend')
    return h(
      <NIcon style="margin-left: -4px" size="1.3em">
        <i class="i-tj-sort-ascend" style="margin-top:-8px" />
      </NIcon>
    )
  if (order === 'descend')
    return h(
      <NIcon style="margin-left: -4px" size="1.3em">
        <i class="i-tj-sort-descend" style="margin-top:-8px" />
      </NIcon>
    )
}
