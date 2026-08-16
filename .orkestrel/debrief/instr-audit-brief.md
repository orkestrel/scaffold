# Unit: instr-audit — adversarial audit of the instruction set against the A-campaign record

One brief, two blind lanes. Your dispatch names your lane: **SUBJECTIVE** (Opus 5) or
**OBJECTIVE** (GPT-5.6 Sol). Perform only your lane. You are one of two independent
auditors and you never see the other lane's answer. Perform the assignment directly and
spawn nothing.

## Authority — read first

`.agents/orchestration.md`, `AGENTS.md`, then the method reference
`.agents/skills/orkestrel-debrief/references/instruction-audit.md`. That reference defines
your lane's method; this brief does not restate it.

## Objective

Judge the instruction set — role charters, rules, skills, orchestration contract, harness
bridges — against what the A-campaign record shows actually happened. What confused an
executor is a defect in the instruction, not the executor. Successes count: an instruction
that repeatedly produced clean rounds is evidence for its shape, and you may say so.

## Subject files — the instruction set under audit

- `.agents/orchestration.md`, `AGENTS.md`, `CLAUDE.md`
- `.claude/rules/*.md` — 11 files
- `.claude/agents/*.md` — 14 role charters
- `.codex/agents/*.toml` — 13 mirrors
- `.agents/skills/orkestrel-falsify/**`, `.agents/skills/orkestrel-debrief/**`

## Evidence — the campaign record

`.orkestrel/debrief/record/` — 35 files: `a-plan.md`, `a-acceptance.md`, two `a-design-*`
lanes, three `a0-*` absorb files, and per-unit briefs/reports/verdicts for A6-A11. The
record is the primary source; quote it verbatim.

Anchors the record substantiates (verify each pointer yourself; distrust this list):

- A10's brief asserted the codex sandbox permits localhost (`a10-brief.md:85`); the unit's
  report states the sandbox denied localhost binds, EPERM, and that ::1 failed
  EAFNOSUPPORT (`a10-report.md:7-9`).
- A killed codex exec left a live `codex-code-mode-host` orphan (`a-plan.md:82-86`).
- Three audit rounds returned FAIL verdicts that fix rounds closed (a6, a9, a10 verdict
  files); no round in the record churned without a substantive finding.
- The A11 re-film's 13 frames live "under the session scratchpad" and its script is not in
  the record (`a11-refilm-record.md:6`).

## SUBJECTIVE lane — Opus 5

Role-model coherence per the method reference: is each role's job one job; does each
charter's voice match how the record shows it was used; does the skill family read as one
system; do the bridges (`CLAUDE.md`, `.codex/` config) add only what their harness needs
without restating the contract; name any wording that would misroute a unit, stall a lane,
or read differently in the two places it appears.

## OBJECTIVE lane — GPT-5.6 Sol

Run the five evidence lanes from the method reference against the subject files and the
record: duplication diff; mechanical-equivalence groups over `.claude/agents/*` frontmatter
and `.codex/agents/*.toml`; charter-versus-usage drift (each charter's promises versus how
the record shows the campaign actually dispatched it); promise-versus-tooling gaps; roster
completeness on both axes against the campaign's actual work classes, including the
Claude/Codex mirror asymmetry (`sol.md`+`codex.md` on the Claude side, `opus.toml` and no
`sol`/`codex` mirror on the Codex side).

## Scope

Read-only. Off-limits: `.orkestrel/debrief/ledger.md` (the orchestrator's working notes —
reading it destroys your independence), `tmp/**`, `node_modules/**`, `.git` internals,
`.env*`, `.npmrc`, `auth.json`, every credential. Do not run mutating commands.

## Output

Numbered findings, most severe first. Each: lane; claim in one sentence; evidence
(`file:line` plus a short verbatim quote from the subject files and/or the record);
refinement class per the method reference; smallest concrete fix. A finding you cannot
evidence is not a finding. A clean sweep is a legitimate result — say so plainly rather
than manufacturing findings. End with exactly one line:

`INSTRAUDIT <LANE>: <n> findings`
