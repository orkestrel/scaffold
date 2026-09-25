# Unit E-ID-MOTION-CAROUSEL — the slide moves over its own motion token, and the controls and indicators fade on Elements' curve

Unit 5 of `e-id-motion-design-verdict.md`. Held until two things land on the session branch: LEDGER-RETUNE (its resolver
classes the rows this unit changes), and the engine session's change that makes `tests/src/browser/Carousel.test.ts`
compose the token cascade with the carousel cascade, as `Collapse.test.ts`, `Offcanvas.test.ts`, and `Modal.test.ts`
do. Without that change, a slide transition that reads a token fails the engine's carousel proofs
(`units/carousel-token-probe/run.log.txt`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mcar` (branch `unit/mcar`, cut from Veneer `LANDING_HEAD`, the session branch with LEDGER-RETUNE and
the engine's carousel cascade change on it, `node_modules` hardlinked from `/home/user/veneer`). The proofs launch
Chromium, which a bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-mcar &&` and give
every file tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Carousel slide and Carousel controls and
indicators rows, § Proof, and § Risks), which binds; the engine decision E32 and its amendments in
`/home/user/scaffold/.orkestrel/veneer/engine/decisions.md` (search `## E32`); and the MODAL and FACTOR audit verdicts
`/home/user/scaffold/.orkestrel/veneer/units/mmod-audit-verdict.md` and `mfac-audit-2-verdict.md`, whose findings name
the defects this unit must not repeat. No skill applies.

## Objective

A sliding item moves its `transform` over the added `--vn-motion-slide` token (`calc(600ms * var(--vn-factor-motion))`)
on `--vn-ease-panel`, keeping Bootstrap's `±100%` travel; under the fade variant the items cross their `opacity` over
`--vn-motion-slide` on `--vn-ease-out`, and the outgoing item's `0s` opacity change waits `--vn-motion-slide`; the
controls and the indicators move their `opacity` over `--vn-motion-feedback` on `--vn-ease-out`, keeping Bootstrap's
opacity endpoints and the indicator's fixed size. Each value is read from the rendered transition and recorded in the
ledger, and the token is published.

## Context

**Evidence.** Measured on Veneer's session branch at `6586b11`. Re-take each reading in the worktree before editing,
and report any that differs.
- `src/styles/components/_carousel.scss`: `.carousel-item` writes `@include transition(transform 0.6s ease-in-out)`;
  `.carousel-fade .carousel-item` writes `transition-property: opacity` and takes its duration and curve from the
  `.carousel-item` rule; the
  outgoing fade rule (`.carousel-fade .active.carousel-item-start, .carousel-fade .active.carousel-item-end`) writes
  `@include transition(opacity 0s 0.6s)`; the controls write
  `@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-standard))`; and the indicators
  (`.carousel-indicators [data-bs-target]`) write `@include transition(opacity 0.6s ease)`.
- `src/styles/_tokens.scss` declares `--vn-motion-feedback: calc(150ms * var(--vn-factor-motion))` and
  `--vn-motion-panel: calc(250ms * var(--vn-factor-motion))`, and no `--vn-motion-slide`.
- `src/core/constants.ts` (engine-owned) lists `motion.feedback` and `motion.panel` in `TOKEN_NAMES`.
- `tests/src/styles/components/carousel.test.ts` pins `0.6s` in the case `stacks the slides in place and crosses their
  opacity, holding the outgoing slide for the slide duration`, and pins `['transform', '0.6s', '0s', 'ease-in-out']`,
  `['opacity', '0s', '0.6s', 'ease']`, `['opacity', '0.15s', '0s', 'ease']`, and `['opacity', '0.6s', '0s', 'ease']`
  in the case `collapses the slide, fade, control, and indicator transitions under the reduced-motion preference`.
- `tests/src/browser/Carousel.test.ts` (engine-owned) reads each item's duration through `readDuration` and asserts it
  positive. At `6586b11` it loads the carousel cascade alone; the unit's worktree base must hold the engine's change that
  composes the token cascade with it. Verify that first, and stop if it is absent.
- `guides/veneer.md` § Carousel classes states the slide and indicator timings, and § Tokens lists the motion tokens
  (search `--vn-motion-feedback`, `--vn-motion-panel`). This unit makes both incomplete.

