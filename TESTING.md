# Testing Strategy for mdx-list-tables

This document outlines the comprehensive testing approach for the ListTable component.

## Testing Layers

### 1. Unit Tests (Jest)
**Location:** `test.ts`
**What they test:** Component logic in isolation
**Limitations:** ⚠️ Bypasses MDX parsing - uses `React.createElement` directly

```bash
npm test
```

**Coverage:**
- ✅ Rowspan rendering and placeholder handling
- ✅ Caption rendering
- ✅ thead/tbody/tfoot sections
- ✅ Validation warnings
- ✅ Complex merged cells across sections

### 2. Visual Tests (Storybook)
**Location:** `examples/storybook/`
**What they test:** Visual rendering and interaction

```bash
cd examples/storybook
npm install
npm run storybook
```

**Limitations:** ⚠️ Also bypasses MDX parsing (uses `React.createElement`)

**Purpose:**
- Visual regression testing
- Interactive prop exploration
- Color-coded merged cell visualization
- Developer documentation

**Coverage:**
- 42+ stories covering all features
- Edge cases and validation modes
- Rich content examples
- Performance tests (large tables)

### 3. End-to-End Tests (Docusaurus)
**Location:** `examples/docusaurus/`
**What they test:** Real-world MDX integration

```bash
cd examples/docusaurus
npm install
npm start
```

**Why this is critical:** This is the ONLY test environment that uses actual MDX files with markdown list syntax. Due to Jest's CommonJS environment and the complexity of transforming @mdx-js/mdx's ES modules, full MDX integration testing is best done through Docusaurus rather than Jest.

**Coverage:**
- ✅ Real MDX parsing in production-like environment
- ✅ Full MDX syntax → React → HTML pipeline
- ✅ Build process validation
- ✅ Theme integration
- ✅ 13 documentation pages with various table patterns
- ✅ All validation error types in real MDX context

## What Each Layer Tests

| Feature | Unit | Storybook | Docusaurus |
|---------|------|-----------|------------|
| Component Logic | ✅ | ✅ | ✅ |
| MDX Parsing | ❌ | ❌ | ✅ |
| Visual Output | ❌ | ✅ | ✅ |
| Build Process | ❌ | ✅ | ✅ |
| Real-world Usage | ❌ | ❌ | ✅ |

## Running All Tests

### Quick Check
```bash
# Unit tests
npm test

# Visual tests
cd examples/storybook && npm run storybook
```

### Full Test Suite
```bash
# 1. Unit tests
npm test

# 2. Storybook visual tests
cd examples/storybook
npm install
npm run build-storybook

# 3. Docusaurus E2E tests (includes full MDX integration)
cd ../docusaurus
npm install
npm run build

# Return to root
cd ../..
```

## Validation Test Coverage

All validation errors have corresponding tests:

### Rowspan Validation
- ✅ **Unit test:** `validates and warns on rowspan overflow`
- ✅ **Storybook:** `RowspanOverflowStrict`, `RowspanOverflowWarn`
- ✅ **Docusaurus:** Full MDX integration testing

### Colspan Validation
- ✅ **Storybook:** `ColspanOverflowStrict`, `ColspanOverflowWarn`
- ✅ **Docusaurus:** Full MDX integration testing

### Inconsistent Width Validation
- ✅ **Storybook:** `InconsistentWidthStrict`, `InconsistentWidthWarn`
- ✅ **Docusaurus:** Full MDX integration testing

## Why Multiple Test Layers?

1. **Unit Tests** - Fast feedback, test component logic in isolation
2. **Storybook** - Visual validation and interactive documentation
3. **Docusaurus** - Real-world MDX integration and E2E validation

## Common Issues

### Issue: Tests pass but Docusaurus fails
**Cause:** MDX parsing differences between test helpers and real MDX
**Solution:** Always test in Docusaurus before releasing

### Issue: Storybook looks wrong but tests pass
**Cause:** Missing CSS or styling issues not caught by tests
**Solution:** Storybook visual review is required

### Issue: MDX parsing errors
**Cause:** MDX syntax issues or version mismatches
**Solution:** Test in Docusaurus for full MDX validation. Jest's CommonJS environment doesn't support @mdx-js/mdx's ES modules.

## Test Maintenance

### Adding New Features

When adding a new feature:
1. ✅ Add unit test for logic in [test.ts](test.ts)
2. ✅ Add Storybook story for visual validation in [examples/storybook/src/](examples/storybook/src/)
3. ✅ Add Docusaurus example for real-world MDX usage in [examples/docusaurus/docs/](examples/docusaurus/docs/)
4. ✅ Test full MDX parsing pipeline in Docusaurus

### Adding New Validation

When adding validation:
1. ✅ Add unit test in [test.ts](test.ts)
2. ✅ Add Storybook story with `validation="strict"` in [Validation.stories.tsx](examples/storybook/src/Validation.stories.tsx)
3. ✅ Add Storybook story with `validation="warn"`
4. ✅ Verify error message clarity in both modes
5. ✅ Test in Docusaurus with real MDX content

## Continuous Integration

Recommended CI pipeline:

```yaml
- name: Run tests
  run: npm test

- name: Build Storybook
  run: |
    cd examples/storybook
    npm install
    npm run build-storybook

- name: Build Docusaurus
  run: |
    cd examples/docusaurus
    npm install
    npm run build
```

## Future Improvements

- [ ] Add visual regression testing (e.g., Percy, Chromatic)
- [ ] Add accessibility tests (axe-core)
- [ ] Add performance benchmarks
- [ ] Add cross-browser testing
- [ ] Add snapshot tests for complex tables
