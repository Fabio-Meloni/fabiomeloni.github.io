<!--
  Application sidebar: profile summary, academic badge, social and
  contact links, and CV download action. Persistent across all routes.
-->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { GraduationCap, Mail, FileUser, ArrowUpRight } from "@lucide/vue";
import { getContent } from "../../data.js";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar.vue";

const { t, locale } = useI18n();
const profile = computed(() => getContent(locale.value).profile);
const EMAIL = computed(() => profile.value.email);
const sidebarEl = ref(null);

const initials = computed(() =>
  profile.value.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
);

/**
 * Procedural generation of the avatar "3D-print" reveal animation (see
 * the .printer rule set in AppSidebar.css). The avatar photograph is
 * disclosed in horizontal layers, swept right to left in synchrony with
 * the print head rendered above it. Layer height is derived from the
 * nozzle width parameter, and per-layer sweep width follows the chord of
 * the circular mask at that height; as both quantities depend jointly on
 * several geometric parameters, the corresponding CSS keyframes are
 * computed programmatically here rather than authored by hand.
 */
const PRINTER = {
  containerWidth: 355, // px, .printer width
  avatarSize: 148.8, // px, .avatar-ring diameter (constant regardless of printer size)
  avatarBottom: 262.76, // px from top of .printer, where the avatar's bottom edge sits
  nozzleWidth: 6.5, // px, rendered width of the print-head nozzle tip
  hoverOffset: 24, // px the head hovers above the line it's printing
  liftAmount: 16, // extra px the head rises during the retrace, on top of hoverOffset
  printStart: 10, // % of the animation where printing begins
  printEnd: 88, // % of the animation where printing ends
  sweepFraction: 0.8, // portion of each layer's time block spent sweeping (rest is the retrace gap)
};

const layerCount = Math.round(PRINTER.avatarSize / PRINTER.nozzleWidth);

/**
 * Constructs a `clip-path` polygon revealing a horizontal band between
 * two vertical boundaries, partially swept according to a sweep
 * fraction.
 *
 * @param {number} topRow - Upper boundary of the band, as a percentage from the top.
 * @param {number} botRow - Lower boundary of the band, as a percentage from the top.
 * @param {number} s - Sweep fraction, in the range [0, 1] (0 = fully occluded, 1 = fully revealed).
 * @returns {string} A CSS `polygon()` function value.
 */
function printPolygon(topRow, botRow, s) {
  const x = (100 - s * 100).toFixed(3);
  return `polygon(0% 100%, 100% 100%, 100% ${topRow.toFixed(3)}%, ${x}% ${topRow.toFixed(3)}%, ${x}% ${botRow.toFixed(3)}%, 0% ${botRow.toFixed(3)}%)`;
}

/**
 * Computes the half-width of the circular mask's chord at a given layer
 * boundary, expressed as a fraction of the circle's radius (1 at the
 * equator, approaching 0 at the poles).
 *
 * @param {number} topRowPercent - Layer boundary position, as a percentage from the top.
 * @returns {number} Chord half-width fraction, in the range [0, 1].
 */
function chordFraction(topRowPercent) {
  const r = PRINTER.avatarSize / 2;
  const heightFromTop = (topRowPercent / 100) * PRINTER.avatarSize;
  const d = Math.abs(heightFromTop - r);
  return Math.sqrt(Math.max(r * r - d * d, 0)) / r;
}

/**
 * Generates the CSS keyframe rules driving the avatar print-reveal
 * animation, derived from the {@link PRINTER} geometry parameters.
 *
 * @returns {string} A CSS text block containing the `avatar-print-reveal`,
 *   `printhead-travel`, `ph-glow-fade`, and `avatar-halo-reveal` @keyframes rules.
 */
