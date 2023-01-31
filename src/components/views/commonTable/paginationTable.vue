<!--
<template>
  <n-data-table
    ref="table"
    class="mt-14px"
    remote
    :loading="loadingRef"
    :bordered="bordered"
    :columns="columnsRef"
    :data="dataRef"
    :row-key="getKey"
    :single-line="singleLine"
    :paginate-single-page="true"
    :pagination="pagination"
    @update:sorter="handleSorterChange"
  >
    <template #empty>
      <n-image :width="300" :height="260" preview-disabled :src="TableDefault"></n-image>
    </template>
  </n-data-table>
</template>
<script lang="ts" setup>
import { NDataTable } from 'naive-ui'
import type { PropType } from 'vue'

import TableDefault from '@/assets/images/404.png'
// import { SortEnum } from '@/constants/enum'

const props = defineProps({
  columnsRef: {
    type: Array as PropType<any[]>,
    required: true
  },
  queryConditionRef: {
    type: Object,
    default: () => ({})
  },
  rowKey: {
    type: String,
    default: 'name'
  },
  isAutoFlash: {
    type: Boolean,
    default: true
  },
  singleLine: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['query', 'update:columns', 'update:query', 'update:page'])
const dataRef = ref<any[]>([])
const table = ref()
const loadingRef = ref(false)
const pagination = ref({
  page: 1,
  pageSize: 5,
  size: 'large',
  itemCount: 0,
  showSizePicker: true,
  showQuickJumper: true,
  pageSizes: [5, 10, 20, 30],
  onChange: (page: number) => {
    pagination.value.page = page
    handlePageChange(page, pagination.value.pageSize)
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
    handlePageChange(1, pageSize)
  }
})

onMounted(() => {
  if (props.isAutoFlash) {
    handleQuery()
  }
})

function handleQuery() {
  loadingRef.value = true
  pagination.value.page = 1
  emit('query', (data: any) => {
    pagination.value.itemCount = data.total
    dataRef.value = data.records
    loadingRef.value = false
  })
}

function handleSorterChange(sorter: any) {
  if (!loadingRef.value) {
    loadingRef.value = true
    const columns = props.columnsRef.map((column: any) => {
      if (column.sorter) {
        if (column.key === sorter.columnKey) {
          column.sortOrder = sorter.order === false ? 'descend' : sorter.order
        } else {
          column.sortOrder = false
        }
      }
      return column
    })
    pagination.value.page = 1
    emit('update:query', handleSortCondition(columns.filter(column => column.sorter)), (data: any) => {
      dataRef.value = data.records
      loadingRef.value = false
    })
    emit('update:columns', columns)
  }
}

function handlePageChange(currentPage: number, pageSize: number) {
  if (!loadingRef.value) {
    loadingRef.value = true
    const { queryConditionRef: queryCondition } = props
    queryCondition.current = currentPage
    queryCondition.size = pageSize
    emit('update:page', queryCondition, (data: any) => {
      dataRef.value = data.records
      loadingRef.value = false
    })
  }
}

function getKey(row: any) {
  return row[props.rowKey] || row.index
}
function handleSortCondition(columns: any[]) {
  const { queryConditionRef: queryCondition } = props
  columns.forEach(column => {
    let sort: undefined | SortEnum
    switch (column.sortOrder) {
      case 'descend':
        sort = SortEnum.descend
        break
      case 'ascend':
        sort = SortEnum.ascend
        break
      default:
        sort = undefined
    }
    queryCondition[`${column.key}Sort`] = sort
  })
  return queryCondition
}

defineExpose({ query: handleQuery })
</script>
<style scoped lang="scss">
:deep .n-data-table-td {
  background-color: #fff !important;
  font-weight: 400;
  font-size: 13px;
}
:deep .n-data-table-tr:hover .n-data-table-td {
  background-color: #fbfbfb !important;
}
:deep .n-data-table-th {
  font-family: PingFangSC-Medium, sans-serif;
  background-color: #fafafc !important;
  font-size: 14px;
}
:deep .n-data-table-td__ellipsis {
  &::before {
    content: '';
    display: block;
  }
}
:deep .n-data-table-sorter {
  vertical-align: -5px !important;
}
</style>
-->
