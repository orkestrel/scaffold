# Unit E-ID-MOTION-OFFCANVAS — the offcanvas panel moves on Elements' panel motion

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-moff` (branch `unit/moff`, cut from Veneer `LANDING_HEAD`, the session branch after
E-ID-MOTION-MODAL lands, `node_modules` hardlinked from `/home/user/veneer`). The proofs launch Chromium, which a bench
sandbox cannot drive. Start every shell command with `cd /home/user/veneer-moff &&` and give every file tool an absolute
path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Offcanvas panel row, § Proof, and unit 7),
which binds; the engine decision E32 in `/home/user/scaffold/.orkestrel/veneer/engine/decisions.md` (search `## E32`);
and the MODAL audit verdicts `/home/user/scaffold/.orkestrel/veneer/units/mmod-audit-verdict.md` and
`mmod-audit-2-verdict.md`, whose findings name the defects this unit must not repeat. No skill applies.

## Objective

The offcanvas panel moves its `transform` over `--vn-motion-panel` on `--vn-ease-panel` and its `opacity` over
`--vn-motion-panel` on `--vn-ease-out`. Bootstrap's `±100%` travel stays; the panel is transparent in the hidden and
`.hiding` states and opaque in the `.showing` and `.show:not(.hiding)` states; a responsive panel inside its in-flow
range keeps full opacity and runs no transition. Each value is read from the rendered transition and recorded in the
ledger.

## Context

**Evidence.** Measured at Veneer `6052e25`, the MODAL and FACTOR landing tree; neither unit changes `_offcanvas.scss`. Re-take each
reading in the worktree before editing, and report any that differs.
- `src/styles/components/_offcanvas.scss` declares `--bs-offcanvas-transition: transform 0.3s ease-in-out` on every
  panel class (around line 88). The bare `.offcanvas` rule and each responsive panel below its boundary write
  `@include transition(var(--bs-offcanvas-transition))` (around lines 106 and 146), with the placement maps `$panel`
  and `$nested`, whose `'&.showing, &.show:not(.hiding)'` entry writes `transform: none` (around line 54). The header
  comment (around lines 63 to 69) says the transition keeps the release's literal because no Veneer token resolves to
  it.
- `tests/src/styles/components/offcanvas.test.ts` pins `['transform', '0.3s', 'ease-in-out']` for the panel below its
  boundary and `['none', '0s', 'ease']` in its in-flow range (around lines 545 to 555).
- `src/styles/_tokens.scss` declares `--vn-motion-panel: calc(250ms * var(--vn-factor-motion))`,
  `--vn-ease-panel: cubic-bezier(0.32, 0.72, 0, 1)`, and `--vn-ease-out: ease-out`.
- After E-ID-MOTION-MODAL lands, the offcanvas backdrop already fades over `--vn-motion-panel` on `--vn-ease-out`
  through the `overlay-backdrop` mixin, and `offcanvas.test.ts` holds its backdrop case. This unit changes neither.
- `guides/veneer.md` `## Engine`, the Offcanvas paragraph: "The shipped cascade slides the panel through a `transform`
  transition of `0.3s`, and the `overlay-backdrop` mixin fades the backdrop over the `--vn-motion-panel` token, so each
  wait lasts as long as the longer of the two." This unit's change makes the `0.3s` clause false.
- `guides/veneer.md` § Factors lists "offcanvas panel" among the timings that keep a release literal. This unit makes
  that false.

**Law.** `.claude/rules/styles.md` (the `transition` mixin; tokens over literals; a declaration repeated across rules is
written once through the maps the partial already uses); `.claude/rules/tests.md` (read the rendered result; a
mutation kills only with an assertion; absence is `undefined`, never a stand-in value); `.claude/rules/writing.md`;
`.claude/rules/documentation.md` § Parity.

**What the MODAL audits found, which this unit writes right the first time.**
- Assert a sample's presence with `expect(sample).toBeDefined()` before narrowing it through `requireValue`, so a
  deleted transition fails with an `AssertionError`, not a plain `Error`.
- Record a reading with no transition as `undefined` in its transition slots; never put another value in its place.
- Name a timing by its tokens (`--vn-motion-panel` on `--vn-ease-panel`), never by another component that uses it.
- State a no-transition case by the cascade's mechanism (which rule matches in which state), never by what an engine
  writes, unless the sentence is about the engine.
