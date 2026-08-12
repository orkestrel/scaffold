# Scaffold propagation: what changed, and what 40 real targets revealed

Written for the parallel session working on app-layer targets. This session drove
`@orkestrel/scaffold` against all 40 published fleet repositories, every one of which is `src`-only.
So the defects below are the ones a `src`-only sweep can find; where a defect looks likely to have
an app-layer twin, it says so under **App cross-check**.

Companion file, owned by the other session: `.orkestrel/scaffold/alignment.md`.

## 1. What changed in scaffold

### Published: 0.0.26 → 0.0.27

Runtime dependency re-pins to the versions the registry now serves — `console ^0.0.5`,
`contract ^0.0.11`, `emitter ^0.0.6`, `markdown ^0.0.8`, `template ^0.0.3` — plus `guide ^0.0.10`
and `html ^0.0.3` in development, and the same moves in `BASE_DEV_DEPENDENCIES`,
`APP_DEV_DEPENDENCIES`, `APP_BROWSER_DEV_DEPENDENCIES` and `APP_SERVER_DEV_DEPENDENCIES` so a fresh
workspace starts current. **`APP_*` constants moved in this release** — that is the one manifest
change in 0.0.27 an app-layer target sees directly.

One capability was added.

**`CatalogEntry.dependencies` and `catalogToLayers`.** A catalog row now carries the runtime edges
its published version declares, read from the same abbreviated packument the version came from, so
the edges cost no extra request — `Upstream.#entry` had been discarding them.
`catalogToLayers(entries)` projects a catalog into the rounds it publishes in. No layer is stored on
a row, because a layer is a deterministic function of the rows' own edges and a stored one could only
disagree with them. The catalog table gained a `Layer` column and a runtime-dependency column, both
computed in the call that writes the row. Only `dependencies` is read; `devDependencies` reaches no
consumer of the published package and would invent rounds that do not exist.

Two test budgets widened where a measured run showed them below the work: the generated-configuration
typecheck spawns four real `tsc` runs against a ten-second budget, and every `src:bin` test drives the
real executable against Vitest's five-second default. Both passed alone and reported timeouts under a
full suite run.

### On `main`, unpublished at the time of writing

Three documentation commits, no surface change, so no bump is owed under the rule below:

- the writing-verb refusal for an unregistered Vitest project, stated as a limit;
- a correction to that limit — `Blueprint.services` registers no project, so the two fleet cases are
  one limit with one cause rather than two;
- a catalog-table refresh, because scaffold's own row still read `0.0.26` with pre-re-pin ranges.

## 2. The bump rule this session operated under

The owner's ruling, and it decided every version question here: **a package bumps only if its
published surface moves, and the claim that it did not has to be proved.** A guide change that does
not move the surface does not bump either.

The instrument is `tmp/propagate/surface.cjs` in this repository's working tree at the time — it
compares each freshly built `dist/src/*/index.d.ts` against **the tarball the registry serves**,
rather than against a git commit, because the tarball is what a consumer actually has. It carries
twelve controls. It forgives exactly one spelling, `ReadonlyArray<T>` against `readonly T[]`, and the
controls prove it still reports an added export, a removed export, a retyped export,
`readonly string[]` against `string[]`, and refuses to strip the parentheses off `(A | B)[]`.

**Result: 40 of 40 surfaces unmoved. Zero packages bumped, zero republished.** Six repositories
needed an individual ruling and none of them survived it as a real move:

| Case                                                                 | Repos                                                                           | Ruling                                                                                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Import respelled from `'../core/index.ts'` to the package's own name | `middleware`, `browser`, `database`, `router`, `terminal`, `worker`, `workflow` | Both specifiers resolve to `dist/src/core/index.d.ts` — the relative form through TypeScript's `.ts`→`.d.ts` mapping, the package form through `exports["."].import.types` |
| Explicit parentheses around a nested conditional type                | `contract`                                                                      | Conditional types are right-associative; proved identical with a `tsc` probe carrying a control                                                                            |
| TSDoc prose only                                                     | `emitter`, `console`                                                            | Documentation; exported name sets identical                                                                                                                                |

The import respelling is worth flagging on its own: **the emitted declarations changed how they
reference a sibling module between 0.0.26's toolchain and 0.0.27's.** Nothing about the source
changed. An app-layer target with `app/core` importing from `app/server` may show the same thing.

## 3. Defects found in scaffold by driving it against 40 targets

Ordered by how likely each is to bite an app-layer target.

### 3.1 A writing verb refuses a workspace needing a project scaffold does not register

The registered project set is fixed: the environment projects the axes select, plus `policy`,
`config`, `probe`, `guides`, and `integration` when `tests/integration.test.ts` exists.
`Blueprint.services` does **not** add one — measured by compiling a blueprint carrying
`services: ['ollama']` and reading the project list in the tree it materialized: it emits
`scripts/service.sh` and nothing else. A workspace whose manifest names a project the plan omits gets
"the manifest names a Vitest project the planned configuration does not register", and the refusal
runs **before group selection**, so `--groups` does not narrow past it.

Two repositories genuinely need this: `mcp` (a `conformance` project) and `ollama` (a `service`
project). Two more looked like it and were not — `sea` and `websocket` kept a `tests/integration/`
directory of named proofs while scaffold detects the reserved single file. Consolidating onto
`tests/integration.test.ts` closed their drift completely: both now report every path aligned and
writing verbs accept them.

