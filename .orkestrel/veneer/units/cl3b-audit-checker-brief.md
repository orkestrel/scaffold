# CL3b audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3b-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL3 landing `9bb306e` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-diff.patch.txt` and the status at
`tmp/audit/cl3b-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`;
the retained brief and report under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/` (`cl3b-brief-2.md` over
`cl3b-brief.md`, `cl3b-report.md`), read only to learn what the unit claims; rule on the tree.

## Probes

- Scope: the status lists only the eighteen paths the brief owns, and nothing else;
  `tests/setupStyles.test.ts`, `tests/src/styles/integration.test.ts`,
  `tests/src/core/index.test.ts`, `tests/conformance.test.ts`, `src/styles/_theme.scss`,
  `src/styles/components/**`, `src/browser/**`, `app/**`, `tests/fixtures/**`, `package.json`,
  `configs/**`, and the vendored files are absent from the diff.
- The rename: no `--vn-font-mono` that is not `--vn-font-mono-base` or `--vn-font-mono-short`
  remains anywhere under `src/`, `tests/`, `app/`, or `guides/`, nor in the built
  `dist/src/styles/index.css`; the registry's `font.mono` group carries exactly `base` and
  `short`; every leaf's value still equals `--vn-` plus its registry path joined with `-`
  (`tests/src/core/index.test.ts`'s path law, which is unedited); `--bs-font-monospace` reads
  `var(--vn-font-mono-base)` and its value is unchanged.
- The registry: every new `--vn-*` name the cascade declares has a leaf in `TOKEN_NAMES` and the
  reverse; list the new leaves; the export-set and freeze assertions in
  `tests/src/core/index.test.ts` still hold unedited.
- The anchor: `$dark`'s `anchor` holds the literal `oklch(0.235 0.013 256)` and `$light`'s reads
  the body surface; no partial or mixin reads a raised token where the anchor is meant; the
  built cascade's dark role border tiers are unchanged from `9bb306e` (compare the built file
  against the base if you can read both; otherwise record the reading you can take).
- The case tables: each rebound member's table carries the new field its proof reads, and the
  proofs read them (`readPixels` for the radius fields, `matchesColor` for the colour fields);
  no export was added to or removed from `tests/setupStyles.ts`, which is why
  `tests/setupStyles.test.ts` is unedited.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control, no measurement plant or `console` call,
  no `CL3B` residue.
- `_mixins.scss` emits no top-level CSS; the layer order line in `_tokens.scss` is unchanged and
  the built cascade declares that order.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `typescript.md`, `names.md`,
`documentation.md`. The user has ruled that audits cover implementation only: report no wording
or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
