I'll read the dispatch brief first, then collect only the read-only evidence it names.I'll load the required rules, skill, guides, and campaign records next, then map only the named APIs.I'll read the public contracts, callers, and the named pack instruments next.**Question:** Which public scaffold APIs read registry catalog rows into layers, compile a target plan, and repair only `tests/setupPolicy.ts` and `tests/config.test.ts` from a packed host, and which retained pack instruments already build, pack, and install local artifacts?

**Journal:** `tmp/cursor/d7n-layer-supported-map.jsonl` · session `fa8de448-6bb1-432f-b23d-82d4d42b0240`  
**Provenance:** this Cursor Grok bench answered the brief in place. No tests, installs, publishes, or registry fetches ran.

---

## Evidence

### Catalog and layers (no catalog-verb writes)

**Verified source.** `Upstream.catalog()` is a read-only registry call. It does not write a target, a manifest, or a guide.

```419:449:src/server/types.ts
export interface UpstreamInterface {
	// ...
	lookup(dependencies: readonly Dependency[]): Promise<readonly Release[]>
	fetch(names: readonly string[], current: Snapshot): Promise<readonly Mirror[]>
	read(paths: readonly string[], current: Snapshot): Promise<readonly HostFile[]>
	catalog(): Promise<readonly CatalogEntry[]>
	destroy(): void
}
```

`catalog(): Promise<readonly CatalogEntry[]>` at `src/server/Upstream.ts:325`. Organization membership is `GET {registry}/-/org/{ORKESTREL_SCOPE}/package` (`:648`). A membership refusal throws `FETCH` (`:651`). Each name then reads one abbreviated packument (`#entry` at `:587`).

A found row takes **only** `dist-tags.latest` (`#latest` at `:681`) and edges from that version’s `dependencies` and `peerDependencies` (`#edges` at `:618`, section union `'dependencies' | 'peerDependencies'`). Development edges are omitted on purpose (`:611-617`). `optionalDependencies` is never read. `Dependency.optional` is never set on catalog edges (`:639` pushes `{ name, range }` only).

`CatalogEntry` (`src/core/types.ts:250`):

- found: `{ name, lookup: 'found', version, dependencies, peers }`
- otherwise: `{ name, lookup: 'missing' | 'unmatched' | 'failed', note }` with no version and no edges

Isolated declarations match: `tmp/pass/scaffold-path/dist/src/core/index.d.ts:881` and `catalogToLayers` at `:930`. Root `node_modules/@orkestrel/scaffold` and any `guide/node_modules/@orkestrel/scaffold` tree were **not present** in this checkout.

`catalogToLayers(entries: readonly CatalogEntry[]): ReadonlyArray<readonly string[]>` (`src/core/helpers.ts:681`). It keeps only `lookup === 'found'` (`:684`), treats runtime plus peer names that are also found rows as edges (`:690`), Kahn-sorts, and **breaks on a cycle by omitting remaining names** (`:694-700`). Missing, unmatched, failed, and out-of-fleet edges do not delay a dependent (`:516-533` in tests; guide `guides/scaffold.md:1148-1161`).

**Tests (source, not re-run):** `tests/src/core/helpers.test.ts:430` (order, peer-only edge, cycle omit, missing/failed ignore, empty catalog). `tests/src/server/Upstream.test.ts:1104` (sort), `:1145` (dev edges dropped, out-of-fleet runtime kept), `:1185` (peers kept, dev dropped), `:1278` (missing `HTTP 404`, failed `HTTP 502` beside a found row), `:1299` (bad org list is `FETCH`).

**Write that is a different API.** `Materializer.catalog(entries, target)` rewrites only the marked table in `CATALOG_AGENT_PATH` (`src/server/types.ts:242`, `src/server/Materializer.ts:388`). That is not required to derive layers. The CLI `catalog` verb also declares ranges (`src/bin/CLI.ts:395-416`); that path is the catalog **verb**, not `Upstream.catalog` / `catalogToLayers`.

