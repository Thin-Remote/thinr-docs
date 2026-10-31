<script setup>
// Home page: graphite hero with the terminal and the search, quick links over
// its edge, the four sections, how the pieces fit together (with the ways to
// drive the fleet) on graphite, and a help band; light and dark bands alternate
import { computed, onMounted, ref } from 'vue';
import { useData, withBase } from 'vitepress';
import { ArrowRight, Bot, Braces, Download, MessagesSquare, Network, Search, Sparkles, Terminal, Zap } from 'lucide-vue-next';
import { FOOTER_SOCIAL } from '../footer.js';
import { POPULAR_LINKS, QUICK_LINKS, SECTION_BLURBS, WAYS } from '../home.js';
import { SECTION_ICONS } from '../icons.js';
import PillarsDiagram from '../PillarsDiagram.vue';
import TerminalMockup from './TerminalMockup.vue';

const { theme } = useData();
const sections = computed(() => theme.value.homeSections ?? []);

const QUICK_ICONS = { zap: Zap, download: Download, sparkles: Sparkles };
const WAY_ICONS = { cli: Terminal, ai: Bot, automation: Braces, fleet: Network };
const github = FOOTER_SOCIAL.find((item) => item.label === 'GitHub');

// Same hint as the search button of the top bar
const shortcut = ref('Ctrl K');
onMounted(() => {
  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) shortcut.value = '⌘ K';
});

const SEARCH_FILTER_KEY = 'vitepress:local-search-filter';

/** Opens the local search of the top bar, optionally with a first character. */
function openSearch(initial) {
  if (initial !== undefined) sessionStorage.setItem(SEARCH_FILTER_KEY, initial);
  document.querySelector('#local-search button')?.click();
}

function onSearchKey(event) {
  if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey && event.key !== ' ') {
    event.preventDefault();
    openSearch(event.key);
  }
}
</script>

<template>
  <div class="tdocs-home">
    <section class="tdocs-hero">
      <div class="tdocs-pattern" aria-hidden="true"></div>
      <div class="tdocs-home-container tdocs-hero-grid">
        <div class="tdocs-hero-copy">
          <p class="tdocs-kicker">Documentation</p>
          <h1>Remote access without compromise</h1>
          <p class="tdocs-hero-lead">
            Manage Linux and macOS devices behind any firewall with a single lightweight agent, and drive them from your terminal or your AI assistant.
          </p>
          <button type="button" class="tdocs-home-search" aria-label="Search the documentation" @click="openSearch()" @keydown="onSearchKey">
            <Search class="tdocs-home-search-icon" :size="20" aria-hidden="true" />
            <span class="tdocs-home-search-text">Search the documentation</span>
            <span class="tdocs-home-search-hint" aria-hidden="true">Try “tunnel”, “headless” or “MCP”</span>
            <kbd class="tdocs-home-search-key" aria-hidden="true">{{ shortcut }}</kbd>
          </button>
          <p class="tdocs-popular">
            <span>Popular:</span>
            <a v-for="item in POPULAR_LINKS" :key="item.link" :href="withBase(item.link)">{{ item.title }}</a>
          </p>
          <ul class="tdocs-hero-meta">
            <li>Outbound only</li>
            <li>Linux · macOS</li>
            <li>CLI · MCP</li>
          </ul>
        </div>
        <TerminalMockup class="tdocs-hero-art" />
      </div>
    </section>

    <section class="tdocs-quick-band" aria-label="Quick links">
      <div class="tdocs-home-container tdocs-quick-grid">
        <a v-for="item in QUICK_LINKS" :key="item.link" class="tdocs-quick" :href="withBase(item.link)">
          <span class="tdocs-quick-icon"><component :is="QUICK_ICONS[item.icon] ?? ArrowRight" :size="18" aria-hidden="true" /></span>
          <span class="tdocs-quick-body">
            <span class="tdocs-quick-title">
              {{ item.title }}
              <span v-if="item.tag" class="tdocs-tag">{{ item.tag }}</span>
            </span>
            <span class="tdocs-quick-text">{{ item.description }}</span>
          </span>
          <ArrowRight class="tdocs-quick-arrow" :size="16" aria-hidden="true" />
        </a>
      </div>
    </section>

    <section class="tdocs-band" aria-labelledby="tdocs-sections-title">
      <div class="tdocs-home-container">
        <div class="tdocs-band-head">
          <div>
            <p class="tdocs-band-eyebrow">Browse the docs</p>
            <h2 id="tdocs-sections-title">Everything in four sections</h2>
          </div>
          <p>From your first device to a fleet driven by AI: pick where you want to start.</p>
        </div>
        <div class="tdocs-sections">
          <a
            v-for="section in sections"
            :id="section.slug"
            :key="section.slug"
            class="tdocs-section-card"
            :href="withBase(section.link)"
          >
            <span class="tdocs-section-icon"><component :is="SECTION_ICONS[section.slug]" :size="20" aria-hidden="true" /></span>
            <span v-if="section.pages" class="tdocs-section-meta">{{ section.pages }} {{ section.pages === 1 ? 'page' : 'pages' }}</span>
            <h3>{{ section.title }}</h3>
            <p v-if="SECTION_BLURBS[section.slug]">{{ SECTION_BLURBS[section.slug] }}</p>
            <span class="tdocs-section-more">Explore {{ section.title }} <ArrowRight :size="15" aria-hidden="true" /></span>
          </a>
        </div>
      </div>
    </section>

    <section class="tdocs-band is-dark" aria-labelledby="tdocs-pillars-title">
      <div class="tdocs-pattern" aria-hidden="true"></div>
      <div class="tdocs-home-container">
        <div class="tdocs-band-head">
          <div>
            <p class="tdocs-band-eyebrow">Architecture</p>
            <h2 id="tdocs-pillars-title">How it all fits together</h2>
          </div>
          <p>
            You drive your fleet from a terminal, an AI assistant or a browser, always through the ThinRemote cloud, which
            speaks to a lightweight agent running on every device.
          </p>
        </div>
        <PillarsDiagram class="tdocs-home-diagram" />
        <div class="tdocs-ways">
          <a v-for="way in WAYS" :key="way.key" class="tdocs-way" :href="withBase(way.link)">
            <span class="tdocs-way-icon"><component :is="WAY_ICONS[way.key]" :size="18" aria-hidden="true" /></span>
            <strong>{{ way.title }}</strong>
            <span>{{ way.description }}</span>
          </a>
        </div>
      </div>
    </section>

    <section class="tdocs-band is-alt" aria-labelledby="tdocs-help-title">
      <div class="tdocs-home-container tdocs-help">
        <div>
          <p class="tdocs-band-eyebrow">Need a hand?</p>
          <h2 id="tdocs-help-title">Ask the community or our engineers</h2>
          <p>Search the forum, browse the open source agent and CLI on GitHub, or talk to the team that builds ThinRemote.</p>
        </div>
        <div class="tdocs-help-actions">
          <a class="tdocs-btn tdocs-btn-primary" href="https://community.thinger.io" target="_blank" rel="noopener">
            <MessagesSquare :size="18" aria-hidden="true" />Community forum
          </a>
          <a class="tdocs-btn tdocs-btn-outline" :href="github.url" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" :d="github.path" /></svg>GitHub
          </a>
          <a class="tdocs-btn tdocs-btn-outline" href="https://thinremote.io/contact" target="_blank" rel="noopener">Contact us</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tdocs-home {
  overflow: hidden;
  background: var(--vp-c-bg);
}

