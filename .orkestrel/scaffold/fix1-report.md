# Scaffold readiness fix unit report

## Outcome

SR13 now exposes direct construction for `Compiler`, `Materializer`, and `Upstream`. The pass-through factory exports and their factory-only test are gone. Source, CLI, guide, package examples, declaration controls, and generated-consumer fixtures construct the classes directly.

SR14 now requires the plan that owns the deletion decision. `Materializer.remove` re-derives the target from that plan, compares the derived foreign candidates with the supplied audit, and enters the deletion transaction only after the comparison and existing repository preconditions pass.

## What changed

- [src/core/factories.ts:44](/home/user/scaffold/src/core/factories.ts:44) retains `createBlueprint` and removes `createCompiler`.
- [src/server/index.ts:1](/home/user/scaffold/src/server/index.ts:1) no longer exports the deleted `src/server/factories.ts` module. `src/server/factories.ts` and `tests/src/server/factories.test.ts` were deleted.
- [src/core/Compiler.ts:74](/home/user/scaffold/src/core/Compiler.ts:74), [src/core/compilers.ts:1469](/home/user/scaffold/src/core/compilers.ts:1469), [README.md:88](/home/user/scaffold/README.md:88), and [guides/scaffold.md:668](/home/user/scaffold/guides/scaffold.md:668) use direct `Compiler` construction in public examples and TSDoc.
- [README.md:108](/home/user/scaffold/README.md:108) and [guides/scaffold.md:972](/home/user/scaffold/guides/scaffold.md:972) use direct `Materializer` construction. [guides/scaffold.md:239](/home/user/scaffold/guides/scaffold.md:239) lists only the substantive blueprint factory, and [guides/scaffold.md:355](/home/user/scaffold/guides/scaffold.md:355) documents the server classes.
- [tests/guides.test.ts:178](/home/user/scaffold/tests/guides.test.ts:178), [tests/distribution.test.ts:599](/home/user/scaffold/tests/distribution.test.ts:599), [tests/src/core/Compiler.test.ts:6](/home/user/scaffold/tests/src/core/Compiler.test.ts:6), [tests/src/core/templates.test.ts:445](/home/user/scaffold/tests/src/core/templates.test.ts:445), and [tests/src/core/validators.test.ts:151](/home/user/scaffold/tests/src/core/validators.test.ts:151) exercise direct construction. The distribution fixture imports and constructs the shipped classes as a consumer does.
- [src/server/types.ts:234](/home/user/scaffold/src/server/types.ts:234) adds `plan` to the public removal contract. [src/bin/CLI.ts:353](/home/user/scaffold/src/bin/CLI.ts:353) supplies the compiled plan.
- [src/server/Materializer.ts:400](/home/user/scaffold/src/server/Materializer.ts:400) validates the plan, audit, repository, and target; refuses dirty state; and invokes the shared derivation before choosing removals. [src/server/Materializer.ts:753](/home/user/scaffold/src/server/Materializer.ts:753) compares exact candidate membership, group, and observed bytes before the transaction.
- [tests/src/server/Materializer.test.ts:997](/home/user/scaffold/tests/src/server/Materializer.test.ts:997) proves that a fabricated foreign finding for a plan-owned file is refused and the file remains. Existing removal cases now obtain their candidate audits from the real materializer derivation.
- [guides/scaffold.md:388](/home/user/scaffold/guides/scaffold.md:388) states that removal re-derives the tracked files the plan does not own.

## SR13 consumer sweep

The prescribed sweep searched `src/`, `tests/`, `guides/`, `README.md`, and `bin/`:

```text
rg -n "createCompiler|createMaterializer|createUpstream" src/ tests/ guides/ README.md bin/ 2>/dev/null
```

The initial exact-factory consumers were in `README.md`, `guides/scaffold.md`, `src/bin/CLI.ts`, `src/core/Compiler.ts`, `src/core/compilers.ts`, `src/core/factories.ts`, `src/server/factories.ts`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/src/core/Compiler.test.ts`, `tests/src/core/templates.test.ts`, `tests/src/core/validators.test.ts`, and `tests/src/server/factories.test.ts`. The core and server environment barrels were checked for re-exports. Every exact-factory consumer now uses the corresponding constructor, and the deleted factories have no barrel export.

The literal prescribed pattern still reports `createUpstreamServer` in `tests/setupServer.ts`, `tests/src/server/Upstream.test.ts`, and `tests/src/bin/CLI.test.ts`. That symbol is a protocol-faithful fixture-server helper, not the removed pass-through `createUpstream` factory. The exact-symbol acceptance sweep is clean:

```text
rg -n "\b(createCompiler|createMaterializer|createUpstream)\b" src/ tests/ guides/ README.md bin/ 2>/dev/null
```

Result: exit `1` with no matches, which is ripgrep's no-match result.

The same exact-symbol sweep over `dist/src/` is clean. Built declarations expose `Compiler`, `Materializer`, and `Upstream` as classes.

## SR14 contract and derivation comparison

The landed signature is:

```ts
remove(plan: Plan, audit: Audit, repository: Repository, target: string): MaterializeResult
```

`audit`, `repair`, and `remove` use the existing `#derive(plan, target)` path. Removal filters foreign findings from the fresh derivation and the supplied preview. It rejects repeated paths, a supplied path absent from the derivation, a group mismatch, an observed-byte mismatch, or a derived candidate absent from the preview. It then selects removals from the fresh derived findings rather than trusting the preview.

