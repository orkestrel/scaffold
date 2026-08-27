Lane held: **objective** (correctness, constraints, and what the code and contracts actually permit). Recorded substitution for GPT-5.6 Sol; engine is Cursor Grok.

---

## Design

### 1. The `.claude/agents` split

**Lists.** Put `.claude/agents` in `CANON_PATHS` as the directory member. Put `CATALOG_AGENT_PATH` (`.claude/agents/orkestrel.md`) in `HOST_PATHS` as an explicit file, replacing today’s directory entry. `nameToHostArtifacts` stays a map over `selectHostPaths(HOST_PATHS, name)` (`src/core/compilers.ts:1545-1551`); the catalog file is planned because it is a host member, not because the compiler grows a special case.

The other swept paths follow the same pattern: drop them from `HOST_PATHS` and add them to `CANON_PATHS`. Use directory members where the whole tree is canon and nothing under it stays planned: `.codex` and `.cursor` each as one directory (they currently split into `.codex/agents` + `.codex/config.toml` and `.cursor/mcp.json` + `.cursor/rules`). Keep `.mcp.json` as a file member. Do not add `.claude` as a directory: `.claude/settings.json` stays host (`src/core/constants.ts:129`), and `.claude/rules` / `.claude/skills` are already canon members.

**Staging constraint this shape hits.** `stageHost` walks `[...HOST_PATHS, ...CANON_PATHS]` and then refuses two claims on one storage name (`src/server/helpers.ts:1417-1476`). A HOST file that also sits under a CANON directory is discovered twice as the same destination, hence the same storage, and the current guard treats that as a collision. Teach the stager to union by destination (same file seen twice is one entry). Leave the storage collision guard for two *different* destinations that fold to one storage name. Walk order already puts `HOST_PATHS` first; keeping the first sighting is enough.

**Invariant restatement.** Keep “`HOST_PATHS` and `CANON_PATHS` share no string.” Drop “no host-origin artifact claims a canon path” as a universal. The lists stay string-disjoint; the *plan* carries two deliberate overlaps, both subtracted from the advisory:

- Template-origin pointers at the `AGENTS.md` and `CLAUDE.md` canon *file* members (`blueprintToDocumentArtifacts`, `src/core/compilers.ts:1469-1482`).
- A host-origin presence artifact at `CATALOG_AGENT_PATH`, which sits under the `.claude/agents` canon *directory* member.

The overlay sentence that says a path in both lists would be “copied into a target as a host artifact and refused by the overlay” (`src/core/constants.ts:175-177`) is about *string* membership driving a live fetch that `filesToHost` then ignores. The catalog file is not in both lists. It is already dropped from the fetch and kept on floor bytes because it is deferred (`src/bin/CLI.ts:639-640`, `src/server/helpers.ts:1228-1230`). After the move `isCanonPath` is also true for it; that is a second reason for the same overlay behaviour, not a new one.

**What `isCanonPath('.claude/agents/orkestrel.md') === true` must not break.**

- **Fetch filter.** It already drops `isCanonPath` destinations. The catalog file is already dropped as `isDeferredPath`. Double-drop is correct. Do not fetch it as host-owned.
- **Hydration.** `#expand` resolves a planned host artifact from the staged manifest by destination (`src/server/Materializer.ts:588-604, 656+`). Presence ownership still restores absence only. Do **not** skip host-origin expansion because `isCanonPath` is true; that would make `catalog()` unable to read a file `new` never wrote.
- **Disjointness tests.** `HOST_PATHS.filter(isCanonPath)` (`tests/src/core/helpers.test.ts:151`) becomes false for the catalog file and must be rewritten to “lists share no string” plus “the catalog file is the one host member `isCanonPath` admits.”
- **`#roots` / foreign drift.** `#roots` only adds host-origin *directories* the plan expands (`src/server/Materializer.ts:639-653`). A planned *file* under `.claude/agents` does not add that directory as an owned root. Leftover role files therefore stay out of `planToFindings`. Do not extend `#roots` to canon directories: that would reclassify leftovers as `foreign` drift and make `audit` fail on them. Owner-fixed: the `canon` question stays the non-blocking preview. `types.ts` currently says `foreign` is also the set `overwrite` deletes from (`src/core/types.ts:47-49`); that remark becomes incomplete and must be scoped to host-root strays.

