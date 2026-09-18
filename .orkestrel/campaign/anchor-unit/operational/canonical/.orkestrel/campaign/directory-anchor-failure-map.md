I'll read the brief first, then gather the evidence it asks for.I'm the Grok executor: read-only evidence only. Next I'll load the named rules, the failing test, and the release log.The failing test is located. Next I’ll map `readAnchor`/`matchesAnchor`, the release log, and prior Windows/anchor evidence.The log isn’t at the workspace root. I’ll read the anchor implementation next and look inside the frozen release checkout.The stack points at the pre-rename identity check, not the post-swap `matchesAnchor` assertion. I’ll read the log, the replay files, and how Windows reports `ino`.The uniqueness control failed, not the post-swap `matchesAnchor` check. Two live sibling directories compared equal on `device` and `inode` before any rename. The stack is `tests/src/server/helpers.test.ts:2842`.

## Failure

`npm.cmd run prepublishOnly` in `tmp/release/scaffold-0.0.75` exited `1` after `test:src:core` passed (426 tests). `test:src:server` then failed:

```text
FAIL  |src:server| tests/src/server/helpers.test.ts > write anchors > reports a directory swapped in by rename
AssertionError: expected true to be false // Object.is equality
- false
+ true
 ❯ tests/src/server/helpers.test.ts:2842:6
```

Source: `tmp/release/scaffold-0.0.75/tmp/units/scaffold-vue-release-gates.log.txt:116-151`. Same excerpt in `scaffold-vue-release-verifier-report.md:22-31`. Chain stopped there; later projects did not run.

The assertion that failed is the pre-rename identity control, not `expect(matchesAnchor(anchor)).toBe(false)` at `:2850`. The rename steps were not reached.

## Test sequence

Case: `tests/src/server/helpers.test.ts:2829-2853` (frozen checkout identical).

1. `createScratch({ prefix: SCRATCH_PREFIX })` with `SCRATCH_PREFIX = 'orkestrel-scaffold-'` (`tests/setupServer.ts:431`).
2. `target = workspace.ensure('project')` then `anchor = readAnchor(target)`.
3. `replacement = workspace.ensure('replacement')` then `replacementAnchor = readAnchor(replacement)`.
4. **Failing line:** `replacementAnchor.device === anchor.device && replacementAnchor.inode === anchor.inode` must be `false`.
5. Comment at `:2843-2847`, then `renameSync(target, …/retired)` then `renameSync(replacement, target)`.
6. `matchesAnchor(anchor)` must be `false`.
7. `workspace.destroy()` in `finally`.

`ensure` creates with `mkdirSync(candidate, { recursive: true })` and returns the lexical path (`node_modules/@orkestrel/test` `0.0.18` `dist/src/server/index.js:838-844`). Release checkout pins `@orkestrel/test@^0.0.18`.

## Failed comparison

| Operand | Origin |
|---|---|
| `anchor.device` / `anchor.inode` | `readAnchor(target)` → `lstatSync(path)` → `{ path, device: stats.dev, inode: stats.ino }` (`src/server/helpers.ts:1927-1932`) |
| `replacementAnchor.device` / `replacementAnchor.inode` | same helper on the `replacement` path |
| Expected | `false` (live siblings must not share identity) |
| Received | `true` |

`WriteAnchor` is `{ path, device, inode }` with `device` and `inode` typed `number` (`src/server/types.ts:188-192`). `readAnchor` does not pass `{ bigint: true }`. `matchesAnchor` re-reads `anchor.path` and compares `device` and `inode` (`helpers.ts:1959-1961`).

The log does not print the numeric `dev`/`ino` values.

## Dependencies

- Types: `src/server/types.ts:188-192`; `WriteDirectoryResult` at `:195-198`.
- Implementation: `src/server/helpers.ts:1927-1961`. Same `lstatSync` + directory + not-symlink gate as `isPhysicalDirectory` (`:412-415`).
- Production consumer: `WriteTransaction.#establish` / `#preflight` (`src/server/WriteTransaction.ts:489-568`, remarks `:65-70`, `:330-331`).
- Barrel: `src/server/index.ts` re-exports helpers and types.
- Fixture: `@orkestrel/test/server` `createScratch` / `ensure`; prefix from `tests/setupServer.ts`.
- Host APIs in the case: `node:fs` `renameSync`, `lstatSync` (via `readAnchor`).
- Sibling cases in the same `describe`: untouched match (`:2806`), refuse file/absent/symlink (`:2818`), symlink swap (`:2856`), gone (`:2873`).
- `src:server` Vitest project: `vite.config.ts:154-161`. No `fileParallelism: false` on that project (that flag is on `distribution` and `probe` only).

