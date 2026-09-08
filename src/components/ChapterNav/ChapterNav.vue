<!--
  Secondary sidebar navigation: lists the current route's sections and
  tracks scroll position to highlight the active one. Also exposes
  theme and locale toggles. Rendered only for the home, thesis-detail,
  and project-detail routes (see App.vue).
-->
<script setup>
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import {
  Home,
  Sparkles,
  GraduationCap,
  Briefcase,
  FolderKanban,
  PanelRightOpen,
  PanelRightClose,
  Quote,
  PenLine,
  Layers,
  Paperclip,
  Info,
} from "@lucide/vue";
import { useTheme } from "../../composables/useTheme.js";
import { setLocale } from "../../i18n/index.js";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar.vue";

const navEl = ref(null);

const { t, locale } = useI18n();
const { theme, toggle: toggleTheme } = useTheme();
const route = useRoute();

/**
 * Section definitions for the home route. No dedicated "Contact" entry
 * is included, as the sole contact point is the email action within the
 * Hero section.
 */
const HOME_CHAPTERS = [
  { id: "hero", labelKey: "nav.chapters.hero", icon: Home },
  { id: "skills", labelKey: "nav.chapters.skills", icon: Sparkles },
  { id: "formazione", labelKey: "nav.chapters.education", icon: GraduationCap },
  { id: "esperienza", labelKey: "nav.chapters.experience", icon: Briefcase },
  { id: "projects", labelKey: "nav.chapters.projects", icon: FolderKanban },
];

/** Section definitions for the thesis-detail route. */
const THESIS_CHAPTERS = [
  { id: "thesis-abstract", labelKey: "thesisDetail.abstract", icon: Quote },
  { id: "thesis-description", labelKey: "thesisDetail.description", icon: PenLine },
  { id: "thesis-stack", labelKey: "thesisDetail.stack", icon: Layers },
  { id: "thesis-attachments", labelKey: "thesisDetail.attachments", icon: Paperclip },
];

/** Section definitions for the project-detail route. */
const PROJECT_CHAPTERS = [
  { id: "project-overview", labelKey: "projectDetail.overview", icon: Info },
  { id: "project-description", labelKey: "projectDetail.description", icon: PenLine },
  { id: "project-stack", labelKey: "projectDetail.stack", icon: Layers },
];

/** Active route's section list. */
const CHAPTERS = computed(() => {
  if (route.name === "thesis-detail") return THESIS_CHAPTERS;
  if (route.name === "project-detail") return PROJECT_CHAPTERS;
  return HOME_CHAPTERS;
});

/**
 * Collapsed-state persistence. The panel defaults to collapsed; an
 * explicit prior expansion (a stored value of `"false"`) is the sole
 * condition under which it remains expanded on subsequent visits.
 */
const collapsed = ref(localStorage.getItem("chapterNavCollapsed") !== "false");
function toggleCollapsed() {
  collapsed.value = !collapsed.value;
  localStorage.setItem("chapterNavCollapsed", String(collapsed.value));
}

const activeId = ref(null);
let root;
let handleScroll;
let resizeObserver;
let suppressUntil = 0;

/**
 * Removes scroll tracking. Applied both on component teardown and when
 * navigating to a route with no trackable sections, on which no chapter
 * should register as active.
 */
function teardownTracking() {
  if (root && handleScroll) root.removeEventListener("scroll", handleScroll);
  resizeObserver?.disconnect();
  resizeObserver = null;
  root = null;
  handleScroll = null;
  activeId.value = null;
}

/**
 * Establishes scroll-position tracking for the active route's sections,
 * determining which chapter is "active" via a single fixed reference
 * line positioned 30% down the scroll container. This supersedes an
 * earlier IntersectionObserver-based implementation, under which two
 * adjacent short sections could simultaneously satisfy the intersection
 * criterion, producing an ambiguous result; comparing each section's top
 * edge against one reference line admits at most one qualifying section.
 */
