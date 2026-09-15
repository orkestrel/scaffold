<!-- A4c — checker (Sonnet, native), mechanical lane over A4c-u4f-only.patch.txt and the U4f report. Retained from the completion notification, 2026-09-15 (130 s, 31 tool uses). -->

I hold the mechanical (checker) lane.

**CONFIRMED 1** — `#refuse` at `src/core/MCPClient.ts:557`, exempts `server/discover` (`:558`); called at `#request` (`:585`) and `#openSubscription` entry (`:470`). Tests confirmed: `tests/src/browser/factories.test.ts:1209` (`rejects task requests after page stop`), `:1233` (`rejects a subscription started after page stop`), `tests/src/core/MCPClient.test.ts:1665`, `:1686`. `U4f-red.log.txt:29` shows `settles calls across page destruction` failing red (15010ms, a hang signature) before the fix, corroborating "re-taken with `stop` intact and only the refusal disabled." The subscription-refuses-on-first-`next()` question is a design judgment — outside mechanical scope.

**CONFIRMED 2** — `ModelContext.ts:141` (`#follow` call in `publish`), `#follow`/`#unfollow`/`#added`/`#removed`/`#cleared` at `:177`–`:231`. Tests at `tests/src/browser/ModelContext.test.ts:235,250,266,282,307,322` all exist verbatim. `guides/mcp.md:4811` row reads "implement." `#unfollow` (`:191`) uses `emitter.off` with retained handler references, consistent with installed `@orkestrel/emitter` 0.0.10's `on` returning `void`.

**CONFIRMED 3** — `#reconcile`'s destroyed re-read is at `ModelContext.ts:274` exactly. `U4f-green.log.txt:55` shows `registers nothing when destroy runs during replacement unregistration` passing.

**CONFIRMED 4** — Ownership prose at `types.ts:455` ("including a same-name registration another handle made later"); same-name test confirmed at `tests/src/browser/ModelContext.test.ts:668`.

**CONFIRMED 5** — `guides/mcp.md:4822` row text matches `G5-webmcp-distillate.md:51`'s "Unknown" framing verbatim in substance.

**CONFIRMED 6** — Mutation-proof tests at `ModelContext.test.ts:607` (`is inert on a repeat`) and `:633` (replacement-unregistration). `U4f-red.log.txt:69,71,100` show the `#reconcile` guard deletion reddening `is inert on a repeat`, and the recorded negative that deleting `destroy`'s own guard leaves the file green. The "keep or remove the guard" question is a design-law judgment (derive state / no superfluous code) — outside mechanical scope, referred.

**CONFIRMED 7** — `describeWebMCPTool` at `src/browser/helpers.ts:172`, exported through `src/browser/index.ts:4` (`export * from './helpers.js'`). `traceRegistrations` at `tests/setupBrowser.ts:387`; `suspend()`/`holding()` at `tests/fixtures/modelContext.ts:238,246`. The Orchestrator's independent probe `collide3-mcp-after-u4f.txt` reports 469 names swept over 98 files, `collisions: none` — authoritative and clean. Note outside the claim: the unit's own report (line 67) states "355" export names, which disagrees with the Orchestrator's 469-name probe; the writer's count is UNRESOLVED as self-reported evidence, but the authoritative probe still shows no collision, so the claim's substance stands.

**CONFIRMED 8** — Guide documents the skip at `guides/mcp.md:4064`–`4067` and `:4080`; pinned by `leaves a followed tool WebMCP cannot carry unregistered` (`ModelContext.test.ts:322`). Whether a consumer can observe the skip through `change` or registry contents is a design judgment — referred, not decided here.

**CONFIRMED 9** — Both restated snapshot tests (`ModelContext.test.ts:180`, `:203`) assert `trace.calls.map(([names]) => names)).toEqual([['add'], []])` and empty end state, matching the claim's text exactly.

**CONFIRMED 10** — `A4c-u4f-only.patch.txt` touches exactly 12 files (`guides/mcp.md`, `src/browser/ModelContext.ts`, `src/browser/factories.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `src/core/MCPClient.ts`, `tests/fixtures/modelContext.ts`, `tests/setupBrowser.ts`, `tests/src/browser/ModelContext.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/core/MCPClient.test.ts`), matching the report's table exactly. No manifest, version, lockfile, `scaffold repair` file, `src/server/**`, `configs/**`, or `dist/**` path appears; no `src/core/**` file beyond `MCPClient.ts`.

**NOT-EVIDENCED 11** — "Would you ship it" is a subjective/design judgment about readiness for a future round; it is not a mechanical fact this lane can confirm or falsify from file evidence. Referred to the subjective lane / Orchestrator.

outside:
- The unit's self-reported export-collision sweep count ("355") in `U4f-mcp-browser-report.md:67` disagrees with the Orchestrator's independently run probe (469 names). The report's number is self-reported and UNRESOLVED as evidence on its own; the Orchestrator's `collide3-mcp-after-u4f.txt` is the evidence that actually carries claim 7.

Referrals (subjective/design judgment, not mechanical):
- Claim 1's subscription-refusal-timing question (whether `listen` owes an earlier refusal than first `next()`).
- Claim 6's ruling on whether `destroy`'s now-provably-unobservable early-return guard should be kept or removed under the design laws.
- Claim 8's question of whether a consumer can observe a skipped followed-`add`, or whether the guide must state it cannot.
- Claim 11's shippability judgment for building U4e/U5b on this surface.

VERDICT: PASS

<!-- Orchestrator note: the 355 vs 469 difference is the sweep population — the unit swept @orkestrel/test and @orkestrel/contract; collide3 also reads re-export lists and every declaration form. Both report no collision. -->
