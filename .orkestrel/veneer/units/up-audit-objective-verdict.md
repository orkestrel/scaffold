1. **CONFIRMED — Scope and delta.** Attempts to find an extra path, changed owned-file bytes, or disagreement between the combined patch and its per-file splits failed. The retained diff matches the owned files. The tracked worktree matches `2a3f223`; `git apply --check` accepts each patch against those base bytes. The profiles patch touches a path absent from the combined patch, so applying the combined patch cannot change its applicability. No prohibited path receives an addition. Evidence: [up-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/up-status.txt:1), [up-shared.patch:1](/home/user/scaffold/.orkestrel/veneer/units/up-shared.patch:1), and [up-unscoped-profiles.patch:1](/home/user/scaffold/.orkestrel/veneer/units/up-unscoped-profiles.patch:1).

2. **CONFIRMED — Cascade against the oracle.** An in-memory Sass compilation with the proposed barrel additions produced inventory/cascade readings of `111/111`, with no missing, extra, duplicate, conditioned, wrongly layered, wrongly prioritized, or textually different declaration. This independently agrees with [up-cascade-count.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-cascade-count.log.txt:1).

   The role walks use the aliased list; the opacity entries run only at the empty infix. See [_background.scss:12](/home/user/veneer-up/src/styles/utilities/_background.scss:12), [_background.scss:51](/home/user/veneer-up/src/styles/utilities/_background.scss:51), [_border.scss:65](/home/user/veneer-up/src/styles/utilities/_border.scss:65), and [_border.scss:81](/home/user/veneer-up/src/styles/utilities/_border.scss:81). The installed release places the rounded entries after pointer events, but the intervening utilities declare no radius property; moving that group beside borders preserves resolution. No departure or addition row is owed. The ledger attack changes the circle value to `49%`; its assertions distinguish that mutation, and [up-mutations-tables-sections-ledger.log.txt:68](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-mutations-tables-sections-ledger.log.txt:68) records the failure.

3. **CONFIRMED — The reported mutations are distinguished.** The retained runs record the mutation sites, commands, exits, summaries, and failing cases. The assertions distinguish each mutation as follows. These rulings use the retained browser runs and the assertions; no browser suite was rerun.

   Style-proof references address the files under `tests/src/styles/utilities/`. The retained evidence is [up-mutations-styles.log.txt](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-mutations-styles.log.txt).

   | Mutation | Distinguishing assertion | Retained log line |
   | --- | --- | --- |
   | `tertiary-emitted` | Yes: rejects the added tertiary selectors, `background.test.ts:67`. | 2 |
   | `literal-role-fill` | Yes: compares resolved colors with independently retuned channel aliases, `background.test.ts:47`. | 17 |
   | `bg-opacity-before-fill` | Yes: compares each resolved alpha with its opacity step, `background.test.ts:83`. | 36 |
   | `local-important` | Yes: opacity steps and unlayered local overrides must change alpha, `background.test.ts:96`, `background.test.ts:251`, `border.test.ts:160`, and `border.test.ts:390`. | 51 |
   | `subtle-light-literal` | Yes: compares each island with its own aliases, `background.test.ts:151`. | 72 |
   | `border-subtle-light-literal` | Yes: compares border colors with each island’s aliases, `border.test.ts:202`. | 87 |
   | `gradient-literal` | Yes: retuning the gradient alias must remove the image, `background.test.ts:180`. | 102 |
   | `opacity-unguarded` | Yes: rejects repeated selectors and media-wrapped rules, `background.test.ts:219`. | 117 |
   | `fill-responsive` | Yes: rejects responsive selectors and media-wrapped rules, `background.test.ts:220`. | 132 |
   | `sides-before-border` | Yes: the removed side must resolve to zero width, `border.test.ts:69`. | 147 |
   | `border-width-literal` | Yes: retuning the width token must produce `3px`, `border.test.ts:40`. | 162 |
   | `radius-literal` | Yes: the radius factor must change the tested radius to `12px`, `border.test.ts:262`. | 177 |
   | `rounded-sides-before-rounded` | Yes: side removals must leave their corners square, `border.test.ts:297`. | 192 |
   | `border-literal-role` | Yes: independently retuned channel aliases must determine border colors, `border.test.ts:112`. | 207 |
   | `border-opacity-before-color` | Yes: resolved alpha must match each opacity step, `border.test.ts:147`. | 222 |
   | `properties-normal` | Yes: later unlayered normal and important declarations must not replace the utility readings, `background.test.ts:246`, `background.test.ts:259`, `border.test.ts:383`, and `border.test.ts:399`. | 237 |
   | `partial-unlayered` | Yes: the later unlayered important override must remain ineffective, `background.test.ts:259`. | 258 |

   The remaining mutations are recorded in [up-mutations-tables-sections-ledger.log.txt](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-mutations-tables-sections-ledger.log.txt).

   | Mutation | Distinguishing assertion | Retained log line |
   | --- | --- | --- |
   | `fill-table-wrong-alias` | Yes: compares the table with aliases extracted from inventory values, `up-shared--tests-setupStyles.test.ts.patch:116`. | 2 |
   | `radius-side-corners-reordered` | Yes: compares ordered corner declarations with the inventory, in the added table-binding case. | 15 |
   | `opacity-table-step-dropped` | Yes: compares the complete step/alpha sequence with inventory declarations, in that binding case. | 28 |
   | `caption-drift` | Yes: compares caption text with the actual swatch classes, `tests/app/browser/sections/BackgroundSection.test.ts:49`. | 41 |
   | `opacity-specimen-step-dropped` | Yes: requires every setup-table composition and the expected opacity population, `tests/app/browser/sections/BackgroundSection.test.ts:68` and `:110`. | 54 |
   | `rounded-circle-ledger` | Yes: requires no unrecorded value departure, `tests/conformance.test.ts:246`. | 68 |

   The service mutations also distinguish their passing cases; their individual rulings appear under claim 5.

