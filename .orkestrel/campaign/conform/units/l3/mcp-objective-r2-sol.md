## Per-claim verdicts

1. **CONFIRMED.** Every brief row appears in the disposition table at `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md:20-36`; fleet noops are substantiated at `:173-179`. The addendum edit is present at `tests/guides.test.ts:646`.

2. **CONFIRMED.** The operative repairs are present: `src/core/constants.ts:175`, `package.json:93`, `src/core/MCPServer.ts:202-324`, `src/core/transports/HTTPClientTransport.ts:135-218`, `tests/src/browser/transports/MessagePortTransport.test.ts:1-109`, `src/server/types.ts:171-210`, `src/server/middlewares.ts:94-187`, `src/core/helpers.ts:101,203`, `guides/mcp.md:1913-1914`, `src/core/types.ts:850,1066,1465,1189,1703`, and `tests/setupConformance.ts:746`.

3. **CONFIRMED.** Case-insensitive sweep `\b(isFormElicitationSupport(s|ed|ing)?|isTaskSupport(s|ed|ing)?|MCPCompletionManagerInterface(s|ed|ing)?)\b|\b(defer|listen)\??\s*:` across `src/**`, non-vendored `tests/**`, `guides/mcp.md`, `guides/README.md`, and `README.md` found only the permitted transport method at `src/core/types.ts:2347` and local request binding at `tests/src/core/MCPServer.test.ts:3220`. Removed signature and qualified-capacity sweeps found no old middleware or session form. The report records the pattern and paths at `conform-mcp-report.md:317-324`.

4. **REFUTED.** The `mcp-subj-2` control is not a valid failing-first proof. The scoped command reports `Tests 1 failed | 33 passed (34)`, but it also times out in teardown at `/home/user/work/evidence/mcp-proofs/mcp-subj-2-control-red.txt:20-38`. This violates `/home/user/scaffold/.claude/rules/tests.md:40-42`: a control that breaks beyond the named test does not establish its count. At `tests/src/server/middlewares.test.ts:674-678`, trigger a fresh push after opening the resumed stream and assert whether the received event retains `seen[1]?.id`; this makes the control fail by assertion instead of hanging, then rerun red and green.

5. **CONFIRMED.** Method parity matches at `src/core/types.ts:2258-2312` and `guides/mcp.md:3222-3223`, `src/core/types.ts:2438-2488` and `guides/mcp.md:3561-3563`, `src/server/types.ts:238-242` and `guides/mcp.md:3679-3682`, and `src/core/types.ts:1465-1477` and `guides/mcp.md:3433-3440`. Published-specifier fences appear at `guides/mcp.md:1868-1875`. Sweep `AGENTS(?:\.md)?\s*§` across touched source, non-vendored tests, `guides/mcp.md`, and `README.md` found no match.

6. **CONFIRMED.** Breaking changes and consumer edits are recorded at `conform-mcp-report.md:241-253`. The fleet consumer imports only unaffected MCP symbols at `/home/user/fleet/probe/src/server/ProbeServer.ts:2-8`; its source contains no removed name.

7. **CONFIRMED.** `/home/user/work/evidence/conform-mcp.status:1-31` names only Owned paths. It contains no lockfile, dependency installation, vendored file, or off-limits path. Old-name sweeps found no compatibility alias, re-export, or shim.

8. **CONFIRMED for the auditable conjunct; independent gates: NOT-EVIDENCED.** Added-line sweep `\.skip\(|\.only\(|\.todo\(|retry|timeout` over `/home/user/work/evidence/conform-mcp.diff` found no match. The report names each required command and exit at `conform-mcp-report.md:221-229`. The Orchestrator’s landing run remains R1.

9. **CONFIRMED.** Added-line sweep `TODO|FIXME|debugger|console\.|commented[- ]out|deferred row` over `/home/user/work/evidence/conform-mcp.diff` found no match. The disposition table agrees with the diff and status.

## Findings outside the claims

O1. `tests/guides.test.ts:1432-1460` adds a local fixture factory that duplicates the exported `createMemoryTransport` fixture at `tests/setup.ts:603-659`. This conflicts with `/home/user/scaffold/.claude/rules/tests.md:180-186`, and `tests/guides.test.ts:1432` also states the prohibited growable count “two members.” Import `createMemoryTransport`, use it at `tests/guides.test.ts:1464-1465`, and remove the local interface and factory.

## Referrals to the Orchestrator

R1. Does the landing run of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test` exit 0?

FAIL 4