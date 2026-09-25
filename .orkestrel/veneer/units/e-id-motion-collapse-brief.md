# Unit E-ID-MOTION-COLLAPSE — the collapse panel and the accordion chevron move on Elements' motion

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mcol` (branch `unit/mcol`, cut from Veneer `LANDING_HEAD`, the session branch after
E-ID-MOTION-MODAL, E-ID-MOTION-FACTOR, and the engine session's J-MOTION-PROOFS-B are all on it, `node_modules`
hardlinked from `/home/user/veneer`). The proofs launch Chromium, which a bench sandbox cannot drive. Start every shell
command with `cd /home/user/veneer-mcol &&` and give every file tool an absolute path under it. Read, in order:
`/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Collapse panel and Accordion chevron rows,
§ Proof, and unit 3), which binds; the engine decision E32 and its amendment in
`/home/user/scaffold/.orkestrel/veneer/engine/decisions.md` (search `## E32`); E27 in the same file (the size mechanism
stays in the engine); and the MODAL and FACTOR audit verdicts `/home/user/scaffold/.orkestrel/veneer/units/mmod-audit-verdict.md`
and `mfac-audit-2-verdict.md`, whose findings name the defects this unit must not repeat. No skill applies.

## Objective

A closing or opening collapse panel moves its `height` (and a horizontal panel its `width`) over `--vn-motion-panel` on
`--vn-ease-panel`, with no opacity and no root `interpolate-size`; the accordion chevron turns its `transform` over
`--vn-motion-feedback` on `--vn-ease-standard`, keeping Bootstrap's `rotate(-180deg)`; the accordion button's own
transition is unchanged. Each value is read from the rendered transition and recorded in the ledger.

## Context

**Evidence.** Measured on Veneer's session branch at `6052e25` for the styles files and at Veneer `main` `b867c96` for
the engine proofs; neither the MODAL and FACTOR landing nor J-MOTION-PROOFS-B changes `_collapse.scss` or the chevron
rule. Re-take each reading in the worktree before editing, and report any that differs.
- `src/styles/components/_collapse.scss` writes `@include transition(height 0.35s ease)` on `.collapsing` and
  `@include transition(width 0.35s ease)` on `.collapsing.collapse-horizontal`; its header comment says the timing keeps
  the release's literal because no motion token resolves to `0.35s`.
- `src/styles/components/_accordion.scss` declares `--bs-accordion-btn-icon-transition: transform 0.2s ease-in-out` and
  writes `@include transition(var(--bs-accordion-btn-icon-transition))` on the chevron; the button's transition reads
  `--bs-accordion-transition` over `--vn-motion-feedback` (E-ID-MOTION-FACTOR).
- `src/styles/_tokens.scss` declares `--vn-motion-feedback: calc(150ms * var(--vn-factor-motion))`,
  `--vn-motion-panel: calc(250ms * var(--vn-factor-motion))`, `--vn-ease-standard: ease`, and
  `--vn-ease-panel: cubic-bezier(0.32, 0.72, 0, 1)`.
- `tests/src/styles/components/collapse.test.ts` pins `['height', '0.35s', 'ease']` and `['width', '0.35s', 'ease']`,
  `['0.35s', '0.35s']` after the reduced-motion release, a state table carrying `'height 0.35s'` and `'width 0.35s'`,
  and the case `keeps the closing transition at the release duration under a doubled motion factor`, which this unit
  makes false.
- `tests/src/styles/components/accordion.test.ts` pins the chevron's `transform`, `0.2s`, and `ease-in-out` in the case
  `transitions the button paint and the chevron turn and collapses both under the reduced-motion preference`.
- The engine proofs on `main` read the panel's duration through `readDuration` (`tests/src/browser/Collapse.test.ts`),
  so no engine proof pins `0.35s`.
- `guides/veneer.md` § Collapse classes says the timing is Bootstrap's `0.35s ease` value (search "No published motion
  token resolves to `0.35s`"); § Accordion classes says "The chevron transition carries Bootstrap's own `0.2s` timing";
  and § Factors lists "the collapse" and "accordion chevron" timings among those that keep a release literal. This unit
  makes each false.

