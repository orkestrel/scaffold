<!-- Retained from veneer/tmp/units/u7c-report.md. Native lane: opus on Opus 5 (Agent dispatch, clean context), over Veneer 0cbb563, 2026-09-21; brief u7c-brief.md with the dispatch message u7c-dispatch-message.txt. Complete: the sections family, the specimen table, the projection, the journeys, the capture registry, the consumer case; every gate exit 0 on Chromium and Edge; deviations D1 to D8 settled in scope; four out-of-scope findings carried. -->

# Unit U7c — report

Done. The showcase gained a `sections/` family whose first member renders every Button specimen, the
entry constructs the `Delegate` that drives the `data-bs-toggle` hosts, the journey axis proves
Button's states, access, paint, motion, coordinates, and artifacts on the mounted page and compares
the same markup and actions against the oracle fixture through one projection, and the distribution
stage gained a consumer case that imports `./browser` from the packed archive and constructs a
`Delegate`. The package's surface is unchanged: `.`, `./browser`, `./server`, `./styles`.

Every gate is green on managed Chromium and on Edge. Three controls reddened and were restored
byte-for-byte. Two of the controls' specified forms did not fire as the brief predicted; both are
recorded under § Controls with the reading that replaced them.

## Touched files

| File | Change |
| --- | --- |
| `app/browser/types.ts` | Adds `SectionInterface` and `ButtonSpecimen`; `ShowcaseInterface` unchanged |
| `app/browser/constants.ts` | Adds `BUTTON_COPY`, `BUTTON_GRID`, and the frozen `BUTTON_SPECIMENS` table |
| `app/browser/sections/ButtonSection.ts` | New: renders the specimen grid, owns one engine per plain host, destroys them in construction order |
| `app/browser/sections/index.ts` | New: star-exports `ButtonSection` |
| `app/browser/Showcase.ts` | Holds `readonly #sections`, constructs them in `#mount` after the region, destroys them first |
| `app/browser/main.ts` | Constructs `Delegate` beside `Showcase`, each with the entry comment's reason |
| `app/browser/index.ts` | Exports `./sections/index.js` |
| `app/browser/styles/_shell.scss` | Adds the `.specimens` flex layout in the `shell` layer; paints nothing |
| `tests/setup.ts` | Adds `ButtonReading`, `ButtonProjection`, and `readingToProjection` |
| `tests/setup.test.ts` | Proves the reduction over fixture readings, including a reversed-order reading |
| `tests/setupBrowser.ts` | `mountShowcase` exposes the section and constructs the delegation; adds `resolveSpecimen` and `recordState` |
| `tests/setupBrowser.test.ts` | Export set, the exposed region and delegation, and the two new helpers |
| `tests/app/browser/index.test.ts` | Export set gains `BUTTON_COPY`, `BUTTON_GRID`, `BUTTON_SPECIMENS`, `ButtonSection` |
| `tests/app/browser/Showcase.test.ts` | Section order, specimen rendering, engine release on destruction |
| `tests/app/browser/sections/ButtonSection.test.ts` | New: rendering, nesting, cascade cross-check, ownership partition, release, idempotent destruction |
| `tests/app/browser/integration.test.ts` | The journeys, the capture registry, the oracle comparison |
| `tests/distribution.test.ts` | `bundleEntry` takes a named drive; adds the `./browser` engine consumer case |

Diffstat:

```text
 app/browser/Showcase.ts               |  19 +-
 app/browser/constants.ts              | 225 ++++++++++++++++
 app/browser/index.ts                  |   1 +
 app/browser/main.ts                   |   6 +
 app/browser/styles/_shell.scss        |  10 +
 app/browser/types.ts                  |  26 ++
 tests/app/browser/Showcase.test.ts    |  38 ++-
 tests/app/browser/index.test.ts       |  13 +-
 tests/app/browser/integration.test.ts | 476 +++++++++++++++++++++++++++++++++-
 tests/distribution.test.ts            |  81 +++++-
 tests/setup.test.ts                   |  92 ++++++-
 tests/setup.ts                        |  80 ++++++
 tests/setupBrowser.test.ts            | 106 +++++++-
 tests/setupBrowser.ts                 | 129 ++++++++-
 14 files changed, 1275 insertions(+), 27 deletions(-)
```

