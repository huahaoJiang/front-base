import type { DataTableColumns } from 'naive-ui'

import { defaultSpan, sorterRender } from '@/components/commonFrag'

export function policyColumns(): DataTableColumns<Tz.Api.Front.TrackContent.RelatedPolicyPage.Item> {
  return [
    {
      title: '序号',
      key: 'key',
      width: 40,
      render: (row, index) => {
        const val = `${(row.current - 1) * 5 + index + 1}`
        return h(<div style="text-align: center">{val}</div>)
      }
    },
    {
      title: '政策名称',
      key: 'title',
      width: 557,
      render(row) {
        if (row.sourceUrl) {
          return h(
            <a target="_blank" href={row.sourceUrl} class="text-weight-hover__primary">
              {row.title}
            </a>
          )
        } else {
          return h(<div class="text-hover__primary">{row.title}</div>)
        }
      }
    },
    {
      title: '有效地区',
      key: 'region',
      width: 111,
      render(row) {
        return h(<div>{row.regionName}</div>)
      }
    },
    {
      title: '发文机构',
      key: 'source',
      width: 231,
      render(row) {
        return h(<div>{row.source}</div>)
      }
    },
    {
      title: '发布时间',
      key: 'publishTime',
      sorter: true,
      sortOrder: 'descend',
      renderSorterIcon: sorterRender,
      render(row) {
        if (row.publishTime) {
          return h(<div>{row.publishTime.substring(0, 10)}</div>)
        } else {
          return defaultSpan()
        }
      }
    }
  ]
}
