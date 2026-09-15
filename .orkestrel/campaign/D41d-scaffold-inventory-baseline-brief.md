# Unit D4-1d — `@orkestrel/scaffold`: the collision baseline is the committed inventory (successor to D4-1c)

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs.

## Why a successor

D4-1c reads the growth baseline from `node_modules/@orkestrel/scaffold/dist/host/guides`
(`src/server/helpers.ts`, the block starting `const installed = join(source, 'node_modules',
'@orkestrel', 'scaffold')`). The canon checkout never carries itself as a dependency, and only the
canon checkout stages a host, so the refusal can never fire where it exists to fire. The
Orchestrator's build after D4-1c recorded it (`D41c-scaffold-gates-build.out.txt`, line 62):

```text
Published host Surface baseline absent at C:\Users\mikes\WebstormProjects\scaffold\node_modules\@orkestrel\scaffold\dist\host\guides; this stage establishes the baseline
```

The Orchestrator's ruling: the baseline is the committed inventory. `npm run build` runs
`stageHost(cwd, 'dist/host')` and then `stageInventory(cwd, 'host.json')` (`package.json` scripts
`build:host` and `build:inventory`), so the root `host.json` is the inventory the last accepted
commit fixed, it is present in every checkout, and it is exactly the record the refusal must
compare against. A collision set that never grows across commits never grows across releases.

## Objective

1. **The manifest records the collision set.** `src/server/types.ts`: a `SurfaceCollision
   { readonly name: string; readonly owners: readonly string[] }` and `HostManifest.surface:
   readonly SurfaceCollision[]` (required; collisions only — names claimed by more than one guide —
   sorted by `name`, each `owners` sorted; the reading `readSurfaceCollisions` already produces).
   `computeManifestDigest` covers `surface` beside `entries` and `roots`, so `readHostManifest`'s
   self-consistency check and the `isHost` guard (`src/server/validators.ts`) refuse a manifest whose
   recorded set moved without its digest, and `isHost` refuses a manifest without `surface`.
2. **`stageHost` reads the baseline from the inventory.** `HostStageOptions` gains `inventory?:
   string` (the inventory path relative to the checkout; default the `INVENTORY_NAME` constant
   `'host.json'` in `src/server/constants.ts`, which `stageInventory` and the build script name).
   A new exported `readSurfaceBaseline(path): readonly SurfaceCollision[] | undefined` returns
   `undefined` when no file exists at `path` (a fresh checkout: the stage records that the baseline
   is absent and this stage establishes it) and refuses with `ScaffoldError('TARGET', …)` when a
   file exists that is not a manifest carrying a well-formed `surface` (a tampered or truncated
   inventory never resets the baseline). The growth comparison is D4-1c's, over the staged guides
   against the inventory's `surface`. Remove the `node_modules/@orkestrel/scaffold` lookup, its
   `realpathSync`, and its tests. The staged manifest and `stageInventory`'s inventory both carry
   the staged set.
3. **Seed the committed inventory once.** The root `host.json` at launch carries no `surface`, and
   under the strict reader the Orchestrator's next build would refuse. Write the seed yourself as
   the last step: a throwaway script under `tmp/codex/` that reads the committed `host.json`,
   computes `surface` with `readSurfaceCollisions('guides')` (the reading over this checkout's
   guides at launch, which is the D4 grandfathered set — `P6-surface-collisions.txt` names 113
   colliding names), recomputes `digest` with the new formula, and rewrites `host.json` with the
   existing tab formatting and trailing newline; retain the script as
   `tmp/codex/D41d-seed-inventory.mjs`. Leave `entries` as they are (the Orchestrator's build
   regenerates them). Record the seed's reading (the collision count and the new digest) in your
   report.
4. **Guide.** `guides/scaffold.md`: Surface rows for `SurfaceCollision`, `HostManifest.surface`,
   `readSurfaceBaseline`, `INVENTORY_NAME`, `HostStageOptions.inventory`; replace D4-1c's baseline
   sentence in the host section with the inventory rule in one paragraph: the baseline is the
   committed inventory, an absent inventory establishes it, and an inventory whose `surface` was
   removed is refused rather than reset.

## Context

