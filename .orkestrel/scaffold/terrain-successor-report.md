# Unit U6s — close what the resolver defect held open in terrain

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\terrain`. Done. Nothing
committed. No deviation.

## Installed resolver proof

`npm ls @orkestrel/test`:

```text
terrain@ C:\Users\mikes\WebstormProjects\terrain
`-- @orkestrel/test@0.0.11
```

`node_modules/@orkestrel/test/dist/src/browser/index.js` carries the rebuilt build, not the old one.
`computeNamePattern` is declared at line 281 and exported at line 2084, and `resolveRendered` at
line 312 has the two-pass shape the fix report describes: a visible pass asking
`page.getByRole(role, { name, exact: true })` with no `includeHidden`, whose matches are the only
elements the function can return, and a hidden pass entered only when that pass found nothing, which
asks `{ name: computeNamePattern(name), exact: true, includeHidden: true }` and returns nothing — it
chooses between `No interactive element has the accessible name "X"` and `Interactive target "X" is
not visible and focus-reachable`. `readPerception` at line 518 runs one pass with `includeHidden`
dropped.

Baseline before any edit, the same command as the criterion run: **8 passed | 1 skipped (9)**.

## Changes

### The refusal family gained its reachable half

`tests/app/browser/integration.test.ts`, renamed to
`withholds Delete until a row is selected, and Import until a person opens the CSV menu`.

The withheld half is unchanged and still asserts one exact voice each:

- `Interactive target "Delete selected buildings" is not visible and focus-reachable`
- `Interactive target "Import buildings from CSV" is not visible and focus-reachable`
- `No interactive element has the accessible name "Import every building"`

The reachable half is new. It opens the CSV menu through `openImports`, a helper added to
`tests/app/browser/setup.ts` beside `openActions`, which presses the toggle by the accessible name a
person reads — `CSV`, taken from the toggle's own `<span>` content beside its `aria-hidden`
`bi-filetype-csv` glyph, which is the exact resolution the old layer refused. The test then asserts:

- `readRefusal('Import buildings from CSV')` is `undefined`, so the same name the closed menu
  withheld now resolves;
- `readText(resolveRendered('Import buildings from CSV'))` is `Import buildings`, the label the menu
  item renders, so the resolver returned the item a person clicks rather than another carrier of
  that `aria-label`.

### `mountSurface` resolves the first-run dialog by name

`tests/app/browser/setup.ts`, `dismissReference`, which `mountSurface` calls on every wide mount.

- The open wait is now `isRegionVisible('Quick reference')`, which runs through `readPerception`, in
  place of `isCommandReachable('Close')`.
- The dialog is then read with `readPerception('Quick reference')`, and the reading is refused
  unless it contains the sentence the dialog exists to give:
  `You can drag and drop CSV files anywhere on the page to import buildings`. A setup module asserts
  by throwing, so this is a `throw`, not an `expect`.
- The clear wait is now `!isRegionVisible('Quick reference')` beside the backdrop check.
- The press itself stays on `Close`, because that is the control a person uses to close the dialog.

`Quick reference` is the name Bootstrap's modal publishes from the `aria-labelledby` heading whose
`bi-lightbulb` glyph the old layer folded into the computed name.

### Comments naming the defect

Removed. The comment above the refusal family named `@orkestrel/test` 0.0.11, `includeHidden: true`,
and the folded glyph as the reason the menu-opening half was absent. It now records the surface fact
that survives: the CSV menu folds its commands away rather than disabling them, so the withheld half
reads as unreachable rather than absent, and the reachable half needs the menu opened first. The
`dismissReference` paragraph explaining that the dialog is read through its `Close` control because
every other dialog keeps its `Close` hidden is replaced by the reading the fix allows.

Sweep over the owned files for `includeHidden`, `0.0.11`, `resolver`, `glyph`, `workaround`,
`not resolve`, `cannot resolve`, `no journey verb`, and `Close control`: no match, exit 1.

`tests/setupBrowser.ts` needed no change and was not touched.

## Failing-first evidence

Each new assertion was reddened on the final tree before being restored, by editing only owned files
and undoing exactly that edit.

`REFERENCE_HINT` changed to a sentence the dialog does not carry:
**6 failed | 2 passed | 1 skipped (9)**, every failure reading

