// Texts of the home page. The section cards come from sections.js; their
// blurbs are keyed by section slug.

export const SECTION_BLURBS = {
  'getting-started': 'Install the agent and the CLI, open your first remote session and connect your AI assistant.',
  'device-agent': 'The lightweight C++ agent for Linux and macOS: outbound-only, no inbound ports.',
  cli: 'The thinr CLI and its built-in MCP server, to drive your fleet from a terminal or an AI assistant.',
  'use-cases': 'Kiosks, PLCs, edge gateways, Kubernetes and more: how teams put ThinRemote to work.',
};

export const QUICK_LINKS = [
  {
    title: 'Quick Start',
    description: 'From zero to a managed device and an AI assistant driving it.',
    link: '/getting-started/quick-start',
    tag: '10 min',
    icon: 'zap',
  },
  {
    title: 'Install the agent',
    description: 'One command on Linux or macOS, interactive or headless.',
    link: '/device-agent/install',
    tag: 'Agent',
    icon: 'download',
  },
  {
    title: 'Drive your fleet with AI',
    description: 'Plug Claude, Cursor or any MCP client into your devices.',
    link: '/getting-started/ai-assistant',
    tag: 'MCP',
    icon: 'sparkles',
  },
];

/** Shortcuts under the search box of the hero. */
export const POPULAR_LINKS = [
  { title: 'Tunnels', link: '/device-agent/tunnels' },
  { title: 'thinr device', link: '/cli/reference/device-commands' },
  { title: 'MCP tool catalog', link: '/mcp/tool-catalog' },
  { title: 'Headless provisioning', link: '/device-agent/headless-provisioning' },
];

/** The ways to drive the fleet (the dark band). */
export const WAYS = [
  { key: 'cli', title: 'Terminal', description: 'Shells, commands, files and tunnels with thinr.', link: '/cli/' },
  { key: 'ai', title: 'AI assistant', description: 'The MCP server gives Claude, Cursor and others the same reach.', link: '/mcp/overview' },
  { key: 'automation', title: 'Automation', description: 'JSON envelopes, stable error codes and real exit codes.', link: '/cli/json-and-automation' },
  { key: 'fleet', title: 'Fleet operations', description: 'Products, playbooks and agent updates across devices.', link: '/getting-started/products-and-groups' },
];
