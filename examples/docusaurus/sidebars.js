/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  examplesSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
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
