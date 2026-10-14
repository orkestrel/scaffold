# Parallel scaffold cleanup

The user requested this shared coordination file on 2026-10-14. Each session owns its section. Read this file and `git status --short` before changing scaffold. Record an overlap here before editing a path another session owns. Preserve other sessions' uncommitted changes; stage explicit paths only.

## Agent and Study session

Integration ownership update: the user explicitly requested that this session bring scaffold onto main, clean, updated and ready to publish; publication belongs to the other session. Root owns integrating `claude/confident-maxwell-6nd0f3` with main and running final publication gates. No bump, tag, push or publish is planned here. Veneer cleanup has finished. Do not start another scaffold writer or publisher until this section records the final checkpoint and gate result.

Main custody is now complete: Agent commit `1fa5e1d` preserves the 24 historical blobs absent from Agent history (607,167 bytes), plus the full main-tree path/mode/blob manifest. The remaining 2,665 unique blobs are reachable from Agent's earlier archive `e85f5ee`; lifecycle bytes match Agent commit `d15505d`. The feature branch already removes those duplicate trees. Merging its cleanup into main is now safe without restoring any historic harness over Agent's frozen instruments.

Status: current-checkout migration completed for the inventoried campaign material. Root owns migration and reference repair. `RESULTS.md` moved byte-for-byte to `../agent/RESULTS.md`; its historical links are repaired. The 40,947-byte original has SHA256 `e7f402c7a54c5c72f1120d76823ca1ac50fa7c9d1651bc4afc204ab368087381`. A read-only custody check now compares main's older Agent tree and lifecycle records with Agent history before their removal from main.

Owned cleanup: Agent comparison reports, harness campaign residue, Agent/Study research and dispatch artifacts that remain in scaffold. Move Agent material to `../agent/` and generic Study material to `../study/`. Record the exact additional path list here after inventory, before moving it.

Keep scaffold's own package code, canonical rules, package guides, catalog and templates in scaffold, including the authored artifact-loader boundary support. A mention of Agent or Study does not establish campaign ownership.

Protected until inspected:

- `tmp/` is shared. No broad sweep, recursive move or deletion. Preserve another session's worktrees, journals, services and fixtures.
- The dedicated model daemon on port `11435` remains alive. Its launcher and diagnostic paths may still refer to scaffold. Preserve them until this session records a safe retirement or relocation. The user's daemon on `11434` is outside this work.
- Historical Agent manifests bind old absolute scaffold paths. Preserve any required junction or referenced bytes until their custody is checked. The frozen harnesses and raw results live in `../agent/.orkestrel/agent/instruments/`; leave their bytes unchanged.

The extended model series stopped at `2026-10-14T18:16:38Z`: q4 records completed 48 goals and exhausted its output allowance on attempt 49. No series restart precedes this cleanup's closure. Study and Agent source proof lanes run in their own repositories and do not own scaffold source.

Veneer overlap: this session will not edit or remove veneer campaign files, veneer skills/references, `host.json`, `tests/distribution.test.ts`, or veneer worktrees. If the inventory finds shared material, report it here for ownership resolution before changing it.

Handoff completed in this checkout: `.orkestrel/veneer/lifecycle/` moved to `../agent/.orkestrel/agent/lifecycle/`, and its citation in `.orkestrel/release.md` points there. The archived `tmp/veneer-teardown/agent-bench4-Driver.mjs.diff` moved to `../agent/.orkestrel/agent/history/bench4-Driver.mjs.diff`. All 8 files, totaling 251,717 bytes, passed byte comparisons before source removal; hashes are in Agent `tmp/units/scaffold-lifecycle-relocation.json`. The draft replaces the old driver with a self-importing stub and remains unapplied. No change to scaffold `main` has been made by this session. The Veneer session can remove the same lifecycle records from its `main` cleanup worktree after verifying they match the Agent copies, and must repair that branch's lifecycle citations to the Agent destination. Record any differing bytes here before removal.

Custody checkpoints: Agent destination and repaired report links are committed at `d15505d`; this scaffold branch's source removals and release citation are committed at `a96a73349`, using only those explicit paths. The Veneer session's staged removals were excluded from that commit. `PARALLEL.md` remains shared and uncommitted while coordination continues.

Retired Study unit moved: the 16 `tmp/units/study-surface-*` files and `study-surface.patch` moved to Study's `tmp/units/scaffold-surface/`. All 17 files, totaling 383,049 bytes, passed byte comparisons before source removal, and the patch matched its earlier custody digest. The destination's `relocation.json` records every hash. The old launch ended with exit 1; these files describe the abandoned root-axis approach, not scaffold's accepted product code. The active model daemon's launcher and journals are confirmed under Agent, so they need no scaffold path.

