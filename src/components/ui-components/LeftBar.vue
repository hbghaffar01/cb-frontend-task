<template>
  <div class="w-1/6 bg-white h-screen p-2">
    <div
      class="w-full flex items-center px-6 gap-2 py-4 hover:bg-blue-100 hover:rounded-3xl"
      :class="[isActive ? 'bg-blue-100 rounded-3xl': '']"
    >
      <!-- <img src="../../assets/user.svg" alt="user" class="h-5 w-5" /> -->
      <span class="text-gray-800 font-serif font-bold">Dashboard</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isActive = ref(true)
</script>

<style></style>
