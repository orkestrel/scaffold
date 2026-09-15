<!-- A4d — checker (Sonnet, native), mechanical lane over A4d-u4g-only.patch.txt and the U4g report. Retained from the completion notification, 2026-09-15 (93 s, 24 tool uses). -->

CHECKER — mechanical lane.

1. **CONFIRMED.** `src/core/MCPClient.ts:567-574` (`#refuse`): checks `#connected`, then exempts only `inflight.generation === this.#generation`. `#loseTransport` (`:1117-1119`) and `#closeConnection` (`:989-990`) each `this.#generation += 1`. Green tests at the report's named locations: `tests/src/browser/factories.test.ts:1233` and `tests/src/core/MCPClient.test.ts:1704`, both present verbatim.

2. **UNRESOLVED.** `#teardown` (`MCPClient.ts:971-979`) defers through `Promise.resolve().then(() => this.#closeConnection())`, confirming the report's claim that `disconnect()` inside a `connect` listener does not bump the generation synchronously. Whether the connection then settles or parks requires an executed run this lane cannot perform (Read/Grep/Glob only); no such vector exists in the diff's test additions.

3. **CONFIRMED** for the mechanical guard; **UNRESOLVED** for the embedded design question. `#follows` (`ModelContext.ts:206-215`) is read by `#added:226`, `#removed:238`, `#cleared:251`. Whether applying the identical guard at doors where the downstream `#release` is already manager-bound is "one rule at every door" versus "dead code" is a design judgment this lane does not rule on.

4. **CONFIRMED.** `#cleared(tools, cleared)` at `ModelContext.ts:250-256` maps the event payload to names and queues `#releaseEach` (`:314-316`). `grep` for `releaseAll` in the file returns no matches — the method is gone, matching the report.

5. **CONFIRMED.** Test `a queued publication does not see a tool added after its call` exists verbatim at `tests/src/browser/ModelContext.test.ts:224`.

6. **CONFIRMED.** `guides/mcp.md:4079-4082` states the skip emits no `change`, naming `definitions()`, `adopt()`, and `describeWebMCPTool`; `src/browser/types.ts:479` carries the matching TSDoc sentence.

7. **UNRESOLVED.** This is a design-judgment question ("rule whether … can admit … or refuse …") outside mechanical evidence; the objective/subjective lanes must rule it.

8. **CONFIRMED.** `.orkestrel/campaign/collide3-mcp-after-u4g.txt` reports 98 files swept, `collisions: none`. `#follows` and `#releaseEach` are both `#`-prefixed private methods (`ModelContext.ts:213`, `:314`).

9. **CONFIRMED.** `A4d-u4g-only.patch.txt` touches exactly `guides/mcp.md`, `src/browser/ModelContext.ts`, `src/browser/types.ts`, `src/core/MCPClient.ts`, `tests/src/browser/ModelContext.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/core/MCPClient.test.ts` — the same seven the report's table names, no more, no fewer. No manifest, lockfile, `src/server/**`, `configs/**`, `dist/**`, or fixture path appears.

10. **NOT-EVIDENCED.** "Would you ship it" is a product/subjective judgment outside mechanical evidence; this lane returns no verdict on it.

outside: `U4g-mcp-gates-orchestrator.log.txt` and `U4g-mcp-gates-test-full.log.txt` both show every gate and every suite exit 0 with zero failures (`format:check`, `lint:check`, `check`, `build`, `test` — including the full 1456-test aggregate run). No mechanical scope, gate, or parity defect found beyond claims 2, 3 (sub-question), 7, and 10, which this lane cannot decide without an execution or a design ruling.

VERDICT: FAIL 2, 7, 10
