<!-- opus on native Opus 5, native subagent, clean context, sole writer in the Veneer checkout.
Dispatched from the CL10 landing 0e0b055. Retained 2026-09-22 from the agent's returned result.
Its brief is cl11-brief.md, amended after cl11-scope-read-report.md held it; its measurements are
cl11-terrain.md. Its rendered evidence is cl11-diff.patch.txt and cl11-status.txt. -->

# Unit CL11 report — journeys and captures

Every obligation closed. The gate chain is green on both engines, the distribution project is green
on its own reading, and the capture run shoots every registered state with no blank frame.

## 1. The states registered, the states rejected, and the ruling behind each

`CASCADE_KEYS` in `tests/setup.ts` is the new table, and `CASCADE_STATES` is derived from its `state`
column, so a key the journey reaches and a state the portfolio registers cannot drift apart.

| State                    | Specimen            | Element         | Property read              |
| ------------------------ | ------------------- | --------------- | -------------------------- |
| `container-capped-rest`  | `Capped container`  | `.container`    | `max-inline-size`          |
| `row-numbered-rest`      | `Numbered columns`  | `.row`          | `display`                  |
| `table-base-rest`        | `Base`              | `.table`        | `border-block-end-color`   |
| `link-role-rest`         | `Role links`        | `.link-primary` | `color`                    |

Each one takes a dark twin from the portfolio's own derivation, so `PORTFOLIO_STATES` grew by eight
rows and the capture run now writes 80 frames over the four variants.

Those are the keys the design row names for the consumer page — container, row, table, link — so the
portfolio and that page answer for one family rather than two.

### Rejected, with the ruling

- **A page frame for any of these keys.** Rejected under the registry's duplication ruling, on a
  measurement: `home--light-1280.png` and `button-primary-rest--light-1280.png` were byte-identical
  (`md5 9ebb8538c679c2cc788a32305c1e98dd`). A page frame covers the whole document, so one shot of the
  resting page is one image whatever state name it carries.
- **A hover or focus frame for any of these keys.** The showcase renders each key at rest and the
  journey reads each key at rest, so a pointer frame would claim a paint no journey here drives. The
  Button states differ because the pointer journey drives hover and active and reads each state back
  after its own shot.
- **A second state for one specimen** (a fluid container beside the capped one, a gutter row beside
  the numbered one). Same duplication ruling: a second frame of the same markup at rest. The
  `tests/setup.test.ts` case now refuses two rows naming one specimen or one selector.

### The placement ruling I measured

The registry's existing rulings did not cover these frames, so I measured, and the doc block on
`CASCADE_KEYS` records what I measured.

**An element frame taken where the showcase renders these specimens comes back blank white.** The
four specimens sit at y ≈ 3528–4716 CSS pixels in a document 8636 pixels tall at 390 and 8204 at
1280. Every one of them photographed blank at the 390-wide variants, and the inline role link
photographed blank at the 1280-wide ones too. Blank frames were 125–571 bytes; the same frames now
carry 717–5393 bytes.

I probed the strategies before choosing: a plain element frame, a frame after `scrollIntoView`, a
frame after `stagePane` at the viewport size, a frame of the specimen wrapper, and a frame of a copy
put at the document's start. Only the last works at both widths. The probe's frames are retained
under `tmp/probe/*.png` (`plain--`, `scrolled--`, `staged--`, `wrapper--`, `table--`,
`lifted-table--`, `lifted-link--`), and the probe case itself was removed from the journey.

