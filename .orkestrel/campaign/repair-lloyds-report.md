# Unit R-lloyds — the three surface readings, repaired and read green by the suite's own instruments

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\lloyds`. Every item in the
brief is done. Nothing committed, nothing installed, no off-limits file edited, the lockfile pair
untouched. No shared-file patch is owed.

## Headline

All three readings are closed and each was proved by turning the assertion red first. The document's
height converges at every viewport, so both 390 capture runs write their whole registry. The focus
ring reads 17.298 on the primary command and on the armed Delete in every declared variant, against
1.307 to 2.751 before. A confirmed removal lands focus on `Add building`, and the journey reads it
with `readFocus` rather than walking Tab to it. One expectation moved further than the brief named:
the `delete-confirming` frame ends on the surface's background under the platform's own dim, so the
capture proof composites that dim instead of comparing against the body's background alone.

## Repair 1 — the document's height

`app/browser/App.vue`. The shell claims the viewport once, on the row that holds the blotter and the
desk, and the desk grows into what the blotter leaves.

| Element   | Before                                           | After                                                                 |
| --------- | ------------------------------------------------ | --------------------------------------------------------------------- |
| Container | `container-fluid p-0 min-vh-100 bg-body-tertiary` | `container-fluid p-0 bg-body-tertiary`                                |
| Row       | `row g-0 min-vh-100`                             | `row g-0 min-vh-100 flex-column flex-nowrap flex-lg-row`              |
| Desk      | `col-12 col-lg-9 col-xl-10 bg-body min-vh-100`   | `col-12 col-lg-9 col-xl-10 bg-body flex-grow-1 flex-lg-grow-0`        |

Below `lg` the row runs as a column, the blotter keeps its own height, and the desk takes the rest
through `flex-grow-1`. From `lg` up the row runs as a row and each column stretches to the row's
height, which is the layout that already stood. No magic number subtracts the bar; the layout does.
Every class added is defined in the shipped cascade, which the census proof re-reads each run
(`readCascade` reports `.flex-column`, `.flex-nowrap`, `.flex-lg-row`, `.flex-grow-1`, and
`.flex-lg-grow-0`; the authored-class reading rose from 205 to 207 at 1280 and from 200 to 202 at
390, over a floor of 150).

### The reading, before and after

`measureContent`'s own formula, reproduced against the built surface by `tmp/repair/height.mjs`,
which then restages the pane at the reading and reads again — the loop `captureFrame` runs.

| Case                | Before                                                                | After                                     |
| ------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| 1280×800, empty     | pane 800 → content 800                                                | pane 800 → content 800, settles at once   |
| 1280×800, populated | pane 800 → content 800                                                | pane 800 → content 800, settles at once   |
| 390×844, empty      | pane 844 → 956, pane 1200 → 1242, pane 1600 → 1642: pane + 42, always | pane 844 → 956, pane 956 → 956, settles   |
| 390×844, populated  | the same divergence                                                   | pane 844 → 1371, pane 1371 → 1371, settles |

The before rows at 390 are the journey unit's recorded probe; the after rows are
`tmp/repair/height-after.txt`. At 390 the desk's own content is taller than an 844 pane — the empty
schedule's start panel measures 914 px under the 42 px bar — so the content equals the pane at the
pane the loop stages rather than at the declared one. That is convergence, which is what the loop
needs and what the divergent shell could never reach. At 1280 the content equals the declared pane
and the loop never runs.

The desk still reaches the bottom of the document at 390: `main` bottom 956 equals the shell's
bottom 956 with an empty schedule and 1371 equals 1371 with a populated one, so the frame's last row
is the desk's own `bg-body` rather than the tertiary shell behind it.

### Failing first

`tmp/repair/mutate-shell.sh` gives the desk back its own `min-vh-100` and films the 390 shell, then
restores the line from a copy taken first and films it again. Command:
`VITE_VARIANT=light-390 VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts`.

```text
mutate-shell-red.txt   exit=1   3 failed | 14 passed (17)
  Error: Capture frame at ../../../tmp/capture/states/schedule-empty--light-390.png
    never settled after 4 restagings: 1376 over a 1334 pane
