1. **BROKEN — the shipped cascade does write root `interpolate-size`.** [src/styles/elements/_html.scss:5](/home/user/veneer-mcol/src/styles/elements/_html.scss:5) writes `html { interpolate-size: allow-keywords }`. It survives in [dist/src/styles/index.css:1](/home/user/veneer-mcol/dist/src/styles/index.css:1), column 30231, in `elements`, without a media condition, specificity `(0,0,1)`. A read-only assertion that the built cascade contains no root declaration failed with `AssertionError`; its in-memory removal control passed. The declaration already exists at `877e7c6`; this commit introduces none. Correct the claim’s wording or reconcile the design’s prohibition with that baseline.

   The panel-motion portion held. The relevant built rules occur in this order; every row is in `components`. “Reduced” means `(prefers-reduced-motion: reduce)`.

   | Start column | Selector | Specificity | Condition | Relevant declarations |
   |---|---|---|---|---|
   | 103431 | `.fade` | `(0,1,0)` | Ordinary | `transition: opacity var(--vn-motion-feedback) var(--vn-ease-out)` |
   | 103540 | `.fade` | `(0,1,0)` | Reduced | `transition: none` |
   | 103624 | `.collapsing` | `(0,1,0)` | Ordinary | `height: 0`; transition of `height` over panel tokens |
   | 103762 | `.collapsing` | `(0,1,0)` | Reduced | `transition: none` |
   | 103791 | `.collapsing.collapse-horizontal` | `(0,2,0)` | Ordinary | `width: 0`; `height: auto`; transition of `width` over panel tokens |
   | 103943 | `.collapsing.collapse-horizontal` | `(0,2,0)` | Reduced | `transition: none` |

   Bootstrap’s corresponding rules use `0.35s ease`, with the same dimensions and reduced-motion overrides ([bootstrap.css:3358](/home/user/veneer-mcol/node_modules/bootstrap/dist/css/bootstrap.css:3358)). Fade loses the transition tie to the later collapse rule; its separate hidden-state opacity declaration remains correct.

   The tests reproduce the engine’s opening sequence—transition class, zero size, layout read, scroll-size write—and closing sequence—measured size, reflow, class changes, inline-size removal ([Collapse.ts:221](/home/user/veneer-mcol/src/browser/Collapse.ts:221), [Collapse.ts:347](/home/user/veneer-mcol/src/browser/Collapse.ts:347)). The running samples assert the axis alone, duration, easing, midpoint, settlement, doubled factor, and absent motion at zero/reduced settings ([collapse.test.ts:213](/home/user/veneer-mcol/tests/src/styles/components/collapse.test.ts:213)). Restoring the literal or adding opacity is distinguished by the assertions. Evidence read: [mcol-plant-collapse-literal.log.txt:123](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-plant-collapse-literal.log.txt:123), [mcol-plant-collapse-opacity.log.txt:125](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-plant-collapse-opacity.log.txt:125), and [mcol-green.log.txt:75](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-green.log.txt:75).

2. **CONFIRMED — the chevron rules implement the specified motion; the button transition is unchanged.** The attack restoring `transform 0.2s ease-in-out` failed the assertions ([mcol-plant-chevron-literal.log.txt:93](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-plant-chevron-literal.log.txt:93)). The retained pseudo-element reading reports duration `150`, easing `ease`, an expanded start matrix, and a different midpoint matrix ([mcol-probe-pseudo.log.txt:5](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-probe-pseudo.log.txt:5)).

   These are the relevant built rules, in source order. Reduced-motion rows have the same specificity as their ordinary counterparts.

   | Start column | Layer | Selector | Specificity | Condition | Relevant declarations |
   |---|---|---|---|---|---|
   | 37133 | `elements` | `button` | `(0,0,1)` | Ordinary | Feedback transitions for color, background, border, shadow, and opacity |
   | 37880 | `elements` | `button` | `(0,0,1)` | Reduced | `transition: none` |
   | 134025 | `components` | `:where(button.accordion-button)` | `(0,0,0)` | Ordinary | `transition: revert` |
   | 134304 | `components` | `.accordion-button` | `(0,1,0)` | Ordinary | `width: 100%`; `transition: var(--bs-accordion-transition)` |
   | 134709 | `components` | `.accordion-button` | `(0,1,0)` | Reduced | `transition: none` |
   | 134962 | `components` | `.accordion-button:not(.collapsed)::after` | `(0,2,1)` | Ordinary | `transform: var(--bs-accordion-btn-icon-transform)` |
   | 135104 | `components` | `.accordion-button::after` | `(0,1,1)` | Ordinary | Width/height from icon-width; transition from icon-transition |
   | 135468 | `components` | `.accordion-button::after` | `(0,1,1)` | Reduced | `transition: none` |

   The component layer defeats the semantic button treatment. The inherited icon transition resolves from feedback/standard tokens, while the expanded transform remains `rotate(-180deg)` ([\_accordion.scss:33](/home/user/veneer-mcol/src/styles/components/_accordion.scss:33)). Bootstrap declares the same endpoint and selectors, with `0.2s ease-in-out` for the chevron ([bootstrap.css:4560](/home/user/veneer-mcol/node_modules/bootstrap/dist/css/bootstrap.css:4560)). The unchanged button case samples its own running transitions ([accordion.test.ts:523](/home/user/veneer-mcol/tests/src/styles/components/accordion.test.ts:523)).

