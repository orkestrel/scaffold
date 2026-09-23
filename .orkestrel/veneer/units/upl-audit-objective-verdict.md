# UTIL-PLACEMENT (`upl`) audit round 1 — objective lane verdict (`analyst` on GPT-6 Astra)

Journal: `tmp/codex/upl-audit-analyst.jsonl` (swept at acceptance); thread `01a0cf39-fd25-7bb0-8290-ff0a33a6153b`; launcher `units/upl-audit-analyst.sh` through `units/codex-queue-8.sh` after a live probe (`ready` at 17:04:38 UTC); started 17:04:38 UTC, done 17:14:16 UTC exit 0. Verdict copied verbatim from the `--output-last-message` file.

1. **CONFIRMED — Delta and scope.** The live status matches `upl-status.txt:1`, and the untracked-file contents match `upl.diff`. The shell change is additive (`upl.diff:1604`). The shared patch and consumer patch stay within their granted paths. The attack was an unexpected path, missing owned file, or substantive deletion concealed as reformatting; none appeared. The guide-table replacement preserves its existing content.

2. **CONFIRMED — Partials and cascade.** An in-memory Sass compilation with the proposed barrel additions produced the inventory’s selectors, with no missing or extra selector. Removing `.min-vw-100` from the comparison made the missing-selector check report it. Comparing declarations and conditions against the inventory produced exactly the proposed ledger departures, with no missing or stale ledger row and no added property.

   The utility entries use the shared mixin (`src/styles/utilities/_position.scss:12`, `_sizing.scss:23`, `_visibility.scss:5`). The visually hidden helper remains important in `utilities` (`_visually-hidden.scss:1`); the fixed and sticky helpers remain normal in `components` (`src/styles/components/_position.scss:3`). The token retunes distinguish literal stack values, as shown by `upl-instruments/logs/fixed-literal.log.txt:360` and `sticky-literal.log.txt:360`. The conformance control is green at `fresh-conformance.log.txt:11`. The normal-helper and prefixed-value rulings hold.

