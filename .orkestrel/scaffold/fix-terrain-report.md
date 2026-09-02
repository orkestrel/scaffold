# Unit FX3 — fix round on terrain's reference suite

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\terrain`. Done. Nothing
committed, nothing installed, no off-limits file edited, the lockfile pair untouched. One decision
departs from the brief's suggested mechanism and is recorded under C19.

## Headline

All four findings are closed in the owned files. Every capture at every variant now covers the full
document, and the truncation control fails the pin in two independent ways. `transport` is declared
and proved through the application's real store contracts — the seam already existed, so no new
fixture was written. The armed Delete is measured in every variant; its label reads 4.045 against the
dark themes, under the 4.5 text bar, which is the outline-versus-solid finding this report carries
rather than repaints.

## Files touched

| File                                   | Change                                                                                                                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/app/browser/setup.ts`           | `dismissReference` drops the backdrop selector; `requireArmedDelete` asserts rendered text; `openSurface` splits out of `mountSurface` and both take storage; `readFrame`, `FrameReading`, `ShotReading`, and `DELETE_LABEL` added |
| `tests/app/browser/integration.test.ts` | `transport` declared and proved; the 390 variants' pane raised; the armed Delete added to the matrix family; the capture proof replaced by the frame-coverage pin            |

`tests/setupBrowser.ts` needed no change and was not touched.

## C19 — selector reach

**Edit.** `tests/app/browser/setup.ts`, `dismissReference`. The clear wait was
`() => !isRegionVisible(REFERENCE_NAME) && document.querySelector('.modal-backdrop') === null`. It is
now `() => !isRegionVisible(REFERENCE_NAME)` alone.

**Departure from the brief's mechanism, with the measurement.** The brief asked for the dialog gone
and a command behind it reachable again. That second predicate binds nothing on this surface. A probe
at `light-1280` read, with the first-run dialog open on screen:

```text
PROBE open: addReachable=true toggleReachable=false csvReachable=true
```

`Add new building` is already reachable while the dialog is open, so a poll on it is a predicate
already true when the poll starts, which `SKILL.md` § Derive journeys from intents forbids. No command
behind the dialog changes reachability when it closes. The wait therefore reads the one perception
that does change, and the provider covers the fading overlay: Playwright's click retries an
intercepted press until the interceptor clears, which the runs below show it doing.

**Failing-first.** The wait's polarity was flipped to `() => isRegionVisible(REFERENCE_NAME)` on the
final tree:

```text
Tests  1 failed | 9 passed | 1 skipped (11)
FAIL tests/app/browser/integration.test.ts:283 > reads the primary command above its contrast bars in every declared variant
AssertionError: expected [ Array(1) ] to deeply equal []
+   "<div id=\"quickReference\" class=\"modal fade d-print-none\" … style=\"display: block;\">",
```

The reading is load-bearing: without it the escape reading meets a modal the surface has not finished
putting away. The plant was removed and the file matches the final tree byte for byte.

**Sweep.** `grep -n "querySelector|getElementById|classList|\.closest\(|__vue|\.\$el"` over
`tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`, and `tests/setupBrowser.ts`:
no hit in `integration.test.ts` or `setupBrowser.ts`; three hits in `setup.ts`, all inside
`requireElement` and `headingLevels` at lines 276, 291, and 303. Both predate this campaign —
`git log -S "requireElement"` dates them to `49105af` (2026-07-10) — and neither sits on a journey
path: their callers are the component test files plus `modalRoot`, and no journey, family, or
statechart scenario calls any of them. Ruled retain.

## F2 — truncated 390 frames

**Mechanism, measured, and not the one the brief named.** `resizeViewport`'s stage-then-release is
not the cause; `captureFrame` stages the pane itself for every shot. The cause is the tester pane's
height against the document's. A probe took the geometry at the shot's own viewport:

```text
PROBE light-1280 inner=1280x800 bodyBox=1280x800  bodyScroll=800  frameBox=1280x800 parentInner=800x600
PROBE light-390  inner=390x844  bodyBox=390x1682  bodyScroll=1682 frameBox=390x844  parentInner=800x600
```

Vitest's Playwright provider takes a whole-page shot as
`getDescribedLocator(context, 'body').screenshot(...)`
(`node_modules/@vitest/browser-playwright/dist/index.js:535`), so the clip is the tester `body`
element's box in top-level page coordinates. At 390 that box is 1682 tall while `stagePane` pins the
tester iframe at the variant's 844, so every row past 844 is the runner's own page. The old frames
confirm it exactly — the blank run equals the overflow:

```text
delete-armed--light-390.png     390x1718 trailingUniformRows=874 (50.9%) rgb(255,255,255)   1718-844 = 874
schedule-empty--light-390.png   390x1192 trailingUniformRows=348 (29.2%) rgb(255,255,255)   1192-844 = 348
delete-armed--light-1280.png    1280x800 trailingUniformRows=50  (6.3%)  rgb(248,249,249)
```

