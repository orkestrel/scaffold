# CL4 audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL3b landing `d822d59` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-diff.patch.txt` and the status at
`tmp/audit/cl4-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
including `dist/src/styles/index.css` and `tests/fixtures/oracle/inventory.json`; the retained
briefs and reports under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`
(`cl4-brief.md`, `cl4-brief-2.md`, the rulings `cl4-brief-3.md` to `cl4-brief-6.md`, and
`cl4-report.md` to `cl4-report-5.md`), read only to learn what the unit claims; rule on the tree.

## Probes

- Scope: the status lists only files the six briefs own. The granted setup files appear for
  their granted purposes only: `tests/setupStyles.ts` for `normalizeComplexSelector`,
  `tests/setupStyles.test.ts` for its cases, `tests/setupConformance.test.ts` for scoping the
  ledger-derived cases, `tests/conformance.test.ts` for `listed`. `tests/setupConformance.ts`,
  `src/styles/_reset.scss`, `src/styles/_tokens.scss`, `src/styles/_mixins.scss`,
  `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from the
  diff.
- The key: the guide's § Compatibility carries a `reboot` row with kind `selector`, a dash Proof
  cell, and Status `shipped`; `tests/conformance.test.ts` reads `listed` as `['btn', 'reboot']`.
- The exclusion set: the guide's `### Deferred selectors` table carries exactly ten Owner
  `Excluded` rows with the names the claims list, each with a nonempty Reason; each name appears
  verbatim in the pinned inventory's `reboot` selector list; and none appears in
  `dist/src/styles/index.css`.
- The partials: each new file under `src/styles/elements/` selects one bare tag plus that tag's
  own pseudo-class, attribute, and mandated-pair selectors (`MANDATED_TAG_PAIRS` at
  `tests/setupStyles.ts:780-799`); each loads from `src/styles/index.scss`; the layer order line
  in `_tokens.scss` is unchanged; `tests/src/styles/index.test.ts` is absent from the diff; no
  new declaration uses a physical-axis longhand (`margin-left`, `padding-right`, `left`,
  `right`, `float: left|right`, `text-align: left|right`) except where the report records a
  retained departure.
- The canonicalization: `normalizeComplexSelector` folds only `:before`, `:after`,
  `:first-line`, and `:first-letter`, and drops a universal only immediately before a
  pseudo-element; `tests/setupStyles.test.ts` carries the cases the claims list, including one
  proving a genuinely absent selector stays absent.
- The conformance cases: each ledger-derived case in `tests/setupConformance.test.ts` scopes its
  rows to one component or controls its own population; no assertion was deleted or relaxed
  (compare each changed case against its form in `cl4-diff.patch.txt`); the dash-proof
  case's loop is unchanged.
- The section: `CONTENT_SPECIMENS` grows by one specimen per new family, frozen and typed;
  `tests/app/browser/sections/ContentSection.test.ts`'s count and sequence assertions grow with
  it; `app/browser/index.ts` is absent from the diff.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control, no plant residue.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `documentation.md`. The user has ruled that audits cover implementation only:
report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
