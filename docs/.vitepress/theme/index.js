import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import PillarsDiagram from './PillarsDiagram.vue';
import QuickStartJourney from './QuickStartJourney.vue';

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-hero-after': () => h(PillarsDiagram),
    }),
  enhanceApp({ app }) {
    app.component('QuickStartJourney', QuickStartJourney);
  },
};
