# Unit E-ID-MOTION-TOAST — the toast scales in and out on Elements' motion as it fades

The toast third of unit 6 (E-ID-MOTION-FLOAT) of `e-id-motion-design-verdict.md`, split from it because the Toast engine
proofs are on `main` (J-MOTION-PROOFS-B) while the tooltip and popover proofs wait on J-MOTION-PROOFS-C. The tooltip and
popover stay with FLOAT.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mtoast` (branch `unit/mtoast`, cut from Veneer `LANDING_HEAD`, the session branch with REBOOT-153 on
it, `node_modules` hardlinked from `/home/user/veneer`). The proofs launch Chromium, which a bench sandbox cannot drive.
Start every shell command with `cd /home/user/veneer-mtoast &&` and give every file tool an absolute path under it. Read,
in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Toast entry and Tooltip and popover entry
rows, § Proof, and § Risks), which binds; the engine decision E32 and its amendments in
`/home/user/scaffold/.orkestrel/veneer/engine/decisions.md` (search `## E32`); and the MODAL and FACTOR audit verdicts
`/home/user/scaffold/.orkestrel/veneer/units/mmod-audit-verdict.md` and `mfac-audit-2-verdict.md`, whose findings name
the defects this unit must not repeat. No skill applies.

## Objective

An animated toast scales from `scale(0.98)` to `none` as it fades in, and from `none` to `scale(0.98)` as it fades out:
`transform` over `--vn-motion-feedback` on `--vn-ease-standard`, beside the fade's `opacity` over `--vn-motion-feedback`
on `--vn-ease-out`. A toast without the `fade` class declares no transition, and a shown toast at rest reads
`transform: none`. Each value is read from the rendered transition and recorded in the ledger.

## Context

**Evidence.** Measured on Veneer's session branch at `6586b11`. Re-take each reading in the worktree before editing, and
report any that differs.
- `src/styles/components/_toast.scss` declares no transition. `.toast.showing` declares `opacity: 0` and nothing else,
  and `.toast:not(.show)` declares `display: none`.
- `src/styles/components/_fade.scss` writes `.fade { @include transition(opacity var(--vn-motion-feedback)
  var(--vn-ease-out)) }`, so an animated toast's opacity moves through the `.fade` rule.
- `src/browser/Toast.ts` (the `show` and `hide` members) writes this sequence. Show: the `fade` class when `animated` is
  `true`, a layout read, then `show` and `showing` together (only `showing` on a toast already shown); it waits for
  the host's motions to settle, removes `showing`, waits again for the fade in that removal starts, and dispatches
  `shown`. Hide: a layout read, then `showing`; it waits for the motions to settle, then removes `showing` and `show`
  and dispatches `hidden`. So the `showing` class marks both directions: a show from hidden starts its motion as
  `showing` leaves, and a hide as `showing` arrives.
- `tests/src/browser/Toast.test.ts` (engine-owned) pins, in the case `reads the shipped toast and fade declarations: a
  toast declares a transition only through the fade token`, that `readDuration` reads `0` on a `.toast.show.showing`
  element without the `fade` class and a positive duration after `fade` is added. Its motion-factor case pins the
  duration at four times the shipped one under `--vn-factor-motion: 4`. Both must pass unchanged after this unit.
- `tests/src/styles/components/toast.test.ts` holds the case `drops a showing toast to no opacity while it stays
  displayed`, and no case reads a transition or a transform.
