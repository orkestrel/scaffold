# J-COLLAPSE — the unit's report (`opus` on Opus 5.5, a fresh native subagent, 165 tool uses, 2309 s, returned 2026-09-23; retained verbatim from the subagent's return text; the unit's `tmp/j-collapse/` files are retained beside this report as `j-collapse-<name>` and its patches under `j-collapse-patches/`)

The Collapse unit is written and green on every scoped gate except `npm run test:conformance`. That run fails one case, which reads `dist/src/core/index.js`, and only `build:src:core` produces that file; the brief doesn't permit that build. On the overlap question in obligation (b), I ruled that "the restoration that started first writes it back" is the wrong precedence. That ruling stops at this report and needs J-BINDER-PRECEDENCE before this unit integrates.

## Touched files (worktree `C:/Users/mikes/WebstormProjects/veneer-collapse`)

- `src/browser/Collapse.ts` (new): the `Collapse` class. It shows, hides, and toggles through the transition token and an inline size, keeps the triggers in step, closes accordion siblings through their own engines, and restores everything through `HostSnapshot`.
- `src/browser/parsers.ts` (new): `parseElement`, which turns a selector or an element into an `HTMLElement | undefined`.
- `src/browser/constants.ts`: adds `COLLAPSE_EVENTS`, `COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES` (whose `target` reuses `TARGET_ATTRIBUTE`), and `COLLAPSE_SELECTORS`.
- `src/browser/validators.ts`: adds `isCollapseEvent`.
- `src/browser/Delegate.ts`: adds the `collapse` group, `#routeButton` and `#routeCollapse`, a route-typed mark, and `#owned`/`#discard` across both engine classes.
- `src/browser/index.ts`: exports `parsers.js` and `Collapse.js`.
- `tests/src/browser/Collapse.test.ts` (new): the proof matrix.
- `tests/src/browser/parsers.test.ts` (new), plus the `isCollapseEvent` cases in `validators.test.ts`, the export list in `index.test.ts`, and the collapse cases in `Delegate.test.ts`.
- `guides/veneer.md`: the § Surface rows, the Collapse fence under § Examples, the Collapse rows in the `### Vocabulary` table, a new `### Components` heading with `#### Collapse`, and the `plugin` row set to `shipped` with the proof file named in its Obligation cell.

## Proof matrix as landed

Each case below names the mutation that turned it red.

**Lifecycle**
- "shows through the transition token and an inline pixel height…": mid-flight classes are `['collapsing']`, the inline height is `40px`, `getAnimations()` returns one height transition, and triggers read `aria-expanded="true"` without `collapsed`. The final state is `['collapse','show']` with the size cleared. The hide mirrors this, and a trigger added after construction is written at the next change. Mutations: show writes no transition token; show writes no pixel size; triggers are read once.
- "sizes the width of a panel carrying the horizontal token…": mutation — the dimension is always height.
- "collapses a trigger naming several panels only when none of them is shown": mutation — the trigger reads its first panel only.
- "hides the open first-level sibling in its parent through the sibling engine and its own events…": asserts the sibling's own hide and hidden events, leaves the nested panel alone, and checks that the owner's `destroy` destroys and restores the sibling. Mutations: the sibling is hidden without its engine and events; the constructed sibling is not destroyed with its owner.
- "hides an open sibling through the collapse a consumer constructed for it…": mutation — the sibling owner is not looked up.

**Cancellation**
- "leaves tokens, size, and triggers untouched when a listener prevents show or hide…": no writes are observed and no completed event fires. Mutation: the return value of `emitEvent` is ignored.
- "resolves false for a call while the panel or an open sibling transitions…": mutation — the mid-flight guard is dropped.

**Focus**
- "keeps focus on the trigger a trusted click activated…" (uses `clickAccessible`): mutation — the panel takes focus.

**Motion**
- "reads the shipped collapse declarations the motion proofs run under": not red-first. The only mutation that would turn it red is an edit to `_collapse.scss`, which is off-limits.
- "dispatches shown after the height transition finishes…": the order is `finished` then `shown`, with no animations left at the event. Mutation: a zero timer replaces the settle.
- "dispatches shown with no animation created under staged reduced motion": mutation — a `transitionend` wait replaces the settle, and the case times out.

