# Unit 12 report — the style instruments, and the refused write

Every criterion is done. Each style instrument now feeds the branch it exists for, each reports the
population it walked in the written artifact, and each was shown failing by disabling its reader and
recording the red. The application's refused-write leg is closed: the mode a person asks for is
painted, the control announces only what the document paints, and the refusal no longer escapes.

**Touched files**

- `app/browser/helpers.ts` — `rememberTheme`, the one boundary the color mode reaches the store
  through, which catches a refused write; `writeTheme` paints before it remembers.
- `app/browser/controllers/ApplicationController.ts` — `theme` paints, then persists, then moves the
  flag, and its headless branch writes through `rememberTheme` instead of a raw `setItem`.
- `tests/app/browser/controllers/ApplicationController.test.ts` — the refusing-store proof and its
  accepting-store partner.
- `tests/app/browser/setup.ts` — `buildCompositeStack`, `readFlat`, `readCensus`, `CENSUS_RULE`,
  `buildEscapeFixtures`, and the corrected `CONTENT_CONTROL` remark.
- `tests/app/browser/integration.test.ts` — `readComposite`, `readScreenCensus`, `readEscapes`, the
  per-screen census calls, the contrast coverage row, and the rewritten transport leg.

**Diffstat**

```text
 app/browser/controllers/ApplicationController.ts   |  15 +-
 app/browser/helpers.ts                             |  39 ++++-
 .../controllers/ApplicationController.test.ts      |  36 +++-
 tests/app/browser/integration.test.ts              | 194 ++++++++++++++++-----
 tests/app/browser/setup.ts                         | 152 +++++++++++++++-
 5 files changed, 383 insertions(+), 53 deletions(-)
```

## 1. Done / not done

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `oxfmt --check` on the owned files | Done | `All matched files use the correct format.` |
| 2 | `oxlint --deny-warnings` on the owned files | Done | No diagnostic, exit 0 |
| 3 | `npm run check` | Done | exit 0, taken after the final edit |
| 4 | Each instrument has a control that fails at its own branch, shown red | Done | § 2 |
| 5 | Each instrument reports the population it walked | Done | § 3 |
| 6 | No refusal escapes, and no control announces an unpainted mode | Done | § 4 |
| 7 | The ruling on telling the person is implemented and justified | Done | § 4 |
| 8 | `npm run test:app:browser` | Done | `Test Files 38 passed (38)`, `Tests 150 passed (150)`, 30.09s |
| 9 | `npm run test:journey` green for all four projects | Done | `Test Files 4 passed (4)`, `Tests 76 passed / 4 skipped (80)`, 39.33s |
| 10 | `VITE_CAPTURE=true npm run test:journey` green, every frame written | Done | `Test Files 4 passed (4)`, `Tests 80 passed (80)`; 104 files in `tmp/capture/states`, taken after deleting the directory |
| 11 | `npm test` exits 0 | Done | exit 0: `app` 183 passed over 43 files, `journey` 76 passed and 4 skipped, `policy` 111 passed, `config` 46 passed |

## 2. The instruments and the red that proves each control

