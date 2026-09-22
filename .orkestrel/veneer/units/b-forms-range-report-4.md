# B-FORMS-RANGE-4 — report

`opus` on Opus 5, sole writer in `/home/user/veneer-bfr` (worktree detached at `3a9202a`).
Brief: `tmp/units/b-forms-range-brief-4.md`.

**Headline.** Findings 2 through 10 are closed and the tree is green apart from the sweep case the
brief records as the baseline red. **Finding 1 is not done.** Its fix needs a line in the off-limits
`tests/setupStyles.ts`, so § Deviation carries it with the measured evidence and the exact patch set.

## Per finding

### 1. The tokenizing ceiling — NOT DONE (deviation)

Held whole rather than landed in part, because landing the owned half alone leaves the tree red.
`FORM_RANGE_CASES` in the off-limits `tests/setupStyles.ts` records `--vn-color-primary-base` as a
custom property four range selectors read, and both range proofs assert that record against the
compiled declarations. Evidence and patch set are under § Deviation.

### 2. The guide overclaims the evidence — done

- `guides/veneer.md` § Compatibility, the `form-range` selector row, now reads: "The `.form-range`
  family ships in the components layer, its focus and disabled states included; the host's resolved
  geometry and the thumb and track declarations are proved in
  `tests/src/styles/components/form-range.test.ts`." The cell is padded to the table's own
  225-character obligation column, so no other row moved. The `active` member left the row's
  enumeration to fit that column; the section's own departure list keeps it, and the row's second
  clause names the thumb and track rules the `:active` rule belongs to.
