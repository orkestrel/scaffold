# Audit verdict — ollama

Workflow `wf_78ab42e4-9f9`, 2026-09-08, alone: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and a `checker` (Sonnet), blind and clean, on `d7n-ollama-audit-brief.md`. Lanes retained as `d7n-ollama-audit-{subjective,objective,checker-ollama}.md`.

| Lane | Verdict | Substance |
| --- | --- | --- |
| subjective | FAIL 4 12 | claim 4 on the empty `Shape` cells of every function, class, and constant row in the mixed table; claim 12 on the report's precedent argument and counts; findings F1 to F8 |
| objective | FAIL 9 12 | claim 9 on all-caps in a rewritten block and pointers in test prose; claim 12 on counts; findings as listed |
| checker | FAIL 12 | counts in the converge report's prose |

## Findings carried into the fix round (`d7n-ollama-converge-fix-brief.md`)

- O1 — the mixed `### Surface` table's empty `Shape` cells (subjective claim 4, Rulings 20, 26, 28).
- O2 — the lowercase sentence start at `guides/ollama.md:112` (subjective F2, objective).
- O3 — the all-caps emphasis in `src/server/OllamaProvider.ts`, `src/server/types.ts`, and `src/server/factories.ts:65` (subjective F3, objective claim 9).
- O4 — the causal `since` and the `above` pointers in test prose (subjective F4, objective).
- O5 — the guide's opening sentence (subjective F5).
- O6 — the stranded literals in the constants blocks (subjective F6, Ruling 18).
- O7 — the drop-in's header line (subjective F7, the closing item).
- O8 — the unbackticked `@orkestrel/agent` at `guides/ollama.md:119` (objective).
- O9 — the unresolvable `{@link NDJSONParser}` (objective).
- O10 — the closing sweep's items from `d7n-ollama-close-brief.md`.

## Rulings and carries

- Claim 12 on every lane and subjective F1: report defects; the Orchestrator annotates the converge and prep reports.
- Subjective F8 (`Both are optional` with the members in the preceding clause): stands, as the report ruled.
