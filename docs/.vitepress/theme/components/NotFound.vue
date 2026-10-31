<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="tdocs-404">
    <p class="tdocs-eyebrow">404</p>
    <h1>Page not found</h1>
    <p class="tdocs-404-text">The page you are looking for does not exist or has moved.</p>
    <div class="tdocs-404-actions">
      <a class="tdocs-btn tdocs-btn-primary" :href="withBase('/')">Go to the documentation home</a>
      <a class="tdocs-btn tdocs-btn-outline" href="https://thinremote.io">Visit thinremote.io</a>
    </div>
  </div>
</template>

<style scoped>
.tdocs-404 {
  max-width: 640px;
  margin: 0 auto;
  padding: 96px 24px 128px;
  text-align: center;
}

.tdocs-404 .tdocs-eyebrow {
  justify-content: center;
}

.tdocs-404 h1 {
  margin: 0.5rem 0 1rem;
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tdocs-404-text {
  color: var(--vp-c-text-2);
  margin: 0 0 2rem;
}

.tdocs-404-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
</style>
