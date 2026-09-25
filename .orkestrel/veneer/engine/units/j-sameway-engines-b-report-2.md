<!-- The J-SAMEWAY-ENGINES-B round-2 writer's final message (opus on Opus 5.5, native subagent a87c701530b05375c, resumed), retained verbatim; brief: units/j-sameway-engines-b-brief-2.md; worktree tmp/worktrees/engines-b on unit/engines-b from 8bc940d. -->

## J-SAMEWAY-ENGINES-B round 2 report

The round-1 door tables are now exported, frozen constants in `tests/setupBrowser.ts`, and the three test files only reference them. Every case keeps its title and its assertions. The acceptance chain exits 0 and the instrument reads as it did in round 1. Two points need your ruling: I replaced round 1's `'none'` placeholder while moving the tables, and one door list older than this unit is still inline (deviation 1).

### Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/`.
- **`tests/setupBrowser.ts`**: 11 new frozen, exported constants after `CLOSING_REACTIONS`, each with TSDoc in the form of J-SAMEWAY's tables.
- **`tests/setupBrowser.test.ts`**: the 11 names added to the sorted export list.
- **`tests/src/browser/Dropdown.test.ts`, `Tooltip.test.ts`, `Popover.test.ts`**:
  - Each inline table declaration now references its setup constant.
  - The setup imports are extended.
  - The Tooltip hide case destructures `{ animated }` from the rows.
  - The two Dropdown reversal cases' `row` reading type becomes `readonly [string | undefined, string]` (deviation 2).
- **Programs in `tmp/j-engines-b/`**: `move-tables.py`, `setup-tables.ts.txt`, `compare-titles.py`, `acceptance-2.sh`. The pre-move copies are in `round1/`.

Diffstat over both rounds: `8 files changed, 2064 insertions(+), 177 deletions(-)`.

### Moved tables

| Name | Rows | File | Case |
|---|---|---|---|
| `DROPDOWN_SHOW_DOORS` | `event`, `promotion`, `focus`, `aria-expanded` | `Dropdown.test.ts` | "completes a show whose menu shown token the host adds first at each door before its token step, skipping that write" |
| `DROPDOWN_HIDE_DOORS` | `event`, `placement` | `Dropdown.test.ts` | "completes a hide whose menu shown token the host removes first at each door before its token step, skipping that write" |
| `DROPDOWN_SHOW_REVERSALS` | early and late door pairs; early is `undefined` when the host adds nothing early | `Dropdown.test.ts` | "returns a show to the hidden state when the host removes the menu shown token after the show found it at its end" |
| `DROPDOWN_HIDE_REVERSALS` | as above | `Dropdown.test.ts` | "keeps the shown state of a hide whose menu shown token the host adds back after the hide found it removed" |
| `PLATFORM_CLOSES` | `hide-popover`, `toggle-popover`, `call` | `Dropdown.test.ts`, `Popover.test.ts` | "hides the menu with its events when a consumer invoker or a hidePopover call closes the promoted menu"; Popover "hides the tip with its events when a consumer invoker or a hidePopover call closes it" |
| `HINT_CLOSES` | `hide-popover`, `call` | `Tooltip.test.ts` | "hides the tip with its events when a consumer invoker or a hidePopover call closes it" |
| `TOOLTIP_SHOW_DOORS` | `connection`, `aria-describedby`, `inserted`, `promotion` | `Tooltip.test.ts` | "completes a show whose tip the host marks shown first at each door before its token step, skipping that write" |
| `TOOLTIP_HIDE_DOORS` | `{ door: 'event', animated }`, with `animated` false and true | `Tooltip.test.ts` | "completes a hide whose tip the host takes the shown token from first at its hide event, skipping that write" |
| `TOOLTIP_REVERSALS` | direction and door pairs | `Tooltip.test.ts` | "returns what a change wrote to the state the host chose when the host moves the tip shown token against it after its token step" |
| `POPOVER_CHANGE_DOORS` | direction and door pairs | `Popover.test.ts` | "completes a change whose tip the host moves the shown token to the change end first at a door before its token step, skipping that write" |
| `POPOVER_REVERSALS` | `show`, `hide` | `Popover.test.ts` | "returns what a change wrote to the state the host chose when the host moves the tip shown token against it during the fade" |