3. **BROKEN — Proof attribution and reported execution scope.** The coverage matrix associates the clipped-box, priority, and dark-island cases with moving the hidden helper into `components` (`b-utilities-upl-report.md:119`). That mutation does **not** distinguish those cases: the clipped-box assertions still read the same dimensions and declarations (`tests/src/styles/utilities/visually-hidden.test.ts:26`). The retained log identifies only the utility-precedence and utilities-layer-override cases as failures (`upl-instruments/logs/helper-in-components.log.txt:359`, `:373`). The suite detects the placement defect, but the claimed case-by-case attribution is false.

   The report also says mutation results were measured over the style suite or the section-suite total (`b-utilities-upl-report.md:98`). The frame logs instead show only the Position section proof: `frame-contain-dropped.log.txt:9`, `frame-overflow-auto.log.txt:8`, and `frame-height-unbounded.log.txt:8` each report a population of 6, not 13.

   The mutation readings are as follows. Log names resolve beneath `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments/logs/`.

   | Mutation | Do the assertions distinguish it? | Retained log |
   |---|---|---|
   | Percentage step becomes a same-number length | Yes: definite-container dimensions differ. | `step-length.log.txt:8` |
   | Maximum sizes become 50% | Yes: the cap and maximum-width readings differ. | `cap-halved.log.txt:12` |
   | Viewport width or height becomes 100px | Yes: each viewport reading and cross-entry precedence differ. | `viewport-width-length.log.txt:7`; `viewport-height-length.log.txt:7` |
   | Either minimum-viewport entry disappears | Yes: the corresponding axis remains 10px, and the declaration-presence assertion fails. | `min-vw-omitted.log.txt:7`; `min-vh-omitted.log.txt:8` |
   | Sticky utility value disappears | Yes: the position-value reading differs. | `sticky-value-omitted.log.txt:7` |
   | Percentage edge becomes a length | Yes: physical offsets, centering, and precedence differ. | `edge-length.log.txt:9` |
   | Start becomes a logical inset | Yes: the right-to-left physical-edge reading differs. | `start-logical.log.txt:9` |
   | Horizontal translation becomes −25% | Yes: geometry and the precedence matrix differ. | `translate-x-quarter.log.txt:7` |
   | Stack level 3 becomes 0 | Yes: the declared level and precedence assertions fail; the unchanged case also checks hit order. | `level-3-zero.log.txt:12` |
   | Fixed top becomes 10px | Yes: the viewport-edge assertion fails. | `fixed-top-edge.log.txt:8` |
   | Fixed or sticky stack token becomes a literal | Yes: the retuned level differs. | `fixed-literal.log.txt:8`; `sticky-literal.log.txt:8` |
   | Sticky top helpers become absolute | Yes: position and scrolling geometry distinguish the mutation at every infix. | `sticky-absolute.log.txt:8` |
   | Breakpoint boundary becomes exclusive | Yes: the boundary readings distinguish it. | `boundary-exclusive.log.txt:9` |
   | Hidden helper moves into `components` | Yes for utility precedence and the layer escape; **no** for the clipped-box, unlayered-priority, or dark-island cases attributed to it. | `helper-in-components.log.txt:359` |
   | Caption exception disappears | Yes: the caption and specificity readings differ. | `caption-branch-dropped.log.txt:9` |
   | Hidden-child overflow rule disappears | Yes: child overflow becomes visible. | `child-overflow-dropped.log.txt:8` |
   | `:not(:focus-within)` disappears | Yes: focusing the descendant no longer reveals its container. | `focus-within-dropped.log.txt:360` |
   | The focus exclusions disappear together | Yes: the traversed link remains one pixel wide. | `both-focus-dropped.log.txt:360` |
   | Only `:not(:focus)` disappears | No for the tested focus behavior; `:focus-within` still covers direct focus. | `focus-dropped.log.txt:8` |
   | Visible becomes inherited | Yes: the child of the invisible ancestor remains hidden. | `visible-hidden.log.txt:12` |
   | Invisible also sets `display: none` | Yes: its retained-box assertion fails. | `invisible-display-none.log.txt:8` |
   | Viewport-width entry precedes width | Yes: the cross-entry size reading differs. | `order-swapped.log.txt:7` |
   | Sizing loses its layer | Yes: the unlayered-important override and hidden-helper competition differ. | `unlayered-sizing.log.txt:7` |
   | Utility mixin loses importance | Yes for utility consumers, including auto sizing and overrides. This mutation does not alter the handwritten hidden helper or normal position helpers. | `importance-dropped.log.txt:9` |
   | Visibility-map order reverses | The final assertion distinguishes it (`visibility.test.ts:51`), but no corresponding retained mutation log was supplied. | None located |
   | Fixed helper gains importance | The final override assertion distinguishes it (`components/position.test.ts:112`), but no corresponding retained mutation log was supplied. | None located |

   The unmutated style control is green (`fresh-styles.log.txt:354`). Correct the matrix to name the cases each mutation actually falsifies, retain the missing mutation runs, and report each run’s actual scope. The identified defect is in proof attribution and evidence completeness; it does not establish a broken shipped declaration.

4. **CONFIRMED — Sections, specimens, and frame behavior.** The section constructors delegate their declared copy and specimens to `SpecimenSection` (`app/browser/sections/PositionSection.ts:14`, `SizingSection.ts:14`, `VisibilitySection.ts:14`). Their proofs assert region identity, specimen membership, markup, and absence of inline styles.

   The frame assertions distinguish the specified mutations: removing containment changes the backdrop origin; allowing scrolling moves it after the attempted scroll; removing the bounded height breaks containment or the sticky scroll range. The retained evidence is `frame-contain-dropped.log.txt:16`, `frame-overflow-auto.log.txt:15`, and `frame-height-unbounded.log.txt:15`. The final assertions retain those checks and explicitly test scroll refusal, gutter, page growth, viewport sizing, and dialog containment (`tests/app/browser/sections/PositionSection.test.ts:142`). The unmutated section control is green (`fresh-sections.log.txt:8`).

   The attack that failed was treating the clipped scroll extent as evidence of a scrollbar. M3 permits the measured alternative, and the assertions test that alternative. A scroll extent exceeding the client height is compatible with the frame refusing scrolling. The report’s mutation-population error belongs to claim 3.

