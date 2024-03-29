<template>
  <div class="w-full bg-white h-12">
    <div class="flex items-center justify-between h-full py-3">
        <div class="px-8 py-2">
            <span class="text-blue-800 font-bold font-serif">C & B</span>
        </div>
      <div class="px-6 py-2 relative">
        <div class="rounded-full p-1 border-[1px] border-gray-500">
        <img :src="userImage" alt="user" class="rounded-full cursor-pointer" @click="openBar">
        <div v-if="islogout" class="cursor-pointer flex items-center justify-center absolute w-20 h-8 top-12 right-1 bg-white rounded-lg border-[1px] border-gray-200" @click="logout">
          <span class="text-center text-gray-400 font-mono font-medium text-sm">Logout</span>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emits = defineEmits(['logout'])
const userImage = ref(`https://i.pravatar.cc/25?u=random`)

const islogout = ref(false)

const openBar = () => {
  islogout.value = !islogout.value
}

const logout = () => {
  emits("logout")
}

</script>

<style></style>
