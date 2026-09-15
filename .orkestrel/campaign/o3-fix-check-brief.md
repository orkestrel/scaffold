# Unit O3-fix-check — mechanical conformance of unit O3-fix

## Role and engine

`checker`, native Claude (Sonnet), read-only, clean context. Perform the assignment directly and
spawn nothing. Return the verdict as your final message.

## Objective

Rule on each claim from the diff and the files at the ollama commit named under § Context, per
the `orkestrel-falsify` value set (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, with `file:line`
evidence), then findings outside the claims, then one terminal `VERDICT:` line.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/ollama`, read only, at commit O3FIX_SHA (the merge of
  the `o3-fix` branch into main), tree clean.
- Unit brief and report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o3-fix-brief.md`
  and `o3-fix-report.md`; the findings it closes: `o3-audit-subjective.md` claim 9 and F1–F5, F7.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o3-fix-diff.txt`; gates
  `o3-fix-gates.log.txt` (the worktree run, live service included).
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/tests.md`,
  `names.md`, `typescript.md`, `writing.md` under that root.

## Claims

1. The header comment of `tests/setupServer.test.ts` names the relay server and the transport
   fixtures beside the proxy and scopes the socket sentence to the proxy and relay-server cases,
   with the transport fixtures named as in-memory and no daemon in any case.
2. Each of the three live cases in `tests/service/relay.test.ts` wraps the server-side provider's
   transport in `createRecordingTransport` and asserts `path` `/api/chat` and a non-empty
   `body.messages` from its recorded requests, keeping every prior assertion.
3. `createCapturedTransport`, `CapturedTransportInterface`, and `RecordingProxyInterface` appear
   nowhere under `tests/`; `createRecordingTransport` returns `requests`, `chunks`, and `fetch`
   under `RecordingTransportInterface`; `createRecordingProxy` and `createRelayServer` return
   `RecordingServerInterface`; `waitForRequest`'s parameter is `server`.
4. The `cancelled` member's TSDoc names the `ReadableStream` `cancel` callback it mirrors.
5. The two negative credential assertions in `tests/src/core/integration.test.ts` read
   `JSON.stringify(request.headers)`.
6. The tool round-trip case gives the replayed call a `caller` and asserts the relay body carries
   the call without a `caller` key.
7. The diff touches only `tests/setupServer.ts`, `tests/setupServer.test.ts`,
   `tests/src/core/integration.test.ts`, `tests/service/relay.test.ts`,
   `tests/service/OllamaProvider.test.ts`, and `tests/src/core/factories.test.ts`; no banned
   construct; test names describe what each proves.
8. The gate log shows `format:check`, `lint:check`, `check`, `test:src:core` (99), `test:setup`
   (96), `test:conformance` (17), `test:policy`, and `test:service` exit 0.

## Output

Per-claim verdicts with evidence, findings outside the claims, and one line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
