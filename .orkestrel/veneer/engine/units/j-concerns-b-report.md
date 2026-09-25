# J-CONCERNS-B — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-CONCERNS-B report

Both cells are closed with added cases, and each added case read red against its named mutation. No defect was found. All three acceptance gates exit 0, and the three test files pass in scoped runs. Nothing is committed.

## Cell closures

| Cell | Closure | Case title | Mutation | Red reading |
| --- | --- | --- | --- | --- |
| D-MOTION | Added case (a ruling plus the case that pins it) | `dispatches shown and hidden inside the call while a transition the cascade gives the menu still runs` (`Dropdown.test.ts`, around line 319) | **Show:** in `Dropdown.show`, insert `await settleAnimations(menu, this.#controller.signal)` before the `shown` dispatch, and import `settleAnimations` | `expect(order.calls).toEqual([['shown.vn.dropdown']])`: `expected [] to deeply equal [ [ 'shown.vn.dropdown' ] ]` |
| D-MOTION | Same case | Same | **Hide:** in `#conceal`, replace the `hidden` emit with `void settleAnimations(menu, this.#controller.signal).then(() => emitEvent(host, DROPDOWN_EVENTS.hidden, { click }, false))` | `expect(order.calls).toEqual([['shown.vn.dropdown'], ['ended'], ['hidden.vn.dropdown']])`: received `[['shown.vn.dropdown'], ['ended']]` |
| P-CANCEL (show) | Added case | `writes nothing and dispatches no inserted or shown event when a listener prevents the show event, and shows once the listener leaves` (`Popover.test.ts`, around line 338) | In `Tooltip.show`, change `if (!accepted \|\| this.#blocked()) return false` to `if ((!accepted && this.#profile.popover !== 'manual') \|\| this.#blocked()) return false` | `expect(await popover.show()).toBe(false)`: `expected true to be false` |
| P-CANCEL (hide) | Added case | `keeps the tip shown, open, and unchanged, dispatching no hidden event, when a listener prevents the hide event a hide call starts` (`Popover.test.ts`, around line 388) | In `Tooltip.hide`, change `return this.#conceal(false)` to `return this.#conceal(this.#profile.popover === 'manual')` | `expect(await popover.hide()).toBe(false)`: `expected true to be false` |

- **How D-MOTION's case works.** It loads the shipped dropdown cascade plus a planted rule. The rule gives the menu an opacity fade-in from `@starting-style` and a fade-out that keeps it displayed with `display … allow-discrete`.
  - The case asserts that each event is dispatched inside the call, before the call yields.
  - It asserts that the menu's animations finish only after each event.
  - It asserts that at each event the menu has at least one running animation with a positive duration.
  - It pins no value the cascade owns.
- **Does D-MOTION's case tell the show mutation apart?** Yes, by two independent assertions. With the synchronous assertion disabled for one probe run, the motion reading also went red: `['shown.vn.dropdown', true]` expected, `false` received. The file was then restored from backup.
- **What else reddens under the show mutation.** A full `Dropdown.test.ts` run showed 2 failed and 42 passed. The other failure is the existing `promotes once and dispatches one shown event when a listener to its show event shows it again…`. It reddens because the re-entry order changes, not because of motion, so it does not close D-MOTION.
- **Does P-CANCEL's show case tell its mutation apart?** Yes. Only this case failed: `Popover.test.ts` 1 failed, 19 passed.
- **Does P-CANCEL's hide case tell its mutation apart?** Yes. Only this case failed: `Popover.test.ts` 1 failed, 19 passed.
- **Why the narrower hide mutation.** A broader `#conceal` mutation also reddens the existing prevented-platform-close cases. The narrower one isolates a prevented hide that a `hide()` call starts.

## Ruling: the Tooltip cases don't prove the popover profile

The brief's open question was whether the popover's prevention runs through the same path the tooltip cases prove. It does: `Popover` is `Tooltip` under a profile. `show` and `#conceal` read prevention from the value `emitEvent` returns, under `this.#profile.events`, with no profile branch.

Even so, `Tooltip.test.ts`'s cases `refuses to show when … prevented …` and `refuses to hide a hidden tip, keeps the tip a listener refuses to hide …` build no `Popover` and read no `.vn.popover` event. So they cannot catch a defect that only affects the popover profile:
- with both profile-conditional mutations applied, the whole file still passed: `Tests 74 passed (74)`;
- with the `hide()` mutation alone, it also passed: `Tests 74 passed (74)`.

That is why P-CANCEL takes the added Popover cases.

## Mutation handling

The prevention sites are in `src/browser/Tooltip.ts`, which is off-limits. I mutated it only to take the red readings: I backed it up to `tmp/j-concerns-b/Tooltip.ts.orig` and restored it from that copy. `Dropdown.ts` was handled the same way. `cmp` against both backups and `git diff --quiet -- src/` confirm that both files are byte-identical to `b867c96`. The mutation logs are under `tmp/j-concerns-b/`.

## Defects

None. No proof read red against the unmutated source.

## Files touched

- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b/tests/src/browser/Dropdown.test.ts`: adds the D-MOTION case.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b/tests/src/browser/Popover.test.ts`: adds the two P-CANCEL cases.
- `tmp/j-concerns-b/`: the run script, the backups, and the logs. It is git-ignored.

Diffstat:
```
 tests/src/browser/Dropdown.test.ts |  73 ++++++++++++++++++++++++++
 tests/src/browser/Popover.test.ts  | 104 +++++++++++++++++++++++++++++++++++++
 2 files changed, 177 insertions(+)
```

## Report-only patches

None. The cases use only `createRecorder`, `requireValue`, `waitForCondition`, and `scene`, so no reusable helper came up. No guide sentence became false.

## Acceptance output

```
format:check exit 0
All matched files use the correct format.
Finished in 18328ms on 489 files using 16 threads.

lint:check exit 0
npm notice run oxlint --config .oxlintrc.json --deny-warnings .

check exit 0
(last step) npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json

Dropdown exit 0
 Test Files  1 passed (1)
      Tests  44 passed (44)
Popover exit 0
 Test Files  1 passed (1)
      Tests  20 passed (20)
Tooltip exit 0
 Test Files  1 passed (1)
      Tests  74 passed (74)
```

The first `lint:check` run failed on `typescript(array-type)` in the Dropdown case. I fixed it with `ReadonlyArray<readonly [string, number]>`, and the gate reran green.

## `git status --short`

```
 M tests/src/browser/Dropdown.test.ts
 M tests/src/browser/Popover.test.ts
```

## Deviation state

No deviation. I settled these choices myself:
- the case titles and where each case sits;
- the planted menu rule for D-MOTION;
- the narrower `hide()` mutation for the P-CANCEL hide case;
- the temporary, byte-restored mutation of `Tooltip.ts` to take the P-CANCEL red readings.
