<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed flex items-center justify-center inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-auto px-4 py-8"
    >
      <div class="w-full max-w-lg bg-white rounded shadow-xl p-6">
        <div class="flex item-center justify-end">
            <svgIcon icon="Close" size="25" class="cursor-pointer" @click="close" />
        </div>
        <slot name="dialog"></slot>
      </div>
    </div>
  </teleport>
</template>
  
  <script setup>
import { computed } from "vue";
import svgIcon from "./svgIcon.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue", "close"]);

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const close = () => {
    emits("close")
}
</script>
  
  <style scoped>
</style>
  