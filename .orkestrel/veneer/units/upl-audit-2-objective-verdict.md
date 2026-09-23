1. **BROKEN — The shell-move attribution is false; the scope checks hold.** The shell partial is unchanged from round 1, as [the report states](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-upl-report-2.md:40). The `Maximum sizes` move occurs in `app/browser/constants.ts`, recorded at `upl-instruments-2/round-delta-shared.diff:16`. Correct the attribution.

   The unexpected-file and lost-hunk attacks failed. The live status matches `upl-2-status.txt`; the owned untracked contents match `upl-2.diff`; the production changes between rounds are the named map comments. Independent reconstruction against `e4e6a40` finds changes only in the ruled shared files. The shared and unlisted patches each pass `git apply --check` in this checkout. Their hashes match the report. No prohibited file is added to either patch.

2. **BROKEN — The claimed digest evidence does not exist.** The header construction at [mutate.py:35](/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/tools/mutate.py:35) records the mutation, command, population, result, and failing titles. It computes no digest. Restoration occurs after the log is written, at `mutate.py:50`, without a recorded comparison. The log body identifies the copy through Vitest’s `RUN` line; the header does not record the claimed copy-and-digest evidence. Correct this evidence claim; record restoration hashes before claiming that hashes verified restoration.

   The matrix attack otherwise holds. I compared every mutation header with its log’s actual failure titles, regenerated the associations in memory, compared the owned-case rows with the report, and compared retained round-1 failing titles with their successor logs. No association mismatch or lost failing title appeared. `control-styles.log.txt:9` reports `42 passed (42)`; `control-sections.log.txt:9` reports `13 passed (13)`.

   The following readings identify each style mutation and whether the shipped assertions distinguish it. Log names in this verdict resolve beneath `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-2/logs/`; each mutation named in this table has its corresponding `mutations/<name>.log.txt`, whose header result is at line 9 and failing titles follow it.

   | Mutation | Do the assertions distinguish it? |
   |---|---|
   | `step-length`, `step-75-length` | Yes: definite-container dimensions differ; the latter also fails the density/dark-island case. |
   | `importance-dropped` | Yes: auto sizing and consumer-override readings differ. |
   | `cap-halved` | Yes: maximum-size readings differ. |
   | `viewport-width-length`, `viewport-height-length` | Yes: viewport dimensions and cross-entry precedence differ. |
   | `min-vw-omitted`, `min-vh-omitted` | Yes: minimum-size readings and declaration-presence checks fail. |
   | `order-swapped` | Yes: the combined width/viewport-width element resolves the wrong width. |
   | `unlayered-sizing` | Yes: the important override and hidden-helper competition differ. |
   | `sizing-responsive`, `position-responsive`, `visibility-responsive` | Yes: the no-infix checks find emitted responsive rules. |
   | `sticky-value-omitted` | Yes: the position-value reading differs. |
   | `edge-length` | Yes: offset, centering, density, and precedence readings differ. |
   | `start-logical` | Yes: the right-to-left physical-edge reading differs. |
   | `translate-x-quarter` | Yes: translation geometry and precedence differ. |
   | `level-3-zero` | Yes: stacking-value and precedence assertions differ. |
   | `unlayered-position`, `unlayered-visibility` | Yes: the layered-important escape assertions distinguish them. |
   | `fixed-top-edge` | Yes: the fixed bar’s top coordinate differs. |
   | `fixed-literal`, `sticky-literal` | Yes: the retuned stack-token readings differ. |
   | `sticky-absolute` | Yes: the sticky position and scroll geometry fail across the breakpoint cases. |
   | `fixed-important` | Yes: the normal-helper case reads `fixed` instead of the consumer’s `absolute`; see `fixed-important.log.txt:371` and `tests/src/styles/components/position.test.ts:113`. |
   | `boundary-exclusive` | Yes: activation at the exact breakpoint differs. |
   | `helper-in-components` | Yes for utility precedence and the utilities-layer escape. It does not distinguish the clipped-box, unlayered-priority, or dark-island cases. The revised matrix correctly excludes those associations. |
   | `caption-branch-dropped` | Yes: caption positioning and its competition with the position utility differ. |
   | `child-overflow-dropped` | Yes: the child’s computed overflow becomes visible. |
   | `focus-within-dropped` | Yes: focusing the descendant no longer reveals its container. |
   | `both-focus-dropped` | Yes: the focused link remains clipped. |
   | `focus-dropped` | No: the retained `:focus-within` condition also covers direct focus. The green log is the accepted equivalent mutation. |
   | `helper-width-normal` | Yes: the important consumer width overrides the hidden width. |
   | `helper-static` | Yes: hidden-box positioning and the dependent focus, precedence, and dark-island readings differ. |
   | `visible-hidden` | Yes: the child remains hidden inside its invisible ancestor. |
   | `invisible-display-none` | Yes: retained dimensions and line placement disappear. |
   | `visibility-order-reversed` | Yes: the combined-class element becomes visible instead of hidden; see `visibility-order-reversed.log.txt:10` and `tests/src/styles/utilities/visibility.test.ts:53`. |

   Section, setup, and service mutations are assessed under their corresponding claims below.

