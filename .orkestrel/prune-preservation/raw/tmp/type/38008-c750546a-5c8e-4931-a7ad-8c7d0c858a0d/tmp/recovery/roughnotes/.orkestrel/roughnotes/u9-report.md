# Unit 9 report — the proof layer and the guide

**One blocker you must settle before committing:** `npm run format:check` is red, and the only file
it names is `vite.config.ts`, which this unit may not edit. The stopped attempt left an
uncommitted `css.preprocessorOptions.scss.silenceDeprecations` block there. Patch or removal is in
§ 8.

## 1. Done / not done

1. **Done.** `npx oxfmt --config .oxfmtrc.json --check` reports correct format on
   `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`,
   `app/browser/constants.ts`, and `guides/README.md`.
2. **Done.** `npx oxlint --config .oxlintrc.json --deny-warnings` on the same files exits 0.
   `npm run lint:check` over the whole tree also exits 0.
3. **Done.** `npm run check` exits 0.
4. **Done.** Every conditional in the journey suite is enumerated in § 2 with its ruling.
5. **Done.** Red 20 / green 68 on the same command, both counts in § 3. `git diff --quiet
   app/browser/controllers/ApplicationController.ts` reports no change.
6. **Done, and wider than briefed.** The three accepted states were already registered by the
   stopped attempt; the ruling on the four screens is implemented; I registered four more screens
   the same argument reaches. § 5.
7. **Done.** Every role in W3 is read in every declared variant, every reading is in § 4, and the
   four inherited readings are measured. Nothing fails its bar.
8. **Done.** `guides/README.md` is rewritten; all 74 repository paths it names exist (checked by
   script). No `tests/guides.test.ts`, no `test:guides` script, no `guides` project, no
   `@orkestrel/guide` import.
9. **Done — reader defect, fixed, with controls.** The 1.442 is a mid-transition frame, not a
   gradient. Element, foreground, and every surface compared are in § 7.
10. **Done.** `npm test` exits 0: app 181, journey 68 passed + 4 skipped, policy 111, config 46.
11. **Done.** `VITE_CAPTURE=true npm run test:journey` exits 0 with 72 passed across all four
    projects, three consecutive runs, writing 96 frames into `tmp/capture/states`.

**Not closed:** the `format:check` blocker in § 8, and the findings in § 8 I am out of scope to fix.

## 2. The guards

The stopped attempt removed every `if (readRefusal(...) === undefined)` guard. I verified that and
walked every remaining conditional in both owned files.

**Removed (three, all the same shape).** The second submit in the subscribe, contact, and payment
journeys. Each is now two assertions and an unconditional click:

```ts
expect(readRefusal(COPY.subscribe)).toBeUndefined()
expect(readPage()).not.toContain(COPY.accepted)
await clickAccessible('button', COPY.subscribe)
```

**Kept, with the legitimate absent state named.**

| Site | Guard | Why it cannot absorb a defect |
| ---- | ----- | ----------------------------- |
| `setup.ts` `openSite` | `if (!readCompact())` | At 992 px and up the masthead carries its destinations inline and paints no trigger. The branch **asserts** that absence and throws when `Menu` resolves anyway; it does not skip. |
| `setup.ts` `closeSite` | `if (!readCompact())` | Same shape for `Close menu`, asserting no compact dialog is open at a wide viewport. |
| `setup.ts` `readGradient` | `if (own !== undefined && own[3] === 1) return undefined` | Reader internals: the walk stops at the first opaque fill. |
| `setup.ts` `readSurface` | `if (gradient === undefined) return readContrast(node)` | Reader internals: selects the flat path when nothing declares a gradient. |
| `setup.ts` `readSettled` | `if (running.length === 0) return readSurface(node)` | Reader internals: nothing is moving, so the current paint is the settled paint. |
| `setup.ts` `isPainted` | zero-box and visibility filter | Population membership. `readRole` asserts the whole population is non-empty before any filtering, so an emptied role fails. |
| `setup.ts` `readRefusal` | `try/catch` | This **is** the refusal reader. Journeys assert on its return value rather than branching on it. |
| `setup.ts` `openSurface` | `options?.storage ?? …`, `options?.catalog === undefined ? {} : …` | Option plumbing, no interaction. |
| `integration.test.ts` `readGroup` | `if (members.length === 0) return` | The split into page surface and mode island is a scoping device. One scope is legitimately empty when a role lives entirely on the other. `readRole` has already asserted the whole population is non-empty. |
| `integration.test.ts` `readGroup` / `readControl` | `if (report)` | Chooses which variant owns the written artifact. No assertion depends on it. |
| `integration.test.ts` `readWrittenFrames` | `try/catch` returning `[]` | Echoes a previous run's frame list into the artifact when not capturing. The capture criterion is asserted by `writes every frame this run owes`, not by this. |
| `integration.test.ts` | `it.runIf(CAPTURING)` | The frame proof is meaningless without capture, and `npm test` reports it skipped rather than absent. |
| `integration.test.ts` `parseVariants` | `if (…) throw` | Refusals, not skips. |

