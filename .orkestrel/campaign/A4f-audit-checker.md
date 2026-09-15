<!-- A4f — checker (Sonnet, native), mechanical lane over A4f-u4i-only.patch.txt and the U4i report, with the chain walk. Retained from the completion notification, 2026-09-15 (191 s, 34 tool uses). -->

checker — MECHANICAL lane.

1. **The sync converges on the manager — CONFIRMED.** `src/browser/ModelContext.ts:229-252` (`#changed`/`#sync`) reads `collectWebMCPProjections(tools)` at run time and `#prune` (`:346-356`) releases only names bound to that manager. Tests cover the named cells: `preserves an equal-descriptor replacement made by an earlier remove listener`/`…clear listener`/`…while a publication is still queued`/`…while a registration is suspended`, `releases an unencodable descriptor after remove/clear`, `leaves an unencodable descriptor alone while its tool stays`, `drops additions erased when the followed manager is destroyed` (`tests/src/browser/ModelContext.test.ts:411-1029` in the patch). All green in `U4i-mcp-gates-test-full.log.txt:11` (1471 passed | 2 skipped).

2. **Coalescing is exact — UNRESOLVED for the discriminating proof; CONFIRMED for the code and the passing test.** `#pending: ToolManagerInterface | undefined` (`ModelContext.ts:114`) and its check at `:235` exist as described, and `registers a change to a manager published while a synchronisation is queued` (`ModelContext.test.ts:330`) passes in the independent gate log. The claim that a boolean control would fail this test rests only on the U4i report's own mutation-and-restore narrative (§ Coalescing decision) — no other lane or Orchestrator probe re-ran that mutation. Per the writer-self-report rule, that half is UNRESOLVED, not CONFIRMED.

3. **`publish` keeps its contract — CONFIRMED.** `#publish` snapshots through `buildWebMCPProjections` at the call (`ModelContext.ts:148`), keeps queue position and refusal (`:149`, `:157-159`), and follow (`:153`). Projections now carry the tool (`types.ts:397-400`), closing the churn risk the report names.

4. **The public shape is right — mechanically CONFIRMED for existence; naming/shape judgment left to the reviewer's lane.** `buildWebMCPProjections` (`helpers.ts:218`), `collectWebMCPProjections` (`helpers.ts:252`), `WebMCPProjection { tool; descriptor }` (`types.ts:397`), `describeWebMCPTool` retained and exported (`helpers.ts:180`) — all verified by direct read. No stale `buildWebMCPDescriptors` reference anywhere in the tree (`grep` found none).

5. **The prose is exact — CONFIRMED.** Class remarks (`ModelContext.ts:49-63`), `publish`/`destroy` TSDoc (`types.ts`), and the guide's follow section (`guides/mcp.md` diff hunk) all state the convergence rule; no "descriptor-bound release" sentence remains anywhere in `guides/mcp.md` (`grep` found none); the skip rule is unchanged.

6. **The recorder limit is stated and bounded — CONFIRMED, with the limit named rather than closed.** `recordRequests` TSDoc states the completed-response limit (`tests/setupBrowser.ts` diff, lines ~159-165). `completes connect…` now reads the drain while the control's response is pending and again after it completes (`tests/src/browser/factories.test.ts` diff). The report itself states the transport-recorder route was unavailable (`src/browser/factories.ts` off-limits), naming it a follow-up vector rather than closing it — matching the brief's own instruction.

7. **Nothing else moved; nothing re-implements an installed export — CONFIRMED.** `A4f-u4i-only.patch.txt` touches exactly the report's eight files. `collide3-mcp-after-u4i.txt`: 469 export names, 98 files swept, `collisions: none`. `toolToDefinition` is imported from `@orkestrel/tool` in `helpers.ts:5`, not reimplemented.

8. **The chain is whole — BROKEN.** Walking every FAIL line: all of A4's 14 claims and F1–F4, all of A4b's claims (analyst and checker), A4c's claims, and A4d's claims 2/4/5 close downstream, most recently through U4h and this round's O1/O2/O3 closure (equal-descriptor replacement, unencodable-descriptor release, destroy-erasure tests, all present and green above). Two items do not close in the tree:
   - **A4e-checker claim 3** (`A4e-audit-checker.md:9`): "the pin reddens under a synchronous teardown" rests only on the U4h writer's self-report; no lane or Orchestrator probe independently reproduced that red. Not touched by U4i (`src/core/MCPClient.ts` is outside this round's files).
   - **A4d-checker claim 7** (`A4d-audit-checker.md:17`): the design judgment on whether the discovery exemption's attempt-wide scope (not identifying request provenance) is correct is explicitly referred to the objective/subjective lanes ("outside mechanical evidence") and no subsequent round's record rules on it.
   Both are pre-existing gaps in `src/core/MCPClient.ts` behavior/proof, untouched by U4i's `src/browser/**` scope, so they do not indict U4i's own work — but claim 8 as stated ("every FAIL … names a closing test or a recorded ruling") is not fully true.

9. **Ship it as mcp 0.0.31 — NOT-EVIDENCED (referred).** Mechanical evidence supports the browser-face WebMCP work itself: all authoritative gates and the full test chain exit 0 (`U4i-mcp-gates-orchestrator.log.txt`, `U4i-mcp-gates-test-full.log.txt`), the eight-file scope is clean, and O1–O3 close. Whether the two open items under claim 8 (both in `src/core/MCPClient.ts`, unrelated to this round's files) block shipping is a product/subjective judgment. Refer to the Orchestrator / subjective lane.

outside: none beyond claim 8's two named items.

VERDICT: FAIL 2, 8, 9

<!-- Orchestrator reconciliation: A4d-checker claim 7 (the generation exemption) was ruled CONFIRMED by the A4d objective lane (A4d-audit-analyst.md claim 7: the equality matches the joinability check; a generation invalidated by teardown cannot satisfy it; discovery is independently exempt) — a recorded ruling; closed. Claims 2 and 8's first item (the two writer-only mutation controls) are the Orchestrator's probe P14, run after the A4f lanes return. -->
