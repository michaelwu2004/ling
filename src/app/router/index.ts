import LoginPage from "@/pages/auth/LoginPage.vue";
import SignUpPage from "@/pages/auth/SignUpPage.vue";
import DefaultPage from "@/pages/DefaultPage.vue";
import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";

class Routes {
  routes: any[];

  constructor(routes: any[]) {
    this.routes = routes;
  }

  getRoutes() {
    return this.routes;
  }

  addMetaData(key: string, value: any) {
    return new Routes(this.routes.map((item) => {
      return {
        ...item,
        meta: {
          ...item.meta,
          [key]: value
        }
      }
    }));
  }
}

const authRoutes = new Routes(
  [
    {
      name: 'Login',
      path: '/login',
      component: LoginPage,
      meta: {
        title: 'Login'
      }
    },
    {
      name: 'Sign Up',
      path: '/sign-up',
      component: SignUpPage,
      meta: {
        title: 'Sign Up'
      }
    }
  ]
);

const routes = [
  {
    name: 'Default Page',
    path: '/',
    component: DefaultPage,
    meta: {
      title: 'DefaultPage'
    }
  },
  ...authRoutes.getRoutes()
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  nextTick(() => {
    if (to.meta.title) {
      document.title = (to.meta.title as string) || "MISSING_TITLE"
    }
  });
});

export default router;