Every control run and every red was taken with one command, so the disable is the only thing that
changed between the green and the red:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project 'journey:light-1280' -t 'reads contrast'
```

Before any disable, and after every restore, that command reports `Tests 1 passed | 19 skipped (20)`.
Each disabled reader reports `Tests 1 failed | 19 skipped (20)`.

### R4 — composited contrast

**What it now feeds.** `buildCompositeStack` composes, inside the variant loop and appended to the
mounted surface, an opaque `rgb(255, 255, 255)` base carrying an `rgba(0, 0, 0, 0.06)` tint. Two
foregrounds sit on that tint: a control at `rgb(150, 150, 150)` and a survivor at `rgb(0, 0, 0)`.
Neither paints a background, so the reader's ancestor walk and its alpha blend both run, which no
earlier harness control made them do.

**Why it discriminates.** `readFlat` is the rival reading the instrument must exclude: it stops at
the first ancestor declaring a background and discards that color's alpha. The two readings disagree
in opposite directions, and the assertions pin all four numbers, so no non-compositing reader can
satisfy them. Measured at every variant: control flat 7.100, composited 2.589; survivor flat 1.000,
composited 18.378; bar 4.5.

**The red.** Disabled `readSurface`'s non-gradient branch to return `readFlat(node)` instead of the
composited read, leaving the gradient path intact so the failure lands on this control rather than on
an older fixture:

```text
AssertionError: light-1280 | the composited reading fails the bar on the control: expected 7.0997462813977235 to be less than 4.5
Tests  1 failed | 19 skipped (20)
```

### R5 — the authored-class census

**What it now feeds.** `readCensus` appends the SVG carrying `roughnotes-undeclared-mark` to the same
root it walks, so the carried token reaches the difference through `readClasses` rather than beside
it, and hands `roughnotes-undeclared-control` straight to the set comparison. It runs on every screen
the matrix loop drives, not on home alone, and pushes its row before it asserts, so a failing run
still writes what it read.

**The red.** Disabled the extraction door by not appending the SVG:

```text
AssertionError: light-1280 | home | authored tokens no loaded stylesheet declares: expected [ 'roughnotes-undeclared-control' ] to deeply equal [ …(2) ]
-   "roughnotes-undeclared-mark",
Tests  1 failed | 19 skipped (20)
```

### R6 — style escapes

**What it now feeds.** `buildEscapeFixtures` supplies an inline-attribute escape and a
component-scoped `<style>` element — the branch nothing fed before — and the permitted fixture: the
standalone project stylesheet block in `<head>`, carrying `id="roughnotes-stylesheet"` so the reading
can name it. The reading over the mounted surface must report the escaping fixtures in document
order; the same reader over `document.head` must report the permitted block; and the surface reading
must not name it. A reader passing by rejecting every style element fails the permitted assertion,
and one blind to style elements fails the surface assertion.

**The red.** Disabled the element branch by filtering `<style` markup out of the reading:

```text
AssertionError: light-1280 | style escapes on the mounted surface: expected [ '<p style="color: rgb(1, 2, 3)">' ] to deeply equal [ …(2) ]
-   "<style>",
Tests  1 failed | 19 skipped (20)
```

## 3. The populations, and their bounds

Rows from `tmp/journeys/light-1280.txt`. The instrument rows are pushed for every variant, so each
artifact shows the instrument covered all four rather than only its own; the surface contrast and
ring readings stay gated to the artifact's own variant, as they were.

**The census**, per screen and per variant, naming its membership rule
(`every class token the mounted subtree carries, against every loaded stylesheet`):

```text
census | light-1280 | home            | walked 366 elements carrying 145 tokens | undeclared roughnotes-undeclared-control, roughnotes-undeclared-mark
census | light-1280 | subscribe       | walked 154 elements carrying 108 tokens | undeclared …
census | light-1280 | magazine        | walked 231 elements carrying 107 tokens | undeclared …
census | light-1280 | magazine miss   | walked 144 elements carrying 102 tokens | undeclared …
census | light-1280 | contact refused | walked 179 elements carrying 108 tokens | undeclared …
census | light-1280 | contact partial | walked 166 elements carrying 112 tokens | undeclared …
census | light-1280 | magazine empty  | walked 131 elements carrying  98 tokens | undeclared …
census | light-1280 | item partial    | walked 154 elements carrying 119 tokens | undeclared …
```

The undeclared list holds the two controls on every row, which is the census reporting that the
shipped markup carries no token the loaded cascade misses. **Bound:** these are the screens the
matrix loop drives. Products, publications, marketplace, about, newsletter, media, shop, payment, and
the detail screens are not censused; a token only those screens carry is unmeasured.

**The escapes**, per variant, with the bound in the row:

```text
escape | light-1280 | inline attributes and style elements on the mounted surface, read on home before a journey drives it | walked 367 elements | reported 2 | the permitted head block left alone
```

**Bound:** home, undriven. A style a later interaction writes is outside it, which is why the reading
is taken before the loop drives anything.

**The composited contrast**, per variant, plus the coverage row the contrast matrix now writes:

```text
composite | light-1280 | rgba(0, 0, 0, 0.06) over rgb(255, 255, 255) | control flat 7.100 composited 2.589 | survivor flat 1.000 composited 18.378 | bar 4.5
contrast  | light-1280 | coverage | shell, home, subscribe, magazine, magazine miss, contact refused, contact partial, magazine empty, item partial | 236 members read | bars 4.5 text and 3 mark
```

**Bound:** the coverage row names the screens the contrast matrix read and how many members it held
to a bar in that variant. A pairing on a screen absent from that list is unmeasured, and the
composited control establishes that the reader composites — not that any unvisited surface passes.

## 4. The refused write

### What changed

`rememberTheme` is the one place the color mode reaches the store, and it catches the refusal there.
`writeTheme` paints `data-bs-theme` before it calls it, so a refused write can no longer stop the
paint. `ApplicationController.theme` paints first, persists second, and moves `dark` last, so the
flag the masthead reads cannot announce a mode the document is not in — the ordering makes it
structural rather than an argument about what can throw. The controller's headless branch now writes
through `rememberTheme` too, which removes a raw `setItem` that could throw and a duplicated
`'dark'` / `'light'` literal. `start` reaches the store through the same boundary, so the refusal is
closed at both doors rather than at the one unit 11 drove.

### The failing proof

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/controllers/ApplicationController.test.ts
```

