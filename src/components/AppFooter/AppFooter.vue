<!--
  Site footer: copyright notice with the current year, computed at
  render time, and the profile owner's name for the active locale.
-->
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useInView } from "../../composables/useInView.js";
import { useTheme } from "../../composables/useTheme.js";
import { getContent } from "../../data.js";

const { t, locale } = useI18n();
const profile = computed(() => getContent(locale.value).profile);

const { theme } = useTheme();
const isDarkTheme = computed(() => theme.value === "dark");

/** Current calendar year, evaluated once at component initialization. */
const year = new Date().getFullYear();
const { target, isVisible } = useInView();
</script>

<template>
  <footer id="contatti" ref="target" class="footer fade-in" :class="{ 'is-visible': isVisible }">
    <p class="copy">© {{ year }} {{ profile.name }}. {{ t("footer.rights") }}</p>
    <div class="legal-links">
      <a
        href="https://www.iubenda.com/privacy-policy/70024656"
        class="legal-link iubenda-noiframe iubenda-embed"
        :class="{ 'iubenda-black': isDarkTheme }"
        title="Privacy Policy"
        >Privacy Policy</a
      >
      <a
        href="https://www.iubenda.com/privacy-policy/70024656/cookie-policy"
        class="legal-link iubenda-noiframe iubenda-embed"
        :class="{ 'iubenda-black': isDarkTheme }"
        title="Cookie Policy"
        >Cookie Policy</a
      >
    </div>
  </footer>
</template>

<style src="./AppFooter.css" scoped></style>
