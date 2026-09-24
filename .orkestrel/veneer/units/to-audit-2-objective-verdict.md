1. **CONFIRMED — Scope and delta.** The live status matches [to-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/to-2-status.txt:1). Reconstructing the owned files from the retained diff produced byte-identical worktree files. The tracked diff against the base commit is empty, and the `git apply --check --verbose` command exits 0 against those unchanged base files.

   The attack for unrelated changes failed. Applying the shared patches in memory and comparing their results found changes only in the named constants, setup, setup-proof, and guide files. Ignoring table padding, the guide changes only the specified toast passages and rows. The owned-file differences are the stacking comments and framed-population changes. See [to-2.diff:1](/home/user/scaffold/.orkestrel/veneer/units/to-2.diff:1) and [to-shared-2.patch:1](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:1).

2. **CONFIRMED — Specimen record and stacking sentences.** The attack for omitted or altered replacement wording failed against the [specimen TSDoc:352](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:352), [guide region paragraph:473](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:473), and [stacking paragraph:443](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:443). The guide distinguishes the container’s applied level from the standalone toast’s declared slot. The [partial comment:2](/home/user/veneer-to/src/styles/components/_toast.scss:2) records the fading directions and container stacking correctly.

   Compiling the round-1 and round-2 partials in memory produced identical declarations. The stacking proof distinguishes a literal container level through its retune assertion and a missing standalone slot through its separate slot reading at [toast.test.ts:187](/home/user/veneer-to/tests/src/styles/components/toast.test.ts:187). I read the corresponding retained failures in [to-audit-settling.log.txt:7](/home/user/scaffold/.orkestrel/veneer/units/to-audit-settling.log.txt:7) and the passing round-2 style result in [to-gate-2-styles.log.txt:152](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-2-styles.log.txt:152).

3. **CONFIRMED — Toast plugin row.** The attack for disagreement with the installed release failed. The [row:958](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:958) agrees with the defaults, cancellation points, class changes, disposal, timer scheduling, and interaction listeners in [toast.js:41](/home/user/veneer-to/node_modules/bootstrap/js/src/toast.js:41), [toast.js:75](/home/user/veneer-to/node_modules/bootstrap/js/src/toast.js:75), and [toast.js:138](/home/user/veneer-to/node_modules/bootstrap/js/src/toast.js:138). The dismiss target follows [component-functions.js:12](/home/user/veneer-to/node_modules/bootstrap/js/src/util/component-functions.js:12).

   Removing the deprecated hiding class during showing and clearing the timer during disposal are additional operations. Their omission makes no stated clause false. Focus listeners hold the timer without supplying key or ARIA handling.

4. **CONFIRMED — Nouns after code tokens.** Reading the semantically added or changed guide prose, TSDoc, and comments found no remaining bare-token counterexample. The repaired forms appear at [to-shared-2.patch:431](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:431), [to-shared-2.patch:462](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:462), and [toast.test.ts:175](/home/user/veneer-to/tests/src/styles/components/toast.test.ts:175). Shared nouns and nouns continuing on the following line account for the apparent exceptions. The capture-registry TSDoc writes the backticked class name at [to-shared-2.patch:179](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:179). Table identifiers remain data. The report’s prose is assessed under claim 8.

5. **CONFIRMED — Framed populations.** The derivations and rendered-population comparisons are present at [ToastSection.test.ts:83](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:83) and [ToastSection.test.ts:136](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:136). The geometry readings at [line 156](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:156) test the edges and center required by the current specimens’ placement combinations.

   I read the passing control and mutation runs in [to-mutations-2.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt:1). The assertions distinguish the mutations as follows.

   | Mutation | Distinguishing assertion | Retained log |
   | --- | --- | --- |
   | Geometry derivation drops a framed specimen | Derived names disagree with rendered frame names at line 139. | Lines 10–19 |
   | Container derivation drops a framed specimen | Container specimen names disagree with the derivation at line 88. | Lines 21–29 |
   | Stacked container loses its frame | Container membership and parent-frame assertions at lines 88–95 reject it. | Lines 31–39 |
   | Centering changes to the vertical-only translation class | The geometry case has no recognized centering distances and rejects the empty reading at line 183. | Lines 41–50 |
   | Stacked container receives the unshipped placement class | The placement-class assertion at lines 101–107 rejects it. | Lines 52–60 |

   These runs fail the cases the report names. The centering control establishes rejection of that substitution; it does not establish geometric support for every class the placement-pattern expression admits.

