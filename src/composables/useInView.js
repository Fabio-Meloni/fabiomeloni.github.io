import { onMounted, onBeforeUnmount, ref } from "vue";

/**
 * Evaluates the `prefers-reduced-motion` media feature.
 *
 * @returns {boolean} `true` if the user agent reports a reduced-motion preference.
 */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Vue composable implementing viewport-intersection detection for a single
 * DOM element, intended to drive entrance animations via the
 * `.fade-in.is-visible` class pair (see `src/style/main.css`).
 *
 * Observation is skipped entirely when the reduced-motion preference is
 * active or when `IntersectionObserver` is unavailable; in both cases the
 * element is reported as visible immediately.
 *
 * @param {Object} [options] - Configuration object.
 * @param {number} [options.threshold=0.15] - Intersection ratio required to trigger visibility.
 * @param {boolean} [options.once=true] - When `true`, observation stops after the first intersection.
 * @returns {{ target: import('vue').Ref<HTMLElement|null>, isVisible: import('vue').Ref<boolean> }}
 *   `target` must be bound as a template ref to the observed element; `isVisible` reflects its current state.
 */
export function useInView(options = {}) {
  const { threshold = 0.15, once = true } = options;
  const target = ref(null);
  const isVisible = ref(prefersReducedMotion());

  /** @type {IntersectionObserver|undefined} */
  let observer;

  onMounted(() => {
    if (isVisible.value || !target.value || !("IntersectionObserver" in window)) {
      isVisible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisible.value = true;
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            isVisible.value = false;
          }
        }
      },
      { threshold },
    );

    observer.observe(target.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { target, isVisible };
}
