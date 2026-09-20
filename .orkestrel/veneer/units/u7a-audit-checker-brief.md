# U7a audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7a-audit-claims.md` marks `[mechanical]`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Rule on no other claim. That file alone fixes the claim numbers. The effective brief is `.orkestrel/veneer/units/u7a-brief-4.md`, which carries briefs 3, 2, and 1: `tests/conformance.test.ts` granted for the `listed` array alone, `--bs-btn-close-filter` retained by U3 outside the deferrals, and the physical-axis guard admitting a symmetric shorthand through a new helper in `tests/setupStyles.ts`.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's `2bc922d` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-diff.patch.txt` and the status at
`tmp/audit/u7a-status.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer` (`src/styles/**`, `src/core/constants.ts`,
`src/core/types.ts`, `tests/src/styles/**`, `tests/src/core/index.test.ts`, `guides/veneer.md`,
`tests/fixtures/oracle/inventory.json`, and `dist/src/styles/index.css` where present). Read the
retained report `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-report-4.md`
only to learn what the unit claims; rule on the tree.

## Probes

- Presence: for the `btn` entry of `tests/fixtures/oracle/inventory.json`, list every official
  selector and custom property; partition each into shipped (present literally in
  `dist/src/styles/index.css`, modulo combinator spacing) or deferred (a row under
  `guides/veneer.md` § Styles `### Deferred selectors` with a non-empty Owner and Reason); name
  every member in neither set and every deferred name that is present in the cascade.
- Rows: the Button `selector` and `variable` rows in § Compatibility carry `shipped`; the
  deferral table's rows each carry `Name | Owner | Reason` filled.
- Tokens: every `--vn-*` name the partials declare appears in `TOKEN_NAMES`
  (`src/core/constants.ts`) and the reverse (the parity case in
  `tests/src/styles/tokens.test.ts` is the mechanical reading); list any name on one side only.
- Selector grammar: the partials contain no `:is(`, no `:where(`, no physical inline-axis
  property (`margin-left`, `margin-right`, `padding-left`, `padding-right`, `left`, `right`,
  `border-left*`, `border-right*`, `text-align: left|right`), and no direction-specific rule.
- Layers: `elements/_button.scss` opens with `@layer elements` and holds single-tag selectors
  only; `components/_button.scss` opens with `@layer components`; `_mixins.scss` stays
  declaration-only (no rule outside a mixin).
- Scope: the status file's tracked lines are a subset of the brief's owned files; `src/browser/**`,
  `app/**`, `tests/setup*.ts`, `tests/conformance.test.ts`, `tests/setupConformance*.ts`,
  `tests/fixtures/**`, and `package.json` are absent from the diff.
- Letter of the law: sweep the diff's added TypeScript lines for `: any`, ` as ` (outside a
  string, comment, or `as const`), `!.`, `!)`, `@ts-`, `eslint-disable`, `it.skip`, `it.todo`,
  `it.fails`, `test.skip`, `describe.skip`; list every module-scope function the diff adds with
  whether it is exported and tested; name any nested function declaration outside the permitted
  callback forms; name any case title that names a control.
- Guide parity: every `--bs-btn-*` binding row in § Tokens names a property the partial declares,
  and every property the partial declares has a row; the `### Files` list names both partials.

## Law

Scaffold's `AGENTS.md` (§ Non-negotiable rules, § Design laws), `.claude/rules/styles.md`,
`names.md`, `typescript.md`, `tests.md`, `documentation.md` (§ Parity). A wording finding is a
bound, never a round-forcer.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings (the
partition as two lists and the exceptions); extra findings numbered after the last claim with a
site (or "none found"); then exactly one terminal line: `Verdict: accept` or `Verdict: fix round`
with the claim numbers that force it. No process diary.