mutate-shell-green.txt exit=0   17 passed (17)
```

The committed baseline reads the same way before any edit: `tmp/repair/baseline-capture-light-390.txt`,
`VITE_VARIANT=light-390 VITE_CAPTURE=true npm run test:app:browser`, exit 1, 3 failed | 285 passed
(288), on the same refusal.

## Repair 2 — the focus ring

`app/browser/styles/main.scss` authors the rule under `inspection.md` § When an authored rule is
already earned. The rule, its instrument, its bar, and the values read are recorded in the comment
above it and in `guides/README.md` § The focus ring.

```scss
.btn:focus-visible,
.btn-close:focus-visible,
.form-check-input:focus-visible,
.form-control:focus-visible,
.form-select:focus-visible,
.nav-link:focus-visible {
	outline: 0.125rem solid var(--bs-emphasis-color);
}
```

**The instrument.** `readRing` from `@orkestrel/test/browser`, which the matrix family runs, and
`tmp/repair/ring.mjs`, which reproduces its formula against the built surface: the outline colour
where the cascade paints one, the first colour in the box-shadow, each blended onto the backdrop
`readBackdrop` resolves from the control's own parent onto the runner's canvas, and the strongest
WCAG ratio of the two. Focus arrives by Tab from a real click, so `:focus-visible` is what the
browser matched. The probe reproduces the suite's own numbers exactly (`Add building` 1.307 light,
2.751 dark; armed Delete 1.669), which is what makes it evidence about the same thing.

**The bar.** 3:1, the non-text bar for chrome that carries state.

**The cause.** One vendor recipe: `.btn:focus-visible` (`halfmoon.css:5363`),
`.form-check-input:focus` (`:4592`), and `.nav-link:focus-visible` (`:6362`) each write `outline: 0`
and paint a translucent `box-shadow` in a tone close to the surface it sits on.

### The readings per control and variant

From `tmp/repair/ring-before.txt` and `tmp/repair/ring-after.txt`. The backdrop each control is
measured against is in parentheses.

| Control                          | light-1280      | dark-1280       | light-390       | dark-390        |
| -------------------------------- | --------------- | --------------- | --------------- | --------------- |
| `Add building` (rail)            | 1.307 → 17.298  | 2.751 → 17.298  | 1.307 → 17.298  | 2.751 → 17.298  |
| `Import buildings from CSV`      | 1.307 → 17.298  | 2.751 → 17.298  | 1.307 → 17.298  | 2.751 → 17.298  |
| Armed `Delete selected buildings` | 1.669 → 17.298 | 1.669 → 17.298  | 1.669 → 17.298  | 1.669 → 17.298  |
| `Keep selection`                 | 2.758 → 19.925  | 2.683 → 16.122  | 2.758 → 19.925  | 2.683 → 16.122  |
| `Delete selection`               | 2.247 → 19.925  | 1.621 → 16.122  | 2.247 → 19.925  | 1.621 → 16.122  |
| The row's selection checkbox     | 1.686 → 21.000  | 1.423 → 15.415  | 1.686 → 21.000  | 1.423 → 15.415  |
| A ledger field                   | 1.740 → 19.762  | 1.267 → 13.514  | none → 21.000   | none → 15.415   |
| A ledger select                  | 1.740 → 19.762  | 1.267 → 13.514  | 1.740 → 19.762  | 1.267 → 13.514  |
| A desk tab                       | 2.800 → 21.000  | 2.634 → 15.415  | 2.800 → 21.000  | 2.634 → 15.415  |
| The first-run dialog's close     | 1.827 → —       | —               | —               | —               |

`none` is `readRing` reporting nothing measurable: at 390 the ledger field's focus style repaints
only its own fill, which the instrument declines to call focus chrome. The rule gives that control
a measurable line at both widths. The first-run dialog's close control is reachable only where the
reference opens, which is `md` and up; the reading is from `tmp/repair/ring-before-btn-close.txt`
at light-1280, and the rule covers it on that reading alone — recorded under **Claims not closed**.

The skip link is outside the rule: `readRing` reports nothing for it because the browser paints its
own automatic ring there, which the layer treats as guaranteed against any backdrop.

### The suite's own reading per variant

From `tmp/journeys/<variant>.txt`, written by the run that took it.

| Variant    | `Add building` ring | Armed Delete ring | Authored classes |
| ---------- | ------------------- | ----------------- | ---------------- |
| light-1280 | 17.298              | 17.298            | 207              |
| dark-1280  | 17.298              | 17.298            | 207              |
| light-390  | 17.298              | 17.298            | 202              |
| dark-390   | 17.298              | 17.298            | 202              |

### Failing first

`tmp/repair/mutate.sh` drops the outline's width and style, leaving only its colour, then restores
the file from a copy taken first.

```text
mutate-ring-red.txt   exit=1   1 failed | 15 passed | 1 skipped (17)
  AssertionError: expected 1.3074800062694034 to be greater than or equal to 3
