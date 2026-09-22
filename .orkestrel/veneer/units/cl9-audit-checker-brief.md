# CL9 audit round 1 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl9-audit-claims.md` with CONFIRMED, REFUTED, or
UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding that is an
implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**Every `file:line` you cite must exist in the file you name.** Confirm the file is long enough to
have the line and that the line says what you claim.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on the
evidence you have and say plainly that the independent run is not in your slice; do not call a fix
round for its absence.

## Evidence

The rendered diff over the CL8b landing `8c70787` at `tmp/audit/cl9-diff.patch` and the status at
`tmp/audit/cl9-status.txt`, both under `C:/Users/mikes/WebstormProjects/scaffold/`; the live Veneer
tree at `C:/Users/mikes/WebstormProjects/veneer`, including `src/styles/components/_table.scss`,
`src/styles/index.scss`, `tests/src/styles/components/table.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`,
`tests/setupConformance.ts` (read-only reference), `guides/veneer.md`,
`app/browser/sections/TableSection.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`,
`app/browser/index.ts`, the three application proofs, `tests/fixtures/oracle/inventory.json`,
`node_modules/bootstrap/dist/css/bootstrap.css`, and the built `dist/src/styles/index.css`; and the
retained brief, terrain record, scope read, and report under `.orkestrel/veneer/units/`, read only to
learn what the unit claims. Rule on the tree.

## Probes

- **The selector accounting, both directions.** Extract from the record every selector under the
  table key, and from the built cascade every selector under that key's families with its media
  condition. Name any recorded selector absent at its condition, and any table-family selector in the
  cascade the record does not carry. Report families and counts, never long lists.
- **The condition arithmetic.** For each recorded maximum-width boundary, compute what the unit's
  normalizer maps it to and compare against what the built cascade emits for the same selector. Name
  each pair. Confirm the record's fractional boundaries and the cascade's whole ones meet.
- **The normalizer's importer.** Confirm `normalizeComplexSelector` is declared in
  `tests/setupStyles.ts` and imported by `tests/setupConformance.ts`, so there is one normalizer
  rather than two. Name any second selector-normalizing function either file declares.
- **The listing and the variable rows.** The key appears in the conformance listed array and in the
  conformance setup proof's component set, each in sorted position. The guide carries a selector row
  per family and a shipped variable row for every custom property the record carries — name the count
  you read from the record and the count of rows you find.
- **The deferral table.** No deferral row names a table-family selector, and no table-family selector
  is absent from the cascade. If both hold, the key ships whole.
- **The token files are absent.** `src/styles/_tokens.scss` and `src/core/constants.ts` appear in
  neither the status nor the diff, which is what the unit's report claims — the existing state token
  already carried the recorded factor.
- **The showcase registration.** The new section is registered in the showcase and the application
  barrel, and each registration has a proof that names it.
- **Law sweep over the round's added lines**: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `styles.md`, `tests.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
