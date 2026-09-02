# Audit verdict — unit breaking-middleware

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so, blind to each other; `checker` and `verifier` on Sonnet. Subject: commit
`453f794` (`units/middleware.diff`, `units/middleware-report.md`), re-staged before the audit
against the accepted database, indexeddb, and sqlite tips (typecheck and guide parity 0, no
adoption debt). The subjective lane ran as the plan required for this wide unit.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (fifteen applied; s11b-Q1a, s11-23, s11-25 refused with the rule text; the budget adoption) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; new contracts in `types.ts` | BROKEN (`@typeParam S - The session data payload type` survived at `factories.ts:92,117`) | — | CONFIRMED | — | closed by the fix-up |
| 3 ruled form at every row, `MultipartLimitsInput` disclosed | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, fences, `INTERNAL`; changed behavior asserted | — | BROKEN (the DELETE contract item and the database store's construction guard unasserted) | CONFIRMED with the sub-clause routed | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | — | CONFIRMED on the quoted commands | GREEN (the skip and todo pre-existing) | stands |
| 8 nothing hidden | BROKEN (the report's `data` classification omitted the two `@typeParam` hits) | — | — | — | closed by the fix-up |

Findings outside the claims, ruled and closed by the implementer fix-up `ec186e4`
(`units/middleware-fixup-brief.md`, `units/middleware-fixup-report.md`) and the builder closing
round `ea723c4` (`units/middleware-fixup-2-brief.md`, `units/middleware-fixup-2-report.md`): the
`state` claim restated to what the type enforces; the factories-to-store cycle broken by
injecting the rebuild step (`restore` before `options`; the factory signature unchanged); the
earlier-column question run against the real database layer, whose row guard refuses a row
stored under `lastSeen`/`createdAt`, so no stale row turns immortal, pinned and stated in the
guide with the row's survival asserted; the empty-filename clause names the zero-byte body; the
multipart defaults take the grouped `_SIZE`/`_COUNT` names; the DELETE and construction-guard
assertions added and shown to redden under the recorded reverts; `transferSessionState`,
`buildClient`, and `SessionSnapshot.state` before any release carries the old names; the guide's
test index names the added proofs. The fix-round objective lane (`units/middleware-fixup.diff`)
confirmed the injection, the run's conclusion against the staged database source, and every
rename; its two open claims closed in the second round and the verifier ran the chain green.

Referrals ruled: `MultipartLimitsInput` retained (the pair mirrors `UploadedFile`/`UploadedFileInput`);
the Errors and multipart shapes stand. Recorded for the next change: `Session.set` beside
`SessionStoreInterface.set`; `SessionLimits` as a bare `*Limits` for a partial; the `Input` suffix
carrying two senses in one file; `context.stores`-style asymmetries none; the restore step's
callback type spelled inline rather than declared in `types.ts`.

Terminal lines: objective FAIL 2, 8 (closed); subjective FAIL 5 (closed); checker PASS; verifier
GREEN; fix-round objective FAIL 5, 7 (closed by the second round and the verifier). **Verdict:
PASS after two fix rounds.** Tip packed: `middleware-ea723c4.tgz`.
