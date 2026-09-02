# Audit brief — unit canon (the 2026-09-02 debrief refinements)

## Role and lane

Two read-only lanes on Claude Opus 5 in clean contexts, blind to each other, and one `checker` on Sonnet:

- `reviewer` holding the **subjective** lane: charter voice, whether each landed rule reads as one instruction an executor can act on, vocabulary drift across the Claude and Codex mirrors, skill-family seams.
- `reviewer` holding the **objective** lane as the recorded substitution for the dark GPT-5.6 Sol bench: fidelity of each row to the ruling, one home per rule (duplication diff between root and leaf), scope honesty, the writing sweep.
- `checker`: the mechanical claims (5, 6, 7) with grep evidence.

## Subject and evidence

The canon unit's uncommitted changes in `/home/user/scaffold`, rendered at `tmp/units/canon.diff` (`git diff HEAD`) and `tmp/units/canon.status` (`git status --short`), with the writer's report at `tmp/units/canon-report.md`. The rulings are `.orkestrel/campaign/debrief.md` § Findings, whose carriers name this unit; the rows the writer received are `tmp/units/canon-brief.md` § Rows. The lanes' verbatim findings are under `.orkestrel/campaign/debrief/`. Your own engine wrote the subject; attack it harder for that.

## What the round decides

Whether the refined canon is committed and propagated to every fleet target through the host inventory, or goes back for a fix round. A landed rule that restates a root law, contradicts a sibling, or reads as prose addressed to a person will be vendored into every target and read by every later agent as law.

## Already established

The debrief rulings themselves are not under audit; a lane that disagrees with a ruling records it as a referral to the Orchestrator, not as a broken claim.

## Claims

1. Every row of `tmp/units/canon-brief.md` § Rows is `applied` in the named file and section, and the landed text carries the ruling's substance from `debrief.md` (the trigger, the action, and the named exception where the ruling has one). A row landed elsewhere, landed as a weaker obligation, or landed as a stronger one than the ruling states is BROKEN.
2. Every landed line is a directive with an observable trigger and a required action, per `AGENTS.md` § Instruction files: no rationale addressed to a person, no history of how the finding was found, no example that merely illustrates, no count in prose, never `should`.
3. Every landed rule has one home: no landed sentence restates a law another file already owns (the root contract, a rule file, a skill), and a mirror (`.codex/agents/*.toml`) carries the same obligation in its own words without copying the root's paragraph. The duplication diff is the evidence.
4. The Claude charter and its Codex mirror agree on every obligation the rows touch (reviewer, planner, checker, verifier, builder, grok, analyst/opus), and both operating-contract role tables still hold.
5. The writing sweep is clean: a case-insensitive sweep of `\bshould\b`, `\brobust\b`, `\bperformant\b`, `\butilize\b`, `\bleverage\b`, `\bvia\b`, `\bsimply\b`, `\bjust\b`, `\be\.g\.\b`, `\bi\.e\.\b`, `\betc\.\b` over every file the diff touches returns only the `writing.md` substitution-table rows and the permitted senses the objective lane ruled (name each hit and its sense).
6. `git status --short` lists only files under the brief's Owned row plus `host.json`.
7. The skill shape holds: every `references/*.md` file under an edited skill is named from its `SKILL.md`, each `SKILL.md` frontmatter carries only `name` and `description`, and every `.claude/skills/<name>/SKILL.md` bridge still matches its canonical twin's `name` and `description`.
8. Nothing beyond the rows changed: every hunk in the diff traces to a row, and the report's `stopped` rows (if any) name a deviation the Orchestrator must rule rather than a row silently skipped.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts (`CONFIRMED`, `BROKEN` with the failing text and the smallest correct fix, `UNRESOLVED` with what would settle it), findings outside the claims, referrals, the claims attacked and held, and exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. Say in your first line which lane you held and the engine substitution.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing.

## Orchestrator edits inside the subject

After the writer stopped on row 9, the Orchestrator applied the row's patch to `CLAUDE.md` (§ Models gains the Workflow model-alias rule; § Dispatch mechanism references it) and, on the writer's observation, replaced the count in `orkestrel-debrief/references/instruction-audit.md`'s terminal line with the member-naming form (`INSTRAUDIT <LANE>: <finding ids, or none>`). Both edits are in `tmp/units/canon.diff` and under every claim.
