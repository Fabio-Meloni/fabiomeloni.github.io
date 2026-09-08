<!--
  Project detail route: full description, media carousel, and
  technology stack for a single project, resolved from the `id` route
  parameter. Renders a not-found state when no matching project exists.
-->
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ArrowLeft, PenLine, Layers } from "@lucide/vue";
import { getContent } from "../../data.js";
import { getTagIcon } from "../../utils/tagIcons.js";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel.vue";

const props = defineProps({
  id: { type: String, required: true },
});

const router = useRouter();
const { t, locale } = useI18n();
const project = computed(() => getContent(locale.value).projects.find((p) => p.id === Number(props.id)));

/** Navigates to the home route (see App.vue for the associated scroll-position restoration). */
function goBack() {
  router.push({ name: "home" });
}
</script>

<template>
  <div v-if="project" class="detail">
    <div class="breadcrumb">
      <button type="button" class="back-btn" @click="goBack">
        <ArrowLeft :size="15" aria-hidden="true" />
        {{ t("projectDetail.back") }}
      </button>
    </div>

    <div id="project-overview" class="content">
      <ul class="tag-list" :aria-label="t('projectDetail.tagListLabel')">
        <li v-for="tag in project.tags" :key="tag" class="tag">
          <component :is="getTagIcon(tag)" :size="12" aria-hidden="true" />
          {{ tag }}
        </li>
      </ul>

      <h1 class="title">{{ project.title }}</h1>
      <p class="short-desc">{{ project.shortDescription }}</p>

      <ImageCarousel :images="project.images" :alt="project.title" />

      <section id="project-description" class="block">
        <h2 class="block-title">
          <span class="block-icon" aria-hidden="true"><PenLine :size="14" /></span>
          {{ t("projectDetail.description") }}
        </h2>
        <p class="block-text description-text">{{ project.description }}</p>
      </section>

      <section id="project-stack" class="block">
        <h2 class="block-title">
          <span class="block-icon block-icon-secondary" aria-hidden="true"><Layers :size="14" /></span>
          {{ t("projectDetail.stack") }}
        </h2>
        <ul class="stack-list" :aria-label="t('projectDetail.stackListLabel')">
          <li v-for="tech in project.stack" :key="tech" class="stack-chip">{{ tech }}</li>
        </ul>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <p>{{ t("projectDetail.notFound") }}</p>
    <button type="button" class="back-btn" @click="goBack">
      <ArrowLeft :size="15" aria-hidden="true" />
      {{ t("projectDetail.backToPortfolio") }}
    </button>
  </div>
</template>

<style src="./ProjectDetailView.css" scoped></style>
