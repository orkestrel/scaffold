# Audit verdict — unit breaking-contract

Bench: Sol dark; both reviewer lanes on the writer's engine (Opus 5) in clean contexts, told so;
`checker` and `verifier` on Sonnet. Round 1 subject: commit `d24e79c` (`units/contract.diff`,
`units/contract-report.md`).

## Round 1

| Claim | Objective lane | Subjective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows applied/refused/stopped | OBJECTIVE-PENDING | — | CONFIRMED (the report-amendment row stopped on scope, amended by the Orchestrator in `reports/contract.md`) | — | — |
| 2 no old name; contracts in `types.ts` | OBJECTIVE-PENDING | — | CONFIRMED | — | — |
| 3 ruled forms | OBJECTIVE-PENDING | BROKEN on s03-01 only: `canonicalizeValue` folded into `canonicalStringify` as a stateful walk rather than interned as a `#` method; s03-22, s03-06, s03-23, s03-13 CONFIRMED | — | — | ratified as an amendment: the walk holds call-local state only, so it is a pure leaf and the finding's complaint (state parameters on published signatures) is closed by the fold |
| 4 no alias or shim | OBJECTIVE-PENDING | CONFIRMED (pinned by the `validate*` population test) | — | — | stands |
| 5 guide rows, parity, executed assertions | — | BROKEN on two stale guide sentences (`contract.md:425` five exported internals; `:549` two sample doors and a caller-supplied memo); parity `INTERNAL` two-way and executed assertions CONFIRMED | CONFIRMED on rows and the INTERNAL list | — | subjective upheld; fix round |
| 6 only owned files | OBJECTIVE-PENDING | — | CONFIRMED | — | — |
| 7 gates | — | — | quoted | GREEN (1305 src, 111 policy, 46 config, 61 setup, 65 guides) | stands |
| 8 nothing hidden | OBJECTIVE-PENDING | — | — | — | — |

Findings outside the claims (subjective lane), with rulings: verb alternation `#walkRecord` versus
`#inferRecords` across the sibling engines → one verb (`#walkRecords`); unsorted `tests/setup.ts`
import → re-sort; two module cycles (engine ↔ kind file) → recorded as the disclosed cost of
interning, no ruling; the report's count → retention artifact, no change. Referrals: mirrored
tests for the three engine files → not required (the mirror rule places a test where one exists,
the policy sweep passed, the engines are driven at their doors); interned class names in raw
`cause` messages → prefix with the door's name.

Terminal lines so far: subjective `FAIL 3, 5`; checker `PASS`; verifier GREEN; objective pending.
