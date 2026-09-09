I'll read the saved brief and every instruction it names before collecting evidence.I'll load the remaining referenced rules, skills, guides, and campaign reports next.Next I’ll read the scaffold guide sections, campaign handoff, and retained preparation reports the brief names.I’ll read the catalog, overwrite, and instrument sources, then re-measure live sibling states.I’ll re-measure live L0 manifests, git state, toolkit pins, and the retained instruments next.I’ll re-measure git state, tarball presence, and the remaining instrument invocations.Shell batching was blocked; I’ll take one read-only git command at a time.**Initial layer from live sibling manifests:** `@orkestrel/codec`, `@orkestrel/contract`, `@orkestrel/msg`, `@orkestrel/sse`, `@orkestrel/test`. No sibling `package.json` declares `optionalDependencies`. No other sibling lacks a fleet runtime or peer edge.

This is evidence, not acceptance.

---

### Layer membership and owning files

Live checkouts under `C:/Users/mikes/WebstormProjects`:

| Package | Own version | Runtime | Peer | Optional |
| --- | --- | --- | --- | --- |
| `codec/package.json` | `0.0.3` | none | none | none |
| `contract/package.json` | `0.0.17` | none | none | none |
| `msg/package.json` | `0.0.10` | none | none | none |
| `sse/package.json` | `0.0.7` | none | none | none |
| `test/package.json` | `0.0.14` | none | `vitest` `^4.1.11` | none |

`sse/package.json` declares `@orkestrel/contract` `^0.0.16` under `devDependencies` only (`sse/package.json:76`).

Embedded catalog L0 (`.claude/agents/orkestrel.md:53,55,68,85,90`): same names. Catalog versions are `codec 0.0.2`, `contract 0.0.16`, `msg 0.0.9`, `sse 0.0.6`, `test 0.0.13`. Catalog omits development edges. `catalogToLayers` (`src/core/helpers.ts:681-701`) uses `lookup === 'found'` plus runtime and peer names only.

Retained graph L0 matches those names (`d7n-layer-graph-report.md:7-11`).

### Catalog / graph divergences (live vs retained)

- Local L0 versions sit ahead of the catalog table and of `d7n-foundation-ready-registry.json` (observed `2026-09-08 21:11:44 UTC`): registry latest then `0.0.16` / `0.0.2` / `0.0.9` / `0.0.6` / `0.0.13`.
- Live `guide/package.json:2` is `0.0.18`; catalog row is `0.0.17` (`orkestrel.md:60`).
- Live `scaffold/package.json:2` is `0.0.64`; catalog row is `0.0.63` (`orkestrel.md:81`). Packed scaffold extract still pins runtime `@orkestrel/contract` `^0.0.16` and `@orkestrel/guide` `^0.0.17` (`d7n-scaffold-guides-api-accepted/extract/package/package.json:95-108`).
- Named Guide tarball extract pins runtime `@orkestrel/contract` `^0.0.17` and `@orkestrel/markdown` `^0.0.14` (`d7n-guide-native-entry-final/extract/package/package.json:87-89`). Sibling `guide/package.json:87-89` still pins `^0.0.16` / `^0.0.13`.
- `BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']` is `` `^${manifest.version}` `` (`src/core/constants.ts:489-492`). A 0.0.64 host floor therefore names `^0.0.64`.

### Layer member git / toolkit / guides / gates (re-measured refs; porcelain unread)

Branch files all read `ref: refs/heads/claude/orkestrel-npm-audit-deps-14ibta`.

| Checkout | Branch tip | Cached `origin/main` |
| --- | --- | --- |
| contract | `1e235c053e27b6f3f6075367312dfddc75bc3d6b` | same SHA |
| codec | `a492e90fc68c64b29a82ec69181ed69e8c72beb1` | same SHA |
| msg | `0daaa2a7f7301ae8754f31aa88b2a22887695065` | same SHA |
| sse | `93d174e43b34daa2f0593cc89741bed587cadf46` | same SHA |
| test | `a3659450f064e566f4701b566a1cd2267b1e03ac` | same SHA |
| scaffold | `d25f13f30d28044e310cd4feb01943c665ddefe6` | same SHA |
| guide | `327470a6e2e0c056c811e9f48a5ed429fe7ba70e` | packed-refs `d3ee1bb6a76de64065c4937c7f6b5b18d59a7fed` |

Guide `refs/remotes/origin/claude/orkestrel-npm-audit-deps-14ibta` in packed-refs is `1d5afa3c637ea280c54649d8661856de05f22eaf` (not refreshed this unit).

Declared L0 toolkit pins (example `contract/package.json:74-79`): `@orkestrel/guide` `^0.0.17`, `@orkestrel/probe` `^0.0.12`, `@orkestrel/scaffold` `^0.0.63`, `@orkestrel/test` `^0.0.13`. Lockfile resolved the same triples from the registry (`contract/package-lock.json:188-191,280-282,365-368,442-445`).

