# Audit verdict — D1 guide-readers, round 1

Workflow `wf_ebc4f348-705`, 2026-09-07 01:00 to 01:11 UTC. Lanes on `d1-audit-brief.md`, blind, clean contexts: subjective `reviewer` (Opus 5) — `VERDICT: FAIL 2 3`, claim 9 CANNOT RULE; objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench) — `VERDICT: FAIL 3 8`; `checker` (Sonnet) — `VERDICT: PASS`; `verifier` (Sonnet) — `GATES: GREEN` over the guide package's chain. Every lane ran; no lane substituted or dropped.

## Reconciliation

- Claim 3 (both lanes): a row with no code-span name is dropped silently at `helpers.ts:1318` and `:1390`, and a pair with no text on either side reports agreement at `helpers.ts:1841` while `guides/guide.md:467-469` promises "never as agreement" (objective claim 8). Ruled: the nameless row becomes a finding through a new `find*` check; the both-absent pair becomes a `Drift` with the key alone, which keeps the plan's decision 3 and the guide's sentence and makes SQ and MQ non-vacuous by construction. Carried by `d1-fix-brief.md` findings 1 and 2.
- Claim 2 (subjective): the transform is worded per side while the code applies one form to both, and the image descent is undocumented. Ruled: one transform, both sides, stated once; no code change. Finding 3.
- Claim 9 (subjective, CANNOT RULE on gate evidence): resolved by the verifier's independent run.
- Findings outside the claims, carried: `collectTitled` to `collectTitles` (finding 4); the Helpers table placement (finding 5); the over-indented tag gap in `normalizeComment`'s consumers (finding 6); several fences under one heading (finding 7, ruled first-fence-compared); the catalog describing checks this checkout does not wire (finding 2's guide sentence). Recorded without change: `Drift.source`'s vocabulary strain. Resolved by the Orchestrator: `findKindIndex` has no TypeScript consumer in the fleet (the sweep over `/home/user/fleet` and `/home/user/scaffold` outside `node_modules`, `dist`, `tmp`, and `.orkestrel` names only the vendored `guides/guide.md` mirrors), so the removal's blast radius is the mirror refresh at the guide release and no cascade unit is needed.
- Dropped: none.

VERDICT: FAIL 2 3 8 — a fix round follows on `d1-fix-brief.md`, audited afresh by the two Opus lanes and the checker because the rulings on findings 2 and 7 depart from the lanes' prescriptions.

## Round 2 (after D1-fix)

Workflow `wf_0d38f9ee-273`, 2026-09-07 01:35 to 01:48 UTC. Lanes on `d1-fix-audit-brief.md`, blind, clean contexts: subjective `reviewer` (Opus 5) — `VERDICT: FAIL 1, 8` (claim 8 CANNOT RULE on gate evidence); objective `reviewer` (Opus 5, the recorded substitution) — `VERDICT: PASS` with six findings; `checker` (Sonnet) — `VERDICT: PASS`; `verifier` (Sonnet) — `GATES: GREEN` over the guide package's chain (`test:src:core` 471 passed, `test:guides` 47 passed). Every lane ran.

Reconciliation: claim 1 (subjective) — `findUnnamed(document)` forces the drop-in suite to import the markdown package and parse each spec twice, against the package's parse-once contract; ruled: a cached `Guide.unnamed()` projection the way `tagline` got one, the reader renamed `extractUnnamed`; the RN row's separator and sentence corrected, and RN's limit stated (objective F2). Claim 8 resolved by the verifier. Carried: the projection enumeration (subjective F1), the tag rule's one term at every owned site (subjective F2, objective F3), `\|` as a guide-side clause (subjective F3), the fenced-body exclusion from the tag search with a fixture (objective F4), the per-title pairing statement (objective F5), the report citations (objective F6). Recorded without change: `collectTitles` naming (subjective F4). Dropped: none.

VERDICT: FAIL 1 — a third round follows on `d1-fix-2-brief.md`; every fix adopts a lane's prescription, so it closes with `checker` and `verifier`. Rounds at this seam: three, the budget; the findings narrowed from behaviour (round 1) to one API shape and prose accuracy (round 2), so the seam is closing rather than relocating.
