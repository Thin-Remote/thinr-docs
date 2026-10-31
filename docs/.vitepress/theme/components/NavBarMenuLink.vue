<script setup>
// Replaces VPNavBarMenuLink of the default theme (alias in config.mjs): the
// same link, with the Lucide icon of the section before its text. The active
// rule is the one of the default theme (activeMatch, else the link itself)
import { computed } from 'vue';
import { useData } from 'vitepress';
import { VPLink } from 'vitepress/theme-without-fonts';
import { sectionIcon } from '../icons.js';

const props = defineProps({ item: { type: Object, required: true } });
const { page } = useData();

const icon = computed(() => sectionIcon(props.item.link));

const active = computed(() => {
  const current = `/${page.value.relativePath}`.replace(/(index)?\.md$/, '').replace(/\/$/, '') || '/';
  if (props.item.activeMatch) return new RegExp(props.item.activeMatch).test(`${current}/`);
  return current === props.item.link.replace(/\/$/, '');
});
</script>

<template>
  <VPLink
    :class="{ VPNavBarMenuLink: true, active }"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    tabindex="0"
  >
    <component :is="icon" v-if="icon" class="tdocs-nav-icon" :size="16" aria-hidden="true" />
    <span v-html="item.text"></span>
  </VPLink>
</template>
