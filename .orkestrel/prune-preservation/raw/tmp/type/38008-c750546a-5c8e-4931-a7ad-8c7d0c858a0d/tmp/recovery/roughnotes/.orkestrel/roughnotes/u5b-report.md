# Unit 5b report — the sticky masthead covers what a reader scrolls to

## Done / not done

1. **Done.** `npx oxfmt --config .oxfmtrc.json --check <owned files>` reports all matched files use the correct format.
2. **Done.** `npx oxlint --config .oxlintrc.json --deny-warnings <owned files>` exits 0 with no output.
3. **Done.** `npm run check` exits 0.
4. **Done.** A `console.info|log|debug` sweep over `tests/app/` returns nothing.
5. **Done.** The `issues` member carries its own TSDoc naming both states. `#validate` is untouched.
6. **Done.** The proof is recorded under § The failing proof.
7. **Done.** `npm run test:app:browser` — Test Files 38 passed (38), Tests 88 passed (88).
8. **Done.** `npm run test:journey` — Test Files 4 passed (4), Tests 68 passed | 4 skipped (72). The skips are the `it.runIf(CAPTURING)` frame case each project carries outside capture mode.
9. **Done.** `VITE_CAPTURE=true npm run test:journey` ran three times, each Test Files 4 passed (4), Tests 72 passed (72). Per-run detail under § The capture runs.
10. **Done.** The accessible tree and the focus order in every journey artifact are identical before and after. Evidence under § The capture runs.

## The masthead fix

Two changes, both in owned files.

- `app/browser/App.vue`: the masthead's `sticky-top` class becomes `sticky-lg-top`. The masthead is sticky from `lg` up and scrolls with the page below it.
- `app/browser/styles/_signature.scss`: `html` takes `scroll-padding-top: 6rem` from `lg` up, through Bootstrap's own `media-breakpoint-up` mixin. The partial reaches that mixin with `@use 'bootstrap/scss/bootstrap' as bs`, which resolves to the module `index.scss` has already configured, so the compiled cascade gains the media query and nothing else.

**Why this direction.** Scroll padding covers every scroll the browser performs — an anchor jump, a focus move, a driver's `scrollIntoViewIfNeeded`. It cannot cover a person who scrolls with a finger and taps a control that has come to rest under the chrome, because no scroll API runs in that path. At 390 CSS px the chrome is 137 px of an 844 px viewport, so that untouched path is 16 % of the screen deep. Removing the cover below `lg` closes it outright, and the skill's responsive-layout reference names this case: let nonessential sticky chrome become static on narrow or short screens. From `lg` up the masthead is 85 px of an 800 px viewport and the brief keeps it deliberately, so there the WCAG 2.2 SC 2.4.11 remedy — reserve the sticky depth on the scroll container — is the right and sufficient one.

**Was scroll padding alone sufficient for the driver?** Yes for the driver, no for the reader. Measured, not reasoned:

- With `scroll-padding-top` declared and the masthead left sticky at every width, `VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'` reported Tests 18 passed (18), against Tests 3 failed | 15 passed (18) at the baseline commit. So Blink's scroll-into-view-if-needed, which Playwright drives, does honour scroll padding: the padded scrollport excludes the chrome band, so a control resting in that band counts as not visible and gets scrolled clear.
- The same question read directly in the browser: with scroll padding applied, `scrollIntoView({ behavior: 'instant', block: 'start' })` put the control at `top=137` at 390 and `top=85` at 1280, reaching itself at its own centre. Without it, `top=0`, with the centre hitting `SPAN.d-block` at 390 and `DIV.container-xl` at 1280.
- Scroll padding does nothing for a manual scroll. That is the reader path the brief describes, and it is why the narrow masthead stops being sticky rather than keeping the cover and reserving around it.

**Candidates rejected.**

- _Scroll padding alone, masthead sticky at every width._ Rejected on the manual-tap path just named, and on the 16 % chrome cost at 390 that it leaves in place. Its journey run passed, so it is rejected on what the run cannot see rather than on the run.
- _Shrink the narrow masthead._ Rejected without building a shrunken variant, because shrinking cannot reach zero: any remaining sticky depth keeps a band where a manually scrolled control is untappable, and the narrow masthead's rows carry the brand, the primary action, the mode toggle, and the menu trigger. Shrinking trades reader-visible chrome for the same defect at smaller scale.
- _Dropping the wide sticky masthead._ Not done. The brief keeps it and the measurement supports keeping it: 85 px of an 800 px viewport, with the scroll-padding remedy closing every programmatic path.

**Instrument note.** Bootstrap's reboot declares `scroll-behavior: smooth` on the root, so a reading taken straight after `scrollIntoView()` measures the animation rather than its result. The first version of the proof reported `reaches nothing` at 1280 for that reason. The shipped proof scrolls with `behavior: 'instant'`, which is what the driver and a settled reader scroll both produce.

## The failing proof

Command, red and green, the same command both times:

```
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts tests/app/browser/styles/signature.test.ts
```

- **Red**, with `sticky-lg-top` reverted to `sticky-top` and the `scroll-padding-top` rule removed: `Tests 3 failed | 9 passed (12)`.
- **Green**, with both restored: `Tests 12 passed (12)`.

The revert reddened exactly the cases that name the defect, and nothing else:

- `App > leaves a scrolled-to control reaching itself under the masthead at every width` — `1280 px buries a scrolled-to control`, listing `Get started reaches the masthead`, `Read the magazine reaches the masthead`, `Explore products reaches the masthead`, `Search markets reaches the masthead`, `Read the magazine reaches the masthead`, `Subscribe free reaches the masthead`.
- `App > keeps the masthead sticky from lg and lets it scroll away below it` — `['1280 sticky', '390 sticky']` against `['1280 sticky', '390 static']`.
- `signature > reserves the sticky masthead depth on the scroll container` — `expected 0 to be greater than or equal to 85`.

The 390 leg of the centre-hit case reddens as well; the loop reports the 1280 leg first and stops there.

The headline defect's own red, recorded on this host at commit `190ccf2` before any edit: `VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'` gave `Tests 3 failed | 15 passed (18)`, the marketplace journey timing out at 29,040 ms on `<a href="#/subscribe" class="btn btn-primary">Get started</a> from <header class="masthead border-bottom sticky-top">…</header> subtree intercepts pointer events`, with the frame-set and placed-state assertions failing behind it on the missing `marketplace-miss` frame.

## The capture runs

`VITE_CAPTURE=true npm run test:journey`, three runs, each on the final application source:

| Run    | Result                                        | Frames                                                      |
| ------ | --------------------------------------------- | ----------------------------------------------------------- |
| First  | Test Files 4 passed (4), Tests 72 passed (72) | Every declared state written for all four variants          |
| Second | Test Files 4 passed (4), Tests 72 passed (72) | Every declared state rewritten for all four variants        |
| Third  | Test Files 4 passed (4), Tests 72 passed (72) | Every declared state rewritten for all four variants        |

The suite's own `writes every frame this run owes` case passed in each of the four projects on every run; it compares the portfolio's written paths against `expandCaptures(STATES, [CURRENT])` and reads each PNG's width and height back. On the filesystem, `find tmp/capture/states -name '*.png' -newermt <run start>` counted 52 frames per run, which is the declared state set across the four variants. Two files in that directory — `shop--dark-1280.png` and `shop--light-1280.png`, both stamped 10:34 — predate this unit and belong to a retired state name. No run this unit made wrote them.

Accessible-name evidence: the journey artifacts written before the class change were copied to `tmp/u5b/before/`, and the `## accessible tree` and `## focus order` sections of `light-1280`, `dark-1280`, `light-390`, and `dark-390` diff clean against the artifacts the final run wrote.

## Observations

- `npm test` wall-clock: 69 s, exit 0 — app 43 files / 119 tests, journey 4 files / 68 passed and 4 skipped, policy 111, config 46. Take it as an observation rather than as this unit's gate reading: it ran inside this unit's own exec, and the authoritative sweep belongs to an independent verifier on an idle host.
- The narrow masthead's own height is unchanged at 137 px, measured at 390x844 after the fix; its bottom sits at 205 px because the utility bar above it stacks into a column below `md`. What changed is that the height no longer costs permanent viewport: `position` computes `static` at 390 and `sticky` at 1280, where the masthead is 85 px and the reserved scroll padding reads 96 px.
- `guides/README.md:98` calls the masthead sticky without qualification. It is off-limits to this unit; a patch is proposed under § Shared-file patches.
- A narrow reader reaches the menu trigger, the mode toggle, and the header's Get started control at the top of the page rather than at any scroll position. Every view change calls `revealView`, which returns the page to the origin, so each destination still opens with the masthead in view, and the footer carries the full destination set for a reader deep in a page.
- The compiled cascade grew by exactly the new media query. Compiling the baseline partials and the current ones with `sass` gives outputs that differ in those lines and nowhere else, so the second `@use` of Bootstrap emits no duplicate CSS.
- `npm run test:policy` passes (111) with these edits in the tree.

## Shared-file patches

`guides/README.md`, report-only. Replace the opening of § The knowledge shell:

```diff
-`App.vue` mounts the skip link, the utility bar, the sticky `masthead` `navbar`, the offcanvas menu,
-`<main id="main">`, and the footer. `Site` names the navbar, `Content` names main, and `Site footer`
-names the footer.
+`App.vue` mounts the skip link, the utility bar, the `masthead` `navbar`, the offcanvas menu,
+`<main id="main">`, and the footer. The masthead is sticky from `lg` up and scrolls with the page
+below that, where its depth would otherwise cover whatever a reader scrolls to. The stylesheet
+reserves that sticky depth as `scroll-padding-top` on the scroll container, so an anchor jump and a
+focus move land clear of it. `Site` names the navbar, `Content` names main, and `Site footer`
+names the footer.
```

## What I did not close

- **The wrapped-inline-link centre.** The centre-hit proof covers `.btn` controls inside `#main`. A wrapped inline link spans two line boxes with a gap at its bounding-box centre, which `followField` in the journey already documents, so a centre reading for that shape measures the gap rather than the cover. Extending the proof to inline links needs a hit model that picks a point inside a line box, and that belongs with whoever owns the inline-link hit target.
- **The narrow masthead's height itself.** It stays 137 px. This unit removed its cost as permanent chrome rather than shrinking it; a shrink is a view-layer design change and units 6, 7, and 8 own the views.
- **`guides/README.md`.** Off-limits here; the patch is proposed for serial integration.
- **Finding A1 from the unit 3 audit.** Out of scope by this brief; it carries to unit 9.
