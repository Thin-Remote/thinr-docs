<script setup>
// Right side of the top row: the thinremote.io links and the primary button,
// as on the landing header; in the mobile menu, the same links as a list. Two
// root nodes, so the bar can order them around the appearance switch
import { ArrowRight } from 'lucide-vue-next';

defineProps({ screen: Boolean });

const LINKS = [
  { text: 'Security', link: 'https://thinremote.io/security' },
  { text: 'Community', link: 'https://community.thinger.io' },
  { text: 'Log in', link: 'https://console.thinr.io' },
];
</script>

<template>
  <nav class="tdocs-nav-links" :class="{ 'is-screen': screen }" aria-label="ThinRemote">
    <a v-for="item in LINKS" :key="item.link" :href="item.link" target="_blank" rel="noopener">{{ item.text }}</a>
  </nav>
  <a class="tdocs-nav-cta" :class="{ 'is-screen': screen }" href="https://thinremote.io/book" target="_blank" rel="noopener">
    Book a demo <ArrowRight :size="16" aria-hidden="true" />
  </a>
</template>

<style scoped>
.tdocs-nav-links {
  display: none;
  order: 1;
  gap: 22px;
  margin-left: auto;
  padding: 0 18px 0 24px;
  font-size: 14px;
  font-weight: 500;
}

.tdocs-nav-links a {
  color: var(--vp-c-text-2);
  transition: color 0.15s ease;
}

.tdocs-nav-links a:hover {
  color: var(--vp-c-brand-1);
}

@media (min-width: 1280px) {
  .tdocs-nav-links:not(.is-screen) {
    display: flex;
  }
}

.tdocs-nav-cta {
  order: 4;
  display: none;
  align-items: center;
  gap: 6px;
  height: 36px;
  margin-left: 16px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  background: var(--cta-bg);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.tdocs-nav-cta:hover {
  background: var(--cta-bg-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--primary-glow);
}

@media (min-width: 900px) {
  .tdocs-nav-cta:not(.is-screen) {
    display: inline-flex;
  }
}

.tdocs-nav-links.is-screen {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 24px 0 0;
  padding: 0;
}

.tdocs-nav-links.is-screen a {
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.tdocs-nav-cta.is-screen {
  display: flex;
  justify-content: center;
  height: 44px;
  margin: 24px 0 0;
}

@media (prefers-reduced-motion: reduce) {
  .tdocs-nav-cta:hover {
    transform: none;
  }
}
</style>
