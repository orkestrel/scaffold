# U-styles-guide audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-guide-audit-claims.md` — that file
alone fixes the claim numbers — and report each check as `PASS` or `FAIL` with the exact site.
Read the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-guide-diff.patch.txt`, never the report
alone. The checks:

- **Claim 1, place and shape.** In `guides/veneer.md`, the heading lines in order:
  `## Examples`, `## Styles`, `### Files`, `### Scripts`, `### Departures from the workspace rows`,
  `## Tokens`; a fence opening with ```` ```ts ```` whose body is `import '@orkestrel/veneer/styles'`;
  `package.json` `exports` maps `./styles` to `./dist/src/styles/index.css` and `sideEffects`
  lists `**/*.css`.
- **Claim 2, the files table.** The six file rows in the stated order, each path existing in the
  tree; `src/styles/index.ts` contains one `import './index.scss'` line and nothing else
  non-blank; `configs/src/tsconfig.styles.json` has `lib` `["ESNext"]`, `types` `["vite/client"]`,
  an `include` over `src/styles/**/*.ts`, and `noEmit: true` (or `extends` a root that sets it);
  `tests/setupStyles.ts` contains no `import '` line ending in `.css'`.
- **Claim 3, the scripts table.** `package.json` `scripts` carries `build:src:styles`,
  `check:src:styles`, `test:src:styles`, `build:src`, `check:src`, `test:src` with the chains the
  table states (`build:src` and `check:src` name the styles script last; `test:src` ends with
  `&& npm run test:src:styles`; `test:src:styles` begins with `npm run build:src:styles &&`).
- **Claim 4, the departures.** `tsconfig.json` `compilerOptions.paths` has no `@src/styles` key;
  `.oxlintrc.json` `import/no-unassigned-import` allowlist entries all end in a stylesheet suffix;
  `app/browser/main.ts` line 1 is `import '../../src/styles/index.scss'`; `vite.config.ts` calls
  `environmentBoundary(` with `'src/core'`, `'src/browser'`, and `'app/browser'` (read the
  `configs/src/vite.core.config.ts` wrapper too) and no other argument; no `.oxlintrc.json`
  `overrides[].files` glob names `src/styles`; the root `projects` list in `vite.config.ts` names
  no `src:styles`; `tests/setup.css` does not exist; `package.json` names no `tailwindcss` or
  `@tailwindcss/vite`; `node_modules/@orkestrel/scaffold/dist/host/tests/config.test.ts` exists;
  the section contains `mergeOverride` followed by the word `helper` and contains neither
  `cannot remove` nor `output boundary`.
- **Claim 6, writing.** Grep the section (lines 73 to 173 of `guides/veneer.md`) and the README
  paragraph case-insensitively for `rtl`: no hit; for `](` : no relative link (a hit is only
  permitted if it is an absolute URL); for the substitution rows `should`, `simply`, `easy`,
  `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`,
  `performant`, `robust`, `allows you to`, `and/or`, `please`: report every hit; for a digit
  that counts members (such as `two`, `three`, `six` as a tally of files, scripts, or rows):
  report every hit.
- **Claim 7, scope.** `tmp/audit/u-styles-guide-status.txt` lists exactly the two guide files.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check. No verdict line, no process diary.
