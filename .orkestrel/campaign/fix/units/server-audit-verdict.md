# Audit verdict — unit breaking-server

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `b32615d`
(`units/server.diff`, `units/server-report.md`), then the fix-up at `522ed4c`
(`units/server-fixup-brief.md`). The subjective lane ran: a class extraction, an error type, and
a rename family across mcp, toolbox, and middleware, above the wide-unit trigger.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s14-01, -03, -11, -12, -14, -02, -09) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; `Connection`, `StreamInterface`, `ServerErrorCode` in `types.ts` | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form | BROKEN (middleware unnamed as carrier) | BROKEN (same) | — | — | closed: the middleware-adopt-server unit (`aa8646a`) carried `clientRateKey → computeClientKey` and `ConnectionInfo → Connection` |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL`, executed assertion | — | BROKEN (`SSE_HEADERS` row overclaimed) | UNRESOLVED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | — | NOT-EVIDENCED by construction | GREEN (258 src, 1 skipped; policy 111; config 46; setup 14; guides 28) | stands |
| 8 nothing hidden | CONFIRMED | — | — | — | stands |

Fix round (`builder` on Sonnet, `units/server-fixup-brief.md`): `ServerErrorCode` member
`'status'` → `'STATUS'` (both lanes; the fleet's `*ErrorCode` unions spell their members
UPPER_SNAKE); `pickCoding` → `resolveCoding` (subjective F4, the Orchestrator named the symbol; the
vocabulary glosses `resolve*` as picking the effective value and the package already spells
`resolveSecure`, `resolveOrigin`, `resolveSecurityHeader`); the `SSE_HEADERS` guide row states the
merge rule (`Stream.test.ts:31-32`); the `Stream` class TSDoc opens with the noun phrase. The
builder left the `errors.ts` `@example` blocks, outside its owned set; the Orchestrator moved those
three lines directly. The fix-up landed at `522ed4c` with the full chain green
(`instruments/land-fixup.mjs`, log `land-fixup.log`: format:check 0, lint:check 0, check 0, build
0, test 0). Neither `@orkestrel/middleware` nor `@orkestrel/mcp` references `pickCoding` or the
`'status'` code, so the fix-up obliges no adoption; mcp re-stages on `server-522ed4c.tgz` before
its audit.

Referrals ruled: the `Stream` member set and the bound-method table stand; the `compute*` names
stand; the policy instruments' disagreement about class bodies (`tests/setupPolicy.ts` walks
top-level statements, the oxlint policy plugin sees inside a class) is recorded for scaffold as an
instrument-coverage finding.

Recorded for the next change: the ragged wrap at `guides/server.md:250-254`; the pre-existing
`should` at `guides/server.md:404`; the bare `Error` at `src/server/helpers.ts:106`; the stale
`openStream` fence in the vendored `guides/abort.md` mirror until the re-pin; the `README.md` link
to `guides/src/server.md` (fleet-wide, W-END `readme-links` sweep).

Terminal lines: objective PASS with claim 3 closed by the middleware unit; subjective `FAIL 3, 5`
closed by the fix-up; checker `FAIL 5, 7` (claim 5 UNRESOLVED settled by the subjective lane's
read and the fix-up, claim 7 by the verifier); verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `server-522ed4c.tgz`.
