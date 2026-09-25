# Unit LEDGER-ADDITIONS round 4 — the reader's name and summary, verbatim

Successor to `ledger-additions-brief-3.md`. What changed: the third audit round (`lad-audit-3-verdict.md`) confirmed the
decoded-name recognition and failed the name and the summary sentence, which the Orchestrator rules here.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-lad`, which holds rounds 1 to 3 uncommitted over Veneer `2376710`. The edits are fully specified and
carry no judgment. Start every shell command with `cd /home/user/veneer-lad &&` and give every file tool an absolute
path under it. Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{names,typescript,tests}.md`.
No skill applies.

## Objective

Items 1 and 2 are applied as written, and the named gates exit 0.

## Context

**Evidence.** Measured in the worktree at round 3's tree:
- `grep -rn collectMatchingClasses tests guides src` returns the declaration, its `@example`, `attributeSelector`'s
  TSDoc and call, and `matchSelectorKey`'s `@param` in `tests/setupServer.ts`, and the import, the export-list entry,
  and the reading case's calls in `tests/setupServer.test.ts`.
- The reader's TSDoc summary reads "Collects every class a selector writes, reading through `:is()` and `:where()`
  arguments."

Re-take each reading before editing, and stop if one differs.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.
Write every log, backup, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Standing conditions.** Rounds 1 to 3 stay, apart from the Items.

## Unknowns

None.

## Scope

**Owned.** `tests/setupServer.ts` and `tests/setupServer.test.ts`, at the sites the Evidence names only, and
`tmp/units/`. **Off-limits.** Every other path and every other line.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Rename `collectMatchingClasses` to `collectAttributionClasses` at every site the Evidence names. Keep the export-list
   case's names in sorted order.
2. Replace the reader's summary sentence with "Collects every class a selector writes at its own level or inside an
   `:is()` or a `:where()` argument."

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 and 2.
3. Run each gate in Acceptance, logged to `tmp/units/lad-4-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/lad-report-4.md` and return the same text: each Item's before and after text, the gate table,
`tmp/units/lad-4.diff` (`git diff 2376710`), and `tmp/units/lad-4-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs or a gate reads red outside a timeout under load. Nothing here is the unit's to settle.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `grep -rn collectMatchingClasses tests guides src` returns nothing.
3. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts` passes.
4. `npm run test:conformance` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the gate logs, and a `checker` read of both Items against the diff.
