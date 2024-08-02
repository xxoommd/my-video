import { createRouter, createWebHistory } from "vue-router";
import MainView from "../components/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },

    {
      path: "/video/:id",
      name: "detail",
      // lazy-loaded when the route is visited.
      component: () => import("../components/Video.vue"),
    },

    // ... 其他路由配置
    {
      path: "/:pathMatch(.*)*", // 通配符路径
      redirect: "/", // 重定向到根目录
    },
  ],
});

export default router;
