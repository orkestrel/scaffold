# TOGGLES landing (`tg` on the session branch over `72e97e2`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the TOGGLES commit on the Veneer session branch carries the unit's owned files and its shared patch with the conflict resolutions the audit accepted, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `tg-landing.commits` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run is in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `tg-landing.diff` (`git diff 72e97e2 HEAD`), `tg-landing.stat`, `tg-landing-message.txt`; the unit's return `tg-3.diff` (the owned files' diff against the base `a658879`), `tg-3-status.txt`, `tg-shared-3.patch`; the resolution instruments `tg-resolve.py`, `land-seams.py` (the seam joiner), `land-conflict-map.py`, and `table-merge3.py` with the note `tg-landing-table.txt`; the reconciliation `tg-audit-3-verdict.md` and its rulings; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md`.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** The unit's owned files (`src/styles/components/_button-group.scss`, `src/styles/components/_input-group.scss`, and their four proofs) are edits of files that existed at `a658879`, and their cherry-pick onto `72e97e2` was clean. The three-way apply of the shared patch met conflicts in `tests/setup.ts` (the `CaptureSubject` union and the resting rows, each an append conflict at a landed insertion point, resolved as the landed lines first and the toggle lines after them; `land-seams.py` restored the dropped row opener and reported `setup: joined 1`, `constants: joined 0`, `journey: joined 0`) and in `guides/veneer.md` (the deferral table, both sides extended and re-padded, resolved three-way by `table-merge3.py` as `tg-landing-table.txt` records: the patch's twelve deleted rows are absent, `.alert-dismissible .btn-close`, which `72e97e2` had already deleted, stays absent, and no row is added). The other guide hunks and the `app/browser/constants.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts` hunks applied cleanly. The formatter re-padded the deferral table. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `tg-landing.diff` touches equals the union of the owned files in `tg-3-status.txt` and the files `tg-shared-3.patch` touches; every removed line in `tg-landing.diff` is one `tg-3.diff` or `tg-shared-3.patch` removes, or a deferral-table row `tg-landing-table.txt` names, or a re-padded table row whose cells are unchanged; neither vendored file appears.
2. **The owned files.** Each owned file's content at HEAD equals the base `a658879` content with `tg-3.diff` applied (compare the hunks of `tg-landing.diff` for those six files against `tg-3.diff`; they are the same hunks).
3. **The registry.** In `tests/setup.ts` the `CaptureSubject` union carries every toggle subject the patch adds after the landed members; the toggle resting rows follow the last landed resting row, each opening with `Object.freeze({` after the preceding row's `}),` (cite the seam) and the list closing with `}),\n])`; every row's selector and property equal the patch's.
4. **The deferral table.** In `guides/veneer.md` the deferral table (the `| Name | Owner | Reason` table under the Deferred selectors subsection) carries none of the twelve names `tg-landing-table.txt` lists as deleted, does not carry `.alert-dismissible .btn-close`, carries every row `72e97e2`'s table carried other than those, in `72e97e2`'s order, and its header and separator appear once.
5. **Every other shared hunk.** The guide's button-group, input-group, and dropdown sections, `app/browser/constants.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts` carry the patch's hunks byte for byte apart from the formatter's re-padding, each in the position the patch's context lines place it.
6. **Prose law.** The landing message carries no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