**Fields the requested layer graph needs that this API does not retain** (alignment plan wants runtime, peer, **optional**, and a **separate** development-tool order; `d7n-layer-alignment-plan.md` “Dependency ordering” / “Layer visit”):

- `optionalDependencies` / `peerDependenciesMeta`
- `devDependencies` / bundled edges
- any version other than `dist-tags.latest` (no `versions` map, no tarball digest, no `gitHead`, no `time`)
- a prepared unpublished local version (see version metadata below)

`catalogToLayers` therefore cannot order optional or development-tool edges. Those edges are absent from `CatalogEntry`.

**Unexecuted.** Live `Upstream.catalog()` against the real registry was not run. Do not treat the embedded catalog table as runtime order.

### Version metadata (distinguish published vs prepared unpublished; no version chosen)

**Verified source.**

- Registry published latest: `CatalogEntry.lookup === 'found'` plus `version` (`#latest`).
- Not on that registry: `lookup: 'missing'` (404) or `'failed'` (transport/shape).
- Packument present, latest unreadable: `lookup: 'unmatched'` (`Upstream.ts:605-607`).
- Range vs a published triple: `Upstream.lookup(dependencies: readonly Dependency[]): Promise<readonly Release[]>` (`types.ts:427`); `Release.latest` is the admitted version, not “every published version” (`types.ts:277`).
- Compare exact `major.minor.patch` only: `extractVersion` / `compareVersions` (`src/core/helpers.ts:764`, `:824`). A prerelease is not extracted (`:751-754`).
- `matchesRange(range, latest)` (`:882`) answers admission of one reported latest, not “this unpublished triple exists locally.”

There is **no** exported `manifestToVersion`. `manifestToName` / `manifestToDependencies` read name and `@orkestrel/*` ranges only (`src/core/helpers.ts:943`, `:978`). A local prepared bump lives in `package.json` `version` and is outside `CatalogEntry`. Distinguishing it from registry latest is a caller comparison of that file against `CatalogEntry.version` or an exact-pin `Upstream.lookup`; that comparison was not executed here.

### Blueprint, plan, packed-host audit, and repair of the two test files

**Verified source. Public library sequence (barrels `src/core/index.ts` and `src/server/index.ts`). `src/bin` has no published barrel (`guides/README.md:16`).**

| Step | Signature | Home |
| --- | --- | --- |
| Fill a blueprint | `createBlueprint(name: string, input?: Partial<Omit<Blueprint, 'name'>>): Blueprint` | `src/core/factories.ts:50` |
| Compile | `Compiler.compile(blueprint: Blueprint, groups?: readonly Group[]): Scaffolding` | `src/core/types.ts:604`, `Compiler.ts:152` |
| Select groups | `selectGroups(groups?: readonly Group[]): readonly Group[]` | `src/core/helpers.ts:484` |
| Packed host | `new Materializer(options?: MaterializerOptions)` with `host?: string \| Host` | `src/server/types.ts:52`, `Materializer.ts:166` |
| Fresh audit | `Materializer.audit(plan: Plan, target: string): Audit` | `src/server/types.ts:195` |
| Repair | `Materializer.repair(plan: Plan, audit: Audit, target: string): MaterializeResult` | `types.ts:226`, `Materializer.ts:299` |

`Scaffolding.plan` is present only when the gate passed (`src/core/types.ts:573`). `MaterializeResult` is `{ target, written, skipped, removed }` (`src/server/types.ts:24`).

**Target-to-blueprint is not a library export.** CLI `#derive(target)` at `src/bin/CLI.ts:900` calls `createBlueprint`, `manifestToName`, `manifestToDependencies(...).runtime`, and **bin-local** `targetToEnvironments` (`src/bin/helpers.ts:895`). Inventing that as a public sequence would be false. Public pieces a caller can compose: `manifestToName`, `manifestToDependencies`, `createBlueprint`. Environment axes from a checkout are not on the core/server barrels.

