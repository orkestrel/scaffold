<!-- U4e-f — implementer (Opus 5, native), mcp: the subscription stream's state record, its release reason, and the last text and placement items (A4l reviewer F1–F3, the recommended items, the release-reason carry-forward). Retained from the completion notification, 2026-09-15 (1220 s, 133 tool uses). Two decisions flagged for A4m: MCPSubscriptionState is a published type with writable members; a producer throwing a literal undefined now closes gracefully. -->

# U4e-f — report

Every carrier is closed. All acceptance criteria pass. No deviation. No agents spawned.

## Baselines

Before and after, `git status --porcelain` in `C:/Users/mikes/WebstormProjects/mcp` reports the same fifteen paths on `7959f080a7d1eaed167e8192395824c5b2f3da5d`; no path was added or removed. SHA-256 comparison against the pre-unit hashes (`tmp/u4ef/baseline-hashes.txt` → `tmp/u4ef/after-hashes.txt`) shows this unit changed exactly nine files, all owned:

| Path | This unit |
| --- | --- |
| `guides/mcp.md` | changed |
| `src/core/MCPServer.ts` | changed |
| `src/core/helpers.ts` | changed |
| `src/core/types.ts` | changed |
| `src/core/validators.ts` | changed |
| `tests/setup.ts` | changed |
| `tests/setup.test.ts` | changed |
| `tests/src/core/MCPServer.test.ts` | changed |
| `tests/src/core/validators.test.ts` | changed |
| `tests/guides.test.ts` | byte-identical |
| `tests/src/browser/factories.test.ts` | byte-identical |
| `tests/src/core/MCPClient.test.ts` | byte-identical |
| `tests/src/core/helpers.test.ts` | byte-identical |
| `tests/src/server/handlers.test.ts` | byte-identical |
| `tests/src/server/transports/WebSocketClientTransport.test.ts` | byte-identical |

All nine are LF-only, valid UTF-8, and end in a newline (`tmp/u4ef` Python reading, `CR=0` on each).

I could not produce a unit-only diffstat: reconstructing the U4e-e tree from `A4l-whole.patch.txt` plus `A4l-u4e-e-only.patch.txt` applies cleanly but does not reproduce the baseline hashes — the reconstructed `tests/src/browser/factories.test.ts` still carries `capabilities: { tools: {} }`, so those patches do not sum to the dirty tree. The hash table is the exact evidence instead. The diffstat below is cumulative over `7959f08` (U4e … U4e-f):

```text
 guides/mcp.md                     |  83 ++++---
 src/core/MCPServer.ts             | 181 ++++++++++++---
 src/core/helpers.ts               |  11 +-
 src/core/types.ts                 |  63 +++++-
 src/core/validators.ts            |  22 ++
 tests/setup.test.ts               |  69 +++++-
 tests/setup.ts                    | 100 ++++++++-
 tests/src/core/MCPServer.test.ts  | 457 +++++++++++++++++++++++++++++++++++---
 tests/src/core/validators.test.ts |  37 ++-
 9 files changed, 905 insertions(+), 118 deletions(-)
```

## Touched files, with line pointers

- `C:/Users/mikes/WebstormProjects/mcp/src/core/MCPServer.ts` — the refusal message (`:174`); the state record replacing the three collections (`:1439-1443` built, threaded at `:1477`, `:1522`, `:1536`, `:1569`, read at `:1456-1459`); the release reason at both sites (`:1503`, `:1512`) and on `#releaseProducer` (`:1579-1584`); the comment naming why `!emitter.destroyed` stays (`:1486-1489`).
- `C:/Users/mikes/WebstormProjects/mcp/src/core/types.ts` — `MCPSubscriptionState` (`:1798-1815`); the release reason in `MCPSubscriptionHandler`'s `@remarks` (`:1766-1770`); `MCPSubscriptionOptions.notifications` covering both refusal causes (`:1780-1784`).
- `C:/Users/mikes/WebstormProjects/mcp/src/core/helpers.ts` — `buildDiscoverResult`'s remark refilled (`:1129-1137`).
- `C:/Users/mikes/WebstormProjects/mcp/src/core/validators.ts` — `MCPConsumerFilter` sorted into its block (`:20`).
- `C:/Users/mikes/WebstormProjects/mcp/tests/setup.ts` — `ProducerScriptOptions` (`:1087`) and `createProducerScript` (`:1103`) with the extended `@remarks` (`:1100-1101`); import block sorted (`:19`, `:29-32`).
- `C:/Users/mikes/WebstormProjects/mcp/tests/setup.test.ts` — the block moved below the constants and renamed (`:81-138`); import sorted (`:48`).
- `C:/Users/mikes/WebstormProjects/mcp/tests/src/core/MCPServer.test.ts` — the release pin (`:484-523`); the refusal pin covering both causes with its comment (`:714-744`); type import sorted (`:34-36`); call sites renamed.
- `C:/Users/mikes/WebstormProjects/mcp/tests/src/core/validators.test.ts` — import block sorted (`:10`, `:23-24`).
- `C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md` — the coalescing sentence (`:919-920`), the refusal covering both causes (`:926-928`), the release reason (`:932-934`), the repeat struck, `:914-945` refilled; the `MCPConsumerFilter` Shape cell (`:2536`); the `MCPSubscriptionState` row (`:2545`).

