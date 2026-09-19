# Debrief carrier evidence map

Grok 4.6 session: 3b00ce2c-57bc-4de4-a938-67f80fa795d6. Duration: 300090ms. Journal: tmp/cursor/debrief-carriers.jsonl. Treat the following distillate as evidence, not a ruling.

I'll read the debrief brief first, then gather the cited evidence it asks for.The brief is a read-only evidence map. I’ll capture git status first, then load the remaining-field map, debrief skill, and the named retained reports.The field map names F1, F6, F8, Field-2, and readHit as still uncertain. Next I’ll load the debrief verdict, named audits, and current carrier files.The verdict names F1–F11 and O1–O7. I’ll locate those audit reports and the current files those findings point at.The original instruction-audit reports aren’t named on disk. I’ll search git history and the current F1/F6/F8 carrier files next.I’ll pull the carrier commits and the remaining finding files, then match F1/F6/F8 and readHit against what’s on disk now.Commit `5fd69d1e` looks like the F1/F6/F8 landing. I’ll read that commit’s current counterparts and the later T-audit/readHit records.**Question.** Map remaining uncertainty in `.orkestrel/campaign/remaining-field-map.md` against current canon and committed history for the retained debrief findings.

**Git status.** Before and after this read: identical. Branch `main`, ahead of `origin/main`. HEAD `178c7cbbe4f125e4d6ca33e54918f12f9339f5e9`. Dirty working tree: `.codex/config.toml`, `.orkestrel/campaign/rebaseline-2.md`. Untracked campaign files include `remaining-field-map.md`. No files were edited.

---

## Historical vs current

The 2026-09-16 verdict asked for owner's direction before root-contract edits (`retained/debrief-verdict.md:74-86`). Current `AGENTS.md` and `.agents/orchestration.md` are the owner's supplied authority. Matching landings sit in commit `5fd69d1ea9d0b531c21e38bafe706744adc4c6af` (AuthorDate Thu Sep 17 01:44:45 2026 `-0400`, author `mikesaintsg`), message: "name the lanes by engine, and close the instruction defects a campaign exposed." No separate campaign file named "owner's direction" was found. That gap is historical. It is not a missing current implementation for the files that commit already wrote.

---

## Evidence by retained finding

### F1 — retire harness-relative `implementer`

**Original carrier.** Owner's direction; touches orchestration, `CLAUDE.md`, transports, agent directories (`debrief-verdict.md:80-82`).

**Current matching source.** No `implementer` file under `.agents`, `.claude`, or `.codex`. `5fd69d1e` renamed `.claude/agents/{implementer.md => opus.md}` and `.codex/agents/{implementer.toml => sol.toml}`. Current names: `.claude/agents/opus.md:10-12` (`opus` as Opus 5 implementation); `.claude/agents/sol.md:10-26` (Claude-side Sol driver, route `sol`); `.codex/agents/sol.toml:1-5` (Sol writer); `.codex/agents/opus.toml:1-11` (Codex-side Opus driver). `CLAUDE.md:35`: "Reach Grok through `grok`, and Sol through `analyst` and `sol`." Working-tree `.codex/config.toml:19-24` maps Sol to `analyst` and `sol`, Opus to `planner`, `reviewer`, and `opus`.

**Commit.** `5fd69d1e`. Message: "`implementer` resolved to a different engine per harness… Each surface now holds one `sol` and one `opus`."

**Unverified.** Whether any live brief still writes the retired token. Working-tree `.codex/config.toml` delta vs HEAD not shown.

### F6 — create `.agents/transports/cursor.md`; reduce grok charters to a route pin

**Original carrier.** Owner's direction; adds a vendored path (`debrief-verdict.md:83-84`).

**Current matching source.** File exists. `.agents/orchestration.md:204-206`: "`.agents/transports/cursor.md` is the shared Cursor transport contract, and both harnesses' `grok` bridges bind it." `.claude/agents/grok.md:20-28` and `.codex/agents/grok.toml:14-22` bind that file and pin only route `grok`, `--mode=ask`, read-only. Windows invocation is in the transport, not the charters: `.agents/transports/cursor.md:28-36` (versioned entry; never `agent` / `agent.cmd` / `agent.ps1` shims). `host.json:316-319` vendors `agents/transports/cursor.md` → `.agents/transports/cursor.md`.

**Commit.** `5fd69d1e` added `.agents/transports/cursor.md` (file created in that commit; earlier follow-history hits are path reuse). Message: "Cursor has a transport contract… The versioned entry won because it is the route the campaign measured."

**Unverified.** Byte identity of the moved contract vs the pre-move agents-directory copy (commit message says "moved verbatim"; the old path was not opened).