The 1280 frames are complete because the document is exactly 800 there. The blank is
`rgb(255,255,255)`, the runner's canvas; a complete frame ends on `rgb(248,249,249)` light or
`rgb(33,39,44)` dark, the surface's own resolved body background.

**Fix.** The narrow variants' declared pane holds the tallest document they render:
`{ name: 'light-390', width: 390, height: 1900 }` and the same for `dark-390`. The rule is stated
above the declaration: a variant's height holds the tallest document that variant renders, because
the capture shoots the body and the pane bounds it.

**Pin.** The capture proof now reads every written frame back and judges it against the surface it
was taken of. `place` records
`{ height: document.documentElement.scrollHeight, background: style(document.body, 'background-color') }`
keyed by the file that shot writes; the proof asserts `frame.width === CURRENT.width`,
`frame.height >= shot.height`, `frame.height <= CURRENT.height`, and `frame.floor` equals
`[shot.background]`. `readFrame` decodes the PNG the runner read back through `Image.decode` and
`OffscreenCanvas`, so the bottom row is a second mechanism against the resolved style rather than a
re-derivation of it. The recorded height is taken with the tester already at the variant's viewport,
and `place` re-applies that same viewport, so it is the layout the shot lands on.

**Control run — the truncation reproduced and the pin failed.** The 390 pane was set back to 844,
capture run at `light-390`:

```text
AssertionError: expected 1192 to be less than or equal to 844
 ❯ tests/app/browser/integration.test.ts:456  expect(frame.height).toBeLessThanOrEqual(CURRENT.height)
Tests  1 failed | 10 passed (11)
```

and the frames it wrote reproduced the finding exactly:

```text
delete-armed--light-390.png     390x1718 trailingUniformRows=874 (50.9%) rgb(255,255,255)
schedule-empty--light-390.png   390x1192 trailingUniformRows=348 (29.2%) rgb(255,255,255)
```

**Second control — the floor half fires on its own.** With the pane still at 844 and the height
bounds relaxed to `>= 0` and `<= 9999`, so only the floor reading could catch it:

```text
AssertionError: expected [ 'rgb(255, 255, 255)' ] to deeply equal [ 'rgb(248, 249, 249)' ]
 ❯ tests/app/browser/integration.test.ts:457  expect(frame.floor).toEqual([shot.background])
```

Both plants were removed and both owned files match the final tree byte for byte.

**Re-filmed.** Every variant, on the final tree. All twelve frames complete, each ending on its own
theme's background:

```text
delete-armed--dark-1280.png        1280x800  trailingUniformRows=49  rgb(33,39,44)
delete-armed--dark-390.png         390x1900  trailingUniformRows=215 rgb(33,39,44)
delete-armed--light-1280.png       1280x800  trailingUniformRows=50  rgb(248,249,249)
delete-armed--light-390.png        390x1900  trailingUniformRows=216 rgb(248,249,249)
schedule-empty--dark-1280.png      1280x800  trailingUniformRows=97  rgb(33,39,44)
schedule-empty--dark-390.png       390x1900  trailingUniformRows=742 rgb(33,39,44)
schedule-empty--light-1280.png     1280x800  trailingUniformRows=98  rgb(248,249,249)
schedule-empty--light-390.png      390x1900  trailingUniformRows=743 rgb(248,249,249)
schedule-populated--dark-1280.png  1280x800  trailingUniformRows=49  rgb(33,39,44)
schedule-populated--dark-390.png   390x1900  trailingUniformRows=224 rgb(33,39,44)
schedule-populated--light-1280.png 1280x800  trailingUniformRows=50  rgb(248,249,249)
schedule-populated--light-390.png  390x1900  trailingUniformRows=228 rgb(248,249,249)
```

`schedule-populated--dark-390.png` was opened and read: the whole page from the navbar to the total
insured value, ending on the dark background, with no blank cut.

## F3 — the armed Delete

**Edit.** `tests/app/browser/setup.ts`, `requireArmedDelete`. The
`command.classList.contains('btn-outline-danger')` read is gone. The scenario now asserts the two
rendered facts a person meets: the command is reachable — the schedule withholds it entirely until a
row is selected, so reachability is the arming — and it reads the word `Delete`, exported as
`DELETE_LABEL`. `readStates` on the armed command returns `[]`, so it carries no accessible state to
assert; `readRole` returns `button` and `readName` returns `Delete selected buildings`.

**Matrix family.** Every variant now adds a building, selects its row, and reads the armed Delete's
text, contrast, and focus ring beside the primary command's, inside the same loop and under the same
harness-composed under-bar controls.

