# Audit verdict — slice 5a (table P.1 `95aa463` P.2 `d86a5a8`; router P.1 `4101a0b` P.2 `9af89c9`) and slice 5b (template P.1 `67df803` P.2 `cf8858e`; websocket P.1 `4472093` P.2 `f28272b`)

Workflow `wf_432af734-9ce`, 2026-09-07, 34 minutes: per slice the subjective and objective lanes (`reviewer`, Opus 5 — the objective lane the recorded substitution for the dark Sol bench) and a `checker` per package (Sonnet), blind and clean, on `d7n-slice5a-audit-brief.md` and `d7n-slice5b-audit-brief.md` (claims 1 to 13 for the first package of each slice, 14 to 26 for the second). Lanes retained as `d7n-slice5-audit-{subjective,objective,checker-table,checker-router}.md` (5a) and `d7n-slice5-audit-{subjective-2,objective-2,checker-template}.md` (5b); websocket's checker died on the session limit and re-runs in `wf_666bab5d-efa`. Terminal lines: 5a subjective `FAIL 2 12 15 17 19 25`, objective `FAIL 2 12 15 17 25`, checkers `FAIL 12` and `FAIL 15`; 5b subjective `FAIL 4 12 16 18 22 25`, objective `FAIL 4 12 15 18 22 25`, template's checker `FAIL 4`.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| table 2 | FAIL: `documented` and the mapped `examples` bound inside the `it` | fix T1 |
| table 12 | FAIL: counts in both reports | annotated |
| table 1, 3 to 11, 13 | PASS on every lane that ruled; 11 CANNOT RULE | the closure `verifier` |
| router 15 | FAIL: the mapped `examples` bound inside the `it` | fix R1 |
| router 17 | FAIL: router's own convention sentence, member types in cells, `+` and `/` for call-signature members, `…` elisions | fix R2 |
| router 19 | FAIL (subjective): the titled block is `createListener`'s (the brief's truncated factory list picked it), not the primary factory `createRouter`'s | fix R3 |
| router 25 | FAIL: counts in the prep report | annotated |
| router 14, 16, 18, 20 to 23, 26 | PASS; 24 CANNOT RULE | the closure `verifier` |
| template 4 | FAIL: the convention sentence sits under the table (the brief predates `gen-p2.sh`'s correction) | fix P1 |
| template 12 | FAIL: counts in the converge report | annotated |
| template 1 to 3, 5 to 11, 13 | PASS; 11 CANNOT RULE | the closure `verifier` |
| websocket 15 | FAIL: the mapped `examples` bound inside the `it` | fix W1 |
| websocket 16 | FAIL (subjective): "wire message" for a helper that encodes one frame, forced by the export's bare-noun name | fix W4 |
| websocket 18 | FAIL: every constant's literal left both the cell and the block | fix W2 (Ruling 18) |
| websocket 22 | FAIL: a count at `guides/websocket.md:136` | fix W5 |
| websocket 25 | FAIL: counts in both reports | annotated |
| websocket 14, 17, 19 to 21, 23, 26 | PASS; 24 CANNOT RULE | the closure `verifier` |

## Findings outside the claims

- 5a objective F1 (router's `INTERNAL` block names "the following second assertion") → fix R1.
- 5a objective F2, 5b subjective F-W1, 5b objective F2 and F7 (no `Shape` column in table's Surface tables, websocket's `### Types`, template's Constants; router's pre-Ruling-12 idiom) → fixes T2, R2, P1, W3 (Ruling 15), taken in this fix round rather than the closing sweep.
- 5a objective F3 (router's flattened `{@link import('./Router.js').Router}` links) → fix R4, under the final readers now installed in the four checkouts.
- 5a objective F4 (`--to guide` writes an empty cell for a row whose block is absent) and F6 (a hyphen at a doc-block line wrap converges as `- word`): seed findings carried to scaffold's next vendored release (`d7-fleet-plan.md` § Findings carried); F5 (`computeDrift` treats a both-absent pair as drift): by design, the pair forces the block to exist.
- 5a objective F7 and 5b objective F8 (the audit template's claims wider than the rule): `gen-audit.sh` corrected on 2026-09-07 ("every compared table"; the non-`Summary` exception for renamed headers and compelled `Shape` cells).
- 5a objective F8 (the router brief's truncated worklist): closed by the `gen-p2.sh` correction of 2026-09-07; F9 (a qualifier heading the wrong list) → annotated.
- 5b subjective F-T1 (template has no `## Contract` or `## Patterns`): not carried; the invariants live in the tables and the executed fence, and the sections are the owner's call — recorded in `d7-fleet-plan.md` § For the owner.
- 5b subjective F-T2 (the titled fence repeats the Surface fence) → fix P3 under Ruling 14 (the titled fence shows `find` and `has`).
- 5b subjective F-T3 and objective F4 (all-caps in blocks the units owned) → fixes P2, W7.
- 5b subjective F-W2 (the "no third-party package" sentence) → fix W6; F-W3 (all-caps in `NodeWebSocket.ts`) → fix W7; F-W4 (the `on:` hook deleted from the titled pair) → fix W8 (Ruling 14); F-W5 and objective F3 (the `frame` helper's name) → fix W4; F-B1 (where a constant's literal lives) → Ruling 18.
- 5b objective F1 (every P.2 brief generated before the `gen-p2.sh` correction): the closing sweep's per-package unit re-checks the convention sentence's placement fleet-wide; F5 (`Summary` cells carrying an import-type expression in console, probe, guide): console's fix round restores the links under the final readers, probe converges under them, the guide's own cell is U4's subject; F6 (`TemplateManagerEventMap`'s tuple labels in the cell) → Ruling 19, fix P1.

## Fix round

`d7n-table-converge-fix-brief.md` (T1, T2), `d7n-router-converge-fix-brief.md` (R1 to R4), `d7n-template-converge-fix-brief.md` (P1 to P3), `d7n-websocket-converge-fix-brief.md` (W1 to W8); the closure runs `checker` over each fix diff and `verifier` over each whole chain.
