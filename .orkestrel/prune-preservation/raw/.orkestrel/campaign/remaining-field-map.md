I'll read the remaining-field map and gather the evidence it asks for.I'll load the governing files and campaign sources, then map remaining field-pass, ROADMAP17, and debrief requirements with file:line evidence.Next I’ll read the named campaign verdicts, debrief references, and original field/debrief briefs.I'll now read the named verdicts, debrief references, and original field/debrief briefs.I'll check whether Field-2 landed, how ROADMAP 17 and the field-testing method actually read, and what debrief still requires.Git status before and after this mapping is identical. No files were edited.

No original field-pass or debrief *briefs* exist under `.orkestrel/campaign`. The original records that do exist are `retained/field-pass-journey-skill.md`, `retained/debrief-verdict.md`, and `retained/journey-readiness-verdict.md`.

---

## Field pass / ROADMAP 17

**Requirement.** Re-run the journey skill field pass from a clean Roughnotes subject and record whether the tightened statechart trigger fires.

**Artifact / action.** A live field pass over `orkestrel-prove-journey`, journaled per tier, with a statechart-trigger ruling. Method: `.agents/skills/orkestrel-debrief/references/field-testing.md`. Subject checkout: Roughnotes.

**Owner.** Design routing names native Opus, Sonnet, and Haiku tiers on a Roughnotes worktree (`design-verdict.md:85`). The prior pass’s goal-only prompt is in `retained/field-pass-journey-skill.md:9-17`.

**Prerequisite links (R-A-2 and R-B implementation excluded).**

- Campaign exit still requires published `@orkestrel/test` and `@orkestrel/scaffold`, Roughnotes adoption of those, then the clean pass (`design-verdict.md:89-91`, `:103-104`).
- Field pass waits until published-layer and application adoption close (`rebaseline-recovery.md:12`; `recovery-2026-09-18.md:40-45`).
- R-B remains the adoption unit still in flight (`recovery-2026-09-18.md:17`; `rebaseline-recovery.md:8`).
- Scaffold `0.0.75` must not pack or publish until the generated Vue `setup:browser` host repair and its review close (`rebaseline-recovery.md:10-11`, `:15`).
- D27: run the clean pass last from a Roughnotes worktree carrying no `.orkestrel/` folder (`design-verdict.md:67`).

**Acceptance conditions named in the sources.**

- ROADMAP 17: checkout carrying none of this campaign’s own verdicts; rule whether the tightened statechart trigger fires; prior pass refused because the tree held its own subject and the acceptance tier copied the retained verdict (`ROADMAP.md:17`).
- Design exit: run from a clean worktree; statechart trigger ruling recorded (`design-verdict.md:103-104`).
- Field-testing pass discipline: goal-only prompts; fresh state per round; no coaching or hand retries; tracked background command under a hard cap; journal is the evidence of record (`field-testing.md:22-30`).
- Field-testing scoreboard: model, harness, calls, failed calls, outcome, delta from the prior round (`field-testing.md:71-75`).
- A tier passes when its models complete the goal with zero failed calls and no out-of-band reading (`field-testing.md:73-75`).
- Acceptance tier (Haiku or a Codex high-volume model) must walk the surface unaided (`field-testing.md:13-14`).
- Local floor (quantized 2B-class model) is not an acceptance gate (`field-testing.md:15-18`).
- Tightened trigger text now in the skill: Statechart is owed “Where a journey drives a transition of an entity carrying its own state and event vocabulary” (`orkestrel-prove-journey/SKILL.md:43`). A view-local reactive ref is not such an entity (`statechart.md:30-34`).
- Prior contaminant: Roughnotes carried `journey-readiness-verdict.md`, so every tier could read “family not owed”; that pass does not settle the trigger (`retained/field-pass-journey-skill.md:30-39`; `retained/debrief-verdict.md:40`, `:90-91`).
- Field-2 instruction now in the skill: treat a retained readiness verdict as evidence to re-verify against the tip, never as a plan to resume (`orkestrel-prove-journey/SKILL.md:28-30`). Debrief still records Field-2 as wording owed to that skill (`retained/debrief-verdict.md:41`). Live-use defects close with live use (`orkestrel-debrief/SKILL.md:40-42`).

**What the contaminated pass did settle (not the trigger).** No unpublished verb, including `pressKeys`, appeared in any tier’s plan (`retained/field-pass-journey-skill.md:27-28`).

---

## Debrief completion

**Requirement.** After adoption and the clean field pass, run the debrief to a terminal line, then retire the campaign folder only through retention.

