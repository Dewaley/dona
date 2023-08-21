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

const initialIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const isLoggedIn = ref(initialIsLoggedIn);

const getCurrentUser = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   console.log(user.email);
  //   if (user) {
  //     localStorage.setItem("isLoggedIn", "true");
  //     isLoggedIn.value = true;
  //   } else {
  //     localStorage.setItem("isLoggedIn", "false");
  //     isLoggedIn.value = false;
  //   }
  // });
  console.log(requiresAuth, isLoggedIn.value);
  if (requiresAuth) {
    if (await getCurrentUser()) {
      next();
    } else {
      console.log("you don't have access!");
      next("/login");
    }
  } else {
    next();
  }
});