## 3. W1's mutation proof

**Mutation.** In `app/browser/controllers/ApplicationController.ts`, revalidation made to commit —
`check: this.#subscribe.bind(this, false)` → `bind(this, true)`, and the same for `#inquire` and
`#pay`. Typing into a field therefore submits the form.

**Command:** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project 'journey:*'`
(which is `npm run test:journey`).

| Tree | Result |
| ---- | ------ |
| Defect present | `Tests 20 failed | 48 passed | 4 skipped (72)`, `Test Files 4 failed (4)`, exit 1 |
| Defect reverted | `Tests 68 passed | 4 skipped (72)`, `Test Files 4 passed (4)`, exit 0 |

The red lands on the line that replaced the guard, in all four projects:

```
FAIL |journey:light-1280| … keeps subscribe enabled, announces a refusal, and accepts a valid request
AssertionError: expected 'No interactive element has the access…' to be undefined
Received: "No interactive element has the accessible name \"Subscribe free\""
 ❯ tests/app/browser/integration.test.ts:500:39
```

**Extra proof that the guard was the absorber, not the defect.** With the mutation still live I
temporarily restored the old `if (readRefusal(COPY.subscribe) === undefined)` shape and ran
`--project journey:light-1280 -t 'keeps subscribe enabled'`: **1 passed | 17 skipped**. The defect
was live and the journey went green. Both temporary edits are reverted; `git diff --quiet
app/browser/controllers/ApplicationController.ts` reports no change and `git status` shows no
untracked or modified file outside § 8's list.

## 4. The matrix

Every role, every variant, from `tmp/journeys/<variant>.txt` after the capture run. Each row is the
**worst** member of that role's population in that scope. Text bar 4.5, mark and ring bar 3.
**Nothing fails its bar.** `light-1280` and `light-390` agree except where noted, as do the two dark
projects; the readings are reported per theme with the width differences called out.

### Shell, on the navy islands (mode island scope only — the shell paints no page-surface member)

| Role | Light | Dark | Members |
| ---- | ----- | ---- | ------- |
| utility bar contact link | 15.538 | 15.538 | 4 |
| footer group heading | 13.303 | 13.303 | 3 |
| footer link | 15.538 | 15.538 | 15 |
| footer secondary tier | 10.110 | 10.110 | 2 |

The utility bar and the footer nest `data-bs-theme="dark"`, so they read identically in both themes.
These are the two readings unit 5 reported as inherited; they are now measured.

### Home

| Role | Scope | Light | Dark | Members |
| ---- | ----- | ----- | ---- | ------- |
| body text | page surface | 17.284 | 13.303 | 2 |
| body text | mode island | 9.927 | 9.927 | 15 |
| secondary tier | page surface | 6.569 | 9.204 | 29 |
| secondary tier | mode island | 7.050 | 7.050 | 18 |
| section heading | page surface | 17.284 | 13.303 | 2 |
| section heading | mode island | 9.927 | 9.927 | 4 |
| Entry title | page surface | 21.000 | 15.538 | 12 |
| Entry fact label | page surface | 7.050 | 10.110 | 12 |
| Entry fact value | page surface | 17.284 | 13.303 | 12 |
| confirm check mark (bar 3) | mode island | 8.400 | 8.400 | 5 |

The `confirm` marks are unit 6's inherited reading. The population spans both the navy `panel` and
the navy `invite`, and 8.400 is the worst of them.

### Controls (fill, then focus ring)

| Screen and control | Light fill | Light ring | Dark fill | Dark ring |
| ------------------ | ---------- | ---------- | --------- | --------- |
| home, in-content link | 15.538 | 15.538 | 15.538 | 15.538 |
| home, outline control | 7.050 | 21.000 | 13.303 | 15.538 |
| subscribe, primary commit | 15.538 | 21.000 | 13.303 | 15.538 |
| magazine, filter row selected control | 15.538 | 21.000 | 13.303 | 15.538 |
| magazine, filter row unselected control | 7.050 | 21.000 | 13.303 | 15.538 |
| contact refused, plain link | 11.634 | 15.724 | 8.431 | 18.083 |

The `home, outline control` row is the reading W5 was about. It is now stable at 7.050 in light and
13.303 in dark across every run.

### Magazine listing

| Role | Light | Dark | Members |
| ---- | ----- | ---- | ------- |
| secondary tier | 7.050 | 10.110 | 24 |
| section heading | 17.284 | 13.303 | 2 |
| Entry title | 21.000 at 390, 10.409 at 1280 | 15.538 at 390, 9.248 at 1280 | 7 |
| Entry fact label | 7.050 | 10.110 | 14 |
| Entry fact value | 17.284 | 13.303 | 14 |

The `Entry title` spread is a real hover reading, not noise: at 1280 the pointer parked by an earlier
step rests on a card, so that title's settled paint is its `link-body-emphasis` hover color. It is a
state the surface actually paints and it clears the bar; the settling reader in § 7 is what makes it
a settled reading rather than a frame part way into the transition.

### Refusal, on the contact desk

| Role | Light | Dark | Members |
| ---- | ----- | ---- | ------- |
| body text | 10.217 | 7.152 | 4 |
| secondary tier | 6.569 | 9.204 | 7 |
| form label | 17.284 | 13.303 | 6 |
| invalid-feedback message | 4.528 | 6.145 | 4 |
| error summary | 10.217 at 1280, 8.682 at 390 | 7.152 | 5 |

`invalid-feedback` at 4.528 in light is the tightest reading on the surface — it clears 4.5 by 0.028.
Recorded as an observation, not a failure.

### Notice, by category

| Category and screen | Role | Light | Dark |
| ------------------- | ---- | ----- | ---- |
| `miss`, magazine filtered | notice title | 16.105 | 12.111 |
| `miss`, magazine filtered | notice detail | 6.569 | 9.204 |
| `empty`, magazine with no articles | notice title | 16.105 | 12.111 |
| `empty`, magazine with no articles | notice detail | 6.569 | 9.204 |
| `partial`, contact acceptance | notice title | 16.105 | 12.111 |
| `partial`, contact acceptance | notice detail | 6.569 | 9.204 |
| `partial`, SKU with no ISBN | notice title | 16.105 | 12.111 |
| `partial`, SKU with no ISBN | notice detail | 6.569 | 9.204 |

The last two rows are unit 7's and unit 8's inherited readings, now measured. **`refusal` is not
applicable, with reason:** no view constructs a `Notice` with `category="refusal"`. The refusal paint
the application actually ships is the hand-rolled `role="alert"` summary in `SubscribeForm`,
`ContactForm`, and `PaymentForm`, which duplicates the same `border-danger-subtle bg-danger-subtle
text-danger-emphasis` treatment. That paint **is** measured, as the `error summary` and
`invalid-feedback message` rows. Carried to you as a finding in § 8.

### What I widened

Added to the role sets: `Entry fact label` on home; `secondary tier` and `section heading` on the
listing; `body text` and `secondary tier` on the refused desk. I did not add `body text` to the
listing roles: the magazine listing's every paragraph carries `text-body-secondary` or `accent`, so
that role selects nothing there and `readRole` would refuse it.

## 5. The registry

**Added by me:** `publications`, `subscribe`, `contact`, and `payment`, each placed in a journey
that already drove that screen.

**Already added by the stopped attempt, verified:** `contact-accepted`, `payment-accepted`,
`newsletter-accepted`, plus `product-listing`, `magazine-listing`, `magazine-detail`, and
`marketplace-listing`.

**Ruling on the four screens W2 names.** `/products`, `/magazine`, `/magazine/:slug`, and
`/marketplace` each earn a registered state. Each is a distinct screen a reader reaches by an
ordinary route, each was already driven to that state by an existing journey, and a design review
that cannot see a screen cannot judge it — which is why units 7 and 8 had to shoot throwaway probe
frames.

**Why I went further.** The same argument reaches four screens the registry still missed, and
`STATES` carries a comment claiming it holds every screen a person reaches. `/publications` had no
state at all despite three journeys passing through it, and the blank `subscribe`, `contact`, and
`payment` desks had none despite `newsletter` — the same shape, a blank form — already having one.
Leaving them out would have left that comment false. Each cost one `place` call in a journey that
already reached the screen.

`STATES` now holds 24 rows, and `VITE_CAPTURE=true npm run test:journey` writes 96 frames.

## 6. The guide

**What it said.** It documented the catalog, the parsers, hash navigation, the shell, color mode,
the per-screen filters and forms, the focus ring, and the proof suite. It documented none of the
page primitives, `Brand`, `Entry`'s `rank`, the request contract, `MENU_ITEMS`, `UTILITY_GROUPS`,
`FOOTER_GROUPS`, `NOTICE_MARKS`, `COPY.ask`, `readHost`, `shellHref`, `followArticle`, the partial
inquiry, the media rows and their derived host cue, the publications desk facts, or the data states
each screen paints. Three claims were stale: the masthead was called sticky without qualification,
home's invite was said to carry the subscribe form, and the color-mode section listed islands that
had moved to `bg-body-tertiary` or been removed.

**What it says now.**

- New sections: `The request contract` (`check` versus `submit`, `accepted`, the `issues`
  tri-state), `The page primitives` (`Frame`, `Split`, `Entry` with `rank`, `Notice` with
  `NoticeCategory` and `NOTICE_MARKS`, `Brand`), `The shell destinations` (`NAV_ITEMS`,
  `MENU_ITEMS`, `UTILITY_GROUPS`, `FOOTER_GROUPS`, `ShellGroup`, `ShellLink`, `shellHref`),
  `Products` (the listing's `rank`, the detail's `Ask about this product`), `Publication desks` (the
  derived issue, listing, and document facts), `Reading an article` (`followArticle` and its wrap),
  and `The data states` (a table of every screen against full, reduced, absent, missed, refused, and
  accepted).
- Corrected: the masthead pins from `lg` up and `scroll-padding-top` is reserved at that breakpoint
  and nowhere else; home's invite carries the `Get started` link, not a form; the color-mode section
  names the islands that exist — utility bar, offcanvas, footer, hero, home's marketplace panel,
  home's invite, the subscribe invite, the nested-light issue card and its nested-dark header — and
  separately names the quiet `bg-body-tertiary` surfaces that are not islands; the `@scope` boundary
  is stated; the magazine and marketplace statuses are `Notice` categories rather than
  `alert-primary`.
- Extended: `Media kits` covers the list rows and `readHost` deriving the external cue from the
  destination; `Contact` covers the office panel and the `partial` inquiry naming what is absent;
  `Subscribe` covers the shared claims and the heading tense; `Shop catalog` covers the `partial`
  SKU; `The focus ring` no longer claims the matrix reads only `Subscribe free`.
- `Proving the surface` documents the unconditional interaction rule, the role-based matrix and its
  page-surface/mode-island split, `readSurface`, `readSettled`, the reader controls, and the
  `STATES` contract. The run command no longer names a `VITE_VARIANT` variable the configuration
  does not read; it names the project.
- The concept index gained rows for the request contract, the page primitives, the shell
  destinations, products, publication desks, reading an article, and the data states. All 74
  repository paths the file names exist, checked by script.

## 7. W5

**The element.** The masthead color-mode toggle,
`<button class="btn btn-outline-secondary" aria-label="Use dark theme">` — the wide copy inside
`div.d-none.d-lg-flex` at 1280, the compact copy inside `div.d-flex.d-lg-none` at 390.

**The ruling: the reader was wrong, and not in the way the brief hypothesised.** It is not a
gradient. `readGradient` returns `none` for this element in every reading. The defect is that
`readControl` measured while the control's CSS transition was still running.

**The measurement.** I instrumented `readControl` to log the foreground, the composited layer stack,
the gradient result, and every ancestor's `background-color`, then ran all four projects under
capture. A settled reading and a failing reading, side by side:

```
settled  width=1280 root=light color=rgb(74, 90, 110)
         gradient=none layers=[[255,255,255,0.88],[255,255,255,1]]
         chain=BUTTON.btn btn-outline-secondary bg=rgba(0, 0, 0, 0)
            << DIV.d-none d-lg-flex … << DIV.container-xl << NAV.navbar
            << HEADER.masthead bg=color(srgb 1 1 1 / 0.88) << DIV << BODY bg=rgb(255, 255, 255)