**Keep the catalog file planned. Do not teach `catalog` to skip on absence.** `Materializer.catalog` → `#rewrite` throws `TARGET` when the file is not readable text (`src/server/Materializer.ts:380-389, 945-954`) and does not create it. `isDeferredPath` already keeps it presence-owned so `repair` restores absence and `catalog` owns only the marked region. Skip-on-absence would leave every fresh workspace without a table and make `catalog` a silent no-op. That is the material defect. The owner-fixed keep is the shape the existing `catalog` contract requires.

### 2. The advisory’s subtraction

Generalize `#canonQuestion` from `blueprintToDocumentArtifacts` paths (`src/bin/CLI.ts:1424-1428`) to **every path the compile plans** (hydrated plan artifact paths, which include the pointer pair *and* `CATALOG_AGENT_PATH`). `README.md` stays inert: it is planned and not a `CANON_PATHS` member.

**Naming rule**, applied per `CANON_PATHS` member that exists on the target’s filesystem:

- If the member itself is planned (`AGENTS.md`, `CLAUDE.md`): do not name it.
- If the member is a file and is not planned (`.mcp.json`): name the file.
- If the member is a directory and **no** planned path equals it or sits under `${member}/`: name the directory (current “whole tree goes” behaviour, `src/bin/CLI.ts:1411-1413`). `.claude/rules`, `.agents/skills`, `.codex`, `.cursor` are this case.
- If the member is a directory and a planned path sits under it: **do not name the directory.** Name each unplanned child that exists (file or subdirectory). Naming `.claude/agents` would tell a maintainer to `git rm -r` the catalog file; naming the directory *and* the children still names the directory. The unplanned children are the only list that is safe to delete by hand and that `overwrite` will actually take.

The message’s “plans nothing at those paths” clause stays true of whatever it names, because planned paths have been subtracted. Rewrite the “no verb writes or deletes” clause: `overwrite` now deletes the named leftovers; `repair` still does not; `audit` still only reports.

`#targetQuestions` still appends this only when `writing` is false (`src/bin/CLI.ts:1457-1461`), still non-blocking, still `docs` + `orchestration`. Writing verbs still do not refuse on it.

One exported server helper should enumerate unplanned canon *files* present under a target, given the planned path set. The question collapses that enumeration to the naming rule above. `remove` uses the file enumeration. Two algorithms here is how the directory would get named for wholesale deletion again.

### 3. The `overwrite` sweep

**Candidate set (new, beside foreign findings, not through them).** Tracked files that are unplanned canon copies: every file the helper in (2) names, minus planned paths, minus `matchesProtectedPath`, minus anything git does not track. Recurse into a canon directory member; spare a planned file inside it. Do not unlink the directory as a unit.

Compose with existing `Materializer.remove` (`src/server/Materializer.ts:449-476`): keep the foreign-finding loop (tracked, not protected, `drift === 'foreign'`, under expanded *host* roots). Union the canon-file set into `removals`. Deduplicate paths. `#reconfirmCandidates` stays a foreign-finding preview check; canon leftovers are not findings and must not be stuffed into the audit for this purpose.

**Protection list.** `matchesProtectedPath` still refuses `src`, `app`, `src/…`, `app/…`, and git metadata (`src/server/helpers.ts:129-134`). Apply it to the canon set as well. Canon leftovers are not under those prefixes; the guard is the same caller-plan safety net.

**Git law unchanged.** Dirty tree refused unless `--dirty` (`src/bin/CLI.ts:457-462`). Untracked leftovers stay on disk (`tests/src/bin/CLI.test.ts:4279-4295` already pins this for host-root strays). `src/` and `app/` untouched.

**`--groups`.** The fleet visit runs ungrouped overwrite. Leftover `.claude/rules` after the pointer is in place reds `inspectPolicyRuleMap` (`tests/setupPolicy.ts:1653-1678`; wave.md already records this). Narrowing the canon sweep to the selected groups would leave that red on a configs-only run. The sweep is part of overwrite’s destructive half and is **not** `--groups`-narrowed. Foreign deletion stays plan-scoped as today.

**Order already right.** `#replace` repairs, then removes, then catalogs (`src/bin/CLI.ts:482-500`). Repair restores a missing catalog file and drifted pointers *before* deletion; deletion then cannot take them; `catalog()` still has a file to rewrite.

