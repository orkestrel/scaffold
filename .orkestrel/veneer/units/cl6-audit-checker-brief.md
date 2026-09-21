# CL6 audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl6-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on
the evidence you have and say plainly that the independent run is not in your slice; do not call
a fix round for its absence.

## Evidence

The rendered diff over the CL5c landing `c1c81a4` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl6-diff.patch.txt` and the status at
`tmp/audit/cl6-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
including `dist/src/styles/index.css` and `tests/fixtures/oracle/inventory.json`; the retained
briefs and both reports under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`, read only to learn what the
unit claims. Rule on the tree.

## Probes

- **Completeness, the probe that matters most.** Extract every selector the pinned inventory
  records under the `link` key and check each against `dist/src/styles/index.css`. Report any
  inventory selector absent from the cascade and any link selector in the cascade the inventory
  does not carry. The unit claims none is excluded; this is the check of that claim.
- The listed set: `tests/conformance.test.ts`'s listed value carries the key, and the guide's
  compatibility table carries one shipped selector row and one shipped variable row per
  inventory property for it. Name each row and its status.
- The conformance setup proof: read the case the unit names as having failed, quote what it
  reads, and say whether it reads the whole compatibility table or a scoped slice. Then say
  whether the unit's one-line edit to it is inside brief 1's grant of that file "where the key's
  rows move a population".
- Scope: the status lists only files the three briefs own.
  `src/styles/components/_button.scss`, `src/styles/_mixins.scss`, `tests/setupConformance.ts`,
  `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from the
  diff. Name every path in the status and the brief clause that grants it.
- The button proof: its diff is exactly the two authorized assertions and nothing else. Quote
  both before and after.
- The guide: the diff touches only the compatibility rows for this key. Name every guide line the
  diff changes.
- The partial: every rule sits inside the components layer, and `src/styles/index.scss` loads it
  once beside the other component partials.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control, no plant residue. Search the source and
  test trees for residue of the selector mutation the unit reports.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `documentation.md`. Implementation only: report no prose finding. The guide's
compatibility rows are in scope as a contract, judged on whether they are the rows the deciding
function requires, never on their wording.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
