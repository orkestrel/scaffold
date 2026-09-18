I'll read the brief first, then gather the evidence it asks for.The brief is a read-only map of the WriteAnchor repair. I'll load the required rules, campaign files, and candidate checkout next.I have the campaign ruling and identity collision. Next I’ll map WriteAnchor in the candidate checkout and capture git status before any reads.Shell was blocked. I’ll inspect git metadata and the candidate sources as read-only files instead.The candidate is a worktree at that commit. Next I’ll read HEAD, Node bigint types, Orkestrel identity/attempt, and remaining callers.The authorized WriteAnchor repair is **not in** `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`. That commit is the capture-recipe unit (`COMMIT_EDITMSG`: “Keep capture preparation inside acceptance journeys”). At that HEAD, `WriteAnchor.device` / `inode` are still `number`, and `readAnchor` still calls default `lstatSync` (no `{ bigint: true }`).

## Declarations

`WriteAnchor` in candidate `src/server/types.ts:188-192`: `{ path: string, device: number, inode: number }`. Remarks at `:184-186`: device and inode locate, they do not date; a later occupant of the same slot can share an anchor.

`WriteDirectoryResult` at `:195-198` carries `anchor: WriteAnchor` and `created: readonly WriteAnchor[]`.

Built copies match: `dist/src/server/index.d.ts:2470-2479` (`dist/` is gitignored, `.gitignore:12`).

## Implementation

`readAnchor` `src/server/helpers.ts:1927-1932`: `attempt(() => lstatSync(path))`; refuse unless directory and not symlink; return `{ path, device: status.value.dev, inode: status.value.ino }`. No `{ bigint: true }`.

`matchesAnchor` `:1959-1961`: re-read `anchor.path` and compare `device` and `inode` with `===`.

Remarks at `:1942-1949`: rename-swap answers `false` because the replacement has its own inode; delete-and-recreate can get the old inode back and answers `true`.

Same default-`lstatSync` identity is copied into `readExpectation` for directory and file shapes (`:1993-2008`). `matchesExpectation` compares those fields (`:2036-2045`). Ruling: keep unrelated transaction behavior outside this repair (`directory-anchor-ruling.md:9`).

`isPhysicalDirectory` uses the same directory/not-symlink gate without recording identity (`:412-415`).

## Callers

`WriteTransaction` (`src/server/WriteTransaction.ts`):

- `#created: Array<string | WriteAnchor>` (`:108`)
- constructor: `readAnchor(directory) === undefined` on private root/stage/backup (`:192`)
- `establish` returns `WriteDirectoryResult` (`:333-348`); remarks say each created segment is captured by device and inode (`:330-331`)
- `#establish` walks ancestors with `readAnchor`, then `matchesAnchor` before each `mkdirSync`, then `readAnchor` on the new segment (`:489-549`)
- `#preflight` `matchesAnchor` on every created anchor (`:555-568`)
- `#recover` uses `created.path` when the slot is a `WriteAnchor`, never `device`/`inode` (`:653-657`)
- ancestor-recreate remarks `:65-70`

No other `src/` caller. Canonical `src/` at the Orchestrator checkout is the same surface (same symbols, same `number` fields). No `app/` consumer.

## Exports

`src/server/index.ts:1-7` re-exports `types.js` and `helpers.js`. Public names: `WriteAnchor`, `WriteDirectoryResult`, `readAnchor`, `matchesAnchor`. Package export `./server` in `package.json:46-54`.

## Guide / parity

`guides/scaffold.md`:

- type row `WriteAnchor` `:327`
- helpers `matchesAnchor` `:411`, `readAnchor` `:421`
- transaction prose `:1864-1866` (binds location, not lifetime; delete-and-recreate in place may not be refused)

No field types, no `bigint`, no numeric example in those rows.

TSDoc example `readAnchor('/tmp/project') // { path: '/tmp/project', device: 1, inode: 2 }` at `helpers.ts:1924`. Parity row in `tests/distribution.test.ts:602`. `matchesAnchor` TSDoc example at `helpers.ts:1956` / `distribution.test.ts:598`.

