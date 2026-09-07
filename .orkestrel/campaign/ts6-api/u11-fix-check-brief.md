# Checker brief — U11-fix (the lsp import walk's fix round)

## Lane

`checker`, Sonnet, mechanical conformance over the fix round: each ruling of the fix brief is implemented where the report says, the mutation readings match the cases the report names, and nothing outside the owned pair moved. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The fix brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u11-fix-brief.md`. The fix report: `u11-fix-report.md`. The round-1 verdict: `u11-audit-verdict.md`. The evidence: `u11-fix.diff.txt` and `u11-fix.status.txt` (U11 and the fix round together against `HEAD`); `u11-lsp-imports.diff.txt` for U11 alone. Read the two owned files under `/home/user/fleet/lsp/tests/` at their new state where a hunk is not enough, and `/home/user/fleet/lsp/node_modules/rolldown/dist/shared/binding-*.d.mts` for `OxcError.severity`.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `readForbiddenNode` reads the node's own specifier, returns a family hit, and otherwise continues into the member walk (no early return on a non-family specifier); the `@remarks` states it in the active voice; the two cases the report names for finding 1 exist with the planted sources it describes.
2. The member walk skips a member named `parent`, the `@remarks` carries the clause, and a case with a hand-built back-linked record exists.
3. The refusal reads only entries whose `severity` is `'Error'`, the `@throws` names the severity, the existing refusal case stays, and the report records the warning-severity sources tried with none producing a non-error diagnostic.
4. `isSyntaxNode` and `readNodeSpecifier` have direct cases, the latter per arm through `parseSync`-produced nodes with the `undefined` arms (`export const local = 1`, `import alias = rpc.Message`) beside control arms, and the `ImportExpression` arm on both sides.
5. The term "a non-literal `import()` expression" is the one used in the case name, the bound's `@remarks`, and the arm's `@remarks`; the arm's `@remarks` is two sentences.
6. The status file lists exactly `tests/setupConformance.ts` and `tests/setupConformance.test.ts`; no `typescript` specifier appears at an import, `require`, or dynamic-import position in either file; no `any`, non-null assertion, or type assertion was added.
7. The report's mutation readings name cases that exist in the test file, and its criteria readings carry an exit code each.

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
