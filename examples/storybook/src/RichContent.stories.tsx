import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListTable } from '../../../ListTable';

const meta = {
  title: 'ListTable/Rich Content',
  component: ListTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create table with JSX content
const createRichTable = (rows: React.ReactNode[][]) => {
  return React.createElement('ul', null,
    ...rows.map((row, i) =>
      React.createElement('li', { key: i },
        React.createElement('ul', null,
          ...row.map((cell, j) => React.createElement('li', { key: j }, cell))
        )
      )
    )
  );
};

export const MultiLineText: Story = {
  args: {
    children: createRichTable([
      ['Feature', 'Description'],
      [
        'Authentication',
        <>
          Supports multiple methods:
          <br />• OAuth 2.0
          <br />• JWT tokens
          <br />• API keys
        </>
      ],
      [
        'Database',
        <>
          Compatible with:
          <br />• PostgreSQL 12+
          <br />• MySQL 8+
          <br />• SQLite 3
        </>
      ],
    ]),
    headerRows: 1,
    caption: 'Multi-line Text in Cells',
    validation: 'strict',
  },
};

export const FormattedText: Story = {
  args: {
    children: createRichTable([
      ['Property', 'Type', 'Description'],
      [
        <>name</>,
        <code>string</code>,
        <>
          The <strong>unique</strong> identifier for the user.
          <br />
          <em>Must be alphanumeric.</em>
        </>
      ],
      [
        <>age</>,
        <code>number</code>,
        <>
          User's age in years.
          <br />
          <em>Optional field.</em>
        </>
      ],
      [
        <>email</>,
        <code>string</code>,
        <>
          Contact email address.
          <br />
          <strong>Required</strong> for verification.
        </>
      ],
    ]),
    headerRows: 1,
    caption: 'API Reference with Formatted Text',
    validation: 'strict',
  },
};

export const CodeInCells: Story = {
  args: {
    children: createRichTable([
      ['Method', 'Example', 'Returns'],
      [
        <code>getUser(id)</code>,
        <pre style={{ margin: 0, fontSize: '0.85em' }}>
{`const user =
  await getUser(123);`}
        </pre>,
        <code>Promise&lt;User&gt;</code>
      ],
      [
        <code>deleteUser(id)</code>,
        <pre style={{ margin: 0, fontSize: '0.85em' }}>
{`await deleteUser(123);`}
        </pre>,
        <code>Promise&lt;void&gt;</code>
      ],
    ]),
    headerRows: 1,
    caption: 'Code Examples in Cells',
    validation: 'strict',
  },
};

export const ListsInCells: Story = {
  args: {
    children: createRichTable([
      ['Package', 'Features', 'Price'],
      [
        'Basic',
        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
          <li>1 user</li>
          <li>10 GB storage</li>
          <li>Email support</li>
        </ul>,
        '$9/month'
      ],
      [
        'Pro',
        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
          <li>10 users</li>
          <li>100 GB storage</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
        </ul>,
        '$29/month'
      ],
    ]),
    headerRows: 1,
    caption: 'Lists within Table Cells',
    validation: 'strict',
  },
};

export const LinksAndImages: Story = {
  args: {
    children: createRichTable([
      ['Icon', 'Tool', 'Documentation'],
      [
        '🚀',
        'React',
        <a href="https://react.dev" target="_blank" rel="noopener">react.dev</a>
      ],
      [
        '⚡',
        'Vite',
        <a href="https://vitejs.dev" target="_blank" rel="noopener">vitejs.dev</a>
      ],
      [
        '📖',
        'Storybook',
        <a href="https://storybook.js.org" target="_blank" rel="noopener">storybook.js.org</a>
      ],
    ]),
    headerRows: 1,
    caption: 'Links and Special Characters',
    validation: 'strict',
  },
};

export const ComplexAPIReference: Story = {
  args: {
    children: createRichTable([
      ['[c3] User Management API', '_', '_'],
      ['Endpoint', 'Method', 'Description'],
      [
        <code>/api/users</code>,
        <>
          <strong>GET</strong>
          <br />
          <strong>POST</strong>
        </>,
        <>
          <strong>GET:</strong> List all users
          <br />
          <em>Returns: User[]</em>
          <br />
          <br />
          <strong>POST:</strong> Create new user
          <br />
          <em>Body: {'{ name, email }'}</em>
        </>
      ],
      [
        <code>/api/users/:id</code>,
        <>
          <strong>GET</strong>
          <br />
          <strong>PUT</strong>
          <br />
          <strong>DELETE</strong>
        </>,
        <>
          <strong>GET:</strong> Get user by ID
          <br />
          <strong>PUT:</strong> Update user
          <br />
          <strong>DELETE:</strong> Remove user
        </>
      ],
    ]),
    headerRows: 2,
    caption: 'Complex API Reference Table',
    validation: 'strict',
  },
};

export const MixedContentWithSpans: Story = {
  args: {
    children: createRichTable([
      ['Component', 'Property', 'Type', 'Description'],
      [
        '[r2] Button',
        'variant',
        <code>'primary' | 'secondary'</code>,
        'Visual style variant'
      ],
      [
        '_',
        'disabled',
        <code>boolean</code>,
        <>
          Disables the button
          <br />
          <em>Optional, defaults to false</em>
        </>
      ],
      [
        '[r2] Input',
        'value',
        <code>string</code>,
        <>
          Current input value
          <br />
          <strong>Controlled component</strong>
        </>
      ],
      [
        '_',
        'onChange',
        <code>{'(value: string) => void'}</code>,
        <>
          Change handler
          <br />
          <strong>Example:</strong>
          <br />
          <code>{'onChange={(v) => setState(v)}'}</code>
        </>
      ],
    ]),
    headerRows: 1,
    headerColumns: 1,
    caption: 'Component Props with Rich Content and Spans',
    validation: 'strict',
  },
};
