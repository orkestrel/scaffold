**1. CONFIRMED**  
Attack that failed: treat `.claude/settings.json` (HOST) as sitting under `.claude/agents` / `.claude/rules` / `.claude/skills` (CANON), and treat a CANON directory as sitting under a HOST file. Neither list member equals or is a prefix of a member of the other (`src/core/constants.ts:130-151`, `:186-201`; `isCanonPath` is prefix-to-segment, `src/core/helpers.ts:219-221`). The disjointness pin is the same check in both directions (`tests/src/core/helpers.test.ts:155-161`). HOST members are all files. Staging walks `[...HOST_PATHS, ...CANON_PATHS]` (`src/server/helpers.ts:1418`). `host.json` holds the file members as destinations (including `.mcp.json`, `.codex/config.toml`, `.cursor/mcp.json`, `.claude/agents/orkestrel.md`) and the directory members as `roots` (including `.claude/agents`, `.codex/agents`, `.cursor/rules`).

**2. CONFIRMED**  
Attack that failed: a fourth canon-claiming artifact, or catalog/repair dropping the file. A compiled plan’s canon paths are exactly `AGENTS.md:template`, `CLAUDE.md:template`, `.claude/agents/orkestrel.md:host` (`tests/src/core/Compiler.test.ts:107-115`). Pointers are `docs` / `template` / `content` (`tests/src/core/compilers.test.ts:1756-1765`). The catalog file is `orchestration` / `host` / `presence` (`:1786-1791`). `catalog` reads the file and refuses when it is not readable text (`src/server/Materializer.ts:988-996`, `:390-399`). Repair writes the path when it is missing (`tests/src/server/Materializer.test.ts:799-815`; `tests/src/bin/CLI.test.ts:4066-4089`).

**3. CONFIRMED**  
Attack that failed: the planned catalog file under the same directory as a leftover becoming `foreign`; a `--groups tests` run still reporting an orchestration leftover. `#canon` lists files held at `CANON_PATHS` members and keeps those whose `inferGroup` is in `plan.groups` (`src/server/Materializer.ts:666-676`). `planToFindings` never assigns `foreign` to a path in the planned set (`src/core/compilers.ts:2182-2191`). The catalog file stays `aligned` beside `.claude/agents/planner.md` as `foreign` (`tests/src/server/Materializer.test.ts:716-753`). A tests-scoped plan reports no foreign leftover; the same target under a full plan reports `.claude/rules/names.md` (`:762-789`; `tests/src/bin/CLI.test.ts:2504-2542`). Empty leftover directories are not files; the comparison is file-level (`guides/scaffold.md:692-695`), and git does not track them.

**4. CONFIRMED**  
Attack that failed: a leftover whose bytes match the staged canon being spared; the catalog file in the swept directory being deleted; `NOTES.md` / `src/` being taken. `remove` selects `drift === 'foreign'`, then tracked and not protected — no hex compare (`src/server/Materializer.ts:484-491`). `matchesProtectedPath` covers `src/` and `app/` (`src/server/helpers.ts:129-133`). Probe record `.orkestrel/scaffold/probe-sweep.md`: one `overwrite --offline` reported `3 removed`, `0 of 34 planned paths drifted`; after the run `.claude/agents` held only `orkestrel.md`; offline re-audit exited 0. The CLI pin lists the leftovers in `removed`, keeps consumer catalog prose and the rewritten table, keeps `NOTES.md`, and a second audit exits 0 (`tests/src/bin/CLI.test.ts:4480-4513`).

**5. CONFIRMED**  
Attack that failed: `repair` calling `remove`, or `--dirty` widening which paths are eligible. `repair` iterates hydrated artifacts and writes only `missing` / `stale`; `#apply` always returns `removed: []` (`src/server/Materializer.ts:301-325`, `:1017-1037`). CLI: leftover still on disk, `removed` empty, terminal audit still `foreign` (`tests/src/bin/CLI.test.ts:2551-2578`). Dirty refusal is still `worktree.dirty.length > 0 && command.dirty !== true` (`src/bin/CLI.ts:454-458`); the waiver still passes `{ tracked, dirty: [] }` into `remove` and does not change eligibility (`:486-492`).

**6. CONFIRMED**  
Attack that failed: a remaining `canon` question field, or the fetch/overlay filters dropping the canon clause. No `field: 'canon'` / `#canonQuestion` remains in `src/`. `#targetQuestions` only raises `setup` on a non-writing run (`src/bin/CLI.ts:1420-1424`). Fetch still drops `isCanonPath` and `isDeferredPath` (`:639-640`). `filesToHost` still keeps floor bytes for both (`src/server/helpers.ts:1222-1232`). The catalog file is both canon and deferred; excluding it twice does not revive an advisory.

**7. CONFIRMED**  
Attack that failed: an entry added, removed, or reordered in `host.json`. `tmp/units/a2.diff` for `host.json` changes only the digests of `.agents/skills/orkestrel-publish/references/wave.md`, `.claude/agents/orkestrel.md`, `.claude/rules/quality.md`, `guides/scaffold.md`, and the inventory membership digest.

**8. BROKEN**  
Failing input: a pre-split target that already holds `.claude/agents/orkestrel.md` (presence-owned after hydration because `isDeferredPath` is true, `src/core/helpers.ts:189-191`; `src/server/Materializer.ts:723-725`) whose body still says `Read \`.agents/orchestration.md\` first` — the sentence W6 replaced in the floor (`tmp/units/a2.diff` on `.claude/agents/orkestrel.md`). One `overwrite` run repairs the content-owned pointers, `#recatalog` replaces only the marker-bounded table (`src/server/Materializer.ts:1178-1186`), `inferDrift` returns `aligned` for a present presence artifact (`src/core/helpers.ts:517`), and `#canon` deletes tracked `.agents/orchestration.md` as foreign. After the visit the planned catalog file still names a path the target no longer holds.  
Smallest fix: make the resolution instruction ride the visit without taking consumer prose — a second marked region `catalog`/`repair` rewrites, or a one-time visit step that restores the floor body only when that stale sentence is present — rather than relying on presence + table-only rewrite.

**9. CONFIRMED**  
Attack that failed: a remaining “no verb removes a superseded copy” / `canon` question sentence, or the visit still naming a separate `git rm` step. Guide, README, ROADMAP, and `wave.md` state repair vs overwrite vs catalog; Limits states the ignored-file standing finding (`guides/scaffold.md:1509-1518`); `quality.md:63` states registration outside the tree. ROADMAP’s exit-0 line names only tracked copies and points at `wave.md`, which qualifies the ignored case (`wave.md:15-22`).

**10. CONFIRMED**  
Attack that failed: `any` / `as` / suppressions in added `src/`; a public export without a barrel; a count over a growable set in added prose. `#canon` is a private method. `isCanonPath` / `CANON_PATHS` / `CATALOG_AGENT_PATH` were already barrel-exported (`src/core/index.ts` re-exports helpers and constants). Added guide/README/wave/quality sentences do not tally a growable set. The `#canon` group filter is an anonymous callback passed as an argument.

**11. BROKEN**  
Failing input: the same pre-split target as claim 8. W6 rewrote the catalog floor’s resolution instruction because a target will not hold `.agents/` (`tmp/units/a2.diff` on `.claude/agents/orkestrel.md`). That file is the one a dispatched `orkestrel` role reads, and it is the one presence + marker-only `catalog` do not refresh. Content-owned `AGENTS.md` is repaired; the role file is not. Membership, deletion, and pointer repair are one design; the catalog-file ruling is not on that visit. Same smallest fix as claim 8.

**Findings outside the claims**  
None.

```text
VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
```