**Report.** Same `MaterializeResult.removed` and the existing tally line (`src/bin/CLI.ts:1719-1721`). No new result field. Terminal audit from `#appendQuestions` after the write: if every tracked leftover is gone, the `canon` question is absent; if an untracked leftover remains, the question still names it and `removed` does not list it.

**Negative controls.**

- Planned `AGENTS.md` / `CLAUDE.md` pointers: never in `removed`; still present.
- `CATALOG_AGENT_PATH`: never in `removed`; still present; markers still rewritable.
- Untracked file under a canon directory: left on disk; question may still fire.
- Tracked role file under `.claude/agents`: removed; catalog file kept.
- Tracked `.claude/rules`, `.codex/**`, `.cursor/**`, `.mcp.json`: removed.
- `repair` on the same tree: leftovers remain; question remains; exit not refused on it (`tests/src/bin/CLI.test.ts:2503+`).
- `audit` on leftovers: `canon` question, **not** a `foreign` finding.
- `src/**` and `app/**`: never in `removed`.

### 4. The `probe` server in targets

After the sweep a target has no project `.mcp.json` and no `.cursor/mcp.json`. `.claude/settings.json` (kept) still sets `enableAllProjectMcpServers: true` and still allows `mcp__probe__prove` (`.claude/settings.json`). That flag enables servers the project `.mcp.json` registers. With no such file, the allow-list entry is inert.

The `prove` tool in `.claude/rules/quality.md` is the MCP tool the `probe` server registers. Scaffold’s own `.mcp.json` points at `node_modules/@orkestrel/probe/dist/bin/main.js` — a path resolved in **that workspace**. A scaffold-primary session (cwd = this checkout, verbs aimed with `--target`) keeps that registration and can `prove` claims about *scaffold’s* TypeScript projects. It cannot aim `prove` at a fleet target’s projects without opening a session in that target.

A target still receives `@orkestrel/probe` as a generated devDependency and the `test:probe` / `test:bench` scripts. Those are Vitest projects, not the MCP `prove` tool.

**Limit:** after the sweep, the MCP `prove` instrument is scaffold-session-only (plus any workspace that locally registers the server). A target must keep nothing for it. Bare-target Claude Code / Cursor sessions lose project MCP registration for `probe` and for `codex mcp-server`. That is owner-fixed by moving `.mcp.json` and `.cursor/mcp.json` into the canon.

### 5. Codex and Cursor sessions on scaffold

Scaffold’s executable never reads a target’s `.codex/*` or `.cursor/*` to run its own session. Those trees are host artifacts today: `nameToHostArtifacts` plans them, hydration copies them, `#roots` expands `.codex/agents` and `.cursor/rules` so strays become `foreign` (`tests/src/bin/CLI.test.ts` stray cases). After the sweep they are unread leftover canon, deleted by (3).

Policy: `POLICY_PORTABILITY_GLOB` includes `{.agents,.claude,.codex,.cursor,.github}/**/*` (`tests/setupPolicy.ts:272-277`). That is a population glob over paths that exist; it does not require those trees. `inspectPolicyWorkspace` on a pointer-only fixture that plants `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`, and `.claude/agents/orkestrel.md` — and plants no `.codex`, `.cursor`, or `.mcp.json` — already expects no violations (`tests/policy.test.ts:522-552`). No inspection binds `.codex` / `.cursor` presence.

**Assumption (brief unknown):** a Codex or Cursor session opened *in* a fleet target, not through a scaffold-primary session, is degraded after the sweep (no vendored roles, no project MCP, no Cursor rule). Unmeasurable from this checkout.

### 6. Documentation and parity

**Owns.**

