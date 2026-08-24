### 1. MCP backpressure

Proposal:

- Keep the existing `MCPClientTransportInterface.send` contract: resolve only after the write completes; reject, never synchronously throw, when it fails. The type and guide already require that behavior. [Contract](/home/user/orkestrel/mcp/src/core/types.ts:2130) [Guide](/home/user/orkestrel/mcp/guides/mcp.md:2915)
- Give each stdio write a completion callback. A `true` return leaves the outbound gate open. A `false` return closes it until `drain`; later sends remain queued, and the affected send waits for its callback and the drain boundary.
- Serialize queued writes to preserve call order. A synchronous `write` throw becomes the returned promise’s rejection.
- Subscribe to output `error` during `start` and remove only that listener during `close`. Preserve all caller listeners and never end or destroy the caller-owned stream. An output error emits the domain event, marks the write lifetime failed, and rejects pending and queued sends.
- `close` rejects unsettled sends and removes pending drain listeners. No send promise may remain parked after closure.
- Move sibling `MCPClientTransportInterface` implementations to the same contract. WebSocket sends must reject when the socket is not open. Browser pre-open sends must stay pending until actually written and reject if opening fails or closure discards them. HTTP network failures must emit and reject; a locally initiated close may suppress the domain error event, but its aborted send still rejects. `MessagePortTransport` stays unchanged because it implements the separate `MCPTransportInterface`. The measured silent-drop behaviors conflict with the shared contract. [Transport map](/home/user/scaffold/tmp/cursor/absorb-rows.log:55) [Message-port contract](/home/user/orkestrel/mcp/src/core/types.ts:2034)

Executed pins must cover successful writes, callback failure, synchronous throw, false-then-drain, ordering behind a blocked write, output error before drain, idle output error, closure while blocked, listener preservation, and pre-open WebSocket settlement. Mutation controls must remove the drain gate and the error path and make their pins fail.

`dist/src` moves. MCP bumps from the registry-served version; measured HEAD implies `0.0.23`. Probe then re-pins MCP, bumps, and republishes. [Cascade](/home/user/scaffold/tmp/units/cascade-map.md:5)

### 2. Brief constants

Proposal:

```ts
export const INTERPRETATION_MEMBERS = Object.freeze([
	'text',
	'normalized',
	'intent',
	'entities',
	'subject',
	'definition',
	'mappings',
	'ambiguities',
	'prompt',
	'stages',
	'failures',
	'complete',
	'confidence',
	'digest',
] satisfies readonly (keyof Interpretation)[])
```

`INTERPRETATION_MEMBERS` follows qualified-constant naming and uses the project’s required frozen-array form without a type assertion. [Naming rule](/home/user/scaffold/.claude/rules/names.md:147) [Constant rule](/home/user/scaffold/.claude/rules/architecture.md:58)

Rewire `#own` and `captureValue` to this constant, replacing the method-local literal. [Consumers](/home/user/orkestrel/brief/src/core/BriefCompiler.ts:284)

A compile-time equality pin is required:

```ts
expectTypeOf<(typeof INTERPRETATION_MEMBERS)[number]>().toEqualTypeOf<
	keyof Interpretation
>()
```

The `satisfies` clause rejects foreign names. Equality rejects omission when `@orkestrel/interpret` adds a member. A widened `readonly (keyof Interpretation)[]` annotation alone would not prove completeness. The negative control removes a member and must fail the Brief core project at typecheck. Because this is a named TypeScript edit with a project and mutation control, the implementation unit must obtain the required `prove` receipt. [Interpretation contract](/home/user/orkestrel/interpret/src/core/types.ts:280) [Instrument rule](/home/user/scaffold/.claude/rules/quality.md:59)

Runtime tests pin the frozen exact sequence and the existing own-member/accessor capture behavior. Export and guide parity must include the new supported constant.

`dist/src` moves. Measured HEAD implies Brief `0.0.6`; it has no runtime dependents. [Cascade](/home/user/scaffold/tmp/units/cascade-map.md:9)

### 3. Process assertions

Proposal:

Consolidate the weak platform branch into the existing recorder-based race proof:

