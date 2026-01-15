// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MDX List Tables',
  tagline: 'Create tables with merged cells using intuitive list syntax',
  url: 'https://daeruin.github.io',
  baseUrl: '/mdx-list-tables/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  organizationName: 'Daeruin',
  projectName: 'mdx-list-tables',

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
        title: 'MDX List Tables',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/Daeruin/mdx-list-tables',
            label: 'GitHub',
            position: 'right',
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
