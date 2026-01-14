import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ListTable } from './ListTable';

expect.extend(toHaveNoViolations);

describe('ListTable Accessibility', () => {
  test('basic table has no accessibility violations', async () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Header 1'),
          React.createElement('li', null, 'Header 2')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Data 1'),
          React.createElement('li', null, 'Data 2')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, { headerRows: 1, children: mdxChildren })
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('table with caption has no accessibility violations', async () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Name'),
          React.createElement('li', null, 'Age')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'John'),
          React.createElement('li', null, '30')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, {
        caption: 'User Information',
        headerRows: 1,
        children: mdxChildren
      })
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('table with merged cells has no accessibility violations', async () => {
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
      )
    );

    const { container } = render(
      React.createElement(ListTable, {
        headerRows: 1,
        headerColumns: 1,
        caption: 'Q1 Revenue Report',
        children: mdxChildren
      })
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('table with thead, tbody, and tfoot has no accessibility violations', async () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Product'),
          React.createElement('li', null, 'Price')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Widget'),
          React.createElement('li', null, '$10')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Gadget'),
          React.createElement('li', null, '$20')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Total'),
          React.createElement('li', null, '$30')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, {
        headerRows: 1,
        footerRows: 1,
        children: mdxChildren
      })
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('table with row and column headers has no accessibility violations', async () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Metric'),
          React.createElement('li', null, 'Q1'),
          React.createElement('li', null, 'Q2')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Sales'),
          React.createElement('li', null, '$100k'),
          React.createElement('li', null, '$120k')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Profit'),
          React.createElement('li', null, '$20k'),
          React.createElement('li', null, '$30k')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, {
        headerRows: 1,
        headerColumns: 1,
        children: mdxChildren
      })
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('empty table has no accessibility violations', async () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Single Cell')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, { children: mdxChildren })
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('verifies proper scope attributes on header cells', () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Header'),
          React.createElement('li', null, 'Column 1'),
          React.createElement('li', null, 'Column 2')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Row 1'),
          React.createElement('li', null, 'Data 1'),
          React.createElement('li', null, 'Data 2')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, {
        headerRows: 1,
        headerColumns: 1,
        children: mdxChildren
      })
    );

    const headerCells = container.querySelectorAll('th');

    // Column headers should have scope="col"
    const columnHeaders = Array.from(headerCells).filter(th =>
      th.textContent === 'Column 1' || th.textContent === 'Column 2'
    );
    columnHeaders.forEach(th => {
      expect(th).toHaveAttribute('scope', 'col');
    });

    // Row headers should have scope="row"
    const rowHeaders = Array.from(headerCells).filter(th =>
      th.textContent === 'Row 1'
    );
    rowHeaders.forEach(th => {
      expect(th).toHaveAttribute('scope', 'row');
    });
  });

  test('verifies semantic HTML structure', () => {
    const mdxChildren = React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Header'),
          React.createElement('li', null, 'Value')
        )
      ),
      React.createElement('li', null,
        React.createElement('ul', null,
          React.createElement('li', null, 'Data'),
          React.createElement('li', null, '100')
        )
      )
    );

    const { container } = render(
      React.createElement(ListTable, {
        headerRows: 1,
        caption: 'Test Table',
        children: mdxChildren
      })
    );

    // Verify proper semantic structure
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('caption')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelector('th')).toBeInTheDocument();
    expect(container.querySelector('td')).toBeInTheDocument();
  });
});