So the journey copies the specimen, prepends the copy to the document, shoots the copy, and removes
it. The copy is not assumed to paint what the original paints: the case reads each key's resolved
property on the showcase's own specimen and again on the copy, and `expect([...framed])
.toStrictEqual([...rendered])` has to hold before anything else is asserted.

## 2. Which journey reaches each new state

One case reaches all eight: `journey > renders the container, the row, the table, and the link the
cascade ships, in both modes` in `tests/app/browser/integration.test.ts`. It applies each registered
mode, walks `CASCADE_KEYS`, and places `<state>` under the light mode and `<state>-dark` under the
dark one. `portfolio > expands unique filenames and places every registered state from a journey`
already compares `PLACED` against `new Set(PORTFOLIO_STATES)` in both directions, so a state declared
and never placed, and a state placed and never declared, each redden there. The filename expansion
case now loops `[...BUTTON_STATES, ...CASCADE_STATES]`.

Both registered widths are covered because every variant project runs every case: the four journey
projects fix 1280 and 390, and each places all eight states at its own width.

The case's own assertions are readings rather than placements:

- the row resolves `display: flex` in both modes and the container's cap is the same string in both,
  so a layout rule the theme reached would redden;
- the table's `border-block-end-color` and the link's `color` differ between the modes, which is what
  earns each key its dark twin — a pair of frames whose paint never moved would be one frame
  registered twice.

## 3. The consumer page

**Shape: a second drive, not its own markup.** `BROWSER_DRIVES` in `tests/distribution.test.ts` gained
a `cascade` drive beside `exports` and `engine`, and `CASCADE_MARKUP` is the page's body, written in
by the drive. The page's own `BROWSER_PAGE` constant is shared by every drive and already links the
packed stylesheet through the installed package's `styles` export; giving one drive its own page would
fork that constant and the bundler root for nothing, and the existing `engine` drive already proves
the build-the-DOM shape works.

Every key is read beside an unclassed twin of its own tag, so a page that resolved none of the packed
cascade reports one value on both sides of every pair.

| Reading     | Value              | What it is                                        |
| ----------- | ------------------ | ------------------------------------------------- |
| `container` | `1140px`           | `.container` cap at the page's 1280 width         |
| `fluid`     | `none`             | `.container-fluid`, the uncapped twin             |
| `gutter`    | `12px`             | `.container` inline padding, half the gutter token |
| `row`       | `flex`             | `.row`                                            |
| `plain`     | `block`            | an unclassed `div` holding the same children      |
| `table`     | `top`              | `.table` vertical alignment                       |
| `bare`      | `baseline`         | an unclassed `table`                              |
| `cell`      | `8px`              | `.table` cell inline padding                      |
| `bare-cell` | `12px`             | an unclassed cell, padded by the elements layer   |
| `link`      | `rgb(8, 65, 234)`  | `.link-primary`                                   |
| `danger`    | `rgb(193, 0, 7)`   | `.link-danger`                                    |
| `token`     | `8, 65, 234`       | `--vn-color-primary-rgb` on `:root`               |
| `width`     | `1280`             | the page's own client width                       |

The link is compared against the token triplet the packed theme layer declares rather than against a
literal, so the reading answers to the shipped token.

**The case can fail.** I emptied the stylesheet the cascade page loads and re-ran it: every reading
collapsed to the browser's own defaults — `container` and `fluid` both `none`, `row` and `plain` both
`block`, `table` and `bare` both `baseline`, `cell` and `bare-cell` both `1px`, `link` and `danger`
both `rgb(0, 0, 238)`, `token` empty — and the case reddened on the first key. The mutation was
removed and the project is green again.

One control assumption of mine was wrong and the run corrected it: a bare `<td>` is not unstyled,
because the packed cascade's elements layer pads it to `12px`. The pair now reads apart (`8px` against
`12px`) rather than against a zero that does not exist.

## 4. The four carried findings

Each fix was proven by mutation: the command, the red, and the green are recorded per finding. The
command in every case is

`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "<case>"`

### Finding 1 — the breakpoint visitor's bare restore

`visitBreakpoint` in `tests/setupBrowser.ts` now follows `holdOraclePointer`'s pattern: the reading's
failure is caught, the restore is attempted inside a nested `try`, and a refused restore raises the
reading's own sentence carrying the refusal as its `cause`. A successful path restores after the
reading and returns it.

The installed `page.viewport` verb refuses nothing a case can reach — reading its implementation, it
posts to the orchestrator and rejects only where the tester's own frame id is unknown, and it ignores
the width and height values entirely. So the visitor took a third parameter, `resize: ViewportHandler`,
defaulting to `page.viewport`, and the case supplies a real resizer that resizes for the visit and
refuses the restore. That is the missing seam `.claude/rules/tests.md` § Untestable usually means
missing seam names, and the collaborator it injects is a real one rather than a stand-in for
project-owned behaviour.

- Case: `breakpoint viewport restoration > keeps the reading failure when the restore is refused, and
  carries the refusal as its cause`.
- Red, against the bare `finally`: `1 failed | 39 skipped (40)` —
  `AssertionError: expected Error: The tester refused the restoring v… to match object { …(2) }`.
- Green, with the fix: `40 passed (40)`.

### Finding 2a — the pointer hold's pressed-state miss where the release succeeds

No code change: this was uncovered rather than wrong. A cover mounted over the Toggle host takes the
press, so the host never enters its pressed state while the hold itself succeeds and `releasePointer`
succeeds after it. The case asserts the message, that `cause` is `undefined`, and that the property is
absent — which is what tells this half from the neighbouring case, where the release is refused too
and the failure carries a protocol error as its cause.

- Case: `browser setup > preserves the pressed-state failure on its own when the pointer release
  succeeds`.
- Red, against a rethrow mutated to always attach a cause: `1 failed | 39 skipped (40)` —
  `AssertionError: expected Error: Interactive target "Toggle" did no… to be undefined`.
- Green, unmutated: `40 passed (40)`.

### Finding 2b — the pointer hold's unreachable-after-scrolling refusal

No code change. A host fixed to the viewport at `inset-inline-start: -400px` has the viewport as its
containing block, so no scroll moves it, and nothing about reachability refuses it: the case asserts
`isReachable` accepts it and `isOutsideViewport` refuses its rectangle, which is why the refusal
raised is the hold's own.

- Case: `browser setup > refuses a hold on a host scrolling cannot bring into the viewport`.
- Red, with the refusal removed from `holdOraclePointer`: `1 failed | 39 skipped (40)` —
  `AssertionError: expected a thrown error to be Error: Interactive target "Parked" is unr…`.
- Green, with the refusal in place: `40 passed (40)`.

### Finding 3 — the button resolver's verb prefix

`resolveButton` is now `readButton`. `.claude/rules/names.md` § Standalone helpers fixes the prefixes:
`resolve*` picks the effective value from options and defaults, which this never did, and `read*`
obtains a value from a live host object and returns it or throws, which is exactly what it does. The
rule's § Fixed lifecycle vocabulary table carries no verb for this, so the prefix list is what governs.
`readOracleButton` keeps its own name and the pair now reads find-then-check in one vocabulary.

I verified the consumer set before renaming. `grep -rn "resolveButton"` over the tree returned
`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, and
`tests/app/browser/sections/ButtonSection.test.ts` — the owned set the brief grants, and nothing else.
No guide names it. A case title in `tests/setupBrowser.test.ts` that said "resolves a button" now says
"reads a button", so one term serves the concept.

