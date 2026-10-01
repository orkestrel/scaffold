Foundation-fix-7 is implemented but incomplete: `npm run test:src:styles` exited 1. The deviation contract requires stopping at that gate. The theme suite passed its 12 tests; the existing styles suite failed during import.

Files changed by this unit:

- `src/styles/_mixins.scss`
- `src/styles/themes/index.scss`
- `src/styles/themes/_default.scss`
- `src/styles/themes/sheet.ts`
- `configs/src/vite.themes.config.ts`
- `package.json`
- `tests/fixtures/styles/pack.scss`
- `tests/fixtures/styles/other.scss`
- `tests/fixtures/styles/bootstrap.scss`
- `tests/fixtures/styles/early.scss`
- `tests/src/styles/themes/index.test.ts`
- `tests/config.test.ts`

The report is written to `tmp/units/foundation-fix-7-report.md`. Existing checkout changes were preserved. No shared or off-limits source file was edited. The existing styles TypeScript include already covers `themes/sheet.ts`, so its configuration needed no edit.

The themes barrel uses `@use '../tokens'` before `@use 'default'`. The inspected `_tokens.scss` declares only the shared layer order, so reuse avoids another authored order statement without importing styles defaults. The built themes sheet contains no `:root` declaration and measures 194 bytes; the styles sheet measures 132 bytes. Both begin with:

```css
@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;
```

The standalone styles build succeeded. The build repeated inside `test:src:styles` also succeeded and left both CSS files in place. The themes wrapper empties only `dist/src/styles/themes`; the package script builds it after the styles wrapper empties `dist/src/styles`.

Validation commands ran in the required order:

| Command | Exit code | Test count |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write src/styles/_mixins.scss src/styles/themes/index.scss src/styles/themes/_default.scss src/styles/themes/sheet.ts configs/src/vite.themes.config.ts package.json tests/fixtures/styles/pack.scss tests/fixtures/styles/other.scss tests/fixtures/styles/bootstrap.scss tests/fixtures/styles/early.scss tests/src/styles/themes/index.test.ts tests/config.test.ts` | 0 | none; 12 files formatted |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npm run check:src:styles` | 0 | none |
| `npx oxlint --config .oxlintrc.json configs/src tests/src/styles tests/config.test.ts tests/setupStyles.ts tests/setupBrowser.test.ts` | 0 | none |
| `npm run build:src:styles` | 0 | none |
| `npm run test:src:styles` | 1 | 12 passed; 1 suite passed and 1 suite failed during import |
| `git status --porcelain` | 0 | none |
| `git diff -- src/styles/_mixins.scss src/styles/themes/index.scss src/styles/themes/_default.scss package.json` | 0 | none |
| `git diff --stat` | 0 | none |

The stop left `npm run test:setup:browser`, `npm run test:config`, `npm run test:policy`, and the scoped formatter `--check` unrun. Their exit codes and test counts are none. No tree-wide build, test, lint, or format command ran. No installation or commit occurred.

Chromium accepted `@scope` and its lower boundary in the executed theme tests. The installed Playwright browser manifest identifies Chromium 153.0.8010.12, revision 1243; the running process version was not separately captured. The theme suite proved the shared order, theme-only blocks, empty default maps, light/dark/light islands, dark-root precedence over Bootstrap, opt-in isolation, the nested-pack selector boundary, and the inheritance limit. It also proved the earlier-layer control loses to Bootstrap and carries the same declarations as the theme fixture. Each behavioral case ran in both adoption orders. Sass accepted custom-property map keys and emitted the expected values through explicit property and value interpolation.

Helpers declared: none. The installed `@orkestrel/test@0.0.24` browser declarations export `readToken(element: Element, name: string): string` and `render(markup: string): HTMLDivElement`. The tests import those exports, use `createTeardown` from `@orkestrel/test`, and reuse the existing CSSOM helpers. Neither setup module nor its proof needed an edit.

Temporary probes written: none. Probe deletions: none. This unit left nothing in `tmp/probes/`. The permanent earlier-layer fixture is the negative control.

Deviation:

- Expected: `npm run test:src:styles` exits 0 and permits the remaining gates.
- Found: it exited 1 after Vite optimized `@orkestrel/test/browser`, reported an unexpected test reload, and failed to import `tests/src/styles/index.test.ts`.
- Evidence: Vite printed `optimized dependencies changed. reloading`. Vitest reported `TypeError: Cannot read properties of undefined (reading 'config')` at `tests/src/styles/index.test.ts:6:0`, with `Test Files 1 failed | 1 passed (2)` and `Tests 12 passed (12)`.
- Done: implementation, formatting, root and styles typechecks, scoped lint, repeated build, and the passing theme cases.
- Not done: a green styles project, remaining gates, independent runtime browser-version capture, or acceptance. No retry or configuration repair was attempted after the gate refused.
- Hypothesis: dependency optimization reloaded the shared browser test session while the existing styles suite was importing.

Other deviations: none. Report-only follow-up: `guides/veneer.md` still describes `./styles/themes` as SCSS, and `ROADMAP.md` retains the prior export description. Those files remain untouched under the brief's ownership limits.

