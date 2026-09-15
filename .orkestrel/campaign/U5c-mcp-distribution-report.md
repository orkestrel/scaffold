# U5c — report (implementer, Opus 5) — returned 2026-09-15 ~17:50Z

Brief: `U5c-mcp-distribution-brief.md` (amending `U5-mcp-distribution-brief.md` and `U5b-mcp-distribution-brief.md`). Captured from the completion notification. Baseline `8d97dd0`.

The unit is complete. All owned gates are green.

## Touched files

| File | Summary |
| --- | --- |
| `C:/Users/mikes/WebstormProjects/mcp/tests/distribution.test.ts` | Adds the composition-receipt section: a second isolated consumer holding the packed workspace plus the installed `agent`, `tool`, and `ndjson` artifacts, a Vite-bundled page, a consumer-hosted Node fixture, two request recorders, and the X5–X8 plus closure and control cases. Also adds `packed` to the `Stage` record. |
| `C:/Users/mikes/WebstormProjects/mcp/tests/fixtures/distributionPage.mjs` | New. The in-page driver: page tool, scripted provider, and the `closure`, `page`, `pair`, `bridge`, `cancel`, `relay`, `control` receipts, plus `arm`/`counted`. |
| `C:/Users/mikes/WebstormProjects/mcp/tests/fixtures/distributionServer.mjs` | New. The consumer-side Node application: one origin serving the bundle, `/control`, the authenticated `POST /relay` route over `createRelay` with a scripted upstream, and `/receipts` for its own request accounting. |
| `C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md` | `## Tests` names each receipt by test title and states that the `distribution` project runs from `prepublishOnly`. |

```
 guides/mcp.md              |  30 ++++
 tests/distribution.test.ts | 387 ++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 416 insertions(+), 1 deletion(-)
```

```
 M guides/mcp.md
 M tests/distribution.test.ts
?? tests/fixtures/distributionPage.mjs
?? tests/fixtures/distributionServer.mjs
```

## Baseline, before any edit

`npm run test:distribution` at `8d97dd0`, 2026-09-15T17:16:46Z: **exit 0**, `Tests 11 passed | 4 skipped (15)`, Duration 17.99s, wall 19s. Log: `mcp/tmp/u5/baseline.log.txt`.

## Gates, after

