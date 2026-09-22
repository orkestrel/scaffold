# B-PASSIVE-E-2 report — the fix round

Every finding the brief carries is closed in the owned files, and each reworked proof was read red
against its named mutation and green after that mutation was reverted. One acceptance criterion is
not met: the `glowing-placeholder` row the brief prescribes makes the capture portfolio's region
guard refuse the frame, because the declared region becomes a flat grey bar. § Deviations carries
the measurement and the candidate resolutions, each of which needs a file this unit does not own.

## Finding — analyst 3, the spinner mode case

**Change.** `tests/src/styles/components/spinner.test.ts`, the case
`takes its paint from the text of whichever mode it renders in`. Each mode is read twice. The
inherited reading keeps the host's text on `var(--vn-text-body-base)` and asserts what it asserted
before. The moved reading shifts the mode scope's own `color` to `rgb(10, 20, 30)`, a value no rule of this
cascade writes, and requires the ring, the disc, and the spinner's own text to follow it.
Assertions beside them require neither mode's body text to resolve to that value, so the moved
reading reads the inherited text rather than the token beneath it.

The move is written on the `[data-bs-theme]` scope rather than on the mounted container.
`scene.mount` returns a wrapper whose child carries the inline `color` declaration, so a `color` written on the
wrapper never reaches the spinners.

**Mutation.** `src/styles/components/_spinner.scss`, the `.spinner-border` rule:
`border: var(--bs-spinner-border-width) solid currentcolor` replaced with
`border: var(--bs-spinner-border-width) solid var(--vn-text-body-base)`.

Before the rework, with the mutation applied:

```text
npm run test:src:styles -- tests/src/styles/components/spinner.test.ts \
  tests/src/styles/components/placeholder.test.ts \
  -t 'takes its paint from the text of whichever mode it renders in'
→ Test Files 1 passed | 1 skipped (2); Tests 1 passed | 30 skipped (31)
```

After the rework, with the same mutation applied:

```text
npm run test:src:styles -- tests/src/styles/components/spinner.test.ts -t 'takes its paint'
→ Test Files 1 failed (1); Tests 1 failed | 19 skipped (20)
AssertionError at spinner.test.ts:248 — expect(matchesColor(moved.ring, independent)).toBe(true)
```

After reverting the mutation, with the rework in place:

```text
npm run test:src:styles -- tests/src/styles/components/spinner.test.ts -t 'takes its paint'
→ Test Files 1 passed (1); Tests 1 passed | 19 skipped (20)
```

The revert is byte-exact: `sha256sum src/styles/components/_spinner.scss` reads
`da61729aee47f52ecf1abf9c8873c6ab47c0ddd0bcbb6d4d3bb61569be98ca23` before the mutation and after the
revert.

## Finding — analyst 3, the placeholder sizing case

**Change.** `tests/src/styles/components/placeholder.test.ts`, the case
`floors $name at its own share of the font`. The host mounts without an inline font, and the font is
driven from the mounted container across `40px` and `25px`, with the font and the floor read at each
size. Every recorded factor — `1`, `0.6`, `0.8`, and `1.2` — lands on a whole pixel at each size, so
neither reading pins a browser's rounding.

**Mutation.** `src/styles/components/_placeholder.scss`, the `.placeholder` rule: `min-height: 1em`
replaced with `min-height: 40px`.

Before the rework, with the mutation applied:

```text
npm run test:src:styles -- tests/src/styles/components/placeholder.test.ts -t 'floors'
→ Test Files 1 passed (1); Tests 4 passed | 7 skipped (11)
```

After the rework, with the same mutation applied:

```text
npm run test:src:styles -- tests/src/styles/components/placeholder.test.ts -t 'floors'
→ Test Files 1 failed (1); Tests 1 failed | 3 passed | 7 skipped (11)
AssertionError — expected 40 to be 25, on the `placeholder` row's min-height at the 25-pixel font
```