- `guides/scaffold.md`: opening split (`:15-21`); groups table orchestration row that still names `.mcp.json` as vendored (`:925`); “No group carries the instruction canon / no host-origin artifact claims a `CANON_PATHS` member” (`:927-931`); vendored-data-root membership and disjointness (`:1171-1193`); “Moving a path from `HOST_PATHS` to `CANON_PATHS`” including “no verb writes or deletes that copy” (`:1206-1210`); `canon` question paragraph (`:689-703`); Limits “No verb removes a superseded instruction copy” (`:1502-1510`).
- `README.md` opening split and the `overwrite` / `catalog` verb prose (`:10-15, :71-90`).
- `.agents/skills/orkestrel-publish/references/wave.md` visit step that still runs `git rm -r` after overwrite (`:16-22`). Collapse the visit to re-pin, `scaffold overwrite`, gates (then the existing range-verify / format / gates / dist compare). Delete the claim that no scaffold verb deletes those copies.
- `ROADMAP.md` scaffold row (`:15-20`): same visit collapse; trigger remains the scaffold release that ships the split.
- `src/core/types.ts` `foreign` / overwrite remarks; `src/core/constants.ts` / `nameToHostArtifacts` remarks; `#canonQuestion` comment; `tests/setupServer.ts` `STAGED_PATHS` / `HOST_DIRECTORY_PATHS` / `buildFleetManifest` remarks (`.claude/agents` stays a staged directory via `CANON_PATHS`, while `buildFleetManifest` walks `HOST_PATHS` and must emit the catalog *file*, not expand the directory).
- Guide parity: surface tables already list `CANON_PATHS` / `HOST_PATHS` / `isCanonPath` / `nameToHostArtifacts`; remarks and Limits are the rows that go false. `host.json` membership digest moves with the staged set (`tests/config.test.ts` byte-identity).

**Limits rewrite (verb split).** `audit` reports leftover canon and deletes nothing. `overwrite` deletes tracked unplanned canon copies in the same run that repairs pointers, and does not delete planned pointers or the catalog file. `repair` never deletes. Untracked leftovers stay a git-hygiene matter; the question remains until they are gone.

### 7. Units and order

Serial writers in the main checkout. Membership+staging must land in one unit: changing the lists without the stager union refuses the build (`Two vendored paths claim the storage name`). Verbs depend on the new lists. Docs depend on shipped verb semantics.

**Exit criterion.** This follow-up is closed when: the swept wiring paths are canon and a target is not planned to hold them; `CATALOG_AGENT_PATH` remains planned, presence-owned, and `catalog()` still requires it; `isCanonPath` is true for that file and fetch/hydration/advisory/deletion all honour the restated overlaps; `overwrite` on a dirty-waived git target deletes every tracked unplanned canon copy and leaves pointers, the catalog file, untracked leftovers, and `src/`/`app/` alone; `repair` still never deletes; `audit` still only previews, never as `foreign` drift; wave/ROADMAP/guide Limits describe re-pin → `overwrite` → gates; gates on this checkout are green.

---

## Alternatives

**Compiler-specialized catalog file (not in `HOST_PATHS`).** `CANON_PATHS` holds `.claude/agents`; `nameToHostArtifacts` appends `CATALOG_AGENT_PATH` by itself. Staging walks the directory once, so the stager needs no dest-union. Cost: host membership is no longer “whatever `HOST_PATHS` names”; the keep-set lives in the compiler. Reject unless the dest-union is judged too sharp: the owner-fixed keep is host membership, and `nameToHostArtifacts` is already the HOST map.

**Feed leftovers through `#roots` so they become `foreign`.** Then existing `remove` would take them with no second candidate set. Cost: `audit` would report them as drift (`EXIT_DRIFT`) and the `canon` question would duplicate that. Owner-fixed: the question stays the read-only preview and `repair` still never deletes. Reject.

---

## Units

**membership-staging.** Role `sol` (Claude) / `implementer` (Codex); engine GPT-5.6 Sol (objective, list and stager law). Owns `src/core/constants.ts`, `src/core/compilers.ts` remarks for `nameToHostArtifacts`, `src/server/helpers.ts` (`stageHost` dest-union), `tests/src/core/helpers.test.ts`, `tests/src/server/helpers.test.ts`, `tests/setupServer.ts` (`HOST_DIRECTORY_PATHS`, `STAGED_PATHS`, `buildFleetManifest`), regenerated `host.json`. Shared: none (report-only comments in the guide). Off-limits: verb behaviour, guide Limits. Depends on nothing. Acceptance: lists share no string; `HOST_PATHS` contains `CATALOG_AGENT_PATH` and does not contain `.claude/agents` or the swept wiring paths; `CANON_PATHS` contains `.claude/agents` and the swept wiring paths; `isCanonPath(CATALOG_AGENT_PATH)` is true and `isCanonPath('.claude/settings.json')` is false; `nameToHostArtifacts('router')` plans the catalog file and plans none of the swept paths; `stageHost` on this checkout succeeds; committed `host.json` matches a fresh stage; a fixture that plants two *different* destinations folding to one storage still refuses.

