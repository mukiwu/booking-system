<template>
  <div class="bg-stone-800 text-neutral-300">
    <div class="container mx-auto text-right">
      <ul>
        <li class="menu">
          <router-link to="/order">預約</router-link>
        </li>
        <li class="menu">
          <router-link to="/">查詢</router-link>
        </li>
        <li v-if="permission === 'admin'" class="menu">
          <router-link to="/check">審核</router-link>
        </li>
        <li class="menu">
          <button @click="logout()">登出</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const permission = localStorage.getItem('permission')
const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style lang="postcss" scoped>
  .menu {
    @apply inline-block px-3 my-3 transition-colors duration-300 hover:text-blue-400
  }
</style>