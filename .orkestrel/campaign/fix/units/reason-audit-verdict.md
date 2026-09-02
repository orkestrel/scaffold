# Audit verdict — unit breaking-reason

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so, blind to each other; `checker` and `verifier` on Sonnet. Subject: commit
`a42bd0f` (`units/reason.diff`, `units/reason-report.md`). The subjective lane ran because the
unit is wide (twenty-eight files, twenty-five value constructors moved, a manager verb added).

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s07-04, s07-06, s07-17, s07-10, successor-isWithinBounds) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name (common-word names checked by call-site, backtick, title, and import instruments; the accessor declarations and plural prose intact after the writer's reverted over-match) | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form (`isSubject` deleted with the `isRecord` redirect; every value constructor a `create*` in factories over a class-free helpers leaf; `seat(items)` on six managers with `FactorManager` untouched; the domain-noun parameters landed after the move) | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, fences, README; `INTERNAL` `['class Collection']` pinned both ways; `seat`'s silence asserted | — | CONFIRMED | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED on the quoted commands | GREEN (1062 src) | stands |
| 8 nothing hidden (the over-match revert independently falsified as residue-free) | CONFIRMED | — | — | — | stands |

Findings outside the claims, ruled and closed by the builder fix-up `c363201`
(`units/reason-fixup-brief.md`, `units/reason-fixup-report.md`; full chain green, 1063 src tests):
the variable manager's own liveness check on `seat` after `destroy` is pinned; its parameter is
`variables` (the s07-17 ruling fixed the method name, not the parameter); the guide's `seat`
example precedes `build` with a motivating comment; the Value factories intro names no
in-repository file; the factories test header drops its ordering claim; the README links the
guide that exists.

Referrals ruled: `seat` retained (it names the primitive the six managers delegate to and removes
the guide's setter exemption); the Value / Entity factories split retained; the accessor fence
retained (it closes a gap the rename exposed). Recorded for the next change: no fence in this
package executes; direct `seat` coverage on `equations`, `facts`, `inferences` reaches the
method through `merge` only; `guides/reason.md` uses `above`/`below` throughout (a prose sweep
item); `factToArityKey`, `factToKey`, `instantiateFact`, `findUnboundVariables` still name a
parameter `source`.

Terminal lines: objective PASS; subjective PASS; checker PASS; verifier GREEN.
**Verdict: PASS.** The unit closes **applied** for every row. Tip packed: `reason-c363201.tgz`.