- `guides/veneer.md` § Form range classes, the evidence paragraph: the "Two limits" tally is gone;
  the held-thumb drive limit is stated ("A pointer hold on a slider part is not reachable through
  the installed browser exports, and a hold on the control itself moves the value rather than
  entering the part's `:active`, so the held thumb has a declaration reading and no drive."); the
  ring's rendered evidence is stated open, and its contrast ratio stated uncompared for this key
  because `readRing` reads the chrome the focused element itself wears while this ring sits on a
  part Chromium withholds.
- `tests/setup.ts`, the `FORM_RANGE_KEYS` doc block: the page-frame reason is the blank-frame
  measurement `CASCADE_KEYS` records, not the ring cropping.
- `tests/app/browser/integration.test.ts`, the range case: a comment beside the `FRAMES.page` call
  gives the same blank-frame reason, and the ring comment now says the frame shows the rendered
  thumb and track rather than a resolved ring.

No mutation: this finding changes prose only. Evidence that the prose still binds: `npm run
test:app` and `npm run test:setup` counts under § Gates.

### 3. The § Tests list insertion — done

`[the range classes](../tests/src/styles/components/form-range.test.ts),` sits after the
vertical-rule link in `guides/veneer.md` § Tests, in the list's own form. `npm run test:guides`
exits 0.

### 4. One term for the state — done

`disabled` replaces `unavailable` at every site the brief names:

- `app/browser/constants.ts`: the range paragraph ("Compare the slider at rest and disabled: …")
  and the accessible name `Disabled range value`.
- `guides/veneer.md` § Form range classes: "the disabled thumb reads `--bs-secondary-color`".
- `tests/app/browser/sections/FormRangeSection.test.ts`: the case title, the expected name, the
  binding, and the comment.
- `tests/app/browser/integration.test.ts`: the binding and the comment in the range case.
- `tests/setupStyles.test.ts`: the comment in the markup case.

The accessible names stay distinct: `Range value` against `Disabled range value`. The regenerated
`range-disabled--*-accessibility.txt` frames record `slider "Disabled range value" [disabled]`.
`unavailable` survives only at `form-range.test.ts:127`, where it names a reading that cannot be
obtained. One further site sits in the off-limits `tests/setupStyles.ts` and is reported under
§ Shared and off-limits patches.

### 5. Misfiled cases — done

Both range cases moved out of `describe('reference map refusals')` to the end of
`describe('styles setup')` in `tests/setupStyles.test.ts`, keeping their order. The markup case is
retitled `carries the classed pair, the disabled control, and the bare control in the range markup`.
`describe('reference map refusals')` now holds refusal cases alone.

### 6. The compiled-cascade reading folds a conditioned twin — done

The moved binding case keys its `written` map by selector and condition: the key is the selector
where `condition` is `undefined`, and `` `${selector} ${condition}` `` otherwise, on both sides of
the comparison. The inventory side is keyed the same way off `OracleRule.condition`, so the
comparison is against the 16 recorded rules rather than the 14 distinct selectors. The `reads` loop
still resolves each resting rule by its bare selector, because a resting rule's key is its selector.

- Mutation: the `::-moz-range-thumb` reduced-motion twin dropped from the partial, by gating the
  `@include transition(...)` on `$offset` and writing the raw `transition` declaration in the
  `@else` branch, which leaves the resting Gecko declaration in place and removes only the twin.
- Command:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`
- Red: `Tests  2 failed | 69 passed (71)` — the sweep baseline case plus
  `styles setup > binds every range selector to the inventory, to its engine, and to the tokens it reads`.
- Reverted, green: `Tests  1 failed | 70 passed (71)` — the sweep baseline case alone.
- The partial is byte-identical to its pre-mutation content (`md5 7db2fd440cfc326827d97e8a475453d8`).

Keyed by selector alone this mutation passed, which is the hole reviewer R1 reported.

### 7. `above` as a cross-reference — done

`tests/src/styles/components/form-range.test.ts:158` reads "the preceding declaration is what
carries it".

### 8. The departure bullets name no resolved value — done

In `guides/veneer.md` § Form range classes:

- the focus-ring bullet reads "reads `--vn-focus-width` and `--vn-focus-color` for the ring, which
  resolves to a `0.1875rem` ring and is the binding `.btn` already carries";
- the transition bullet reads "Veneer writes `var(--vn-motion-feedback) var(--vn-ease-standard)`,
  which resolves to `0.15s ease`, and emits the reduced-motion twin through the shared transition
  mixin, as `.btn` does".

### 9. The mutation readings, re-taken — done

Each mutation was rebuilt into the partial, run, and reverted, through
`/tmp/…/scratchpad/mutations.py`. The styles command is
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts`;
the build precedes it because the styles project reads the built cascade. The Gecko mutation uses
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`,
whose green reading carries the sweep baseline red.

| Mutation                     | Red                            | Case that reddened                                                                | Restored                       |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------- | ------------------------------ |
| `appearance: none` dropped   | `1 failed \| 5 passed (6)`     | `strips the native slider chrome and sizes the host over the whole line`          | `6 passed (6)`                 |
| host `height: 1.5rem`        | `2 failed \| 4 passed (6)`     | the host-height case and the WebKit part-rule case                                | `6 passed (6)`                 |
| release's literal focus ring | `2 failed \| 4 passed (6)`     | the focus case and the WebKit part-rule case                                      | `6 passed (6)`                 |
| transition outside the mixin | `1 failed \| 5 passed (6)`     | `gates the thumb transition on the reduced-motion preference …`                   | `6 passed (6)`                 |
| Gecko row dropped            | `2 failed \| 69 passed (71)`   | `binds every range selector to the inventory, to its engine, and to the tokens it reads` | `1 failed \| 70 passed (71)` |

The script asserts the partial is byte-identical to its starting content after the last revert, and
it printed `partial restored byte for byte`.

### 10. The portfolio — done

Four capture runs, each `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'`, each
`Tests  26 passed (26)`: `light-390`, `light-1280`, `dark-390`, `dark-1280`.

`range*` under `tmp/capture/states/`:

```text
range--dark-1280-accessibility.txt   range--dark-1280.png
range--dark-390-accessibility.txt    range--dark-390.png
range--light-1280-accessibility.txt  range--light-1280.png
range--light-390-accessibility.txt   range--light-390.png
range-disabled--dark-1280-accessibility.txt   range-disabled--dark-1280.png
range-disabled--dark-390-accessibility.txt    range-disabled--dark-390.png
range-disabled--light-1280-accessibility.txt  range-disabled--light-1280.png
range-disabled--light-390-accessibility.txt   range-disabled--light-390.png
range-focus--dark-1280.png   range-focus--dark-390.png
range-focus--light-1280.png  range-focus--light-390.png
```

`range-focus--dark-390.png` (604092 bytes) and `range-focus--dark-1280.png` (727238 bytes) exist,
which closes analyst 4 and reviewer R2.

## Deviation

Per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`, and per this brief's
own deviation contract ("stop and report … on any finding whose fix needs an off-limits line").

**Expected.** Finding 1 closes inside the owned files: the partial, the proof, the guide, and the
ledger.

**Found.** The partial's thumb fill is also recorded in `FORM_RANGE_CASES`, which lives in the
off-limits `tests/setupStyles.ts` at around line 2763. Four entries name `--vn-color-primary-base`
in their `reads` list — `.form-range::-webkit-slider-thumb`, `.form-range::-moz-range-thumb`, and
both `:active` twins — and each list is asserted against the compiled declarations, in
`tests/src/styles/components/form-range.test.ts` (the WebKit part-rule case) and in the moved
binding case in `tests/setupStyles.test.ts`. Rewriting the declarations to `var(--vn-palette-blue)`
makes those records false, and no owned file can correct them.

**Exact evidence.** I applied the partial's half of finding 1 as a probe, measured, and reverted it
by the exact reverse edit (`md5 7db2fd440cfc326827d97e8a475453d8` before and after):

- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts`
  → `Tests  1 failed | 5 passed (6)`, on
  `keeps the WebKit part rules in the cascade and reports the host style for a part pseudo`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`
  → `Tests  2 failed | 69 passed (71)`, the sweep baseline plus
  `binds every range selector to the inventory, to its engine, and to the tokens it reads`.
- `npm run test:conformance` → `Tests  2 failed | 15 passed (17)`, printing the exact ledger rows
  reproduced under **Patch C**.

**Done or not done.** Not done, and not landed in part. The tree carries no half of finding 1, so
every gate under § Gates reads the state the brief expects apart from the named baseline red.

**Hypothesis.** The brief's owned list was drawn from the files finding 1 names rather than from the
files its result makes false, so the `reads` table that mirrors the partial's declarations was not
granted.

**What settles it.** A successor unit granted `tests/setupStyles.ts` — or the Orchestrator applying
**Patch B** serially and re-dispatching the rest — running the two commands preceding plus
`npm run test:conformance`.

### The patch set for finding 1

**Patch A — `src/styles/components/_form-range.scss` (owned, not applied).**

```diff
 		.form-range#{$thumb} {
 			width: var(--vn-space-8);
 			height: var(--vn-space-8);
 			@if $offset {
 				margin-top: calc(var(--vn-space-2) * -1);
 			}
 			appearance: none;
-			background-color: var(--vn-color-primary-base);
+			background-color: var(--vn-palette-blue);
 			border: 0;
@@
-		// The held thumb lightens to three tenths of the role fill over the white palette entry,
-		// which is the tint the release bakes into its own literal.
+		// The held thumb lightens to three tenths of the blue palette entry over the white one,
+		// which is the tint the release bakes into its own literal. The fill is the palette entry
+		// rather than the role token, because the release's own value is that blue.
 		.form-range#{$thumb}:active {
 			background-color: color-mix(
 				in srgb,
-				var(--vn-color-primary-base) 30%,
+				var(--vn-palette-blue) 30%,
 				var(--vn-palette-white-base)
 			);
 		}
