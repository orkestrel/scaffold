# CL8b audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl8b-audit-claims-2.md` with CONFIRMED, REFUTED,
or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding that is an
implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim. A lane in this round's predecessor confirmed a
claim on citations past a file's end and had that verdict discarded.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on the
evidence you have and say plainly that the independent run is not in your slice; do not call a fix
round for its absence.

## Evidence

The rendered diff at `cl8b-diff-2.patch.txt`, round 1's at `cl8b-diff.patch.txt`, and the
statuses `tmp/audit/cl8b-status-2.txt` and `tmp/audit/cl8b-status.txt`, all under
`C:/Users/mikes/WebstormProjects/scaffold/`; the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`, including `src/styles/_mixins.scss`,
`src/styles/components/_grid.scss`, `src/styles/utilities/_gap.scss`,
`tests/src/styles/utilities/gap.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`,
`app/browser/constants.ts`, `tests/app/browser/sections/LayoutSection.test.ts`, and the built
`dist/src/styles/index.css`; and the retained briefs and reports under `.orkestrel/veneer/units/`,
read only to learn what the unit claims. Rule on the tree.

## Probes

- **The status delta.** `tmp/audit/cl8b-status-2.txt` adds exactly `src/styles/_mixins.scss` and
  `src/styles/components/_grid.scss` to round 1's status and removes nothing. Name any other
  difference.
- **The diff-to-diff delta.** Compare every file's blob hashes between the two diffs and name each
  that differs. `src/styles/utilities/_gap.scss`, `src/styles/_tokens.scss`, `src/core/constants.ts`,
  `guides/veneer.md`, `tests/conformance.test.ts`, and `tests/setupConformance.test.ts` must be
  byte-identical across the rounds — those are what round 1 accepted.
- **The grid partial's change is the call site alone.** Quote its diff hunk and confirm no rule, no
  selector, and no declaration changed — only the loop's opening and the re-indentation its removal
  causes.
- **The extracted mixin.** Quote it. Confirm it yields both the infix and the boundary, and name its
  callers across `src/styles/`. Confirm no third caller exists and that neither partial retains its
  own copy of the preamble.
- **The folder guard.** Quote the list it now carries and confirm it names the utilities folder.
- **The derived step list.** `app/browser/constants.ts` and
  `tests/app/browser/sections/LayoutSection.test.ts` derive the step list from the registry rather
  than repeating a literal. Quote both.
- **The density case.** Quote it. Confirm the factor is set on the document element, that a
  restoration runs whatever the outcome, and that a reading derived from the density-scaled scale is
  asserted before, during, and after.
- **Law sweep over the round's added lines**: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `styles.md`, `tests.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
