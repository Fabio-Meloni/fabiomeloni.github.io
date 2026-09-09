<!--
  Project showcase: a grid of ProjectCard entries, followed by a
  placeholder card indicating that further projects are forthcoming.
-->
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionHeading from "../SectionHeading/SectionHeading.vue";
import ProjectCard from "../ProjectCard/ProjectCard.vue";
import { getContent } from "../../data.js";
import { useInView } from "../../composables/useInView.js";

const { t, locale } = useI18n();
const projects = computed(() => getContent(locale.value).projects);

/** Icon glyphs assigned to project cards, cycled by index. */
const icons = ["◆", "◈", "◇", "◉"];
const { target, isVisible } = useInView();
</script>

<template>
  <section id="projects" ref="target" class="projects fade-in" :class="{ 'is-visible': isVisible }">
    <SectionHeading :tag="t('projects.tag')" :title="t('projects.title')" />

    <div class="grid">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :icon="icons[index % icons.length]"
      />
    </div>
  </section>
</template>

<style src="./ProjectsSection.css" scoped></style>