# U7c audit — checker brief (round 3: the second fix round under brief 3; rule on the fix-round tree, with round 2's rendered diff `u7c-diff-2.patch.txt` beside round 3's so the fix round's own edits stand out)

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7c-audit-claims-3.md` marks `[mechanical]`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Rule on no other claim. That file alone fixes the claim numbers. The user has ruled that
audits cover implementation only: report no wording, comment, doc-block, or guide-prose finding.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's U7b landing (the base named in
the claims file) at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7c-diff-3.patch.txt` and the
status at `tmp/audit/u7c-status-3.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer` (`app/browser/**`, `tests/app/browser/**`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`, `tests/distribution.test.ts`,
`package.json`, `configs/**`). Read the retained report
`.orkestrel/veneer/units/u7c-report-3.md (with u7c-report-2.md and u7c-report.md)` only to learn what the unit claims; rule on the tree.

## Probes

- Surface: `package.json` `exports` and `sideEffects` unchanged; `src/**` absent from the diff;
  `app/browser/main.ts` constructs `new Showcase(document.body)` and `new Delegate()` (each
  `void`), imports `Delegate` from the browser barrel, and adds no other module-scope effect.
- Placement: `app/browser/sections/ButtonSection.ts` and `app/browser/sections/index.ts` exist;
  `ButtonSection` implements `SectionInterface` from `app/browser/types.ts`; `Showcase.ts` holds
  the sections and destroys them; no `mount()` method was added to `Showcase` or the section.
- Export set: `tests/app/browser/index.test.ts` asserts the app barrel's set equal to the live
  set (list both).
- Case matrices: every specimen table and capture state list the app proofs read is an
  exported frozen constant in `app/browser/constants.ts` or a setup file; test registration
  stays in the test files.
- Captures: `STATES` in `tests/app/browser/integration.test.ts` lists every Button capture state;
  every member has a `PLACED.add` from a journey; the placement and filename proofs and the
  capture-run membership proof are unconditional.
- Oracle projection: the projection helpers in `tests/setup.ts` are exported and cased in
  `tests/setup.test.ts`; the projection reads ordered classes, `aria-pressed`, ordered
  mutations, click cancellation, the focused accessible name, and refusal, and never `identity`
  or `events`.
- Letter of the law: sweep the diff's added lines for `: any`, ` as ` (outside a string,
  comment, or `as const`), `!.`, `!)`, `@ts-`, `eslint-disable`, `public `, `private `,
  `protected `, a parameter property, `it.skip`, `it.todo`, `it.fails`, `test.skip`,
  `describe.skip`, `userEvent`; every module-scope function added is exported and tested; no
  nested function outside the permitted callback forms; no case title names a control; no
  `PLANT` residue; interface properties readonly; `#` fields only.
- Installed-primitive probe: for every helper the diff adds under `tests/`, state whether
  `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` or `dist/src/core/index.d.ts`
  (under Veneer) exports a symbol doing the same job; name any overlap.
- Scope: the status file's lines are a subset of the brief's owned set; `src/**`, `guides/**`,
  `README.md`, `package.json`, `configs/**`, `tests/setupConformance*.ts`,
  `tests/conformance.test.ts`, `tests/fixtures/**` absent from the diff.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/application.md`, `browser.md`, `tests.md`,
`architecture.md`, `names.md`, `typescript.md`.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (implementation only, or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