## Per-carrier closure

1. **F2 — the refusal covers both causes.** `src/core/MCPServer.ts:174` carries the ruled message verbatim. The pin at `:714` now drives both a tools claim and a malformed filter (`promptsListChanged: 'yes'`), asserting the same class through `isMCPError`, the same `-32602`, and the same message. Guide `:926-928` and the `MCPSubscriptionOptions.notifications` TSDoc both name the malformed cause beside the tools claim; `isMCPConsumerFilter`'s `@returns` already covered both and is unchanged.
2. **F3 — the Shape cell is a type shape.** `guides/mcp.md:2536` reads `` `MCPSubscriptionFilter plus { toolsListChanged?: false }` ``, padded to the table's column widths.
3. **F1 — the setup block sits with its siblings.** `METHOD_OPTIONS` and `TASK_CONTEXT` are contiguous at `tests/setup.test.ts:73-79`, and `describe('createProducerScript')` opens the describe sequence at `:81`.
4. **One state record per subscription.** `MCPSubscriptionState` replaces `failures[]`, `iterators[]`, and the `unread` Set. `#startSubscription` takes five parameters (was seven), `#change` three (was four), `#pullSubscription` four (was five). Reads are `state.failure !== undefined`, `state.frame !== undefined`, `state.iterator`. The dequeue keeps the exact old semantics — `if (notification === state.frame)` — because clearing the mark unconditionally would let a second registry frame in behind an unread one when a consumer frame is dequeued first.
5. **The release reason.** `#releaseProducer(iterator, reason)` passes `options.signal.reason` at the abort listener (`:1503`) and at the mid-`start` abort (`:1512`), stated in `MCPSubscriptionHandler`'s `@remarks` beside the observe-the-signal sentence, in the guide's producer paragraph, and pinned.
6. **Guide precision and duplication.** `:919-920` reads "A stream read between changes receives one frame per change; changes that arrive together, or while the previous frame is unread, coalesce into one." The consumer paragraph's repeat is gone. `:914-945` and `src/core/helpers.ts:1129-1137` are refilled to 93 characters, the width their neighbours use.
7. **Names and comments.** `createSubscriptionScript` → `createProducerScript` and `SubscriptionScriptOptions` → `ProducerScriptOptions` at every site, with the `@remarks` extended to say `failure` throws before `park` is reached. The refusal literals carry a comment naming the evasion. `src/core/MCPServer.ts:1486-1489` names why `!emitter.destroyed` stays. The four import blocks are sorted.

## Failing-first tests

Command, both cases in one run:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core -t "refuses a consumer filter that claims the tools family or is malformed|releases the consumer producer with the stream's abort reason"
```

| Reading | Result |
| --- | --- |
| Before the fix (`tmp/u4ef/core-red.log`) | **2 failed, 954 skipped, exit 1** |
| After the fix (`tmp/u4ef/core-green.log`) | **2 passed, 954 skipped, exit 0** |

The red failures were the defects themselves, not collection errors:

- `releases the consumer producer with the stream's abort reason` — `expected Error: subscription released, received undefined` at `MCPServer.test.ts:518`, which is the `iterator.return?.(undefined)` the finding names.
- `refuses a consumer filter that claims the tools family or is malformed` — `"message": "The consumer filter must omit tools changes because…"` did not match the ruled message. The malformed case's code and class passed at baseline, so the message assertion is what makes this case red; that is correct, because F2 is a message defect.

## Controls

- **The guide row is load-bearing.** Deleting the `MCPSubscriptionState` row and running `npm run test:guides` gives exit 1: `expected [ 'interface MCPSubscriptionState' ] to deeply equal []`. Row restored; the file's hash is the committed one.
- **The evasion comment's claim is true.** Writing both refusal literals directly gives `tsc --noEmit --project tsconfig.json` two errors — `Type 'true' is not assignable to type 'false'` and `Type 'string' is not assignable to type 'boolean'`. Reverted.
- **The release mechanism was probed before the pin was written.** Two throwaway probes under `tmp/probe/` (removed) read the actual behaviour: with a parked reader, 1 of 4 producer writes resolves and the rest reject with `undefined`; `iterator.return(reason)` on a `TransformStream` readable rejects a pending write with that exact reason.

