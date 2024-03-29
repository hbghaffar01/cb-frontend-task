<template>
  <div class="base flex items-center p-[2px] !h-5">
    <input
      :checked="checked"
      :disabled="disabled"
      :value="value ? value : modelValue"
      v-bind="$attrs"
      v-model="inputModelValue"
      :id="id"
      type="checkbox"
      :class="[
        disabled
          ? ' !cursor-not-allowed !border-gray-200 !text-gray-400'
          : 'cursor-pointer !text-teal-600',
      ]"
      class="!h-4 !w-4 !rounded !border-solid focus:!ring-teal-500"
      style="border-color: rgb(209, 213, 219)"
      @click="getChecked(value)"
    />
  </div>
</template>

<script setup>
import { computed, ref, toRaw } from "vue";
const emits = defineEmits(["update:modelValue", "change", "click"]);

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const inputModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    if (Array.isArray(toRaw(props.modelValue))) {
      modelValArray.value = [...props.modelValue];
      if (modelValArray.value.includes(props.value))
        modelValArray.value = modelValArray.value.filter(
          (el) => el !== (props.value || props.modelValue)
        );
      else modelValArray.value.push(props.value);
      emits("update:modelValue", modelValArray.value);
      emits("change", modelValArray.value);
    } else {
      emits(
        "update:modelValue",
        props.value == props.modelValue ? null : props.value || val
      );
      emits(
        "change",
        props.value == props.modelValue ? null : props.value || val
      );
    }
  },
});

const modelValArray = ref([]);

function getChecked(id) {
  emits("click", id);
}
</script>

<style lang="scss" scoped></style>