- Elements' surface rule for a toast (`/home/user/elements/src/styles/surfaces/_popover.scss`, the rule on
  `[popover]:not(:where(aside, dialog, nav))`, and its `@starting-style` twin) holds the closed state at `opacity: 0`
  and `transform: scale(0.98)` and transitions both properties in both directions, and Elements' toast composable
  (`/home/user/elements/src/styles/composables/_toast.scss`, the deck comment naming the surface's close-state values)
  names that rule as the toast's open and close motion.
- `guides/veneer.md` § Toast classes says the `.fade` rule transitions the toast's opacity (search "transitions the
  toast's opacity"). This unit makes that paragraph incomplete.

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

**Other units.** LEDGER-RETUNE is under audit and changes the ledger's resolver; E-ID-MOTION-OFFCANVAS and
E-ID-MOTION-COLLAPSE are writing on other partials. None of them touches `_toast.scss`. The landing regenerates the
ledger rows against whatever lands first; record the rows this worktree's gate prints.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src:styles` before a styles run,
and run a styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Run `npm run build:src`
before `npm run test:conformance` and before an engine or app proof. Other worktrees run suites at the same time; record
`/proc/loadavg` with every timing reading. Write every log, backup, probe, and script under this worktree's
`tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- Where the `transform` transition is declared so that a toast without the `fade` class declares none and the `.fade`
  rule's opacity transition keeps its tokens: settle it, and report the selector and why it wins the cascade.
- How the ledger classes each change: record the rows `npm run test:conformance` prints, and report them.
- Whether an app proof or the showcase reads a value this unit changes: search `tests/app`, `app`, and
  `tests/src/browser` for `transform`, `scale`, `opacity`, `readDuration`, and `getAnimations` beside a toast subject,
  and report the search.

## Scope

**Owned.** `src/styles/components/_toast.scss`; `tests/src/styles/components/toast.test.ts`; `guides/veneer.md` (the
§ Toast classes prose that states the toast's motion, and the toast's departure and addition rows the gate prints); and
`tmp/units/`.

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`: return a patch in the report if one is
needed.

**Off-limits.** `src/styles/components/_fade.scss`, `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, every other partial,
`src/browser/**`, `tests/src/browser/**`, `tests/app/**`, `app/**`, the guide's `## Engine` sections, the vendored
files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`, `package.json`, and
every other path.

**What asserts the state this change ends.** `toast.test.ts`; `tests/src/browser/Toast.test.ts` (which must pass
unchanged); the conformance ledger's toast rows; the setup case tables; `npm run test:guides`. Search `tests/` for
`.toast.showing`, `toast showing`, and `'.toast'` before editing, and report every hit outside the owned set that reads
a transition, a transform, or an opacity.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Take the Unknowns' searches. Write the proofs first, each driving the class write the engine makes and reading the
   running transition through `sampleTransition`: on a `.toast.fade.show.showing` toast, removing `showing` runs
   `transform` from `scale(0.98)` to `none` over the resolved `--vn-motion-feedback` on `--vn-ease-standard`, beside
   `opacity` over the same duration on `--vn-ease-out`; on a `.toast.fade.show` toast, adding `showing` runs `transform`
   from `none` to `scale(0.98)` on the same timing; a `.toast.show.showing` toast without `fade` declares no transition;
   a shown toast at rest reads `transform: none`; a doubled factor doubles each duration (a ratio) and a zero factor
   starts none, through `sweepMotionFactor`; and under the reduced-motion preference none runs. Run them red at the
   base, and record the command and failing count.
2. Change the rules; run the proofs green.
3. Run `npm run test:conformance` and `npm run test:setup`, record the rows the ledger prints, and update § Toast classes
   and the rows.
4. Plants, each logged to `tmp/units/mtoast-plant-<name>.log.txt` and restored byte-identically: drop the `scale(0.98)`
   declaration; move the `transform` transition onto a selector without the `fade` class; put `transform` on
   `--vn-ease-out`. Each fails a proof with an `AssertionError`.
5. Run each gate in Acceptance, logged to `tmp/units/mtoast-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mtoast-report.md` and return the same text: the searches; the Unknowns' answers; the failing-first and
green readings with commands and counts; the rules as written; the guide rows; the plant table; the gate table;
`tmp/units/mtoast.diff` (`git diff LANDING_HEAD`) and `tmp/units/mtoast-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when an engine proof, an app proof, or the showcase pins a value this unit changes; when a change
  needs a file outside the owned set; or when a gate reads red outside a timeout under load.
- Settle yourself the selector the transition sits on, the declaration form, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log, and restores identically.
4. `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. After `npm run build:src`, `npx vitest run --config vite.config.ts --no-cache --project src:browser
   tests/src/browser/Toast.test.ts` passes, and `npm run test:app` exits 0, because this unit adds a motion the toast's
   completion events follow.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
