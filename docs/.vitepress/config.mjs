import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
import { bundledThemes } from 'shiki';
import llmstxt from 'vitepress-plugin-llms';
import { SECTIONS, sectionOf } from './theme/sections.js';

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const startSidebar = [
  {
    text: 'Start here',
    items: [
      { text: 'What is ThinRemote?', link: '/getting-started/what-is-thinremote' },
      { text: 'Quick Start', link: '/getting-started/quick-start' },
    ],
  },
  {
    text: 'Install',
    items: [
      { text: 'Install the agent', link: '/device-agent/install' },
      { text: 'Install the CLI', link: '/cli/install' },
    ],
  },
  {
    text: 'First steps',
    items: [
      { text: 'Your first session', link: '/getting-started/first-session' },
      { text: 'Drive your fleet with AI', link: '/getting-started/ai-assistant' },
    ],
  },
  {
    text: 'Understand the platform',
    collapsed: true,
    items: [
      { text: 'Core concepts', link: '/getting-started/core-concepts' },
      { text: 'How it works', link: '/getting-started/how-it-works' },
      { text: 'Properties vs resources', link: '/getting-started/properties-vs-resources' },
      { text: 'Products and groups', link: '/getting-started/products-and-groups' },
      { text: 'ThinRemote vs VPN', link: '/getting-started/vs-vpn' },
      { text: 'ThinRemote vs Tailscale', link: '/getting-started/vs-tailscale' },
    ],
  },
];

// The Device Agent pillar.
const agentSidebar = [
  {
    text: 'Device Agent',
    items: [
      { text: 'Overview', link: '/device-agent/' },
    ],
  },
  {
    text: 'Install, update, uninstall',
    items: [
      { text: 'Interactive installation', link: '/device-agent/install' },
      { text: 'Headless provisioning', link: '/device-agent/headless-provisioning' },
      { text: 'Release channels', link: '/device-agent/channels' },
      { text: 'Agent updates', link: '/device-agent/agent-updates' },
      { text: 'Uninstall', link: '/device-agent/uninstall' },
    ],
  },
  {
    text: 'Features',
    items: [
      { text: 'Terminal', link: '/device-agent/terminal' },
      { text: 'Command execution', link: '/device-agent/command-execution' },
      { text: 'Filesystem', link: '/device-agent/filesystem' },
      { text: 'Tunnels', link: '/device-agent/tunnels' },
      { text: 'Monitoring and alarms', link: '/device-agent/monitoring-and-alarms' },
      { text: 'Custom scripts', link: '/device-agent/custom-scripts' },
    ],
  },
  {
    text: 'Reference',
    collapsed: true,
    items: [
      { text: 'Architecture and security', link: '/device-agent/architecture-and-security' },
      { text: 'CLI flags', link: '/device-agent/reference/cli-flags' },
      { text: 'Environment variables', link: '/device-agent/reference/environment-variables' },
      { text: 'Config file', link: '/device-agent/reference/config-file' },
      { text: 'Custom scripts spec', link: '/device-agent/reference/custom-scripts-spec' },
      { text: 'Supported architectures', link: '/device-agent/reference/supported-architectures' },
      { text: 'Supported init systems', link: '/device-agent/reference/supported-init-systems' },
      { text: 'Update mechanism', link: '/device-agent/reference/auto-update' },
    ],
  },
];

// The CLI & MCP pillar, shared by /cli/ and /mcp/.
const cliSidebar = [
  {
    text: 'CLI & MCP',
    items: [
      { text: 'Overview', link: '/cli/' },
    ],
  },
  {
    text: 'Install, update, uninstall',
    items: [
      { text: 'Install the CLI', link: '/cli/install' },
      { text: 'Update and uninstall', link: '/cli/update-and-uninstall' },
    ],
  },
  {
    text: 'CLI workflows',
    items: [
      { text: 'SSH and console', link: '/cli/ssh-and-console' },
      { text: 'Executing commands', link: '/cli/exec-commands' },
      { text: 'File management', link: '/cli/file-management' },
      { text: 'HTTP tunneling', link: '/cli/http-tunneling' },
      { text: 'TCP/TLS tunneling', link: '/cli/tcp-tls-tunneling' },
      { text: 'JSON and automation', link: '/cli/json-and-automation' },
    ],
  },
  {
    text: 'MCP server',
    items: [
      { text: 'Overview', link: '/mcp/overview' },
      { text: 'Connect your client', link: '/mcp/connect-your-client' },
      { text: 'Tool catalog', link: '/mcp/tool-catalog' },
      { text: 'Best practices', link: '/mcp/best-practices' },
    ],
  },
  {
    text: 'Reference',
    collapsed: true,
    items: [
      { text: 'Global options', link: '/cli/reference/global-options' },
      { text: 'thinr device', link: '/cli/reference/device-commands' },
      { text: 'thinr product', link: '/cli/reference/product-commands' },
      { text: 'thinr agent', link: '/cli/reference/agent-commands' },
      { text: 'thinr playbook', link: '/cli/reference/playbook-commands' },
      { text: 'thinr profile', link: '/cli/reference/profile-commands' },
      { text: 'JSON envelope', link: '/cli/reference/json-envelope' },
      { text: 'Error codes', link: '/cli/reference/error-codes' },
    ],
  },
];

