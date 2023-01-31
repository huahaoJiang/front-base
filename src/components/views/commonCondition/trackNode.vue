<template xmlns:icon-ant-design="">
  <n-row class="bg-#EDF5F8 !mt-6px linear">
    <n-col
      style="line-height: 32px"
      :span="24"
      :key="trackEnum.title"
      v-for="(trackEnum, index) in trackEnumList"
      v-show="trackEnum.isShow"
    >
      <div class="child-flex">
        <div class="title">{{ trackEnum.title }}</div>
        <n-space style="gap: 0px 12px">
          <div :key="tag.key" v-for="tag in trackEnum.tracksData" @click="handleClick(tag, index)">
            <n-button
              icon-placement="right"
              class="h-24px linear text-13px"
              size="small"
              type="primary"
              v-if="tag.isActive"
              >{{ tag.title }}
              <template #icon v-if="tag.key !== '0'">
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

import type { IDictData } from '@/interface/view/condition'

const props = defineProps({
  track: {
    type: Object as PropType<IDictData>,
    required: true
  },
  defaultTrack: {
    type: Array as PropType<IDictData[]>,
    default() {
      return []
    }
  },
  maxLevel: {
    type: Number,
    default() {
      return 6
    }
  }
})
const emit = defineEmits(['update:click'])

function initialList() {
  return [
    { title: '二级分类', isShow: false, tracksData: [] as IDictData[] },
    { title: '三级分类', isShow: false, tracksData: [] as IDictData[] },
    { title: '四级分类', isShow: false, tracksData: [] as IDictData[] },
    { title: '五级分类', isShow: false, tracksData: [] as IDictData[] },
    { title: '六级分类', isShow: false, tracksData: [] as IDictData[] }
  ]
}
interface TrackEnum {
  title: string
  isShow: boolean
  tracksData: IDictData[]
}
const trackEnumList = ref<TrackEnum[]>(initialList())
watchEffect(() => {
  trackEnumList.value = initialList()
  const tracks = props.track.children
    ? props.track.children.map(track => {
        track.isActive = false
        return track
      })
    : []
  tracks.unshift(
    reactive({
      key: '0',
      title: '不限',
      isActive: true
    })
  )
  trackEnumList.value[0].tracksData = tracks
  trackEnumList.value[0].isShow = true
})

function trackNodeInit(dictList: IDictData[]) {
  if (dictList.length) {
    const initData = dictList.find(track => track.isActive) as IDictData
    trackEnumList.value.reduce((obj: IDictData | undefined, item) => {
      if (obj) {
        item.tracksData = obj.children as IDictData[]
        const childObj = obj.children?.find(track => track.isActive)
        if (childObj) {
          item.isShow = true
          obj.children?.unshift(
            reactive({
              key: '0',
              title: '不限',
              isActive: false
            })
          )
        } else {
          obj.children?.unshift(
            reactive({
              key: '0',
              title: '不限',
              isActive: true
            })
          )
          emit('update:click', obj)
        }
        return childObj
      } else {
        return undefined
      }
    }, initData)
  }
}

defineExpose({ init: trackNodeInit })

function handleClick(tag: IDictData, index: number) {
  const filterFlag: boolean = index >= props.maxLevel - 2
  const tasksData = trackEnumList.value[index].tracksData
  tasksData[0].isActive = false
  tasksData.forEach((data: any) => {
    if (tag.key === data.key) {
      data.isActive = !data.isActive
    } else {
      data.isActive = false
    }
  })
  const CurrentIndex = tasksData.findIndex(dict => dict.isActive)
  if (CurrentIndex === -1) {
    tasksData[0].isActive = true
  }

  if (tag.key === '0' || CurrentIndex === -1) {
    if (index > 0) {
      const current = trackEnumList.value[index - 1].tracksData.find(item => item.isActive) as IDictData
      emit('update:click', current)
    } else {
      const { track } = props
      emit('update:click', track)
    }
    trackEnumList.value[index + 1].tracksData = []
    trackEnumList.value[index + 1].isShow = false
  } else {
    if (tag.children?.length) {
      const tracks = tag.children.map(child => {
        child.isActive = false
        return child
      })
      if (tracks[0].key === '0') {
        tracks[0].isActive = true
      } else {
        tracks.unshift(
          reactive({
            key: '0',
            title: '不限',
            isActive: true
          })
        )
      }
      trackEnumList.value[index + 1].tracksData = tracks
      trackEnumList.value[index + 1].isShow = !filterFlag
    } else {
      for (let i = index + 1; i < 5; i++) {
        trackEnumList.value[i].tracksData = []
        trackEnumList.value[i].isShow = false
      }
    }
    emit('update:click', tag)
  }
}
</script>

<style scoped>
.title {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 32px;
  color: #999;
  background: #fff;
  padding-right: 10px;
  padding-left: 4px;
  flex-shrink: 0;
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