**Cleanup**
- "abandons the transition in flight on destruction…": checks the listener targets with `recordListeners`, that the promise resolves `false`, that no `shown` fires, that everything is restored, that `find` returns `undefined`, and that later calls write nothing. Mutation: destruction omits the abort.
- "restores the panel, its size, and its triggers after a completed show, keeping consumer edits": mutation — the triggers are not saved.
- "destroys the collapse when its signal aborts…": mutation — the signal is ignored.

**Events and ownership**
- "dispatches bubbling events, the pre-change ones cancelable, with no detail…": mutations — a completed event is cancelable; the event guard admits every custom event.
- "refuses an invalid host and a second owner…": mutation — the host is not claimed.

**Vocabulary**
- "writes, removes, tests, reads, and matches only the replacing values when every group is replaced": mutations — the classes group is ignored; the attributes group is ignored; the selectors group is ignored.
- "refuses a group value … and a parent attribute naming no element…": mutations — a class replacement is not validated; the parent attribute is not coerced.

**Doors (obligation (c))**
- "stops writing when a reaction to its own write destroys it…": mutation — a write is not followed by a read.
- "writes nothing when a listener to its show event destroys it…": mutation — the show dispatch is not followed by a read.
- "runs one transition and one shown event when a listener to its show event shows it again…": same mutation.
- "resolves false for the call whose transition another call took over during the await…": mutation — the change identity is not read after the await.

**Ownership overlap (obligation (b))**
- "restores a shared trigger to its original when the restoration that saved first destroys the button inside its token write": mutation — the collapse records no trigger token.
- "restores a shared trigger through the restoration that started first when it saved last, keeping the class attribute the button found absent": this pins today's behaviour, `class=""`. Same mutation.

**Delegate (criterion 5 and obligation (a))**
- "toggles each panel a collapse trigger names by its target attribute, its href fragment, and a selector naming several": mutations — no collapse route; no anchor prevention; only the first named panel is driven.
- "routes collapse clicks by a replaced trigger selector alone…": mutations — routing by the default selector; the classes group is ignored.
- "drives each route once per click over one host matching the button and the collapse trigger selectors under nested roots": mutations — the mark ignores the route; the mark is dropped.
- "leaves a panel outside its root alone and releases a removed panel…": mutation — the delegate drives a panel outside its root.
- "drives no route and no panel after a listener destroys the delegate during the click": mutation — the panel loop runs after destruction.
- "refuses a collapse group value…": mutation — the classes are not validated.

**Guards, parser, and barrel**
- `isCollapseEvent`: mutations — a payload is admitted; `detail` is read without containment.
- `parseElement`: mutations — a matched non-HTML element is returned; an element passed in is refused.
- Export list: mutation — the barrel omits `Collapse` and the parser.

## Red-first record

- **Instrument:** `tmp/j-collapse/mutations.py`. It applies one mutation to an owned source file and runs `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:browser <file> -t "<case>"`. It then writes the original bytes back; a sha1 check confirmed each file was restored.
- **Log:** `tmp/j-collapse/mutations-final.log.txt`. Every line reads `exit=1 … 1 failed`.
- **Green lines from the same run:**
  - `Collapse.test.ts | 25 passed (25)`
  - `Delegate.test.ts | 29 passed (29)`
  - `validators.test.ts | 10 passed (10)`
  - `parsers.test.ts | 2 passed (2)`
  - `index.test.ts | 2 passed (2)`
- **Two cases failed their first red-first run.**
  - The show-listener destroy case passed under its mutation. Its `MutationObserver` callback threw away records the observer delivered during the `await`. All four observer readings now go through a recorder, and the case turns red.
  - The first delegate-destroyed mutation (a guard in `#activate`) could not turn anything red. The button route always calls `preventDefault`, so that guard had no observable effect. I deleted it; the guard inside the panel loop covers the case.

## Rulings on the Unknowns

