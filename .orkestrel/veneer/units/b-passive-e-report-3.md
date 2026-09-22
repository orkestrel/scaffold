# B-PASSIVE-E-3 report — the flat-fill frame, and the round-2 leftovers

Every finding this round carries is closed, and every acceptance criterion is met. The portfolio
guard reads each declared region against the frame's own floor, so a placeholder bar's flat fill is
paint and a region carrying the floor alone is blank; every `glowing-placeholder` frame is accepted
in all four variants. No deviation stopped the unit; § Deviations records the choices the deviation
contract left to this unit and one observation about the frames that report no floor.

## Finding 1 — D21, the guard

**Change.** `tests/setupBrowser.ts`: `measureVariation(encoded, region, floor?)` takes the color a
region showing nothing carries and measures the region against it, `rgb(r, g, b)` as the installed
frame reader spells a frame's own floor. Omitting the floor keeps the former reading, the region
measured against its own first pixel. A floor `parseColor` does not read is refused with
`The frame floor "<value>" names no readable color`. The alpha is scaled onto the pixels' 0-255
range before the comparison, because the parsed color reports it on 0-1.

The shape is an extension rather than a second reader: the pair would have decoded the same frame
twice and duplicated the decode, the clip, and the refusal, and the extension puts the whole
reading in the reader with one call at the case. See § Deviations.

`tests/app/browser/integration.test.ts`, the portfolio case
`reads every frame this variant left in the portfolio directory inside its declared region`: the
reading passes `reading.floor`, the assertion message reads `Blank frame region: ${path}`, and a
comment states the rule — a subject covering its box in one flat fill is unvaried against itself
and differs from the floor at every pixel, a region carrying the floor alone shows nothing and
stays refused, and a frame reporting no floor falls back to the region's own variation.

`tests/setupBrowser.test.ts` gains two cases. `separates a region painting the frame floor from one
painting another color` paints two frames in the browser's own PNG writer that differ in the bar's
color alone — white on white, and `rgb(144, 148, 157)` on white, the grey the light-1280 glow frame
actually carries — and reads each region twice:

```text
measureVariation(empty, region)          → 0
measureVariation(painted, region)        → 0
measureVariation(empty, region, floor)   → 0
measureVariation(painted, region, floor) → 1
```

The first pair is what makes the second pair evidence: neither region varies against its own first
pixel, so the floor is the whole of the difference between a blank region and a painted one.
`refuses a floor naming no color the parser reads` holds the refusal.

**Mutation.** `tests/setupBrowser.ts`, the reference selection in `measureVariation`:

```ts
	const reference =
		named === undefined
			? pixels.slice(0, 4)
			: Uint8ClampedArray.of(named[0], named[1], named[2], Math.round(named[3] * 255))
```

replaced with `const reference = pixels.slice(0, 4)`, which is the reader treating every region that
paints one color as blank.

Red, with the mutation applied:

```text
npm run test:setup:browser
→ FAIL |setup:browser (chromium)| tests/setupBrowser.test.ts:209:2 > browser setup >
  separates a region painting the frame floor from one painting another color
  AssertionError: expected +0 to be 1 // Object.is equality
→ Test Files 1 failed (1); Tests 1 failed | 55 passed (56)
```

Green, after reverting by the exact reverse edit:

```text
npm run test:setup:browser
→ Test Files 1 passed (1); Tests 56 passed (56)
```

The revert is byte-exact: `sha256sum tests/setupBrowser.ts` reads
`4dc64fc763ded95d6ea256f8fb19cfc1d577b62ac130a652218f04c38b75a751` before the mutation and after the
revert.

## Finding 2 — the frame

Every capture variant passes with the round-2 registry row unchanged, and every
`glowing-placeholder` frame is accepted:

```text
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-1280*' --testTimeout=120000 → exit 0; Tests 25 passed (25)
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-390*'  --testTimeout=120000 → exit 0; Tests 25 passed (25)
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:dark-1280*'  --testTimeout=120000 → exit 0; Tests 25 passed (25)
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:dark-390*'   --testTimeout=120000 → exit 0; Tests 25 passed (25)
```