## Acceptance readings

| Command | Exit | Reading |
| --- | --: | --- |
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | Clean |
| `npm run check` | 0 | Root plus the three scoped source projects |
| `npm run test:src:core` | 0 | 956 passed (955 at the U4e-e baseline, plus the release pin) |
| `npm run test:setup` | 0 | 89 passed |
| `npm run test:guides` | 0 | 202 passed |
| `git diff --check` | 0 | Clean |

Observation, not a criterion: `npm run test:policy` exits 0 (90 passed, 1 skipped), run because `guides/mcp.md` changed and the sweep reads authored Markdown.

## Searches (criterion 4)

| Pattern | Population | Matches |
| --- | --- | --: |
| `createSubscriptionScript` | `src`, `tests`, `guides` | 0 |
| `SubscriptionScriptOptions` | `src`, `tests`, `guides` | 0 |
| `failures\[` | `src/core/MCPServer.ts` | 0 |
| `iterators\[` | `src/core/MCPServer.ts` | 0 |
| `unread\.size` | `src/core/MCPServer.ts` | 0 |

The bare words `failures`, `iterators`, and `unread` survive in `src/core/MCPServer.ts` only inside the dequeue comment at `:1456-1457`, which explains the mark.

## Decisions I made and recorded

1. **`MCPSubscriptionState` is a public type with writable members.** The brief's condition fired — the record is a parameter of four private methods — and `types.ts` is the only legal home: `policy/no-misplaced-type` (`configs/policy.ts:1147-1166`) refuses an interface or type alias outside `types.ts`, and `policy/no-hidden-declaration` refuses a non-exported one there, so `src/core/index.ts` star-exports it and `test:guides` demands a Surface row. The members must be writable because the registry listener, the stream's pull, and the request's generator share one record, so this is the package's only published type with non-readonly members. It sits in tension with `AGENTS.md` § Non-negotiable rules ("make interface properties readonly") and § Minimal public API; the alternative was the same object type written inline at four signatures, which the consolidation law refuses. Flagging it for the auditor rather than claiming it clean.
2. **One behaviour corner moved.** `failures.length > 0` became `state.failure !== undefined`, so a producer that throws literal `undefined` now ends the stream gracefully instead of with the detail-free `-32603` terminal, and `#change` no longer stops enqueuing in that one case. No test in the tree throws `undefined` (`grep` over `tests/` for `throw undefined`, `reject(undefined)`, `Promise.reject()` finds nothing), and the ruling put absence in `undefined`. Every other reading is exact.
3. **The evasion comment sits above both literals**, at the top of the refusal test, rather than as one line above one literal — the pin now carries two literals and one explanation covers them.
4. **`tests/src/core/validators.test.ts` moved one pre-existing line.** `MCPSubscriptionResult` sat after `MCPUnstampedCallResult` before this unit; sorting `MCPSubscriptionOptions` into place beside it without moving it would have split the pair, so the tail now reads `MCPResult, MCPSubscriptionOptions, MCPSubscriptionResult, MCPToolDescriptor, MCPUnstampedCallResult`.
5. **Untouched pre-existing disorder.** `MCPMethodOptions` in `tests/src/core/MCPServer.test.ts` and the unsorted value-import blocks in that file and in `tests/setup.ts` predate U4e-e and are not this unit's; only inserted names were sorted.
6. **The guide carries the release reason.** Carrier 5 named only the TSDoc, but the sentence sits inside a paragraph carrier 6 rewrites, and leaving the guide silent about a new observable behaviour is drift.
7. **Fleet name check.** `createProducerScript`, `ProducerScriptOptions`, and `MCPSubscriptionState` appear in no guide under `C:/Users/mikes/WebstormProjects/scaffold/guides/`.

## Shared-file patches

None. No shared or off-limits file was read-modified.

## Deviation state

None. Neither deviation trigger fired: the state record replaced all three collections with no behaviour change any existing pin observes (956 passed, every prior pin green and untouched), and the release reason reaches a `TransformStream` producer's pending write through `iterator.return(reason)`, proved by probe and by the pin's red-then-green.

## Retained instruments

`C:/Users/mikes/WebstormProjects/mcp/tmp/u4ef/` holds the executed instruments (`rewrap-guide.py`, `rewrap-helpers.py`, `guide-rows.py`), the hash tables, and the logs (`core-red.log`, `core-green.log`, `final-*.log`, `guides-control.log`, `policy.log`). `prove` was unreachable on this host, so no receipt is claimed.
