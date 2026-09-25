# Unit E-ID-MOTION-MODAL — the modal and both backdrops move on Elements' panel motion

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mmod` (branch `unit/mmod`, cut from Veneer `LANDING_HEAD`, the session branch after J-MOTION-PROOFS-A
and LEDGER-ADDITIONS, `node_modules` hardlinked from `/home/user/veneer`). The proofs launch Chromium, which a bench
sandbox cannot drive. Start every shell command with `cd /home/user/veneer-mmod &&` and give every file tool an absolute
path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the design
verdict `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Modal dialog and Modal host fade
rows, § Proof, and unit 4), which binds; and the engine decision E32 in
`/home/user/scaffold/.orkestrel/veneer/engine/decisions.md` (search `## E32`). No skill applies.

## Objective

The modal dialog enters from `scale(0.96)` to `none` over `--vn-motion-panel` on `--vn-ease-panel`, and `.modal-static`
keeps its `scale(1.02)` on the same timing. The modal host's fade and both backdrops move their opacity over
`--vn-motion-panel` on `--vn-ease-out`, the backdrops through the one `overlay-backdrop` mixin, from `0` to `0.5` with no
blur. Each value is read from the rendered transition and recorded as a departure.

## Context

**Evidence.** Measured at `LANDING_HEAD`. Re-take each reading in the worktree before editing, and report any that
differs.
- `src/styles/components/_modal.scss` writes the dialog's entrance as `transform: translate(0, -50px)` with
  `@include transition(transform 0.3s ease-out)` (around lines 61 to 70), the shown `transform: none`, and
  `.modal-static`'s `transform: scale(1.02)` (around line 74). Its `.modal-backdrop` rule (around line 116) sets
  `--bs-backdrop-opacity: 0.5` and includes `overlay-backdrop`.
- `src/styles/_mixins.scss` declares `@mixin overlay-backdrop($zindex, $color, $opacity)` (around line 626), which sets
  `opacity: 0` on `&.fade` and `$opacity` on `&.show` and writes no transition, so a backdrop's fade comes from the
  shared `.fade` rule at `--vn-motion-feedback` on `--vn-ease-out` (E-ID-MOTION-FADE). The offcanvas backdrop includes
  the same mixin.
- `src/styles/_tokens.scss` declares `--vn-motion-panel: calc(250ms * var(--vn-factor-motion))`,
  `--vn-ease-panel: cubic-bezier(0.32, 0.72, 0, 1)`, and `--vn-ease-out: ease-out`.
- `sampleTransition` in `tests/setupBrowser.ts` reads a running transition's duration and easing; `readDuration` reads
  a declared duration. The engine's `tests/src/browser/Modal.test.ts`, `Backdrop.test.ts`, and `Offcanvas.test.ts` read a
  positive duration and settle on each moved element without pinning a value (E32); the showcase in
  `tests/app/browser/sections/EngineSection.test.ts` drives the modal.

**Law.** `.claude/rules/styles.md` (the `transition` mixin; tokens over literals; mixins centralize a repeated
declaration); `.claude/rules/tests.md` (read the rendered result; a plant that restores the literal reddens the proof);
`.claude/rules/documentation.md` § Parity.

**Installed primitives.** `@orkestrel/test/browser`, `sampleTransition` and `readDuration` in `tests/setupBrowser.ts`,
and the readers in `tests/setupStyles.ts`. Reuse them; add no reader.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; record `/proc/loadavg` with every timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- Where the host's panel timing is declared: on `.modal.fade` in `_modal.scss`, overriding the shared `.fade` rule, or
  another form the partial already uses. Settle it under `.claude/rules/styles.md` and report it.
- Whether the offcanvas backdrop's timing moves with the mixin. The verdict gives both backdrops the panel timing
  through the one mixin, so the offcanvas backdrop moves in this unit; its panel stays E-ID-MOTION-OFFCANVAS's.
  Report the offcanvas backdrop reading.
- Whether an engine proof or the showcase reads a duration this unit changes. Search `tests/src/browser` and
  `tests/app` for `0.3s`, `300ms`, `0.15s`, `150ms`, and `translate(0, -50px)`, and report the search.

## Scope

**Owned.** `src/styles/components/_modal.scss`; `src/styles/_mixins.scss` (the `overlay-backdrop` mixin only);
`tests/src/styles/components/modal.test.ts`; the backdrop's style proof wherever it lives under `tests/src/styles/`
(search `modal-backdrop` and `offcanvas-backdrop`); `tests/src/styles/mixins.test.ts` if it pins the mixin; `guides/veneer.md`
(the departure rows for these declarations and the § Modal and backdrop prose that states their motion); and
`tmp/units/`.

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`: return a patch in the report if one is
needed.

**Off-limits.** `src/browser/**`, `tests/src/browser/**`, `tests/app/**`, `src/styles/components/_offcanvas.scss`, the
vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`,
`package.json`, and every other path.

**What asserts the state this change ends.** The modal and backdrop style proofs that pin `translate(0, -50px)`, `0.3s`,
or the backdrop's feedback timing; the conformance ledger's departure cases; `npm run test:guides`. Search `tests/` for
`-50px`, `0.3s`, and `300ms` before editing, and own every pin in the owned set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Take the Unknowns' searches. Write the proofs first, each driving the real change (the class write the engine makes)
   and reading the running transition through `sampleTransition`: the dialog's transform at the start is
   `scale(0.96)` and settles at `none`, over the resolved `--vn-motion-panel` on `--vn-ease-panel`; `.modal-static`
   reads `scale(1.02)` on the same timing; the host and each backdrop move opacity from `0` to their shown value over
   `--vn-motion-panel` on `--vn-ease-out`; a motion factor of `2` doubles each duration (a ratio, never a literal
   product); and under the reduced-motion preference no transition runs. Run them red at the base, and record the
   command and failing count.
2. Change the rules; run the proofs green.
3. Run `npm run test:conformance`, and record the departure rows it prints; update the § Modal and backdrop prose.
4. Plants, each logged to `tmp/units/mmod-plant-<name>.log.txt` and restored byte-identically: restore
   `translate(0, -50px)` on the dialog; restore the backdrop's feedback timing in the mixin. Each fails a proof with an
   assertion.
5. Run each gate in Acceptance, logged to `tmp/units/mmod-<gate>.log.txt` with `echo "exit=$?"` and
   `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mmod-report.md` and return the same text: the searches; the Unknowns' answers; the failing-first and
green readings with commands and counts; the rules as written; the guide rows; the plant table; the gate table;
`tmp/units/mmod.diff` (`git diff LANDING_HEAD`) and `tmp/units/mmod-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when an engine proof or the showcase pins a value this unit changes, or when a change needs a file
  outside the owned set.
- Settle yourself the host timing's form, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`, the owned style proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. After `npm run build:src`, `npx vitest run --config vite.config.ts --no-cache --project src:browser
   tests/src/browser/Modal.test.ts tests/src/browser/Backdrop.test.ts tests/src/browser/Offcanvas.test.ts` passes, and
   `npm run test:app` exits 0, because this unit changes the timing the modal's completion follows.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its load reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
