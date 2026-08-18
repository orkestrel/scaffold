# Unit: a vendored file may not import an `@orkestrel/*` package

## Role and engine

`implementer` on **GPT-5.6 Sol**. Constraint-heavy, mechanical-precision work with one rule-text edit.

## Objective

The vendored `tests/config.test.ts` imports `@orkestrel/test/server`. That import cannot resolve in
one of its own propagation targets. Remove the import, keep the behaviour, state the law, and prove
it mechanically so the next campaign cannot reintroduce it.

## The defect, measured

`HOST_PATHS` (`src/core/constants.ts:135-166`) vendors 32 paths byte-identically into every target.
`tests/config.test.ts` is one of them, and line 18 reads:

```ts
import { createScratch } from '@orkestrel/test/server'
```

Every target except one declares `@orkestrel/test` as a devDependency, so the import resolves there.
The exception is `/workspace/test` — the repository that **publishes** `@orkestrel/test`. It cannot
declare itself, and the self-reference its `exports` map would allow resolves to
`./dist/src/server/index.d.ts`, which does not exist: `check` runs before `build` in the gate order,
so no built `dist/` is ever present when TypeScript resolves it.

Reproduce it exactly:

```
$ cd /workspace/test && npm run check
tests/config.test.ts(18,31): error TS2307: Cannot find module '@orkestrel/test/server' or its corresponding type declarations.
```

A scan of all 32 vendored paths found this one import and no other. Confirm that scan yourself
before you start; it is the unit's scope boundary.

## The general law this instance proves

A vendored file is byte-identical in every target, and **every `@orkestrel` package is itself a
target**. So a vendored file that imports `@orkestrel/<x>` is broken in the repository that publishes
`@orkestrel/<x>`. `.claude/rules/workspace.md` already states this principle for `configs/helpers.ts`
and `configs/policy.ts`. It does not state it for the vendored test files, which is why this landed.

## What to do

1. **Give the vendored test infrastructure its own scratch factory.** `tests/setupPolicy.ts` is
   vendored, is already the shared infrastructure module these vendored proofs import from
   (`tests/config.test.ts` imports `inspectPolicyConfiguration` from `./setupPolicy.js`), and already
   imports `mkdtempSync`, `mkdirSync`, `rmSync`, `writeFileSync` from `node:fs`, `tmpdir` from
   `node:os`, and `join`/`dirname` from `node:path`. Everything needed is in scope.

   `tests/config.test.ts` uses exactly three members: `path`, `write(target, text)`, and `destroy()`.
   Implement those three and no more. Keep the containment behaviour: `write` must refuse a target
   that escapes the scratch root, and `destroy` must remove the directory recursively.

   `.claude/rules/tests.md` fixes the naming and the placement: the interface belongs with the
   helper's exports in the setup file, and a factory is `create{Entity}`.

2. **Reroute the import.** `tests/config.test.ts` imports the factory from `./setupPolicy.js`. Delete
   the `@orkestrel/test/server` import. Change nothing else about how the four scratch call sites
   (lines ~567, ~685, ~708, ~746) behave.

3. **State the law.** Add it to `.claude/rules/workspace.md`, in the `Configuration authority`
   section beside the existing `configs/helpers.ts` and `configs/policy.ts` clauses, or in a place
   you judge better within that file. It must say: a vendored file imports nothing that fails to
   resolve in any target, and specifically imports no `@orkestrel/*` package, because every such
   package is itself a target and cannot depend on itself.

   `.claude/rules/tests.md` tells tests to import shared helpers from `@orkestrel/test` rather than
   reimplementing them. That rule now has an exception this unit creates. Record the exception where
   a reader meets it — one clause, naming the vendored set as the exception and pointing at the law
   in `workspace.md`. Do not restate the law in both files.

   Write both edits in the instruction-file voice `AGENTS.md` mandates: every line a directive,
   observable trigger plus required action, no rationale written to persuade, no history of how this
   was found. That history belongs in the commit message, which the Orchestrator writes.

