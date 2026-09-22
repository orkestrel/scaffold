# B-SWEEP — audit claims

Subject: the B-SWEEP unit's uncommitted writes in `/home/user/veneer-bsw` over `aca0423`, written by
`opus` from `/home/user/veneer-bsw/tmp/units/b-sweep-brief.md` and corrected by `builder` (Sonnet)
from `/home/user/veneer-bsw/tmp/units/b-sweep-brief-2.md`, under the design
`/home/user/veneer-bsw/tmp/units/b-sweep-design-verdict.md` (D15, its § Amendment, and the
`findDuplication` rename recorded at its end). Evidence: `/home/user/scaffold/tmp/audit/bsw.diff`
(the whole diff against `aca0423`), `bsw-status.txt`, and the reports `bsw-report.md` (round 1) and
`bsw-report-2.md` (round 2). Rule each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`; rule a
claim about a proof on the mutation named and whether the assertions distinguish it.

1. **The leaf.** `tests/setupServer.ts` exports `findDuplication(shared: readonly StyleOverlap[]):
   readonly StyleOverlap[]` directly after `scanStyleBlocks`, filtering by
   `(count >= 4 && count * 2 > smallest) || count >= 6` with `count` the intersection's declaration
   count and `smallest` the smaller block's; `scanStyleBlocks` and its pair loop are unchanged; the
   `@remarks` states the relative arm's floor of 4, the two- and three-declaration whole-copy
   boundary, the absolute arm of 6 against the measured maximum coincidence of 3 on 2026-09-22, and
   that the sweep keeps reporting every intersection; the `[]` `@example` moved onto the leaf and
   `scanStyleBlocks` gained an example showing a coincidence in its reading. No nested function, no
   `as`, no `!`.
2. **The name.** `findDuplication` is the exported name because `findDuplicates` collides with
   `@orkestrel/reason`'s hosted surface under `inspectPolicySurface` in `tests/setupPolicy.ts`
   (round-1 deviation 1, gate red with the colliding name, green after); the name follows the
   `findDrift` precedent and no other fleet guide claims it.
3. **The plant.** `describe('findDuplication')` in `tests/setupServer.test.ts` holds six cases on
   real scratch trees through `createScratch`, destroyed in `finally`, each calling the real
   `scanStyleBlocks(scratch.path)`: (4, 4, 4) reported with an exact `toEqual` over both sites;
   (3, 6, 6) refused then (4, 6, 6) reported; (2, 2, 2) and (3, 3, 3) refused while
   `scanStyleBlocks(...).shared` lists both; (4, 8, 8) refused then (4, 7, 8) reported; (6, 12, 14)
   reported then (5, 12, 14) refused; and the sweep-unmoved case with (2, 5, 6) and (3, 6, 6). The
   round-2 mutation table holds: floor 4 to 3 reddens the whole-copy case; floor 4 to 5 reddens the
   three four-shared reports; `>` to `>=` reddens the tie; absolute 6 to 5 and the arm dropped each
   redden the absolute case; a predicate returning nothing reddens four cases and one returning
   everything reddens five. `findDuplication` sits in the export inventory at its sorted position.
4. **The gate.** `tests/setupStyles.test.ts`'s case is titled `repeats no partial's written
   declaration block in another partial`, asserts `findDuplication(sweep.shared)` equal to `[]`,
   imports the leaf, and keeps the file and folder assertions; at `aca0423` the tree reports no
   intersection, so the gate is green before and after.
5. **Scope is honest.** The status lists `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
   `tests/setupStyles.test.ts` and nothing else; `src/**`, `guides/**`, `tests/setupStyles.ts`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, and the vendored files are untouched; no
   `tmp/probe/` path exists.
6. **Gates.** `format:check`, `lint:check`, `check` exit 0; `test:setup` `166 passed`;
   `test:policy` `109 passed | 1 skipped`. UNRESOLVED until the Orchestrator's independent chain;
   rule `npm run check` yourself where the sandbox allows it.
