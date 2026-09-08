I'll read the brief and the governing orchestration files first, then return only the bounded evidence map.Next I’ll load the named rules, skill, and guides, then map `normalizePolicyPath` and the vendored repair path from source.I’ve located `normalizePolicyPath`. Next I’ll read its definition, callers, the diagnosis files, and the vendored/repair surfaces.I’ll read HOST_PATHS, CLI repair options, overlay vs floor, setup-path tests, and the retained observation evidence.# Unit d7n-scaffold-path-map — evidence map

## Question

Canonical diagnostic-path comparison, its callers and proofs, and the supported vendored propagation path for `tests/setupPolicy.ts` and `tests/config.test.ts`.

## Evidence

### Helper

`normalizePolicyPath` is defined at `tests/setupPolicy.ts:276-278`. It replaces `\` with `/` and collapses duplicate slashes. TSDoc at `:271-274` names a workspace-relative path. It does not decode a `file:` URL, does not call `fileURLToPath`, and does not relativize against a scratch root.

`createPolicyScratch.write` at `tests/setupPolicy.ts:67-76` normalizes the caller’s relative target, then `join(root, ...segments)` onto `mkdtempSync(join(tmpdir(), prefix))` at `:63`.

### Callers in scaffold tests

**Diagnostic filename (the failing comparison).** `tests/config.test.ts:1863` builds `` `${code} ${normalizePolicyPath(filename)}` `` from oxlint JSON `filename`. The same `it` at `:1750` (`loads every configured policy rule through the real binary`) expects relative entries such as `'policy(no-mocking) src/violations/fixture.ts'` at `:1874-1896`. Spawn cwd is `scratch.path` at `:1834-1842`. The helper is not given `scratch.path` as a base.

**Logical keys / glob relatives (no diagnostic URL).** All other call sites are in `tests/setupPolicy.ts`:

- scratch containment target — `:67`
- `testToPolicyStem` / `stemToPolicyCandidates` — `:313`, `:326`
- mirror inspection of test paths and glob populations with `cwd: root` — `:350`, `:374-377`
- suppression glob keys — `:390`
- `ignorePatterns` strings — `:440`
- `resolvePolicyDirectory` / `isPolicyFile` relative segments, then host `join` — `:533`, `:554`
- skill glob keys — `:966`
- rule-map markdown cells — `:1175`
- filename-portability population — `:1230`, `:1280`
- markdown walk — `:1363`
- guide-mirror stem — `:1431`

`tests/policy.test.ts` does not call `normalizePolicyPath`. It drives helpers that do (`createPolicyScratch` at `:56`, `inspectPolicyFilenamePaths` at `:332-359`).

No other `tests/**/*.test.ts` file calls `normalizePolicyPath`.

### Observation (Windows file URL)

Retained diagnosis: `.orkestrel/campaign/docs-parity/d7n-guide-config-diagnosis.md:1-19`. Observation metadata: `evidence/d7n-guide-policy-observe/metadata.json` — oxlint `1.81.0`, Node `v24.20.0`, `win32`. `observation.json` `filename` values begin with `file:///C:/Users/mikes/AppData/Local/Temp/...`. This checkout’s declared oxlint is `package.json:113` `^1.82.0`; installed `node_modules/oxlint/package.json` version `1.82.0`.

### Setup-helper matrices (adjacent, not diagnostic URL)

- `tests/setup.ts:844-865` `PATH_CASES` — logical `isPath` rows including backslash and drive colon as refused. No `file:` row, no percent-escape row, no interior space row.
- `tests/setup.test.ts:268-273` asserts that matrix’s labels, uniqueness, and both verdicts.
- `tests/setupServer.ts:579-627` `FILESYSTEM_PATH_CASES` — host paths including Windows drive, UNC, Unicode euro segments, trailing space refused. No `file:` row, no percent-escape row.
- `tests/setupServer.test.ts:913-931` asserts those matrices.
- `tests/policy.test.ts:54-65` scratch containment (`inside/fixture.ts` vs `../escape`).
- `tests/policy.test.ts:330-359` and `PORTABILITY_POLICY_CONTROLS` at `tests/setupPolicy.ts:2365-2398` — reserved names, trailing dot/space, case folding. Logical keys.
- `tests/config.test.ts:2055-2056` `decodeAssetSource('./asset%20name.png')` / `'%'` — Vite asset percent-decoding in `configs/helpers.ts:747-752`, not oxlint filenames.
- `configs/helpers.ts:70,81` decode a `file:` candidate with `fileURLToPath`. `d7n-guide-config-scout-result.txt:21-23` records that the real-binary `it` never calls `configHelpers`.
- There is no `tests/setupPolicy.test.ts`. Workspace `setup` project is `tests/setup*.test.ts` (`.claude/rules/workspace.md:133-144`). Vendored policy helpers are proved from `tests/policy.test.ts` (`.claude/rules/tests.md:177-179`).

