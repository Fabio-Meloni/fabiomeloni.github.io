<!--
  Reusable timeline: renders a chronological list of entries (education
  or work experience). An entry bearing an associated thesis renders as
  a link to the corresponding thesis-detail route; other entries render
  as static cards.
-->
<script setup>
import { useI18n } from "vue-i18n";
import { FileText, Award } from "@lucide/vue";
import SectionHeading from "../SectionHeading/SectionHeading.vue";
import { useInView } from "../../composables/useInView.js";

const { t } = useI18n();

defineProps({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  sectionId: { type: String, required: true },
  entries: { type: Array, required: true },
});

const { target, isVisible } = useInView();

/**
 * Resolves the grade to display for an entry. The grade is defined on
 * at most one of the entry itself (e.g. a diploma) or its associated
 * thesis (a degree's final grade); the two are mutually exclusive.
 *
 * @param {Object} entry
 * @returns {string|undefined}
 */
function entryGrade(entry) {
  return entry.grade ?? entry.thesis?.grade;
}
</script>

<template>
  <section :id="sectionId" ref="target" class="timeline fade-in" :class="{ 'is-visible': isVisible }">
    <SectionHeading :tag="tag" :title="title" />

    <ol class="timeline-list">
      <li
        v-for="entry in entries"
        :key="entry.slug"
        class="timeline-item"
        :style="{ '--type-color': entry.type === 'internship' ? 'var(--secondary)' : 'var(--primary)' }"
      >
        <span class="timeline-dot" aria-hidden="true" />

        <component
          :is="entry.thesis ? 'router-link' : 'div'"
          :to="entry.thesis ? { name: 'thesis-detail', params: { slug: entry.slug } } : undefined"
          class="timeline-card"
          :class="{ 'is-clickable': !!entry.thesis }"
        >
          <div class="card-top">
            <span class="period">{{ entry.period }}</span>
            <span v-if="entryGrade(entry)" class="grade-pill">
              <Award :size="12" aria-hidden="true" />
              {{ entryGrade(entry) }}
            </span>
            <span v-if="entry.thesis" class="thesis-badge">
              <FileText :size="13" aria-hidden="true" />
              {{ t("timeline.viewThesis") }}
            </span>
          </div>
          <h3 class="institution">{{ entry.institution }}</h3>
          <p class="role">{{ entry.role }}</p>
          <p class="description">{{ entry.description }}</p>
        </component>
      </li>
    </ol>
  </section>
</template>

<style src="./TimelineSection.css" scoped></style>