1. **No extra frame.** Right after `show()` returns, `getAnimations()` read in the same task gives one height transition, and `shown` follows `finished`. `settleAnimations` finds the transition after the scroll-size read and size write, with no `requestAnimationFrame`.
2. **Horizontal.** The resolved `classes.horizontal` token switches the sizing to `width`. The default case proves it, and so does the vocabulary case with the replacement token `is-wide`.
3. **Siblings.** The engine calls `Collapse.find(sibling)` and, where that returns nothing, constructs `new Collapse(sibling, { classes, attributes, selectors, parent })` and calls `.hide()` on the result. The constructing collapse owns what it constructs, drops dead entries, and destroys each one it constructed on its own `destroy()`, which restores that sibling. A sibling engine the consumer constructed stays live.
4. **Parser.** No `@orkestrel/contract` reader turns a selector into an element (the readers are `parseArray`, `parseBoolean`, `parseEnum`, `parseInteger`, `parseJSON*`, `parseNull`, `parseNumber`, `parseRecord`, `parseString`). I created `parsers.ts` with `parseElement`. It resolves in the global `document` as Bootstrap's `getElement` does, passes an `HTMLElement` through unchanged, and returns `undefined` for an invalid or unmatched selector, so `resolveOptions` throws `COLLAPSE_OPTION_INVALID`.

**Obligation (b), the overlap precedence.** The first-started rule is wrong when the other snapshot saved first. When a later-saved collapse restores first and destroys an earlier-saved `Button`, the trigger ends with `class=""` although it had no `class` attribute before either engine ran. The restoration whose snapshot saved the target first must write it back, because that snapshot holds the oldest value. This changes `HostSnapshot.#publish`, which this unit doesn't own, so J-BINDER-PRECEDENCE carries it. The sentence patch and my test flip are in the patches section.

**Obligation (c), "taken over".** A call reads as taken over when the panel no longer carries the transition token it wrote, or when another call of the same collapse started a later change (a private `#change` identity). After the pre-change dispatch, the refusals are read again: the panel already in that state, the panel transitioning, or an open sibling transitioning.

**Other choices I made within scope:**
- No `COLLAPSE_DEFAULTS` table. The collapse has no default option value, so an empty table would be dead code under E6. `resolveOptions` receives `{}`.
- `Delegate` stores its collapse group in a private field typed with an inline object type, the same form `HostSnapshot` uses, so no new public type was needed.
- The collapse route marks the trigger under the `Collapse` route key and prevents the default action only for anchors, as Bootstrap does.
- The collapse route skips panels outside the delegate's root, because the observer release would destroy those engines.
- There was no `### Components` heading, so I created it. The Collapse defaults live as rows in the `### Vocabulary` table. `#### Collapse` carries the attribute-to-option-path table and the events table.
- The cascade is read by compiling the shipped `src/styles/components/_collapse.scss?inline`, the real source, rather than a copy or the built file.

## Departures recorded in `#### Collapse`

- Construction writes nothing, and there is no `toggle` option. Bootstrap writes trigger state at construction and toggles when `toggle: true`, its default.
- A trigger naming several panels collapses only when none of them is shown. Bootstrap reads only the first panel.
- A call while an open sibling transitions resolves `false`. Bootstrap's `.collapse.collapsing` query matches nothing.
- A `data-bs-parent` value that names no element throws `COLLAPSE_OPTION_INVALID`. Bootstrap treats it as no parent.
- Destruction abandons a transition in flight and restores the panel, its triggers, and each sibling engine it constructed.
- The delegate leaves a panel outside its root alone.

## Acceptance criteria

The receipt host is Chromium 153.0.8010.12 (`tmp/j-collapse/browser-version.mjs` prints `chromium 153.0.8010.12 from C:\Users\mikes\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe`, the pinned path `configs/browsers.ts` resolves first).

