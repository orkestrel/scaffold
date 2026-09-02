# Audit verdict — unit breaking-contract

Bench: Sol dark; both reviewer lanes on the writer's engine (Opus 5) in clean contexts, told so;
`checker` and `verifier` on Sonnet. Round 1 subject: commit `d24e79c` (`units/contract.diff`,
`units/contract-report.md`).

## Round 1

| Claim | Objective lane | Subjective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows applied/refused/stopped | CONFIRMED | — | CONFIRMED (the report-amendment row stopped on scope, amended by the Orchestrator in `reports/contract.md`) | — | — |
| 2 no old name; contracts in `types.ts` | CONFIRMED (sweep clean with a `validateShape` control) | — | CONFIRMED | — | — |
| 3 ruled forms | BROKEN on s03-01 only (the same fold); F2 corroborates the fold as behavior-preserving and advises ratification, not re-dispatch | BROKEN on s03-01 only: `canonicalizeValue` folded into `canonicalStringify` as a stateful walk rather than interned as a `#` method; s03-22, s03-06, s03-23, s03-13 CONFIRMED | — | — | ratified as an amendment: the walk holds call-local state only, so it is a pure leaf and the finding's complaint (state parameters on published signatures) is closed by the fold |
| 4 no alias or shim | CONFIRMED | CONFIRMED (pinned by the `validate*` population test) | — | — | stands |
| 5 guide rows, parity, executed assertions | — | BROKEN on two stale guide sentences (`contract.md:425` five exported internals; `:549` two sample doors and a caller-supplied memo); parity `INTERNAL` two-way and executed assertions CONFIRMED | CONFIRMED on rows and the INTERNAL list | — | subjective upheld; fix round |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | — |
| 7 gates | — | — | quoted | GREEN (1305 src, 111 policy, 46 config, 61 setup, 65 guides) | stands |
| 8 nothing hidden | CONFIRMED (criteria 1 and 5 re-checked) | — | — | — | — |

Findings outside the claims (subjective lane), with rulings: verb alternation `#walkRecord` versus
`#inferRecords` across the sibling engines → one verb (`#walkRecords`); unsorted `tests/setup.ts`
import → re-sort; two module cycles (engine ↔ kind file) → recorded as the disclosed cost of
interning, no ruling; the report's count → retention artifact, no change. Referrals: mirrored
tests for the three engine files → not required (the mirror rule places a test where one exists,
the policy sweep passed, the engines are driven at their doors); interned class names in raw
`cause` messages → prefix with the door's name.

Findings outside the claims (objective lane), with rulings: F1 the s03-22 radius lists only the
colliding keys while the flat Reflect keys moved too → every consumer brief names the full moved
set and the compiler is the scope; F2 the fold is behavior-preserving → s03-01 ratified as an
amendment in `rulings.json`; F3 the `#unavailable()` guards are the only legal narrowing of
`Map | undefined` fields → not dead; F4 the cycles sit above the leaf pair with hoisted bindings
→ no hazard; F5 the `pinMembers` guide row says every exported class calls it while the interned
engines do not → narrow to published classes; F6 the report's count → retention artifact; F7 the
sample memo trio published with no door accepting one → stays as the walk's own memo, guide rows
retargeted.

Terminal lines: objective `FAIL 3`; subjective `FAIL 3, 5`; checker `PASS`; verifier GREEN. Fix
round `contract-fixup` (Opus implementer) carries findings 1-5, 9, and 10 of its brief; s03-01 is
ratified; round 2 follows.
