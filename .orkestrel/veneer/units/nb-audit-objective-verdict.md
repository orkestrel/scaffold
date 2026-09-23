1. **CONFIRMED — Delta and scope.** The live status matches [nb-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/nb-status.txt:1). The owned-file contents match [nb.diff:1](/home/user/scaffold/.orkestrel/veneer/units/nb.diff:1), and the patch headers stay within the named file sets. The attack was an additional changed path, forbidden addition, or unrelated deletion; none appeared. The shared and off-limits patches pass `git apply --check`. The retirement patch applies in memory after the specified accordion-map removals; its deletions match [nb-retirement.patch:7](/home/user/scaffold/.orkestrel/veneer/units/nb-retirement.patch:7).

2. **UNRESOLVED — The cascade holds, but the attributed built-output reading is missing.** In-memory Sass compilation with the shared and off-limits patches emits the inventory’s navbar selectors, the dark icon selector, and the deferred navbar selectors. The declarations and conditions agree after the recorded token substitutions; the only addition is the forced-colors outline. Comparison with installed Bootstrap also found no priority difference. Removing the collapse rule from the in-memory source made the comparison detect its absence.

   The attack against the mixin also failed: the emitted `.nav` declarations equal the original declarations, including the empty weight slot. The mixin leaves direction, inline inset, and colors with their callers ([nb-offlimits.patch:10](/home/user/scaffold/.orkestrel/veneer/units/nb-offlimits.patch:10)). The expansion blocks use 576, 768, 992, 1200, and 1400 pixels; the no-infix rules are unconditional. No light-class rule appears. D2 and D3 hold.

   However, [nb-gates.log.txt:4](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-gates.log.txt:4) records a successful build, not the claimed `navbar-light` search or media-block inspection. The source compilation corroborates the result, but cannot establish that historical artifact reading. Retain that inspection output to settle this clause.

3. **UNRESOLVED — The retained mutations distinguish their defects; the separate theme-run claims lack retained evidence.** The following assertions distinguish the named mutations from the passing case. Log references resolve under `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/`.

   | Mutation | Distinguishing assertion | Retained red result |
   | --- | --- | --- |
   | Neighbouring expansion boundaries | Boundary readings compare wrap, content, toggler, direction, menu, inset, and overflow at [navbar.test.ts:203](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:203) | `nb-mutations.log.txt:1` |
   | No-infix class gated at `sm` | Expanded content at 375 pixels and absence of a media condition, `navbar.test.ts:245` | `nb-mutations.log.txt:2` |
   | Dark class removed | Each dark slot must match the release and differ from the plain bar, `navbar.test.ts:399` | `nb-mutations.log.txt:3` |
   | Toggler asset restored at theme scope | Plain dark element must read an empty asset, `navbar.test.ts:453`, `theme.test.ts:144` | `nb-mutations.log.txt:4` |
   | Scroll fallback removed | Maximum and rendered heights must equal the viewport fraction, `navbar.test.ts:389` | `nb-mutations.log.txt:5` |
   | Nav-link slot reassignment removed | Navbar links must differ from loose nav links and follow the bar override, `navbar.test.ts:129` | `nb-mutations.log.txt:6` |
   | Current/open link rule removed | Active and shown links must read the active slot, `navbar.test.ts:141` | `nb-mutations-2.log.txt:2` |
   | Expanded offcanvas rule removed | Panel styles must override the inline hidden state, `navbar.test.ts:337` | `nb-mutations.log.txt:7` |
   | Offcanvas-header rule removed | Expanded header display must be `none`, `navbar.test.ts:352` | `nb-mutations.log.txt:8` |
   | Toggler shadow removed | Focus must produce the specified shadow spread and color, `navbar.test.ts:483` | `nb-mutations.log.txt:9` |
   | Forced-ring include removed | Forced colors must produce a solid outline of the token’s width, `navbar.test.ts:507` | `nb-mutations.log.txt:10` |
   | Transition written bare | Reduced motion must produce zero duration and the recorded media rule, `navbar.test.ts:514` | `nb-mutations.log.txt:11` |
   | Collapsed menu rule removed | Menu position must be static below the boundary, `navbar.test.ts:237`, `navbar.test.ts:311` | `nb-mutations.log.txt:12` |
   | Collapse rule removed | Collapsed basis and opened-content layout must agree, `navbar.test.ts:234`, `navbar.test.ts:298` | `nb-mutations-2.log.txt:3` |
   | Light-class rule added | Layer selector census rejects that name, `navbar.test.ts:72` | `nb-mutations.log.txt:13` |
   | Brand hover/focus rule removed | Separately overridden resting and hover colors must change under hover and focus, `navbar.test.ts:184` | `nb-mutations.log.txt:14` |
   | Text-link rule removed | Resting and hovered text links must consume the active slot, `navbar.test.ts:159`, `navbar.test.ts:196` | `nb-mutations.log.txt:15` |
   | Text inset made literal | Density change must scale the text inset, `navbar.test.ts:567` | `nb-mutations.log.txt:16` |
   | Dark icon rule removed | Standalone dark-scope and nested-island icons must read the dark asset, `navbar.test.ts:455` | `nb-mutations.log.txt:17` |
   | Bar padding slot removed | Declaring-scope length and override readings must agree, `navbar.test.ts:84` | `nb-mutations-3.log.txt:1` |
   | Expanded-content importance removed | Priority comparison reads installed Bootstrap directly, [conformance.test.ts:259](/home/user/veneer-nb/tests/conformance.test.ts:259) | `nb-mutations-2.log.txt:4` |

   The controls are green at `nb-mutations.log.txt:28`, `nb-mutations-2.log.txt:5`, and `nb-mutations-3.log.txt:2`. The failed padding-filter attempt and skipped attempt are not proof; the corrected filter supplies the distinguishing result.

   The assertions also distinguish the historical base theme case and a retirement-scope accordion-icon declaration: see [theme.test.ts:135](/home/user/veneer-nb/tests/src/styles/theme.test.ts:135) and [nb-retirement.patch:76](/home/user/scaffold/.orkestrel/veneer/units/nb-retirement.patch:76). But the separate red/green executions stated at [b-collapse-nb-report.md:211](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report.md:211) appear in none of the supplied logs. Retain those runs to settle the claim. The stated hover and offcanvas-reading limits accurately describe the proof.

