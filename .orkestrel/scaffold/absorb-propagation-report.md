**Question:** Verify PROPOSAL.md's mapped pointers against this checkout, and distill the full propagation surface the migration (scaffold as single host; targets carry pointer files; instruction members leave the vendored-into-target set) touches.

## Evidence

### 1. `HOST_PATHS`

Pointer **matches**. `src/core/constants.ts:124-159` is `readonly string[]` (frozen path strings, no per-entry object fields). A directory entry vendors everything beneath it (`src/core/constants.ts:118-119`).

Members:

- `AGENTS.md`, `CLAUDE.md`, `LICENSE`
- `.agents/orchestration.md`, `.agents/skills`, `.agents/templates`, `.agents/transports`
- `.claude/agents`, `.claude/rules`, `.claude/skills`, `.claude/settings.json`
- `.codex/agents`, `.codex/config.toml`
- `.cursor/mcp.json`, `.cursor/rules`
- `.mcp.json`
- `scripts/deps.sh`, `scripts/cursor.sh`, `scripts/codex.sh`, `scripts/ollama.sh`
- `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`
- `configs/helpers.ts`, `configs/policy.ts`
- `.editorconfig`, `.gitattributes`, `.gitignore`, `.oxfmtrc.json`, `.oxlintrc.json`, `.oxlintignore`, `.prettierignore`
- `guides/guide.md`, `guides/scaffold.md`

Consumers:

- `src/server/helpers.ts:1401` — `stageHost` walks the list
- `src/core/compilers.ts:1512-1518` — `nameToHostArtifacts` plans one host artifact per selected path
- `src/core/helpers.ts:384-387` — `selectHostPaths` drops the workspace's own guide
- `src/bin/CLI.ts:1370` — setup-module advisory skips vendored `tests/` members
- `tests/src/core/helpers.test.ts:278-286` — `selectHostPaths` vs scaffold/router
- `tests/src/server/helpers.test.ts:159,170` — executable-bit drift; vendored-import scan
- `tests/setupServer.ts:1121,1153,1180` — fixture checkout/manifest construction
- `tests/distribution.test.ts:280-287` — packed `dist/host` membership
- `tests/setup.ts:797` — purity-case input

Related lists that shadow membership: `WORKSPACE_OWNED_PATHS` (`src/core/constants.ts:173`, `.gitignore` only), `EXECUTABLE_PATHS` (`src/core/constants.ts:188-193`, the four `scripts/*.sh` members), `HOST_DIRECTORY_PATHS` (`tests/setupServer.ts:1095-1102`).

### 2. `stageHost` / `stageInventory`

`stageHost` pointer **matches** (`src/server/helpers.ts:1382-1534`; closing brace `1535`). `stageInventory` is **not** in that range: `src/server/helpers.ts:1562-1611`.

`stageHost` stages every `HOST_PATHS` file (and every non-sensitive file discovered under a directory member) into the host root (`1401-1426`), copies to storage names (`1475-1506`), then writes `manifest.json` last (`1512-1527`). Example destination is `dist/host` (`1379`). A missing declared path refuses the stage (`1427-1431`).

`stageInventory` calls `stageHost` into a temp root (`1574`), then writes that same `HostManifest` JSON to the requested path (`1579-1582`). Example destination is `host.json` (`1559`).

Inventory records **no `group`**. Each file entry is `storage`, `destination`, `executable`, `digest` (`src/server/types.ts:65-70`). Top-level: `entries`, `roots`, membership `digest` (`src/server/types.ts:83-87`). `roots` is the sorted directory inventory (`src/server/types.ts:76-77`). `group` is inferred later by `inferGroup` at plan compile (`src/core/compilers.ts:1515`).

Build wiring: `package.json:84,89-90` — `build` runs `build:host` (`stageHost` → `dist/host`) then `build:inventory` (`stageInventory` → `host.json`). `package.json:25` ships `dist/host`.

### 3. Restoration, `audit`, `repair`

`Materializer.repair` pointer **matches** (`src/server/Materializer.ts:291-314`).

How inventory drives findings and writes:

- Core compile plans `HOST_PATHS` as presence-owned host artifacts (`src/core/compilers.ts:1512-1518`).
- CLI `#host` (`src/bin/CLI.ts:616-647`) defaults to `readHostFloor()`; online it fetches live `host.json` via `Upstream.read` (`src/server/Upstream.ts:568`) and overlays with `filesToHost` (`src/bin/CLI.ts:638-641`). Live overlay cannot add or drop membership vs the installed floor (`guides/scaffold.md:1141-1144`).
- `Materializer.audit` hydrates then `planToFindings` (`src/server/Materializer.ts:229-233,618-633`; `src/core/compilers.ts:2138-2151`). Hydration expands each planned host path against manifest entries (`src/server/Materializer.ts:658-687`) and promotes to `content` except `WORKSPACE_OWNED_PATHS` and `isDeferredPath` (`676-682,794-808`). Foreign findings are files under expanded host roots the plan does not own (`614-628,2145-2149`).
- CLI `audit` is `#inspect` (`src/bin/CLI.ts:207-208,274-323`): compare, write nothing. CLI `repair` is `#restore` (`209-210,326-356`): `materializer.repair` then re-audit.

