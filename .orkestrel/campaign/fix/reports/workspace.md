# Fix report: workspace

## Dispositions

- **s17-29** applied (src/core/validators.ts, src/core/helpers.ts, src/core/index.ts, src/core/workspaces/stores/DatabaseWorkspaceStore.ts, tests/src/core/validators.test.ts, tests/src/core/helpers.test.ts, guides/workspace.md): Re-verified: the two total guards still sat in helpers.ts and no validators.ts existed. Created src/core/validators.ts holding isFile and isWorkspaceSnapshot verbatim, added export * from './validators.js' to index.ts after the helpers line, repointed DatabaseWorkspaceStore's import to '../../validators.js', and dropped the now-unused @orkestrel/contract import plus the FileInterface and WorkspaceSnapshot type imports from helpers.ts. Moved the 'persistence guards' describe block from tests/src/core/helpers.test.ts to a mirrored tests/src/core/validators.test.ts so the test tree still mirrors src (tests.md § Test contract). Guide: removed the two rows from the Helpers table and added a '### Validators' section under ## Surface, between Helpers and Factories. Barrel keeps both names reachable, so no published export moved.
- **s17-31** deferred_breaking: Re-verified: FileContent's binary arm still names its member 'data' at src/core/types.ts:11. Renaming it is a rename of a published interface member on an exported union type, which the breaking test defers whole — every consumer reading content.data breaks, and no part of the repair stands on its own without the rename. Nothing applied.
- **s17-32** deferred_breaking: Re-verified: decodedSize is still declared in src/core/helpers.ts and star-exported through src/core/index.ts. Renaming it to computeDecodedSize renames an exported symbol, which the breaking test defers. The guide row and the internal call site cannot be corrected without the rename, so the finding defers whole. Nothing applied.
- **s17-34** applied (src/core/workspaces/Workspace.ts): Re-verified: `?? ''` was present at the move, write, prepend, and append implementation signatures. Applied the lanes' unanimous move repair — `if (to === undefined) return false` in the public implementation body, before delegating to #move, because #move's own `to` parameter is not optional. For write, prepend, and append the lanes conflict on mechanism (early return versus a thrown WorkspaceError); applied what they share, refusing explicitly instead of defaulting to '', in the early-return form. See deviations. Published surface unchanged: no overload permits omitting `to` or `content` with a string path, so the removed filler was unreachable through the declared types and I added no test for a branch the type contract forbids reaching.
- **s17-37** applied (src/core/workspaces/Workspace.ts, src/core/workspaces/WorkspaceManager.ts, tests/src/core/workspaces/Workspace.test.ts, tests/src/core/workspaces/WorkspaceManager.test.ts, guides/workspace.md): Applied under the user's 2026-08-28 ruling that patterns.md § Batch operations wins. Conformed all four sites together: Workspace.has(paths) now uses every() instead of some(); Workspace.move(mapping), Workspace.remove(paths), and WorkspaceManager.remove(ids) apply to every entry and return true only when all succeeded (flag ANDed without short-circuit, so a partial batch still applies what it can). Read the rule's 'An id list applies to those items and returns true only when all succeed' as apply-all plus conjunction rather than template's stronger pre-check atomicity, because the rule text states the return contract and explicitly says the list applies to those items. Rewrote guides/workspace.md: the WorkspaceInterface has/move/remove rows, the WorkspaceManagerInterface remove row, the has fence, the remove fence, the manager remove fence, and the 'remove mirrors that leniency' paragraph, which now names has(paths), move(mapping), and remove(paths) and states the all-succeed contract. Updated the pinning tests: the Workspace has, move-batch, and remove-batch cases; the WorkspaceManager remove(ids[]) case, split so one asserts the all-present true and a new one asserts false for an absent id while the registered ones still drop.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2807ms on 49 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no diagnostics)
- npm run build: pass — 12 modules transformed. dist/src/core/index.js 24.80 kB | gzip: 6.42 kB; dist/src/core/index.cjs 26.23 kB. built in 2.36s
- npm test: pass — src:core 7 files / 136 tests passed; policy 1 file / 111 passed; config 1 file / 46 passed; setup 1 file / 12 passed; guides 1 file / 28 passed

## Diffstat

```text
 guides/workspace.md                                | 85 ++++++++++++----------
 src/core/helpers.ts                                | 50 +------------
 src/core/index.ts                                  |  1 +
 src/core/workspaces/Workspace.ts                   | 25 ++++---
 src/core/workspaces/WorkspaceManager.ts            |  4 +-
 .../workspaces/stores/DatabaseWorkspaceStore.ts    |  2 +-
 tests/src/core/helpers.test.ts                     | 66 -----------------
 tests/src/core/workspaces/Workspace.test.ts        | 27 +++++--
 tests/src/core/workspaces/WorkspaceManager.test.ts | 14 +++-
 9 files changed, 100 insertions(+), 174 deletions(-)

Untracked (not counted by git diff --stat): src/core/validators.ts (42 lines), tests/src/core/validators.test.ts (71 lines).
```

- dist moves: true

## Deviations

Lane conflict on s17-34, resolved and recorded rather than escalated mid-unit. The two lane corrections agree verbatim on move (`if (to === undefined) return false`) and conflict on write/prepend/append: Lane DRIFT names "an early return", Lane DRIFT-RESHAPE names throwing the existing WorkspaceError. They share the substance — refuse explicitly instead of defaulting to ''. I applied the shared substance in the early-return form for these reasons: WorkspaceErrorCode's members ('MODALITY', 'PATTERN', 'RANGE') do not cover an absent argument, so the throw variant would require adding a union member to a published type and would turn an unreachable branch into a new observable refusal; the early return keeps the change invisible to every consumer honoring the declared overloads. If the campaign prefers the throwing form, it is a successor unit that also carries the new error code and its guide row.

Baseline recorded before any edit: the full chain (format:check, lint:check, check, build, test) was green on d2bb203, so no gate result here is pre-existing.

Scope note on s17-29: the repair moved source, and I also moved the two guards' dedicated test block into a mirrored tests/src/core/validators.test.ts. tests.md § Test contract fixes the mirror, and leaving guard tests in helpers.test.ts would have left the new module unmirrored. The isWorkspaceSnapshot read-boundary block in tests/src/core/workspaces/stores/MemoryWorkspaceStore.test.ts was left alone: it drives the guard through the store scenario that owns it, and moving it is outside this repair.

No off-limits file appears in git status. The tree is uncommitted and unstaged.
