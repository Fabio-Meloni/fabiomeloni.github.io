<!--
  Landing section: availability status, headline greeting, biography
  paragraphs (authored as HTML in data.js for inline accent styling),
  and primary call-to-action links.
-->
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Mail, FolderKanban } from "@lucide/vue";
import { useInView } from "../../composables/useInView.js";
import { getContent } from "../../data.js";

const { t, locale } = useI18n();
const profile = computed(() => getContent(locale.value).profile);

const { target, isVisible } = useInView();

/** Smooth-scrolls the viewport to the Projects section. */
function scrollToProjects() {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section id="hero" ref="target" class="hero fade-in" :class="{ 'is-visible': isVisible }">
    <span class="status-pill">
      <span class="status-dot" aria-hidden="true" />
      {{ t("hero.statusPill") }}
    </span>

    <h1 class="headline">{{ t("hero.greeting", { name: profile.name.split(" ")[0] }) }}</h1>

    <div class="bio">
      <p v-for="(paragraph, i) in profile.bio" :key="i" v-html="paragraph" />
    </div>

    <div class="cta-row">
      <a class="cta-primary" :href="`mailto:${profile.email}`">
        <Mail :size="16" aria-hidden="true" />
        {{ t("hero.ctaContact") }}
      </a>
      <a href="#projects" class="cta-secondary" @click.prevent="scrollToProjects">
        <FolderKanban :size="16" aria-hidden="true" />
        {{ t("hero.ctaProjects") }}
      </a>
    </div>
  </section>
</template>

<style src="./HeroSection.css" scoped></style>
