# ListTable Examples

This directory contains testing environments for the `mdx-list-tables` component.

## What's Inside

- **[storybook/](storybook/)** - Interactive component development and visual testing

**Note**: The Docusaurus documentation site has moved to `/docs` at the root level and now serves as the main user documentation.

## Quick Start

### Storybook (Recommended for Development)

**Powered by Storybook 8.x** - Latest version with no deprecated dependencies.

Storybook provides an isolated environment to develop and test the component with various props and content:

```bash
cd examples/storybook
npm install
npm run storybook
```

Then open [http://localhost:6006](http://localhost:6006) in your browser.

**Visual Features:**
- 🎨 **Color-coded merged cells** - Yellow for rowspan, blue for colspan, purple for both
- 📐 **Clear borders** - Thicker borders on merged cells for easy identification
- 🌓 **Dark mode support** - Automatically adapts to system preferences

**What you'll find:**
- **ListTable/Examples** - Basic tables, rowspan, colspan, complex merged cells
- **ListTable/Rich Content** - Multi-line text, formatted content, code examples, API references
- **ListTable/Edge Cases** - Validation modes, boundary conditions, performance tests

### Documentation Site (Docusaurus)

For user-facing documentation and MDX integration testing, see the `/docs` directory at the project root:

```bash
cd ../docs
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**What you'll find:**
- **Basic Examples** - Simple tables, rowspan, colspan, merged cells
- **Rich Content** - Multi-line text, formatted content, API references
- **Real World Examples** - Pricing tables, comparison matrices, financial reports

## Example Categories

### Basic Tables
- Simple header/footer configurations
- Single row/column examples
- Minimal table structures

### Rowspan & Colspan
- Individual rowspan examples
- Individual colspan examples
- Combined rowspan and colspan
- Complex multi-level headers

### Rich Content
- Multi-line text with `<br/>` tags
- Inline formatting (bold, italic, code)
- Lists within cells
- Links and special characters
- Code blocks and syntax

### Real-World Use Cases
- **Pricing Tables** - SaaS pricing tiers, feature matrices
- **Comparison Matrices** - Framework comparisons, technical specifications
- **Financial Reports** - Budget analysis, balance sheets, cash flow statements
- **API Documentation** - Endpoint tables, prop references, type definitions

### Edge Cases
- Validation modes (strict, warn, off)
- Single cell/row/column tables
- Empty cells
- Maximum span sizes
- Large tables (performance)
- Special characters

## Testing Strategy

### Visual Testing (Storybook)
- Rapid iteration on component styling
- Interactive prop controls
- Side-by-side story comparison
- Snapshot testing capabilities
- Hot module reloading

### Integration Testing (Documentation Site)
- Real MDX parsing
- Actual documentation site behavior
- Theme integration testing
- Build process validation
- Production-like environment
- See `/docs` directory for the full documentation site

### Unit Testing (Jest)
- See `/test.ts` in the root directory
- Automated component behavior validation
- Grid placement logic verification
- Placeholder handling tests

## Building for Production

### Storybook
```bash
cd examples/storybook
npm run build-storybook
```

Outputs to `storybook-static/` directory.

### Documentation Site
```bash
cd docs  # From project root
npm run build
```

Outputs to `build/` directory.

## Development Workflow

1. **Start with Storybook** - Develop and test component variations quickly
2. **Validate in docs site** - Ensure MDX integration works correctly
3. **Run Unit Tests** - Verify behavior programmatically
4. **Build Both** - Ensure production builds work

## Contributing Examples

When adding new examples:

1. **For Storybook**: Add stories to `examples/storybook/src/*.stories.tsx`
2. **For docs site**: Add MDX files to `docs/docs/`
3. Update sidebars in `docs/sidebars.js` if adding new sections
4. Ensure examples demonstrate a specific use case or feature
5. Include both the rendered output and the MDX source code

## Troubleshooting

### Storybook Issues

**Port already in use:**
```bash
npm run storybook -- -p 6007  # Use different port
```

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Documentation Site Issues

**Clear cache:**
```bash
cd docs
npm run clear
npm start
```

**Component not updating:**
- Restart the dev server after changing the ListTable component source
- Docusaurus caches aggressively for performance

### Module Resolution

Both examples reference the component from `../../../ListTable.tsx`. In a real deployment:

```tsx
// Change from:
import { ListTable } from '../../../ListTable';

// To:
import { ListTable } from 'mdx-list-tables';
```

## Next Steps

- Explore the examples in both environments
- Try creating your own table structures
- Test edge cases and validation modes
- Experiment with rich content and formatting
- Build complex real-world tables

## Questions?

Check the main project README or open an issue on GitHub.
