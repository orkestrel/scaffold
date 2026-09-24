1. **CONFIRMED — Section mutations.** The assertions distinguish every named mutation from the passing case.

   - Removing trailing-corner squaring produces `[0, 6, 0, 6]`, failing the zero-radius assertion at [InputGroupSection.test.ts:191](/home/user/veneer-fr/tests/app/browser/sections/InputGroupSection.test.ts:191). Evidence: [trailing-corner mutation log:16](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-mutate-Grouped-trailing-corner-squaring-removed-.log.txt:16).
   - Removing leading-corner squaring produces `[6, 0, 6, 0]`, failing that same assertion. Evidence: [leading-corner mutation log:15](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-mutate-Grouped-leading-corner-squaring-removed-from-the-overlap-rul.log.txt:15).
   - Removing sized-select end room produces `16px` and `8px` instead of `48px`, failing [InputGroupSection.test.ts:212](/home/user/veneer-fr/tests/app/browser/sections/InputGroupSection.test.ts:212). Evidence: [sized-select mutation log:21](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-mutate-Sized-group-select-end-room-removed-.log.txt:21).
   - Restoring toolbar-group width to `100%` produces `414 < 414`, failing [InputGroupSection.test.ts:223](/home/user/veneer-fr/tests/app/browser/sections/InputGroupSection.test.ts:223). Evidence: [toolbar mutation log:15](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-mutate-Toolbar-group-width-restored-to-100-.log.txt:15).

   Each full mutation log names only the toolbar-and-corners case as failing; the other cases pass. The [mutation script:17](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-mutate.sh:17) backs up the subject and restores it after each run. The unmutated case passes in [fr3-gate-sections.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-gate-sections.log.txt:6). The attacks through ineffective mutations or unrelated failures therefore fail.

2. **CONFIRMED — Typed validation table.** The object rows carry the declared `ValidationHostCase` contract, including narrowed `tag`, `type`, and `feedback` fields and `undefined` holder absence at [tests/setupStyles.ts:4889](/home/user/veneer-fr/tests/setupStyles.ts:4889). The table uses no column coercion.

   The mutation swaps `tag: 'INPUT'` and `type: 'text'`. The compiler distinguishes it from the passing table: [fr3-plant-check.log.txt:9](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-plant-check.log.txt:9) reports TS2322 because `"text"` is outside the tag union, followed by exit `2`. The restored check exits `0` in [fr3-gate-check.log.txt:30](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-gate-check.log.txt:30).

   The runtime comparison returns `undefined` when the specimen itself holds the control at [ValidationSection.test.ts:48](/home/user/veneer-fr/tests/app/browser/sections/ValidationSection.test.ts:48). Returning the former empty-string sentinel would differ under the strict comparison at line 52. The validation case passes in [fr3-gate-sections.log.txt:80](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-gate-sections.log.txt:80).

3. **BROKEN — Empty-plaintext prose remains false in the journey comment.** [integration.test.ts:2312](/home/user/veneer-fr/tests/app/browser/integration.test.ts:2312) still says focus “moves the text of an empty floating one.” This comment is an added line in [fr-3.diff:980](/home/user/scaffold/.orkestrel/veneer/units/fr-3.diff:980).

   The failing state is the `Form floating empty plaintext` specimen: its readonly input has no value at [constants.ts:2098](/home/user/veneer-fr/app/browser/constants.ts:2098). Its placeholder is transparent, and focus changes padding at [_form-floating.scss:59](/home/user/veneer-fr/src/styles/components/_form-floating.scss:59). There is no control text to move. The assertion correctly compares the padding readings; the defect is its description.

   The smallest correction is to describe the empty control’s content-box inset changing, with no painted text showing that change. Keep the assertion and frame.

   The other parts hold: the sized names are correct at [constants.ts:1392](/home/user/veneer-fr/app/browser/constants.ts:1392) and line 1397; the TSDoc and [guide patch:100](/home/user/scaffold/.orkestrel/veneer/units/fr-shared-3.patch:100) correctly describe the empty content box; the toolbar prose states the available-room condition at [constants.ts:1920](/home/user/veneer-fr/app/browser/constants.ts:1920) and [InputGroupSection.test.ts:214](/home/user/veneer-fr/tests/app/browser/sections/InputGroupSection.test.ts:214); the remarks tag stands alone at [constants.ts:690](/home/user/veneer-fr/app/browser/constants.ts:690).

4. **CONFIRMED — Scope and stated code constraints.** The live cumulative diff matches the retained diff by SHA-256, and live status matches [fr-3-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fr-3-status.txt:1). The files remain within the briefs’ scope and the accepted consequential export-list exception for `tests/setupStyles.test.ts`. The [shared patch:1](/home/user/scaffold/.orkestrel/veneer/units/fr-shared-3.patch:1) targets `guides/veneer.md` alone.

   An executed TypeScript AST inspection of changed TypeScript lines found no prohibited assertion, `any`, or nested function. Its negative control detected those constructs, including a multiline nested arrow; its permitted control accepted direct callbacks and const assertions. Inspection of the added code and a changed-line suppression/mock search found no suppression or mock. The extra-path and prohibited-syntax attacks fail.

   Every listed round-3 gate log starts with its command, including [fr3-capture-light-1280-filtered.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-capture-light-1280-filtered.log.txt:1). The earlier missing-header defect does not recur.

   The report states these run counts:

   - Each section mutation: `1 failed | 3 passed (4)`, matching [fr-mutations-3.log.txt:16](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr-mutations-3.log.txt:16) and its succeeding mutation records.
   - Sections: `10 passed (10)`, matching [the section log:86](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-gate-sections.log.txt:86).
   - Styles setup: `144 passed (144)`, matching [the setup log:151](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-gate-setupstyles.log.txt:151).
   - Filtered capture: `9 passed | 45 skipped (54)`, matching [the capture log:131](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-capture-light-1280-filtered.log.txt:131).
   - Guides: `19 passed (19)`, matching [the guides log:12](/home/user/scaffold/.orkestrel/veneer/units/fr-instruments/fr3-gate-guides.log.txt:12).

   These are quoted run measurements. “Both inline corners” occurs in a quoted case title and describes fixed geometry.

**Findings outside the claims:** none.

**Attacked and held — adjacent behavior:** A toolbar group may wrap when its row lacks room; the same-row assertion applies to the section proof’s viewport. A plain group’s select retains its own end padding rather than the sized group’s `48px`. Anonymous callbacks passed directly to calls are permitted by the coding contract.

VERDICT: FAIL 3; outside the claims: none