<script setup>
import { useSidebar } from 'vitepress/theme-without-fonts';
import { FOOTER_COLUMNS, FOOTER_LEGAL, FOOTER_SOCIAL, SUPPORT_EMAIL } from '../footer.js';

// With a sidebar the footer sits beside it, as the default VPFooter does,
// instead of covering the fixed sidebar
const { hasSidebar } = useSidebar();

const year = new Date().getFullYear();
const isExternal = (url) => /^(https?:|mailto:)/.test(url);
</script>

<template>
  <footer class="tdocs-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="tdocs-footer-glow" aria-hidden="true"></div>

    <div class="tdocs-footer-inner">
      <div class="tdocs-footer-main">
        <div class="tdocs-footer-brand">
          <div class="tdocs-footer-logo">
            <img src="/assets/logo-mark.svg" alt="" class="tdocs-footer-mark" width="26" height="26" />
            <span class="tdocs-footer-logo-text">
              <span class="tdocs-footer-name">Thin<span>Remote</span></span>
              <span class="tdocs-footer-by">by Thinger.io</span>
            </span>
          </div>
          <p class="tdocs-footer-tagline">Secure remote access without VPNs or open ports.</p>
          <p class="tdocs-footer-trust"><a href="https://thinremote.io/security" target="_blank" rel="noopener">ISO&nbsp;27001 certified</a></p>
          <div class="tdocs-footer-social">
            <a
              v-for="item in FOOTER_SOCIAL"
              :key="item.label"
              :href="item.url"
              :target="item.url.startsWith('http') ? '_blank' : undefined"
              :rel="item.url.startsWith('http') ? 'noopener' : undefined"
              :aria-label="item.label"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" :d="item.path" /></svg>
            </a>
          </div>
        </div>

        <nav class="tdocs-footer-cols" aria-label="Footer">
          <div v-for="column in FOOTER_COLUMNS" :key="column.title" class="tdocs-footer-col">
            <div class="tdocs-footer-title">{{ column.title }}</div>
            <ul>
              <li v-for="link in column.links" :key="link.label">
                <a v-if="isExternal(link.url)" :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
                <a v-else :href="link.url">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="tdocs-footer-bottom">
        <span>
          &copy; {{ year }} ThinRemote. All rights reserved. Powered by
          <a href="https://thinger.io" target="_blank" rel="noopener">Thinger.io</a>. Documentation released under the MIT License.
        </span>
        <ul class="tdocs-footer-legal">
          <li v-for="link in FOOTER_LEGAL" :key="link.label">
            <a :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
          </li>
          <li><a :href="`mailto:${SUPPORT_EMAIL}`">{{ SUPPORT_EMAIL }}</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.tdocs-footer {
  position: relative;
  background: var(--dark-gradient);
  color: var(--text-on-dark);
  padding: 0 0 2rem;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.6;
}

/* Over the fixed sidebar (z-index 25 from 960 px), under the header (30) */
@media (min-width: 960px) {
  .tdocs-footer {
    z-index: 28;
  }

  /* Beside the sidebar: same width as VPSidebar */
  .tdocs-footer.has-sidebar {
    margin-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .tdocs-footer.has-sidebar {
    margin-left: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
  }
}

.tdocs-footer-glow {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(ellipse 60% 40% at 50% 0%, var(--accent-glow), transparent 70%);
  opacity: 0.7;
  pointer-events: none;
}

.tdocs-footer-inner {
  position: relative;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 24px;
}

.tdocs-footer-main {
  display: grid;
  grid-template-columns: minmax(240px, 300px) 1fr;
  gap: 3rem 4rem;
  padding-top: 3.25rem;
}

.tdocs-footer-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.tdocs-footer-mark {
  display: block;
  width: 26px;
  height: 26px;
}

.tdocs-footer-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.tdocs-footer-name {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #fff;
}

.tdocs-footer-name span {
  color: var(--brand-blue);
}

.tdocs-footer-by {
  margin-top: 2px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.2;
  color: var(--text-on-dark-muted);
}

.tdocs-footer-tagline {
  color: var(--text-on-dark-muted);
  font-size: 0.92rem;
  max-width: 260px;
  margin: 0;
}

.tdocs-footer-trust {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin: 0.9rem 0 0;
}

.tdocs-footer-trust a {
  color: var(--accent-on-dark);
}

.tdocs-footer-social {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.tdocs-footer-social a {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-on-dark);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
}

.tdocs-footer-social a:hover {
  background: var(--brand-blue);
  color: #fff;
  transform: translateY(-2px);
}

.tdocs-footer-cols {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem 1.5rem;
}

.tdocs-footer-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fff;
  margin-bottom: 0.9rem;
}

.tdocs-footer-col ul,
.tdocs-footer-legal {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tdocs-footer-col li {
  margin-bottom: 0.55rem;
}

.tdocs-footer-col a,
.tdocs-footer-legal a,
.tdocs-footer-bottom a {
  color: var(--text-on-dark-muted);
  font-size: 0.92rem;
  transition: color 0.15s ease;
}

.tdocs-footer-col a:hover,
.tdocs-footer-legal a:hover,
.tdocs-footer-bottom a:hover {
  color: #fff;
}

.tdocs-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: var(--text-on-dark-muted);
}

.tdocs-footer-bottom a {
  font-size: inherit;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.25);
  text-underline-offset: 3px;
}

.tdocs-footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.tdocs-footer-legal a {
  font-size: 0.85rem;
  text-decoration: none;
}

@media (max-width: 1100px) {
  .tdocs-footer-main {
    grid-template-columns: 1fr;
    gap: 2.75rem;
  }
}

@media (max-width: 760px) {
  .tdocs-footer-cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .tdocs-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tdocs-footer-social a {
    transition: none;
  }

  .tdocs-footer-social a:hover {
    transform: none;
  }
}
</style>
