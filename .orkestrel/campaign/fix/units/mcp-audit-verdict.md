# Audit verdict — unit breaking-mcp

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `e7d82a4`
(`units/mcp.diff`, `units/mcp-report.md` with the Orchestrator's inventory correction,
`units/mcp-report.json`), then the fix-up at `51775d1` (`units/mcp-fixup-brief.md`,
`units/mcp-fixup-report.md`, `units/mcp-fixup.diff`, `units/mcp-fixup.status`, the retained probe
`units/mcp-fixup-probe-legacy-owner.mjs` with its recorded output `.out`, checker lane
`units/mcp-fixup-audit-checker-brief.md`). The subjective lane ran: a class unified across
faces, a bootstrap merge, and three rename families, above the wide-unit trigger. The unit ran
against `server-b32615d.tgz` and re-staged on `server-522ed4c.tgz` before its audit; neither
`pickCoding` nor the `'status'` code is referenced here.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s01-01, -02, -03, -04, -06, -07, -09, -10, -11, -18, -19; the carriers) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; the new contracts in each face's `types.ts` | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form | BROKEN (s01-11) | BROKEN (s01-03, s01-11) | BROKEN (same) | — | s01-03 merge ratified; s01-11 ruling amended to `createDuplexServerTransport`, landed by the fix-up |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL` empty, executed assertion for the unified rejection | — | CONFIRMED | CONFIRMED | — | stands; the server-face notes landed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED as quoted | GREEN (1337 src with the pre-existing skip; policy 111; config 46; setup 86; guides 159; conformance 47; integration 4) | stands |
| 8 nothing hidden | CONFIRMED | — | — | — | stands |

Rulings: the merge of `serveMCP` and `serveMCPScope` into `createScopeServer(options, scope?)`
returning `ScopeServerInterface` is ratified — the ruled `create{ReturnType}` form could not name
two functions returning one type, `serveMCP` was a one-line default-argument delegate, and the
default-scope path is proven over the real `globalThis` and a real `MessageChannel`. The s01-11
ruling is amended: `createMCPTransport` would claim the slot `createMessagePortTransport` holds
and misdescribe an adapter as a constructor, so the adapter is `createDuplexServerTransport`, the
mirror of `createDuplexClientTransport`. The two face `createHTTPClientTransport` delegates stand
under the s01-01 ruling.

Fix round (`builder` on Sonnet, `51775d1`): the rename across the factory, its call sites, the
guide rows, and the test consumers; the guide's server face tells the one-shared-class story
(the `createHTTPClientTransport` row reads as the browser row, and notes name where
`HTTPClientTransport`, `decodeEvent`, `readEventStream`, `buildResponseError`, and
`HTTPClientTransportOptions` ship from); the dead test-comment paths (objective F1, F2) corrected;
the falsified `guides.test.ts` fixture comment (F3) reworded; `via` (F4) replaced; the
`LEGACY_OWNER_PATTERN` probe (subjective referral) run over every `MCPSession*` export. Landed
with the full chain green (`instruments/land-fixup.mjs`, log `land-fixup.log`). The checker on the
fix-up ruled `FAIL 4` because the probe's output was paraphrased, not recorded; the Orchestrator
re-ran the retained probe against the tree, recorded its output beside the script, and proved
the probe's pattern literal identical to the tree's. The report's line handles that shifted by
one after the format pass are a report defect recorded here.

Recorded for the next change: publish `createHTTPClientTransport` once from core and drop the two
face delegates; `createScopeMessageListener` returns a function and sits in `factories.ts`;
`MCPSessionOptions` and `MCPSessionMiddlewareOptions` share `ttl` and `capacity` with different
meanings (group the entity's knobs under a `session` key); the bare `ScopeInterface` beside
`cacheScope`; `guides/README.md:58` names `openStream` for the vendored `guides/server.md` mirror
until the re-pin; the four wire headers left the server face with no fleet consumer (radius
recorded); `via` at `tests/src/server/factories.test.ts:52,55` and
`tests/src/server/integration.test.ts:39,75,145` for the voice wave; the writer's `git mv`
staging and `git add -N` inside a no-stage brief, undone before landing, as a process note.

Terminal lines: objective `FAIL 3`, subjective `FAIL 3`, checker `FAIL 3` — all closed by the
amended ruling and the fix-up; verifier GREEN; checker on the fix-up `FAIL 4` closed by the
recorded probe output. **Verdict: PASS.** The unit closes **applied** for every row. Tip packed:
`mcp-51775d1.tgz`.
