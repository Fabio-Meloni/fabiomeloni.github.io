import { Layers, Zap, Cloud, Smartphone, BrainCircuit, Leaf, Bot, Terminal, GitBranch, Palette, Accessibility, Tag } from "@lucide/vue";

/**
 * Lookup table mapping a project tag label (as authored in `src/data.js`)
 * to its corresponding Lucide icon component. Tag labels are locale-
 * invariant, so a single table serves every supported language.
 *
 * @type {Object.<string, import('vue').Component>}
 */
const TAG_ICONS = {
  "Full Stack": Layers,
  "Real-time": Zap,
  SaaS: Cloud,
  "Mobile-first": Smartphone,
  ML: BrainCircuit,
  Sustainability: Leaf,
  AI: Bot,
  "Developer Tools": Terminal,
  "Open Source": GitBranch,
  "Design System": Palette,
  Accessibility: Accessibility,
};

/**
 * Resolves the icon component associated with a project tag.
 *
 * @param {string} tag - Tag label.
 * @returns {import('vue').Component} The matching icon, or a generic tag icon if unmapped.
 */
export function getTagIcon(tag) {
  return TAG_ICONS[tag] ?? Tag;
}