mutate-ring-green.txt exit=0   16 passed | 1 skipped (17)
```

## Repair 3 — focus after a confirmed removal

`app/browser/components/Toolbar.vue`. The Add command takes a template ref, and `erase` sends focus
to it after the removal settles.

```ts
async function erase(): Promise<void> {
	const doomed = [...selection.value]
	confirming.value = false
	await remove(doomed)
	await nextTick()
	adder.value?.focus()
}
```

Before: `document.activeElement` is `BODY` after `Delete selection`, and the journey proved a forward
Tab walk reached the command again. After: focus is on `Add building` and the journey reads it.

The suite's proof now waits for focus to land, reads it through `readFocus`, and holds the focused
element's identity at both widths:

```ts
await waitForCondition(
	`focus lands on ${ADD_COMMAND}`,
	() => document.activeElement === resolveRendered(ADD_COMMAND),
	{ budget: SETTLE_BUDGET, interval: SETTLE_INTERVAL },
)
expect(readFocus()).toBe(window.matchMedia(LG_MEDIA).matches ? 'Add building' : '')
expect(document.activeElement).toBe(resolveRendered(ADD_COMMAND))
```

`readFocus` returns the focused element's `innerText`, and this toolbar renders each command's word
only from `lg` up (`<span class="d-none d-lg-inline">`). So the reading `readFocus` can name is the
label on the rail and the empty string under the top bar. The empty string still separates the
command from the document body, whose rendered text is the whole page, and the identity assertion
holds at both. This is the one place the brief's wording and the surface disagree, and I decided it
rather than stopping: the brief's objective — focus lands on the primary command, read by
`readFocus` — is met at every variant, and a reading that named the label at 1280 alone would pass
where the shell renders no label at all.

### Failing first

`tmp/repair/mutate.sh` replaces the focus call with a read of the same ref, then restores the file.

```text
mutate-focus-red.txt   exit=1   1 failed | 15 passed | 1 skipped (17)
  Error: Condition "focus lands on Add building" did not hold within 3000ms (waited 3022ms)
mutate-focus-green.txt exit=0   16 passed | 1 skipped (17)
```

Both mutations were restored from the copies and re-verified: `outline: 0.125rem solid
var(--bs-emphasis-color);` is back at `main.scss:87`, `adder.value?.focus()` at `Toolbar.vue:102`,
`min-vh-100` appears in `App.vue` only on the row, and a grep for either mutation over the three
files returns nothing. No `git checkout`, `restore`, `stash`, `reset`, or `clean` ran.

## The capture expectation, and why it moved further than the brief named

With the height repaired, every 390 frame is written, and the frame the confirmation is shot in
failed its floor reading: `delete-confirming--light-390.png` ends on `rgb(229, 229, 229)` where
`readStyle(document.body, 'background-color')` recorded `rgb(255, 255, 255)`.

The cause is the platform, not the shell. `showModal()` lays a `::backdrop` over the whole page, and
this browser paints it `rgba(0, 0, 0, 0.1)` (measured by `tmp/repair/color.mjs`), so the frame's
bottom row is the surface's background with that dim composited onto it. At 1280 the same dim tints
the rail and the desk differently, so that row still carries more than one colour and the existing
expectation holds unchanged.

The proof now reads the dim off a `dialog` it composes in the harness — never a number written down,
and the surface authors no `::backdrop` rule of its own — blends it onto the shot's background, and
compares through `matchesPaint`. The comparison carries one channel step, because Chromium
composites in 8-bit and truncates: 255 × 0.9 reads 229.5 and paints 229; 31 × 0.9 reads 27.9 and
paints 27. `matchesColor`'s half-step tolerance rejects that by design, and the wider step is still
far tighter than the distance to any other surface this shell or the runner paints.

Every written frame, read back off disk by `tmp/repair/frames.mjs`:

| Frame                        | 1280 (light / dark)                            | 390 (light / dark)                             |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `schedule-empty--*`          | 1280×800, more than one colour                 | 390×956, `rgb(255,255,255)` / `rgb(31,37,46)`  |
| `schedule-populated--*`      | 1280×800, more than one colour                 | 390×1371, `rgb(255,255,255)` / `rgb(31,37,46)` |
| `delete-armed--*`            | 1280×800, more than one colour                 | 390×1371, `rgb(255,255,255)` / `rgb(31,37,46)` |
| `delete-confirming--*`       | 1280×800, more than one colour                 | 390×1371, `rgb(229,229,229)` / `rgb(27,33,41)` |

The two 390 confirming rows are the body background under the dim; the others are the body
background itself.

## Item 4 — recorded, not changed

- **A settings-storage read failure is silent.** `App.vue:47` calls `void app.start()` with no
  catch, and `ApplicationController.start` clears its own latch on a failure so a later call
  retries. Nothing reaches the person: the transport proof asserts the page carries no sentence
  matching `/storage|could not|unavailable/iu` and that no `Retry loading` control exists.
- **The one visible storage failure is the import's.** `ApplicationController:177,184` raises the
  persistent `IMPORT_FAILURE` toast and never throws, and the transport family drives that sentence
  and its dismissal. The schedule store itself raises no failure sentence of its own — the brief's
  parenthetical reads as though it does, and what I found is the import path carrying it. The
  location pass is the retried one: `#enrich` re-arms its ledger on a failed attempt so the next
  pass retries the stranded row.
