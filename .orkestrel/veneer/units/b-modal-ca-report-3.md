# CAROUSEL (`ca`) round 3 report

Executor: `builder` on Sonnet, sole writer in `/home/user/veneer-ca` (branch `unit/ca`, uncommitted
writes over `c3ac297`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/ca-brief-3.md`. This round carries `ca-audit-2-verdict.md`
§ Rulings: claim 5 with R-A, FADE-IN-CONTRAST, FADE-COMMENT, and claim 8 with R-B and
REPORT-COUNTS.

## Sites, before and after

### `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/tools/cascade-check.mjs` — the comparator's order check

Before, the `sequence` helper excluded a property from the declaration-order comparison whenever
`expected` held it, and `expected` gains a property on every accepted departure. A moved `color`
declaration inside a departure property read the same set before and after the move, so the order
check never saw it.

After, `sequence` keeps every property both sides declare and drops only the exclusion of
departure properties:

```js
const sequence = (list) =>
	[...new Set(list.map(([property]) => property).reverse())]
		.reverse()
		.filter((property) => theirs.some(([p]) => p === property) && ours.some(([p]) => p === property))
```

The clean expanded and built runs stay green, and the negative control that moves the controls
block's `color` declaration before `position` now reads `RED DECLARATION-ORDER` for both
`.carousel-control-prev` and `.carousel-control-next`.

### `tests/app/browser/sections/CarouselSection.test.ts` — the fade case's own title

Before, the case titled `holds each caption to 4.5:1 against every fill its picture paints, the
inverted carousel over light pictures` also asserted the `Fading carousel` resting slide's opacity,
a reading the caption-contrast title does not name.

After, that assertion moves into its own case:

```ts
// The mutations this catches are a fade rule that stops hiding the other slides and a stacking
// rule that drops the resting slide from the fading carousel, either of which lets a hidden slide
// paint over the resting one at an opacity below one.
it("paints the fading carousel's resting slide at full opacity", () => {
	const host = mount(build('div'))
	const section: SectionInterface = new CarouselSection(host)
	try {
		const region = requireValue(host.querySelector('section'), 'No Carousel region')
		const fading = readSpecimen(region, 'Fading carousel')
		const resting = requireValue(
			fading.querySelector('.carousel-fade .carousel-item.active'),
			'No fading slide',
		)
		expect(readStyle(resting, 'opacity')).toBe('1')
	} finally {
		section.destroy()
		host.remove()
	}
})
```

The contrast case no longer reads the fading specimen.

### `tests/src/styles/components/carousel.test.ts` — the fade comment and the controls comment

Before, the fade case's comment named only the outgoing slide's delay dropped and the resting slide
dropped from the stacking rule, leaving three matrix-routed mutations unnamed.

After:

```ts
// The mutations this catches are a fade rule that stops hiding the other slides, which paints
// every slide at its own opacity instead of only the resting one; a stacking rule that drops the
// resting slide or either incoming slide, which lets a hidden slide paint over the resting one;
// and the outgoing slide's delay dropped, which makes it vanish at once instead of holding its
// paint for the slide duration.
```

Before, the controls comment closed on "no one literal resolves all three." After, it names the
readings instead of counting them: "no one literal resolves the light, dark, and consumer readings
together."

## The matrix row, as rewritten

`.carousel-fade .carousel-item.active` → section mutation `fade-class-dropped` → section case
`paints the fading carousel's resting slide at full opacity`.

## Comparator runs

Rebuilt the validation copy at `tmp/probe/base` from `c3ac297` with `ca-shared-2.patch` applied and
the owned files synced, then ran `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/tools/cascade-runs.sh`, which this
round extends with the R-A controls. Logs under
`/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/logs/cascade/`; summary at `logs/cascade/summary.txt`:

```
clean-expanded exit=0 VERDICT green
clean-built exit=0 VERDICT green
planted-rule-expanded exit=1 VERDICT red
planted-rule-built exit=1 VERDICT red
swapped-uri-expanded exit=1 VERDICT red
swapped-uri-built exit=1 VERDICT red
partial restored by digest
restored-expanded exit=0 VERDICT green
restored-built exit=0 VERDICT green
color-before-position exit=1 VERDICT red
missing-selector exit=1 VERDICT red
swapped-keys exit=1 VERDICT red
moved-layer exit=1 VERDICT red
stale-departure exit=1 VERDICT red
partial restored by digest (round 2)
DONE
```

Each new control's named red line, read from its own log under `logs/cascade/`:

- `color-before-position.log.txt`: `RED DECLARATION-ORDER .carousel-control-prev …` and the same
  for `.carousel-control-next`, moving `color` before `position` in the controls block while
  leaving every declared value unchanged.
- `missing-selector.log.txt`: `RED MISSING .carousel-dark`, from removing the `.carousel-dark` block
  from the compiled input.
- `swapped-keys.log.txt`: `RED ORDER …`, from swapping the written order of the
  `.carousel-indicators .active` and `.carousel-caption` keys.
- `moved-layer.log.txt`: `RED LAYER .carousel-caption sits in no layer`, from moving the
  `.carousel-caption` block outside the `@layer components` block.
- `stale-departure.log.txt`: `RED STALE-DEPARTURE .carousel-item { opacity } guide=0 written=—`,
  from a departure row this round adds to a copy of the guide for a property the cascade never
  writes on that selector.

The partial and the guide copy both read back at their pre-mutation digest after every control; the
summary's `partial restored by digest` and `partial restored by digest (round 2)` lines and a
direct `sha256sum` read after the run confirm it.

## Section and styles proof runs

`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
tests/app/browser/sections/CarouselSection.test.ts` in the validation copy exits 0: `Tests 7 passed
(7)`.

`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
tests/src/styles/components/carousel.test.ts` in the validation copy, after `npm run build:src`,
exits 0: `Tests 17 passed (17)`.

Reran `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/tools/mutate-section.py` for the unmutated control and every named
section mutation against the validation copy, logs under `logs/section-mutations/`:

- `none.log.txt`: `Tests 7 passed (7)`.
- `fade-class-dropped.log.txt`: `Tests 1 failed | 6 passed (7)`, red on `paints the fading
  carousel's resting slide at full opacity` and on no other case.
- The remaining named mutations (`advancing-direction-dropped`, `inverted-class-dropped`,
  `slide-class-added`, `aria-current-dropped`, `control-label-dropped`, `indicator-target-dropped`,
  `inline-style-added`, `captions-dropped`, `stray-block`, `path-lightened`) each redden their
  matrix-named case and no other, read from their own logs.

## Gates on the owned test files

Scoped format check, in the worktree:

```
npx oxfmt --config .oxfmtrc.json --check tests/src/styles/components/carousel.test.ts tests/app/browser/sections/CarouselSection.test.ts
```

Exit 0. Log: `logs/round3-gates/oxfmt.log.txt`.

Scoped lint check, in the worktree:

```
npx oxlint --config .oxlintrc.json --deny-warnings tests/src/styles/components/carousel.test.ts tests/app/browser/sections/CarouselSection.test.ts
```

Exit 0, "All matched files use the correct format." Log: `logs/round3-gates/oxlint.log.txt`.

Worktree patch check:

```
git -C /home/user/veneer-ca apply --check /home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch
```

Exit 0. Log: `logs/round3-gates/patch-check.log.txt`.

## Instrument changes

`/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/tools/cascade-check.mjs`: the `sequence` filter drops the
`!expected.has(property)` exclusion, so a shared property with a recorded departure stays in the
declaration-order comparison.

`/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/tools/cascade-runs.sh`: appends the five R-A negative controls
(`color-before-position`, `missing-selector`, `swapped-keys`, `moved-layer`, `stale-departure`),
each planted in a copy of the validation partial or the validation guide, checked in expanded mode,
and restored by digest before the next control.

## Deviations

None. Every acceptance criterion closed as briefed.