6. **BROKEN — Token identity is not fully bound.** Change the spacing row’s token from the `TOKEN_NAMES.gutter.x` member to the `TOKEN_NAMES.size[6]` member. The `TOKEN_NAMES.gap[4]` member supplies another counterexample. Neither proof distinguishes these edits.

   The [binding assertion:130](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:130) accepts the declared length. The [style assertion:80](/home/user/veneer-to/tests/src/styles/components/toast.test.ts:80) compares resolved token text and the unchanged slot’s pixel length. The gutter, size, and gap tokens each declare the identical `1.5rem` value at [_tokens.scss:261](/home/user/veneer-to/src/styles/_tokens.scss:261), [_tokens.scss:342](/home/user/veneer-to/src/styles/_tokens.scss:342), and [_tokens.scss:348](/home/user/veneer-to/src/styles/_tokens.scss:348). The installed [readToken implementation:2480](/home/user/veneer-to/node_modules/@orkestrel/test/dist/src/browser/index.js:2480) returns the trimmed computed property value.

   An executed, nonwriting Sass/PostCSS check confirmed those identical declarations and the binding expression’s identical result. Its controls distinguished the different-length size token and the density-dependent space token. No Vitest or browser run was performed in this lane.

   The retained runs remain valid: [to-mutations-2.log.txt:71](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt:71) records the padding and font substitutions failing the binding case; [line 91](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt:91) records the density-space substitution passing that case; [line 100](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-mutations-2.log.txt:100) records it failing the style case. Those controls do not establish token identity where declarations coincide.

   **Smallest fix:** independently retune each row’s candidate token and assert that its slot follows, restoring the token afterward. Retain a failing run for the size-token substitution. The shipped gutter binding itself remains correct.

7. **CONFIRMED — Container extension and round-1 confirmations.** The extension changes an owned proof, records its decision at [report:206](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:206), and removes the inline population described by [the campaign note:12](/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md:12). It changes no shipped behavior. The exact name sequence at [ToastSection.test.ts:28](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:28) asserts the rendered region contract; it does not drive a case matrix.

   The attack against the retained partial/oracle ruling failed. In-memory compilation produced the inventory’s selector sequence and precisely the departures recorded at [to-shared-2.patch:520](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:520). Removing the body rule made the comparison reject its control.

   The retained proof-matrix mutations remain distinguished by the unchanged style assertions. I read their executed results in [to-audit-settling.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/to-audit-settling.log.txt:6).

   | Mutation | Distinguishing round-2 assertion |
   | --- | --- |
   | Partial removed; selector removed or added | Selector-set comparison and resolved treatments, toast.test.ts:37 |
   | Container level becomes literal; standalone slot disappears | Retuned container level and standalone slot, toast.test.ts:187 |
   | Hidden rule disappears | Display and geometry, toast.test.ts:148 |
   | Showing rule disappears | Opacity beside displayed and hidden combinations, toast.test.ts:164 |
   | Last-child qualifier disappears | Terminal margin and individual retune, toast.test.ts:214 |
   | Header receives full radius | Radius minus border width, including retune, toast.test.ts:246 |
   | Close combinator broadens to the toast | Body control retains zero margins, toast.test.ts:274 |
   | Body uses the vertical inset | Horizontal inset on every side, toast.test.ts:295 |
   | Gap uses the density scale | Gap remains unchanged during density retuning, toast.test.ts:104 |
   | Paint becomes literal | Mode-dependent paint and alias retuning, toast.test.ts:319 |

   The close-table move and deferral deletion remain byte-identical to round 1. Leaving the shipped combinator deferred is distinguished by [setupStyles.test.ts:2735](/home/user/veneer-to/tests/setupStyles.test.ts:2735) and [close.test.ts:96](/home/user/veneer-to/tests/src/styles/components/close.test.ts:96). Removing showcase construction or the release-stem mapping conflicts with the exact registry expectations at [to-shared-2.patch:240](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:240) and [line 294](/home/user/scaffold/.orkestrel/veneer/units/to-shared-2.patch:294). I read the passing round-2 [application log:9](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-2-app.log.txt:9), [conformance log:11](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-2-conformance.log.txt:11), and [style log:152](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-2-styles.log.txt:152).

