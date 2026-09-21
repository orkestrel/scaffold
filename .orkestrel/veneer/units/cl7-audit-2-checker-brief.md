# CL7 audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl7-audit-claims-2.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on
the evidence you have and say plainly that the independent run is not in your slice; do not call
a fix round for its absence.

## Evidence

The rendered diff over the CL6 landing `c8f53f8` at `cl7-diff-2.patch.txt`, round 1's at
`cl7-diff.patch.txt`, and the statuses `tmp/audit/cl7-status-2.txt` and
`tmp/audit/cl7-status.txt`, all under `C:/Users/mikes/WebstormProjects/scaffold/`; the live
Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, including
`tests/setupStyles.test.ts`, `tests/src/styles/components/container.test.ts`,
`src/styles/_mixins.scss`, `src/styles/components/_container.scss`, `src/styles/_tokens.scss`,
`src/core/constants.ts`, and `dist/src/styles/index.css`; and the retained briefs and both
reports under `.orkestrel/veneer/units/`, read only to learn what the unit claims. Rule on the
tree.

## Probes

- The status is identical between the two rounds, path for path, with no addition and no removal.
- The diff-to-diff delta is exactly `tests/setupStyles.test.ts` and
  `tests/src/styles/components/container.test.ts`. Compare every other file's blob hashes between
  the two diffs and name any that differ. The partial, the tokens, the registry, the guide rows,
  the listed value, and the section must be byte-identical across the rounds.
- The plant's site: `src/styles/_mixins.scss` is absent from both statuses, and its ramp carries
  exactly the boundaries it carried at round 1. Name them, and confirm no extra member remains.
- The set assertion: quote it. Confirm it derives the ramp names by compiling or reading the real
  ramp rather than from a literal list, and that it compares as sets in both directions. Name the
  container token keys it compares against and confirm those come from the registry.
- The removal: compare the container proof against its round-1 form in the earlier diff. Name
  every case present in round 1 and absent now, and confirm each absence is a direction duplicate
  rather than a dropped reading. The case count should fall by the number of duplicated cases and
  by nothing else.
- Law sweep over the round's added lines: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `styles.md`, `tests.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
