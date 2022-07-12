<template>
  <div class="flex items-center justify-center mt-10"> 
    <div class="w-full p-5 bg-white border shadow-md rounded-xl">
      <div class="flex items-center justify-between w-full pb-3 border-b">
        <div class="flex items-center space-x-3">
          <div class="text-lg font-bold text-slate-700">預定一覽</div>
        </div>
        <div class="flex items-center space-x-8">
          <button class="button__inactive" :class="{'button__active': checked === '-1'}" @click="check('-1')">全部</button>
          <button class="button__inactive" :class="{'button__active': checked === '0'}" @click="check('0')">審核中</button>
          <button class="button__inactive" :class="{'button__active': checked === '1'}" @click="check('1')">預訂完成</button>
          <button class="button__inactive" :class="{'button__active': checked === '2'}" @click="check('2')">預訂失敗</button>
        </div>
      </div>

      <div v-for="item in filterDatas" :key="item.id" class="pb-4 mt-4 mb-6 border-b">
        <div class="flex">
          <div class="mb-3 mr-1 text-xl font-bold">{{ item.title }}</div>
          <div> 
            <span class="inline-block px-1 py-1 text-xs text-white rounded-md bg-rose-400" :class="{'bg-rose-400': item.status === '0', 'bg-blue-400': item.status === '1', 'bg-gray-400': item.status === '2'}"
            >{{ convertStatus(item.status) }}</span>
          </div>
        </div>
        <div class="text-sm text-neutral-600">
          <ol>
            <li>
              <span class="text-neutral-600">預定日期：</span>
              <span class="text-neutral-600">{{ dateFormat(item.start_date) }} ~ {{ dateFormat(item.end_date) }}</span>
            </li>
            <li>
              <span>預約部門：{{ item.department }}</span>
            </li>
            <li>
              <span>與會人數：{{ item.attends }} 人</span>
            </li>
          </ol>
        </div>
        <div class="mt-4 text-slate-500">
          申請時間：<span>{{ dateFormat(item.apply_date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dateFormat } from '../utility/dateFormat'
import defaultDatas from '../json/default.json'
import { ref, computed } from 'vue'
const datas = localStorage.getItem('datas') ? JSON.parse(localStorage.getItem('datas') || '{}') : defaultDatas
interface ObjectOfDatas {
  id: number
  title: string
  start_date: number
  end_date: number
  department: string
  attends: number
  apply_user: string,
  apply_date: number
  status: string
}
let filterDatas = ref<ObjectOfDatas[]>(datas.datas)
let checked = ref<string>('-1')
const convertStatus = computed(() => { 
  return function (val: string) {
    switch (val) {
      case '0':
        return '審核中'
      case '1':
        return '預定完成'
      case '2':
        return '預定失敗'
    }
  }
})
const check = computed(() => {
  return function (status: string) {
    checked.value = status
    if (status === '-1') filterDatas.value = datas.datas
    else filterDatas.value = datas.datas.filter((item: { status: string }) => item.status === status)
    console.log('filterDatas', filterDatas)
    // localStorage.setItem('checked', status)
  }
})
</script>

<style lang="postcss" scoped>
.button__active {
  @apply text-white !bg-neutral-800
}
.button__inactive {
  @apply px-3 py-1 text-xs font-semibold border rounded-2xl bg-neutral-100
}
</style>