### F8 — shared numbered-claims file named in no instruction

**Original carrier.** `orkestrel-falsify` reference (`debrief-verdict.md:29`).

**Current matching source.** `.agents/skills/orkestrel-falsify/references/brief.md:25-27`: "Write them to one file both lanes are pointed at, `tmp/audit/<unit>-audit-claims.md`, retained beside the round's verdict." `.agents/orchestration.md:464-466` names the same path and the retain destination `.orkestrel/<package>/<unit>-audit-claims.md`.

**Commit.** `5fd69d1e`. Message: "The shared claims file is doctrine… and it was named in no instruction file."

**Unverified.** Whether every later audit round actually retained that file beside its verdict (later rounds exist; retention completeness was not re-swept).

### F4 — lane-swap trigger

**Original carrier.** Owner's direction, wording supplied (`debrief-verdict.md:27`, `:85-86`).

**Current matching source.** `.agents/orchestration.md:89-94`: "Bench darkness is one trigger and the writer's engine is another… Both engines still run, so this is a lane swap rather than a substitution."

**Commit.** `5fd69d1e`.

**Unverified.** Whether every post-landing audit ledger recorded the swap in those words.

### F5 — brief-template rows not binding

**Original carrier.** Owner's direction, wording supplied (`debrief-verdict.md:36`).

**Current matching source.** `.agents/templates/brief.md:3-16`: "Copy this file for each dispatch and fill every row." "leave no row blank." "Every other dispatch keeps every section and row heading verbatim." `5fd69d1e` touched this file.

**Unverified.** Whether the rows this campaign dropped are now present as named rows; the template was not diffed against the 2026-09-16 copy.

### F7 — amend in place vs successor file

**Original carrier.** Owner's direction, wording supplied (`debrief-verdict.md:28`).

**Current matching source.** `.agents/orchestration.md:458-460`: "Re-run a unit with a successor brief, never with an edit to the brief it already ran. Name the successor `<unit>-brief-<n>.md`… and leave the original in place unedited." `.agents/skills/orkestrel-falsify/references/brief.md:59-65` restates the successor rule.

**Commit.** `5fd69d1e`.

**Unverified.** Whether every later unit followed that naming.

### O1 + F2 — retention copies `tmp/` paths; missing lane briefs

**Original carrier.** Write the four missing files, then process refinement needing owner's direction (`debrief-verdict.md:24`).

**Current matching source.** Rewrite law is in orchestration, not in `retention.md`. `.agents/orchestration.md:481-489`: "Rewrite every `tmp/` path inside a copied artifact to the retained path it now names… Retention covers every lane of an audit round." `retention.md` still owns prune checks and the `tmp/` sweep (`retention.md:16-26`, `:50-62`) and has no rewrite sentence. Named missing files `scaffold/s2-audit-verdict.md` and the roughnotes `r1`/`r2`/`r4` files were not searched outside this checkout.

**Commit.** `5fd69d1e` (orchestration). `retention.md` is not in that commit's file list.

**Unverified.** Whether copied artifacts in `.orkestrel/` still contain live `tmp/` paths. Existence of those four named files in other checkouts.

### O2 + F3 — read-only roles must state their return channel

**Original carrier.** Wording supplied (`debrief-verdict.md:31`).

**Current matching source.** `.claude/agents/distiller.md:32-37` and `.claude/agents/grok.md:32-47`: final message is the return; a dispatch that names a report path is a dispatch defect. `.codex/agents/grok.toml:27-32` same for the read-only sandbox.

**Commit.** `5fd69d1e`.

### O3 — falsify "writes nothing and runs nothing"

**Original carrier.** Wording supplied (`debrief-verdict.md:32`).

**Current matching source.** `.agents/skills/orkestrel-falsify/SKILL.md:119-124`: "Read-only describes the SUBJECT, never the lane's tools." "a read-only filesystem does not forbid a nonmutating command."

**Commit.** `5fd69d1e`.

### O4 — `above` / `below` unregistered

**Original carrier.** Wording supplied; sites already closed (`debrief-verdict.md:33`).

**Current matching source.** `.claude/rules/writing.md:104` substitution row; `:111-116` judged-set rule: `above` and `below` are unmatched by the sweep because they carry a permitted sense.

**Commit.** `5fd69d1e`.

**Unverified.** Whether the six genuine cross-references the commit message names stay closed.

### O5 — skill API not proven

**Original carrier.** Wording supplied; dangling verb already restored (`debrief-verdict.md:34`).

**Current matching source.** `ROADMAP.md:16` closed: vendored `inspectSkillImports` refuses a fenced binding the installed declaration does not export. `5fd69d1e` message: "A skill verifies the APIs it instructs."

