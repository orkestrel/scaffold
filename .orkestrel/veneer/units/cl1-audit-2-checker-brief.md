# CL1 audit — mechanical lane brief (round 2: the fix round under brief 2; round 1's rendered diff `cl1-diff.patch.txt` beside round 2's)

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl1-audit-claims-2.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over `060ce02` at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-diff-2.patch.txt`
and the status at `tmp/audit/cl1-status-2.txt`; the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`; the retained brief and report under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/` (`cl1-brief-2.md`, `cl1-brief.md`,
`cl1-report-2.md`, `cl1-report.md`), read only to learn what the unit claims; rule on the tree.

## Probes

- Scope: the status lists only the brief's owned files (`tests/setupConformance.ts`, its proof,
  `tests/conformance.test.ts`, `tests/setupStyles.ts`, its proof, `tests/setupBrowser.ts`, its
  proof, at most one new proof under `tests/src/styles/`, and the one guide sentence); `src/**`,
  `app/**`, `tests/app/browser/integration.test.ts`, `tests/fixtures/**`, `package.json`,
  `configs/**`, and the vendored files (`vite.config.ts`, `tests/config.test.ts`,
  `tests/policy.test.ts`, `tests/setupPolicy.ts`) are absent from the diff.
- Export inventories: every setup proof's export-set assertion equals the live module's export
  set (`tests/setupConformance.test.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`);
  list each set.
- `listed` in `tests/conformance.test.ts` still reads `['btn']`.
- Helper placement and names: every new helper is exported from the setup file its host
  dependence selects, named `{verb}{Noun}`, and cased in the matching setup proof; no
  module-scope function or case matrix remains unexported in a test file this unit touched.
- The guide sentence: the one changed sentence introduces the `### Deferred selectors` table and
  names the `Excluded` owner; no other guide line changed.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no skipped case
  other than `it.runIf`, no case named for a control, no `PLANT` residue; every plant the report
  names is gone from the tree.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`, `architecture.md`, `names.md`.
The user has ruled that audits cover implementation only: report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
