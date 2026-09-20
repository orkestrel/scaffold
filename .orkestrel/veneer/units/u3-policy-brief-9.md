# Unit U3-policy — successor brief 9: the row and link boundaries

## What changed and why

This brief supersedes `u3-policy-brief-8.md` for the remainder of the unit; the earlier
briefs stand except where this one says otherwise. Round 7 ran both lanes on
`../u3-policy-audit-claims-2.md`. The subjective lane
(`.orkestrel/veneer/units/u3-policy-audit-2-analyst-report.md`) confirmed the accounting, the
controls, the portability, and the vocabulary, and refuted four claims with executed readings on
the live patterns. The objective lane (`units/u3-policy-audit-2-reviewer-report.md`) confirmed the
pattern's accepted set, the controls, and the portability, and refuted the vocabulary, the count,
and the remark's claim of a section boundary the reader lacks; its extra findings 10 to 13 join
the items below. Each item names its finding. The scaffold `verifier` ran the whole chain green on
the round-8 tree (`units/u3-policy-gate-report.md`).

Two additions from the objective lane:

5b. **One name for the row (objective claim 6).** Write "directory-index row" everywhere; delete
   every "directory-table row" (`tests/setupPolicy.ts:380`, `guides/scaffold.md` three times).
5c. **What the reader reads, stated as it is (objective claim 2, finding 12), and the two fence
   limits pinned (finding 13).** The reader scans every line of the map after fence blanking and
   reads every row of the shape, wherever it sits; a concept-index row does not take that shape
   (its first cell is a concept name, not a backticked path). Delete the remark's "in another
   table's cell" claim and say that instead. Add two control rows or cases proving the documented
   fence limits: a row inside an unclosed fence still accounts for its guide, and a row inside a
   fence indented four or more spaces still accounts for its guide, so a change to
   `POLICY_FENCE_PATTERN` that blanks either reddens. Add to `isPolicyMirror`'s remarks (finding
   11) that a catalog row wins over a directory-index row carrying the same name, because
   `catalog` overwrites such a file with the mirror.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json`. Never run
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean` anywhere.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md` (the sweep
paragraph alone). **Off-limits.** Everything else.

## Execution

1. **The row (claim 2).** Make `POLICY_INDEX_ROW` require a relative path in the first cell (no
   leading `/`, no drive letter, no `..` segment, no `:`), and confine `link` to the second cell:
   the cell ends at the next unescaped `|`, so a three-cell row's later cells never reach the link
   pattern. Add cases: `` | `/outside` | [tokens](tokens.md) | `` accounts for nothing;
   `` | `src/styles` | no guide | [tokens](tokens.md) | `` accounts for nothing;
   `` | `src/styles` | [`tokens.md`](tokens.md) | `` accounts for `tokens`. Make the remark say
   what a row is in those terms.
2. **The link (claim 3).** Exclude `:` from both name classes so `](https:sample.md)` is refused;
   apply the trailing `#fragment` group only after the bare branch, so `](<sample.md>#fragment)`
   and `](<sample.md#first>#second)` are refused (the angle branch already admits its own fragment
   inside the brackets). Add a case for each refused form and keep every accepted-form case.
3. **The count (claim 7).** Delete the tally in "Accounted for four ways" and "the four
   accountings" in `tests/setupPolicy.ts` and `guides/scaffold.md`; name the members without the
   number.
4. **The recovery sentence (claim 8).** Delete every sentence that says a banned-term report
   diagnoses catalog drift (`tests/setupPolicy.ts` `isPolicyStray` remarks and the guide
   paragraph). State the evidence precisely: a directory-index row is the workspace's statement
   that the guide documents local code; catalog membership is the evidence that excludes a
   mirror from the sweep; neither a missing catalog row nor a banned term proves authorship.
   Give the maintainer the direct recovery: for an unaccounted authored guide, add its
   directory-index row; for a fetched mirror, restore its catalog evidence and do not rewrite the
   mirror to clear a prose finding. Say a mapped guide's term sweep is the sweep every authored
   guide gets, without claiming its terms diagnose anything about the catalog.
5. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).
6. **Fleet reading.** Repeat brief 8's step 7 in Veneer and Test (copy the two files aside to a
   scratch directory under the system temporary directory, copy this checkout's over them, run
   each target's policy project, copy the set-aside bytes back, confirm the two paths clean with
   `git -C <target> status --porcelain -- tests/policy.test.ts tests/setupPolicy.ts`). Confirm each
   target is clean at those paths before copying; report and skip a dirty one.

## Output

Write `u3-policy-report-9.md` and return its content: the diff summary; each new case's
reading; the two targets' readings and restore confirmations; each gate's exit code and final
lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file; a dirty
target at either path. Decide and carry on from: the regexes' exact shapes within the accepted
and rejected sets this brief fixes, wording within the meaning fixed here.

## Acceptance criteria

1. The row pattern refuses an absolute path and a link outside the second cell; the link pattern
   refuses a colon in a bare name and a fragment after an angled target; each with a case.
2. No count phrase in the changed prose; no sentence claims a term report diagnoses the catalog.
3. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0 here;
   the policy project exits 0 in Veneer and in Test with the files in place; both restored clean.
4. `git status --porcelain` here lists only `.claude/rules/styles.md`, `host.json`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the targets' outputs and
restore confirmations.