4. **Prove it mechanically.** Add one test that reads every path in `HOST_PATHS` off disk and asserts
   that no vendored `.ts`, `.js`, or `.json` file imports an `@orkestrel/*` specifier.
   `tests/src/server/helpers.test.ts` already imports `HOST_PATHS` and runs in Node with real
   filesystem access; put it there unless you find a better home in the same project.

   The test must fail for the defect it claims to catch. Prove that: reintroduce the
   `@orkestrel/test/server` import in `tests/config.test.ts`, run the test, record it red with its
   count, restore, and record it green. Report both counts and the exact command. A test that never
   ran red does not bind to this defect.

   Assert membership, not a total. The population is `HOST_PATHS` filtered to existing files with
   those extensions; assert that filtered population is non-empty before asserting the property over
   it, so an empty glob cannot pass vacuously.

## Standing conditions — known, do not report these as deviations

- **The tree is dirty.** `/home/user/scaffold` carries uncommitted campaign work and a `tmp/`
  directory full of briefs, journals, and fleet logs. `git status` is noisy. Leave all of it alone.
- **`tmp/` and `.orkestrel/` are excluded from formatting** by `.prettierignore`. Do not add files
  there.
- The three files you edit in step 1-3 are themselves vendored, so this change moves `dist/host`.
  That is intended and the Orchestrator owns the resulting version bump. Do not edit `package.json`,
  do not bump a version, and do not run `npm run build`.

## Scope

**Owned files** — you may edit only these:

- `tests/setupPolicy.ts`
- `tests/config.test.ts`
- `.claude/rules/workspace.md`
- `.claude/rules/tests.md` (the one exception clause only)
- `tests/src/server/helpers.test.ts` (or another test file in the `src:server` project, if you place
  the guard elsewhere — say which and why)

**Off-limits:**

- `src/**` — no source change is in scope. If you believe one is needed, stop and report.
- `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`
- `tests/src/core/compilers.test.ts` — carries a byte-stability digest pin
- `tests/src/core/Compiler.test.ts` — carries artifact-count pins (47 total, 32 host-origin). This
  change adds no `HOST_PATHS` row, so those counts must not move. If they do, you changed something
  you should not have: stop and report.
- `AGENTS.md`, `.claude/rules/*` other than the two named above, `.agents/**`, `configs/**`

**Permissions.** Do not commit, push, tag, publish, install a dependency, or run a destructive
command. Do not run `npm run build`. Scope any formatting to your owned files.

## Execution

Perform this assignment directly. Spawn nothing.

## Governing law

Read before editing: `AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
`.claude/rules/architecture.md`, `.claude/rules/typescript.md`, and `.claude/rules/names.md`. No
skill is named for this unit.

## Unknowns

- Whether `tests/setupPolicy.ts`'s existing exports already include a temp-directory mechanism you
  should extend rather than add beside. Read the file first; the Orchestrator checked its imports,
  not its full export list.
- Whether the `src:server` project is the right home for the `HOST_PATHS` guard. `tests/setup.ts`
  and `tests/setupServer.ts` both reference `HOST_PATHS`; pick from evidence and say which you chose.

## Acceptance criteria

Each closes using owned files alone.

1. `grep -rn "@orkestrel/" tests/config.test.ts tests/setupPolicy.ts` returns no `from '@orkestrel/…'`
   import.
2. The new guard test passes, and the red/green pair from step 4 is recorded with counts and command.
3. `npx vitest run --project config` passes. Record the count.
4. `npx vitest run --project src:server` passes. Record the count.
5. `npm run check` exits 0.
6. `npx oxlint --config .oxlintrc.json --deny-warnings tests/ .claude/` reports zero errors.
7. `npx prettier --check` on your owned files passes.

## Output

Return, and nothing else:

- The vendored-import scan result: which of the 32 paths you checked, and what you found.
- The scratch factory's final exported signature.
- The exact text you added to each of the two rule files.
- The red/green counts and command for the guard test.
- Exit status and count for each acceptance command.

No process diary.

## Deviation contract

Stop and report if the fix cannot be made without a `src/**` change, if the artifact-count pins move,
or if `tests/setupPolicy.ts` cannot host the factory without breaking a rule. Report expected, found,
exact evidence, done or not done, and at most one hypothesis. Do not redesign.

Where a clause sits within a rule file, how a TSDoc sentence is worded, and which of the two setup
files hosts the guard are yours to decide. Decide them and carry on.