// The Web Console pillar.
const webConsoleSidebar = [
  {
    text: 'Web Console',
    items: [
      { text: 'Overview', link: '/web-console/' },
    ],
  },
  {
    text: 'Use from the console',
    items: [
      { text: 'Remote desktop', link: '/web-console/remote-desktop' },
      { text: 'Users and RBAC', link: '/web-console/users-and-rbac' },
    ],
  },
  {
    text: 'API',
    items: [
      { text: 'REST API', link: '/web-console/api' },
    ],
  },
];

const useCasesSidebar = [
  {
    text: 'Use cases',
    items: [
      { text: 'Overview', link: '/use-cases/' },
    ],
  },
  {
    text: 'IoT & Embedded',
    items: [
      { text: 'Kiosks and signage', link: '/use-cases/iot-embedded/kiosks-and-signage' },
      { text: 'Industrial PLCs', link: '/use-cases/iot-embedded/industrial-plcs' },
      { text: 'Vending machines', link: '/use-cases/iot-embedded/vending-machines' },
      { text: 'Retail POS', link: '/use-cases/iot-embedded/retail-pos' },
      { text: 'Edge gateways', link: '/use-cases/iot-embedded/edge-gateways' },
      { text: 'EV charging', link: '/use-cases/iot-embedded/ev-charging' },
    ],
  },
  {
    text: 'IT & Cloud',
    items: [
      { text: 'Dashboards tunneling', link: '/use-cases/it-cloud/dashboards-tunneling' },
      { text: 'SSH access', link: '/use-cases/it-cloud/ssh-access' },
      { text: 'Alert-triggered access', link: '/use-cases/it-cloud/alert-triggered' },
      { text: 'Remote dev', link: '/use-cases/it-cloud/remote-dev' },
      { text: 'Multi-cloud', link: '/use-cases/it-cloud/multi-cloud' },
      { text: 'Kubernetes', link: '/use-cases/it-cloud/kubernetes' },
    ],
  },
];

const sidebar = {
  '/getting-started/': startSidebar,
  '/device-agent/': agentSidebar,
  '/cli/': cliSidebar,
  '/mcp/': cliSidebar,
  '/use-cases/': useCasesSidebar,
};

/** Pages of each section that live under its own routes, for the home page cards. */
function sectionPageCount(section) {
  const links = new Set();
  const walk = (items) => {
    for (const item of items) {
      if (item.link && sectionOf(item.link)?.slug === section.slug) links.add(item.link);
      if (item.items) walk(item.items);
    }
  };
  for (const prefix of section.prefixes) walk(sidebar[prefix] ?? []);
  return links.size;
}

const WORDS_PER_MINUTE = 220;

/** Minutes to read a page source: prose words, code counted at half speed. */
function readingMinutes(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  const code = (body.match(/^```[\s\S]*?^```/gm) ?? []).join('\n');
  const prose = body
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\]\([^)]*\)/g, ']');
  const count = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’_-]*/gu) ?? []).length;
  return Math.max(1, Math.round((count(prose) + count(code) / 2) / WORDS_PER_MINUTE));
}

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The first "# " heading of a page, outside code fences, as inline HTML
 * (code spans kept, emphasis markers dropped). The page header shows it in
 * place of the markdown h1, which custom.css hides.
 */
function firstHeading(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  let fenced = false;
  for (const line of body.split('\n')) {
    if (/^(```|~~~)/.test(line)) fenced = !fenced;
    if (fenced) continue;
    const match = line.match(/^#\s+(.+?)\s*(\{#[^}]*\})?\s*$/);
    if (match) {
      return match[1]
        .split(/(`[^`]+`)/)
        .map((part) =>
          part.startsWith('`') && part.endsWith('`')
            ? `<code>${escapeHtml(part.slice(1, -1))}</code>`
            : escapeHtml(part.replace(/(\*\*|__|\*|_)(.+?)\1/g, '$2')),
        )
        .join('');
    }
  }
  return null;
}