### Test command, inventory, staging made stale by a canonical helper/test edit

Vendored membership: `src/core/constants.ts:136-158` `HOST_PATHS` includes `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`. Committed inventory entries: `host.json:718-733`. Group: `inferGroup` maps `tests/` → `'tests'` (`src/core/helpers.ts:305`).

Commands named by this checkout:

- `package.json:79` `test:config` — Vitest project `config` (`tests/config.test.ts`)
- `package.json:78` `test:policy` — project `policy` (`tests/policy.test.ts`)
- `package.json:86-92` `build` → `build:host` (`dist/host`) and `build:inventory` (`host.json`)
- Inventory gate: `tests/config.test.ts:640` `keeps the committed host inventory aligned with the vendored checkout bytes`; comments at `:641-642` and `guides/scaffold.md:1276-1280`

Files that gate treats as stale after a vendored-byte edit: `host.json` (the committed inventory). Staging destinations the build writes: `dist/host` via `stageHost` (`package.json:91`, `guides/scaffold.md:1317-1330`), plus `dist/host/manifest.json` (`src/server/constants.ts:115` `MANIFEST_NAME`). Test-file storage names equal destinations (`host.json:718-733`). `dist/host` file presence in this listing was not confirmed (glob returned nothing; `dist/` is generated).

`blueprintToTestArtifacts` remarks that those three files are fleet-invariant host artifacts and are not compiled there (`src/core/compilers.ts:1200-1201`). Root Vite templates still include `tests/policy.test.ts` and `tests/config.test.ts` as project files (`src/core/templates.ts:304`, `:315`).

### Published CLI vs live overlay

Declared package: `package.json:2-3` `@orkestrel/scaffold` `0.0.63`. Bin: `package.json:19-20` `scaffold` → `dist/bin/main.js`.

`repair` options: `src/bin/constants.ts:158-164` — `--groups <list>`, `--offline`, `--from <path>`, `--target <path>`, `--json`. Summaries: `:122-126`, `:186`.

Host resolution (`src/bin/CLI.ts:633-667`):

- `--from` → `new Materializer({ host: from })`, no live/floor provenance (`src/bin/types.ts:36-37`)
- `--offline` → installed floor via `readHostFloor()`, `baseline: 'floor'`
- otherwise fetch non-floor destinations and `filesToHost(files, floor)`; `baseline: 'live'` or forced `'floor'`

`isFloorPath` is deferred or canon only (`src/core/helpers.ts:273-275`). `isDeferredPath` is `CATALOG_AGENT_PATH` or `guides/*.md` (`:191-193`). `tests/setupPolicy.ts` and `tests/config.test.ts` are neither, so they are overlay-eligible. Guide: installed release fixes membership; live inventory updates bytes only for already-installed paths (`guides/scaffold.md:1282-1284`, `:1296-1300`).

Hydration promotes non-retained host artifacts to `ownership: 'content'` (`src/server/Materializer.ts:697-703`, `:804-818`). `isRetainedPath` is `.gitignore` or deferred (`src/core/helpers.ts:246-248`, `src/core/constants.ts:220`). Repair writes `missing` and `stale` content-owned paths (`src/server/Materializer.ts:313-321`). Presence-owned compile claim is promoted when the host is read (`src/core/compilers.ts:1563-1566`).

