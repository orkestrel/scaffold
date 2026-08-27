**Lane: objective (second engine), Cursor Grok substituting for GPT-5.6 Sol.** Verdicts below are proposals for the Orchestrator to verify. Blind to every other lane.

---

## Design

### 1. Membership split

Do not split on `Group`. `inferGroup` (`src/core/helpers.ts:216-227`) labels `AGENTS.md` and `LICENSE` both `docs`, and labels `scripts/deps.sh` and `.claude/rules` both `orchestration`. Using that axis as membership would pull the tool surface out with the instruction surface, or leave instruction files in the target plan. `PROPOSAL.md:79-89` sketches `inferGroup` and then lists members that cross those labels. Treat that sketch as a hint, not the mechanism.

Keep **one staging list** and **one subtractive plan filter**. Do not add a field to `ManifestEntry` (`src/server/types.ts:65-70`). Inventory stays `storage`, `destination`, `executable`, `digest`. Plan policy does not belong in `host.json`.

**Constants** (`src/core/constants.ts`, UPPER_SNAKE_CASE `{QUALIFIER}_{NOUN}`):

- `HOST_PATHS` stays the staging candidate set `stageHost` already walks (`src/server/helpers.ts:1401`). Instruction files remain members so they still land in `dist/host` and `host.json` as the `node_modules` fallback the pointer names.
- Add `INSTRUCTION_PATHS`: the `HOST_PATHS` members that leave the vendored-into-target plan. Frozen `readonly string[]`. Members: `AGENTS.md`, `CLAUDE.md`, `.agents/orchestration.md`, `.agents/skills`, `.agents/templates`, `.agents/transports`, `.claude/agents`, `.claude/rules`, `.claude/skills`, `.codex/agents`, `.codex/config.toml`, `.cursor/mcp.json`, `.cursor/rules`, `.mcp.json`.
- Leave `.claude/settings.json` on `HOST_PATHS` and on the plan (question 3).
- Leave `EXECUTABLE_PATHS`, `WORKSPACE_OWNED_PATHS`, `ORCHESTRATION_PATH_PREFIXES`, `ORCHESTRATION_PATH_NAMES` as they are. Those are executable-bit, workspace-byte, and group-label lists, not this split.
- `CATALOG_AGENT_PATH` stays. It is planned as a **file** even though its directory is in `INSTRUCTION_PATHS` (question 5).

**Helper** (`src/core/helpers.ts`): `matchesInstructionPath(path)` — true when `path` equals an `INSTRUCTION_PATHS` member or sits under a directory member. Same shape as `matchesOrchestrationPath`. Derive membership from that list; do not store a parallel boolean on artifacts.

**`selectHostPaths`**: keep “drop the workspace’s own guide”. Compose plan membership as: `selectHostPaths(HOST_PATHS, name)` then drop `matchesInstructionPath`, then append `CATALOG_AGENT_PATH` if it is not already present.

**`nameToHostArtifacts`** (`src/core/compilers.ts:1512-1518`): emit `origin: 'host'`, `ownership: 'presence'` only for that composed list. `source` stays absent (path equals storage destination for those files). Update the example that currently claims `AGENTS.md` is a host artifact.

**Pointer artifacts**: not host-origin. `Compiler.#draft` (`src/core/Compiler.ts:282-298`) concatenates `nameToHostArtifacts` with template/computed artifacts. `artifactsToQuestions` (`src/core/compilers.ts:2453-2458`) refuses two artifacts at one path. `AGENTS.md` / `CLAUDE.md` therefore appear **once**, as `ContentArtifact` (`origin: 'template'`, `ownership: 'content'`, `group: 'docs'`). Hydration only expands planned host artifacts (`Materializer.#hydrate` / `#expand`, `src/server/Materializer.ts:658-687`), so canonical `destination: 'AGENTS.md'` in `host.json` is unused by repair and does not collide.

Do not put a `surface` discriminant on `HostArtifact`. Staging vs plan is which constant `nameToHostArtifacts` reads, not a new origin or group.

