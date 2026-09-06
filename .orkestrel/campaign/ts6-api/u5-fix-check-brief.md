# Check brief — U5-fix (scaffold), mechanical closure

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u5-fix-brief.md` (edits 1 to 6) and its report `u5-fix-report.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Non-negotiable rules and § Design laws, `.claude/rules/tests.md` § Shared test infrastructure and § Probes, `.claude/rules/typescript.md`, `.claude/rules/patterns.md` § Declared ecosystem capabilities, `.claude/rules/writing.md`. The measurement behind edit 5: `orchestrator-measurements.md` § M7 and `m7-spans.log.txt`.

## Review evidence

The fix's slice as an interdiff: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u5-fix.slice.diff.txt` (`a/`: the tree at U5's exit; `b/`: the tree now); the whole U5 change is `u5-fix.diff.txt`; the status is `u5-fix.status.txt`. The gate exits are the fix verifier's (`u5-fix-verify-report.md`), not this lane's to rule.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The `findParameters` guard in `tests/src/core/templates.test.ts` reads the `applicationBrowser` declaration through `readStatements`, asserts its `declarations` equal `[{ name: 'applicationBrowser', parameters: ['showcase: boolean'], returns: 'UserConfig' }]` before asserting `exported` is `undefined` and the empty finding, and no `toContain` over a printed signature remains at that site.
2. Both drive comments name the mechanism (real modules over a real specifier graph in place of a `vm` context) and neither file carries "evaluated from a string", `structuredClone`, or `Array.isArray`; each drive narrows `driven.answers` with `isArray` imported from `@orkestrel/contract` beside `isRecord`, and `driveClassifier`'s declared return type is unchanged.
3. The reader test in `tests/setupServer.test.ts` selects the `build` statement by its declared name, asserts `text` and `body` on that selection, asserts the `syntax` list of every body-carrying statement is `['FunctionDeclaration']`, and names no statement by position.
4. The new case is named for what it proves, its source carries an em dash and a curly quote before the declaration, it asserts the encoded byte length exceeds `source.length` before the slices, and its `text` and `declarations` assertions match the M7 reading verbatim.
5. The slice touches only `tests/src/core/templates.test.ts`, `tests/guides.test.ts`, and `tests/setupServer.test.ts`; `tests/setupServer.ts` is unchanged from U5's exit; no `any`, assertion, suppression, or nested function beyond an anonymous callback passed directly as an argument was added; and the report's before/after lines match the slice.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
