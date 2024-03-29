<template>
  <div class="flex flex-col">
    <label for="email" class="text-blue-800 my-2 font-medium font-mono">
      {{ label }}
    </label>
    <input
      :type="type"
      v-model="inputModelValue"
      :disabled="disabled"
      v-bind="$attrs"
      :placeholder="placeholder"
      class="border-[1px] rounded-md border-gray-300 focus-visible:outline-none caret-gray-300 px-4 py-1"
    />
    <span
      v-if="error.length"
      class="text-red-400 font-light font-serif text-xs my-2"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  label: {
    type: String,
    default: "Email",
  },
  placeholder: {
    type: String,
    default: "Email",
  },
  error: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue", "change", "input"]);

const inputModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
    emits("change", val);
  },
});
</script>

<style></style>
