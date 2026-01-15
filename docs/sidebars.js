/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'api',
      label: 'API Reference',
    },
    {
      type: 'doc',
      id: 'accessibility',
      label: 'Accessibility',
    },
    {
      type: 'doc',
      id: 'troubleshooting',
      label: 'Troubleshooting',
    },
    {
      type: 'category',
      label: 'Basic Examples',
      items: [
        'basic/simple-table',
        'basic/rowspan',
        'basic/colspan',
        'basic/merged-cells',
        'basic/validation-modes',
      ],
    },
    {
      type: 'category',
      label: 'Rich Content',
      items: [
        'rich-content/multiline-text',
        'rich-content/formatted-text',
        'rich-content/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Real World Examples',
      items: [
        'real-world/pricing-table',
        'real-world/comparison-matrix',
        'real-world/financial-report',
      ],
    },
  ],
};

module.exports = sidebars;
