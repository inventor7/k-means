import type { RouteRecordRaw } from "vue-router";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/:locale?",
    name: "KmeansLayout",
    component: () => import("@/views/Layouts/KMeansLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/pages/Home.vue"),
      },
    ],
  },
];
