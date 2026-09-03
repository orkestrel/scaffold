1. CONFIRMED — Current carriers exist for all applied rows: `src/server/helpers.ts:91-239`, `tests/setupServer.ts:70-183`, `tests/guides.test.ts:195-261`, and `src/server/types.ts:167-171`. The deleted validator files are absent. No fleet row requires application.

2. not held

3. CONFIRMED — Word-boundary and case-insensitive inflection sweeps for all removed names returned no matches across `src/**/*.ts`, `tests/**/*.ts`, `guides/websocket.md`, `guides/README.md`, and `README.md`, excluding `node_modules`. The recorded sweep names this population at `conform-websocket-report.md:112-128`.

4. not held

5. CONFIRMED — Source exports at `src/server/index.ts:1-7` match the documented surface at `guides/websocket.md:34-107`; method signatures match at `guides/websocket.md:119-122` and `src/server/types.ts:167-173`. Published fence imports and executable transcriptions are present at `guides/websocket.md:11-234` and `tests/guides.test.ts:195-261`. `AGENTS §` has no matches in the package-owned population.

6. not held

7. CONFIRMED — `git diff HEAD --name-status` contains only Owned paths. `package-lock.json`, `node_modules`, and off-limits paths are absent. The barrel at `src/server/index.ts:1-7` contains no compatibility alias, selective re-export, or shim.

8. not held

9. CONFIRMED — Added-line sweeps for `TODO`, deferred work, debug residue, and commented executable statements returned no matches. The changed-path inventory matches the report’s Files touched table. No hidden placeholder appears in the current package-owned tree.

## Findings outside the claims

- F1: `tests/src/server/NodeWebSocket.test.ts:1457` uses banned prose `should`. Replace it with `can`.
- F2: `src/server/NodeWebSocket.ts:274` uses `currently`. Delete it: “Decode every complete frame in the buffer.”
- F3: `tests/src/server/parsers.test.ts:296,302` use `now`. Remove it from both comments.
- F4: `tests/src/server/NodeWebSocket.test.ts:227,530` use prose `now` and `new`. Replace them with `closed` and `additional`.

## Referrals

- Orchestrator: will you re-vendor `/home/user/fleet/mcp/guides/websocket.md` and `/home/user/fleet/browser/guides/websocket.md` after publication? Those mirrors retain the old constants, old canonical-parser name, and un-narrowed header at their cited lines.
- Orchestrator: will you update the fleet guide-test template or sibling copies? The sweep finds stale `constants below` and `second assertion below` wording in sibling `tests/guides.test.ts` files.

VERDICT: PASS

## Journal

Leave for the driver.

## Deviation

None. All named evidence and proof files were readable.