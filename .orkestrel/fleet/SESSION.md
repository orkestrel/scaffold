# Session registry — fleet re-pin and cleanup campaign

Session start: 2026-08-17. Orchestrator branch: `claude/orkestrel-fleet-orchestration-b0t5cy` (scaffold).
Read `.orkestrel/fleet/PLAN.md` for the prior campaign's record (test@0.0.2, accepted; registry has
since moved to test@0.0.5 and scaffold@0.0.38 from other sessions).

## Bench ledger

| Bench       | State | Evidence                                                              |
| ----------- | ----- | --------------------------------------------------------------------- |
| Cursor Grok | LIVE  | PONG round-trip, `cursor-grok-4.6-high`, `tmp/cursor/probe.log`       |
| Codex Sol   | LIVE  | PONG round-trip after device-auth recovery, `tmp/codex/probe.jsonl`   |

Grok model pin `cursor-grok-4.6-high` re-verified against `agent models` 2026-08-17; still newest Grok line.
Deviation recorded: grok subagent's inner cursor run hit its ~2-minute self-bound with an empty journal
and handed the launch back; Orchestrator relaunched under its own cap and it completed. Bench was never dark.

## Fleet state (measured 2026-08-17, evidence in tmp/registry-state.json + tmp/fleet-facts.json)

- 46 packages. 44 in the catalog table; `form@0.0.1` and `table@0.0.1` (both L2: contract, emitter;
  both private repos, user-confirmed new) are published and absent from the catalog — regenerate via
  `scaffold catalog` during scaffold's campaign turn. The org repo list is fully accounted for: 46
  repos, all attached and cloned.
- Version parity: every local manifest equals its registry version. Nothing is behind its own publish.
- Catalog table stale rows: scaffold 0.0.37→0.0.38, terminal 0.0.8→0.0.9, test 0.0.3→0.0.5, form missing.
- Runtime pin drift: database 0.0.9 stale in agent, queue, relation, worker, workflow, workspace, toolbox;
  workflow 0.0.12 stale in agent, toolbox; terminal 0.0.9 stale in toolbox; console 0.0.7 stale in scaffold.
- Dev pin drift fleet-wide: scaffold ^0.0.33 (test repo ^0.0.30, form/table ^0.0.37) vs 0.0.38; test
  ^0.0.3 (form/table ^0.0.4) vs 0.0.5; guide ^0.0.10 in test vs 0.0.11; server ^0.0.11 in ollama vs
  0.0.12. form and table join the dev-only re-pin set; their runtime pins are current.
- Mirror drift: CLAUDE.md differs from scaffold's canonical copy in ~18 repos; AGENTS.md differs in
  ollama, supervisor, test. Overwrite/repair restores them; never hand-edit in targets.
- Campaign artifacts: scaffold/.orkestrel (10 files incl. fleet/PLAN.md), brief/.orkestrel (34 files:
  contract, reason, scaffold campaign records), supervisor/ROADMAP.md (2342 lines, live plan of record),
  markdown/PROPOSAL.md (272 lines, marked shipped/historical).
- supervisor anomalies: no guide, version 0.0.1, `rescue/pre-revert-app-server-work` remote branch,
  both mirrors differ. Not safe to blind-overwrite before triage.
- Every repo carries 2–12 stale `claude/*` remote branches; scaffold also `probe-push-isolate`, `s22-release`.

## Publish order (derived from live registry runtime edges; catalog Layer column confirmed)

- L0: contract, msg, sse, test
- L1: abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool
- L2: console, database, form, markdown, middleware, pool, reason, router, sea, table, template, websocket
- L3: browser, guide, interpret, mcp, qualifier, queue, rater, relation, scaffold, server, terminal, workspace
- L4: brief, program, worker, workflow
- L5: agent, supervisor
- L6: ollama, toolbox

## Cascade the current drift obliges (bump + republish, 10 packages)

- L3 round: workspace, queue, relation (re-pin database), scaffold (re-pin console).
- L4 round: worker, workflow (re-pin database + bumped queue).
- L5 round: agent (re-pin database, workflow, workspace, queue), supervisor (re-pin database, workflow).
- L6 round: toolbox (re-pin database, terminal, workflow, agent, relation), ollama (re-pin agent).

Dev-only re-pin, no bump, no publish (~20 packages incl. form, table): all others with stale
scaffold/test/guide/server dev pins. Clean: brief, browser, console, csv, database, indexeddb, mcp,
middleware, pool, rater, reason, router, sea, server, sqlite, sse, terminal, websocket.

