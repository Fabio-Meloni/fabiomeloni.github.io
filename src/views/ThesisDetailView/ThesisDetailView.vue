<!--
  Thesis detail route: abstract, extended description, technology
  stack, and downloadable attachments for a thesis entry, resolved from
  the `slug` route parameter across both the education and experience
  timelines. Renders a not-found state when no matching entry exists.
-->
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ArrowLeft, Quote, PenLine, Paperclip, FileText, BarChart3, File, Award, Layers, User } from "@lucide/vue";
import { getContent } from "../../data.js";

/**
 * Lookup table mapping attachment icon names (as authored in data.js,
 * per `@lucide/vue` component name) to their components. Unmapped
 * values fall back to a generic file icon.
 */
const ATTACHMENT_ICONS = { FileText, BarChart3 };

const props = defineProps({
  slug: { type: String, required: true },
});

const router = useRouter();
const { t, locale } = useI18n();
const entry = computed(() => {
  const content = getContent(locale.value);
  return [...content.education, ...content.experience].find((e) => e.slug === props.slug && e.thesis);
});

/** Navigates to the home route (see App.vue for the associated scroll-position restoration). */
function goBack() {
  router.push({ name: "home" });
}

/**
 * Parses the thesis description text into an ordered sequence of
 * paragraph and bullet-list blocks. Blocks are delimited by blank
 * lines; within a block, lines prefixed with "-" (the sole markup
 * convention used in this text) are grouped into a list, optionally
 * preceded by a lead-in paragraph drawn from any lines before the list.
 *
 * @param {string} text
 * @returns {Array<{ type: "paragraph", text: string } | { type: "list", items: string[] }>}
 */
function descriptionBlocks(text) {
  return text
    .split("\n\n")
    .filter(Boolean)
    .flatMap((block) => {
      const lines = block.split("\n").filter(Boolean);
      const listStart = lines.findIndex((line) => line.trim().startsWith("- "));
      if (listStart === -1) return [{ type: "paragraph", text: block }];

      const blocks = [];
      if (listStart > 0) blocks.push({ type: "paragraph", text: lines.slice(0, listStart).join(" ") });
      blocks.push({ type: "list", items: lines.slice(listStart).map((line) => line.trim().slice(2)) });
      return blocks;
    });
}

/**
 * Resolves the icon component for a thesis attachment.
 *
 * @param {string} icon - Component name, per {@link ATTACHMENT_ICONS}.
 * @returns {import('vue').Component}
 */
function attachmentIcon(icon) {
  return ATTACHMENT_ICONS[icon] ?? File;
}
</script>

<template>
  <div v-if="entry" class="detail">
    <div class="breadcrumb">
      <button type="button" class="back-btn" @click="goBack">
        <ArrowLeft :size="15" aria-hidden="true" />
        {{ t("thesisDetail.back") }}
      </button>
    </div>

    <div class="content">
      <div class="pills">
        <span class="pill">{{ entry.institution }}</span>
        <span class="pill">{{ entry.period }}</span>
        <span v-if="entry.thesis.advisor" class="pill">
          <User :size="12" aria-hidden="true" />
          {{ entry.thesis.advisor }}
        </span>
        <span v-if="entry.thesis.grade" class="pill pill-grade">
          <Award :size="12" aria-hidden="true" />
          {{ entry.thesis.grade }}
        </span>
      </div>

      <p class="degree">{{ entry.thesis.degree }}</p>
      <h1 class="title">{{ entry.thesis.title }}</h1>

      <section id="thesis-abstract" class="block block-abstract">
        <h2 class="block-title">
          <span class="block-icon" aria-hidden="true"><Quote :size="14" /></span>
          {{ t("thesisDetail.abstract") }}
        </h2>
        <p class="block-text abstract-text">{{ entry.thesis.abstract }}</p>
      </section>

      <section v-if="entry.thesis.description" id="thesis-description" class="block">
        <h2 class="block-title">
          <span class="block-icon block-icon-secondary" aria-hidden="true"><PenLine :size="14" /></span>
          {{ t("thesisDetail.description") }}
        </h2>
        <div class="block-text description-text">
          <template v-for="(block, i) in descriptionBlocks(entry.thesis.description)" :key="i">
            <ul v-if="block.type === 'list'" class="desc-list">
              <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
            </ul>
            <p v-else>{{ block.text }}</p>
          </template>
        </div>
      </section>

      <section v-if="entry.thesis.stack?.length" id="thesis-stack" class="block">
        <h2 class="block-title">
          <span class="block-icon block-icon-secondary" aria-hidden="true"><Layers :size="14" /></span>
          {{ t("thesisDetail.stack") }}
        </h2>
        <ul class="stack-list" :aria-label="t('thesisDetail.stackListLabel')">
          <li v-for="tech in entry.thesis.stack" :key="tech" class="stack-chip">{{ tech }}</li>
        </ul>
      </section>

      <section v-if="entry.thesis.attachments.length" id="thesis-attachments" class="block">
        <h2 class="block-title">
          <span class="block-icon" aria-hidden="true"><Paperclip :size="14" /></span>
          {{ t("thesisDetail.attachments") }}
        </h2>
        <ul class="attachments">
          <li v-for="att in entry.thesis.attachments" :key="att.filename">
            <a
              class="attach-btn"
              :href="`/attachments/thesis/${att.filename}`"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t('thesisDetail.downloadLabel', { label: att.label })"
            >
              <span class="attach-icon" aria-hidden="true">
                <component :is="attachmentIcon(att.icon)" :size="16" />
              </span>
              <span class="attach-info">
                <span class="attach-label">{{ att.label }}</span>
                <span class="attach-filename">{{ att.filename }}</span>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <p>{{ t("thesisDetail.notFound") }}</p>
    <button type="button" class="back-btn" @click="goBack">
      <ArrowLeft :size="15" aria-hidden="true" />
      {{ t("thesisDetail.backToPortfolio") }}
    </button>
  </div>
</template>

<style src="./ThesisDetailView.css" scoped></style>