function setupTracking() {
  teardownTracking();
  root = document.querySelector(".main-content");
  const chapters = CHAPTERS.value;
  const targets = chapters.map((c) => ({ id: c.id, el: document.getElementById(c.id) })).filter((c) => c.el);
  if (!root || targets.length === 0) return;

  activeId.value = chapters[0].id;

  /**
   * Recomputes the active chapter from the current scroll position.
   * Suppressed for a short interval following a programmatic
   * `scrollIntoView` (see `goTo`), so that a short target section is not
   * immediately superseded by its successor once both have crossed the
   * reference line.
   */
  function update() {
    if (Date.now() < suppressUntil) return;

    const line = root.getBoundingClientRect().top + root.clientHeight * 0.3;
    let current = targets[0].id;
    for (const { id, el } of targets) {
      if (el.getBoundingClientRect().top <= line) current = id;
      else break; // Targets are in document order; no subsequent target can qualify either.
    }

    // On short or wide viewports, available scroll distance may be
    // insufficient to carry the final chapter's top edge past the
    // reference line before the scroll position clamps at its maximum.
    // The final chapter is forced active once that maximum is reached.
    const distanceFromBottom = root.scrollHeight - root.scrollTop - root.clientHeight;
    activeId.value = distanceFromBottom < 4 ? chapters[chapters.length - 1].id : current;
  }

  handleScroll = update;
  root.addEventListener("scroll", handleScroll, { passive: true });
  resizeObserver = new ResizeObserver(update);
  resizeObserver.observe(root);
  update();
}

/**
 * Route-change handler establishing or tearing down section tracking.
 * The page transition in App.vue (mode="out-in") defers mounting the
 * incoming view's DOM until the outgoing view's leave transition
 * completes; polling on successive animation frames, rather than a
 * single post-navigation check, accommodates this delay without
 * requiring knowledge of the transition's duration. `setupToken`
 * invalidates a pending poll superseded by a subsequent route change.
 */
let setupToken = 0;
watch(
  () => route.name,
  (name) => {
    teardownTracking();
    if (name !== "home" && name !== "thesis-detail" && name !== "project-detail") return;
    const token = ++setupToken;
    const tryWhenReady = () => {
      if (token !== setupToken) return;
      const firstChapterId = CHAPTERS.value[0]?.id;
      if (firstChapterId && document.getElementById(firstChapterId)) setupTracking();
      else requestAnimationFrame(tryWhenReady);
    };
    requestAnimationFrame(tryWhenReady);
  },
  { immediate: true },
);
onBeforeUnmount(teardownTracking);

/**
 * Navigates to the given section via smooth scrolling and marks it
 * active immediately, suppressing scroll-driven recomputation for the
 * duration of the scroll animation.
 *
 * @param {string} id - Target section element id, drawn from the current route's {@link CHAPTERS}.
 */
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  activeId.value = id;
  suppressUntil = Date.now() + 700; // Exceeds the smooth-scroll animation duration.
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Locale names are rendered as endonyms (in the language they denote,
 * not translated into the active UI language).
 */
const otherLanguageName = computed(() => (locale.value === "it" ? "English" : "Italiano"));

function toggleLocale() {
  setLocale(locale.value === "it" ? "en" : "it");
}
</script>

<template>
  <div class="chapter-nav-wrapper" :class="{ collapsed }">
  <aside class="chapter-nav" :class="{ collapsed }" ref="navEl" :aria-label="t('nav.chapters.hero')">
    <button
      type="button"
      class="toggle-btn"
      @click="toggleCollapsed"
      :aria-label="collapsed ? t('nav.expand') : t('nav.collapse')"
      :aria-expanded="(!collapsed).toString()"
    >
      <PanelRightOpen v-if="collapsed" :size="15" aria-hidden="true" />
      <PanelRightClose v-else :size="15" aria-hidden="true" />
    </button>

    <ul class="chapter-list">
      <li v-for="chapter in CHAPTERS" :key="chapter.id">
        <a
          :href="`#${chapter.id}`"
          class="chapter-link"
          :class="{ active: activeId === chapter.id }"
          :aria-current="activeId === chapter.id ? 'true' : undefined"
          :aria-label="t('nav.goTo', { chapter: t(chapter.labelKey) })"
          @click.prevent="goTo(chapter.id)"
        >
          <component :is="chapter.icon" :size="16" class="chapter-icon" aria-hidden="true" />
          <span class="label">{{ t(chapter.labelKey) }}</span>
        </a>
      </li>
    </ul>

    <div class="spacer" />

    <div class="nav-actions">
      <button
        type="button"
        class="action-btn"
        @click="toggleTheme"
        :aria-label="theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')"
      >
        <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke-linecap="round" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
        </svg>
        <span class="label">{{ theme === "dark" ? t("theme.toggleToLight") : t("theme.toggleToDark") }}</span>
      </button>

      <button
        type="button"
        class="action-btn lang-btn"
        @click="toggleLocale"
        :aria-label="t('language.switchTo', { language: otherLanguageName })"
      >
        <span class="lang-code">{{ locale === "it" ? "EN" : "IT" }}</span>
        <span class="label">{{ otherLanguageName }}</span>
      </button>
    </div>
  </aside>
  <CustomScrollbar :target="navEl" />
  </div>
</template>

<style src="./ChapterNav.css" scoped></style>