3. **BROKEN — Containment does not make viewport units frame-relative.** The move itself is present, but the claim that `.vw-100` and `.vh-100` readings become the frame’s readings is false.

   An independent in-memory Sass compilation returns `width: 100vw` and `height: 100vh`; the caps remain `max-width: 100%` and `max-height: 100%`. The shipped proof explicitly compares viewport sizes with `window.innerWidth` and `window.innerHeight` at [SizingSection.test.ts:129](/home/user/veneer-upl/tests/app/browser/sections/SizingSection.test.ts:129). The shell supplies containment, clipping, and `height: 24rem` at `_shell.scss:48`.

   I read `caps-before.log.txt:1` and `caps-after.log.txt:1`. They agree: the cap pairs are `[[390,390],[192,192]]` and `[[1280,1280],[192,192]]`; viewport-height readings remain `896`. These distinguish viewport sizing from the frame’s bounded height.

   The placement proof does distinguish `maximum-outside-frame`: the required selector fails at `SizingSection.test.ts:50`, recorded in `mutations/maximum-outside-frame.log.txt:10`. Correct the claim to say that the frame contains and clips viewport-sized boxes while percentage caps resolve against their containing blocks. Do not change the viewport units.

4. **CONFIRMED — The ruled guide changes are present.** The attack was a surviving bare class-token sentence, an incorrect framed-specimen list, a missing Tailwind cause, or an unrelated changed guide hunk.

   The corrected passages appear in `upl-shared-2.patch:420`, `:431`, `:484`, `:510`, and `:642`. The frame paragraph names the shipped Position and Sizing specimens and removes the region-order sentence. The recipe fences and fixture exclusion lines preserve the start/end names at `:391`, `:400`, `:957`, and `:1003`. The round comparison confines guide changes to the ruled sites.

   For the behavioral Tailwind statement, `importance-dropped-service` distinguishes the required importance branch, while `start-off-line` distinguishes exclusion membership; their limits are stated under claim 6. Viewport units continuing to reference the viewport is correct adjacent behavior, and the revised guide says so.

5. **BROKEN — The setup case does not bind every moved table and fixture as claimed.** The exports are documented and frozen, but the binding assertions have gaps.

   I executed the exact added placement assertion body in memory using the installed assertion library, the real inventory, the real Sass breakpoint compiler, and the actual constant declarations. No Vitest project or browser ran. The unmodified control passed. These independently mutated declarations also passed:

   - `OFFSET_EDGES = Object.freeze([])`.
   - `VIEWPORT_SIZE_CASES = Object.freeze([])`.
   - `STICKY_SCROLLER.offset = 0`.

   The wrong-share control failed with `expected 0.75 to be 0.7`, matching the retained mutation’s result. The instrument therefore executed the assertions and distinguished a supported defect.

   The causes are visible at [upl-shared-2.patch:1450](/home/user/scaffold/.orkestrel/veneer/units/upl-shared-2.patch:1450): edge validation only iterates supplied edges; viewport validation compares projections of the same supplied population at `:1490`; the scroller receives a freeze check at `:1546`, without a field-validity assertion. Bind the required memberships independently and assert the scroller’s required geometry. This finding concerns the setup case’s claimed coverage; downstream browser assertions may independently reject these mutations.

   The retained mutation evidence otherwise holds:

   | Mutation or patch state | Assertion distinction and log read |
   |---|---|
   | `setup-share-wrong` | Yes: the share disagrees with the recorded percentage; `mutations/setup-share-wrong.log.txt:26`. |
   | `setup-level-wrong` | Yes: the stack value disagrees with inventory; `mutations/setup-level-wrong.log.txt:26`. |
   | `setup-infix-dropped` | Yes: placement and table cases fail because the mutation changes their shared filter spelling; `mutations/setup-infix-dropped.log.txt:10`. |
   | `setup-infix-narrowed` | Yes: only the placement infix comparison fails; `mutations/setup-infix-narrowed.log.txt:26`. |
   | `setup-clip-wrong` | Yes: the hidden reading disagrees with inventory; `mutations/setup-clip-wrong.log.txt:26`. |
   | `setup-width-wrong` | Yes: viewport widths disagree with journey configuration; `mutations/setup-width-wrong.log.txt:26`. |
   | `start-unfocused` | Yes: `document.activeElement` differs from the returned control; `mutations/start-unfocused.log.txt:95`. |
   | Without the unlisted patch | The exact-export assertion fails; `setup-browser-without-unlisted.log.txt:81` reports `1 failed \| 64 passed (65)`. |
   | With the unlisted patch | The control passes; `fresh-setup-browser.log.txt:81` reports `66 passed (66)`. |

   D1 is supported. The builder mounts through `scene`, focuses the button, and returns it (`upl-shared-2.patch:1227`); the added proof checks identity, traversal, and cleanup (`upl-unlisted-2.patch:25`). D2 and D3’s chosen data shapes are supported, but their acceptance does not establish the missing setup bindings. D4 remains the assigned consolidation referral. The nested consumer function is removed, and the named map and floors comments are rewritten.

