Not needed — the check-brief cites only converge-fix and caps evidence. I have completed the audit.

Lane held: checker server

**Claim 1** — PASS. Fix diff status file (`d7n-server-converge-fix.status.txt`) lists exactly `guides/server.md`, `src/server/Server.ts`, `src/server/constants.ts`, `src/server/factories.ts`, `src/server/types.ts`, `tests/guides.test.ts`, `tests/setupServer.ts` — matching the brief's owned set with no other path. The retained diff (`d7n-server-converge-fix.diff.txt`) contains the `tests/setupServer.ts:232` hunk lowering `CLAIMED`→`claimed`, consistent with the standing condition (the Orchestrator applied the withheld patch before landing). The caps diff status file (`d7n-server-caps.status.txt`) lists only `src/server/Negotiator.ts`, `src/server/Server.ts`, `src/server/Stream.ts`, `src/server/constants.ts`, `src/server/errors.ts`, `src/server/helpers.ts`; every hunk in `d7n-server-caps.diff.txt` touches only `//` or `/**`-prefixed comment lines (confirmed line-by-line — every changed line in that diff begins `-` or `+` on a `//`, ` * `, or block-comment line), matching the caps brief's own files.

**Claim 2** — FAIL. `d7n-server-converge-fix-report.md:363-364` reads "The 37 includes the new `carries the fence lines the transcriptions copy` case; the run before this unit's edit carried 36." — a count stated in prose about a growable test set, banned by `AGENTS.md` § Writing ("NEVER state a count... rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets") and explicitly forbidden by the brief's own Output contract ("No count in prose"). Citations otherwise match the tree: `guides/server.md:69`, `:299`, `:437`, `:646`; `src/server/types.ts:202`; `src/server/factories.ts` example structure; `tests/guides.test.ts` case — all verified present in `/home/user/fleet/server` at the cited lines. The caps report carries no comparable prose count.

**Claim 3** — PASS. Verified directly against `/home/user/fleet/server` at its tip:
- SV1: `guides/server.md:69` reads "A `Shape` cell holds the constant's declared type." alone.
- SV2: `src/server/factories.ts:46` titles `createServer`'s example `Quickstart: dispatcher, middleware, lifecycle`; the fence at `guides/server.md:427-458` is byte-identical to the doc-block fence at `factories.ts:47-74`; `createNegotiator`'s example (`factories.ts:18-32`) is untitled; no line was deleted from either side of the Quickstart pair (the fence gained `readonly ip` and the connection-derived state, per Ruling 14).
- SV3: `constants.ts:96`, `types.ts` (all named sites), `tests/setupServer.ts:181` are lowered with contrast retained (`never`, `first`, `claims`/`throws`/`none`, etc.); a fleet-wide `grep -rnE '\b[A-Z]{3,}\b' src guides/server.md` on the current tree shows only permitted data (acronyms, HTTP vocabulary, error codes, quoted literals, filenames).
- SV4: `grep -n '\b(below|above)\b'` over `src/server/types.ts`, `src/server/Server.ts`, `guides/server.md` returns no hits.
- SV5: `guides/server.md:297-306` reads "an inner phase and an outer phase," "The inner phase covers only `buildRequest`," with `innermost` absent (`grep -n innermost` returns no hits).
- SV6: `tests/guides.test.ts` carries `carries the fence lines the transcriptions copy` at the pilot's position and shape, matching `/home/user/fleet/abort/tests/guides.test.ts:305-322`.
- SV7: `types.ts:202-204` reads "compresses or decompresses with... Its members are..." and the guide's `Encoding` cell (`guides/server.md:157`) equals it verbatim.
- SV8: `guides/server.md:645` and `factories.ts:21` both drop `const value = `.
- SV9: drop-in lines 1-3 (`tests/guides.test.ts:1-3`) equal the pilot's; the region equality and lead-in sentences at `:425`, `:507`(`:512` after caps insertion offset), `:589`(`:597`), `:604`(`:616`) are all present as complete sentences between heading and fence.

**Claim 4** — PASS. `grep -rnE '\b[A-Z]{3,}\b' src guides/server.md` against the tip of `/home/user/fleet/server` returns only acronyms/format names (`HTTP`, `JSON`, `HMAC`, `SHA`, `SSE`, `TCP`, `TLS`, `URL`, `RFC`, `ASCII`, `CORS`, etc.), HTTP vocabulary (`GET`, `OPTIONS`), error codes (`EADDRINUSE`), quoted code literals (`'STATUS'`, `'NEXT'`), and filenames/placeholders (`README`, `AGENTS`, `PORT`) — matching the caps report's ruled list. No sentence the caps successor recast lost meaning (spot-checked `errors.ts`, `helpers.ts`, `Server.ts`, `Stream.ts`, `Negotiator.ts`, `constants.ts` hunks against the diff — each recast preserves the sentence's contrast, e.g. "the first to return `true` claims... a throwing handler is treated as declined").

**Findings outside the claims**

- The standing condition is confirmed handled correctly: the off-limits `tests/setupServer.ts:232` patch was applied and is present in the retained diff and in the tree.
- No scope violation found in either diff beyond the acknowledged standing condition.

VERDICT: FAIL 2
