<!--
  DOM-based scrollbar replacement for a given scrollable element,
  comprising a draggable thumb and classic step buttons. Substituting
  the native scrollbar allows the custom cursor to track thumb drags,
  which a native scrollbar does not expose as document-level
  "mousemove" events.

  `target` denotes the scrollable element itself. A template ref passed
  as a prop is automatically unwrapped to its underlying value by Vue,
  so this prop holds the plain element (null prior to the parent's
  mount) rather than a ref object; accordingly, setup is performed via
  a `watch` rather than a one-shot `onMounted` hook. This component must
  be rendered as a sibling of the target element, within a
  `position: relative` wrapper that the target fills.
-->
<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { ChevronUp, ChevronDown } from "@lucide/vue";

const props = defineProps({
  target: { type: Object, default: null },
});

const BUTTON_SIZE = 18;
const MIN_THUMB_SIZE = 20;
const STEP = 48;
const HOLD_REPEAT_DELAY = 350;
const HOLD_REPEAT_INTERVAL = 50;

const visible = ref(false);
const thumbHeightPx = ref(0);
const thumbTopPx = ref(0);
const dragging = ref(false);
/** @type {import('vue').Ref<"top"|"bottom"|null>} */
const bounce = ref(null);

let currentEl = null;
let resizeObserver;
let bounceTimeout;

/**
 * Triggers the boundary "bounce" animation, providing a rubber-band cue
 * when a scroll attempt exceeds the content's start or end. The bounce
 * class is cleared and reapplied on the following animation frame,
 * ensuring the CSS animation restarts even when retriggered mid-flight
 * by a rapid successive input at the same boundary.
 *
 * @param {"top"|"bottom"} direction
 */
function triggerBounce(direction) {
  bounce.value = null;
  requestAnimationFrame(() => {
    bounce.value = direction;
    clearTimeout(bounceTimeout);
    bounceTimeout = setTimeout(() => (bounce.value = null), 400);
  });
}

function isAtTop(el) {
  return el.scrollTop <= 0;
}
function isAtBottom(el) {
  return el.scrollTop >= el.scrollHeight - el.clientHeight - 1;
}

/**
 * Wheel-event handler; triggers the boundary bounce when scrolling is
 * attempted past the content's start or end.
 *
 * @param {WheelEvent} e
 */
function onWheel(e) {
  const el = currentEl;
  if (!el) return;
  if (e.deltaY < 0 && isAtTop(el)) triggerBounce("top");
  else if (e.deltaY > 0 && isAtBottom(el)) triggerBounce("bottom");
}

/**
 * Computes the vertical extent of the scrollbar track available to the
 * thumb, excluding the space occupied by the two step buttons.
 *
 * @param {HTMLElement} el
 * @returns {number}
 */
function laneHeight(el) {
  return Math.max(el.clientHeight - BUTTON_SIZE * 2, 0);
}

/** Recomputes thumb visibility, height, and position from the target element's current scroll state. */
function update() {
  const el = currentEl;
  if (!el || el.scrollHeight <= 0) return;
  const ratio = el.clientHeight / el.scrollHeight;
  visible.value = ratio < 1;
  const lane = laneHeight(el);
  const height = Math.min(Math.max(ratio * lane, MIN_THUMB_SIZE), lane);
  thumbHeightPx.value = height;
  const maxScroll = el.scrollHeight - el.clientHeight;
  const scrollRatio = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
  thumbTopPx.value = BUTTON_SIZE + scrollRatio * (lane - height);
}

/** Detaches event listeners and observers from the current target element. */
function teardown() {
  if (!currentEl) return;
  currentEl.removeEventListener("scroll", update);
  currentEl.removeEventListener("wheel", onWheel);
  resizeObserver?.disconnect();
  resizeObserver = null;
  currentEl = null;
}

/**
 * Attaches event listeners and observers to the given target element,
 * replacing any prior target.
 *
 * @param {HTMLElement|null} el
 */
function setup(el) {
  teardown();
  if (!el) return;
  currentEl = el;
  el.addEventListener("scroll", update, { passive: true });
  el.addEventListener("wheel", onWheel, { passive: true });
  resizeObserver = new ResizeObserver(update);
  resizeObserver.observe(el);
  update();
}

watch(() => props.target, setup, { immediate: true });
onBeforeUnmount(() => {
  teardown();
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
  stopStepRepeat();
  clearTimeout(bounceTimeout);
});