6. **CONFIRMED — F1 and F2 are implemented.** The attack was a missing hidden-host convention or a surviving aggregate-longhand reader.

   The registry remark appears at `upl-shared-2.patch:1083`. The consumer reads `longhands.get(name) ?? []` directly at its standalone, coverage, and paired-read sites (`upl-shared-2.patch:1029`, `:1040`, `:1051`). The former nested function is absent.

   The service controls distinguish their intended failures:

   - `line-gains-w-25`: yes, exclusion membership and recipe-copy checks fail; `mutations/line-gains-w-25.log.txt:10`.
   - `importance-dropped-service`: yes, derived membership and the required importance branch fail; `mutations/importance-dropped-service.log.txt:10`.
   - `start-off-line`: yes, exclusion membership and recipe-copy checks fail; `mutations/start-off-line.log.txt:10`.

   `control-service.log.txt:9` reports `18 passed (18)`. These controls establish membership and branch discrimination; they do not establish that every mutation reaches the final resolved-style comparison. Reading only each name’s own longhands correctly avoids attributing an ancestor’s changed width to that name’s cascade.

7. **BROKEN — The claimed failing-first history and variant coverage overstate the record.** The report records failing-before/passing-after results, not the claimed pre-fix-green/post-fix-red history for each strengthened proof.

   [The report’s failing-first section](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-upl-report-2.md:274) and its logs show:

   - Setup tables: `setup-styles-before.log.txt:107` is red; `fresh-setup-styles.log.txt:7` is green.
   - Start builder: `setup-browser-before.log.txt:12` is an import failure with no cases run. The separate `start-unfocused` mutation supplies assertion-level discrimination.
   - Maximum placement: `sizing-section-before.log.txt:101` is red; `caps-after.log.txt:3` is green.

   The paint and sticky-scroll cases are not parameterized by variant (`PositionSection.test.ts:167`, `:184`). Correct the claim to the actual history and execution population.

   The frame mutations do reach the shipped proofs. Their logged assertion locations match the working files:

   | Mutation | Do the shipped assertions distinguish it? | Log read |
   |---|---|---|
   | `frame-contain-dropped` | Yes, at 390 and 1280: backdrop origin differs from `[0,0]`. | `mutations/frame-contain-dropped.log.txt:165` |
   | `frame-overflow-auto` | Yes, at 390 and 1280: the attempted scroll produces `[50,0]`. | `mutations/frame-overflow-auto.log.txt:165` |
   | `frame-height-unbounded` | Yes: frame containment, sticky scroll range, and Sizing height shares fail. The additional Sizing failures are a wider failing set. | `mutations/frame-height-unbounded.log.txt:168` |
   | `frame-shadowed` | Yes: the paint case rejects the shadow. | `mutations/frame-shadowed.log.txt:10` |
   | `scroller-unscrolled` | Yes: the sticky case rejects the failed scrolling behavior. | `mutations/scroller-unscrolled.log.txt:10` |
   | `position-values-unframed` | Yes: frame membership and frame geometry fail. | `mutations/position-values-unframed.log.txt:10` |
   | `hidden-sentence-unpositioned` | Yes: the required positioned-host selector disappears. | `mutations/hidden-sentence-unpositioned.log.txt:10` |
   | `region-kept` | Yes: the section destruction assertions find retained regions. | `mutations/region-kept.log.txt:10` |
   | `step-length-sections` | Yes: Sizing percentage shares differ at each variant. | `mutations/step-length-sections.log.txt:10` |
   | `both-focus-dropped-sections` | Yes: the traversed skip link remains clipped. | `mutations/both-focus-dropped-sections.log.txt:10` |

   `maximum-outside-frame` is covered under claim 3. The section control is green in `mutations/control-sections.log.txt:9`. A clipped extent exceeding client height remains compatible with refusing scrolling; that behavior is correct under M3.

