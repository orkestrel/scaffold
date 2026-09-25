# Unit E-ID-MOTION-FACTOR round 3 — the factor prose reads once, the reader's contract is true, and every narrowed reading is asserted present

Successor to `e-id-motion-factor-brief-2.md`. What changed: the round-2 audit (`mfac-audit-2-verdict.md`) confirmed the
token routing, the reader, the routing of every case, § Factors' exception list, the ledger rows, and the gates, and
failed four sentences (claim 7), the kill of a zeroed resting duration (claim 3), and the reader's `@throws` text (F3).
This is the unit's third round, so the Orchestrator rules the fix. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mfac`, which holds rounds 1 and 2 uncommitted over Veneer `b613ae4`. The proofs launch Chromium,
which a bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-mfac &&` and give every file
tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`, the rules
`/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/mfac-audit-2-verdict.md` with both lane verdicts beside it. No skill
applies.

## Objective

The progress, form-floating, and pagination comments and the § Factors paragraphs read once and state one fact one
way; the reader's `@throws` text says the scene is cleared; and deleting a resting transition fails each routed case
that narrows a reading with an `AssertionError`.

## Context

**Evidence.** Measured in the worktree at round 2's tree. Re-take each reading before editing, and stop if one differs.
- `src/styles/components/_progress.scss`, the comment above `--bs-progress-bar-transition` (around lines 25 to 27): "The
  fill's width change is feedback to the value the bar reports, so its transition reads the feedback token scaled by
  the release's own ratio to it, and keeps the release's curve; the motion factor reaches it only through that token."
- `src/styles/components/_form-floating.scss`, the header comment (around lines 9 to 12), contains "The label's lift is
  feedback to the control's own input, so its transition reads the feedback token scaled by the release's own ratio to
  it, the way the height reads a multiple of a space token, and the motion factor reaches it only through that token."
- `src/styles/components/_pagination.scss` (around lines 58 to 60) contains "The curve stays the release's
  `ease-in-out`, because `--vn-ease-standard` resolves to `ease`."
- `guides/veneer.md` § Factors (around line 7109) contains "A scaled duration reads a `--vn-motion-*` token or a
  multiple of one, so it doubles from its own resting value at a factor of `2` and starts no transition at a factor of
  `0`. At a factor of `1`, a scaled duration that keeps the release's timing resolves to the release's value, and one
  § Departures records against the release, such as the `.icon-link` transform's, resolves to its token's value." and,
  in the following paragraph, "A subtree that sets a factor alone keeps the root's lengths,".
- `tests/setupBrowser.ts`, the `sweepMotionFactor` TSDoc: "@throws Thrown when the drive throws, with the drive's own
  error, after the factor and the scene are restored."
- The motion-factor cases in `tests/src/styles/components/{form-floating,progress,navbar,fade}.test.ts` narrow the
  resting reading (and, in the first three, the doubled reading) through `requireValue`
  (`requireValue(resting, 'No transition at the resting factor')`, `requireValue(doubled, 'No transition at the doubled
  factor')`, and in `fade.test.ts` `requireValue(resting?.[0], 'No transition at the resting factor')`).

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run, and run a
styles file with `npx vitest run --config configs/src/vite.styles.config.ts <files>`. Other worktrees run suites at the
same time; record `/proc/loadavg` with every timing reading. Write every log, backup, and script under this worktree's
`tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The comment lines Items 1 to 3 name; the § Factors sentences Items 4 and 5 name and the re-wrap of their
paragraphs in `guides/veneer.md`; the `sweepMotionFactor` `@throws` text in `tests/setupBrowser.ts`; the four motion-factor
cases Item 7 names; `src/styles/components/_form-floating.scss` during the plant only, restored byte-identically; and
`tmp/units/`.

**Off-limits.** Every rule declaration in `src/styles/**`, every other line of the owned files, and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` is
allowed.

## Items

1. In `_progress.scss`, replace the comment with "The fill's width change is feedback to the value the bar reports, so
   its transition reads four times the feedback token on the release's curve, and the motion factor reaches the
   transition only through that token.", wrapped at 100 columns with the file's indentation.
2. In `_form-floating.scss`, replace the quoted sentence with "The label's lift is feedback to the control's own input,
   so its transition reads the feedback token scaled by the release's own ratio to that token, the way the height reads
   a multiple of a space token; the motion factor reaches the transition only through the feedback token." Re-wrap the
   comment at 100 columns without changing another word.
3. In `_pagination.scss`, replace "The curve stays the release's `ease-in-out`, because `--vn-ease-standard` resolves to
   `ease`." with "The curve stays the release's `ease-in-out`, which no `--vn-ease-*` token resolves to." Re-wrap the
   comment at 100 columns without changing another word.
4. In § Factors, replace the two quoted sentences beginning "A scaled duration reads" with "A scaled duration reads a
   `--vn-motion-*` token, alone or scaled by a fixed ratio, so it doubles from its own resting value at a factor of `2`
   and starts no transition at a factor of `0`. At a factor of `1`, it resolves to the value its token and ratio give,
   which is the release's duration wherever Veneer keeps that duration. § Departures records each scaled duration that
   differs from the release's, such as the `.icon-link` transform's, and § Additions records each transition the
   release does not write." Keep the paragraph's first sentence, and re-wrap the paragraph at 100 columns.
5. In the following paragraph, replace "keeps the root's lengths," with "keeps the root's lengths and durations,", and
   re-wrap that paragraph at 100 columns.
6. In the `sweepMotionFactor` TSDoc, replace the `@throws` text with "Thrown when the drive throws, with the drive's own
   error, after the factor is restored and the scene is cleared."
7. In each of the four motion-factor cases the Evidence names, write `expect(resting).toBeDefined()` on the line before
   `requireValue(resting, …)`, and `expect(doubled).toBeDefined()` on the line before `requireValue(doubled, …)`; in
   `fade.test.ts`, write `expect(resting?.[0]).toBeDefined()` before `requireValue(resting?.[0], …)`. Change nothing
   else in those cases. Plant: set both label durations in `_form-floating.scss` to `0s` (replace each
   `calc(var(--vn-motion-feedback) / 1.5)` with `0s`), rebuild, and run `form-floating.test.ts`; the motion-factor case
   fails with an `AssertionError`. Log it to `tmp/units/mfac-3-plant-zeroed.log.txt` and restore the partial
   byte-identically, then rebuild.

## Execution

Perform the assignment directly and spawn nothing. Back up each owned file under `tmp/units/` before the first edit.
Re-take the Evidence readings, apply Items 1 to 7, run the plant, then run each gate in Acceptance, logged to
`tmp/units/mfac-3-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mfac-report-3.md` and return the same text: each Item's before and after; the plant reading; the gate
table; `tmp/units/mfac-3.diff` (`git diff b613ae4`), `tmp/units/mfac-3-delta.diff` (this round alone, against the
backups), and `tmp/units/mfac-3-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when an Item's text does not typecheck, lint, or format as written, or when a gate reads red outside a timeout
under load. Settle nothing else yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files, logged with its
   exit.
2. After `npm run build:src:styles`, the owned style files pass.
3. The plant fails the form-floating motion-factor case with an `AssertionError`, per its log, and restores identically.
4. `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passes.
5. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff, the delta, the status, the plant log, and the gate logs. `analyst` on GPT-6 Astra checks the prose the
Orchestrator ruled against the built cascade, and the presence assertions against the plant.
