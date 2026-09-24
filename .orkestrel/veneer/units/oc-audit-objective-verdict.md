1. **CONFIRMED.** The scope attack found no foreign path. The recorded status matches the worktree, and the retained diff contains only the owned files ([oc-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-status.txt:1), [oc.diff:1](/home/user/scaffold/.orkestrel/veneer/units/oc.diff:1)). Every shared-patch hunk matched the unchanged shared files in an in-memory check. `git apply --check` also exited 0. The fresh-extract check is retained at [oc-gates.log.txt:93](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-gates.log.txt:93). The patch preserves sibling entries and existing compatibility-table padding.

2. **CONFIRMED.** An independent, nonwriting Sass compilation and PostCSS comparison found no missing or extra normalized selector-condition site. Its declaration departures matched the ledger rows exactly. This agrees with [oc-cascade.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-cascade.log.txt:1) and [oc-shared.patch:302](/home/user/scaffold/.orkestrel/veneer/units/oc-shared.patch:302).

   The attacks against omitted selectors, literal rungs, literal colors, and missing reduced-motion rules are distinguished by the assertions and retained mutations detailed under claim 5. The panel binding, backdrop include, transition includes, and important clear fills are present at [_offcanvas.scss:78](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:78), [_offcanvas.scss:154](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:154), [_offcanvas.scss:105](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:105), and [_offcanvas.scss:118](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:118). The accepted condition normalization accounts for the release’s maximum-width notation.

3. **CONFIRMED — the claim’s explicit shared-mechanism alternative applies.** The attack against the existing mixin limitation failed: `breakpoint-down` emits nothing at zero ([‌_mixins.scss:173](/home/user/veneer-oc/src/styles/_mixins.scss:173)). I also reproduced the retained Sass instrument: synchronous `meta.apply` compilation succeeds, while asynchronous compilation reports `Mixin doesn't accept a content block` ([oc-sass-async-probe.mjs.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-sass-async-probe.mjs.txt:1)).

   That failure does not establish necessity. A shared content mixin that emits unwrapped content when its boundary is absent and otherwise delegates to `breakpoint-down` compiled successfully through asynchronous Sass. This mechanism can serve the bare and responsive panel emission and the analogous fullscreen emission. It preserves the existing zero-boundary contract. The present maps avoid duplicated declarations; adopting the shared mechanism requires the broader mixin grant the report identifies ([b-modal-oc-report.md:394](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-report.md:394)).

4. **BROKEN.** The refined gate loses the association between priority and condition ([oc-shared.patch:530](/home/user/scaffold/.orkestrel/veneer/units/oc-shared.patch:530)). The exact counterexample is to make `.offcanvas-sm`’s below-boundary background important and its above-boundary clear background normal. Each sheet still contributes `{normal, important}`, so the refined assertion passes.

   A nonwriting probe using the repository’s actual `SheetReader` reproduced that pass. Its controls distinguished a dropped body-fill flag and an added title-margin flag. The retained `body-fill-important-dropped` mutation likewise fails at [oc-mutations.log.txt:177](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt:177). Those controls do not cover the priority swap.

   The old gate’s false positive is real: [oc-mutations.log.txt:226](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt:226) records it against the correct responsive fills. Correcting that false positive is justified, but the set comparison does not satisfy the gate’s declaration-level obligation. Preserve normalized condition information when comparing priorities, and retain the swap as a negative control. The existing reader omits that information at [setupServer.ts:1785](/home/user/veneer-oc/tests/setupServer.ts:1785).

