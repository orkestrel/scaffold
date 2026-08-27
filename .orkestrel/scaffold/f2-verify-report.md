1. **Each A2 finding’s named location is fixed, and the false sentences are gone — CONFIRMED.**
   Attack: grep the live tree (`src/`, `tests/`, `guides/`, `README.md`, `.agents/`, `.claude/`) for the A2 strings, then require each verdict location to appear as a deletion or replacement in `tmp/units/f2.diff`.
   - Claim 8/11 catalog body: `.agents/skills/orkestrel-publish/references/wave.md:18-23` adds the delete-then-commit line; probe addendum in `.orkestrel/scaffold/probe-sweep.md` recorded that path.
   - Claim 9: `guides/scaffold.md:1226-1230`, `src/server/helpers.ts:1239-1243`, `tests/setupServer.ts:1113-1118` and `:1136-1138` no longer contain “the one canon path a plan does claim is deferred”.
   - Claim 10 residue: `src/core/constants.ts:163-168` — the line “These facts fix what a target holds at one of these paths.” is absent (diff deletes it).
   - Claim 10 comments: `tests/src/bin/CLI.test.ts:2461` is “for reading,” (no `now`); `:2548` is “most often lost” (no `easy`).
   - Claim 10 extraction: `src/server/Materializer.ts` has no `#canon(`; `src/server/helpers.ts:864-875` holds `listCanonPaths`.
   - Claim 11 / findings D, F: `.claude/agents/orkestrel.md:12-16` has no “this repository’s `AGENTS.md` file directs”; `.agents/orchestration.md:164-169` scopes roles to scaffold; `guides/scaffold.md:1523-1530` is the target-loss entry; `README.md:10-13` calls the scripts bench probes.
   - Finding A (`--dirty`): `wave.md:24-29`.
   - Exit-code referral: `tests/src/bin/CLI.test.ts:4558-4559` and `:4618-4619`.
   - Orchestrator residue: `tests/src/core/helpers.test.ts:340-343` no longer has “the one canon path”. Zero hits for that phrase, the residue line, the old catalog opening, or the swept `now`/`easy` comments outside reports.

2. **Extraction is behavior-identical; the leaf stays class-free; the group-filter control is real — CONFIRMED.**
   Attack: treat a missing `groups.includes` as the intended break, and treat `.claude/settings.json` as a group-only false positive.
   - Removed `#canon` body in the diff and `listCanonPaths` at `src/server/helpers.ts:864-875` are the same walk (`CANON_PATHS` → `resolveContainedPath` → `isPhysicalFile` / `isPhysicalDirectory`+`listFiles` → `held.filter`). `#derive` at `src/server/Materializer.ts:649` passes `plan.groups`.
   - `src/server/helpers.ts` exports only functions (no `class`, no `Materializer` import). `src/server/index.ts:4` already star-exports `./helpers.js`.
   - Group filter: `tests/src/server/helpers.test.ts:883-897` — `AGENTS.md` under `docs`, `.agents/orchestration.md` under `orchestration`, neither under `tests`. Dropping the filter would list both on the `docs` and `tests` calls (`inferGroup` at `src/core/helpers.ts:247-259`).
   - Membership control: `:870-877` writes `.claude/settings.json`, which `matchesOrchestrationPath` accepts (`.claude/` in `ORCHESTRATION_PATH_PREFIXES` at `src/core/constants.ts:245-251`) so `inferGroup` is `orchestration`, while `isCanonPath('.claude/settings.json')` is false (`src/core/helpers.ts:215-216`). A group-only walk of the tree would list it; the expected array does not.

