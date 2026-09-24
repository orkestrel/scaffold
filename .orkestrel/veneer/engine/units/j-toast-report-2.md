# J-TOAST round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the toast worktree, briefed by `j-toast-brief-2.md`; 27 tool uses, 1256 s; retained verbatim from the subagent's return; the tree is `veneer/tmp/worktrees/toast` on `unit/toast` from `e24e2c3`, uncommitted, `main` not merged)

Round 2 of J-TOAST is done in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast`, uncommitted. Every acceptance command exits 0 on Chromium 153.0.8010.12. The instrument reddens 71 of its 73 rows. The other two touch code no case can reach:
- **Round 1's destruction timer row:** kept, as your verdict ruled.
- **Item B's "a toast constructed while the delegate was destroyed is kept":** new in this round. Nothing runs between the route's lifetime read and `new Toast`, and the `Toast` constructor writes nothing and dispatches nothing. So the destroy branch in `#construct` cannot be reached. I kept `#construct` because the brief asks for the `j-tab-2.diff` shape.

I merged nothing from `main` and made no `prove` call, because a subagent cannot reach it.

## Files touched in round 2
- `src/browser/Toast.ts`:
  - `show` and `hide` take the call identity before the pre-change dispatch and read it after.
  - The fade door checks that the `shown` token is still present or absent, as it was before the call's first write.
  - `#schedule` and `#clear` are renamed `#arm` and `#disarm`.
  - The `#leave` parameter is named `held`.
  - The class remarks describe the identity rule and the fade door.
- `src/browser/Delegate.ts`:
  - `#routeToast` finds its trigger through `#closest` and reads the delegate's lifetime before it prevents or marks. It acquires engines through `#construct`.
  - `#contests` uses `#closest`, and `#dismiss` is gone.
  - The `#activate` comment is corrected, and the class remarks now say "inside the root" and exempt a disabled trigger.
- `src/browser/types.ts` (granted for item D):
  - Both `@returns` now name "a later call took the change over" as its own reason.
  - The `ToastClassMap`, `ToastAttributeMap`, and `ToastSelectorMap` summaries use the `Button` form.
  - The `ToastOptions` `classes`, `attributes`, and `selectors` summaries use the `Button` form.
- `src/browser/constants.ts`: the `TOAST_CLASSES` and `TOAST_ATTRIBUTES` summaries are corrected.
- `guides/veneer.md`:
  - Five § Surface rows are updated.
  - The fence now waits for `hidden.vn.toast` before `destroy`, with a matching lead.
  - The class and attribute table leads are rewritten.
  - The door paragraph carries the identity rule and the fade door, replacing the re-entry sentence.
  - The departure now reads "Bootstrap's `show` and `hide` methods have no such guard, and each runs its sequence again."
- `tests/src/browser/Toast.test.ts`: four new cases, and `once` → `after` in the comment, the case title, and the recorder label.
- `tests/src/browser/Delegate.test.ts`: one new case.
- `tmp/j-toast/**`: the edit scripts, `mutations-2.py`, `acceptance-2.sh`, and the logs.

## Items

**A. Identity across the dispatch, and the fade door**
- The fade door expects the `shown` token present when the toast was shown as the call began writing, after the pre-change dispatch. Otherwise it expects `shown` and `transition` both absent.
- A `show` on a shown toast still runs the sequence again.
- New cases:
  - (i) "runs one sequence when a listener to its show event shows it again without a transition…"
  - (ii) "resolves false for a hide whose event listener shows the toast, and the show completes once"
  - (iii) "stops a show of a shown toast whose fade write a reaction answers by removing the shown token…"
- Red, before the fix: `npm run test:src:browser -- tests/src/browser/Toast.test.ts` → `Tests  3 failed | 34 passed (37)`, and the three failures are (i), (ii), and (iii) (`tmp/j-toast/red-2-toast.log.txt`).
- Green: the same command → `Tests  37 passed (37)`.

