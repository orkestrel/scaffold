# CL5 audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl5-audit-claims-2.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on
the evidence you have and say plainly that the independent run is not in your slice; do not call
a fix round for its absence.

## Evidence

The rendered diff over the CL4b landing `5240e36` at `cl5-diff-2.patch.txt`, round 1's at
`cl5-diff.patch.txt`, and the statuses `tmp/audit/cl5-status-2.txt` and
`tmp/audit/cl5-status.txt`, all under `C:/Users/mikes/WebstormProjects/scaffold/`; the live
Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`; the retained briefs and reports under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`, read only to learn what the
unit claims. Rule on the tree.

## Probes

- The status is identical between the two rounds, path for path, with no addition and no removal.
- The diff-to-diff delta is exactly `tests/src/styles/components/type.test.ts`,
  `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`. Compare every other file's blob hashes
  between the two diffs and name any that differ.
- `guides/veneer.md` is byte-identical between the two rounds. Brief 3 required this, so a
  difference of any size is a scope failure. Report only its identity or difference; make no
  judgment about the row content either way.
- The two new tables in `tests/setupStyles.ts` are frozen at both levels, and each row pairs a
  level with the token name that level uses in `src/styles/components/_type.scss` and
  `src/styles/elements/_heading.scss`. Compare the tables against both partials row by row and
  report any mismatch.
- `tests/setupStyles.test.ts` carries both new names in its export-name list, both tables' rows,
  and both tables in its frozen-table loop.
- No file under `src/styles/`, `app/browser/`, `tests/setupConformance.ts`, `tests/fixtures/`,
  `package.json`, or `configs/` changed in this round.
- Law sweep over the round's added lines: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control, no plant residue. Confirm
  `src/styles/components/_type.scss` carries its colour declaration and carries no literal size
  block.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `styles.md`, `architecture.md`, `names.md`.
Implementation only: **rule on no guide row and report no prose finding of any kind.**

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
