# Verdict — U4 proof-template, audit round 1

Lanes that ran, each in a clean context on `u4-audit-brief.md`: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet); `verifier` (Sonnet) ran the scaffold gate chain separately (`u4-verify-report.md`, `GATES: GREEN`, with `test:distribution` under npm 11 and the npm 10 reading as an observation).

## Per-claim reconciliation

| Claim | Subjective | Objective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | PASS | PASS | PASS | PASS |
| 2 | PASS | PASS | PASS | PASS. The driver narrowing through `selectDrivers` is the brief's own design; its failure mode is the objective lane's F1, carried. |
| 3 | PASS / CANNOT RULE on provenance | CANNOT RULE | CANNOT RULE | Settled by retention: the plant instrument and its two logs are copied from the unit's scratchpad into `instruments/u4/` beside this verdict (`plant.sh`, `logs/extra.log.txt`, `logs/undeclared.log.txt`); the quoted TS2741 lines are in those logs. The abridged `nodenext` and `bundler` lines in the report are the report author's, the logs carry them whole. |
| 4 | FAIL | FAIL | PASS | The claim overreached. Its second conjunct ("nothing is evaluated from a string") named a property the subject never had: scaffold's bespoke proof drives each example block through `new AsyncFunction` over the transformed text (`tests/distribution.test.ts:142`), and the generated proof's browser read uses `page.evaluate('globalThis.subject')`; neither site is this unit's, neither is the in-process compiler API, and the design's decision 4 named the `vm` CommonJS sites alone. Corrected record, no code change; the `AsyncFunction` driver is carried to U6's roadmap consideration as a later change outside this campaign's exit criterion. |
| 5 | PASS | PASS | PASS | PASS |
| 6 | PASS / CANNOT RULE on regeneration | PASS / CANNOT RULE | CANNOT RULE | The deviation is accepted on every lane: the brief's regeneration premise was the Orchestrator's error, and the bespoke proof keeps its bytes apart from one fence. The regeneration half is settled by an independent re-run the U4-fix verifier takes over retained paths (`instruments/u4/regenerate.sh`, written by the Orchestrator from the unit's `replicate-install.sh` and `emit.mjs`), not by the writer's report. |
| 6a | PASS (second half) / CANNOT RULE (first) | PASS / CANNOT RULE | CANNOT RULE | PASS. The verifier's independent runs settle the first half: green under npm 11, red under npm 10 on the `edgesOut` install fault (`u4-verify-report.md` § 7), a host condition no file this unit changed reaches. |
| 7 | PASS | PASS | PASS | PASS |
| 8 | FAIL | PASS | PASS | FAIL on two shipped comment sentences (`templates.ts:1908-1911`: a dropped relative pronoun and `above`); the objective lane's F4 names the same sentence. Carried to U4-fix edit 1. |
| 9 | PASS | PASS | PASS | PASS |

## Findings outside the claims

Carried, each to one U4-fix edit:

- Objective F1 (the require drive passes vacuously when `selectDrivers` returns nothing) → edit 1, the guard the import drive has.
- Objective F2 (scratch project names collide across extensions and faces) → edit 2.
- Subjective F1 (`Entry.declaration` carries paths nothing reads) → edit 3.
- Subjective F2 (the browser drive's filter, assertion, and `flatMap` over one known driver; `BUNDLER` beside `'bundler'`) → edit 4.
- Subjective claim 8 and objective F4 (the two comment sentences) → edit 1's comment.

Recorded, no carrier: objective F3 (any stderr byte is an instrument fault; fail-closed, an accepted limit the report flagged), objective F5 (the template's own evidence rested on the writer's report; the retained instruments and the U4-fix verifier's independent run close it), objective F6 (the `.cts`-under-`bundler` pairing predates the unit), subjective F3 and F4 (the `Surface` name and its placement, observations), subjective F5 (retention, closed above), the subjective referrals R2 to R4 (the objective lane read the same sites and raised no defect beyond F1 to F4).

## Gate reading

`u4-verify-report.md`: `GATES: GREEN`. The U4-fix round's verifier is the authoritative reading over the fixed template, with the retained instruments run independently.

VERDICT: FAIL 8, with the round's findings carried to U4-fix; claims 3 and 6 closed by retention and the independent re-run the closure round takes
