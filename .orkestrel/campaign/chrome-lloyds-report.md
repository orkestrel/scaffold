# Unit C-lloyds — lloyds' surface brought to what the skills require

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\lloyds`. Every item in the
brief is done. Nothing committed, nothing installed, no off-limits file edited, the lockfile pair
untouched. No shared-file patch is owed.

## Headline

The dark rail is now a scoped `data-bs-theme="dark"` region and carries no `btn-outline-*` control:
every command that carries a consequence takes a solid fill, the armed Delete is solid `btn-danger`
and the idle Delete is neutral with its reason on `aria-describedby`. The destructive ladder gained
its confirm rung on the native `dialog` element, which widened the Delete statechart to five rows —
`idle`, `armed`, `confirming` — declared in `app/browser/constants.ts` and typed on the entity's own
unions. Each schedule row's checkbox carries its location and building numbers, so two rows resolve
apart. The statechart harness mounts at `?harness=statechart`, publishes every attribute from
`STATECHART_ATTRIBUTES`, and its play-all walk reads `passed · 5 passed · 0 failed · 5 rows` in a
real Chromium against the built output. Two mutation probes turn that reading red exactly where they
should. The three inline `style` widths are gone and `app/**` carries no `style` attribute at all.

## Item 1 — the dark rail

`app/browser/components/Toolbar.vue`. `navbar-dark` is gone. The rail declares
`data-bs-theme="dark"` instead, which re-points the tokens for its whole subtree.

The attribute paints nothing by itself: the shipped cascade sets `color` on `body` and on the
`text-*` utilities, never on a theme scope, so a scoped region with no paint utility inherits the
page theme's text colour. The rail therefore takes `bg-body-tertiary` and `text-body`.

| Element                      | Before                                                | After                             |
| ---------------------------- | ----------------------------------------------------- | --------------------------------- |
| The rail itself              | `navbar-dark bg-dark text-bg-dark`                    | `bg-body-tertiary text-body` plus `data-bs-theme="dark"` |
| The rail's edges             | `border-end border-secondary border-opacity-50`       | `border-end`                      |
| The top bar's edge           | `border-bottom border-secondary border-opacity-50`    | `border-bottom`                   |
| The brand link               | `text-white`                                          | `text-body-emphasis`              |
| The group labels and subtitle | `text-white text-opacity-75`                         | `text-body-secondary`             |

Dropping the `border-secondary border-opacity-50` pair lets each border take `--bs-border-color`,
which the scope now resolves for the dark subtree.

## Item 2 — the solid tier

Each control's before and after, all in `Toolbar.vue` unless named otherwise.

| Control                      | Before                              | After                              |
| ---------------------------- | ----------------------------------- | ---------------------------------- |
| Import                       | `btn btn-outline-light`             | `btn btn-secondary`                |
| Export                       | `btn btn-outline-light`             | `btn btn-secondary`                |
| Template                     | `btn btn-outline-light`             | `btn btn-secondary`                |
| Theme toggle                 | `btn btn-outline-light`             | `btn btn-secondary`                |
| Tips                         | `btn btn-outline-light`             | `btn btn-secondary`                |
| Guides                       | `btn btn-outline-light`             | `btn btn-secondary`                |
| Quick Ref                    | `btn btn-outline-light`             | `btn btn-secondary`                |
| Smart Default, off           | `btn btn-outline-light`             | `btn btn-secondary`                |
| Smart Default, on            | `btn btn-light`                     | `btn btn-light`                    |
| Add building                 | `btn btn-primary`                   | `btn btn-primary`                  |
| Download template (`CSVDropZone.vue`) | `btn btn-outline-light`    | `btn btn-secondary`                |

The Reference group and the drop zone's template button are mine to decide and are recorded here:
the brief named the File group and the theme toggle, and leaving the same failing outline family
beside them on the same dark surface would have left the defect the item exists to close. The rail
now holds one primary command, one destructive command, and the secondary fill everywhere else, with
the section labels carrying the grouping. Smart Default keeps a light fill while it is on, so a
pressed toggle reads as chosen rather than as muted, and `aria-pressed` carries the state rather than
the colour.

## Item 3 — the destructive action

### Idle

`btn-outline-light` → `btn-secondary`, still `disabled` while the selection is empty. The reason
rides `aria-describedby="delete-reason"` pointing at a `visually-hidden` paragraph reading
`Select a building to delete it.` (the `DELETE_REASON` constant), with `title` carrying the same
sentence as the pointer-user convenience on top. Once armed, `aria-describedby` drops away and
`title` becomes the command's own name. Driven readings from the built surface:

```text
Delete disabled before selection: true
Delete describedby before selection: delete-reason
Delete class before selection: btn btn-secondary text-start
Delete class once armed: btn btn-danger text-start
Delete describedby once armed: null
```

### Armed, and the ladder

The armed command is solid `btn-danger` and now opens a confirmation instead of removing rows on the
press. `app/browser/components/DeleteDialog.vue` is new: the native `dialog` element opened with
`showModal()`, `role="alertdialog"`, unpainted itself with Bootstrap card chrome inside, exactly the
recipe `components.md` → Modal gives.

The rung is the ladder's middle one, and the choice is recorded in the component, in the guide, and
here. Undo is the rung the skill prefers, and it is not reachable from this surface: removal is
irreversible because the application publishes no restore command — `ApplicationInterface` exposes
`import(file: File)` and no bulk record import, and `ScheduleView` exposes no `import` at all — so a
soft-delete would be an application-capability change rather than chrome. The removal is scoped and
irreversible, which is the confirm rung.

What the dialog does:

- restates the consequence with the count: `Delete this building?` /
  `Delete these 3 buildings?`, then `It leaves the schedule with the carrier evaluations it carried.
  You can't undo it.`;
- labels both answers with verbs, `Keep selection` and `Delete selection`, never Yes/No;
- puts the safe answer first in the markup with `autofocus`, so `showModal()` lands focus there —
  the driven reading is `focus lands on the safe answer: Keep selection`;
- separates the destructive answer to the end of the footer and gives it the solid danger fill;
- routes Esc and the safe button out through the element's own `close` event, so there is one path
  out. Driven reading: `escape keeps the row: true`.

Nothing is constructed and nothing leaks on unmount, which is why the native element wins here even
though this workspace drives its other modals through Bootstrap's JS. `.claude/rules/browser.md`
names the native platform API first, and the harness needs a synchronous open with no transition to
wait on.

### The ZIP retry, retiered and recorded

Two controls, both in `BuildingTable.vue`, and neither is destructive — a retry re-runs a ZIP
lookup.

| Control                          | Before                                   | After                                    |
| -------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Summary-cell retry (`:500`)      | `badge rounded-pill text-bg-danger border-0` | `btn btn-secondary btn-sm rounded-pill`  |
| Detail-well retry (`:603`)       | `btn btn-outline-danger btn-sm`          | `btn btn-secondary btn-sm`               |

The summary-cell control was also a `badge` with no text, which `components.md` → Badge refuses; it
is a button now. The cost is recorded rather than hidden: the ledger's status column no longer
carries a red mark for an unresolved ZIP. The row's error-count badge still marks validation
failures, the retry's own accessible name states what failed, and the detail well still renders the
whole sentence. A capture round should rule on whether the failure needs its own mark beside the
retry.

## Item 4 — the style escapes and the authored rules

`app/**` now carries no `style` attribute and no `<style>` element. The instrument and its two
controls:

```text
style escapes — files walked: 24
style escapes — hits: []
style escapes — fed control reported: true
style escapes — appended control reported: true
```

Population: every `.vue` and `.html` file under `app/browser`, read as authored. Coverage: it reads
source, not a mounted tree, so it does not see a style a component writes at runtime. The fed control
is an inline declaration handed straight to the reading; the appended control is
`tmp/chrome/control-escape.vue`, carrying both an inline declaration and a `<style>` block, appended
to the walked population.

### The two widths

The three inline widths became `.field-sequence` (3.25rem, the Loc and Bldg inputs) and `.field-zip`
(4.75rem, the ZIP input), emitted from one `@each` over a two-entry map in
`app/browser/styles/main.scss`, written with `inline-size` so the ledger flips with the document
direction. The reading is recorded beside the rules and reproduced by `tmp/chrome/earned.mjs` against
the compiled stylesheet the page loads:

```text
width utilities: [".min-vw-100",".min-vw-lg-100",…,".w-25",".w-50",".w-75",".w-auto",…]
negative control — .w-100 found: true
```

Every width utility the cascade defines is a percentage or a viewport step at some breakpoint; none
sizes a column to the digits it holds. The utilities API that would add a step needs Bootstrap's
Sass, and this workspace loads Halfmoon's compiled CSS, so rung 3 is closed. The brief authorised the
authored rule.

### The form-check rule, narrowed rather than kept whole

`.form-check-input-danger` stays, and two of its rules are gone.

- Kept: `:checked`, `:checked[type=checkbox]`, and `[type=checkbox]:indeterminate`. The reading:
  the class census over the compiled cascade returns `.form-check-input` and this project's own
  `.form-check-input-danger` and nothing else, so the shipped cascade carries no tone for a check
  that means "marked for deletion". The declarations mirror the skin's own
  `.form-check-input.is-invalid:checked` recipe (`halfmoon.css:5252`), which cannot be borrowed as it
  stands because that class means the field failed validation and pairs with `aria-invalid`.
- Removed, `:checked[type=radio]`: no radio in `app/**` carries the class, so the rule had no
  population. The compiled output confirms it is gone —
  `radio rule survives: false`.
- Removed, `:focus`: it only re-tinted a ring the skin already draws (`halfmoon.css:4592`), which is
  not a bar being restored, and its `hsla(var(--bs-danger-hsl), 0.35)` ring is a contrast claim I
  cannot settle here. The checkbox now keeps the shipped focus ring, which the matrix family already
  measures.

The class census over the whole surface, with its controls:

```text
class census — markup files walked: 24
class census — cascade tokens read: 4762
class census — population A static tokens: 356
class census — population A undefined: []
class census — population B bound literals: 59
class census — population B undefined: ["group","results","schedule","success","total"]
class census — fed control reported: true
class census — appended control reported: true
```

Population A is every token of a static `class` attribute and reports no undefined token. Population
B is every quoted literal inside a `:class` binding, which is an expression rather than a class list;
each of its hits is ruled and none is a class the element carries — `'schedule'` and `'results'` are
`desk === …` operands (`App.vue:90,108,145,156`), `'success'` is a `toast.tone === …` operand
(`ToastHost.vue:26`), `'group'` is a `step.stage === …` operand (`WorksheetPanel.vue:139`), and
`'total'` is a field argument to `messages(b.id, 'total')` (`BuildingTable.vue:721`). Coverage: both
populations are authored source, so neither sees a class composed at runtime, and neither judges
whether a resolved rule paints what the author intended.

## Item 5 — row names

`nameSelection(building)` is a new leaf in `app/browser/helpers.ts`, and the row's checkbox binds
both its `title` and its `aria-label` to it:

```text
Select building for deletion — Location 1 – Building 1
```

The phrase and its punctuation match the disclosure button's existing per-row name in the same table,
so the ledger speaks one shape. The header's `Select/deselect all buildings` is untouched, because it
names the whole column.

Driving the built workspace resolves it: `workspace row name resolves: true`, by
`getByRole('checkbox', { name: 'Select building for deletion — Location 1 – Building 1' })`.

### One further name, changed because it blocked the journeys

Driving the empty workspace found two reachable elements answering to `Add building`: the toolbar's
primary command and the drop zone's own button. The journey layer refuses an ambiguous name, and
`ADD_COMMAND` is that exact string, so the harness and every journey would have stopped there. The
drop zone's button now reads `Add the first building`, which is the sentence its own paragraph
already uses. Recorded as mine to decide under the brief's copy clause.

## Item 6 — the table and the harness

### The table, widened by the confirmation

`DELETE_TRANSITIONS` lives in `app/browser/constants.ts`, typed
`ReadonlyArray<StateTransition<DeleteState, DeleteEvent>>` on the unions in `app/browser/types.ts`.
The confirm rung added a state and two events, so the table is five rows rather than terrain's three.
**The journey unit's brief must carry this shape.**

| Row                    | From         | Event      | To           | Driven through            |
| ---------------------- | ------------ | ---------- | ------------ | ------------------------- |
| `SELECT_TRANSITION`    | `idle`       | `select`   | `armed`      | The row checkbox          |
| `DESELECT_TRANSITION`  | `armed`      | `deselect` | `idle`       | The row checkbox          |
| `DELETE_TRANSITION`    | `armed`      | `delete`   | `confirming` | Delete selected buildings |
| `CANCEL_TRANSITION`    | `confirming` | `cancel`   | `armed`      | Keep selection            |
| `CONFIRM_TRANSITION`   | `confirming` | `confirm`  | `idle`       | Delete selection          |

Every event the surface accepts in each state it accepts it: `idle` accepts no `delete` because the
command is disabled there, and `confirming` accepts neither `select` nor `delete` because
`showModal()` makes the schedule behind it inert.

### Placement

| Symbol                                                                                                                        | Home                                           |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `DeleteState`, `DeleteEvent`, `HarnessStatus`, `DeleteDriverInterface`, `HarnessRow`                                          | `app/browser/types.ts`                         |
| The five transitions, `DELETE_TRANSITIONS`, the four command names, `DELETE_REASON`, the route and pacing constants           | `app/browser/constants.ts`                     |
| `nameSelection`, `nameTransition`, `readQuery`, `resultToBadge`, and the seven scenario phases                                | `app/browser/helpers.ts`                       |
| The harness page                                                                                                              | `app/browser/components/StatechartHarness.vue` |
| The confirmation                                                                                                              | `app/browser/components/DeleteDialog.vue`      |

`factories.ts` is untouched. The barrel gained the two components.

### The seam that lets one table serve two runners

Every scenario phase receives a `DeleteDriverInterface` — `select`, `delete`, `confirm`, `cancel`,
`armed`, `confirming`, `scheduled`, `settle` — and each runner supplies its own implementation. The
harness implements it over the controls its own widget renders; the browser suite will implement it
over the published journey layer. The page cannot import from `tests/`, and a second table is what
`statechart.md` forbids, so the table and the phases sit in the application's own modules.

`armed()` reads reachability rather than a rendered word: this toolbar hides each command's label
below the `lg` breakpoint, so a label assertion would pass at 1280 and fail at 390 while the surface
behaved identically. `armed()` also refuses while a confirmation stands open, because an inert
control is not reachable however many client rects it has.

The harness reads the confirmation's state from the DOM through a `MutationObserver` filtered to the
`open` attribute, so the badge derives from the same fact the driver reads rather than from a second
flag that can drift.

### The route

- `?harness=statechart` — the entry mounts the harness in place of the workspace.
- `?harness=statechart&play=all` — the whole walk on arrival.
- `?harness=statechart&play=idle-select`, `&play=armed-deselect`, `&play=armed-delete`,
  `&play=confirming-cancel`, `&play=confirming-confirm` — one row.

A row's key is its `from` state and its event joined by a hyphen, composed by `nameTransition`, so no
second identifier has to be kept in step with the table. The page renders every link beside the row
it runs. It rests `HARNESS_PACE = 400` ms between rows and finishes a walk with a demonstration step
that leaves one building selected, so the armed destructive command is on screen.

`main.ts` selects the root from the query and loads the harness through `defineAsyncComponent`, so
the workspace's own entry never carries it.

### What it publishes

`STATECHART_ATTRIBUTES.status`, `.passed`, `.failed`, and `.total` are bound on the harness root
through a computed record keyed from the map, `.scenario` and `.result` on each rendered row, and
`.state` on the badge. No `data-statechart-*` string is spelled in the page. The status derives:
`running` in flight, `pending` before any row has a result, `idle` while some rows have results and
others do not, and `passed` or `failed` once every row has one.

### The chunk and the build delta

| Artifact                | Baseline       | After          | Delta      |
| ----------------------- | -------------- | -------------- | ---------- |
| `assets/index-*.js`     | 1,385.66 kB    | 1,392.64 kB    | +6.98 kB   |
| `assets/index-*.css`    | 466.33 kB      | 466.15 kB      | −0.18 kB   |
| `assets/StatechartHarness-*.js` | absent | 8.76 kB (gzip 3.49 kB) | new chunk |
| Modules transformed     | 202            | 208            | +6         |

The harness lands in its own chunk, so the workspace entry carries only the confirmation, the new
constants, and the leaves.

## The harness, driven in a real browser

`tmp/chrome/harness-run.mjs` serves `dist/app/browser` over loopback, opens the play-all deep link in
Chromium through `playwright`, polls the status attribute until it reads a terminal value, and reads
the tally and every row from the attributes the map names. It then drives the ordinary workspace
route by accessible name. Population: the built entry. Coverage: what this browser rendered at
1280×900 under each theme it switched to; it measures no contrast.

```text
"status": "passed", "passed": "5", "failed": "0", "total": "5", "state": "armed"
"announcement": "The walk is over. One building is selected, so the armed Delete command is on screen."
idle × select → armed, through the row checkbox                        passed
armed × deselect → idle, through the row checkbox                      passed
armed × delete → confirming, through Delete selected buildings         passed
confirming × cancel → armed, through Keep selection                    passed
confirming × confirm → idle, through Delete selection                  passed
```

The workspace readings from the same run:

```text
workspace row name resolves: true
confirmation heading: Delete this building?
confirmation body: It leaves the schedule with the carrier evaluations it carried. You can't undo it.
focus lands on the safe answer: Keep selection
cancel keeps the row: true
confirm empties the schedule: true
Delete disabled again: true
escape keeps the row: true
```

Captures, in `lloyds/tmp/chrome/`: `harness-light.png`, `harness-dark.png`, `workspace-confirm.png`.

## Failing-first proofs

Two mutation probes, each disabling one load-bearing line, rebuilding, re-driving, and restoring the
line from a copy taken first. `tmp/chrome/mutate.sh` is the exact script.

| Mutation                                                              | Reading                                                                                              |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ask()` stops opening the confirmation in `Toolbar.vue`               | `"status": "failed"`, 2 passed, 3 failed — the `armed-delete`, `confirming-cancel`, and `confirming-confirm` rows |
| The row checkbox goes back to one bare name in `BuildingTable.vue`    | `"status": "failed"`, 0 passed, 5 failed, announcing `cannot reach "Select building for deletion — Location 1 – Building 1"` |

Both files were restored from the copies and re-verified: no `if (false)` remains in `Toolbar.vue`,
no bare `aria-label="Select building for deletion"` remains in `BuildingTable.vue`, the binding
`:aria-label="nameSelection(b)"` is back at `BuildingTable.vue:544`, and the re-driven walk reads
`passed · 5 passed · 0 failed`. No `git checkout`, `restore`, `stash`, `reset`, or `clean` ran.

The census and link instruments each carry a fed control and an appended control, and every one
reported.

## Guide parity

`guides/README.md` is new — the repository had none, and `.claude/rules/documentation.md` makes it
the map. It carries a concept index over the columns this workspace has (spec ↔ source ↔ tests; the
`showcase` script packages this same entry rather than demonstrating a public API), sections for the
Delete command, the harness and its route table, the destructive ladder, the row naming, and the
rail's chrome with the two authored rules, plus a directory index over the vendored package guides.

The index's tests column names the proof each concept has **today**, which for four rows is the
harness walk that drives it. It claims no test file that does not cover the row.

```text
links walked: 41
links that resolve to nothing: []
guide files walked: 41
guide files the index omits: []
fed control reported: true
```

## Gates

Run bare on the final tree, exit codes read from the shell.

| Gate                   | Exit | Summary                                                                            |
| ---------------------- | ---- | ---------------------------------------------------------------------------------- |
| `npm run format:check` | `0`  | `All matched files use the correct format.` — 217 files                            |
| `npm run lint:check`   | `0`  | no diagnostics                                                                     |
| `npm run check`        | `0`  | `tsc` app:core, `vue-tsc` app:browser, `vue-tsc` root                              |
| `npm run build`        | `0`  | `✓ built in 2.1s`, 208 modules                                                     |
| `npm test`             | `0`  | app:core `484 passed`, app:browser `247 passed`, policy `111 passed`, config `46 passed` |

The baseline before any edit was green on the same four gates. `npm test` and the build are
observations taken on this host; the authoritative timing reading is the Orchestrator's. The build's
chunk-size advisory over the 1.39 MB entry predates this unit and is a notice, not a failure.

Only the two files I had just written were formatted, each scoped to its own path
(`npx oxfmt --write app/browser/components/Toolbar.vue`, then `guides/README.md`). No tree-wide
`format` or `lint --fix` ran.

## Acceptance criteria

1. **A grep over `app/**` for `navbar-dark`, `dropdown-menu-dark`, `btn-close-white`, and `style=`
   returns only named exemptions.** Met. `style=` returns nothing at all. The `*-dark` patterns
   return two prose comments and no markup: `Toolbar.vue:28` names `navbar-dark` as the class it
   replaced, and the pre-existing `ToastHost.vue:15` records that `btn-close-white` has no rule in
   the shipped cascade.
2. **Every destructive control is solid when armed, neutralized when disabled, and laddered.** Met.
   Armed `btn-danger`, disabled `btn-secondary` with the reason on `aria-describedby`, and the
   confirm rung on the native dialog with verb-labelled answers and focus on the safe one. The ZIP
   retry is ruled non-destructive and retiered to secondary.
3. **Each row's checkbox name interpolates the row's identity.** Met, and resolved in a real browser
   by that name. A mutation back to the bare name reddens every harness row.
4. **The harness page mounts on the constants module's table and publishes every attribute from the
   map; scoped gates and the build are green.** Met. It mounts on `DELETE_TRANSITIONS` from
   `app/browser/constants.ts`, binds every attribute from `STATECHART_ATTRIBUTES` through the map,
   and its own play-all control reads `passed` with a zero failure tally.

## Findings the journey unit needs

1. **The table is five rows, not three.** The confirm rung added the `confirming` state and the
   `confirm` and `cancel` events. Any brief written against terrain's three-row table is stale.
2. **The accessible names the journeys target.** Changed: the row checkbox is now
   `Select building for deletion — Location {location} – Building {number}`, and the drop zone's
   button is `Add the first building`. New: `Delete selection`, `Keep selection`,
   `Play every transition`, `Play {transition name}`. Unchanged: `Add building`,
   `Delete selected buildings`, `Select/deselect all buildings`, `Import buildings from CSV`,
   `Export buildings to CSV`, `Download CSV template`,
   `Smart Default: copy the last building when adding`, `Tips`, `Carrier guidelines`,
   `Quick reference`, `Switch to dark mode` / `Switch to light mode`,
   `Couldn't resolve ZIP code — tap to retry`.
3. **The workspace auto-opens the Quick Reference modal** on a wide, empty schedule until the person
   sets "Do not show" (`QuickReference.vue:16,32`, gated on `MD_MEDIA`). It intercepts pointer
   events, so a journey entering at `md` or wider must dismiss it before reaching anything behind it.
   My instrument does exactly that.
4. **Two controls inside that modal answer to `Close`** — the `btn-close` icon and a footer button.
   That is the ambiguous-name surface finding the journey skill names, in a modal every wide journey
   meets. Out of this unit's items; recorded for the next.
5. **The first browser run after this change re-optimizes `@orkestrel/test`** and Vitest reports
   `Vite unexpectedly reloaded a test`. It does not recur once `node_modules/.vite` holds the
   optimized dependency, and the suite passed both times. The settling edit is
   `optimizeDeps: { include: ['@orkestrel/test'] }` on the `app:browser` project in `vite.config.ts`;
   the harness route needed no `vite.config.ts` change, so I made none.
6. **The new helper leaves have no describe yet.** `helpers.ts` states that each exported leaf is
   mirrored in `tests/app/browser/helpers.test.ts`; `nameSelection`, `nameTransition`, `readQuery`,
   `resultToBadge`, and the seven phases owe theirs. `tests/**` is off-limits to this unit.

## Claims I could not close

- **Every contrast reading.** No pairing here is measured. The rail's tiers, the solid fills, the
  dialog's answers, and the retry's new secondary fill all owe the matrix family's composited
  reading per theme and viewport. Nothing in this unit claims a ratio.
- **The ledger's lost failure mark.** Retiering the summary-cell retry to secondary removed the red
  badge that marked an unresolved ZIP in the ledger. Recorded under Item 3 for a capture round to
  rule on.
- **The drop zone's dark panel.** It keeps `text-bg-dark` with `text-white text-opacity-75` body
  text, which is the vendor's own pairing plus an opacity utility, unmeasured. Only its outline
  button was retiered.
- **The rail's separation in dark mode.** `bg-body-tertiary` under the scoped dark theme sits close
  in value to the dark page behind it, as `bg-dark` did before. A capture round should say whether
  the blotter still reads as its own surface there.
- **The styles directory's shape.** `app/browser/styles/main.scss` remains one file that is both the
  barrel and the authored rules, rather than the `_tokens`/`_theme`/`index` split
  `.claude/rules/styles.md` describes. Restructuring it touches `main.ts` and buys nothing this brief
  asked for.

## Instruments left in `lloyds/tmp/chrome/`

- `census.mjs` — the authored-class census and the style-escape reading, with their controls.
- `earned.mjs` — the reading behind the two authored stylesheet rules.
- `links.mjs` — the guide index's link and coverage reading.
- `harness-run.mjs` — the Chromium driver over the built output.
- `mutate.sh` — the two mutation probes.
- `control-escape.vue` — the appended negative control.
- `../chrome-gates.sh` — the gate chain, one log per gate per stage.
- The gate logs, the drive logs, and the three captures.

## Review evidence

`git diff --stat`:

```text
 app/browser/components/BuildingTable.vue |  19 ++--
 app/browser/components/CSVDropZone.vue   |   4 +-
 app/browser/components/Toolbar.vue       | 117 ++++++++++++---------
 app/browser/constants.ts                 | 109 +++++++++++++++++++-
 app/browser/helpers.ts                   | 168 ++++++++++++++++++++++++++++++-
 app/browser/index.ts                     |   2 +
 app/browser/main.ts                      |  15 ++-
 app/browser/styles/main.scss             |  47 ++++++---
 app/browser/types.ts                     |  63 ++++++++++++
 9 files changed, 470 insertions(+), 74 deletions(-)
```

`git status --porcelain`:

```text
 M app/browser/components/BuildingTable.vue
 M app/browser/components/CSVDropZone.vue
 M app/browser/components/Toolbar.vue
 M app/browser/constants.ts
 M app/browser/helpers.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/styles/main.scss
 M app/browser/types.ts
D  package-lock.json
?? app/browser/components/DeleteDialog.vue
?? app/browser/components/StatechartHarness.vue
?? guides/README.md
?? package-lock.json
```

The staged-deletion and untracked `package-lock.json` rows are the standing condition the brief
named. Nothing staged, restored, or rewrote them. `tests/**`, `package.json`, `configs/**`,
`vite.config.ts`, and every vendored file are untouched.

## Deviation state

No deviation. Nothing in the brief conflicted with the skills, the rules, or the guide. The decisions
the brief left to me — the ladder rung, the class tiers including the Reference group and the drop
zone, the confirmation's copy and its two command names, the retry's tier, the authored rules kept
and dropped, the widened transition table, and the drop zone's disambiguated name — are each recorded
in the section that owns them.
