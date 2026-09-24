# J-TOAST round 3 — the writer's returned report (retained verbatim 2026-09-24)

Writer: `opus` on Opus 5.5, native subagent `a2242f48e6a9a82d8`, resumed in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast` (branch `unit/toast` at `fb00017`, merging `main` `7e96cf8`). Brief: `j-toast-brief-3.md`. Instrument: `j-toast-mutations-3.py` with its log `j-toast-mutations-3.log.txt` and the gate chain `j-toast-acceptance-3.sh`, retained beside this file (the unit's launch copies sat under the worktree's `tmp/j-toast/`).

---

Round 3 is done: the merge is resolved in the working tree with no conflict markers, and every gate in the chain exits 0 on Chromium 153.0.8010.12. The delegate now serves nine engines with `Toast` joined. Nothing is committed, I ran no install or discarding git command, and I made no `prove` call because a subagent cannot reach it.

## A. The re-entry sentence
- **Before:** "…the listener's call resolves `true`, the call whose event it heard resolves `false` and writes nothing, and the toast runs the one sequence and dispatches the one completed event."
- **After:** "…the call whose event it heard resolves `false` and writes nothing, and the listener's call completes or stops by its own cancellation, lifetime, and door reads. A listener that prevents the nested `show.vn.toast` its own call dispatches therefore leaves both calls resolving `false`, with no token written and no completed event."
- **Case:** "resolves both calls false and writes nothing when a listener to its show event shows it again and prevents that nested show". It asserts both calls resolve `false`, a `MutationObserver` records no write, only the two `show.vn.toast` events fire, and the class list stays `['toast']`.
- **Row:** "a prevented nested show hands the identity back". It mutates a prevented `show` to hand the identity back to the outer call, so the outer call proceeds. It read **EXACT**: only the new case fails.

## B. The ScrollSpy fixture
In `tests/src/browser/ScrollSpy.test.ts`, the `[…] as const` list is now `const refusals: ReadonlyArray<readonly [string, string]> = […]`, and the loop runs `for (const [attribute, value] of refusals)`. No `as const` remains under `tests/src/browser`.

## C. Conflict resolution
Each file keeps main's side first and the toast unit's after, and every resolved file is staged.
- **`src/browser/constants.ts`:** main's file, the `Toast*` type imports added, and the `TOAST_*` block appended after `MODAL_DEFAULTS`.
- **`src/browser/validators.ts`:** main's file, `ToastEventMap` imported, and `isToastEvent` appended last.
- **`tests/src/browser/validators.test.ts`:** main's file, `isToastEvent` imported, and the `isToastEvent` block appended.
- **`tests/src/browser/index.test.ts`:** main's file with the seven toast exports merged into the sorted list and a `ToastVocabulary` type row added (the case title now names "modal, and toast").
- **`tests/src/browser/Delegate.test.ts`:** main's file whole, including the listener-count case, with `Toast` and `TOAST_SELECTORS` imported and every toast route case appended.
- **`guides/veneer.md`:** git had aligned my Toast selector-lead sentence with the identical Alert one, so the middle and last blocks resolve together.
  - Result: main's example fences then the Toast fence, and main's `####` sections through Modal then `#### Toast` whole.
  - Also: a `ToastVocabulary` § Surface row, and § Delegation's disabled-state sentence now names the toast dismiss route.
  - Removed: my "`disabled="false"`" departure, which `isDisabled` makes false.
  - Plugin rows: Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel, Modal, and Toast each read `shipped` with their `tests/src/browser/<Entity>.test.ts` Proof.
- **`src/browser/Delegate.ts`:** rebuilt from main's delegate with the toast folded in (section D).

