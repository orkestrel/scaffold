# Unit U4b — successor brief 2: the cross-check binds a row to its action

## What changed and why

This brief supersedes `u4b-brief.md` for the remainder of the unit; that brief stands
except where this one says otherwise, and `u4b-report.md` is the baseline. The audit
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u4b-audit-verdict.md`, lane reports
beside it under `units/u4b-audit-*`) confirmed the readers, the presence check, the recorder, the
fixture, the guide section, and the scope, and refuted the cross-check: `scanOracleObligation`
selects a predicate by the obligation sentence and never binds the row's `Proof` step to the
action the obligation names, so the Space row passes against the `button.keyboard.enter` step or
the `button.click.release` step; and the accessibility predicate accepts a reading whose
`aria-pressed` attribute is absent, because it compares `includes('[pressed]')` with
`attribute === 'true'` and both are false together. The parser question is settled: the user
ruled that an `@orkestrel/*` package may be declared, so `@orkestrel/markdown` becomes a declared
devDependency; the Orchestrator runs that install after this brief returns.

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`. Law from
`C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`.

## Context

`HEAD` is `ef1a563`; the working tree carries U4b uncommitted (`guides/veneer.md`,
`tests/conformance.test.ts`, `tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/fixtures/oracle/button.json`, `tests/fixtures/oracle/inventory.json`), all staying.
`scanOracleObligation` sits at `tests/setupConformance.ts` line 463; its keyboard branch (the
`Space activates …` and `Enter activates …` obligations) reads `before.focus`, `after.focus`,
`after.clicks`, the class flip, and `aria-pressed`, and nothing about which step it was handed;
its accessibility branch reads `after.accessibility.startsWith('- button ')` and the pressed
comparison. The fixture's step names encode the action (`button.keyboard.space`,
`button.keyboard.enter`, `button.click.toggle`, `button.click.release`, `button.pointer.*`,
`button.hover`, `button.pressed.*`, `button.disabled.click`, and the `button.reduced.` twins).
The objective lane added four findings this brief carries: the Space and Enter rows of
`## Compatibility` (`guides/veneer.md` lines 506 and 507) trace to no row of
`research/obligations.md` § Button or of the ledger's `U7 Button` rows, so they are not
obligations Veneer accepts from Bootstrap; the recorder writes the cascade it serves from
`readBootstrapCascade()`, which reads the cwd-relative `node_modules/bootstrap/dist/css/bootstrap.css`,
while the digest proof pins `resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/css/bootstrap.css')`;
the fixture's `excluded` list is declared, hardcoded empty, and read by nothing, so an excluded
step would still fail the comparison; and the recorder registers a listener named
`click.bs.button.data-api`, which Bootstrap strips to the native `click` before binding, so
`after.events` is always empty and the `event`-category predicate has never been observed
passing. The Orchestrator has declared `@orkestrel/markdown` in `devDependencies` before this
dispatch (the user's ruling), so `package.json` and `package-lock.json` are modified in the tree
and stay as they are. The host facts of the previous brief stand (PowerShell shell,
`npm.cmd run <name>`, `prove` blocked, instruments under `tmp/u4b/`, Chromium launches inside the
sandbox).

## Scope

**Owned.** `tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/conformance.test.ts`, `tests/fixtures/oracle/button.json` (re-recorded under
`ORACLE_REFRESH=1` after item 6 changes what a reading carries), `guides/veneer.md` (the two
keyboard rows of `## Compatibility` alone), the report. **Off-limits.** Everything else,
including `tests/fixtures/oracle/inventory.json`, `package.json`, and `package-lock.json`.

## Execution

Perform the assignment directly and spawn nothing. Red first: add the failing cases of item 3
before changing the scanner, run `npm.cmd run test:setup`, and record the failing count; then
implement; then record the green run.

1. **Bind the row to its action.** Each predicate declares the step names it accepts, derived
   from the action the obligation names: the Space obligation accepts `button.keyboard.space` and
   `button.reduced.keyboard.space` alone; the Enter obligation `button.keyboard.enter` and its
   twin; the data-api click obligation the `click.toggle`, `click.release`, and `pressed.click`
   steps and their twins; the `toggle()` obligation the click, keyboard, and pointer-release
   steps that flip the state; the identity obligation any step; the accessibility obligation
   the steps whose subject is a toggle (`initial`, `click.*`, `keyboard.*`, `pressed.*`); the
   disabled obligation `button.disabled.click` and its twin. A `Proof` outside the accepted set
   returns `${label}: proof step does not prove this obligation` (distinct from `missing
   recording step`). Express the binding as data (a readonly table of obligation to accepted
   step patterns and predicate) rather than a chain of string comparisons, exported and typed in
   the module, so a later component adds rows without editing a conditional.
2. **Require the pressed attribute.** The accessibility predicate and the toggle predicates
   require `after.attributes['aria-pressed']` to be exactly `'true'` or `'false'`; a reading with
   the attribute absent or any other value contradicts the obligation.
3. **The keyboard rows come out.** Delete the `Space activates the focused toggle button.` and
   `Enter activates the focused toggle button.` rows from `## Compatibility`; the recorded
   keyboard steps stay in the fixture as behaviour U7's journeys will read. The binding table
   then carries no keyboard obligation; keep the data-api and `toggle()` bindings accepting the
   keyboard steps, because those obligations are what a keyboard activation exercises.
4. **The pinned cascade.** The recorder serves the stylesheet read from
   `resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/css/bootstrap.css')`, the path the digest
   proof pins, the way it already reads the bundle; `readBootstrapCascade` in `tests/setupStyles.ts`
   is off-limits and stays for the compatibility oracle's own reading.
5. **`excluded` skips.** The ordinary comparison in `tests/conformance.test.ts` skips a step
   named in the fixture's `excluded` list (the per-step comparison and the whole-recording
   equality alike) and asserts that every excluded name is a recorded step; a case in
   `tests/setupConformance.test.ts` or `tests/conformance.test.ts` proves the skip over a written
   fixture with one excluded step whose readings differ.
6. **A listener that can fire.** Drop the `click.bs.button.data-api` name from the recorder's
   listener list and record the native `click` beside the two `*.bs.button` names; the `event`
   category predicate then has a positive reading (`click` present after an activation). Add
   the positive case. Re-record the fixture under `ORACLE_REFRESH=1` on managed Chromium, then
   run the ordinary comparison twice on Chromium and once on Edge; every run must match.
7. **Cases.** In `tests/setupConformance.test.ts`: the data-api row handed `button.hover` returns
   the `does not prove` text; the data-api row handed `button.keyboard.space` and handed
   `button.click.toggle` each return `undefined`; the accessibility row over a reading with
   `aria-pressed` deleted returns the `contradicts` text, and over the fixture's own step returns
   `undefined`; the disabled row handed `button.click.toggle` returns the `does not prove` text;
   a row whose proof names no step returns `missing recording step`; the binding table's every
   entry names at least one step the committed fixture carries. Keep every existing case.
8. **The guide's rows stand.** Run `npm.cmd run test:conformance` (ordinary run): every remaining
   `## Compatibility` row passes the bound scanner; if one does not, stop and report the row and
   the step.
9. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:setup`, `npm.cmd run test:conformance`, `npm.cmd run test:guides`,
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance`; record each command's final lines.

## Output

Write `u4b-report-2.md` and return its content: the diff per file; the binding table
as declared; the red run and the green run; each gate's final lines; `git status --porcelain`
(tracked rows only); deviations in the usual shape.

## Deviation contract

Stop and report on: an existing `## Compatibility` row the bound scanner refuses; a gate red
after your own fix inside owned files; a need to edit an off-limits file. Decide, record, and
carry on from: the table's shape and names within the helper-prefix table, case order.

## Acceptance criteria

1. Every case in item 7 passes, and the misbinding, the deleted-attribute reading, the inert
   exclusion, and the empty `events` reading ran red before the change.
2. The two keyboard rows are gone; the recorder reads the pinned path; `excluded` skips;
   `click` is recorded; the fixture is re-recorded and matches on Chromium twice and Edge once.
3. `format:check`, `lint:check`, `check`, `test:setup`, `test:conformance`, and `test:guides`
   exit 0.
4. `git status --porcelain` lists report 1's rows plus `package.json` and `package-lock.json`
   (the Orchestrator's declaration) and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
