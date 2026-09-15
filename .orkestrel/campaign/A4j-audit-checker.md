<!-- A4j — checker (Sonnet, native), mechanical lane over A4j-u4m-only.patch.txt, the U4m report, and the live test files. Retained from the completion notification, 2026-09-15 (36 s, 11 tool uses). Claim 6 closes on the Orchestrator's gates `after-u4m` (U4m-mcp-gates-orchestrator.log.txt), which ran independently of the writer. -->

**Lane: MECHANICAL — audit A4j, unit U4m, `@orkestrel/mcp` browser test prose.**

1. **CONFIRMED.** Live `ModelContext.test.ts:26-31` matches the brief's carrier-1 replacement text exactly, word for word (`.../ModelContext.test.ts:26-31`, brief lines 32-38). The paragraph that follows (`Each scenario owns an isolated \`Document\`…`, live lines 32-34) is byte-identical to the brief's quoted unchanged text and to the patch, which shows no `-`/`+` on that line.

2. **CONFIRMED.** Live `ModelContext.test.ts:219-220` reads `const standing = fixture.registrations()…` and `expect(standing.sort())…`. A repository-wide grep for `pruned` across `ModelContext.test.ts`, `factories.test.ts`, `validators.test.ts` returns no matches.

3. **CONFIRMED.** `factories.test.ts:1327` reads `builds a bridge exactly where this page exposes the property`; `validators.test.ts:95` retains `detects the registry exactly where this page exposes the property`. A grep for `exposes the registry` across the mcp tree (excluding `node_modules`, so covering `src/**`, `tests/**`, `guides/**`) returns no matches; a grep for `exposes the property` returns exactly the two test names above.

4. **CONFIRMED.** `factories.test.ts:1328` and `validators.test.ts:96` both open `The assertion pins the relationship rather than the reading, so it holds on any host`. Diffing the patch's removed/added lines: `factories.test.ts` keeps `the factory answers a bridge exactly where the page carries the property. A host shipping the …` unchanged in content (only the opening fragment and line-wrap point changed); `validators.test.ts` keeps `the guard accepts this page exactly where it carries the property. A host shipping the property under a shape the guard refuses reddens here rather than reporting a refusal that reads like the ordinary absence` unchanged in content and rewrapped from three lines to a slightly different three-line split with no content lost.

5. **CONFIRMED.** `A4j-u4m-only.patch.txt` touches exactly `ModelContext.test.ts`, `factories.test.ts`, `validators.test.ts`. Every hunk is comment text or the `pruned`→`standing` binding (declaration and its one use) or the one test-name string; no import, export, assertion right-hand side, or source file appears in the diff. Every removed line pairs with an added line at the same hunk site (three hunks, three balanced add/remove pairs).

6. **UNRESOLVED.** The report (`U4m-mcp-browser-prose-report.md:54-58`) names `format:check` exit 0, `lint:check` exit 0, the scoped browser run exit 0 with "129 passed | 2 skipped", and `git status --short --untracked-files=no` at 27 paths matching the checkpoint. This is the writer's self-report; no independent lane in the supplied evidence (A4i is the A4i round over U4l, not U4m, and covers no U4m gate run) re-executed these commands. Per the governing rule, a claim whose only evidence is the writer's report is `UNRESOLVED`, not `CONFIRMED`.

outside:

- The gate readings in claim 6 need an independent `verifier` run over the three owned files (`format:check`, `lint:check`, the scoped `test:src:browser` command named in the brief) before this round can close.

VERDICT: FAIL 6