## D. The delegate fold
- **Kept (main's shared members):** `#closest`, `#reach`, `#locate`, the generic `#construct(engine)`, `#mark`, `#acquire`, `#discard`, and the one `#conflicts` Set.
- **Added:**
  - `#toast: ToastVocabulary`, resolved in the constructor after `#modal`.
  - `Toast` in the `#driven`, `#mark`, `#owned`, `#construct`, and `#acquire` unions; `#discard` reads `Toast.find`; `#reach`'s `route` accepts `typeof Toast`.
  - `#dismissToast`: it runs `#reach` with the toast group and hides through `Toast.find(host) ?? this.#construct(new Toast(host, this.#toast))`.
- **Deleted:** my `#routeToast`, `#contests`, `#dismissed`, `#disabled`, and the toast-only `#construct`.
- **Route order:** `#activate` runs `#dismissToast` last, after `#routeModal` and `#dismissModal`. As with the alert and modal routes, `#reach` prevents an anchor's or area's default first, then reads the trigger through `isDisabled` and the delegate's lifetime. The guide's `#### Toast` delegate paragraph says so.
- **Conflict entry:** `#conflicts` adds the toast an enabled toast dismiss trigger reaches through `#locate`, only while `Toast.find` returns nothing. A disabled trigger adds nothing, so a click is refused only where two routes would each construct an engine on one element (E12).
- **`ToastVocabulary`**, in `types.ts` after `ModalVocabulary`, in the `AlertVocabulary` shape:
  ```ts
  /** Carries a toast's resolved markup vocabulary: each group with every key present. */
  export interface ToastVocabulary {
  	readonly classes: ToastClassMap
  	readonly attributes: ToastAttributeMap
  	readonly selectors: ToastSelectorMap
  }
  ```
- **Class doc:** the summary is main's; the remarks add the toast route, the toast conflict entry, and "each toast" in the nested-roots sentence.
- **Untouched:** `Toast.ts` has no change in this round.

## Gates
Run through `tmp/j-toast/acceptance-3.sh`, with logs in `tmp/j-toast/final-3/`:

| Command | Exit | Summary |
| --- | --- | --- |
| `npm run check:src:browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  22 passed (22)`, `Tests  620 passed (620)`; the expected `HostSnapshot` `SyntaxError` diagnostic printed from the one case that throws by design |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | `✓ built in 70ms` |
| `npm run build:src:styles` | 0 | `✓ built in 816ms` |
| `npm run build:src:browser` | 0 | `✓ built in 248ms` |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Tests  281 passed (281)` |

## E. Instrument
`tmp/j-toast/mutations-3.py` ran once in full and wrote `tmp/j-toast/mutations-3.log.txt`.
- **Result:** 72 rows. 70 read EXACT or JOINED with their named case failing; the two ruled `(equivalent)` rows read MISSED.
- **Green runs:** `Toast.test.ts` 0 of 38 failed, `Delegate.test.ts` 0 of 118, `validators.test.ts` 0 of 24, `index.test.ts` 0 of 3.
- **Receipt:** `receipt: restored byte for byte`.

Re-anchored `Delegate.ts` rows, labels unchanged unless noted:
- "the delegate has no toast route" now removes `#dismissToast(...)`.
- "the dismiss route prevents no anchor click" now removes the prevention in `#reach`.
- "the dismiss route prevents after the disabled check" now moves that prevention after `#locate` in `#reach`.
- "a disabled trigger hides" now removes the `isDisabled` read in `#locate`.
- "the dismiss route reads no closest host" now removes the `#locate` fallback to the closest host.
- "the host token is the default" now passes `TOAST_CLASSES` in `#dismissToast`.
- "the delegate drives a toast outside its root" now removes the root containment check in `#locate`.
- "the toast mark is dropped" now removes the `#mark` in `#reach`.
- "the toast owner is not looked up" now drops `Toast.find` in `#dismissToast`.
- "the toast conflict is not refused" is re-aimed from the deleted `#contests` to the toast entry in the `#conflicts` Set.
- "a disabled trigger still contests" now blanks the toast's `disabled` token in the `#conflicts` `#locate` call.
- "the toast route reads no lifetime…" is renamed "the dismiss resolution reads no lifetime before it marks". The old label was false after the fold, because `#reach` prevents before it reads the lifetime.
- "a toast constructed while the delegate was destroyed is kept (equivalent)" is re-aimed to `#acquire` in place of `#construct` inside `#dismissToast`. It stays specific to the toast, because the shared `#construct` also serves tab and carousel.
- The three `isToastEvent` rows are anchored on its signature, because the merged `validators.ts` carries the same body in `isCollapseEvent` and `isAlertEvent`.

Deleted rows, each with its reason written as a comment where it stood:
- **"the disabled attribute is not read":** the attribute is now read by the shared `isDisabled` in `helpers.ts` (E16), outside this unit's files, and "a disabled trigger hides" covers the whole read.
- **"the collapse half of the toast conflict is dropped":** the Set counts the toast once, so no collapse half remains. The toast-entry row reddens both the button case and the collapse case.

## Status
`git status --short` over `src/browser`, `tests/src/browser`, and `guides` shows staged entries only. `git diff --name-only` and `git diff --diff-filter=U --name-only` are both empty.
```
M  guides/veneer.md
A  src/browser/Alert.ts
A  src/browser/Backdrop.ts
M  src/browser/Button.ts
A  src/browser/Carousel.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
A  src/browser/Dropdown.ts
A  src/browser/Isolation.ts
A  src/browser/Modal.ts
A  src/browser/Placement.ts
A  src/browser/ScrollLock.ts
A  src/browser/ScrollSpy.ts
A  src/browser/Swipe.ts
A  src/browser/Tab.ts
M  src/browser/constants.ts
M  src/browser/helpers.ts
M  src/browser/index.ts
M  src/browser/parsers.ts
M  src/browser/types.ts
M  src/browser/validators.ts
A  tests/src/browser/Alert.test.ts
A  tests/src/browser/Backdrop.test.ts
A  tests/src/browser/Carousel.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/Dropdown.test.ts
A  tests/src/browser/Isolation.test.ts
A  tests/src/browser/Modal.test.ts
A  tests/src/browser/Placement.test.ts
A  tests/src/browser/ScrollLock.test.ts
A  tests/src/browser/ScrollSpy.test.ts
A  tests/src/browser/Swipe.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/Toast.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/parsers.test.ts
M  tests/src/browser/validators.test.ts
```

## Deviation state
There was no stop. The one choice I settled myself beyond the brief's wording is the re-aimed and renamed instrument rows listed in section E.
