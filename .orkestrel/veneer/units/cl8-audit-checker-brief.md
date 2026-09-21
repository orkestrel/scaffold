# CL8 audit round 1 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl8-audit-claims.md` with CONFIRMED, REFUTED, or
UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding that is an
implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on the
evidence you have and say plainly that the independent run is not in your slice; do not call a fix
round for its absence.

## Evidence

The rendered diff over the CL7 landing `a9172df` at `tmp/audit/cl8-diff.patch` and the status at
`tmp/audit/cl8-status.txt`, both under `C:/Users/mikes/WebstormProjects/scaffold/`; the live Veneer
tree at `C:/Users/mikes/WebstormProjects/veneer`, including `src/styles/components/_grid.scss`,
`src/styles/_mixins.scss`, `src/styles/components/_container.scss`, `src/styles/index.scss`,
`tests/src/styles/components/grid.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `guides/veneer.md`,
`tests/fixtures/oracle/inventory.json`, and the built `dist/src/styles/index.css`; and the retained
briefs and all three reports under `.orkestrel/veneer/units/`, read only to learn what the unit
claims. Rule on the tree.

## Probes

- **The selector accounting, in both directions.** Extract from the inventory every selector under
  `row`, `col`, and `offset`, and from the built cascade every grid selector with its media
  condition. Name any recorded selector absent from the cascade at its condition, and any grid
  selector in the cascade the record does not carry. Report families and counts, never the lists.
- **The withheld names are absent.** No `.row-gap-*` selector and none of the three
  `.col-form-label*` selectors appears in the built cascade.
- **The deferral rows.** Every withheld name has its own row in the guide's deferred-selector table
  with an owner. Name any withheld name with no row, and any deferral row naming a selector that is
  present in the cascade.
- **The listed value.** `row`, `col`, and `offset` appear in `tests/conformance.test.ts`'s listed
  array in sorted position.
- **The granted assertion.** `tests/setupConformance.test.ts` differs from its base only by adding
  `col`, `offset`, and `row` to one component set. Name any other changed line in that file.
- **The extraction's call sites.** Each extracted mixin in `src/styles/_mixins.scss` has exactly two
  callers across `src/styles/`. Name them.
- **The container is otherwise untouched.** `src/styles/components/_container.scss` differs from its
  base only by replacing the extracted declarations with the two `@include` lines. Quote the diff
  hunk. Confirm `tests/src/styles/components/container.test.ts` is absent from the status.
- **Law sweep over the round's added lines**: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `styles.md`, `tests.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