- Name each case for what it asserts, and keep "factor" for the motion factor alone.

**The engine section, told in advance.** The Offcanvas paragraph under `## Engine` belongs to the engine session.
Change only its `0.3s` clause, to name the panel's motion by its tokens, and report the hunk; the Orchestrator tells
the engine session. The engine's J-ORACLE-FIX-OFFCANVAS writes `src/browser/Offcanvas.ts` and its tests, and no
cascade.

**Installed primitives.** `sampleTransition` and `readDuration` in `tests/setupBrowser.ts`, the readers in
`tests/setupStyles.ts`, and `sweepMotionFactor` in `tests/setupBrowser.ts` if E-ID-MOTION-FACTOR has landed by the
cut (search for it; if absent, write the factor readings the way `modal.test.ts` does). Reuse them; add no reader.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; record `/proc/loadavg` with every timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- Where the panel's opacity is declared: in the `$panel` and `$nested` maps the partial already writes, or another form
  the partial uses. Settle it under `.claude/rules/styles.md` and report it.
- How the ledger classes each change: the transition variable's new value against the release's, and the opacity
  declarations the release does not write. Record the rows `npm run test:conformance` prints, and report them.
- Whether an engine proof or the showcase reads a value this unit changes. Search `tests/src/browser` and `tests/app` for
  `0.3s`, `300ms`, `ease-in-out`, and the panel's opacity, and report the search.

## Scope

**Owned.** `src/styles/components/_offcanvas.scss`; `tests/src/styles/components/offcanvas.test.ts` (the panel's
motion cases and pins; the backdrop case is E-ID-MOTION-MODAL's and stays); `guides/veneer.md` (the § Offcanvas classes
prose that states the panel's motion, its departure and addition rows, the offcanvas entry in the § Factors exception
list, and the `0.3s` clause in the `## Engine` Offcanvas paragraph); and `tmp/units/`.

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`: return a patch in the report if one is
needed.

**Off-limits.** `src/styles/_mixins.scss`, `src/styles/components/_modal.scss`, `src/browser/**`,
`tests/src/browser/**`, `tests/app/**`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`), `vite.config.ts`, `package.json`, and every other path.

**What asserts the state this change ends.** The `offcanvas.test.ts` pin of `0.3s ease-in-out`; the conformance
ledger's offcanvas rows; `npm run test:guides`. Search `tests/` for `0.3s` and `ease-in-out` before editing, and own
every pin in the owned set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Take the Unknowns' searches. Write the proofs first, each driving the class write an engine makes and reading the
   running transition through `sampleTransition`: the panel's transform moves from its edge to `none` over the resolved
   `--vn-motion-panel` on `--vn-ease-panel`, and its opacity from `0` to `1` over `--vn-motion-panel` on `--vn-ease-out`,
   as `showing` joins, and back as `hiding` joins, for each placement; a responsive panel in its in-flow range reads
   full opacity and no transition; a motion factor of `2` doubles each duration (a ratio, never a literal product) and
   `0` starts none; and under the reduced-motion preference no transition runs. Assert each sample's presence before
   narrowing it. Run them red at the base, and record the command and failing count.
2. Change the rules; run the proofs green.
3. Run `npm run test:conformance`, record the rows it prints, and update § Offcanvas classes, the § Factors exception
   list, and the `## Engine` clause.
4. Plants, each logged to `tmp/units/moff-plant-<name>.log.txt` and restored byte-identically: restore
   `transform 0.3s ease-in-out`; drop the panel's hidden-state opacity; drop the panel's transition. Each fails a proof
   with an `AssertionError`.
5. Run each gate in Acceptance, logged to `tmp/units/moff-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/moff-report.md` and return the same text: the searches; the Unknowns' answers; the failing-first and
green readings with commands and counts; the rules as written; the guide rows; the `## Engine` hunk; the plant table;
the gate table; `tmp/units/moff.diff` (`git diff LANDING_HEAD`) and `tmp/units/moff-status.txt`. State no count in
prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when an engine proof or the showcase pins a value this unit changes, when a change needs a file
  outside the owned set, or when a gate reads red outside a timeout under load.
- Settle yourself the opacity's declaration form, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log, and restores identically.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. After `npm run build:src`, `npx vitest run --config vite.config.ts --no-cache --project src:browser
   tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts` passes, and `npm run test:app` exits 0,
   because this unit changes the timing the offcanvas completion follows.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