- Supply `on: { exit: raced.handler }` to the refused launch.
- Await the `manager.destroy()` barrier.
- Snapshot `raced.count` immediately after that barrier.
- Run the registered-child control with the same fixture, recorder, and barrier.
- Assert the refused launch reports `protocol`, leaves the manager empty, emits its terminal `ProcessExit`, and has already emitted it when the barrier resolves.
- Keep the eventual terminal assertion so a failed immediate snapshot diagnoses barrier timing rather than a child that never terminated.
- Delete the redundant marker-absence branch. Preventing the child spawn must now make the recorder assertion fail.

The repository already contains this stronger mechanism beside the weak proof. [Weak branch](/home/user/orkestrel/process/tests/src/server/ProcessManager.test.ts:200) [Recorder proof](/home/user/orkestrel/process/tests/src/server/ProcessManager.test.ts:261)

Retain `tests/src/server/Process.test.ts` in `src:server`. The package’s server subject is process spawning, and the project already collects the spawn-heavy family. `distribution` and `service` have fixed distinct subjects; no rule authorizes moving an isolated source proof there. Size the shared project’s timeout from a full contended run. [Measured placement](/home/user/scaffold/tmp/cursor/absorb-rows.log:83) [Expensive-proof rule](/home/user/scaffold/.claude/rules/tests.md:155)

This is test-only. `dist/src` does not move, so Process does not bump.

### 4. HTML entities

Proposal:

Size plus spot membership does not prove the reviewed set. A same-size key replacement, value replacement, or swap passes that instrument.

Add a test-only SHA-256 pin over a canonical, order-independent serialization of sorted `[name, value]` entries. Mint the expected digest independently from the reviewed WHATWG semicolon-terminated snapshot dated in the test evidence. Do not derive the expected value from `NAMED_ENTITIES` during the test. Mutation controls must alter a key and a value and make the comparison fail.

Keep the exhaustive decoder-to-table proof and security subset proof; they answer different questions. [Current assertions](/home/user/scaffold/tmp/cursor/absorb-rows.log:89) [Instrument controls](/home/user/scaffold/.claude/rules/quality.md:61)

This changes tests and explanatory guide text only. `src` and `dist/src` remain unchanged, so HTML, Markdown, Browser, and Guide do not enter a release cascade. [Published surface](/home/user/scaffold/tmp/units/cascade-map.md:14)

### 5. Setup proofs

Proposal:

A setup proof must exercise the reusable behavior exported from its sibling setup module as the consuming suites require. It must cover each behavior-bearing helper’s contract and boundary cases, not merely import names. Data tables receive structural and invariant checks. Type-only exports receive `expectTypeOf` checks where useful. Production behavior must not be reimplemented in the proof. [Proof subject](/home/user/scaffold/.claude/rules/tests.md:52) [Shared infrastructure](/home/user/scaffold/.claude/rules/tests.md:170)

For a module exporting only `isBrowserVuePath`, the smallest honest proof accepts intended `app/browser/*.vue` paths with POSIX and Windows separators and rejects sibling paths and prefix lookalikes. That proves normalization and containment rather than symbol presence.

Queue must not receive a token proof. Its setup module exports nothing and carries only explanatory comments. Restore `tests/setup.ts` to scaffold’s empty seed, retain the structural path, and register no setup project. Scaffold’s advisory deliberately treats non-seed text as a filled setup surface and cannot infer exports without adding a source analyzer. [Queue surface](/home/user/scaffold/tmp/cursor/absorb-rows.log:11) [Audit predicate](/home/user/scaffold/src/bin/CLI.ts:1304)

Middleware’s setup proof imports `setupServer` and uses real resources:

- `countActiveFileRequests`: hold a real file response open, observe the active request, release it, and observe the baseline.
- `detectClosedHandle`: inspect a real open handle, close it, and inspect it again.

The existing consuming test demonstrates the helpers’ intended seam. [Middleware helpers](/home/user/scaffold/tmp/cursor/absorb-rows.log:100)

Each target visit runs in this order:

- Re-pin and install published Scaffold `0.0.52`.
- Write the proof, or restore Queue’s empty seed.
- Adopt the planned `test:guides` script when required.
- Run `scaffold repair`; proof presence then bakes the setup factory, project, direct script, and `npm test` chain.
- Format, run the prescribed gates, compare `dist` and runtime dependencies with the registry artifact, and commit only that green repository.