`HOST_DIRECTORY_PATHS` (`tests/setupServer.ts:1095-1102`) stays the fixture staging split (directories vs files in a fake host). Packed-path expansion in `tests/distribution.test.ts:250-287` still asserts `dist/host` contains every `HOST_PATHS` member, including instruction files.

### 2. Pointer mechanism and content

**Where the bytes live:** `ARTIFACT_TEMPLATES` in `src/core/templates.ts` (the kind file for template definitions). A compiler helper in `src/core/compilers.ts` (same family as `blueprintToDocumentArtifacts`) emits the two `ContentArtifact`s. They are not blueprint-dependent, so they do not take a name. They are not computed: the prose does not vary by package.

**Why not `HostArtifact.source`:** that field remaps a planned path onto a different manifest destination (`src/core/types.ts:363-375`, `Materializer.#expand` uses `artifact.source ?? artifact.path`). Staging a pointer file at destination `AGENTS.md` collides with the canonical instruction file already stored at that destination. Staging it under a different destination and remapping is extra host surface for text that is identical in every target. Template origin is the contract that already does that job (`README.md` is the nearby precedent; pointers differ only in ownership: `content`, not `birth`).

**Why not a new source directory on `HOST_PATHS`:** `dist/host` is the fallback for **canonical** instruction files, not for pointers. Pointers are what the target holds.

**Prose (both files, same body):** instruction-file voice — directives, no `@path` import, no `should`. Follow `PROPOSAL.md:54-60` and name paths that exist.

Constraint the proposal text does not spell: `pathToStorage` (`src/server/helpers.ts:215-221`) strips leading dots per segment. Sibling checkout paths are destination names; packaged host paths are storage names.

- Sibling present: read `../scaffold/AGENTS.md` and `../scaffold/.agents/orchestration.md`.
- Otherwise: read `node_modules/@orkestrel/scaffold/dist/host/AGENTS.md` and `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md`.

Do not tell the agent to open `dist/host/.agents/orchestration.md`. That path is not staged. `manifest.json` can resolve other destinations if the agent needs rules or skills from the packaged host; the pointer names the two files the proposal names, with storage spelling on the fallback.

Do not write `@AGENTS.md` / `@.agents/orchestration.md`. Those are import inlines (`PROPOSAL.md:37-40`).

Repair polices the pointers because they are content-owned template artifacts: missing and stale are rewritten (`Materializer.repair`, `src/server/Materializer.ts:305-313`). Present presence-owned bytes would be left; that is why these must not remain host/presence at those destinations.

### 3. `.claude/settings.json`

**Stays vendored** (staged and planned, content-owned after hydrate).

It is not a memory file. The measured damage is auto-loaded `CLAUDE.md` / `AGENTS.md` / `.agents/orchestration.md` / rules (`PROPOSAL.md:10-20`). This file does not recreate that multiplier.

It is the permissions floor and the `SessionStart` hook that invokes `scripts/deps.sh`, `scripts/ollama.sh`, `scripts/cursor.sh`, and `scripts/codex.sh` (`.claude/settings.json` `hooks.SessionStart`). Those scripts stay on the tool surface (`PROPOSAL.md:83-85` and `EXECUTABLE_PATHS`). Leaving settings would orphan that wiring in every target.

Guide already states the operator-grant split: edit `.claude/settings.local.json`, which `matchesSensitivePath` excludes from staging (`guides/scaffold.md:1152-1157`). Keep that.

### 4. Bridge files in targets

**No bridge files remain in the target plan** beyond the pointer pair at `CLAUDE.md` and `AGENTS.md`. `.codex/*`, `.cursor/*`, and `.mcp.json` leave with `INSTRUCTION_PATHS`, matching `PROPOSAL.md:81-89`. `PROPOSAL.md:61-64` means those bridges already defer to `AGENTS.md` and do not need a third pointer shape; it does not mean they stay as shrunken vendored copies. Keeping them would contradict the leave-list.

**A Claude Code session on a bare target** auto-loads the small `CLAUDE.md` pointer, then Reads the named scaffold or `dist/host` files.