5. **BROKEN.** The named style, table, and ordinary section mutations have retained failures and distinguishing assertions. The failing-first section mutation does not establish the claimed assertion failure: it removes the exports that the Offcanvas proof imports. The log records a suite failure without collecting that proof’s cases ([oc-mutations.log.txt:291](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt:291), [OffcanvasSection.test.ts:2](/home/user/veneer-oc/tests/app/browser/sections/OffcanvasSection.test.ts:2)). Preserve the import graph and mutate the supplied specimen behavior instead.

   The R19 transition-state mapping also overstates its evidence. Its `show-rule-dropped` mutation removes only the shown visibility selector; it leaves the showing and hiding selectors intact. The logged state failure is the shown case, not the showing or hiding cases ([b-modal-oc-report.md:145](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-report.md:145), [oc-mutations.log.txt:76](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt:76)). Retain mutations that actually alter the showing and hiding rules, then map their failures to those cases.

   The per-mutation rulings follow. Log references name the retained `oc-mutations.log.txt` file; style assertions refer to `tests/src/styles/components/offcanvas.test.ts`.

   | Mutation | Do the assertions distinguish it? | Evidence |
   |---|---|---|
   | `absent-partial` | Yes, for the style proof. Selector membership and fixed positioning fail. | Log:1; style proof:47, 150, 284 |
   | `literal-rungs` | Yes. The retuned values must become `7` and `6`. | Log:34; style proof:81 |
   | `backdrop-without-mixin-no-states` | Yes. Selector membership and fade-alone opacity differ. | Log:42; style proof:47, 106 |
   | `backdrop-without-mixin-full-copy` | Yes, through duplication; the browser cannot distinguish equivalent CSS. | Log:51; `tests/setupStyles.test.ts:647`; `tests/setupServer.ts:724` |
   | `placements-start-end-transforms-swapped` | Yes. The translation signs disagree with placement geometry. | Log:59; style proof:178 |
   | `show-rule-dropped` | Yes for shown visibility; no for the showing/hiding mappings discussed above. | Log:76; style proof:176, 196 |
   | `md-down-and-up-names-shifted-apart` | Yes. Boundary readings and condition membership differ. | Log:90; style proof:225, 263 |
   | `combinator-widened-to-offcanvas-btn-close` | Yes. The body control incorrectly receives header margins. | Log:98; style proof:318 |
   | `literal-colours` | Yes. Mode and alias-retuning readings differ. | Log:107; style proof:365, 384 |
   | `transition-without-mixin` | Yes. Reduced-motion conditions disappear and the transition remains active. | Log:116; style proof:263, 419 |
   | `insets-literal` | Yes. Density retuning must rescale the padding. | Log:130; style proof:350 |
   | `title-margin-reset-dropped` | Yes. The lower-layer heading margin remains on the title. | Log:300; style proof:331, 343 |
   | `ramp-nested-rules-dropped` | Yes. Selector membership and responsive border/state readings differ. | Log:308; style proof:47, 225 |
   | `navbar-expanded-width-flag-dropped` | Yes. The panel retains its fixed width instead of filling the slot. | Log:138; style proof:458, 476 |
   | `navbar-expanded-transform-flag-dropped` | Yes. The resting panel retains its translation. | Log:151; style proof:464, 482 |
   | `navbar-expanded-border-flag-dropped` | Yes. The panel retains its placement border. | Log:164; style proof:460, 478 |
   | `body-fill-important-dropped` | Yes for this mutation; not for the priority swap. | Log:177; `oc-shared.patch:554` |
   | `priority-gate-before-refinement` | Yes. It reproduces the old comparator’s false positive. | Log:185, 226 |
   | `navbar-proof-reading-before-correction` | Yes. Restored expectations disagree with fixed positioning and flex header layout. | Log:194; `navbar.test.ts:364` |
   | `state-case-hiding-marked-unslid` | Yes. The table’s expected slide disagrees with the recorded declarations. | Log:202; `oc-shared.patch:788` |
   | `placement-start-sign-flipped` | Yes. The table disagrees with the recorded transform sign. | Log:210; `oc-shared.patch:774` |
   | `geometry-width-wrong` | Yes. The table disagrees with the recorded width. | Log:218; `oc-shared.patch:814` |
   | `app-panel-without-show` | Yes. The section requires the shown class. | Log:248; `OffcanvasSection.test.ts:74` |
   | `app-backdrop-on-end-panel` | Yes. The backdrop must share the start panel’s parent. | Log:257; `OffcanvasSection.test.ts:111` |
   | `app-aria-modal-added` | Yes. The section requires the attribute to be absent. | Log:265; `OffcanvasSection.test.ts:134` |
   | `app-responsive-frame-dropped` | Yes. Frame lookup and panel membership fail. | Log:273; `OffcanvasSection.test.ts:66` |
   | `app-navbar-offcanvas-specimen-dropped` | Yes. The logged mutation renames the specimen, and the name assertion fails. | Log:283; `NavbarSection.test.ts:33` |
   | `failing-first-section-proofs` | No for the Offcanvas assertions: the missing exports prevent collection. | Log:291; `OffcanvasSection.test.ts:2` |

6. **CONFIRMED.** The attacks against missing frames, misplaced backdrops, missing shown classes, and added modal attributes are distinguished as recorded under claim 5. The section delegates to the declared copy and specimen table ([OffcanvasSection.ts:18](/home/user/veneer-oc/app/browser/sections/OffcanvasSection.ts:18)); the per-specimen checks derive their population from that table ([OffcanvasSection.test.ts:64](/home/user/veneer-oc/tests/app/browser/sections/OffcanvasSection.test.ts:64)).

   The navbar assertions expressly reject an expanded attribute and collapsed class on its offcanvas toggler ([NavbarSection.test.ts:105](/home/user/veneer-oc/tests/app/browser/sections/NavbarSection.test.ts:105)). The navbar proof retains its name and inline hidden state. The changed below-boundary readings are independently visible in [oc-first-styles-run.log.txt:217](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-first-styles-run.log.txt:217). Ordinary collapse togglers correctly retain their different expanded-state contract.

