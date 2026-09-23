# Unit B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2 — report

Every acceptance criterion holds on the final tree. The geometry gate admits exactly the
`input-group-valid-tooltip` and `input-group-invalid-tooltip` keys, in light and dark. Deviation
state: none. The recorded choices are in § Decisions, and one of them reads criterion 3 differently
from the brief's wording.

## Diff summary against round 1

`git status --porcelain` (the same owned files as round 1, and no others):

```text
 M app/browser/constants.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/InputGroupSection.test.ts
 M tests/setup.ts
```

`git diff d02bd46 --stat` (rounds 1 and 2 together):

```text
 app/browser/constants.ts                           | 52 ++++++++++--
 tests/app/browser/integration.test.ts              | 75 +++++++++++++++---
 .../app/browser/sections/InputGroupSection.test.ts | 62 ++++++++++++---
 tests/setup.ts                                     | 92 +++++++++++++---------
 4 files changed, 219 insertions(+), 62 deletions(-)
```

Round 2's changes over round 1, by file:

- `tests/setup.ts`:
  - The `CascadeKey` remarks drop "one role link" and use the journey comment's wording: "shooting
    the selector's own element would crop the specimen to that element, with none of the background
    the paint is read against."
  - The `CASCADE_KEYS` doc block takes the "names what sets its specimen apart" sentence, "The
    placement rulings…", the rewritten hanging-key paragraph, and the untallied spinner sentence
    with "file" after the token. The 2026-09-22 date stays.
- `tests/app/browser/integration.test.ts`:
  - The rest case's opening comment reads "one class answers for several specimens: one table can
    render several containers", the doc block's words.
  - The class-list gate `copy.matches('.valid-tooltip, .invalid-tooltip')` is replaced by the
    geometry gate `box.top >= host.getBoundingClientRect().bottom`, where `host` is
    `requireValue(copy.parentElement, …)`.
  - The `requireValue` on the button-led group stays, and its message names the hanging selector.
  - `floor` is renamed `limit` in the `hung` type, the setter, and the filter.
  - `hit` is `string | undefined`: `hit === copy ? 'tooltip' : hit?.outerHTML.slice(0, 80)`. The
    `'nothing'` sentinel is gone.
  - The comment before the key and filter assertions says that the hanging keys are the tooltip keys
    and that an undefined `hit` reddens.
  - The focus comment reads "…onto the control's trailing border, so the two share one line, and
    the button's border paints that line until the control is lifted past it", rewrapped.
- `app/browser/constants.ts`:
  - The `INPUT_GROUP_COPY` paragraph ends "…the feedback a failing group reports under its row, and
    the tooltip a passing or a failing group hangs over the row after it."
  - The `INPUT_GROUP_SPECIMENS` doc block calls the button-led group "a button-led group" and "the
    room", and it no longer says "second".
- `tests/app/browser/sections/InputGroupSection.test.ts`: The comments and the destructured
  bindings drop the position names. `[first, second]` becomes `[validated, room]`, and the comments
  say "validated group" and "room".

## Criteria

1. **Pass.** The `tests/setup.ts` doc block carries each sentence the criterion quotes.
   - `sed -n 340,395p tests/setup.ts` shows the "names what sets its specimen apart — a modifier, a
     state, or the host its specimen renders the element in — which is also what that specimen
     exists to show." sentence and "The placement rulings were measured rather than assumed…".
   - The hanging-key paragraph opens "A key the release positions below its host's box is framed
     with the in-flow content its specimen renders beneath it." It states the gate's predicate: "The
     journey reads a key as hanging when the key's top sits at or below the bottom edge of its host,
     the element that holds it".
   - The spinner sentence reads "The showcase renders the grow spinners and the
     `tests/src/styles/components/spinner.test.ts` file reads their running timelines".
   - `grep -n 2026-09-22 tests/setup.ts` returns line 366.
2. **Pass.** In `integration.test.ts`, the gate is geometric and the `requireValue` on the
   button-led group stays.
   - `floor` is renamed `limit`. `hit` is `string | undefined`, and the filter still requires
     `reading.hit !== 'tooltip'`, which an undefined hit fails.
   - The focus comment carries the criterion's text.
   - The comment that named "the Layout table alone" and the `CascadeKey` remarks that named "one
     role link" now state their rationale in the words given in the preceding diff summary.
   - Admitted set: see § Geometry gate reading.
3. **Pass, read through the constant** (see § Decisions). The paragraph ends as the criterion
   requires. `InputGroupSection.test.ts` asserts the rendered `<p>` against
   `INPUT_GROUP_COPY.paragraph`. The doc block names the room by name.
