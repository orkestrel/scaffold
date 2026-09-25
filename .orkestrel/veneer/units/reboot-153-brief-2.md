# Unit REBOOT-153 round 2 — the width reading states its reason without a build claim, and every mapping is proved

Successor to `reboot-153-brief.md`, which stays in place unedited. What changed: round 1 was audited in
`reboot-153-audit-verdict.md` (FAIL 2, 3, 5). The doc block and the guide sentence claimed a Chromium 153 border
behaviour nothing measured, and the proof let three border mappings go unchecked. Round 1 is committed on `unit/r153` as
`4574c58`; this round writes over it. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-r153` (branch `unit/r153` at `4574c58`). Start every shell command with `cd /home/user/veneer-r153 &&`
and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md` and the rules
`/home/user/scaffold/.claude/rules/{tests,writing}.md`. No skill applies.

## Objective

The `normalizeLineWidths` doc block and the guide sentence give the reason for the reading without naming what a build
computes, and the proof fails when any single width mapping is removed.

## Context

**Evidence.** Measured at `4574c58`. Re-take each reading before editing, and stop if it differs.
- `tests/setupBrowser.ts`, the `normalizeLineWidths` doc block (around line 1863), reads: "A line style of `none` or
  `hidden` paints no line whatever its width. Chromium 141 computes such a width at `0px` and Chromium 153 at its
  declared length, so a reading compared across builds reads the width as it paints. Every other entry, and a width
  whose style longhand the reading lacks, is returned unchanged."
- `guides/veneer.md` (around line 10771) reads: "It reads an outline or border width whose line style paints no line at
  `0px`, because Chromium 141 computes such a width at `0px` and Chromium 153 at its declared length."
- `tests/setupBrowser.test.ts`, `describe('normalizeLineWidths')`, holds one case with two `expect` calls.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Write every log, backup, and script under `tmp/units/r2/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The doc block's remarks paragraph, the `describe('normalizeLineWidths')` case, the guide sentence, and
`tmp/units/`. **Off-limits.** Every other line and path. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In the doc block, replace the remarks paragraph with: "A line style of `none` or `hidden` paints no line whatever its
   width, so a reading compared across builds takes such a width at `0px`, whatever length a build computes it at.
   Every other entry, and a width whose style longhand the reading lacks, is returned unchanged." Re-wrap at 120
   columns as the block is wrapped.
2. In the guide, replace the sentence with: "It reads an outline or border width whose line style paints no line at
   `0px`, whatever length a build computes it at, because such a width paints nothing." Re-wrap the paragraph at 100
   columns without changing another word.
3. In the `normalizeLineWidths` case, add a third `expect` after the first:
   `normalizeLineWidths({ 'outline-style': 'none', 'outline-width': '3px', 'border-top-style': 'none', 'border-top-width': '1px', 'border-right-style': 'hidden', 'border-right-width': '2px', 'border-bottom-style': 'none', 'border-bottom-width': '4px', 'border-left-style': 'hidden', 'border-left-width': '5px' })`
   `toEqual` the same object with every width at `'0px'`.

## Execution

Perform the assignment directly and spawn nothing. Back up each owned file under `tmp/units/r2/` before editing.

1. Re-take the Evidence readings.
2. Apply Item 3 first. For each of `border-top-width`, `border-right-width`, and `border-bottom-width` in turn, remove
   that one entry from `LINE_STYLES`, run
   `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t normalizeLineWidths`,
   log it to `tmp/units/r2/r153-mutation-<longhand>.log.txt`, confirm an `AssertionError`, and restore `LINE_STYLES`
   byte-identically (log the restoring `git diff --stat tests/setupBrowser.ts` beside it).
3. Apply Items 1 and 2.
4. Run each gate in Acceptance, logged to `tmp/units/r2/r153-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` appended.

## Output

Write `tmp/units/r2/r153-report-2.md` and return the same text: the Evidence re-readings, each Item's before and
after, the mutation table (longhand, log, the `AssertionError` line), the gate table, `tmp/units/r2/r153-2.diff`
(`git diff 4574c58`), and `tmp/units/r2/r153-2-status.txt`.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when a mutation survives, or when a gate reads red. Settle nothing yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files.
2. Each mutation in Execution step 2 fails the case with an `AssertionError`, and `LINE_STYLES` is restored.
3. `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passes.
4. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diffs, the mutation logs, and the gate logs. `analyst` on GPT-6 Astra rules the Orchestrator's text and the proof.