**B. The delegate's lifetime in the toast route**
- New case: "leaves a toast to the live outer delegate when a listener to the button route destroys the inner delegate during the click".
- Red: `npm run test:src:browser -- tests/src/browser/Delegate.test.ts` → `Tests  1 failed | 42 passed (43)`, and the failure is that case (`tmp/j-toast/red-2-delegate.log.txt`).
- Green: the same command → `Tests  43 passed (43)`.

**C. The timer pair**
- The engine uses `#arm` and `#disarm` throughout, and no `#schedule` or `#clear` remains.
- Comments and the guide still say "starts the delay" for the act you can observe.

**D. Sentences the source made false**
- Every site the brief lists is changed; the file list above names each one.
- `npm run test:guides` → `Tests  19 passed (19)`.

**E. Release before restore**
- New case: "hands the tokens still to be written back to a toast a reaction constructs while destruction restores the host".
- It confirms the existing order, so it passed before any fix.
- The swap row "the claim is released after the restoration" reddens it alone (EXACT). This answers the Unknown: a case can distinguish the order, and this is that case.

## Instrument
- **Script and log:** `tmp/j-toast/mutations-2.py` wrote `tmp/j-toast/mutations-2.log.txt` in one full run.
- **Rows kept:** every round-1 row, with its match text moved to the round-2 source.
- **Rows added:**
  - "the identity is taken after the dispatch"
  - "the hide takes its identity after the dispatch"
  - "the fade door reads no shown membership"
  - "the claim is released after the restoration"
  - "the toast route reads no lifetime before it prevents or marks"
  - "a toast constructed while the delegate was destroyed is kept (equivalent)"
- **Round-1 row redirected:** "the fade door admits the transition token" now mutates the membership arrays.
- **Result:** 73 rows. 71 read EXACT or JOINED with their named case failing.
- **Missed:** "destruction leaves the delay running (equivalent)" and "a toast constructed while the delegate was destroyed is kept (equivalent)". Both are explained at the top of this report.
- **Green runs:** `Toast.test.ts` 0 of 37 failed, `Delegate.test.ts` 0 of 43, `validators.test.ts` 0 of 12, `index.test.ts` 0 of 3.
- **Receipt:** `receipt: restored byte for byte`.

## Acceptance chain
Run in the brief's order through `tmp/j-toast/acceptance-2.sh`, with logs in `tmp/j-toast/final-2/`:

| Command | Exit | Summary |
| --- | --- | --- |
| `npm run check:src:browser` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  11 passed (11)`, `Tests  252 passed (252)`; the known `HostSnapshot` `SyntaxError` diagnostic printed |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | `✓ built in 102ms` |
| `npm run build:src:styles` | 0 | `✓ built in 955ms` |
| `npm run build:src:browser` | 0 | `✓ built in 162ms` |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Tests  267 passed (267)` |

The browser build read `Chromium 153.0.8010.12`.

## Status and diffstat
Only owned files are listed.
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 A src/browser/Toast.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Toast.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```
```
 guides/veneer.md                     |  176 ++++-
 src/browser/Delegate.ts              |  150 +++-
 src/browser/Toast.ts                 |  298 ++++++++
 src/browser/constants.ts             |   43 ++
 src/browser/index.ts                 |    1 +
 src/browser/types.ts                 |   16 +-
 src/browser/validators.ts            |   29 +-
 tests/src/browser/Delegate.test.ts   |  289 +++++++-
 tests/src/browser/Toast.test.ts      | 1264 ++++++++++++++++++++++++++++++++++
 tests/src/browser/index.test.ts      |    7 +
 tests/src/browser/validators.test.ts |   38 +
 11 files changed, 2281 insertions(+), 30 deletions(-)
```

## Deviation state
There was no stop. Beyond the `#construct` row covered at the top, I settled these myself and am recording them:
- **Merge overlaps with J-TAB:** `#closest` and `#construct` repeat the method names in `j-tab-2.diff`. Here `#construct` takes a toast host and returns `ToastInterface`, so merging with the Tab round will need these reconciled, alongside the planned fold of the `#disabled` helper.
- **Fade door reading point:** I read the `shown` token after the pre-change dispatch, so a `show.vn.toast` listener can still change it before any write.
- **Optional cleanups:** B5 (the `held` parameter name) and B7 (the `Delegate` class remark) are applied.
