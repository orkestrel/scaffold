# Audit verdict — unit breaking-websocket

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so, blind to each other; `checker` and `verifier` on Sonnet. Subject: commit
`1f06c29` (`units/websocket.diff`, `units/websocket-report.md`). The subjective lane ran because
the unit introduced a new error surface.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s17-26, s17-27, s17-28) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; `WebSocketErrorCode` in `types.ts` (the law's placement, not `errors.ts` as the ruling's text read) | CONFIRMED | — | CONFIRMED | — | stands; the ruling record was stale, the code right |
| 3 ruled form (types deleted; `parseWebSocketCanonical` in parsers with the policy question answered; `WebSocketError` with every `RangeError` site converted and pinned) | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, fences, README; `INTERNAL` empty; changed behavior asserted | — | BROKEN ("without writing a frame" unasserted) | CONFIRMED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | NOT-EVIDENCED (no shell) | — | CONFIRMED on the quoted commands | GREEN (326 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | — | stands |

The assigned finding: every former `RangeError` throw site (eleven) throws `WebSocketError` with
the ruled code and each is pinned by a test asserting the code.

Findings outside the claims, ruled and closed by the builder fix-up `abcf675`
(`units/websocket-fixup-brief.md`, `units/websocket-fixup-report.md`; full chain green): F1 the
"without writing a frame" claim now has a byte-recording assertion; F2 the `key` and `protocol`
`OPTION` cases assert their `context`; F3 / Referral B the remaining coercers and guards sit in
`parsers.ts` and the new `validators.ts` with the surface unchanged; Referral A the codes name
the fault (`CODE` → `CLOSE`, `PAYLOAD` → `LIMIT`) before the browser and mcp consumers adopt.
Referral C (the Errors section's placement and shape) stands as landed.

Recorded for the next change: `context` typed `Readonly<Record<string, unknown>>` documents a
per-code shape the type does not express; `parseWebSocketCanonical`'s prose opens "Reads whether"
for a `parse*` function (a fleet ruling on whether prefix meanings reach prose verbs); no fence in
this guide executes.

Terminal lines: objective PASS; subjective FAIL 5 (closed); checker PASS; verifier GREEN.
**Verdict: PASS after the fix-up.** The unit closes **applied** for every row. Tip packed:
`websocket-abcf675.tgz`. Consumers adopting `WebSocketError` and its codes: browser, mcp (L3).