```text
Error: The first-run dialog reads "Quick reference Do not show You can drag and drop CSV files
anywhere on the page to import buildings CSV FORMAT Exports and the downloaded template use these
columns in this order; …" and not the drag-and-drop hint
```

That message is `readPerception('Quick reference')` returning the dialog's own text, which is the
claim `terrain-reference-report.md` could not close.

The hint restored and the expected menu-item label changed to `Import warehouses`:
**1 failed | 7 passed | 1 skipped (9)**, the one failure being
`expected 'Import buildings' to be 'Import warehouses' // Object.is equality` in the refusal family.
The menu had opened and the item had resolved, so the failure lands on the label alone.

Both plants were removed, and the sweep for `warehouses` in the owned files returns no match.

## Run summaries

`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts`,
taken on the final tree:

| Run                                         | Summary                             |
| ------------------------------------------- | ----------------------------------- |
| `VITE_VARIANT=light-1280`                   | `Tests  8 passed \| 1 skipped (9)`  |
| `VITE_VARIANT=dark-1280`                    | `Tests  8 passed \| 1 skipped (9)`  |
| `VITE_VARIANT=light-390`                    | `Tests  8 passed \| 1 skipped (9)`  |
| `VITE_VARIANT=dark-390`                     | `Tests  8 passed \| 1 skipped (9)`  |
| `VITE_CAPTURE=true VITE_VARIANT=light-1280` | `Tests  9 passed (9)`               |
| `VITE_CAPTURE=true VITE_VARIANT=dark-390`   | `Tests  9 passed (9)`               |

The skip in an ordinary run is the capture-membership test, which runs only under the flag.
`tmp/capture/states/` holds `schedule-empty--light-1280.png`, `schedule-populated--light-1280.png`,
`delete-armed--light-1280.png`, `schedule-empty--dark-390.png`, `schedule-populated--dark-390.png`,
and `delete-armed--dark-390.png`. `tmp` is git-ignored.

## Scoped gate readings

```text
npx oxfmt --config .oxfmtrc.json --check <owned files>            All matched files use the correct format.
npx oxlint --config .oxlintrc.json --deny-warnings <owned files>  exit 0
npm run check                                                     no diagnostics from tsc, tsc -p configs/app/tsconfig.core.json, vue-tsc
```

The re-baselined tree formats with `oxfmt`, not Prettier. `npx prettier --check` reports all three
owned files unformatted, including the one this unit never edited, so it reads the wrong
configuration and is not the gate. `npm run format:check` runs `oxfmt`.

Observations, not criteria:

```text
npm run test:policy       111 passed (111)
npm run test:app:browser  48 files, 456 passed | 1 skipped (457), 43.97s
```

The `policy/no-nested-functions` rule the fleet visit added is green over the owned files. Every
callback added here is an anonymous arrow passed directly as an argument.

## Review evidence

`git diff --stat`:

```text
 tests/app/browser/integration.test.ts | 18 +++++++++-------
 tests/app/browser/setup.ts            | 39 +++++++++++++++++++++++++++++------
 2 files changed, 43 insertions(+), 14 deletions(-)
```

`git status --porcelain`:

```text
D  package-lock.json
 M tests/app/browser/integration.test.ts
 M tests/app/browser/setup.ts
?? package-lock.json
```

The lockfile rows are the standing condition the brief named. Nothing staged, restored, or rewrote
them. Nothing was committed or installed, and no off-limits file was edited.

## Claims I could not close

- **The statechart harness page and its gate.** Unchanged from `terrain-reference-report.md`:
  `statechart.md` asks for a rendered harness carrying `STATECHART_ATTRIBUTES` behind a route deep
  link, and building one is an `app/**` change.
- **The transport family.** Still absent, still recorded in the comment above `FAMILIES` rather than
  hidden. The surface meets that family's trigger.
- **The written artifact per variant.** `decide.md` asks for a `describeTree` and `describeFocus`
  file per variant under `tmp/`. No test writes one, and the brief's work list does not name it.
- **The guide.** `guides/README.md` sits outside this unit's owned files, so the change to how the
  first-run dialog is resolved is not reflected there.
- **The old layer's counter-reading.** The rebuilt tarball is what is installed, so the failing
  behaviour these changes close could not be re-measured here. The evidence that the fix is what
  makes them possible is the resolver source read earlier plus the measurements in
  `terrain-reference-report.md` § Layer finding.
