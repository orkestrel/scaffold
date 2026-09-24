# J-MODAL round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the modal worktree, briefed by `j-modal-brief-2.md`; 79 tool uses, 3085 s; retained verbatim from the subagent's return; the tree is `veneer/tmp/worktrees/modal` on `unit/modal` from `e24e2c3`, uncommitted, `main` not merged. The writer's round-2 instrument is the worktree's `tmp/j-modal/mutations-3.py`, retained as `j-modal-mutations-2.py` with its log `j-modal-mutations-2.log.txt`)

Round 2 of J-MODAL is done: every item from A to G is closed in the worktree, and every acceptance command exits 0 on Chromium 153.0.8010.12. In the full `mutations-3.py` run, every row turns its named case red, every file reads green, and the log ends `receipt: restored byte for byte`. There is no stop condition. I made no `prove` MCP call; the server is not reachable from a subagent. Nothing was committed or merged.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/`.
- `src/browser/types.ts`:
  - `IsolationOptions.signal` added.
  - `ModalSelectorMap.fixed` and `.sticky` added.
  - The round-1 shared patch applied, with the brief's corrections: the `hidden.vn.modal` doc now says "after the host's fade and the backdrop's fade settle", and `DismissOptions.backdrop` now names "a press on the backdrop, or beside a modal's dialog".
  - The `show`/`hide` `@returns` now end "or another write changed the host's `shown` token while the call ran", so no token is given a faculty.
- `src/browser/Isolation.ts`: every chain element takes a `false` claim; the `signal` stops construction after any claim; a signal already aborted claims nothing.
- `src/browser/Modal.ts`:
  - The call identity became an in-flight flag, `#changing`.
  - The isolation is built with the modal's signal and destroyed when its door fails.
  - `#bounce` re-reads after the dispatch and after the focus (through `#idle`), and focuses only when `focus` is true.
  - The lock takes the modal's `fixed` and `sticky` selectors.
  - `#open`/`#close` are now `#holdOpen(document)`/`#releaseOpen(document)`.
  - The explicit isolation destroy in `destroy()` is removed; the signal already does it.
- `src/browser/Delegate.ts`:
  - Both modal routes read the delegate's lifetime before they prevent or mark.
  - The toggle route skips a target another delegate already drove on this click, then reads the lifetime again after the open modal's hide, before it marks.
  - The focus return is armed before `show()` and disarmed when the show resolves `false`.
  - The class doc block names the modal routes. They are appended after the unchanged base lines so sibling landings merge cleanly.
- `src/browser/constants.ts`: `MODAL_SELECTORS` gains `fixed` and `sticky`, taken from `SCROLL_LOCK_SELECTORS`.
- `src/browser/parsers.ts`: `parseBackdrop`'s summary and remarks no longer claim to be Bootstrap's coercion.
- `guides/veneer.md`:
  - § Surface rows for `IsolationOptions` and `parseBackdrop`, and the `IsolationInterface` Methods row.
  - Under `#### Modal`: the prevent restriction, the bounce reads, the isolation and lock sentences, the selectors table rows, the takeover paragraph, the focus return and destroyed-delegate sentences, and the corrected Bootstrap `TypeError` departure.
  - The headless-Chromium clause is removed.
- Tests: new and retitled cases in `Modal.test.ts`, `Isolation.test.ts` and `Delegate.test.ts`.
- Instruments: `tmp/j-modal/tests2.py`, `impl2.py` to `impl4.py`, `docs2.py`, `pad.py`, `reflow.py`, `identity.py`, `derive3.py`, `mutations-3.py`, `gates.sh`.

## Red and green readings
Command:
`node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Modal.test.ts tests/src/browser/Isolation.test.ts tests/src/browser/Delegate.test.ts`
- **Red** (new tests against the round-1 source; `tmp/j-modal/red-2.log.txt`): `Tests  12 failed | 79 passed (91)`, `EXIT 1`.
- **Green** (after the fixes; `tmp/j-modal/green-2.log.txt`): `Tests  91 passed (91)`, `EXIT 0`.

| Item | Red-first case (failed in the red reading) |
|---|---|
| A | "stops the isolation whose inert write a reaction answers by destroying the modal, releasing its claims and writing nothing more"; "destroys the isolation it constructed when a reaction inside the construction takes the show over"; "claims nothing under an aborted signal and releases every claim when its signal aborts" |
| B | "writes no static token when a listener to the prevent event hides the modal"; "writes no static token when a listener to the focus the bounce moves hides the modal"; "bounces without moving focus when focus is false" |
| C | "keeps an inert ancestor clear while any isolation inside it lives, and restores it at the last release" |
| D | "leaves the modal a click names to a live outer delegate when a listener to the button route destroys the inner one"; "acquires nothing through the dismiss route after a listener to the button route destroys the delegate"; "returns focus to the trigger when a hook of a constructed modal hides it inside its shown event" |
| G | "pads the elements its replacing fixed selector names through the scroll lock it takes, and not the default ones" (plus the defaults-table case) |

