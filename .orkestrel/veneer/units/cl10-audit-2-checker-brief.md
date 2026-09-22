# CL10 audit round 2 — mechanical conformance brief

## Role and engine

`checker` on the native cheap tier, clean context, read-only. You run beside two adversarial lanes and
replace neither. Perform the assignment directly and spawn nothing.

## Objective

Rule on the mechanical claims of
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-audit-2-claims.md` — claims 2, 6, 7, 10, 12,
14, 16, 18, 20, 21, and 23 — with CONFIRMED, REFUTED, or UNPROVEN and the exact evidence.

## Two standing instructions, and why they are here

**Answer a question of the form "does this tree do X" by searching for X already being done, never by
inspecting the interface that would do it.** A scope read on this unit reported a mechanism
unreachable after inspecting one interface; the mechanism was an installed export already imported by
name in several proofs in the same tree. Grep for the population's existing members first, and name
the pattern you searched and the paths it covered — including for a clean result.

**Do not confirm a runtime result whose only evidence is the writer's own report.** A previous round's
checker correctly refused exactly that, and it was right. If a claim needs a command you cannot run,
report UNPROVEN and say what would settle it.

## What is closed

Round 1 accepted the shipped cascade. Rule only on what this fix round changed.

## Evidence

- The diff over the CL9 landing, carrying round 1 and the fix together:
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-diff-2.patch`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status-2.txt`
- The effective brief, which fixes the owned and off-limits sets:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-brief-2.md`, over
  `units/cl10-brief.md`
- The measurements: `.orkestrel/veneer/units/cl10-fix-terrain.md`
- The report: `.orkestrel/veneer/units/cl10-report-2.md`
- The live tree: `C:/Users/mikes/WebstormProjects/veneer`

## What each claim needs

- **Claim 2** — the boundary fix is in the one shared expression and applies to every prefix it names,
  not duplicated or special-cased per key. Read the expression.
- **Claims 6 and 7** — the reader is exported from the browser setup module and the icon-shift case
  calls it; no function assignment remains in that case body. The browser setup module and its proof
  changed **only** for that export, its import, the export-list assertion, and the proof. Read both
  diffs line by line and report any other edit.
- **Claim 10** — the ratio partial destructures in the loop header and no longer imports the Sass list
  module. Confirm the import is gone and that nothing else in the partial changed.
- **Claim 12** — the guide's icon-link row changed in its Notes cell only. No row's granularity
  changed, and no row was added or removed.
- **Claim 14** — the markup constant sits in alphabetical position in the export-list literal.
- **Claim 16** — search `tests/**/*.ts` for the table constants the freeze assertion names, and report
  every consumer. Confirm no table's values changed in the diff.
- **Claim 18** — the even-child equivalence in the selector normalizer is untouched by this round.
- **Claim 20** — the status lists only files the two effective briefs own, and no off-limits path was
  touched.
- **Claim 21** — no key, family, deferral, or departure was added. Check the guide's deferral table and
  the conformance enumerations against round 1's state.
- **Claim 23** — the report's account matches the diff and the tree.

## Output

One ruling per claim with its evidence, then any mechanical defect you found that no claim names,
numbered after the last claim. No terminal verdict line: you advise, you do not rule the round.