let dragStartClientY = 0;
let dragStartScrollTop = 0;

/**
 * Initiates a thumb drag, recording the pointer and scroll position at
 * drag start.
 *
 * @param {MouseEvent} e
 */
function onThumbMouseDown(e) {
  if (!currentEl) return;
  e.preventDefault();
  e.stopPropagation();
  dragging.value = true;
  dragStartClientY = e.clientY;
  dragStartScrollTop = currentEl.scrollTop;
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
}

/**
 * Updates the target element's scroll position in proportion to pointer
 * displacement since the drag began.
 *
 * @param {MouseEvent} e
 */
function onDragMove(e) {
  const el = currentEl;
  if (!el) return;
  const lane = laneHeight(el);
  const scrollableTrackPx = lane - thumbHeightPx.value;
  if (scrollableTrackPx <= 0) return;
  const maxScroll = el.scrollHeight - el.clientHeight;
  const deltaY = e.clientY - dragStartClientY;
  el.scrollTop = dragStartScrollTop + (deltaY / scrollableTrackPx) * maxScroll;
}

/** Concludes a thumb drag. */
function onDragEnd() {
  dragging.value = false;
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
}

/**
 * Handles a click on the track itself (excluding the thumb, which has
 * its own handler), scrolling to the position corresponding to the
 * click's vertical offset.
 *
 * @param {MouseEvent} e
 */
function onTrackMouseDown(e) {
  if (e.target !== e.currentTarget) return;
  const el = currentEl;
  if (!el) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const clickY = e.clientY - rect.top - BUTTON_SIZE;
  const lane = laneHeight(el);
  const clickRatio = Math.min(Math.max(clickY / lane, 0), 1);
  el.scrollTo({ top: clickRatio * el.scrollHeight - el.clientHeight / 2, behavior: "smooth" });
}

/**
 * Step-button behavior: an immediate scroll increment on press,
 * followed by repeated increments at fixed intervals for as long as the
 * button remains pressed, matching conventional scrollbar arrow-button
 * semantics.
 */
let repeatTimeout;
let repeatInterval;

/**
 * Performs a single scroll increment in the given direction, triggering
 * the boundary bounce if already at that boundary.
 *
 * @param {1|-1} direction
 */
function stepScroll(direction) {
  const el = currentEl;
  if (!el) return;
  if (direction < 0 && isAtTop(el)) triggerBounce("top");
  else if (direction > 0 && isAtBottom(el)) triggerBounce("bottom");
  el.scrollBy({ top: direction * STEP, behavior: "smooth" });
}

/** Cancels any pending or active step-button repetition. */
function stopStepRepeat() {
  clearTimeout(repeatTimeout);
  clearInterval(repeatInterval);
  window.removeEventListener("mouseup", stopStepRepeat);
}

/**
 * Step-button press handler: performs one scroll increment immediately,
 * then begins repeated increments after {@link HOLD_REPEAT_DELAY}.
 *
 * @param {1|-1} direction
 */
function onStepMouseDown(direction) {
  stepScroll(direction);
  stopStepRepeat();
  repeatTimeout = setTimeout(() => {
    repeatInterval = setInterval(() => stepScroll(direction), HOLD_REPEAT_INTERVAL);
  }, HOLD_REPEAT_DELAY);
  window.addEventListener("mouseup", stopStepRepeat);
}
</script>

<template>
  <div v-show="visible" class="custom-scrollbar-track" @mousedown="onTrackMouseDown">
    <button
      type="button"
      class="scrollbar-step-btn scrollbar-step-up"
      tabindex="-1"
      aria-hidden="true"
      @mousedown.stop="onStepMouseDown(-1)"
    >
      <ChevronUp :size="13" />
    </button>

    <div
      class="custom-scrollbar-thumb"
      :class="{ 'is-dragging': dragging, 'bounce-top': bounce === 'top', 'bounce-bottom': bounce === 'bottom' }"
      :style="{ height: thumbHeightPx + 'px', top: thumbTopPx + 'px' }"
      @mousedown="onThumbMouseDown"
    />

    <button
      type="button"
      class="scrollbar-step-btn scrollbar-step-down"
      tabindex="-1"
      aria-hidden="true"
      @mousedown.stop="onStepMouseDown(1)"
    >
      <ChevronDown :size="13" />
    </button>
  </div>
</template>

<style src="./CustomScrollbar.css" scoped></style>
