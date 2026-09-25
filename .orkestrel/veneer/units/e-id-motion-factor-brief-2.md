# Unit E-ID-MOTION-FACTOR round 2 — every factor read stays in the tokens, § Factors is true everywhere, and one sweep reader

Successor to `e-id-motion-factor-brief.md`. What changed: the audit (`mfac-audit-verdict.md`) confirmed the scaled
transitions, the proofs, and the ledger rows, failed claims 2 and 5, withdrew the `motion()` patch, and accepted F2 and
R2. This brief grants `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and `tests/src/styles/components/fade.test.ts`
for R2.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mfac`, which holds round 1 uncommitted over Veneer `b613ae4`. The proofs launch Chromium, which a bench
sandbox cannot drive. Start every shell command with `cd /home/user/veneer-mfac &&` and give every file tool an absolute
path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/mfac-audit-verdict.md` with both lane verdicts beside it. No skill applies.

## Objective

The floating label and the progress bar scale through a multiple of `--vn-motion-feedback`, so every factor read stays in
`src/styles/_tokens.scss` and a subtree that sets the factor alone slows no transition. § Factors is true of every
transition the cascade writes. One exported, proved reader runs the factor sweep that every motion-factor case repeats.

## Context

**Evidence.** Measured in the worktree at round 1's tree:
- `src/styles/components/_form-floating.scss` writes the label's `opacity` and `transform` over
  `calc(100ms * var(--vn-factor-motion))` (around lines 51 to 54), with a header comment (around lines 9 to 11) that gives
  the value as the reason.
- `src/styles/components/_progress.scss` writes `--bs-progress-bar-transition: width calc(600ms *
  var(--vn-factor-motion)) ease` (around line 27), with a comment (around lines 25 and 26).
- `src/styles/_tokens.scss` declares `--vn-motion-feedback: calc(150ms * var(--vn-factor-motion))` on the `:root`
  selector (around line 448).
- `guides/veneer.md` § Factors (around lines 7106 and 7107) says a scaled duration "reads a `--vn-motion-*` token or
  multiplies the release's own duration by the factor, so it resolves to the release's value at a factor of `1`"; the
  `.icon-link` transform reads the `150ms` feedback token where the release writes `200ms` (the departure row around line
  8629).
- The factor sweep, `['1', '2', '0'].map((factor) => { … setProperty(TOKEN_NAMES.factor.motion, factor) … mount … drive …
  sampleTransition … scene.clear() … })`, repeats in each new motion-factor case of
  `tests/src/styles/components/{form-floating,progress,nav,pagination,navbar,accordion}.test.ts`, and a factor case in
  `tests/src/styles/components/fade.test.ts` sets the factor inline too.
- `src/styles/components/_accordion.scss` (around line 50) says "reads the feedback token the accordion declares it
  over"; the guide writes one fact as "which no motion token resolves to" (nav, around line 4888) and as "no published
  token resolves to that easing" (pagination, around line 5219).

**Law.** `.claude/rules/styles.md` (tokens over literals; a factor read belongs to the tokens); `.claude/rules/tests.md`
§ Shared test infrastructure (a routine another test can use lives in a setup module, exported and proved);
`.claude/rules/names.md`; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity.

**Shared file, told in advance.** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` also change in other units
(E-ID-BUTTON-CLASSES, the engine session's units). Add your reader, its proof, and its export-list entry; change nothing
else there. The landings merge by hunk.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; record `/proc/loadavg` with every timing reading. Write every log, backup, probe, and script under this
worktree's `tmp/units/`, never in the scratchpad.

**Control identifiers.** The claim, F, and R labels are this brief's. Name each test for what it proves.

## Unknowns

- The sweep reader's name, signature, and home, settled under `.claude/rules/names.md` (a module-scope helper takes
  `{verb}{Noun}`) and `.claude/rules/tests.md`. Report the ruling.

## Scope

**Owned.** The six partials round 1 owned; their style tests; `tests/src/styles/components/fade.test.ts` (its factor
case's call site only); `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (the reader, its proof, and its
export-list entry only); `guides/veneer.md` (the rows, bullets, paragraphs, and § Factors text round 1 wrote, and the
two sentences F2 names); and `tmp/units/`.

**Off-limits.** `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/browser/**`, `tests/src/browser/**`,
`tests/app/**`, `tests/setupStyles.ts`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`), `vite.config.ts`, `package.json`, and every other path.

**What asserts the state this change ends.** The form-floating and progress ledger rows (their Veneer cells change); the
export-list case in `tests/setupBrowser.test.ts`; `npm run test:conformance`; `npm run test:guides`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. **Claim 2.** Write the label's transitions over `calc(var(--vn-motion-feedback) / 1.5)` and the bar's over
   `calc(var(--vn-motion-feedback) * 4)`, each on the release's easing. Rewrite both comments so each gives the reason by
   the kind of motion, never by the value. Add a case to `form-floating.test.ts` that sets the factor to `2` on a wrapper
   alone and reads the label's running transition at the root's resting duration; run it red on round 1's form first,
   and record the command and failing count.
2. **Claim 5.** Rewrite § Factors so it is true of every transition the cascade writes: a scaled duration reads a
   `--vn-motion-*` token or a multiple of one, doubles from its own resting value at a factor of `2`, and starts no
   transition at `0`; state the release-value equality only for the transitions that keep a release duration. Keep the
   exception list round 1 wrote.
3. **R2.** Export one reader from `tests/setupBrowser.ts` that runs a drive at each motion factor on the document element
   and returns each factor's samples, restoring the factor and the scene after each; prove it in
   `tests/setupBrowser.test.ts` with a fixture whose transition reads the feedback token and a control whose transition
   writes a literal; route every new motion-factor case and the `fade.test.ts` factor case through it.
4. **F2.** Rewrite the accordion comment so it reads once, and write the "no motion token resolves" fact one way in both
   guide sentences.
5. Update the ledger Veneer cells from the rows `npm run test:conformance` prints, the departure bullets, and the progress
   paragraph. Run every owned proof green.
6. **Plants**, each logged to `tmp/units/mfac-2-plant-<name>.log.txt` and restored byte-identically: restore round 1's
   direct factor read on the label (the subtree case fails with an assertion); make the sweep reader skip the factor
   restore (its proof fails with an assertion).
7. Run each gate in Acceptance, logged to `tmp/units/mfac-2-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mfac-report-2.md` and return the same text: the reader's name, signature, and proof; the failing-first
and green readings with commands and counts; the rules and prose as written; the guide rows; the plant table; the gate
table; `tmp/units/mfac-2.diff` (`git diff b613ae4`) and `tmp/units/mfac-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when a change needs a file outside the owned set, or when routing an existing case through the reader
  would change what it asserts.
- Settle yourself the reader's name, signature, and home within the owned set, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style files pass, and the subtree case read red on round 1's form.
3. `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passes.
4. Each plant fails with an `AssertionError`, per its log.
5. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5.
