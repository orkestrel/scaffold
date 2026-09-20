# U1-conform audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone: file existence, name
sweeps, placement rows, barrel shape, scope honesty. Perform the assignment directly and spawn
nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-claims.md` — that file alone
fixes the claim numbers — and report each check as `PASS` or `FAIL` with the exact site. The
checks:

- **Claim 1, existence.** In `C:/Users/mikes/WebstormProjects/veneer`: `src/browser/ColorMode.ts`,
  `app/browser/Showcase.ts`, `tests/src/browser/ColorMode.test.ts`,
  `tests/app/browser/Showcase.test.ts`, `tests/setupListeners.ts` exist;
  `src/browser/color-mode/`, `app/browser/showcases/`, `tests/src/browser/fixtures/`,
  `tests/app/browser/showcases/`, `tests/src/browser/color-mode/`, `src/browser/factories.ts`,
  `app/browser/factories.ts`, `tests/src/browser/factories.test.ts` do not; no `.ts` file sits
  under any `fixtures/` directory in the tree outside `node_modules` and `tmp`.
- **Claim 2, name sweeps.** Grep `src`, `app`, `tests`, and `guides` for the whole words
  `ColorScheme`, `isColorScheme`, `createColorMode`, `createShowcase`, `WORKSPACE_PATH`,
  `readSpecifiers`, `readForbiddenSource`, `readForbiddenDependency`, `readEscapingImport`,
  `readImportClosure`, `readFileDigest`, `computeFileDigest`: report every hit. Confirm
  `COLOR_MODE_KEY = 'color-mode'` in `src/browser/constants.ts`. Confirm the `it` title
  `executes the scheme-validation example verdicts` in `tests/guides.test.ts` (the one stale
  term the claim records).
- **Claim 3, the entry.** `app/browser/main.ts` imports from `./Showcase.js` and not from
  `./index.js`; `app/browser/index.html` contains `<title>Veneer</title>`.
- **Claim 8, barrels and law.** `src/browser/index.ts` and `app/browser/index.ts` contain only
  `export * from` lines; over every file the rendered diff touches, grep for `: any`, `as ` outside
  `as const`, `!.`/`!)`/`!;` non-null forms, `@ts-`, `eslint-disable`, `export default`,
  `public `/`private `/`protected ` on a class member; report every hit with its line. In the
  rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff.patch.txt`, count
  the changed lines of `tests/guides.test.ts` (three: one import, two calls) and
  `tests/setupBrowser.ts` (two: the destructure and the construction).
- **Claim 9, scope honesty.** Compare every path in
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u1-conform-status.txt` against the brief's
  § Scope (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-brief.md`)
  plus `package.json` and `package-lock.json`; name any path outside.

Read the live tree and the rendered diff, never the report alone. Claims 4 to 7 and 10 are not
yours.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; then one line naming any path in
the status that the scope does not cover. No verdict line, no process diary.