4. **CONFIRMED — Section structure and specimen proofs.** The attack was inconsistent toggler/content state or loss of the class-based dark specimen. The mutations are distinguished by the independent selector census and state assertions at [NavbarSection.test.ts:39](/home/user/veneer-nb/tests/app/browser/sections/NavbarSection.test.ts:39) and [NavbarSection.test.ts:90](/home/user/veneer-nb/tests/app/browser/sections/NavbarSection.test.ts:90); the retained failures are [nb-mutations.log.txt:25](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutations.log.txt:25).

   The constants supply the named specimens, container wrappers, accessible labels, and dark cards without inline styles, scripts, or toggle attributes ([nb-shared.patch:94](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:94)). Construction, exports, and enumerations agree. The section and application results are green at [nb-gates.log.txt:7](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-gates.log.txt:7) and line 10. The Layout frame change remains the explicitly assigned capture observation.

5. **UNRESOLVED — Registry construction holds; journey execution is uncorroborated.** The attack against subject names, specimen selectors, and measured properties failed. The evaluated constants contain the declared subjects, and the selectors select the intended elements in their markup. Their properties are supplied by the corresponding navbar rules. The additions stay at the registry ends and add no capture-state member ([nb-shared.patch:163](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:163), [nb-shared.patch:181](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:181)).

   Removing hover repaint or the focus ring is distinguished by the journey’s state and paint assertions at [nb-shared.patch:878](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:878). Nevertheless, no supplied log records this journey case, the resting cascade case, or the stage-only accordion census control. Those results exist only in [b-collapse-nb-report.md:79](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report.md:79). Retain the named journey runs and census-control output to settle the claim; screenshot production remains outside this unit’s acceptance criteria.

6. **CONFIRMED — Tables, ledger, deferrals, and simulated retirement.** The attack was a missing selector, wrong breakpoint, incorrect dark value, spurious ledger row, or remaining theme asset. Evaluating the patched tables reproduces the inventory’s selector partition, dark declarations, and breakpoint readings. Removing the collapse selector makes the partition comparison fail, as the assertion at [nb-shared.patch:687](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:687) requires. A changed width or dark value is distinguished by the assertions at lines 700 and 738.

   The compiled declaration differences exactly match the navbar ledger rows, including wrapped border-mix whitespace. Each difference gains a Veneer token and therefore takes the comparison’s `tokenized` category ([setupServer.ts:1353](/home/user/veneer-nb/tests/setupServer.ts:1353)). The forced-colors outline is the sole addition. No Navbar deferral remains.

   Applying the retirement patch in memory after the accordion-map removals compiles successfully and leaves neither the asset map/walk nor the component assets at theme scope. This confirms the simulated state specified by [nb-retire.py:11](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-retire.py:11), not an assembled ACCORDION landing. The setup and conformance results match [nb-gates.log.txt:9](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-gates.log.txt:9) and [nb-retire-gates.log.txt:5](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-retire-gates.log.txt:5).

