# Audit verdict — unit breaking-terminal

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `01c6754`
(`units/terminal.diff`, `units/terminal-report.md`), then the fix-up at `4ea17d7`
(`units/terminal-fixup-brief.md`, `units/terminal-fixup-report.md`, `units/terminal-fixup.diff`,
`units/terminal-fixup.status`, checker lane `units/terminal-fixup-audit-checker-brief.md`). The
subjective lane ran: a rename family across the renderers, an accessor reshape, and a wire-word
change, above the wide-unit trigger.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s12-48, -52, -54, -55, -58, -59; Carry vacuous) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; `KeyEvent.name?`, `TimerCancelFunction`, `ParkedForm`, `terminals()` in `types.ts` | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL`, executed assertion for the undecoded key | — | BROKEN (no assertion drove a reducer) | CONFIRMED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | — | NOT-EVIDENCED by construction | GREEN (356 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | — | stands |

Fix round (`implementer` on Opus 5): R1 (the accessor prose claimed what the caller holds) — the
Methods cell states behavior and the remark states which methods take a name; R2 (`both` in the
fence) — the members named; R3 — `editLine` and `inputReduce` assertions for an undecoded key,
red with the name guard removed (`TypeError: key.name is not iterable`, 2 failed | 36 passed)
and green restored (38 passed); the "four shared line shapes" count dropped from the guide and
the test title. The Orchestrator rewrote the one-line test comment at
`tests/src/core/TerminalManager.test.ts:19` that repeated the caller claim, outside the unit's
owned set. Landed at `4ea17d7` with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`). Checker on the fix-up: PASS on every claim; one report defect (the sweep
tally stated a count that did not match its list) corrected in the retained report.

Referrals ruled: `render*` for the view and header helpers stands; `teardown` is the fleet's noun
for the destroy phase; name enumeration on the manager is dropped for this wave (R1 restates the
prose without the caller claim), and a `name` on the broker is a successor row if enumeration is
wanted; `filter*` is recorded for `.claude/rules/names.md`.

Recorded for the next change: the report's `grep … → exit 0 — 0 hits` line and its missing Carry
disposition (report defects); `moveUp` and `redrawPrefix` naming; the caller-holding claims that
are true by construction (`guides/terminal.md:444,518`, `src/core/types.ts:468`) and the form
claims (`:386`, `src/server/Terminal.ts:189`, `src/server/helpers.ts:237`) stand; "Two standing
conditions" at `guides/terminal.md:66` and "the four arrows" at `src/core/constants.ts:48` for the
voice wave; the helpers file's mixed TSDoc mood for the voice wave.

Terminal lines: objective PASS; subjective `FAIL 5` closed by the fix-up; checker `FAIL 7`
(NOT-EVIDENCED by construction, settled by the verifier) and PASS on the fix-up; verifier GREEN.
**Verdict: PASS.** The unit closes **applied** for every row. Tip packed: `terminal-4ea17d7.tgz`.