The full patch is retained at `tmp/u7c/u7c-diff.patch.txt` (1663 lines) and the status at
`tmp/u7c/u7c-status.txt`.

`git status --porcelain`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/styles/_shell.scss
 M app/browser/types.ts
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
?? app/browser/sections/
?? tests/app/browser/sections/
```

`src/**`, `guides/**`, `package.json`, `package-lock.json`, every `configs/**` file, the vendored
`vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`tests/setupConformance.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`,
`tests/setupListeners.ts`, and `tests/fixtures/**` are untouched.

## The specimen table as rendered

`BUTTON_SPECIMENS` in render order. `tag` names the element, `classes` is the class attribute
verbatim, and a specimen carrying `data-bs-toggle="button"` is left to the delegation while every
other specimen is handed an engine the section constructs.

| Name | Tag | Classes | Other attributes | Owner |
| --- | --- | --- | --- | --- |
| Primary | button | `btn btn-primary` | `type` | engine |
| Secondary | button | `btn btn-secondary` | `type` | engine |
| Tertiary | button | `btn btn-tertiary` | `type` | engine |
| Success | button | `btn btn-success` | `type` | engine |
| Info | button | `btn btn-info` | `type` | engine |
| Warning | button | `btn btn-warning` | `type` | engine |
| Danger | button | `btn btn-danger` | `type` | engine |
| Light | button | `btn btn-light` | `type` | engine |
| Dark | button | `btn btn-dark` | `type` | engine |
| Outline primary | button | `btn btn-outline-primary` | `type` | engine |
| Outline secondary | button | `btn btn-outline-secondary` | `type` | engine |
| Outline tertiary | button | `btn btn-outline-tertiary` | `type` | engine |
| Outline success | button | `btn btn-outline-success` | `type` | engine |
| Outline info | button | `btn btn-outline-info` | `type` | engine |
| Outline warning | button | `btn btn-outline-warning` | `type` | engine |
| Outline danger | button | `btn btn-outline-danger` | `type` | engine |
| Outline light | button | `btn btn-outline-light` | `type` | engine |
| Outline dark | button | `btn btn-outline-dark` | `type` | engine |
| Link | button | `btn btn-link` | `type` | engine |
| Small | button | `btn btn-primary btn-sm` | `type` | engine |
| Large | button | `btn btn-primary btn-lg` | `type` | engine |
| Anchor | a | `btn btn-primary` | `role`, `href`, `data-bs-toggle` | delegation |
| Selected | button | `btn btn-primary active` | `type`, `aria-pressed` | engine |
| Blocked | button | `btn btn-primary` | `type`, `disabled` | engine |
| Toggle | button | `btn btn-primary` | `type`, `data-bs-toggle` | delegation |
| Pressed | button | `btn btn-primary active` | `type`, `data-bs-toggle`, `aria-pressed` | delegation |
| Disabled | a | `btn btn-primary disabled` | `role`, `aria-disabled`, `tabindex`, `href`, `data-bs-toggle` | delegation |
| Label | button | `btn btn-primary` | `type`, `data-bs-toggle` | delegation |

`Toggle`, `Pressed`, and `Disabled` carry the recorded official markup name for name and class for
class. `Label` is the same host with its text inside a `span`, which is the only way to drive a
delegated click that lands on a child and resolves through the published selector; it is kept out of
the oracle comparison because a click landing on the span makes the span the event's target and the
recording's own click counter keys on the host itself. `ButtonSection.test.ts` cross-checks the
table's `btn-*` classes against the class tokens `readCascade()` reports for the loaded cascade, so a
variant the cascade ships and the table omits reddens.

`.specimens` is the grid class, declared in `app/browser/styles/_shell.scss` with `display: flex`,
`flex-wrap: wrap`, `gap: var(--vn-space-4)`, and `align-items: center`, and it paints nothing.

## The projection shape

`tests/setup.ts` declares one reading shape and one reduction. The recorded `after` reading of an
oracle step satisfies `ButtonReading` structurally, so the fixture is reduced by the same function
that reduces the live reading and no second declaration exists.

```ts
interface ButtonReading {
	readonly classes: readonly string[]
	readonly attributes: Readonly<Record<string, string | undefined>>
	readonly mutations: readonly string[]
	readonly clicks: readonly boolean[]
	readonly focus?: string | undefined
	readonly refusal?: string | undefined
}

interface ButtonProjection {
	readonly classes: readonly string[]
	readonly pressed: string | undefined
	readonly mutations: readonly string[]
	readonly clicks: readonly boolean[]
	readonly focus: string | undefined
	readonly refused: boolean
}

function readingToProjection(reading: ButtonReading): ButtonProjection
```

`events` and `identity` are outside the reading: a Veneer host dispatches its own namespaced event
and carries no Bootstrap class. `refused` is a boolean rather than a sentence because the two
harnesses word a refusal differently — the recording carries the browser driver's
`element is not enabled` and the live drive carries the test layer's
`Interactive target "Disabled" is not visible and focus-reachable` — so the comparable fact is that
the action was refused, and each exact sentence is asserted on its own.

## Journey readings

Every reading below is from the `journey:light-1280` project; the other three variants report the
same values for every colour reading and the same projections.

**Delegated click on the label element.** `clickAccessible('button', 'Label')` lands on the `span`:
the document listener recorded `targets === ['span']` and `cancelled === [true]`, the host announced
`pressed=true`, and a second click returned it to `pressed=false` with `targets === ['span','span']`.

**Keyboard.** `traverseAccessible('Toggle')` then `pressKeys(' ')` reached `pressed=true`;
`pressKeys('{Enter}')` returned it to `pressed=false`. `traverseAccessible('Anchor')` then
`pressKeys('{Enter}')` reached `pressed=true` with `class="btn btn-primary active"`.

**Refusal.** `readStates` reports `['disabled']` for both the native `disabled` button (`Blocked`)
and the `aria-disabled` anchor (`Disabled`) — the installed vocabulary is `disabled`, not
`unavailable`. Both refuse with the exact sentence
`Interactive target "<name>" is not visible and focus-reachable`, and the recorded drive against
`Disabled` produced `mutations === []` and `clicks === []`.

**Covered.** With a fixed cover over the `Toggle` box, `readHit(host)` returns the cover and
`holdAccessible('button', 'Toggle')` rejects with
`Interactive target "Toggle" did not enter the pressed state`; the host still carried no
`aria-pressed`. After the cover is removed `readHit(host)` returns the host and `clickAccessible`
reaches `pressed=true`.

**Focus ring.** Every specimen is reached by Tab, because a programmatic `focus()` call does not earn
`:focus-visible`. `readRing` returns `2.2797472825343092` for every one of the 26 painted specimens in
light mode and `2.358684054793209` for `Primary` in dark mode. The equality across variants is
asserted: the mixin paints the shared focus token rather than the variant's own fill.

**Contrast.** `buildContrast(4.5)` straddles the bar, so the reader is compositing. Every reading is
finite and above 1. The readings below 4.5 are pinned as a list rather than claimed away:

```text
dark|Anchor|rest            dark|Outline secondary|rest   dark|Pressed|rest
dark|Blocked|disabled       dark|Outline success|rest     dark|Primary|rest
dark|Label|rest             dark|Outline tertiary|rest    dark|Selected|rest
dark|Large|rest             dark|Outline warning|rest     dark|Small|rest
dark|Outline danger|rest    dark|Pressed|pressed          dark|Toggle|rest
dark|Outline dark|rest                                    light|Outline light|rest
```

Named values: `light|Primary|rest` is `7.13190205699499` and `dark|Primary|rest` is
`2.585598980085744`; `light|Outline light|rest` is `1.0541115652738484` and `dark|Outline dark|rest`
is `1.1481990321883393`; `light|Selected|rest` is `9.468838584302402`. A disabled host's dimming is
`opacity: 0.65`, read as a resolved value because element opacity is outside what a contrast reader
composes, so `Blocked` reads the same ratio as its enabled twin.

**Hover and active.** `Primary` reads `oklch(0.48 0.255 264)` at rest,
`color(srgb 0.0288046 0.226321 0.817248)` hovered, and `color(srgb 0.0263751 0.203249 0.734892)`
held in light mode; `oklch(0.7 0.15 233)`, `color(srgb 0.0248835 0.714208 0.933359)`, and
`color(srgb 0.135692 0.746684 0.940932)` in dark. Releasing the pointer returns it to the rest value
and clears `:active`.

**Motion.** `transition-duration` resolves to `0.15s, 0.15s, 0.15s, 0.15s, 0.15s` with motion on and
`0s` under `stageMedia({ motion: false })`, and `releaseMedia` restores it. The installed
`MediaOptions` stages `print` and `motion` only, so no journey stages forced colours and the
guide's open forced-colors row stands.

**Oracle.** Every recorded step is driven and compared, in the recording's own order, on both motion
axes. Compared, none skipped:

```text
button.initial  button.click.toggle  button.click.release  button.keyboard.space
button.keyboard.enter  button.hover  button.pointer.hold  button.pointer.release
button.pressed.initial  button.pressed.click  button.disabled.click
```

and the same names under `button.reduced.`. The fixture's own step membership for each motion marker
is asserted equal to what was driven, so a recorded step nothing drives reddens rather than passing
unlooked-at. `oracle.excluded` is empty, so the skipped list is empty and that emptiness is asserted
against the fixture rather than against a list of our own.

## Capture registry and paths

`STATES`:

```text
home                      home-dark
button-primary-rest       button-primary-rest-dark
button-primary-pressed    button-primary-pressed-dark
button-primary-focus      button-primary-focus-dark
button-primary-hover      button-primary-hover-dark
button-primary-active     button-primary-active-dark
```

`PLACED` equals `STATES` in every run, the filename proof and the placement proof are always on, and
the capture-run membership proof asserts the paths written equal `<state>--<variant>.png` for the
run's own variant. `CAPTURE=1 npm run test:journey` wrote 48 frames under `tmp/capture/states/`:

```text
button-primary-active--{dark,light}-{390,1280}.png
button-primary-active-dark--{dark,light}-{390,1280}.png
button-primary-focus--{dark,light}-{390,1280}.png
button-primary-focus-dark--{dark,light}-{390,1280}.png
button-primary-hover--{dark,light}-{390,1280}.png
button-primary-hover-dark--{dark,light}-{390,1280}.png
button-primary-pressed--{dark,light}-{390,1280}.png
button-primary-pressed-dark--{dark,light}-{390,1280}.png
button-primary-rest--{dark,light}-{390,1280}.png
button-primary-rest-dark--{dark,light}-{390,1280}.png
home--{dark,light}-{390,1280}.png
home-dark--{dark,light}-{390,1280}.png
```

Each state is photographed at the scope its own paint needs, and each scope was measured:

- `rest`, `pressed`, and `focus` are page frames. An element frame crops to the border box, so the
  focus ring painted outside it was cut away and the frame was indistinguishable from the rest frame.
- `hover` and `active` are element frames. Staging the pane for a page frame moved the pointer off
  the specimen and `matches(':hover')` read `false` after the shot; the element frame keeps the
  pointer on it and both journeys read the state again after the shot and assert it still held.
- No `disabled` frame and no `outline` frame are registered. Every frame renders the whole section,
  which carries both disabled hosts and every outline variant, so each would duplicate the rest
  frame.

Frames inspected: `button-primary-rest--light-1280.png` renders the full section in light mode;
`button-primary-rest-dark--dark-390.png` renders it in dark mode at the narrow viewport;
`button-primary-focus--light-1280.png` shows the focus halo on `Primary`;
`button-primary-pressed--light-1280.png` shows `Toggle` carrying the active fill;
`button-primary-hover--light-1280.png` and `button-primary-active--light-1280.png` are the
73×36 element frames.

## Controls

Digests before planting: `tests/setup.ts`
`7c0e3be83e63afa7567fc1aaabc6836f03b8bf6720f84fb8b6f7f348d5e5005f`, `tests/setupBrowser.ts`
`259486e847f64a96d90bd219f5d7737b10c7d80d329e99ca03ffacc182a3b1d6`,
`tests/app/browser/integration.test.ts`
`943d2c13f924d2bef563dc318423f5be41613fe3300aef5094a5ce0dcd13fa29`.

**PLANT-RED.** Added a journey asserting `waitForState('button', 'Primary', 'pressed=true')` on a
specimen nothing drives.

- Command: `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280`
- Red: `Tests  1 failed | 21 passed (22)`, with
  `Error: Condition ""Primary" to announce "pressed=true"" did not hold within 1000ms (waited 1002.2000000029802ms) (last states: [])`
- Artifacts retained while red: `tmp/u7c/plant-red/light-1280.txt`, carrying the accessibility tree
  of the mounted section and the journal step
  `{"action":"plant","trigger":"Primary","result":"pressed=true"}`, and the 12 frames the run wrote,
  copied to `tmp/u7c/plant-red/states/`.
- Restored: digest back to `943d2c13…`.

**PLANT-PLACE.** Removed `PLACED.add('button-primary-focus-dark')`.

- Command: `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280`
- Red: `Tests  1 failed | 19 passed | 1 skipped (21)`, failing
  `portfolio > expands unique filenames and places every registered state from a journey` with the
  missing state named in the set difference.
- Restored: digest back to `943d2c13…`.

**PLANT-PROJECT.** The brief's form — reversing the mutation order inside the projection helper —
left the oracle comparison **green**, because one reducer produces both sides of that comparison and
a symmetric change cancels. Run: `Tests  20 passed | 1 skipped (21)`. That is a real finding about
where the comparison's correctness rests, so the control was run in two parts:

- The specified plant, against the reducer's own proof. Command: `npm run test:setup`. Red:
  `Tests  3 failed | 113 passed (116)`, failing
  `reduces an activation to its classes, pressed state, mutations, clicks, and focus`,
  `drops the recording members Veneer cannot answer for`, and
  `distinguishes a reading whose mutation order is reversed`. Restored: `tests/setup.ts` digest back
  to `7c0e3be8…`.
- A one-sided plant, reversing `mutations` in `recordState` so only the live side moves. Command:
  `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280`.
  Red: `Tests  2 failed | 18 passed | 1 skipped (21)`, failing
  `matches the official recording step for step on the same markup` and
  `matches the official recording step for step under reduced motion`. Restored:
  `tests/setupBrowser.ts` digest back to `259486e8…`.

All three files carry their pre-plant digests; `tests/app/browser/integration.test.ts` moved to
`f3468031e53de9986ae7fb99bc4f383557705d0893f4e847fb753d3e10a34741` afterwards through one comment
correction made after the controls ran, and the scoped gates were re-run over it.

## Gates

Managed Chromium, final lines:

| Command | Result |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 771ms on 97 files using 16 threads.` |
| `npm run lint:check` | no output; exit 0 |
| `npm run check` | no output; exit 0 |
| `npm run build` | `dist/app/browser/assets/index-CN-letQO.js    8.65 kB │ gzip: 2.48 kB` / `✓ built in 377ms` |
| `npm run test:setup` | `Test Files  3 passed (3)` / `Tests  116 passed (116)` |
| `npm run test:setup:browser` | `Test Files  1 passed (1)` / `Tests  21 passed (21)` |
| `npm run test:app:browser` | `Test Files  3 passed (3)` / `Tests  10 passed (10)` |
| `npm run test:journey` | `Test Files  4 passed (4)` / `Tests  80 passed | 4 skipped (84)` |
| `CAPTURE=1 npm run test:journey` | `Test Files  4 passed (4)` / `Tests  84 passed (84)` |
| `npm run test:distribution` | `Test Files  1 passed (1)` / `Tests  12 passed | 4 skipped (16)` |
| `npm run test:policy` | `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)` |
| `npm run test:guides` | `Test Files  1 passed (1)` / `Tests  18 passed (18)` |
| `npm test` | every project green: 51, 104, 10, 80+4 skipped, 109+1 skipped, 173+1 skipped, 116, 21, 8, 18 |

Edge (`PLAYWRIGHT_CHANNEL=msedge`), final lines:

| Command | Result |
| --- | --- |
| `npm run test:journey` | `Test Files  4 passed (4)` / `Tests  80 passed | 4 skipped (84)` |
| `npm run test:app:browser` | `Test Files  3 passed (3)` / `Tests  10 passed (10)` |
| `npm run test:setup:browser` | `Test Files  1 passed (1)` / `Tests  21 passed (21)` |

The 4 skipped journey cases are the `it.runIf(CAPTURE)` membership proof, one per variant project.
The 4 skipped distribution cases are `runIf` misses: the root entry's browser drives and the
`./browser` entry's Node drives.

The consumer case ran from the packed archive rather than skipping:

```text
✓ installed entry ./browser > drives the published button engine and its delegation in a real browser [requires the registry] 232ms
```

It imports `Button` and `Delegate` from the installed `./browser` entry, constructs a `Delegate` over
a detached root, toggles a `data-bs-toggle` host through a dispatched click, toggles a plain host
through an engine of its own, and destroys both. Its reading is asserted exactly:

```text
['rest=null', 'pressed=true', 'active=true', 'engine=true', 'released=null', 'restored=false']
```

## Guide bounds for U7e

1. § Showcase: "The private application renders the Veneer heading, the Dark mode button, and a
   Showcase region." The shell now also renders a `Buttons` region carrying every specimen in the
   preceding table, and `app/browser/main.ts` constructs a `Delegate` over the document beside the
   `Showcase`.
2. § Showcase: the shell stylesheet now declares one layout class, `.specimens`, in its own `shell`
   layer. It paints nothing, so the sentence about the shell owning no paint still holds.
3. § Tests: the proof list gains `tests/app/browser/sections/ButtonSection.test.ts` for the section,
   and the helper proofs now cover the reduction in `tests/setup.test.ts` and the specimen resolver
   and state recorder in `tests/setupBrowser.test.ts`.
4. § Compatibility: every recorded Button step now has a live Veneer counterpart driven from the
   journey on both motion axes, not only an official recording compared against its fixture. The
   Proof column's meaning is unchanged; the guide can say where the Veneer side is driven.
5. § Compatibility: the standing note that Button's forced-colors reading remains open is confirmed
   at run time — the installed `MediaOptions` declares `print` and `motion` only.
6. § Tokens or § Departures: the focus ring reaches `2.2797472825343092` in light mode and
   `2.358684054793209` in dark against the canvas, below the 3:1 non-text contrast minimum, and it is
   the same ratio for every variant because `--vn-focus-color` derives from the primary role alone.
7. § Tokens or § Departures: the composed text contrast readings listed under § Journey readings sit
   below 4.5, in particular every `btn-primary` host in dark mode (`2.585598980085744`) and
   `btn-outline-light` in light mode (`1.0541115652738484`). The journey pins the set, so the guide
   can record it rather than claim AA across the board.
8. § Tokens: a disabled host is dimmed with element `opacity: 0.65`, which a contrast reader does not
   composite, so its ratio equals its enabled twin's and the dimming is proven as a resolved value.
9. § Showcase or the ledger's Artifacts row: the capture registry and the per-state frame scopes
   under § Capture registry and paths.
10. § Examples: the guide has no fence showing a consumer's entry constructing a `Delegate`. The
    showcase's `main.ts` is now that pattern, and the distribution consumer case drives it.

## Deviations

Each was settled inside the owned scope and is recorded here rather than raised as a stop.

**D1 — the projection helpers are split across two setup modules.** The brief's item 5 places both a
host reader and an oracle reducer in `tests/setup.ts`. `.claude/rules/tests.md` § Shared test
infrastructure makes `tests/setup.ts` host-independent, and the brief's own acceptance criterion 4
requires the proof to run in the Node `setup` project, which cannot drive a DOM reader. The host
reader is therefore `recordState` in `tests/setupBrowser.ts` and the reducer is
`readingToProjection` in `tests/setup.ts`. One reducer serves both readings because the recorded
`after` reading satisfies `ButtonReading` structurally; a second reducer would be a duplicate of it.

**D2 — `tests/setupBrowser.ts` gained more than the section.** Beyond exposing the region,
`mountShowcase` constructs the `Delegate` the showcase's entry constructs, because a journey driving
the rendered surface has to reach the same delegated activation a consumer's page reaches and
importing the barrel registers no listener. `resolveSpecimen` was extracted there because both
`ButtonSection.test.ts` and the journeys need to hold a reference to a specimen the acting resolvers
refuse, and a copy in each file would be a duplicate helper.

**D3 — the brief's named commands do not carry the journeys.** The Measurements row names
`npm run test:app:browser` as the command running the `journey`, `refusal`, `matrix`, and `capture`
families. The `app:browser` project excludes `tests/app/browser/integration.test.ts`; those families
run under `npm run test:journey` (`configs/app/vite.journey.config.ts`), and the capture selection is
the `CAPTURE` environment value the root configuration reads. Both were run on both engines, along
with `npm run test:setup:browser`, which the gate list omits although this unit owns
`tests/setupBrowser.test.ts`.

**D4 — the controls' restore proof is a digest comparison.** The brief asks for an empty
`git diff --stat -- <file>`, which assumes the file is otherwise unmodified; each control file
carries this unit's own changes. SHA-256 digests taken before each plant and after each restore are
recorded under § Controls and are the stricter comparison.

**D5 — PLANT-PROJECT as specified does not red the oracle comparison.** Recorded under § Controls
with the reading, and closed by running the specified plant against the reducer's own proof and an
added one-sided plant against the comparison.

**D6 — the capture registry differs from the brief's list.** `button-primary-disabled` and
`button-outline-rest` are not registered, and the frame scope differs per state. Both decisions are
measured; the readings are under § Capture registry and paths. This sits inside the deviation
contract's "capture state names within the `button-{variant}-{state}` form".

**D7 — the `Anchor` specimen carries `data-bs-toggle` in the table.** The keyboard journey first
added the attribute to a rendered anchor and focused it programmatically, and the delegated toggle
did not fire. Declaring the attribute in the table and reaching the host through
`traverseAccessible` reaches `pressed=true`, and it also keeps the section's ownership partition
readable from the table alone.

**D8 — contrast is pinned as a measurement, not as a bar every variant clears.** The shipped
calibration leaves the readings listed under § Journey readings below 4.5, so a blanket AA assertion
would be false. The set is pinned instead, and a variant leaving it or joining it reddens.

## Findings carried out of scope

Each is outside this unit's owned files and is recorded against the capability that owns it.

1. **`@orkestrel/test`, `captureFrame` with `element`.** A specimen sitting beyond roughly 900 px
   horizontally in the tester returns an opaque white frame of the correct dimensions at a
   1280-wide variant, while the same specimen photographs correctly at 390. Measured on
   `button-primary-pressed--light-1280.png` (75×35, 141 bytes, white) against
   `button-primary-pressed--light-390.png` (74×36, 942 bytes, correct).
2. **`@orkestrel/test`, `captureFrame` without `element`.** Staging the pane for a page frame clears
   `:hover` on the specimen under the pointer; an element-scoped frame preserves it.
3. **Veneer paint calibration (`src/styles`, U7a's subject).** The focus ring reaches roughly 2.28
   against the canvas, below the 3:1 non-text minimum, and every button variant shares it. Every
   `btn-primary` host in dark mode reaches 2.59 composed text contrast, and `btn-outline-light` in
   light mode reaches 1.05.
4. **`readStates` vocabulary.** A disabled control is announced as `disabled`, not `unavailable`.