**A Codex session on a bare target** has no project `.codex/config.toml`, so it does not receive that file’s `developer_instructions`. It sees the `AGENTS.md` pointer if the harness loads `AGENTS.md` from the project root (unverified here). Full Codex wiring lives in the attached scaffold checkout (`PROPOSAL.md:65-67`).

**A Cursor session on a bare target** has no `alwaysApply` rule and no project `.cursor/mcp.json` / `.mcp.json`. MCP servers and the Cursor bridge load from attached scaffold, not from the target.

`new` must not write those trees. `repair` must not restore them. Leftovers become unmanaged (question 7).

### 5. Catalog agent

**It stays, as a single planned host file, not as the `.claude/agents` directory.**

`Materializer.catalog` / `#rewrite` (`src/server/Materializer.ts:380-389,945-954`) requires `.claude/agents/orkestrel.md` to already exist as readable text with the marker pair. It does not create the file. `isDeferredPath` (`src/core/helpers.ts:188-190`) keeps it presence-owned so catalog owns the table and repair only restores absence.

If the whole directory leaves the plan, `new` never writes the file and `catalog` throws `TARGET`. Planning the directory would hydrate **every** staged role file under it (`#expand` matches `destination === source || destination.startsWith(source + '/')`). `.claude/agents` currently holds the catalog file **and** the role files (`planner.md`, `grok.md`, `sol.md`, and the rest). Those role files are instruction and must leave.

Plan `{ path: CATALOG_AGENT_PATH, origin: 'host', ownership: 'presence' }` only. Hydration matches that one manifest destination. `isDeferredPath` still applies. Update `CATALOG_AGENT_PATH` remarks that currently say it is “vendored like every other host artifact” under a vendored agents directory (`src/core/constants.ts:224-231`).

### 6. Policy-test re-scope

Inspectors already pass on total absence: `readPolicyDirectories` returns `[]` (`tests/setupPolicy.ts:1033-1034`); `inspectSkillFamily` / `inspectSkillBridges` / `inspectPolicyRuleMap` (directory undefined → `[]` at `tests/setupPolicy.ts:1654-1655`) do not fail empty trees.

The vendored assertions that fail in a target are:

- `tests/policy.test.ts` “discovers a non-empty family containing orkestrel-falsify” (`347-351`)
- `tests/policy.test.ts` “reaches every branch…” requiring `.claude/rules/names.md` in `readPolicyPaths(process.cwd())` (`493-497`)

**Mechanism:** keep `tests/policy.test.ts` and `tests/setupPolicy.ts` on the tool surface (still `HOST_PATHS`, still planned). Change only those **membership** assertions so they bind when the tree is present and stay silent when the root is absent. Do not weaken the inspectors: when `.agents/skills` exists, it must still be a complete family; when `.claude/skills` exists, bridges must still twin; when `.claude/rules` exists, the rule map must still match.

That pass-on-absence at the assertion would also go green if scaffold’s own trees disappeared. Close that hole with a **non-vendored** proof that lives only in this repository (not a `HOST_PATHS` member): package name `@orkestrel/scaffold` (or an equivalent identity this tree already owns) requires a non-empty family containing `orkestrel-falsify` and `readPolicyPaths` containing `.claude/rules/names.md`. Targets never receive that file, so they never lose the bind.

Do not drop the whole policy suite from targets. Suppression, portability, mirrors, and source placement still apply to target source. `inspectPolicyWorkspace` remains the workspace route; it already no-ops the instruction-tree legs on absence.

`POLICY_RULE_MAP_FILE` is `AGENTS.md`. After the change, a target’s `AGENTS.md` is pointer prose with no rule map. That is safe only when `.claude/rules` is absent. A half-swept target with leftover rules and a pointer `AGENTS.md` fails rule-map policy until the sweep finishes. That is the correct failure.

### 7. Orphan sweep

**Do not add a verb. Do not extend `repair`. Do not extend `remove` for this visit.** Document a manual deletion in the adoption visit.