Repair writes **only `missing` and `stale`**; every other drift is skipped (`src/server/Materializer.ts:305-313`). It never deletes. Deletion is `Materializer.remove`, used only by `overwrite` (`src/server/Materializer.ts:449-476`; `src/bin/CLI.ts:486-490`). `remove` deletes tracked foreign findings that are not `src`/`app`/git-protected (`src/server/helpers.ts:127-132`). Example: `.claude/agents/rogue.md` is not protected (`124`).

Stale replacement is content-owned only; presence-owned present bytes are left (`src/server/Materializer.ts:287-289`).

### 4. `inferGroup`

Pointer **matches** (`src/core/helpers.ts:216-227`). Labels and derivation:

| Label | Derivation |
| --- | --- |
| `manifest` | exact `package.json` or `package-lock.json` |
| `orchestration` | `matchesOrchestrationPath` — prefixes `.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.github/`, `scripts/` (`src/core/constants.ts:205-212`) and exact name `.mcp.json` (`221`) |
| `source` | `src/` or `app/` prefix |
| `tests` | `tests/` prefix |
| `guides` | `guides/` prefix |
| `docs` | `docs/` prefix, or `LICENSE`, or root `*.md` |
| `configs` | everything else |

Pinned cases: `tests/src/core/helpers.test.ts:125-140`. Consequence for `HOST_PATHS`: `AGENTS.md`/`CLAUDE.md`/`LICENSE` are `docs`; harness trees, `.mcp.json`, and `scripts/*.sh` are `orchestration`; policy tests are `tests`; editor/git/oxlint/oxfmt/prettier and `configs/` are `configs`; `guides/*.md` are `guides`. `.claude/settings.json` is `orchestration`.

### 5. `tests/config.test.ts`

Pointer **matches** the inventory-alignment test (`tests/config.test.ts:594-694`; digest compare `675-686`).

It requires `package.json` `scripts.build:inventory`. If that script is absent and `host.json` exists, it throws (`607-610`); if both are absent, it returns (`607-611`). Otherwise it SSR-loads `src/server/helpers.ts`, calls `stageInventory` into a temp file, and requires **byte-identical** committed vs generated JSON (`643-686`). On mismatch it indexes `destination` → `digest` and names stale destinations (`654-685`). It does not compare `group`.

### 6. `tests/setupPolicy.ts` skill family and provider bridges

PROPOSAL line ranges are **stale**.

- Skill-family inspection is `inspectSkillFamily` (`tests/setupPolicy.ts:1492-1496`), which walks `readSkillFamily` → `readPolicyDirectories(root, SKILL_FAMILY_ROOT)` with `SKILL_FAMILY_ROOT = '.agents/skills'` (`106,1047-1048,1032-1034`). Per skill: `SKILL.md` frontmatter (`name`+`description`, Use-trigger), `agents/openai.yaml` token, named `references/*.md`, directory inventory, no template TODOs (`inspectSkill` `1303-1483`).
- Claimed `1242-1434` is `inspectSkillTemplateTODOs` (`1235`) plus most of `inspectSkill` (`1297-1484`).
- Provider-bridge inspection is `inspectSkillBridges` (`1592-1623`) plus `inspectBridge` (`1505`). `SKILL_BRIDGE_ROOT = '.claude/skills'` (`109`). Requires a matching directory on each side of the canonical/bridge pair, then matching frontmatter, body naming the canonical `SKILL.md` path, no bridge `references/`.
- Claimed `1444-1561` is still inside `inspectSkill`, then the start of `inspectBridge`.

Absence:

- Missing `.agents/skills` or `.claude/skills` directory: `readPolicyDirectories` returns `[]` (`1033-1034`). `inspectSkillFamily` then returns `[]`. `inspectSkillBridges` with empty canonical and empty bridges returns `[]`. Those inspectors **pass on absence**.
- Canonical present and bridges absent (or the reverse): **fails** (twin-directory violations `1598-1620`).
- `inspectPolicyWorkspace` always includes both inspectors (`1943-1951`).
- Vendored `tests/policy.test.ts` does **not** pass on absence of the family: `readSkillFamily(process.cwd())` must be non-empty and contain `orkestrel-falsify` (`347-351`). `inspectSkillFamily`/`inspectSkillBridges` empty-equals (`354-355,409-410`) would pass. `inspectPolicyWorkspace` empty-equals (`488-490`) would pass the skill/bridge portions. `readPolicyPaths` must contain `.claude/rules/names.md` (`493-497`) — fails if that tree is gone from the inspected workspace.

