<script setup>
// Page header (doc-before): breadcrumb and a graphite card with the section,
// the first "# " heading of the page (custom.css hides the markdown h1 it
// stands in for), the frontmatter description, the page type and the reading
// time. All of it comes from transformPageData in config.mjs.
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { ChevronRight, Clock } from 'lucide-vue-next';
import { SECTION_ICONS, TYPE_ICONS, TYPE_LABELS } from '../icons.js';

const { frontmatter, page } = useData();

const section = computed(() => page.value.section ?? null);
const sectionIcon = computed(() => (section.value ? SECTION_ICONS[section.value.slug] : undefined));
const heading = computed(() => page.value.heading ?? null);
const title = computed(() => frontmatter.value.title ?? page.value.title);
const type = computed(() => page.value.pageType ?? null);
</script>

<template>
  <template v-if="section && (heading || title)">
    <nav class="tdocs-breadcrumb" aria-label="Breadcrumb">
      <a :href="withBase('/')">Docs</a>
      <ChevronRight :size="12" aria-hidden="true" />
      <a :href="withBase(section.link)">{{ section.title }}</a>
      <ChevronRight :size="12" aria-hidden="true" />
      <span aria-current="page">{{ title }}</span>
    </nav>

    <header class="tdocs-page-header" :class="{ 'has-heading': heading }">
      <p class="tdocs-page-eyebrow">
        <component :is="sectionIcon" v-if="sectionIcon" :size="14" aria-hidden="true" />{{ section.title }}
      </p>
      <h1 v-if="heading" class="tdocs-page-title" v-html="heading"></h1>
      <h1 v-else class="tdocs-page-title">{{ title }}</h1>
      <p v-if="frontmatter.description" class="tdocs-page-description">{{ frontmatter.description }}</p>

      <div v-if="type || page.readingTime" class="tdocs-page-meta">
        <span v-if="type" class="tdocs-badge">
          <component :is="TYPE_ICONS[type]" :size="13" aria-hidden="true" />{{ TYPE_LABELS[type] ?? type }}
        </span>
        <span v-if="page.readingTime" class="tdocs-badge"><Clock :size="13" aria-hidden="true" />{{ page.readingTime }} min read</span>
      </div>
    </header>
  </template>
</template>

<style scoped>
.tdocs-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tdocs-breadcrumb a {
  color: var(--vp-c-text-2);
  transition: color 0.15s ease;
}

.tdocs-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}

.tdocs-breadcrumb svg {
  color: var(--vp-c-text-3);
}

/* Graphite card with the grid and the green glow of the hero */
.tdocs-page-header {
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
  padding: 32px 32px 28px;
  border-radius: var(--radius-lg);
  background: var(--dark-gradient);
  color: var(--text-on-dark);
}

.dark .tdocs-page-header {
  box-shadow: inset 0 0 0 1px var(--border);
}

.tdocs-page-header::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(ellipse 70% 80% at 100% 0%, var(--accent-glow), transparent 60%),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 28px),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 28px);
}

.tdocs-page-header > * {
  position: relative;
}

.tdocs-page-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-on-dark);
}

.tdocs-page-title {
  margin: 0;
  font-size: 36px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  overflow-wrap: anywhere;
}

.tdocs-page-title :deep(code) {
  padding: 0 0.2em;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 0.85em;
}

.tdocs-page-description {
  margin: 12px 0 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-on-dark-soft);
}

.tdocs-page-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
}

.tdocs-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-on-dark-soft);
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .tdocs-page-header {
    padding: 24px 20px;
  }

  .tdocs-page-title {
    font-size: 30px;
  }

  .tdocs-page-description {
    font-size: 17px;
  }
}
</style>