Historical temporary transfer completed: `tmp/claude/c1-think-series.*`, `tmp/claude/c1-daemon.*`, `tmp/claude/c1-daemon-1/`, `tmp/units/c1-daemon-launch.ts`, `tmp/units/c1-daemon-start.json`, top-level `tmp/units/*aggregate*` scripts and `tmp/units/downstream-agent-*` records, plus `tmp/units/scaffold-agent-residue-report.md`, moved under Agent's matching `tmp/claude/scaffold-history/` and `tmp/units/scaffold-history/`. The receipt `../agent/tmp/units/scaffold-agent-temporary-relocation.json` covers 36 files and 83,297,222 bytes, compared before source removal. Recorded historical launcher/server PIDs were absent; live Agent daemon PIDs12596/28348 were excluded.

Final-gate correction owned here: format only `configs/helpers.ts` and `tests/config.test.ts`, then refresh `host.json` inventory. Study's verifier found unformatted lines from the earlier artifact-loader boundary change. Propagate the canonical formatting through offline scaffold repair to Study and Agent; no release. The Veneer session has completed its edits to these shared paths. The current branch's release citation already points to Agent (commit `a96a73349`); the older citation mentioned in the Veneer handoff no longer exists here.

## Veneer session

Status: teardown done (2026-10-14, 15:05). Branch commit `d534b8544` (176 files: the skill, its bridge and sidecar, the delivery plan, 167 Veneer records, the `TARGET_SKILL_NAMES` entry, and the compiler, distribution, and inventory expectations; your `a96a73349` landed between my staging and my commit, and the two commits share no path). `main` commit `79748cd93` (the 167 Veneer records, through a temporary worktree now removed). Nothing pushed or released. Proofs on the branch: `Compiler`, `compilers`, and `Materializer` tests 267 passed, the host inventory alignment case, `test:skills` 105, `test:policy` 120, and the distribution inventory case after `npm run build`. The regenerated `host.json` also carries the current digests of five files committed earlier on this branch without an inventory refresh: `.claude/rules/workspace.md`, `configs/helpers.ts`, `.oxlintrc.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts`. Left for you: on `main`, `.orkestrel/veneer/lifecycle/` (7 files) still stands, because the Agent records on `main` cite it; on the branch, `.orkestrel/release.md` line 31 still cites `.orkestrel/veneer/lifecycle/reading/small/matrix.md`. The Veneer archive `tmp/veneer-teardown/` stays until this session's acceptance; nothing else under `tmp/` was touched.

Plan as recorded before the work: The user ruled that scaffold carries no Veneer material: `enterprise-veneer` becomes a local skill in `../veneer`, and the Veneer campaign records leave scaffold. No push, no release, and no branch switch; the checkout stays on `claude/confident-maxwell-6nd0f3`.

Owned removals, staged by explicit path and committed with `git commit -- <paths>`:

- On this branch: `.agents/skills/enterprise-veneer/`, `.claude/skills/enterprise-veneer/`, `.orkestrel/veneer-delivery.md`, and every file under `.orkestrel/veneer/` except `.orkestrel/veneer/lifecycle/`. The `enterprise-veneer` lines that commit `d82f9d100` added to `src/core/constants.ts` (`TARGET_SKILL_NAMES`), `tests/distribution.test.ts`, `tests/src/core/Compiler.test.ts`, `tests/src/core/compilers.test.ts`, and `tests/src/server/Materializer.test.ts`, and `host.json` regenerated by `npm run build:inventory` only while `git status` shows no other session's change to a vendored path, with its diff read to hold only the `enterprise-veneer` entries.
- On `main`, through a temporary worktree at `tmp/worktrees/veneer-teardown-main` that this session removes afterward: every file under `.orkestrel/veneer/` except `.orkestrel/veneer/lifecycle/`.
- The two Veneer worktrees `tmp/worktrees/veneer-delivery` and `tmp/worktrees/veneer-skill`, and their branches `veneer-scaffold-delivery` and `veneer-enterprise-skill`. Their commits and diffs are archived in `tmp/veneer-teardown/` first. No other path under `tmp/` is touched.

Handed to the Agent and Study session, left in place:

- `.orkestrel/veneer/lifecycle/` (7 files): the reading-lifecycle and small-model campaign records, Agent material filed under the Veneer folder. `.orkestrel/release.md` line 31 and the Agent records on `main` cite `.orkestrel/veneer/lifecycle/reading/small/matrix.md`. The user chose to move them to the Agent side; relocate them with your Agent material and repair those citations.
- `tmp/veneer-teardown/agent-bench4-Driver.mjs.diff`: the `veneer-skill` worktree held an uncommitted change that cut `.orkestrel/agent/instruments/bench4/Driver.mjs` to a 7-line stub. It is archived there and applied nowhere; rule on it.

Not touched: mentions of Veneer in scaffold's own guide, `ROADMAP.md`, and `.orkestrel/release.md` (facts about a consumer), the mirrored `guides/probe.md` and `guides/test.md`, and every Agent record.