5. **CONFIRMED — Registry.** The patch supplies the specimen subjects, resting rows, and `skip-link-focus` row without extending `CaptureState` (`upl-shared.patch:210`, `:234`, `:319`). The selectors match the corresponding specimen markup, including the positioned hosts for hidden content and the contained edge-offset target.

   The attack was a registry selector reaching no element, or a driven frame recording an unrevealed link. The journey case requires direct focus, enlargement, preserved focus through frame staging, and return to the hidden width (`upl-shared.patch:582`). Removing the focus exclusions together would fail its enlargement assertion. The retained journey passed (`upl-instruments/logs/journey.log.txt:291`); the final-tree journey and capture run remain the explicitly assigned landing observations.

6. **CONFIRMED — Tailwind behavior.** An independent in-memory run of the installed Tailwind compiler produced the reported shared names and properties. Width, height, top, bottom, stacking, and visibility overlap Veneer’s important properties. Start and end instead produce the logical inset properties, matching the exclusion decision.

   The consumer patch reads each element on its own name’s longhands (`upl-consumer.patch:16`, `:22`, `:33`). This removes the unrelated ancestor-width reading while preserving the comparison of properties Tailwind actually declares for that name.

   The assertions distinguish the controls:

   - Adding `w-25` to the line fails the derived membership equality and recipe-copy checks (`line-gains-w-25.log.txt:44`).
   - Dropping mixin importance changes derived membership and empties the required importance branch (`importance-dropped-service.log.txt:18`, `:81`).
   - Removing the start names fails the derived equality and copy checks (`start-off-line.log.txt:44`).

   The unmutated consumer run is green (`fresh-service.log.txt:24`). These controls establish membership and importance-branch discrimination; they do not establish that every control reaches the final resolved-style comparison. The nested-function violation in the implementation belongs to claim 8.

7. **BROKEN — Guide contract.** The added guide prose does not consistently follow the required code-token noun rule. For example, the selector is used directly as the sentence subject in “`.position-absolute.position-relative` resolves `absolute`” (`upl-shared.patch:929`), and `.top-50` is used the same way at `:934`. The governing requirement is explicit (`/home/user/scaffold/.claude/rules/writing.md:47`).

   Add the missing nouns throughout the added prose. This is a documentation-contract defect, not a failure of those cascade resolutions.

   The patch-application attack otherwise held: each report-only patch passed `git apply --check` in this worktree. The proposed imports, compatibility rows, departure tables, section registrations, and test links are present. The retained fresh-copy gate chain reports green (`upl-instruments/logs/fresh-2.log.txt:1`); the guide log contains its passing result (`fresh-guides.log.txt:11`).

