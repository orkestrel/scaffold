1. CONFIRMED — The current tree shows dispositions for every unit row: `src/core/constants.ts:175`, `package.json:93`, `src/core/MCPServer.ts:211-324`, `src/core/transports/HTTPClientTransport.ts:142-218`, `tests/src/browser/transports/MessagePortTransport.test.ts:1-108`, `src/server/types.ts:151-215`, `tests/src/core/helpers.test.ts:118-204`, `tests/guides.test.ts:1438-1462`, and the named type/prose repairs. The F1/F2 noop conditions are independently supported by clean helper and implementation-id sweeps.

2. not held

3. CONFIRMED — The case-insensitive inflection sweep for `isFormElicitationSupported`, `isTaskSupported`, and `MCPCompletionManagerInterface` over `src`, `tests`, `guides/mcp.md`, `guides/README.md`, and `README.md` returned no matches. The moved-constant declaration/link sweep also returned no matches in the browser or server faces. The option-key sweep found only legitimate locals and the transport method at `src/core/MCPServer.ts:840`, `src/core/types.ts:2347`, and `tests/src/core/MCPServer.test.ts:3220,4924`; no old option key remains.

4. not held

5. CONFIRMED — `guides/mcp.md:3433-3440` documents `MCPCompletionInterface.complete`, and `:3670-3682` matches `MCPSessionInterface`. Grouped session options appear at `:2729-2738`. Published-specifier fences appear at `:1865-1874` and `:3476-3480`. `tests/guides.test.ts:590-680` checks parity, and `:1438-1462` executes the corrected outcome fence. The `AGENTS §` sweep over touched source, tests, guides, and README files returned no matches.

6. not held

7. CONFIRMED — `/home/user/work/evidence/conform-mcp.status:1-31` lists only Owned paths. The diff-header sweep over `/home/user/work/evidence/conform-mcp.diff` found no `package-lock.json`, `node_modules/`, or off-limits path. The added-line compatibility sweep for aliases, shims, and re-exports returned no matches. Face barrels remain ordinary star-export barrels at `src/browser/index.ts:1-5` and `src/server/index.ts:1-14`.

8. not held

9. CONFIRMED — Added-line sweeps over `/home/user/work/evidence/conform-mcp.diff` found no `TODO`, `FIXME`, debugger, console debug call, `.skip`, `.only`, `.todo`, retry, timeout, or commented-out-code pattern. Added `deferred` occurrences are live domain bindings, not deferred rows. The report disposition table at `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md:18-37` aligns with the diff headers, and the current tree has no `isBrowserVuePath` residue.

Findings outside the claims

none

Referrals

none

VERDICT: PASS

Journal

left for the driver.

Deviation

none