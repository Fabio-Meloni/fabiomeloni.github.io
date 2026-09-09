<!--
  Media carousel supporting images and video, with dot navigation and a
  full-screen lightbox. In the absence of real media, a fixed set of
  three placeholder slides is displayed.
-->
<script setup>
import { ref, computed, onBeforeUnmount, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "@lucide/vue";

const { t } = useI18n();

const props = defineProps({
  images: { type: Array, default: () => [] },
  alt: { type: String, default: "" },
});

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov)$/i;

/**
 * @param {string} src
 * @returns {boolean} `true` if the source path has a recognized video file extension.
 */
function isVideo(src) {
  return VIDEO_EXTENSIONS.test(src);
}

const index = ref(0);
const total = computed(() => (props.images.length > 0 ? props.images.length : 3));
const hasRealImages = computed(() => props.images.length > 0);
const currentIsVideo = computed(() => hasRealImages.value && isVideo(props.images[index.value]));

function prev() {
  index.value = (index.value - 1 + total.value) % total.value;
}
function next() {
  index.value = (index.value + 1) % total.value;
}
function goTo(i) {
  index.value = i;
}

/** Gradient backgrounds for placeholder slides, cycled by index. */
const placeholderGradients = [
  "linear-gradient(135deg, rgba(58,123,255,0.35), rgba(127,91,255,0.35))",
  "linear-gradient(135deg, rgba(127,91,255,0.35), rgba(58,123,255,0.2))",
  "linear-gradient(135deg, rgba(58,123,255,0.2), rgba(127,91,255,0.4))",
];

/**
 * Full-screen lightbox state, presenting the current slide at larger
 * scale. Available only for real media; placeholder slides have no
 * corresponding full-resolution asset to display.
 */
const lightboxOpen = ref(false);
const slideVideoEl = ref(null);
const lightboxVideoEl = ref(null);

/**
 * Opens the lightbox, handing off video playback from the inline slide
 * player to the lightbox one at the same point in time so the "zoomed"
 * view continues seamlessly rather than restarting from the beginning.
 */
function openLightbox() {
  if (!hasRealImages.value) return;
  const el = slideVideoEl.value;
  const time = el?.currentTime ?? 0;
  const playing = el ? !el.paused : true;
  el?.pause();
  lightboxOpen.value = true;
  nextTick(() => {
    const lb = lightboxVideoEl.value;
    if (!lb) return;
    lb.currentTime = time;
    if (playing) lb.play();
  });
}

/** Closes the lightbox, handing video playback back to the inline slide player at the same point in time. */
function closeLightbox() {
  const lb = lightboxVideoEl.value;
  const time = lb?.currentTime ?? 0;
  const playing = lb ? !lb.paused : true;
  lightboxOpen.value = false;
  nextTick(() => {
    const el = slideVideoEl.value;
    if (!el) return;
    el.currentTime = time;
    if (playing) el.play();
  });
}

/**
 * Keyboard handler active while the lightbox is open: Escape closes it,
 * and the arrow keys navigate between slides.
 *
 * @param {KeyboardEvent} e
 */
function onKeydown(e) {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
}
watch(lightboxOpen, (open) => {
  if (open) {
    window.addEventListener("keydown", onKeydown);
    document.body.style.overflow = "hidden";
  } else {
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="carousel" role="group" :aria-label="t('carousel.galleryLabel')">
    <div class="viewport">
      <video
        v-if="currentIsVideo"
        ref="slideVideoEl"
        :key="images[index]"
        :src="images[index]"
        class="slide-media"
        controls
        autoplay
        muted
        playsinline
        preload="metadata"
        :aria-label="t('carousel.imageAlt', { alt, current: index + 1, total })"
      />
      <img
        v-else-if="hasRealImages"
        :src="images[index]"
        :alt="t('carousel.imageAlt', { alt, current: index + 1, total })"
        loading="lazy"
        class="slide-media"
      />
      <div
        v-else
        class="slide-placeholder"
        :style="{ background: placeholderGradients[index % placeholderGradients.length] }"
      >
        <span>{{ t("carousel.screenshot", { current: index + 1, total }) }}</span>
      </div>

      <button
        v-if="hasRealImages"
        type="button"
        class="zoom-btn"
        @click="openLightbox"
        :aria-label="t('carousel.zoom')"
      >
        <ZoomIn :size="16" aria-hidden="true" />
      </button>

      <button type="button" class="nav-btn nav-prev" @click="prev" :aria-label="t('carousel.prev')">
        <ChevronLeft :size="18" aria-hidden="true" />
      </button>
      <button type="button" class="nav-btn nav-next" @click="next" :aria-label="t('carousel.next')">
        <ChevronRight :size="18" aria-hidden="true" />
      </button>
    </div>

    <div class="dots" role="tablist" :aria-label="t('carousel.selectLabel')">
      <button
        v-for="i in total"
        :key="i"
        type="button"
        class="dot"
        :class="{ 'is-active': i - 1 === index }"
        :aria-current="i - 1 === index ? 'true' : undefined"
        :aria-label="t('carousel.goToSlide', { n: i })"
        @click="goTo(i - 1)"
      />
    </div>

    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
        <button type="button" class="lightbox-close" @click="closeLightbox" :aria-label="t('carousel.closeZoom')">
          <X :size="22" aria-hidden="true" />
        </button>

        <button type="button" class="lightbox-nav lightbox-prev" @click="prev" :aria-label="t('carousel.prev')">
          <ChevronLeft :size="24" aria-hidden="true" />
        </button>

        <video
          v-if="currentIsVideo"
          ref="lightboxVideoEl"
          :key="images[index]"
          :src="images[index]"
          class="lightbox-media"
          controls
          autoplay
          muted
          playsinline
          :aria-label="t('carousel.imageAlt', { alt, current: index + 1, total })"
        />
        <img
          v-else
          :src="images[index]"
          :alt="t('carousel.imageAlt', { alt, current: index + 1, total })"
          class="lightbox-media"
        />

        <button type="button" class="lightbox-nav lightbox-next" @click="next" :aria-label="t('carousel.next')">
          <ChevronRight :size="24" aria-hidden="true" />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style src="./ImageCarousel.css" scoped></style>