4. **Pass.**
   - `npx oxfmt --config .oxfmtrc.json --check` over the owned files: "All matched files use the
     correct format.", `oxfmt exit=0`.
   - `npm run format:check`: "All matched files use the correct format.", `format:check exit=0`.
   - `npm run lint:check`: `lint:check exit=0`.
   - `npm run check`: `check exit=0`.
   - I re-ran all of these after the final edit.
5. **Pass.**
   - `npm run test:setup`: `Tests  243 passed (243)`, `test:setup exit=0`.
   - `npm run test:app`: `Test Files  27 passed (27)`, `Tests  63 passed (63)`, `test:app exit=0`.
   - Both runs came before the final edit, a comment in `integration.test.ts`. That file belongs to
     the journey configuration, which neither project runs.
6. **Pass.** `npm run test:journey` returned `Test Files  4 passed (4)`, `Tests  152 passed (152)`,
   `test:journey exit=0`. That run was on the final tree, after a comment-only edit that landed while
   an earlier run was in progress. The earlier run also passed with the same counts.

Observation: I took no `CAPTURE=1` run, because the gate changes no frame. The gate reads geometry
and records readings. It does not change what `FRAMES.place` receives.

## Geometry gate reading

I took a throwaway reading of `box.top - host.getBoundingClientRect().bottom` for every
`CASCADE_KEYS` row, in light and dark. The command was
`npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 -t "reads every resting cascade key"`,
with a temporary `console.log` that I removed afterwards. The readings:

- **Admitted:** `input-group-valid-tooltip` and `input-group-invalid-tooltip` at +1.59 px in light
  and dark. That value is the tooltip's `margin-top: 0.1rem`.
- **Closest excluded:** the progress rows at −16.00 px.
- **Floating labels:** `form-floating-filled`, `-disabled`, and `-plaintext` at −64.80 px, and
  `form-floating-empty`, `-textarea`, and `-select` at −58.00 px.
- **Feedback rows:** `valid-feedback` and `invalid-feedback` at −18.38 px.

A mutation proves that the gate can fail. I added `style="top: 0"` to the tooltip markup in
`app/browser/constants.ts` and ran the same command, which exited 1:
`AssertionError: expected [] to strictly equal [ …(4) ]` on the `hung` key assertion. The gate
admitted no key, and the exact-key assertion reddened. I then restored the file from its copy.

## Installed primitives

I read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` for a point-in-rectangle export,
and also searched the `core` and `server` declarations. No export tests a point inside a rectangle.

- `isOutsideViewport` tests a whole rectangle against the viewport.
- `readHit` hit-tests an element's centre, and its remarks separate its question from
  `isOutsideViewport`.
- `checkBounds` validates wait budgets.

The inline `shared` comparison stays.

## Decisions

- **Criterion 3's "asserts that string".** Every section test, `InputGroupSection.test.ts`
  included, asserts `region.querySelector('p')?.textContent` against its `*_COPY.paragraph`
  constant. The search was `grep -rn "querySelector('p')" tests/app/browser/sections/`. I kept that
  pattern rather than pinning a literal, which would copy the constant and break the pattern its
  sibling tests share. The test asserts the rendered paragraph equals the constant, and the constant
  carries the criterion's string.
- **Which "rewritten sentence" each rationale aligns to.** The criterion names one doc block
  sentence for the addressing rationale and the crop rationale. I aligned each to the wording it
  already had elsewhere.
  - The addressing rationale uses the `CASCADE_KEYS` doc block's "one table can render several
    containers".
  - The crop rationale uses the journey comment's round-1 wording, "crop the specimen to that
    element, with none of the background the paint is read against". The `CASCADE_KEYS` doc block
    has no crop sentence.
- **Position names beyond the quoted site.** I removed "second group" from the section test's
  comments and bindings too, because they name the same group by position.
- **The gate's predicate shape.** The host is `copy.parentElement`, through `requireValue` so the
  type narrows without an assertion. The comparison is `>=`, which is the criterion's "at or below".

## Weakest claims

- The admitted-set reading comes from the `journey:light-390` project alone. The full
  `npm run test:journey` passes across its variants, and its exact-key assertion reddens if any
  other key is admitted, so the other variants are covered by that assertion rather than by a gap
  reading.
- The ARTIFACT record `JSON.stringify` drops `hit` when it is `undefined`, so a failing
  no-element hit shows as a missing field in the artifact. I did not run a no-element case, so how
  the filter assertion's failure output shows an undefined `hit` is unchecked.
- The prose changes (criteria 1 to 3) have no failing-first test. They are wording findings, and
  only the reviewer lane can judge them.