failing  width=390 root=light color=rgb(237, 238, 240)
         gradient=none layers=[[74,90,110,0.898],[255,255,255,0.88],[255,255,255,1]]
         chain=BUTTON.btn btn-outline-secondary bg=rgba(74, 90, 110, 0.898) << … (same chain)

failing  width=390 root=light color=rgb(213, 217, 222)
         gradient=none layers=[[74,90,110,0.77],[255,255,255,0.88],[255,255,255,1]]
```

**The surfaces compared.** The walk is the button (transparent at rest) → the flex wrapper → the
container → the navbar → `header.masthead`, which paints
`color-mix(in srgb, var(--bs-body-bg) 88%, transparent)` and so is **translucent**, alpha 0.88 → the
opaque `body`. No layer on that chain is a gradient, and no declared `GRADIENT_SURFACES` selector
matches anything on it. The reader composited exactly the right stack.

**What the numbers are.** `rgba(74, 90, 110, α)` is `$secondary` `#4a5a6e` at a fraction of its
alpha, and `rgb(237, 238, 240)` / `rgb(213, 217, 222)` are part way between `#4a5a6e` and `#fff`.
That is Bootstrap's `.btn` transition —
`transition: color .15s ease-in-out, background-color .15s ease-in-out, …` — interpolating from the
rest paint into `.btn-outline-secondary:hover`. A pointer parked by an earlier step lands on the
toggle when a viewport change, a remount, or a tab-driven scroll moves the page under it, and the
reading was taken inside the 150 ms window. `1.441705213956706` is an even earlier frame of that
same interpolation: a near-`#4a5a6e` foreground on a near-`#4a5a6e` composited fill. It is neither
the rest reading nor the hover reading; it is a frame the application never rests on. That is also
why it was nondeterministic — `journey:dark-1280` + `journey:light-390` for you, `light-1280` +
`light-390` and then `dark-1280` alone for me, and green when `journey:dark-1280` ran on its own.