3. **BROKEN — the permanent chevron case does not prove a running turn’s timeline.** [sampleTransition:2176](/home/user/veneer-mcol/tests/setupBrowser.ts:2176) reads actual animations, pauses them, and seeks their timeline, but accepts no pseudo-element. The chevron case instead reads computed longhands and immediately compares the post-change transform with the initial transform; it then clears the scene through `sweepMotionFactor` ([accordion.test.ts:579](/home/user/veneer-mcol/tests/src/styles/components/accordion.test.ts:579), [setupBrowser.ts:2238](/home/user/veneer-mcol/tests/setupBrowser.ts:2238)).

   I executed the exact assertion block at [accordion.test.ts:603](/home/user/veneer-mcol/tests/src/styles/components/accordion.test.ts:603) against data controls, without simulating a browser. Wrong declared duration and wrong declared easing each produced `AssertionError`. Unchanged positive-factor frames passed. Removing state-dependent transforms at every factor failed the zero/reduced endpoint assertions. Thus:
   
   - Another duration or curve **in the computed longhands is distinguished**.
   - A missing transform or globally disabled transition **is distinguished**.
   - A positive-factor turn that remains frozen at its initial frame **is not distinguished**. Those are precisely the frames the assertions accept; no midpoint or completed positive-factor frame is examined.

   Extend the shared reader to target the pseudo-element and assert its actual transition, timing, midpoint, and endpoint in each direction. The temporary pseudo-element log demonstrates a reading, but does not supply the missing permanent regression proof.

   The other proof claims held:

   | Case or plant | Mutation and assertion discrimination |
   |---|---|
   | Collapse declaration case | Restoring the literal changes the recorded shorthand; distinguished at [collapse.test.ts:70](/home/user/veneer-mcol/tests/src/styles/components/collapse.test.ts:70). |
   | Collapse motion case | Wrong duration/curve, missing transition, or added opacity changes the sample or property-list assertions; distinguished at [collapse.test.ts:251](/home/user/veneer-mcol/tests/src/styles/components/collapse.test.ts:251). |
   | Accordion transition-slot case | Restoring the chevron literal or retaining motion under reduced preference changes the resolved slots; distinguished at [accordion.test.ts:504](/home/user/veneer-mcol/tests/src/styles/components/accordion.test.ts:504). |
   | Fade order case | A later fade transition makes the compound differ from plain `.collapsing`; distinguished at [fade.test.ts:252](/home/user/veneer-mcol/tests/src/styles/components/fade.test.ts:252). Changing collapse timing equally on both specimens does not fail it. |

   I read the named assertion failures in [mcol-red.log.txt:84](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-red.log.txt:84) and the passing result in [mcol-green.log.txt:75](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-green.log.txt:75). Every named plant records `AssertionError`: collapse literal at line 93, chevron literal at line 93, collapse opacity at line 95, and [fade order at line 90](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-plant-fade-order.log.txt:90). Each log’s before/after digest matches the corresponding file’s present digest.

