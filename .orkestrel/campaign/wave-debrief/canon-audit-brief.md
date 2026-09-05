# Audit brief — unit canon (the wave debrief's refinements, 2026-09-05)

## Role and lane

Two read-only lanes on Claude Opus 5 in clean contexts, blind to each other, and one `checker` on Sonnet. The GPT-5.6 Sol bench is dark (`codex: command not found`), so Opus holds both lanes as the recorded substitution.

- `reviewer` holding the **subjective** lane: charter voice, whether each landed sentence reads as one instruction an executor can act on, vocabulary drift across the Claude and Codex mirrors, skill-family seams.
- `reviewer` holding the **objective** lane: fidelity of each row to its ruling, one home per rule (the duplication diff between the contract, the skill, and its references), scope honesty, the writing sweep.
- `checker`: the mechanical claims 5, 6, and 7 with grep evidence.

Say in your first line which lane you held and the engine substitution.

## Subject and evidence

The Orchestrator's canon unit: the uncommitted changes to `.agents/orchestration.md`, `.agents/skills/orkestrel-publish/SKILL.md`, `.agents/skills/orkestrel-publish/references/wave.md`, `.agents/skills/orkestrel-publish/references/window.md`, `.claude/agents/reviewer.md`, `.claude/agents/orkestrel.md` (the prose sentence at its line 123 belongs to unit `catalog-peers`; the regenerated marker-bounded table is the built CLI's output from `node dist/bin/main.js catalog` on 2026-09-05), `.codex/agents/orkestrel.toml`, `.codex/agents/reviewer.toml`, and `ROADMAP.md`, rendered at `tmp/units/canon.diff` (`git diff` over those paths) with `tmp/units/canon.status` (`git status --short`, which also carries unit `catalog-peers`' files under `src/`, `tests/`, `guides/`, the guide mirrors the catalog run refreshed under `guides/` (console, contract, emitter, guide, html, markdown, probe, process, template, test), `host.json`, and the debrief folder). The rulings are `.orkestrel/campaign/wave-debrief/debrief.md` § Findings, whose carriers name this unit; the lanes' verbatim findings are `.orkestrel/campaign/wave-debrief/instraudit-subjective.md` and `instraudit-objective.md`. Your own engine wrote the subject; attack it harder for that.

## What the round decides

Whether the refined canon is committed and pushed, so it reaches every fleet target with scaffold's next vendored release, or goes back for a fix round. A landed sentence that restates a law another file owns, contradicts a sibling, or reads as prose addressed to a person will be vendored into every target and read by every later agent as law.

## Already established

The debrief rulings themselves are not under audit; a lane that disagrees with a ruling records a referral to the Orchestrator, not a broken claim. The `catalog-peers` unit has its own audit.

## Claims

1. Every finding in `debrief.md` § Findings whose carrier is "canon edit" is applied in the named file and section, and the landed text carries the ruling's substance: the trigger, the action, and the named exception where the ruling has one. A row landed elsewhere, as a weaker obligation, or as a stronger one than the ruling states is BROKEN.
2. Every landed line in an instruction file is a directive with an observable trigger and a required action, per `AGENTS.md` § Instruction files: no rationale addressed to a person, no history of how the finding was found (a dated measurement with its reading is a value, not history), no example that merely illustrates, no count in prose, never `should`.
3. Every landed rule has one home: no landed sentence restates a law another file already owns (`.agents/orchestration.md`, a rule file, a skill or its reference), and where a sentence points at an owner it names the owner rather than copying it. The duplication diff is the evidence; `.agents/orchestration.md` § Publishing the fleet and the skill's boundary section (`SKILL.md` § The boundary with the contract) are the seam to attack.
4. The Claude charters and their Codex mirrors agree on every obligation the rows touch (`reviewer.md` with `reviewer.toml`; `orkestrel.md` with `orkestrel.toml`), and both operating-contract role tables still hold.
5. The writing sweep over the diff's added lines is clean: a case-insensitive sweep of `\bshould\b`, `\brobust\b`, `\bperformant\b`, `\butilize\b`, `\bleverage\b`, `\bvia\b`, `\bsimply\b`, `\bjust\b`, `\beasy\b`, `\be\.g\.`, `\bi\.e\.`, `\betc\.`, `\bcurrently\b`, `\bnow\b`, `\bnew\b`, `\blatest\b`, `\bsince\b`, `\bonce\b` returns only permitted senses (name each hit and its sense); no added sentence states a count of a growable set.
6. `git status --short` lists only the files this brief names as the canon unit's, the `catalog-peers` unit's files (`src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `src/server/Upstream.ts`, `src/server/Materializer.ts`, `tests/setup.ts`, `tests/setupServer.ts`, `tests/src/**`, `guides/scaffold.md`, `.claude/agents/orkestrel.md`), the refreshed mirrors under `guides/`, `host.json`, and `.orkestrel/campaign/wave-debrief/**`.
7. The skill shape holds: every `references/*.md` file under `orkestrel-publish` is named from its `SKILL.md`, the `SKILL.md` frontmatter carries only `name` and `description`, and `.claude/skills/orkestrel-publish/SKILL.md` still matches the canonical twin's `name` and `description`.
8. Nothing beyond the rows changed: every hunk in the diff traces to a finding row, the regenerated catalog table, or a strike the debrief names (the `ROADMAP.md` § 1 adoption-visit row and fleet publish wave row).

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts (`CONFIRMED`, `BROKEN` with the failing text and the smallest correct fix, `UNRESOLVED` with what would settle it), findings outside the claims, referrals, the claims attacked and held, and exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing; run nothing.
