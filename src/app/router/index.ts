import LoginPage from "@/pages/auth/LoginPage.vue";
import SignUpPage from "@/pages/auth/SignUpPage.vue";
import DefaultPage from "@/pages/DefaultPage.vue";
import GamePage from "@/pages/protected/GamePage.vue";
import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";
import NotFoundPage from "@/pages/NotFoundPage.vue";

class Routes {
  routes: any[];

  constructor(routes: any[]) {
    this.routes = routes;
  }

  getRoutes() {
    return this.routes;
  }

  addMetaData(key: string, value: any) {
    return new Routes(
      this.routes.map((item) => {
        return {
          ...item,
          meta: {
            ...item.meta,
            [key]: value,
          },
        };
      })
    );
  }
}

const authRoutes = new Routes([
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
    meta: {
      title: "Login",
    },
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    component: SignUpPage,
    meta: {
      title: "Sign Up",
    },
  },
]);

const protectedRoutes = new Routes([
  {
    name: "Game",
    path: "/game",
    component: GamePage,
    meta: {
      title: "Login",
      requireAuth: true, // Protect this route
    },
  },
]);

// const

const routes = [
  {
    name: "Not Found",
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
  {
    name: "Default Page",
    path: "/",
    component: DefaultPage,
    meta: {
      title: "DefaultPage",
      requireAuth: true,
    },
  },
  ...authRoutes.addMetaData("requireGuest", true).getRoutes(),
  ...protectedRoutes.getRoutes(),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  nextTick(() => {
    if (to.meta.title) {
      document.title = (to.meta.title as string) || "MISSING_TITLE";
    }
  });
});

router.beforeResolve(async (to, _from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!authStore.isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requireGuest)) {
    if (authStore.isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