Only the base row reddens, which is the row the mutation touches: the `xs`, `sm`, and `lg` floors
keep their own `em` factors and track the font through each reading.

After reverting the mutation, with the rework in place, the whole styles project is green — see
§ Gates. The revert is byte-exact: `sha256sum src/styles/components/_placeholder.scss` reads
`a5cd0b6b1e823cefd47eabfe19484d0623f250e19c0e66dc3538b39e915ce204` before the mutation and after the
revert.

## Finding — analyst 3, the missing mutation comments

**Change.** Each case gains a doc comment naming the mutation it catches.

`tests/src/styles/components/progress.test.ts`, before
`fills the bar and centers its label from the closure the track declares`: the mutation is a bar
painting or laying out from a value of its own, and each paint is compared against the variable the
track declares rather than against a written color.

`tests/src/styles/components/spinner.test.ts`, before
`paints the grow spinner from the text around it and rests it out of sight`: the mutation is a disc
painted from a color of its own or resting visible, and the resting opacity is read from the rule's
own declaration rather than from the value the running timeline is at.

## Finding — reviewer F4, the selector case titles

**Change.** The title `writes every recorded selector into the components layer and no name beyond
them` becomes `writes every recorded selector into the components layer` in `progress.test.ts`,
`spinner.test.ts`, and `placeholder.test.ts`. The absent-name assertion stays as the lookup's control
the doc comment already names, and the doc comment is unchanged because it already describes what the
case does.

## Finding — reviewer F1, the `glowing-placeholder` registry row

**Change.** `tests/setup.ts`, the `glowing-placeholder` row: the selector becomes
`.placeholder-glow .placeholder` and the property becomes `animation-name`, the shape
`animated-progress` uses.

The property comparison reads what the key's own rule sets. The light-1280 capture records
`["light|glowing-placeholder","placeholder-glow"]` for the showcase element and for the lifted copy,
where the row read a resolved `color` before. The cascade-keys case passed under the reworked row.

**The capture's region guard refuses the frame.** See § Deviations.

## Finding — reviewer F3 and analyst 4, the divergent button-placeholder shapes

**Change.** The style fixture's specimen and the showcase's specimen each read
`<a class="btn btn-primary disabled placeholder col-4" aria-hidden="true"></a>`, with no `href`, no
`role`, no `aria-disabled`, no `aria-label`, and no `tabindex`.

- `tests/setupStyles.ts`: `PLACEHOLDER_MARKUP`'s button specimen takes that shape, and its `@remarks`
  block states the reason — a placeholder stands in for a label that has not arrived, so it is hidden
  rather than announced as an unnamed control — in place of the release-fidelity claim.
- `app/browser/constants.ts`: the `Button placeholder` specimen drops `tabindex="-1"`, and its
  `@remarks` block states the same reason and records why the attribute is gone: an `<a>` element
  without an `href` attribute is not focusable, so the attribute changed nothing.
- `tests/app/browser/sections/PlaceholderSection.test.ts`: the assertion on `tabindex` becomes
  `expect(control.hasAttribute('tabindex')).toBe(false)`, beside the `aria-hidden` and `href`
  assertions, and the comments preceding it carry the same reason.

**D10's attribution corrected.** `tmp/units/b-passive-e-report.md` § D10 records that the earlier
form of that paragraph wrongly called the shipped shape "the shape Bootstrap's own placeholder
documentation uses". Bootstrap 5.3.8's placeholder documentation shows a no-`href` anchor carrying
`aria-disabled="true"`, with `aria-hidden` on the containing card rather than on the anchor. The
shipped shape is Veneer's own ruling, argued on the reason the paragraph states. The section heading
changed from "hidden and out of the tab order" to "hidden from assistive technology", because the tab
order is no longer something the specimen writes an attribute about.

## Finding — analyst 6 and the reviewer's referral, the build's targets

