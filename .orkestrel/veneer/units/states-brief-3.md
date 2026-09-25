# Unit STATES round 3 — one guide sentence and the retry's reading order

Successor to `states-brief-2.md`. What changed: the second audit round (`sts-audit-2-verdict.md`) confirmed every claim
but claim 7 and accepted F1. This round applies both exactly as written here and nothing else.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-sts`, which holds rounds 1 and 2 uncommitted over Veneer `2376710`. Start every shell command with
`cd /home/user/veneer-sts &&` and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`
and `/home/user/scaffold/.claude/rules/{writing,tests}.md`. No skill applies.

## Objective

Items 1 and 2 are applied as written, and the named gates exit 0.

## Context

**Evidence.** Measured in the worktree at round 2's tree:
- `guides/veneer.md` § Form range classes holds the sentence "The frames read the fill alone, so the gated rule is read
  as well: it declares `transition-property: none` and a `0s` duration and nothing else, which refuses a transition
  surviving on another thumb property."
- `tests/src/styles/components/form-range.test.ts`, in the case `runs the thumb fill transition with motion allowed and
  lands each fill at once under reduced motion`, holds a `retryUntil` producer that returns an object literal whose
  properties are `frame`, then `started`, then `held`.

Re-take each reading before editing, and stop if one differs.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Write every log, backup, and script under your worktree's
`tmp/units/`, never in the scratchpad.

**Standing conditions.** Rounds 1 and 2 stay, apart from the Items.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (the one sentence), `tests/src/styles/components/form-range.test.ts` (the one object
literal), and `tmp/units/`. **Off-limits.** Every other path and every other line.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace the Evidence sentence with: "The frames read the fill alone, so the gated rule is read as well: it declares
   `transition: none` and no other property, and its `transition-property: none` refuses a transition surviving on
   another thumb property." Let oxfmt rewrap the paragraph's lines if it needs to.
2. Reorder the producer's returned object literal to `started`, then `held`, then `frame`, as
   `{ started: await measureDifference(frame, started, centre), held: await measureDifference(frame, held, centre), frame }`
   in the file's formatting. Change nothing else in the case.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 and 2.
3. Run each gate in Acceptance, logged to `tmp/units/sts-3-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/sts-report-3.md` and return the same text: each Item's before and after text, the gate table,
`tmp/units/sts-3.diff` (`git diff 2376710`), and `tmp/units/sts-3-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs or a gate reads red outside a timeout under load. Nothing here is the unit's to settle.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src:styles`,
   `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts` passes.
3. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the gate logs, and a `checker` read of both Items against the diff.
