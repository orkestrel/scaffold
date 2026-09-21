# CL8 audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl8-audit-claims-2.md` with CONFIRMED, REFUTED,
or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding that is an
implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on the
evidence you have and say plainly that the independent run is not in your slice; do not call a fix
round for its absence.

## Evidence

The rendered diff over the CL7 landing `a9172df` at `cl8-diff-2.patch.txt`, round 1's at
`cl8-diff.patch.txt`, and the statuses `tmp/audit/cl8-status-2.txt` and
`tmp/audit/cl8-status.txt`, all under `C:/Users/mikes/WebstormProjects/scaffold/`; the live Veneer
tree at `C:/Users/mikes/WebstormProjects/veneer`, including `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/src/styles/components/grid.test.ts`,
`tests/app/browser/sections/LayoutSection.test.ts`, `tests/setupConformance.ts`,
`src/styles/components/_grid.scss`, `guides/veneer.md`, `tests/fixtures/oracle/inventory.json`, and
the built `dist/src/styles/index.css`; and the retained briefs and the fix report under
`.orkestrel/veneer/units/`, read only to learn what the unit claims. Rule on the tree.

## Probes

- The status is identical between the two rounds, path for path, with no addition and no removal.
- The diff-to-diff delta is exactly `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
  `tests/src/styles/components/grid.test.ts`, and
  `tests/app/browser/sections/LayoutSection.test.ts`. Compare every other file's blob hashes between
  the two diffs and name any that differ. `src/styles/components/_grid.scss`,
  `src/styles/_mixins.scss`, `src/styles/components/_container.scss`, `guides/veneer.md`,
  `tests/conformance.test.ts`, and `tests/setupConformance.test.ts` must be byte-identical across
  the rounds.
- The plant sites are clean: `dist/src/styles/index.css` carries every recorded grid selector and no
  unrecorded one, and `tests/setupStyles.ts` carries the full reading rows. Name the boundaries and
  readings you find.
- The new assertion's operands: quote it. Confirm the cascade comes from the existing reader, the
  record from the pinned inventory, and the deferrals from `readDeferrals` rather than a literal
  list. Confirm the comparison is over a multiset rather than a set.
- The extracted ramp function has more than one caller, is exported from `tests/setupStyles.ts`, and
  is named in the exports assertion. Name its callers.
- The showcase assertion addresses the navigation specimen by name rather than by position. Quote
  the selector.
- Law sweep over the round's added lines: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `styles.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