Dev-bump publish test (rule landed 2026-08-17 in `.agents/orchestration.md` and the orkestrel role
file, vendored bytes riding scaffold's next release): after a dev re-pin and green gates, rebuild and
compare `dist/` against the published tarball (`npm view @orkestrel/<name> dist.tarball`). Identical
bytes: commit to main, no release. Changed bytes: the published surface moved (forced src/app edit or
toolchain-changed emit), so bump + publish and the runtime cascade applies to its dependents. Manifest
devDependency ranges are outside the comparison; they reach no consumer.

## Overwrite mechanism facts (from guides/scaffold.md absorption, tmp/cursor/scaffold-absorb.log)

- `overwrite` = repair writes + catalog writes + delete tracked plan-foreign files + re-declare
  `@orkestrel/*` ranges. Refuses dirty tree without `--dirty`; deletes only git-tracked paths;
  preserves birth-owned files (package.json body, barrels, tests, README, guides/README, scripts/service.sh).
- `.orkestrel/`, ROADMAP.md, PROPOSAL.md are plan-foreign: overwrite deletes them (tracked). Triage
  before overwrite per repo; git diff is the walk-back.
- Re-pin the target's `@orkestrel/scaffold` devDependency to latest BEFORE running overwrite, or the
  verb runs the old vendored host surface.

## Decisions taken this session

1. Fleet sweep instrumentation ran as Orchestrator scripts (mechanical fact collection), with the
   orkestrel role producing Health/Work-order from that evidence. Grok carried guide absorption.
2. `form` attached and adopted into the fleet inventory as L2.
3. register_repo_root deliberately not called for the 44 sibling clones: CLAUDE.md/AGENTS.md are
   byte-verified mirrors of scaffold's (hash check in fleet-facts), and loading 44 identical copies
   would spend the main context the mirrors exist to save. Divergent copies (ollama, supervisor, test,
   +CLAUDE.md drift set) are vendored-drift findings for overwrite, not alternate instructions.

## Tier-1 findings (2026-08-17, second half)

- Dev re-pin sweep closed 18/18 green. The one first-pass failure (test repo's guides.test.ts
  still called guide 0.0.10's `patterns()`) was migrated to `fences()` + `findUnlisted` per the
  G1 ruling — the first live confirmation of backlog item B1's adoption debt — and re-ran green,
  dist-identical.
- **11 of 17 rebuilt dists differ from their published tarballs**: contract, emitter, html,
  interpret, markdown, msg, ndjson, program, qualifier, template, tool. Probed cause: every one
  carries post-release src commits on main ("Satisfy the refreshed placement and parity gates"
  pass, plus siblings). The differences include `.d.ts` declarations and emitted logic, so the
  registry serves older code than main. Per the dist rule these 11 owe a bump+publish.
- Consequence: contract (L0) republishing re-pins into every consumer under the campaign goal, so
  closing "everything on latest" is a near-full-fleet release wave in layer order, not the 10-package
  cascade first measured. The wave folds the original cascade into it.
- dist-identical (no release owed): abort, budget, form, guide, table, timeout — their re-pins are
  complete and pushed to main.
- Merged-branch deletion (~300, all ancestors of main) blocked by the permission classifier; awaiting
  the user's approval or an allow rule. 11 unmerged branches recorded at B7.
- brief/.orkestrel pruned after triage (survivors at B9-B15); scaffold/.orkestrel pruned (old plan
  superseded, distribution prototype confirmed adopted); markdown PROPOSAL.md deleted. All pushed,
  main fast-forwarded in markdown and brief.

## Awaiting user direction

- Campaign order approval (L0→L6 overwrite+fix pass), supervisor ROADMAP disposition, markdown
  PROPOSAL deletion, brief/.orkestrel triage destination, stale branch cleanup policy, publish windows.

## Push state

- scaffold `claude/orkestrel-fleet-orchestration-b0t5cy`: session registry committed and pushed.
- All other repos: untouched, clean at origin default branch.

## Wave progress

- L0 prepared 2026-08-17: contract 0.0.12 (material), msg 0.0.7 (material) await the user's publish
  window; sse and test proved dist-identical and stay at 0.0.5. All four host-aligned, gates green,
  pushed, main fast-forwarded. L1 re-pins begin once contract and msg are on the registry.
- Branch cleanup: ref deletion is proxy-refused (403) fleet-wide; the 337 approved deletions ship as
  .orkestrel/fleet/branch-cleanup.sh for operator credentials. relation's hardening port is B16.

## Result-guard wave absorbed (2026-08-17)

- User's parallel session shipped contract 0.0.12 (objectOf — B9 closed), reason 0.0.6 (eleven
  result guards — B10 closed), interpret 0.0.9, brief 0.0.2, rater 0.0.10, qualifier 0.0.9,
  program 0.0.8, test 0.0.6. Record: brief/DEBRIEF.md. Clones synced to main; all fast-forwards.
- Defect carried: reason 0.0.6 pins contract ^0.0.11 against consumers on ^0.0.12 (two-copy
  defect); repair rides reason's L2 slot. New backlog from DEBRIEF: B18 read-once ownership,
  B19 program validate-path dereferences, B20 Premise optionality.
- supervisor removed from the workspace and every artifact per the user: theirs, other session.
- msg 0.0.7 remains prepared and unpublished; sse owes a dev-only contract/test re-pin.
- Wave reorganized: ~42 uploads over 7 windows (see PLAN.md). L1 = ten contract consumers.

## L1 prepared (2026-08-17)

- Eleven uploads staged: msg 0.0.7, abort 0.0.7, budget 0.0.7, csv 0.0.4, emitter 0.0.7,
  html 0.0.4, indexeddb 0.0.8, ndjson 0.0.7, sqlite 0.0.8, timeout 0.0.7, tool 0.0.11.
  sse sits out: dev-only moves, dist-identical, runtime set unchanged.
- Visit defect found and repaired: overwrite's declare re-pins before the verify step, so
  "did my step move a pin" under-counted; the bump test is now final-runtime-set vs published
  packument (visit2.sh patched; abort, budget, timeout, sqlite repair-bumped).
- Publish flow per user: first upload mints the approval, the user's click opens the
  five-minute window, the rest chain with --ignore-scripts (tmp/publish-l1.sh).
