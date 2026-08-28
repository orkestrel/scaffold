The unit is blocked on a design decision outside my owned files. I completed the server half, which no resolution of that decision can invalidate, and stopped at the client half.

## Before

`npm run test:conformance` in `/home/user/fleet/mcp`, exit 1, `Tests 4 failed | 43 passed (47)`:

- `MCP server conformance > runs every 2026-07-28 server scenario against the recorded baseline`
- `MCP server conformance > reports the recorded total` — `expected [ 147, +0 ] to deeply equal [ 110, +0 ]`
- `MCP client conformance > records every non-auth client scenario the runner reports at this revision`
- `MCP client conformance > runs every non-auth 2026-07-28 client scenario against the recorded baseline`

## Classification

I read the runner's own output, not the diff: `conformance server --url <fixture> --spec-version 2026-07-28 --suite all` reports `Running all suite (40 scenarios)` and `Total: 147 passed, 0 failed`.

**Scenarios the runner added at this revision** — one, in client mode only: `json-schema-2020-12-preservation`. It reports `Passed: 2/3, 1 failed, 0 warnings`. See the deviation.

**Scenarios the runner removed** — none. The server listing carries the same names in the same order.

**Scenarios whose counts changed with `failed` still zero** — every server scenario except `server-stateless` (28), `server-sse-multiple-streams` (2), and `dns-rebinding-protection` (2) gained exactly one passing check, and the client scenario `tools_call` went 1 → 2. The gained check is the runner's new `wire-schema-valid` / `WireSchemaValid`: "Every JSON-RPC message the implementation sent is valid per the spec JSON schema for the negotiated spec version". Its emitter returns an empty check list when it observed no message (`if(n===0&&t.length===0)return[]` in `node_modules/@modelcontextprotocol/conformance/dist/index.js`), which is why the three raw-HTTP scenarios carry none. The other recorded client rows (`request-metadata` 8, `sep-2322-client-request-state` 5, `http-standard-headers` 3, `http-custom-headers` 18, `http-invalid-tool-headers` 11, `json-schema-ref-no-deref` 1) are unchanged.

**Scenarios whose `failed` rose above zero** — none. Every previously recorded row still reports `0 failed`.

## Changes

`/home/user/fleet/mcp/tests/conformance.test.ts` only:

- Re-recorded every `EXPECTED` row's `passed` against the alpha.11 run, and the recorded total from `[110, 0]` to `[147, 0]`.
- Replaced the header paragraph about a `0 passed, 0 failed` row (no such row remains) with one stating the SHOULD/WARNING tally rule, and added a paragraph naming `wire-schema-valid`, why it appears on nearly every row, and which rows carry none. This keeps the per-row enumerations honest: `http-custom-header-server-validation` enumerates checks summing to 9 and now records 10.
- Rewrote the two "Passes at 0/0" comments to "Passes at 1/0", keeping their SHOULD explanation and naming the wire-schema check as the recorded pass. I verified both scenarios directly: each reports its SEP-2322 check `WARNING` and `wire-schema-valid` `SUCCESS`, `Passed: 1/1, 0 failed, 1 warnings`.
- Every other explanatory comment is unchanged and still attached to its row.

`/home/user/fleet/mcp/tests/setupConformance.ts` is **untouched**. `CONFORMANCE_CLIENT_SCENARIOS` still records the seven pre-existing scenarios.

Probe files under `/home/user/fleet/mcp/tmp/probe/` ran the runner directly through the `probe` Vitest project and were deleted; `tmp/` is empty. The probe carried a negative control — a scenario name the runner does not carry produced `Unknown scenario` and no result line, so `parseConformanceOutcome` returned `undefined`.

## After

1. `npm run test:conformance` — **exit 1**, `Tests 2 failed | 45 passed (47)`. Both server failures are closed. The two remaining are `records every non-auth client scenario the runner reports at this revision` and `runs every non-auth 2026-07-28 client scenario against the recorded baseline`. Criterion 1 is **not met**.
2. `npm run format:check` — exit 0, `All matched files use the correct format. Finished in 3151ms on 128 files using 4 threads.`
3. `npm run lint:check` — exit 0, no output.
4. `npm run check` — exit 0, through `check:src:core`, `check:src:browser`, and `check:src:server`.
5. `git status --porcelain` — `M package-lock.json`, `M package.json`, `M tests/conformance.test.ts`. Only owned and expected files; `tests/setupConformance.ts` is unmodified because the client half is blocked.

## Deviation

**Expected.** The client half re-records as the server half did: add the runner's new non-auth scenario to `CONFORMANCE_CLIENT_SCENARIOS` and record its row in `EXPECTED_CLIENT`.

