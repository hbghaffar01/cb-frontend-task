<template>
  <div class="bg-white rounded-xl p-2 w-1/5">
    <div class="flex items-center justify-center gap-8">
        <span class="text-gray-500 font-sans font-semibold capitalize">
            {{ title }}
        </span>
        <div class="rounded-xl w-10 h-10 flex items-center justify-center"
        :class="getColor">
            <span class="text-white font-sans font-semibold">
                {{ total }}
            </span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: "primary"
    }
})

const getColor = computed(() => {
    if(props.color === 'primary') {
        return 'bg-teal-200'
    } else if(props.color === 'secondary'){
        return 'bg-blue-200'
    }
})
</script>

<style>

</style>