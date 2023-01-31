<template>
  <n-data-table
    :key="currentTrack + String(defaultExpandAll)"
    ref="table"
    :default-expand-all="defaultExpandAll"
    :loading="loadingRef"
    :bordered="false"
    :columns="columnsRef"
    :data="dataRef"
    :row-key="getKey"
  >
    <template #empty>
      <n-image :width="300" preview-disabled :height="260" :src="TableDefault"></n-image>
    </template>
  </n-data-table>
</template>
<script lang="ts" setup>
import { NDataTable } from 'naive-ui'
import type { PropType } from 'vue'

import TableDefault from '@/assets/images/404.png'

const props = defineProps({
  columnsRef: {
    type: Array as PropType<any[]>,
    required: true
  },
  queryConditionRef: {
    type: Object,
    required: true
  },
  rowKey: {
    type: String,
    default: 'name'
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  currentTrack: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['query', 'initExpandAll'])
const dataRef = ref<any[]>([])
const loadingRef = ref(true)
let currentPage = ref(1)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let total = 0

onMounted(async () => {
  await handleQuery()
  // default-expand-all 不可在异步展开行时使用
  emit('initExpandAll', true)
})

function handleQuery() {
  return new Promise(resolve => {
    loadingRef.value = true
    emit('query', (data: any) => {
      total = data.total
      currentPage.value = 1
      dataRef.value = data.records
      loadingRef.value = false
      resolve(0)
    })
  })
}

function getKey(row: any) {
  return row[props.rowKey] || row.index
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
:deep .n-data-table-expand-trigger {
  display: inline-block;
}
:deep .n-data-table-td__ellipsis {
  &::before {
    content: '';
    display: block;
  }
}
</style>