.tdocs-home-container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 24px;
}

.tdocs-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: var(--dark-pattern);
}

/* --- Hero ----------------------------------------------------------------- */

.tdocs-hero {
  position: relative;
  padding: 88px 0 120px;
  background: var(--dark-gradient);
  color: var(--text-on-dark);
}

.tdocs-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 470px);
  gap: 56px;
  align-items: center;
}

.tdocs-kicker {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 14px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-on-dark);
}

.tdocs-kicker::before {
  content: '';
  width: 28px;
  height: 2px;
  background: currentColor;
}

.tdocs-hero h1 {
  max-width: 20ch;
  margin: 0 0 18px;
  font-size: clamp(2.3rem, 4.8vw, 3.4rem);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.tdocs-hero-lead {
  max-width: 560px;
  margin: 0 0 28px;
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--text-on-dark);
}

.tdocs-home-search {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  height: 58px;
  padding: 0 14px 0 18px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: #fff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  color: #64748b;
  font: inherit;
  font-size: 16px;
  text-align: left;
  cursor: text;
  transition: box-shadow 0.2s ease;
}

.tdocs-home-search:hover,
.tdocs-home-search:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(31, 142, 254, 0.45), 0 12px 32px rgba(0, 0, 0, 0.35);
}

.tdocs-home-search-icon {
  flex: none;
  color: #1f8efe;
}

.tdocs-home-search-text {
  color: #0f172a;
  font-weight: 500;
  white-space: nowrap;
}

.tdocs-home-search-hint {
  flex: 1;
  overflow: hidden;
  font-size: 14px;
  color: #64748b;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tdocs-home-search-key {
  flex: none;
  padding: 3px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  background: #f1f5f9;
  color: #64748b;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
}

.tdocs-popular {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 18px 0 0;
  font-size: 14px;
  color: var(--text-on-dark-muted);
}

.tdocs-popular a {
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  color: var(--text-on-dark);
  transition: background-color 0.15s ease;
}

.tdocs-popular a:hover {
  background: rgba(31, 142, 254, 0.25);
}

/* Meta line: wraps by item, each line starting with a green square */
.tdocs-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.6rem;
  max-width: 560px;
  margin: 28px 0 0;
  padding: 22px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  list-style: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-dark-muted);
}

.tdocs-hero-meta li {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
}

