I ran read-only, in-memory checks against the real Sass partials, collectors, inventory, and built CSS. I did not rerun the browser suites; the browser tool was unavailable.

1. **CONFIRMED.** The `.icon-link`, `.ratio`, and `.vr` families in [the styles barrel](C:/Users/mikes/WebstormProjects/veneer/src/styles/index.scss) match the recorded selector/condition multiset. Their partials use the components layer and required logical substitutions. The built declarations agree with the recorded departures.

2. **CONFIRMED.** The `$aspect` loop in [_ratio.scss](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_ratio.scss) derives each selector and percentage. Adding `(5 4)` to an in-memory copy emitted `.ratio-5x4` with `80%`.

3. **CONFIRMED.** The `.ratio-#{$width}x#{$height}` declaration uses bare division. Compiling the real partial emitted `42.8571428571%`; the in-memory grid-style rounding mutation emitted `42.85714286%`.

4. **CONFIRMED.** The diff leaves `_tokens.scss` and `TOKEN_NAMES` in `src/core/constants.ts` unchanged. The `.vr` selector reads the existing `--bs-border-width` alias.

5. **CONFIRMED.** `readDeferrals` returned no deferred name under these keys. `collectGridVocabulary` found every recorded selector and condition in the built cascade. Removing `.vr` in memory broke equality.

6. **REFUTED — forces another round.** [The `collectGridVocabulary` export](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts) rejects ASCII extensions such as `.ratios`, but admits `.ratioé`, `.icon-linké`, and `.vré`. It also admits escaped longer names such as `.ratio\78`. The `[^\w-]` alternative mistakes valid CSS identifier continuations for boundaries. An unrelated longer class therefore produces a false surplus finding.

7. **CONFIRMED, with limited coverage.** Mutation: remove the prefix boundary. The case `collects the helper prefixes and their preference condition without admitting longer names` distinguishes that mutation: executing the mutated collector admitted `.icon-linkage`, `.ratios`, and `.vrs`, breaking its expected result. It does not cover claim 6’s Unicode or escape cases.

8. **REFUTED only as to exclusivity; does not force another round.** Mutation: append `.ratio-5x4`. The case `binds the built class-family selector and media-condition multiset to the inventory minus deferrals` includes the helper keys and rejects that addition; I reproduced this in memory. However, the icon-class assertion also rejects an extra `.icon-link-extra > .bi` selector. The vocabulary comparison is therefore not the only assertion capable of catching an extra selector.

9. **CONFIRMED.** Mutation: omit `ratio` from either enumeration. The equality assertions distinguish that omission from the guide-derived membership. The helper keys occupy the required positions in `carries every shipped component selector and custom property in the built cascade` and `skips engine and CSS obligations whose Proof cell is a dash`.

10. **CONFIRMED.** Mutation: remove the ratio variable row. Executing `collectShippedComponents` then excluded `ratio` while retaining `icon-link` and `vr`. The real `scanCompatibilityPresence` returned no failure for the shipped cascade.

11. **CONFIRMED.** Mutation: substitute eight-decimal rounding in the partial. The authored-value equality in `binds every named ratio to the inventory, to its own name, and to the scale the family carries` distinguishes it. Sass’s `loadedUrls` identified the real `_ratio.scss`; the mutated authored values failed equality. Lightning CSS reduced either source value to `42.8571%`.

12. **CONFIRMED.** Mutation: change the control’s scale from `1e8` to `1e10`. Its `.not.toEqual` assertion then fails. The existing control differs specifically at `21x9`, so its success is not vacuous.

13. **CONFIRMED, with nonblocking order sensitivity.** Mutation: add standalone `.bi` or `.icon-link-extra > .bi`. The assertions in `carries the official icon-link classes and the undefined icon class in the mounted markup` reject these mutations. Its ordered equality also rejects reversing the equivalent hover/focus selector list; I reproduced that. This is unnecessary test coupling, but it does not invalidate the present selector proof or shipped behavior.

