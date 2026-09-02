# Unit breaking-websocket — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s17-26** — applied: Deleted WebSocketCloseCode, WebSocketMessage, and WebSocketClose from /home/user/fleet/websocket/src/server/types.ts with the whole '// === Message + close' section, deleted their three guides/websocket.md Types rows, and replaced the dangling {@link WebSocketClose} in NodeWebSocketEventMap's @remarks with prose naming the labeled [code, reason] tuple. The tuple itself is untouched: NodeWebSocketEventMap still declares 'close: readonly [code: number | undefined, reason: string | undefined]'. No in-package consumer existed for any of the three beyond that one link — the pre-edit sweep found only the declarations and the guide rows.
- **s17-27** — applied: isWebSocketFrameCanonical -> parseWebSocketCanonical, moved from src/server/helpers.ts into a new src/server/parsers.ts, body unchanged, TSDoc first sentence rewritten third-person ('Reads whether the next frame uses the shortest valid RFC 6455 payload-length encoding.') and its @example retargeted. src/server/index.ts now star-exports './parsers.js'; NodeWebSocket's #drain calls the new name. Its describe block moved out of tests/src/server/helpers.test.ts into the mirrored tests/src/server/parsers.test.ts, which the guide's ## Tests list now links. Guide Codec-helpers row and Contract invariant 7 renamed.
- **s17-28** — applied: New src/server/errors.ts with WebSocketError (extends Error, readonly code + optional readonly context, name 'WebSocketError') and isWebSocketError; new WebSocketErrorCode = 'OPTION' | 'PAYLOAD' | 'CODE' | 'FRAME' in src/server/types.ts (a type alias outside types.ts is a policy 'type' violation, so the code union lives there and the class/guard in errors.ts). Every RangeError site converted: constructor payload, timeout, key, protocol, and protocol-without-key -> OPTION; ping over-cap payload and close over-cap reason -> PAYLOAD; close invalid code -> CODE; encodeWebSocketFrame opcode, mask length, and mask-without-masked -> FRAME. Each carries the refused value in context except mask-without-masked, whose message names the fault. Guide ping/close Methods rows and Contract invariant 4 restated, and a new ## Errors section added with the code table, the context contract, and a worked upgrade-handler fence.

## Symbols moved

- WebSocketCloseCode — removed (src/server/types.ts)
- WebSocketMessage — removed (src/server/types.ts)
- WebSocketClose — removed (src/server/types.ts)
- isWebSocketFrameCanonical → parseWebSocketCanonical (src/server/helpers.ts → src/server/parsers.ts)
- WebSocketError — added (src/server/errors.ts)
- isWebSocketError — added (src/server/errors.ts)
- WebSocketErrorCode — added (src/server/types.ts)

## Files touched

- /home/user/fleet/websocket/src/server/types.ts
- /home/user/fleet/websocket/src/server/errors.ts
- /home/user/fleet/websocket/src/server/parsers.ts
- /home/user/fleet/websocket/src/server/helpers.ts
- /home/user/fleet/websocket/src/server/NodeWebSocket.ts
- /home/user/fleet/websocket/src/server/factories.ts
- /home/user/fleet/websocket/src/server/index.ts
- /home/user/fleet/websocket/tests/src/server/parsers.test.ts
- /home/user/fleet/websocket/tests/src/server/helpers.test.ts
- /home/user/fleet/websocket/tests/src/server/NodeWebSocket.test.ts
- /home/user/fleet/websocket/guides/websocket.md

## Tests changed

