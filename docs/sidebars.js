/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Getting started',
    },
    {
      type: 'category',
      label: 'Basic examples',
      items: [
        'basic/simple-table',
        'basic/rowspan',
        'basic/colspan',
        'basic/merged-cells',
      ],
    },
    {
      type: 'category',
      label: 'Rich content examples',
      items: [
        'rich-content/multiline-text',
        'rich-content/formatted-text',
        'rich-content/advanced-content',
      ],
    },
    {
      type: 'category',
      label: 'Real world examples',
      items: [
        'real-world/api-reference',
        'real-world/cli-reference',
        'real-world/compatibility-matrix',
      ],
    },
    {
      type: 'doc',
      id: 'api',
      label: 'API reference',
    },
    {
      type: 'doc',
      id: 'accessibility',
      label: 'Accessibility',
    },
    {
      type: 'doc',
      id: 'validation-modes',
      label: 'Validation modes',
    },
    {
      type: 'doc',
      id: 'troubleshooting',
      label: 'Troubleshooting',
    },
  ],
};

module.exports = sidebars;
