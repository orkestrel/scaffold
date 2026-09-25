<!-- The J-SAMEWAY-ENGINES-A checker lane (checker on Sonnet, native read-only subagent a892d45c073c91d40), retained verbatim from its completion notification; brief: units/j-sameway-engines-a-audit-checker-brief.md; claims units/j-sameway-engines-a-audit-claims.md; subject Veneer 7511b82. -->

All four spot-checked titles exist verbatim. Given the effort ceiling, I checked all four source files in full against the report's A4 tables and traced entry/return code paths; I spot-verified case titles by search rather than exhaustively confirming every one.

## Checklist

- **A4 tables against source** — met, with one gap. Every row I traced (Collapse show/hide, Toast show/hide, Tab show, Carousel slide) matches an actual write, entry array, and return/rule in `src/browser/{Collapse,Toast,Tab,Carousel}.ts`, confirmed at the snapshot commit `7511b82` (paths under `C:/Users/mikes/AppData/Local/Temp/claude/.../snapshot-engines-a-7511b82/src/browser/`):
  - Collapse show: transition add/removed (line 213/490), host remove/added-back (218-224/491), size 0px→scroll size/property removed (226-246/492), trigger marks/return marks (232-236/455-461), token write host+shown/ends host entry (249-257), remove-transition+clear-size/no return (258-269).
  - Collapse hide: mirrors, lines 302-353.
  - Toast show: clear timer (184), fade add/removed (192-196), token write transition+shown/removed (200-212), remove-transition/no return (210-212).
  - Toast hide: clear timer (228), add transition/removed (234-236), token write transition+shown/nothing left (244-248).
  - Tab show: sibling active removal/added back (216-219), blur/not returned (220-222, matches report's stated exclusion), previous pane removal/added back (223-231), leaving selection/returned (233-241), host active write (244-247), entering selection (248-256), pane active/shown (257-271), `hidden.vn.tab` dispatch (278, not a write).
  - Carousel slide: timer disarm/rearm in `finally` (354-355, 579-582), leaving/arriving indicators (372-439), order/direction tokens (441-500), incoming active write (531-549), outgoing cleanup (550-573).

  **One write no row names**: `Toast.show()` line 214, `if (!host.matches(':hover') && !host.matches(':focus-within')) this.#arm()`. This starts the autohide timer and is not listed in the report's Toast show table (the table lists only "Clear the timer"). Re-dispatch: add this write, its entry status (not returned — parallels the report's own "not returned" note for the Toast timer), to the A4 Toast show table, or state why the report omits an arming write while listing its counterpart disarm.

- **Claim 8** — met. `j-sameway-engines-a-status.txt` lists exactly `guides/veneer.md`, `src/browser/{Carousel,Collapse,Tab,Toast}.ts`, `src/browser/types.ts`, and `tests/src/browser/{Carousel,Collapse,Tab,Toast}.test.ts` — the eight unit paths plus `types.ts` and the guide, nothing else. `Grep` for `writeTriggers` and `#select\b` across `src/browser/` in the snapshot returns no matches: both are gone with no caller. Every private field and method I traced in `Collapse.ts`, `Toast.ts`, `Tab.ts`, and `Carousel.ts` has at least one call site inside its class; none reads as dead.

- **Case titles** — met for the four titles I searched (one per engine, spanning A1/A3/A4 rows): all four resolve verbatim in their test files (`Carousel.test.ts:2085`, `Collapse.test.ts:1261`, `Tab.test.ts:1693`, `Toast.test.ts:1365`). I did not search every title the A4 tables quote; a full sweep is a re-dispatchable follow-up if exhaustive title parity is required.

## Referrals

- Whether the unlisted Toast `#arm()` write in `show()` is a substantive omission from claim 4 ("the enumeration is complete") or an intentional exclusion parallel to the Carousel/Tab focus-and-timer exclusions is a judgment call for the objective or subjective lane, not mine to rule.
- I did not verify every case title in the A4 tables (only four sampled); a full title sweep is unclaimed.

CHECK: FAIL A4-Toast-show-arm-write
