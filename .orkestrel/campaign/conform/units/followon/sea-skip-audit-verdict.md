# Audit verdict: unit sea-skip

Subject: the uncommitted follow-on in `/home/user/fleet/sea` (brief `briefs/followon/sea-skip-brief.md`, audit briefs `briefs/followon/sea-skip-audit-brief.md` and `briefs/followon/sea-skip-r2-audit-brief.md`, fix briefs `briefs/followon/sea-skip-fix1-brief.md` and `briefs/followon/sea-skip-fix2-brief.md`, report `units/followon/sea-skip-report.md`, evidence `/home/user/work/evidence/conform-sea.diff` and `.status`, proofs under `/home/user/work/evidence/sea-skip-proofs/`), the R2 referral from `units/conform-sea-audit-verdict.md`: the stage-hooks integration proof skips only on a host layout the injector cannot write into, reported under the code `ROOM`.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/sea-skip-checker-luna.result.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench (`units/followon/sea-skip-objective-r1.md`) | FAIL 2 with F1, F2, R1 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/followon/sea-skip-r2-checker-luna.result.md`) | FAIL 9 on the report's prose |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/followon/sea-skip-r2-objective-opus.md`) | FAIL 9 on the report's prose; O1 to O3; R1 to R3 |

Subjective lane: not run, by the round's design; the unit's rows are objective (an error code's coverage and its proofs). The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. No Luna distillate ran: the diff is small enough that each lane read it whole.

Fix round 1, an `implementer` on Claude Opus 5 (`units/followon/sea-skip-fix1-result.md`): `:1332` and `:1402` moved to `ROOM` with red-then-green proofs, the doc line and the guide paragraph rewritten, `tightHeaders` renamed `tight`, the `linkedit` option group added to `buildMachoFixture`.

Fix round 2, Orchestrator-owned (`briefs/followon/sea-skip-fix2-brief.md`, report § Fix round 2): O1, O2, and O3 adopted verbatim, the report's claim-9 rows corrected. Closed by the mutation probe the report records: under the mutation the replaced assertion passed and the adopted pin failed with `expected 5 to be 4`; restored, the probe, the `setup` project, and the format check all read green.

## Rulings

- Round 1, claim 2 (F1, F2): closed by fix round 1; both round-2 lanes confirm claims 1 to 8 on the tree.
- Round 2, claim 9: the tree conjuncts hold; the refutations name the report's prose (a tally in the Orchestrator's integration note, and a round-1 row the fix round did not update). Closed on the record by fix round 2.
- O1: a `tests.md` § Test contract defect in a line fix round 1 added; closed by fix round 2 with the probe as its regression evidence.
- O2, O3: prose that omitted a site or named the wrong entry; closed by fix round 2.
- R1 (round 2), whether `Injector.ts:1465` is a fifth host-layout site: not this unit's row. The guide's widened third `INJECT` member covers it as an injector self-check. The narrower question — asserting `cmdOffset - headerSize === sizeofcmds` after the parse loop and raising `FORMAT` there, which makes `:1465` unreachable — is recorded against sea in `ledgers/followons.md` for the next matrix.
- R2 (round 2), the successor prescription at report § Parity of the guide's `INJECT` sentence: the successor owns the `overwrite: false` proof as prescribed. The malformed-resource-directory clause needs a PE fixture option that points a resource leaf outside every section, recorded against sea for the next matrix beside it. The post-write clauses (`:1228`, `:1636`) are not drivable through the public API; the guide sentence keeps them because they state what the code does, and the report's successor item names the gap where a reader meets it.
- R3 (round 2), the subject mutated during the audit: the Orchestrator wrote the round-2 integration note into the report while the objective lane was reading, and that note quoted the checker's verdict. Recorded against this round, not the writer. Process ruling: an Orchestrator integration note is written after every lane of the round has returned, never between them.

## Structural claims

Claim 8's independent gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/sea`, recorded in `units/followon/land-sea-skip.log.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 objective's refutation closed by fix round 1; round 2 lanes' record refutations and O1 to O3 closed by fix round 2 under a mutation probe), pending the deciding run at landing.
