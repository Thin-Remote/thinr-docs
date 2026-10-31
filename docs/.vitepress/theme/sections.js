// The sections of the docs: the row of the top bar, the breadcrumb and
// eyebrow of the page header, the sidebar head and the home page cards.
// Shared by config.mjs (Node) and the theme (browser): no Vue imports here.

export const SECTIONS = [
  {
    slug: 'getting-started',
    title: 'Get Started',
    link: '/getting-started/quick-start',
    activeMatch: '^/getting-started/',
    prefixes: ['/getting-started/'],
  },
  {
    slug: 'device-agent',
    title: 'Device Agent',
    link: '/device-agent/',
    activeMatch: '^/device-agent/',
    prefixes: ['/device-agent/'],
  },
  {
    slug: 'cli',
    title: 'CLI & MCP',
    link: '/cli/',
    activeMatch: '^/(cli|mcp)/',
    prefixes: ['/cli/', '/mcp/'],
  },
  {
    slug: 'use-cases',
    title: 'Use Cases',
    link: '/use-cases/',
    activeMatch: '^/use-cases/',
    prefixes: ['/use-cases/'],
  },
];

/** Section of a route: '/mcp/overview' -> the CLI & MCP section. */
export function sectionOf(path) {
  const clean = path.replace(/[?#].*$/, '').replace(/\.(md|html)$/, '');
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return SECTIONS.find((section) => section.prefixes.some((prefix) => withSlash.startsWith(prefix))) ?? null;
}
