# Audit verdict — sqlite (P.1 `555609c`, P.2 `3b211a0`) and indexeddb (P.1 `585a405`, P.2 `b157a60`)

Workflow `wf_f68ca478-baf`, 2026-09-07, 16 minutes: the subjective and objective lanes (`reviewer`, Opus 5 — the objective lane the recorded substitution for the dark Sol bench) and a `checker` per package (Sonnet), blind and clean, on `d7n-single-face-audit-brief.md`, claims 1 to 13 (sqlite) and 14 to 26 (indexeddb). Lanes retained as `d7n-single-face-audit-{subjective,objective,checker-sqlite,checker-indexeddb}.md`. Terminal lines: subjective `FAIL 2 12 17 18 20 25`, objective `FAIL 2 5 12 18 25`, checker sqlite `FAIL 12`, checker indexeddb `FAIL 25`.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| sqlite 1, 3, 4, 6, 7, 8, 9, 10, 13 | PASS on every lane that ruled | — |
| sqlite 2 | FAIL: the mapped `examples` binding inside the `it` body (the pilot binds it at loop scope) | fix S1 |
| sqlite 5 | FAIL (objective): `SQLiteDatabaseInterface`'s readonly `path` and `connected` documented nowhere after the cell narrowed | fix S2 (Ruling 15) |
| sqlite 11 | CANNOT RULE (writer-report-only gate readings) | the closure `verifier` |
| sqlite 12 | FAIL: counts in both reports; the P.1 report's `tests/config.test.ts` deviation closed by the vendored fix with no successor note | annotated on the reports |
| indexeddb 14, 15, 16, 19, 21, 22, 23, 26 | PASS on every lane that ruled | — |
| indexeddb 17 | FAIL (subjective) / PASS (objective, checker): the claim's wording was wider than Ruling 5; Ruling 16 fixes the trigger and the descriptive heading stays | the audit template corrected |
| indexeddb 18 | FAIL: the members the cells carried are now in guide-body prose (subjective); two remarks restate their descriptions (objective) | fix I1, I2 |
| indexeddb 20 | FAIL (subjective) / PASS (objective): the opening prose restates the tagline's `await` clause | fix I3 |
| indexeddb 24 | CANNOT RULE | the closure `verifier` |
| indexeddb 25 | FAIL: counts in the converge report; the P.1 report's stale deviation | annotated |

## Findings outside the claims

- Subjective F1 (the slice ships two substitutes for the missing `Shape` column) → Ruling 15; fixes S2 and I1.
- Subjective F2 (sqlite lost its `node:sqlite` link) → fix S3.
- Subjective F3 (indexeddb's factory example lost the schema demonstration) → fix I4 under Ruling 14.
- Subjective F4 (residual all-caps in the owned guides) → fixes S5 and I5; the `BOTH` in `tests/src/browser/IndexedDBDatabase.test.ts` is outside the fix round's scope and stays for the pass that owns that file.
- Subjective F5 (identical rows across the record-store tables): accepted; the reader resolves an inherited member to its base declaration's block by design (R-d), and the `####` paragraphs carry the per-table distinction.
- Subjective F6 and objective F2 (the vendored fix inside both P.1 commits with no successor note): the successor note appended to both P.1 reports on 2026-09-07, naming `instruments/d7/pass/f5b-repack-rerepair.log.txt`.
- Objective F1 (a P.1 report labels a tail of the `docs` worklist "verbatim"; the converge brief carried it): `gen-p2.sh` captures the whole output from 2026-09-07 on, and the converge brief's block is the unit's baseline reading.
- Objective F3 (sqlite documents `transacting` in prose and `path`/`connected` nowhere) → fix S2.
- Objective F4 (the audit claim wider than Ruling 5) → Ruling 16; `gen-audit.sh` corrected.
- Objective F5 (a unit's scratchpad file replaced by another package's guide): `gen-p2.sh` now names a unit-unique `tmp/<unit>/` inside the checkout; every fix brief carries the same line.
- Objective F6 (sqlite's new cross-references as plain code spans) → fix S4.

## Fix round

`d7n-sqlite-converge-fix-brief.md` (S1 to S5) and `d7n-indexeddb-converge-fix-brief.md` (I1 to I5); the closure runs `checker` over each fix diff and `verifier` over each whole chain.