**Artifact / action.** The skill’s round (`orkestrel-debrief/SKILL.md:52-93`):

- Scope and gather the campaign record; state what evidence exists and what must be produced fresh (`:54-57`).
- Field evidence: drive what was built with real consumers; for the agent-facing skill, follow `field-testing.md` (`:58-59`, `:32-35`).
- Artifact audits: layer/boundary, package promotion, test-infrastructure sweep; every row ends implement, repair, retain, or intentionally exclude (`:60-70`).
- Process retrospective over the campaign record (`:71-75`).
- Instruction-set audit, both lanes, same brief, per `instruction-audit.md` (`:76-79`; `instruction-audit.md:7-25`). Terminal line shape: `INSTRAUDIT <LANE>: <finding ids, or none>` (`instruction-audit.md:14-17`).
- Reconcile numbered findings into the campaign folder; every finding in exactly one bucket (`orkestrel-debrief/SKILL.md:80-82`, `:36-39`).
- Land refinements; owner’s direction where the root contract is touched; re-prove by the evidence class that found the defect (`:83-86`, `:40-42`).
- Propagate portable canon through the scaffold host inventory, stage, gate, and push (`:87-90`).
- Dispose: present the disposition map, then retire via `retention.md` (`:91-93`).

**Owner.** Orchestrator runs the round. Owner’s direction is required where the root contract is touched (`orkestrel-debrief/SKILL.md:84-85`; `retained/debrief-verdict.md:74-86`). Owner’s explicit go-ahead authorizes prune after the checks close (`retention.md:16-23`; `retained/debrief-verdict.md:93-94`).

**Prerequisite links.** Field pass and debrief run after adoption closes (`recovery-2026-09-18.md:40-41`). Retain evidence before any campaign retirement (`rebaseline-recovery.md:13`). Carry into instruction refinement: stale repair-group spelling, state-settle incompatibility, and missing Vue host proof (`rebaseline-recovery.md:13`). Do not silently prune (`retention.md:23-25`; `orchestration.md:524-527`).

**Acceptance conditions.**

- Finding table (id, evidence pointer, bucket, carrier), canon delta, re-proof evidence, and exactly one terminal line: `DEBRIEF: FOLDED` or `DEBRIEF: OPEN` with blockers (`orkestrel-debrief/SKILL.md:95-101`).
- The 2026-09-16 round ended `DEBRIEF: OPEN` — findings bucketed; root-contract refinements need owner’s direction; prune blocked (`retained/debrief-verdict.md:96-97`).
- Carry check: every open item has a carrier or the prune stops (`retention.md:64-69`).
- Promotion, measurement, and orientation checks close before delete (`retention.md:20-21`, `:74-97`).
- Delete only on the owner’s explicit go-ahead; commit the deletion with the promotion record as the message (`retention.md:22-26`, `:99-107`).
- Sweep the whole `tmp/` tree; name each file; never sweep while a unit is live (`retention.md:50-62`).
- Mirror discipline: every roster or contract change lands on all provider surfaces in the same round (`instruction-audit.md:109-113`).

**Open items the 2026-09-16 debrief still names.**

| Id | Required action | Carrier / condition |
| --- | --- | --- |
| Field-1 | Clean statechart probe over a subject with no prior verdict | Law already in `field-testing.md`; probe owed before the trigger is settled (`debrief-verdict.md:40`, `:90-91`) |
| Field-2 | Skill wording that a retained verdict is evidence to re-verify | Named carrier `orkestrel-prove-journey`; wording owed (`debrief-verdict.md:41`). Current skill has that sentence (`SKILL.md:28-30`). Re-proof still owed under the live-use law |
| F1 | Rename implementation lanes by engine; retire harness-relative `implementer` | Owner’s direction; touches orchestration, `CLAUDE.md`, both transports, both agent directories (`debrief-verdict.md:80-82`) |
| F6 | Create `.agents/transports/cursor.md`; reduce both `grok` charters to a route pin | Owner’s direction; adds a vendored path (`debrief-verdict.md:83-84`) |
| F4, F5, F7, O1, O6, O7 | Remaining root-contract and charter edits | Owner’s direction, wording supplied by the lanes (`debrief-verdict.md:85-86`) |
| readHit | Adversarial audit round | Unit committed and gated; no adversarial lane has read it (`debrief-verdict.md:92`) |
| Prune | Retention checks then owner go-ahead | Carry check does not close while direction items are open (`debrief-verdict.md:93-94`) |

