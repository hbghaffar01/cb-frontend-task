<template>
  <div class="w-full relative">
    <div class="w-full table-container bg-white max-h-[350px] rounded-xl">
      <table class="w-full divide-y divide-gray-200 rounded-xl">
        <thead class="w-full h-10 border-b-[1px] border-gray-200" v-if="store?.users?.data">
          <tr
            class="text-left text-xs font-thin text-gray-500 capitalize tracking-wider [&>*:first-child]:pl-12"
          >
            <th v-for="(item, index) in tableTitle" :key="index" class="px-4">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody class="text-base text-gray-700" v-if="store?.users?.data">
          <tr
            v-for="(row, index) in store?.users?.data"
            :key="index"
            class="text-left text-sm font-normal h-10 text-gray-700 capitalize tracking-wider border-b-[1px] border-gray-200 hover:bg-gray-50"
          >
            <td v-for="(col, index) in tableTitle" :key="index" class="px-4">
              <slot name="row" :column="col" :row="row" :rowIndex="index">
                {{ row[col] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="w-full h-[350px]"
        v-if="!store?.users?.data"
      >
        <Skeleton rows="7" />
      </div>
    </div>
    <div
      v-if="loading"
      class="absolute inset-0 rounded-2xl top-0 left-0 bg-gray-800 bg-opacity-70 z-50 flex justify-center items-center"
    >
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-10 h-10 text-gray-100 animate-spin dark:text-gray-600 fill-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store";
import { reactive, ref } from "vue";
import svgIcon from "./svgIcon.vue";
import Skeleton from "./Skeleton.vue"

const emits = defineEmits(["selected"])

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const store = useStore();

const tableTitle = reactive([
  "id",
  "email",
  "firstName",
  "lastName",
  "actions",
]);
</script>

<style scoped>
.table-container {
  overflow-y: scroll;
  scrollbar-width: none;
}

.table-container::-webkit-scrollbar {
  display: none;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bg-gray-500.bg-opacity-70 {
  background-color: rgba(99, 114, 129, 0.7);
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
</style>