.tdocs-hero-meta li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: var(--accent-on-dark);
  box-shadow: 0 0 0 3px var(--accent-ring);
}

/* --- Quick links, over the edge of the hero ---------------------------------- */

.tdocs-quick-band {
  position: relative;
  z-index: 2;
  margin-top: -56px;
}

.tdocs-quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.tdocs-quick {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: var(--vp-c-bg-elv);
  box-shadow: var(--shadow);
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.dark .tdocs-quick {
  border-color: var(--border);
}

.tdocs-quick:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.tdocs-quick-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--primary-subtle);
  color: var(--primary);
}

.tdocs-quick-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tdocs-quick-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tdocs-quick-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.tdocs-quick-arrow {
  flex: none;
  margin-top: 2px;
  color: var(--accent-ink);
  transition: transform 0.2s ease;
}

.tdocs-quick:hover .tdocs-quick-arrow {
  transform: translateX(3px);
}

.tdocs-tag {
  display: inline-block;
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--primary-subtle);
  color: var(--primary-ink);
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
}

/* --- Bands ------------------------------------------------------------------- */

.tdocs-band {
  position: relative;
  padding: 72px 0;
}

.tdocs-band.is-dark {
  overflow: hidden;
  background: var(--dark-gradient);
}

.tdocs-band.is-dark .tdocs-home-container {
  position: relative;
}

.tdocs-band.is-alt {
  background: var(--bg);
}

.dark .tdocs-band.is-alt {
  background: var(--surface);
}

.tdocs-band-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 28px;
}

.tdocs-band-head h2,
.tdocs-help h2 {
  margin: 6px 0 0;
  font-size: 2rem;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.tdocs-band-head > p {
  max-width: 520px;
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
}

.tdocs-band-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-ink);
}

.tdocs-band-eyebrow::before {
  content: '';
  width: 28px;
  height: 2px;
  background: currentColor;
}

.is-dark .tdocs-band-head h2 {
  color: #fff;
}

.is-dark .tdocs-band-head > p {
  color: var(--text-on-dark-muted);
}

.is-dark .tdocs-band-eyebrow {
  color: var(--accent-on-dark);
}

/* --- Section cards --------------------------------------------------------------- */

.tdocs-sections {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.tdocs-section-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--vp-c-bg-elv);
  box-shadow: var(--shadow-sm);
  color: inherit;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.tdocs-section-card:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.tdocs-section-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary-subtle);
  color: var(--primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.tdocs-section-card:hover .tdocs-section-icon {
  background: var(--cta-bg);
  color: #fff;
}

.tdocs-section-meta {
  position: absolute;
  top: 22px;
  right: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.tdocs-section-card h3 {
  margin: 14px 0 6px;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tdocs-section-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.tdocs-section-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.tdocs-section-more svg {
  color: var(--accent-ink);
  transition: transform 0.2s ease;
}

.tdocs-section-card:hover .tdocs-section-more svg {
  transform: translateX(3px);
}

/* --- Architecture and ways ---------------------------------------------------------- */

.tdocs-home-diagram {
  margin: 0 0 24px;
}

.tdocs-home-diagram :deep(svg) {
  max-width: 960px;
}

.tdocs-ways {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.tdocs-way {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-on-dark-muted);
  font-size: 14px;
  line-height: 1.55;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.tdocs-way:hover {
  border-color: rgba(111, 182, 255, 0.5);
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-5px);
}

.tdocs-way strong {
  font-size: 15px;
  color: #fff;
}

.tdocs-way-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: rgba(31, 142, 254, 0.16);
  box-shadow: inset 0 0 0 1px rgba(31, 142, 254, 0.4);
  color: var(--primary-on-dark);
}

/* --- Help ------------------------------------------------------------------------- */

.tdocs-help {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.tdocs-help h2 {
  margin-bottom: 8px;
  font-size: 1.8rem;
}

.tdocs-help p:not(.tdocs-band-eyebrow) {
  margin: 0;
  max-width: 560px;
  color: var(--vp-c-text-2);
}

.tdocs-help-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* --- Responsive ------------------------------------------------------------------- */

@media (max-width: 1100px) {
  .tdocs-sections,
  .tdocs-ways {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 960px) {
  .tdocs-hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .tdocs-hero-art {
    display: none;
  }

  .tdocs-hero {
    padding: 64px 0 104px;
  }
}

@media (max-width: 900px) {
  .tdocs-quick-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .tdocs-home-container {
    padding: 0 16px;
  }

  .tdocs-sections,
  .tdocs-ways {
    grid-template-columns: minmax(0, 1fr);
  }

  .tdocs-band-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .tdocs-home-search-hint {
    display: none;
  }

  .tdocs-home-search-text {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tdocs-quick:hover,
  .tdocs-section-card:hover,
  .tdocs-way:hover,
  .tdocs-quick:hover .tdocs-quick-arrow,
  .tdocs-section-card:hover .tdocs-section-more svg {
    transform: none;
  }
}
</style>
