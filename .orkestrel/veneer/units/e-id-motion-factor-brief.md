# Unit E-ID-MOTION-FACTOR — every transition that keeps a release literal scales by the motion factor

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mfac` (branch `unit/mfac`, cut from Veneer `LANDING_HEAD`, the tree E-ID-MOTION-FADE lands on,
`node_modules` hardlinked from `/home/user/veneer`). The proofs launch Chromium, which a bench sandbox cannot drive.
Start every shell command with `cd /home/user/veneer-mfac &&` and give every file tool an absolute path under it. Read,
in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; and the design
verdict `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (unit 8, § Proof, and the ruling's
opening), which binds. No skill applies.

## Objective

Every transition that keeps a Bootstrap literal — the floating label, the progress bar, nav, pagination, the navbar
toggler, and the accordion button — scales by `--vn-factor-motion`, resolves to the release's value at a factor of `1`,
is recorded as a departure, and is proved from the rendered transition. § Factors states the motion factor's reach.

## Context

**Evidence.** Measured at `LANDING_HEAD`, the session branch after the E-ID-MOTION-FADE and STATES landings:
- `src/styles/components/_form-floating.scss`, around line 49: `@include transition((opacity 0.1s ease-in-out,
  transform 0.1s ease-in-out))`.
- `src/styles/components/_progress.scss`, around line 25: `--bs-progress-bar-transition: width 0.6s ease;`, read
  through `@include transition(var(--bs-progress-bar-transition))` around line 43.
- `src/styles/components/_nav.scss`, around line 38: color, background-color, and border-color at `0.15s ease-in-out`.
- `src/styles/components/_pagination.scss`, around lines 64 to 67: color, background-color, border-color, and
  box-shadow at `0.15s ease-in-out`.
- `src/styles/components/_navbar.scss`, around line 35: `--bs-navbar-toggler-transition: box-shadow 0.15s
  ease-in-out;`.
- `src/styles/components/_accordion.scss`, around lines 16 to 18: `--bs-accordion-transition`, the button's color,
  background-color, border-color, box-shadow at `0.15s ease-in-out` and border-radius at `0.15s ease`, read through
  `@include transition(var(--bs-accordion-transition))` around line 62. The chevron's
  `--bs-accordion-btn-icon-transition` (around line 30) is E-ID-MOTION-COLLAPSE's, not this unit's.
- `--vn-factor-motion` is declared in `src/styles/_tokens.scss`; `--vn-motion-feedback` is `calc(150ms *
  var(--vn-factor-motion))`. `sampleTransition` in `tests/setupBrowser.ts` reads a running transition's duration and
  easing (E-ID-MOTION-FADE).
- Re-run the search `grep -rn 's ease\|s linear\|[0-9]s)' src/styles --include=*.scss` in the worktree and own every
  literal duration it finds outside the collapse, modal, offcanvas, carousel, tooltip, popover, toast, fade, and
  accordion-chevron rules, which other motion units own. The search also returns animations: the progress stripes
  (`1s linear infinite`), the placeholder, and the spinner. The design verdict scopes this unit to transitions, so those
  animations are outside it, and the placeholder and spinner partials are E-ID-MOTION-REDUCED's.

**Law.** `.claude/rules/styles.md` (the `transition` mixin; tokens over literals); `.claude/rules/tests.md` (read the
rendered transition; a plant that restores the literal reddens the proof); `.claude/rules/documentation.md` § Parity.

**Installed primitives.** `@orkestrel/test/browser`, and `sampleTransition` and the other readers in
`tests/setupBrowser.ts` and `tests/setupStyles.ts`. Reuse them; add no reader.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; record `/proc/loadavg` with any timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- Whether each value reads better as the literal times the factor, or as an existing motion token where the literal
  equals one (`0.15s` equals `--vn-motion-feedback` at a factor of `1`). The verdict keeps the release's value at a
  factor of `1`; the easing stays the release's. Settle the form per site under `.claude/rules/styles.md` and report it.
- Whether an engine proof or an app journey reads one of these durations. Search `tests/src/browser` and `tests/app`
  for each property and value before editing, and report the search.

## Scope

**Owned.** The six partials the Evidence names (the accordion button's transition only, not the chevron), their style
tests under `tests/src/styles/components/` (and `tests/src/styles/forms/` or wherever the floating-label proof lives),
`guides/veneer.md` (the departure rows for these transitions and § Factors' motion sentence), and `tmp/units/`.

**Shared (report-only).** `tests/setupStyles.ts`, `tests/setupBrowser.ts`, and `src/styles/_mixins.scss`: return a
patch in the report if one is needed.

**Off-limits.** `src/browser/**`, `tests/src/browser/**`, `tests/app/**`, `tests/setupServer.ts`, the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`, `package.json`, the
partials other motion units own, and every other path.

**What asserts the state this change ends.** Each partial's style proof that pins a literal duration; the conformance
ledger's departure cases; `npm run test:guides`. Search `tests/` for `0.15s`, `0.1s`, `0.6s`, `150ms`, `100ms`, and
`600ms` before editing and own every pin in the owned set.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` is
allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Take the Unknowns' searches. Write, for each site, a proof that drives the real change and reads the running
   transition through `sampleTransition`: the duration at a factor of `1` equals the release's value, the duration at a
   factor of `2` is twice the factor-`1` reading (a ratio, never a literal product), and the easing is the release's.
   Run the proofs red at the base, and record the command and failing count.
2. Change the rules; run the proofs green.
3. Record each transition as a departure in the guide's transition table, and state in § Factors that the motion
   factor scales every transition.
4. Plants, each logged to `tmp/units/mfac-plant-<name>.log.txt` and restored byte-identically: restore the literal at
   the pagination site and at the floating-label site; each fails a proof with an assertion. Run
   `npm run test:conformance` with one departure row removed; it fails.
5. Run each gate in Acceptance, logged to `tmp/units/mfac-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/mfac-report.md` and return the same text: the searches; the per-site form ruling; the failing-first
and green readings with commands and counts; the guide rows; the plant table; the gate table; `tmp/units/mfac.diff`
(`git diff LANDING_HEAD`) and `tmp/units/mfac-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when an engine proof or an app journey reads one of these durations, or when a change needs a file
  outside the owned set.
- Settle yourself the per-site form, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`, the owned proofs read red at the base and green after.
3. Each plant fails with an `AssertionError`, per its log.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
