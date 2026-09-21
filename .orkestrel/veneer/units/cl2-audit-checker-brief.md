# CL2 audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl2-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL1 landing at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-diff.patch.txt`
and the status at `tmp/audit/cl2-status.txt`; the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`; the retained brief and report under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/` (`cl2-brief-2.md`, the
effective brief; `cl2-report.md`), read only to learn what the unit claims; rule on the tree.

## Probes

- Scope: the status lists only the brief's owned files (`src/styles/_tokens.scss`,
  `_mixins.scss`, `src/core/types.ts`, `src/core/constants.ts`, `tests/src/core/index.test.ts`,
  `tests/src/styles/tokens.test.ts`, `mixins.test.ts`, its fixture, `tests/setupStyles.ts` and
  its proof, `tests/setupBrowser.ts` and its proof, `guides/veneer.md`); `src/styles/elements/**`, `src/styles/components/**`,
  `src/browser/**`, `app/**`, `tests/app/**`, `tests/setupConformance*.ts`,
  `tests/conformance.test.ts`, `package.json`, `configs/**`, and the vendored files are absent
  from the diff; in `tests/setupBrowser.ts` the diff touches only a media-condition reader (the
  `visitBreakpoint` and `holdOraclePointer` bodies are unchanged).
- Mixins: `breakpoint-up` and `breakpoint-down` exist in `src/styles/_mixins.scss`, take
  `@content`, and refuse an unknown name with `@error`; the `--vn-breakpoint-*` declarations in
  `_tokens.scss` and the mixins' conditions derive from one Sass source (name it and its home);
  the fixture carries a class per name under each mixin; the proof asserts the condition values
  against the resolved tokens and the viewport readings below, at, and above each boundary
  through `visitBreakpoint` over `BREAKPOINT_CASES`.
- Registry: every new `--vn-*` name the cascade declares has a leaf in `TOKEN_NAMES` and the
  reverse; list the new leaves; `tests/src/core/index.test.ts`'s export-set and freeze
  assertions still hold.
- Values: `--vn-space-12` and `--vn-space-24` follow the ramp's `calc(<index> * 0.125rem *
  var(--vn-factor-density))` law; `--vn-display-1` to `-6` read `5rem`, `4.5rem`, `4rem`,
  `3.5rem`, `3rem`, `2.5rem`; `--vn-state-stripe` sits beside `--vn-state-hover` and
  `--vn-state-active` in the theme closure with Bootstrap's `0.05` as its value.
- Breakpoints: the proof reads media conditions from the built cascade and compares them to
  the resolved `--vn-breakpoint-*` tokens; where a reader was added to `tests/setupBrowser.ts`
  (a reader over a live stylesheet) or `tests/setupStyles.ts` (a helper over CSS text), it is
  exported, named `{verb}{Noun}`, cased in that module's proof, and listed in its export
  inventory; the guide's `### Deferred names` row for `breakpoint-down` is gone and nothing
  reads it.
- Guide: one row per new token in § Tokens' reference map with a value and a source, in the
  table's existing shape; no other guide line changed beyond those rows and the deleted
  deferred-name row.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no skipped case
  other than `it.runIf`, no case named for a control, no `PLANT` residue; every plant the report
  names is gone from the tree.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `typescript.md`, `names.md`,
`documentation.md`. The user has ruled that audits cover implementation only: report no wording
or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
