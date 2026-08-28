# Design brief: consolidate the server execution functions into `helpers.ts`

## Objective

Rule on how to carry out one instruction from the repository owner, under this repository's
coding contract, and return a concrete plan a writer can execute.

The instruction: move the functions in `src/server/execution/` into `src/server/helpers.ts`,
make sure they are properly named, and move their tests into
`tests/src/server/helpers.test.ts`.

## Context

Repository `/home/user/process`, the published package `@orkestrel/process` at version 0.0.8.

The coding authority is `/home/user/scaffold/AGENTS.md` and the rule files under
`/home/user/scaffold/.claude/rules/`. Read `AGENTS.md`, then `names.md`, `architecture.md`,
`tests.md`, `documentation.md`, and `quality.md`. They outrank existing code. The owner's
instruction outranks them, and the owner also asked that the contract be followed strictly, so
where the instruction and a rule appear to collide, say so explicitly and rule on the collision
rather than silently picking a side.

### The subject

`src/server/execution/` holds three single-function modules, each exported from the server
barrel `src/server/index.ts:8-10`:

- `execute` — `src/server/execution/execute.ts:60`, `async (command, options?) => Promise<ExecuteResult>`, 224 lines.
- `executeSync` — `src/server/execution/executeSync.ts:43`, `(command, options?) => ExecuteResult`, 95 lines.
- `detach` — `src/server/execution/detach.ts:30`, `(command, options?) => void`, 48 lines.

`src/server/helpers.ts` is 801 lines and exports, in file order: `trimTail`, `trimHead`,
`snapshotCommand`, `formatCommand`, `readPlatformVariable`, `readVariable`,
`mergePlatformEnvironment`, `mergeEnvironment`, `isFile`, `buildExecutableCandidates`,
`resolveExecutable`, `quoteArgument`, `buildPlatformSpawn`, `buildSpawn`, `validateText`,
`validateTimer`, `validateBytes`, `validateEnvironment`, `validateCommand`, `validateWorkspace`,
`isExited`, `killProcess`, `killTree`, `waitForExit`, `waitForClose`, `stopChild`,
`buildExecuteResult`.

### Verified facts

Each was read first-hand from the tree on 2026-08-28. Treat them as established.

1. `src/server/execution` is registered in `FUNCTION_DOMAIN_FOLDERS` at
   `tests/setupPolicy.ts:191-194`, alongside `app/browser/composables`. The current layout is
   therefore legal under the fleet policy sweep; this is not a policy violation being repaired.
2. `tests/setupPolicy.ts` and `tests/policy.test.ts` are scaffold-vendored files. This
   repository's `AGENTS.md` forbids editing them here, and the architecture rule states there is
   no workspace-local registration path. So the canon entry cannot be changed from this
   repository.
3. `src/server/helpers.ts` imports only types, `node:` builtins, `@orkestrel/contract` guards,
   and `createInvalidError`, `PROCESS_PATHEXT`, `PROCESS_TIMER` from `@src/core`. It imports no
   implementation class today.
4. `src/server/execution/execute.ts:12` imports the implementation class `Retention` from
   `../Retention.js` and constructs two instances at lines 99-100. `Retention`
   (`src/server/Retention.ts:14`) is a stateful class with `#delivered` and `#retained` private
   fields, implementing `RetentionInterface`, exported from the barrel at `src/server/index.ts:4`
   and tested at `tests/src/server/Retention.test.ts`. `execute` is its only source consumer.
5. `src/server/execution/executeSync.ts` and `src/server/execution/detach.ts` import no class.
   They import only types, `node:` builtins, `@orkestrel/contract`, `@src/core` values, and
   `../helpers.js`.
6. `src/server/helpers.ts` is imported by `src/server/Process.ts:14` and
   `src/server/Supervisor.ts:25`.
7. The build reproduces the published 0.0.8 tarball byte-for-byte for
   `dist/src/{core,server}/index.{js,cjs,d.ts}`. The distributable is a per-environment bundle,
   not a file-per-module tree.
8. Test files today: `tests/src/server/helpers.test.ts` is 913 lines with one top-level
   `describe` per exported helper, named for the export. The execution tests are
   `execution/execute.test.ts` (277 lines), `execution/executeSync.test.ts` (259 lines), and
   `execution/detach.test.ts` (186 lines).

### The collision to rule on

`.claude/rules/architecture.md` § Kind purity states: "Keep the leaf pair class-free.
`helpers.ts` and `validators.ts` sit at the bottom of a module's graph: they import types,
constants, errors, and each other, and they import no implementation class. Every file that
constructs or drives a class ... sits above them, consumes them, and is never consumed by them
... an edge running downward from a class-importing file into the leaf pair is not [acceptable]."

Moving `execute` into `helpers.ts` as written makes `helpers.ts` import and construct the
`Retention` implementation class, while `Process.ts` and `Supervisor.ts` continue to consume
`helpers.ts`. Rule on this directly.

## Questions

Answer every one. Give a single recommendation per question, not a survey.

1. **Placement.** Where does each of the three functions belong, and what exactly happens to the
   `Retention` edge? If you propose changing how `execute` obtains its retention accounting, say
   precisely what changes, and rule on whether that is inside the owner's instruction or a
   separate change. If you propose accepting the class import, say which rule text permits it.
   If you propose that some of the three move and some do not, justify the split against the
   owner's instruction.
2. **Naming.** Rule on `execute`, `executeSync`, and `detach` as names for module-scope functions
   living in `helpers.ts`, against `.claude/rules/names.md` § Standalone helpers, § Fixed
   lifecycle vocabulary, § Split instead of compounding, and § Rejected naming. For each: keep or
   rename, and if rename, to what. Weigh that these are published exports of a released package,
   and that `.claude/rules/architecture.md` § Kind purity says a rename "moves the published
   surface and earns a version bump; that cost is the correct one to pay". State plainly whether
   the file's established `{verb}{Noun}` convention obliges a rename here.
3. **Ordering.** Where in `helpers.ts` does each function go, and why there.
4. **Tests.** How do the three test files fold into `tests/src/server/helpers.test.ts` — what is
   the resulting structure, what happens to `tests/src/server/execution/`, and what must not be
   lost in the fold.
5. **Atomic consequences.** Everything else that must change in the same commit: the barrel, the
   guide `guides/process.md`, `README.md`, and anything the parity tests read. Name what you know
   and name what you would have to check.
6. **The dead canon entry.** After the folder is gone, `FUNCTION_DOMAIN_FOLDERS` still registers
   `src/server/execution`. Rule on whether that is this change's problem, and what to do about it.

## Scope

Read-only. Propose; do not edit. You own no files.

## Execution

Perform this assignment directly. Spawn nothing.

## Output

For each question: the ruling in one sentence first, then the reasoning, then the exact rule text
you relied on with its file and section. Close with a numbered unit list a writer could execute,
each unit naming its owned files and its acceptance criteria. Flag any claim you could not verify
as unverified.