3. **Rewritten sentences match the fetch filter, `filesToHost`, roles, Limits, and the wave steps — CONFIRMED.**
   Attack: find a fetched canon destination; find a target that receives a role/bench/MCP file from the plan; find `--dirty` deleting an untracked `.claude/rules` copy or `repair` leaving a missing catalog file unrestored.
   - Fetch: `src/bin/CLI.ts:639-640` drops `isCanonPath` and `isDeferredPath`. `filesToHost` at `src/server/helpers.ts:1267-1275` never `held.set`s a canon path and always takes `floor.bytes` for one. Pointers are template artifacts (`src/core/compilers.ts:1470-1483`); the catalog file is presence-owned (`nameToHostArtifacts` at `:1553-1558`, hydrate via `#presence` when `isDeferredPath`).
   - Roles: `.agents/orchestration.md:164-169` requires role files only in the scaffold checkout. A fleet plan claims `CATALOG_AGENT_PATH` (`.claude/agents/orkestrel.md` at `src/core/constants.ts:277`) and not `.claude/agents/planner.md` or `.codex/config.toml` (`CANON_PATHS` at `:184-199` vs `HOST_PATHS` at `:130-151`).
   - Limits (`guides/scaffold.md:1523-1530`) names the same set the verbs write: pointers + catalog file; `repair` restores missing presence (`Materializer.ts:296-299`, `:317-322`); `catalog` rewrites only the marker region (`:385-386`, markers at `.claude/agents/orkestrel.md:44`).
   - Wave migration: presence ownership skips a present stale body; deletion is required. `overwrite` calls `repair` then `catalog` when online (`CLI.ts:479`, `:496-499`). Dirty waiver: `--dirty` passes `dirty: []` into `remove` (`CLI.ts:489-492`) but `remove` still deletes only `state.tracked` (`Materializer.ts:481-488`), so an untracked `.claude/rules/names.md` remains. Policy: `inspectPolicyWorkspace` → `inspectPolicyPortability` → `inspectPolicyRuleMap` (`tests/setupPolicy.ts:1943-1950`, `:1929-1930`, `:1653-1668`); a pointer `AGENTS.md` has no rule-map rows, so a file under `.claude/rules` violates “the rule map names every rule file”. Probe addendum: delete + `repair --offline` restored the both-reader floor body.

4. **`host.json` moved only the staged edited files plus membership — CONFIRMED.**
   Attack: every path `tmp/units/f2.diff` edits, checked against `host.json` destinations; every digest line in the `host.json` hunk, checked against that set.
   Staged destinations the diff actually edits: `.agents/orchestration.md`, `.agents/skills/orkestrel-publish/references/wave.md`, `.claude/agents/orkestrel.md`, `guides/scaffold.md`. The hunk changes exactly those four `digest` fields and the trailing membership `digest` (`host.json:25`, `:247`, `:316`, `:655`, `:745`). `README.md` is edited and has no `host.json` row. `AGENTS.md` / `CLAUDE.md` are host destinations and have no hunk (unchanged). Source and test files are not host destinations.

5. **New CLI exit assertions bind the pinned offline-catalog refusal — CONFIRMED.**
   Attack: a vacuous `await execute(...)` with no bound return, or `code === EXIT_DRIFT` that could equally be the foreign `.mcp.json` / leftover finding.
   - Both cases capture `const code = await …execute(…)` (`tests/src/bin/CLI.test.ts:4542-4550`, `:4604-4613`).
   - `#offline` always sets `note: "The catalog step did not complete: USAGE: 'catalog' does not take --offline."` (`src/bin/CLI.ts:545`). `#replace` returns `EXIT_DRIFT` when `online.note !== undefined` *before* `auditToExit` (`:514-515`). `EXIT_DRIFT` is `1` (`src/bin/constants.ts:34`).
   - `expect(result.note ?? '').toContain("USAGE: 'catalog' does not take --offline")` fails on the `?? ''` fallback. The git-ignored case also asserts no `"error"` envelope and a foreign `.mcp.json` still standing (`:4553-4566`), so the exit is the catalog note, not a dirty refusal. The waived untracked case still expects that same note (`:4618-4619`) after `--dirty` let the run proceed.

**Findings outside the claims.** None substantiated. The wave predicate “opens with a repository-relative `.agents/` read instruction” was checked against the new floor body: that body’s first read line is “Read the orchestration contract first” with no path (`.claude/agents/orkestrel.md:12-16`); the `.agents/orchestration.md` spelling is a location after “Resolve it against scaffold,” not the pre-split “Read `.agents/orchestration.md` first” trigger.

```text
VERDICT: PASS — 5 of 5 confirmed, no findings outside the claims
```
