# CL5b audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl5b-audit-claims-2.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on
the evidence you have and say plainly that the independent run is not in your slice; do not call
a fix round for its absence.

## Evidence

The rendered diff over the CL5 landing `ea82419` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl5b-diff-2.patch` and the status at
`tmp/audit/cl5b-status-2.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`;
the retained briefs, scope read, and report under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`, read only to learn what the
unit claims. Rule on the tree.

## Probes

- The status is identical between the two rounds, path for path, with no addition and no removal.
- The diff-to-diff delta is exactly `tests/setupConformance.ts` and
  `tests/setupConformance.test.ts`. Compare every other file's blob hashes between
  `tmp/audit/cl5b-diff.patch` and `tmp/audit/cl5b-diff-2.patch` and name any that differ. The two
  mixins, the four extraction consumers, the fixture, and both image proofs must be byte-identical
  across the rounds.
- The manifest and the lockfile are absent from both diffs. Name every import the round's changed
  lines add, and confirm none names a package the manifest does not declare.
- The contract module's existing exports: compare `tests/setupConformance.ts` across the two
  diffs. Name every export it carried after round 1, confirm each still exists with the same
  signature, and name any existing line this round changes beyond the sweep function's own body.
- The plants: `src/styles/elements/_address.scss` and `src/styles/components/_quote.scss` are
  absent from both diffs and match their content at `ea82419`. Search the source and test trees
  for residue of either round's planted names and report what you find.
- The cases: the round adds cases pinning the interpolated property name, the interpolation
  whitespace with its quoted carve-out, and literal forward-slash paths. Confirm each exists and
  name the assertion that would fail if its fix were reverted.
- Law sweep over the round's added lines: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`workspace.md`. Implementation only: **rule on no guide row and report no prose finding of any
kind.**

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
