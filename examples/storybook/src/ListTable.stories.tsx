import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListTable } from '../../../ListTable';

const meta = {
  title: 'ListTable/Standard Cases',
  component: ListTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create MDX-like structure from arrays
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

export const BasicTable: Story = {
  args: {
    children: createTable([
      ['Name', 'Age', 'City'],
      ['Alice', '30', 'New York'],
      ['Bob', '25', 'San Francisco'],
    ]),
    headerRows: 1,
    caption: 'Basic Table',
    validation: 'strict',
  },
};

export const RowSpanExample: Story = {
  args: {
    children: createTable([
      ['Product', 'Q1', 'Q2'],
      ['[r2] Electronics', '$100', '$150'],
      ['_', '$120', '$180'],
      ['Furniture', '$200', '$250'],
    ]),
    headerRows: 1,
    caption: 'RowSpan Example - Electronics category spans 2 rows',
    validation: 'strict',
  },
};

export const ColSpanExample: Story = {
  args: {
    children: createTable([
      ['Month', '[c2] Revenue', '_'],
      ['January', 'Sales', 'Services'],
      ['February', '$5000', '$3000'],
    ]),
    headerRows: 2,
    caption: 'ColSpan Example - Revenue header spans 2 columns',
    validation: 'strict',
  },
};

export const ComplexMergedCells: Story = {
  args: {
    children: createTable([
      ['[r2] Quarter', '[c2] Revenue', '_', '[c2] Expenses', '_'],
      ['_', 'Sales', 'Services', 'Marketing', 'Operations'],
      ['Q1', '$50k', '$30k', '$10k', '$15k'],
      ['Q2', '$60k', '$35k', '$12k', '$18k'],
    ]),
    headerRows: 2,
    headerColumns: 1,
    caption: 'Complex Table with Multiple Merged Cells',
    validation: 'strict',
  },
};

export const WithFooter: Story = {
  args: {
    children: createTable([
      ['Item', 'Price', 'Quantity'],
      ['Widget A', '$10', '100'],
      ['Widget B', '$15', '75'],
      ['[c2] Total', '_', '$2,625'],
    ]),
    headerRows: 1,
    footerRows: 1,
    caption: 'Table with Footer',
    validation: 'strict',
  },
};

export const HeadersAndFooters: Story = {
  args: {
    children: createTable([
      ['[c3] Financial Report 2024', '_', '_'],
      ['Month', 'Income', 'Expenses'],
      ['January', '$10,000', '$7,000'],
      ['February', '$12,000', '$8,000'],
      ['March', '$11,000', '$7,500'],
      ['[c2] Total', '_', '$30,500'],
    ]),
    headerRows: 2,
    footerRows: 1,
    caption: 'Table with Header Sections and Footer',
    validation: 'strict',
  },
};

export const CombinedSpansExample: Story = {
  args: {
    children: createTable([
      ['[r2] Product', '[c2] Quarter', '_', '[r2] Total'],
      ['_', 'Q1', 'Q2', '_'],
      ['[r2] Widget', '$100', '$150', '$250'],
      ['_', '$110', '$160', '$270'],
      ['Gadget', '$200', '$250', '$450'],
    ]),
    headerRows: 2,
    caption: 'Combined Spans - Colspan in header row 1, rowspan in body',
    validation: 'strict',
  },
};

export const ComparisonMatrix: Story = {
  args: {
    children: createTable([
      ['Feature', 'Free', 'Pro', 'Enterprise'],
      ['Storage', '10 GB', '100 GB', 'Unlimited'],
      ['Users', '1', '10', 'Unlimited'],
      ['Support', 'Community', 'Email', '24/7 Phone'],
      ['[r2c4] Custom features available in all plans', '_', '_', '_'],
      ['_', '_', '_', '_'],
    ]),
    headerRows: 1,
    footerRows: 2,
    caption: 'Pricing Comparison Matrix',
    validation: 'strict',
  },
};