7. **CONFIRMED.** The registry/order attack found matching subjects, resting rows, construction order, barrel entries, and expected exports. The patch adds no driven row ([oc-shared.patch:579](/home/user/scaffold/.orkestrel/veneer/units/oc-shared.patch:579)). The selector, placement, geometry, and state tables are exported, frozen, and compared with the inventory ([oc-shared.patch:722](/home/user/scaffold/.orkestrel/veneer/units/oc-shared.patch:722)).

   The table-value mutations distinguish incorrect signs, geometry, and hiding-state expectations, as detailed under claim 5. The retained journey run supports subject and resting-key coverage ([oc-journey-observation.log.txt:292](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-journey-observation.log.txt:292)). The declined transition frames and the absent XXL inline frame agree with the fixed rulings; that observation does not substitute for the later capture-portfolio audit.

8. **BROKEN.** The guide’s unrestricted stacking statement is false: retuning the backdrop rung to `1046` while leaving the panel rung at `1045` puts the backdrop above the panel. The declarations impose no ordering constraint ([oc-shared.patch:215](/home/user/scaffold/.orkestrel/veneer/units/oc-shared.patch:215), [_offcanvas.scss:78](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:78), [_offcanvas.scss:154](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:154)). State that retuning preserves the intended ordering only when the panel’s rung remains greater.

   The plugin row also fails to carry the specified release obligations ([oc-shared.patch:349](/home/user/scaffold/.orkestrel/veneer/units/oc-shared.patch:349)). In particular, its event sequence and “Escape key hiding” wording omit the refusing branches: a static backdrop or Escape with `keyboard: false` emits `hidePrevented.bs.offcanvas` without hiding ([offcanvas.js:168](/home/user/veneer-oc/node_modules/bootstrap/js/src/offcanvas.js:168), [offcanvas.js:195](/home/user/veneer-oc/node_modules/bootstrap/js/src/offcanvas.js:195)). The row also omits the defaults, load and resize behavior, dismiss trigger, focus conditions and return, and transition completion obligations supplied by the terrain. Record those obligations with the release event names and conditions, preserving the required owner and table layout.

   The structural guide additions and ledger rows themselves match the patch and measured declarations. The default stacking order is correct.

9. **BROKEN.** The TypeScript syntax attack found no added `any`, non-null assertion, or prohibited type assertion. The change introduces no replacement helper for the installed test or contract primitives. The retained gate commands and result lines support the reported successful reruns ([oc-gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-gates.log.txt:1)).

   The writing claim nevertheless fails. For example, the comment leaves the `tests/setupStyles.test.ts` token without its required noun ([offcanvas.test.ts:95](/home/user/veneer-oc/tests/src/styles/components/offcanvas.test.ts:95)). The report’s blanket claim that every token takes a noun is therefore false ([b-modal-oc-report.md:415](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-report.md:415)).

   **Outside-claim finding — report-counts: BROKEN.** The report states growable-set counts despite its explicit output constraint. Remove the authored tallies and retain run measurements in the evidence logs. The requested count record follows; all line references address [b-modal-oc-report.md](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-report.md).

   - Lines 7–8: “Two decisions” and “two emission sites”; line 394 repeats the emission-site tally.
   - Lines 68–72: changed-line totals `37`, `7`; `2 files`, `36 insertions`, `8 deletions`; added-file lengths `186`, `20`, `500`, `174`.
   - Lines 78–91: per-file patch totals `2`, `63`, `1`, `172`, `21`, `1`, `3`, `3`, `2`, `35`, `78`, `1`, `128`, `141`.
   - Lines 103–106: “one row each”; line 149: “both variants.”
   - Line 178: `26 failed`, `3 passed`, total `29`; line 184: `2 failed` files, total `2`, and `7 passed` tests, total `7`.
   - Lines 224–230: `269 passed (269)`, `86 passed (86)`, `7 passed (7)`, `5 passed (5)`, `22 passed (22)`, `1 passed (1)` file, and `109 passed | 1 skipped (110)`.
   - Line 234: `22 passed (22)` and `57 passed (57)`.
   - Lines 236–240: “One reading,” a run of each named gate, “one failed case,” “two reruns of each,” and the repeated `269`, `109`, `1`, and `110` result counts.
   - Lines 244–246: “four variants” and `8 passed | 168 skipped (176)`.
   - Line 255: `1 failed | 39 passed (40)` and `86 passed (86)`.
   - Line 261: “one compiler per candidate”; line 395: “one block”; line 399: declarations living “once.”

VERDICT: FAIL 4, 5, 8, 9; outside the claims: report-counts