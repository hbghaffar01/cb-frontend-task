<template>
  <div class="w-full m-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-6 w-full">
        <Card title="Total User" :total="store.users.total" color="primary" />
        <Card
          title="Total Page"
          :total="store?.users?.per_page"
          color="secondary"
        />
      </div>
      <div class="flex items-center gap-4">
        <Button
          v-if="selectedId.length > 1"
          title="Delete Users"
          type="danger"
          content="textOnly"
          @click="deleteUsers()"
        />
        <Button title="Add User" content="textOnly" @click="addNewUser()" />
      </div>
    </div>
    <div class="w-full flex flex-col gap-2 my-4">
      <Table :loading="loading">
        <template #row="{ row, column }">
          <div v-if="column === 'id'" class="flex items-center gap-4">
            <CheckBox
              @change="getSelectedRow(row.id)"
              :value="row.id"
              :checked="isChecked(row.id)"
            />
            <span>
              {{ row.id }}
            </span>
          </div>
          <div
            v-if="column === 'actions'"
            class="flex items-center gap-3 cursor-pointer"
          >
            <svgIcon
              icon="edit"
              size="20"
              @click.prevent="updateCurrUser(row)"
            />
            <svgIcon
              icon="delete"
              size="20"
              @click.prevent="deleteCurrUser(row)"
            />
          </div>
        </template>
      </Table>
      <div class="w-full flex items-center justify-center">
        <Pagination
          :count="count"
          :limit="limit"
          :offset="offset"
          @fetch-data="fetchData"
        />
      </div>
    </div>
    <Dialog v-model="isOpen" @close="closeDialog">
      <template #dialog>
        <div class="w-full h-full">
          <Input label="First Name" placeholder="First Name" v-model="payloadOptions.firstName" />
          <Input label="Last Name" v-model="payloadOptions.lastName" placeholder="Last Name" />
          <Input v-model="payloadOptions.email" placeholder="Email" />
          <div class="py-6">
            <Button
              v-if="!modifyUser"
              title="Submit"
              block
              content="textOnly"
              :loader="loading"
              @click.prevent="AddUser"
            />
            <Button
              v-else
              title="Update"
              block
              content="textOnly"
              :loader="loading"
              @click.prevent="updatingUser"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import Card from "@/components/ui-components/Card.vue";
import Table from "../ui-components/Table.vue";
import Button from "../ui-components/Button.vue";
import Dialog from "@/components/ui-components/Dialog.vue";
import Input from "../ui-components/Input.vue";
import { useStore } from "@/store";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import svgIcon from "../ui-components/svgIcon.vue";
import Pagination from "../ui-components/Pagination.vue";
import CheckBox from "../ui-components/CheckBox.vue";
import {
  createUser,
  updateUser,
  deleteUser,
  deleteMultipleUsers,
} from "@/Api/index";

const store = useStore();

const payloadOptions = ref({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
});

const rowData = ref({});
const loading = ref(false);
const count = ref(store.totalRecord);
const limit = ref(store.limit);
const offset = ref(store.offset);
const isOpen = ref(false);
const selectedId = ref([]);

const { update } = useStore()
const modifyUser = ref(false)

const isChecked = (id) => {
  return selectedId.value.includes(id);
};

const getSelectedRow = (id) => {
  const index = selectedId.value.indexOf(id);
  if (index < 0) {
    selectedId.value.push(id);
  } else {
    selectedId.value.splice(index, 1);
  }
};

const deleteUsers = async () => {
  loading.value = true;
  try {
    const response = await deleteMultipleUsers(selectedId.value);
    if (response.data.status === "success") {
      await store.getAllUsers();
      loading.value = false;
      console.log(response, "response");
      selectedId.value = [];
    }
  } catch (error) {
    loading.value = false;
    console.log(error, "error");
  }
};

const addNewUser = () => {
  isOpen.value = true;
  modifyUser.value = false;
};

const closeDialog = () => {
  isOpen.value = false;
};

const AddUser = async () => {
  loading.value = true;
  try {
    const response = await createUser(payloadOptions.value);
    store.$subscribe((state, mutation) => {
      console.log(state, mutation, 'subscribe');
    })
    loading.value = false;
    if (response.data.status === "success") {
      isOpen.value = false;
      console.log(response, "user created successfully");
      await store.getAllUsers();
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};

const updateCurrUser = async (data) => {
  modifyUser.value = true;
  isOpen.value = true;
  rowData.value = data;
};

const updatingUser = async () => {
  loading.value = true;
  try {
    const response = await updateUser(rowData.value?.id, payloadOptions.value);
    if (response.data.status === "success") {
      isOpen.value = false;
      modifyUser.value = false;
      await store.getAllUsers();
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    modifyUser.value = false;
    console.log(error, "error");
  }
};

const deleteCurrUser = async (data) => {
  loading.value = true;
  try {
    const response = await deleteUser(data?.id);
    if (response.data.status === "success") {
      await store.getAllUsers();
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.log(error, "error");
  }
};

const fetchData = async (data) => {
  loading.value = true;
  store.offset = data.page;
  try {
    const response = await store.getAllUsers(offset.value, limit.value);
    console.log(response, "pagination");
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error, "error");
  }
};

watchEffect(() => {
  if (modifyUser.value === true) {
    payloadOptions.value = rowData.value;
  } else {
    payloadOptions.value = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    };
    modifyUser.value = false;
  }
});

const getUsersData = async () => {
  try {
    const response = await store.getAllUsers();
    count.value = response?.total;
    limit.value = response?.per_page;
    offset.value = response?.page;
  } catch (error) {
    console.log(error, "error");
  }
};

onMounted(async () => {
  await getUsersData();
});

onUnmounted(() => {
  store.$reset()
})
</script>

<style></style>
