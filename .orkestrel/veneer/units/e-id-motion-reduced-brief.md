# Unit E-ID-MOTION-REDUCED — the placeholder and spinner animations stop under reduced motion

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mred` (branch `unit/mred`, cut from Veneer `LANDING_HEAD`, `node_modules` hardlinked from
`/home/user/veneer`). The proofs launch Chromium, which a bench sandbox cannot drive. Start every shell command with
`cd /home/user/veneer-mred &&` and give every file tool an absolute path under it. Read, in order:
`/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; and the design
verdict `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Reduced motion row, § Proof, and
unit 2), which binds. No skill applies.

## Objective

Under the reduced-motion preference, `.placeholder-glow` and `.placeholder-wave` run no animation, and the border and
grow spinners run no animation; the grow spinner renders at opacity `1` with no scale and keeps its accessible text.
Each state is read from the rendered page, and each is recorded as a departure where it leaves the release.

## Context

**Evidence.** Measured at Veneer `21c821a`:
- `src/styles/components/_placeholder.scss` declares `animation: placeholder-glow 2s ease-in-out infinite` (around line
  34) and `animation: placeholder-wave 2s linear infinite` (around line 55), with no reduced-motion rule.
- `src/styles/components/_spinner.scss` declares the spinner animation through `--bs-spinner-animation-speed` and
  `--bs-spinner-animation-name` (around line 15), and under `@include reduced-motion` sets
  `--bs-spinner-animation-speed: 1.5s` on both spinners, with a comment giving the reason for slowing rather than
  stopping (around lines 71 to 80). The design verdict overrules that reason: `.claude/rules/styles.md` requires
  `@include reduced-motion { animation: none }` for every animation.
- `src/styles/components/_progress.scss` already writes `animation: none` under `@include reduced-motion` for the
  stripes (around line 75); it is the pattern and is not this unit's.
- The style proofs are `tests/src/styles/components/placeholder.test.ts` and `spinner.test.ts`.

**Law.** `.claude/rules/styles.md` (the `reduced-motion` mixin; every animation stops); `.claude/rules/tests.md` (read
the rendered result; a plant that restores the old rule reddens the proof); `.claude/rules/documentation.md` § Parity.

**Installed primitives.** `@orkestrel/test/browser` (`stageMedia`, `releaseMedia`, and the readers the sibling style
proofs use). Search `tests/setupBrowser.ts` and `tests/setupStyles.ts` for an existing reader before adding one.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The styles project reads the built cascade: run
`npm run build:src:styles` before a styles run, and run a styles file with
`npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the same time; record
`/proc/loadavg` with any timing reading. Write every log, backup, probe, and script under this worktree's `tmp/units/`,
never in the scratchpad.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

- How the release treats each of the four animations under reduced motion. Read
  `node_modules/bootstrap/dist/css/bootstrap.css` and report each; a place where the release already stops the
  animation is parity, not a departure.
- Whether the conformance ledger records the new declarations as departures, as additions, or both. Run
  `npm run test:conformance` after the change and let its reading decide the guide rows; report which table each row
  went into.

## Scope

**Owned.** `src/styles/components/_placeholder.scss`, `src/styles/components/_spinner.scss`,
`tests/src/styles/components/placeholder.test.ts`, `tests/src/styles/components/spinner.test.ts`, `guides/veneer.md`
(the departure and addition rows for these rules, and the § Placeholder and § Spinner prose that states their motion),
and `tmp/units/`.

**Shared (report-only).** `tests/setupStyles.ts` and `src/styles/_mixins.scss`: return a patch in the report if one is
needed; do not edit them.

**Off-limits.** `src/browser/**`, `tests/src/browser/**`, `tests/setupBrowser.ts`, `tests/setupServer.ts`, `tests/app/**`,
the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`,
`package.json`, and every other path.

**What asserts the state this change ends.** The spinner and placeholder proofs; the conformance ledger's departure and
addition cases; `npm run test:guides`. Search `tests/` and `guides/` for `1.5s`, `spinner-animation-speed`,
`placeholder-glow`, and `placeholder-wave` before editing, and own every site that comes back or report it.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` is
allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Read the release's treatment (the first Unknown), and write the proofs first: under the staged reduced-motion
   preference each placeholder and spinner lists no running animation in `getAnimations()`, the grow spinner reads
   opacity `1` and no transform, and its visually hidden text stays in the accessibility tree; without the preference
   each runs its animation. Run them red on the base and record the command and failing count.
2. Change the rules: `@include reduced-motion { animation: none }` for each animation, and the grow spinner's opacity
   and scale under the preference. Replace the spinner comment with one that states the rule and its reason. Run the
   proofs green.
3. Run `npm run test:conformance`, and record the rows it needs in the guide's departure and addition tables; update
   the § Placeholder and § Spinner prose.
4. Plants, each logged to `tmp/units/mred-plant-<name>.log.txt` and restored byte-identically: restore the `1.5s`
   slow-down in place of `animation: none` on the spinners; drop the placeholder glow's reduced-motion rule; drop the
   grow spinner's opacity. Each fails a proof with an assertion.
5. Run each gate in Acceptance, logged to `tmp/units/mred-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/mred-report.md` and return the same text: the release readings; the failing-first and green readings
with commands and counts; the rules as written; the guide rows and the table each went into; the plant table; the gate
table; `tmp/units/mred.diff` (`git diff LANDING_HEAD`) and `tmp/units/mred-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when a change needs a file outside the owned set, or when an engine proof or an app journey reads a
  spinner's or placeholder's animation.
- Settle yourself the case titles, the comment, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`, the placeholder and spinner proofs read red at the base and green after.
3. Each plant fails a proof with an `AssertionError`, per its log.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole project, with its reading.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