**Unverified.** The inspect reader itself was not opened.

### O6 — charters stop unconditionally; contract allows ancillary resolve

**Original carrier.** Owner's direction (`debrief-verdict.md:35`).

**Current matching source.** `.agents/orchestration.md:406-412` Deviation protocol: stop when the primary objective is blocked; "Resolve an ancillary choice within the owned scope, record the choice, and continue." "Every charter references this section rather than restating it." `.claude/agents/opus.md:36` and `.claude/agents/builder.md:33-35` point at that section.

**Commit.** `5fd69d1e`.

### O7 — absorption fallback with no native absorption charter

**Original carrier.** Owner's direction (`debrief-verdict.md:36`).

**Current matching source.** `.claude/agents/distiller.md:1-13` and `.codex/agents/distiller.toml` exist. `.agents/orchestration.md:125-128` fallback order: Cursor Grok, then Luna, then Sonnet. `5fd69d1e` added both distiller files.

**Commit.** `5fd69d1e`.

### F9 — `orkestrel-build-application` had no acceptance section

**Original carrier.** Wording supplied (`debrief-verdict.md:37`).

**Current matching source.** `.agents/skills/orkestrel-build-application/SKILL.md:110-125` section `## Accept the result` with completion requirements. Description `:3` still excludes product redesign.

**Commit.** `5fd69d1e` (skill touched).

### F10 — `instruction-audit.md` recorded a past campaign as a rule

**Original carrier.** Wording supplied (`debrief-verdict.md:38`).

**Current matching source.** `.agents/skills/orkestrel-debrief/references/instruction-audit.md:97-107` now routes the three round questions to `quality.md`, `tests.md`, and the operating contract. `5fd69d1e` changed this file.

**Unverified.** The pre-landing narrative sentence was not recovered by `git show`.

### F11 — Codex `verifier` lacked dirty-tree reading

**Original carrier.** Wording supplied; mirror discipline (`debrief-verdict.md:39`).

**Current matching source.** `.claude/agents/verifier.md:43-47` "Never discard a working-tree change" / "Read a dirty `git status` as the expected state." `.codex/agents/verifier.toml:16-17` the same dirty-status sentence.

**Commit.** `5fd69d1e` (Codex verifier `+3`).

### Field-1 — clean statechart probe

**Original carrier.** Law already in `field-testing.md`; clean probe still owed (`debrief-verdict.md:40`, `:90-91`).

**Current matching source.** `ROADMAP.md:17` still open: re-run from a checkout carrying none of the campaign's own verdicts. `design-verdict.md:67` D27: "run the clean pass last from a roughnotes worktree carrying no `.orkestrel/` folder." `field-testing.md:25-26` fresh-state rule is new workflow/resource ids and a fresh server; it does not mention campaign verdicts or `.orkestrel/`. `retained/field-pass-journey-skill.md:30-39` records the contaminated pass. No later field-pass report was found.

**Unverified.** Whether the binding clean-state rule is "no `.orkestrel/`", "none of this campaign's verdicts", or `field-testing.md`'s fresh-server rule. Remaining-field-map already names that contradiction.

### Field-2 — retained verdict is evidence, not a plan

**Original carrier.** `orkestrel-prove-journey`, wording owed (`debrief-verdict.md:41`).

**Current matching source.** `.agents/skills/orkestrel-prove-journey/SKILL.md:28-30`: "Treat a retained readiness verdict as evidence to re-verify against the current tip, never as a plan to resume." `5fd69d1e` message states that sentence landed. Debrief table still says "wording owed." Live-use re-proof of Field-2 is not in this tree.

**Unverified.** Whether an acceptance-tier pass has derived a plan without copying a retained verdict after that sentence existed.

### readHit — adversarial audit owed

**Original carrier.** Unit committed and gated; no adversarial lane has read it (`debrief-verdict.md:6`, `:92`).

**Later T / test-package records.**

- `t-audit-claims.md` contains no `readHit` string. Claim 10 (`:140-145`) attacks shadow-tree sentences on `isRendered` and `isReachable` (ROADMAP 31 / D16), not `readHit`.
- `t-audit-verdict.md`, `t-audit-objective-report.md`, `t-audit-subjective-report.md`: no `readHit`.
- No `t3-audit-*` or `t4-audit-*` files. `t3-brief.md` / `t3-report.md`: no `readHit`.
- `t4-brief.md:1-15` is an implementation unit: `isReachable` models an open modal. `t4-report.md:301-303` mentions `readHit` only as reading beside `isRendered`/`isReachable`, not as the audit subject.
- `ROADMAP.md:31` **Closed.** Shadow-tree documented on `isRendered` and `isReachable` "without copying the `readHit` hit-test sentence onto predicates that hit-test nothing."
- `.orkestrel/campaign/s3-diff.patch:1411` (old ROADMAP 31, removed in that patch): "The `readHit` audit closed this for that reader alone, and a document-level hit test retargets for every one of them."

