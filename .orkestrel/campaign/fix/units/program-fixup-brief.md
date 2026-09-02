# Unit program-fixup — close the program unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/program` at commit `f0c1ae8` states what `buildProgramDefinition` copies and what it
stores by reference, and its test import lists are sorted where the rename unsorted them.

## Context

**Findings, each with its ruling.**

1. **Objective F1 — a false `@remarks` claim.** `src/core/helpers.ts:945` says the builder "never
   aliases its inputs", while `:974-977` shallow-copies `notices`, stores `authority` and
   `aggregate` by reference, and deep-copies only `metadata` with `structuredClone`; the
   whole-graph snapshot belongs to the `Program` constructor (`src/core/programs/Program.ts:93`).
   Ruling: the remark states that `metadata` is deep-copied, that `notices` is copied as an array
   whose elements are shared, that `qualification`, `rating`, `authority`, and `aggregate` are
   stored by reference, and that the `Program` constructor snapshots and seals the graph. Keep the
   third-person voice the block already uses. If `guides/program.md` restates the "never aliases"
   claim, move it the same way.
2. **Objective F2 — four import lists the rename unsorted.** `tests/setup.ts:17-28`,
   `tests/setup.test.ts:24`, `tests/src/core/factories.test.ts:2`, and
   `tests/src/core/programs/ProgramManager.test.ts:2` were sorted before the rename and are not
   after it; `tests/src/core/helpers.test.ts:22,36,37` gained out-of-order entries in a list that
   was already unsorted. Ruling: sort the four lists alphabetically, and sort the
   `helpers.test.ts` and `validators.test.ts` lists too, so every list in `tests` reads one way.

Recorded, no change: `buildNotice` beside `buildNotices` (which returns `Determination[]`) is a
naming successor row, not a correctness defect; the raw `DataCloneError` a runtime-off-type
`metadata` now raises is a tightening accepted for this wave, with a uniform error surface as a
successor question; the vendored `guides/qualifier.md` and `guides/reason.md` mirrors refresh at
the re-pin.

**Law.** `AGENTS.md`; `.claude/rules/typescript.md`; `.claude/rules/documentation.md`;
`.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/program` at commit `f0c1ae8`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/helpers.ts` (the `buildProgramDefinition` TSDoc block only),
`guides/program.md` (only where it restates the aliasing claim), `tests/setup.ts`,
`tests/setup.test.ts`, `tests/src/core/factories.test.ts`,
`tests/src/core/programs/ProgramManager.test.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/validators.test.ts` — the import lists only.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply finding 1, then
finding 2, sweep `never aliases` case-insensitively over `src`, `tests`, `guides/program.md`,
`README.md`, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the sweep result; each gate command with its exit code and an excerpt for any
failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when sorting an import list changes a test's behavior, or when a gate fails for a
cause you cannot attribute after the re-run. Decide, record, and carry on from the wording of a
sentence.

## Acceptance criteria

1. `rg -n -i 'never aliases' src guides/program.md README.md` returns no hit and the remark states
   the copy and reference facts as ruled.
2. Every named import list is alphabetical.
3. The gate chain exits 0.
4. `git status --short` lists only owned files.
