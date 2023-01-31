<!--
<template xmlns:icon-ant-design="" xmlns:icon-prime="">
  <div>
    <n-row>
      <n-col :span="24" :key="item.key" v-for="item in conditionConfigRef" class="condition">
        <div style="display: flex; position: relative">
          <div class="title" style="flex-shrink: 0">{{ item.title }}</div>
          <div class="w-full">
            <n-space
              algin="center"
              :size="[0, 8]"
              :id="item.key"
              style="overflow: hidden; transition: height 0.2s linear; will-change: height"
              :style="{ height: item.expand ? item.height : 'auto' }"
            >
              <div
                class="linear"
                :key="item.key + tag.key"
                v-for="tag in item.dictData"
                @click="handleClick(item, tag)"
              >
                <n-button
                  icon-placement="right"
                  class="h-24px linear ml-3px mr-3px"
                  size="small"
                  type="primary"
                  v-if="tag.isActive"
                  >{{ tag.title || tag.value || tag.dictValue }}
                  <template #icon v-if="tag.key !== '0'">
                    <n-icon :size="13"><icon-ant-design:close-outlined /></n-icon>
                  </template>
                </n-button>
                <span v-else class="item cursor">{{ tag.title || tag.value || tag.dictValue }}</span>
              </div>
              <div class="w-40px h-2px" v-if="[ConditionTypeEnum.rounds].includes(item.type)"></div>
              <n-date-picker
                class="w-245px ml-8px"
                v-if="item.type === 'time'"
                v-model:value="item.timeValue"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                value-format="yyyy-MM-dd"
                clearable
                size="small"
                @update:formatted-value="val => handleTimeChange(val, item)"
              />
            </n-space>
            <TrackNode
              v-if="item.type === 'track'"
              ref="trackNodeRef"
              :track="sonTrackRef"
              :defaultTrack="defaultTrackRef"
              @update:click="handleTrackNodeUpdate"
              v-show="showTracksRef"
              :maxLevel="maxLevelRef"
            />
            <Region
              :region="sonRegionRef"
              @update:click="handleRegionUpdate"
              v-show="item.type === 'region' && showRegionRef"
            />
            <div class="expand" v-if="item.expand">
              <n-icon size="1.6em" class="cursor linear">
                <icon-prime:angle-double-down @click="handleDrop(item)" color="#489DBA" :transform="item.rotate" />
              </n-icon>
            </div>
            <n-divider v-if="currentConditionRef.length || !item.hideDivider" />
          </div>
        </div>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="8" v-if="!hideEntity">
        <n-space>
          <span class="title" style="line-height: 28px; width: 50px">企业名称</span>
          <QuerySelect
            style="margin-left: -6px"
            @update:name="
              (value, name) => handleInputCompany(value, { key: 'inputCompanyRef', value: '企业名称', keyValue: name })
            "
            v-model:name="inputCompanyRef"
            placeholder="请输入企业名称"
            selectType="company"
          />
        </n-space>
      </n-col>
      <n-col :span="8" v-if="!hideInvest">
        <n-space>
          <div class="title" style="line-height: 28px; width: 52px; text-align: right">投资方</div>
          <QuerySelect
            style="margin-left: -6px"
            @update:name="
              (value, name) => handleInputCompany(value, { key: 'inputInvestRef', value: '投资方', keyValue: name })
            "
            v-model:name="inputInvestRef"
            placeholder="请输入投资方名称"
            selectType="invest"
          />
        </n-space>
      </n-col>
      <n-divider v-if="currentConditionRef.length && (!hideEntity || !hideInvest)" />
    </n-row>
    <n-row>
      <n-col :span="24">
        <n-button v-if="currentConditionRef.length" text type="primary" @click="clearFilter" class="text-13px mr-10px">
          清除筛选
        </n-button>
        <n-tag
          class="mr-6px linear"
          closable
          @close="viewTagClose(index, tag)"
          size="small"
          type="primary"
          :key="tag.key"
          v-for="(tag, index) in currentConditionRef"
          >{{ tag.titleValue }}</n-tag
        >
      </n-col>
    </n-row>
  </div>
</template>
<script lang="ts" setup>
import { NDatePicker } from 'naive-ui'
import type { PropType } from 'vue'

import { handlerParams, isNoFilter } from '@/components/views/commonCondition/utils'
import type { IConditionColumns } from '@/interface/common'
import { ConditionTypeEnum } from '@/interface/common'
import type { IConditionItem, IDictData, IViewTag } from '@/interface/view/condition'
import type { ITagObj } from '@/interface/view/condition'
import { useConditionStore } from '@/store/view/queryCondition'

