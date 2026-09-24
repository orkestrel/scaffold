# Unit RAMP-DOWN (`rd`) — one down-direction breakpoint walk (the MODAL audit's re-baseline)

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-rd` (branch `unit/rd` from the
session head 42fd88e, after OFFCANVAS lands). The executor that opens this brief is that subagent.

## Objective

A down-direction twin of the `breakpoint-each` mixin exists in `src/styles/_mixins.scss` with its fixture
case, and `_modal.scss`, `_table.scss`, and `_offcanvas.scss` each write their down-walk rule set once
through it, with the built cascade unchanged.

## Context

**Ruling.** The RAMP-DOWN row of `ROADMAP.md` § Carriers in the worktree, from the MODAL round-1 audit's § Re-baseline (the verdict is pruned; read it with `git -C /home/user/scaffold show 8c46b904~1:.orkestrel/veneer/units/md-audit-verdict.md`): the twin
emits its content unwrapped at the zero boundary and under `(width < boundary)` elsewhere, yielding the
same `($infix, $boundary)` pair the `breakpoint-each` mixin yields, so the fullscreen modal classes, the
responsive tables, and the responsive and bare offcanvas panels each write their rule set once, where
each partial writes the unconditioned rule set beside the walk. D46 applies: a technique is a pattern
and goes in a mixin.

**Measured at the base.** The `breakpoint-each` mixin (around line 166) walks `breakpoints()` through
the `breakpoint-up` mixin; the `breakpoint-down` mixin (around line 183) emits nothing at the zero
boundary. `_modal.scss` writes the `.modal-fullscreen` rule set unconditioned and again for each
`.modal-fullscreen-{name}-down` class inside a `breakpoint-down` walk (the comment above the walk says
why). `_table.scss` writes `.table-responsive` unconditioned and each `.table-responsive-{name}` inside a
`breakpoint-down` walk. `_offcanvas.scss` writes each `.offcanvas-{name}` panel's fixed rule set inside a
`breakpoint-down` walk and the bare `.offcanvas` rule set after it from the same maps (its comment says
the walk cannot write the unconditioned rules). Locate each by these constructs, not by line.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`;
the notes `w2-w3-note-1.md` and `w2-w3-note-2.md` beside this brief; skill: none.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree has its own `node_modules`. Write every
instrument and log under the worktree's `tmp/units/` or `tmp/probe/` with the `rd` prefix, and nothing
into the session scratchpad or the system temporary directory.

## Unknowns

- The twin's name: one word or the `breakpoint-each` family's form, per `.claude/rules/names.md`; the
  unit decides and records why.
- Whether the offcanvas partial's bare rule set moving ahead of the responsive panels changes the built
  cascade's rule order: the unit measures it. If the cascade is not byte-equal, the unit stops and
  reports the difference with the release's own order beside it.

## Scope

**Owned.** `src/styles/_mixins.scss` (the twin and its comment); `src/styles/components/_modal.scss`,
`_table.scss`, and `_offcanvas.scss` (the walks and their comments); `tests/src/styles/fixtures/mixins.scss`
and `tests/src/styles/mixins.test.ts` (the twin's fixture and case).

**Shared (report-only).** `guides/veneer.md` (the § Styles mixin paragraph and any sentence the change
makes false); return `rd-shared.patch` against 42fd88e.

**Off-limits.** Every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-rd/tmp/units/rd-report.md` and the same text as the final message: the
twin and each rewritten walk as before and after code; the byte comparison of `dist/src/styles/index.css`
built at 42fd88e and after the change (the command and its result); the fixture case and its red run with
the twin's zero-boundary branch dropped; each gate's command exactly as it ran with its exit and result
line; `rd.diff`, `rd-status.txt`, and `rd-shared.patch` under `tmp/units/`. The report states no tally of
a growable set and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when the built cascade differs. Decide,
record, and carry on for the twin's name and its comment's wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the worktree.
2. `npm run build:src` exits 0, and `cmp` of the built stylesheet at 42fd88e and after the change exits 0.
3. The mixins proof, the modal, table, and offcanvas style proofs, `npm run test:conformance`, and
   `npm run test:guides` exit 0; the twin's fixture case reddens with its zero-boundary branch dropped.
4. No partial writes a rule set both unconditioned and inside a down walk (read from the diff).

## Review evidence

`rd.diff`, `rd-status.txt`, `rd-shared.patch`, and `rd-report.md`.
