# Unit canon-fixup-2 — close the cross-engine audit's residue on the canon

## Role and engine

`builder` on Claude Sonnet, a native subagent in `/home/user/scaffold`, the sole writer in that tree. Perform the assignment directly and spawn nothing. Every row is an exact replacement; the thinking happened upstream.

## Objective

Land every row below so the cross-engine audit's BROKEN claims 2, 3, 4, 6 and its findings F1–F5 close, with the gate chain green and `host.json` regenerated. The Orchestrator verifies each landed string itself in place of a further lane, because every row adopts the auditor's prescription verbatim.

## Context

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`. Never write `should`; no count in prose; never name a list item by its number.

**Evidence.** The audit verdict is `.orkestrel/campaign/debrief/canon-fixup-audit-objective.md`. The baseline is commit `bf24f44`; the tree is clean.

**Host.** POSIX shell in `/home/user/scaffold`, Node 22, no network needed. `npm run build` regenerates `host.json`; run the chain in the acceptance order.

**Standing conditions.** A repack pass runs `npm run build` in this checkout from a detached script when it packs scaffold; if a build log appears under `tmp/tarballs/` while you work, ignore it. Do not touch `tmp/`.

## Unknowns

None.

## Scope

**Owned.** `.agents/skills/orkestrel-falsify/SKILL.md`; `.agents/skills/orkestrel-falsify/references/brief.md`; `.claude/agents/checker.md`; `.codex/agents/opus.toml`; `.claude/agents/application.md`; `.agents/orchestration.md`; `.agents/skills/enterprise-bootstrap/references/components.md`; `.codex/agents/grok.toml`; `.codex/agents/planner.toml`; `host.json` (regenerated, never edited).

**Off-limits.** Every other file, `AGENTS.md` and `CLAUDE.md` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, install, or run a discarding git command.

## Rows

1. **`.agents/skills/orkestrel-falsify/SKILL.md` § Run the round** — replace the bullet `A round that runs fewer lanes than its brief names records the deviation with the round's own reason; \`.agents/orchestration.md\` § Execution loop owns the lane rule and § Engine assignment owns the substitution.` with `\`.agents/orchestration.md\` § Execution loop owns which lanes a round runs and the deviation a short round records; § Engine assignment owns the substitution.`
2. **`.agents/skills/orkestrel-falsify/references/brief.md` § The read-only audit lane's brief** — replace the sentence fragment `— plus two rows of its own: **Role and lane** (the role, its engine, and which lane it holds) and **Output** (the verdict shape and its single terminal line).` with `— plus its own **Role and lane** row (the role, its engine, and which lane it holds) and **Output** row (the verdict shape and its single terminal line).` Then rewrap that paragraph so no line exceeds 100 characters, changing no words.
3. **`.claude/agents/checker.md`** — replace `addressed to the subjective lane when it is running and to the Orchestrator when you hold every lane it names` with `addressed to the subjective lane when it is running and to the Orchestrator when it is not`.
4. **`.codex/agents/opus.toml`** — replace `Every authority the brief references exists in the tree the run is rooted in; propagate a missing file` with `Verify that every authority the brief references exists in the tree the run is rooted in; propagate a missing file`. Reflow the paragraph at the file's width if the change pushes a line past it.
5. **`.claude/agents/application.md` frontmatter** — replace `Writes only owned files as the sole serial writer and stops on any plan deviation.` with `Writes only owned files in the checkout the unit writes as the sole serial writer and stops on any plan deviation.`
6. **`.agents/orchestration.md` § The engines** — replace `§ Execution loop step 5 fixes which lanes an audit runs.` with `§ Execution loop's audit step fixes which lanes an audit runs.`
7. **`.agents/orchestration.md` § Execution loop, the audit step** — replace `the way step 2 names its lanes` with `the way the design step names its lanes`, then rewrap that step's first paragraph (the one ending `never a template sentence.`) so no line exceeds 100 characters, changing no words.
8. **`.agents/skills/enterprise-bootstrap/references/components.md`** — replace, on the four lines carrying them, `Width/height via` with `Width/height through`, `focusable via` with `focusable through`, `shown via a trigger` with `shown through a trigger`, and `never report form errors via tooltip` with `never report form errors through a tooltip`. Touch no other `via` (a backticked token stays).
9. **`.codex/agents/grok.toml`** — rewrap the paragraph that carries the `.err`-journal sentence (the line running to about 138 characters) at the file's width, changing no words.
10. **`.codex/agents/planner.toml`** — reflow the paragraph whose lines read `units that each name their role and` / `engine; tensions named for the other lane to challenge` at the file's width so no orphan line remains, changing no words.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/canon-fixup-2-report.md`: per row `applied` with the landed sentence, or `stopped` with the deviation; the sweep `grep -rnE '\bstep [0-9]\b' .agents .claude .codex CLAUDE.md`, which must return nothing; each gate command with its exit code. Write `tmp/units/canon-fixup-2.diff` (`git diff HEAD`) and `tmp/units/canon-fixup-2.status` (`git status --short`). Return the report's content.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done — when a row's old text is not found verbatim at the named place or a gate fails. Decide and record an ancillary question: wrap positions.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run build` exits 0.
5. `npm test` exits 0.
6. The `step [0-9]` sweep returns nothing; a `\bvia\b` sweep over `components.md` returns only backticked tokens.
7. `git status --short` lists only Owned files plus `host.json`.