### Acceptance output (`bash tmp/j-engines-b/acceptance-2.sh`)
```
check-src-browser exit 0
check exit 0
lint-check exit 0
format-check exit 0
test-setup-browser exit 0 |      Tests  88 passed (88)
owned-files exit 0 |      Tests  147 passed (147)
done
```
The owned-files run covers the three changed files plus `Placement.test.ts`, which is how round 1 counted 147.

`python tmp/j-engines-b/compare-titles.py` confirms the titles match round 1:
```
Dropdown titles 40 40 identical
  Dropdown.test.ts:1157: const doors: ReadonlyArray<readonly [HTMLElement, string]> = [
Tooltip titles 68 68 identical
  Tooltip.test.ts:1306: for (const position of ['top', 'right', 'bottom', 'left'] as const) {
  Tooltip.test.ts:1741: for (const position of ['top-start', 'bottom-end'] as const) {
  Tooltip.test.ts:2840: for (const first of [true, false]) {
Popover titles 17 17 identical
  Popover.test.ts:575: for (const first of [true, false]) {
```
Every literal it still lists is also at `8bc940d`, so none comes from this unit (deviation 1).

`npm run test:policy` also passes, `Tests  109 passed | 1 skipped (110)`, so no new setup export collides with a name another fleet package claims.

### Instrument table (`python tmp/j-engines-b/mutations.py`, log `tmp/j-engines-b/mutations.log.txt`)
The log ends with `restored byte for byte` and `rows 43, missed 0`. Every row's verdict matches round 1's log, which is kept as `mutations-round1.log.txt`.

