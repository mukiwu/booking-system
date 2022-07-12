<template>
  <div class="bg-stone-800 text-neutral-300">
    <div class="container mx-auto text-right">
      <ul>
        <li class="inline-block">
          <router-link to="/order">預約</router-link>
        </li>
        <li class="inline-block"><a href="#">查詢</a></li>
        <li class="inline-block"><a href="#">審核</a></li>
      </ul>
    </div>
  </div>
  <div class="container mx-auto mt-24">
    <p class="text-5xl">Hello, world!</p>
    <p class="text-3xl leading-normal">歡迎來到會議室預定系統</p>
    <router-view />
  </div>
  
</template>

<script setup lang="ts">
  
</script>
