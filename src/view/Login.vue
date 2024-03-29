<template>
  <div class="w-full h-screen bg-white">
    <div class="flex h-full">
      <div class="w-2/4 bg-blue-800 h-full">
        <div class="flex flex-col items-center justify-center h-full">
          <div class="w-1/6 rounded-full border-white border-2 p-1 my-2">
            <img src="../assets/creed.svg" alt="logo" class="rounded-full" />
          </div>
          <div class="my-2">
            <span class="text-white font-semibold font-mono">
              Creeds & Bear Admin
              <br />
              <small class="text-xs font-semibold mx-7 font-mono text-teal-300"
                >by Haseeb Ghaffar</small
              >
            </span>
          </div>
        </div>
      </div>

      <div class="w-2/4 bg-white p-4 h-full">
        <div class="flex items-center justify-center h-full w-full">
          <div class="w-1/2">
            <Input
              v-model="email"
              type="email"
              :error="isError"
              placeholder="Email"
              class="text-gray-400"
            />
            <div class="w-full" :class="[loading ? 'my-1' : 'my-2']">
              <Button
                title="Login"
                block
                :loader="loading"
                content="textOnly"
                @click="validateUser"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "@/store";
import { Input, Button } from "@/components/ui-components";
import router from "@/router";
import { mapActions } from "pinia";

const store = useStore();

const email = ref("");
const isError = ref("");
const loading = ref(false);

const validateUser = async () => {
  store.email = email.value;
  try {
    loading.value = true;
    const response = await store.authUser();
    console.log(response.data, "login");
    if (response.data.status === "success") {
      router.push("/users");
      loading.value = false;
      store.isValidate = true
    } else {
      loading.value = false;
      store.isValidate = false
    }
  } catch (error) {
    loading.value = false;
    store.isValidate = false
    console.log(error);
  }
};

router.beforeResolve((to, from, next) => {
    console.log(to, from);
    if(from.fullPath === '/login' && store.isValidate === false) {
      next(false)
    } else {
      next()
    }
});

onMounted(async () => {
  await store.getAllUsers();
  email.value = store.users?.data[0]?.email
});
</script>

<style></style>