4. **BROKEN — The profiles patch weakens the order assertion.** Changing the preflight profile’s order statement to `@layer intruder, theme, reset, base, elements, components, utilities;` passes the patched order and reset assertions. I compiled that input with the installed Tailwind plugin and evaluated the patched readings with the repository’s actual `SheetReader` class. The compiler preserves the extra layer, but the suffix and prefix slices discard it. Evidence: [up-unscoped-profiles.patch:19](/home/user/scaffold/.orkestrel/veneer/units/up-unscoped-profiles.patch:19) and [tests/setupServer.ts:1669](/home/user/veneer-up/tests/setupServer.ts:1669).

   The control that swaps the theme and reset positions fails the patched order assertion. Removing the preflight base block also remains distinguishable through the imported-layer equality and nonempty reset-selector assertion. The defect is acceptance of an additional layer, not loss of every order or reset check.

   The original failure diagnosis and subsequent green run are supported by [up-service-before-profiles-patch.log.txt:12](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-service-before-profiles-patch.log.txt:12), [up-profile-layers.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-profile-layers.log.txt:1), and [up-service-after-profiles-patch.log.txt:10](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-service-after-profiles-patch.log.txt:10).

   Smallest fix: compare each complete profile order with `['properties', ...ORDER]` and each complete combined document order with `[...ORDER, 'properties']`. Keep the scoped theme-variable reading and the generated-properties exception.

5. **CONFIRMED — Tailwind shared names.** Compiling every inventory candidate under the paint keys with the installed compiler reproduced the reported shared set and declarations. The background colors, border colors, rounded radius, and complete border shorthands cover Tailwind’s declared longhands with important declarations. The numbered border widths leave Tailwind’s style longhands uncovered. Evidence: [up-tailwind-longhands.log.txt:11](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-tailwind-longhands.log.txt:11) and [_border.scss:65](/home/user/veneer-up/src/styles/utilities/_border.scss:65).

   The exclusion copies add exactly the numbered border widths; the markup adds exactly the reported shared names. The following controls distinguish the mutations through the derived exclusion equality at [consumer.test.ts:130](/home/user/veneer-up/tests/service/tailwind/consumer.test.ts:130):

   - Adding the rounded name to the line fails: [up-negative-controls-service.log.txt:2](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-negative-controls-service.log.txt:2).
   - Removing the numbered widths fails the equality and resolved-declaration comparison: the same log, line 26.
   - Dropping the rounded declaration’s importance changes the derived exclusion set and fails: the same log, line 52.

6. **CONFIRMED — Sections, specimens, and registries.** Attempts to find an unshipped specimen class or inline style failed when the generated specimen markup was compared with the compiled cascade. The section classes use their declared constants and the shared section contract. Captions match the swatch classes; the caption and missing-opacity-step mutations distinguish drift, as ruled under claim 3.

   The iterated swatch populations derive from the setup tables or rendered specimens. Literal expected-name lists assert the required section order. The construction, exports, showcase expectations, capture subjects, conformance keys, and barrel mappings agree. Evidence: [BackgroundSection.test.ts:35](/home/user/veneer-up/tests/app/browser/sections/BackgroundSection.test.ts:35), [BorderSection.test.ts:34](/home/user/veneer-up/tests/app/browser/sections/BorderSection.test.ts:34), [up-shared--app-browser-Showcase.ts.patch:17](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--app-browser-Showcase.ts.patch:17), and [up-shared--tests-setup.ts.patch:27](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--tests-setup.ts.patch:27).

   The opacity capture rows read paint applied by the fill or border-color class on the same swatch. The tables are exported and frozen, and the binding case derives their expected values from the inventory. Its wrong-alias, reordered-corner, and missing-step controls fail. Evidence: [up-shared--tests-setupStyles.test.ts.patch:96](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--tests-setupStyles.test.ts.patch:96).

