# Unit workspace-fixup — bind every vacuous-truth pin to a failing proof

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/workspace` at commit `54de910` pins each empty-batch form in its own test case, with
a recorded failing proof per pin, and links its README to the guide it ships.

## Context

**Findings, each with its ruling.**

1. **Objective F2 — the mutation probe proves two of the four pins.**
   `tests/src/core/workspaces/Workspace.test.ts:457-476` puts `has([])`, `move({})`, and
   `remove([])` in one `it`; a failure at `:466` stops the case, so the `move({})` and
   `remove([])` pins never ran red. Ruling: split that `describe` into one `it` per batch form —
   `has([])`, `move({})`, `remove([])` — each asserting its boolean, `count` still 1, `read('a.ts')`
   still `'A'`, and the `write`, `move`, and `remove` recorders at zero. Keep the manager case at
   `tests/src/core/workspaces/WorkspaceManager.test.ts:177-184` as it is. Then record the failing
   proof for each of the four pins, one seed at a time:
   - `src/core/workspaces/Workspace.ts:116`: change `path.every(` to `path.some(`; run the file;
     record the failing case name and message; edit the text back to `path.every(`.
   - `src/core/workspaces/Workspace.ts:217`: change `let moved = true` to `let moved = false`;
     run; record; edit back.
   - `src/core/workspaces/Workspace.ts:231`: change `let removed = true` to `let removed = false`;
     run; record; edit back.
   - `src/core/workspaces/WorkspaceManager.ts:108`: change `let removed = true` to
     `let removed = false`; run the manager test file; record; edit back.
   The run command is
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`.
   Restore each seed by editing the exact text back, never by a `git` command, and confirm with
   `git diff --stat src` that `src` is unchanged before the gates run. Each pin's proof binds
   only if exactly its own case went red.
2. **Pre-existing, owned, cheap.** `README.md:44` links `guides/src/workspace.md`; the file is
   `guides/workspace.md`. Ruling: `[workspace guide](guides/workspace.md)`.

Recorded, no change: the persisted-snapshot break the `data → base64` rename causes (objective
F1) is stated in the Orchestrator's commit message for this fix-up; the cross-package template
row (objective F3) was carried by the template unit; the parameter rename's citation (objective
F4) is a report defect recorded in the verdict; the predicate shape at `src/core/helpers.ts:52`
(objective F5) stands.

**Law.** `AGENTS.md` § TTTDD (a test that never ran red does not bind); `.claude/rules/tests.md`;
`.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/workspace` at commit `54de910`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `tests/src/core/workspaces/Workspace.test.ts`, `README.md`, and — only for the
temporary seed flips in finding 1, each restored before the gates run —
`src/core/workspaces/Workspace.ts` and `src/core/workspaces/WorkspaceManager.ts`.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command (`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`). Tree-wide
`format` only to converge after `npm run lint`; then the non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply finding 1, then
finding 2, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; per pin — the seed flipped, the exact run command, the failing case name and message,
the restore, and the green run; `git diff --stat src` after the restores; each gate command with
its exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a flipped seed reddens a case other than its own pin, when a seed cannot be
restored to the exact text, or when a gate fails for a cause you cannot attribute after the
re-run. Decide, record, and carry on from the wording of a test title.

## Acceptance criteria

1. Three `it` cases exist for `has([])`, `move({})`, and `remove([])`, and each went red under
   exactly its own seed flip with the failing message recorded, then green.
2. `git diff --stat src` is empty after the restores.
3. `README.md` links `guides/workspace.md`.
4. The gate chain exits 0.
5. `git status --short` lists only `tests/src/core/workspaces/Workspace.test.ts` and `README.md`.
