<template>
  <div class="flex items-center justify-between w-full pb-3 border-b">
    <div class="flex items-center space-x-3">
      <div class="text-lg font-bold text-slate-700">預約會議室</div>
    </div>
  </div>

  <form ref="form" @submit.prevent="handleSubmit">
    <div class="pb-4 mt-4 mb-6 border-b">
        <div class="form__line">
          <div class="form__title">會議主題</div>
          <input v-model="orderData.title" required size="50" type="text" />
        </div>
        <div class="form__line">
          <div class="form__title--no-line">會議日期</div>
          <date-picker v-model="orderData.date" cancelText="取消" :enableTimePicker="false" :flow="['year', 'month', 'calendar']" :format="dateFormat" locale="zh-TW" required selectText="確定"></date-picker>
        </div>
        <div class="form__line">
          <div class="form__title--no-line">會議時間</div>
          <date-picker v-model="orderData.startTime" cancelText="取消" :maxTime="{ hours: 18, minutes: 0 }" :minTime="{ hours: 9, minutes: 0 }" minutesGridIncrement="30" minutesIncrement="30" placeholder="開始時間" required selectText="確定" :startTime="{hours: 9, minutes: 0}" timePicker></date-picker>
          <div class="mx-3" >至</div>
          <date-picker v-model="orderData.endTime" cancelText="取消" :maxTime="{ hours: 18, minutes: 0 }" :minTime="{ hours: 9, minutes: 0 }" minutesGridIncrement="30" minutesIncrement="30" placeholder="結束時間" required selectText="確定" :startTime="startInEndTime()" timePicker></date-picker>
        </div>
        <div class="form__line">
          <div class="form__title">預約部門</div>
          <select id="department" v-model="orderData.department" name="department" required>
            <option value="">請選擇部門</option>
            <option value="0">總經理室</option>
            <option value="1">IT 部門</option>
            <option value="2">OT 部門</option>
            <option value="3">PM 部門</option>
            <option value="4">FAE 部門</option>
          </select>
        </div>
        <div class="form__line">
          <div class="form__title">與會人數</div>
          <input v-model="orderData.attends" class="w-10 text-center" min="1" required size="3" type="number" />
          <div class="ml-2">人</div>
        </div>
    </div>
    <button class="px-3 py-1 rounded-lg bg-neutral-200">送出</button>
    <div class="inline-block ml-3 text-rose-600">{{ orderSuccess }}</div>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  interface ObjectofTime {
    hours?: number | string
    minutes?: number | string
    seconds?: number | string
  }
  interface ObjectOfDatas {
    id: number
    title: string
    date: string
    startTime: ObjectofTime | null
    endTime: ObjectofTime | null
    department: string
    attends: number
    apply_user: string
    apply_date: number
    status: string
  }
  let orderData = ref<ObjectOfDatas>({
    id: 0,
    title: '',
    date: '',
    startTime: null,
    endTime: null,
    department: '',
    attends: 0,
    apply_user: '',
    apply_date: new Date().getTime(),
    status: '0'
  })
  const startInEndTime = () => {
    if (orderData.value.startTime) {
      return {
        hours: orderData.value.startTime.hours,
        minutes: 0
      }
    } else {
      return {
        hours: 9,
        minutes: 0
      }
    }
  }
  const form = ref<HTMLFormElement>()
  let orderSuccess = ref<string>('')
  const dateFormat = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}.${month}.${day}`
  }
  const handleSubmit = () => {
    const dataStorage = localStorage.getItem('datas') ? JSON.parse(localStorage.getItem('datas') || '{}') : { datas: [] }
    orderData.value.id = dataStorage.datas.length + 1
    dataStorage.datas.push(orderData.value)
    localStorage.setItem('datas', JSON.stringify(dataStorage))
    form.value.reset()
    orderSuccess.value = '預定成功'
  }
</script>

<style lang="postcss" scoped>
.form__line {
  @apply flex mb-5 mr-1 text-slate-500 items-center
}
.form__title {
  @apply pr-1 mr-2 border-b-2 border-slate-500
}
.form__title--no-line {
  @apply pr-1 mr-2
}
input {
  @apply px-2 border-b-2 border-slate-500
}
</style>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
input:focus {
    outline:none;
}
</style>