//Define routing rules
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RetrieveAccountView from "../views/RetrieveAccountView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

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
      meta: { requiresAuth: true },
    },
  ],
});

const isLoggedIn = ref();

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
  console.log(requiresAuth, isLoggedIn.value);
  if (requiresAuth && !isLoggedIn.value) {
    next("/login");
  } else {
    next();
  }
});