Those policy files are themselves `HOST_PATHS` members, so they run in every repaired target.

### 7. Guides

`guides/scaffold.md`:

- Surface table: `HOST_PATHS`, `HOST_INVENTORY_PATH` (`119-120`); server `HostManifest`/`ManifestEntry`/`stageHost`/`stageInventory` (`287-288,379-380`); CLI `audit`/`repair` (`402,409,411,447-448`).
- Command line / verbs: `audit`/`repair` (`439-450,487-489`).
- Groups: `docs` = root instruction documents; `orchestration` = harness directories, bench scripts, `.mcp.json`; `tests` includes the policy sweep (`885-898`).
- Ownership: vendored paths hydrate to content; names `AGENTS.md`, `.claude/settings.json`, `tests/policy.test.ts`; content-owns `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` (`900-949`).
- **Vendored data root** (`1127-1183`): `HOST_PATHS` as candidate list; `host.json` as committed live inventory; `build:inventory`; installed release fixes membership; `.claude/settings.json` content-owned and inside the set, `.claude/settings.local.json` outside; `stageHost` → `dist/host`; storage mapping; `Materializer` default root.
- Integrity (`1185`).

No exhaustive member list in the guide; categories only. Membership that must move with `HOST_PATHS` lives in `HOST_PATHS` itself, `EXECUTABLE_PATHS`, `WORKSPACE_OWNED_PATHS`, `ORCHESTRATION_PATH_*`, `tests/setupServer.ts` `HOST_DIRECTORY_PATHS`, and `tests/distribution.test.ts:250-278` packed-path expansion.

`guides/guide.md` is the vendored `@orkestrel/guide` contract. It has **no** host-inventory, vendored-surface, `audit`, or `repair` sections for this package. Its `ManifestEntry` (`guides/guide.md:38`) is a guides-parity row, not a host-inventory entry.

### 8. `host.json`

Top-level: `entries`, `roots`, `digest` (`host.json:2,719,745`). Sample entry (`host.json:3-8`): `storage`, `destination`, `executable`, `digest`. No `group`. `roots` lists declared directories (including `.agents/skills`, `.claude/agents`, `.claude/rules`, `.claude/skills`, `.codex/agents`, `.cursor/rules`, nested skill dirs). `tests/config.test.ts` compares full JSON text, then `destination`/`digest` on mismatch (`643-686`).

### 9. Other readers of `host.json` / `dist/host` / vendored path list

- `src/core/constants.ts:162` — `HOST_INVENTORY_PATH = 'host.json'`
- `src/server/helpers.ts:1049,1107,1117,1209,1382,1562` — `readHostManifest`, `readHostFloor` (source checkout reads `host.json`; published package reads `dist/host`/`manifest.json`), `filesToHost`, `stageHost`, `stageInventory`
- `src/server/Upstream.ts:568` — live fetch of `host.json`
- `src/server/Materializer.ts:120,179` — default host `./dist/host` / `readHostFloor()`
- `src/bin/CLI.ts:417,624-641` — floor vs live overlay
- `src/server/helpers.ts:215-221` — `pathToStorage` (leading-dot segments stripped; root dotted files under `dotfiles/`)
- `package.json:19-26,84,89-90` — `bin.scaffold`, `files` includes `dist/host`, `build:host`, `build:inventory`
- `scripts/` — no `host.json`/`dist/host`/`HOST_PATHS` references
- Tests: `tests/distribution.test.ts`, `tests/config.test.ts`, `tests/src/server/helpers.test.ts`, `tests/setupServer.ts`, `tests/src/bin/CLI.test.ts` (inventory URL)

### 10. Types (`src/core/types.ts` and the server inventory types)

`src/core/types.ts` has **no** `HostManifest` / `ManifestEntry`. Those live in `src/server/types.ts:65-107`.

Core types that describe host planning, groups, and audit:

- `Group` (`src/core/types.ts:34-41`): `manifest` \| `configs` \| `source` \| `tests` \| `guides` \| `docs` \| `orchestration`
- `Origin` / `Ownership` / `Drift` (`18,31,51`)
- `HostFile` (`303-317`): `path`, `lookup`, `hex`/`note`, `observed`
- `ArtifactBase` (`352-357`): `path`, `group`, `ownership`, optional `environment`
- `HostArtifact` (`372-378`): `origin: 'host'`, `ownership: 'presence' | 'birth'`
- `HydratedArtifact` (`390-396`): `origin: 'host'`, `ownership: 'content'`, `hex`
- `Plan` (`428`): includes `groups`
- `Finding` (`464-492`): `path`, `group`, `ownership`/`drift`/`observed` variants
- `Audit` (`503-506`): `findings`, `questions`

Server: `ManifestEntry` (`storage`, `destination`, `executable`, `digest`); `HostManifest` (`entries`, `roots`, `digest`); `Host` (`manifest`, `bytes`).

### 11. `README.md` / `ROADMAP.md`

`README.md:6-8` states every `@orkestrel` repository shares one set of agent instructions and root dotfiles, and scaffold ships that shared set as data inside the package with verbs that create, report, and write the difference. `README.md:36-37` (`new` writes every shared file), `42-49` (`audit` reports path drift), `51-57` (`repair` restores missing/stale planned paths). `README.md:123-124` points at `guides/scaffold.md` for the vendored data root. Those sentences treat instruction files as vendored-into-target data.

`ROADMAP.md` has no propagation/vendoring row this migration would falsify. Standing owner instruction `ROADMAP.md:58-59` still says scaffold writing verbs refuse this workspace and to align by `scaffold audit` plus manual edits.

## Distillate

One frozen path list (`HOST_PATHS`) is the candidate set for **plan membership** (`nameToHostArtifacts`), **staging** (`stageHost` → `dist/host/manifest.json`; `stageInventory` → `host.json`), and **restoration** (hydrate from that host, `audit` via `planToFindings`, `repair` writes `missing`/`stale` only). Directory members expand at stage and at hydrate. `inferGroup` does not split that list; it only labels paths. Instruction-shaped members are `docs` (`AGENTS.md`, `CLAUDE.md`) and `orchestration` (harness trees, `.mcp.json`; also `scripts/*.sh`). `.claude/settings.json` is orchestration and content-owned after hydrate.

Live `host.json` updates bytes for installed membership only; a membership edit requires a release that restages `dist/host` and `host.json`. `tests/config.test.ts` holds committed `host.json` byte-identical to a fresh `stageInventory`. `repair` will not delete a path removed from the list; `overwrite`/`remove` will, for tracked foreign files under expanded host roots (harness trees are not protected). Pointer files at `AGENTS.md`/`CLAUDE.md` would be new content at existing destinations: new digests, then `repair` rewrites them as stale.

Policy inspections of `.agents/skills` / `.claude/skills` **pass on total absence** at the inspector, but vendored `tests/policy.test.ts` still requires a non-empty family containing `orkestrel-falsify` and `readPolicyPaths` containing `.claude/rules/names.md`. Catalog still writes `CATALOG_AGENT_PATH` (`.claude/agents/orkestrel.md`), which sits under a `HOST_PATHS` directory. Guide categories, `EXECUTABLE_PATHS`, `HOST_DIRECTORY_PATHS`, and the packed-host expansion in `tests/distribution.test.ts` move with membership. `guides/guide.md` is unrelated inventory.

PROPOSAL pointers that still hold: `HOST_PATHS` `124-159`, `stageHost` `1382-1534`, `Materializer.repair` `291-314`, `inferGroup` `216-227`, `tests/config.test.ts` `594-686`. Stale: `setupPolicy.ts` skill-family `1242-1434` and bridge `1444-1561`. Inventory fields do not include `group`.

## Unknowns

- Whether `.claude/settings.json` stays in the vendored-into-target set (PROPOSAL open; code currently vendors it and hydrates it to `content`).
- Whether instruction files remain in `dist/host` as the `node_modules` fallback while leaving the target-write set (PROPOSAL open; today plan membership and staging membership are the same list).
- Whether `scripts/` (orchestration-grouped, executable, in `HOST_PATHS`) is treated as instruction or tool surface; PROPOSAL puts it in the tool surface that stays vendored.
- Whether `.agents/templates` and `.agents/transports` leave with `.agents/*` or stay (they are `HOST_PATHS` directories; they are not in `HOST_DIRECTORY_PATHS`).
- What the pointer-file bytes are, and whether they occupy `AGENTS.md`/`CLAUDE.md` only or also shrink `.codex/config.toml` / `.cursor/rules` in place.
- Whether catalog's write of `.claude/agents/orkestrel.md` in targets survives if `.claude/agents` leaves the vendored set.
- Cloud `claudeMdExcludes` / per-root rule loading (PROPOSAL open checks; not measured here).

[exited with code 0]