The styles wrapper declares no browser targets, so "the build's targets" named a set nothing in the
checkout defines. The guide's own support statement is the managed Chromium and Edge receipts, which
§ Deferred selectors names in the `::-moz-focus-inner` row. Each of those sentences rests on that
statement instead.

**Change, `guides/veneer.md` § Placeholder classes.** The prefixed-mask departure reads: Veneer writes
the standard properties alone, because the managed Chromium and Edge receipts this cascade is proved
on resolve them and leave the aliases redundant; § Deferred selectors names those receipts; a consumer
serving a browser that reads the prefixed names alone brings its own declarations for them.

**Change, § Placeholder classes, added departure.** A departure records that the official
`placeholder-wave` keyframe writes `-webkit-mask-position` beside `mask-position` and Veneer writes
the standard property alone, and that the ledger carries no row for that alias because the cascade
comparison reads declarations outside keyframes.

**Change, § Helper classes.** The prefixed-backface departure reads: Veneer emits the standard
property alone, because the managed Chromium and Edge receipts this cascade is proved on resolve it
and leave the alias redundant.

**Change, § Deferred selectors, the `::-webkit-file-upload-button` row.** The reason reads: the
standard `::file-selector-button` ships the same control part and the managed Chromium and Edge
receipts resolve it, so the prefixed alias is redundant; omitting its authored rule preserves that
absence. The cell is written to the column width the table already carries, so the rest of the table
is untouched — every row of that table is 294 characters before and after.

## Finding — analyst 6 and reviewer F2, the spinner compatibility row

**Change.** `guides/veneer.md` § Compatibility, the `spinner` / `variable` row's Obligation reads
"Every official `--bs-spinner-*` custom property ships, each on the spinner that declares it, and the
reduced-motion preference retunes the speed property; both are proved in
`tests/src/styles/components/spinner.test.ts`." That matches `tests/setupStyles.ts`'s own comment: the
grow spinner declares no border-width variable. The cell is repadded to the table's existing width, so
every row of that table is 297 characters before and after.

## Finding — the reviewer's referral, the ambiguous bare-placeholder selector

**Change.** `tests/src/styles/components/placeholder.test.ts`: every `p > .placeholder` lookup
becomes `p:not([class]) > span.placeholder`, with a comment at the first naming why that selector is
unambiguous — the glow and the wave each put their class on the paragraph, and the button specimen is
an anchor. The selector was settled inside the unit under the deviation contract.

## Touched files

| File                                                   | Change                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `tests/src/styles/components/spinner.test.ts`          | Mode case reads each mode twice against an independent text color; title; grow-case mutation comment |
| `tests/src/styles/components/placeholder.test.ts`      | Sizing case reads the floor at two font sizes; title; unambiguous bare-placeholder selector       |
| `tests/src/styles/components/progress.test.ts`         | Title; mutation comment on the bar case                                                            |
| `tests/setup.ts`                                       | `glowing-placeholder` row reads `animation-name` on `.placeholder-glow .placeholder`              |
| `tests/setupStyles.ts`                                 | `PLACEHOLDER_MARKUP`'s button specimen and its remark take D10's shape and reason                 |
| `app/browser/constants.ts`                             | `Button placeholder` specimen drops `tabindex`; remark states D10's reason                        |
| `tests/app/browser/sections/PlaceholderSection.test.ts` | Asserts `tabindex` absent; comments state D10's reason                                            |
| `guides/veneer.md`                                     | Target-resting sentences rewritten; wave-keyframe departure added; spinner row reworded     |
| `tmp/units/b-passive-e-report.md`                      | D10's attribution corrected and its heading restated                                              |

`git diff --stat` over the tracked files, which carries the E writes as well as this round's:

