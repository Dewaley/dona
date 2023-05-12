//Define routing rules
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RetrieveAccountView from "../views/RetrieveAccountView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/forgot-password",
      name: "RetrieveAccount",
      component: RetrieveAccountView,
    },
    {
      path: "/app",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});