Installed `node_modules/@orkestrel/guide/package.json` version is `0.0.18` in contract, codec, msg, sse, and test. Installed `@orkestrel/scaffold` is `0.0.63`.

`test:guides` on L0 is the Vitest project form, e.g. `contract/package.json:62`. `tests/guides.test.ts` imports Vitest `describe`/`it` and `@orkestrel/guide` helpers (`contract/tests/guides.test.ts:5-20`, `codec/tests/guides.test.ts:5-21`). `GuideCommand` appears only in `guide/tests/guides.test.ts:5` and `scaffold/tests/guides.test.ts:3`. `contract/vite.config.ts:87-91,134` still registers a `guides` Vitest project.

`prepublishOnly` on those L0 manifests: `format:check && lint:check && check && build && test && test:distribution -- --mode release` (`contract/package.json:67`, same string on codec, msg, sse, test).

Retained foundation closures (`d7n-*-foundation-verdict.md`): PASS; packed tarball paths and SHAs; manifest and lock bytes unchanged by that visit; publication open (`d7n-foundation-ready.md:38`).

Accepted tooling pointers named in the brief: receipts at `tmp/pass/packed/d7n-guide-native-entry-final/receipt.txt` and `tmp/pass/packed/d7n-scaffold-guides-api-accepted/receipt.txt`. SHA256 records: Guide `cc605b5bcfe6db1c86ab6cdfda6415879253b56cf5b4d5d0d325c19eb1b7eac7`; scaffold `5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c`. Glob of `*.tgz` under `tmp/pass/packed` returned no paths (ignore). Direct `test -f` was not executed.

### Preparation gaps vs the owner’s named sequence

Owner sequence: apply those Guide and Scaffold tarballs; supported overwrite; bump from registry; regenerate `package-lock.json`; run `prepublishOnly`. Unpublished tooling permitted; registry development pins kept.

- `prepare-foundation.sh` (`instruments/d7/windows/prepare-foundation.sh:14-16,83-113`) visits only `codec|contract|msg|sse|test`. It runs filtered `foundation.mjs` repair, then `npm install --no-save --ignore-scripts --package-lock=false` of a Guide tarball, then `prepublishOnly`, `docs`, and `npm pack --ignore-scripts`. It does not install the scaffold 0.0.64 tarball. It sha256-checks manifest and lock before and after and refuses a lock change.
- `foundation.mjs:31-36` compiles `createBlueprint(slug, { src: ['core'] })` for `['tests']`, then a filtered plan. Writes are limited to `tests/setupPolicy.ts` and `tests/config.test.ts` (`foundation-constants.mjs` `PATHS`; `PRESERVED` includes `package.json`, `package-lock.json`, and `tests/guides.test.ts`). No CLI `overwrite`, `declare`, catalog, or deletion.
- Supported overwrite is `scaffold overwrite` (`src/bin/CLI.ts:218-219,455-522`). Flags: `--groups`, `--dirty`, `--offline`, `--from <path>`, `--target <path>`, `--json` (`src/bin/constants.ts:166-173`). `--from` only sets `new Materializer({ host: from })` (`CLI.ts:633-639`). Dirty tree without `--dirty` throws `TARGET` (`CLI.ts:461-466`). `--offline` skips catalog, writes floor pins, sets `note` that catalog did not complete, returns `EXIT_DRIFT` (`CLI.ts:503-521,532-553`; `guides/scaffold.md:1218`). Online overwrite also `repair`s, `remove`s, and `declare`s ranges (`CLI.ts:486-506`). `repair`/`overwrite` always rewrite the script region, including `test:guides` (`guides/scaffold.md:635-654`). Current 0.0.64 compiler emits `test:guides` as `node --experimental-strip-types tests/guides.test.ts` (`src/core/compilers.ts:350-351`). L0 `tests/guides.test.ts` files are still Vitest suites.
- Wave visit order requires a preparation commit before overwrite because overwrite refuses uncommitted work (`wave.md:13-18`). `prepare-foundation.sh:57` already refuses a dirty checkout, then never commits.
- Wave bump is from registry latest, not from the local `version` field (`wave.md:96-98`). Alignment plan keeps an already prepared unpublished version (`d7n-layer-alignment-plan.md:55-58`). Live L0 `version` fields already match the retained prepared triples. Fresh registry packuments were not read this unit.
- Wave lock regeneration is “Run the full install” after overwrite (`wave.md:37-38`). No smaller L0 script regenerates the lock; `prepare-foundation.sh` preserves it.
- `upload-foundation.sh` is login and serial `npm publish` of the retained L0 tarballs. `d7n-foundation-ready.md:28-32` holds that script under Ruling 31. Out of this preparation scope.

### Reusable instruments (invocation and limits)

**Graph + registry readings**