Your host measurement was right and so was the matrix: `btn-outline-primary` and
`btn-outline-secondary` at rest read 15.538 in a light root and 13.303 in a dark root, and the
toggle now reads 7.050 in light — `#4a5a6e` on white, its own rest color rather than
`btn-outline-primary`'s navy — and 13.303 in dark.

**The fix.** `tests/app/browser/setup.ts` gains `readSettled`, which waits for the element's own
animations before measuring:

```ts
export async function readSettled(node: Element): Promise<number> {
	const deadline = Date.now() + PAINT_BUDGET
	while (Date.now() < deadline) {
		const running = node.getAnimations().filter(isRunning)
		if (running.length === 0) return readSurface(node)
		await Promise.allSettled(running.map((animation) => animation.finished))
	}
	throw new Error(`The paint on ${readName(node)} is still moving after ${String(PAINT_BUDGET)}ms`)
}
```

`readControl` calls it instead of `readSurface`. It reports whichever state the control settles in —
rest or hover — because both are states the application paints and both must clear the bar. It never
reports a frame between them.

**The controls, both kept in the matrix test's control block.**

- *Gradient, still catching a genuine failure.* Two fixtures carrying the declared `.hero` gradient
  and differing only in foreground, fed through the production `readSurface`: `rgb(24, 66, 110)`
  must read below 4.5 against the worst stop, and `rgb(255, 255, 255)` must read at or above it. A
  reader that stopped resolving gradients, or one that failed every gradient, fails one of the two.