**Packed host.** Isolated accepted build: `tmp/pass/scaffold-path/dist` (has `dist/bin/main.js` and `dist/host`). Host membership includes `tests/setupPolicy.ts` and `tests/config.test.ts` (`tmp/pass/scaffold-path/dist/host/manifest.json:718`, `:730`). `HOST_PATHS` lists those paths (`src/core/constants.ts:144-146`). Compile plans them as host `presence` via `blueprintToHostArtifacts` (`src/core/compilers.ts:1600`); `inferGroup` maps `tests/*` to `'tests'` (`src/core/helpers.ts:305`). Hydration promotes non-retained host files to `ownership: 'content'` (`Materializer.ts:804-818`). `.gitignore` is retained presence; these two test files are not retained (`isRetainedPath` / `WORKSPACE_OWNED_PATHS` at `src/core/helpers.ts:246`, `src/core/constants.ts:220`).

`new Materializer({ host: '<packed>/dist/host' })` is the public `--from` equivalent (`CLI.#host` at `src/bin/CLI.ts:637` constructs `new Materializer({ host: from })`). Default host is this package’s floor, not a caller checkout.

**Group compile is not a two-path compile.** `compile(blueprint, ['tests'])` keeps every drafted artifact whose `group === 'tests'` (`Compiler.ts:232-237`). That set includes host `tests/policy.test.ts`, `tests/config.test.ts`, `tests/setupPolicy.ts`, plus template tests (`tests/setup.ts`, distribution proof, axis tests, …) as shown for a full compile in `tests/src/core/Compiler.test.ts:28-70`. Repair of a tests-group plan would therefore rewrite **every** stale content-owned tests artifact, including `tests/policy.test.ts`. Birth-owned templates are not replaced when present (`inferDrift` at `src/core/helpers.ts:555`).

**Filtering a valid `Plan` to those two artifacts.**

`isPlan` (`src/core/validators.ts:370`) requires a `Blueprint`, `isGroups`, an artifact array, optional `hash` that is hex if present, and birth ownership at `package.json` if that path appears. It does **not** require `hash` to match `planToHash`, and it does **not** require `groups` to equal the artifacts’ groups.

`Materializer.repair` guards with `isPlan` then `isAudit`, hydrates, re-derives, and `#reconfirm`s planned (non-foreign) findings only (`Materializer.ts:299-306`, `:854-877`). Extra foreign findings in a wider audit are ignored by repair. Repair writes only hydrated artifacts whose derived drift is `missing` or `stale` (`:313-321`). It does not call `declare`, `catalog`, or `remove`.

A one-artifact host plan is already constructed in tests (`tests/src/server/Materializer.test.ts:918-928`). `isPlan` accepts a compiler plan and refuses a content-owned `package.json` (`tests/src/core/validators.test.ts:216-246`).

**Unexecuted:** compiling a real fleet target, slicing artifacts to those two paths, auditing, and repairing was not run. Source permits the filtered `Plan` shape; agreement still requires the audit to be taken from **that same** filtered plan (`#reconfirm` refuses a derived planned path absent from the preview).

**Documented mechanism that writes the manifest.** `Materializer.repair` does not. `Materializer.declare(regions, target)` does (`src/server/types.ts:256`, tests `tests/src/server/Materializer.test.ts:1237`). The **executable** `repair` always `declare`s pins and scripts after `repair` (`CLI.ts:362-367`). Guide: range/script regions are not groups; `repair` and `overwrite` reconcile ranges and write scripts on every run even when `--groups` excludes `manifest` (`guides/scaffold.md:649-654`). That is the documented unintended-pin path if the visit uses `scaffold repair` instead of `Materializer.repair` without `declare`. `overwrite` additionally catalogs and deletes.

CLI writing verbs also `#assertTarget`, which can refuse a selected `configs` or `tests` group when planned dependencies are missing (`CLI.ts:1269`, messages at `:1140`). That refusal is **bin-only**. Library `Materializer.repair` has no such check.

Take a **fresh** `Materializer.audit` from the same instance (`types.ts:218-224`). `Compiler.audit(blueprint, snapshot, groups)` does not hydrate host bytes (`Compiler.ts:191`) and is not the packed-host comparison.

