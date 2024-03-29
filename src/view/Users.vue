<template>
  <div class="w-full h-screen bg-gray-100">
    <div class="w-full-h-full">
      <TopBar @logout="logout" />
      <div class="flex w-full h-full overflow-hidden">
        <LeftBar />
        <User />
      </div>
    </div>
  </div>
</template>

<script setup>
import { TopBar, LeftBar } from "@/components/ui-components";
import User from "@/components/Users/index.vue";
import router from "@/router";
import { useStore } from "@/store";

const store = useStore()

const logout = () => {
  store.isValidate = false;
  router.push("/login");
};

router.beforeEach((to, from, next) => {
  if (from.path === "/users" && to.path === "/login") {
    if (store.isValidate) {
      next(false);
    } else {
      next();
    }
  } else {
    next();
  }
});
</script>

<style></style>