- *Settling.* A fixture whose `color` transitions over 1 s: `readSurface` taken one animation frame
  in must read below 4.5 (the transition is still running, and the run asserts exactly one animation
  is running), and `readSettled` on the same element must read at or above it. A `readSettled` that
  stopped waiting fails the second assertion; a reader that never waited fails nothing but is caught
  by the first.

**Stability after the fix.** `VITE_CAPTURE=true npm run test:journey` green three consecutive times
(72 passed, all four projects), plus `npm run test:journey` green inside `npm test`.

## 8. Rulings

**The two orphaned `COPY` members.** Neither had a reference anywhere in `app/` or `tests/`.

- `COPY.about` (`'About'`) — **kept and put to use.** The word is one the shell publishes; it was
  orphaned only because `NAV_ITEMS` restated it as a bare literal. `NAV_ITEMS` now takes its About
  label from `COPY.about`, its Publications label from `COPY.publications`, and its Shop label from
  `COPY.shop` — the last two already existed and were also restated as literals, which is the same
  drift one step behind. That required moving the `NAV_ITEMS` declaration below `COPY` in
  `app/browser/constants.ts`, because a `const` cannot be read before its declaration is evaluated;
  it now sits with `MENU_ITEMS`, `UTILITY_GROUPS`, and `FOOTER_GROUPS`, which is where the shell's
  destination data belongs. `'Products'` stays a literal: `COPY` declares no member for it, and
  adding one is beyond this unit's grant on that file. **Finding for you:** either add
  `products: 'Products'` to `COPY` and route the last row through it, or accept the asymmetry.