- **One fixture changed after the red reading:** the prevent-hook case now uses `focus: false`. Its row missed until then, because the read after the focus masked the read after the dispatch. Its per-case red is the row "the bounce reads nothing after the prevent dispatch".
- **Item E** is a prose and rename item with no behaviour of its own. The takeover prose is now pinned by "releases what a show the host took over held at a later show and its hide" and by the retitled "…and releases what it held at a hide after the token returns", which now also asserts that a `hide` before the token returns resolves `false`.
- **Item F:** the `Backdrop` validation control now imports `isSelector`, and there are control rows for reduced motion, the `Isolation` invalid host, and the nested-root marks.
- **Unknown (the identity conjunct in `#holds`):** it is unreachable. Dropping it reddened no case (`tmp/j-modal/identity.log.txt`: `0 failed of 29`, `0 failed of 44`, `receipt: restored byte for byte`). While a call is suspended, only that call's own doors or destruction can clear the change. Under E6 I removed the conjunct, turned the identity object into the `#changing` flag, and removed the guide clause "or a later call of the same modal started".

## Instrument
`tmp/j-modal/mutations-3.py` writes `tmp/j-modal/mutations-3.log.txt`. Every round-2 row is kept. The rows whose source text round 2 rewrote are re-aimed at the new text:
- "destruction keeps the isolation" now drops the signal the modal passes.
- "the open token is never released" now targets `#releaseOpen`.
- The row named for the renamed takeover case follows its new title.

The round-2 rows are added under "Round 2". Every row reads `EXACT` or `JOINED`; there are no `MISSED`, `ERR` or `NOREPORT` rows. The round-2 rows, verbatim from the log with the joined lists abbreviated:
```
EXACT exit=1 | the backdrop classes are not validated | tests/src/browser/Backdrop.test.ts | 1 failed of 7 | named: ['refuses a class value that is not a class token at construction'] | joined: […]
JOINED exit=1 | the isolation ignores its signal | tests/src/browser/Modal.test.ts | 10 failed of 36 | named: ['stops the isolation whose inert write a reaction answers by destroying the modal, releasing its claims and writing nothing more'] | joined: […]
EXACT exit=1 | the isolation ignores a signal aborted before construction | tests/src/browser/Isolation.test.ts | 1 failed of 7 | named: ['claims nothing under an aborted signal and releases every claim when its signal aborts'] | joined: […]
EXACT exit=1 | a constructed isolation is kept after the door fails | tests/src/browser/Modal.test.ts | 1 failed of 36 | named: ['destroys the isolation it constructed when a reaction inside the construction takes the show over'] | joined: […]
EXACT exit=1 | the bounce reads nothing after the prevent dispatch | tests/src/browser/Modal.test.ts | 1 failed of 36 | named: ['writes no static token when a listener to the prevent event hides the modal'] | joined: […]
EXACT exit=1 | the bounce reads nothing after the focus | tests/src/browser/Modal.test.ts | 1 failed of 36 | named: ['writes no static token when a listener to the focus the bounce moves hides the modal'] | joined: […]
EXACT exit=1 | the bounce focuses under focus false | tests/src/browser/Modal.test.ts | 1 failed of 36 | named: ['bounces without moving focus when focus is false'] | joined: […]
EXACT exit=1 | a clear ancestor takes no claim | tests/src/browser/Isolation.test.ts | 1 failed of 7 | named: ['keeps an inert ancestor clear while any isolation inside it lives, and restores it at the last release'] | joined: […]
EXACT exit=1 | the modal route reads no lifetime before it prevents or marks | tests/src/browser/Delegate.test.ts | 1 failed of 48 | named: ['leaves the modal a click names to a live outer delegate when a listener to the button route destroys the inner one'] | joined: […]
EXACT exit=1 | the dismiss route reads no lifetime | tests/src/browser/Delegate.test.ts | 1 failed of 48 | named: ['acquires nothing through the dismiss route after a listener to the button route destroys the delegate'] | joined: […]
EXACT exit=1 | the focus return is armed on shown | tests/src/browser/Delegate.test.ts | 1 failed of 48 | named: ['returns focus to the trigger when a hook of a constructed modal hides it inside its shown event'] | joined: […]
JOINED exit=1 | a transitionend wait replaces the dialog settle | tests/src/browser/Modal.test.ts | 7 failed of 36 | named: ['dispatches shown with no animation created under staged reduced motion'] | joined: […]
EXACT exit=1 | the isolation accepts any host | tests/src/browser/Isolation.test.ts | 1 failed of 7 | named: ['refuses a host that is not an HTMLElement'] | joined: […]
EXACT exit=1 | the modal route leaves no mark | tests/src/browser/Delegate.test.ts | 1 failed of 48 | named: ['drives the modal a click names once under nested roots, hiding the shown modal once and dismissing once'] | joined: […]
EXACT exit=1 | the modal route drives a target another delegate drove | tests/src/browser/Delegate.test.ts | 1 failed of 48 | named: ['drives the modal a click names once under nested roots, hiding the shown modal once and dismissing once'] | joined: […]
EXACT exit=1 | the dismiss route leaves no mark | tests/src/browser/Delegate.test.ts | 1 failed of 48 | named: ['drives the modal a click names once under nested roots, hiding the shown modal once and dismissing once'] | joined: […]
EXACT exit=1 | the modal passes no selectors to its lock | tests/src/browser/Modal.test.ts | 1 failed of 36 | named: ['pads the elements its replacing fixed selector names through the scroll lock it takes, and not the default ones'] | joined: […]
EXACT exit=1 | a show over held resources builds another backdrop | tests/src/browser/Modal.test.ts | 1 failed of 36 | named: ['releases what a show the host took over held at a later show and its hide'] | joined: […]
```
Green rows: Modal `0 failed of 36`, Backdrop `0 failed of 7`, ScrollLock `0 failed of 5`, Isolation `0 failed of 7`, Delegate `0 failed of 48`, validators `0 failed of 12`, parsers `0 failed of 5`, index `0 failed of 3`. The log closes with `receipt: restored byte for byte`.

