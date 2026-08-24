# Debrief reconciliation — the package-rows campaign (2026-08-24)

Lanes: subjective (planner charter, native Opus) and objective (Sol, journaled exec
`scratchpad/instr-audit-obj.jsonl`). Both blind, one brief. Ruled by the Orchestrator with the
user's direction from the debrief request (prune capability, artifact lifecycle,
processes-into-skills). Finding ids: S1-S15 subjective, O1-O9 objective.

## Rulings

1. **Brief preflight becomes an artifact (O1 + S5, convergent).** The record proves the laws
   were in context for every failure they failed to prevent — the section is unexecutable, not
   under-specified. ADOPT S5's shape: a brief TEMPLATE with named scope rows the writer cannot
   leave blank (`Owned`, `Shared (report-only)`, `Off-limits`, `What asserts the state this
   change ends`, `Standing conditions`, `Criteria cheap-first`), and the contract section
   shrinks to an imperative checklist naming each check and its trigger. O1's separate
   false-set-ledger workflow is folded into the template's "what asserts the state this change
   ends" row rather than a new skill. Carrier: R1 (contract) + R5 (template).
2. **Prune lands as a debrief reference with two doors (O3 + S3, convergent).** A prune has no
   trigger of its own, so no sibling skill: `orkestrel-debrief/references/retention.md` owns the
   whole procedure — the four checks, the artifact locations (`.orkestrel/<package>/`,
   `tmp/units/`, `tmp/<bench>/`, test-run scratch, `ROADMAP.md`/`PROPOSAL.md` lifecycle), the
   `tmp/` sweep including prior-session residue, the promotion-record commit message, and the
   gate ORDER: the four checks close it, the owner's go-ahead authorizes it.
   `.agents/orchestration.md` §§ artifacts/prune shrink to the trigger, the path, and one
   pointer. The vocabulary settles on "campaign folder" (the word "ledger" already means the
   routing and carry ledgers). Carrier: R1 + R3.
3. **The release becomes `orkestrel-publish` (O4 + S4, convergent).** S4's boundary test is the
   ruling and lands as prose in the contract: a line stays in the contract when an executor NOT
   doing that thing is worse off without it; a line becomes a skill when it fires on a named
   trigger with one reader at one moment. The skill takes the wave, preparation, approval, and
   window mechanics (`references/wave.md`, `references/window.md`); the contract keeps the
   user-credential and serialization laws, the long-running-command binding, and the
   catalog-derived layer order. Carrier: R2 (skill) + R1 (shrink).
4. **Bench operation stays contract + role files; the skill is dropped (O5 versus S4, ruled).**
   Every recovery in the record succeeded through role-owned mechanics, so the evidence does not
   demand a skill. The lessons land as law: one grok lane at a time (a starved bench is not a
   dark bench — the liveness probe answering while lanes return empty is the tell), and the
   resume law already lives in the codex contract. O5 dropped as a skill with this reason;
   its admission/starvation content lands in Bench laws. Carrier: R1.
5. **Audit-step lane naming (S1).** ADOPT: step 5 names `reviewer` (subjective) and `analyst`
   (objective) the way step 2 names its lanes, with `checker` IN ADDITION when criteria are
   mechanical, never in place of a lane. The record's checker-heavy audits worked, and S2's
   charter fix is what made them work by accident; the naming makes it deliberate. Carrier: R1.
6. **Adversarial-pass consistency (S13).** ADOPT the correction to the absolute sentence.
   Carrier: R1.
7. **Native-unit artifact homes (S12 + O2).** ADOPT: declare `tmp/units/<unit>-brief.md` and
   `-report.md` for native units beside the bench directories, define the round's verdict file
   as `.orkestrel/<package>/<unit>-audit-verdict.md`, and require the successor-pair naming on
   every corrected unit before integration. Carrier: R1.
8. **Charter fixes, mirrored (S2, S6, S7, S9, O6, O8/S8).** ADOPT all: checker gains the
   falsify-shape clause and the referral vocabulary; planner gains the escape clause and the
   contract pointer; one authority-pointer form across the roster; bridge descriptions rewritten
   as the driver's job; orkestrel narrowed to reconciliation over supplied evidence;
   root-reference trims for the restated ladder and `tmp/` retention. Carrier: R4.
9. **Roles-table cell and the one-token-two-engines rule (S10).** ADOPT: the cell reads `opus`,
   and the rule lands beside the table: `implementer` names the harness's native implementation
   lane; engine-named bridges (`sol`, `opus`) name the other engine. Carrier: R1.
10. **Transport contracts move out of the dispatchable roster (S11).** ADOPT as a bounded unit:
    `.agents/transports/{codex,claude}.md`, referrers updated, host inventory regenerated. The
    harness lists dispatchable agents from `.claude/agents/`, and a never-dispatch contract in
    that listing is a standing trap. Carrier: R8.
11. **Skill naming axes and the outsider (S14).** ADOPT the rule in
    `.claude/rules/documentation.md` § Workflow skills: subject skills take
    `orkestrel-<verb>-<noun>`, Orchestrator-process skills take `orkestrel-<verb>`. Rule on
    `enterprise-bootstrap` where it lives when R7 lands. Carrier: R7.
12. **Instruction-audit reference symmetry (S15 + the S6 half).** ADOPT: the subjective lane
    gets its own bounded section, each lane names its holding role (`reviewer` subjective,
    `analyst` objective), and the lens list has one home. The dropped-lens evidence (this
    round's own brief lost `lane-swap residue` in transcription) is the proof. Carrier: R3.
13. **Align-packages authority order (O7).** ADOPT. Carrier: R6.
14. **No new roles (O9).** ADOPT the drop: the campaign's failures were brief, route, capacity,
    and procedure defects; the roster spans the work classes. On the record.
15. **Fixture-registry self-pins (this session's release evidence).** The 0.0.51 bump tripped
    literals with no tripwire comment (the canned packuments and the looked-up version in the
    CLI suite) beside the documented digest tripwire. The publish skill's preparation reference
    names the self-pin sweep (`grep` the prior version across `tests/` and `src/`) as a step.
    Carrier: R2.

## Landing units (serial in scaffold, after the layer-1 uploads; Opus implementer unless noted)

R1 contract edits · R2 `orkestrel-publish` · R3 debrief references (retention + audit symmetry)
· R4 mirrored charter fixes · R5 the brief template (home: `.agents/templates/brief.md`, named
from the contract) · R6 align-packages order · R7 documentation naming axes · R8 transport move.
Gates: policy sweep, `test:config` after every host-inventory regen, guides parity. These edits
move `dist/host`, so they ship in scaffold's next release, not 0.0.51.