**canon-verbs.** Role `sol` / `implementer`; engine GPT-5.6 Sol. Owns the shared superseded-canon enumerator (`src/server/helpers.ts` or a new centralized server helper plus tests), `src/server/Materializer.ts` `remove`, `src/server/types.ts` remarks, `src/core/types.ts` `foreign` remarks, `src/bin/CLI.ts` (`#canonQuestion`, `#replace` comments, message text), `tests/src/server/Materializer.test.ts`, `tests/src/bin/CLI.test.ts`. Depends on **membership-staging**. Acceptance: `audit` on a target holding `.claude/rules/names.md` plus the pointer pair raises non-blocking `canon` and reports no `foreign` finding for that file; the message names `.claude/rules` and does not name `AGENTS.md`, `CLAUDE.md`, or `.claude/agents`; a target whose `.claude/agents` holds the catalog file plus `planner.md` names `planner.md` (or that child) and does not name `.claude/agents`; `repair` leaves those leftovers; `overwrite --dirty` on a git target removes tracked leftovers including `planner.md` and `.mcp.json` and keeps the pointers, `CATALOG_AGENT_PATH`, untracked leftovers, and `src/` / `app/`; terminal audit after that overwrite has no `canon` question when every leftover was tracked; dirty tree without `--dirty` still refuses; `catalog` still throws when the catalog file is absent.

**canon-docs.** Role `implementer`; engine Opus 5 (guide voice, Limits, wave). Owns `guides/scaffold.md`, `README.md`, `.agents/skills/orkestrel-publish/references/wave.md`, `ROADMAP.md`, and any remaining remarks in files the prior units did not take. Depends on **canon-verbs**. Acceptance: the `canon` paragraph and Limits state the verb split in (6); the groups / disjointness / move-to-canon paragraphs name the two plan overlaps and no longer say no host-origin artifact claims a canon path; wave visit has no separate `git rm` step and no “no scaffold verb deletes” sentence; ROADMAP scaffold row matches that visit; `tests/guides.test.ts` parity is green for the owned guide.

Dispatch **canon-docs** only after **canon-verbs** is integrated. Independent `verifier` runs `format:check`, `lint:check`, `check`, `build`, and `test` on the committed tree after the last writer.

If Codex is still dark at dispatch, the Orchestrator records the Sol-dark substitution and runs the Sol units on Opus 5 `implementer`; do not collapse them into the docs unit.

---

## Tensions

- `isCanonPath` as “the one reading of canon membership” (`src/core/helpers.ts:201-204`) stays true and now returns true for a planned host file. Every consumer that treated `isCanonPath` as “unplanned, never hydrate” is wrong; only fetch overlay and the advisory/deletion helper may treat it as “staged for reading.” Hydration and `nameToHostArtifacts` must keep planning that one file.
- `overwrite --groups` currently narrows foreign deletion via the plan, but the canon sweep is ungrouped. That is a real operator surprise. It is the only way a single ungrouped `overwrite` (the fleet visit) also closes the policy-red leftover-rules case.
- Dest-union in `stageHost` is a new law next to storage collision. Tests must keep a negative control that two *different* destinations claiming one storage still refuse, or the union will swallow a real collision.

---

## Risks

- **Untracked leftovers** keep the `canon` question alive after overwrite. Wave/guide must not claim the question always goes quiet after one overwrite; it goes quiet when no named path remains on disk. Untracked files are git hygiene, same as today.
- **Bare-target MCP / Codex / Cursor** degrade by construction. If a fleet repo’s day-to-day work is a session opened in that repo, losing `.mcp.json` and `.codex/*` / `.cursor/*` is a product change the keep-set does not compensate for. This checkout cannot measure that use.
- **`buildFleetManifest` vs `createCheckout`.** Fleet manifests walk `HOST_PATHS` only (`tests/setupServer.ts:1136`). After the split they must not still treat `.claude/agents` as a host directory. A missed fixture split will fail expansion tests or silently re-plan role files.
- **Policy `inspectPolicyRuleMap`** still reds any leftover `.md` under `.claude/rules` once `AGENTS.md` is the pointer. If overwrite’s canon sweep misses a nested or ignored file the glob does not list, gates stay red. The enumerator must recurse the same way `listFiles` does for host roots, not only direct children (the policy inspector itself is direct `.md` children; deletion should still take nested tracked files so they cannot sit unmanaged).
