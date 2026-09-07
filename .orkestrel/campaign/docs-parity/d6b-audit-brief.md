# Audit brief — D6b template-rename (round 1)

## Lanes

One adversarial lane and a checker, blind to each other, clean contexts, one brief: the subjective lane (`reviewer`, Opus 5 — whether each boolean member of the generated proof's `Entry` record now reads as an assertion under `.claude/rules/names.md` § General vocabulary, whether the names are one term per concept, and whether the template's comments follow). The objective lane does not run this round: the unit is a rename with no behaviour change, and the checker reads its mechanical claims; the Sol bench is dark, so the lane that ran is on the writer's engine, recorded as the substitution. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every claim from your lane with PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing.

## Subject

Unit D6b (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-template-rename-brief.md`) renamed the boolean members of the distribution proof template's `Entry` record (`src/core/templates.ts`, the `interface Entry` in the proof text) so each reads as an assertion, at the declaration, every read and write site in the template text, and every test that pins the template text. The report: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-template-rename-report.md`. The evidence, at absolute paths: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-template-rename.diff.txt` and `d6b-template-rename.status.txt` (the whole uncommitted tree; `d6-fix-2.diff.txt` is the state D6b started from, plus the Orchestrator's one-sentence guide edit in `d6-integration.md`), the changed files at their new state under `/home/user/scaffold`, `/home/user/scaffold/.orkestrel/campaign/ts6-api/ledger.md:140` (the finding), and the rules `/home/user/scaffold/AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`.

## Claims

1. **The names (subjective).** Every boolean member of `Entry` and of `Entry.declaration` in the generated proof reads as an assertion of the fact it holds (the way `aborted`, `exhausted`, and `expired` do), names what the thing is rather than how it is computed, and uses one term per concept across the record; a member that already read as an assertion stayed; the report records one ruling per member.
2. **The rename is whole (checker).** No old member name remains in `src/core/templates.ts` or in `tests/src/core/templates.test.ts`; every read and write site in the template text uses the new names; the template's comments that name a member follow.
3. **No behaviour moved (checker).** The diff over `src/core/templates.ts` changes identifiers and comments only; `tests/src/core/templates.test.ts` changes pinned text only; `tests/distribution.test.ts` (scaffold's own, not the template's output) did not move.
4. **Scope honesty (checker).** The status set equals `d6-fix-2.status.txt`'s set plus `src/core/templates.ts` and `tests/src/core/templates.test.ts`; nothing else moved.
5. **Report honesty (checker).** Every `file:line` the report cites matches the files at their new state; every criterion carries its exit code and last lines; the distribution observation records every case's reading with the packed-install case red by dependency order and every other case green; no count of a growable set in the prose.

## Output

Per claim, the verdict and its evidence. Then findings outside the claims, each with `file:line` and what right looks like. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
