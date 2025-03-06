import { createRouter, createWebHistory } from "vue-router";
import { useLanguageGuard } from "./guards/useLanguageGuard";
import { publicRoutes } from "./routes/public";
import { authenticatedRoutes } from "./routes/authenticated";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...authenticatedRoutes],
});

router.beforeEach(useLanguageGuard);

export default router;