Product findings from the contaminated pass remain Roughnotes forward work / owner decisions, not instruction-set work (`debrief-verdict.md:43-49`; `design-verdict.md:68` D28; `field-pass-journey-skill.md:52-94`): shared document title; missing description/favicon/canonical/social card; blank render-error page; unreached miss screens; unknown route silent fallback; Chromium-only gate; transport entity-flag reads; Bootstrap class settle; unchecked external destinations; forms that paint acceptance; no privacy statement; fixture data under a real brand.

ROADMAP still lists the config-override process defects as unlanded (`ROADMAP.md:24`) and the generated-workspace plugin-selection seam as open (`ROADMAP.md:25`; `debrief-verdict.md:60-61`).

---

## Contradictions

**What “fresh / clean” means.**

- ROADMAP 17 attributes to `field-testing.md` a refusal of “a tree holding its own subject” (`ROADMAP.md:17`).
- Current `field-testing.md` fresh-state rule is: new workflow/resource ids, a fresh server, never inherit a sibling’s residue (`field-testing.md:25-26`). It does not mention a campaign verdict, `.orkestrel/`, or the subject tree.
- D27 / recovery require a Roughnotes worktree carrying no `.orkestrel/` folder (`design-verdict.md:67`) *or* a checkout without this campaign’s verdicts (`rebaseline-recovery.md:12`). Those are not the same constraint.

**Plan-only pass versus live drive.**

- Original prompt: produce the plan; do not run it, edit, or start a server (`field-pass-journey-skill.md:15-16`).
- `field-testing.md` requires walking the surface, zero failed calls, and treats a re-film that drives the surface as a field pass (`field-testing.md:13-14`, `:73-78`).

**Scoreboard shape.** Original pass columns are unaided walk, out-of-band reading, statechart ruling, unpublished verb (`field-pass-journey-skill.md:21-25`). The method file’s scoreboard is model, harness, calls, failed calls, outcome, delta (`field-testing.md:71-72`).

**Tiers.** Design routing names Opus, Sonnet, Haiku (`design-verdict.md:85`). `field-testing.md` also names a local 2B-class floor that is not an acceptance gate (`field-testing.md:15-18`).

**Whether D27 is already “landed”.** Design skill exit lists D22–D27 as skill work to land (`design-verdict.md:98-99`). D27 is restatement *and* the clean run (`design-verdict.md:67`). ROADMAP 17 already names the debrief `field-testing.md` path (`ROADMAP.md:17`); the run is still listed as unreached.

**Field-2 status.** Debrief table still says wording owed (`debrief-verdict.md:41`). The skill already contains the sentence (`orkestrel-prove-journey/SKILL.md:28-30`).

**F1 / F6 versus the current tree.** Debrief still demands owner’s direction to create `.agents/transports/cursor.md` and retire `implementer` (`debrief-verdict.md:80-84`). The tree now has `.agents/transports/cursor.md`, and `implementer` does not appear under `.agents`. Orchestration already binds that transport (`orchestration.md:204-206`). No named campaign record states that the owner authorized those landings.

**F8 versus the current falsify brief.** Debrief says the shared numbered-claims file is named in no instruction (`debrief-verdict.md:29`). `orkestrel-falsify/references/brief.md:25-27` now names `tmp/audit/<unit>-audit-claims.md`.

---

## Unresolved inputs

- No original field-pass brief and no original debrief brief under `.orkestrel/campaign`; only retained reports/verdicts.
- Whether the remaining field pass is plan-only (prior pass) or a live drive (current `field-testing.md`).
- Whether “no `.orkestrel/` folder”, “none of the campaign’s own verdicts”, or “fresh server / no sibling residue” is the binding clean-state rule.
- Whether the local 2B floor must run.
- Whether Field-2 is closed by the current skill sentence or still open until a clean acceptance-tier pass derives its plan.
- Whether F1, F6, F8, and related root-contract items are still open pending recorded owner’s direction, or already carried by later canon edits.
- Whether the `readHit` audit is still owed after later test-package work; the 2026-09-16 verdict is the last named statement.
- Exact referents of recovery’s “stale repair group spelling” and “state-settle incompatibility” beyond the one-line carry in `rebaseline-recovery.md:13`.
- Live R-B and Vue-host-repair completion state, other than “adoption not closed” / “do not publish until the Vue host repair and review close.”
- Owner’s go-ahead for prune: not recorded as given.

Campaign acceptance still names the clean field pass as required before acceptance (`recovery-2026-09-18.md:43-45`; `design-verdict.md:89-91`). This mapping does not accept, design, or schedule that work.