# U4b audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone: file existence, export
membership, placement rows, sweeps, scope honesty. Perform the assignment directly and spawn
nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u4b-audit-claims.md` — that file alone fixes
the claim numbers — and report each check as `PASS` or `FAIL` with the exact site. Read the live
Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4b-diff.patch.txt`, never the report alone. The
checks:

- **Claim 1, exports.** Every export the claim names is declared in `tests/setupConformance.ts`
  and named in the export-set assertion of `tests/setupConformance.test.ts`; every declared
  interface's properties are `readonly`; no `class` is declared in a `tests/setup*.ts` module.
- **Claim 3, the fixture and the refresh guard.** `tests/fixtures/oracle/button.json` exists,
  parses as JSON with `version`, `component`, `steps`, and `excluded` keys, `excluded` is an
  empty array, and its step names include `button.initial`, `button.click.toggle`,
  `button.keyboard.space`, `button.pointer.release`, `button.pressed.click`,
  `button.disabled.click`, and their `button.reduced.` twins; `tests/setupConformance.ts` or
  `tests/conformance.test.ts` reads `ORACLE_REFRESH` and writes the fixture only under it;
  `tests/fixtures/oracle/` holds `.json` files only.
- **Claim 5, the guide.** `guides/veneer.md` headings in order: `## Tokens` … `## Compatibility`
  … `## Showcase`; the `## Compatibility` table header is
  `| Component | Kind | Obligation | Proof | Status |`; every row's `Status` cell is `accepted`;
  every `Proof` cell is either `—` or a step name that appears in `button.json`; `## Tests` links
  `tests/conformance.test.ts` and `tests/setupConformance.test.ts`.
- **Claim 6, law and placement.** Grep the diff's added lines for `: any`, `as ` outside
  `as const`, `!.`/`!)`/`!;`, `@ts-`, `eslint-disable`, `export default`; report every hit. Grep
  `tests/setupConformance.ts` and `tests/conformance.test.ts` for `import(` and `require(` of the
  Bootstrap bundle (`bootstrap.bundle` or `bootstrap/dist/js`): report every hit and whether it
  is a byte read (`readFileSync`/`copyFile`) or an evaluation. `package.json` `devDependencies`
  names `@orkestrel/markdown` and `playwright`. No new file sits under `tests/` outside
  `tests/fixtures/oracle/`.
- **Claim 7, scope.** `tmp/audit/u4b-status.txt` lists exactly `guides/veneer.md`,
  `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`,
  `tests/fixtures/oracle/button.json`, and `tests/fixtures/oracle/inventory.json`.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; then the list of every export the
module declares. No verdict line, no process diary.
