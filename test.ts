import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListTable } from './ListTable';

test('renders merged cells correctly and ignores placeholders', () => {
  // Mocking the MDX structure manually for the test
  // Structure: 2x2. Cell(0,0) has rowspan=2. Cell(1,0) is placeholder "_".
  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '[r2] RowSpan'),
        React.createElement('li', null, 'Cell A2')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '_'),
        React.createElement('li', null, 'Cell B2')
      )
    )
  );

  render(React.createElement(ListTable, { children: mdxChildren }));

  // Check that the first cell has rowspan 2
  const spanCell = screen.getByText('RowSpan');
  expect(spanCell).toHaveAttribute('rowspan', '2');

  // Check that "Cell B2" exists
  expect(screen.getByText('Cell B2')).toBeInTheDocument();

  // Check that "_" is NOT rendered
  const placeholder = screen.queryByText('_');
  expect(placeholder).not.toBeInTheDocument();

  // Validate HTML structure (Rows should be correct)
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(2);
  // Row 1 should have 2 cells
  expect(rows[0].children).toHaveLength(2);
  // Row 2 should have 1 cell (because the first slot is taken by the span)
  expect(rows[1].children).toHaveLength(1);
});

test('renders caption when provided', () => {
  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'Header 1'),
        React.createElement('li', null, 'Header 2')
      )
    )
  );

  render(React.createElement(ListTable, { caption: 'Test Caption', headerRows: 1, children: mdxChildren }));

  const caption = screen.getByText('Test Caption');
  expect(caption).toBeInTheDocument();
  expect(caption.tagName).toBe('CAPTION');
});

test('renders thead, tbody, and tfoot sections correctly', () => {
  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'Header'),
        React.createElement('li', null, 'Value')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'Data 1'),
        React.createElement('li', null, '100')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'Total'),
        React.createElement('li', null, '100')
      )
    )
  );

  const { container } = render(
    React.createElement(ListTable, { headerRows: 1, footerRows: 1, children: mdxChildren })
  );

  const thead = container.querySelector('thead');
  const tbody = container.querySelector('tbody');
  const tfoot = container.querySelector('tfoot');

  expect(thead).toBeInTheDocument();
  expect(tbody).toBeInTheDocument();
  expect(tfoot).toBeInTheDocument();

  // Header should have 1 row
  expect(thead?.querySelectorAll('tr')).toHaveLength(1);
  // Body should have 1 row
  expect(tbody?.querySelectorAll('tr')).toHaveLength(1);
  // Footer should have 1 row
  expect(tfoot?.querySelectorAll('tr')).toHaveLength(1);
});

test('validates and warns on rowspan overflow', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '[r5] Oversized'),
        React.createElement('li', null, 'Cell')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '_'),
        React.createElement('li', null, 'Cell 2')
      )
    )
  );

  render(React.createElement(ListTable, { validation: 'warn', children: mdxChildren }));

  expect(consoleWarnSpy).toHaveBeenCalled();
  expect(consoleWarnSpy.mock.calls[0][0]).toContain('rowSpan');
  expect(consoleWarnSpy.mock.calls[0][0]).toContain('extends beyond table bounds');

  consoleWarnSpy.mockRestore();
});

test('renders complex table with merged cells across sections', () => {
  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'Month'),
        React.createElement('li', null, '[c2] Revenue'),
        React.createElement('li', null, '_')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'January'),
        React.createElement('li', null, 'Sales'),
        React.createElement('li', null, 'Services')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '[r2] Q1'),
        React.createElement('li', null, '$5000'),
        React.createElement('li', null, '$3000')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '_'),
        React.createElement('li', null, '$6000'),
        React.createElement('li', null, '$4000')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'Total'),
        React.createElement('li', null, '$11000'),
        React.createElement('li', null, '$7000')
      )
    )
  );

  const { container } = render(
    React.createElement(ListTable, {
      headerRows: 1,
      headerColumns: 1,
      footerRows: 1,
      caption: 'Q1 Revenue',
      children: mdxChildren
    })
  );

  // Check caption
  expect(screen.getByText('Q1 Revenue')).toBeInTheDocument();

  // Check sections exist
  expect(container.querySelector('thead')).toBeInTheDocument();
  expect(container.querySelector('tbody')).toBeInTheDocument();
  expect(container.querySelector('tfoot')).toBeInTheDocument();

  // Check colspan on header
  const revenueHeader = screen.getByText('Revenue');
  expect(revenueHeader).toHaveAttribute('colspan', '2');

  // Check rowspan on Q1
  const q1Cell = screen.getByText('Q1');
  expect(q1Cell).toHaveAttribute('rowspan', '2');
});

