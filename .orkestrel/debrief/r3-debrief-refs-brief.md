# Unit R3 — debrief references: retention and instruction-audit symmetry

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Create `references/retention.md` in the canonical `orkestrel-debrief` skill and repair the
instruction-audit reference's lane symmetry.

## Context
- Rulings 2 and 12 in `/home/user/scaffold/.orkestrel/debrief/reconciliation.md` (findings O3,
  S3, S15, and the S6 half ruling 12 names).
- The skill lives at `.agents/skills/orkestrel-debrief/`. Read its `SKILL.md` and every existing
  reference first; the new reference must be named from `SKILL.md`.
- `references/retention.md` owns the whole prune procedure (ruling 2): the carry, promotion,
  measurement, and orientation checks; the artifact locations (`.orkestrel/<package>/`,
  `.orkestrel/campaign/`, `tmp/units/`, `tmp/<bench>/`, test-run scratch directories,
  `ROADMAP.md` and `PROPOSAL.md` lifecycle); the `tmp/` sweep including prior-session residue;
  the promotion-record commit message; and the gate ORDER — the checks close the prune, the
  owner's go-ahead authorizes it. Vocabulary: "campaign folder", never "ledger", for the
  `.orkestrel/` folder.
- R1 has landed: `.agents/orchestration.md` now points to this reference; read the pointer and
  match its path exactly.
- Instruction-audit symmetry (ruling 12): in the existing instruction-audit reference, give the
  subjective lane its own bounded section, name each lane's holding role (`reviewer` subjective,
  `analyst` objective), and give the lens list one home. The evidence: this campaign's own audit
  brief lost the `lane-swap residue` lens in transcription because the lens list had no single
  home.
- Skill authoring laws: `.claude/rules/documentation.md` § Workflow skills.

## Unknowns
Whether `SKILL.md` needs more than the reference-name additions to stay coherent after the new
reference; you decide the minimal edit and record it.

## Scope
- Owned: `.agents/skills/orkestrel-debrief/**` (canonical only).
- Off-limits: `.claude/skills/orkestrel-debrief/` (the bridge carries `name` and `description`
  only — verify no change is needed; if the description must change, stop and report),
  `.agents/orchestration.md`.
- Tools: Read, Grep, Glob, Edit, Write, Bash (scoped validation only); no commit.

## Execution
Perform the work directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r3-debrief-refs-report.md`: files touched, the retention
reference's section list, the symmetry repair, validation run. Return the same content as your
final message.

## Deviation contract
Stop and report if R1's pointer names a different path, or if the bridge would need edits.
File-internal structure is yours.

## Acceptance criteria
1. `references/retention.md` exists, is named from `SKILL.md`, and carries every item in the
   Context list.
2. The instruction-audit reference names both lanes' holding roles and has one lens-list home.
3. No template TODOs; skill directory inventory stays exactly `SKILL.md`, `agents/openai.yaml`,
   named `references/*.md`.
4. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures it.

## Standing conditions

- `test:config` is red at HEAD: the committed host inventory is stale for `.agents/orchestration.md` and `.claude/rules/documentation.md`. The Orchestrator regenerates `host.json` once at integration. Do not run `test:config`, and do not diagnose that red as yours.
