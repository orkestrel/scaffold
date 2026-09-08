# Audit verdict — program (P.1 `f2ca5ee`, P.2 `a60327f`)

`wf_78ab42e4-9f9`, 2026-09-08. Subjective lane `reviewer` (Opus 5); objective lane `reviewer` (Opus 5, the recorded substitution for the dark Sol bench); `checker` (Sonnet). Lanes retained as `d7n-program-audit-{subjective,objective,checker-program}.md`; brief `d7n-program-audit-brief.md`.

| Lane | Terminal | Failing claims |
| --- | --- | --- |
| subjective | VERDICT: FAIL 4 7 9 12 | Constants literal types; the dropped "synchronous, deterministic" characterization; `OMITTED` at `:742`; counts in both reports |
| objective | VERDICT: FAIL 9 12 | `OMITTED` at `:742`; counts in both reports; claim 11 CANNOT RULE (unwitnessed gate runs) |
| checker | VERDICT: FAIL 9 | `OMITTED` at `:742`; claim 11 CANNOT RULE |

## Reconciled items, carried by `d7n-program-converge-fix-brief.md`

- PF1 — the `### Constants` cells `true`, `'aggregate'`, `'outcome'` become `boolean`, `string`, `string` (subjective 4, objective F2, Ruling 21).
- PF2 — the guide's opening prose carries the package-level fact that `execute` runs synchronously and deterministically (subjective 7, objective F6; the Orchestrator rules for the sentence in the prose, not the tagline).
- PF3 — all-caps emphasis: `guides/program.md:742` `OMITTED`, and the sweep over every doc block under `src/**` (`src/core/types.ts`, `src/core/helpers.ts`, `src/core/programs/ProgramManager.ts`, `src/core/programs/Program.ts`), ruled hit by hit (subjective 9 and F5, objective 9 and F5, checker 9).
- PF4 — the `### Validators` table carries the guard sentence alone (subjective F2, objective F3, Ruling 27).
- PF5 — the drop-in's lines 1 to 3 equal the pilot's (subjective F1, objective F4, Ruling 13).
- PF6 — the titled fence takes a lead-in under `#### Compile a program and a manager`, and every fence directly under a heading takes one (subjective F6, objective F1, Ruling 21).
- PF7 — the tagline: `authorize` becomes the package's own term and `them` names its noun (subjective F3, F4); the README's blockquote follows.
- PF8 — the closing sweep's remaining items (Rulings 20, 24, 25, 26, 28): the `Shape` idiom where a table lacks it, `#` links, the README's fences.

Report-only findings, annotated rather than fixed: the counts in both reports (subjective 12, objective 12), the `above`/`below` pointers in the prep report (subjective F7, objective F8), and the cell instrument's description (objective F7). Claim 11 (objective and checker CANNOT RULE): the closure's `verifier` runs the gates against the committed tip and retains the log. Dropped, on the record: none.