function buildPrintAnimationCss() {
  const { containerWidth, avatarSize, avatarBottom, hoverOffset, liftAmount, printStart, printEnd, sweepFraction } =
    PRINTER;
  const layerPct = 100 / layerCount;
  const layerHeight = avatarSize / layerCount;
  const blockSize = (printEnd - printStart) / layerCount;
  const rContainerPct = (avatarSize / 2 / containerWidth) * 100;

  // First pass: precompute per-layer geometry, enabling the retrace
  // computation below to reference the following layer's position.
  const layers = [];
  for (let i = 0; i < layerCount; i++) {
    const topRow = 100 - (i + 1) * layerPct;
    const botRow = 100 - i * layerPct;
    const rawY = avatarBottom - (i + 1) * layerHeight;
    const headTop = rawY - hoverOffset;
    const halfWidthPct = chordFraction(topRow) * rContainerPct;
    layers.push({
      topRow,
      botRow,
      headTop,
      rightBound: 50 + halfWidthPct,
      leftBound: 50 - halfWidthPct,
    });
  }

  const revealStops = [];
  const headStops = [];

  revealStops.push(`0%, ${printStart}% { clip-path: ${printPolygon(layers[0].topRow, 100, 0)}; }`);
  headStops.push(`0% { left: 85%; top: 4px; opacity: 0; }`);
  headStops.push(`4% { left: 85%; top: 4px; opacity: 1; }`);

  for (let i = 0; i < layerCount; i++) {
    const { topRow, botRow, headTop, rightBound, leftBound } = layers[i];
    const blockStart = printStart + i * blockSize;
    const sweepEnd = blockStart + blockSize * sweepFraction;
    const blockEnd = printStart + (i + 1) * blockSize;

    revealStops.push(`${sweepEnd.toFixed(3)}% { clip-path: ${printPolygon(topRow, botRow, 1)}; }`);
    headStops.push(`${blockStart.toFixed(3)}% { left: ${rightBound.toFixed(3)}%; top: ${headTop.toFixed(2)}px; opacity: 1; }`);
    headStops.push(`${sweepEnd.toFixed(3)}% { left: ${leftBound.toFixed(3)}%; top: ${headTop.toFixed(2)}px; opacity: 1; }`);

    if (i < layerCount - 1) {
      const next = layers[i + 1];
      revealStops.push(`${blockEnd.toFixed(3)}% { clip-path: ${printPolygon(next.topRow, botRow - layerPct, 0)}; }`);

      // Retrace motion: the head lifts (a "Z-hop"), traverses laterally
      // while elevated, then descends at the start of the next layer.
      const gapStart = sweepEnd;
      const gapEnd = blockEnd;
      const liftPoint = gapStart + (gapEnd - gapStart) * 0.15;
      const arrivePoint = gapStart + (gapEnd - gapStart) * 0.85;
      const liftedTop = Math.min(headTop, next.headTop) - liftAmount;

      headStops.push(`${liftPoint.toFixed(3)}% { left: ${leftBound.toFixed(3)}%; top: ${liftedTop.toFixed(2)}px; opacity: 1; }`);
      headStops.push(`${arrivePoint.toFixed(3)}% { left: ${next.rightBound.toFixed(3)}%; top: ${liftedTop.toFixed(2)}px; opacity: 1; }`);
    } else {
      revealStops.push(`${printEnd}%, 100% { clip-path: ${printPolygon(topRow, botRow, 1)}; }`);
    }
  }

  // Final resting position: the head remains visible at the top-left
  // upon completion, in contrast to its initial top-right position.
  headStops.push(`94% { left: 26.0%; top: 95px; opacity: 1; }`);
  headStops.push(`100% { left: 26.0%; top: 95px; opacity: 1; }`);

  // Nozzle glow visibility, active only during the printing phase and
  // suppressed while the head travels to its final resting position.
  const glowStops = [`0%, ${printEnd}% { opacity: 1; }`, `94%, 100% { opacity: 0; }`];

  // Halo reveal: an expanding circular clip, synchronized to the same
  // printStart–printEnd interval as the photograph reveal, independent
  // of the photograph's own rectangular band-based clipping. The target
  // radius equals the containing box's half-diagonal, ensuring full
  // coverage upon completion.
  const glowRadius = (avatarSize * Math.SQRT2) / 2;
  const haloStops = [
    `0%, ${printStart}% { clip-path: circle(0px at 50% 50%); }`,
    `${printEnd}%, 100% { clip-path: circle(${glowRadius.toFixed(2)}px at 50% 50%); }`,
  ];

  return `
@keyframes avatar-print-reveal {
  ${revealStops.join("\n  ")}
}
@keyframes printhead-travel {
  ${headStops.join("\n  ")}
}
@keyframes ph-glow-fade {
  ${glowStops.join("\n  ")}
}
@keyframes avatar-halo-reveal {
  ${haloStops.join("\n  ")}
}
`;
}

const printAnimationCss = buildPrintAnimationCss();

/*
 * The generated keyframes are injected imperatively via a dynamically
 * created stylesheet, as Vue's template compiler disallows <style> and
 * <script> elements within a component's <template> block, classifying
 * them as "side-effect tags".
 */