test('detects orphaned placeholders', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'A'),
        React.createElement('li', null, 'B'),
        React.createElement('li', null, 'C')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'D'),
        React.createElement('li', null, '_'), // Orphaned placeholder
        React.createElement('li', null, 'F')
      )
    )
  );

  render(React.createElement(ListTable, { validation: 'warn', children: mdxChildren }));

  expect(consoleWarnSpy).toHaveBeenCalled();
  expect(consoleWarnSpy.mock.calls.some(call =>
    call[0].includes('Placeholder found that doesn\'t belong to a rowSpan or colSpan')
  )).toBe(true);

  consoleWarnSpy.mockRestore();
});

test('detects insufficient colspan placeholders', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'A'),
        React.createElement('li', null, 'B'),
        React.createElement('li', null, 'C')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '[c3] Wide'),
        React.createElement('li', null, 'E'), // Should be '_'
        React.createElement('li', null, 'F')  // Should be '_'
      )
    )
  );

  render(React.createElement(ListTable, { validation: 'warn', children: mdxChildren }));

  expect(consoleWarnSpy).toHaveBeenCalled();
  expect(consoleWarnSpy.mock.calls.some(call =>
    call[0].includes('doesn\'t have enough placeholders')
  )).toBe(true);

  consoleWarnSpy.mockRestore();
});

test('detects insufficient rowspan placeholders', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, '[r3] Tall'),
        React.createElement('li', null, 'B')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'A2'), // Should be '_'
        React.createElement('li', null, 'B2')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'A3'), // Should be '_'
        React.createElement('li', null, 'B3')
      )
    )
  );

  render(React.createElement(ListTable, { validation: 'warn', children: mdxChildren }));

  expect(consoleWarnSpy).toHaveBeenCalled();
  expect(consoleWarnSpy.mock.calls.some(call =>
    call[0].includes('doesn\'t have enough placeholders')
  )).toBe(true);

  consoleWarnSpy.mockRestore();
});

test('detects inconsistent row width', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'A'),
        React.createElement('li', null, 'B'),
        React.createElement('li', null, 'C')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'D'),
        React.createElement('li', null, 'E')
        // Missing third cell
      )
    )
  );

  render(React.createElement(ListTable, { validation: 'warn', children: mdxChildren }));

  expect(consoleWarnSpy).toHaveBeenCalled();
  expect(consoleWarnSpy.mock.calls.some(call =>
    call[0].includes('inconsistent width')
  )).toBe(true);

  consoleWarnSpy.mockRestore();
});

test('detects colspan overflow beyond row bounds', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

  const mdxChildren = React.createElement('ul', null,
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'A'),
        React.createElement('li', null, 'B'),
        React.createElement('li', null, 'C')
      )
    ),
    React.createElement('li', null,
      React.createElement('ul', null,
        React.createElement('li', null, 'D'),
        React.createElement('li', null, '[c5] Too wide'), // Only 2 cells remaining
        React.createElement('li', null, '_')
      )
    )
  );

  render(React.createElement(ListTable, { validation: 'warn', children: mdxChildren }));

  expect(consoleWarnSpy).toHaveBeenCalled();
  expect(consoleWarnSpy.mock.calls.some(call =>
    call[0].includes('extends beyond row bounds')
  )).toBe(true);

  consoleWarnSpy.mockRestore();
});
