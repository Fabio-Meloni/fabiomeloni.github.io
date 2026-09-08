<!--
  Section heading: a numeric/label tag, the section title, and a
  horizontal rule filling the remaining width.
-->
<script setup>
defineProps({
  tag: { type: String, required: true },
  title: { type: String, required: true },
});
</script>

<template>
  <div class="section-heading">
    <span class="tag">{{ tag }}</span>
    <h2 class="title">{{ title }}</h2>
    <span class="rule" aria-hidden="true" />
  </div>
</template>

<style src="./SectionHeading.css" scoped></style>