```

**Patch B — `tests/setupStyles.ts` (OFF-LIMITS, report-only).** In `FORM_RANGE_CASES`, write
`'--vn-palette-blue'` where `'--vn-color-primary-base'` stands, in the `reads` list of each of
`.form-range::-webkit-slider-thumb`, `.form-range::-moz-range-thumb`,
`.form-range::-webkit-slider-thumb:active`, and `.form-range::-moz-range-thumb:active`. No other
entry, and no other line of the file, changes.

**Patch C — `guides/ledger/departures.md` (owned, not applied).** Four `form-range` rows take a new
Veneer cell. `npm run test:conformance` printed them under the probe:

```text
form-range | .form-range::-webkit-slider-thumb        | background-color | — | #0d6efd | var(--vn-palette-blue)
form-range | .form-range::-moz-range-thumb            | background-color | — | #0d6efd | var(--vn-palette-blue)
form-range | .form-range::-webkit-slider-thumb:active | background-color | — | #b6d4fe | color-mix(in srgb, var(--vn-palette-blue) 30%, var(--vn-palette-white-base))
form-range | .form-range::-moz-range-thumb:active     | background-color | — | #b6d4fe | color-mix(in srgb, var(--vn-palette-blue) 30%, var(--vn-palette-white-base))
```

Each departure member stays `tokenized`. Re-pad each rewritten Veneer cell to the table's
194-character column so the surrounding rows do not move.

**Patch D — `guides/veneer.md` § Form range classes (owned, not applied).** The fill bullet becomes:

```text
- **The thumb paints the blue palette entry.** The resting thumb reads `--vn-palette-blue`, the
  entry that resolves to the official cascade's own `#0d6efd`, and the held thumb lightens it to
  three tenths of that entry over `--vn-palette-white-base`, which is the tint the official cascade
  bakes into its own literal. A `--vn-color-primary-base` retune therefore leaves the thumb on the
  official blue, because the rule reads the palette entry rather than the role fill.