**Failing-first.** `DELETE_LABEL` was changed to `'Remove'` on the final tree:

```text
Tests  2 failed | 8 passed | 1 skipped (11)
FAIL …:283 > reads the primary command above its contrast bars in every declared variant
AssertionError: expected 'Delete' to be 'Remove' // Object.is equality
FAIL …:415 > drives every declared Delete transition through the interface
Error: idle × select → armed, through the row checkbox: The armed Delete command reads "Delete" and not "Remove"
```

The runner named the failing transition row. The plant was removed.

**Readings for the Orchestrator — the outline chrome.** `contrast` on the armed
`Delete selected buildings`, taken inside the matrix loop, one mount per variant:

| Variant      | Armed Delete contrast | 4.5 text bar |
| ------------ | --------------------- | ------------ |
| `light-1280` | 6.701                 | clears       |
| `dark-1280`  | 4.045                 | under        |
| `light-390`  | 6.701                 | clears       |
| `dark-390`   | 4.045                 | under        |

The command renders `class="btn btn-outline-danger"`. Against the `enterprise-bootstrap` rule that a
destructive action takes the solid variant, this is the evidence: the outline treatment puts the
danger colour on the label rather than behind it, and in the dark themes the label lands at 4.045
against the surface it sits on — under the 4.5 bar the primary command clears in every variant. The
brief scoped the repaint out, so nothing under `app/**` was touched. The suite holds the command to
`COMPONENT_CONTRAST = 3`, the bar a rendered component clears, and the code comment names the unmet
text bar so the next reader meets the finding where the number is read. Repainting Delete to
`btn-danger` is the Orchestrator's row.

## F4 — the transport family

**Declared.** `FAMILIES` now reads `journey`, `refusal`, `matrix`, `statechart`, `transport`,
`capture`. The comment recording the omission is gone.

**No new fixture was needed, and no seam is missing.** `installApplication` already accepts `driver`
and `settingsDriver`, and `tests/app/browser/setup.ts` already exports `failBootDriver()` — a real
memory driver whose first `scan` throws and whose every later `scan` serves, which is the storage
failing a fixed number of reads. Writing a second one would have been a renamed duplicate. The only
setup change the family needed was a storage seam on the mount door.

**The mount door split.** `openSurface(options?)` mounts the shipped shell over the given storage and
waits for the loading state to clear. `mountSurface(options?)` is `openSurface` plus the one act a
first run adds — closing the reference the shell greets a person with. A reopened workspace holding a
schedule meets no reference, so it enters through `openSurface`. Every existing journey keeps calling
`mountSurface` unchanged.

**Proofs.**

- `hands a saved schedule back to a second session, and opens empty over storage that holds none`
  (`transport`). Session one opens over a `createMemoryDriver()`, adds a building through the
  interface, and reads `1 building` in the `Building schedule` region. Session two opens over the
  same driver and polls until that region restores, then reads `1 building`. Session three opens over
  fresh storage and reads the empty-state sentence with `1 building` absent — the control that stops
  the restart reading passing on a surface that always shows a building.
- `says the saved workspace could not be opened, and opens it when a person retries` (`transport`,
  the visible half driven as a journey). The session opens over `failBootDriver()` as its settings
  store. The boot's first awaited read is `SettingsStore.hydrate` through `table.records()` to
  `scan`, which the driver refuses, so `app.start()` rejects and `App.vue` renders its `role="alert"`
  region. The journey reads that region's own sentence — `The saved workspace could not be opened on
  this device. Retry without leaving this page.` — presses `Retry loading`, and polls until the region
  is gone and the empty workspace is on screen, asserting the failure sentence is gone beside the new
  one.

Each drives through the interface and through the application's real store contracts. Nothing reaches
a store the interface does not.

**Failing-first, per proof, on the final tree.**

Restart, second session pointed at fresh storage instead of the shared driver:

```text
FAIL …:359 > hands a saved schedule back to a second session, and opens empty over storage that holds none
Error: Condition "the second session restores the saved building" did not hold within 3000ms (waited 3007.2ms)
Tests  1 failed | 10 skipped (11)
```

Storage failure, the session opened over healthy storage:

```text
FAIL …:392 > says the saved workspace could not be opened, and opens it when a person retries
Error: Condition "the workspace reports it could not open the saved schedule" did not hold within 3000ms (waited 3022.1ms)
Tests  1 failed | 10 skipped (11)
```

Both plants were removed.

**One surface finding the family exposed.** A session left with its first-run reference open leaks
the dialog into the next test. Bootstrap re-parents an open modal to `document.body`, and the element
survives the host removal, so the following test meets two `#quickReference` elements — measured as
`voice=Interactive target "Close" is ambiguous across 2 elements`, with the live one intercepting the
next press for the whole action budget. That is why the transport block's third session enters
through `mountSurface` and closes its reference; the reason is recorded beside that line. Run in
isolation the same test passes with one dialog, which is what identified the leak. This is a hygiene
property of the suite rather than of the application, and it is now honoured.

