# CL8b audit round 1 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl8b-audit-claims.md` with CONFIRMED, REFUTED, or
UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding that is an
implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on the
evidence you have and say plainly that the independent run is not in your slice; do not call a fix
round for its absence.

## Evidence

The rendered diff over the CL8 landing `d2c5bb3` at `cl8b-diff.patch.txt` and the status at
`tmp/audit/cl8b-status.txt`, both under `C:/Users/mikes/WebstormProjects/scaffold/`; the live Veneer
tree at `C:/Users/mikes/WebstormProjects/veneer`, including `src/styles/utilities/_gap.scss`,
`src/styles/index.scss`, `src/styles/_tokens.scss`, `src/core/constants.ts`,
`tests/src/styles/utilities/gap.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `guides/veneer.md`,
`tests/fixtures/oracle/inventory.json`, `node_modules/bootstrap/dist/css/bootstrap.css`, and the built
`dist/src/styles/index.css`; and the retained briefs and both reports under
`.orkestrel/veneer/units/`, read only to learn what the unit claims. Rule on the tree.

## Probes

- **The selector accounting, both directions.** Extract from the record every selector under `g`,
  `gx`, `gy`, and `row-gap`, and from the built cascade every selector under those prefixes with its
  media condition. Name any recorded selector absent at its condition, and any selector in the
  cascade the record does not carry. **Count occurrences, not just membership**: the combined gutter
  class must appear twice per step, once in each grouped rule, because the record carries it twice.
- **The grouping matches the distribution.** Read `node_modules/bootstrap/dist/css/bootstrap.css` and
  confirm the shape the partial emits is the shape Bootstrap emits, including which rules carry the
  important priority and which do not.
- **The tuple.** Quote the recorded key tuple in `tests/setupStyles.test.ts`. Confirm it names the
  three gutter keys and not `row-gap`, and confirm from the record that the `row` key carries every
  `.row-gap-*` selector so naming both would double-count. Name any other pair of tuple members whose
  selectors overlap.
- **The deferral deletion.** No deferral row naming a `.row-gap-*` selector remains in the guide, and
  every one of those selectors is present in the built cascade.
- **The listing.** `g`, `gx`, `gy`, and `row-gap` appear in the conformance listed array and in the
  conformance setup proof's component set, each in sorted position.
- **The step scale.** Six step tokens in `src/styles/_tokens.scss` carrying the values the record
  sets, none with a density factor, each with a registry leaf in `src/core/constants.ts` whose value
  follows the registry path law. Name the values you read.
- **The variable rows.** The guide carries a shipped variable row per custom property for each key
  whose properties object is non-empty, and none is required for a key whose object is empty. Name
  which keys are which from the record.
- **Law sweep over the round's added lines**: no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
  default export, no skipped case, no case named for a control.

## Law

`AGENTS.md` at the Veneer checkout root, and the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `styles.md`, `tests.md`,
`architecture.md`, `names.md`. Implementation only: report no prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
