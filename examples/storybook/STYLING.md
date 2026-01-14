# Storybook Table Styling Guide

The Storybook examples include custom CSS to make table structures and merged cells clearly visible.

## Visual Indicators

### Cell Background Colors

Merged cells are highlighted with subtle background colors to make the table structure easy to understand:

| Cell Type | Background Color | Example Use Case |
|-----------|------------------|------------------|
| **Rowspan** | 🟡 Yellow tint (`#fff9e6`) | Category spanning multiple rows |
| **Colspan** | 🔵 Blue tint (`#e6f3ff`) | Header spanning multiple columns |
| **Both** | 🟣 Purple tint (`#f0e6ff`) | Title cell spanning rows and columns |
| Regular | White / Default | Standard table cells |

### Border Thickness

- **Regular cells**: 1px solid border
- **Merged cells**: 2px solid border (easier to spot)
- **Headers**: 2px bottom border
- **Footers**: 2px top border

## Example Visualization

```
┌────────────────┬──────────┬──────────┐
│ [r2] Category  │ Item 1   │ Item 2   │ ← Yellow bg (rowspan)
│ (yellow)       ├──────────┼──────────┤
│                │ Item 3   │ Item 4   │
├────────────────┴──────────┴──────────┤
│ [c3] Total (blue)                    │ ← Blue bg (colspan)
└──────────────────────────────────────┘
```

## Color Scheme

### Light Mode (Default)
- Regular cells: White background
- Headers: Light gray (`#f5f5f5`)
- Borders: Gray (`#ddd`)
- Rowspan cells: Light yellow
- Colspan cells: Light blue
- Combined span: Light purple

### Dark Mode
Automatically switches when system dark mode is enabled:
- Regular cells: Dark background
- Headers: Darker gray (`#2a2a2a`)
- Borders: Dark gray (`#444`)
- Merged cells: Darker tinted backgrounds for visibility

## Customizing Styles

The styles are defined in [`.storybook/preview-head.html`](.storybook/preview-head.html).

To modify:

1. Edit `.storybook/preview-head.html`
2. Adjust colors, borders, or other styles
3. Run `npm run clean && npm run storybook` to see changes

### Common Customizations

**Change merged cell colors:**
```css
td[rowspan]:not([rowspan="1"]) {
  background-color: #yourcolor;
}
```

**Adjust border thickness:**
```css
th, td {
  border: 2px solid #ddd;  /* Make all borders thicker */
}
```

**Remove color highlighting:**
```css
td[rowspan]:not([rowspan="1"]),
td[colspan]:not([colspan="1"]) {
  background-color: transparent;  /* No background color */
}
```

## Why These Colors?

- **Yellow for rowspan**: Vertical emphasis, easy to track down a column
- **Blue for colspan**: Horizontal emphasis, follows the eye left-to-right
- **Purple for both**: Distinctive color that combines the row and column concepts
- **Subtle tints**: Not overwhelming, maintains readability of cell content

## Accessibility

All background colors:
- ✅ Meet WCAG AA contrast requirements for text
- ✅ Work in both light and dark modes
- ✅ Are distinguishable for most color vision deficiencies
- ✅ Provide additional visual cue beyond just the visible cell merging

The color coding is supplementary to the actual cell merging, so users who can't distinguish colors can still see the table structure through the merged cell rendering itself.

## Browser Support

The styles use standard CSS and work in all modern browsers:
- Chrome/Edge/Brave (latest)
- Firefox (latest)
- Safari (latest)
- All browsers supporting CSS attribute selectors and media queries