import Region from './region.vue'
import QuerySelect from './select.vue'
import TrackNode from './trackNode.vue'

const conditionStore = useConditionStore()
const props = defineProps({
  conditionColumn: {
    type: Array as PropType<IConditionColumns[]>,
    required: true
  },
  queryConditionRef: {
    type: Object,
    required: true
  },
  defineProp: {
    type: Object,
    default() {
      return {
        name: 'id',
        curInvestor: 'curInvestor'
      }
    }
  },
  initialCondition: {
    type: Object,
    default() {
      return {}
    }
  },
  hideEntity: {
    type: Boolean,
    default() {
      return false
    }
  },
  hideInvest: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const currentConditionRef = ref<IViewTag[]>([])
const inputCompanyRef = ref(null)
const inputInvestRef = ref(null)
const sonTrackRef = ref<any>({})
const defaultTrackRef = ref<string[]>()
const sonRegionRef = ref<any>({})
const showTracksRef = ref(false)
const showRegionRef = ref(false)
const trackNodeRef = ref()
const emit = defineEmits(['update:query'])
const maxLevelRef = ref(6)
const conditionConfigRef = computed(() => {
  const { conditionColumn } = props
  const returnObj = conditionColumn.map((item: IConditionColumns) => {
    const condition = JSON.parse(
      JSON.stringify(conditionStore.conditionConfig.find(config => item.key === config.key) as IConditionItem)
    )
    item.value && (condition.key = item.value)
    item.hideDivider && (condition.hideDivider = item.hideDivider)
    item.title && (condition.title = item.title)
    item.multiple && (condition.multiple = item.multiple)
    item.maxLevel && (maxLevelRef.value = item.maxLevel)
    if (item.default) {
      if (condition.type === ConditionTypeEnum.track) {
        const str = item.default as string[]
        if (str.length) {
          str.reduce((dictList, item) => {
            let returnChildObj: IDictData[] = []

            if (!dictList.find((dict: any) => dict.key === item)) {
              // $message.warning('该用户没有赛道权限，请联系后台管理员')
              return false
            }

            for (let i = 0; i < dictList.length; i++) {
              if (dictList[i].key === item) {
                dictList[i].isActive = true
                returnChildObj = dictList[i].children || null
              } else {
                dictList[i].isActive = false
              }
            }
            return returnChildObj
          }, condition.dictData)
          if (condition.dictData.length > 1) {
            if (!condition.dictData[0].isActive) {
              showTracksRef.value = true
              nextTick(() => {
                trackNodeRef.value[0].init(condition.dictData)
                item.default = undefined
              })
            }
          }
        }
      } else {
        const itemTab = condition.dictData.find(
          (cond: IDictData) => cond.key === item.default || cond.dictKey === item.default
        )
        if (condition.dictData.length > 1) {
          nextTick(() => {
            item.default = undefined
            defaultClick(item, itemTab)
          })
        }
      }
    }
    return condition
  })
  return reactive(returnObj)
})

function defaultClick(item: IConditionColumns, itemTab: IDictData) {
  const proxyConfig = conditionStore.conditionConfig.find(config => item.key === config.key) as IConditionItem
  handleClick(proxyConfig, itemTab)
}

// function conditionIsActiveInit(config: IConditionItem) {
//   config.dictData.forEach((item, index) => {
//     if (index === 0) item.isActive = true
//     else item.isActive = false
//   })
// }

const timeConfigLength = computed(
  () => conditionConfigRef.value.filter(config => config.type === ConditionTypeEnum.time).length
)

function handleDrop(item: IConditionItem) {
  const el = document.getElementById(item.key) as HTMLElement
  if (el.style.height === '28px') {
    item.height = item.maxHeight
    item.rotate = 'rotate(180)'
  } else {
    item.height = '28px'
    item.rotate = 'rotate(0)'
  }
}

function handleClick(item: IConditionItem, tag: IDictData, isSon: boolean = false) {
  const viewTag: IViewTag = {
    title: item.title || '',
    key: item.key,
    type: item.type,
    multiple: item.multiple,
    keyValue: (tag.dictKey as string) || tag.key,
    titleValue: tag.title || tag.value || (tag.dictValue as string)
  }

  //handle selected status
  setSelected(item, viewTag, isSon)

  switch (item.type) {
    case ConditionTypeEnum.time:
      // eslint-disable-next-line no-case-declarations
      const timeObj = item.dictData?.find((itemData: IDictData) => itemData.isActive) as IDictData
      if (viewTag.keyValue !== 'date-picker') {
        item.timeValue = null
        viewTag.keyValue = timeObj.key || (timeObj.dictKey as string)
        viewTag.titleValue = timeConfigLength.value > 1 ? `${item.title}：${timeObj.value}` : `${timeObj.value}`
      } else {
        viewTag.titleValue = timeConfigLength.value > 1 ? `${item.title}：${tag.value}` : `${tag.value}`
      }
      break
    default:
      // eslint-disable-next-line no-empty
      if ([ConditionTypeEnum.track, ConditionTypeEnum.region].includes(item.type) && isSon) {
      } else {
        if (!item.multiple) {
          const detail = item.dictData?.find((itemData: IDictData) => itemData.isActive) as IDictData
          viewTag.keyValue = (detail.dictKey as string) || detail.key
          viewTag.titleValue = detail.dictValue || detail.title || (detail.value as string)
        }
      }
  }

  //handle viewTags
  addViewTag(tag, viewTag, item.multiple)
}

function setSelected(item: IConditionItem, tag: IViewTag, isSon: boolean = false) {
  if (!isSon) {
    switch (tag.keyValue) {
      case '0':
        item.dictData?.forEach(dict => {
          if (tag.keyValue === dict.key || tag.keyValue === dict.dictKey) {
            dict.isActive = true
          } else {
            dict.isActive = false
          }
        })
        break
      default:
        item.dictData[0].isActive = false
        item.dictData.forEach(dict => {
          if (tag.keyValue === dict.key || tag.keyValue === dict.dictKey) {
            dict.isActive = !dict.isActive
          } else {
            if (!item.multiple) {
              dict.isActive = false
            }
          }
        })
        // eslint-disable-next-line no-case-declarations
        const index = item.dictData.findIndex(dict => dict.isActive)
        if (index === -1) {
          item.dictData[0].isActive = true
        }
    }
    const currentTag = item.dictData.find(dict => dict.isActive) as IDictData
    switch (item.type) {
      case ConditionTypeEnum.track:
        if (currentTag.key !== '0') {
          const sonTrack = item.dictData.find(data => data.key === tag.keyValue)
          if (sonTrack?.children?.length) {
            sonTrackRef.value = sonTrack
            showTracksRef.value = true
          } else {
            sonTrackRef.value = {}
            showTracksRef.value = false
          }
        } else {
          sonTrackRef.value = {}
          showTracksRef.value = false
        }
        break
      case ConditionTypeEnum.region:
        if (currentTag.key !== '0') {
          const sonRegion = item.dictData.find(data => data.key === tag.keyValue)
          sonRegionRef.value = sonRegion
          showRegionRef.value = true
        } else {
          sonRegionRef.value = {}
          showRegionRef.value = false
        }
        break
    }
  }
}

function addViewTag(tag: IDictData, viewTag: IViewTag, isMultiple: boolean) {
  if (isMultiple) {
    if (isNoFilter(viewTag.keyValue)) {
      //删除所有多选
      const list = currentConditionRef.value.filter(view => view.key !== viewTag.key)
      currentConditionRef.value = [...list]
      updateQueryParams(viewTag)
    } else {
      handleViewTag(tag, viewTag, isMultiple)
    }
  } else {
    handleViewTag(tag, viewTag, isMultiple)
  }
}

function handleViewTag(tag: IDictData, viewTag: IViewTag, isMultiple: boolean) {
  const currentIndex = currentConditionRef.value.findIndex(item => {
    if (viewTag.multiple) {
      return item.key === viewTag.key && item.keyValue === viewTag.keyValue
    } else {
      return item.key === viewTag.key
    }
  })
  if (currentIndex !== -1) {
    if (!viewTag.keyValue || isNoFilter(tag.key) || isNoFilter(viewTag.keyValue) || isMultiple) {
      currentConditionRef.value.splice(currentIndex, 1)
    } else {
      currentConditionRef.value.splice(currentIndex, 1, viewTag)
    }
    updateQueryParams(viewTag)
  } else {
    if (!isNoFilter(tag.key)) {
      currentConditionRef.value.push(viewTag)
      updateQueryParams(viewTag)
    }
  }
}

function updateQueryParams(viewTag: IViewTag) {
  const { queryConditionRef } = props
  emit('update:query', handlerParams(viewTag, queryConditionRef))
}
function clearFilter() {
  const { queryConditionRef, initialCondition } = props
  //handle selected status
  conditionStore.clearCondition()
  sonTrackRef.value = {}
  showTracksRef.value = false
  sonRegionRef.value = {}
  showRegionRef.value = false
  inputCompanyRef.value = null
  inputInvestRef.value = null
  //handle viewTags
  currentConditionRef.value = []
  //handleQueryCondition
  for (const key in queryConditionRef) {
    if (!key.endsWith('Sort')) {
      queryConditionRef[key] = undefined
    }
  }
  conditionConfigRef.value.forEach(item => {
    if (item.type === ConditionTypeEnum.time) {
      item.timeValue = null
    }
  })
  emit('update:query', Object.assign(queryConditionRef, initialCondition))
}

function viewTagClose(index: number, tag: IViewTag) {
  if (tag.type === ConditionTypeEnum.select) {
    switch (tag.title) {
      case 'inputCompanyRef':
        inputCompanyRef.value = null
        break
      case 'inputInvestRef':
        inputInvestRef.value = null
        break
    }
    tag.keyValue = '0'
    updateQueryParams(tag)
    currentConditionRef.value.splice(index, 1)
    return
  }
  const viewTag = {
    title: tag.title,
    key: tag.key,
    type: tag.type,
    multiple: tag.multiple,
    keyValue: '0',
    titleValue: '不限'
  }

  //handle viewTags
  const config = conditionConfigRef.value.find(item => {
    if (tag.multiple) {
      if (item?.key === tag.key) {
        viewTag.keyValue = tag.keyValue
        viewTag.titleValue = tag.titleValue
        return true
      } else {
        return false
      }
    } else {
      return item?.key === tag.key
    }
  }) as IConditionItem

  if (config.type === ConditionTypeEnum.time) {
    config.timeValue = null
  }
  //handle selected status
  setSelected(config, viewTag)
  //handleQueryCondition
  updateQueryParams(viewTag)
  currentConditionRef.value.splice(index, 1)
}

function handleTimeChange(val: string[], item: IConditionItem) {
  if (!val) {
    // item.timeValue = null
    handleClick(item, { key: '0', value: '不限', isActive: true })
  } else {
    handleClick(item, { key: 'date-picker', value: val.join(' 至 '), isActive: true })
  }
}

function genViewTag(value: string, tagObj: ITagObj) {
  const { defineProp } = props
  console.log(value, tagObj)
  return {
    title: tagObj.key,
    key: tagObj.key === 'inputCompanyRef' ? defineProp.name : defineProp.curInvestor,
    type: ConditionTypeEnum.select,
    multiple: false,
    keyValue: value,
    titleValue:
      tagObj.value + '：' + (['inputCompanyRef', 'inputInvestRef'].includes(tagObj.key) ? tagObj.keyValue || '' : value)
  }
}

function handleInputCompany(value: string, tagObj: ITagObj) {
  const viewTag = genViewTag(value, tagObj)
  const index = currentConditionRef.value.findIndex(tag => tag.key === viewTag.key)
  if (index === -1) {
    currentConditionRef.value.push(viewTag)
  } else {
    if (isNoFilter(value)) {
      currentConditionRef.value.splice(index, 1)
    } else {
      currentConditionRef.value.splice(index, 1, viewTag)
    }
  }
  updateQueryParams(viewTag)
}

function handleTrackNodeUpdate(tag: IDictData) {
  const item = conditionConfigRef.value.find(item => item?.type === ConditionTypeEnum.track) as IConditionItem
  handleClick(item, tag, true)
}

function handleRegionUpdate(tag: IDictData) {
  const item = conditionConfigRef.value.find(item => item?.type === ConditionTypeEnum.region) as IConditionItem
  handleClick(item, tag, true)
}
</script>
<style scoped lang="scss">
.n-divider:not(.n-divider&#45;&#45;vertical) {
  margin-top: 8px;
  margin-bottom: 8px;
}
.title {
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  width: 56px;
  color: #333639;
  margin-right: 10px;
}
.condition {
  .item {
    font-weight: 400;
    font-family: PingFangSC-Light, sans-serif;
    font-size: 13px;
    line-height: 24px;
    padding: 0px 11px;
    color: #666;
    transition: all 0.15s linear;
    background: transparent;
  }
  .cursor {
    cursor: pointer;
  }
}
.expand {
  position: absolute;
  right: -5px;
  top: 1px;
}
:deep .n-button__content {
  font-size: 13px;
}
:deep(.n-input.n-input&#45;&#45;pair .n-input__input-el) {
  font-size: 13px;
}
:deep(.n-input__placeholder) {
  font-size: 12px;
}
</style>
-->