**App cross-check.** An app-layer target is more likely to carry a custom project, not less — a
browser app driving Playwright, a server app driving a real database. If the other session sees this
refusal, it is this defect and not a target-specific one. The fix belongs to scaffold's
project-registration capability: `services` carries the names already and stops at the script.

### 3.2 `guides/README.md` is emitted by `new` and never written by `repair`

Every `guides/**.md` path is deferred to presence ownership, so `repair` skips it. `scaffold new`
emits `guides/README.md` with real content; `repair` and `overwrite` never will. **Delete it and
nothing restores it** — the guides parity suite then fails with `Missing file: guides/README.md`.
This bit this session: a prep script deleted it in 10 repositories on the assumption `overwrite`
would rewrite it.

**App cross-check.** Identical mechanism regardless of axes. Any target whose `guides/README.md` is
missing needs it restored by hand or from `scaffold new` into a scratch directory.

### 3.3 `package.json` is birth-owned, so no verb adds a script a new proof requires

`tests/config.test.ts` shipped with the 0.0.27 file set and asserts the manifest registers
`test:config`. `package.json` is birth-owned, so `overwrite` never adds it. The result on 25 of 40
repositories was a proof that was **declared in `vite.config.ts`, present on disk, failing, and
selected by no gate** — so `npm test` reported green while carrying a red test nothing ran.

This is the most dangerous defect found, because the instrument that would catch it is the one that
is not running. Detect it with `npx vitest run --project config` directly rather than through
`npm test`.

**App cross-check.** Applies to every target that adopts a file set introducing a new cross-cutting
proof. An app-layer target adds `app:core`, `app:browser`, `app:server` projects with the same
script-registration requirement, so the same gap can exist per app project. Worth checking that
`test:app`, `test:app:browser` and friends are present _and chained into `test`_, not merely declared.

### 3.4 `.claude/agents/orkestrel.md` prose can never be refreshed

The file is presence-owned, so `repair` skips it when present, and `catalog` replaces only what sits
between the markers. Its guard prose **outside** the markers is therefore unreachable by any verb
once the file exists. Two repositories carried the pre-0.0.27 prose for exactly this reason. The
workaround is to delete the file and let `overwrite` write the vendored copy, then `catalog` to fill
the table.

### 3.5 The guide-mirror fetch 404s until every target serves the flat layout

`catalog` fetches each runtime dependency's guide from that package's repository at
`guides/<name>.md`. A fleet mid-migration still serves `guides/src/<name>.md`, so every mirror 404s
and no mirror can resolve until the whole fleet has been pushed. This is inherent ordering, not a
defect, but it makes a mid-migration `catalog` run look broken. Run the mirror pass **after** the
last target is pushed.

### 3.6 `overwrite` does not delete an unplanned guide mirror

Confirmed again this session: `#deferred` covers every `guides/**.md`, so a stale mirror survives
`overwrite` and its `removed` list stays empty. Combined with 3.2, a target's `guides/` directory is
effectively hand-maintained.

## 4. Migration shape, if the other session runs one

What the fleet needed, per target, in order. Steps 2 and 3 are the ones scaffold does not do for you.

1. Re-pin `@orkestrel/scaffold`, install, commit.
2. Move `guides/src/<own>.md` to `guides/<own>.md` **and strip one `../` level from every relative
   link in it** — the guide rises one directory and parity resolves links against the guide's own
   location. Repositories whose guide was already flat can still carry two-level links; check for
   `](../../` rather than assuming the move implies the fix. Rewrite `guides/README.md`'s links; do
   not delete it (3.2). Move the dependency mirrors rather than deleting them.
3. Delete `.claude/agents/orkestrel.md` when it carries no `<!-- orkestrel:catalog -->` markers, so
   `overwrite` writes the vendored copy (3.4).
4. `scaffold overwrite`, then install again — it re-pins development dependencies.
5. `npm run lint` (mutating) before measuring. The refreshed `.oxlintrc.json` `array-type` rule
   rewrites `readonly T[]` to `ReadonlyArray<T>` mechanically; running only `lint:check` reports
   dozens of errors that the fixer resolves itself.
6. Add `test:config` and chain it into `test` (3.3) — **but check the target's `config` project
   actually points at a proof that exists**. One repository had a `config` project aimed at a
   directory that was never created, so adding the script made a dead project run and exit 1.
7. Repair what is left. On this fleet that was the policy sweep's name forms: `parsers.ts` exports
   only `parse*`, `factories.ts` only `create*`. **A violation is a misplacement, not a misnaming** —
   move the declaration to its kind file; the barrel star-exports both, so the surface is unchanged.
   Renaming would move the surface and earn a bump.

## 5. Open, not closed by this session

- **Scaffold registers no custom Vitest project.** Recorded as a limit in `guides/scaffold.md`.
  Completing `Blueprint.services` into a registered project is the obvious first half.
- **`mcp` has no config proof.** Its `config` project points at a directory that does not exist.
  Supplying the real proof needs `configs/helpers.ts` and a `probe` project, and its `vite.config.ts`
  builds projects through its own registration loop rather than the generated exports the proof
  reads. A scoped unit, not a copy.
- **The restored guide mirrors predate the fleet cascade.** 98 mirrors were restored from git history
  across 31 repositories after a prep script deleted them; they carry pre-cascade content until a
  catalog pass refreshes them.
