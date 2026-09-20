# U-styles-config audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-config-audit-claims.md` — that file
alone fixes the claim numbers — and report each check as `PASS` or `FAIL` with the exact site.
Read the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-config-diff.patch.txt`, never the report
alone. The checks:

- **Claim 1, imports and fields.** In `configs/src/vite.styles.config.ts`: the only `import`
  lines are `vitest/config`, `'../helpers.js'`, and `'../../vite.config.ts'`; no `tsconfig`,
  `fileURLToPath`, `playwright`, `resolveBrowser`, `resolvePinnedBrowser`, or `alias` token
  appears; `...browser` and `...browser.test` spreads appear; `name: { label: 'src:styles', color:
  'cyan' }`; `exclude: []`; `setupFiles` lists `./tests/setup.ts`, `./tests/setupBrowser.ts`,
  `./tests/setupStyles.ts`, `./dist/src/styles/index.css` in that order; `rolldownOptions` is a
  `build` field. Compare the RTL plugin object (`name: 'veneer-logical-rtl'` through its closing
  brace) between the live file and the `a05e9ff` side of the rendered diff: byte-identical.
- **Claim 2, digests.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-config-instruments/baseline-digests.txt`
  and `rewrite-digests.txt` carry the two SHA-256 values the claim names, equal across the two
  files.
- **Claim 3, controls.** `plant-boundary.log.txt` carries the output-boundary error text;
  `plant-setup.log.txt` carries `Cannot find module '../dist/src/styles/index.css'`;
  `boundary-restore.log.txt` and `setup-restore.log.txt` carry `byte comparison = true`; no
  `it(` title in `tests/setupStyles.test.ts` or `tests/src/styles/**` names `PLANT`, `plant`, or
  `control`.
- **Claim 4, the setup module.** `tests/setupStyles.ts` contains no `import '` line ending in
  `.css'`; both rewritten remarks contain `setupFiles` and `imports no stylesheet`;
  `tests/setupStyles.test.ts` lines 167 to 168 and 318 to 319 read the built artifacts as the
  claim states.
- **Claim 5, scripts.** `package.json` `test:src` and `test` read as the claim states; the diff
  touches no other `package.json` line.
- **Claim 6, law.** Grep the diff's added lines for `: any`, `as ` outside `as const`,
  `!.`/`!)`/`!;`, `@ts-`, `eslint-disable`; report every hit.
- **Claim 7, scope.** `tmp/audit/u-styles-config-status.txt` lists exactly the three files.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check. No verdict line, no process diary.
