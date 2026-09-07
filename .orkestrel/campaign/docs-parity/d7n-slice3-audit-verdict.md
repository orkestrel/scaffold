# Audit verdict — slice 3 (html, ndjson), over each package's P.1 and P.2

## Round 1 (2026-09-07, Workflow `wf_79038228-15d`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` ×2 (Sonnet). Brief: `d7n-slice3-audit-brief.md`. Returns: `d7n-slice3-audit-{subjective,objective,checker-html,checker-ndjson}.md`.

### Rulings per claim

- **Claim 9 (html) — FAIL.** Counts and all-caps emphasis in the prose and the doc blocks the unit wrote (`guides/html.md:16`, `:68`, `:102`, `:170`; `ALREADY`, `REPLACES`, `THE`, `DEFAULTS`, `EXACTLY`, `BEFORE`, `NOT`, `WHOLE`, `KEPT`, `DERIVED`, `WITH` across the guide and `src/core/{HTML,constants,types}.ts`). Carried to html's fix round; the template now bars introducing either.
- **Claim 15 (ndjson) — FAIL.** `documented` and `examples` bound inside the `it`; the concatenation order inverted. Carried; Ruling 13 fixes the canonical text.
- **Claim 22 (ndjson) — FAIL.** No `## Tests` (and no `## See also`); the titled example's heading is the structural `Factories` (the brief predated Ruling 9). Carried.
- **Claims 12, 25 — FAIL, annotated.** Counts in the reports; html's converge report contradicts itself on the `distill` sites.
- **Claims 11, 24 — CANNOT RULE**, referred to the per-package `verifier`.
- **Every other claim — PASS.**

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| html's `Shape` column mixes idioms and member types | subjective S-1 | html fix (Ruling 12) |
| html's opening sentence restates the tagline | subjective S-2 | html fix |
| `src/core/HTML.ts:56` left unwrapped and the `distill` order stated vaguely | subjective S-3, objective 4 | html fix: rewrap; state the order the code runs |
| `HTMLInterface`'s row undersells the interface against the class row | subjective S-4 | html fix |
| `TNode`'s binding left the guide (`HTMLScan`, `HTMLHandler`, `HTMLDerivation`) | subjective S-5 | html fix: the `Shape` cell keeps the generic binding as the alias's own literal |
| ndjson's titled example converged by deleting the buffering demonstration | subjective N-1 | Ruling 14; ndjson fix restores the lines to both sides |
| The unbounded-buffer caveat left the `## Methods` table | subjective N-2 | ndjson fix: one sentence under the table in the section's voice |
| ndjson's `chunkings` rewrite renamed the concept | subjective N-3, objective 3 | ndjson fix (as sse's) |
| The drop-in diverged: html's case name, the equality case's placement; ndjson's bindings and concat order | subjective F-1, objective 1 | Ruling 13; both fixes; abort takes the same text in a small unit |
| ndjson's descriptions write bare code spans where `{@link}` resolves | objective 2 | ndjson fix: link the named declarations |
| ndjson has no `## Tests` where html has one | objective 5, claim 22 | ndjson fix |

Round 1 closes as `VERDICT: FAIL 9 12 15 22 25` reconciled: the reports annotated; every other item carries into `d7n-{html,ndjson}-converge-fix`, each closed by `checker` and the package's `verifier`.