The tracked-path and protected-path filters remain in place. Dirty repository state still refuses the whole call before derivation. Each selected file receives a digest-bearing precondition before `#purge` opens its transaction, which preserves the moved-byte refusal and rollback behavior.

## Red and green proof

Red command, run against the prior removal implementation with the new regression present:

```text
npm run test:src:server -- tests/src/server/Materializer.test.ts -t "refuses a fabricated foreign verdict for a path the plan owns"
```

Result: exit `1`. Vitest reported `expected undefined to be 'TARGET'`, with `Test Files 1 failed` and `Tests 1 failed | 36 skipped`. The old implementation accepted the fabricated audit and returned after deleting the plan-owned file.

Green command, run after the contract and derivation comparison landed:

```text
npm run test:src:server -- tests/src/server/Materializer.test.ts -t "refuses a fabricated foreign verdict for a path the plan owns"
```

Result: exit `0`. Vitest reported `Test Files 1 passed` and `Tests 1 passed | 36 skipped`.

## Verification

The acceptance gates passed:

```text
npm run lint:check
exit 0

npm run check
exit 0

npm run format:check
exit 0

npm run build
exit 0
```

The scoped behavior and contract runs passed:

```text
npm run test:src:server -- tests/src/server/Materializer.test.ts
exit 0; Test Files 1 passed; Tests 37 passed

npm run test:src:core -- tests/src/core/Compiler.test.ts tests/src/core/validators.test.ts
exit 0; Test Files 2 passed; Tests 89 passed

npm run test:guides
exit 0; Test Files 1 passed; Tests 10 passed

npm run test:policy
exit 0; Test Files 1 passed; Tests 86 passed

npm run test:src:server -- tests/src/server/Upstream.test.ts -t "Upstream construction"
exit 0; Test Files 1 passed; Tests 4 passed | 31 skipped

npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "writes every planned path into a vacant target and reports what it wrote"
exit 0; Test Files 1 passed; Tests 1 passed | 102 skipped

npm run test:distribution -- -t "stages exactly the declared vendored host inventory"
exit 0; Test Files 1 passed; Tests 1 passed | 3 skipped
```

`git diff --check` produced no output. The changed-file encoding scan for `�`, `Ã`, or `Â` produced no output.

The broader test commands reached sandbox limits in nested child processes and loopback listeners:

```text
npm run test:src:core
exit 1; 310 passed; nested spawnSync /opt/node22/bin/node failed with EPERM

npm run test:src:server
exit 1; 324 passed; loopback listen failed with EPERM and nested spawnSync git failed with EPERM

npm run test:src:bin
exit 1; 153 passed; loopback listen failed with EPERM, nested git reported "not a git repository", and a nested child-pipe case returned empty output

npm test
exit 1; stopped in the core project after 310 passed because nested spawnSync /opt/node22/bin/node failed with EPERM

npm run test:distribution
exit 1; elapsed 122.46s; a shipped-declaration child returned null status and a built-compiler child returned empty stdout
```

The focused cases that cover the changed constructors, generated consumer, CLI call, guide parity, removal contract, and removal behavior passed outside those denied operations.

## Flagged own claim

The brief's literal SR13 sweep is not an exact-symbol assertion. It also matches `createUpstreamServer`. This is a verified acceptance-pattern mismatch, not an inference. I did not rename or remove the fixture helper because it owns real loopback server behavior and is outside the accepted factory-removal scope.

## Worktree

`git status --short`:

```text
 M README.md
 M guides/scaffold.md
 M src/bin/CLI.ts
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/factories.ts
 M src/server/Materializer.ts
 D src/server/factories.ts
 M src/server/index.ts
 M src/server/types.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/templates.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/Materializer.test.ts
 D tests/src/server/factories.test.ts
```

## Diffstat

```text
 README.md                             |  10 +--
 guides/scaffold.md                    |  36 ++++-----
 src/bin/CLI.ts                        |  34 +++++----
 src/core/Compiler.ts                  |  14 ++--
 src/core/compilers.ts                 |   8 +-
 src/core/factories.ts                 |  23 +-----
 src/server/Materializer.ts            |  71 ++++++++++++++----
 src/server/factories.ts               |  51 -------------
 src/server/index.ts                   |   1 -
 src/server/types.ts                   |   3 +-
 tests/distribution.test.ts            |  18 ++---
 tests/guides.test.ts                  |   4 +-
 tests/src/core/Compiler.test.ts       |  12 +--
 tests/src/core/templates.test.ts      |   4 +-
 tests/src/core/validators.test.ts     |   4 +-
 tests/src/server/Materializer.test.ts | 134 ++++++++++++++++++++++------------
 tests/src/server/factories.test.ts    |  63 ----------------
 17 files changed, 214 insertions(+), 276 deletions(-)
```
