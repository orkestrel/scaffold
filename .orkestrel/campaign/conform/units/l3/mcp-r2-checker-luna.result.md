1. CONFIRMED — Tree evidence covers every disposition: `src/core/constants.ts:175`, `package.json:93`, `src/core/MCPServer.ts:225-324`, `src/core/transports/HTTPClientTransport.ts:157-218`, `tests/src/browser/transports/MessagePortTransport.test.ts:1`, `src/server/middlewares.ts:97-186`, `src/server/MCPSession.ts:68-99`, `src/core/helpers.ts:101,203`, `guides/mcp.md:1913-1914`, `src/core/types.ts:850,1066,1189,1465,1703`, and `tests/setupConformance.ts:746`. `isBrowserVuePath` is absent, browser files exist, and no implementation class has a public `readonly id` field.

2. not held

3. CONFIRMED — The case-insensitive inflection sweep `(?i)\b(isFormElicitationSupport(s|ed|ing)?|isTaskSupport(s|ed|ing)?|MCPCompletionManagerInterface(s|ed|ing)?)\b` over `src`, `tests`, `guides/mcp.md`, `guides/README.md`, and `README.md` is empty. The option-key sweep found only legitimate transport and local bindings at `src/core/types.ts:2347` and `tests/src/core/MCPServer.test.ts:3220,4924`. Capacity hits are nested or client-queue cases at `src/server/MCPSession.ts:66`, `tests/src/server/middlewares.test.ts:631`, `tests/guides.test.ts:1196,1327`, and related client sites. The WebSocket declaration occurs only at `src/core/constants.ts:175`.

4. not held

5. CONFIRMED — Guide parity contains the moved constant at `guides/mcp.md:2189`, renamed interfaces and option shapes at `:570,2394,2734,3433,3677`, and the corrected fence at `:1913-1914`. Its transcription runs from `tests/guides.test.ts:1477-1488`. `guides/README.md:5-16` retains the MCP mappings. The sweep `AGENTS\s*§|CLAUDE\s*§` over touched source, tests, guides, and `README.md` is empty.

6. not held

7. CONFIRMED — Off-limits path sweeps over `/home/user/work/evidence/conform-mcp.diff` are empty, while its diff headers list only owned paths. `/home/user/work/evidence/conform-mcp.status:1-30` lists only owned changes. Added-line sweeps find no compatibility alias, old-name export, re-export, or shim.

8. not held — The independent landing gate is outside this read-only lane: its reading is `NOT-EVIDENCED` here; landing settles it.

9. CONFIRMED — Added-line sweeps over the actual diff for `TODO|FIXME|debugger|console.(log|debug|trace)|.skip|.only|.todo`, commented-out code, and `timeout|retry|retries` are empty. The report’s file table at `conform-mcp-report.md:180-218` matches the diff’s path headers. The corrected prose is present at `tests/setupConformance.ts:746` and `src/core/helpers.ts:1619`.

Findings outside the claims

none

Referrals

none

VERDICT: PASS

Journal

Left for the driver.

Deviation

none