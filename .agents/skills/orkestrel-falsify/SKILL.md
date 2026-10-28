---
name: orkestrel-falsify
description: >-
  Run one skeptical audit round against finished work: write the subject as numbered falsifiable claims, dispatch independent auditors instructed to falsify them, reconcile their evidence, and rule. Use when the size gate in `.agents/orchestration.md` names a review, before a fix round is accepted, before a version bump or publication, or when a defect has recurred across rounds. Do not use it for a small change, a mechanical rename, or a round with no added or repaired claim to test.
---

# Falsify

One round. It ends with a ruling. `.agents/orchestration.md` § Size gate decides when a round runs, what a fix round re-audits, and when an all-confirmed round ends the audit.

## Scripts

Run from the checkout root. The script's opening comment owns its behavior.

- `scripts/mutate.ts --edits EDITS.md -- COMMAND [ARGS...]` runs the mutation probe. It resolves an edit file, the `### <path>` block shape that `.agents/skills/orkestrel-dispatch/scripts/patch.ts` reads, before it touches a file; saves the originals under `tmp/probes/mutate/`; writes the mutated files; runs the command with no shell and its output on standard error; restores the bytes and proves each file's SHA-256 digest; runs the command again; and prints one JSON line with both exits. A mutation that leaves the suite uncollected also reads as a failing run, so read the command's own test count on standard error. Exit 0 when the mutated run failed and the restored run passed, 3 when either did not, 2 when a restore is not proven or the command cannot start, 64 usage or an edit that does not resolve.

## Run a round the size gate does not name when

- a version is about to be bumped, packed, or published;
- the same defect class appeared in more than one round.

## Write the claims

Write `tmp/units/<unit>-claims.md` and point every lane at it. Read `references/brief.md` for the claim form.

- State the subject as numbered falsifiable claims: properties a concrete input, state, or interleaving could show false. Never "review this diff".
- Derive claims from adverse conditions: cancellation, restart, concurrency, partial failure, malformed or unexpected input, resource exhaustion, orderings the happy path never reaches.
- Limit claims to the public contract and the risky seams. A claim about a comment or a name is not a claim.
- Supply the evidence the subject type requires: a code change carries the actual diff and `git status --porcelain`; a rendered surface carries its capture portfolio with source as corroboration; a proposal carries the proposal, the canon it must satisfy, and its motivation.
- Name where a lane may run a probe (`tmp/probes/` through the `probe` project) and that it deletes the probe before returning.
- Name the stakes: what this round decides.
- A successor brief carries what the previous round closed and adds claims against that round's rulings.

## Dispatch the lanes

- Medium: one lane, with an independent reviewer per `.agents/orchestration.md` § Engines. Large: the objective lane and the subjective lane, same claims file, each in a clean context, neither shown the other's answer before reconciliation. Add `checker` when criteria are mechanical.
- Tell a lane when its own engine wrote the half it audits.
- Give a lane the evidence a read-only allowlist cannot produce: run the probe yourself, record its control and output, and hand it over. Run a mutation probe with `scripts/mutate.ts`; its JSON line carries both exits.
- Auditors edit no source and spawn nothing. Their reports are immutable after they return.

## Verdict shape

Every lane returns exactly this:

1. Numbered verdicts in claim order, one value each: `CONFIRMED` (held against a falsification attempt, with the attempt), `BROKEN` (the failing input, state, or interleaving plus the smallest correct fix), `UNRESOLVED` (what would settle it; a claim whose only evidence is the writer's report), `NOT-EVIDENCED` (the capture that is missing).
2. Findings outside the claims, each substantiated to the `BROKEN` standard. After them, list each cost finding that `.claude/rules/quality.md` § Performance rules advisory, marked `ADVISORY`; an advisory never enters the terminal line.
3. Tested and held: tests no verdict line carries, and the adjacent behavior that looks like the defect and is correct.
4. One terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. `PASS` needs every claim `CONFIRMED` and no substantiated outside finding.

Before confirming a claim about a proof, the lane names the mutation that would make the proof fail and states whether the assertions distinguish it. No process diary.

## Reconcile and rule

Read `references/reconcile.md`.

- Reproduce every `BROKEN` and every outside finding yourself before acting on it.
- Run `node .agents/skills/orkestrel-dispatch/scripts/cite.ts <verdict>` and discard a verdict whose citation does not resolve, then sample that lane's other citations.
- Treat lane disagreement as answers to different questions; find each question.
- Drop, on the record, any finding no lane substantiates.
- Bound every accepted finding: what is not broken and what over-correcting would break. Put each bound in the fix brief.
- An all-confirmed round puts the claims on trial: if none could have been falsified by evidence the round had, sharpen them for one successor round; if they could have been, the pass stands and the audit ends.

## Write the verdict

Write `.orkestrel/<package>/<unit>-audit-verdict.md` with the lanes that ran, their engines, the per-claim rulings, the findings carried into fix units, and any lane the round did not run with the reason. Delete the claims file and the verdict when the seam closes.

## End the depth search

When review rounds at one seam keep surfacing defects without converging on their source, name what the audit is for, dispatch one blind lens per station of the stream the defect moves along, locate the source, and plan from the source. A subject that reprices on every edit (a count, a census) is not a seam; drop the claim.
