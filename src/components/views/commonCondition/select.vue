<template>
  <n-select
    :value="name"
    @input="$emit('update:value', $event.target.value)"
    @update:value="handleUpdate"
    size="small"
    filterable
    :placeholder="placeholder"
    :options="optionsRef"
    :loading="loadingRef"
    clearable
    remote
    ref="selectRef"
    @search="handleSearch"
    label-field="name"
    value-field="entityId"
    :reset-menu-on-options-change="false"
    @scroll="handleScroll"
  />
</template>
<script lang="ts" setup>
import debounce from 'lodash.debounce'
import type { SelectOption } from 'naive-ui'
import type { PropType } from 'vue'

import { getCompanyOptions, getInvestOptions } from '@/api/view/condition'

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  name: {
    type: Object as PropType<any>
  },
  selectType: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:value', 'update:name'])

function noSideSpace(value: string) {
  if (value?.length) {
    return value.trim()
  } else {
    return value
  }
}

const loadingRef = ref(false)
const selectRef = ref()
const optionsRef = ref<SelectOption[]>([])
const currentRef = ref(1)
const currentQuery = ref('')
const handleSearch = debounce(
  (query: string) => {
    currentRef.value = 1
    queryOptions(noSideSpace(query))
  },
  500,
  {
    leading: false,
    trailing: true
  }
)

function queryOptions(query: string) {
  const { selectType } = props
  currentQuery.value = noSideSpace(query)
  if (currentRef.value === 1 && !noSideSpace(query)) {
    loadingRef.value = false
  } else {
    loadingRef.value = true
  }
  switch (selectType) {
    case 'company':
      getCompanyOptions(currentRef.value, currentQuery.value).then((res: any) => {
        if (res.code === 200) {
          if (currentRef.value === 1) {
            optionsRef.value = res.data.records
          } else {
            optionsRef.value = optionsRef.value.concat(...res.data.records)
          }
          currentRef.value++
        } else {
          $message.error(res.message)
        }
        loadingRef.value = false
      })
      break
    case 'invest':
      getInvestOptions(currentRef.value, currentQuery.value).then((res: any) => {
        if (res.code === 200) {
          if (currentRef.value === 1) {
            optionsRef.value = res.data.records
          } else {
            optionsRef.value = optionsRef.value.concat(...res.data.records)
          }
          currentRef.value++
        } else {
          $message.error(res.message)
        }
        loadingRef.value = false
      })
      break
  }
}
const handleScroll = (e: Event) => {
  const currentTarget = e.currentTarget as HTMLElement
  if (!loadingRef.value) {
    if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight - 5) {
      queryOptions(currentQuery.value)
    }
  }
}

const handleUpdate = (val: string | null, option: any) => {
  if (val === null) {
    currentRef.value = 1
    queryOptions('')
  }
  emit('update:name', val, option?.name)
}
</script>
<style lang="scss" scoped>
:deep .n-base-selection-placeholder {
  font-size: 12px !important;
}
</style>
