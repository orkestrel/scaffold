# J-MODAL round 4 (the landing round) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the modal worktree, briefed by `j-modal-brief-4.md`; 77 tool uses, 2843 s; retained verbatim from the subagent's return; the merge of Veneer `main` `2cc0887` into `unit/modal` was left open for the Orchestrator to commit after the second pass, its replay, and an objective lane; the instrument is the worktree's `tmp/j-modal/mutations-5.py`, retained as `j-modal-mutations-4.py` with `j-modal-mutations-4.log.txt`)

J-MODAL round 4 is done: the merge is resolved with no conflicted file left, items A to D and F are in place, every gate exits 0, and the full `mutations-5.py` run turns every row's named case red (61 `EXACT`, 51 `JOINED`, none missed). It ends `receipt: restored byte for byte`. Nothing was committed or installed, no discarding git command was run, and I made no `prove` MCP call (the server is not reachable from a subagent).

## A. The lock reads its lifetime after the overflow write
**Red run.** The new `Modal.test.ts` case is "writes nothing more after a reaction of a customized body to the overflow write destroys the modal":
- **Fixture:** the page's body is swapped, for this case only, for a customized built-in body (`class extends HTMLBodyElement`, defined with `{ extends: 'body' }`). Its one-shot `style` reaction destroys the modal when the overflow becomes `hidden`, then arms a `MutationObserver`.
- **Red command:** `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Modal.test.ts` gave `Tests  1 failed | 39 passed (40)`, failing that case with `AssertionError: expected [ MutationRecord{} ] to deeply equal []`: the lock wrote after the destroy (`tmp/j-modal/red-4.log.txt`).
- **Green:** after the fix, `Modal.test.ts` and `ScrollLock.test.ts` together read `Tests  47 passed (47)` (`tmp/j-modal/green-4.log.txt`).

**As landed.** In `ScrollLock.ts`, the line right after the overflow write is now `if (this.#controller.signal.aborted || defaultView === null) return`, so the read comes before the no-window return and before any padding. The class remarks and the guide's lock bullet now say the lock reads its lifetime after the overflow write too, a customized built-in body's included. That corrects my round-3 claim that the body can never be a custom element.

## B. The normalization paragraph
I ran each value through the installed `Manipulator` and the modal's type pattern first (`tmp/j-modal/normalize-probe.log.txt`). The departure bullet under `#### Modal` now reads:

> Bootstrap first normalizes the value: `true` and `false` become booleans, a numeric string becomes a number, an empty value or `null` becomes `null`, and any other value becomes `JSON.parse(decodeURIComponent(value))`, or stays the original string when either step throws. It then requires a boolean or a string and throws a `TypeError` otherwise. So `0` and `1` become numbers and fail, a raw empty value and `null` fail, and `[]` parses to an array and fails. `["%"]` stays a string, because its URI decoding throws, and reads as a backdrop that hides on a press. The JSON-encoded empty string `""` parses to an empty string, which passes the string check, and its falsy value turns the backdrop and its dismissal off. Any other truthy string except `static` reads as a backdrop that hides on a press. Veneer accepts `0` and `1`.

`npm run test:guides`: 19 passed.

## C. The completed-event row
The row "the show resolves through its door after the shown event" replaces `show`'s final `return !this.#controller.signal.aborted` with `return this.#holds(true)`. It reads `EXACT`: only "resolves a show true when a hook of its shown event hides the modal, the hide starting a new change" fails.

## D. Two targeted readings (`tmp/j-modal/targeted-4.log.txt`)
Both runs bind the lock's `abort` listener to an unused event (`vn-never`):

| Command | Result | Failure |
|---|---|---|
| `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/Modal.test.ts -t "releases the scroll lock whose compensation write a reaction answers by destroying the modal, writing nothing more"` | `exit=1`, `Tests  1 failed \| 39 skipped (40)` | `expected [ MutationRecord{}, …(5) ] to deeply equal []`: the lock kept writing after the destroy |
| `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/ScrollLock.test.ts -t "takes no reference under an aborted signal and releases its reference when its signal aborts"` | `exit=1`, `Tests  1 failed \| 6 skipped (7)` | `expected 'overflow: hidden; padding-right: 0px;' to be null` at line 136: the branch that aborts after construction released nothing |

Digests before and after each run: `e04a2efaa233fe73d4bc83ea5655e405433b33bd44188126b35ea3d615613f08`, `restored byte for byte`.

## E. Conflict resolution, one line per file
- `src/browser/constants.ts`: the import list is the sorted union of both sides; main's tables come first, then `BACKDROP_CLASSES`, `SCROLL_LOCK_SELECTORS`, and the `MODAL_*` tables.
- `src/browser/index.ts`: main's barrel rows, then `ScrollLock`, `Backdrop`, `Isolation`, `Modal`, then `Delegate`.
- `src/browser/validators.ts`: main's imports with `ModalEventMap` added; `isModalEvent` stays last.
- `src/browser/parsers.ts`: main's file with `parseBoolean` imported; `parseBackdrop` is last.
- `tests/src/browser/parsers.test.ts` and `tests/src/browser/validators.test.ts`: main's file, the modal import added, the modal `describe` last.
- `tests/src/browser/index.test.ts`: main's file; the modal exports are merged into its sorted list.
- `tests/src/browser/Delegate.test.ts`: main's file whole, its listener-count case included, then every modal case.
- `guides/veneer.md`: main's example fences, then the Modal fence; main's `####` sections, then `#### Modal` after Carousel. The Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel, and Modal `plugin` rows all read `shipped` with their Proof paths; the table was re-padded with `oxfmt --write`.
- `src/browser/Delegate.ts`: rebuilt from main's file with the modal folded in (section F).
- `git diff --name-only --diff-filter=U` reads empty; the resolved files are staged.

