# Audit verdict — U5 `d7-guide-drift-cost` (`45832d8`) and `d7-guide-links-fix` (`7c60ea1`)

Workflow `wf_709703a1-cdb`, 2026-09-07, 13 minutes: the subjective and objective lanes (`reviewer`, Opus 5 — the objective lane the recorded substitution for the dark Sol bench) and a `checker` (Sonnet), blind and clean, on `d7-guide-u5-links-audit-brief.md`, claims 1 to 12. Lanes retained as `d7-guide-u5-links-audit-{subjective,objective,checker}.md`. Terminal lines: subjective `FAIL 2, 6`, objective `FAIL 6, 12`, checker `FAIL 3, 4, 8, 10` (CANNOT RULE on the writers' own gate readings).

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1, 5, 7, 9, 11 | PASS on every lane that ruled | — |
| 2 | FAIL (subjective): `extractDeclaration` lost its `src/` caller and its doc block's amortization clause reads as a muddle; PASS (objective) with the same caveat recorded as F2 | fix G1, G2 |
| 3, 4, 8, 10 | PASS on the review lanes where ruled, CANNOT RULE on the writer-report-only readings | the guide's closure `verifier` |
| 6 | FAIL: two function assignments inside an `it` body (`Source.test.ts:1180`, `:1194`) | fix G3 |
| 12 | FAIL (objective): the U5 report cites `contract/tests/guides.test.ts:206` for a budget that sits at `:211` | annotated |

## Rulings

- **`extractDeclaration` stays** (subjective F7, objective F2/R1): the delegate owns the `${keyword} ${name}` key convention so a one-name consumer never spells it — a translation, which `.claude/rules/architecture.md` admits — and its `@remarks` states that reason.
- **The guide's compared-form list gains the member-reference clause** (subjective F2, objective R2): the behaviour the links fix exists to protect is stated where the list is.
- Objective F6 (the timing instrument's `drift 0` cannot falsify "unchanged records"): accepted as evidence strength; the suites and the fleet's `docs` readings at zero under both readers carry that half. Objective F7 (aliased arrays, `options.files` never mutated): consistent with the pre-existing contract, recorded.

## Findings outside the claims

- Subjective 1 / objective F1 (`guides/guide.md:467` states the opposite of what U5 proved; `helpers.ts:1303-1304` the same in elliptical form) → fix G2.
- Subjective 2 (no member-reference bullet) and 3 (`:364` names no path form) → fix G4.
- Subjective 4 / objective F3 (nested assignments) → fix G3.
- Subjective 5 (`:234` and `:237` state the memo twice in two vocabularies) → fix G5.
- Subjective 6 / objective F5 (spliced paragraphs past the wrap: `guides/guide.md:467-468`, `:240-241`, `Source.ts:52-53`) → fix G6.
- Subjective 7 (the wrapper's unstated reason) → fix G1.
- Subjective 8 (`types.ts:495`, `:505` and `guides/guide.md:50-51` name `extractDeclaration` as the locator) → fix G7, `src/core/types.ts` granted for those two doc-block references only.
- Objective F4 (a test named for a property it does not prove) → fix G8.
- Subjective 9 (the `:206` citation; the instrument named only by its swept path) → annotated on the U5 report.

## Fix round

`d7-guide-u5-fix-brief.md` carries G1 to G8; the closure runs `checker` over the fix diff and `verifier` over the guide's whole chain (including the retained timing instrument), then the tarball is re-packed for the fleet-wide reinstall.
