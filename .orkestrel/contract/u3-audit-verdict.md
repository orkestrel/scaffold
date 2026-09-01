# U3 audit — round 1 verdict and reconciliation (2026-09-01)

Subject: U3 compile-time pattern capture (tree over 163490f; brief `u3-pattern-brief.md`, report `u3-pattern-report.md`, audit brief `u3-audit-brief.md`). Lanes: subjective (`reviewer`, Opus 5) and objective (Opus 5 through the `reviewer` role file, substituting the excluded Sol `analyst`), blind, read-only, immutable returns in `u3-audit-subjective.md` and `u3-audit-objective.md`. `verifier` ran in parallel: GREEN (`u3-verifier-report.md`).

## Lane terminal lines

- Subjective: `VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims`
- Objective: `VERDICT: FAIL — 3 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims`

## Reconciliation (every vector reproduced: `u3-referrals.out`)

| Item | Ruling | Carrier |
| --- | --- | --- |
| Claim 1 (both lanes BROKEN): the omitted-argument path reads `shape.pattern` twice instead of three times and takes `limit` from the applied rebuild | Reproduced: reads per call 3 → 2; a shape whose accessor throws only on a third read refused on the checkpoint and answers now. Observable only for a hand-rolled shape whose accessor changes its answer between reads; the landed answer is self-consistent (the `limit` names the pattern that decided the match) and both lanes call it the better behaviour. Ruled ACCEPTED as an improvement; the brief's "exactly as on 0.0.15" was too strong. | U3f: TSDoc and guide state that the `limit` is read from the applied rebuild; pin that a counting `pattern` accessor is read exactly twice per call. |
| Claims 9 and 11 (both lanes): the guide row and TSDoc promise a caller's `lastIndex` never moves and the report is identical either way, unconditionally, while the supplied-argument path applies the argument as given | Reproduced: a `g` pattern passed directly answers `0@3 1@0 0@3` across three calls. Code-guard option refused: a per-answer `readPatternFlags` read reintroduces the dispatch the unit removes, and the package already publishes `matchesPattern`, which applies a supplied `RegExp` as given; the argument is a documented prerequisite of a published helper, closed on the interface that owns it (`.claude/rules/quality.md`: document the obligation, prove the documentation). | U3f: the two lanes' exact wording in the guide row, the TSDoc remark, and the `@param` (prerequisite and failure behaviour); the existing `lastIndex` pin over a `readPattern` result proves the documented form. |
| Subjective F2: the capture duplicated in both leaves and at `stringOf` | Confirmed by reading `combinators.ts:1033-1043`: the same `readValue(() => readPattern(x), reader, { subject: 'pattern', code: 'pattern', context: { shape: 'string' } })` at three sites (`matchOf` differs: no context, left alone). Consolidation law applies to what the unit added. | U3f: one exported helper in `helpers.ts` taking the declaration's pattern and the reader name, consumed by both leaves and `stringOf`, with a guide row and TSDoc. |
| Objective F1: the leaf comment mis-states the schema leaf's boundary | Confirmed by reading `ContractCompiler.ts:727-733`. | U3f: the objective lane's replacement clause (the comment moves with the extracted helper). |
| Objective F2: the compiler half has no suite guard | Accepted as the honest limit: the capture is unobservable through the public surface; it is guarded by the retained paired A/B (`multi-u3-vs-u2f.out`: audit-deep 0.914, explain-deep 0.872, every replicate ≤ 0.962) and recorded here. | This file and the unit report addendum. |
| Subjective claim 11 residue: `owned`/`pattern`/`stateless` for one concept | Recorded; the extracted helper's return is what the leaves and `stringOf` name, so U3f settles the leaves and `stringOf` on one word. | U3f (naming inside the owned files). |

## Ruling

Round 1 FAILS on documentation drift and consolidation; every compiled answer held. U3f carries the documentation prescriptions verbatim, the consolidation with its guide row, the comment correction, and the read-count pin. Because the consolidation names a public helper, U3f closes with one clean objective audit lane on the successor claims plus `checker` and `verifier`, per `.claude/rules/quality.md` § Rounds and verdicts.

## Fix-round units and the Orchestrator's one-line edit (2026-09-01)

- U3f (`u3f-brief.md`, `u3f-report.md`, `implementer` on Opus 5): `ownPattern(pattern, reader)` exported from `helpers.ts` and consumed at `stringOf`, `compileAuditor`, and `compileReporter` with each site's reader name; the `createStringFaults` TSDoc, `@param`, and guide row carry the prerequisite, failure behaviour, `limit` source, and qualified `lastIndex` clause; the leaf comment states what the schema leaf publishes; the read-count and helper pins landed. Orchestrator evidence (`u3f-acceptance.out`): the read-count pin reddens on the checkpoint's three-read shape (`expected 3 to be 2`) and restores exactly; pattern-fault record and both parity forms identical to 0.0.15; 6-process against the U2 checkpoint audit-deep 0.904 (max 0.923), explain-deep 0.872 (max 0.875); against 0.0.15 audit-deep 0.769, explain-deep 0.803.
- U3g (`u3g-census-brief.md`, `builder` on Sonnet): the exported-function census pin (`integration.test.ts:967`) and the guide sentence (`guides/contract.md:256`) move from 216 to 217 for the `ownPattern` export, as the pin's own comment requires. The omission of the integration suite from U3f's scoped criteria is recorded against the Orchestrator's brief.
- Orchestrator one-line edit: the checker's not-met item (a `below` cross-reference in the new comment at `helpers.ts:1996`) is corrected to "names the fault's `limit`,"; recorded here as a briefed one-line fix and re-checked by `checker`.
