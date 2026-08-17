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
| B7 | **Unmerged branches, audited 2026-08-17** (scaffold's six proved ancestors and joined the approved merged sweep). Remaining five, reconciled: contract `orkestrel-html-package-bwsp9p` = add+same-day-revert, net-empty; database `workflow-enterprise-audit-f6zo2k` = July re-pin obsoleted by 44 newer main commits; mcp `json-schema-opaque-parsing-a9dzcg` = merged as PR #1 then rewritten (82 commits); relation `database-package-audit-6r4hsd` = **REAL unlanded hardening, see B16**; supervisor `rescue/pre-revert-app-server-work` = one rescue commit (14 files, +337/−192 app/server+tests) vs 291 newer main commits, reconcile in the supervisor triage | per repo | Awaiting user ruling per branch; none deleted. |
| B16 | **relation hardening port**: branch `claude/database-package-audit-6r4hsd` holds idempotent `link` (no duplicate junction row, no second event), atomic transactional `unlink`, cooperative cancellation, fail-fast relation validation, plus the proof suite — adversarially verified missing from main, which has since rewritten the query API, so this is a port, not a merge | relation | Port during relation's L3 wave visit; delete the branch only after the port lands green. |
| B8 | **Catalog rows for form and table** enter via `scaffold catalog`; both packages carry the shared `claude/form-abstraction-audit-gex32w` branch with scaffold/supervisor/terminal/test | scaffold | Regeneration in flight this session; the shared branch joins B7. |

## From the wave's visits

| # | Item | Owner | Condition / next step |
| - | ---- | ----- | --------------------- |
| B17 | **`scaffold catalog` emits a table that fails the vendored format gate**: the generated compact markdown table in `CATALOG_AGENT_PATH` is not oxfmt-clean, so every catalog/overwrite run leaves the target red on `format:check` until a manual `format` converges it | scaffold | Fix the emitter to write oxfmt-clean output (or format the file as part of the verb); land in scaffold's L3 wave release. Found on contract's L0 visit; reproduced in scaffold's own tree. |

## From brief/.orkestrel triage (folder pruned this session; recoverable at brief's pruning commit)

| # | Item | Owner | Condition / next step |
| - | ---- | ----- | --------------------- |
| B9 | **Open-record combinator** (`recordOf`-shape): contract publishes none; reason carries ten near-identical `whereOf(isObject, …)` bodies and brief carries successor guards awaiting it | contract, then reason + brief | A `contract` change outside prior campaigns' scope; migrate both consumers when it lands. |
| B10 | **Result guards**: reason publishes no `isLogicalResult`/`isRuleResult` (extend to `isReasonResult`/`isQuantitativeResult` if the same argument holds); once published, `patterns.md` obliges brief to import them and delete its own | reason, then brief | A `reason` change outside the prior campaign's scope. |
| B11 | ~~Three publishing findings~~ **LANDED this session** in `.agents/orchestration.md`: Windows Git Bash operator-driven upload; first-publish 404-is-pending; pack-warning ruled by registry manifest | scaffold | Done — rides the next scaffold release. |
| B12 | **settings.json vendoring design**: vendor `.claude/settings.json` for existence rather than bytes was recorded as a design decision, not taken | scaffold | Decide during the overwrite pass; today `repair` restores vendored bytes and operator grants belong in `settings.local.json`. |
| B13 | **11-row ungated-orders survey** recorded for a future campaign at brief's acceptance | scaffold | Reopen when hardening scaffold's order gating. |
| B14 | **`agents/openai.yaml` full external schema** remains open | scaffold (skills) | Research when a consumer needs more than the three-key mapping. |
| B15 | **w3 unit acceptance never established**: the mandatory real-tree red proof was blocked by a read-only `.agents` policy in that harness | scaffold | Re-prove or strike whatever w3 shipped; consult the pruned `scaffold/units/w3-report.md` by hash. |
