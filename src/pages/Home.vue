<template>
  <div class="container mx-auto mt-24">
    <p class="text-5xl">Hello, {{ user }}!</p>
    <p class="text-3xl leading-normal">歡迎來到會議室預定系統</p>
    <div class="flex items-center justify-center mt-10"> 
      <div class="w-full p-5 bg-white border shadow-md rounded-xl">
        <div class="flex items-center justify-between w-full pb-3 border-b">
    <div class="flex items-center space-x-3">
      <div class="text-lg font-bold text-slate-700">預定一覽</div>
    </div>
    <div class="flex items-center space-x-8">
      <button class="button__inactive" :class="{'button__active': checked === '-1'}" @click="check('-1')">全部</button>
      <button class="button__inactive" :class="{'button__active': checked === '0'}" @click="check('0')">審核中</button>
      <button class="button__inactive" :class="{'button__active': checked === '1'}" @click="check('1')">預訂成功</button>
      <button class="button__inactive" :class="{'button__active': checked === '2'}" @click="check('2')">預訂失敗</button>
    </div>
  </div>
  <template v-if="viewSelfData && viewSelfData[0].data.length > 0" >
    <div v-for="(list, index) in filterData" :key="index" class="pb-4 mt-4 mb-6 border-b">
      {{ (list.date).replace(/\-/g, '.') }} ({{ new Date(list.date).toLocaleDateString('zh-TW', { weekday: 'narrow' }) }})
      <div class="flex flex-wrap">
        <div v-for="(item, index) in list.data" :key="index" class="w-[24%] p-2 mx-2 my-2 border rounded-md bg-gray-50 [&:nth-child(4n+1)]:ml-0 [&:nth-child(4n)]:mr-0">
          <div class="flex items-center">
            <div class="mr-2">{{ item.title }}</div>
            <div>
              <span class="inline-block px-1 py-1 text-xs text-white rounded-md bg-rose-400" :class="{'bg-rose-400': item.status === '0', 'bg-blue-400': item.status === '1', 'bg-gray-400': item.status === '2'}"
              >{{ convertStatus(item.status) }}</span>
            </div>
          </div>
          <ol>
            <li>
              <span>預定時間：</span>
              <span>{{ item.startTime.hours }}:{{ item.startTime.minutes }} ~ {{ item.endTime.hours }}:{{ item.endTime.minutes }}</span>
            </li>
            <li>
              <span>預約部門：{{ convertDep(item.department) }}</span>
            </li>
            <li>
              <span>與會人數：{{ item.attends }} 人</span>
            </li>
          </ol>
          <div class="pt-2 pl-5 mt-2 text-sm text-gray-600 border-t border-gray-300">
            申請時間：<span>{{ new Date(item.apply_date).toLocaleString('sv-SE').replace(/\-/g, '.') }}</span>
          </div>
          <div class="pl-5 mt-1 text-sm text-gray-600">
            申請人：<span>{{ item.apply_user }}</span>
          </div>
          <div v-if="permission === 'admin'" class="mt-2 ml-4 text-sm text-gray-600">
            <input :id="`success_${item.id}`" v-model="status" class="mx-1" :group="`check_${item.id}`" type="radio" :value="`success_${item.id}`"><label :for="`success_${item.id}`">通過</label>
            <input :id="`fail_${item.id}`" v-model="status" class="mx-1" :group="`check_${item.id}`" type="radio" :value="`fail_${item.id}`"><label :for="`fail_${item.id}`">駁回</label>
            <button class="px-2 ml-2 border rounded-lg border-neutral-300 bg-neutral-100" @click="checkOrder()">確認</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="mt-5 text-center">
      <p>無資料</p>
      <p><router-link class="inline-block px-2 py-1 mt-2 text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-rose-500" to="/order">點我預約</router-link></p>
    </div>
  </template>
      </div>
    </div>
  </div>  
</template>

<script setup>
import { ref, computed, onMounted, } from 'vue'
const user = localStorage.getItem('user')
const permission = localStorage.getItem('permission')
const datas = localStorage.getItem('datas') ? JSON.parse(localStorage.getItem('datas') || '') : ''
const viewSelfData = ref([{ date: '', data: [] }])
const filterData = ref([{ date: '', data: [] }])
onMounted(() => {
  if ( datas.datas.length > 0) {
    let tmpData = datas.datas.filter((item) => {
      if (permission !== 'admin') return item.apply_user === user
      else return item
    })
    if (tmpData[0] && tmpData[0].date) {
      viewSelfData.value[0].date = tmpData[0].date.slice(0, 10)
      for (let i = 0; i < tmpData.length; i++) {
        let count = 0
        for (let j = 0; j < viewSelfData.value.length; j++) {
          if (tmpData[i].date.slice(0, 10) === viewSelfData.value[j].date) {
            viewSelfData.value[j].data.push(tmpData[i])
          } else {
            count = count + 1
            if (count === viewSelfData.value.length) {
              let order = viewSelfData.value.length
              viewSelfData.value[order] = { date: '', data: [] }
              viewSelfData.value[order].date = tmpData[i].date.slice(0, 10)
            }
          }
        }
      }
    }
    filterData.value = viewSelfData.value
  }
})
let checked = ref('-1')
let status = ref('')
const convertStatus = computed(() => { 
  return function (val) {
    switch (val) {
      case '0':
        return '審核中'
      case '1':
        return '預定成功'
      case '2':
        return '預定失敗'
    }
  }
})
const convertDep = computed(() => { 
  return function (val) {
    switch (val) {
      case '0':
        return '總經理室'
      case '1':
        return 'IT 部門'
      case '2':
        return 'OT 部門'
      case '3':
        return 'PM 部門'
      case '4':
        return 'FAE 部門'
    }
  }
})
const check = computed(() => {
  return function (status) {
    checked.value = status
    const tmpData = JSON.parse(JSON.stringify(viewSelfData.value))
    if (status === '-1') filterData.value = viewSelfData.value
    else {
      filterData.value = tmpData.reduce((previousValue, item) => {
        let one = status
        item.data = item.data.filter((item2) => item2.status === one)
        if (item.data.length > 0) previousValue.push(item)
        return previousValue
      },[])
    }
  }
})
const checkOrder = () => {
  const checkStatus = status.value.split('_')[0]
  const id = status.value.split('_')[1]
  viewSelfData.value.map((item) => {
    item.data.map((item) => {
      if (item.id === Number(id)) {
      switch(checkStatus) {
        case 'success':
          item.status = '1'
          break
        case 'fail':
          item.status = '2'
          break
        }
      }
      return item
    })
    return item
  })

  datas.datas.map((item) => {
    if (item.id === Number(id)) {
      console.log('checkStatus', checkStatus, item.status)
      switch(checkStatus) {
        case 'success':
          item.status = '1'
          break
        case 'fail':
          item.status = '2'
          break
      }
    }
    return item
  })
  localStorage.setItem('datas', JSON.stringify(datas))
}
</script>

<style lang="postcss" scoped>
ol {
  @apply mt-3 ml-5 text-slate-600
}
li {
  @apply my-1 list-disc
}
.button__active {
  @apply text-white !bg-neutral-800
}
.button__inactive {
  @apply px-3 py-1 text-xs font-semibold border rounded-2xl bg-neutral-100
}
</style>
