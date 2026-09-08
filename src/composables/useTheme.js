import { ref } from "vue";

/** Local-storage key persisting the user's explicit theme selection. */
const STORAGE_KEY = "theme";

/**
 * Evaluates the `prefers-color-scheme` media feature.
 *
 * @returns {boolean} `true` if the user agent reports a dark-scheme preference.
 */
function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

/**
 * Module-level reactive theme state, initialized once at import time from
 * persisted user preference, falling back to the system preference.
 *
 * @type {import('vue').Ref<"light"|"dark">}
 */
const stored = localStorage.getItem(STORAGE_KEY);
const theme = ref(stored === "light" || stored === "dark" ? stored : systemPrefersDark() ? "dark" : "light");

/**
 * Synchronizes the current theme value onto the document root via the
 * `data-theme` attribute, which CSS custom-property definitions in
 * `src/style/tokens.css` select against.
 */
function apply() {
  document.documentElement.dataset.theme = theme.value;
}
apply();

/**
 * Vue composable exposing the application's shared, singleton theme state.
 *
 * @returns {{ theme: import('vue').Ref<"light"|"dark">, toggle: () => void }}
 */
export function useTheme() {
  /**
   * Toggles between the light and dark themes, persisting the selection
   * and re-applying it to the document root.
   */
  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, theme.value);
    apply();
  }

  return { theme, toggle };
}