Vue-owned tracked files named by the red verifier (`guides/scaffold.md`, `host.json`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/templates.test.ts`) do not include this test. Prepare commit `dc98373d` touched `package.json` / lockfile / CLI and core fixtures only.

## Recorded runs (Windows, same frozen checkout)

| When | Command | This case |
|---|---|---|
| 10:15:10, before Vue change | full `prepublishOnly` (`scaffold-0.0.75-preparation-gates.log.txt:121-130`) | passed (`466 passed`, `7 skipped`) |
| 11:10:08, after Vue change | full `prepublishOnly` (`scaffold-vue-release-gates.log.txt:121-153`) | failed at `:2842` |
| 11:11:30 | `test:src:server -- -t 'reports a directory swapped in by rename'` (`directory-anchor-replay.log.txt:14-17`) | passed |
| 11:11:47 | full `test:src:server` (`directory-anchor-project-replay.log.txt:14-17`) | passed (`466 passed`, `7 skipped`) |

## Declared behavior (local)

- `WriteAnchor` remarks: device and inode locate, they do not date; a later occupant of the same slot can share an anchor (`types.ts:184-186`).
- `matchesAnchor` remarks: a rename-swapped directory answers `false` because the replacement has its own inode; delete-and-recreate can get the old inode back and answers `true` (`helpers.ts:1942-1949`).
- `WriteTransaction` remarks: deleted-and-recreated ancestor can get the old inode back (`WriteTransaction.ts:65-70`).
- Guide: the transaction binds location, not lifetime; delete-and-recreate in place may not be refused (`guides/scaffold.md:1859-1861`).
- Test comment: Windows refuses rename onto an existing directory; holding the original allocated also stops ext4 inode reissue (`helpers.test.ts:2843-2847`).
- `@orkestrel/test` `0.0.18` `ScratchIdentity` is `{ device, inode, birth }`. `matchesIdentity` compares all three because a device is shared on one filesystem, an inode is reused after removal, and birth repeats within timestamp resolution (`guides/test.md:713-717`; installed `index.d.ts:253-260`). `WriteAnchor` has no `birth`.
- `node:fs` `Stats.ino` / `dev` default to `number`; `{ bigint: true }` yields `bigint` (`node_modules/@types/node/fs.d.ts:65-66`, `:33-34`). `engines.node` is `>=22.18.0`.
- Portability: path operands must share one normalizer before compare (`.claude/rules/portability.md` Paths). This case compares `dev`/`ino`, not paths.
- Tests: probe host-varying filesystem identity on the running host (`.claude/rules/tests.md` Test contract).
- Windows rename measurement already in-tree: `tests/src/server/WriteTransaction.test.ts:260-293` records 2026-08-21, Windows 11, Node v24.18.1, NTFS; `renameSync` is `MoveFileExW` with `MOVEFILE_REPLACE_EXISTING`, documented to reject an existing directory destination; that race case is `it.skipIf(process.platform === 'win32')`.

## Prior commits

- `b42c4ebf` (2026-08-11) *Say what the write anchor actually proves.* Delete-and-recreate handed the inode back, measured twelve times out of twelve. The case was rewritten to allocate `replacement` while `project` is live and to assert distinct `device`/`inode` first. At that commit the swap was `renameSync(replacement, target)` onto the still-present target.
- `928c46a8` (2026-08-12) *Carry the executable bit…* Added the aside-rename. Commit message: Windows has no directory-replacing rename; libuv `MoveFileExW` + `MOVEFILE_REPLACE_EXISTING` rejects a directory destination; moving aside also keeps the inode allocated so ext4 cannot reissue it.
- `26e02a94` (2026-08-12) Windows race skip: `MoveFileExW` leftover-`holding` wedge, not an undocumented impossibility.
- `d038bdc8` (2026-08-11) introduced `readAnchor`.
- `dc98373d` (2026-09-18 10:19) prepare `0.0.75`; does not touch this test. Live workspace HEAD remains `178c7cbb`.

## Campaign

Canonical `.orkestrel/campaign` has no `WriteAnchor` / `readAnchor` / `matchesAnchor` / inode-swap records. Hits on “anchor” there are Vue/journey accessible names, a different word.

## Unknowns that need a host replay

These values were never printed:

- Numeric `dev`, `ino`, and `birthtimeMs` for `project` and `replacement` at the uniqueness assertion.
- Whether `lstatSync`, `statSync`, and `{ bigint: true }` disagree on those paths.
- Whether the equal `number` identity is `ino === 0`, truncation past `Number.MAX_SAFE_INTEGER`, or a true NTFS file-id collision.
- Whether `birthtimeMs` differs when `device`/`inode` compare equal (`ScratchIdentity` would split them; `WriteAnchor` would not).
- Whether a full `prepublishOnly` rerun on this checkout reproduces. Isolated and project-only replays already passed. No flakiness ruling from that.

## Git status

Unchanged by this mapping. Orchestrator checkout still `178c7cbb`, dirty `.codex/config.toml` and `.orkestrel/campaign/rebaseline-2.md`, same untracked campaign files. No source edits.