- **The import's only doors are the platform file picker and a document-level drop.**
  `Toolbar.vue` and `CSVDropZone.vue` each hold a `type="file"` input opened by `picker?.click()`,
  and `useDragDrop` attaches `dragover`, `dragleave`, and `drop` on `document`. No journey verb
  drives either, and the layer publishes none.

## Run summaries

Every command run from the repository root, exit codes read from the shell. Logs in `tmp/repair/`.

| Run                                          | Exit | Reading                                    |
| -------------------------------------------- | ---- | ------------------------------------------ |
| capture run, `light-1280`                    | `0`  | 288 passed (288), 35.5 s                   |
| capture run, `dark-1280`                     | `0`  | 288 passed (288), 36.2 s                   |
| capture run, `light-390`                     | `0`  | 288 passed (288), 23.7 s                   |
| capture run, `dark-390`                      | `0`  | 288 passed (288), 23.9 s                   |
| journey run, `light-1280`                    | `0`  | 287 passed, 1 skipped (288), 35.2 s        |
| journey run, `dark-1280`                     | `0`  | 287 passed, 1 skipped (288), 35.2 s        |
| journey run, `light-390`                     | `0`  | 287 passed, 1 skipped (288), 22.8 s        |
| journey run, `dark-390`                      | `0`  | 287 passed, 1 skipped (288), 22.7 s        |
| `npm run test:app:browser`                   | `0`  | 25 files, 287 passed, 1 skipped (288)      |
| `npm run format:check`                       | `0`  | `All matched files use the correct format.` — 220 files |
| `npm run lint:check`                         | `0`  | no diagnostics                             |
| `npm run check`                              | `0`  | `tsc` app:core, `vue-tsc` app:browser, `vue-tsc` root |
| `npm run build`                              | `0`  | `✓ built in 2.12s`, 208 modules            |

The skipped case in an ordinary run is the disk-membership proof, which `it.runIf(CAPTURING)` leaves
out where no frame was written. The timings are observations taken on this host; the authoritative
timing reading is the Orchestrator's. The build's chunk-size advisory over the 1.39 MB entry
predates this unit and is a notice, not a failure. No tree-wide `format` or `lint --fix` ran.

## What I touched

| File                                    | Change                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `app/browser/App.vue`                   | The shell claims the viewport on one row; the desk grows into what the blotter leaves           |
| `app/browser/components/Toolbar.vue`    | A confirmed removal sends focus to the primary command                                          |
| `app/browser/styles/main.scss`          | The earned focus-outline rule, with its instrument, its bar, and its readings                   |
| `guides/README.md`                      | The focus ring and the workspace shell as concepts; the destructive ladder's focus destination; the closed limits replaced by what the suite now proves |
| `tests/app/browser/integration.test.ts` | The ring bar, the focus reader, and the 390 capture expectation                                 |

### The test file's edits, itemized

