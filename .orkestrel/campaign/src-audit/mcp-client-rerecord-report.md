Unit complete. `npm run test:conformance` is green with the preservation scenario recorded.

## Touched files

- `/home/user/fleet/mcp/tests/conformanceClient.ts` — added `readReceivedSchema` and `buildCallArguments`, routed tool-call argument building through them, amended the header's no-scenario-knowledge paragraph.
- `/home/user/fleet/mcp/tests/setupConformance.ts` — added `json-schema-2020-12-preservation` to `CONFORMANCE_CLIENT_SCENARIOS` in runner order.
- `/home/user/fleet/mcp/tests/conformance.test.ts` — moved the `tools_call` row, added the preservation row, added the client block's `wire-schema-valid` paragraph.

Diffstat (my edits; `tests/conformance.test.ts` also carries the predecessor's uncommitted server half):

```
 tests/conformanceClient.ts | 57 ++++++++++++++++++++++++++++++++++++++++++++--
 tests/setupConformance.ts  |  1 +
 tests/conformance.test.ts  | 113 ++++++++++++++++++++++++++--------------- (69 ins / 44 del, server half included)
```

## Failing proof before the fix

Command: `node <runner> client --command "node --experimental-strip-types tests/conformanceClient.ts" --scenario json-schema-2020-12-preservation --spec-version 2026-07-28`

Before: `Passed: 2/3, 1 failed, 0 warnings`. The failure was `JsonSchema2020_12ClientEchoCompleted` — "Client did not echo back the inputSchema; downstream preservation checks are SKIPPED", with `$schema`, `$defs`, `additionalProperties`, composition, conditional, and `$anchor` all SKIPPED.

After: `Passed: 9/9, 0 failed, 0 warnings`, every one of those checks SUCCESS.

## Measured per-scenario outcomes after the driver change

Every non-auth client scenario, re-measured in runner order with the real runner at `0.2.0-alpha.11` (2026-08-28), passed/failed/warnings:

| Scenario | Before change | After change |
| --- | --- | --- |
| `tools_call` | 2/0/0 | 2/0/0 |
| `request-metadata` | 8/0/0 | 8/0/0 |
| `sep-2322-client-request-state` | 5/0/0 | 5/0/0 |
| `http-standard-headers` | 3/0/0 | 3/0/0 |
| `http-custom-headers` | 18/0/0 | 18/0/0 |
| `http-invalid-tool-headers` | 11/0/0 | 11/0/0 |
| `json-schema-ref-no-deref` | 1/0/0 | 1/0/0 |
| `json-schema-2020-12-preservation` | 2/1/0 | 9/0/0 |

The driver change moved exactly one scenario. The full sweep runs in 7.4 s, so the block's existing 120 s budget stands unchanged.

## Driver edit

`buildSchemaRecord` and `readSchemaValue` are untouched, so the elicitation path and its documented omit-rather-than-guess behavior are unchanged. Two module-scope helpers were added and the tool-call argument build routed through them:

```ts
function readReceivedSchema(
	tools: readonly ToolInterface[],
	name: string,
): Readonly<Record<string, unknown>> | undefined {
	return tools.find((tool) => tool.name !== name)?.parameters
}

function buildCallArguments(schema: unknown, received: unknown): Record<string, unknown> {
	const record: Record<string, unknown> = buildSchemaRecord(schema)
	const properties = isRecord(schema) ? schema['properties'] : undefined
	if (received === undefined || !isRecord(properties)) return record
	for (const [key, leaf] of Object.entries(properties)) {
		if (!isRecord(leaf) || leaf['type'] !== 'object' || isRecord(leaf['properties'])) continue
		record[key] = received
	}
	return record
}
```

Three decisions worth naming, all recorded in the file's TSDoc:

- The fill is gated on a **free-form** object leaf — typed `object` and declaring no `properties` of its own. An object leaf that declares its own shape stays omitted, because a record the driver did not compose from that leaf would contradict the shape the leaf declares. That keeps omit-rather-than-guess honest.
- The value is peer data, never invented: another listed tool's received `inputSchema`. The tool being called is skipped, so the driver never hands a peer back the schema it just sent under that same name.
- The argument builder returns `Record<string, unknown>` while `buildSchemaRecord` keeps returning `Record<string, MCPElicitValue>`. `MCPElicitValue` is `string | number | boolean | readonly string[]`, so a schema object cannot reach an elicitation `content` answer through this change.

The separate `@orkestrel/tool` type import is a declared runtime dependency of the package; no dependency was added.

## `EXPECTED_CLIENT` rows that moved

- **`tools_call` 1 → 2 passed.** Not caused by the driver: the pre-change re-measurement already read 2/0/0. The row now tallies the scenario's own `tool-add-numbers` check beside the runner's `wire-schema-valid` check. At `0.2.0-alpha.10` it tallied `tool-add-numbers` alone. The runner's README states `wire-schema-valid` is emitted only for a scenario that exchanges instrumented wire traffic, which is why the raw-HTTP client rows carry none and did not move.
- **`json-schema-2020-12-preservation` added at 9/0/0.** New row, per-row comment names each check it tallies and states that the SEP-2106 rows report at MUST level rather than SKIPPED at this revision.
- A paragraph was added above `EXPECTED_CLIENT` explaining `wire-schema-valid` in client mode, mirroring the server baseline's own paragraph, so the two moved rows are readable without repeating the explanation per row.

Every other row is unchanged.

## Library gap recorded

**None.** All nine preservation checks pass, so `createMCPClient` preserves `$schema`, `$defs`, `additionalProperties`, `allOf`/`anyOf`, `if`/`then`/`else`, and `$anchor` verbatim through `ToolInterface.parameters`. No row carries a nonzero `failed`, so `EXPECTED_CLIENT_RED` stays empty. The predecessor's open question — whether the client preserves those keywords — is now measured rather than skipped.

## Gate results

| Gate | Exit code | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (128 files) |
| `npm run lint:check` | 0 | Clean |
| `npm run check` | 0 | Root plus core, browser, server projects clean |
| `npm run test:conformance` | 0 | 1 file, 47 tests passed |
| `npm test` | 0 | 42 files, 1774 passed, 1 skipped across every project |

Observation, not a criterion: `npm test` ran inside this unit's own exec, so its timing readings are pessimistic. The authoritative tree-wide run belongs to an independent `verifier`.

## Acceptance criteria

1. `npm run test:conformance` exits 0 — met.
2. `format:check`, `lint:check`, `check` exit 0 — met.
3. `git -C /home/user/fleet/mcp status --porcelain`:

```
 M package-lock.json
 M package.json
 M tests/conformance.test.ts
 M tests/conformanceClient.ts
 M tests/setupConformance.ts
```

Only the owned files plus the pre-existing `package.json`, `package-lock.json`, and `tests/conformance.test.ts` modifications. The server half in `tests/conformance.test.ts` was left intact; `package.json` and `package-lock.json` were not touched.

4. `tmp/` is empty — the three probe scripts written there were deleted.

## Deviation state

No deviation. The echo armed without guessing, and no re-measured row contradicted the baseline design.