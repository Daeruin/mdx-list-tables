# Contributing to MDX List Tables

Thank you for your interest in contributing to mdx-list-tables. This guide covers the development workflow, testing strategy, and contribution guidelines.

## Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Daeruin/mdx-list-tables.git
cd mdx-list-tables

# Install dependencies
npm install

# Run tests to verify setup
npm test
```

## Project Structure

```
mdx-list-tables/
├── ListTable.tsx           # Main component source
├── test.ts                 # Unit tests
├── test.a11y.ts           # Accessibility tests
├── dist/                   # Compiled output (generated)
├── docs/                   # Documentation site (Docusaurus)
└── examples/
    └── storybook/          # Visual testing environment
```

## Testing Strategy

The component uses a multi-layered testing approach to ensure correctness across different environments.

### Layer 1: Unit Tests (Jest)

**Purpose**: Validate component behavior, grid logic, and validation

**Location**: `test.ts`, `test.a11y.ts`

**Run tests**:
```bash
npm test
```

**Coverage**:
- Rowspan/colspan rendering
- Placeholder consumption
- Caption rendering
- Section structure (thead/tbody/tfoot)
- Header scope attributes
- Validation warnings
- Complex merged cells across sections
- Error detection (orphaned placeholders, overflow, inconsistent widths)
- Accessibility compliance (8 tests with axe-core)

**When to add unit tests**:
- New features or props
- Bug fixes
- Edge cases discovered
- Validation rule changes

### Layer 2: Visual Testing (Storybook)

**Purpose**: Interactive development and visual regression testing

**Location**: `examples/storybook/`

**Start Storybook**:
```bash
cd examples/storybook
npm install
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006)

**Coverage**:
- 42+ interactive stories across 4 categories
- Standard cases (basic, rowspan, colspan, complex)
- Edge cases (single cell/row/column, empty content)
- Validation modes (strict/warn/off)
- Rich content (formatted text, multiline, code blocks)
- Performance tests (large tables)

**Visual features**:
- Color-coded merged cells (yellow=rowspan, blue=colspan, purple=both)
- Thicker borders on merged cells
- Dark mode support

**When to add stories**:
- New visual variations
- Complex content examples
- Edge cases that need visual verification
- Performance scenarios

**Build for deployment**:
```bash
npm run build-storybook
```

Outputs to `storybook-static/`

### Layer 3: Integration Testing (Docusaurus)

**Purpose**: Validate real-world MDX integration and production builds

**Location**: `docs/` (formerly `examples/docusaurus/`)

**Start docs site**:
```bash
cd docs
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

**Coverage**:
- Real MDX parsing pipeline
- 13+ documentation pages with live examples
- Theme integration
- Build process validation
- Production-like environment

**When to update Docusaurus**:
- Documentation changes
- New API examples
- Real-world use case demonstrations
- Integration issues discovered

**Build for deployment**:
```bash
npm run build
```

Outputs to `build/`

### Testing Coverage Matrix

| Test Type | Unit | Storybook | Docusaurus |
|-----------|------|-----------|------------|
| Component logic | ✓ | | |
| Grid placement | ✓ | | |
| Validation | ✓ | ✓ | |
| Accessibility | ✓ | | |
| Visual rendering | | ✓ | ✓ |
| MDX parsing | | | ✓ |
| Rich content | ✓ | ✓ | ✓ |
| Edge cases | ✓ | ✓ | |
| Real-world use | | ✓ | ✓ |
| Build process | | ✓ | ✓ |

### Why Multiple Testing Layers?

**Unit tests alone miss**:
- Visual regressions
- MDX parser integration issues
- Framework-specific problems
- Real-world usage patterns

**Storybook alone misses**:
- Automated validation
- Accessibility compliance
- Actual MDX compilation
- Production build issues

**Docusaurus alone misses**:
- Rapid iteration
- Component isolation
- Automated testing
- Visual edge cases

All three layers together provide comprehensive coverage.

## Development Workflow

### 1. Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to `ListTable.tsx`

3. Run unit tests:
   ```bash
   npm test
   ```

4. Test visually in Storybook:
   ```bash
   cd examples/storybook
   npm run storybook
   ```

5. Verify in Docusaurus if MDX-related:
   ```bash
   cd docs
   npm start
   ```

### 2. Adding Tests

**For new features**:
- Add unit tests to `test.ts`
- Add Storybook stories if visual
- Add Docusaurus examples if user-facing

**For bug fixes**:
- Add failing test first
- Fix the bug
- Verify test passes

**For accessibility**:
- Add tests to `test.a11y.ts`
- Use jest-axe matchers
- Test with screen readers if possible

### 3. Building

```bash
# Build component
npm run build

