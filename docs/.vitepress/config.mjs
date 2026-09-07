import { defineConfig } from 'vitepress';
import llmstxt from 'vitepress-plugin-llms';

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
    text: 'Install',
    items: [
      { text: 'Interactive installation', link: '/device-agent/install' },
      { text: 'Headless provisioning', link: '/device-agent/headless-provisioning' },
      { text: 'Release channels', link: '/device-agent/channels' },
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
      { text: 'Agent updates', link: '/device-agent/agent-updates' },
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
    text: 'Install',
    items: [
      { text: 'Install the CLI', link: '/cli/install' },
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
      { text: 'thinr fleet', link: '/cli/reference/fleet-commands' },
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

export default defineConfig({
  title: 'ThinRemote',
  description: 'Remote device management and IoT platform',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://docs.thinremote.io' },

  // Sections still being written: excluded from the published build.
  srcExclude: ['web-console/**', 'resources/**'],

  vite: {
    plugins: [llmstxt()],
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Get Started', link: '/getting-started/quick-start', activeMatch: '^/getting-started/' },
      { text: 'Device Agent', link: '/device-agent/', activeMatch: '^/device-agent/' },
      { text: 'CLI & MCP', link: '/cli/', activeMatch: '^/(cli|mcp)/' },
      { text: 'Use Cases', link: '/use-cases/', activeMatch: '^/use-cases/' },
    ],

    sidebar: {
      '/getting-started/': startSidebar,
      '/device-agent/': agentSidebar,
      '/cli/': cliSidebar,
      '/mcp/': cliSidebar,

      '/use-cases/': [
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
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Thin-Remote' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: '© ThinRemote',
    },
  },
});
