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
        <li class="menu">
          <router-link to="/check">審核</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .menu {
    @apply inline-block px-3 my-3 transition-colors duration-300 hover:text-blue-400
  }
</style>