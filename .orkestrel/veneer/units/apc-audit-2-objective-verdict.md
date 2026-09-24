# AP-COLOR audit round 2 — objective verdict (`analyst` on GPT-6 Astra, thread 01a0d56c-91dc-7871-8340-366767d5b044)

1. **CONFIRMED — Scope and gates.** The live status matches `apc-2-status.txt:1`; every changed file is owned or shared. The owned patch matches the live diff, and each retained patch passes reverse-application checking. The attack for unauthorized files, stale patches, or concealed final failures found none. The retained final logs record exit 0: `apc-2-final-format-check.log.txt:10`, `apc-2-final-lint-check.log.txt:6`, `apc-2-final-check.log.txt:30`, `apc-2-final-test-src-styles.log.txt:8203`, `apc-2-final-test-setup.log.txt:37`, `apc-2-final-test-conformance.log.txt:16`, `apc-2-final-test-guides.log.txt:16`, and `apc-2-final-test-journey.log.txt:737`. These logs reside in `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/`. Their measurements match the report.

2. **CONFIRMED — Source unchanged.** The executed comparison of `git diff 712ae72 -- src` against the source sections beginning at `apc.diff:1` returned byte equality. An in-memory control replacing `$neutrals: light, dark` with an empty list returned inequality. The attack for a round-2 source change therefore failed. A declaration-level comparison of the supplied compiled cascades also found only the ruled token, outline-text, colored-link, and text-utility changes; neutral declarations remain unchanged.

3. **CONFIRMED — F1.** [tests/setup.ts:3025](/home/user/veneer-apc/tests/setup.ts:3025) contains exactly the specified neutral outline readings, and its diff changes only that table and its remarks. The journey compares measured, sorted under-bar readings against this independent table at [integration.test.ts:530](/home/user/veneer-apc/tests/app/browser/integration.test.ts:530). Restoring the stale entries distinguishes the failing case: `apc-instruments/apc-capture.log.txt:3` records that mismatch in every variant. The repaired case passes in the retained round-2 journey log at lines 516, 568, 620, and 672. The neutral exclusions remain correct; the remarks do not claim that neutral outlines clear the bar.

4. **CONFIRMED — F2.** The `tier-80-dark` mutation reaches the named assertions and distinguishes it from the passing cascade. I read `apc-2-mutation-tier-80-dark.log.txt`:
   - Link rest fails for dark info at **4.2866587** and dark danger at **3.9669851**: lines 572 and 584.
   - Outline rest fails for dark info at **4.2860026** and dark danger at **3.9664056**: lines 524 and 536.
   - Invalid feedback and checked label each fail at **3.9664056**: lines 548 and 560.
   - Every dark hover case fails the weighting assertion at `link.test.ts:87`: log lines 595–609.
   - The valid case passes at line 188. Its assertions actually measure success feedback and checked-label contrast in each mode, so this pass establishes that the mutated success tier still clears the bar. The mutation does not need to redden that adjacent case.

5. **CONFIRMED — F3.** Each reported mutation fails its named proof, with the reported mode boundaries. Besides the mutations detailed in claims 4 and 7:
   - `danger-channel` distinguishes role text from its emphasis class in light and dark: `apc-2-mutation-danger-channel.log.txt:140`.
   - `primary-channel` distinguishes channel-dependent text from the required unchanged resting text at `color.test.ts:247`, in each mode: `apc-2-mutation-primary-channel.log.txt:139` and `:155`.
   - `dark-link-80` distinguishes the anchor from primary text in dark; light passes: `apc-2-mutation-dark-link-80.log.txt:136` and `:146`.
   - `hover-oklab` distinguishes the interpolation space for every tier role in each mode: `apc-2-mutation-hover-oklab.log.txt:250`, failing at `link.test.ts:87`.

   Each mutation log ends with a byte-identical restoration result. The runner performs a byte comparison after restoring the saved file at `apc-mutate-2.py:83`.

   The tightened expectation remains bound to the hovered anchor at [link.test.ts:72](/home/user/veneer-apc/tests/src/styles/utilities/link.test.ts:72). Its starting channels come from the separate ruling-based twin at line 66, and its expected channels use the independent 80/20 arithmetic at line 81. The anchor’s resting color supplies neither. The attacks using an 80% tier and oklab interpolation fail at this comparison.

6. **BROKEN — F4, as worded.** “Every override” is not on the theme-declaring element. The density override is written to `document.documentElement` at [color.test.ts:238](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:238). The F7 alias and token overrides intentionally target descendant elements at lines 279, 287, and 288.

   The intended F4 behavior holds: each mode runs; the channel, fill, body-text, and theme-level emphasis overrides target the matching theme scope; and the identity, opacity, validation, and anchor fixtures paint the body background at `color.test.ts:126`, `:183`, `validation.test.ts:334`, and `a.test.ts:57`. The primary-channel mutation distinguishes the retune assertion in each mode, as claim 5 records.

   **Smallest fix:** narrow the claim to the overrides intended for the theme scope, and explicitly retain the root density control and descendant F7 controls. Moving every override onto the theme element would destroy the F7 subject.