`repair` writes only `missing` and `stale` (`src/server/Materializer.ts:305-313`). `remove` / `overwrite` delete `foreign` findings (`:466-472`). Foreign paths enter the snapshot only under **expanded planned host directory roots** (`#derive` / `#roots`, `:618-628,639-653`). Dropping `.claude/rules` from the plan means that directory is no longer a root, so leftover `names.md` is **unmanaged**, not foreign, and `overwrite` will not delete it.

Widening `remove` to “every `host.json` destination the plan does not claim” would delete leftovers, and would also encode lasting product policy (targets must not hold instruction copies). Mechanism-not-product-policy: the existing rule stays — leaving membership makes a path unmanaged. The visit is the application decision `PROPOSAL.md:96-100` already names: same visit as re-pin and repair, delete the superseded trees.

Name the delete set from `INSTRUCTION_PATHS` except `AGENTS.md` and `CLAUDE.md` (those destinations are rewritten to pointers by repair). Also delete sibling files under `.claude/agents/` other than `orkestrel.md`.

### 8. Membership edges

| Path | Surface | Why |
| --- | --- | --- |
| `scripts/*.sh` (`deps`, `cursor`, `codex`, `ollama`) | **Tool.** Stay staged and planned. | SessionStart probes and install hooks. `EXECUTABLE_PATHS` unchanged. `inferGroup` says `orchestration`; that is a label, not this split. `PROPOSAL.md:83-85` already keeps `scripts/`. |
| `.agents/templates` | **Instruction.** Leave the plan. | Dispatch brief template. Read from attached scaffold or packaged host, not copied into targets. |
| `.agents/transports` | **Instruction.** Leave the plan. | Bench transport contracts. Same as other `.agents/*`. |
| `LICENSE` | **Tool.** Stay. | `PROPOSAL.md:84`. Group `docs` is irrelevant. |
| `guides/guide.md`, `guides/scaffold.md` | **Tool.** Stay. | Guide mirrors / starting set. `selectHostPaths` still drops the workspace’s own guide. |

### 9. Documentation parity

**This change owns:**

- `README.md` opening (`6-8`) and verb passages that treat instruction files as vendored-into-target data (`36-57`), plus the vendored-data-root pointer (`123-124`).
- `guides/scaffold.md` Groups (`docs` / `orchestration` rows at `885-898`), Ownership examples that name `AGENTS.md` as an unhydrated host path (`900-949`), Vendored data root (`1127-1183`). Catalog still documents `.claude/agents/orkestrel.md`.
- TSDoc/examples: `HOST_PATHS` remarks (`src/core/constants.ts:110-123`), `nameToHostArtifacts` (`src/core/compilers.ts:1504-1510`), `CATALOG_AGENT_PATH` remarks, `isDeferredPath` / `inferGroup` examples that remain true.
- `guides/README.md` only if a surface symbol is added; no new export is required if helpers stay in the existing barrels (they must be exported and tested — `matchesInstructionPath` is reusable).
- `ROADMAP.md` has no row this migration falsifies (`ROADMAP.md:58-59` still holds). Add a scheduled row for the adoption visit (re-pin, repair, sweep, gates) until that visit closes, then remove the row. Do not leave a standing “propagation” feature row.

**`PROPOSAL.md` at acceptance:** retire it. It is the governing spec for this round. After landing, `guides/scaffold.md` is the living spec. Two homes for the same rule drift (`AGENTS.md` instruction-file law). Do not keep `PROPOSAL.md` as a second canon. A closed ROADMAP row can name the commit that implemented it.

### 10. Types-first order and units

No new public types. `ContentArtifact`, `HostArtifact`, `ManifestEntry`, `Group`, `Origin`, `Ownership` already admit this design. Types/constants/helpers first, then compiler, then server-test shadows, then policy, then prose.

**Exit criterion (campaign closes when all of these are true):**

