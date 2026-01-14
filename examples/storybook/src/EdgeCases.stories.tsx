import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListTable } from '../../../ListTable';

const meta = {
  title: 'ListTable/Edge Cases',
  component: ListTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListTable>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const SingleCell: Story = {
  args: {
    children: createTable([
      ['Single Cell'],
    ]),
    caption: 'Minimal Table - Single Cell',
  },
};

export const SingleRow: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
    ]),
    caption: 'Single Row Table',
  },
};

export const SingleColumn: Story = {
  args: {
    children: createTable([
      ['Row 1'],
      ['Row 2'],
      ['Row 3'],
    ]),
    caption: 'Single Column Table',
  },
};

export const EmptyContent: Story = {
  args: {
    children: createTable([
      ['', 'Empty', ''],
      ['Data', '', 'More'],
    ]),
    headerRows: 1,
    caption: 'Table with Empty Cells',
  },
};

export const SingleMergedCell2x2: Story = {
  args: {
    children: createTable([
      ['[r2c2] Merged', '_'],
      ['_', '_'],
    ]),
    caption: 'Single Merged Cell (2x2) - All Other Cells are Placeholders',
  },
};

export const SingleMergedCell3x3: Story = {
  args: {
    children: createTable([
      ['[r3c3] Large Span', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_'],
    ]),
    caption: 'Single Merged Cell (3x3) - All Other Cells are Placeholders',
  },
};

export const MixedValidPlaceholders: Story = {
  args: {
    children: createTable([
      ['[r2] A', 'B', '[r2] C'],
      ['_', 'D', '_'],
      ['E', 'F', 'G'],
    ]),
    caption: 'Multiple Valid Rowspans with Placeholders',
  },
};

export const HeaderOnlyTable: Story = {
  args: {
    children: createTable([
      ['Column 1', 'Column 2', 'Column 3'],
    ]),
    headerRows: 1,
    caption: 'Table with Only Headers',
  },
};

export const FooterOnlyTable: Story = {
  args: {
    children: createTable([
      ['Total', '$100', '$200'],
    ]),
    footerRows: 1,
    caption: 'Table with Only Footer',
  },
};

export const AllSectionsMinimal: Story = {
  args: {
    children: createTable([
      ['Header'],
      ['Body'],
      ['Footer'],
    ]),
    headerRows: 1,
    footerRows: 1,
    caption: 'Minimal Table with All Sections',
  },
};

export const LargeTable: Story = {
  args: {
    children: createTable([
      ['#', 'Name', 'Value 1', 'Value 2', 'Value 3', 'Total'],
      ...Array.from({ length: 20 }, (_, i) => [
        `${i + 1}`,
        `Item ${i + 1}`,
        `${(i + 1) * 10}`,
        `${(i + 1) * 20}`,
        `${(i + 1) * 30}`,
        `${(i + 1) * 60}`,
      ]),
      ['[c5] Grand Total', '12,600'],
    ]),
    headerRows: 1,
    footerRows: 1,
    caption: 'Large Table - Performance Test',
  },
};

export const SpecialCharacters: Story = {
  args: {
    children: createTable([
      ['Symbol', 'Unicode', 'HTML'],
      ['©', 'U+00A9', '&copy;'],
      ['™', 'U+2122', '&trade;'],
      ['€', 'U+20AC', '&euro;'],
      ['→', 'U+2192', '&rarr;'],
      ['✓', 'U+2713', '&#10003;'],
    ]),
    headerRows: 1,
    caption: 'Special Characters and Symbols',
  },
};

export const ComplexHeaderStructure: Story = {
  args: {
    children: createTable([
      ['[c6] Annual Report 2024'],
      ['[r2] Quarter', '[c2] Revenue', '[c2] Expenses', '[r2] Profit'],
      ['_', 'Actual', 'Forecast', 'Fixed', 'Variable', '_'],
      ['Q1', '$100k', '$110k', '$20k', '$30k', '$50k'],
      ['Q2', '$120k', '$115k', '$20k', '$35k', '$65k'],
      ['Q3', '$130k', '$125k', '$22k', '$40k', '$68k'],
      ['Q4', '$150k', '$140k', '$22k', '$45k', '$83k'],
    ]),
    headerRows: 3,
    caption: 'Complex Multi-level Header Structure',
  },
};

export const AlternatingSpans: Story = {
  args: {
    children: createTable([
      ['[r2] A', 'B', '[r2] C', 'D'],
      ['_', 'E', '_', 'F'],
      ['[r2] G', 'H', '[r2] I', 'J'],
      ['_', 'K', '_', 'L'],
    ]),
    caption: 'Alternating Rowspan Pattern',
  },
};

export const ChainedColSpans: Story = {
  args: {
    children: createTable([
      ['[c2] A-B', '_', '[c2] C-D', '_'],
      ['A', 'B', 'C', 'D'],
      ['[c4] Full Width', '_', '_', '_'],
    ]),
    headerRows: 1,
    footerRows: 1,
    caption: 'Chained Colspan Combinations',
  },
};
