# Unit E-ID-MOTION-REDUCED round 2 — the spinner prose, three titles, and the label assertions

Successor to `e-id-motion-reduced-brief.md`. What changed: the audit (`mred-audit-verdict.md`) confirmed the cascade,
the proofs, the plants, and the ledger, and failed the spinner prose and three case titles, with R2 accepted.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mred`, which holds round 1 uncommitted over Veneer `21c821a`. The edits are fully specified. Start
every shell command with `cd /home/user/veneer-mred &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,styles}.md`. No skill applies.

## Objective

Items 1 to 6 are applied as written, Item 6's plant fails the rendering assertion, and the named gates exit 0.

## Context

**Evidence.** Measured in the worktree at round 1's tree:
- `guides/veneer.md` § Spinner classes holds "The release slows each spinner to `1.5s` instead and keeps it turning,",
  "A spinner's status role and its label are what report the wait, so a still spinner still reports that work is
  running.", and "each spinner turns without the reduced-motion preference and stands still under it".
- § Keyframes' `spinner-grow` row ends "and its dot keeps pulsing."
- `src/styles/components/_spinner.scss` holds the comment lines "// still. The spinner's status role and its label are
  what report the wait, so a still spinner" and "// keeps saying that work is running."
- `tests/src/styles/components/spinner.test.ts` holds the titles `'stops $name under the reduced-motion preference and
  turns it again without it'` and `'gates nothing on a width boundary'`, and, in the grow case,
  `expect(isRendered(label)).toBe(true)` followed by `expect(readText(spinner)).toBe('Loading...')`.
- `tests/src/styles/components/placeholder.test.ts` holds the title `'gates its animations on the reduced-motion
  preference and nothing on a width boundary'`.

Re-take each reading before editing, and stop if one differs.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src:styles` before a styles run. Write every
log, backup, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Standing conditions.** Round 1 stays, apart from the Items.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (the named sentences and cell), `src/styles/components/_spinner.scss` (the two comment
lines only, and the plant), `tests/src/styles/components/spinner.test.ts` and `placeholder.test.ts` (the named titles
and assertions), and `tmp/units/`. **Off-limits.** Every other path and every other line.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In § Spinner classes, replace "and keeps it turning," with "and keeps each one moving,".
2. Replace "A spinner's status role and its label are what report the wait, so a still spinner still reports that work
   is running." with "A spinner's status role and its label report the wait to assistive technology, so there a still
   spinner loses only its motion; on screen the border spinner rests as an open ring and the grow spinner as a whole
   disc."
3. Replace "each spinner turns without the reduced-motion preference and stands still under it" with "each spinner runs
   its animation without the reduced-motion preference and stands still under it". In § Keyframes' `spinner-grow` row,
   replace "and its dot keeps pulsing." with "and its disc keeps pulsing." Let oxfmt re-pad the table.
4. In `_spinner.scss`, replace the two comment lines with "// still. The spinner's status role and its label report the
   wait to assistive technology, so there" and "// a still spinner loses only its motion." at the same indentation.
5. Retitle `'stops $name under the reduced-motion preference and turns it again without it'` to `'stops $name under
   the reduced-motion preference and runs it again without it'`; retitle both "gates" cases to `'gates this family on
   the reduced-motion preference alone'`.
6. Remove `expect(readText(spinner)).toBe('Loading...')` and its `readText` import if nothing else uses it. Plant: under
   `@include reduced-motion` in the `.spinner-grow` rule, add `.visually-hidden { display: none; }`; the grow case fails
   at `expect(isRendered(label)).toBe(true)` with an `AssertionError`. Log it to
   `tmp/units/mred-2-plant-label.log.txt` and restore byte-identically.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 6, and run Item 6's plant.
3. Run each gate in Acceptance, logged to `tmp/units/mred-2-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/mred-report-2.md` and return the same text: each Item's before and after text, the plant reading, the
gate table, `tmp/units/mred-2.diff` (`git diff 21c821a`), and `tmp/units/mred-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when the plant does not fail at the rendering assertion, or when a gate reads red outside a timeout under load.
Nothing here is the unit's to settle.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`, the spinner and placeholder files pass under
   `npx vitest run --config configs/src/vite.styles.config.ts <files>`.
3. Item 6's plant fails the rendering assertion, per its log.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant log, the gate logs, and a `checker` read of Items 1 to 6 against the diff.