`tests/guides.test.ts` does not name these symbols (barrel bijection, not field types). `ROADMAP.md` has no WriteAnchor / inode / bigint rows.

## Real filesystem tests

`tests/src/server/helpers.test.ts` `describe('write anchors')` `:2805-2886`, via `createScratch({ prefix: SCRATCH_PREFIX })` (`SCRATCH_PREFIX` `tests/setupServer.ts:431`):

- untouched match `:2806-2816`
- refuse file / absent / symlink `:2818-2827`
- rename-swap uniqueness then `matchesAnchor` false `:2829-2854` — uniqueness assertion `:2840-2842` is the recorded failure (`directory-anchor-failure-map.md:7-16`)
- symlink swap `:2856-2870`
- gone `:2873-2885`

`WriteTransaction.test.ts` `establish` proofs inspect `.path` / `.created` paths only (`:366-405`), not `device`/`inode`. Windows `it.skipIf(process.platform === 'win32')` race at `:293` is a rename-window proof, not identity precision.

`src:server` Vitest project: `vite.config.ts:154-161`. No `fileParallelism: false`.

## Serialization and numeric construction

No repository consumer `JSON.stringify`s a `WriteAnchor` or writes `device`/`inode` to disk.

No production object literal of `WriteAnchor`. Tests never construct `{ device, inode }`. The only numeric literals are the TSDoc example `device: 1, inode: 2` (`helpers.ts:1924`, `distribution.test.ts:602`).

Canonical probe `tmp/probe/anchor-identity.mjs:83` constructs `{ ...anchor, path: missing }` from a live `readAnchor` result (spread, not numeric literals).

`JSON.stringify` of `bigint` throws `TypeError`. A bigint `WriteAnchor` would not survive JSON without a converter. Nothing in-tree does that conversion.

## Adjacent number identity (out of stated repair scope)

`WriteExpectation.device?` / `inode?` are `number` (`types.ts:160-167`). Directory capture test `helpers.test.ts:2914-2926` checks shape / digest / size / `matchesExpectation`, not sibling uniqueness.

`@orkestrel/test` `ScratchIdentity` is also `number` device/inode plus `birth` (`node_modules/@orkestrel/test/dist/src/server/index.d.ts:438-445`). `readIdentity` copies default `Stats` (`index.js:85-90`). Scaffold `src/` does not call `readIdentity` / `matchesIdentity`.

## Declared / installed overlap

| Package | Declared | Installed |
|---|---|---|
| `@orkestrel/contract` | `^0.0.17` (`package.json:97`) | `0.0.17` (`package-lock.json:171-174`) |
| `@orkestrel/test` | `^0.0.18` (`package.json:108`) | `0.0.18` (`package-lock.json:440-443`) |
| `@types/node` | `^26.5.1` (`package.json:109`) | `26.5.1` (`package-lock.json:1637-1640`) |

`engines.node`: `>=22.18.0` (`package.json:118-120`).

Scaffold `src/` does not import `isBigInt`. Contract has no `bigintShape` (integer shapes only). `helpers.ts:37` imports `attempt`, `isNumber`; `isNumber` is used for a byte limit (`:978`), not inodes.

## Node filesystem bigint

Installed `node_modules/@types/node/fs.d.ts`:

- `StatsBase<T>`: `dev: T`, `ino: T` (`:25-34`)
- `Stats extends StatsBase<number>` (`:59`)
- `{ bigint: true }` → numeric fields are `bigint` (`:65-66`)
- `lstatSync(path, { bigint: true, throwIfNoEntry?: true })` → `BigIntStats` (`:1517-1523`)
- `BigIntStats extends StatsBase<bigint>` plus `*Ns` fields (`:4588-4593`)
- `StatOptions.bigint?: boolean` (`:4597-4600`)

## Orkestrel identity and attempt