The fleet surface rule inspects `tests/setup*.ts` exports against every hosted guide's Surface
section. `readButton`, `readSpecimen`, `SPECIMEN_ATTRIBUTE`, `ViewportHandler`, `CascadeKey`,
`CASCADE_KEYS`, and `CASCADE_STATES` return nothing from a grep over
`node_modules/@orkestrel/scaffold/dist/host/guides`, and `npm run test:policy` is green inside
`npm test`.

### Finding 4 — the root-bounded reader's first match

**Closed as a defect, not stated as a bound.** `readButton` collects every match in the root and
refuses when more than one announces the name, naming the count. A reading that silently took document
order made every assertion after it a statement about whichever host the section rendered first, and
nothing reported the ambiguity. Closing it costs nothing: the showcase's specimen names are unique, and
every gate stayed green.

`readSpecimen` carries the same refusal for the same reason, because the journey now addresses
specimens by label.

- Case: `browser setup > refuses a name two buttons in one root announce, and answers for each root on
  its own`. It appends a cloned Toggle to the Button region, reads the refusal, then moves the clone to
  a neighbouring root and reads each root on its own — so the refusal is about one root holding two
  rather than about the page holding two.
- Red, with the refusal removed: `1 failed | 39 skipped (40)` —
  `AssertionError: expected function to throw an error, but it didn't`.
