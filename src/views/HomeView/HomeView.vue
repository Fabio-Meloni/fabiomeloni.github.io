<!--
  Home route: composes the Hero, Skills, Education timeline, Experience
  timeline, Projects, and Footer sections in a single scrollable page.
-->
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import HeroSection from "../../components/HeroSection/HeroSection.vue";
import SkillsSection from "../../components/SkillsSection/SkillsSection.vue";
import TimelineSection from "../../components/TimelineSection/TimelineSection.vue";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection.vue";
import AppFooter from "../../components/AppFooter/AppFooter.vue";
import { getContent } from "../../data.js";

const { t, locale } = useI18n();
const education = computed(() => getContent(locale.value).education);
const experience = computed(() => getContent(locale.value).experience);
</script>

<template>
  <div>
    <HeroSection />
    <SkillsSection />
    <TimelineSection :tag="t('education.tag')" :title="t('education.title')" section-id="formazione" :entries="education" />
    <TimelineSection :tag="t('experience.tag')" :title="t('experience.title')" section-id="esperienza" :entries="experience" />
    <ProjectsSection />
    <AppFooter />
  </div>
</template>
