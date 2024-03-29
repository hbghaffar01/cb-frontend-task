import { listAllUsers, login } from "@/Api";
import { defineStore } from "pinia";

export const useStore = defineStore("user", {
    state: () => {
        return {
            users: [],
            auth: {},
            email: "",
            offset: 1,
            limit: 10,
            totalRecord: 0,
            update: false,
            selected: [],
            isValidate: false,
        }
    },
    actions: {
     async getAllUsers() {
        this.users = await listAllUsers(this.offset, this.limit)
        this.totalRecord = this.users.total
        this.offset = this.users.page
        console.log(this.users, "All users");
        return this.users
     },
     async authUser() {
        this.auth = await login(this.email)
        return this.auth
     }
    }
})