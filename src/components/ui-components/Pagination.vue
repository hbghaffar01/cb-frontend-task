<template>
  <div class="flex justify-center items-center w-fit">
    <Button
      class="rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none"
      type="secondary"
      :disable="currentPage === 1"
      @click="moveToPreviousPage"
    >
      <span class="sr-only">Previous</span>
      <svgIcon
        class="flex items-center text-black"
        icon="Left"
        content="iconOnly"
        type="secondary"
        size="25"
      />
    </Button>
    <div class="overflow-x-hidden ml-auto max-w-[335px] mr-auto">
      <ul
        class="w-fit m-auto list-none overflow-x-auto flex align-items-center"
      >
        <li
          v-for="(paginatedNumber, index) in pages"
          :key="`${index}-pagination-index${paginatedNumber}`"
        >
          <button
            class="w-10 h-8 text-center flex items-center justify-center bg-white rounded-none !ring-0 border-gray-300 border-t border-b border-r"
            type="secondary"
            :class="`${
              Number(currentPage) === Number(paginatedNumber)
                ? 'text-gray-700 hover:text-gray-700 !bg-blue-50 hover:bg-blue border-[1px] border-blue-500 outline-none'
                : ''
            }`"
            @click.prevent="setCurrentPage(paginatedNumber)"
          >
            {{ paginatedNumber }}
          </button>
        </li>
      </ul>
    </div>
    <Button
      class="rounded-tl-none rounded-br-lg rounded-bl-none"
      type="secondary"
      :disable="currentPage === numberOfPages"
      @click="moveToNextPage"
    >
      <span class="sr-only">Next</span>
      <svgIcon
        class="flex items-center text-black"
        type="secondary"
        content="iconOnly"
        icon="Right"
        size="25"
      />
    </Button>
  </div>
</template>
    
<script setup>
import Button from "./Button.vue";
import svgIcon from "./svgIcon.vue";
import { computed, onBeforeUpdate, onMounted, ref } from "vue";
import { useStore } from "@/store";

const store = useStore()

const props = defineProps({
  count: {
    type: Number,
    default: 10,
  },
  limit: {
    type: Number,
    default: 5,
  },
  offset: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

let currentPage = ref(1);
let numberOfPages = ref(0);
let pageOffset = ref(props.offset);

onBeforeUpdate(() => {
  setData();
});

const VISIBLE_BUTTONS_AROUND_CURRENT_PAGE = 2;

const pages = computed(() => {
  const pageCount = numberOfPages.value;
  const visiblePages = [];

  if (pageCount <= VISIBLE_BUTTONS_AROUND_CURRENT_PAGE * 2 + 1) {
    for (let i = 1; i <= pageCount; i++) {
      visiblePages.push(i);
    }
  } else {
    let startPage = 1;
    let endPage = pageCount;

    if (currentPage.value <= VISIBLE_BUTTONS_AROUND_CURRENT_PAGE + 1) {
      endPage = VISIBLE_BUTTONS_AROUND_CURRENT_PAGE * 2 + 1;
    } else if (currentPage.value >= pageCount - VISIBLE_BUTTONS_AROUND_CURRENT_PAGE) {
      startPage = pageCount - VISIBLE_BUTTONS_AROUND_CURRENT_PAGE * 2;
    } else {
      startPage = currentPage.value - VISIBLE_BUTTONS_AROUND_CURRENT_PAGE;
      endPage = currentPage.value + VISIBLE_BUTTONS_AROUND_CURRENT_PAGE;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (startPage > 1) {
      visiblePages.unshift("...");
      visiblePages.unshift(1);
    }

    if (endPage < pageCount) {
      visiblePages.push("...");
      visiblePages.push(pageCount);
    }
  }

  return visiblePages;
});


const setData = () => {
  numberOfPages.value = Math.ceil(store.totalRecord / props.limit);
};

const emit = defineEmits(["fetch-data"]);
const fetchData = (data) => {
  emit("fetch-data", data);
};

const setCurrentPage = (currentPageValue) => {
  if (currentPageValue === "...") {
    return;
  }
  pageOffset.value = props.limit * (currentPageValue - 1);
  currentPage.value = currentPageValue;
  fetchData({
    page: currentPage.value,
    offset: pageOffset.value
  });
};

const moveToPreviousPage = () => {
  if (currentPage.value === 1) return;
  pageOffset.value =
    pageOffset.value - props.limit < 0 ? 0 : pageOffset.value - props.limit;
  currentPage.value--;
  fetchData({
    page: currentPage.value,
    offset: pageOffset.value
  });
};

const moveToNextPage = () => {
  if (currentPage.value === numberOfPages.value) return;
  pageOffset.value += props.limit;
  currentPage.value++;
  fetchData({
    page: currentPage.value,
    offset: pageOffset.value
  });
};
</script>
