# Audit verdict — lsp

Workflow `wf_402fa40c-0a7`, 2026-09-08, alone: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and a `checker` (Sonnet), blind and clean, on `d7n-lsp-audit-brief.md`. Lanes retained as `d7n-lsp-audit-{subjective,objective,checker-lsp}.md`.

| Lane | Verdict | Substance |
| --- | --- | --- |
| subjective | FAIL 12 | counts in both reports' prose; findings F1 to F6 |
| objective | FAIL 3 5 12 | claim 3 on the `protocol.mjs` description naming the body where the code returns header plus body; claim 5 on `destroy`'s dropped drain fact; claim 12 on counts, a false report sentence about `destroy`'s block, and an unbounded citation; findings F1 to F5 |
| checker | PASS | every mechanical claim |

## Findings carried into the fix round (`d7n-lsp-converge-fix-brief.md`)

- L1 — the colon-ended lead-ins that point across the convention sentence (subjective F1, objective F2).
- L2 — `### Stdio transport` and `### Client` against the guide's own vocabulary (subjective F2).
- L3 — the `protocol.mjs` description's unit (subjective F3, objective claim 3).
- L4 — the fences at `guides/lsp.md:131`, `:196`, and `:213` with no lead-in (subjective F4, the closing item).
- L5 — the titled fence's unread `diagnostics` binding (subjective F5, objective F3).
- L6 — `destroy`'s block regains the drain fact in `@remarks` (objective claim 5).
- L7 — the comment lines over the print width in `tests/setupServer.ts` (objective F1).
- L8 — Ruling 26 for the function rows carrying an empty `Shape` cell.

## Rulings and carries

- Subjective F6 (raise the `## Methods` subsections to `###`): refused under Ruling 27; the heading level is the reader's contract.
- Objective F4 (`plus` in two positions): Ruling 27, no change. Subjective referral on `LSPErrorCode`'s cell: Ruling 27, the resolved union stands.
- Objective F5: an observation, no action.
- Claim 12 on both lanes and the objective lane's false sentence and unbounded citation: report defects; the Orchestrator annotates the prep and converge reports.