- /home/user/fleet/websocket/tests/src/server/parsers.test.ts — NEW, mirrors src/server/parsers.ts. Carries the two cases moved off helpers.test.ts ('accepts each shortest length form and waits for an incomplete prefix', 'rejects non-minimal extended lengths and a set 64-bit high bit') plus a new 'waits for the extended length prefix before ruling' pinning the undefined answer at a split 16-bit and 64-bit prefix.
- /home/user/fleet/websocket/tests/src/server/helpers.test.ts — the isWebSocketFrameCanonical describe block removed; 'rejects opcodes outside the four-bit wire field with a FRAME WebSocketError' and 'requires an explicit mask to be exactly four bytes and enabled' now capture with captureError and assert code 'FRAME' plus the exact context ({ opcode }, { size: 3 }, and undefined for the mask-without-masked arm). Imports isWebSocketError in place of isWebSocketFrameCanonical, and captureError from @orkestrel/test.
- /home/user/fleet/websocket/tests/src/server/NodeWebSocket.test.ts — 'rejects malformed handshake values before writing to or assuming ownership of the socket', 'rejects a subprotocol in client mode because no server handshake can carry it', and 'rejects invalid payload and timeout limits before attaching socket listeners' assert code 'OPTION' (the last two also the exact context); 'rejects invalid outbound control payloads without changing the open state' now asserts PAYLOAD/{size,limit} for the ping, CODE/{code:1000.5} for the fractional close code, and PAYLOAD/{size,limit} for the over-cap reason, then re-asserts readyState 1. Imports isWebSocketError, WEBSOCKET_CONTROL_MAXLEN, WEBSOCKET_CLOSE_REASON_MAXLEN, and captureError.

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. / Finished in 2622ms on 47 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . (no output, no findings)
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.server.json (no diagnostics)
- `npm run build` → exit 0 — dist/src/server/index.js 29.44 kB gzip 8.89 kB; dist/src/server/index.cjs 30.66 kB gzip 9.08 kB; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- `npm test` → exit 0 — src:server Tests 120 passed (120); policy Tests 111 passed (111); config Tests 46 passed (46); setup Tests 17 passed (17); guides Tests 18 passed (18); integration Tests 14 passed (14)
- `grep -rnw '<old-name>' src tests guides/websocket.md guides/README.md README.md — for WebSocketCloseCode, WebSocketMessage, WebSocketClose, isWebSocketFrameCanonical, RangeError` → exit 1 — hits=0 for every one of the five patterns (exit 1 is grep's no-match). Population: src/**, tests/**, guides/websocket.md, guides/README.md, README.md. guides/contract.md and guides/probe.md still spell RangeError and are excluded deliberately: they are vendored dependency guide mirrors, off-limits, and their hits are about @orkestrel/contract and @orkestrel/probe, not this package.

## Diff stat

```text
git diff --stat (tracked):
 guides/websocket.md                    | 80 ++++++++++++++++++++++++----------
 src/server/NodeWebSocket.ts            | 50 ++++++++++++++-------
 src/server/factories.ts                |  3 +-
 src/server/helpers.ts                  | 49 +++++----------------
 src/server/index.ts                    |  2 +
 src/server/types.ts                    | 42 +++++++++---------
 tests/src/server/NodeWebSocket.test.ts | 37 +++++++++++++---
 tests/src/server/helpers.test.ts       | 59 ++++++++-----------------
 8 files changed, 176 insertions(+), 146 deletions(-)

Untracked additions (not in the stat above): src/server/errors.ts (76 lines), src/server/parsers.ts (35 lines), tests/src/server/parsers.test.ts (43 lines).

git diff --check exits 0 (no whitespace debris). Every touched file re-verified as valid UTF-8 with no replacement character.
```

Status at return (writer's reading): `git status --short: |  M guides/websocket.md |  M src/server/NodeWebSocket.ts |  M src/server/factories.ts |  M src/server/helpers.ts |  M src/server/index.ts |  M src/server/types.ts |  M tests/src/server/NodeWebSocket.test.ts |  M tests/src/server/helpers.test.ts | ?? src/server/errors.ts | ?? src/server/parsers.ts | ?? tests/src/server/parsers.test.ts |  | Nothing staged, nothing committed. dist/ is gitignored and does not appear.`
Built `dist/` moves: true

## Observations

- ANSWER TO THE RULING'S QUESTION — tests/setupPolicy.ts does NOT gate parse* names to parsers.ts. inspectPolicyFunctionName (tests/setupPolicy.ts:562-575) is one-directional: it reports a 'parser' violation only when `file === 'parsers.ts'` and the declared name does not start with 'parse'. A parse* function OUTSIDE parsers.ts is unreported. So the new src/server/parsers.ts passes because parseWebSocketCanonical carries the prefix, and parseWebSocketFrame and parseUTF8 remain in src/server/helpers.ts with no red. tests/policy.test.ts passed 111/111 after the move.
- SCOPE NOTE, not acted on — parseWebSocketFrame and parseUTF8 are both coercers returning `T | undefined` and both still sit in src/server/helpers.ts alongside the new src/server/parsers.ts. Neither is a row in this brief and the sweep cannot see them (preceding observation), so I left them. An auditor will read the split as inconsistent; it is a finding for the capability that owns those two symbols, not this unit.
- BEHAVIOR-CHANGE CONSUMERS — browser and mcp. WebSocketError extends Error, not RangeError, so any consumer catching RangeError from createNodeWebSocket, NodeWebSocketInterface.ping, NodeWebSocketInterface.close, or encodeWebSocketFrame stops narrowing. Their units follow per .orkestrel/campaign/fix/breaking-radius.json.
- WebSocketErrorCode design — four members, each naming the SUBJECT refused rather than the call site: OPTION (a NodeWebSocketOptions member), PAYLOAD (a control-frame payload past its RFC 6455 §5.5 cap), CODE (a close status code isCloseCode refuses), FRAME (an encodeWebSocketFrame frame-header argument). UPPER_SNAKE_CASE literals follow the fleet's prevailing *ErrorCode form (SQLiteErrorCode, IndexedDBErrorCode, SSEErrorCode, CSVErrorCode). The class mirrors src/server/errors.ts on sqlite and sse exactly: readonly code, optional readonly context assigned only when supplied, name set, and an instanceof guard. No errors.test.ts was added — .agents/skills/orkestrel-harden-package/references/centralization.md forbids isolated tests for error definitions; the code and context are pinned from the throwing call sites in helpers.test.ts and NodeWebSocket.test.ts instead.
- Message wording — 'ping payload exceeds 125 bytes' became `ping payload exceeds ${WEBSOCKET_CONTROL_MAXLEN} bytes`, matching the close-reason message's existing interpolation and removing a magic number that duplicated the constant. No test or guide row asserted the old literal.
- @throws added to encodeWebSocketFrame (src/server/helpers.ts) and createNodeWebSocket (src/server/factories.ts) per .claude/rules/typescript.md § Comments and API documentation; NodeWebSocketOptions and NodeWebSocketInterface @remarks in types.ts now state the refusals, since those members carry no per-member TSDoc.
- Third-person first sentences applied only to the blocks I rewrote: parseWebSocketCanonical ('Reads whether…'), encodeWebSocketFrame ('Encodes…'), createNodeWebSocket ('Creates…'). The rest of the package's imperative first sentences are pre-existing and outside these rows.
- Whole-suite timing on this host was uneventful — npm test completed in roughly 8 seconds across its six projects with no timing-suspect failure. Nothing to carry to the authoritative re-run.
- test:distribution was not run: it is outside npm test and the brief excludes it while the dependency tarballs are staged. Staging re-verified before editing — node /home/user/work/verify-stage.mjs websocket reported OK for contract (2c15840), emitter (3f59367), guide (be6111e), html (bc53632), markdown (de72312), and test (cced24a).
- The adoption list was empty. npm run check exited 0 on the untouched tree before any edit, so no renamed upstream symbol from the staged L0/L1/W-DEV closure needed adopting in this package. tests/guides.test.ts already imported the renamed @orkestrel/guide helpers at commit 6bdb626.
- Built surface confirmed moved: dist/src/server/index.d.ts declares isWebSocketError, parseWebSocketCanonical, class WebSocketError, and WebSocketErrorCode, and carries zero occurrences of WebSocketCloseCode, WebSocketMessage, or isWebSocketFrameCanonical.

## Deviations

- BRIEF FACT CORRECTED, work unaffected — the brief's Law section says the rule files are 'all vendored in the repository'. They are not. /home/user/fleet/websocket has no .claude/rules/ directory; its .claude/ holds only settings.json and agents/orkestrel.md, and its AGENTS.md redirects every rule path to the installed scaffold copy. I read them at node_modules/@orkestrel/scaffold/dist/host/claude/rules/ and the skill at node_modules/@orkestrel/scaffold/dist/host/agents/skills/orkestrel-harden-package/. The brief's quoted § Standalone helpers and § Fixed derivation/construction forms text bound over that older vendored copy, as instructed.
- ANCILLARY, decided and carried on (per the deviation contract) — the @example on isWebSocketProtocol in src/server/helpers.ts read `throw new RangeError('invalid protocol')`. It is caller-illustration, not one of the wrapper's own throw sites, but leaving RangeError in this package's own TSDoc after the row replaces it everywhere is exactly the prose drift the sweep exists to catch. I changed it to `socket.destroy()`, matching the isWebSocketKey example directly above it, rather than inventing a recommendation that consumers throw the package's error type from their own code.
- ANCILLARY, decided and carried on — placement of the new ## Errors section (after ## Contract, before ## Patterns, matching the process guide's house position) and of the ### Errors subsection inside ## Surface (after ### Entities). The ## Errors code table uses a `| Code | Raised when |` header with no `Kind` column, so @orkestrel/guide's extractSurface contributes nothing from it to the documented surface; only the ### Errors Surface rows do.
- ANCILLARY, decided and carried on — two prose statements were drafted too strongly and corrected before the gates: 'each throws before the wrapper writes to or assumes ownership of the socket' is true only of OPTION. Both guides/websocket.md and the src/server/errors.ts module comment now state the per-code truth (OPTION before ownership; PAYLOAD and CODE without writing a frame or moving readyState; FRAME out of the pure encoder, which touches no socket). Verified against the source: close() validates code and reason before assigning WEBSOCKET_READY_CLOSING, and ping() validates before #write.
- No row was refused and no row stopped. No off-limits file was touched: package.json, package-lock.json, configs/**, tests/setupPolicy.ts, tests/policy.test.ts, the vendored guide mirrors, and .claude/** are all unmodified. No commit, stage, push, install, fetch, merge, or discarding git command was run; npm run format ran once tree-wide to converge after lint:check was already clean, and the non-mutating chain then proved the state.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/websocket.diff`,
`tmp/units/breaking/websocket.status`.
