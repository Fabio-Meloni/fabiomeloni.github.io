<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "../components/AppSidebar/AppSidebar.vue";
import ChapterNav from "../components/ChapterNav/ChapterNav.vue";
import CustomCursor from "../components/CustomCursor/CustomCursor.vue";
import CustomScrollbar from "../components/CustomScrollbar/CustomScrollbar.vue";

const route = useRoute();
const mainContentEl = ref(null);

/**
 * Scroll-position management for `.main-content`, a single persistent
 * scroll container shared across all routes (the router-view merely
 * exchanges its child content). Vue Router's own `scrollBehavior` option
 * governs only `window` scrolling, which does not apply here; without
 * intervention, a newly opened route would inherit whatever scroll offset
 * was left by the previously displayed one. The home route is the sole
 * exception: it restores the offset recorded when it was last left,
 * rather than resetting to the top.
 *
 * `route.fullPath` is compared directly, rather than tracking the
 * previous route name in a local variable, because `route.name` is not
 * guaranteed to be resolved at component setup time; a watcher's
 * `oldValue` parameter does not carry this limitation, as Vue evaluates
 * the watched source once at watcher creation.
 */
const HOME_PATH = "/";
let savedHomeScrollTop = 0;

watch(
  () => route.fullPath,
  (newFullPath, oldFullPath) => {
    if (oldFullPath === HOME_PATH && mainContentEl.value) {
      savedHomeScrollTop = mainContentEl.value.scrollTop;
    }
    // The scroll reset is deferred to onPageBeforeEnter: under the
    // out-in transition mode, the outgoing view remains rendered (mid
    // leave-transition) at the moment this watcher fires, so resetting
    // the scroll offset here would be visible during its exit animation.
  },
);

/**
 * Resets the scroll offset for the incoming view. Invoked as the
 * `before-enter` hook of the page transition, at which point the
 * outgoing view has been fully removed (mode="out-in") and the incoming
 * element has been inserted but not yet made visible (its `enter-from`
 * state holds zero opacity), so the reset is not perceptible.
 */
function onPageBeforeEnter() {
  if (mainContentEl.value) mainContentEl.value.scrollTop = 0;
}

/**
 * Restores the recorded home-route scroll offset following a completed
 * entrance transition. Invoked as the `after-enter` hook of the page
 * transition. A smooth scroll is used, rather than an instantaneous
 * assignment, so the restoration reads as a deliberate return to the
 * prior position.
 */
function onPageAfterEnter() {
  if (route.fullPath === HOME_PATH && savedHomeScrollTop > 0 && mainContentEl.value) {
    mainContentEl.value.scrollTo({ top: savedHomeScrollTop, behavior: "smooth" });
  }
}
</script>

<template>
  <AppSidebar />
  <div class="main-content-wrapper">
    <main class="main-content" ref="mainContentEl">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in" @before-enter="onPageBeforeEnter" @after-enter="onPageAfterEnter">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
    <CustomScrollbar :target="mainContentEl" />
  </div>
  <ChapterNav v-if="route.name === 'home' || route.name === 'thesis-detail' || route.name === 'project-detail'" />
  <CustomCursor />
</template>

<style src="./App.css" scoped></style>
