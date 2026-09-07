# Audit verdict — contract (P.1 `b8f5839`, P.2 `681d37d`, re-repair `796e893`)

Workflow `wf_abad2ff8-b4e`, 2026-09-07, 14 minutes: the subjective and objective lanes (`reviewer`, Opus 5 — the objective lane the recorded substitution for the dark Sol bench) and a `checker` (Sonnet), blind and clean, on `d7n-contract-audit-brief.md`, claims 1 to 13. Lanes retained as `d7n-contract-audit-{subjective,objective,checker-contract}.md`. Terminal lines: subjective `FAIL 4 5 8 9 12`, objective `FAIL 4 5 8 9 12`, checker `FAIL 12`.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1, 2, 3, 6, 7, 10 | PASS on every lane that ruled (1 referred by the subjective lane, settled by the objective lane's staging log reading: `scripts/docs.ts` staged in `b8f5839`) | — |
| 4 | FAIL: the guard table's `Shape` cells hold prose for the generator guards (subjective); interface rows spell member types and `…` elides members (objective) | fix C2, C3 |
| 5 | FAIL: the cloner interface/class pairs share one sentence; the `isArray` remark landed on `isArrayBuffer`, false there | fix C4, C5 |
| 8 | FAIL: the pin in the `map`/`filter` form, not the pilot's guard-and-continue loop (the writer followed a brief written before Ruling 11; the plan's line corrected 2026-09-07) | fix C1 |
| 9 | FAIL: a count and all-caps the unit authored (`:329`, `:534`, `:540-541`, `:162`, `:929`; `combinators.ts:971`, `:1017`; `helpers.ts:1245`, `:1314`; `types.ts:1493`) | fix C6 |
| 11 | CANNOT RULE on both lanes (writer-report-only gate readings) | the closure `verifier` |
| 12 | FAIL: counts and an ordinal in both reports; a stale citation (`tests/setup.ts:3377`); the converge report's `isArray` line names the wrong symbol | annotated on the reports; the tree is authoritative |
| 13 | ruled: `findDrift` at 5.6 s is real and blocking for the guide's release — closed by U5 (`45832d8` in the guide checkout, 226 ms best after); the `replaceCell` hypothesis disproven by the unit's own probe, not a defect | the closing sweep removes contract's `30_000` budget after the head start is re-installed |

## Findings outside the claims

- Subjective F1 (the `### Classes` introduction is a fragment with a count) → fix C6.
- Subjective F2 (`Shape` carries a guard-table meaning beside the members meaning): accepted as disclosed by the guard table's own convention sentence; the header set is fixed by the readers. Ruling 15 names the guard table's second sentence.
- Subjective F3 (the drop-in's `30_000` budget breaks Ruling 13): carried to the closing sweep, dependent on U5's install.
- Subjective F4 (the narrowed tables lost behavioural detail into `@remarks` the guide does not render): not carried. Ruling 7 sanctions the split; the doc block is the reference every editor renders on the symbol.
- Subjective F5 (a voice rewrite shifted a subject in `tests/setup.ts`) → fix C7.
- Objective F1 (no P23 run for contract): stale at reading time; `instruments/d7/pass/p23/contract.{log.txt,census.json}` exist, every control A to H reddened the gate.
- Objective F2 (`796e893` outside the audit's evidence): the re-repair is vendored-only (`tests/config.test.ts`), out of the audit's scope, recorded here.
- Objective F3 (the titled fence's value claims are not executed) → fix C8.
- Objective F4 (the property inventory in guide prose and in `@remarks` with no gate between them): accepted; the guide's prose is the reader's copy and the block the reference, both carrying the facts Ruling 7 keeps; fix C6 corrects both copies where the count or caps sit in each.
- Objective F5 (`…` elision in `Shape` cells) → fix C3.
- Objective F6 (the plan's pin line regenerates the miss): corrected in `d7-fleet-plan.md` on 2026-09-07.

## Fix round

`d7n-contract-converge-fix-brief.md` carries C1 to C8; the closure runs `checker` over the fix diff and `verifier` over the whole chain.
