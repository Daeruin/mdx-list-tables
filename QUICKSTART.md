# Quick Start Guide

## Testing the Component

### Option 1: Run Automated Tests (Recommended)

```bash
# Install dependencies
npm install

# Run all tests
npm test
```

This will run 5 comprehensive tests covering:
- ✅ Basic merged cells with rowspan
- ✅ Caption rendering
- ✅ Table sections (thead/tbody/tfoot)
- ✅ Validation warnings
- ✅ Complex tables with all features

### Option 2: Visual Browser Testing

1. Open `example.html` in your browser
2. Replace the placeholder `ListTable` function with your actual component code
3. See live examples with different table configurations

### Option 3: Quick MDX Test

Create a test MDX file:

```mdx
import { ListTable } from './ListTable';

# Table Examples

## Basic Table
<ListTable headerRows={1}>
- - Header 1
  - Header 2
- - Cell 1
  - Cell 2
</ListTable>

## Table with Merged Cells
<ListTable headerRows={1} headerColumns={1}>
- - Month
  - Revenue
- - [r2] Q1
  - $10,000
- - _
  - $12,000
</ListTable>
```

## Key Syntax Reference

### Merged Cell Markers
- `[r2]` - Spans 2 rows
- `[c3]` - Spans 3 columns
- `[r2c3]` - Spans 2 rows AND 3 columns
- `_` - Placeholder (required for ALL merged cell positions)

### Important Rules

1. **Markers must be at the start** of cell content:
   ```mdx
   ✅ - - [r2] Content
   ✅ - - [r2]
       Content on next line
   ❌ - - Content [r2]
   ```

2. **Placeholders are REQUIRED** for both rowspan AND colspan:
   ```mdx
   # Rowspan example
   - - [r2] Spans down
     - Cell 2
   - - _              ← Required!
     - Cell 4

   # Colspan example
   - - [c2] Spans across
     - _              ← Required!
   - - Cell 3
     - Cell 4
   ```

3. **All rows must have consistent width** (accounting for spans):
   ```mdx
   ✅ Valid:
   - - Cell 1    - - Cell 1
     - Cell 2      - [c2] Spans 2
   - - Cell 3    - - Cell 3
     - Cell 4      - Cell 4

   ❌ Invalid (row 2 only has 1 logical column):
   - - Cell 1
     - Cell 2
   - - Cell 3
   ```

## Common Examples

### Quarterly Report with Rowspan
```mdx
<ListTable headerRows={1} headerColumns={1} caption="Q1 Sales">
- - Quarter
  - Sales
- - [r3] Q1
  - $5,000
- - _
  - $6,000
- - _
  - $7,000
</ListTable>
```

Result:
```
┌─────────┬────────┐
│ Quarter │ Sales  │ (thead)
├─────────┼────────┤
│         │ $5,000 │
│   Q1    ├────────┤ (tbody)
│         │ $6,000 │
│         ├────────┤
│         │ $7,000 │
└─────────┴────────┘
```

### Grouped Headers with Colspan
```mdx
<ListTable headerRows={2}>
- - Month
  - [c2] Revenue
  - _
- - _
  - Sales
  - Services
- - January
  - $5,000
  - $3,000
</ListTable>
```

Result:
```
┌─────────┬─────────────────┐
│ Month   │    Revenue      │ (thead row 1)
├─────────┼─────────┬───────┤
│         │  Sales  │  Svc  │ (thead row 2)
├─────────┼─────────┼───────┤
│ January │ $5,000  │ $3,000│ (tbody)
└─────────┴─────────┴───────┘
```

### Complex Table with Footer
```mdx
<ListTable
  headerRows={1}
  headerColumns={1}
  footerRows={1}
  caption="Annual Report"
>
- - Quarter
  - [c2] Revenue
  - _
- - Q1
  - Sales
  - Services
- - [r2] Q2-Q3
  - $15,000
  - $12,000
- - _
  - $18,000
  - $15,000
- - Total
  - $33,000
  - $27,000
</ListTable>
```

## Validation

The component validates your table and warns about:
- ❌ Invalid span values (zero, negative)
- ❌ Rowspan extending beyond table bounds
- ❌ Colspan extending beyond row width
- ❌ Inconsistent row widths

Set validation mode:
```mdx
<ListTable validation="strict">  ← Shows error instead of rendering
<ListTable validation="warn">    ← Logs to console (default)
<ListTable validation="off">     ← No validation
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Nested list structure |
| `headerRows` | number | 0 | Rows to render in `<thead>` |
| `headerColumns` | number | 0 | Columns to render as `<th>` |
| `footerRows` | number | 0 | Rows from end to render in `<tfoot>` |
| `caption` | ReactNode | - | Table caption |
| `className` | string | "" | CSS classes for table |
| `validation` | 'strict' \| 'warn' \| 'off' | 'warn' | Validation mode |

## Troubleshooting

### "Row has inconsistent width" error
- Count logical columns in each row (including colspan values)
- Make sure all rows have the same total width
- Use `_` placeholders where cells are merged

### Placeholder not being consumed
- Check that the cell above/left actually spans into this position
- Verify rowspan/colspan values are correct
- Remember: placeholders needed for BOTH row and column spans

### Marker not detected
- Ensure `[r2]` is at the very start of cell content
- Check for extra spaces before the marker
- The marker can be on its own line, but must be the first content

### Table not rendering
- Open browser console to see validation warnings
- Check that children is a `<ul>` with nested `<ul>` structure
- Verify you're using the correct Markdown list syntax (`- -`)
