import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/HomeView.vue";

/**
 * Application router instance, configured with HTML5 history mode.
 * Route-level code splitting is applied to the detail views via dynamic
 * `import()`; the home view is bundled eagerly as the application's
 * default entry point.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  /**
   * Restores the previously recorded scroll position on browser
   * back/forward navigation, and resets to the top of the document for
   * any other navigation.
   *
   * @param {import('vue-router').RouteLocationNormalized} to
   * @param {import('vue-router').RouteLocationNormalized} from
   * @param {{ left: number, top: number } | null} savedPosition
   * @returns {{ left?: number, top: number }}
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/progetti/:id",
      name: "project-detail",
      component: () => import("../views/ProjectDetailView/ProjectDetailView.vue"),
      props: true,
    },
    {
      path: "/tesi/:slug",
      name: "thesis-detail",
      component: () => import("../views/ThesisDetailView/ThesisDetailView.vue"),
      props: true,
    },
  ],
});

export default router;
