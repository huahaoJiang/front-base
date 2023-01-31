<!--
<template>
  <div>
    <n-data-table
      :key="String(defaultExpandAll)"
      ref="table"
      class="mt-14px"
      :loading="loadingContainerIsTable && loadingRef"
      :default-expand-all="defaultExpandAll"
      remote
      :bordered="bordered"
      :columns="columnsRef"
      :data="dataRef"
      :row-key="getKey"
      :single-line="singleLine"
      :max-height="maxHeight"
      @update:sorter="handleSorterChange"
    >
      <template #empty>
        <n-image :width="300" :height="260" preview-disabled :src="TableDefault"></n-image>
      </template>
    </n-data-table>
    <n-row v-if="!loadingContainerIsTable">
      <n-col :span="24">
        <n-space justify="space-around" align="center" class="h-80px">
          <n-spin v-if="loadingRef" size="medium" />
        </n-space>
      </n-col>
    </n-row>
  </div>
</template>
<script lang="ts" setup>
import { NDataTable } from 'naive-ui'
import type { PropType } from 'vue'

import TableDefault from '@/assets/images/tableDefault.png'
import { SortEnum } from '@/constants/enum'

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
    default: 'id'
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
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
  },
  maxHeight: {
    type: Number,
    default: undefined
  },
  loadingContainerIsTable: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['query', 'update:columns', 'update:query', 'update:page'])
const dataRef = ref<any[]>([])
const loadingRef = ref(false)
const noMoreRef = ref(true)
let currentPage = ref(2)
let total = 0

onMounted(() => {
  if (props.isAutoFlash) {
    handleQuery()
  }

  addScrollListener()
})
onUnmounted(() => {
  removeScrollListener()
})

function handleQuery() {
  loadingRef.value = true
  emit('query', (data: any) => {
    total = data.total
    currentPage.value = 2
    dataRef.value = data.records
    updateNoMore()
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
    emit('update:query', handleSortCondition(columns.filter(column => column.sorter)), (data: any) => {
      total = data.total
      currentPage.value = 2
      dataRef.value = data.records
      updateNoMore()
      loadingRef.value = false
    })
    emit('update:columns', columns)
  }
}

function handlePageChange() {
  if (!loadingRef.value) {
    loadingRef.value = true
    setTimeout(() => {
      const { queryConditionRef: queryCondition } = props
      queryCondition.current = currentPage.value
      currentPage.value++
      emit('update:page', queryCondition, (data: any) => {
        total = data.total
        dataRef.value = [...dataRef.value, ...data.records]
        updateNoMore()
        loadingRef.value = false
      })
    }, 400)
  }
}
function updateNoMore() {
  if (dataRef.value.length >= total) {
    noMoreRef.value = true
  } else {
    noMoreRef.value = false
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
function addScrollListener() {
  const scrollEle = document.getElementById('layout')
  !props.loadingContainerIsTable && scrollEle && (scrollEle.scrollTop = 0)
  scrollEle?.addEventListener('scroll', () => {
    //到底了
    if (scrollEle.scrollTop + scrollEle.clientHeight > scrollEle.scrollHeight - 10) {
      if (!noMoreRef.value) {
        handlePageChange()
      }
    }
  })
}
function removeScrollListener() {
  const scrollEle = document.getElementById('layout')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  scrollEle?.removeEventListener('scroll', () => {})
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