The registration decision is computed from exact root `setup*.test.ts` presence. [Registration](/home/user/scaffold/tmp/cursor/absorb-rows.log:1)

Run repository writes serially. Independent audits and repository-scoped verification may overlap after their subjects are committed. [Writer law](/home/user/scaffold/.agents/orchestration.md:196)

### 6. Test guide fences

Proposal:

Use `TEST-GUIDES-BROWSER` and `TEST-GUIDES-NODE`.

`TEST-GUIDES-BROWSER` owns the `test` repository’s browser carrier files:

- `tests/src/browser/helpers.test.ts`: interface driving, field driving, theme tokens and colors, and cascade-rule lookup.
- `tests/src/browser/factories.test.ts`: fixture mounting, IndexedDB removal, and capture-portfolio placement.

Each carrier starts with the exact `guides/test.md → <section> → "<heading>"` marker line.

`TEST-GUIDES-NODE` depends on the browser unit. It owns `tests/guides.test.ts` and `guides/test.md`, executes the throw-capture claims, `retryUntil`, JSON copy, total guard, wire fixpoint, source inventory, scratch ownership, teardown hook, loopback request, host probe, and escaping-path refusal. It also changes `below` to `later`.

No server carrier is needed. The guides project runs in Node with the browser disabled, and the established rule sends only browser-dependent fences away from it. [Placement rule](/home/user/orkestrel/test/tests/guides.test.ts:160) [Residue inventory](/home/user/scaffold/tmp/cursor/absorb-rows.log:108)

The presence guard loads each exact browser carrier path and asserts every exact marker line assigned there. A missing file, renamed heading, moved carrier, or stale marker must fail. It must not use an aggregate tally.

The units are serial because they share a repository and the Node unit depends on the browser markers. This is tests and guide text only; Test does not bump.

### 7. Guides-cache ruling

Proposal:

Scaffold owns the canonical generated script. Its compiler already derives `test:guides` from the common Vitest command containing `--no-cache`; no Scaffold source edit is required. [Compiler](/home/user/scaffold/src/core/compilers.ts:306) [Guide script](/home/user/scaffold/src/core/compilers.ts:376)

Fleet repositories adopt that exact planned value during their Scaffold `0.0.52` visit. The local Vitest `4.1.11` command surface accepts `--no-cache`, so this is not a speculative option.

A script-only adoption does not meet the release-wave bump triggers. It lands on each target’s `main` branch now and reaches npm at that package’s next natural publish. Scaffold’s canonical value ships in `0.0.52`. [Current drift row](/home/user/scaffold/ROADMAP.md:19) [Bump triggers](/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md:30)

### 8. Release tail

Proposal:

Expected bump membership from measured HEAD:

- Scaffold `0.0.52`, already obliged.
- MCP `0.0.23`, because `dist/src` moves.
- Brief `0.0.6`, because `dist/src` moves.
- Probe `0.0.5`, because its runtime MCP pin moves.

HTML, Middleware, Process, Test, and setup/cache-only targets do not bump unless the required published-tarball comparison finds a material emitted difference or changed runtime dependency set. Tests and guides are absent from their `files` surfaces. [Published surfaces](/home/user/scaffold/tmp/units/cascade-map.md:14)

Wave order:

- Publish Scaffold outside the runtime layer graph.
- Re-pin Scaffold across the fleet, repair, gate, and commit each target.
- Regenerate the registry catalog. The checked-in catalog is stale for MCP. [Stale evidence](/home/user/scaffold/tmp/units/cascade-map.md:5)
- Prepare and publish the refreshed layer containing MCP; the measured graph places it at L3.
- Refresh registry evidence.
- Re-pin Probe to the registry-confirmed MCP release.
- Prepare the refreshed layer containing Brief and Probe; the measured graph places them at L4. Publish serially within the window.
- Confirm every uploaded version from the registry before closing its layer.

The registry reading, not the local manifests, decides final version numbers and layer labels. [Layer law](/home/user/scaffold/.agents/orchestration.md:815)