- `COPY.home` (`'Back to home'`) — **removed, because the capability must not exist.** No screen
  offers a back-to-home recovery. Every `miss` notice recovers to its own listing (`COPY.magazine`,
  `COPY.listing`, `COPY.stock`), and the navigator's fallback is `/`, so an unmatched path lands on
  home rather than painting a screen that needs the control. Nothing referenced it and nothing
  should.

**Ancillary decisions I made and carried on from.**

- `readSettled` lives in `setup.ts` beside `readSurface` rather than in the test file, so the reader
  and its gradient path stay together.
- `PAINT_BUDGET` is 4 s, sized against the 1 s transition the control drives and Bootstrap's 0.15 s
  real one.
- The matrix reports whichever settled state a control is in rather than forcing rest. There is no
  pointer-move helper in `@orkestrel/test/browser`, and both states must clear the bar anyway.

### Findings I am out of scope to fix — each needs your ruling

1. **`vite.config.ts` is uncommitted, off-limits, and red on the format gate.** The stopped attempt
   added a `css.preprocessorOptions.scss.silenceDeprecations` block. I did not touch it. It is the
   only file `npm run format:check` names, so the gate chain is blocked at its first step.
   **Recommendation: remove the block**, restoring `a5aa047`. It is outside the unit's scope, and it
   does not even silence what the brief's host facts name — the run still emits `if-function`
   deprecations, which is not one of the categories it lists. If you keep it, this is the exact
   patch that makes the gate green:

   ```diff
   --- a/vite.config.ts
   +++ b/vite.config.ts
   @@ -93,12 +93,7 @@
    		css: {
    			preprocessorOptions: {
    				scss: {
   -					silenceDeprecations: [
   -						'import',
   -						'mixed-decls',
   -						'color-functions',
   -						'global-builtin',
   -					],
   +					silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
    				},
    			},
    		},
   ```

2. **`NoticeCategory`'s `refusal` member has no consumer.** No view constructs a `Notice` with
   `category="refusal"`. Meanwhile `SubscribeForm`, `ContactForm`, and `PaymentForm` each hand-roll
   the identical treatment — `border-danger-subtle bg-danger-subtle text-danger-emphasis`,
   `role="alert"`, `bi-exclamation-triangle`, an `fw-semibold` title line. That is one paint with
   two homes, and the union member is a declared symbol with no caller. Either route the three
   summaries through `Notice`, or rule `refusal` out of the union. Both need `.vue` edits this unit
   may not make.

3. **`invalid-feedback` reads 4.528 in light.** It clears 4.5 by 0.028. Not a failure, but it is the
   only reading on the surface without headroom, and a token nudge anywhere near
   `--bs-form-invalid-color` would push it under.

4. **`'Products'` in `NAV_ITEMS`,** per the `COPY.about` ruling.

## 9. Observations

- `npm test` wall clock: app 31.47 s, journey 38.21 s, policy 1.62 s, config 1.73 s.
- `VITE_CAPTURE=true npm run test:journey` wall clock: 48.41 s for all four projects, writing 96
  frames.
- No contrast reading fails its bar. The tightest is `invalid-feedback message` at 4.528 in light.
- The matrix budget stays at 180 s; the widened matrix plus the 1 s settling control fits inside it
  with room.
- The magazine `Entry title` and contact `error summary` readings differ between 1280 and 390
  because a parked pointer settles one member into its hover paint. Both readings clear the bar.
  This is the reader working: before `readSettled` those same elements would have been read part way
  through the transition.
- Bootstrap emits its Sass deprecation warnings as briefed.

## 10. What I did not close

- The `format:check` blocker in § 8.1. `vite.config.ts` is off-limits, so the patch is yours to
  apply.
- The `refusal` category in § 8.2, and the `'Products'` literal in § 8.4. Both need files this unit
  does not own.
- I did not measure the `refusal` `Notice` category, because no view paints one. Recorded not
  applicable with its reason rather than counted as passing; the refusal paint the application does
  ship is measured as `error summary` and `invalid-feedback message`.
