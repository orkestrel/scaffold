# U6 audit rounds 2 and 3 — objective lane briefs (reviewer, native Opus 5)

Retained after the fact on 2026-09-20: these are the dispatch texts as sent through the harness's
Agent tool, written to disk on the Orchestrator's own retention audit. The reports are
`u6-audit-2-reviewer-report.md` and `u6-audit-3-reviewer-report.md`; the claims files are
`../u6-audit-claims-2.md` and `../u6-audit-claims-3.md`. The verifier ran each round from
`u6-gate-brief.md`, with the instruction in round 3 to run the Edge project a second time and
report both readings as separate rows.

## Round 2

Role `reviewer` on native Opus 5 (clean context). You hold the OBJECTIVE lane (correctness under
adverse orderings, what the code and contracts permit, test sufficiency) of the SECOND audit round
on unit U6 of the Veneer campaign, which GPT Astra wrote and then fixed in the Test checkout.
Perform the assignment directly and spawn nothing. You edit nothing; you have no write tools.

Read, in this order, before ruling:
1. `AGENTS.md`, then `.claude/rules/tests.md`, `typescript.md`, `names.md`, `architecture.md`,
   `browser.md`, `documentation.md`, `writing.md` under the scaffold checkout.
2. The round-2 claims file `test/tmp/audit/u6-audit-claims-2.md` (10 numbered claims). It is the
   audit's subject.
3. The round-1 record: `u6-audit-verdict.md` and `units/u6-audit-reviewer-report.md`,
   `units/u6-audit-analyst-report.md` (the findings the fix must close).
4. The cumulative diff `test/tmp/audit/u6-diff.patch` and the live files in the Test checkout
   (HEAD `f49bc7f` plus the uncommitted U6 diff): `src/browser/helpers.ts`, `src/browser/types.ts`,
   `src/browser/constants.ts`, `tests/src/browser/helpers.test.ts`, `tests/setup.ts`,
   `guides/test.md`.
5. The reports `test/tmp/codex/u6-report-3.md` (the fix run) and the control logs
   `tmp/codex/u6-3-*.log` beside it (read them as text; some may be UTF-16).
6. The design: `units/u6-design-planner-report.md` as amended by `u6-design-verdict.md` (the
   verdict wins).

Rule on every claim 1 to 10 with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact quoted text). Judge against the code, the diff, and the logs, never against
the report alone. Look especially for: an ordering in `holdAccessible` where a refusal can still
follow a side effect; a state the fix introduced that leaks across cases; a `matchMedia` reading
re-sent as a feature that the engine would refuse or that pins a value the caller could not
clear; a wait that cannot fail; a control log whose red assertion is not the one the claim names;
a guide sentence the code does not honor. Add extra findings no claim names, numbered from 11,
each with a site and a one-line failure scenario.

Output: a table `Claim | Verdict | Evidence` for claims 1 to 10; a numbered list of extra findings
(or the words "none found"); then exactly one terminal line: `Verdict: accept` or `Verdict: fix
round` followed by the claim numbers that force it. No process diary.

## Round 3

Same role and output shape, over `test/tmp/audit/u6-audit-claims-3.md` (10 claims), the prior
record (`u6-audit-verdict.md`, `u6-audit-verdict-2.md`, `units/u6-audit-2-reviewer-report.md`,
`units/u6-audit-2-analyst-report.md`), the cumulative diff, the live files, the report
`test/tmp/codex/u6-report-4.md` and the logs `tmp/codex/u6-round4-*.log`.

Claim 3 asks for a judgment, not only a reading: the refusal case drives its refusal with an
options object whose `print` accessor answers differently on successive reads. Rule whether that
is a legitimate hostile-input fixture or a behavioural fake the `AGENTS.md` mock ban reaches, and
say what the right shape is if it is the latter. Note also whether `stageMedia` reading an option
twice is itself a defect.

Look especially for: a settle whose stability rule can resolve while an override is still
reported; a restoration path that can itself throw and mask the original refusal; a marker
retained on a path that leaks it; a wait that cannot fail; a `Summary` cell that drifted from its
TSDoc; a guide sentence the code does not honour. Add extra findings numbered from 11, each with a
site and a one-line failure scenario. Distinguish a finding that forces another round from one
worth recording as a bound.
