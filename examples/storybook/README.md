# ListTable Storybook Examples

Interactive component development environment for testing and documenting the ListTable component.

**Powered by Storybook 8.x** - Latest version with improved performance and updated dependencies.

## Getting Started

```bash
npm install
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the stories.

## What's Included

### Story Files

- **[ListTable.stories.tsx](src/ListTable.stories.tsx)** - Core examples including basic tables, rowspan, colspan, merged cells, validation modes
- **[RichContent.stories.tsx](src/RichContent.stories.tsx)** - Complex content examples with formatting, code, multi-line text
- **[EdgeCases.stories.tsx](src/EdgeCases.stories.tsx)** - Boundary conditions, validation, performance tests

### Story Categories

#### ListTable/Examples
- BasicTable
- RowSpanExample
- ColSpanExample
- ComplexMergedCells
- WithFooter
- HeadersAndFooters
- NestedSpans
- ValidationWarning
- ValidationStrict
- ComparisonMatrix

#### ListTable/Rich Content
- MultiLineText
- FormattedText
- CodeInCells
- ListsInCells
- LinksAndImages
- ComplexAPIReference
- MixedContentWithSpans

#### ListTable/Edge Cases
- SingleCell
- SingleRow
- SingleColumn
- EmptyContent
- AllPlaceholders
- MaximumSpan
- MixedValidPlaceholders
- HeaderOnlyTable
- FooterOnlyTable
- AllSectionsMinimal
- LargeTable (20+ rows)
- SpecialCharacters
- ValidationOff
- InconsistentWidthsAllowed
- ComplexHeaderStructure
- AlternatingSpans
- ChainedColSpans

## Development

### Adding New Stories

1. Edit or create a new `*.stories.tsx` file in `src/`
2. Import the ListTable component
3. Define your stories using the CSF (Component Story Format) 3.0

Example:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ListTable } from '../../../ListTable';

export const MyNewStory: Story = {
  args: {
    children: createTable([
      ['Header 1', 'Header 2'],
      ['Cell A1', 'Cell A2'],
    ]),
    headerRows: 1,
    caption: 'My Example',
  },
};
```

### Using Controls

Storybook's Controls addon allows you to modify props interactively:

1. Select a story
2. Open the "Controls" tab in the bottom panel
3. Modify props like `headerRows`, `footerRows`, `validation`, etc.
4. See changes in real-time

### Building for Production

```bash
npm run build-storybook
```

Outputs static HTML to `storybook-static/` directory.

## Features

- **Hot Reload** - Changes to stories are reflected immediately
- **Interactive Controls** - Modify props without code changes
- **Responsive Preview** - Test different viewport sizes
- **Accessibility Checks** - Built-in a11y testing
- **Documentation** - Auto-generated docs from TypeScript types
- **Visual Cell Highlighting** - Merged cells are color-coded for easy identification:
  - 🟡 Yellow tint = rowspan cells
  - 🔵 Blue tint = colspan cells
  - 🟣 Purple tint = cells with both rowspan and colspan
  - Thicker borders (2px) on merged cells vs regular cells (1px)

## Tips

### Testing Complex Tables

Use the helper function `createTable` for simple string-based tables:

```tsx
const createTable = (rows: string[][]) => {
  return React.createElement('ul', null,
    ...rows.map(row =>
      React.createElement('li', null,
        React.createElement('ul', null,
          ...row.map(cell => React.createElement('li', null, cell))
        )
      )
    )
  );
};
```

For rich content, use `createRichTable` which accepts ReactNode:

```tsx
const createRichTable = (rows: React.ReactNode[][]) => {
  // ... similar structure but allows JSX elements
};
```

### Viewing Console Output

Open browser DevTools to see validation warnings and errors logged by the component.

### Comparing Variations

Create multiple stories to compare different configurations side-by-side.

## Troubleshooting

**Storybook won't start:**
- Check if port 6006 is available
- Try clearing cache: `npm run clean`

**Component changes not reflecting:**
- Storybook watches the story files, not the component source
- Restart Storybook after modifying `ListTable.tsx`

**Missing story errors:**
- Clear cache with `npm run clean`
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Restart Storybook

**TypeScript errors:**
- Ensure `@storybook/react-vite` and related packages are up to date
- Run `npm install` to ensure all dependencies are installed

## Next Steps

- Explore existing stories
- Create your own test cases
- Experiment with validation modes
- Test with complex content structures
- Use Controls to interactively test props