- `stageHost` / `host.json` / `dist/host` still carry every current `HOST_PATHS` member, including instruction files.
- `nameToHostArtifacts` does not plan `INSTRUCTION_PATHS` members; it does plan the tool surface, `.claude/settings.json`, and `CATALOG_AGENT_PATH`.
- The compiled plan claims `AGENTS.md` and `CLAUDE.md` once each, as content-owned template pointers whose fallback paths exist on disk (`AGENTS.md`, `agents/orchestration.md` under `dist/host`).
- Vendored `tests/policy.test.ts` passes in a workspace whose `.agents/skills` and `.claude/rules` trees are absent, and still fails those trees in scaffold when they are present and wrong.
- `Materializer.catalog` succeeds on a freshly materialized target (catalog file present with markers).
- Guide, README, and TSDoc no longer describe instruction files as restored into targets.
- `PROPOSAL.md` is retired; ROADMAP records then closes the adoption visit.
- Adoption visit: re-pin, repair (writes pointers), manual sweep of leftover instruction trees, gates green.

---

## Alternatives

**Split on `Group` / add an `instruction` group.** Rejected. `Group` is a plan-selection axis (`--groups`) and a foreign-finding classifier (`planToFindings` uses `inferGroup`). Instruction vs tool does not align with it (`LICENSE` vs `AGENTS.md`; `scripts/` vs `.claude/rules`). A new group would also change CLI selection semantics for every existing caller.

**Stage pointer bytes as host files with `source` remapping, and/or extend `remove` to delete unused inventory destinations.** The remapping collides with canonical `destination: 'AGENTS.md'` or adds a parallel pointer tree in `dist/host` the fallback does not need. Extending `remove` would make leftover deletion a lasting write behavior rather than a visit. Template pointers plus a documented sweep match the contracts that already exist (`ContentArtifact`, repair of content, unmanaged ≠ deleted).

The chosen design wins because it changes plan membership and origin at the seams the code already has, leaves `host.json` as a byte inventory, and does not invent a discriminant `ManifestEntry` cannot carry.

---

## Units

One writer at a time. Later units do not start until the prior unit’s acceptance is green.

**Membership contract** — role `sol`, engine GPT-5.6 Sol. Owns `src/core/constants.ts` (`INSTRUCTION_PATHS`), `src/core/helpers.ts` (`matchesInstructionPath`, `selectHostPaths` composition), `src/core/compilers.ts` (`nameToHostArtifacts` filter and `CATALOG_AGENT_PATH` append), `tests/src/core/helpers.test.ts`, compiler tests/examples that claim `AGENTS.md` is host. Depends on nothing. Acceptance: `matchesInstructionPath` matches exactly the instruction members and their descendants; `nameToHostArtifacts('router')` contains `CATALOG_AGENT_PATH` and `.claude/settings.json` and does not contain `AGENTS.md`, `.agents/skills`, or `.mcp.json`; `HOST_PATHS` still lists those instruction members; `artifactsToQuestions` is not yet in play for pointers.

**Pointer artifacts** — role `implementer`, engine Opus 5. Owns `src/core/templates.ts` (pointer body), `src/core/compilers.ts` (emit helper), `src/core/Compiler.ts` `#draft` splice, tests that compile a blueprint and read `AGENTS.md` / `CLAUDE.md` content. Depends on membership contract (host copy gone from those paths). Acceptance: draft contains one artifact per pointer path, `origin: 'template'`, `ownership: 'content'`; body names `@orkestrel/scaffold`, sibling `../scaffold/AGENTS.md` and `../scaffold/.agents/orchestration.md`, fallback `dist/host/AGENTS.md` and `dist/host/agents/orchestration.md`; no `@` import syntax; compile does not report “Two artifacts claim AGENTS.md.”

**Server and fixture shadows** — role `sol`, engine GPT-5.6 Sol. Owns `tests/src/server/Materializer.test.ts`, `tests/setupServer.ts` remarks/fixtures that assume every `HOST_PATHS` path is planned, `tests/src/bin/CLI.test.ts` where repair/audit rows assume host `AGENTS.md`, `tests/distribution.test.ts` only if a packed assertion confuses plan with stage (stage assertions stay). Depends on membership + pointers. Acceptance: repair on a vacant target writes pointer bytes at `AGENTS.md`/`CLAUDE.md` and writes `CATALOG_AGENT_PATH` from the host; it does not write `.claude/rules/names.md`; `stageInventory` output remains byte-identical to committed `host.json` while `HOST_PATHS` is unchanged; `catalog` on a materialized target does not throw missing catalog file.