# Verify dist/ output
ls -la dist/

# Test local installation
cd /tmp
npm init -y
npm install /path/to/mdx-list-tables
```

### 4. Documentation

When adding features:
- Update API reference in docs
- Add examples to Docusaurus
- Update README if user-facing
- Add JSDoc comments to props

### 5. Submitting Pull Requests

**Before submitting**:
- [ ] All unit tests pass (`npm test`)
- [ ] No accessibility violations (`test.a11y.ts` passes)
- [ ] Storybook builds without errors
- [ ] Docusaurus builds without errors
- [ ] Code follows existing style
- [ ] Documentation updated
- [ ] CHANGELOG updated (if applicable)

**PR description should include**:
- What changed and why
- Screenshots for visual changes
- Test coverage added
- Breaking changes (if any)

## Code Style

### TypeScript

- Use strict mode
- Prefer `const` over `let`
- Explicit types for props and public APIs
- Avoid `any` except for React.Children utilities

### React

- Functional components only
- Use hooks appropriately
- Minimize re-renders
- Avoid prop drilling

### Comments

- Document "why", not "what"
- JSDoc for public APIs
- Inline comments for complex logic
- Remove commented-out code

## Accessibility Guidelines

This component generates semantic HTML tables. All changes must maintain accessibility:

### Required practices:
- Use `<th>` for headers with correct `scope` attributes
- Include `<caption>` support
- Proper `<thead>`, `<tbody>`, `<tfoot>` sections
- Valid rowspan/colspan attributes
- No empty header cells (fails axe audit)

### Testing:
- Run `npm test` to execute axe-core tests
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation
- Check color contrast if adding styles

## Release Process

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes

### Pre-release Tags

- **Alpha** (0.1.0-alpha.0): Early testing, unstable
- **Beta** (0.1.0-beta.0): Feature complete, testing
- **RC** (1.0.0-rc.0): Release candidate, final testing

### Publishing Checklist

1. Run full test suite: `npm test`
2. Build component: `npm run build`
3. Verify package contents: `npm pack --dry-run`
4. Update version: `npm version [major|minor|patch]`
5. Publish: `npm publish` (or `npm publish --tag alpha`)
6. Create GitHub release with changelog
7. Update documentation site

## Troubleshooting

### Tests Failing

**"Cannot find module"**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Unexpected token"**:
- Check TypeScript syntax
- Verify jest.config.js is correct

**Accessibility violations**:
- Check for empty `<th>` elements
- Verify `scope` attributes
- Review axe-core error messages

### Storybook Issues

**Port already in use**:
```bash
npm run storybook -- -p 6007
```

**Module not found**:
```bash
cd examples/storybook
rm -rf node_modules package-lock.json
npm install
```

**Component not updating**:
- Restart Storybook
- Clear browser cache

### Docusaurus Issues

**Cache problems**:
```bash
cd docs
npm run clear
npm start
```

**Build failures**:
```bash
rm -rf build .docusaurus
npm run build
```

**Component not updating**:
- Restart dev server after changing source
- Docusaurus caches aggressively

## Getting Help

- Check existing [Issues](https://github.com/Daeruin/mdx-list-tables/issues)
- Review [Discussions](https://github.com/Daeruin/mdx-list-tables/discussions)
- Read the [documentation](https://Daeruin.github.io/mdx-list-tables)

## Code of Conduct

Be respectful, inclusive, and constructive. We welcome contributors of all experience levels.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
