Lane held: checker

## Claim 2 — The rename is whole

**PASS.**

- No `Entry`-scoped old boolean member name remains. Grep of `entry\.module|entry\.browser|entry\.commonjs|entry\.required|\.declaration\.module|\.declaration\.commonjs|\.declaration\.browser` over `src/core/templates.ts` and `tests/src/core/templates.test.ts` returns no matches.
- Every remaining occurrence of the bare words `module`/`commonjs`/`browser`/`required` in `src/core/templates.ts` belongs to a distinct, unrelated declaration outside the brief's scope: `Resolution.module` (`src/core/templates.ts:1127`), the `resolvesBrowser` helper's own locals `module`/`imported`/`required` (`src/core/templates.ts:1374,1377-1379`), the `readDeclaration` return type and its local `declaration` variable holding resolved target strings, not Entry booleans (`src/core/templates.ts:1442-1453,1656,1663-1665`), and the `driver.module` field from `Resolution` (`src/core/templates.ts:1511,1782`). The report's "Ancillary decisions" section (report line 21) explicitly scopes `resolvesBrowser`'s locals out; the `readDeclaration`/`Declaration` type is a pre-existing, differently-shaped concept (string targets, not booleans) and was never named in the brief's scope (`Entry` and `Entry.declaration` booleans only).
- Every read/write site verified against new names: `src/core/templates.ts:1462` (`entry.loadable`), `:1481` (`entry.requirable`), `:1671-1689` (`buildStage` locals and pushed record), `:1840` (`!entry.importable && !entry.requirable && !entry.bundled`), `:1890,1897` (`entry.importable`, `entry.declaration.importable`), `:1910,1914` (`entry.requirable`, `entry.declaration.requirable`), `:2040,2044` (`entry.bundled`, `entry.declaration.bundled`), `:2087` (`entry.bundled`). All match the report's citations exactly.
- The `Entry` leading comment (`src/core/templates.ts:1172-1176`) is restated in prose and names no stale member.

## Claim 3 — No behaviour moved

**PASS.**

- The full diff for `src/core/templates.ts` (`d6b-template-rename.diff.txt:1588-1742`) contains only identifier renames (`Entry` members, `buildStage` locals) and comment rewording; every expression is structurally unchanged (for example `requireTarget !== undefined && !(bundled && requireTarget === browserTarget)` is the same expression as the prior `requiredTarget !== undefined && !(browser && requiredTarget === browserTarget)` under new names).
- The full diff for `tests/src/core/templates.test.ts` (`d6b-template-rename.diff.txt:2834-3026`) changes only pinned string literals and object-literal keys/values that mirror the renamed members; no assertion structure or test logic changed.
- `tests/distribution.test.ts`'s diff in `d6b-template-rename.diff.txt:1819-1857` is byte-identical to its diff in `d6-fix-2.diff.txt:1664-1701` (same hunks, same content) — this file was not touched by D6b, confirming it "did not move."

## Claim 4 — Scope honesty

**PASS.**

- `d6-fix-2.status.txt` (26 lines: 25 tracked modifications plus `?? scripts/docs.ts`) is exactly reproduced in `d6b-template-rename.status.txt` (28 lines) with two insertions in path order: ` M src/core/templates.ts` (line 14) and ` M tests/src/core/templates.test.ts` (line 25). Every other line is identical between the two files. Nothing else moved.

## Claim 5 — Report honesty

**FAIL** — `d6b-template-rename-report.md:18-19,100`.

- File:line citations in the Edits section match the files at their new state (verified above for claim 2's sites) — this part is honest.
- Criteria section carries exit code and last lines for every criterion — present and complete.
- The distribution observation (report line 57) names every case's reading: one red case ("installed package consumer > installs the packed scaffold...") and four named passing cases, matching "4 passed (5)" — accurate and complete.
- The report states counts of growable sets in narrative prose, which `AGENTS.md` § Writing bans ("NEVER state a count... Name the members, or write the sentence without the number"; rows, members, and files are named examples of such sets):
  - `d6b-template-rename-report.md:18`: "The **three** `buildStage` locals feeding the record's shorthand keys are renamed with their members (…)" — states the count 3 in addition to naming the members.
  - `d6b-template-rename-report.md:19`: "The **two** target locals beside them are renamed `importTarget` and `requireTarget` (…), which makes the target **trio** parallel with `browserTarget`" — states the count 2 and a second count word ("trio") for a set of locals that grows if a new resolution channel is added.
  - `d6b-template-rename-report.md:100`: "Everything outside the **two** owned files is the D4 through D6 baseline…" — states a count of the "files" category the writing rule explicitly names as a growable set.

Re-dispatchable instruction: strip the counts "three," "two" (locals), "trio," and "two" (owned files) from `d6b-template-rename-report.md:18-19,100`, either naming the members with no number or recasting the sentence without one, per `AGENTS.md` § Writing.

## Findings outside the claims

- `src/core/templates.ts:1442-1453` (`readDeclaration`'s return type) and its consuming local `declaration` at `:1656,1663-1665` reuse the exact field names `module`/`commonjs`/`browser` that `Entry`'s pre-rename booleans used. This is a distinct, correctly out-of-scope concept (resolved declaration-target strings, not assertions), but a reader meeting both the renamed `Entry.declaration.importable` and the still-named `declaration.module` in the same function (`buildStage`, `:1656-1689`) reads two different vocabularies for adjacent facts. Right look: a future unit revisiting `readDeclaration`'s naming should decide deliberately rather than by omission; this round's brief did not scope it in, so it is not a defect of this unit.

VERDICT: FAIL 5
