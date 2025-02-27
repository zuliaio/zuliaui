/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import LandingView from "@/components/LandingView.vue";
import LoginView from "@/components/LoginView.vue";
import type { RouteLocationNormalized } from "vue-router";

const requiresAuth = { requiresAuth: true };

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: LandingView,
      alias: "/home",
      meta: requiresAuth,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      alias: "/login",
    },
  ],
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

router.beforeEach((to: RouteLocationNormalized, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    next("/login"); // Redirect to login page
  } else if (to.name === "login" && isAuthenticated) {
    // If the user is already authenticated and tries to access login page
    next("/");
  } else {
    next(); // Allow navigation to the route
  }
});

export default router;
