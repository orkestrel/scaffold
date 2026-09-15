# Audit A4k — the server's `notifications/tools/list_changed` producer (`@orkestrel/mcp` U4e + U4e-b)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE lane. A GPT-6 Astra session wrote U4e, so the cross-engine reading of U4e is the
  reviewer's; you audit from source and the Orchestrator's execution records, never from memory of
  a prior session. Name each unexecuted vector as `UNRESOLVED` with its exact command and read the
  Orchestrator's logs under Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE and cross-engine lane for U4e —
  the shape of the producer's wiring, the merge ruling, the refusal's name and message, the
  option TSDoc and guide voice, the executed guide proof's shape.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4e carrier and every
  U4e-b carrier closed at the `file:line` the reports name; the red readings; scope; the probe.

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt`
suffixed where noted; the Astra lane reads the staged copies) and the mcp tree at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing.

## Subject

The `mcp` checkout at commit `7959f08` plus the working tree after U4e (ten files), U4e-b
(`tests/src/core/MCPClient.test.ts`), and U4e-c (`tests/src/server/handlers.test.ts`,
`tests/src/server/transports/WebSocketClientTransport.test.ts`, `tests/src/browser/factories.test.ts`).
Briefs: `U4e-mcp-list-changed-brief.md`, `U4e-b-mcp-client-tests-brief.md`,
`U4e-c-mcp-host-tests-brief.md`; reports: `U4e-mcp-list-changed-report.md`,
`U4e-b-mcp-client-tests-report.md`, `U4e-c-mcp-host-tests-report.md`. The round record is
`U4-chain-audit-verdict.md`.

## Review evidence

- `A4k-u4e-only.patch` — U4e's delta against `7959f08`; `A4k-u4e-b-only.patch` — U4e-b's delta
  (one file); `A4k-u4e-c-only.patch` — U4e-c's delta (three files); `A4k-whole.patch` — all three.
- `U4e-core-red.log.txt` / `U4e-core-green.log.txt` (the seven core pins, red then green, the
  writer's own runs); `U4e-guides-red.log.txt` / `U4e-guides-green.log.txt` (the executed guide
  proof); `U4e-baseline-core.log.txt` (the core project before U4e).
- `U4e-b-mcp-gates-orchestrator.log.txt`, `U4e-b-mcp-gates-test-full.log.txt` — the
  Orchestrator's gates after U4e-b (red on the eight host-only tests U4e-c closes);
  `U4e-d-mcp-gates-orchestrator.log.txt`, `U4e-d-mcp-gates-test-full.log.txt` — the authoritative
  gates after U4e-c and U4e-d (U4e-d: the guide's `server/discover` reply comment advertises
  `"listChanged":true`; brief `U4e-d-mcp-guide-reply-brief.md`, report
  `U4e-d-mcp-guide-reply-report.md`, delta inside `A4k-whole.patch`); `collide3-mcp-after-u4e-d.txt`.

## Numbered falsifiable claims

1. **The server owns the tools family.** Every `subscriptions/listen` stream whose honoured filter
   carries `toolsListChanged` yields one `notifications/tools/list_changed` per registry `add`,
   `remove`, and `clear`, from a handler parked on `tools.emitter` at the stream's start and
   released with `off` (the same handler reference) when `options.signal` aborts; no poll, no
   deadline read. A registry destroyed under a live stream publishes its final `clear` and then
   nothing, and the stream still ends on its signal. Pins: `pushes tools/list_changed when the
   registry adds a tool` / `… removes a tool` / `… clears`, `releases the registry subscription
   when the stream signal aborts`.
2. **Composition with a consumer producer.** The honoured filter is the consumer's
   `subscription.notifications` plus `toolsListChanged: true`; the consumer's producer and the
   built-in one pump through one queue (the report's merge ruling: no installed async-iterable
   merge primitive across `@orkestrel/**` declarations, so one native `ReadableStream`). Pin:
   `pumps a consumer producer beside the built-in tools family`. Name any ordering, backpressure,
   or cancellation defect between the two sources with its vector.
3. **The construction refusal.** A consumer filter claiming `toolsListChanged: true` is refused at
   construction with `MCPError` `JSONRPC_INVALID_PARAMS` (`-32602`), documented in the guide and
   the option's TSDoc. Pin: `refuses a consumer filter that claims the tools family`.
4. **Discovery advertises it.** `buildDiscoverResult` stamps `tools: { listChanged: true }`; the
   `resources` and `prompts` stamps keep their consumer-producer conditions. Pin: `advertises
   tools.listChanged`.
5. **The executed guide proof.** `tests/guides.test.ts` executes the refresh fences so a server-side
   registry `add` reaches the client's stream and the refresh installs the tool, with no
   re-publish and no poll; red against the previous server. The guide's prose for the server's
   `subscription` option and the `MCPSubscriptionFilter` row state the built-in family.
6. **U4e-b and U4e-c migrated only what U4e made false.** The four client scenarios moved to the
   prompts family keep their subject (stamped order, isolation by request id, queue capacity, a
   read parked past the deadline); the two HTTP handler scenarios moved the same way keep theirs
   (the SSE pump and closure; the disconnect signal reaching the producer); the discover literals
   carry `tools: { listChanged: true }`; nothing else in those four files changed; every project
   of the authoritative gates is green.
7. **Nothing else moved; nothing re-implements an installed export**: the owned files only;
   `src/browser/**` untouched; the probe clean; no `any`, no assertion, no nested function, no
   default export; the installed primitives the brief named are reused.
8. **Ship it toward mcp 0.0.31** with U5b (the distribution proof) next? Name what must change
   first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (or `outside: none`); ONE terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>`. Nothing else.
