# Audit verdict — unit breaking-console

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so, blind to each other; `checker` and `verifier` on Sonnet. Subject: commit
`a35c93f` (`units/console.diff`, `units/console-report.md`). The subjective lane ran because
the unit is wide (twenty-five files, seven factories deleted, a guide re-padded throughout).

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s09-07, s09-09, s09-10, s09-11, s09-12, s09-13, s09-14, s09-21) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name (the core `DEFAULT_CAPTURE_LIMIT` survives by design; `success` survives as the status literal and theme role) | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form (`createCaptureResult` in factories with a class-free helpers leaf; s09-10 before the reduced s09-11; `succeed`/`fail`; the seven deletions; `LOG_LEVELS`; `inferColumns`) | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, fences, `@example`; `INTERNAL` `['class Styler']` pinned both ways; changed behavior asserted | — | CONFIRMED | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | — | CONFIRMED on the quoted commands | GREEN (639 src) | stands |
| 8 nothing hidden (the deleted factory-parity assertions re-derived against the class tests; the one unique proof relocated) | CONFIRMED | — | — | — | stands |

Findings outside the claims, ruled and closed by the builder fix-up `77ab53f`
(`units/console-fixup-brief.md`, `units/console-fixup-report.md`; full chain green): F1 the
moved capture TSDoc named a `finally` the body does not use; F2 the README fences imported the
in-repository alias although the README ships in `files`; RC-1 six options blocks linked an
interface as their constructor; RC-2 two sink factories opened in the imperative; one guide
sentence broke its pairing form.

Referrals, ruled to stand and recorded for the next change: R-1 `createCaptureResult` keeps the
s09-07 name and placement although it runs a callback and returns a record (both lanes question
the `create*` form; the ledger's alternative, a verb-first helper taking a `CaptureInterface`,
is the successor candidate); R-2 the guides test maps no `@orkestrel/console/server`
specifier, so server fences' imports are unchecked (pre-existing); the README's fences are
outside the guides project's walk. Observations recorded, no change: `succeed` on `Spinner`
beside `complete` on `Progress`; no test names `DEFAULT_STREAM_LIMIT`.

Terminal lines: objective PASS; subjective PASS; checker PASS; verifier GREEN.
**Verdict: PASS.** The unit closes **applied** for every row. Tip packed: `console-77ab53f.tgz`.
