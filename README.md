# MDX List Tables

Create tables with merged cells in MDX using intuitive nested list syntax.

[Documentation](https://daeruin.github.io/mdx-list-tables) | [Examples](https://daeruin.github.io/mdx-list-tables/basic/simple-table) | [GitHub](https://github.com/Daeruin/mdx-list-tables)

## Features

- Rowspan and colspan with `[r2]` `[c3]` `[r2c3]` syntax
- Semantic HTML (`<thead>`, `<tbody>`, `<tfoot>`)
- Full accessibility support (WCAG 2.1 Level AA)
- TypeScript definitions included
- Framework agnostic (works with any MDX setup)
- Comprehensive validation with helpful error messages

## Installation

```bash
npm install mdx-list-tables
```

## Quick Example

```mdx
import { ListTable } from 'mdx-list-tables';

<ListTable headerRows={1} caption="Quarterly Revenue">
- - Quarter
  - Revenue
- - Q1
  - $100k
- - Q2
  - $120k
</ListTable>
```

## Merged Cells Example

```mdx
<ListTable headerRows={1} headerColumns={1}>
- - Month
  - [c2] Revenue
  - _
- - January
  - Sales
  - Services
- - [r2] Q1
  - $5000
  - $3000
- - _
  - $6000
  - $4000
</ListTable>
```

This renders a table with:
- Merged header "Revenue" spanning 2 columns
- Merged cell "Q1" spanning 2 rows
- Proper semantic HTML with `<thead>` and `<tbody>`

## Documentation

For complete documentation, API reference, and more examples:

**[View Full Documentation →](https://daeruin.github.io/mdx-list-tables)**

## Framework Support

Works with:
- Docusaurus
- Next.js (with @next/mdx)
- Gatsby (with gatsby-plugin-mdx)
- Astro
- Remix
- Any MDX-compatible framework

## TypeScript

Full TypeScript support with included type definitions:

```typescript
import { ListTable } from 'mdx-list-tables';

interface ListTableProps {
  children: ReactNode;
  headerRows?: number;
  headerColumns?: number;
  footerRows?: number;
  caption?: ReactNode;
  className?: string;
  validation?: 'strict' | 'warn' | 'off';
}
```

## Accessibility

Generates accessible, semantic HTML tables:
- Proper `<th>` elements with `scope` attributes
- `<caption>` support for screen readers
- WCAG 2.1 Level AA compliant
- Tested with NVDA, JAWS, and VoiceOver
- Zero axe-core violations

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT - See [LICENSE](LICENSE) for details.

## Links

- [Documentation](https://daeruin.github.io/mdx-list-tables)
- [GitHub Repository](https://github.com/Daeruin/mdx-list-tables)
- [npm Package](https://www.npmjs.com/package/mdx-list-tables)
- [Report Issues](https://github.com/Daeruin/mdx-list-tables/issues)
