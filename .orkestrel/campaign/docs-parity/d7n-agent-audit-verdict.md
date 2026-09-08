# Audit verdict — agent

Workflow `wf_8f5b2bda-416`, 2026-09-08, alone: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and a `checker` (Sonnet), blind and clean, on `d7n-agent-audit-brief.md`. Lanes retained as `d7n-agent-audit-{subjective,objective,checker-agent}.md`.

| Lane | Verdict | Substance |
| --- | --- | --- |
| subjective | FAIL 4 12 | claim 4 on the methods-only interface rows with neither braces nor `plus`; claim 12 on citations and counts; findings F1 to F4 |
| objective | FAIL 9 12 | claim 9 on descriptions repeating their `@remarks`, a tally in the guide, and all-caps in rewritten blocks' remarks; claim 12 on citations off by a line and counts; findings F1 to F6 |
| checker | FAIL 9, 11 | claim 9 on a tally at `guides/agent.md:786`; claim 11 unruled for want of retained gate logs (the closure's verifier takes it) |

## Findings carried into the fix round (`d7n-agent-converge-fix-brief.md`)

- A1 — the `### Constants` table's `Shape` column (subjective F1, objective F2, Ruling 18).
- A2 — the `### Validators` guard table's `Shape` column under the guard sentence (subjective F2, Ruling 20).
- A3 — the methods-only interface rows in `{} plus …` form (subjective claim 4, objective F5, Ruling 27).
- A4 — the all-caps emphasis in `@remarks` (subjective F3, objective F4 and claim 9).
- A5 — the descriptions repeating their `@remarks` in `ProviderInterface.stream` and `ConversationInterface.compact` (objective claim 9 and F1, Ruling 7).
- A6 — the tallies at `guides/agent.md:786` and `:830` (objective claim 9, checker claim 9).
- A7 — the stray empty comment line closing the rewritten blocks (objective F3).
- A8 — the `## Surface` topic headings at H4 (subjective F4).
- A9 — the closing sweep's items from `d7n-agent-close-brief.md`.

## Rulings and carries

- Claim 12 on both lanes: report defects (citations a line off, counts); the Orchestrator annotates the converge report.
- Objective F3's cause: the seed's `--to source` write leaves a trailing empty comment line; carried to scaffold's seed findings in `d7-fleet-plan.md`.
- Objective F6 and checker claim 11: the closure's independent `verifier` takes the authoritative gate run.
- The subjective observation on fence comments' emphasis: stands (the fences are pinned by the titled pair and the executed cases).
