# Audit verdict — D1 guide-readers, round 1

Workflow `wf_ebc4f348-705`, 2026-09-07 01:00 to 01:11 UTC. Lanes on `d1-audit-brief.md`, blind, clean contexts: subjective `reviewer` (Opus 5) — `VERDICT: FAIL 2 3`, claim 9 CANNOT RULE; objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench) — `VERDICT: FAIL 3 8`; `checker` (Sonnet) — `VERDICT: PASS`; `verifier` (Sonnet) — `GATES: GREEN` over the guide package's chain. Every lane ran; no lane substituted or dropped.

## Reconciliation

- Claim 3 (both lanes): a row with no code-span name is dropped silently at `helpers.ts:1318` and `:1390`, and a pair with no text on either side reports agreement at `helpers.ts:1841` while `guides/guide.md:467-469` promises "never as agreement" (objective claim 8). Ruled: the nameless row becomes a finding through a new `find*` check; the both-absent pair becomes a `Drift` with the key alone, which keeps the plan's decision 3 and the guide's sentence and makes SQ and MQ non-vacuous by construction. Carried by `d1-fix-brief.md` findings 1 and 2.
- Claim 2 (subjective): the transform is worded per side while the code applies one form to both, and the image descent is undocumented. Ruled: one transform, both sides, stated once; no code change. Finding 3.
- Claim 9 (subjective, CANNOT RULE on gate evidence): resolved by the verifier's independent run.
- Findings outside the claims, carried: `collectTitled` to `collectTitles` (finding 4); the Helpers table placement (finding 5); the over-indented tag gap in `normalizeComment`'s consumers (finding 6); several fences under one heading (finding 7, ruled first-fence-compared); the catalog describing checks this checkout does not wire (finding 2's guide sentence). Recorded without change: `Drift.source`'s vocabulary strain. Resolved by the Orchestrator: `findKindIndex` has no TypeScript consumer in the fleet (the sweep over `/home/user/fleet` and `/home/user/scaffold` outside `node_modules`, `dist`, `tmp`, and `.orkestrel` names only the vendored `guides/guide.md` mirrors), so the removal's blast radius is the mirror refresh at the guide release and no cascade unit is needed.
- Dropped: none.

VERDICT: FAIL 2 3 8 — a fix round follows on `d1-fix-brief.md`, audited afresh by the two Opus lanes and the checker because the rulings on findings 2 and 7 depart from the lanes' prescriptions.
