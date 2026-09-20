# U7d audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7d-audit-claims.md` marks `[mechanical]`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Rule on no other claim. That file alone fixes the claim numbers.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's `1b80ccb` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7d-diff.patch.txt` and the status at
`tmp/audit/u7d-status.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer` (`tests/setupConformance.ts`,
`tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`,
`guides/veneer.md`, `package.json`, `src/**` for the untouched proof). Read the retained report
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7d-report.md` only to learn
what the unit claims; rule on the tree.

## Probes

- Export set: list every `export` added or changed in `tests/setupConformance.ts` and match each
  against a case in `tests/setupConformance.test.ts` that calls it; name any export with no case.
- Guide rows: in `guides/veneer.md` § Compatibility, list every row whose `Component` cell is
  `engine` and every Button row whose `Kind` is `selector` or `variable`, with the `Proof` and
  `Status` cells; confirm `### Deferred selectors` sits under `## Styles` with the header
  `Name | Owner | Reason` and no data row.
- Scope: the status file's tracked lines are exactly `tests/setupConformance.ts`,
  `tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, and
  `guides/veneer.md`; `tests/fixtures/oracle/**`, `src/**`, and `package.json` are absent from
  the diff.
- Letter of the law: sweep the diff's added lines for `: any`, ` as ` (outside a string or
  comment), `!.`, `!)`, `@ts-`, `eslint-disable`, `it.skip`, `it.todo`, `it.fails`, `test.skip`,
  `describe.skip`; list every module-scope function the diff adds with whether it is exported and
  tested; name any helper outside the `{verb}{Noun}` form or the prefix meanings in
  `.claude/rules/names.md`; name any nested function declaration outside an anonymous callback
  passed as an argument or returned as a result; name any literal-union member or sentinel added
  where `undefined` or a boolean was due.
- Installed-primitive probe: for every helper the diff adds, state whether the installed
  declaration entries export a symbol doing the same job:
  `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and `dist/src/core/index.d.ts`,
  `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`,
  `node_modules/@orkestrel/guide/dist/src/core/index.d.ts`,
  `node_modules/@orkestrel/markdown/dist/src/core/index.d.ts` (all under the Veneer checkout);
  name any overlap.

## Law

Scaffold's `AGENTS.md` (§ Non-negotiable rules, § Design laws), `.claude/rules/names.md`,
`architecture.md`, `typescript.md`, `tests.md`, `documentation.md` (§ Parity). A wording
finding is a bound, never a round-forcer.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (or "none found"); then exactly one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that force it. No process
diary.
