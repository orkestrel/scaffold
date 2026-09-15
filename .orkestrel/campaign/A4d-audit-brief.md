# Audit A4d — close the U4g round (`@orkestrel/mcp` browser face: the A4c fixes)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the chain, U4g included). Do not attempt a test
  run; name each unexecuted vector as `UNRESOLVED` with its exact command and read the
  Orchestrator's logs under Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4g carrier closed at the
  `file:line` the report names; the red and green readings; scope; the probe. Read the evidence
  under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt` suffixed where
  noted) and the mcp tree at `C:/Users/mikes/WebstormProjects/mcp`.

Perform the audit directly and spawn nothing. Assume the round left one defect and go looking for it.

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → U4c → U4d → U4f →
U4g. U4g's brief is `U4g-mcp-browser-fix-brief.md`; its report is `U4g-mcp-browser-report.md`. The
previous round: `A4c-audit-analyst.md` (`FAIL 1, 2, 9, 11`, unexecuted vectors),
`A4c-audit-checker.md` (`PASS`), and the Orchestrator's probe `P12-a4c-probe.md` (instrument
`P12-a4c-probe.test.ts.txt`, logs `P12-a4c-probe.log.txt`, `P12-a4c-probe-2b.log.txt`) which
reproduced claims 1, 2a, and 2b in real Chromium and found 2c and 2d holding.

## Review evidence

- `A4d-u4g-only.patch` — the U4g delta alone (the working tree against the U4f state); the
  audit's primary text. `A4c-u4f-only.patch` — the U4f delta, for context on what U4g amends.
  `A4d-diff.patch` — the whole chain against `b9ff0b9`.
- `U4g-mcp-gates-orchestrator.log.txt` and `U4g-mcp-gates-test-full.log.txt` — the Orchestrator's
  authoritative gates after U4g (`format:check`, `lint:check`, `check`, `build`, `test`) and the
  full `npm test` output.
- `collide3-mcp-after-u4g.txt` — the export-name collision probe (98 files, `collisions: none`).
- The U4g report carries the red and green readings per test (the unit retained no separate log
  files this round; the report's table is the record).

## Numbered falsifiable claims

1. **A stop from inside a `connect` listener leaves nothing admitted.** `#refuse`
   (`src/core/MCPClient.ts:546-567`) reads `#connected`, then exempts an in-flight attempt only
   when its generation matches the client's; `#loseTransport` and `#closeConnection` bump the
   generation. P12's vector is green in the browser pin (`factories.test.ts:1233`) and the core
   mirror drives transport loss (`MCPClient.test.ts:1704`). Falsify with a path that still admits a
   request after the transport is gone.
2. **A `disconnect()` issued inside a `connect` listener leaves nothing parked either.** The unit
   recorded that `#teardown` defers through `Promise.resolve().then`, so such a `disconnect` bumps
   no generation synchronously and the connection is open at that instant; a request issued right
   after it is sent on a live connection. Rule whether it then settles (the teardown's drain
   rejects it) or parks. `UNRESOLVED` with the exact command if it needs a run.
3. **A replaced subscription's events reach nothing**: `#follows(tools)` (`ModelContext.ts:213`)
   guards `#added`, `#removed`, and `#cleared` by manager identity; P12 2a is green. The unit
   flags that only `#added` is observable under the vector because `#release` is already
   manager-bound — rule whether the two unobservable guards are the one rule at every door
   (patterns) or dead code (derive state).
4. **A clear releases what it cleared**: `#cleared(tools, cleared)` maps the event payload to names
   and queues `#releaseEach`; `#releaseAll` is gone; P12 2b is green and the existing clear tests
   stay green. Falsify with a clear whose payload names a tool this handle registered under
   ANOTHER manager (identity must still protect it) or a name the manager re-added inside the clear
   that the release then drops.
5. **The queued-snapshot pin binds.** `a queued publication does not see a tool added after its
   call` (`ModelContext.test.ts:224`) fails against a run-time projection of a queued call
   (recorded: `promise rejected "MCPError: WebMCP requires a description…"`) and passes against
   the shipped implementation; the two restated snapshot tests pass against both.
6. **The skip prose is true**: the skip emits no `change`; the consumer compares the manager's
   `definitions()` with `adopt()`; `describeWebMCPTool` names the unprojectable tool
   (`guides/mcp.md:4079`, `src/browser/types.ts:479`).
7. **The generation exemption is exact.** Rule whether `inflight.generation === this.#generation`
   can admit a request from a superseded attempt that is still joinable, or refuse a request the
   current negotiation legitimately issues (discovery aside).
8. **Nothing re-implements an installed export** (probe clean; no new helper this round beyond
   `#follows` and `#releaseEach`, both private).
9. **Nothing else moved.** The U4g delta is the seven files the report names; no manifest, version,
   lockfile, `scaffold repair` file, `src/server/**`, `configs/**`, or `dist/**` path; no fixture
   or `tests/setupBrowser.ts` change.
10. **Would you ship it as mcp 0.0.31** for U4e (the server's `list_changed` producer over the
    same emitter) and U5b (distribution proof) to build on? Name what must change first if not.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:`, and ONE terminal
line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
