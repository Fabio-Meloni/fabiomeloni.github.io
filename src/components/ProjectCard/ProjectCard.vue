<!--
  Summary card for a single project entry, linking to its detail
  route: icon, title, short description, category tags, a truncated
  technology stack, and a call-to-action.
-->
<script setup>
import { useI18n } from "vue-i18n";
import { ArrowRight } from "@lucide/vue";
import { getTagIcon } from "../../utils/tagIcons.js";

const { t } = useI18n();

const props = defineProps({
  project: { type: Object, required: true },
  icon: { type: String, default: "◆" },
});
</script>

<template>
  <router-link :to="{ name: 'project-detail', params: { id: project.id } }" class="project-card">
    <div class="card-header">
      <span class="card-icon" aria-hidden="true">{{ icon }}</span>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-desc">{{ project.shortDescription }}</p>

      <ul class="tag-list" :aria-label="t('projects.tagListLabel')">
        <li v-for="tag in project.tags" :key="tag" class="tag">
          <component :is="getTagIcon(tag)" :size="12" aria-hidden="true" />
          {{ tag }}
        </li>
      </ul>

      <!-- Stack is truncated to five entries; any remainder is summarized as a count chip. -->
      <ul class="stack-list" :aria-label="t('projects.stackListLabel')">
        <li v-for="tech in project.stack.slice(0, 5)" :key="tech" class="stack-chip">{{ tech }}</li>
        <li v-if="project.stack.length > 5" class="stack-chip stack-chip-more">
          +{{ project.stack.length - 5 }}
        </li>
      </ul>

      <span class="cta">
        {{ t("projects.viewDetails") }}
        <ArrowRight :size="14" aria-hidden="true" />
      </span>
    </div>
  </router-link>
</template>

<style src="./ProjectCard.css" scoped></style>