```text
 app/browser/Showcase.ts               |   6 +
 app/browser/constants.ts              | 112 ++++++++++++++
 app/browser/index.ts                  |   3 +
 guides/ledger/departures.md           |  18 +++
 guides/veneer.md                      | 279 ++++++++++++++++++++++++----------
 src/styles/index.scss                 |   3 +
 tests/app/browser/Showcase.test.ts    |   9 ++
 tests/app/browser/index.test.ts       |   9 ++
 tests/app/browser/integration.test.ts |   6 +
 tests/conformance.test.ts             |   3 +
 tests/setup.ts                        |  77 ++++++++++
 tests/setupStyles.test.ts             | 129 ++++++++++++++++
 tests/setupStyles.ts                  | 264 ++++++++++++++++++++++++++++++++
 13 files changed, 840 insertions(+), 78 deletions(-)
```

## Gates

Run on 2026-09-22 with npm 11.19.1 and Node v22.22.2.

| Command                                                                                                | Exit | Reading                                        |
| ------------------------------------------------------------------------------------------------------ | ---- | ----------------------------------------------- |
| `npm run format:check`                                                                                 | 0    | All matched files use the correct format        |
| `npm run lint:check`                                                                                   | 0    | No diagnostic                                   |
| `npm run check`                                                                                        | 0    | Root, `src`, and `app` projects clean           |
| `npm run build:src`                                                                                    | 0    | `dist/src/styles/index.css` 92.73 kB            |
| `npm run test:src:styles`                                                                              | 0    | Test Files 61 passed (61); Tests 464 passed (464) |
| `npm run test:guides`                                                                                  | 0    | Test Files 1 passed (1); Tests 18 passed (18)   |
| `npm run test:policy`                                                                                  | 0    | Test Files 1 passed (1); Tests 109 passed \| 1 skipped (110) |
| `npx vitest run --project app:browser tests/app/browser/sections`                                      | 0    | Test Files 11 passed (11); Tests 27 passed (27) |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-1280*' --testTimeout=120000` | 1 | Test Files 1 failed (1); Tests 1 failed \| 24 passed (25) — see § Deviations |

Observations, not criteria:

| Command               | Exit | Reading                                                                                        |
| --------------------- | ---- | ----------------------------------------------------------------------------------------------- |
| `npm run test:setup`  | 1    | Tests 2 failed \| 161 passed (163) — the shared-block sweep and the stale shipped-key literal   |
| `npm run test:app`    | 1    | Tests 1 failed \| 31 passed (32) — the showcase `.btn` assertion                                |

Each observation is a standing condition the brief names. `test:setup` fails on
`tests/setupStyles.test.ts > carries no shared written declaration block across style partials` (D3)
and on `tests/setupServer.test.ts > skips engine and CSS obligations whose Proof cell is a dash`,
whose received set adds `placeholder`, `progress`, and `spinner` to the literal (D2). `test:app` fails
on `tests/app/browser/Showcase.test.ts > mounts its sections after the region and destroys them
before removing the nodes` (D4).

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

That is the E file set, with no path added.

## Deviations

### D1 — the F1 row makes the capture's region guard refuse the glow frame. Not done.

**Expected.** `CAPTURE=1` over `journey:light-1280*` writes
`glowing-placeholder--light-1280.png` with the reworked row and exits 0.

**Found.** The frame is written — `tmp/capture/states/glowing-placeholder--light-1280.png`, 244 bytes,
rewritten by this run — and the portfolio guard refuses it:

```text
FAIL |journey:light-1280 (chromium)| tests/app/browser/integration.test.ts:879 >
  portfolio > reads every frame this variant left in the portfolio directory inside its declared region
AssertionError: Uniform frame region: tmp/capture/states/glowing-placeholder--light-1280.png:
  expected 0 to be greater than 0
```

**Evidence.** The capture artifact records the declared region:

```text
"scenario":"glowing-placeholder","path":"tmp/capture/states/glowing-placeholder--light-1280.png",
"width":1280,"height":21,"floor":"rgb(255, 255, 255)",
"region":{"x":0,"y":4,"width":746.65625,"height":14}
```

Decoding the written frame and reading its pixel runs at row 10 gives one flat grey run and then
white:

