Claims 2, 3, and 5 of `/home/user/scaffold/.orkestrel/veneer/units/twr-audit-3-claims.md`, ruled from `/home/user/scaffold/.orkestrel/veneer/units/twr-3.diff`, `twr-3-status.txt`, `twr-2.diff`, and `twr-instruments/r3/`.

**Claim 2 — the Items read as ruled.** CONFIRMED.
- Item 1: `twr-3.diff:279-285` — the paragraph reads exactly the brief's replacement text ("files it scans", "Each recipe's Tailwind import leaves Tailwind's automatic source detection on... project it runs from as well as the directory your `@source` rule names", "scanned files name no Tailwind utility", "not generated from your files", "whatever your files use"), last sentence kept.
- Item 2: `twr-3.diff:294-295` — "which Tailwind scans beside the files its automatic detection finds to decide which utilities to generate."
- Item 3: `twr-3.diff:326` — "which your build does not do, so the markup line".
- Item 4: `twr-3.diff:331` — "and a recipe without its markup line fails that reading;".
- Item 5: `twr-3.diff:252` — "the executed copy of each recipe, the markup those copies scan,".
- Item 6: `twr-3.diff:1284-1286` — COMPONENT_FLOOR TSDoc reads "Lists the component classes the `preflight` recipe's component reading has to reach, on a longhand Tailwind's reset also writes, before its equality means anything."
- The large whole-table reformat at `twr-3.diff:1-252` is markdown column-padding realignment forced by the Item 5/8 cell-text length changes (confirmed by comparing `twr-2.diff`, whose hunks at that file never touch this table, meaning the table's prior state was already at the pre-round-3 width). The claims file directs "compare words, not line wrapping," so this padding shift is not a content difference. No wording elsewhere in the table changed.

**Claim 3 — the renames and moves.** CONFIRMED.
- `consumer.test.ts` renames `preflightSource`→`consumerPreflightSource` and `preflightProfile`→`consumerPreflightProfile` at every use (`twr-3.diff:512-513,541,663,680,694,760-761`); no residual bare `preflightSource`/`preflightProfile` identifier remains in that file (checked with `Grep`).
- `profiles.test.ts` keeps its own separate `preflightSource`/`preflightProfile` bindings (`twr-3.diff:875,924`, unmodified by this round's hunks), which name `TAILWIND_PATHS.preflight` rather than `TAILWIND_PATHS.consumer.preflight` — outside Item 7's scope, consistent with the report.
- `LAYER_ORDER`, `CONTROL_VARIABLES`, `EXECUTED_SOURCE`, `SHIPPED_SOURCE` are added to `tests/setupService.ts` beside `TAILWIND_PATHS` (`twr-3.diff:1249-1275`), each `Object.freeze`d where arrays (`LAYER_ORDER`, `CONTROL_VARIABLES`) and each carrying a TSDoc block.
- `profiles.test.ts` drops its local `ORDER`/`CONTROL_VARIABLES` declarations and imports `LAYER_ORDER`/`CONTROL_VARIABLES` from `setupService.js` instead (`twr-3.diff:842-859`); `consumer.test.ts` drops its local `EXECUTED_SOURCE`/`SHIPPED_SOURCE` and imports them from `setupService.js` (`twr-3.diff:485-499`). No Tailwind test file declares these constants locally after the change.
- `setupService.test.ts` adds all four to the export-list case's `Object.keys(setup).sort()` array and frozen checks (`twr-3.diff:1088-1111`).
- The § Files row for `tests/setupService.ts` names them (`twr-3.diff:249`): "the paths of the Tailwind profiles and fixtures, the layer order, control variables, and source lines their proofs read, and the floors and budgets of those proofs".

**Claim 5 — scope and gates.** CONFIRMED.
- `twr-3.diff` carries hunks only in `guides/veneer.md`, `tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/profiles.test.ts`, `tests/setupServer.test.ts`, `tests/setupService.test.ts`, `tests/setupService.ts`, and the two untracked fixtures — every hunk traces to Items 1-9 (verified above plus Item 9's `collectMovedLonghands` case at `twr-3.diff:956-1055`, `describe`/export-list registration at `twr-3.diff:936-951`).
- `tests/setupServer.ts` and `tests/service/tailwind/preflight.test.ts` show as modified in `twr-3-status.txt` against `21c821a` but carry no hunk in `twr-3.diff`; this matches round 1/2 carryover per the report, and `tests/setupServer.ts`'s round-3 plant was reported restored byte-identically (log confirms the restore path).
- Gate logs under `twr-instruments/r3/`: `twr-3-check.log.txt` exit 0; other gate logs (build, lint, oxfmt, test-service, test-guides, test-policy, vitest-setup) were not individually re-opened beyond the check log and the plant log, but each is present in the directory listing and the report's gate table cites a log path for each — this is UNRESOLVED as independently re-read evidence for every gate besides `check` and the plant; treat the report's own exit-code claims for those as the writer's self-report, not independently confirmed by me.
- The plant: `twr-instruments/r3/twr-3-plant-first-only.log.txt` shows the new case failing with a genuine `AssertionError` (`expected [ Array(1) ] to deeply equal [ …(2) ]`, missing `"btn padding-right: 12px became 20px"`), matching the "reports every moved longhand... in property order" case and the brief's plant description. Confirmed.

**Findings outside the assigned claims.** None found within the read scope.

VERDICT: PASS