7. **BROKEN — The guide does not consistently follow code tokens with nouns.** The exact counterexamples are “answer to `--vn-factor-density`, … read `--vn-size-5`” at [nb-shared.patch:1056](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:1056), and “over `--vn-palette-white-base`, so” at line 1095. These violate [writing.md:48](/home/user/scaffold/.claude/rules/writing.md:48) and the claim’s explicit universal.

   Add the missing nouns. The heading and row placements, corrected `xxl` limit, engine-obligation references, and roadmap carriers hold; this finding requires no cascade change.

8. **BROKEN — Writing compliance and report bounds.** The added specimen documentation says the toggle and menu “carry `show`” without its noun ([nb-shared.patch:82](/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch:82)). The selector documentation also states “once each” and “twice” at lines 309 and 312, despite the count prohibition. Name the class and remove the tally wording.

   The report’s assertion that expansion classes are “disjoint” is false: an element can carry the no-infix and a breakpoint expansion class together ([b-collapse-nb-report.md:97](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report.md:97)). Their identical declarations justify the ordering choice without that assertion; remove it.

   The recorded stage and retirement gate commands/results match their retained summary logs. The syntax and export review found no prohibited assertion, suppression, mock, or added exported helper duplicating an installed primitive.

   The requested report-count record is:

   - **REPORT-COUNTS:** “two changes” at line 13; “one exception” at line 15; “both lists” and “one decision” at line 44; “both variants” at line 82; “two … rows” at line 98; “one hunk” at line 100; file lengths `235`, `621`, `20`, and `151` at lines 108–111; “both dark spellings” at line 109; `+7 −3` at line 112 and the quoted `10 +++++++---` diff reading at line 118; “One earlier … run” and “once” at line 158; “both inverted specimens” at lines 229 and 242; “both widths” at line 237; “one row” at line 282.
   - Quoted run measurements: duplication `1 failed | 112 skipped (113)` and `1 passed | 112 skipped (113)` at lines 40–41; setup `113 passed (113)` and retirement `112 passed (112)` at line 56; journey `1 failed | 40 passed (41)` and census control `1 passed | 40 skipped (41)` at lines 79–81, repeated at line 174.
   - Baseline and gate measurements at lines 134–167: `22`, `121`, `254`, `71`, `2`, `113`, `78`, `22`, `19`, `109 passed | 1 skipped (110)`, `896`, `112`, `102`, and `22`.
   - Mutation/control measurements at lines 182–215: `46 passed (46)`; `2 passed (2)`; `6 failed | 1 passed | 33 skipped (40)`; `1 failed | 39 skipped (40)`; `1 failed | 1 passed | 38 skipped (40)`; `2 failed`; `2 failed | 38 skipped (40)`; `1 failed | 21 skipped (22)`; specimen readings of `1 failed`; and theme readings `1 failed | 5 passed (6)` and `6 passed (6)`. These are reported measurements, distinct from the prohibited editorial tallies.

Findings outside the claims:

- **REPORT-COUNTS — BROKEN.** The editorial tallies listed under claim 8 violate [AGENTS.md:172](/home/user/scaffold/AGENTS.md:172) and the implementation brief’s output contract. Remove those tallies while retaining measurements with their run attribution.
- **INLINE-CASE-TABLES — BROKEN.** The dark-class/dark-attribute case matrix is declared directly in [navbar.test.ts:399](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:399). [tests.md:187](/home/user/scaffold/.claude/rules/tests.md:187) requires case matrices in setup infrastructure at any size. Move that matrix into the existing styles setup module and import it. The assertions themselves distinguish the dark-class mutation; their placement is the defect.

Attacked and held: the nested light island correctly retains the ancestor-dark icon because the release uses the same descendant selector. The offcanvas body’s inline padding correctly wins over its normal declaration; the panel’s important declarations correctly override the inline hidden state. Neither behavior calls for a repair.

VERDICT: FAIL 2, 3, 5, 7, 8; outside the claims: REPORT-COUNTS, INLINE-CASE-TABLES