# U7b audit — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7b-audit-claims.md` marks `[mechanical]`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Rule on no other claim. That file alone fixes the claim numbers. The user has ruled that
audits cover implementation only: report no wording, comment, doc-block, or guide-prose finding.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's `91e5906` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7b-diff.patch.txt` (tracked and untracked
files) and the status at `tmp/audit/u7b-status.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer` (`src/browser/**`, `tests/src/browser/**`,
`package.json`, `configs/**`). Read the retained report
`.orkestrel/veneer/units/u7b-report.md` only to learn what the unit claims; rule on the tree.

## Probes

- Surface: `package.json` `exports` and `sideEffects` are unchanged in the diff; no file under
  `src/browser/` other than `types.ts`, `constants.ts`, `validators.ts`, `helpers.ts`,
  `Button.ts`, `Delegate.ts`, `index.ts` (and `ColorMode.ts` unchanged) exists; `configs/**` is
  absent from the diff; `src/browser/index.ts` star-exports the modules and nothing else.
- Placement: `Button.ts` and `Delegate.ts` sit flat at `src/browser/`; each file holds one class
  plus imports; types in `types.ts`, constants in `constants.ts`, helpers in `helpers.ts`,
  guards in `validators.ts`; no nested folder.
- Export set: `tests/src/browser/index.test.ts` asserts the barrel's export set equal to the live
  set (list both); the listener recorder proof still asserts that importing the barrel registers
  no document listener.
- Names: every interface member and option key is one word; the event's wire type is
  `toggle.vn.button`; the constants `BUTTON_TOGGLE`, `BUTTON_SELECTOR`, `BUTTON_ACTIVE` exist;
  helpers `emitEvent` and `bindEventMap` take the `{verb}{Noun}` form.
- Letter of the law: sweep the diff's added lines for `: any`, ` as ` (outside a string,
  comment, or `as const`), `!.`, `!)`, `@ts-`, `eslint-disable`, `public `, `private `,
  `protected `, a parameter property, `it.skip`, `it.todo`, `it.fails`, `test.skip`,
  `describe.skip`; every module-scope function added is exported and tested; no nested
  function declaration outside the permitted callback forms; no case title names a control;
  no `PLANT` residue; interface properties readonly.
- Installed-primitive probe: for every helper the diff adds, state whether
  `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`, `dist/src/core/index.d.ts`, or
  `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (under Veneer) exports a symbol
  doing the same job (an event emitter, a listener binder, a guard); name any overlap.
- Scope: the status file's lines are a subset of the brief's owned set (the seven `src/browser`
  files and the five `tests/src/browser` files); `src/core/**`, `src/styles/**`, `app/**`,
  `tests/app/**`, `tests/setup*.ts`, `tests/conformance*.ts`, `tests/distribution.test.ts`,
  `guides/**`, `package.json`, `configs/**` absent from the diff.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/architecture.md`, `names.md`, `typescript.md`,
`patterns.md`, `tests.md`, `browser.md`.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (implementation only, or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