## Runs

The command for every row:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts`

| Run                                         | Summary                            |
| ------------------------------------------- | ---------------------------------- |
| `VITE_VARIANT=light-1280`                   | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_VARIANT=dark-1280`                    | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_VARIANT=light-390`                    | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_VARIANT=dark-390`                     | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_CAPTURE=true VITE_VARIANT=light-1280` | `Tests 11 passed (11)`             |
| `VITE_CAPTURE=true VITE_VARIANT=dark-1280`  | `Tests 11 passed (11)`             |
| `VITE_CAPTURE=true VITE_VARIANT=light-390`  | `Tests 11 passed (11)`             |
| `VITE_CAPTURE=true VITE_VARIANT=dark-390`   | `Tests 11 passed (11)`             |

The skip in an ordinary run is the capture-membership proof, which runs only under the flag. The
baseline before any edit, same command, was `Tests 8 passed | 1 skipped (9)`. `tmp/` is git-ignored.

## Scoped gates

```text
npm run format:check   All matched files use the correct format. (216 files)
npm run lint:check     exit 0, no output
npm run check          no diagnostics from tsc, tsc -p configs/app/tsconfig.core.json, vue-tsc
```

Observations, not criteria, taken on the final tree:

```text
npm run test:policy       Tests  111 passed (111)
npm run test:app:browser  Test Files 48 passed (48) | Tests 458 passed | 1 skipped (459) | 50.40s
```

Two per-test budgets are declared with their reasons in the file: `MATRIX_BUDGET = 30_000`, because
the matrix family now mounts and drives four journeys rather than reading four static surfaces, and
`TRANSPORT_BUDGET = 20_000`, because each transport proof opens the shell over storage more than
once. Each is an observation about wall time on this host; the authoritative timing reading is the
Orchestrator's.

## Review evidence

`git diff --stat`:

```text
 tests/app/browser/integration.test.ts | 322 ++++++++++++++++++++++++++--------
 tests/app/browser/setup.ts            | 110 ++++++++++--
 2 files changed, 338 insertions(+), 94 deletions(-)
```

`git status --porcelain`:

```text
D  package-lock.json
 M tests/app/browser/integration.test.ts
 M tests/app/browser/setup.ts
?? package-lock.json
```

The lockfile rows are the standing condition the brief named. Nothing staged, restored, or rewrote
them.

## Acceptance criteria

1. **No selector, instance, or store reach in any journey path.** Met. The sweep and the ruling on
   the pre-campaign hits are under C19.
2. **Every capture at every variant covers the full document; the truncation control fails.** Met.
   Twelve frames re-filmed and read; two independent controls fail.
3. **The statechart asserts rendered facts; the armed Delete is measured in every variant.** Met.
   The readings and the mutation control are under F3.
4. **`transport` is declared and proved, or the missing seam is named exactly.** Declared and proved.
   No seam is missing.
5. **All runs green; scoped gates green.** Met.

## Claims I could not close

- **The layer limit behind F2.** The suite's fix works by declaring a pane tall enough to hold the
  document, which costs the narrow variants their 844-pixel phone height: at 390x1900 a journey never
  scrolls. `captureFrame` stages the pane at the variant's declared height and then shoots a `body`
  that may exceed it, and it neither raises the pane for the shot nor refuses a body larger than the
  pane. A workspace declaring a true phone viewport cannot get a complete frame from
  `@orkestrel/test` 0.0.11. The settling change is in the layer — stage the shot at
  `max(height, documentElement.scrollHeight)`, or refuse the shot — and the Orchestrator carries it.
- **The armed Delete's 4.5 shortfall.** Measured in every variant and recorded earlier. The repaint
  is an `app/**` change the brief scoped out.
- **The statechart harness page and its gate.** Unchanged. `statechart.md` asks for a rendered
  harness carrying `STATECHART_ATTRIBUTES` behind a route deep link, and building one is an `app/**`
  change.
- **The written artifact per variant.** `decide.md` asks for a `describeTree` and `describeFocus`
  file per variant under `tmp/`. No test writes one, and this brief does not name it.
- **The matrix instrument's control door.** `styles.md` changed mid-unit to require the census and
  `extractStyles` negative controls to enter through the same `root` the reading walks. Terrain feeds
  `ABSENT_CLASS` downstream of `readClasses` in the census assertion and builds the escape control on
  a separate root. That is audit claim 3, whose carrier is `inspection.md` in scaffold, so it is
  recorded here rather than reopened.
- **The guide.** `guides/README.md` sits outside this unit's owned files, so the transport family and
  the changed mount door are not reflected there.