**Contradiction, left open.** The 2026-09-16 debrief says no adversarial lane has read `readHit`. The pre-S3 ROADMAP 31 sentence says a `readHit` audit already closed shadow-tree documentation for that reader. T1/T2/T4 records in this campaign do not name `readHit` as their subject.

**Unverified.** The original `readHit` unit commit, its claims file, and any audit in the `@orkestrel/test` checkout. Those live outside this repository.

---

## Evidence candidates for a later retrospective (not scope)

**Stale repair-group spelling.** `r-b-brief-4.md:5-13`: CLI refused `--groups` taking `manifests`; required `manifest, configs, source, tests, guides, docs, orchestration`. Successor command uses `repair --groups configs,manifest`. "Carry the stale plural command in the original brief… into your report as an instruction finding." `rebaseline-recovery.md:13` one-line carry: "stale repair group spelling."

**Menu-settle incompatibility.** `r-b-brief.md:53` prescribed `waitForState` on the trigger's `aria-expanded`. `r-b-menu-design.md:9-13` records that after open, the trigger sits outside the modal and `waitForState` refuses it (`Interactive target "Menu" is not visible and focus-reachable`). `r-b-menu-design-ruling.md:3-7`: resolve Menu before opening; retain the handle only for `readStates`; keep T4's modal refusal. `r-a-2-check-recovery-report.md:11`: `readMenuSettled` still reads `show` / `showing` / `hiding`. `rebaseline-recovery.md:13` carry: "state-settle incompatibility."

**Vue-host regression.** `rebaseline-recovery.md:10-11`: Scaffold `0.0.75` source lacks Vue in generated `setup:browser`; do not pack until that repair and review close. `setup-vue-terrain-report.md:44-48`: `setup:browser` hits Vite import-analysis on `App.vue` and asks for `@vitejs/plugin-vue`; `appBrowser` loads Vue, `setupBrowser` does not.

**Proof false-green.** `setup-vue-audit-ruling.md:5`: fixture `it(...)` became `it.skip(...)`; outer release distribution test passed exit 0. Log `tmp/audit/setup-vue-skipped-control.log.txt`. `setup-vue-execution-audit-verdict.md:5`: successor required the named JSON result; Orchestrator recorded positive pass and skip/todo/absent/failed rejects. `rebaseline-recovery.md:11`: "a skipped-child control exposed a false-green outer proof." Independent final `prepublishOnly` still named remaining there.

---

## Distillate

Commit `5fd69d1e` is the carrier that matches F1, F6, F8, F4, F5, F7, O1's rewrite law, O2–O7, F9–F11, and Field-2's skill sentence. Current files contradict the 2026-09-16 "still needs owner's direction to create/rename" table on those implementation sites. The 2026-09-16 verdict file was not updated. Field-1's clean probe is still listed open in `ROADMAP.md:17` and `debrief-verdict.md:90-91`. No later T-audit in this campaign takes `readHit` as subject; T4 audits/implements `isReachable` modal and only mentions `readHit` beside that pair. Historical owner-direction paperwork is absent; current canon already contains the landings.

---

## Unknowns — inputs not reached

- Original instruction-audit subjective and objective reports. `debrief-verdict.md:16` names only terminal lines `INSTRAUDIT SUBJECTIVE: F1–F11` and `INSTRAUDIT OBJECTIVE: O1–O7`. No report files under `.orkestrel/campaign/retained`, `.orkestrel/campaign`, or `tmp` (other than copies of the verdict).
- Original debrief brief and original field-pass brief (only `retained/field-pass-journey-skill.md` and `retained/debrief-verdict.md`).
- A campaign artifact titled as owner's go-ahead or owner's direction.
- `@orkestrel/test` checkout history for the original `readHit` unit and any audit there.
- `git show` of `5fd69d1e` hunks (stat and message only).
- Uncommitted delta of dirty `.codex/config.toml` and `rebaseline-2.md` vs HEAD.
- Raw model journals and unrelated sessions (forbidden by the brief).
- Whether prune go-ahead was ever given (`debrief-verdict.md:93-94` says it was not).

**Journal.** Intended path `tmp/cursor/debrief-carriers.jsonl` (named in `recovery-2026-09-18.md:22`). Session id from `init` not read; the brief forbids raw model journals.

**Deviation.** None. CLI available. Containment unchanged. Read-only. Spawned nothing.