## F. The delegate fold
- **Kept from main, shared by the modal:**
  - `#closest`, which both modal triggers resolve through.
  - `#construct`, now in the `Modal` union and used to build every modal the delegate acquires.
  - The one `#conflicts`.
  - `#reach` and `#locate`, the shared dismiss resolution. `#reach`'s route type widens to `typeof Alert | typeof Modal`, and `#locate` reads `isDisabled(trigger, classes.disabled)` (E16).
  - `#press` and `#scan`, unchanged. `Modal` joins the `#driven`, `#mark`, `#owned`, and `#acquire` unions, and `#discard` reads `Modal.find`.
- **Kept from my rounds:** `#routeModal`, with both lifetime reads, the `#driven` lookup, the open-modal hide, and the focus return armed before `show()`; `#readModal(trigger)`; and the inline modal vocabulary field.
- **Deleted as duplicates (E6):** my `#conflictsCollapse`, `#conflictsModal`, `#readDismissed`, and `#routeDismiss`. The dismiss route is now `#dismissModal`, which goes through `#reach` and `#construct`.
- **Behaviour change in the dismiss route:** because it shares the alert's resolution, it now prevents an anchor's or an area's default action before it reads the delegate's lifetime, as the alert route does. The guide's `#### Modal` delegate paragraph says so.
- **Route order:** `#routeModal` and then `#dismissModal` run after `#routeCarousel`. That is the component order, with the toggle route before the dismiss route as Bootstrap registers them.
- **Conflict entries:** the modal that the toggle trigger names inside the root, and the modal that an enabled dismiss trigger reaches through `#locate` (so a disabled trigger adds nothing). Each is counted only while `Modal.find` returns no engine, and the two are counted once together, because one click reaches a single modal engine through both routes.
- **Class doc:** main's summary is unchanged; the remarks add the modal routes and the modal's conflict entry.

## G. Gates (`tmp/j-modal/gates-4.log.txt`, through `gates-4.sh`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | 0 | 21 files, 571 passed |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm run build:src:core` / `build:src:styles` / `build:src:browser` | 0 / 0 / 0 | |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run test:setup` | 0 | 281 passed |

## The instrument (`tmp/j-modal/mutations-5.py` → `mutations-5.log.txt`)
Every row of `mutations-4.py` is kept, and items A and C add "the lock reads no lifetime after the overflow write" (`EXACT`) and "the show resolves through its door after the shown event" (`EXACT`).
- **Re-anchored, because the merge or the fold moved their text:**
  - "the modal event guard admits a missing detail" and "the hooks bind every custom event": main brought an identical line in other guards, so these now anchor on the `relatedTarget` line after it.
  - "a document with no window is compensated": moved to item A's combined read.
  - "the modal route prevents no anchor default": now anchored on `#readModal(trigger)`.
  - "the delegate has no dismiss route": now removes `#dismissModal`.
  - "the modal route reads no lifetime before it prevents or marks".
- **Re-aimed at a shared member, because the fold deleted their subject:**
  - "a disabled dismiss trigger hides" and "the dismiss route finds no enclosing modal", now at `#locate`.
  - "the dismiss route reads no lifetime" and "the dismiss route leaves no mark", now at `#reach`.
  - "the modal conflict is not refused", now at the shared `#conflicts`.
- **Named cases retargeted:** after the fold, the delegate's `#construct` guard masked two proofs, so I extended or added a case for each:
  - "the dismiss route reads no lifetime" now names the extended case "acquires and hides nothing through the dismiss route after a listener to the button route destroys the delegate", which adds a modal a consumer constructed.
  - "the route runs after a listener destroys the delegate" now names a new outer-delegate case, "leaves the modal a click names to a live outer delegate when a listener to the hide event the inner route sends destroys the inner one".
  - Both read `EXACT`. The earlier full run, where those two rows missed, is kept as `mutations-5-first.log.txt`.
- **`GREEN?` rows:** Modal 0 of 40, Backdrop 0 of 7, ScrollLock 0 of 7, Isolation 0 of 7, Delegate 0 of 109, validators 0 of 22, parsers 0 of 17, index 0 of 3.

## `git status --short` (src/browser, tests/src/browser, guide)
```
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
A  src/browser/Carousel.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
A  src/browser/Dropdown.ts
A  src/browser/Placement.ts
 M src/browser/ScrollLock.ts
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
A  tests/src/browser/Carousel.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/Dropdown.test.ts
 M tests/src/browser/Modal.test.ts
A  tests/src/browser/Placement.test.ts
A  tests/src/browser/ScrollSpy.test.ts
A  tests/src/browser/Swipe.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/parsers.test.ts
M  tests/src/browser/validators.test.ts
```
`ScrollLock.ts` and `Modal.test.ts` are unstaged; neither was in conflict.

## Deviation state
There are no stops. Open points for you:
- **§ Delegation (owned by W5, not edited):** it still names only the alert, tab, and dropdown routes as the ones that read the disabled state. The modal dismiss route now reads it too.
- **Shipped cascade reading not added:** the round-2 brief said this landing round would add a reading of the shipped `modal` cascade (`src/styles/components/_modal.scss`, now on `main`) beside the test-local sheet, but brief 4 does not list it, so the proofs still use the test-local sheet.
- **Modal vocabulary type:** it stays an inline field type, because `types.ts` is off-limits and has no `ModalVocabulary`, while the other entities have one.