The glow frames the runs recorded, read out of each variant's journey artifact:

```text
glowing-placeholder--light-1280.png  1280x21  floor rgb(255, 255, 255)  region {x:0,y:4,w:746.65625,h:14}   variation 1
glowing-placeholder--light-390.png    390x21  floor rgb(255, 255, 255)  region {x:0,y:4,w:227.5,h:14}       variation 1
glowing-placeholder--dark-1280.png   1280x21  floor rgb(20, 25, 30)     region {x:0,y:4,w:746.65625,h:14}   variation 1
glowing-placeholder--dark-390.png     390x21  floor rgb(20, 25, 30)     region {x:0,y:4,w:227.5,h:14}       variation 1
```

Variation 1 is the whole region differing from the floor, which is what a flat grey bar on a white
or a dark page is.

The placeholder frames each variant writes, from `tmp/capture/states/`:

| Scenario              | Frames                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `placeholder-ramp`    | `placeholder-ramp--light-1280.png`, `placeholder-ramp--light-390.png`, `placeholder-ramp--dark-1280.png`, `placeholder-ramp--dark-390.png` |
| `glowing-placeholder` | `glowing-placeholder--light-1280.png`, `glowing-placeholder--light-390.png`, `glowing-placeholder--dark-1280.png`, `glowing-placeholder--dark-390.png` |
| `waving-placeholder`  | `waving-placeholder--light-1280.png`, `waving-placeholder--light-390.png`, `waving-placeholder--dark-1280.png`, `waving-placeholder--dark-390.png` |
| `button-placeholder`  | `button-placeholder--light-1280.png`, `button-placeholder--light-390.png`, `button-placeholder--dark-1280.png`, `button-placeholder--dark-390.png` |

Each scenario also writes its `--<variant>-accessibility.txt` tree beside the frame.

## Finding 3 — the placeholder mode case

**Change.** `tests/src/styles/components/placeholder.test.ts`, the case
`takes its fill from the text of whichever mode it renders in`, takes the shape round 2 gave the
spinner's. Each mode is read twice. The inherited reading keeps the host's text on
`var(--vn-text-body-base)` and asserts what it asserted before. The moved reading shifts the mode
scope's own `color` to `rgb(10, 20, 30)`, a value no rule of this cascade writes, and requires the
placeholder's text and its fill to follow it. Assertions beside them require neither mode's body
text to resolve to that value, so the moved reading reads the inherited text rather than the token
beneath it. The move is written on the `[data-bs-theme]` scope, because `scene.mount` returns a
wrapper whose child carries the inline declaration. The case's doc comment states the mutation it
catches.

**Mutation.** `src/styles/components/_placeholder.scss`, the `.placeholder` rule:
`background-color: currentcolor` replaced with `background-color: var(--vn-text-body-base)`.

The hole, measured with the round-2 case body restored and the mutation applied:

```text
npm run test:src:styles -- tests/src/styles/components/placeholder.test.ts -t 'takes its fill'
→ Test Files 1 passed (1); Tests 1 passed | 10 skipped (11)
```

Red, with the rework in place and the same mutation applied:

```text
npm run test:src:styles -- tests/src/styles/components/placeholder.test.ts -t 'takes its fill'
→ FAIL tests/src/styles/components/placeholder.test.ts:190:2 >
  placeholder classes > takes its fill from the text of whichever mode it renders in
  AssertionError: expected false to be true // Object.is equality
  ❯ tests/src/styles/components/placeholder.test.ts:227:49
→ Test Files 1 failed (1); Tests 1 failed | 10 skipped (11)
```

Line 227 is `expect(matchesColor(moved.fill, independent)).toBe(true)`, the reading the rework adds.

Green, after reverting the mutation:

```text
npm run test:src:styles -- tests/src/styles/components/placeholder.test.ts -t 'takes its fill'
→ Test Files 1 passed (1); Tests 1 passed | 10 skipped (11)
```

