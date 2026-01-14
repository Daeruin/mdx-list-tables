# Storybook 8 Upgrade

## What Changed

Upgraded from Storybook 7.6.7 to Storybook 8.6.15 (latest).

### Package Updates

```diff
- "@storybook/react": "^7.6.7"
+ "@storybook/react": "^8.6.15"

- "@storybook/react-vite": "^7.6.7"
+ "@storybook/react-vite": "^8.6.15"

- "@storybook/addon-essentials": "^7.6.7"
+ "@storybook/addon-essentials": "^8.6.15"

- "@storybook/addon-links": "^7.6.7"
+ "@storybook/addon-links": "^8.6.15"

- "storybook": "^7.6.7"
+ "storybook": "^8.6.15"

+ "@storybook/test": "^8.6.15"  # New testing utilities
```

## Benefits

✅ **No deprecated dependencies** - Removed warnings about `glob`, `rimraf`, and `inflight`
✅ **Better performance** - Faster build times and dev server
✅ **Latest features** - Access to Storybook 8 improvements
✅ **Security updates** - Latest security patches
✅ **Better testing** - New `@storybook/test` package for component testing

## Breaking Changes

**None for our use case!** The configuration files (`.storybook/main.ts` and `.storybook/preview.ts`) were already compatible with Storybook 8.

All existing stories continue to work without modifications.

## Known Issues

### Development Server Vulnerabilities

```
esbuild  <=0.24.2 (moderate)
vite 0.11.0 - 6.1.6 (moderate)
```

These affect the **local development server only**, not production builds. They're transitive dependencies from Vite and only impact local development security. Since this is a testing/examples environment, the risk is minimal.

**Production builds are not affected** - the built static files in `storybook-static/` don't include these dependencies.

### To Fix (Optional)

If you want to eliminate the warnings:

```bash
npm audit fix --force
```

**Warning:** This will upgrade Vite to v7.x which may have breaking changes. Test thoroughly after upgrading.

## Verification

Build successfully tested:

```bash
npm run build-storybook
# ✓ Built in 2.1s
# Output: storybook-static/
```

All stories render correctly:
- ✅ ListTable/Examples (10 stories)
- ✅ ListTable/Rich Content (7 stories)
- ✅ ListTable/Edge Cases (17 stories)

## Migration Notes

No code changes were required. Storybook 8 maintains backward compatibility with our story format (CSF 3.0).

### What Still Works

- Component Story Format 3.0
- TypeScript configuration
- Vite builder
- All addons (essentials, links)
- Auto-generated docs
- Interactive controls

## Troubleshooting

### "Couldn't find story matching..." Error

If you see errors about missing stories after the upgrade:

```bash
npm run clean  # Clear all caches
npm run storybook  # Restart dev server
```

Also clear your browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows).

### Version Mismatch Warnings

All packages are now at version `8.6.15`. If you see version mismatch warnings, run:

```bash
npm install
```

All dependencies should auto-resolve to the same version.

### Deprecation Warnings

The `DEP0190` warning about child processes is a Node.js warning from Vite/Storybook internals and can be safely ignored. It doesn't affect functionality.

## Next Steps

1. Run `npm install` to get the new dependencies
2. Run `npm run clean` to clear any old caches (if upgrading from v7)
3. Run `npm run storybook` to start the dev server
4. Verify all stories load correctly
5. (Optional) Run `npm run build-storybook` to test production builds

## Resources

- [Storybook 8 Migration Guide](https://storybook.js.org/docs/migration-guide)
- [Storybook 8 Release Notes](https://storybook.js.org/blog/storybook-8/)
- [What's New in Storybook 8](https://storybook.js.org/blog/storybook-8-0/)