const CONCEPT_PAGES = new Set([
  '/getting-started/what-is-thinremote',
  '/getting-started/core-concepts',
  '/getting-started/how-it-works',
  '/getting-started/properties-vs-resources',
  '/getting-started/products-and-groups',
  '/getting-started/vs-vpn',
  '/getting-started/vs-tailscale',
  '/device-agent/architecture-and-security',
]);

/** Kind of page shown as a badge in the page header, when there is one. */
function pageType(pagePath) {
  if (pagePath.includes('/reference/')) return 'reference';
  if (CONCEPT_PAGES.has(pagePath)) return 'concept';
  if (pagePath.startsWith('/use-cases/') && pagePath !== '/use-cases/') return 'use-case';
  return null;
}

/**
 * Code blocks are dark in both modes, on the graphite of the brand: the
 * Material palenight token colors, with comments and deep JSON keys lightened
 * to reach AA (4.5:1) on the code background.
 */
async function codeTheme() {
  const theme = structuredClone((await bundledThemes['material-theme-palenight']()).default);
  const lighter = { '#676e95': '#8f9bb8', '#916b53': '#c8a07f' };
  for (const rule of theme.tokenColors ?? []) {
    const color = rule.settings?.foreground?.toLowerCase();
    if (color && lighter[color]) rule.settings.foreground = lighter[color];
  }
  return theme;
}

export default defineConfig({
  title: 'ThinRemote',
  description: 'Secure remote access and monitoring for Linux and macOS devices',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://docs.thinremote.io' },

  // Sections still being written: excluded from the published build.
  srcExclude: ['web-console/**', 'resources/**'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '32x32' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }],
    // The diagram zoom button only exists when JavaScript runs (components.css)
    ['script', {}, "document.documentElement.classList.add('tdocs-js')"],
  ],

  markdown: {
    theme: await codeTheme(),
    config(md) {
      // Tables scroll inside a framed box on narrow screens, the table itself at full width
      md.renderer.rules.table_open = (tokens, idx, options, env, self) => `<div class="tdocs-table">${self.renderToken(tokens, idx, options)}`;
      md.renderer.rules.table_close = (tokens, idx, options, env, self) => `${self.renderToken(tokens, idx, options)}</div>`;
    },
  },

  // Read by the page header (theme/components/PageHeader.vue) and the sidebar head
  transformPageData(pageData) {
    if (pageData.isNotFound || pageData.frontmatter.layout === 'page') return;
    const file = path.join(srcDir, pageData.relativePath);
    if (!fs.existsSync(file)) return;
    const source = fs.readFileSync(file, 'utf8');
    const pagePath = `/${pageData.relativePath}`.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
    const section = sectionOf(pagePath);
    Object.assign(pageData, {
      section: section ? { slug: section.slug, title: section.title, link: section.link } : null,
      heading: firstHeading(source),
      pageType: pageType(pagePath),
      readingTime: readingMinutes(source),
    });
  },

  vite: {
    plugins: [
      llmstxt({
        domain: 'https://docs.thinremote.io',
        title: 'ThinRemote documentation',
        description: 'Secure remote access and monitoring for Linux and macOS devices: an outbound-only agent, a web console, the thinr CLI and its MCP server for AI assistants.',
        details: 'Each link points to the Markdown version of the page; llms-full.txt has every page in one file. Agents operate devices through the thinr CLI or its MCP server (eight thinr_resource_* tools): start with /mcp/tool-catalog.md.',
      }),
    ],
    resolve: {
      // The section links of the top bar, with their icon (theme/components/NavBarMenuLink.vue)
      alias: [
        {
          find: /^.*\/VPNavBarMenuLink\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/NavBarMenuLink.vue', import.meta.url)),
        },
      ],
    },
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  themeConfig: {
    logo: { src: '/assets/logo-mark.svg', alt: '' },
    siteTitle: 'Thin<span class="tdocs-brand-accent">Remote</span>',

    // The sections; the thinremote.io links of the top row are NavCtas.vue
    nav: SECTIONS.map((section) => ({ text: section.title, link: section.link, activeMatch: section.activeMatch })),

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Thin-Remote', ariaLabel: 'ThinRemote on GitHub' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: { button: { buttonText: 'Search docs', buttonAriaLabel: 'Search the documentation' } },
      },
    },
    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous', next: 'Next' },
    externalLinkIcon: false,

    // Read by the home page
    homeSections: SECTIONS.map((section) => ({
      slug: section.slug,
      title: section.title,
      link: section.link,
      pages: sectionPageCount(section),
    })),
  },
});
