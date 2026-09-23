# Unit B-PASSIVE-ORDER-GUIDE (`bpog`) — the guide's sections and tables in the barrel's order

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent in the worktree `/home/user/veneer-bpog`
(branch `unit/bpog` from `BASE_SHA`, the commit on which CLOSE-GUIDE and B-PASSIVE-ORDER have
landed). The executor that opens this brief is that subagent.

## Objective

The guide's `### <Key> classes` sections of the passive block and `### Helper classes` sit in the
barrel's order after the forms sections, and the passive and helper `#### <key>` tables under
`### Departures` sit in the same order after the forms tables, with no sentence rewritten.

## Context

**Evidence.** The barrel at `BASE_SHA` (`grep -n "@use 'components\|@use 'utilities" src/styles/index.scss`)
loads, after the forms partials, `button-group`, `card`, `breadcrumb`, `pagination`, `badge`,
`progress` as `progress-component`, `list-group`, `close`, `spinner`, `placeholder`, `icon-link`,
`ratio`, `vr`, then `utilities/gap` (B-PASSIVE-ORDER, Veneer `f898502`, pinned by the conformance
case `loads the passive block and the helpers in the release order`). The guide's section order
and the tables' order the Orchestrator derived from that barrel
(`/home/user/scaffold/.orkestrel/veneer/units/bpo-audit-2-verdict.md`, claim 4): sections after
`### Validation classes` in the order Button group, Button toolbar, Card, Breadcrumb, Pagination,
Badge, Progress, List group, Close, Spinner, Placeholder, Helper; tables after `#### valid-tooltip`
in the order `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`, `btn-close`,
`placeholder`, `icon-link`. The unit measures the headings first
(`grep -n "^### \|^#### " guides/veneer.md`) and stops if a named heading is absent or a passive
section or table the barrel implies is not in the list.

**Law.** `AGENTS.md`; `.claude/rules/{documentation,writing}.md`; the skill: none; the guide
`guides/veneer.md` (§ Styles states the forms order's home; the sections and tables follow the
barrel).

**Installed primitives.** `@orkestrel/guide` (`tests/guides.test.ts` reads the guide by heading):
this unit adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-bpog`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
no sandbox.

**Measurements.** Taken by the staging script at `BASE_SHA` (`npm ci --ignore-scripts` exit 0);
the unit runs `npm run test:guides` first and records the exit and case count.

**Control identifiers.** None.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored; the
policy sweep reads the guide for banned terms, so a moved block carries no new text. No proof reads
section or table order (B-PASSIVE-ORDER's measurement). `git status --porcelain` is empty at
`BASE_SHA`. Sibling units run in their own worktrees and treat the guide as report-only; this unit
is the guide's sole writer while it runs.

## Unknowns

- Whether `### Button toolbar classes` and any other section without a barrel line of its own sit
  inside the block the unit moves: keep it after `### Button group classes` (it documents the
  `btn-toolbar` key `_button-group.scss` writes).

## Scope

**Owned.** `guides/veneer.md` (section and table moves only; no sentence changed inside a moved
block; blank-line spacing between blocks preserved).

**Shared (report-only).** None.

**Off-limits.** Every other file.

**What asserts the state this change ends.** `tests/guides.test.ts` (heading-keyed parity;
Owned's neighbour, unchanged); `tests/policy.test.ts` (vendored, reads the guide).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; `npx oxfmt --write guides/veneer.md` is
permitted after the moves.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-bpog/tmp/units/bpog-report.md` with: the heading measurement before
and after (`grep -n "^### \|^#### " guides/veneer.md` filtered to the moved headings), a statement
that `git diff --stat` shows the guide alone and that `git diff` carries only moved lines (a check:
`git diff | grep '^[-+]' | grep -v '^[-+][-+]' | sed 's/^[-+]//' | sort | uniq -u` prints nothing),
the gate exits with their commands, and what the unit could not close. Delivered as that file plus
the same text as the final message.

## Deviation contract

Stop and report on a heading the list names that the guide lacks, on a section the barrel implies
that the list omits, or on a moved block that would split a table from its introducing sentence.
Decide, record, and carry on from the blank-line spacing between moved blocks.

## Acceptance criteria

1. `npx oxfmt --check guides/veneer.md` exits 0 and `npm run format:check` exits 0.
2. `git diff | grep '^[-+]' | grep -v '^[-+][-+]' | sed 's/^[-+]//' | sort | uniq -u` prints nothing (moved lines only).
3. `grep -n "^### " guides/veneer.md` prints, after `### Validation classes`, the sections in the order Button group, Button toolbar, Card, Breadcrumb, Pagination, Badge, Progress, List group, Close, Spinner, Placeholder, Helper; `grep -n "^#### " guides/veneer.md` prints, after `#### valid-tooltip`, the tables in the order `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`, `btn-close`, `placeholder`, `icon-link`, with every other heading in its prior relative order.
4. `npm run test:guides` exits 0 with the same case count as the measurement.
5. The report carries the before and after heading listings and every command with its exit.

**Observations, not criteria.** `npm run test:policy` (the Orchestrator's run at landing).

## Review evidence

`git -C /home/user/veneer-bpog diff BASE_SHA` and `git -C /home/user/veneer-bpog status --porcelain`,
captured at hand-back as `bpog.diff` and `bpog-status.txt`, plus the report.