7. **CONFIRMED — F7.** The assertions distinguish each removed path:
   - Inlining the tier removes theme-token and element-alias control. Both labeled assertions fail in each mode: `apc-2-mutation-text-inline-tier.log.txt:142` and `:162`.
   - Reading the emphasis token directly removes alias control and changes descendant-token behavior. The alias assertion fails at `apc-2-mutation-text-reads-token.log.txt:142`; the unchanged-text assertion fails in light and dark at lines 161 and 177.
   - Routing the link through the theme alias prevents its descendant token override from moving its color. That assertion fails in each mode at `apc-2-mutation-link-reads-alias.log.txt:174`.

   The assertions at [color.test.ts:273](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:273) match the alias substitution boundary declared by `_mixins.scss:456`. The link pre-check and unchanged-sibling assertion exclude an already-matching override color and unintended sibling movement.

8. **CONFIRMED — F5.** The repaired assertions no longer compare the tier table with its construction template, the share with its own literal, or tertiary with a fixed index. [setupStyles.test.ts:2780](/home/user/veneer-apc/tests/setupStyles.test.ts:2780) compares independently declared populations; removing tertiary from `BUTTON_TIER_ROLES` would fail its set comparison.

   [setupStyles.ts:2821](/home/user/veneer-apc/tests/setupStyles.ts:2821) writes the ruling’s fill/body mix without reading the production emphasis alias. [color.test.ts:67](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:67) compares the class with that twin, then asserts inequality with the release-channel twin at line 74. Restoring a tier class to its channel makes the latter assertion false and separates it from the independent tier expectation. The retained channel mutation selected the identity case, not this release-record case; it is not evidence of an executed red for this particular case. The source-level independence claim holds, and the final styles run passes.

9. **CONFIRMED — F6.** The repaired passages correctly scope identity at [guides/veneer.md:6275](/home/user/veneer-apc/guides/veneer.md:6275), link contrast at line 6329, and retuning at line 6348. The neutral-link count is removed at line 6355. A case-insensitive prohibited-term sweep over added guide lines found no prohibited term; the remaining “one color” describes identity rather than an extensible population.

   The attacks against these behavioral sentences are the channel, tier-at-80, and F7 mutations ruled in claims 4, 5, and 7. Their assertions distinguish the claimed behavior. The excluded neutral colors and descendant token substitution remain consistent with the prose.

10. **CONFIRMED — Law.** Inspection of the added TypeScript through the installed TypeScript parser found no added `any`, assertion expression, non-null assertion, prohibited function placement, or suppression. An in-memory control containing prohibited syntax was detected. The diff introduces no hidden test helper or duplicate color/contrast implementation; the tests use the installed exports from `@orkestrel/test/browser`, whose implementations include `matchesColor` at `node_modules/@orkestrel/test/dist/src/browser/index.js:1906` and `readContrast` at line 2097. The added and retitled tests name their asserted properties, including `color.test.ts:220`, `link.test.ts:57`, and `setupStyles.test.ts:2780`.

11. **BROKEN — Report.** [ap-color-report-2.md:29](/home/user/scaffold/.orkestrel/veneer/units/ap-color-report-2.md:29) says the proof “no longer sets any” root overrides. [color.test.ts:238](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:238) contradicts that statement: it sets the root density override and removes it in `finally` at line 242. The report’s “every override” sentence at line 24 also has the scope defect identified in claim 6.

   **Smallest fix:** state that theme-dependent color overrides moved to the theme scope, while the density control retains its root override and local `finally` cleanup. Preserve the descendant F7 overrides. This is a reporting defect; the density cleanup exists.

   The mutation outcomes and gate measurements match their logs. The report explicitly discloses at line 54 that the pre-tightening tier-at-80 reading and first oklab-hover reading were overwritten and are not retained.

   **Counts stated in the report:** styles **1448 passed, 115 files**; setup **320 passed**; conformance **26 passed**; guides **20 passed**; final journey **4 passed, 244 skipped**, and earlier scoped journey **4 passed**; diffstat **15 files, 790 insertions, 253 deletions**. The mutation logs support **6** dark hover failures for tier-at-80 and **12** hover failures for oklab. The report also states “two things,” “two mutations,” “other six,” and “one file added since round 1”; the named contents and status support those tallies.

**Findings outside the claims:** none.

**Attacked and held:** The compiled neutral-link rest and hover rules remain unchanged. The valid contrast case staying green under tier-at-80 is correct. The primary-channel log’s resting RGB expectations describe that mutated channel implementation, not the restored tier color. The descendant F7 overrides are necessary controls, and the root density override has explicit cleanup.

VERDICT: FAIL 6, 11; outside the claims: none