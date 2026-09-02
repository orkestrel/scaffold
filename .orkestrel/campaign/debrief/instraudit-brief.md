# Unit instraudit — audit the instruction set against the campaign record

## Role and engine

Two lanes, each a fresh native Claude subagent on Claude Opus 5 with a clean context, blind to each other, reading this same brief:

- the **subjective** lane, held by `reviewer`;
- the **objective** lane, held by `reviewer` holding the objective perspective, because the GPT-5.6 Sol bench is dark (the `codex` binary is absent from `PATH`, probed 2026-09-02). Record the substitution in your verdict's first line.

The dispatch names the `orkestrel-debrief` skill, so its instruction-audit verdict shape binds: numbered findings most severe first and exactly one terminal line `INSTRAUDIT <LANE>: <n> findings`.

## Objective

Return the numbered findings your lane's lens list produces about the agents, rules, skills, and orchestration contract, judged against what this campaign's record shows actually happened. What confused an executor is a defect in the instruction, not the executor.

## Context

**Lens list.** Read your lane's own section of `.agents/skills/orkestrel-debrief/references/instruction-audit.md` — § The subjective lens list for the subjective lane, § The objective lens list for the objective lane — and state your coverage against it. Do not use a copied list.

**The instruction set under audit.** `AGENTS.md`; `CLAUDE.md`; `.agents/orchestration.md`; every file under `.claude/rules/`; every role file under `.claude/agents/` and its Codex mirror under `.codex/agents/`; every skill under `.agents/skills/` with its `references/` and the bridge under `.claude/skills/`; `.agents/templates/brief.md`; `.agents/transports/codex.md` and `.agents/transports/claude.md`.

**The campaign record.** `.orkestrel/campaign/npm-audit-deps-findings.md` is the primary register (read it in full; it is about 885 lines). The wave plans: `.orkestrel/campaign/fix/breaking-plan.md`, `.orkestrel/campaign/voice/plan.md`. The audit reconciliations: `.orkestrel/campaign/fix/audit-1-verdict.md`, `.orkestrel/campaign/audit-1-verdict.md`, `.orkestrel/campaign/src-audit/h12-audit-verdict.md`. Unit verdicts: `.orkestrel/campaign/fix/units/*-audit-verdict.md` and `.orkestrel/campaign/voice/units/*-audit-verdict.md` (read at least contract, middleware, workflow, agent, toolbox, vocabulary, guide from the fix set and agent, mcp, scaffold, guide from the voice set). Briefs the units opened: `.orkestrel/campaign/fix/units/*-brief.md`, `.orkestrel/campaign/voice/units/*-brief.md`. Bench journals: `tmp/cursor/*.log` heads.

**Incidents the Orchestrator knows of, as pointers to check rather than findings to adopt** (each names the findings-file section):

- § Routing correction (2026-09-01): a Workflow `agent()` call with `agentType: 'checker'` and no explicit model ignored the role file's `model: sonnet` pin and ran on the session model.
- § Breaking ledger, L2 to L6: the Grok bench returned an empty journal with exit 1 twice for one chunk; re-probe answered live; the lane re-ran alone.
- § L4 open: the staging harness followed no peer dependency, so probe's closure was wrong while `check` stayed green.
- § Voice wave: the pilot slice was killed by a container restart; briefs and checkouts survived on disk; the checker's claim 2 broke in four units on a brief defect (the mandated boolean `@returns` form dropping backticked tokens); the scanner misread hyphenated verbs.
- § Voice wave closed: the landing chain's `git add -A` swept campaign records into a source commit.
- § L3 fix rounds: `tests/setupPolicy.ts` walks top-level statements while the oxlint policy plugin sees inside a class body; `.claude/rules/names.md` has no `filter*` row; the wire-member `type` clause question from ollama.
- § Breaking phase — L2 fix rounds: a design ruling contradicted `.claude/rules/patterns.md` § Batch operations and was reversed by rule authority; the open user question on `clear` beside `remove()`.
- § Breaking phase — W0 closed: "define `entity` in `architecture.md` § Kind purity"; "a renamed interface member ships a stale guide sentence with parity green".
- The Sol bench was dark for the whole campaign, so Opus held every lane; every verdict recorded the substitution; the plan's ruling 11 says a same-engine PASS is weaker evidence.
- The debrief questions carried by the voice wave: the `Configures`/`Describes` type-doc vocabulary split; `Holds` on a derived getter; comment overflow past the print width; guide taglines and Surface rows keeping the noun-phrase genre.

**Law.** `AGENTS.md`; `.claude/rules/quality.md` § Falsification and § Probes before arguments; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Workflow skills; the `orkestrel-debrief` skill and its `references/instruction-audit.md`.

**Host.** You have Read, Grep, and Glob only. Working path `/home/user/scaffold`. No shell, no git, no writes.

**Standing conditions.** `.orkestrel/campaign/last/` and a handful of files under `.orkestrel/campaign/fix/units/` are untracked; they are retention copies, not subjects. A Grok lane is reading the same folder concurrently; it writes nothing under `.orkestrel/`.

## Unknowns

Whether a rule the campaign wrote mid-flight (the vocabulary text in `names.md`, the inflected-sweep rule in the brief template, the renamed browser style helpers in `tests.md`) has a duplicate or a contradiction elsewhere in the set. Report what you find under the duplication or vocabulary lens.

## Scope

**Owned.** Nothing. Read-only.

**Off-limits.** Every file. Read no `.env*`, `.npmrc`, `auth.json`, or credential.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Return only, as your final message:

1. One line naming the lane you held and the engine substitution.
2. Coverage: each lens in your lane's list, with `covered` or `not covered` and why.
3. Numbered findings, most severe first. Each finding: the instruction file and line, what the record shows (quote it verbatim with its `file:line`), what is wrong, and the refinement class from `instruction-audit.md` § Refinement classes with the one-sentence refinement you propose.
4. Exactly one terminal line: `INSTRAUDIT <SUBJECTIVE|OBJECTIVE>: <n> findings`.

No process diary. No summary of what was read.

## Deviation contract

Stop and report if the campaign register or the instruction set is missing. Decide and record any ancillary question yourself.

## Acceptance criteria

1. Every finding quotes the record verbatim with a resolvable `file:line`.
2. Every finding names a refinement class.
3. The coverage list matches your lane's own section in `instruction-audit.md`.

## Review evidence

This is a policy, design, and process subject: the proposal is the instruction set as it stands, the canon it must satisfy is `AGENTS.md` § Instruction files and `.claude/rules/documentation.md` § Workflow skills, and the record of what motivated it is the campaign folder named above.
