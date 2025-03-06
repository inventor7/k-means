import type { RouteRecordRaw } from "vue-router";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/:locale?",
    name: "defaultLayout",
    component: () => import("@/views/Layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/pages/Home.vue"),
      },
    ],
  },
];