8. **BROKEN — Law and report.** The prohibited-code attack found no added type escape, suppression, mock, spy, fake, or prohibited nested function. The report fails the writing requirement:

   - Temporal “now” appears at [report:74](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:74) and [report:76](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:76); temporal “new” appears at [report:98](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:98).
   - Tokens lack following nouns, including the method references at [report:49](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:49) and the constant and selector references at [report:118](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:118).
   - Positional references appear as “first” and “second” at [report:200](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:200), and “item 2” and “a second case” at [report:206](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:206).

   The gate table records commands and outcomes. I read the retained check, build, style, section, application, setup, conformance, guides, and policy logs. The setup log attribution needs correction: [report:200](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:200) identifies the loaded timeout run’s log, but that [file:31](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-2-setup.log.txt:31) records a passing run. This does not refute the Orchestrator’s timeout observation; it refutes the named evidence location. Preserve the timeout output separately or correct the attribution.

   **Smallest fix:** remove temporal and positional wording, supply the missing nouns, and correct the log reference.

   **Outside-claim finding REPORT-COUNTS — BROKEN.** The authored behavior tally at [report:49](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report-2.md:49) violates the no-count rule. Name the omitted behaviors without “Two further behaviors.” The report’s count record follows; run measurements remain permitted evidence.

   | Report location | Counts stated |
   | --- | --- |
   | Line 49 | “Two further behaviors.” |
   | Line 78 | `34 passed (34)`. |
   | Line 117 | “both axes”; “at least one such distance.” These describe fixed geometry and an assertion bound. |
   | Lines 124, 127 | `2 failed / 3 passed (5)`. |
   | Lines 125, 126, 128 | `1 failed / 4 passed (5)`. |
   | Line 129 | `5 passed (5)`. |
   | Lines 162–163 | `1 failed / 121 passed (122)`. |
   | Lines 164, 166 | `122 passed (122)`. |
   | Line 165 | `1 failed / 16 passed (17)`. |
   | Line 191 | `34 passed (34)`. |
   | Lines 192–193 | `5 passed (5)`. |
   | Line 194 | `122 passed (122)`. |
   | Line 195 | `267 passed (267)`. |
   | Line 196 | `22 passed (22)`. |
   | Line 197 | `19 passed (19)`. |
   | Line 198 | `109 passed / 1 skipped (110)`. |
   | Line 200 | “two earlier … runs”; “Both cases”; `267 passed (267)`. |
   | Line 206 | “a second case,” also a positional-reference violation. |
   | Line 214 | “both patches,” referring to the named predecessor and replacement patches. |

**Attacked and held.** The standalone toast correctly declares a stacking slot without applying a stacking level. The deprecated hiding-class removal and disposal timer cleanup do not contradict the plugin row. The density-space mutation is correctly distinguished by the style proof; the unresolved token-identity mechanism is specifically falsified by equal-valued, density-independent tokens.

VERDICT: FAIL 6, 8; outside the claims: REPORT-COUNTS