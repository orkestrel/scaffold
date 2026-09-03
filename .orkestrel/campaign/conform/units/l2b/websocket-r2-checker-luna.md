1. CONFIRMED — Current tree anchors every row’s carrier: `src/server/helpers.ts:70-239`, `tests/setup.ts:45-103`, `tests/setupServer.ts:67-222`, `tests/guides.test.ts:180-262`, `guides/websocket.md:9-261`, and `src/server/constants.ts:53-80`. Both validator files are absent. Fleet-F1 and fleet-F2 sweeps found no matching helper or public `id` field. Status evidence lists only Owned paths: `/home/user/work/evidence/conform-websocket.status:1-24`.

2. not held

3. CONFIRMED — Word-boundary sweeps for `parseWebSocketCanonical`, `WEBSOCKET_CONTROL_MAXLEN`, `WEBSOCKET_CLOSE_REASON_MAXLEN`, and `WEBSOCKET_CLOSE_TOOBIG` returned no matches across `src/**/*.ts`, `tests/**/*.ts`, `guides/websocket.md`, `guides/README.md`, and `README.md`. Case-insensitive sweeps over each name and its `-s`, `-ed`, and `-ing` forms also returned no matches. Replacements appear at `src/server/helpers.ts:91`, `src/server/constants.ts:65-80`, and `guides/websocket.md:65,90,94`.

4. not held

5. CONFIRMED — Source exports and guide Surface rows align at `src/server/index.ts:1-7`, `src/server/*.ts`, and `guides/websocket.md:41-107`. Interface methods at `src/server/types.ts:167-173` match the guide table at `guides/websocket.md:117-122`. Published-specifier fences are present at `guides/websocket.md:11,153,179,200,217,226,234`; executed transcriptions are at `tests/guides.test.ts:180-262`. `guides/README.md:9-13` indexes the guide. `AGENTS §` sweep: no matches; remaining section citations are RFC 6455 references.

6. not held

7. CONFIRMED — Status evidence lists only Owned files and contains no `package-lock.json`, `node_modules`, or off-limits path: `/home/user/work/evidence/conform-websocket.status:1-24`. `src/server/index.ts:1-7` contains only the intended barrels; no validators row or compatibility export remains. Old-name and compatibility-alias sweeps over the owned source, tests, and guides returned no matches.

8. not held

9. CONFIRMED — Scoped sweeps over source, owned tests, `guides/websocket.md`, `guides/README.md`, and `README.md` found no `TODO`, `FIXME`, `HACK`, `XXX`, deferred, unimplemented, debugger, or commented-out declaration residue. Test-directive sweeps found no `.skip`, `.only`, `.todo`, or retry. Current disposition-bearing edits align with the changed paths in `/home/user/work/evidence/conform-websocket.status:1-24`.

Findings outside the claims

none

Referrals

- Orchestrator: Will you re-vendor `/home/user/fleet/mcp/guides/websocket.md` and `/home/user/fleet/browser/guides/websocket.md` after publication? The brief identifies those mirrors as still carrying old names and un-narrowed fences.
- Orchestrator: Will the fleet-shared `tests/guides.test.ts` template be reconciled? Sibling packages still carry the old count and positional prose identified in `conform-websocket-brief.md` § Fleet rows.

VERDICT: PASS

Journal

Leave for driver.

Deviation

No tree change detected. `obj-6-control-fences.txt` exceeded the read limit and was not fully readable; claim 4 is not held.