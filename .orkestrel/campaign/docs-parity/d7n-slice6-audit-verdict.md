# Audit verdict — slice 6 (console P.1 `f93a2f4` P.2 `10b4f2c`; markdown P.1 `6f21d79` P.2 `c38ae24`; pool P.1 `11509e9` P.2 `ff62d1d`)

Workflow `wf_c42bb406-dd7`, 2026-09-07, 18 minutes: the subjective and objective lanes (`reviewer`, Opus 5 — the objective lane the recorded substitution for the dark Sol bench) and a `checker` per package (Sonnet), blind and clean, on `d7n-slice6-audit-brief.md`, claims 1 to 13 (console), 14 to 26 (markdown), 27 to 39 (pool). Lanes retained as `d7n-slice6-audit-{subjective,objective,checker-console,checker-markdown,checker-pool}.md`. Terminal lines: subjective `FAIL 2, 9, 12, 17, 19, 22, 25, 38`, objective `FAIL 2 9 12 17 18 19 22 25 31 38`, checkers `FAIL 12`, `FAIL 20 25`, `FAIL 38`.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| console 2 | FAIL: the mapped `examples` binding inside the `it` body | fix C1 |
| console 9 | FAIL: cells still rendering `import('./types.js').X` (`:130`, `:196`, `:210`, `:227`, `:229`) from multi-line tags; the unit flattened every other `{@link import('…').X}` in a description paragraph to a code span — under the final readers (U4) the link compares as its target's name, so the links are restored and the cells re-converge | fix C2 |
| console 12 | FAIL: counts in both reports | annotated |
| console 1, 3 to 8, 10, 13 | PASS on every lane that ruled; 11 CANNOT RULE | the closure `verifier` |
| markdown 17 | FAIL: the `Shape` idiom (types in cells, another convention sentence) | fix M1 |
| markdown 18 | FAIL (objective): clauses dropped from cells reached neither the block nor the data column | fix M2 |
| markdown 19 | FAIL on both lanes → Ruling 17: the class is the guide's entry and the factory an alias, so the class's block stays titled | — |
| markdown 20 | FAIL (checker, partial): the README carried no onboarding before P.2, so the unit authored one; the subjective lane passed the paragraph; accepted | — |
| markdown 22 | FAIL: all-caps in `Summary` cells (`:33`, `:34`, `:56`, `:102`, `:103`, `:108`, `:111`, `:114`, `:115`, `:117`, `:124`, `:131`, `:221`, `:277`), a count and `below` at `:277` | fix M3 |
| markdown 25 | FAIL: counts in both reports | annotated |
| markdown 14 to 16, 21, 23, 26 | PASS; 24 CANNOT RULE | the closure `verifier` |
| pool 31 | FAIL (objective): `isPoolSignal`'s "for the acquire boundary" clause absent from cell and block | fix P2 |
| pool 38 | FAIL: counts in both reports | annotated |
| pool 27 to 30, 32 to 36, 39 | PASS; 37 CANNOT RULE | the closure `verifier` |

## Findings outside the claims

- Subjective F1 and objective F-2 (no `Shape` column in console and pool; markdown's own idiom): Ruling 15 → fixes C3, M1, P1 in this round rather than the closing sweep.
- Subjective F2 (markdown's spaced hyphen for the em dash) → fix M4.
- Subjective F3 (console's fence comment "Both captures") → fix C4.
- Subjective F4 (`failureing` in console's `tests/src/core/helpers.test.ts:706`) → fix C5, that line granted.
- Subjective F5 (the pilot's header line points with `below`) → Ruling 13 amended; abort's closing unit takes it; console and markdown copy the amended line (C6, M5).
- Objective F-1 (the comparator's `import()` qualifier): closed by U4 (`caa97b2`) before this audit read console's evidence; the final readers are installed in this slice's checkouts for the fix rounds.
- Objective F-3 (console's opening prose restating the tagline's backend clause) → fix C7.
- Objective F-4 (the drop-in's `INTERNAL` sentence in console and markdown) → fixes C6, M5.
- Objective F-5 (markdown's first-overload descriptions claim a predicate the guard overload lacks) → fix M6: each overload's description true to its own signature, the first naming the predicate overload as such.
- Objective F-6 (the count ban failing in every report): the brief templates carry the substitution sentence from 2026-09-07 on.
- markdown's timing failure (`tests/src/core/parsers.test.ts:626`, a 1000 ms budget, under load): the Orchestrator re-runs it alone at closure.

## Fix round

`d7n-console-converge-fix-brief.md` (C1 to C7), `d7n-markdown-converge-fix-brief.md` (M1 to M6), `d7n-pool-converge-fix-brief.md` (P1, P2); the closure runs `checker` over each fix diff and `verifier` over each whole chain.