### Pack instruments (reuse limits for a per-layer visit)

**Verified by reading the scripts. Not executed here.**

`pack-heads.sh` (`.orkestrel/campaign/docs-parity/instruments/d7/pass/pack-heads.sh`): requires `FLEET` and `SCR`; `npm run build` then `npm pack` for **guide** and **probe** only; writes under `$SCR/packed`; prints a guide `dist` hash. It is not a generic per-layer packer and does not pack scaffold.

`head-start.sh`: hardcoded Linux checkout `/home/user/fleet/$1`, hardcoded `$SCR` under `/tmp/claude-0/...`, hardcoded `orkestrel-guide-0.0.18.tgz`, `npm install --no-save --ignore-scripts --no-audit --no-fund`. Captures the `@orkestrel/guide` range in `package.json` and installed `package.json` version. Extra probe tarball only when `$n = database`. Not portable to this Windows root as written; not a per-package “pack then install this layer’s tarball” loop.

`port-instruments.sh`: copies every pass `*.sh`/`*.py`/`*.mjs` through `port-paths.mjs` into `$SCR`. Session bootstrap, not a visit.

Windows path-prep (bound to these files only):

- `instruments/d7/windows/prepare-scaffold-path.sh` — isolated `tmp/pass/scaffold-path`, HEAD pin `c87021bd…`, install **guide** tarball `--no-save --package-lock=false`, then `build:src` / `build:host` / `build:inventory`; preserves `package.json` and lock hashes. Does not `npm pack` scaffold, does not visit other packages.
- `prepare-scaffold-path-final.sh` / `prepare-scaffold-path-final-2.sh` — same isolated tree; rebuild (final-2 runs `clean` first); still not a fleet pack/install loop.

**Reuse limit.** These instruments prove “build this checkout, pack named heads, install a tarball `--no-save`, record the replaced range.” They do not: walk `catalogToLayers`, apply `Materializer.repair` from a packed scaffold host, bump versions, or pack an arbitrary layer. `head-start.sh` paths are another host’s. Per-layer visits need new wiring; these are templates for pack/install/preserve-manifest, not a supported visit API.

---

## Distillate

Read layers with `Upstream.catalog()` then `catalogToLayers`. That pair never writes. `CatalogEntry` keeps registry **latest** plus runtime and peer edges only. Optional and development edges, unpublished prepared versions, and non-latest published versions are not on that type.

Repair the two host test files from a packed scaffold with library `createBlueprint` → `Compiler.compile` → optional caller-built `Plan` subset → `new Materializer({ host: packed dist/host })` → `audit` → `repair`. `isPlan`/`isAudit` accept a two-artifact tests plan; `repair` does not `declare`. `compile(..., ['tests'])` is too wide (`policy.test.ts` and template tests remain). CLI `scaffold repair` always declares and is the documented manifest-write path. There is no public `targetToBlueprint`.

Pack/install evidence exists only as campaign scripts with hardcoded packages and paths. They do not encode a layer visit.

**Source vs run.** Signatures, guards, and tests above are source facts. Live registry catalog, a filtered repair against a fleet checkout, and these pack scripts on this machine were not executed.

---

## Unknowns

- Live registry packuments vs any prepared unpublished local `package.json` version (no fetch).
- Whether a caller-sliced two-path `Plan` (stale or omitted `hash`) against a real fleet target hydrates and repairs without `TARGET` from host membership.
- How a visit should fill `Blueprint.src` / `app` / flags without CLI `#derive` / `targetToEnvironments`.
- Installed `@orkestrel/scaffold` declarations under a guide `node_modules` (tree absent here). Isolated `tmp/pass/scaffold-path/dist` declarations were read instead.
- Whether `head-start.sh` / `pack-heads.sh` have a Windows-ported copy that generalizes beyond guide/probe.
- Runtime/peer/optional **and** development-tool graphs for the actual fleet (this map does not infer order from the embedded catalog).

**Deviation:** none. Bench live. No edits, no credential inspection, no tests.