8. **BROKEN — The report’s count-free claim is false.** “One file outside the Shared row” at [report:7](/home/user/scaffold/.orkestrel/veneer/units/b-utilities-upl-report-2.md:7) contradicts its assertion at `:271` that it states no count of a growable set. “Both logs” at `:457` and “both patches” at `:486`, `:506`, and `:557` repeat structural tallies. Remove incidental tallies while preserving required execution measurements.

   The syntax attack found no prohibited construct introduced by this delta. The consumer’s nested function is removed. Existing nested constructs in unchanged surrounding code are not additions by this unit. The installed browser exports supply construction, mounting, and traversal primitives, but no equivalent focused, scene-owned start fixture; the builder adds that lifecycle boundary.

   The reported gate results match the retained outputs: `fresh-format.log.txt:7`, `fresh-lint.log.txt:3`, `fresh-check.log.txt:27`, `fresh-build.log.txt:56`, `fresh-styles.log.txt:353`, `fresh-setup-styles.log.txt:7`, `fresh-sections.log.txt:148`, `fresh-conformance.log.txt:11`, `fresh-service.log.txt:24`, `fresh-guides.log.txt:11`, `fresh-policy.log.txt:11`, `fresh-setup.log.txt:32`, and `fresh-setup-browser.log.txt:81`. The commands appear in `tools/fresh.sh:25`; exits appear in `fresh.log.txt:7`. These gate readings do not close the binding gap under claim 5.

   The requested count register follows. References are to `b-utilities-upl-report-2.md`; repeated measurements are grouped.

   | Report location | Counts stated |
   |---|---|
   | `:7` | One unlisted file. |
   | `:69` | Added lines: shell 22; component position 35; utility position 41; sizing 33; visibility 16; hidden 29; each named section 22; utility position proof 227; sizing proof 140; visibility proof 81; hidden proof 146; component position proof 121; Position section proof 242; Sizing section proof 175; Visibility section proof 121. |
   | `:76` | Shared patch: 1047 insertions, 110 deletions. Unlisted patch: 14 insertions. |
   | `:90` | Historical reported frame population 13. |
   | `:172`, `:246`, `:247` | Quoted earlier wording: both caps; four edge entries; one-step maps; one shared set of steps. The replacement also uses “single-value maps.” |
   | `:249`, `:308`, `:334`, `:340`, `:372`, `:529` | Single-case subjects; one edge per fixed bar; competing entries/values described as “both”; one log per run; one container shape. These include fixed cardinality descriptions rather than incidental set totals. |
   | `:279`, `:281` | Setup before: 2 failed, 108 passed, total 110. After: 110 passed. |
   | `:285`, `:287`, `:288`, `:520` | Builder collection: no cases; focus mutation: 1 failed, 65 passed, total 66; patched control: 66 passed; without patch: 1 failed, 64 passed, total 65. |
   | `:291`, `:293` | Sizing before: 1 failed, 3 passed, total 4. After: 4 passed. |
   | `:301`, `:386` through `:448` | Populations: styles 42; sections 13; setup tables 110; setup browser 66; service 18. |
   | `:391` through `:427` | Style failed/passed pairs: 3/39, 2/40, 8/34, 1/41, 5/37, 6/36; equivalent mutation and control: 0/42. |
   | `:428` through `:438`, `:474` through `:480` | Section failed/passed pairs: 2/11, 5/8, 1/12, 3/10; control: 0/13. |
   | `:439` through `:445` | Setup failed/passed pairs: 1/109, 2/108; builder: 1/65. |
   | `:446` through `:448` | Service failed/passed pairs: 4/14, 3/15, 4/14. |
   | `:457`, `:486`, `:506`, `:557` | Both logs; both patches, repeated. |
   | `:496` through `:504` | Gate passes: styles 42; setup tables 110; sections 18; conformance 22; service 18; guides 19; policy 109 passed and 1 skipped, total 110; setup 251; setup browser 66. |

   Dimensions, percentages, viewport widths, versions, exit codes, hashes, claim identifiers, and source coordinates are values rather than structural tallies.

**Outside the claims — REPORT-COUNTS: BROKEN.** The report’s incidental file, log, and patch tallies violate the writing rule despite its express count-free assertion (`b-utilities-upl-report-2.md:7`, `:271`, `:457`, `:486`). The register under claim 8 distinguishes these from required run measurements. Name the artifacts directly and retain the measured results.

**Attacked and held.** The shared-patch scope, guide corrections, per-name Tailwind reads, accepted equivalent focus mutation, unchanged cap measurements, and wider frame-height failure set withstand the stated attacks. The binding finding does not establish faulty shipped CSS or a wholly green mutated browser suite. Journey and capture acceptance remain the assigned landing observations.

VERDICT: FAIL 1, 2, 3, 5, 7, 8; outside the claims: REPORT-COUNTS