- Green, with the refusal in place: `40 passed (40)`.
- The duplicate-label half is `browser setup > reads one labelled specimen, and refuses an absent label
  and a duplicated one`.

## 5. The planted-failure proof

**Retention exists today; nothing had to be built.** The journey's `afterEach` stops the journal and
pushes its steps and output into `ARTIFACT`, and `afterAll` writes `tmp/capture/<variant>.txt` through
the runner's `writeFile` command. Vitest runs both hooks after a failing case, so the artifacts survive
a red run.

- **Plant.** In `tests/app/browser/integration.test.ts`, the new cascade case's
  `expect(rendered.get(`${LIGHT}|row-numbered-rest`)).toBe('flex')` became `.toBe('grid')`.
- **Red.** `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot
  --project journey:light-1280` exited 1 with `1 failed | 21 passed | 1 skipped (23)` and
  `AssertionError: expected 'flex' to be 'grid'`.
- **Retained.** `tmp/capture/light-1280.txt` was rewritten at the red run's own timestamp
  (`2026-09-22 01:53:05`, 28556 bytes, 703 lines). It carries the accessibility tree taken on arrival,
  13 journal entries with recorded steps such as
  `"steps":[{"action":"arrive","trigger":"Showcase","result":"Explore the color mode with the Dark mode control."}]`,
  and the failing case's own tree artifact
  `{"reading":"cascade keys","readings":[["light-1280|container-capped-rest","1140px"…`. The failing
  case's journal entry is `"steps":[]`, because the assertion ran before its `JOURNAL.record` line.
- **Removal.** The single changed literal was put back to `'flex'`; `grep -n "toBe('grid')"` over the
  file returns nothing.
- **Green.** The same command exited 0 with `22 passed | 1 skipped (23)`.

## 6. The Unknowns

1. **Which content and layout states earn a frame.** The four in § 1, each as an element frame of a
   lifted copy. Page frames and pointer frames were rejected on the rulings stated there.
2. **Whether the root-bounded reader's first match is a defect or a bound.** A defect. Closed in
   `readButton` and in `readSpecimen`, with a case for each.
3. **Whether the consumer page needs its own markup or a second drive.** A second drive. The page
   constant and the stylesheet link are shared by every drive, and the existing `engine` drive already
   builds its own DOM.
4. **Whether a planted failing journey retains its journal and tree artifacts today.** It does.
   Measured in § 5.

The brief settled that the `prove` tool is unreachable from this context. **No receipt was issued.**
Every claim here rests on an executed reading, and no test result is represented as one.

## 7. Gates

Chromium, in order:

| Gate                       | Exit | Result                                     |
| -------------------------- | ---- | ------------------------------------------ |
| `npm run format:check`     | 0    | `All matched files use the correct format.` |
| `npm run lint:check`       | 0    | no diagnostics                             |
| `npm run check`            | 0    | five projects, no diagnostics              |
| `npm run build`            | 0    | `✓ built in 590ms`                        |
| `npm test`                 | 0    | per-project lines following                |
| `npm run test:distribution` | 0   | `13 passed | 4 skipped (17)`               |

`npm test` per project, in run order: `51 passed (51)`; `411 passed (411)`; `26 passed (26)`;
`88 passed | 4 skipped (92)`; `109 passed | 1 skipped (110)`; `173 passed | 1 skipped (174)`;
`156 passed (156)`; `40 passed (40)`; `10 passed (10)`; `18 passed (18)`.

The four skipped journey rows are the capture-only case in each variant project. `npm test` does not
run the distribution project, so its reading is the separate row above; the four skips there are the
`runIf` rows for entries that publish no such face.

Edge, through `PLAYWRIGHT_CHANNEL=msedge`:

