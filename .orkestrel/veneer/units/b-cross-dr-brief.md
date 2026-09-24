# Unit RESIDUE (`dr`) — the leftover RTL digest (B-CROSS X9)

## Role and engine

`builder` on Sonnet, a native subagent in the worktree `/home/user/veneer-dr` (branch `unit/dr` from
the session head `fb0516d`). The executor that opens this brief is that subagent.

## Objective

The pinned inventory carries the `bootstrap.css` digest alone, and the inventory pin case asserts that
its digest keys are exactly `['bootstrap.css']`.

## Context

**Ruling.** `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` X9: RESIDUE deletes
`digests["bootstrap.rtl.css"]` from the pinned inventory and pins `Object.keys(inventory.digests)` to
`['bootstrap.css']`, because Veneer ships no right-to-left support (D5). The Orchestrator moves RESIDUE
ahead of the rest of B-CROSS because it depends on no B-MODAL or B-UTILITIES landing; that is a
re-baseline of order, not of scope.

**Measured at `fb0516d`.** `tests/fixtures/oracle/inventory.json` holds, near its head, the `digests`
object with the `"bootstrap.css"` entry and the `"bootstrap.rtl.css"` entry
(`39911412c957c60512a4b23a0ea1903ed5f3a0f9f7bb7446c55a99bb2e5f7463`). The case
`pins the copied inventory release and digests and reads its component vocabulary` in
`tests/setupServer.test.ts` asserts `inventory.digests['bootstrap.css']` equals the
`BOOTSTRAP_CSS_DIGEST` constant and asserts nothing about the other keys. The `readOracleInventory`
reader in `tests/setupServer.ts` copies every digest entry and reads no specific key besides; no
other file under `tests/`, `src/`, `app/`, or `guides/` names `bootstrap.rtl.css` (search:
`grep -rn "rtl" --include=*.ts --include=*.md --include=*.json` over the tree outside `node_modules`
and `tmp`; the hits are `dir="rtl"` probe markup in three style proofs, which stay, and `ROADMAP.md`
rows, which the Orchestrator folds).

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,writing}.md`; skill:
none. Read them before editing.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
the worktree has its own `node_modules`. Write every log under the worktree's `tmp/units/` with the
`dr` prefix, and nothing into the session scratchpad.

## Unknowns

None.

## Scope

**Owned.** `tests/fixtures/oracle/inventory.json` (the `digests` object only) and
`tests/setupServer.test.ts` (the named pin case only).

**Off-limits.** Every other file, including `tests/setupServer.ts`, `ROADMAP.md`, the guide, and the
vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-dr/tmp/units/dr-report.md`, delivered also as your final message: the
edits as before and after text; the failing-first run (the assertion added before the digest is
deleted, its command written exactly as it ran and its red result line, retained as
`tmp/units/dr-red.log.txt`); each gate's command exactly as it ran with its result line; `dr.diff`
(`git diff`) and `dr-status.txt` (`git status --porcelain`) under `tmp/units/`. The report follows the
writing rule: no count of a growable set and every code token followed by a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol if a gate reads a key other than
`bootstrap.css` from the digests, or if any file outside the owned pair must change. Decide the
assertion's exact form yourself.

## Acceptance criteria

1. The pin case asserts `Object.keys(inventory.digests)` equals `['bootstrap.css']`, and a retained run
   with that assertion added and the RTL entry still present reads red on that case.
2. `inventory.json` carries no `bootstrap.rtl.css` entry and stays valid JSON.
3. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`
   exits 0.
4. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the worktree.

## Review evidence

`dr.diff`, `dr-status.txt`, `dr-red.log.txt`, and `dr-report.md`.
