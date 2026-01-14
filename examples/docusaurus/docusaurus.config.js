// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ListTable Examples',
  tagline: 'Testing MDX ListTable component',
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  organizationName: 'mdx-list-tables',
  projectName: 'docusaurus-examples',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ListTable Examples',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'examplesSidebar',
            position: 'left',
            label: 'Examples',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `MDX ListTable Examples`,
      },
    }),
};

module.exports = config;
