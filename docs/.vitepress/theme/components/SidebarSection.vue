<script setup>
// Head of the sidebar (sidebar-nav-before): the icon and title of the section
// of the page. When the first group of the sidebar carries the same name, the
// head stands in for its title row (hidden by custom.css)
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useSidebar } from 'vitepress/theme-without-fonts';
import { SECTION_ICONS } from '../icons.js';

const { page } = useData();
const { sidebarGroups } = useSidebar();

const section = computed(() => page.value.section ?? null);
const merged = computed(
  () => !!section.value && sidebarGroups.value[0]?.text?.toLowerCase() === section.value.title.toLowerCase(),
);
const icon = computed(() => (section.value ? SECTION_ICONS[section.value.slug] : undefined));
</script>

<template>
  <p v-if="section" class="tdocs-sidebar-head" :class="{ 'is-merged': merged }">
    <span class="tdocs-sidebar-icon"><component :is="icon" v-if="icon" :size="16" aria-hidden="true" /></span>
    {{ section.title }}
  </p>
</template>

<style scoped>
.tdocs-sidebar-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 6px;
  padding: 6px 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.tdocs-sidebar-icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--primary-subtle);
  color: var(--primary);
}
</style>
