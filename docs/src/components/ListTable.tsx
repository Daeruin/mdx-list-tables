// Re-export the ListTable component from the main package
// In a real deployment, this would import from the published npm package
// For local testing, we'll use a relative path

import { ListTable as OriginalListTable } from '../../../ListTable';
import React, { ReactElement, ReactNode } from 'react';

// Helper to deeply unwrap all MDX components in the tree
const deepUnwrapMdx = (node: ReactNode): ReactNode => {
  if (!React.isValidElement(node)) {
    return node;
  }

  // If it's a function component (MDX wrapper), unwrap it
  if (typeof node.type === 'function') {
    try {
      const Component = node.type as any;
      const rendered = Component(node.props);
      // Recursively unwrap the rendered result
      return deepUnwrapMdx(rendered);
    } catch (e) {
      console.error('Failed to unwrap MDX component:', e);
      return node;
    }
  }

  // If it's an HTML element, unwrap its children too
  if (typeof node.type === 'string') {
    const unwrappedChildren = React.Children.map(node.props.children, (child) => {
      return deepUnwrapMdx(child);
    });

    // Return a cloned element with unwrapped children
    return React.cloneElement(node, {}, unwrappedChildren);
  }

  return node;
};

// Wrapper to handle MDX v3 component wrapping
export const ListTable = (props: any) => {
  let { children, ...restProps } = props;

  // Deeply unwrap all MDX components to get plain HTML elements
  children = deepUnwrapMdx(children);

  return <OriginalListTable {...restProps}>{children}</OriginalListTable>;
};
