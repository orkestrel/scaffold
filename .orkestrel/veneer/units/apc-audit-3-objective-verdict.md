# AP-COLOR audit round 3 — objective verdict (`analyst` on GPT-6 Astra, thread 01a0d57d-605c-7e21-8908-f2a96d29ddda)

1. **CONFIRMED — Scope and gates.** The live status matches `apc-3-status.txt:1`; every changed path is owned or shared. The retained patches match the live diff and pass reverse-application checks. Comparing `git diff 712ae72 -- src` with the source sections of `apc.diff:1` returned byte equality; an in-memory neutral-list alteration returned inequality. The attack for an undeclared source change failed.

   The retained logs under `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/` record exit 0 at `apc-3-final-format-check.log.txt:10`, `apc-3-final-lint-check.log.txt:6`, `apc-3-final-check.log.txt:30`, `apc-3-final-test-src-styles.log.txt:8203`, `apc-3-final-test-setup.log.txt:37`, `apc-3-final-test-conformance.log.txt:16`, and `apc-3-final-test-guides.log.txt:16`. Their measurements match the report.

2. **CONFIRMED — H1.** Reconstructing round 2 from its retained patch and comparing its retune assertions with the current cases found no lost assertion. The titles identify their respective paths:

   - [Channels and density](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:220): role and emphasis remain unchanged under density; the channel consumer becomes `rgb(20, 80, 140)`; role text remains unchanged under the channel override.
   - [Fill and body text](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:247): each override changes the resting role color and matches its independent mix twin; emphasis also matches the retuned fill.
   - [Theme token and element alias](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:285): each override moves its target to the specified color; the sibling remains unchanged. The resting-color pre-check strengthens the retained assertions.
   - [Descendant token](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:312): the retained link pre-check excludes an already-matching color; the override leaves role text unchanged and moves the colored link.

   I read the round-3 mutation logs. Their assertions distinguish the mutations from the passing cases:
   
   - `apc-3-mutation-primary-channel.log.txt:129`: channel invariance, fill movement, theme-token control, and element-alias control fail in light and dark.
   - `apc-3-mutation-text-inline-tier.log.txt:133`: theme-token and element-alias control fail in light and dark.
   - `apc-3-mutation-text-reads-token.log.txt:133`: element-alias control and unchanged descendant text fail in light and dark.
   - `apc-3-mutation-link-reads-alias.log.txt:169`: descendant-token movement of the link fails in light and dark.

   These logs are under `apc-instruments-3/`. Each records byte-identical restoration. The primary-channel mutation stops the fill/body case at its fill assertion; that log does not independently demonstrate a body-text assertion failure.

3. **CONFIRMED — H6.** [color.test.ts:342](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:342) paints the theme scope and mounts emphasis and role classes with `text-opacity-50`. The loop covers every member of `TEXT_TIER_CASES`; assertions at lines 360 and 366 require alpha `1` and `0.5`, respectively.

   I read `apc-instruments-3/apc-3-mutation-emphasis-opacity.log.txt:146`: giving emphasis the opacity variable produces `0.5` instead of `1` for primary, secondary, success, info, warning, and danger in light and dark. The assertions distinguish the mutation. Restoration is recorded at line 294. The passing scoped run is recorded at `apc-3-scoped-1.log.txt:90`. The compiled emphasis declaration also retains its direct alias read without an opacity variable.

4. **CONFIRMED — H5.** [color.test.ts:67](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:67) compares danger text with the independent tier twin; line 74 requires inequality with the recorded channel color. Restoring `.text-danger` to its channel therefore reverses both expected results.

   I read `apc-instruments-3/apc-3-mutation-danger-channel-record.log.txt:118`: `danger tier` and `danger channel` fail in light and dark under the release-record title. This is an assertion failure in the selected proof, not a build or collection failure. Line 197 records byte-identical restoration.

5. **CONFIRMED — H3 and H4.** [guides/veneer.md:6848](/home/user/veneer-apc/guides/veneer.md:6848) restricts the `.text-primary` comparison to the anchor’s resting color, matching [a.test.ts:61](/home/user/veneer-apc/tests/src/styles/elements/a.test.ts:61). The retained `apc-instruments-2/apc-2-mutation-dark-link-80.log.txt:137` distinguishes the wrong dark resting tier; the light case remains green.

   The sentences at [guides/veneer.md:6322](/home/user/veneer-apc/guides/veneer.md:6322) separate the measured color properties, the overrides that move role text, and the channel/descendant behavior. Their claims match the assertions and mutations ruled in claims 2 and 3. Comparing reconstructed round-2 and round-3 guide paragraphs after whitespace normalization found only the requested color-proof rewrite and anchor qualification. The remaining rewrapping changes no word.

6. **CONFIRMED — H2.** The attempted counterexample against [ap-color-report-3.md:38](/home/user/scaffold/.orkestrel/veneer/units/ap-color-report-3.md:38) fails: the report explicitly distinguishes the scopes. Theme-dependent overrides target the theme element at `color.test.ts:240`, `:260`, `:272`, and `:297`. Density targets the root at line 233 and is removed in `finally` at line 237. The alias and descendant-token overrides target descendants at lines 303, 324, and 325. The report no longer asserts that every override belongs on the theme element.

7. **CONFIRMED — Law and report.** An installed-TypeScript-parser inspection of changed TypeScript against its base found no added `any`, assertion expression, non-null assertion, suppression, prohibited nested function, or hidden helper. An in-memory control containing those violations was detected. The split and added titles at `color.test.ts:220`, `:247`, `:285`, `:312`, and `:339` name their asserted behavior.

   The mutation rows at [ap-color-report-3.md:50](/home/user/scaffold/.orkestrel/veneer/units/ap-color-report-3.md:50) match the retained failures and passing adjacent cases. The report’s gate and artifact claims also match the evidence checked in claim 1.

   **Counts stated in the report:** 4 split retune cases; 2 required mutation runs; 4 repeated retune mutations; 3 unaffected split cases for the inline-tier and link-alias mutations. Gate measurements: styles **1456 passed, 115 files**; setup **320 passed**; conformance **26 passed**; guides **20 passed**. The scoped color run records **23 passed**. The diffstat records **15 files, 883 insertions, 274 deletions** at `apc-instruments-3/apc-3-diffstat.txt:16`.

**Findings outside the claims:** none.

**Attacked and held:** Neutral text and link declarations remain on their channels. Descendant text and link behavior intentionally differs because the text alias substitutes at the theme scope while the link reads the token directly. The root density override and its cleanup remain correct. No additional failed attack is omitted from the numbered verdicts.

VERDICT: PASS