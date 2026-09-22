# CL11 audit round 1 — mechanical conformance brief

## Role and engine

`checker` on the native cheap tier, clean context, read-only. You run beside two adversarial lanes and
replace neither. Perform the assignment directly and spawn nothing.

## Objective

Rule on the mechanical claims of
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-audit-claims.md` — claims 3, 4, 6, 7, 11, 17,
20, 23, 24, and 25 — with CONFIRMED, REFUTED, or UNPROVEN and the exact evidence.

## Two standing instructions

**Answer a question of the form "does this tree do X" by searching for X already being done, never by
inspecting the interface that would do it.** Name the pattern you searched and the paths it covered,
including for a clean result.

**Do not confirm a runtime result whose only evidence is the writer's own report.** A previous round's
checker refused exactly that and was right. If a claim needs a command you cannot run, report UNPROVEN
and say what would settle it.

## Evidence

- The diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-diff.patch`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-status.txt`
- The brief, which fixes the owned and off-limits sets:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl11-brief.md`
- The measurements: `.orkestrel/veneer/units/cl11-terrain.md`
- The report: `.orkestrel/veneer/units/cl11-report.md`
- The live tree: `C:/Users/mikes/WebstormProjects/veneer`

## What each claim needs

- **Claim 3** — the reworked visitor's default keeps every existing caller working. Search the tree
  for its call sites and confirm each still compiles against the new signature, including callers in
  files this unit does not own.
- **Claim 4** — the portfolio's state list is derived from the new table rather than hand-written.
  Read both declarations.
- **Claim 6** — the placement proof compares placements against the declared list in **both**
  directions. Read the assertion and say which direction each half covers.
- **Claim 7** — the four variant projects fix the two widths the terrain names, and every case runs in
  every project.
- **Claim 11** — every key on the consumer page is read beside an unclassed twin of its own tag. List
  the pairs.
- **Claim 17** — search the whole tree for the old reader name and report every file that comes back.
  The unit claims the set is exactly its owned files. Confirm or refute that, and confirm no guide
  names it.
- **Claim 20** — the plant was removed and left nothing behind. Search the file for the planted
  literal.
- **Claim 23** — the status lists only owned files, no off-limits path was touched, and the
  Button-family section proof carries the rename's call sites and one case title and nothing else.
  Read that file's diff line by line.
- **Claim 24** — no receipt is claimed and no test reading is presented as one.
- **Claim 25** — the report's account matches the diff and the tree.

## Output

One ruling per claim with its evidence, then any mechanical defect you found that no claim names,
numbered after the last claim. No terminal verdict line: you advise, you do not rule the round.
