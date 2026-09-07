# Audit verdict — U11 lsp-imports, round 1

Workflow `wf_094caf09-3f7`, 2026-09-07 01:21 to 01:29 UTC. Lanes on `u11-audit-brief.md`, blind, clean contexts: subjective `reviewer` (Opus 5) — `VERDICT: FAIL 7`; objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench) — `VERDICT: FAIL 7`; `checker` (Sonnet) — `VERDICT: PASS`; `verifier` (Sonnet) — `GATES: GREEN` over the lsp package's chain. Every lane ran.

## Reconciliation

- Claim 7 (both lanes): the report records a walk that continues past a non-family specifier while the code returns at `tests/setupConformance.ts:522`, and the `@remarks` at `:509` inherits the claim. Ruled: the code adopts the recorded behaviour (a non-family specifier falls through to the member walk), which also reaches a family import nested under an `ImportExpression`'s `options`; pinned by a two-specifier case and a first-hit case. Carried by `u11-fix-brief.md` finding 1.
- Carried findings: the `parent` member and termination (finding 2); the refusal's severity filter (finding 3); direct cases for `isSyntaxNode` and `readNodeSpecifier` with their `undefined` arms controlled (finding 4); one term for the non-literal `import()` expression (finding 5); the sixty-word `@remarks` split (finding 6); the report's inverted line (finding 7). The criterion-1 grep bound is widened in the fix brief and the successor verify brief.
- Resolved: gate greenness and the parser readings the objective lane marked writer-report-only are covered by the verifier's independent run; the `.tsx`, `.mts`, `.cts` parse readings stay the unit's, re-read by the fix round's suite.
- Dropped: none.

VERDICT: FAIL 7 — a fix round follows on `u11-fix-brief.md`, closing with `checker` and the successor verify brief plus the mutation readings, because every fix adopts a lane's prescription.
