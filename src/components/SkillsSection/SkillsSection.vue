<!--
  Technical skills and interests: a grid of technology tiles grouped by
  category (icons sourced remotely from skillicons.dev), followed by a
  list of interest pills with locally bundled icons.
-->
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Layers3, Rotate3d, ScanSearch, Bot, Cog, Dna, Code2, CheckCheck } from "@lucide/vue";
import SectionHeading from "../SectionHeading/SectionHeading.vue";
import { skillCategories, getContent } from "../../data.js";
import { useInView } from "../../composables/useInView.js";

const { t, locale } = useI18n();
const interests = computed(() => getContent(locale.value).interests);

/**
 * Lookup table mapping interest icon names (as authored in data.js) to
 * their Lucide components. Interests denote general topics rather than
 * branded developer tools, and therefore use plain icons in place of
 * the skillicons.dev logos used for the technology grid.
 */
const interestIcons = { Layers3, Rotate3d, ScanSearch, Bot, Cog, Dna, Code2, CheckCheck };

const { target, isVisible } = useInView();
</script>

<template>
  <section id="skills" ref="target" class="skills fade-in" :class="{ 'is-visible': isVisible }">
    <SectionHeading :tag="t('skills.tag')" :title="t('skills.title')" />

    <template v-for="category in skillCategories" :key="category.key">
      <h3 class="group-title">{{ t(`skills.categories.${category.key}.title`) }}</h3>
      <ul class="skill-grid" :aria-label="t(`skills.categories.${category.key}.listLabel`)">
        <li v-for="skill in category.items" :key="skill.slug" class="skill-tile" :style="{ '--skill-color': skill.color }">
          <img class="skill-icon" :src="`https://skillicons.dev/icons?i=${skill.slug}`" :alt="skill.name" loading="lazy" width="32" height="32" />
          <span class="skill-name">{{ skill.name }}</span>
        </li>
      </ul>
    </template>

    <h3 class="group-title">{{ t("skills.interestsTitle") }}</h3>
    <ul class="interest-list" :aria-label="t('skills.interestsListLabel')">
      <li v-for="interest in interests" :key="interest.name" class="interest-pill" :style="{ '--interest-color': interest.color }">
        <span class="interest-icon" aria-hidden="true">
          <component :is="interestIcons[interest.icon]" :size="15" />
        </span>
        {{ interest.name }}
      </li>
    </ul>
  </section>
</template>

<style src="./SkillsSection.css" scoped></style>
