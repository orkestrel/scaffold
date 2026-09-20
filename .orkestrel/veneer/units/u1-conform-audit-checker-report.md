<!-- workflow wf_e0f49ac3-f9d, agent a6f44e139ef38613a, retained 2026-09-20 -->

## Claim 1 — Existence

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | `src/browser/ColorMode.ts` exists | PASS | `veneer/src/browser/ColorMode.ts` |
| 1 | `app/browser/Showcase.ts` exists | PASS | `veneer/app/browser/Showcase.ts` |
| 1 | `tests/src/browser/ColorMode.test.ts` exists | PASS | `veneer/tests/src/browser/ColorMode.test.ts` |
| 1 | `tests/app/browser/Showcase.test.ts` exists | PASS | `veneer/tests/app/browser/Showcase.test.ts` |
| 1 | `tests/setupListeners.ts` exists | PASS | `veneer/tests/setupListeners.ts` |
| 1 | `src/browser/color-mode/`, `app/browser/showcases/`, `tests/src/browser/fixtures/`, `tests/app/browser/showcases/`, `tests/src/browser/color-mode/` absent | PASS | glob over each path returns no match |
| 1 | `src/browser/factories.ts`, `app/browser/factories.ts`, `tests/src/browser/factories.test.ts` absent | PASS | glob over each path returns no match |
| 1 | No `.ts` under any `fixtures/` directory in the tree | PASS | `rg '\.ts$' --glob '**/fixtures/**'` over `veneer` returns no match |

## Claim 2 — Name sweeps

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 2 | `ColorScheme`, `isColorScheme`, `createColorMode`, `createShowcase`, `WORKSPACE_PATH`, `readSpecifiers`, `readForbiddenSource`, `readForbiddenDependency`, `readEscapingImport`, `readImportClosure`, `readFileDigest` (whole word) across `src`, `app`, `tests`, `guides` | PASS (no hits) | grep returns no matches for each |
| 2 | `computeFileDigest` (whole word) across `src`, `app`, `tests`, `guides` | PASS (1 hit, reported) | `veneer/guides/scaffold.md:400` — a vendored scaffold guide mirror naming scaffold's own export; consistent with the claim's own note that this name belongs to scaffold |
| 2 | `COLOR_MODE_KEY = 'color-mode'` | PASS | `veneer/src/browser/constants.ts:5` |
| 2 | Stale `it` title `executes the scheme-validation example verdicts` | PASS | `veneer/tests/guides.test.ts:59` |

## Claim 3 — The entry

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 3 | `app/browser/main.ts` imports from `./Showcase.js`, not `./index.js` | PASS | `veneer/app/browser/main.ts:3` (`import { Showcase } from './Showcase.js'`), no `./index.js` import present |
| 3 | `app/browser/index.html` contains `<title>Veneer</title>` | PASS | `veneer/app/browser/index.html:6` |

## Claim 8 — Barrels and law

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 8 | `src/browser/index.ts` contains only `export * from` lines | PASS | `veneer/src/browser/index.ts:1-4` |
| 8 | `app/browser/index.ts` contains only `export * from` lines | PASS | `veneer/app/browser/index.ts:1-3` |
| 8 | Sweep the rendered diff for `: any`, `as ` outside `as const`, `!.`/`!)`/`!;`, `@ts-`, `eslint-disable`, `export default`, `public `/`private `/`protected ` on a class member | PASS (no hits) | full read of `u1-conform-diff.patch.txt` (lines 1-2301) |
| 8 | `tests/guides.test.ts` changed lines = 3 (one import, two calls) | PASS | `u1-conform-diff.patch.txt:1408-1420` (`isColorScheme`→`isColorModeState` import line, and the two `expect(isColorScheme...)` call lines) |
| 8 | `tests/setupBrowser.ts` changed lines = 2 (destructure, construction) | PASS | `u1-conform-diff.patch.txt:1432,1436` (`const { Showcase } = await import(...)` and `const showcase = new Showcase(host)`) |

## Claim 9 — Scope honesty

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 9 | Every path in `tmp/audit/u1-conform-status.txt` falls under the brief's § Scope Owned globs, its Shared `package.json`, or the checker-brief-approved `package-lock.json` | FAIL | `tests/setupListeners.ts` (new file, `u1-conform-status.txt:33`) matches none of the Owned globs in `.orkestrel/veneer/units/u1-conform-brief.md` § Scope (`src/browser/**`, `app/browser/**`, `tests/src/browser/**`, `tests/app/browser/**`, `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/distribution.test.ts`, `guides/veneer.md`, `guides/README.md`, and the two named-line grants on `tests/setupBrowser.ts`/`tests/guides.test.ts`); every other path in the status output matches an Owned glob or the approved `package.json`/`package-lock.json` pair |

`tests/setupListeners.ts` is the one path the status output carries that the brief's § Scope glob list does not literally cover.
