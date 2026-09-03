1. CONFIRMED — Applied carriers appear at `src/core/constants.ts:175`, `src/core/MCPServer.ts:225-324`, `src/core/transports/HTTPClientTransport.ts:157-218`, `src/server/types.ts:171-210`, `src/server/middlewares.ts:96-185`, and `tests/src/browser/transports/MessagePortTransport.test.ts:1-109`. The `isBrowserVuePath` sweep is empty, and no fleet-F2 candidate exists; `MCPSession` already uses private `#id` at `src/server/MCPSession.ts:62-79`.

2. not held

3. REFUTED — Exact old-symbol and property-form sweeps are empty, but the writer’s recorded evidence does not satisfy the required inflection sweep. The report records only `grep -rn "\bdefer\b"` and classifies `listen` hits, without a case-insensitive `-s`, `-ed`, `-ing` sweep for those names; its predicate sweep uses `…` instead of a concrete pattern (`conform-mcp-report.md:107-109,150-151`). The broad tree sweep also has legitimate hits at `src/core/MCPServer.ts:833` and `src/core/types.ts:2347`, so it is not empty.

4. not held

5. CONFIRMED — Renamed and moved symbols are documented in `guides/mcp.md:2189,2248,2265,2394,2432,2453,2733-2734,3433-3440,3677-3682`. The guide map remains aligned at `guides/README.md:1-17`; the corrected fence uses published imports at `guides/mcp.md:1866-1872`; and its transcription asserts the outcome at `tests/guides.test.ts:1463-1487`. The `AGENTS\s*§` sweep over touched source, tests, guides, README, and manifest returned no matches.

6. not held

7. CONFIRMED — `/home/user/work/evidence/conform-mcp.status:1-30` lists only owned paths. The exact old published names and option-property forms returned no matches across `src`, `tests`, `guides/mcp.md`, `guides/README.md`, and `README.md`. The environment barrels remain star-export-only (`src/browser/index.ts:1-5`; `src/server/index.ts:1-14`), with no compatibility alias or re-export.

8. not held

9. CONFIRMED — The additions sweep over `/home/user/work/evidence/conform-mcp.diff` found no added `TODO`, debug statement, `.skip`, `.only`, `.todo`, or retry/timeout marker. The report disposition table (`conform-mcp-report.md:20-36`) matches the repaired carriers and the two recorded no-op rows.

Findings outside the claims

- F-1 — `tests/setup.ts:1217` and `tests/src/core/MCPServer.test.ts:5239` contain banned expectation-sense `should`. Replace them with `must`: “a client must ask again” and “the paragraph must be deleted.”
- F-2 — Predicate behavior is tested in `tests/src/core/validators.test.ts:764-769,1179,1906-1925`, while the implementations are helpers at `src/core/helpers.ts:101-203`. Move those predicate cases to `tests/src/core/helpers.test.ts` and remove them from the validator mirror.

Referrals

- The report’s broad `defer` sweep records legitimate private-method and prose hits, while the required inflection sweep is absent (`conform-mcp-report.md:150-151`). Orchestrator: decide whether semantic option-key sweeps satisfy claim 3 or require explicit reruns for every named path and inflection.

VERDICT: FAIL 3; outside the claims: F-1, F-2

Journal

Left for the driver.

Deviation

No tree change detected. No named file was unreadable.