# Fleet backlog — deferred work, one central registry

Every deferred item the fleet holds, with its source and reopening condition. An item leaves this
file by being implemented, struck on evidence, or moved into an active campaign plan. Sources that
were pruned are recoverable by the commit hash beside them.

## From the prior fleet campaign (.orkestrel/fleet/PLAN.md, pruned this session)

| # | Item | Owner | Condition / next step |
| - | ---- | ----- | --------------------- |
| B1 | **Track F fleet pass**: adopt `@orkestrel/test` helpers in every package (replace corpus walks, `readText`, hand-rolled scratch fixtures); extract per-package case matrices (1,574 repeated blocks across 36 packages) into setup files; per-package `surface()` adoption corrections (worker, middleware); `fences()`/`findUnlisted` adoption with the negative-control acceptance (`grep -l findUnlisted */tests/guides.test.ts` equals the fleet count) | all packages | Was gated on test+guide publishing — both landed (test 0.0.5, guide 0.0.11). Adoption status per package UNKNOWN: probe before scheduling. Natural vehicle: the Tier-2 overwrite pass visits every repo once. |
| B2 | **Canon reconciliation**: `agent`'s `Channel` (barrelled, no interface) and `middleware`'s `MultipartParser` (interned) are the same species with opposite rulings | scaffold rule set (`architecture.md`) | Design decision; land the rule vendored, correct whichever package loses. |
| B3 | **`prepack` manifest option**: 0 of 41 packages had `prepack`, so `npm pack` ships stale `dist` for anyone inspecting | all packages | Recorded as the user's call, never taken silently. Decide once, fleet-wide, during the overwrite pass or never. |
| B4 | **Recorder population numbers disagree** in the test guide: 32 at contract rule 2, 13 in Limits, 28 importing `createRecorder` at last count | test | Needs current fleet counts; fold into B1's visit. |
| B5 | **`MultipartParser.ts` placement**: sits at environment root rather than a domain folder | middleware | Cosmetic; fold into that repo's next src-moving release. |

## From this session's discovery

| # | Item | Owner | Condition / next step |
| - | ---- | ----- | --------------------- |
| B6 | **supervisor ROADMAP.md** (2,342 lines): live plan of record for a promote-the-mechanism campaign — extractions into contract/terminal/sse/middleware/sea, new packages `human` and `live`, new exports `agent/server` and `supervisor/server` | supervisor + named targets | User decision: keep in-repo vs extract here. Repo also has no guide, a `rescue/pre-revert-app-server-work` branch, and divergent CLAUDE/AGENTS mirrors — triage before any overwrite touches it. |
| B7 | **Unmerged remote branches** left after the merged-branch sweep (11): scaffold `claude/agent-context-refactor-vils1l`, `claude/orkestrel-fleet-orchestration-cv30e8`, `claude/orkestrel-html-package-bwsp9p`, `claude/orkestrel-orchestration-tp0ez7`, `claude/s22-release`, `probe-push-isolate`; contract `claude/orkestrel-html-package-bwsp9p`; database `claude/workflow-enterprise-audit-f6zo2k`; mcp `claude/json-schema-opaque-parsing-a9dzcg`; relation `claude/database-package-audit-6r4hsd`; supervisor `rescue/pre-revert-app-server-work` | per repo | Per-branch decision: rescue, merge, or delete. |
| B8 | **Catalog rows for form and table** enter via `scaffold catalog`; both packages carry the shared `claude/form-abstraction-audit-gex32w` branch with scaffold/supervisor/terminal/test | scaffold | Regeneration in flight this session; the shared branch joins B7. |

## From brief/.orkestrel triage

(appended when the distillate lands)