Log `mcp/tmp/u5/gates-3.log.txt`, 2026-09-15T17:44:57Z.

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (135 files) |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run test:guides` | 0 | `202 passed (202)` |
| `npm run test:distribution` | 0 | `18 passed | 4 skipped (22)`, 18.98s (wall 22s) |
| `npm run test:policy` | 1 | `1 failed | 100 passed | 1 skipped (102)` — identical to the baseline I measured before editing; the single diagnostic is the standing `surface population incomplete … src/core/helpers.ts:837: TSDeclareFunction`. My files add no diagnostic. |

The four skips are the pre-existing `it.runIf` entry drives, unchanged.

## Receipts

Each network reading is `page.on('request')` after load / the in-page counter wrapped around `globalThis.fetch` after load. Every value below is pinned by `toStrictEqual` in the test, so the green run is the evidence.

| Criterion | Test title | Request log | Counter |
| --- | --- | --- | --- |
| closure | `evaluates every @orkestrel entry the installed agent imports [requires a browser]` | `[]` | `0` |
| X5 | `runs a page tool through an installed agent with no request at all [requires a browser]` | `[]` | `0` |
| X6 | `completes an in-page MCP pair with no request at all [requires a browser]` | `[]` | `0` |
| X7 call | `dispatches an agent call into the page server with no request at all [requires a browser]` | `[]` | `0` |
| X7 abort | `carries a caller abort into the page server handler [requires a browser]` | `[]` | `0` |
| X8 | `spends one relay request per model turn and runs the tool in the page [requires a browser]` | `[<origin>/relay, <origin>/relay]` | `2` |
| control | `reports one deliberate request on both recorders [requires a browser]` | `[<origin>/control]` | `1` |

Positive control's reading: `{ status: 200, text: 'control' }` with the request log and the counter each rising from zero to one — the same instruments that read zero for X5, X6, and X7.

What each receipt pins beyond the counters:
- **X5** — `painted: [{ note: 'kyoto', text: 'receipt-1' }]` read back off the document, `roles: ['user','assistant','tool','assistant']`, tool message `"receipt-1"`.
- **X6** — `connected: true`, `version: '2026-07-28'`, the listed tool with its forwarded `description` and `parameters`, `outcome: { resultType: 'complete', value: 5 }`, `stopped: false` and `code: -32600` after `stop`.
- **X7 call** — `executed: 1` inside the hosted server, `calls: [{add,true,5},{missing,false,'tool not found: missing'}]`, `turns: [0,1,2]`, `content: 'the sum is 5'`, six-role conversation.
- **X7 abort** — the hosted handler's own `context.signal` fired (the receipt only exists because that listener ran); the agent's registry reported `{ name: 'hold', success: false, value: "MCP request 'tools/call' was aborted" }`, `partial: true`.
- **X8** — the fixture's own accounting `{ relay: 2, served: [{roles:['user'],tools:['paint']},{roles:['user','assistant','tool'],tools:['paint']}] }`, so turn two carried the page tool's result back, and the page tool ran in the page (`painted: [{ note: 'kyoto', text: 'receipt-1' }]`).

## The Unknown's reading

The page imports and reads an export from every `@orkestrel` root entry the installed agent's browser target names, derived from that file rather than written down: `@orkestrel/abort`, `@orkestrel/budget`, `@orkestrel/contract`, `@orkestrel/database`, `@orkestrel/emitter`, `@orkestrel/queue`, `@orkestrel/timeout`, `@orkestrel/tool`, `@orkestrel/workflow`, `@orkestrel/workspace`. Each published a non-empty namespace in Chromium, no `pageerror` fired, and no polyfill or bundler transform was needed. The agent's full runtime closure evaluates in a page.

## Decisions I made and recorded

1. **The agent comes from the registry, not the tarball.** `@orkestrel/agent@0.0.23` was published at **2026-09-15T17:18:51Z** — during this unit — with `dist.shasum 028a324b5f32d65a20605ced9d29603686190dd5`, matching the pack in `K-release-agent-v23.log.txt`. The brief's tarball instruction was written against an unpublished agent, and U5c's own principle for the tool now applies to it. Registry install is also strictly better: the tarball's manifest still pins `@orkestrel/tool@^0.0.14`, which npm resolves as a **nested second copy of tool under the agent**; with 0.0.23 the consumer tree holds one `tool@0.0.15` and no nested trees (`mcp/tmp/u5/stage-probe.sh`). The installed set is `agent 0.0.23, tool 0.0.15, mcp 0.0.30 (packed), ndjson 0.0.10, router 0.0.14, server 0.0.19, contract 0.0.17`. I removed the interim `ORKESTREL_AGENT_ARCHIVE` override rather than leave a mechanism with no consumer.
2. **`@orkestrel/ndjson@^0.0.10` joins the composition install.** `RelayProviderOptions.parser` is required, and the agent's own `createRelayProvider` example states the browser application supplies that dependency. No package already in the consumer offers an equivalent (`@orkestrel/codec` is byte codecs), and writing a parser here would duplicate a declared primitive. `mcp/package.json` is untouched — this is the throwaway consumer's install list.
3. **The composition runs in its own consumer tree** under the same scratch root, installed in ONE `npm install` as briefed. The surface drives keep their own consumer, so an artifact a host cannot install can never redden the pre-existing receipts.
4. **The stage skips outside `--mode release` and throws under it**, matching the file's existing registry-skip design, with the reason naming either the refused install or the rejected browser.
5. **The Node half runs inside the consumer as a child process.** `import/no-dynamic-require` bars a dynamic import of the consumer's installed agent from the test process, so the relay's server half is a real consumer application driven through `createProcess` from `@orkestrel/process/server`. Teardown is verified: no `distribution-*` scratch tree survives a run.

## Observations for the Orchestrator, not fixed here

- **MCP cancellation drops the caller's reason.** The hosted handler reads `AbortError: signal is aborted without reason`, while `notifications/cancelled` carries an optional `reason`. The server's request-closure abort does not forward it. `src/**` is off-limits and this may be deliberate; the receipt therefore pins the reason's class rather than its sentence. This is a candidate finding for `MCPServer`.
- **A string tool value re-enters the conversation JSON-quoted** (`"receipt-1"`), while a number does not (`5`). Agent/tool behaviour, pinned as observed.
- **Duration cost:** the distribution project moved from 17.99s to roughly 19–23s across runs.

## Shared-file patches

None. No `src/**` change was needed, and nothing outside my owned files was touched.

## Deviation state

No deviation stop. Both departures from the brief's letter — the registry agent instead of the tarball, and the added parser package — were forced by facts measured during the unit and are recorded earlier in this report.