- Public, read-only: `Upstream.catalog()` then `catalogToLayers` (`src/server/types.ts:419-449`; `src/core/helpers.ts:681`). Latest plus runtime/peer only. No optional, development, unpublished local version, or tarball digest. Live catalog was not run here.
- Campaign carrier: `node .orkestrel/campaign/docs-parity/instruments/d7/windows/layer-capture-final/main.mjs <absFleetRoot> <absentAbsOutput> <absNpmCliJs> <absGit>` (`main.mjs:5-8`; `functions.mjs:6-26`). Copies each `PACKAGES` manifest and lock, runs git status/branch/HEAD/origin/main/ancestry, then `npm view @orkestrel/<name> --registry=https://registry.npmjs.org/ --json` (`Capture.mjs:94-112`; `constants.mjs:1-18`). Writes the output directory. Does not mutate a package. Refuses an occupied output path. `origin/main` is labeled cached (`Capture.mjs:27`). Population is the frozen list in `constants.mjs`, not a sibling scan; `supervisor` is absent.

**Install (tarball, keep manifest)**

- `prepare-foundation.sh:84`: `npm install --no-save --ignore-scripts --package-lock=false "$GUIDE_TARBALL"` inside `$FLEET/$SLUG`. Guide only. Does not write the lock. Limit: Guide identity check `0.0.18` (`:87-90`); does not take a scaffold tarball.
- Ported `head-start.sh` (handoff): Guide `0.0.18` `--no-save`; Probe extra only for `database`. Not a layer visit.

**Overwrite**

- `scaffold overwrite --from <packed>/dist/host --target <checkout>` with optional `--offline` `--dirty` `--groups` `--json`. Host path must be the packed `dist/host` directory, not the `.tgz`. Limit: full planned repair + deletion + range/script declare; not the two-file filtered repair. `--offline` always exits non-clean. Unpublished scaffold: `wave.md:52-57` names `scaffold overwrite --offline` then a later online overwrite after scaffold publishes.
- Library alternative: `createBlueprint` → `Compiler.compile` → filtered `Plan` → `new Materializer({ host })` → `audit` → `repair` (`foundation.mjs:25-36`). Does not declare pins.

**Lock**

- Wave: full `npm install` after overwrite re-declares toolchain ranges (`wave.md:37-38`). No dedicated L0 wrapper. `prepare-foundation.sh` is the opposite (hash-preserve).

**Gates**

- `npm run prepublishOnly` in the package (`prepare-foundation.sh:93`). Also `npm run docs` (`:94`). Limit: runs in the live checkout; `docs` still exists on L0 manifests (`contract/package.json:72`) while packed Guide extract has no `docs` key (`extract/package/package.json:56-85`).

**Artifact comparison**

- `prepare-foundation.sh:103-104`: `cmp` packed `package.json` to checkout; `diff -qr` packed `dist` vs checkout `dist`.
- `compare-guide-baseline.sh:10`: `diff -qr -x '*.map'` of two Guide extracts. Hardcoded `d7n-guide-stage.MQbCaa` and bootstrap hash. Not an L0 comparator.

**Pack**

- `npm pack --ignore-scripts --pack-destination "$PACKED"` (`prepare-foundation.sh:98`). Limit: after `prepublishOnly`; expects `$PACKED/orkestrel-$SLUG-$VERSION.tgz`.
- `pack-heads.sh`: `npm run build` then `npm pack` for guide and probe only.

Invocation of the retained visit script:

```text
bash /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/windows/prepare-foundation.sh <codec|contract|msg|sse|test> <40-hex-HEAD> <version> <guide.tgz> <64-hex-guide-sha>
```

Requires `tmp/pass/pass-env.sh`, clean matching HEAD, cached `origin/main` ancestor after `git fetch` (`prepare-foundation.sh:61` — this unit did not fetch), and host files under `$SCR/path-artifact-pilot/node_modules/@orkestrel/scaffold/dist/host` with fixed SHA256s (`:74-76`).

### Unresolved

- Working-tree porcelain for every subject: `git status` via Shell was rejected this turn. Conversation-start snapshot named scaffold clean on `claude/orkestrel-npm-audit-deps-14ibta`; sibling dirty paths unread.
- Live `npm view` / `Upstream.catalog()` this turn (not run; last L0 packuments `d7n-foundation-ready-registry.json`).
- Whether named `.tgz` files still occupy the receipt paths (receipts and SHA256 sidecars exist; binary glob empty).
- Whether `327470a` is an ancestor of Guide `origin/main` `d3ee1bb` (merge-base unread).
- Nested `npm ls` resolutions after a 0.0.64 scaffold tarball install.
- Journal file `scaffold/tmp/cursor/d7n-publish-foundation-scout.jsonl` (Ask mode: not written).

### Provenance

Brief: `tmp/units/d7n-publish-foundation-scout-brief.md`. Cursor Grok executed the reading in this session. No subject mutation. No install, fetch, gate, pack, or publish. Shell `git -C` porcelain was rejected; tips read from `.git/HEAD` and ref files. Specified journal path was not created.