The restored case body is byte-exact in both directions:
`sha256sum tests/src/styles/components/placeholder.test.ts` reads
`dfa486bb74f5992dcb677836ba3383d400fb7831d22399c0524e6e02d949de87` before the temporary restore and
after it.

## Finding 4 — the partial's comment

**Change.** `src/styles/components/_placeholder.scss`, the `.placeholder-wave` comment: "the build's
targets resolve them" becomes "the managed Chromium and Edge receipts this cascade is proved on
resolve them", the exact patch the round-2 report carries.

The compiled cascade is unchanged. `npm run build:src` before the patch and after it both write
`dist/src/styles/index.css` at 92.73 kB with the digest
`df780eb8c9c313be7b6ddef91aedc2f21f1519033daa1cc437c6aa0ea0a2dc4e`.

## Finding 5 — the report's patch body

**Change.** `tmp/units/b-passive-e-report.md:667`, inside the `vite.config.ts` patch body:
`15.9s once the passive` becomes `15.9s after the passive`, so the line a later unit applies
verbatim carries no banned-sense term.

## Touched files

| File                                              | Change                                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `tests/setupBrowser.ts`                           | `measureVariation` takes an optional floor and measures the region against it                |
| `tests/setupBrowser.test.ts`                      | Cases for the floor reading both ways and for a floor the parser refuses                     |
| `tests/app/browser/integration.test.ts`           | The portfolio case reads against the frame's floor and names a blank region in its message   |
| `tests/src/styles/components/placeholder.test.ts` | The mode case reads each mode twice against an independent text color                        |
| `src/styles/components/_placeholder.scss`         | The `.placeholder-wave` comment rests on the managed Chromium and Edge receipts              |
| `tmp/units/b-passive-e-report.md`                 | The `vite.config.ts` patch body reads `after the passive`                                    |

`git diff --stat` over this round's tracked writes:

```text
 tests/app/browser/integration.test.ts | 16 +++++++++--
 tests/setupBrowser.test.ts            | 42 +++++++++++++++++++++++++++++
 tests/setupBrowser.ts                 | 51 +++++++++++++++++++++++++----------
 3 files changed, 93 insertions(+), 16 deletions(-)
```

`tests/src/styles/components/placeholder.test.ts` and `src/styles/components/_placeholder.scss` are
untracked E files, so that stat does not carry them.

## Gates

Run on 2026-09-22 with npm 11.19.1 and Node v22.22.2, under a host load average between 5 and 9.

| Command                                                                                                                    | Exit | Reading                                           |
| -------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------------------------------------- |
| `npm run format:check`                                                                                                     | 0    | All matched files use the correct format           |
| `npm run lint:check`                                                                                                       | 0    | No diagnostic                                      |
| `npm run check`                                                                                                            | 0    | Root, `src`, and `app` projects clean              |
| `npm run build:src`                                                                                                        | 0    | `dist/src/styles/index.css` 92.73 kB               |
| `npm run test:setup:browser`                                                                                               | 0    | Test Files 1 passed (1); Tests 56 passed (56)      |
| `npm run test:src:styles`                                                                                                  | 0    | Test Files 61 passed (61); Tests 464 passed (464)  |
| `npm run test:guides`                                                                                                      | 0    | Test Files 1 passed (1); Tests 18 passed (18)      |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-1280*' --testTimeout=120000` | 0    | Test Files 1 passed (1); Tests 25 passed (25)      |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-390*' --testTimeout=120000`  | 0    | Test Files 1 passed (1); Tests 25 passed (25)      |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:dark-1280*' --testTimeout=120000`  | 0    | Test Files 1 passed (1); Tests 25 passed (25)      |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:dark-390*' --testTimeout=120000`   | 0    | Test Files 1 passed (1); Tests 25 passed (25)      |

Observations, not criteria:

| Command                | Exit | Reading                                                                                    |
| ---------------------- | ---- | -------------------------------------------------------------------------------------------- |
| `npm run test:journey` | 0    | Test Files 4 passed (4); Tests 100 passed (100) — every variant reads its frames back        |
| `npm run test:policy`  | 0    | Test Files 1 passed (1); Tests 109 passed \| 1 skipped (110)                                 |
| `npm run test:setup`   | 1    | Tests 2 failed \| 161 passed (163) — the standing blockers D2 and D3, unchanged              |
| `npm run test:app`     | 1    | Tests 1 failed \| 31 passed (32) — the standing blocker D4, unchanged                        |

`test:setup` fails on `tests/setupServer.test.ts > skips engine and CSS obligations whose Proof cell
is a dash` (D2) and `tests/setupStyles.test.ts > carries no shared written declaration block across
style partials` (D3). `test:app` fails on `tests/app/browser/Showcase.test.ts > mounts its sections
after the region and destroys them before removing the nodes` (D4). Those are the only reds, and
each is a file this unit does not own.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/PlaceholderSection.ts
?? app/browser/sections/ProgressSection.ts
?? app/browser/sections/SpinnerSection.ts
?? src/styles/components/_placeholder.scss
?? src/styles/components/_progress.scss
?? src/styles/components/_spinner.scss
?? tests/app/browser/sections/PlaceholderSection.test.ts
?? tests/app/browser/sections/ProgressSection.test.ts
?? tests/app/browser/sections/SpinnerSection.test.ts
?? tests/src/styles/components/placeholder.test.ts
?? tests/src/styles/components/progress.test.ts
?? tests/src/styles/components/spinner.test.ts
```

That is the round-2 set plus `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, with no other
path added.

## The partial's SHA-256

```text
a5cd0b6b1e823cefd47eabfe19484d0623f250e19c0e66dc3538b39e915ce204  at round 2's landing
c76fa3b82b291fb2ee0773178aaf6a3625761833e88934b939277a6a62742106  after finding 4's comment patch
76398cb11ede515d5bf0fddc95fa8b2084a8aade3b5f0971f04c0cc9bdafd292  with finding 3's mutation planted
c76fa3b82b291fb2ee0773178aaf6a3625761833e88934b939277a6a62742106  after the reverse edit, and at this report
```

## Deviations

No conflict stopped this unit. The following choices are the ones the deviation contract left here,
recorded with what settled them.

### The reader's shape — `measureVariation` extended rather than paired

The brief left the shape open between a second exported reader and a richer return. A second reader
would decode the same frame a second time and repeat the decode, the clip, and the clipped-to-nothing
refusal, which the duplicate-helper law in `.claude/rules/tests.md` refuses; a richer return would
rename the export, and the rename rewrites the import line in
`tests/app/browser/integration.test.ts`, outside the portfolio case this unit owns and against the
family record's append-only rule for shared files. The optional reference color is neither: it is
data for the same operation, which `.claude/rules/names.md` keeps as a parameter rather than
splitting, and the whole reading stays in the reader.

### The in-memory frames — painted in the case, encoded by the browser

The two frames are painted on an `OffscreenCanvas` inside the case and encoded through
`convertToBlob`, so the bytes the reader decodes are a real PNG rather than an assembled literal.
They are built in one loop that varies the bar's color alone, which is the only difference the
reading is about, so no fixture factory is declared and no export is added for them. No retained
control carries a flat fill of a color other than its own floor, which is why the controls could not
serve.

### Case titles and the comment block

`separates a region painting the frame floor from one painting another color` and `refuses a floor
naming no color the parser reads` name what each case proves. In
`tests/src/styles/components/placeholder.test.ts` the reworked case keeps one doc comment, restated
for the two readings, rather than a second block beside the round-2 one.

## Observation — the frames that report no floor

The `button-placeholder` frames record no floor in any variant: their bottom row paints several
colors, so the installed frame reading reports none, and the portfolio case falls back to the
region's own variation for them (`0.9983941117430579` at 1280, `0.9947252747252747` at 390). Every
other registered scenario reports a floor. A later change that makes a subject's own fill equal its
frame's floor would be refused for the right reason; a subject whose frame reports no floor is held
to the older uniform-region rule, which is the reading this unit's default preserves.
