import { createRouter, createWebHistory } from "vue-router";
import {Login, Users} from "@/view";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },
];

const rootRoute = {
  path: "/",
  redirect: { name: "login" },
};

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, rootRoute],
});

export default router;
