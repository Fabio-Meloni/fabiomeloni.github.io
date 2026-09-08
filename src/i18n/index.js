import { createI18n } from "vue-i18n";
import it from "./locales/it.js";
import en from "./locales/en.js";

/** Local-storage key persisting the user's explicit locale selection. */
const STORAGE_KEY = "locale";

/** Set of locale codes for which message catalogs are available. */
const SUPPORTED = ["it", "en"];

/**
 * Determines the initial application locale, in order of precedence:
 * a previously persisted user selection, the browser's reported
 * language, and finally a fixed default.
 *
 * @returns {string} A member of {@link SUPPORTED}.
 */
function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const browserLang = navigator.language?.slice(0, 2);
  return SUPPORTED.includes(browserLang) ? browserLang : "en";
}

/**
 * Application i18n instance, operating in Composition API mode
 * (`legacy: false`).
 */
const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: "en",
  messages: { it, en },
});

/**
 * Updates the active locale, persists the selection, and synchronizes the
 * document's `lang` attribute accordingly.
 *
 * @param {string} locale - A member of {@link SUPPORTED}; other values are ignored.
 */
export function setLocale(locale) {
  if (!SUPPORTED.includes(locale)) return;
  i18n.global.locale.value = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}

// Initializes the document's `lang` attribute prior to the first render.
document.documentElement.lang = i18n.global.locale.value;

export default i18n;
