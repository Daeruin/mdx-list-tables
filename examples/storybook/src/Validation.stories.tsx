import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListTable } from '../../../ListTable';

const meta = {
  title: 'ListTable/Validation',
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

export const RowspanOverflowStrict: Story = {
  args: {
    children: createTable([
      ['[r5] Oversized by 3 rows', 'Cell'],
      ['_', 'Cell 2'],
    ]),
    validation: 'strict',
    caption: 'Rowspan Overflow (Strict) - Shows Error',
  },
};

export const RowspanOverflowWarn: Story = {
  args: {
    children: createTable([
      ['[r5] Oversized by 3 rows', 'Cell'],
      ['_', 'Cell 2'],
    ]),
    validation: 'warn',
    caption: 'Rowspan Overflow (Warn) - Check Console',
  },
};

export const ColspanOverflowStrict: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
      ['[c5] Oversized by 2 columns', '_', '_'],
    ]),
    validation: 'strict',
    caption: 'Colspan Overflow (Strict) - Shows Error',
  },
};

export const ColspanOverflowWarn: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
      ['[c5] Oversized by 2 columns', '_', '_'],
    ]),
    validation: 'warn',
    caption: 'Colspan Overflow (Warn) - Check Console',
  },
};

export const InconsistentWidthStrict: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
      ['D', 'E'], // Too few (missing 1)
      ['F', 'G', 'H', 'I'], // Too many (extra 1)
    ]),
    validation: 'strict',
    caption: 'Inconsistent Row Widths (Strict) - Shows Error',
  },
};

export const InconsistentWidthWarn: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C', 'D'],
      ['E', 'F'], // Too few
      ['G', 'H', 'I', 'J', 'K'], // Too many
    ]),
    validation: 'warn',
    caption: 'Inconsistent Row Widths (Warn) - Check Console',
  },
};

export const InvalidSpanValuesStrict: Story = {
  args: {
    children: createTable([
      ['[r0] Invalid', 'Cell'],
      ['[c-1] Invalid', 'Cell 2'],
    ]),
    validation: 'strict',
    caption: 'Invalid Span Values (Strict) - Shows Error',
  },
};

export const MultipleErrorsStrict: Story = {
  args: {
    children: createTable([
      ['[r5c5] Oversized both dimensions', '_', '_'],
      ['_', 'B', 'C'],
      ['D'], // Inconsistent width
    ]),
    validation: 'strict',
    caption: 'Multiple Validation Errors (Strict)',
  },
};

export const OrphanedPlaceholderStrict: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
      ['D', '_', 'F'], // Orphaned placeholder - not associated with any span
    ]),
    validation: 'strict',
    caption: 'Orphaned Placeholder (Strict) - Shows Error',
  },
};

export const OrphanedPlaceholderWarn: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
      ['D', '_', 'F'], // Orphaned placeholder
      ['G', 'H', '_'], // Another orphaned placeholder
    ]),
    validation: 'warn',
    caption: 'Orphaned Placeholders (Warn) - Check Console',
  },
};

export const InsufficientColspanPlaceholdersStrict: Story = {
  args: {
    children: createTable([
      ['A', 'B', 'C'],
      ['[c3] Spans 3 columns', 'D', 'E'], // Only has 'D' after it, needs 2 placeholders
    ]),
    validation: 'strict',
    caption: 'Insufficient Colspan Placeholders (Strict) - Shows Error',
  },
};

export const InsufficientRowspanPlaceholdersStrict: Story = {
  args: {
    children: createTable([
      ['[r3] Spans 3 rows', 'B', 'C'],
      ['A2', 'B2', 'C2'], // Missing placeholder in column 0
      ['A3', 'B3', 'C3'], // Missing placeholder in column 0
    ]),
    validation: 'strict',
    caption: 'Insufficient Rowspan Placeholders (Strict) - Shows Error',
  },
};

export const ValidationOff: Story = {
  args: {
    children: createTable([
      ['[r5] Oversized by 3', 'Cell'],
      ['_', 'Cell 2'],
    ]),
    validation: 'off',
    caption: 'Validation Off - No Warnings',
  },
};

export const ValidTableNoErrors: Story = {
  args: {
    children: createTable([
      ['[r2] A', 'B', 'C'],
      ['_', '[c2] D-E', '_'],
      ['F', 'G', 'H'],
    ]),
    validation: 'strict',
    caption: 'Valid Table - No Errors',
  },
};