The brief scopes this file to three assertions. Each carried the declarations it needs, and I record
them here rather than folding them in silently.

- **The ring bar.** `expect(addedRing).toBeTypeOf('number')` and its armed twin become
  `toBeGreaterThanOrEqual(RING_CONTRAST)`, over a `requireValue` that names the control and the
  variant when the instrument measures nothing. `RING_CONTRAST = 3` is declared beside
  `TEXT_CONTRAST`; the negative control's literal `3` now reads that constant, so one bar has one
  term. The two `?? 0` fallbacks in `recordStyle` are gone, because the readings are narrowed.
- **The focus reader.** The Tab walk becomes a wait, a `readFocus` reading, and the identity
  assertion. `readFocus` is added to the imports.
- **The 390 capture expectation.** The floor comparison composites the platform's dim onto the
  shot's background for the confirming state and compares through the new module-scope
  `matchesPaint`. `CONFIRMING_STATE` names the registry entry the dim applies to, and `STATES` reads
  it, so the name has one home. `PAINT_STEP = 1` is the tolerance. `blendColor`, `parseCSSColor`,
  and the `Color` type are added to the imports; `matchesColor` was tried first and removed, because
  its half-step tolerance rejects the browser's own truncation.

## Review evidence

`git diff --stat`:

```text
 app/browser/App.vue                   |  14 +++-
 app/browser/components/Toolbar.vue    |  13 +++-
 app/browser/styles/main.scss          |  42 ++++++++++--
 guides/README.md                      |  64 +++++++++++++++---
 tests/app/browser/integration.test.ts | 121 +++++++++++++++++++++++++++++-----
 5 files changed, 221 insertions(+), 33 deletions(-)
```

`git status --porcelain`:

```text
 M app/browser/App.vue
 M app/browser/components/Toolbar.vue
 M app/browser/styles/main.scss
 M guides/README.md
D  package-lock.json
 M tests/app/browser/integration.test.ts
?? package-lock.json
```

The staged-deletion and untracked `package-lock.json` rows are the standing condition the brief
named. Nothing staged, restored, or rewrote them. `configs/**`, `vite.config.ts`, `package.json`,
every vendored file, and every file under `tests/**` other than the journey suite are untouched.

## Instruments left in `tmp/repair/`

- `height.mjs` — the content-edge reading and the restaging loop, against the built surface.
- `ring.mjs` with `ringlib.js` — the `readRing` formula, per control, per width, per theme.
- `frames.mjs` — every written frame's size and floor, decoded the way `readFrame` decodes it.
- `color.mjs` — the platform's `::backdrop` colour and how this browser normalizes a float `rgb()`.
- `mutate.sh`, `mutate-shell.sh` — the three failing-first probes and their restores.
- `gates.sh`, `run.sh` — the gate chain and the per-variant run, one log each.
- The gate logs, the run logs, and the before and after readings named throughout.

## Claims not closed

1. **The `.btn-close` reading covers one variant.** The first-run dialog opens only at `md` and up,
   so the 1.827 reading is from light-1280 and no 390 reading exists for that control. The rule
   covers it on that reading.
2. **The dark rail's separation and the drop zone's dark panel are still unmeasured**, as the chrome
   unit recorded. Adding the outline changes neither.
3. **The confirmation's backdrop is the platform's tenth-opacity dim**, which is weaker separation
   than Bootstrap's own modal backdrop paints. No instrument reports a bar it misses, so it is a
   proposal rather than an earned rule, and I made none.
4. **A settings-storage failure is still silent**, per item 4. `App.vue` still calls `void
   app.start()` with no catch, so a boot that stays failed raises an unhandled rejection.
5. **The import still cannot be driven through the interface**, per item 4.
6. **`vite.config.ts` will still read stale to `scaffold audit`**, as the journey unit recorded.
7. **The ledger's lost failure mark** from the chrome unit's retiering is unchanged.

## Deviation state

No deviation. None of the three stop conditions fired: the height converged inside the desk and the
bar with no product layout change, the ring cleared 3:1 on `--bs-emphasis-color` with no colour
literal, and no run was red outside the three items. The decisions that were mine — the flex shell
over a subtracted height, the rule's selector list and its outline width, the focus destination, the
`readFocus` reading at a width that renders no label, and the composited floor with its one-step
tolerance — are each recorded in the section that owns them.