An earlier full run, kept as `mutations-3-first.log.txt`, missed only "destruction keeps the isolation". Its target, the explicit isolation destroy in `Modal.destroy`, had become dead code once the isolation took the modal's signal. I removed that line, re-aimed the row at the signal, and ran the log above.

## Acceptance commands (`tmp/j-modal/gates-2.log.txt`)
```
EXIT npm run check:src:browser -> 0
EXIT npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser -> 0
All matched files use the correct format.
EXIT npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md -> 0
 Test Files  14 passed (14)
      Tests  277 passed (277)
EXIT npm run test:src:browser -> 0
      Tests  19 passed (19)
EXIT npm run test:guides -> 0
      Tests  109 passed | 1 skipped (110)
EXIT npm run test:policy -> 0
EXIT npm run build:src:core -> 0
EXIT npm run build:src:styles -> 0
EXIT npm run build:src:browser -> 0
      Tests  22 passed (22)
EXIT npm run test:conformance -> 0
      Tests  267 passed (267)
EXIT npm run test:setup -> 0
```
I also ran `npx tsc --noEmit -p tsconfig.json`, which exits 0.

## `git status --short` and `git diff --stat`
```
 M guides/veneer.md
 A src/browser/Backdrop.ts
 M src/browser/Delegate.ts
 A src/browser/Isolation.ts
 A src/browser/Modal.ts
 A src/browser/ScrollLock.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 A tests/src/browser/Backdrop.test.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Isolation.test.ts
 A tests/src/browser/Modal.test.ts
 A tests/src/browser/ScrollLock.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
 19 files changed, 3848 insertions(+), 241 deletions(-)
```

## Deviation state
There are no stops. These are the ancillary choices I settled myself:
- **Mark order in the toggle route (item D):** the brief orders the second lifetime read after the open modal's hide and before the mark. That alone would let an outer delegate hide the open modal a second time. So the route first checks whether this click already drove the target (the `#driven` lookup) and leaves it alone if so. The nested-root case pins this.
- **Bounce during a change in flight:** the bounce still dispatches `prevent.vn.modal` while a show or hide is in flight, but writes `static` only when the modal is idle. The guide lists this as a departure.
- **Focus-return timing:** the guide now lists "armed before the show" as a departure from Bootstrap arming inside `show.bs.modal`.
- **Carried from round 1, unchanged:** the backdrop is still not excepted from `Isolation`. The E13 empty-`class` bound, the `#routeDismiss` name, the E16 `disabled` helper, and the shipped-cascade reading stay with their named owners.
