# Audit verdict — probe

Workflow `wf_3646492b-484`, 2026-09-08, alone: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and a `checker` (Sonnet), blind and clean, on `d7n-probe-audit-brief.md`. Lanes retained as `d7n-probe-audit-{subjective,objective,checker-probe}.md`.

| Lane | Verdict | Substance |
| --- | --- | --- |
| subjective | FAIL 1 5 9 12 | claim 1 on the brief's enumeration (the drop-in landed in P.2, the manifest table in P.1); claim 5 on the `Overlay` and `ProbeServer` rows repeating their interfaces' sentences; claim 9 on `both eras`; claim 12 on citations and counts; findings F1 to F6 |
| objective | FAIL 1 5 9 12 | the same claims (claim 9 on the exception list omitting the corrected `Kind` cells, the guard table's `Signature` to `Shape`, and the `Implements` column landed in prose); findings F1 to F5 |
| checker | FAIL 1, 9 | claim 1 (the enumeration) and claim 9 (the exception list) — the brief's, not the work's |

## Findings carried into the fix round (`d7n-probe-converge-fix-brief.md`)

- P1 — `Overlay`'s and `ProbeServer`'s descriptions distinct from their interfaces' (claim 5 on both lanes).
- P2 — the `clear` and `covers` examples read the value they bind (subjective F1).
- P3 — the `Draft` examples illustrate the flagship's `src/core/factories.ts` draft, not module data the lint policy refuses (subjective F2).
- P4 — the paragraph at `guides/probe.md:851-855` rewrapped (subjective F3, objective F4).
- P5 — `both eras` at `guides/probe.md:1146` names the eras (subjective claim 9).
- P6 — the README's copy of the flagship claim compared by the executed case (objective F2).
- P7 — `IMPLEMENTATIONS`' `LintStage` row names `LintStageInterface` (objective F3).
- P8 — the closing sweep's items from `d7n-probe-close-brief.md`.

## Rulings and carries

- Claims 1 and 9 on every lane: the audit brief's enumeration and exception list were the generator's, written before P.1 stopped on the absent drop-in and before Rulings 20 and 21; the work stands as the lanes read it.
- Claim 12 and subjective F4: report defects; the Orchestrator annotates the prep and converge reports (the citation at `:659` is `:650`, the region's closing brace is `:258`, counts, the dropped tagline sentence).
- Subjective F5 and objective F1: the prep report's `test:guides` exit code was wrong (annotated); the script masks nothing.
- Objective F5: the killed predecessor converge unit returned nothing before the session limit; its amended brief is the retained brief, and `d7n-probe-converge-predecessor.md` records the kill.
- Subjective F6: the closure's `verifier` takes the authoritative run.
