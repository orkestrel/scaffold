# U4b audit round 2 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u4b-audit-claims-2.md` — that file alone
fixes the claim numbers — and report each check as `PASS` or `FAIL` with the exact site. Read
the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4b-diff-2.patch.txt`, never the reports alone.
The checks:

- **The binding table.** `tests/setupConformance.ts` exports `OracleBinding` (readonly members)
  and `ORACLE_BINDINGS` (frozen); every entry's `steps` patterns match at least one step name in
  `tests/fixtures/oracle/button.json`; no entry carries the Space or Enter obligation;
  `scanOracleObligation` returns a `does not prove` text for a proof step outside the accepted
  set and `missing recording step` for a step absent from the fixture (read the two strings from
  the source and confirm both exist).
- **The keyboard rows.** `guides/veneer.md` § Compatibility carries no row whose obligation
  begins `Space activates` or `Enter activates`.
- **The pinned path.** The recorder's cascade read in `tests/setupConformance.ts` resolves from
  `BOOTSTRAP_MANIFEST_PATH` (`resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/css/bootstrap.css')`
  or equivalent), not through `readBootstrapCascade`.
- **The listener.** The recorder's listener names in `tests/setupConformance.ts` include `click`
  and exclude `click.bs.button.data-api`; `tests/fixtures/oracle/button.json`'s
  `button.click.toggle` step carries `click` in its `after.events`.
- **The exclusion.** `scanOracleFixture` (or the comparator's name as landed) reads the fixture's
  `excluded` list and skips a named step; a case in `tests/setupConformance.test.ts` proves the
  skip and one refuses an exclusion naming no step.
- **The status and the population.** `tmp/audit/u4b-status-2.txt` lists `guides/veneer.md`,
  `package-lock.json`, `package.json`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`,
  `tests/setupConformance.ts`, `tests/fixtures/oracle/button.json`, and
  `tests/fixtures/oracle/inventory.json` and nothing else; `package.json`'s only change over
  `ef1a563` is the `@orkestrel/markdown` devDependency line; `tests/fixtures/oracle/inventory.json`
  is byte-identical to its round-1 rendering in
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4b-diff.patch.txt`.
- **Law.** Grep the diff's added lines for `: any`, `as ` outside `as const`, `!.`/`!)`/`!;`,
  `@ts-`, `eslint-disable`, `export default`; report every hit.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check. No verdict line, no process diary.
