<!--
  Custom pointer: a lagging outer ring and a snapping inner dot,
  replacing the native cursor on devices with a fine pointing device.
-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

/**
 * Restricts activation to devices reporting a fine pointer (i.e. a
 * mouse), excluding touch and other coarse-pointer devices, for which a
 * custom cursor would otherwise remain visibly stranded at the last
 * touch coordinate.
 */
const isFinePointer = window.matchMedia?.("(pointer: fine)").matches ?? false;

const ringEl = ref(null);
const dotEl = ref(null);
const visible = ref(false);
const isHoveringInteractive = ref(false);
const isPressed = ref(false);

/** Selector identifying elements that trigger the cursor's "interactive" hover state. */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, label';

let ringX = 0;
let ringY = 0;
let targetX = 0;
let targetY = 0;
let rafId;

/**
 * Updates the tracked pointer position, moves the dot element directly,
 * and evaluates whether the pointer is over an interactive element.
 *
 * @param {MouseEvent} e
 */
function onMouseMove(e) {
  if (!visible.value) visible.value = true;
  targetX = e.clientX;
  targetY = e.clientY;
  if (dotEl.value) {
    dotEl.value.style.transform = `translate(${targetX}px, ${targetY}px)`;
  }
  isHoveringInteractive.value = !!e.target.closest?.(INTERACTIVE_SELECTOR);
}

let draggingScrollbar = false;

/**
 * Width of the reserved scrollbar gutter used by {@link startsOnOwnScrollbar}.
 * A fixed value is used, rather than deriving it from
 * `offsetWidth - clientWidth`, as overlay-style scrollbars render on top
 * of the content box without reducing its dimensions, which would
 * otherwise report a zero-width gutter despite a visible, draggable
 * scrollbar thumb occupying that space.
 */
const SCROLLBAR_GUTTER = 14;

/**
 * Determines whether a pointer-down event originated within an
 * element's own scrollbar gutter, as opposed to its content area. This
 * accounts for native scrollbar drags, which do not dispatch
 * document-level "mousemove" events and would otherwise cause the
 * custom cursor to stall mid-drag while the physical pointer continues
 * moving.
 *
 * @param {MouseEvent} e
 * @returns {boolean}
 */
function startsOnOwnScrollbar(e) {
  const el = e.target;
  if (!el || typeof el.getBoundingClientRect !== "function") return false;
  const canScrollY = el.scrollHeight > el.clientHeight;
  const canScrollX = el.scrollWidth > el.clientWidth;
  if (!canScrollY && !canScrollX) return false;
  const rect = el.getBoundingClientRect();
  const onVerticalTrack = canScrollY && e.clientX >= rect.right - SCROLLBAR_GUTTER;
  const onHorizontalTrack = canScrollX && e.clientY >= rect.bottom - SCROLLBAR_GUTTER;
  return onVerticalTrack || onHorizontalTrack;
}

/**
 * Pointer-down handler. Suspends the custom cursor for the duration of
 * a scrollbar-thumb drag, deferring to the native cursor in that case.
 *
 * @param {MouseEvent} e
 */
function onMouseDown(e) {
  isPressed.value = true;
  if (startsOnOwnScrollbar(e)) {
    draggingScrollbar = true;
    visible.value = false;
    document.documentElement.classList.remove("custom-cursor-active");
  }
}

/** Pointer-up handler; restores the custom cursor following a suspended scrollbar drag. */
function onMouseUp() {
  isPressed.value = false;
  if (draggingScrollbar) {
    draggingScrollbar = false;
    document.documentElement.classList.add("custom-cursor-active");
  }
}

/** Hides the cursor elements when the pointer leaves the document. */
function onMouseLeave() {
  visible.value = false;
}

/**
 * Per-frame update loop. The ring is eased toward the tracked pointer
 * position with a damping factor, producing a trailing motion distinct
 * from the dot's immediate tracking.
 */
function tick() {
  ringX += (targetX - ringX) * 0.18;
  ringY += (targetY - ringY) * 0.18;
  if (ringEl.value) {
    ringEl.value.style.transform = `translate(${ringX}px, ${ringY}px)`;
  }
  rafId = requestAnimationFrame(tick);
}

onMounted(() => {
  if (!isFinePointer) return;
  document.documentElement.classList.add("custom-cursor-active");
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mouseleave", onMouseLeave);
  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove("custom-cursor-active");
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mousedown", onMouseDown);
  window.removeEventListener("mouseup", onMouseUp);
  document.removeEventListener("mouseleave", onMouseLeave);
  cancelAnimationFrame(rafId);
});
</script>

<template>
  <template v-if="isFinePointer">
    <div
      ref="dotEl"
      class="cursor-dot"
      :class="{ 'is-visible': visible, 'is-pressed': isPressed }"
      aria-hidden="true"
    />
    <div
      ref="ringEl"
      class="cursor-ring"
      :class="{ 'is-visible': visible, 'is-active': isHoveringInteractive, 'is-pressed': isPressed }"
      aria-hidden="true"
    />
  </template>
</template>

<style src="./CustomCursor.css" scoped></style>
