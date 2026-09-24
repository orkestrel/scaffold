## Verdict — FOCUS-FRAME round 2 (claims 1, 3, 6)

**Claim 1 (Scope) — CONFIRMED.**
`/home/user/scaffold/.orkestrel/veneer/units/ff-2-status.txt:1-3` lists exactly `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`. `/home/user/scaffold/.orkestrel/veneer/units/ff-shared-2.patch:1-2` (`--- a/guides/veneer.md` / `+++ b/guides/veneer.md`) is its only file header; no other file appears in the patch.

**Claim 3 (The helper logic) — UNRESOLVED.**
- CONFIRMED sub-clauses, read directly:
  - `RING_SHADOW_CASES`, `RING_OUTLINE_CASES`, `RING_WORN_CASES` are frozen exported constants in `tests/setup.ts` (`ff-2.diff:1921-1965`, each wrapped in `Object.freeze`), iterated by name in `tests/setup.test.ts:1728-1803` (`ff-2.diff`).
  - `computeRingReach` (`ff-2.diff:1860-1875`) contains exactly the logic the claim names: the comma layer split, the `inset` test (`/\binset\b/u`), the x/y/blur/spread offset extraction, and the outline width+offset sum — no other branch.
  - Mutation-to-case mapping is corroborated by `ff-instruments/ff-mutations-2.log.txt:1-171`, whose `reach-*`, `cropped-*`, and `ring-band-inside` entries each name the exact site, mutation, command, exit code, and reddened case, matching the report's table one for one.
- UNRESOLVED sub-clause: "the removed parenthesis-aware split and color stripping decided no row, and **no computed shadow the journey reads** carries a length inside a color function." The only mutation exercising the removed color-stripping (`reach-no-strip`, log lines 10-17) and the plain-split mutation (`reach-plain-split`, lines 1-8) were run only against `npm run test:setup` (unit fixtures), never against the browser journey's real computed shadows. The report's own claim that "no computed shadow carries a pixel length inside a color function" (`b-focus-frame-report-2.md:46`) is asserted, not run against the journey. Command needed: re-run the `reach-plain-split`/`reach-no-strip` mutations against the journey (`npx vitest run --config configs/app/vite.journey.config.ts …`) and confirm no reddened case. The Orchestrator takes that reading.

Because one sub-clause cannot be decided from the evidence, claim 3 as a whole is `UNRESOLVED` per the `orkestrel-falsify` value rule (a claim is `CONFIRMED` only whole).

**Claim 6 (Law) — CONFIRMED.**
- No `any`: none in `ff-2.diff` added lines.
- No `as` beyond `const` assertions: only hits are `] as const)` at `ff-2.diff:824` and `:1457` — both `as const`, permitted.
- No `!` non-null assertion or bare postfix `!`: none found (targeted grep for `!.`, `!)`, `!;`, `! ` returned nothing).
- No `@ts-ignore`/`@ts-expect-error`/`@ts-nocheck`/`eslint-disable`: none found.
- No mock/spy/fake clock (`jest.mock`, `vi.mock`, `spyOn`, fake timers, `sinon`): none found.
- No nested function declarations: the only function-literal bodies added are `it(...)` test bodies, a `.map((layer) => {...})` callback passed directly as an argument, and a `document.addEventListener((event) => {...})` callback passed directly as an argument (`ff-2.diff:1314`) — both fall under the anonymous-callback-passed-directly exception; `computeRingReach`, `computeCroppedEdges`, `computeRingBand` are the only top-level function declarations (`ff-2.diff:1860,1983,2019`), none nested.
- Moved tables live in `tests/setup.ts` with TSDoc: confirmed above (each of `RingShadowCase`/`RingOutlineCase`/`RingWornCase` interfaces and their constants at `ff-2.diff:1877-1965` carry `/** ... */` doc blocks).
- Banned-term sweep on added lines: only hits are `above` used spatially ("the strip above the row/link/box", `ff-2.diff:864,1407,1493,1795,2005`), which is the permitted spatial sense, not the refused cross-reference sense. No other row hit.

Findings outside claims 1/3/6: none observed at the BROKEN standard within the read scope.

Counts the report states (`b-focus-frame-report-2.md`): `npm run test:setup` → `Tests 305 passed (305)` (line 167); filtered journey capture, dark-1280 → `Tests 4 passed | 43 skipped (47)` (line 168); same, light-390 → `Tests 4 passed | 43 skipped (47)` (line 169); `npm run test:guides` → `Tests 19 passed (19)` (line 170); mutation log (`ff-mutations-2.log.txt`) — `reach-plain-split` and `reach-no-strip` → `Tests 304 passed (304)`; `reach-no-split`, `reach-inset`, `reach-offset`, `reach-outline-offset`, `cropped-left`, `cropped-top` → `Tests 1 failed | 303 passed (304)`; `reach-outline` → `Tests 2 failed | 302 passed (304)`; `ring-band-inside` → `Tests 1 failed | 304 passed (305)`.

VERDICT: FAIL 3; outside the claims: none
