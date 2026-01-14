# MDX List Tables

A React/MDX component for creating tables with merged cells using an intuitive nested list syntax inspired by reStructuredText list-tables.

## Features

- ✅ Create tables using familiar Markdown list syntax
- ✅ Support for merged cells (rowspan/colspan)
- ✅ Table captions
- ✅ Semantic table sections (thead, tbody, tfoot)
- ✅ Header rows and columns
- ✅ Built-in validation with helpful error messages
- ✅ All Markdown content supported in cells (including multi-line)

## Installation

```bash
npm install mdx-list-tables
```

## Basic Usage

```mdx
import { ListTable } from 'mdx-list-tables';

<ListTable headerRows={1}>
- - Header 1
  - Header 2
- - Cell 1
  - Cell 2
- - Cell 3
  - Cell 4
</ListTable>
```

This renders as:

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Merged Cells

Use the `[r2c3]` syntax to merge cells:

- `[r2]` - Span 2 rows
- `[c3]` - Span 3 columns
- `[r2c3]` - Span 2 rows and 3 columns

### Example with Rowspan

```mdx
<ListTable headerRows={1} headerColumns={1}>
- - Month
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

The `_` placeholder marks where a cell from above (or left) extends into.

### Example with Colspan

```mdx
<ListTable headerRows={1}>
- - Month
  - [c2] Revenue
- - January
  - Sales
  - Services
</ListTable>
```

### Multi-line Cell Content

```mdx
<ListTable>
- - [r2]
    This content spans
    multiple lines
  - Regular cell
- - _
  - Another cell
</ListTable>
```

The marker can be on its own line to keep content clean.

## Props

### `children` (required)
The nested list structure defining the table content.

### `headerRows?: number`
Number of rows from the top to render in `<thead>`. These cells will be `<th>` elements with `scope="col"`.

### `headerColumns?: number`
Number of columns from the left to render as row headers. These cells will be `<th>` elements with `scope="row"`.

### `footerRows?: number`
Number of rows from the bottom to render in `<tfoot>`.

### `caption?: ReactNode`
Table caption rendered at the top of the table.

### `className?: string`
Additional CSS classes to apply to the table element.

### `validation?: 'strict' | 'warn' | 'off'`
Validation mode (default: `'warn'`):
- `'strict'` - Render error display if validation fails
- `'warn'` - Log warnings to console but render anyway
- `'off'` - Skip validation

## Complete Example

```mdx
<ListTable
  headerRows={1}
  headerColumns={1}
  footerRows={1}
  caption="Quarterly Revenue Report"
  validation="warn"
>
- - Quarter
  - [c2] Revenue
- - Q1
  - Sales
  - Services
- - [r2] Q2-Q3
  - $15000
  - $12000
- - _
  - $18000
  - $15000
- - Total
  - $33000
  - $27000
</ListTable>
```

This creates a table with:
- A caption "Quarterly Revenue Report"
- Header row and column
- Footer row
- Merged cells for "Revenue" (colspan) and "Q2-Q3" (rowspan)

## Validation

The component validates your table structure and provides helpful error messages:

- **Invalid span values** - Detects zero, negative, or non-numeric spans
- **Rowspan overflow** - Warns if rowspan extends beyond table bounds
- **Colspan overflow** - Warns if colspan extends beyond row width
- **Inconsistent row widths** - Detects ragged tables

Example validation error:
```
[ListTable] error: Cell rowSpan (5) extends beyond table bounds. Last row: 2, span reaches: 6 Row 0
```

## How It Works

1. MDX converts your Markdown lists into nested `<ul><li>` elements
2. The component parses this structure into a 2D array
3. Span markers are extracted and removed from content
4. Grid tracking handles rowspan/colspan positioning
5. Placeholders (`_`) are consumed where needed
6. The table is rendered with proper `<thead>`, `<tbody>`, `<tfoot>` sections

## Syntax Rules

1. **Markers must be at the start** of cell content (can be on their own line)
2. **Placeholders are required** for cells occupied by spans
3. **All rows must have consistent logical width** (accounting for colspans)
4. **Spans cannot overflow** table boundaries

## Migration from Old Syntax

If you used the previous `::: r2 c3 :::` syntax, update to `[r2c3]`:

**Before:**
```mdx
- - ::: r2 ::: Content
```

**After:**
```mdx
- - [r2] Content
```

Or for cleaner multi-line content:
```mdx
- - [r2]
    Content here
```

## License

MIT