**Policy re-scope** — role `sol`, engine GPT-5.6 Sol. Owns `tests/policy.test.ts` membership assertions, a new non-`HOST_PATHS` proof file under `tests/` for scaffold-only family/rule presence, `tests/setupPolicy.ts` only if a helper is required (prefer assertion changes). Depends on membership (targets will lack those trees). Acceptance: a temporary workspace containing the vendored policy files and no `.agents/skills` / `.claude/rules` passes the vendored suite; this repository still fails if `orkestrel-falsify` or `.claude/rules/names.md` is missing; inspectors still fail twin-directory and rule-map negatives.

**Documentation and retirement** — role `implementer`, engine Opus 5. Owns `guides/scaffold.md` (groups, ownership, vendored data root), `README.md` cited passages, TSDoc remarks named above, `ROADMAP.md` adoption row, deletion of `PROPOSAL.md` (or replacement with a one-line pointer only if the Orchestrator forbids deletion). Depends on the code units so the guide describes shipped behavior. Acceptance: guide parity green; no remaining claim that repair restores `AGENTS.md` from host bytes; catalog path still documented as verb-owned.

**Verify** — role `verifier`, engine the harness cheap native tier. Owns no source. Depends on documentation. Acceptance: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, then the scoped tests those units name, with the recorded exit codes.

---

## Tensions

- Pointer fallback spelling (storage names vs “the same files under `dist/host/`”) vs `PROPOSAL.md:54-60` which writes one prefix for both trees. Objective constraint: storage names are what exist.
- Keeping `.claude/settings.json` in targets vs treating all of `.claude/` as instruction. Settings is tool-read and hook wiring, not memory; the subjective lane can still prefer a smaller target `.claude/`.
- Catalog file stays in targets while sibling role files leave. Required by `#rewrite`; the subjective lane may want catalog to create the file and drop host planning entirely.
- Manual sweep vs teaching `remove` to treat unused inventory destinations as foreign. Objective law prefers unmanaged + visit; operators will not see leftovers on `audit`.
- Bare Codex/Cursor sessions without attached scaffold lose project bridges. The proposal’s session model attaches scaffold; a target-only session is a degraded mode.

---

## Risks

- **Fallback Read misses.** Evidence that settles it: list `dist/host` after `stageHost` and confirm `AGENTS.md` and `agents/orchestration.md` (not `.agents/orchestration.md`). Pointer tests must Read those storage paths.
- **Canonical `AGENTS.md` still says “read `.claude/rules/`” cwd-relative.** After a Read of `../scaffold/AGENTS.md` or the packaged copy, an agent may look for rules under the target. Settled by: intended session attaches scaffold so those paths resolve in scaffold’s root (`PROPOSAL.md:65-67`); pointer and dispatch briefs name scaffold-rooted files. Cloud `--add-dir` memory loading remains the standing unknown (`PROPOSAL.md:125-129`); do not make the code change depend on `claudeMdExcludes`.
- **`catalog` throws on `new` workspaces** if `CATALOG_AGENT_PATH` is omitted. Settled by a `new` then `catalog` test on a real temp target.
- **Leftover instruction trees stay invisible to `audit`/`overwrite`.** Settled by the visit checklist and by policy failing on a half-swept rules directory with a pointer `AGENTS.md`.
- **Fleet packages reading `dist/host` as a checkout mirror** (dotted paths). Distillate consumers are scaffold internals (`readHostFloor`, `Materializer`, CLI overlay). Whether another target reads `dist/host` paths other than via `audit`/`repair`/`catalog` is unknown and not load-bearing if the pointer uses storage names and sessions attach scaffold.
- **`tests/config.test.ts` byte-identity** breaks only if `HOST_PATHS` or staged bytes change. This design does not change staging membership; if a unit edits `HOST_PATHS`, that unit must regenerate `host.json`.

[exited with code 0]