```text
[((144, 148, 157), 0, 746), ((255, 255, 255), 747, 1279)]
```

`measureVariation` rounds the region to left 0, width 747, which is columns 0 through 746 — exactly
the flat grey run, with the white beyond it one column outside. The region carries one colour, so the
variation is 0.

**Why the row before it passed, and why the ramp still does.** The old row named `.placeholder-glow`,
the full-width paragraph, whose box holds the grey bar and the white gutter beside it. The
`placeholder-ramp` row names `.placeholder-lg`, and its region straddles the gap between two bars on
the ramp's second line: reading that frame's row 10 gives
`[((135, 139, 149), 0, 319), ((255, 255, 255), 320, 323), ((135, 139, 149), 324, 750), ((255, 255, 255), 751, 1279)]`.
Each of those regions satisfies the guard because it includes something the named element does not
paint. A placeholder bar paints one flat fill and its box is exactly that fill, so naming the bar
itself is what the guard refuses.

**Hypothesis.** The guard's non-uniform requirement assumes a named element's own box carries paint
variation, which holds for every registered subject except a single flat placeholder bar at the
capture's animation-reset first step.

**Resolutions, each needing a file this unit does not own.**

- Give the `Glowing placeholder` specimen a second element inside the wrapper, so the frame's declared
  region straddles a gap the way the ramp's does. That is `app/browser/constants.ts`'s
  `PLACEHOLDER_SPECIMENS`, whose `Glowing placeholder` entry is outside this unit's grant.
- Let the guard admit a region a registered scenario declares as one flat fill. That is
  `tests/app/browser/integration.test.ts`, which is off-limits.
- Keep the old row. That reopens F1, which the brief requires closed, so it is recorded as an option
  rather than recommended.

The row the brief prescribes is landed, because it is what closes F1's substance: the comparison
reads a property the key's own rule sets, and it moves the moment the glow stops shipping.

### D2 — the placeholder partial's own comment carries the sentence the guide no longer does. Report only.

`src/styles/components/_placeholder.scss` is outside § Scope. Its `.placeholder-wave` comment states
"the build's targets resolve them", which is the claim analyst 6 falsified. The exact patch:

```diff
 	// The wave is a mask that travels across the element, so it dims whatever the element paints
-	// instead of laying a second color over it. Only the standard mask properties are written: the
-	// build's targets resolve them, which leaves the prefixed aliases the release carries
-	// redundant, and the ledger records their absence.
+	// instead of laying a second color over it. Only the standard mask properties are written: the
+	// managed Chromium and Edge receipts this cascade is proved on resolve them, which leaves the
+	// prefixed aliases the release carries redundant, and the ledger records their absence.
```

### D3 — reviewer F5's temporal `once` is unfixed, and no brief carries it. Report only.

`tmp/units/b-passive-e-report.md:667` is inside a file this unit owns and outside the region it owns
(the D10 attribution). The line is a `vite.config.ts` patch body meant to be applied verbatim, and
`policy/no-banned-term` reads every comment, so it lands as a red gate on whoever applies it. The
exact patch:

```diff
-+			// walk measured 10.0s against the Table-era surface and 15.9s once the passive
++			// walk measured 10.0s against the Table-era surface and 15.9s after the passive
```

## Findings outside this round's scope

**The placeholder mode case carries the same hole analyst 3 found in the spinner's.**
`tests/src/styles/components/placeholder.test.ts`, the case
`takes its fill from the text of whichever mode it renders in`, mounts
`<p data-bs-theme="${mode}" style="color:var(--vn-text-body-base)">` and compares the fill against the
host's text. Replacing `.placeholder`'s `background-color: currentcolor` with
`var(--vn-text-body-base)` leaves every comparison equal, because the host uses that token. The fix is
the one this round applied to the spinner: move the mode scope's own `color` to a value no rule of
this cascade writes and require the fill to follow it. Neither lane named this case, so it is recorded
for the next change against the placeholder proof rather than closed here.