Before the fix: `Tests 1 failed | 8 passed (9)` —
`expected [Function] to not throw an error but 'QuotaExceededError: No room is left for roughnotes-theme' was thrown`,
raised by `app.start()` against a `QuotaStorage({ writes: 0 })`. After the fix: `Tests 9 passed (9)`.

The journey leg is driven through the real refusing store and the real masthead control, and it was
shown able to fail: with the `catch` removed from `rememberTheme`,
`-t 'store refuses to keep'` on `journey:light-1280` reports `Tests 1 failed | 19 skipped (20)`; with
it restored, `Tests 1 passed | 19 skipped (20)`. The leg now asserts what ships — the document paints
dark, the control announces `pressed=true` for that dark, the store still holds `light`, the page
gains no sentence, a `window` error recorder captures nothing across the press, and a second session
over the same store opens light with the control announcing `pressed=false`.

### The ruling: the person is not told

**No failure sentence and no retry control.** Four reasons, in order of weight.

- **The action succeeds.** After the repair the person gets exactly what they asked for: the page
  paints the mode they picked, for as long as they are on it. What failed is the memory of the
  preference, which they never asked for in that press.
- **A sentence would report a failure the person did not experience.** It would appear on a control
  people press to change how a page looks, in the middle of whatever they were reading, saying the
  page did what they wanted — and something else did not.
- **There is no recovery to offer.** A retry writes the same key to the same full store and refuses
  identically. The real remedy — clear site data, leave private browsing — is outside this
  application, so a retry control would be a button that cannot work, and the skill's transport
  family wants a retry that clears the failure.
- **The control still tells the truth about the mode.** `aria-pressed` and the label derive from
  `dark`, which the repair moves after the paint, so the control announces the document's mode and
  nothing else. That is the honesty obligation, and it is met by the ordering rather than by prose.

**The accepted cost.** The person is not told their color mode will not survive the session, and
discovers it on the next visit. That is the loss this ruling takes, and it is smaller than an
interruption on every toggle with no action attached to it.

**What would change the ruling.** A mode that carried task meaning rather than display preference, or
a refusal a retry could clear, would earn the sentence. Neither holds here.

## 5. Observations

- **`CONTENT_CONTROL` named the wrong element.** Corrected: home paints no in-content link to the
  shop, the name resolves to the footer destination, and the matrix label now reads
  `footer destination` rather than `in-content link`. That label appears in the artifact's contrast
  and ring rows, so those rows read differently than they did.
- **Durations.** The matrix test takes 9.6s of its 180s budget on one project with the new readings
  in it. `npm run test:app:browser` 30.09s; `npm run test:journey` 39.33s; the capture run 48.38s;
  `npm test` 30.52s, 38.66s, 1.41s, and 1.73s across its legs. Bootstrap's 329 Sass deprecation
  warnings appeared in every run.
- **A `[Vue warn]: Unhandled error during execution of setup function` line in the `app` project is
  not mine.** `tests/app/browser/composables/useApplication.test.ts` drives that refusal deliberately
  and captures it. That file is unowned and unmodified.
- **The census reads the same tokens in light and dark.** Class tokens do not move with the mode, so
  the variants agree row for row. The rows are still written per variant, because an unstated
  coverage claim reads as complete.
- **`rememberTheme` has no assertion in its own mirrored test file.**
  `tests/app/browser/helpers.test.ts` is neither owned nor off-limits in this brief, so it is
  untouched; its existing `writeTheme` assertions stay true and green. The new boundary's behaviour
  is proven through `ApplicationController.test.ts` against the real refusing store.

## 6. What I did not close

- **The refused read.** `readTheme` calls `storage.getItem` from the controller's constructor, and a
  browser holding storage behind a permission throws from that call, so it escapes out of
  `createApplication`. This unit's named property is the write leg; the read is a different door and
  is recorded here for the capability that owns theme persistence rather than reopened into this
  change.
- **The census bound and the escape bound**, stated in § 3 and carried in the artifact rows rather
  than closed: the census walks the screens the matrix loop drives, and the escape reading covers
  home undriven.
- **A `helpers.test.ts` row for `rememberTheme`**, for the reason in § 5.
