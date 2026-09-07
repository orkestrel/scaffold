# Checker brief — U10-fix (the database readers' fix round)

## Lane

`checker`, Sonnet, mechanical conformance over the fix round: each of the eight exact edits landed where the report says, the red-then-green readings name real cases, and nothing outside the owned pair moved. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The fix brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u10-fix-brief.md`. The fix report: `u10-fix-report.md`. The round-1 verdict: `u10-audit-verdict.md`. The evidence: `u10-fix.diff.txt` and `u10-fix.status.txt` (U10 and the fix round together against `HEAD`); `u10-database-readers.diff.txt` for U10 alone. Read the two owned files under `/home/user/fleet/database/tests/` at their new state where a hunk is not enough.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `readProjectDiagnostics` refuses a signal-ended child (`compiled.signal !== null`) between the `error` guard and the stderr guard, with the stated comment; a case drives it over a project whose `extends` names an absent base and asserts the refusal names the base.
2. `readProjectAliases` refuses on `printed.error` and on a non-zero status naming the config path, its TSDoc carries `@throws`, and a case over an absent config asserts the throw names the path.
3. `readDeclaredNames` returns `undefined` for a non-`Identifier` declarator with its `@returns` updated; both callers throw the `has unsupported declaration` message; the two cases the report names exist (`export const { a, b } = value`).
4. `attributeGuideFences`, `resolveExportKeywords`, `scanModuleSource`, and `form: 'module' | 'script'` (assigned from `sourceType`, read as `!== 'module'`) stand at every declaration, TSDoc, call site, and test title; the old names appear nowhere in the two files.
5. `EntryModuleInterface` and `readEntryModule` carry `parsed` and `scratch` alone; the six case titles read as the fix brief fixes them; no typographic apostrophe remains in a title; the budget comment sits in the file header with a pointer at its old place.
6. `readProjectAliases`'s `@remarks` states the resolution rule as the fix brief quotes it.
7. The status file lists exactly the two owned files; no `any`, non-null assertion, or type assertion was added; the report's red-then-green readings name cases that exist and every criterion carries an exit code.

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
