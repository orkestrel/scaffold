# CL3 audit round 3 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3-audit-claims-3.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL2 landing `9f5ffda` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-diff-3.patch.txt` and the status at
`tmp/audit/cl3-status-3.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`;
the retained brief and report under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`
(`cl3-brief-5.md` the round-3 fix brief over briefs 4, 3, and 2; `cl3-report-4.md`, `cl3-report-3.md`, `cl3-report-2.md`), read only to learn what the unit
claims; rule on the tree.

## Probes

- Scope: the status lists only the brief's owned files (`src/styles/_reset.scss`,
  `src/styles/index.scss`, the text tag partials under `src/styles/elements/` the brief names,
  `_html.scss` and `_body.scss` where touched, the proofs under `tests/src/styles/elements/`
  and `tests/src/styles/reset.test.ts`, `tests/src/styles/index.test.ts`,
  `app/browser/sections/ContentSection.ts`, `app/browser/constants.ts`, `types.ts`, `index.ts`,
  `Showcase.ts`, `tests/app/browser/sections/ContentSection.test.ts`,
  `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `guides/veneer.md`, and brief 3's grants: `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/core/constants.ts`, `tests/src/styles/tokens.test.ts`);
  `src/styles/components/**`, `_theme.scss`, `src/core/types.ts`,
  `src/browser/**`, `tests/setup*.ts` and their proofs, `tests/conformance.test.ts`,
  `tests/app/browser/integration.test.ts`, `tests/fixtures/**`, `package.json`, `configs/**`,
  and the vendored files are absent from the diff.
- Partials: one bare tag per partial file name (the heading family in `_heading.scss`, `dl`
  with `dt` and `dd` in `_dl.scss`); every selector in the `elements` layer is one bare tag, a
  pseudo-class or attribute on one bare tag, or a pair in `MANDATED_TAG_PAIRS`
  (`tests/setupStyles.ts:437-456`); no physical-axis longhand (`margin-left`, `padding-right`,
  `left`, `right`, `text-align: left|right`) in any new declaration; every new partial is loaded
  from `src/styles/index.scss` after `theme` and the layer order line in `_tokens.scss` is
  unchanged; `_reset.scss` declares its rules inside `@layer reset` and no other partial
  declares `box-sizing`, `[hidden]`, or `scroll-behavior`.
- Values: for each partial, the proof's case table names the source (a `calibration-content.md`
  row or `retained`) and the value it asserts equals that source's value; a heading's size binds
  a `--vn-size-*` token, weight `--vn-weight-heading`, line height `--vn-line-heading`, margins
  `--vn-space-*`; the anchor's colour reads `rgba(var(--vn-link-rgb), var(--bs-link-opacity, 1))`;
  `_body.scss` reads `text-align: var(--bs-body-text-align, start)`.
- Section: `ContentSection` implements `SectionInterface` (`app/browser/types.ts:10-15`) with
  the same constructor and `destroy` shape as `ButtonSection`; `CONTENT_SPECIMENS` is frozen in
  `app/browser/constants.ts` and typed by `ContentSpecimen` in `types.ts`; `Showcase.ts` mounts
  it after `ButtonSection`; `app/browser/index.ts` re-exports it directly; the export-set
  assertion in `tests/app/browser/index.test.ts` equals the live barrel's export set.
- Guide: one files-table row per new partial; the three departure rows sit under
  `### Departures from Bootstrap`; the Showcase region sentence names the content region; the
  § Compatibility table is unchanged and `listed` in `tests/conformance.test.ts:55` reads
  `['btn']`.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export outside a config, no skipped case, no case named for a control, no plant residue the
  report names.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`, `documentation.md`. The user has ruled that audits cover
implementation only: report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
