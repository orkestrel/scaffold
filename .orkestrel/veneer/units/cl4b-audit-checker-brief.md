# CL4b audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4b-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL4 landing `bc580c1` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-diff.patch.txt` and the status at
`tmp/audit/cl4b-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`;
the retained brief and report under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/` (`cl4b-brief.md`,
`cl4b-report.md`), read only to learn what the unit claims. Rule on the tree.

## Probes

- Scope: the status lists exactly `tests/setupStyles.ts` and
  `tests/app/browser/sections/ContentSection.test.ts` outside `tmp/`, and nothing else. Every
  other path the brief names off-limits is absent from the diff, in particular
  `src/styles/elements/_hr.scss`, `app/browser/constants.ts`, `tests/setupStyles.test.ts`,
  `tests/setupConformance.ts`, `src/styles/_mixins.scss`, `tests/fixtures/**`, `guides/veneer.md`,
  `package.json`, and `configs/**`.
- The plants: `src/styles/elements/_hr.scss` matches its content at `bc580c1`, including the
  `@include box-reset { color: inherit; }` block, and `app/browser/constants.ts`'s first specimen
  name is its original value. Neither file appears in the status.
- The case table: `TEXT_HR_CASES` in `tests/setupStyles.ts` carries the three new width entries,
  each `'0px'`, inside the frozen `values` object; every pre-existing entry is unchanged; the
  table is still frozen at both levels; and `tests/src/styles/elements/hr.test.ts` derives its
  property list from `Object.keys(values)` so it needs no edit.
- The control: the literal specimen-name array in
  `tests/app/browser/sections/ContentSection.test.ts` has one entry per member of
  `CONTENT_SPECIMENS` in `app/browser/constants.ts`, in the same order, with the same strings.
  Compare them element by element and report any mismatch. No pre-existing assertion in that file
  is changed and no case is added.
- The export list: `tests/setupStyles.test.ts` is absent from the diff, and its export-name list
  still matches what `tests/setupStyles.ts` exports, because this change adds no export.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control, no plant residue.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `styles.md`, `architecture.md`, `names.md`. The
user has ruled that audits cover implementation only: report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