14. **CONFIRMED as proof construction.** Mutation: remove the reduced-motion override or replace the token duration with a fixed duration. The assertions in `reads the icon transition from the motion tokens and collapses it under reduced motion` distinguish these changes. The installed `stageMedia` implementation sends real media emulation and verifies `matchMedia`; the factor override is applied at `document.documentElement`, where the duration token resolves. I did not independently reproduce its browser readings.

15. **CONFIRMED.** Mutation: replace the gated `transition: none` with only `transition-duration: 0s`. The case `gates the collapsed transition on the preference condition in the shipped cascade` rejects it because the gated declaration’s `transition-property` would not be `none`. A collapse using a non-transition property also fails its declaration filter.

16. **UNPROVEN — requires browser evidence.** Mutation: change the fallback shift from `0.25em` to `0.5em`. The painted-distance assertion in `shifts the icon on hover and on keyboard focus only while the hover class is present` distinguishes that change from the expected quarter-font distance. However, I could not independently verify the claimed SVG transform serialization: browser discovery returned no available surface, and opening the in-app browser failed. The report alone does not settle that part.

17. **CONFIRMED as assertion sufficiency.** Mutation: ignore `--bs-icon-link-transform` and retain the horizontal fallback. The same shift case requires the horizontal offset to return to baseline and the vertical displacement to equal the icon’s font size. Those assertions distinguish the published-property retune from the fallback.

18. **CONFIRMED as assertion sufficiency.** Mutations: move icon sizing onto bare `.bi`, remove the named ratio percentage, or change `.vr` opacity. The outside-icon control, unnamed-ratio control, and bare-box paint control distinguish those changes. Removing helper treatments also breaks their positive geometry assertions while leaving element defaults available.

19. **CONFIRMED.** Mutation: add an inline `style` attribute to a helper specimen. The existing `reads the mounted class and style populations with their published controls` assertion rejects it. The evaluated `MEDIA_SPECIMENS`, `LINK_SPECIMENS`, and `LAYOUT_SPECIMENS` additions contain no inline styles and use classes supported by shipped selectors/combinators. The journey file is unchanged.

20. **CONFIRMED.** Mutation: register another section without updating the enumerations. The barrel-key and mounted-region assertions distinguish it. `Showcase` still constructs the existing section family; the additions reside in `MediaSection`, `LinkSection`, and `LayoutSection` through their specimen constants.

21. **CONFIRMED.** Live `git status --porcelain --untracked-files=all` matched the supplied status. Every listed path is owned. The diff over `5e011a3` was empty for the named off-limits paths.

22. **CONFIRMED.** Mutation: duplicate a declaration block across helper partials. The `carries no shared written declaration block across style partials` assertion would reject the resulting `scanStyleBlocks().shared` entries. Executing the real sweep returned `[]`; no extraction into another partial is required.

23. **CONFIRMED.** Mutation: remove the gated collapse; the sibling case `emits the calibrated feedback duration and easing, and collapses it under reduced motion` distinguishes that change through staged preference readings. The installed `stageMedia` and `releaseMedia` exports, their implementations, and that existing sibling proof refute the brief’s unavailable-mechanism premise. Using them stayed within ownership and satisfied the objective without requiring an unowned change.

24. **CONFIRMED.** Mutation: apply the grid’s rounding arithmetic to the ratio source. My Sass/Lightning CSS check produced different authored percentages but identical minified percentages. Moreover, `collectGridVocabulary` compares selectors and conditions, not declaration values, so that comparison cannot detect the precision change even before minification.

25. **CONFIRMED for shipped scope.** The report’s helper families, accounting changes, specimen placement, and absence of deferrals match the diff and live tree. The whitespace-insensitive guide diff supports its formatter-reflow explanation. The built CSS and `.vr` source digests match the report. This does not independently certify its historical gate runs.

26. **Implementation finding — forces another round.** Site: the local `offset` arrow function inside [the icon-shift case](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/icon-link.test.ts).  
    Failure scenario: loading this test leaves a function assigned inside another function, violating `AGENTS.md` and the architecture rule; the lint override excludes tests, so a green lint result cannot detect it. Move the reusable reader into the permitted shared test infrastructure and prove it there.

Verdict: fix round with claims 6 and 16, and finding 26.