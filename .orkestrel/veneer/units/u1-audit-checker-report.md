# U1 audit report, mechanical checker (native Sonnet, 2026-09-20, 85 s)

1. Claim 3 — CONFIRMED. Kind placement: `SHOWCASE_COPY` in `app/browser/constants.ts`, `createShowcase` in `app/browser/factories.ts`, `ShowcaseInterface` in `app/browser/types.ts`, `ColorMode` class in `src/browser/color-mode/ColorMode.ts`, `COLOR_MODE_ATTRIBUTE`/`COLOR_MODE_KEY` in `src/browser/constants.ts`, `createColorMode` in `src/browser/factories.ts`, `ColorScheme`/`ColorModeOptions`/`ColorModeInterface` in `src/browser/types.ts`, `isColorScheme` in `src/browser/validators.ts`. Banned-syntax sweep of the diff: no `any` type hits, no `@ts-`/`eslint-disable`, no non-null-assertion pattern; the only ` as ` hits are `import * as` and prose.

2. Claim 11 — CONFIRMED. All 43 changed paths in `u1-names.txt` fall inside the owned globs of the briefs, except `tests/setupPolicy.ts`, the named repair-vendored exception. `package.json` and `package-lock.json` do not appear.

3. Claim 12 — CONFIRMED. Grepping the hosted guides for the exact backtick-wrapped names (`ColorMode`, `ColorModeInterface`, `ColorModeOptions`, `ColorScheme`, `createColorMode`, `isColorScheme`, `COLOR_MODE_ATTRIBUTE`, `COLOR_MODE_KEY`, `Showcase`, `ShowcaseInterface`, `createShowcase`, and the setup exports) returns no matches (an unquoted substring sweep hit `createShowcaseApplication` in `supervisor.md:2869`, a distinct name). Every interface member in `src/browser/types.ts` (`root`, `storage`, `mode`, `apply`, `toggle`, `destroy`) and `app/browser/types.ts` (`host`, `destroy`) is one word.

4. Claim 10, guide-parity letter — CONFIRMED. Each `Summary` cell in `guides/veneer.md` § Surface equals the corresponding declaration's TSDoc description paragraph, read directly, including the `## Methods` `#### \`ColorModeInterface\`` table (`apply`, `toggle`, `destroy`) against the members' TSDoc.

Claims 1, 2, 4, 5, 6, 7, 8, 9, the non-mechanical rows of 10, and 13 — not checked (not mechanical).

Checker: findings (all four checked claims confirmed; no defect).
