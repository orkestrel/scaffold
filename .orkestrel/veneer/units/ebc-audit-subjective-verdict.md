**Lane:** subjective (`reviewer` on Opus 5.5). I read the source, the diff, and the retained logs. I ran nothing, because this lane holds no shell. Every ruling below that rests on source reading and not on an executed result says so.

## Per-claim verdicts

1. **CONFIRMED.** The rules in `/home/user/veneer-ebc/src/styles/elements/_button.scss` hold as claimed.
   - The surface rule `button` (line 18) and its states `&:hover`, `&:active`, `&:focus-visible` and `&:disabled` (lines 39–64) read no class and no attribute. All of it sits inside `@layer elements` (line 3).
   - No `cursor` sits in the surface. The only `cursor` on the `button` tag is `button:not(:disabled), …` at lines 78–83. The mixins the surface includes write no `!important` (`/home/user/veneer-ebc/src/styles/_mixins.scss:363-399`).
   - The rule `[role='button'] { cursor: pointer }` at line 70 is correct and not a violation. It is the release's own reboot, and it selects on the attribute, not the tag.

2. **CONFIRMED.** The mixin's property set equals the surface's.
   - The surface writes these properties at rest and in its states (the `transition` and `focus-ring` mixins included): padding, font-family, font-size, font-weight, line-height, color, background-color, border, border-radius, box-shadow, transition, outline, opacity, and pointer-events.
   - The mixin at `_mixins.scss:140-155` writes the same set. It writes `inherit` for font-family, font-size, and line-height, `0` for border-radius, and `revert` for the rest.
   - The executed cross-check is the mixin case at `tests/src/styles/mixins.test.ts:195`. It is green in `ebc-instruments/r2/ebc-2-test.log.txt:8198`, and red before the change in `ebc-red-owned.log.txt:299-316` with an `AssertionError`.

3. **CONFIRMED.** The includes match the verdict.
   - A search of `src/` for `button-reboot|:where\(` finds exactly the verdict's selectors: `_close.scss:6`, `_navbar.scss:105`, `_accordion.scss:42`, `_dropdown.scss:228`, `_nav.scss:21`, `_list-group.scss:42`, `_pagination.scss:45`, and `_carousel.scss:86` and `:172`. Each is wrapped in `:where()` inside `@layer components`.
   - `.btn` includes nothing, and no other partial includes the mixin.
   - The mixin case at `mixins.test.ts:213` asserts that the `components` layer's `:where(` rules equal `BUTTON_REBOOT_SELECTORS`.

4. **BROKEN, on the claim's conditions only.**
   - **Failing state:** `ebc-instruments/ebc-probe/revert.mjs:96` takes every `rest` reading before `page.emulateMedia({ reducedMotion: 'reduce' })` at line 98. So the log's `rest transition-*`, `rest color` and `rest font-weight` readings (`ebc-probe-revert.log.txt:58-66`) were not taken under reduced motion, as the claim says they were.
   - **What holds:**
     - Each reverted property reads the release's value on both pages.
     - The `.dropdown-item` weight of 700 comes from the class's own `font-weight: var(--vn-weight-body)` (`_dropdown.scss:239`). It does not come from the reset.
     - The colour differences in log lines 6–53 are all values the class writes itself.
   - **Smallest fix:** restate the claim as "rest readings with motion unreduced; state readings under reduced motion", or re-read the rest state under reduced motion. No code change is needed.

5. **UNRESOLVED.**
   - **Held:** the case titles read red before the change with an `AssertionError` (`ebc-red-owned.log.txt:299-596`), and green after. Each restore is byte-identical (the `restore:` line in each `ebc-mutation-*.log.txt`).
   - **Undecided:** whether each mutation kills its cases.
     - Each mutation log's FAIL list matches the report's table, but `mutate.sh:35` pipes the run through `grep -E ' FAIL |Tests |Test Files '`. That strips every failure message.
     - The claims file counts a kill only when the message names an assertion failure, so no kill is evidenced.
     - **Mutations and discrimination:**
       - `class` and `target` restore the old selector. The tag proof's per-button equality (`button.test.ts:159`) distinguishes them, as the red log shows for the pre-change selector.
       - `important` is caught by the priority filter at `mixins.test.ts:222-228` and by the consumer case.
       - `nav` is caught by the literals at `button.test.ts:223`.
       - This is derived from source. The message was not seen.
   - **What settles it:** re-run `mutate.sh` without the grep filter and keep the `AssertionError` lines.