let printAnimationStyleEl;
onMounted(() => {
  printAnimationStyleEl = document.createElement("style");
  printAnimationStyleEl.textContent = printAnimationCss;
  document.head.appendChild(printAnimationStyleEl);
});
onBeforeUnmount(() => {
  printAnimationStyleEl?.remove();
});

const copied = ref(false);
let copiedTimeout;

/**
 * Copies the profile email address to the clipboard and briefly displays
 * a confirmation state.
 */
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL.value);
  } catch {
    // Clipboard API unavailable; the email address remains selectable
    // as visible text for manual copying.
  }
  copied.value = true;
  clearTimeout(copiedTimeout);
  copiedTimeout = setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="sidebar-wrapper">
  <aside class="sidebar" ref="sidebarEl">
    <div class="profile">
      <div class="printer" aria-hidden="true">
        <!--
          The print/reveal @keyframes referenced below are generated
          programmatically (see printAnimationCss) and injected on mount,
          per the constraint noted above on inline <style> elements.
        -->
        <svg viewBox="0 0 512 512" preserveAspectRatio="none" class="printer-body-svg" fill="currentColor">
          <g transform="translate(24.5, 24.5)">
            <path d="M 87.5 343 L 375.5 343 C 379.642 343 383 339.642 383 335.5 L 383 71.5 C 383 67.358 379.642 64 375.5 64 L 87.5 64 C 83.358 64 80 67.358 80 71.5 L 80 335.5 C 80 339.642 83.358 343 87.5 343 Z M 174.5 328 L 288.5 328 L 174.5 328 Z M 307.25 328 L 155.75 328 L 95 328 L 95 111 L 368 111 L 368 328 L 307.25 328 Z M 368 79 L 368 96 L 95 96 L 95 79 L 368 79 Z" />
            <path d="M103.5,47h16c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5S99.358,47,103.5,47z" />
            <path d="M151.5,47h16c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5S147.358,47,151.5,47z" />
            <path d="M199.5,47h16c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5S195.358,47,199.5,47z" />
            <path d="M247.5,47h16c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5S243.358,47,247.5,47z" />
            <path d="M295.5,47h16c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5S291.358,47,295.5,47z" />
            <path d="M343.5,47h16c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5S339.358,47,343.5,47z" />
            <path d="M415,361.234V23.5C415,10.542,404.458,0,391.5,0h-320C58.542,0,48,10.542,48,23.5v337.734c-9.29,3.138-16,11.93-16,22.266
              v56c0,12.958,10.542,23.5,23.5,23.5h352c12.958,0,23.5-10.542,23.5-23.5v-56C431,373.164,424.29,364.372,415,361.234z M71.5,15h320
              c4.687,0,8.5,3.813,8.5,8.5V360H63V23.5C63,18.813,66.813,15,71.5,15z M416,439.5c0,4.687-3.813,8.5-8.5,8.5h-352
              c-4.687,0-8.5-3.813-8.5-8.5v-56c0-4.687,3.813-8.5,8.5-8.5h352c4.687,0,8.5,3.813,8.5,8.5V439.5z" />
            <path d="M87.5,416h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S91.642,416,87.5,416z" />
            <path d="M135.5,416h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S139.642,416,135.5,416z" />
            <path d="M87.5,392h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S91.642,392,87.5,392z" />
            <path d="M135.5,392h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S139.642,392,135.5,392z" />
            <path d="M391.5,416h-24c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24c4.142,0,7.5-3.358,7.5-7.5S395.642,416,391.5,416z" />
            <path d="M231.5,416h-64c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h64c4.142,0,7.5-3.358,7.5-7.5S235.642,416,231.5,416z" />
            <path d="M231.5,392h-64c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h64c4.142,0,7.5-3.358,7.5-7.5S235.642,392,231.5,392z" />
            <path d="M271.5,416h-8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8c4.142,0,7.5-3.358,7.5-7.5S275.642,416,271.5,416z" />
            <path d="M303.5,416h-8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8c4.142,0,7.5-3.358,7.5-7.5S307.642,416,303.5,416z" />
            <path d="M335.5,416h-8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8c4.142,0,7.5-3.358,7.5-7.5S339.642,416,335.5,416z" />
            <path d="M391.5,392h-24c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24c4.142,0,7.5-3.358,7.5-7.5S395.642,392,391.5,392z" />
            <path d="M271.5,392h-8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8c4.142,0,7.5-3.358,7.5-7.5S275.642,392,271.5,392z" />
            <path d="M303.5,392h-8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8c4.142,0,7.5-3.358,7.5-7.5S307.642,392,303.5,392z" />
            <path d="M335.5,392h-8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8c4.142,0,7.5-3.358,7.5-7.5S339.642,392,335.5,392z" />
          </g>
        </svg>

        <div class="avatar-glow" aria-hidden="true"></div>
        <div class="avatar-ring">
          <div class="avatar-mask">
            <div class="avatar">{{ initials }}</div>
          </div>
        </div>

        <div class="print-head">
          <svg viewBox="0 0 32 44" class="print-head-svg" aria-hidden="true">
            <defs>
              <linearGradient id="ph-housing-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#2a2a2a" />
                <stop offset="1" stop-color="#000" />
              </linearGradient>
            </defs>
            <!-- trailing cable -->
            <path d="M25 5 Q31 3 30 9" class="ph-cable" />
            <!-- fan shroud -->
            <rect x="3" y="2" width="24" height="16" rx="3" class="ph-housing" />
            <circle cx="15" cy="10" r="6" class="ph-fan-ring" />
            <g class="ph-fan-blade">
              <path d="M15 10 L15 4.5 M15 10 L20.5 10 M15 10 L15 15.5 M15 10 L9.5 10" />
              <path d="M15 10 L18.9 6.1 M15 10 L18.9 13.9 M15 10 L11.1 13.9 M15 10 L11.1 6.1" />
            </g>
            <!-- heatsink fins -->
            <path d="M6 19v3M10 19v3M14 19v3M18 19v3M22 19v3" class="ph-fins" />
            <!-- heater block -->
            <rect x="10" y="22" width="12" height="6" rx="1.5" class="ph-block" />
            <!-- nozzle -->
            <path d="M12 28 L20 28 L16 40 Z" class="ph-nozzle" />
            <circle cx="16" cy="34" r="2" class="ph-glow" />
          </svg>
        </div>
      </div>
      <h1 class="name">{{ profile.name }}</h1>
      <p class="role">{{ profile.role }}</p>
    </div>

    <div class="badge">
      <span class="badge-icon" aria-hidden="true">
        <GraduationCap :size="16" />
      </span>
      <span class="badge-text">
        <span class="badge-degree">{{ profile.university.degree }}</span>
        <span class="badge-institution">{{ profile.university.institution }}</span>
      </span>
    </div>

    <div class="group">
      <p class="section-label">{{ t("sidebar.social") }}</p>
      <nav class="social-list" :aria-label="t('sidebar.social')">
        <a
          href="https://github.com/Fabio-Meloni"
          target="_blank"
          rel="noopener noreferrer"
          class="social-row"
          :aria-label="t('sidebar.githubProfile')"
        >
          <span class="social-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              />
            </svg>
          </span>
          <span class="social-name">GitHub</span>
          <ArrowUpRight :size="14" class="social-arrow" aria-hidden="true" />
        </a>
        <a
          class="social-row is-disabled"
          aria-disabled="true"
          tabindex="-1"
          :aria-label="t('sidebar.linkedinProfile')"
        >
          <span class="social-icon social-icon-linkedin" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"
              />
            </svg>
          </span>
          <span class="social-name">LinkedIn</span>
          <ArrowUpRight :size="14" class="social-arrow" aria-hidden="true" />
        </a>
      </nav>
    </div>

    <div class="group">
      <p class="section-label">{{ t("sidebar.contact") }}</p>
      <button
        type="button"
        class="contact-card"
        @click="copyEmail"
        :aria-label="t('sidebar.copyEmail', { email: EMAIL })"
      >
        <span class="contact-icon-chip" aria-hidden="true">
          <Mail :size="16" />
        </span>
        <span class="contact-email">{{ copied ? t("sidebar.copied") : EMAIL }}</span>
      </button>
      <p class="copy-feedback" role="status" aria-live="polite">
        {{ copied ? t("sidebar.copiedToClipboard") : "" }}
      </p>
    </div>

    <div class="spacer" />

    <a class="cv-btn is-disabled" aria-disabled="true" tabindex="-1">
      <FileUser :size="16" aria-hidden="true" />
      {{ t("sidebar.downloadCv") }}
    </a>
  </aside>
  <CustomScrollbar :target="sidebarEl" />
  </div>
</template>

<style src="./AppSidebar.css" scoped></style>
