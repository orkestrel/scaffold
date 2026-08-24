# Instruction-set audit — the package-rows campaign (2026-08-24)

You are one lane of a blind adversarial pass over the INSTRUCTION LAYER — the agents, rules,
skills, and orchestration contract in `/home/user/scaffold` — judged against the campaign
record. You perform this audit directly and spawn nothing. Do not see or seek the other
lane's answer. Return numbered findings, most severe first, and exactly one terminal line:
`INSTRAUDIT <SUBJECTIVE|OBJECTIVE>: <n> findings`.

## The record

The campaign record (extracted from the pruned folder; primary source, quote verbatim):

- `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/debrief-record/plan.md`
  — the unit ledger, deviations, lessons, and close.
- The design reconciliations beside it (`d1-`, `d2c-`, `d2d-reconciliation.md`).

The instruction layer under audit: `AGENTS.md`, `.claude/rules/*.md`, `.agents/orchestration.md`,
`.claude/agents/*.md`, `.agents/skills/*/SKILL.md` (canonical skills) and their
`.claude/skills/*/SKILL.md` bridges.

## What the campaign record shows (verify, do not trust)

- Brief-scoping failures recurred: units stopped on files their briefs withheld though the
  change made them false (SD1's test grant, SD2's host.json omission, SD7's materialized
  half, SD2-FIX-2's Materializer pin, PD2-FIX's guide row with no named carrier). The law
  ("scope by what the change makes false") exists in `.agents/orchestration.md` — ask why it
  kept failing in practice and what refinement would make it operative.
- Cleanup is ad hoc: campaign folders (`.orkestrel/`), launch copies (`tmp/units`,
  `tmp/codex`, `tmp/cursor`), test-run scratch (`tmp/scaffold-*`, capture dirs), and
  plan-of-record files (`ROADMAP.md`, `PROPOSAL.md`) each have retention laws scattered
  across `.agents/orchestration.md` (Dispatch anatomy, Where campaign artifacts live, Before
  you prune, Ephemeral streams) but NO skill owns the executable prune procedure, and this
  session found residue from campaigns before it.
- The user asks whether the orchestration PROCESSES should become skills: which parts of
  `.agents/orchestration.md` are executable procedures a skill should own (release wave,
  publish window, bench recovery, prune, campaign close) versus standing law that must stay
  always-loaded contract.

## Your lenses

SUBJECTIVE lane: role-job singularity; charter voice against dispatched usage; bridge
minimalism; vocabulary drift across mirrored files; skill-family seams (where does a prune
skill sit beside debrief/falsify/harden — one skill or a debrief reference?); the
contract-versus-skill boundary as a design question (what reads as law, what reads as
procedure).

OBJECTIVE lane: duplication diff across charters/rules/skills; charter-versus-usage drift
against the record's actual dispatches; promise-versus-tooling gaps; roster completeness
against the campaign's work classes (note the record's bench events: cap-kills recovered by
resume, a container restart recovered by resume, one bench starvation); which units could
not be re-run from their recorded brief; where the retention laws for tmp/, `.orkestrel/`,
and ROADMAP actually live and whether any two owners state them differently.

## Output

Numbered findings with verbatim evidence (file:line or record quote), each with a proposed
refinement class (role/rule/charter/skill-create/skill-refine/process/guide/roadmap/drop),
then the terminal line.
