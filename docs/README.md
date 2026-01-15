# ListTable Docusaurus Examples

Real-world MDX integration testing for the ListTable component using Docusaurus.

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation site.

## What's Included

### Documentation Pages

#### Introduction
- [intro.mdx](docs/intro.mdx) - Overview and quick start guide

#### Basic Examples
- [simple-table.mdx](docs/basic/simple-table.mdx) - Basic tables with headers and footers
- [rowspan.mdx](docs/basic/rowspan.mdx) - Rowspan examples with placeholders
- [colspan.mdx](docs/basic/colspan.mdx) - Colspan examples and multi-level headers
- [merged-cells.mdx](docs/basic/merged-cells.mdx) - Complex combined rowspan/colspan

#### Rich Content
- [multiline-text.mdx](docs/rich-content/multiline-text.mdx) - Multi-line text and lists in cells
- [formatted-text.mdx](docs/rich-content/formatted-text.mdx) - Code, bold, italic, links
- [api-reference.mdx](docs/rich-content/api-reference.mdx) - API documentation tables

#### Real World Examples
- [pricing-table.mdx](docs/real-world/pricing-table.mdx) - SaaS pricing, feature matrices
- [comparison-matrix.mdx](docs/real-world/comparison-matrix.mdx) - Framework and tool comparisons
- [financial-report.mdx](docs/real-world/financial-report.mdx) - Financial statements and reports

## MDX Usage

### Basic Syntax

```mdx
import { ListTable } from '@site/src/components/ListTable';

<ListTable headerRows={1} caption="My Table">
- - Header 1
  - Header 2
- - Cell A1
  - Cell A2
- - Cell B1
  - Cell B2
</ListTable>
```

### With Rowspan

```mdx
<ListTable headerRows={1}>
- - Category
  - Item
- - [r2] Electronics
  - Laptop
- - _
  - Mouse
</ListTable>
```

### With Colspan

```mdx
<ListTable headerRows={2}>
- - Region
  - [c2] Sales
- - _
  - Q1
  - Q2
- - North
  - $100k
  - $120k
</ListTable>
```

### Rich Content in Cells

```mdx
<ListTable headerRows={1}>
- - Feature
  - Description
- - Authentication
  - Supports:<br/>• OAuth<br/>• JWT<br/>• API Keys
- - Storage
  - <code>PostgreSQL</code> or <code>MySQL</code>
</ListTable>
```

## Component Import

The examples use a local component wrapper at `src/components/ListTable.tsx`:

```tsx
export { ListTable } from '../../../../ListTable';
```

In production, you would import from the published package:

```tsx
// In src/components/ListTable.tsx
export { ListTable } from 'mdx-list-tables';
```

## Development

### Adding New Pages

1. Create a new `.mdx` file in the appropriate `docs/` subdirectory
2. Add frontmatter with `sidebar_position`:

```mdx
---
sidebar_position: 1
---

# Page Title

Content here...
```

3. Update [sidebars.js](sidebars.js) if creating a new category
4. Import and use the ListTable component

### Styling Tables

Custom styles are in [src/css/custom.css](src/css/custom.css). You can:

- Customize table borders, colors, spacing
- Modify caption styling
- Add hover effects
- Adjust code block appearance in cells

### Building for Production

```bash
npm run build
```

Outputs static HTML to `build/` directory.

To test the production build locally:

```bash
npm run serve
```

## Features

### Docusaurus Benefits

- **MDX v3** - Latest MDX parser with improved performance
- **Hot Reload** - Instant updates during development
- **Search** - Built-in documentation search
- **Dark Mode** - Automatic theme switching (if configured)
- **SEO** - Optimized for search engines
- **Mobile Responsive** - Works on all screen sizes

### MDX Capabilities

- Import React components directly
- Mix Markdown and JSX
- Use component props inline
- Include code examples
- Add interactive elements

## Configuration

### [docusaurus.config.js](docusaurus.config.js)

Main configuration file:
- Site metadata
- Theme configuration
- Plugin settings
- Navbar and footer

### [sidebars.js](sidebars.js)

Documentation structure:
- Sidebar categories
- Page organization
- Navigation hierarchy

### [src/css/custom.css](src/css/custom.css)

Custom styling:
- CSS variables
- Table styles
- Component overrides

## Example Page Structure

Each example page includes:

1. **Frontmatter** - Metadata and sidebar position
2. **Title** - H1 heading
3. **Component Import** - Import ListTable from local wrapper
4. **Rendered Table** - Actual ListTable component usage
5. **MDX Source** - Code block showing the source
6. **Explanation** - Description of the example

Example template:

```mdx
---
sidebar_position: 1
---

# Example Title

Description of what this example demonstrates.

import { ListTable } from '@site/src/components/ListTable';

## Example Heading

<ListTable headerRows={1} caption="Example">
- - Header 1
  - Header 2
- - Cell A1
  - Cell A2
</ListTable>

**MDX Source:**
\```mdx
<ListTable headerRows={1} caption="Example">
- - Header 1
  - Header 2
- - Cell A1
  - Cell A2
</ListTable>
\```

**Key Points:**
- Explanation of syntax
- Important notes
- Common patterns
```

## Troubleshooting

### Build Errors

**Clear Docusaurus cache:**
```bash
npm run clear
npm start
```

**Module resolution errors:**
- Check that `ListTable.tsx` exists in the parent directory
- Verify the import path in `src/components/ListTable.tsx`

### Component Not Updating

Docusaurus caches aggressively. After changing the component source:
1. Stop the dev server
2. Run `npm run clear`
3. Start again with `npm start`

### MDX Parsing Errors

- Ensure list syntax is correct (double dash for nested lists)
- Check that all JSX tags are properly closed
- Verify component imports are at the top of the file

### Styling Issues

- Check browser DevTools to see applied styles
- Modify `src/css/custom.css` for table styling
- Use inline styles for cell-specific formatting

## Testing Integration

This environment tests:

✅ **MDX Parsing** - Verifies list structure is correctly parsed
✅ **Component Rendering** - Ensures tables render correctly
✅ **Rich Content** - Tests complex content in cells
✅ **Theme Integration** - Validates styling with Docusaurus theme
✅ **Build Process** - Confirms production builds work
✅ **Responsive Design** - Tests on different screen sizes

## Next Steps

- Browse the existing examples
- Create your own documentation pages
- Test edge cases in real MDX context
- Customize the theme and styling
- Build and deploy to verify production readiness

## Resources

- [Docusaurus Documentation](https://docusaurus.io)
- [MDX Documentation](https://mdxjs.com)
- [ListTable Component Source](../../../ListTable.tsx)
