# CL12 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. **Astra wrote this fix round, so you hold the OBJECTIVE
lane** (correctness, rule compliance, test sufficiency, scope honesty) and the Astra analyst holds the
subjective lane. The lanes swap back from round 1, where Opus wrote the work and Astra held this lane.

Read the work as work you did not write. Perform the assignment directly and spawn nothing. You edit
nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl12-audit-2-claims.md`
with CONFIRMED, REFUTED, or UNPROVEN and the deciding evidence, add any extra finding that is an
implementation defect (numbered after the last claim, with a site and a one-line failure scenario,
distinguishing one that forces another round from one that does not), and end with one terminal line:
`Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Standing instructions

**Cite every site by its section heading**; give a line number only as "currently around N".

**Read a value out of the built cascade's own bytes.** Never confirm a sentence by finding it in the
guide. The round-1 defect was a sentence that read plausibly and the cascade falsified.

**The user has ruled implementation over prose.** Report no wording or register finding. A sentence is
in scope only as a contract, judged on its facts.

## What is closed

Round 1's guide edits are accepted but for the two sentences this round corrects. Do not re-litigate
the added token rows, the compatibility row, the Files rows, the tests links, or the deferral shapes.

## Evidence

- The cumulative diff over `eb1cd71`: `.../tmp/audit/cl12-diff-2.patch`
- **Round 1's diff, which isolates this round's changes**:
  `.../.orkestrel/veneer/units/cl12-diff.patch.txt`
- The status: `.../tmp/audit/cl12-status-2.txt`

Read those and these live Veneer files: `guides/veneer.md`, the built `dist/src/styles/index.css`,
`src/styles/components/_container.scss`, `tests/fixtures/oracle/inventory.json`,
`tests/setupConformance.ts` as the machinery the tables must satisfy, and
`tests/src/styles/components/container.test.ts` as the proof the unit says already asserts the fluid
reading.

Read the retained records under `.../.orkestrel/veneer/`: the effective brief `units/cl12-brief-2.md`
over `units/cl12-brief.md`, the measurements `units/cl12-fix-terrain.md`, the report
`units/cl12-report-2.md`, round 1's report `units/cl12-report.md` — **which this round corrects in
four places** — round 1's verdict `cl12-audit-verdict.md`, and the retained instruments under
`units/cl12-instruments/` and `units/cl12-instruments-2/`.

## Push hardest on these

- **Whether the corrected container paragraph is true in every clause**, including the three
  boundary-to-token pairs and the fluid clause the round-1 wording carried unmeasured. Read the media
  rules yourself.
- **Whether the fluid measurement is real.** The unit claims both a cascade parse and an existing proof
  that asserts it at every boundary. Verify the proof actually asserts what the report says.
- **Whether the deferred-name justification now holds.** Its reason moved from authorship to inventory
  membership. Check the pinned inventory.
- **Whether the strengthened gate recommendation is actionable.** Round 1's proposal could not fail for
  the defect it targeted. Judge whether the replacement can, and whether its negative control would
  catch the row-deleted-prose-remains case.