The user approval gates each login/upload window: Scaffold, MCP’s layer, then Brief and Probe’s layer. Preparation, gates, commits, and pushes finish before requesting approval. Publishing remains serial. [Approval law](/home/user/scaffold/.agents/orchestration.md:751)

### 9. Recorded, not rescoped

Proposal:

Record duplicated `isBrowserVuePath` helpers for the next cross-package matrix. The next campaign should evaluate extraction into `@orkestrel/test`, its published contract, and fleet adoption through `orkestrel-align-packages`.

The duplication is a real finding under the shared-test rule, but no current row owns a Test source expansion and fleet-wide helper migration. Folding it into setup-proof work would change that row’s exit criterion after the matrix was fixed. Current setup proofs may test the local helper until the owning extraction campaign replaces it. [Duplicate-helper rule](/home/user/scaffold/.claude/rules/tests.md:180) [No-rescope rule](/home/user/scaffold/.claude/rules/quality.md:22)

## Unit list

| Name | Subject | Owned repository | Dependency edges | Suggested role |
|---|---|---|---|---|
| `MCP-WRITES` | Stdio backpressure and transport-family send conformance | `mcp` | None | `implementer` |
| `BRIEF-MEMBERS` | Frozen member constant, consumers, type pin, guide parity | `brief` | None | `implementer` |
| `PROCESS-RACE` | Recorder-based spawn proof and placement ruling | `process` | None | `implementer` |
| `HTML-ENTITIES` | Independently minted membership digest and controls | `html` | None | `implementer` |
| `TEST-GUIDES-BROWSER` | Browser fence carriers and markers | `test` | None | `builder` |
| `TEST-GUIDES-NODE` | Node guide fences, presence guard, wording fix | `test` | `TEST-GUIDES-BROWSER` | `builder` |
| `SCAFFOLD-RELEASE` | Verify, bump, and publish pending tooling surface | `scaffold` | Pre-release audit, verifier, user approval | Orchestrator using publish workflow |
| `SETUP-PATH-{abort,emitter,template,timeout}` | Path-helper proofs, generated setup registration, Scaffold/cache adoption | Matching repository | `SCAFFOLD-RELEASE` | `builder`, as separate serialized units |
| `SETUP-DATA-pool` | Setup data invariants and registration | `pool` | `SCAFFOLD-RELEASE` | `builder` |
| `SETUP-BEHAVIOR-{agent,brief,budget,csv,form,html,interpret,markdown,msg,ndjson,program,qualifier,rater,reason,relation,sse,table,tool,workspace}` | Package-owned setup behavior, registration, Scaffold/cache adoption | Matching repository | `SCAFFOLD-RELEASE`; Brief after `BRIEF-MEMBERS`; HTML after `HTML-ENTITIES` | `implementer`, as separate serialized units |
| `SETUP-MIDDLEWARE` | Real request-tally and handle-lifecycle setup proof | `middleware` | `SCAFFOLD-RELEASE` | `implementer` |
| `QUEUE-SEED` | Restore empty structural setup seed; register no setup project | `queue` | `SCAFFOLD-RELEASE` | `builder` |
| `ADOPT-CACHE-{browser,console,contract,database,guide,indexeddb,mcp,ollama,router,sea,server,sqlite,terminal,toolbox,websocket,worker,workflow}` | Scaffold re-pin, planned guide script, repair, gates | Matching repository | `SCAFFOLD-RELEASE`; MCP after `MCP-WRITES` | `builder`, as separate serialized units |
| `ADOPT-PLANNED-{process,test}` | Scaffold re-pin and repair where guide script already matches | Matching repository | `SCAFFOLD-RELEASE`; Process after `PROCESS-RACE`; Test after `TEST-GUIDES-NODE` | `builder`, as separate serialized units |
| `AUDIT-SUBJECTIVE-<unit>` | Blind design-fit falsification | Subject repository, read-only | Corresponding implementation | `reviewer` |
| `AUDIT-OBJECTIVE-<unit>` | Blind correctness and constraint falsification | Subject repository, read-only | Corresponding implementation | `analyst` |
| `CHECK-<repository>` | Mechanical discovery, parity, deferral, and scope audit | Subject repository, read-only | Reconciled implementation | `checker` |
| `VERIFY-<repository>` | Prescribed gates and artifact evidence | Subject repository, read-only | Audit findings resolved | `verifier` |
| `RELEASE-MCP` | Bump, prepare, publish, registry confirmation | `mcp` | MCP implementation, adoption, audits, verifier, user approval | Orchestrator |
| `PROBE-REPIN` | Re-pin runtime MCP, rebuild, gate, bump | `probe` | `RELEASE-MCP`, `SCAFFOLD-RELEASE` | `builder` |
| `RELEASE-BRIEF` | Bump, prepare, publish, registry confirmation | `brief` | Brief implementation, setup, audits, verifier, prior layer confirmation | Orchestrator |
| `RELEASE-PROBE` | Publish runtime-dependent Probe | `probe` | `PROBE-REPIN`, audits, verifier, prior layer confirmation | Orchestrator |
| `CAMPAIGN-RECORD` | Integrate accepted ROADMAP dispositions and next-matrix record | `scaffold` | All rows accepted; releases or no-bump rulings confirmed | Orchestrator serial integration |