6. **BROKEN.**
   - **Failing input:** add `letter-spacing: 0.05em` inside the surface's `&:hover` block (`_button.scss:39-45`).
     - The `.btn` forms case (`button.test.ts:197-222`) never hovers, presses, or keyboard-focuses anything. It reads `getComputedStyle` at rest, disabled, and checked only.
     - So `:hover` never matches and the case stays green, while a hovered `button.btn` shows letter-spacing that `a.btn` does not.
     - The mixin case reddens, and adding `letter-spacing: revert` to the mixin turns it green again. The leak onto `.btn`, which takes no reset, then goes unguarded.
     - This is derived from source: the case contains no state action.
   - **Smallest fix:** read each form under hover, press, and keyboard focus against the anchor form in the same state. The alternative is to narrow the claim, and the guide sentence at `guides/veneer.md:3182` ("…at rest and in each state…"), to what the case reads.
   - **Also:** the `spacing` kill has the same missing-message gap as claim 5.
   - **Held:** the forms match the round 1 brief's list (filled, outline, link, both sizes, disabled, checked; `tests/setupStyles.ts` `BUTTON_FORM_CASES`). A property unset at rest does redden the case.

7. **UNRESOLVED.**
   - **Held:** the literals at `button.test.ts:223-244` (radius 0, shadow `none`, holder family, 19px/29px, weight 600) equal the release's reading under the same holder. `ebc-probe-revert.log.txt:62` shows 600/600, and log lines 28–37 list no corner, type, or shadow difference for `nav`.
   - **Undecided:** the `nav` kill appears as a FAIL line with no message (`ebc-mutation-nav.log.txt:19`). Settle it as in claim 5.

8. **CONFIRMED.**
   - The round 2 hunks (`ebc-2.diff:752-807`) add `:where(button.accordion-button)` and the two carousel `:where()` selectors. These are exactly the selectors the partials write, and `mixins.test.ts:213` pins them against `BUTTON_REBOOT_SELECTORS`.
   - No hunk touches `ACCORDION_SELECTORS` or `CAROUSEL_SELECTORS`.
   - The suite is green: `r2/ebc-2-test.log.txt:8198`.