```

**Patch E — `tests/src/styles/components/form-range.test.ts` (owned, not applied).** The fill case
(`retunes the thumb fill and the track fill with the color mode and with a direct override`) reads
the thumb rule's declared value out of `readRules()` and binds it to the palette token, beside the
existing `--bs-secondary-bg` and `--bs-secondary-color` mode readings. The shape:

```ts
// The thumb's fill is the release's own blue, so the rule reads the palette entry rather than the
// role token: a `--vn-color-primary-base` retune leaves the thumb where the release paints it. The
// declaration is read out of the cascade because Chromium withholds the part's computed style.
const resting = requireValue(
  readRules()
    .filter((rule) => rule instanceof CSSStyleRule)
    .find((rule) => rule.selectorText === '.form-range::-webkit-slider-thumb'),
  'The cascade carries no resting thumb rule',
)
expect(resting.style.getPropertyValue('background-color')).toBe(
  `var(${TOKEN_NAMES.palette.blue})`,
)
expect(readToken(dark, TOKEN_NAMES.palette.blue)).toBe(readToken(light, TOKEN_NAMES.palette.blue))
```

`readRules` meets a top-level rule before a rule nested inside an earlier one, and the resting rule
is a direct child of the `components` layer while the reduced-motion twin sits one level deeper
inside the `@media` block, so the `find` reaches the resting rule. The case's existing loop over
`TOKEN_NAMES.color.primary.base` must drop that member, because no part rule reads it after the
change. **This patch is unverified by a run**, because Patch B is what lets it go green; the
mutation that settles it is the role token restored in the thumb rule, red, reverted, green.

**Brief fact that does not resolve.** Finding 1 names "the way the pagination section states it for
the current page" as the model for the retune sentence. `guides/veneer.md` has no pagination
section, and a search of `guides/*.md` for `pagination` returns nothing, so Patch D writes the
sentence in the § Form range classes voice instead.

## Shared and off-limits patches

- **`tests/setupStyles.ts`, `FORM_RANGE_MARKUP` at around line 2842 (off-limits).** The fixture's
  middle control still carries `aria-label="Unavailable range value"`, which is the last site
  naming the class state `unavailable`. Finding 4 does not name it and no test asserts it. Write
  `aria-label="Disabled range value"` there to finish the term sweep. Not a blocker.
- **Patch B, preceding.** The finding-1 blocker.
- `tests/setup.test.ts` and `tests/setupServer.test.ts`, the brief's shared files, need no patch:
  neither names a range specimen, an accessible name, or a moved case.

## Touched files

| File                                                | Change                                                                                                 |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `guides/veneer.md`                                   | § Compatibility row rewritten; evidence paragraph rewritten; two departure bullets gain the resolved clause; `disabled` for `unavailable`; § Tests gains the range link |
| `app/browser/constants.ts`                           | `disabled` in the range paragraph and in the second specimen's accessible name                         |
| `tests/app/browser/sections/FormRangeSection.test.ts`| title, expected name, binding, and comment take `disabled`                                             |
| `tests/app/browser/integration.test.ts`              | range case: `disabled` binding and comment; blank-frame reason beside the page frame; ring comment narrowed |
| `tests/setup.ts`                                     | `FORM_RANGE_KEYS` doc block gives the blank-frame reason                                               |
| `tests/setupStyles.test.ts`                          | two range cases moved to `describe('styles setup')`; markup case retitled and its comment reworded; binding case keys the written map by selector and condition |
| `tests/src/styles/components/form-range.test.ts`     | "the preceding declaration"                                                                            |
| `tmp/capture/states/**`                              | every `range*` frame regenerated for the four variants, `range-focus--dark-*` added                    |

Unchanged this round, and therefore carrying no part of finding 1:
`src/styles/components/_form-range.scss`, `guides/ledger/departures.md`,
`app/browser/sections/FormRangeSection.ts`.

Diffstat against `3a9202a` for the whole RANGE unit, the files this round touched:

```text
 app/browser/constants.ts              |  29 ++++++
 guides/veneer.md                      | 182 ++++++++++++++++++++++------------
 tests/app/browser/integration.test.ts |  41 ++++++++
 tests/setup.ts                        |  29 ++++++
 tests/setupStyles.test.ts             |  72 ++++++++++++++
 5 files changed, 291 insertions(+), 62 deletions(-)
```

## Gates

Scoped `npx oxfmt --config .oxfmtrc.json --write` ran over the six owned TypeScript files first.
Every command ran from `/home/user/veneer-bfr`.

| Command                    | Exit | Reading                              |
| -------------------------- | ---- | ------------------------------------- |
| `npm run format:check`     | 0    | 215 files, correct format            |
| `npm run lint:check`       | 0    | no diagnostic                        |
| `npm run check`            | 0    | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run build:src`        | 0    | `dist/src/styles/index.css` 91.43 kB |
| `npm run test:src:styles`  | 0    | `Test Files  59 passed (59)`, `Tests  422 passed (422)` |
| `npm run test:app`         | 0    | `Test Files  11 passed (11)`, `Tests  28 passed (28)` |
| `npm run test:conformance` | 0    | `Test Files  1 passed (1)`, `Tests  17 passed (17)` |
| `npm run test:guides`      | 0    | `Test Files  1 passed (1)`, `Tests  18 passed (18)` |
| `npm run test:setup`       | 1    | `Tests  1 failed \| 161 passed (162)` |

`npm run test:setup`'s single red is
`styles setup > carries no shared written declaration block across style partials`, the sweep case
the brief records as the baseline red until B-SWEEP-2 lands. Both moved range cases are green inside
that run.

**Observations, not criteria.** `npm run test:policy` exited 0 with
`Tests  109 passed | 1 skipped (110)` under the container's load at the time. The four capture
journeys each exited 0 with `Tests  26 passed (26)`, in 44 to 51 seconds each. `npm run test:journey`
was not run whole; the deciding whole-suite and timing readings are the Orchestrator's.

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
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/FormRangeSection.ts
?? src/styles/components/_form-range.scss
?? tests/app/browser/sections/FormRangeSection.test.ts
?? tests/src/styles/components/form-range.test.ts
```

Only the RANGE unit's paths, `tests/setupStyles.ts` among them from RANGE-1 and untouched by this
round. `tmp/` is ignored, so the regenerated frames do not appear.

## Choices settled inside the deviation contract

- The § Compatibility row dropped `active` from its enumeration to fit the table's own column
  rather than re-pad every row of a table this brief scopes out.
- The finding-6 key is `selector` where the condition is absent and `` `${selector} ${condition}` ``
  otherwise, written inline on each side rather than through a helper, because a module helper in a
  test file would be a hidden declaration.
- The blank-frame reason is stated in a comment placed before the `FRAMES.page` call in the journey
  case, where it explains the call the reader is about to meet.
- Patch D's retune sentence is written in the § Form range classes voice, the named pagination model
  having no referent.
