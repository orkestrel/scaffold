# u7-setup-tidy audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7-setup-tidy-audit-claims.md` marks
`[mechanical]` with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). Rule on no other claim. That file alone fixes the claim numbers.
The user has ruled that audits cover implementation only: report no wording, comment,
doc-block, or guide-prose finding.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's `12e1bd6` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7-setup-tidy-diff.patch.txt` and the status at
`tmp/audit/u7-setup-tidy-status.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`. Read the retained report
`.orkestrel/veneer/units/u7-setup-tidy-report.md` only to learn what the unit claims; rule on
the tree.

## Probes

- Wrappers: grep `tests/` for `readPaintedColor` and `matchesPaintedColor`; list every hit (zero
  expected); confirm every former call site in `tests/src/styles/**` now calls the installed
  `matchesColor` or `parseCSSColor` from `@orkestrel/test/browser`.
- Pool: `vite.config.ts` sets `pool: 'forks'` on the `setup` project; quote the lines.
- Pins: list every `BOOTSTRAP_VERSION`, `BOOTSTRAP_DIGEST`, `BOOTSTRAP_CSS_DIGEST`, and
  `BOOTSTRAP_CASCADE_PATH` declaration under `tests/`; one release pin and one CSS digest must
  remain, imported where the other module reads them; state whether `BOOTSTRAP_CASCADE_PATH`
  survives and, if so, name its consumer outside its own case.
- Labels: quote the incomplete-row refusals in `readCompatibility` and `readDeferrals` and the
  invalid-status refusal; the pinned invalid-status wording in `tests/setupConformance.test.ts`
  (`Compatibility row btn: Toggle active: invalid status pending`) is unchanged.
- Reach: the binding-table case asserts every `ORACLE_BINDINGS` entry, named or fallback,
  answers at least one `readCompatibility()` row of its component and category; the refusal for
  an empty `events` requirement names the binding.
- Scope: the status file's lines are a subset of the brief's owned set (`tests/setupBrowser.ts`,
  `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
  `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/src/styles/**` call
  sites, `vite.config.ts`); `src/**`, `app/**`, `guides/**`, `package.json`, `configs/**`,
  `tests/conformance.test.ts`, `tests/fixtures/**` absent from the diff; the diff adds no `any`,
  no assertion outside `as const`, no non-null assertion, no suppression, no skip; every
  module-scope function added is exported and tested; no case title names a control; no
  `PLANT` residue.
- Enumerating assertions: the export-set cases in `tests/setupBrowser.test.ts` and
  `tests/setupStyles.test.ts` list exactly the live exports; no `it(` removed without its
  subject being removed too.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `names.md`, `typescript.md`, `workspace.md`.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (implementation only, or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
