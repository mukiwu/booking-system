<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="w-1/2">
      <div class="text-2xl text-center text-black">
        會議室預定系統
      </div>
      <form class="mt-8" @submit.prevent="handleSubmit">
        <div class="max-w-lg mx-auto">
          <div class="py-2">
            <span class="px-1 text-sm text-gray-600">帳號</span>
            <input v-model="form.account" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-md focus:bg-white focus:border-blue-600 focus:outline-none" type="text">
          </div>
          <div class="py-2">
            <span class="px-1 text-sm text-gray-600">密碼</span>
            <input v-model="form.password" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-md focus:bg-white focus:border-blue-600 focus:outline-none" type="password">
          </div>
          <button class="block w-full px-6 py-3 mt-3 text-lg text-white bg-gray-700 rounded-lg shadow-xl hover:text-white hover:bg-black">
            登入
          </button>
        </div>
      </form>
      <div class="mt-8 text-sm text-center text-gray-500">
        <p>管理者：mason / mason</p>
        <p>使用者帳號一：muki / muki</p>
        <p>使用者帳號二：zoe / zoe</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const members = [
  {
    account: 'mason',
    password: 'mason',
    permission: 'admin'
  },
  {
    account: 'muki',
    password: 'muki',
    permission: 'user'
  },
  {
    account: 'zoe',
    password: 'zoe',
    permission: 'user'
  }
]
let form = ref({
  account: '',
  password: ''
})
const handleSubmit = () => {
  const account = form.value.account
  const password = form.value.password
  const user = members.find(user => user.account === account && user.password === password)
  if (user && user.permission) {
    localStorage.setItem('user', account)
    localStorage.setItem('permission', user.permission)
    router.push('/')
  } else {
    alert('帳號或密碼錯誤')
  }
}
</script>