9. **BROKEN.**
   - **Failing input:** delete the surface declarations from every button, or let the consumer profile drop Veneer's `elements` layer.
     - The case at `tests/service/tailwind/consumer.test.ts:292-316` compares the `px-8` button only against the plain button, and anchors the plain button only by `padding-left !== resolved`.
     - With no surface at all, both buttons read the reboot and user-agent values. The user-agent padding of 6px differs from `px-8`'s value, and the two readings stay equal apart from padding. The case stays green.
     - So it proves that a utility-only button matches a classless one apart from padding, and not that it "keeps the button surface".
     - This is derived from source.
   - **Smallest fix:** anchor the plain reading to the surface, as `button.test.ts:138-141` does (the surface's padding, weight, and a non-`none` shadow). Then the guide sentence at `guides/veneer.md:3301-3302` ("…every other value of the surface") becomes proven.
   - **Also:** the `class` kill has the same missing-message gap as claim 5.

10. **BROKEN.** The retired term survives in the guide and in source.
    - `guides/veneer.md:7118`: "Bare `button` and `.btn` hover and active veils".
    - `guides/veneer.md:7189`: "Only the bare `button` rule and the bare `.btn` hover and active backgrounds read the `--vn-state-mixer` token".
    - The same sense appears as "bare hover fill" (`:7111`), "bare fills" (`:7114`), "bare resting fill" (`:7124`), and "the light bare veil" (`src/styles/_tokens.scss:239`).
    - The identifiers `BUTTON_BARE_VALUES` and `BUTTON_BARE_CASES` (`tests/setupStyles.ts:3037,3046`) remain. The report defers them to E-ID-BUTTON-CLASSES.
    - **Held:**
      - The § Styles paragraph (`guides/veneer.md:3166-3186`) states the tag rule and the per-class reset as shipped.
      - The § Outside the ledger sentence is true. `collectSelectorClasses` skips any class at `depth !== 0` (`tests/setupServer.ts:1828`). `LAYER_COMPONENTS` has no `components` key (`tests/setupServer.ts:424-427`), so `attributeSelector` falls to `matchSelectorKey([], shipped)` and returns `undefined`.
      - The "So a disabled `button.nav-link`…" sentence is proven by `tests/src/styles/components/nav.test.ts:192-214`.
    - **Fix:** reword the listed lines to "the button surface" or "the `button` rule", or to "the surface's hover fill" and similar.

11. **BROKEN, on the case-title clause.**
    - The title at `button.test.ts:84` says the utility-class button is painted "with the surface a classless button wears, at rest and in every state".
    - The case asserts the opposite for the utility's own longhands. Lines 155–158 require `px-3`'s padding to differ from the surface's, and line 159 expects the utility's value there.
    - **Fix:** retitle, for example "…with the surface a classless button wears, apart from a utility's own longhands, at rest and in every state".
    - **Held:**
      - Every changed path in `ebc-2-status.txt` sits in round 1's owned or shared set or in round 2's grant.
      - A search of the added lines finds no `as`, no non-null `!`, no `any`, no suppression, and no nested `function`.
      - The `BadgeSection.test.ts:56` edit replaced "bare button class", which meant the role-less `.btn`, not the element scope. It sits in the granted glob and serves the verdict's retirement of the term.

## Findings outside the claims

- **F1, comment truth.** `src/styles/elements/_button.scss:4` reads "Every button keeps the release's reboot at the release's values, whatever class it carries." That is false for a classless button: it wears the surface's type and corner, not the release's inherited type and square corners.
  - **Executed evidence:** `button.test.ts:140` asserts `font-size` of `14px` under a 19px holder.
  - **Why it matters:** the comment tells a maintainer the reboot is intact on every button, while the next comment (lines 11–17) says the surface replaces part of it.
  - **Right looks like:** "Every button keeps the release's margin, text transform, and button appearance, whatever class it carries."
- **F2, vocabulary.** Two constants share a prefix but name opposite things.
  - `BUTTON_REBOOT_SELECTORS` (`tests/setupStyles.ts:3216`) lists where the `button-reboot` mixin is included.
  - `BUTTON_REBOOT_LONGHANDS` (`tests/setupStyles.ts:3198`) lists the release-reboot longhands that the `button-reboot` mixin never writes.
  - So `mixins.test.ts:219`, `!BUTTON_REBOOT_LONGHANDS.includes(longhand)`, reads as "the button reboot's longhands minus the button reboot longhands".
  - **Why it matters:** this breaks AGENTS.md § One concept, one term.
  - **Right looks like:** rename the longhand list for what every button keeps, for example `BUTTON_KEPT_LONGHANDS`. Update its doc comment and its sites: `mixins.test.ts:22,207,208,219` and `tests/setupStyles.test.ts:378`.

## Attacked and held

- **Tenet fit:** the reset sits at zero specificity in a later layer, so a consumer's class wins with no specificity contest. The consumer case at `button.test.ts:167` checks this unlayered and inside `components`. This satisfies ROADMAP § Tenets "Preserve direct control through classes".
- **Pointer focus:** `outline: revert` in `components` outranks the elements rule `button:focus:not(:focus-visible) { outline: 0 }`. Pointer focus still reads `none` on both pages (`ebc-probe-revert.log.txt:58-66`). That is correct, because the user-agent outline applies only on `:focus-visible`.
- **Indicator selector:** `:where(.carousel-indicators [data-bs-target])` also matches elements that aren't buttons. The verdict names it. On a non-button, `revert` and `inherit` resolve to the value the element would already take.
- **Reduced motion:** `transition: revert` carries no reduced-motion pair. It reverts to `all 0s`, so it adds no motion.

## Referrals (objective lane)

- **Claims 5, 7, 6, and 9:** re-run `ebc-instruments/ebc-probe/mutate.sh` without the grep filter and confirm each FAIL carries an `AssertionError`.
- **`tests/app/browser/sections/BadgeSection.test.ts:56`:** check that the reworded comment ("the `btn` class alone paints the body text over the dark cell and no fill behind it") is true of the shipped `.btn`.

VERDICT: FAIL 4, 5, 6, 7, 9, 10, 11; outside the claims: F1, F2