4. **CONFIRMED — the rows match the textual classifier, and no addition applies.** The rows printed by [mcol-conformance-first.log.txt:52](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-conformance-first.log.txt:52) match [guides/veneer.md:7848](/home/user/veneer-mcol/guides/veneer.md:7848) and [guides/veneer.md:8239](/home/user/veneer-mcol/guides/veneer.md:8239). The final [mcol-conformance.log.txt:16](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-conformance.log.txt:16) reports exit `0`; it prints no outstanding rows.

   The attempted missing-row attack is distinguished by `departures.unrecorded`, as the first log demonstrates ([conformance.test.ts:265](/home/user/veneer-mcol/tests/conformance.test.ts:265)). These edits change existing declarations, introducing no selector or property.

   `classifyDeparture` labels any gained `--vn-*` reference `tokenized` without resolving its value ([setupServer.ts:3253](/home/user/veneer-mcol/tests/setupServer.ts:3253)). Consequently, the labels do not satisfy the legend’s release-value-preservation meaning ([veneer.md:7835](/home/user/veneer-mcol/guides/veneer.md:7835)). LEDGER-RETUNE would reclassify the chevron row and each collapse transition row as `retuned`: `0.2s ease-in-out` becomes `0.15s ease`, and `0.35s ease` becomes `0.25s cubic-bezier(0.32, 0.72, 0, 1)`.

5. **CONFIRMED — the engine/showcase evidence survives the timing change.** The report’s literal search returned no matches across `tests/src/browser`, `tests/app`, and `app`. The engine asserts positive running durations and completed animations, rather than the moved timing values ([Collapse.test.ts:87](/home/user/veneer-mcol/tests/src/browser/Collapse.test.ts:87), [Collapse.test.ts:400](/home/user/veneer-mcol/tests/src/browser/Collapse.test.ts:400)). Removing motion would fail its nonempty-animation assertions; completing before settlement would fail its recorded completion state. The showcase assertions distinguish incorrect shown/hidden markup without pinning these durations ([AccordionSection.test.ts:98](/home/user/veneer-mcol/tests/app/browser/sections/AccordionSection.test.ts:98)).

   Evidence read: [mcol-collapse-browser.log.txt:11](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-collapse-browser.log.txt:11) and [mcol-app.log.txt:1606](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-app.log.txt:1606), each exit `0`. The commit changes no engine, engine-test, app, or app-test file. The pixel-size mechanism remains unchanged and engine-owned.

6. **BROKEN — the guide overstates the chevron proof.** [guides/veneer.md:5338](/home/user/veneer-mcol/guides/veneer.md:5338) describes reading the turn and its duration, with the chevron held at its start frame while turning. The test neither holds a transition nor examines its subsequent motion; it reads declarations and immediate frames. The frozen positive-factor readings accepted under claim 3 falsify that proof description.

   Make the permanent proof measure the stated motion, then describe those measurements accurately. The product timing paragraphs, departure bullets, and Factors exception-list edits otherwise agree with the cascade; the searches found no remaining collapse/chevron release-literal timing claim.

7. **BROKEN — unit 3 does not fully deliver the design’s proof contract.** The required running-animation and midpoint readings appear at [e-id-motion-design-verdict.md:37](/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md:37). The panel proof supplies them; the permanent chevron proof does not. Its temporary sample and proposed shared-file patch do not close that requirement. Integrate and prove the pseudo-element reader and its consumer. Also reconcile the design row’s root-interpolation prohibition with the existing declaration identified in claim 1. The transition values, glyph endpoint, button treatment, and engine ownership otherwise match the design.

8. **CONFIRMED — scope and retained gates match the claim.** The retained diff equals `git diff 877e7c6 9e1fe4e` byte-for-byte. The [status record](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-status.txt:1) contains only files owned by the original and successor briefs; the live worktree is clean.

   The retained logs explicitly record exit `0`: [oxfmt:6](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-oxfmt-check.log.txt:6), [check:30](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-check.log.txt:30), [lint:6](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-lint-check.log.txt:6), [setup:37](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-setup.log.txt:37), [conformance:16](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-conformance.log.txt:16), [guides:16](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-guides.log.txt:16), [policy:16](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-policy.log.txt:16), [build:58](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-build-src.log.txt:58), [engine:11](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-collapse-browser.log.txt:11), and [app:1606](/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments/mcol-app.log.txt:1606). These establish the recorded gate outcomes, not the adequacy disputed in claim 3.

**Outside the claims — F1, BROKEN:** [\_accordion.scss:6](/home/user/veneer-mcol/src/styles/components/_accordion.scss:6) still says every value is Bootstrap’s apart from the forced-colors outline. At the default factor, the changed chevron resolves to `0.15s ease`, whereas Bootstrap declares `0.2s ease-in-out`. The retained chevron-literal assertion failure demonstrates the difference. Qualify the header to acknowledge the chevron timing departure; the glyph and button curves remain the release’s.

VERDICT: FAIL 1, 3, 6, 7; outside the claims: F1