**Identity** (`@orkestrel/test/server` `0.0.18`):

- `matchesIdentity` compares device, index node, and creation time (`index.d.ts:252-260`; vendored `guides/test.md:713-721`)
- Reason named there: a device is shared on one filesystem; an inode is reused after removal; birth repeats within timestamp resolution
- `readIdentity(status: Stats)` (`:313`) — default number `Stats`, not `BigIntStats`
- `WriteAnchor` has no `birth`

**Attempt** (`@orkestrel/contract` `0.0.17` `index.d.ts`):

- `attempt<T>(callback: () => T): Result<T>` (`:205`)
- `Result<T, E = unknown> = Success<T> | Failure<E>` (`:5519`)
- `Success`: `{ success: true, value: T }` (`:6330-6333`)
- `Failure`: `{ success: false, error: E }` (`:1700-1703`)
- Remarks `:184-187`: return or thrown value retained exactly; never inspected, coerced, cloned, frozen, or mutated; a returned Promise is an ordinary success; later settlement is outside this synchronous boundary
- `isBigInt(value: unknown): value is bigint` (`:2499-2510`); example `isBigInt(1n) // true`, `isBigInt(1) // false`

`readAnchor` wraps `lstatSync` in `attempt`, so `status.value` is default `Stats` (`number` `dev`/`ino`).

## Collision already measured

Canonical `tmp/probe/anchor-identity-result.json` on `win32` Node `v24.20.0`: at iteration 55, numeric `device` `782266666` and `inode` `54324670505422940` matched for live siblings; bigint inodes were `"54324670505422941"` vs `"54324670505422943"`; built `matchesAnchor` returned `true` after rename (`:166-261`). Ruling: `directory-anchor-ruling.md:1-9`. Probe also flagged every sampled pair as `Number.isSafeInteger` unsafe (`anchor-identity.mjs:40-46`; result `unsafeCount` 56).

## Minimal validation commands (not run)

From candidate `package.json` scripts, scoped to this surface:

- `npm run check:src:server`
- `npm run test:src:server -- -t "write anchors"`
- after a TSDoc / example change: `npm run test:guides` and `npm run test:distribution`
- a rebuilt `dist` is required before another pack (`dist/` gitignored; `build:src:server` then pack)

Full acceptance chain remains `prepublishOnly` (`package.json:93`). This mapping ran none of them.

## Git status

Worktree `tmp/release/scaffold-0.0.75` → `gitdir: C:/Users/mikes/WebstormProjects/scaffold/.git/worktrees/scaffold-0.0.75`.

Before and after this mapping, `HEAD` is `ref: refs/heads/recovery/scaffold-0.0.75` and that ref is `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`. `ORIG_HEAD` is `178c7cbb`. No source edits. Porcelain `git status` was not obtained: the read-only shell call was rejected, so a dirty/untracked listing is unresolved.

## Search population

Candidate: `WriteAnchor|readAnchor|matchesAnchor`; `bigint: true`; `lstatSync` / `stats.ino` / `stats.dev`; `inode:` / `device:`; `JSON.stringify` / `toJSON` / serialize; `isBigInt` / `bigintShape`. Installed `@types/node/fs.d.ts`, `@orkestrel/test` `ScratchIdentity`/`readIdentity`/`matchesIdentity`, `@orkestrel/contract` `attempt`/`Result`/`isBigInt`. Canonical: `directory-anchor-failure-map.md`, `directory-anchor-ruling.md`, `tmp/probe/anchor-identity-result.json`, `tmp/probe/anchor-identity.mjs`. Workspace-root `src/` and `tests/` for the same symbols. Secrets paths excluded.

## Unresolved

- Candidate porcelain git status (shell rejected).
- Whether any consumer **outside this repository** serializes `WriteAnchor` (in-tree: none).
- Whether `WriteExpectation`’s number `device`/`inode` must move with `WriteAnchor`; current ruling keeps that transaction snapshot outside the repair, and the two call `lstatSync` independently.