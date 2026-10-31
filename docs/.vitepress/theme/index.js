// Extends the VitePress default theme with the look of the Thinger.io docs
// (the thinger-web design system) on the ThinRemote identity: graphite base,
// green accent and the ThinRemote logo. Tokens, header, page header, sidebar
// head, footer, home page, 404 and diagram zoom; layout, sidebar, outline,
// search and previous/next stay the default theme's.

import { h, nextTick, onMounted, watch } from 'vue';
import { useRoute } from 'vitepress';
// The variant without fonts: the design system uses the system font stack
import DefaultTheme from 'vitepress/theme-without-fonts';
import { addDiagramButtons, listenDiagramClicks } from './diagram-zoom.js';

import './custom.css';
import './components.css';
import NavCtas from './components/NavCtas.vue';
import SiteFooter from './components/SiteFooter.vue';
import NotFound from './components/NotFound.vue';
import HomePage from './components/HomePage.vue';
import PageHeader from './components/PageHeader.vue';
import SidebarSection from './components/SidebarSection.vue';
import QuickStartJourney from './QuickStartJourney.vue';

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () => h('span', { class: 'tdocs-nav-docs' }, 'Docs'),
      'nav-bar-content-after': () => h(NavCtas),
      'nav-screen-content-after': () => h(NavCtas, { screen: true }),
      'sidebar-nav-before': () => h(SidebarSection),
      'doc-before': () => h(PageHeader),
      'not-found': () => h(NotFound),
      'layout-bottom': () => h(SiteFooter),
    }),
  enhanceApp({ app }) {
    app.component('HomePage', HomePage);
    app.component('QuickStartJourney', QuickStartJourney);
  },
  setup() {
    const route = useRoute();
    onMounted(() => {
      addDiagramButtons();
      listenDiagramClicks();
    });
    watch(
      () => route.path,
      () => nextTick(addDiagramButtons),
    );
  },
};
