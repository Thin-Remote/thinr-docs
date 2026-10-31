// Lucide icons (lucide-vue-next) of the sections and page types, shared by
// the section bar, the sidebar, the home page and the page header.
import { BookOpen, BookText, Cpu, Lightbulb, Rocket, TerminalSquare } from 'lucide-vue-next';
import { sectionOf } from './sections.js';

/** By section slug (sections.js). */
export const SECTION_ICONS = {
  'getting-started': Rocket,
  'device-agent': Cpu,
  cli: TerminalSquare,
  'use-cases': Lightbulb,
};

export function sectionIcon(path) {
  const section = sectionOf(path);
  return section ? SECTION_ICONS[section.slug] : undefined;
}

/** By page type (pageType in config.mjs). */
export const TYPE_ICONS = {
  concept: BookOpen,
  reference: BookText,
  'use-case': Lightbulb,
};

export const TYPE_LABELS = {
  concept: 'Concept',
  reference: 'Reference',
  'use-case': 'Use case',
};