| Project                        | Exit | Result                       |
| ------------------------------ | ---- | ---------------------------- |
| `npm run test:src:styles`      | 0    | `411 passed (411)`           |
| `npm run test:setup:browser`   | 0    | `40 passed (40)`             |
| `npm run test:app`             | 0    | `26 passed (26)`             |
| `npm run test:journey`         | 0    | `88 passed | 4 skipped (92)` |

Capture run, `CAPTURE=1 npm run test:journey`: exit 0, `92 passed (92)`, 80 frames under
`tmp/capture/states`. No frame is under 400 bytes; the smallest is the 717-byte role link and the
largest the 5393-byte dark table. I read frames back by eye at both widths and in both modes —
`table-base-rest--light-1280`, `table-base-rest-dark--light-1280`, `row-numbered-rest--light-390`,
`container-capped-rest--light-1280`, `link-role-rest-dark--dark-390` — and each shows its own key.

Logs retained in this checkout: `tmp/cl11-npm-test.log.txt`, `tmp/cl11-distribution.log.txt`,
`tmp/cl11-journey.log.txt`, `tmp/cl11-capture.log.txt`, `tmp/cl11-setup.log.txt`,
`tmp/cl11-setupbrowser.log.txt`, `tmp/cl11-edge-styles.log.txt`,
`tmp/cl11-edge-setupbrowser.log.txt`, `tmp/cl11-edge-appbrowser.log.txt`,
`tmp/cl11-edge-journey.log.txt`.

## 8. The tree

```text
 tests/app/browser/integration.test.ts            | 128 ++++++++++++++---
 tests/app/browser/sections/ButtonSection.test.ts |  14 +-
 tests/distribution.test.ts                       | 132 ++++++++++++++++-
 tests/setup.test.ts                              |  35 ++++-
 tests/setup.ts                                   |  85 +++++++++++
 tests/setupBrowser.test.ts                       | 176 +++++++++++++++++++++--
 tests/setupBrowser.ts                            | 112 ++++++++++++---
 7 files changed, 616 insertions(+), 66 deletions(-)
```

```text
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/ButtonSection.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

`git status --porcelain --untracked-files=all` lists exactly those seven files and nothing else; `tmp/`
and `dist/` are ignored, so neither appears. Every file is one this brief owns. `ButtonSection.test.ts`
carries the rename's call sites and one case title, and nothing else.

## 9. What I did not close

- **`button-primary-rest` duplicates `home`.** `home--light-1280.png` and
  `button-primary-rest--light-1280.png` are byte-identical, as are the 390 pair; the dark twins pair
  the same way. Both are page frames of the resting page in one mode, so the registry's own
  duplication ruling reaches them. It is a Button-family row and this unit does not own that subject,
  so I registered the finding rather than striking the state: striking it would also remove the
  `-rest` placements the Button journey makes and the "resting render" the design row names. This is
  the measurement behind the ruling I applied to my own states, so the two readings are the same one.
- **No permanent guard against a blank frame.** I tried to adopt the blank-frame measurement as a case
  in the capture-only journey, reading each placed frame back with the installed `readFrame` export and
  setting a state's frame beside its dark twin. `readFrame` resolves its path against a different base
  than the portfolio's `directory` does: the path `../../../tmp/capture/states/<file>.png` that
  `PORTFOLIO.place` writes resolves inside `readFrame` to `C:\Users\tmp\capture\states\<file>.png` and
  the dev server refuses it with `Access denied`. I removed the attempt rather than ship a guard I
  could not make resolve. The blank-frame failure is held off by the design instead — the journey
  compares the copy's reading against the showcase specimen's before placing — and the measurement is
  recorded in the `CASCADE_KEYS` doc block. A successor unit that wants the guard needs the base
  `readFrame` resolves against.
- **Why an element frame goes blank is not explained.** I measured the condition and the cure, not the
  mechanism. The runner scales the tester pane by
  `min(1, paneWidth / width, paneHeight / height)` and the capture staging unscales it, and the tester
  iframe measured 156.88 × 98.05 at (275, 110) in the top-level page at the 1280 variant. I could not
  reduce the blank frames to that scaling from the readings I have, and nothing in this unit depends on
  the answer.
