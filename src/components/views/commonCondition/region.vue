<template xmlns:icon-ant-design="">
  <n-row class="!mt-6px linear">
    <n-col
      class="bg-#EDF5F8"
      v-for="(regionEnum, index) in regionEnumList"
      v-show="regionEnum.isShow"
      :key="regionEnum.title"
      style="line-height: 32px"
      :span="24"
    >
      <div class="child-flex">
        <div class="title">{{ regionEnum.title }}</div>
        <n-space style="gap: 0px 12px">
          <div v-for="tag in regionEnum.regionsData" :key="tag.key" @click="handleClick(tag, index)">
            <n-button
              v-if="tag.isActive"
              class="h-24px linear text-13px"
              size="small"
              icon-placement="right"
              type="primary"
              >{{ tag.title }}
              <template v-if="tag.key !== '0'" #icon>
                <n-icon :size="13"><icon-ant-design:close-outlined /></n-icon>
              </template>
            </n-button>
            <span v-else class="item cursor">{{ tag.title }}</span>
          </div>
        </n-space>
      </div>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import { getDictData } from '@/api/view/condition'
import type { IDictData } from '@/interface/view/condition'
// import { getDictData } from '@/api/view/condition'

const props = defineProps({
  region: {
    type: Object as PropType<IDictData>,
    required: true
  }
})
const emit = defineEmits(['update:click'])

function initialList(title: string = '') {
  return [
    { title: title || '国内', isShow: false, regionsData: [] as IDictData[] },
    { title: '城市', isShow: false, regionsData: [] as IDictData[] }
    // { title: '区', isShow: false, regionsData: [] as IDictData[] }
  ]
}
const regionEnumList = ref(initialList())
watchEffect(() => {
  regionEnumList.value = initialList(props.region.value)
  const regions = props.region.children
    ? props.region.children.map(region => {
        region.isActive = false
        return region
      })
    : []
  regions.unshift(
    reactive({
      key: '0',
      title: '不限',
      isActive: true
    })
  )
  regionEnumList.value[0].regionsData = regions
  regionEnumList.value[0].isShow = true
})

enum STATIC_REGION_ENUM {
  '北京' = '0011',
  '天津' = '0012',
  '上海' = '0031',
  '重庆' = '0050'
}
const STATIC_REGION_MAP = {
  [STATIC_REGION_ENUM.北京]: '001101',
  [STATIC_REGION_ENUM.天津]: '001201',
  [STATIC_REGION_ENUM.上海]: '003101',
  [STATIC_REGION_ENUM.重庆]: '005001'
}

function handleClick(tag: IDictData, index: number) {
  const regionsData = regionEnumList.value[index].regionsData
  regionsData[0].isActive = false
  regionsData.forEach((data: any) => {
    if (tag.key === data.key) {
      data.isActive = !data.isActive
    } else {
      data.isActive = false
    }
  })
  const CurrentIndex = regionsData.findIndex(dict => dict.isActive)
  if (CurrentIndex === -1) {
    regionsData[0].isActive = true
  }

  if (tag.key === '0' || CurrentIndex === -1) {
    if (index > 0) {
      const current = regionEnumList.value[index - 1].regionsData.find(item => item.isActive) as IDictData
      emit('update:click', current)
    } else {
      const { region } = props
      emit('update:click', region)
    }
  } else {
    emit('update:click', tag)
  }
  let regionCode = tag.key
  switch (tag.key) {
    case STATIC_REGION_ENUM.北京:
      regionCode = STATIC_REGION_MAP[STATIC_REGION_ENUM.北京]
      break
    case STATIC_REGION_ENUM.天津:
      regionCode = STATIC_REGION_MAP[STATIC_REGION_ENUM.天津]
      break
    case STATIC_REGION_ENUM.上海:
      regionCode = STATIC_REGION_MAP[STATIC_REGION_ENUM.上海]
      break
    case STATIC_REGION_ENUM.重庆:
      regionCode = STATIC_REGION_MAP[STATIC_REGION_ENUM.重庆]
      break
  }
  tag.key.startsWith('00') &&
    index + 1 < regionEnumList.value.length &&
    getDictData('/blade-system/region/select?code=' + regionCode).then((res: any) => {
      const data = res.data
      regionEnumList.value[index + 1].title = tag.title || '城市'
      if (data?.length) {
        regionEnumList.value[index + 1].regionsData = [
          {
            key: '0',
            title: '不限',
            isActive: true
          },
          ...data.map((child: any) => {
            child.isActive = false
            child.key = child.code
            child.title = child.name
            return child
          })
        ]
        regionEnumList.value[index + 1].isShow = true
      } else {
        for (let i = index + 1; i < 3; i++) {
          regionEnumList.value[i].regionsData = []
          regionEnumList.value[i].isShow = false
        }
      }
      emit('update:click', tag)
    })
}
</script>

<style scoped>
.title {
  width: 66px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 32px;
  color: #999;
  flex-shrink: 0;
  text-align: right;
  padding-right: 10px;
}
.item {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  padding: 0px 8px;
  color: #666;
  transition: all 0.15s linear;
  background: transparent;
}
.cursor {
  cursor: pointer;
}
.child-flex {
  margin-left: -65px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
