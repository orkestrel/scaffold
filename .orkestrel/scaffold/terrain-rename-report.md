# Unit T2 report — follow the layer's renamed readers in terrain's suite

## Installed build proof

```
$ grep -c readContrast node_modules/@orkestrel/test/dist/src/browser/index.js
5
$ grep -c "export declare function contrast(" node_modules/@orkestrel/test/dist/src/browser/index.d.ts
0
```

## Files inspected and renames applied

Every file under `tests/` importing from `@orkestrel/test/browser` was checked for a hit against
the rename table (`contrast(`, `style(`, `token(`, `rootToken(`, `pixels(`, `rgba(`, `colorEqual(`,
`portfolio.states`):

- `tests/app/browser/integration.test.ts` — 4 renames: import `contrast` → `readContrast`, import
  `style` → `readStyle`, and 3 call sites (`readStyle` at line 244, `readContrast` at lines 479,
  516, 534).
- `tests/app/browser/styles/tokens.test.ts` — import block renamed (`pixels` → `readPixels`,
  `rootToken` → `readRootToken`, `style` → `readStyle`); 21 call-site renames plus the doc comment
  naming the readers.
- `tests/app/browser/setup.ts` — imports `clickAccessible`, `readPage`, `readPerception`, `readText`,
  `resolveRendered`, `waitForFrame` from `@orkestrel/test/browser`; none are in the rename table. No
  change.
- `tests/setupBrowser.ts` — no import from `@orkestrel/test/browser`. No change.
- `tests/setupBrowser.test.ts` — no import from `@orkestrel/test/browser`; its one hit,
  `rgba(0, 0, 0, 0)` at line 34, is a CSS literal inside a string and keeps its text per the brief.
  No change.
- `tests/app/browser/components/BuildingTable.test.ts` — imports `commitInput`, `typeInput` from
  `@orkestrel/test/browser`; neither is in the rename table. No change.
- `integration.test.ts`'s `createPortfolio({ states: STATES, ... })` call keeps `states` as the
  option name per the brief; the file contains no `portfolio.states` member read.

No other file under `tests/` imports `@orkestrel/test/browser`.

## Gate and run readings

```
$ npm run check
exit 0 (tsc --noEmit, check:app:core, check:app:browser all clean)

$ npm run lint:check
exit 0 (oxlint --deny-warnings, no findings)

$ VITE_VARIANT=light-1280 npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts
Test Files  1 passed (1)
Tests  13 passed | 1 skipped (14)

$ VITE_VARIANT=dark-390 npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts
Test Files  1 passed (1)
Tests  13 passed | 1 skipped (14)

$ VITE_VARIANT=light-1280 npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/styles/tokens.test.ts
Test Files  1 passed (1)
Tests  6 passed (6)

$ npm run format:check
All matched files use the correct format. (219 files)
```

## git diff --stat

```
 tests/app/browser/integration.test.ts   | 12 ++++----
 tests/app/browser/styles/tokens.test.ts | 52 ++++++++++++++++-----------------
 2 files changed, 32 insertions(+), 32 deletions(-)
```

## git status --porcelain

```
M  package-lock.json
 M tests/app/browser/integration.test.ts
 M tests/app/browser/styles/tokens.test.ts
```

`package-lock.json` was staged by the user before this unit launched and was not touched. Nothing
was committed.

## Acceptance criteria

1. No old name from the table is called anywhere under `tests/` — confirmed by
   `grep -n '\bcontrast\(|\bstyle\(|\btoken\(|\brootToken\(|\bpixels\(|colorEqual\(|portfolio\.states' tests/`
   returning no matches after the edits.
2. `check`, `lint:check`, and `format:check` exit 0; the three targeted runs (`light-1280` and
   `dark-390` for `integration.test.ts`, `light-1280` for `tokens.test.ts`) are green, as shown
   above.