1. `npm run check:src:browser` → `exit=0`. The root `npx tsc --noEmit --project tsconfig.json` also exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` → `Found 0 warnings and 0 errors.` (with `--format=default`), `exit=0`. `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` → `All matched files use the correct format.`, `exit=0`.
3. `npm run test:src:browser` → `Test Files  10 passed (10)` / `Tests  173 passed (173)`, `exit=0`. The export list in `index.test.ts` matches exactly.
4. and 5. are covered by the proof matrix above.
6. The remaining gates:
   - `npm run test:guides` → `Tests  19 passed (19)`, `exit=0`
   - `npm run test:policy` → `Tests  109 passed | 1 skipped (110)`, `exit=0`
   - `npm run test:conformance`, after the permitted `npm run build:src:styles` → `Tests  1 failed | 21 passed (22)`, `exit=1`. The failing case is `runtime boundaries > bundles no forbidden runtime into a published JavaScript entry` with `ENOENT … dist\src\core\index.js`. The Compatibility reader accepts the `shipped` row.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Collapse.ts
?? src/browser/parsers.ts
?? tests/src/browser/Collapse.test.ts
?? tests/src/browser/parsers.test.ts
```
```
 guides/veneer.md                     | 137 +++++++++++++++++++++--
 src/browser/Delegate.ts              | 119 ++++++++++++++++----
 src/browser/constants.ts             |  32 ++++++
 src/browser/index.ts                 |   2 +
 src/browser/validators.ts            |  25 ++++-
 tests/src/browser/Delegate.test.ts   | 205 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/index.test.ts      |   7 ++
 tests/src/browser/validators.test.ts |  38 +++++++
 8 files changed, 531 insertions(+), 34 deletions(-)
```
The untracked new files are `Collapse.ts` (340 lines), `parsers.ts` (28), `Collapse.test.ts` (922), and `parsers.test.ts` (35).

## Shared-file patches

All are in `tmp/j-collapse/patches/` (retained as `j-collapse-patches/`), and `git apply --check tmp/j-collapse/patches/*.diff` passes with them applied together. I checked that they apply; I did not run the gates with them applied.

- **`j-collapse-precedence.diff`** (for J-BINDER-PRECEDENCE): `HostSnapshotInterface.restore`'s remark, "the restoration whose snapshot saved that target first writes it back, because that snapshot recorded the value the target carried before either engine wrote it".
- **`j-collapse-precedence-proof.diff`** (the unit's own test file, landing with the precedence change): the second overlap case retitled "restores a shared trigger to its original when the restoration that saved last destroys the button inside its token write", asserting `trigger.hasAttribute('class')` false.
- **`j-collapse-delegate-prose.diff`**: the `Delegate` class and `DelegateInterface` summaries and the guide's delegation paragraph name every engine the delegate constructs, and the `collapse` option's route.
- **`j-collapse-destroy-summary.diff`**: `CollapseInterface.destroy`'s summary names the sibling collapses it destroys, and the § Methods cell follows.
- **`j-collapse-read-tag.diff`**: the invalid-host tag reading moves from `Button` and `Collapse` into one exported helper `readTag` in `helpers.ts`, with its test, its export-list entry, and its § Surface row.
- **`j-collapse-roadmap.diff`**: the J-ENGINE row's Route cell gains "J-COLLAPSE carries the Collapse engine, its delegate route, and its `plugin` row", the cell width unchanged.

## Deviation state

No stop, and no change to the plan.

- **Conformance.** The one failing case needs `dist/src/core/index.js` from `build:src:core`, which is outside the builds the brief permits. It needs your merged-tree chain.
- **Brief against the tree.**
  - The Proof resolver now accepts a test-file path for a `plugin` row (`scanOracleObligation`'s `isProofFile` branch, `tests/setupServer.ts`), and the guide paragraph after the Compatibility table says the Proof cell names the file. I followed the brief: Proof stays `—` and the path sits in the Obligation cell. The Proof cell isn't in my owned set, and its 21-character column would re-pad the whole table. I shortened the Obligation text so it fits its column.
  - The `accordion` cascade has landed (`src/styles/components/_accordion.scss`). The `parent` proof still uses plain markup, as the brief asks.
- **Findings for later units.**
  - `HostSnapshot` restores an inline property but leaves the empty `style=""` attribute the engine created; it has no counterpart to its `class`-attribute record. Carrier: J-BINDER-PRECEDENCE, same file. My proofs assert `style.length === 0`.
  - `CollapseEventMap` types each event as `CustomEvent<undefined>`, but the platform reads an absent `detail` as `null`. `isCollapseEvent` checks `detail === null`. This is a J-TYPES question.
- **Index edit, undone.** I ran `git add -N` on the four new files, then `git rm --cached` on exactly those paths. They are back to untracked, and no working-tree file changed.

Everything is in `C:/Users/mikes/WebstormProjects/veneer-collapse/tmp/j-collapse/`: the patches under `patches/`, the instruments `mutations.py`, `patches.py`, `guide.py`, `precedence-proof.py`, `browser-version.mjs`, and the mutation logs `mutations*.log.txt`.
