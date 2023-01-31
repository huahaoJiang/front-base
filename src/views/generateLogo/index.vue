<template>
  <div class="p-40px h-600px">
    <n-button type="primary" size="large" @click="handleClick(1)">生成logo</n-button>
    <div>
      剩余任务数： <span>{{ taskTotal }}</span>
    </div>
    <div>
      已完成数： <span>{{ finishTotal }}</span>
    </div>
    <div>
      失败文件： <span v-for="item in failList">{{ item }}、</span>
    </div>
    <div id="logo">
      <!--      <div class="logo">多多少少</div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import html2canvas from 'html2canvas'

import { getCompanyTableData } from '@/api/view/common'
import { GenLogoUtil } from '@/views/generateLogo/util'

const taskTotal = ref(0)
const finishTotal = ref(0)
const failList = ref<any[]>([])

const root = ref<HTMLElement>()
onMounted(() => {
  root.value = document.getElementById('logo') as HTMLElement
})
const genLogoUtil = new GenLogoUtil()

const handleClick = (current: number) => {
  if (current === 3) {
    writeFile()
  }
  getCompanyTableData({ current: current, size: 500, dataSwitch: 'off' }).then(res => {
    if (res.code === 200) {
      const data = res.data
      const list = data.records
        .filter(item => !item.logo)
        .map(item => {
          item.name.indexOf(' ') !== -1
            ? (item.name = item.name.split(' ')[0])
            : item.name.indexOf('（') !== -1 && (item.name = item.name.split(' ')[0])
          return {
            name: item.name,
            id: item.id
          }
        })

      if (current++ <= data.pages) {
        handleClick(current)
      }
      // console.log(genLogoUtil.getListLength())
      genLogoUtil.pushArr(list)

      // genImages([list[0], list[1]])
    }
  })
}

const options = {
  width: 200,
  height: 200,
  useCORS: true,
  scale: 2
}
let currentNums = 0

const genImages = (objArr: any[]) => {
  const promiseList = objArr.map(obj => {
    const div = document.createElement('div')
    div.setAttribute('id', obj.id)
    div.setAttribute('class', 'gen__logo')
    if (obj.name.length <= 4) {
      div.setAttribute('style', 'font-size: 40px')
    } else {
      div.setAttribute('style', 'font-size: 28px')
    }
    div.innerText = obj.name
    root.value?.appendChild(div)

    return new Promise(resolve => {
      html2canvas(div, options).then(canvas => {
        root.value?.removeChild(div)
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], obj.id + '.png')
            resolve(file)
          }
        })
      })
    })
  })
  Promise.all(promiseList).then((res: any[]) => {
    upload(res)
  })
}

function upload(files: File[]) {
  currentNums++
  const formData = new FormData()
  files.forEach(item => {
    formData.append('file', item)
  })
  axios
    .request({
      url: '/fh/downloadFile',
      method: 'post',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      const data = res.data
      currentNums--
      if (data.code === 200) {
        finishTotal.value += files.length
      } else {
        failList.value.push(data.msg)
      }
    })
}

function writeFile() {
  if (genLogoUtil.getListLength() > 0 && currentNums < 5) {
    const list = genLogoUtil.generateLogo(20)
    genImages(list)
    taskTotal.value = genLogoUtil.getListLength()
    setTimeout(() => {
      writeFile()
    }, 20)
  } else {
    if (genLogoUtil.getListLength() > 0) {
      setTimeout(() => {
        writeFile()
      }, 100)
    }
  }
}
</script>

<style lang="scss">
.gen__logo {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-family: PingFangSC-Medium, sans-serif;
  font-size: 40px;
  padding: 12px;
  text-align: center;
}
</style>