8. **BROKEN — Coding law and report.** The consumer patch adds a locally assigned arrow function inside the test callback (`upl-consumer.patch:16`). Parsing the patched file identifies `properties` as a function assignment inside a block at resulting `consumer.test.ts:192`. This violates `/home/user/scaffold/AGENTS.md:68`. Use the map lookup directly at its consumption sites.

   The proof tables also remain outside setup: `SIZE_STEPS` at `tests/src/styles/utilities/sizing.test.ts:9`; `POSITION_VALUES` and `EDGE_STEPS` at `position.test.ts:8`; and `HIDDEN_PROPERTIES` and `HIDDEN` at `visually-hidden.test.ts:18`. The viewport case matrices are likewise declared in the proofs. This contradicts `/home/user/scaffold/.claude/rules/tests.md:187` and the report’s statement that no setup-table patch was needed (`b-utilities-upl-report.md:352`). Move the tables into `tests/setupStyles.ts` and update its existing table coverage. Test registration stays in the proof files.

   The requested count register follows. References are to `b-utilities-upl-report.md`; repeated measurements are grouped.

   | Report location | Counts stated |
   |---|---|
   | `:7`, `:17` | Two criterion readings; one equivalent mutation; one breakpoint walk. |
   | `:36` | 17 status entries. |
   | `:37` | Added-line figures: shell 22; component position 35; utility position 41; sizing 33; visibility 16; visually hidden 29; each section 22; utility position proof 242; sizing proof 148; visibility proof 80; hidden proof 161; component position proof 127; Position section proof 241; Sizing section proof 170; Visibility section proof 118. |
   | `:44` | 15 shared files, 693 insertions, 95 deletions. |
   | `:57` | Baseline conformance 22 passing; service 18 passing. |
   | `:67` | Styles 42 failing, then 42 passing; section collection with no cases; sections 5 failing and 8 passing out of 13, then 13 passing. |
   | `:74` | Conformance 4 failing and 18 passing out of 22; 19 missing keys; 27 unrecorded rows; one ENOENT; then 22 passing. |
   | `:79`, `:281` | Consumer 1 failing and 17 passing out of 18; six width differences; then 18 passing. |
   | `:85`, `:269` | 63 inventory selectors and 63 emitted selectors; 49 utility/hidden selectors; 14 normal helper selectors. |
   | `:98` | Five style proofs; mutation populations stated as 42 or 13. |
   | `:105` | Mutation reds: step 3; importance 8; caps 2; each viewport-length mutation 3; each omitted minimum 3; omitted sticky value 1; edge length 5; logical start 1; translation 2; stack level 2; fixed edge 1; fixed literal 1; sticky absolute 6; sticky literal 1; exclusive boundary 6; helper layer 2; caption branch 2; child overflow 1; focus-within removal 1; combined focus removal 1; focus-only removal 0; visible inheritance 1; invisible display removal 1. |
   | `:134` | Precedence reds: reordered entries 1; stack-level and translation mutations 2 each; visibility order 1; helper layer 2; caption branch 2; importance 8; unlayered sizing 2; important fixed helper 1. |
   | `:161` | Frame reds: containment removal 2; auto overflow 2; unbounded height 3. |
   | `:193` | Service controls: 4 failing/14 passing; 3 failing/15 passing; 4 failing/14 passing. |
   | `:223` | 24 sticky rows; 27 departure rows. |
   | `:250` | Five owned style proofs; three section proofs; gate results 42, 18, 22, 18, 19, 109 passing plus 1 skipped out of 110, and 250 passing. |
   | `:264` | Whole styles 808 passing; application 79 passing; configuration 173 passing plus 1 skipped out of 174; journey four files and 156 passing across four variants; one journey execution. |
   | `:332` | 13 declared rows; one guide bullet. |
   | `:189`, `:225`, `:319`, `:346` | One element per shared name; one selector row per key; one emitted value per call/property; exactly one inventory key per selector. These express cardinality constraints. |
   | `:72`, `:188`, `:241`, `:305`, embedded patch `:1179`, `:1270`, `:1296`, `:1323`, `:1356`, `:1390` | “Both” frame cases, sizing cases, recipe fences, patches, widths, modes, stacking levels, caps, and visibility values; one Tailwind longhand; two competing entry values. |

   Dimensions, viewport widths, CSS values, versions, exit codes, claim identifiers, diff coordinates, and fixture sample text are values rather than structural tallies.

**Outside the claims — REPORT-COUNTS: BROKEN.** The report contains structural tallies such as “two criterion readings,” “15 files,” “five owned proofs,” and “13 declared rows” (`b-utilities-upl-report.md:7`, `:44`, `:250`, `:332`), despite `/home/user/scaffold/AGENTS.md:172`. Remove incidental structural totals and name their members. Preserve required execution measurements with their commands and logs; those measurements and fixed cardinality constraints are distinct from this finding. The count register is recorded under claim 8 as requested.

**Attacked and held.** No additional held attack is omitted from the numbered verdicts. The helper’s normal priority, physical start/end offsets, clipped scroll extent, and caption-specific positioning are supported adjacent behaviors, not defects requiring correction.

VERDICT: FAIL 3, 7, 8; outside the claims: REPORT-COUNTS