7. **BROKEN — The guide overstates proof coverage and leaves bare code values.** The added prose says each class is read at every breakpoint boundary. The background boundary case mounts selected compositions; the border boundary case mounts a selected composition. It also says each radius step is read under the radius factor, while the factor assertion reads only the bare rounded class and its step-2 counterpart. Evidence: [guide patch:101](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--guides-veneer.md.patch:101), [guide patch:144](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--guides-veneer.md.patch:144), [background.test.ts:226](/home/user/veneer-up/tests/src/styles/utilities/background.test.ts:226), [border.test.ts:253](/home/user/veneer-up/tests/src/styles/utilities/border.test.ts:253), and [border.test.ts:360](/home/user/veneer-up/tests/src/styles/utilities/border.test.ts:360).

   The noun requirement also fails at “sets that local to `1`” and “a factor of `2` doubles”: [guide patch:78](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--guides-veneer.md.patch:78) and [guide patch:126](/home/user/scaffold/.orkestrel/veneer/units/up-instruments/up-shared--guides-veneer.md.patch:126).

   Smallest fix: describe the actual boundary compositions and factor subjects, and supply nouns for the code values. The shipped utility behavior, guide placement, compatibility rows, recipe changes, and test links otherwise agree with the implementation.

8. **BROKEN — Writing compliance.** The report contains prohibited wording, including the positional “below” reference at line 23, “via” at line 178, and “above” references at lines 179 and 304. Its claimed noun cleanup also leaves bare code tokens in report prose. Evidence: [b-utilities-up-report.md:23](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-up-report.md:23), [report:178](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-up-report.md:178), and [writing.md:99](/home/user/scaffold/.claude/rules/writing.md:99). Replace those terms and complete the noun cleanup.

   No prohibited TypeScript assertion, non-null assertion, suppression, mock, spy, or disallowed nested function was found in the added code. No added helper duplicates a dependency export. The retained gate outputs support the reported passing readings; the timing interpretations remain the given Orchestrator rulings.

   **Outside-claim finding REPORT-COUNTS — BROKEN, recorded here as requested.** The report’s prose tallies violate the root writing rule. Remove prose counts over extensible sets; preserve attributed run measurements. The report states the following counts:

   - Lines 8–11: one stop-class finding, one process deviation, both executed profiles, and two failing cases.
   - Lines 21–28: file lengths `64`, `110`, `263`, `411`, `22`, `22`, `150`, and `177`; one breakpoint walk; four sides; five rounded entries; `10` background cases and `12` border cases.
   - Line 38: two partials sharing the guard.
   - Lines 50–57: baseline results of `1 failed / 21 passed / 22 total`, `1 passed` file and `22 passed` tests on rerun, `3 passed` service files and `18 passed` tests, and `2` copy-run timeouts; the host has `4` cores.
   - Lines 68–77: `359` formatted files; inventory/cascade selectors `111/111`; style files/tests `2/22`; section files/tests `2/6`; showcase/index tests `5`; conformance files/tests `1/22`; service tests `2 failed / 16 passed / 18 total`; patched service files/tests `3/18`.
   - Lines 81–92: “twice,” five compatibility rows, a second fresh copy; subsequent test results `22`, `19`, `109 passed / 1 skipped / 110 total`, `22`, and `11`.
   - Lines 99–104: repeated guide/policy results `19` and `109 passed / 1 skipped / 110 total`; `4` host cores and `3` timed-out cases.
   - Lines 118–154: `17` style mutations; “both” priority/escape cases; `9` rounded ledger rows; two owned style proofs and two section proofs.
   - Lines 169–179: `8` roles in the subtle-background, border-role, and subtle-border populations; “both” empty-infix cases.
   - Lines 210–219: service-control results `2 failed / 16 passed`, `3 failed / 15 passed`, and `2 failed / 16 passed`; “two” cases; one markup element per shared name and `13` appended lines.
   - Lines 243–254: no departure/addition rows, `9` ledger rows, two Files rows, and one Tailwind paragraph extension.
   - Lines 276–298: five rounded entries; `13` capture-subject members and `13` capture rows; two recipe fences; `13` markup elements.
   - Lines 311–328: the quoted “one order line” case, two border names, `18 passed` service tests, two affected cases, and one patch carrier.
   - Lines 181 and 351: no driven rows, `13` resting rows, and no captured frame.

VERDICT: FAIL 4, 7, 8; outside the claims: REPORT-COUNTS