Unrelated mutations on every `repair` run: `CLI.#restore` also `declare`s `package.json` pins and scripts (`src/bin/CLI.ts:362-367`; `Materializer.declare` at `src/server/Materializer.ts:424-428` rewrites ranges and scripts). Forced live-read floor exits `1` even if the terminal audit is aligned (`guides/scaffold.md:1215`; `CLI.ts:388`). `overwrite` additionally deletes foreign paths, runs catalog, and re-declares ranges (`src/bin/constants.ts:188-189`). `--groups` can exclude `'tests'` (`VERB_OPTIONS` repair `--groups`; `GROUPS` includes `'tests'` at `src/core/constants.ts:27`).

`--from` against a scaffold checkout is the local unpublished root (`guides/scaffold.md:1345-1349`, `CLI.ts:638-639`). Live overlay without `--from` reads upstream `host.json` then path bytes (`guides/scaffold.md:1296-1300`).

### Linux gate / host evidence

`.github/workflows/ci.yml:8-21` matrix `ubuntu-latest` and `windows-latest` (Windows excludes Node `22.12.0`). Steps include `npm test` (`:50-51`). Observation directory metadata is `win32` only. No Linux oxlint-filename reading is in `evidence/d7n-guide-policy-observe`. WSL/Docker/CI were not invoked.

### Portability authority chain

Load order: `AGENTS.md:14-18` then applicable `.claude/rules/*`. Rule map: `AGENTS.md:131` `.claude/rules/portability.md`. `CLAUDE.md:1-6` points at `AGENTS.md` and `.agents/orchestration.md` and does not restate path rules. `.cursor/rules` has no portability file.

`portability.md:42-54` — same normalizer on comparison operands; `node:path` for compose/split/relativize; storage/URI keys slash-separated; build a `file:` URI with `pathToFileURL`. It does not require decoding a `file:` URI to a filesystem path. `tests.md:36` — probe host-varying path separators at runtime. URL-to-path decoding for diagnostics is not an explicit rule line.

## Distillate

The comparison that failed is `tests/config.test.ts` `loads every configured policy rule through the real binary`: oxlint `filename` passed through `normalizePolicyPath` versus a workspace-relative expected string. The helper only slash-normalizes. Windows observation filenames are `file:///C:/...` temp paths. Other callers treat glob-relative or authored logical keys, not diagnostic URLs.

Existing setup matrices cover logical `isPath`, host `isFilesystemPath` (including Unicode and trailing space), scratch `..` refusal, and Vite asset percent-decoding. They do not cover oxlint `file:` filenames, absolute-to-scratch-relative conversion, or percent-escaped diagnostic paths.

A canonical edit of `tests/setupPolicy.ts` and/or `tests/config.test.ts` stale-marks `host.json` (config inventory gate) and the `dist/host` staged copies after `build:host` / `build:inventory`. Proofs: `npm run test:config`; helper-only also `npm run test:policy`.

Published `scaffold repair` without `--offline` overlays live bytes onto already-installed non-floor `HOST_PATHS` members, which those three test files are, then hydrates them content-owned and rewrites stale copies. Same verb always rewrites `package.json` ranges/scripts via `declare`. `--from <checkout>` reads a local data root instead of the overlay. `--offline` pins the installed floor. Membership cannot grow without a release.

Linux coverage named here is the GitHub `ubuntu-latest` job. Filename-shape evidence in this campaign folder is Windows-only.

## Unknowns

- Whether oxlint `1.82.0` on this Windows host still emits `file:` filenames (observation is `1.81.0` in the guide tree).
- Whether the Ubuntu CI job’s oxlint JSON `filename` is relative, absolute POSIX, or a `file:` URL (not in this checkout’s evidence).
- Whether `dist/host` currently exists in this working tree.
- Whether a live `host.json` fetch from `main` already carries a diagnostic-path fix (source here is the unfixed helper).
- Journal file and Cursor session id for this grok run (none found beside the brief).

## Journal path and session id

Journal path: unreached. Brief: `tmp/cursor/d7n-scaffold-path-map-brief.md`. Session id: unreached.

## Deviation

None. Read-only. No edits, no tests run, no credential files opened. `package.json` / lock dirty paths were read only for declared and installed versions.
