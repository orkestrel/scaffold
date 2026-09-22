# CL11 audit round 2 — mechanical conformance brief

## Role and engine

`checker` on the native cheap tier, clean context, read-only. You run beside two adversarial lanes and
replace neither. Perform the assignment directly and spawn nothing.

## Objective

Rule on the mechanical claims of
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-audit-2-claims.md` — claims 1, 3, 5, 12, 13,
16, 17, and 18 — with CONFIRMED, REFUTED, or UNPROVEN and the exact evidence.

## Two standing instructions

**Answer a question of the form "does this tree do X" by searching for X already being done, never by
inspecting the interface that would do it.** Name the pattern you searched and the paths it covered,
including for a clean result.

**Do not confirm a runtime result whose only evidence is the writer's own report.** Two previous
rounds' checkers refused exactly that and were right both times.

## What is closed

Round 1 accepted the shipped behaviour and its gates are recorded. Rule only on what this fix round
changed.

## Evidence

- The cumulative diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-diff-2.patch`
- **Round 1's diff, which isolates this round's changes**:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl11-diff.patch.txt`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-status-2.txt`
- The brief: `.orkestrel/veneer/units/cl11-brief-2.md`, over `units/cl11-brief.md`
- The measurements: `.orkestrel/veneer/units/cl11-fix-terrain.md`
- The report: `.orkestrel/veneer/units/cl11-report-2.md`
- The live tree: `C:/Users/mikes/WebstormProjects/veneer`, including `tmp/probe/` and
  `tmp/capture/states/`

Both diffs are supplied on purpose: a previous round's checker correctly refused a claim because only
the cumulative rendering existed and it could not tell one round's work from another's.

## What each claim needs

- **Claim 1** — the capture-only case reads the portfolio's own accumulated absolute paths rather than
  rebuilding a path string. Read the case and the installed declaration.
- **Claim 3** — the control bytes are the real retained frames. Compare the base64 the owned setup
  module carries against the actual files under `tmp/probe/`, and say which files they are.
- **Claim 5** — a permanent case rejects undecodable bytes. Read it.
- **Claim 12** — the first-segment uniqueness assertion is gone, and specimen, selector, and full state
  name uniqueness are all still enforced. Name where each survives. Confirm no key or state was added
  or removed by comparing the state table against round 1's diff.
- **Claim 13** — three statements were withdrawn and the state table's doc block was corrected. Check
  each withdrawal against the tree, and confirm round 1's report body is unchanged.
- **Claim 16** — the status lists only files the round-1 brief owns, and two of the seven carry
  preserved round-1 work this round did not edit. Verify that by differencing the two renderings.
- **Claim 17** — no receipt is claimed and no test reading is presented as one.
- **Claim 18** — the report's account matches the diff and the tree, including its stated limits.

## Output

One ruling per claim with its evidence, then any mechanical defect you found that no claim names,
numbered after the last claim. No terminal verdict line: you advise, you do not rule the round.