**Found.** `json-schema-2020-12-preservation` fails on the FIXTURE, not the library, and the file that would close it is off-limits. The runner's exact output:

```
Checks:
[json-schema-2020-12-client-tool-found                    ] SUCCESS Client called tools/list and the mock server advertised 'json_schema_2020_12_tool'
[json-schema-2020-12-client-echo-completed                ] FAILURE Client called tools/call 'json_schema_echo' with a 'schema' object argument
[json-schema-2020-12-client-$schema-preserved             ] SKIPPED Client preserved the $schema field of the focal tool inputSchema
[json-schema-2020-12-client-$defs-preserved               ] SKIPPED Client preserved the $defs field of the focal tool inputSchema
[json-schema-2020-12-client-additionalProperties-preserved] SKIPPED Client preserved the additionalProperties field of the focal tool inputSchema
[sep-2106-client-composition-keywords-preserved           ] SKIPPED Client preserved composition keywords (allOf/anyOf) on the focal tool inputSchema
[sep-2106-client-conditional-keywords-preserved           ] SKIPPED Client preserved conditional keywords (if/then/else) on the focal tool inputSchema
[sep-2106-client-anchor-keyword-preserved                 ] SKIPPED Client preserved the $anchor keyword inside $defs.address
[wire-schema-valid                                        ] SUCCESS Every JSON-RPC message the implementation sent is valid per the spec JSON schema for the negotiated spec version

Test Results:
Passed: 2/3, 1 failed, 0 warnings

Failed Checks:
  - JsonSchema2020_12ClientEchoCompleted: Client called tools/call 'json_schema_echo' with a 'schema' object argument
    Error: Client did not echo back the inputSchema; downstream preservation checks are SKIPPED
```

The scenario requires the client under test to round-trip the focal tool's `inputSchema` verbatim as the `schema` argument of `json_schema_echo`. The runner's own scenario source states it: `Round-trip the focal tool's \`inputSchema\` back via \`tools/call\` on \`json_schema_echo\`, passing it verbatim as the \`schema\` argument`. `/home/user/fleet/mcp/tests/conformanceClient.ts` builds each call's arguments with `buildSchemaRecord`, whose documented behaviour is that "a `$ref`, a nested object, and any other leaf this driver cannot supply is omitted rather than guessed" — so it calls `json_schema_echo` with `{}`.

The driver *could* answer: `client.tools()` returns `ToolInterface` values whose `parameters` is the received `inputSchema`, which is what the driver already reads to build arguments.

**Why I did not absorb it.** Recording it at `passed: 2, failed: 1` would contradict the baseline's own stated design, which the objective forbids weakening: "a row with a nonzero `failed` is a named LIBRARY gap this suite carries on purpose... Every row a fixture could answer has been answered, so a new nonzero row is a regression rather than an unfinished host." This is an unfinished host. Worse, absorbing it makes the state permanent: the six preservation checks are SKIPPED only because the echo never happened, so whether this package's client actually preserves `$schema`, `$defs`, `additionalProperties`, `allOf`/`anyOf`, `if`/`then`/`else`, and `$anchor` is currently unmeasured. A red baseline row would hide that question rather than record it.

Excluding the scenario is the other absorb, and it is worse: the exclusion rule is `auth/`-only by design, and the honesty test filters on exactly that prefix.

**Done vs not done.** Done: the whole server baseline, verified green, with gates 2–4 green. Not done: `CONFORMANCE_CLIENT_SCENARIOS` and `EXPECTED_CLIENT`, and therefore criterion 1.

**Hypothesis.** Teaching `/home/user/fleet/mcp/tests/conformanceClient.ts` to fill an object-typed argument property with the listed tool schema it holds closes the echo check and lets the six preservation checks report for the first time; those checks may then expose a real client gap, so the client baseline has to be re-measured after that edit rather than before. That file is outside my owned set, and a driver change can move the other client rows too, which is why I left `tests/setupConformance.ts` and `EXPECTED_CLIENT` untouched instead of recording numbers a successor unit would have to redo.

**Measurements for the successor brief.** Runner client listing at `2026-07-28`, non-auth, in runner order: `tools_call`, `request-metadata`, `sep-2322-client-request-state`, `http-standard-headers`, `http-custom-headers`, `http-invalid-tool-headers`, `json-schema-ref-no-deref`, `json-schema-2020-12-preservation`. Outcomes under the current driver: `tools_call` 2/0/0, `request-metadata` 8/0/0, `sep-2322-client-request-state` 5/0/0, `http-standard-headers` 3/0/0, `http-custom-headers` 18/0/0, `http-invalid-tool-headers` 11/0/0, `json-schema-ref-no-deref` 1/0/0, `json-schema-2020-12-preservation` 2/1/0.