All writing units run serially. Blind audit lanes for a completed unit run in parallel with each other. Repository-scoped verification may overlap across clean repositories. Releases and shared-file integration remain serial.

## Acceptance

Each defect repair records the failing scoped command and result before implementation, then the same command green. Every instrument carries a failing mutation control. Every nontrivial unit receives blind subjective and objective audits, reconciliation, a mechanical check, and independent verification.

Each repository finishes:

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Setup targets additionally prove direct `test:setup` execution and its presence in `npm test`. Queue proves that no setup project or advisory remains. Guide carriers prove exact marker presence. Publishing packages pass `prepublishOnly`, built-entry and tarball inspection, registry comparison, and registry confirmation.

## Ranked risks

| Rank | Risk | Required control |
|---|---|---|
| Critical | MCP sibling transports continue resolving failed or unwritten sends, leaving one public interface with incompatible meanings. | Audit every implementation of `MCPClientTransportInterface`; exclude only the separately typed message-port carrier. |
| High | Stdio interleavings leave queued sends hung, reorder frames, leak listeners, or settle after closure. | Deterministic writable-stream recorder covering callback, drain, error, and close orderings. |
| High | The HTML digest is minted from the table it claims to validate. | Independent WHATWG snapshot derivation, recorded provenance, key and value mutation controls. |
| High | Fleet setup proofs become import-only tokens or duplicate production behavior. | Per-export behavior matrix and adversarial adequacy review before registration. |
| High | A stale registry catalog produces an invalid version or layer order. | Regenerate from registry immediately before every release layer. |
| High | Scaffold adoption rewrites a target after its local proof was accepted. | Publish Scaffold first; re-pin, repair, gate, and commit each target against the published package. |
| Medium | Process timing passes alone but fails under suite contention. | Size the shared `src:server` budget from the full contended run. |
| Medium | Browser marker text exists without executing the documented behavior. | Pair each marker with its direct behavioral carrier and a mutation control against the assertion. |
| Medium | Script-only adoption is described as already shipped. | Record “landed on main” separately from “included in a registry release.” |

## Exit criteria missed by the questions

- Replace the Probe mintty row with: “Retain as trigger-gated Windows work. Open only when a Windows bin-suite campaign runs without `/usr/bin/script`; Linux acceptance remains closed by the recorded no-skip run.” Probe’s MCP-driven release does not fire that host trigger. [ROADMAP](/home/user/scaffold/ROADMAP.md:57)
- Leave every Supervisor row untouched and explicitly excluded from campaign closure.
- Recompute the setup advisory population before dispatch. The absorption log is dated evidence, not a permanent membership list.
- Update guides, top-level exports, parity tests, and package contents for every moved public source symbol.
- Close each no-bump repository with published-artifact and runtime-dependency evidence, not a source-diff assertion.
- Run final discovery for `.skip`, `.todo`, conditional skips, unresolved setup advisories, cache drift, deferred ROADMAP language, and uncommitted target state.
- Mark ROADMAP rows closed only after their commits are on `main`, required releases are registry-confirmed, and no-bump rows carry their artifact ruling.