D4-1c's `stageHost` (`src/server/helpers.ts`, the TSDoc from "Stages a vendored host root from a
real checkout" through the `readHostManifest(root)` read-back), `readSurfaceCollisions`
(`helpers.ts`, exported), `computeManifestDigest(entries, roots)` (`helpers.ts`, the TSDoc
"Computes the digest of a vendored host's declared membership"), `readHostManifest` (the digest
check `manifest.digest !== computeManifestDigest(…)`), `stageInventory` (read it before touching
the shape it writes), `isHost` (`src/server/validators.ts`, the TSDoc "declared root, and the digest
that authenticates their membership"), `HostManifest` (`src/server/types.ts:84`), `MANIFEST_NAME =
'manifest.json'` (`src/server/constants.ts:115`; the staged host's manifest — the root inventory is a
different file). D4-1c's report `D41c-scaffold-growth-refusal-report.md` and diff
`D41c-diff.patch.txt` (the full chain; D4-1c's own files are `src/server/helpers.ts`,
`src/server/types.ts`, `tests/setupServer.ts`, `tests/src/server/helpers.test.ts`,
`guides/scaffold.md`). Fixtures that build manifests by hand (`tests/setupServer.ts`,
`tests/src/server/Materializer.test.ts`, `tests/src/server/validators.test.ts`,
`tests/src/server/helpers.test.ts`) must gain `surface` and the recomputed digest — derive the set
by running `npm.cmd run test:src:server` and `npm.cmd run test:setup` after the type change, not by
search.

**Installed primitives.** `@orkestrel/guide` (`createGuide`), `@orkestrel/test` (`createScratch`,
`requireValue`, `captureError`), `@orkestrel/contract`; read the surfaces first, and reuse a
primitive whose semantics match rather than declaring a helper.

**Law and bench.** As D4-1c: `AGENTS.md`, `.claude/rules/{names,typescript,architecture,patterns,
tests,documentation,writing,quality}.md`; PowerShell exec shell (`npm.cmd`, `npx.cmd`), `prove`
unreachable, network denied, nine documented sandbox-only `Ollama setup` failures in
`test:src:server`, and one `readHostFloor` failure against the stale committed inventory until the
Orchestrator's build regenerates it (expected; report it, do not chase it).

**Standing conditions.** Dirty with the Orchestrator's edits, D4-1b, D4-2b, D4-3, U14, U14b,
D4-1c; `.orkestrel/`; the mirrored `guides/supervisor.md`; `dist/` and `host.json` were regenerated
by the Orchestrator's build after D4-1c. Do not run `npm.cmd run build`.

## Unknowns

Whether `stageInventory` writes a `HostManifest` or a distinct inventory shape: read it first; if
distinct, `surface` lands in both shapes and the report names the second type.

## Scope

**Owned.** `src/server/helpers.ts`, `src/server/types.ts`, `src/server/validators.ts`,
`src/server/constants.ts`, `src/server/index.ts` (new exports), `tests/setupServer.ts`,
`tests/src/server/helpers.test.ts`, `tests/src/server/validators.test.ts`,
`tests/src/server/Materializer.test.ts` (fixtures only), `tests/setupServer.test.ts` (fixtures
only), `guides/scaffold.md`, `host.json` (the seed only), `tmp/codex/D41d-seed-inventory.mjs`.
**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `src/bin/**`,
`src/server/Materializer.ts`, `src/server/Upstream.ts`, `.claude/**`, `.agents/**`,
`.orkestrel/**`, `package.json`, `package-lock.json`, `dist/**`.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:src:server` exit 0 beyond the documented sandbox failures and the stale
   `readHostFloor` reading, with, red first: `refuses a stage whose guides add a collision the
   inventory lacks`, `stages when the collision set matches the inventory`, `stages when a collision
   the inventory carried is gone`, `establishes the baseline when no inventory exists`, `refuses an
   inventory without a recorded surface`, `refuses an inventory whose surface is malformed`,
   `records the staged collision set in the manifest`, `refuses a manifest whose surface moved
   without its digest`; and the `node_modules` baseline tests gone.
3. `npm.cmd run test:setup` exit 0 (the fixtures carry `surface`).
4. `npm.cmd run test:guides` exit 0.
5. `node tmp/codex/D41d-seed-inventory.mjs` exit 0 and `host.json` carries `surface` with the
   collision count the seed read; `git diff --stat -- host.json` shows one file.
6. Only owned files changed beyond the inherited state.

## Output

D4-1c's Output shape, plus the seed reading.

## Deviation contract

Stop and report when the inventory `stageInventory` writes cannot carry `surface` without
changing a consumer-facing contract outside Owned, or when an owned test cannot be made red first.
Decide and record an ancillary placement (which section, which heading) yourself.