| Row | Expected | Verdict | Failure message (first line, cut) |
| --- | --- | --- | --- |
| B1-dropdown-show-refusal | KILLED | KILLED | AssertionError: expected [ [ { door: 'event', …(10) } ], …(3) ] t |
| B1-dropdown-show-door | KILLED | KILLED | AssertionError: expected [ [ { door: 'event', …(10) } ], …(3) ] t |
| B1-dropdown-show-skip | KILLED | KILLED | AssertionError: expected [ [ { door: 'event', …(10) } ], …(3) ] t |
| B1-dropdown-hide-refusal | KILLED | KILLED | AssertionError: expected [ [ { door: 'event', …(7) } ], …(1) ] to |
| B1-dropdown-hide-door | KILLED | KILLED | AssertionError: expected [ [ { door: 'event', …(7) } ], …(1) ] to |
| B1-dropdown-hide-skip | KILLED | KILLED | AssertionError: expected [ [ { door: 'event', …(7) } ], …(1) ] to |
| B2-dropdown-show-expected | KILLED | KILLED | AssertionError: expected [ [ { …(11) } ], [ { …(11) } ], …(3) ] |
| B2-dropdown-hide-expected | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-dropdown-return-placement | KILLED | KILLED | AssertionError: expected [ [ { …(11) } ], [ { …(11) } ], …(3) ] |
| B2-dropdown-return-aria | KILLED | KILLED | AssertionError: expected [ [ { …(11) } ], [ { …(11) } ], …(3) ] |
| B2-dropdown-return-toggle | KILLED | KILLED | AssertionError: expected [ [ { …(11) } ], [ { …(11) } ], …(3) ] |
| B2-dropdown-record-toggle | KILLED | KILLED | AssertionError: expected [ [ { …(11) } ], [ { …(11) } ], …(3) ] |
| B2-dropdown-reshow-toggle | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-dropdown-reshow-aria | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-dropdown-record-hide-toggle | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-dropdown-identity | KILLED | KILLED | AssertionError: expected true to be false // Object.is equality |
| B2-dropdown-lifetime | KILLED | KILLED | AssertionError: expected [ MutationRecord{} ] to deeply equal [] |
| B3-dropdown-observe | KILLED | KILLED | AssertionError: expected [ …(3) ] to deeply equal [ …(3) ] |
| B3-dropdown-repromote | KILLED | KILLED | AssertionError: expected { Object (events, shown, ...) } to deeply eq |
| B3-dropdown-bound | KILLED | KILLED | AssertionError: expected { events: [ …(2) ], shown: true, …(2) } |
| B1-tooltip-show-connection | KILLED | KILLED | AssertionError: expected [ …(4) ] to deeply equal [ …(4) ] |
| B1-tooltip-show-link | KILLED | KILLED | AssertionError: expected [ …(4) ] to deeply equal [ …(4) ] |
| B1-tooltip-show-inserted | KILLED | KILLED | AssertionError: expected [ …(4) ] to deeply equal [ …(4) ] |
| B1-tooltip-show-owned | KILLED | KILLED | AssertionError: expected [ …(4) ] to deeply equal [ …(4) ] |
| B1-tooltip-show-skip | KILLED | KILLED | AssertionError: expected [ …(4) ] to deeply equal [ …(4) ] |
| B1-tooltip-hide-refusal | KILLED | KILLED | AssertionError: expected [ [ { animated: false, …(6) } ], …(1) ] |
| B1-tooltip-hide-skip | KILLED | KILLED | AssertionError: expected [ [ { animated: false, …(6) } ], …(1) ] |
| B2-tooltip-return-placement | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-tooltip-return-connection | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-tooltip-return-link | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-tooltip-rehide-token | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-tooltip-rehide-wait | KILLED | KILLED | AssertionError: expected [ [ { …(9) } ], [ { …(9) } ], …(2) ] t |
| B2-tooltip-precondition | KILLED | KILLED | AssertionError: expected { events: [], parent: true, …(3) } to deep |
| B2-tooltip-lifetime | KILLED | KILLED | AssertionError: expected [ MutationRecord{} ] to deeply equal [] |
| B3-tooltip-observe | KILLED | KILLED | AssertionError: expected [ …(2) ] to deeply equal [ …(2) ] |
| B1-popover-show-inserted | KILLED | KILLED | AssertionError: expected [ [ { …(8) } ], [ { …(8) } ], …(1) ] t |
| B1-popover-hide-refusal | KILLED | KILLED | AssertionError: expected [ [ { …(8) } ], [ { …(8) } ], …(1) ] t |
| B2-popover-return-placement | KILLED | KILLED | AssertionError: expected [ …(2) ] to deeply equal [ …(2) ] |
| B3-popover-observe | KILLED | KILLED | AssertionError: expected [ …(3) ] to deeply equal [ …(3) ] |
| CONTROL-dropdown | HELD | HELD | |
| CONTROL-tooltip | HELD | HELD | |
| BOOM | REFUSED | REFUSED | Error: boom |
| UNBOUND | REFUSED | REFUSED | ReferenceError: unbound is not defined |

### `git status --short`
```
 M src/browser/Dropdown.ts
 M src/browser/Popover.ts
 M src/browser/Tooltip.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/browser/Dropdown.test.ts
 M tests/src/browser/Popover.test.ts
 M tests/src/browser/Tooltip.test.ts
```
Nothing is committed.

### Deviation state
No stop. These need your ruling:

1. **Criterion 3 is not fully met.** The grep still finds one door list: `Dropdown.test.ts:1157`, in "stops and demotes the menu when a listener to the toggle focus or the menu promotion destroys it". It holds pairs of an element each test run builds and an event type, `[toggle, 'focus'], [menu, 'beforetoggle']`, and it is identical at `8bc940d`.
   - Moving it means restructuring a case this unit did not write, and the brief says to change nothing else, so I left it.
   - If you want it moved, it would become a `['focus', 'beforetoggle']` table, with the case picking its target from the event type.
   - The other literals the grep finds are position and boolean loops, not door rows. They are also unchanged from `8bc940d`.
2. **I replaced round 1's `'none'` placeholder with `undefined`.** The two Dropdown reversal tables marked "no early door" with the string `'none'`. AGENTS.md bars placeholder values such as `'none'` for absence, so the exported tables use `undefined` instead. The only effect on the cases is the `row` reading type. The assertions and the rows they read are unchanged, and the mutation rows for those cases still kill.
3. **The Tooltip close table has two rows, not three.** `HINT_CLOSES` keeps the rows round 1's Tooltip case drove, without `toggle-popover`. Its TSDoc lists those rows and gives no reason for the omission, because I have not measured one.