**Law.** `.claude/rules/styles.md` (the `transition` mixin; tokens over literals; a declaration repeated across rules is
written once); `.claude/rules/tests.md` (read the rendered result; a mutation kills only with an assertion; absence is
`undefined`, never a stand-in value); `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity.

**What the MODAL and FACTOR audits found, which this unit writes right the first time.**
- Assert a sample's presence with `expect(sample).toBeDefined()` before narrowing it, so a deleted transition fails with
  an `AssertionError`, not a plain `Error`.
- Record a reading with no transition as `undefined`; never put another value in its place.
- Read a doubled factor as a ratio to the resting duration, never as a literal product, and read a zero factor as no
  transition, through `sweepMotionFactor`.
- Name a timing by its tokens, never by another component that uses it.
- A setup case table can bind a declaration's token reads (`tests/setupStyles.ts`); run `npm run test:setup`.

**Installed primitives.** `sampleTransition`, `readDuration`, and `sweepMotionFactor` in `tests/setupBrowser.ts`, and
the readers in `tests/setupStyles.ts`. Reuse them; add no reader.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src:styles` before a styles run,
and run a styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Run `npm run build:src`
before `npm run test:conformance` and before an engine or app proof. Other worktrees run suites at the same time; record
`/proc/loadavg` with every timing reading. Write every log, backup, probe, and script under this worktree's
`tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- How the ledger classes each change and records the added token: record the rows `npm run test:conformance` prints,
  and report them.
- Which gate reads `TOKEN_NAMES` against the declared tokens: run the gates after adding the token, and report which
  one needs the `motion.slide` entry.
- Whether an app proof or the showcase reads a value this unit changes: search `tests/app`, `app`, and
  `tests/src/browser` for `0.6s`, `600`, `ease-in-out`, and `readDuration` beside a carousel subject, and report the
  search.

## Scope

**Owned.** `src/styles/components/_carousel.scss`; the `--vn-motion-slide` declaration in `src/styles/_tokens.scss`;
`tests/src/styles/components/carousel.test.ts`; the token's cases in `tests/src/styles/tokens.test.ts`;
`guides/veneer.md` (the § Carousel classes prose that states these motions, the motion token's § Tokens and
§ Reference map rows, and the carousel's departure and addition rows the gate prints); and `tmp/units/`.

**Shared (report-only).** `src/core/constants.ts` (the `motion.slide` entry of `TOKEN_NAMES`, which the engine session
owns: write it in the worktree only if a gate requires it, and return the hunk in the report for the Orchestrator to send
before the landing); `tests/setupStyles.ts` and `tests/setupBrowser.ts`: return a patch in the report if one is needed.

**Off-limits.** `src/styles/_mixins.scss`, every other partial and every other declaration of `_tokens.scss`,
`src/browser/**`, every other line of `src/core/**`, `tests/src/browser/**`, `tests/app/**`, `app/**`, the guide's
`## Engine` sections, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
`vite.config.ts`, `package.json`, and every other path.

**What asserts the state this change ends.** The `carousel.test.ts` pins the Evidence names; `tokens.test.ts`; the
conformance ledger's carousel and token rows; the setup case tables; `npm run test:guides`. Search `tests/` for
`0.6s`, `ease-in-out`, and `--vn-motion-panel` before editing, and own every pin in the owned set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Verify the base holds the engine's carousel cascade change. Take the Unknowns' searches. Write the proofs first,
   each driving the class write the engine makes and reading the running transition through `sampleTransition`: a
   slide's `transform` runs over the resolved `--vn-motion-slide` on `--vn-ease-panel` from `translateX(±100%)`; under
   the fade variant the incoming item's `opacity` runs over `--vn-motion-slide` on `--vn-ease-out` while the outgoing
   item's change waits `--vn-motion-slide`; a control's and an indicator's `opacity` run over `--vn-motion-feedback` on
   `--vn-ease-out`; a doubled factor doubles each duration (a ratio) and a zero factor starts none, through
   `sweepMotionFactor`; and under the reduced-motion preference none runs. Run them red at the base, and record the
   command and failing count.
2. Add the token and change the rules; run the proofs green, and convert the pins the Evidence names.
3. Run `npm run test:conformance`, `npm run test:setup`, and the token proofs; record the rows the ledger prints; and
   update the guide's prose and rows.
4. Plants, each logged to `tmp/units/mcar-plant-<name>.log.txt` and restored byte-identically: restore
   `transform 0.6s ease-in-out` on the slide; restore `opacity 0.6s ease` on the indicators; put the fade crossing on
   `--vn-ease-panel`. Each fails a proof with an `AssertionError`.
5. Run each gate in Acceptance, logged to `tmp/units/mcar-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mcar-report.md` and return the same text: the base verification; the searches; the Unknowns' answers;
the failing-first and green readings with commands and counts; the rules and the token as written; the guide rows; the
`src/core/constants.ts` hunk, if any; the plant table; the gate table; `tmp/units/mcar.diff` (`git diff LANDING_HEAD`)
and `tmp/units/mcar-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when the base lacks the engine's carousel cascade change; when an engine proof, an app proof, or the
  showcase pins a value this unit changes; when a change needs a file outside the owned and shared sets; or when a gate
  reads red outside a timeout under load.
- Settle yourself the declaration form, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log, and restores identically.
4. `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. After `npm run build:src`, `npx vitest run --config vite.config.ts --no-cache --project src:browser
   tests/src/browser/Carousel.test.ts` passes, and `npm run test:app` exits 0, because this unit changes the timing the
   slide completion follows.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