**Law.** `.claude/rules/styles.md` (the `transition` mixin; tokens over literals; a declaration repeated across rules is
written once through the maps or variables the partial already uses); `.claude/rules/tests.md` (read the rendered
result; a mutation kills only with an assertion; absence is `undefined`, never a stand-in value);
`.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity.

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
and run a styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run
suites at the same time; record `/proc/loadavg` with every timing reading. Write every log, backup, probe, and script
under this worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- How the ledger classes each change: record the rows `npm run test:conformance` prints, and report them.
- Whether an app proof or the showcase reads a value this unit changes: search `tests/app`, `app`, and
  `tests/src/browser` for `0.35s`, `350`, `0.2s`, and `ease-in-out` beside a collapse or accordion subject, and report
  the search.

## Scope

**Owned.** `src/styles/components/_collapse.scss`; the chevron declarations in `src/styles/components/_accordion.scss`;
`tests/src/styles/components/collapse.test.ts` (its motion cases and pins); the chevron slots and motion cases of
`tests/src/styles/components/accordion.test.ts`; `guides/veneer.md` (the § Collapse classes and § Accordion classes
prose that states these motions, their departure and addition rows, and the collapse and accordion chevron entries of
the § Factors exception list); and `tmp/units/`.

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`: return a patch in the report if one is
needed.

**Off-limits.** `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, every other partial, `src/browser/**`,
`tests/src/browser/**`, `tests/app/**`, the guide's `## Engine` sections, the vendored files (`tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`, `package.json`, and every other path.

**What asserts the state this change ends.** The `collapse.test.ts` and `accordion.test.ts` pins the Evidence names;
the conformance ledger's collapse and accordion rows; the setup case tables; `npm run test:guides`. Search `tests/` for
`0.35s`, `'height 0.35s'`, and `0.2s` before editing, and own every pin in the owned set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Take the Unknowns' searches. Write the proofs first, each driving the class write an engine makes and reading the
   running transition through `sampleTransition`: a vertical panel's `height` and a horizontal panel's `width` run over
   the resolved `--vn-motion-panel` on `--vn-ease-panel` with no opacity transition; the chevron's `transform` runs over
   `--vn-motion-feedback` on `--vn-ease-standard` as the button takes and loses the collapsed class, ending at
   `rotate(-180deg)` on the expanded button; a doubled factor doubles each duration (a ratio) and a zero factor starts
   none, through `sweepMotionFactor`; under the reduced-motion preference none runs; and the button's own transition
   reads as before. Run them red at the base, and record the command and failing count.
2. Change the rules; run the proofs green, and retire the case that pins the release duration under a doubled factor.
3. Run `npm run test:conformance` and `npm run test:setup`, record the rows the ledger prints, and update the guide's
   prose, rows, and the § Factors exception list.
4. Plants, each logged to `tmp/units/mcol-plant-<name>.log.txt` and restored byte-identically: restore
   `height 0.35s ease`; restore the chevron's `transform 0.2s ease-in-out`; add an `opacity` transition to `.collapsing`.
   Each fails a proof with an `AssertionError`.
5. Run each gate in Acceptance, logged to `tmp/units/mcol-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mcol-report.md` and return the same text: the searches; the Unknowns' answers; the failing-first and
green readings with commands and counts; the rules as written; the guide rows; the plant table; the gate table;
`tmp/units/mcol.diff` (`git diff LANDING_HEAD`) and `tmp/units/mcol-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when an engine proof, an app proof, or the showcase pins a value this unit changes; when a change
  needs a file outside the owned set; or when a gate reads red outside a timeout under load.
- Settle yourself the declaration form, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log, and restores identically.
4. `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. After `npm run build:src`, `npx vitest run --config vite.config.ts --no-cache --project src:browser
   tests/src/browser/Collapse.test.ts` passes, and `npm run test:app` exits 0, because this unit changes the timing the
   collapse completion follows.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
