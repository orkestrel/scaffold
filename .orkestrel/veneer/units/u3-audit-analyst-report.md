# U3 audit — objective lane (analyst on Astra, codex exec read-only, thread 01a0be53-35ec-74a1-be2b-458fe4ea776b, journal units/u3-audit-analyst.sh, 2026-09-20)

Fix round required. I audited HEAD `b661142` plus the working tree and verified that the supplied patch matches it. `npm.cmd run check` passed. I ran read-only Node checks, but no test project, build command, or filesystem mutation.

1. **CONFIRMED — Registry.** The registry walk found every group frozen and every leaf equal to its joined path. The types match the planner, and the barrel exports only the constants and types modules. No listener, timer, or DOM access exists in these files. Evidence: [constants.ts:16](C:/Users/mikes/WebstormProjects/veneer/src/core/constants.ts:16), [types.ts:8](C:/Users/mikes/WebstormProjects/veneer/src/core/types.ts:8), [index.ts:1](C:/Users/mikes/WebstormProjects/veneer/src/core/index.ts:1).

2. **CONFIRMED — Registry proof.** The recorder is installed before the reset and dynamic import; the deliberate registration proves it records calls. The remaining cases check exports, recursive freezing, derived paths, and uniqueness. Evidence: [index.test.ts:15](C:/Users/mikes/WebstormProjects/veneer/tests/src/core/index.test.ts:15).

3. **REFUTED — Value-source law.** The stacking ladder at [_tokens.scss:237](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:237) comes from Bootstrap **component** declarations, not the inventory’s `root` or `dark` buckets required by this claim and [u3-brief.md:35](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief.md:35). The planner proposed that ladder, so this is a source-policy conflict, not evidence that the numbers were fabricated. The retained-value report also omits `--vn-link-decoration`, which the guide labels Bootstrap-retained.

   The requested spot checks otherwise match: primary fills, body text, dark canvas, borders, raised surfaces, motion durations/easings, calibrated radii, and dark primary `0, 172, 236`. Evidence: [_tokens.scss:16](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:16), [calibration.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md), and [instruments.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments.md).

4. **REFUTED as literally worded — Cascade shape.** Not every `-rgb` declaration is a literal triplet: the emphasis RGB and light canvas RGB values forward palette tokens through `var()`. Evidence: [_tokens.scss:25](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:25), [_mixins.scss:69](C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:69). These resolve to static triplets and are explicitly permitted by the planner; this needs claim clarification, not a code change.

   The other assertions hold: theme layers, registrations, closure, names, barrel order, and deferred mixins. The tiers use oklab with light `12%/70%/35%` and dark `15%/70%/50%`, matching Elements’ source.

5. **REFUTED — Alias proof.** My inventory comparison found no missing root or dark alias, and the built dark additions are exactly the stated additions. However, [setupStyles.test.ts:216](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:216) checks lengths, uniqueness, prefixes, version, and digest—not inventory membership. A same-length substitution can pass it.

   Also, [tokens.test.ts:113](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:113) permits the additions but never requires them. Removing any of `--bs-primary`, `--bs-primary-rgb`, or `--bs-focus-ring-color` from the dark-name population left every predicate empty in my read-only check; removing `--bs-body-color` correctly produced a failure.

6. **CONFIRMED — Elements and present artifact.** The HTML/body partials contain no prohibited tag pairing or physical inline-axis declaration. The built LTR and RTL files are byte-identical. The setup case requires a nonempty declaration population. Evidence: [elements/_html.scss:1](C:/Users/mikes/WebstormProjects/veneer/src/styles/elements/_html.scss:1), [elements/_body.scss:1](C:/Users/mikes/WebstormProjects/veneer/src/styles/elements/_body.scss:1), [setupStyles.test.ts:174](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:174). Scanner blind spots are additional findings below.

7. **REFUTED — Proof adequacy.** The invalid-factor case cannot prove registration: it sets `banana` on a subtree but consumes `--vn-space-3` already resolved at `:root`. Removing the registration would leave that particular `6px` assertion unchanged. Evidence: [tokens.test.ts:187](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:187), contrasted with the preceding subtree-resolution case.

   “Every colour assertion … never strings” is also false: the shadow assertion compares a complete color-bearing string, and the forced-colors case compares color strings directly. Evidence: [tokens.test.ts:158](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:158), [mixins.test.ts:72](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/mixins.test.ts:72). The requested files and fixture/CDP mechanisms exist.

8. **CONFIRMED — Recorded controls and removal.** [u3-report.md:68](C:/Users/mikes/WebstormProjects/veneer/tmp/units/u3-report.md:68) records every named control, assertion site, failing output, and removal result. The working source contains no plant, and no test case name contains a control tag. This confirms the retained record; I did not independently rerun its historical mutations.

9. **CONFIRMED — Carried obligations.** Normalization precedes edge comparison; the limit sentence explicitly excludes percentage/length positions; the radius return clause is reflowed. My direct check accepted `calc( 1px )` versus `calc(1px)` and rejected the `calc(2px)` control. Evidence: [setupStyles.ts:140](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:140), [setupStyles.ts:196](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:196), [setupStyles.ts:227](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:227).

10. **CONFIRMED — Recorded unknowns.** The report records the resolved shadow string and `allow-keywords` reading for both engines. Shadow geometry retains the elevation factor, and the HTML proof reads `-webkit-text-size-adjust`. Evidence: [u3-report.md:77](C:/Users/mikes/WebstormProjects/veneer/tmp/units/u3-report.md:77), [_tokens.scss:204](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:204), [html.test.ts:9](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/elements/html.test.ts:9).

11. **CONFIRMED — Density limitation.** The guide correctly explains that the scale and factor must be declared together in a subtree. The proofs distinguish root rescaling, subtree factor alone, and subtree factor plus scale. Evidence: [tokens.md:32](C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:32), [tokens.test.ts:162](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:162).

12. **UNDECIDABLE — Guides, including their gate.** The required sections, matching core summaries, links, directory-index explanation, README reference, and integrated Showcase paragraph are present. My comparison found the CSS recipe transcription identical. Evidence: [veneer.md:13](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:13), [veneer.md:81](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:81), [guides/README.md:17](C:/Users/mikes/WebstormProjects/veneer/guides/README.md:17). I cannot independently confirm `test:guides` green under the no-test instruction. Additional behavioral prose defects follow below.

13. **CONFIRMED — Names.** My whole-identifier search found no occurrence of the named core exports or newly added setup exports anywhere in the installed hosted guides, which is stronger than absence from their Surface rows. The report records the checks. Exported helper and constant names follow the required forms. Evidence: [u3-report.md:90](C:/Users/mikes/WebstormProjects/veneer/tmp/units/u3-report.md:90), [setupStyles.ts:245](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:245).

14. **REFUTED — Scope and law.** File scope matches the owned paths plus the integrated patches; the named off-limits paths are unchanged. The changed TypeScript contains no prohibited assertion, `any`, or nested function declaration/assignment.

   It does contain hidden test helpers: `collectNodes`, `collectLayer`, `buildSpecimen`, `collectTripletGroups`, and others. Evidence: [core/index.test.ts:15](C:/Users/mikes/WebstormProjects/veneer/tests/src/core/index.test.ts:15), [styles/index.test.ts:16](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/index.test.ts:16), [tokens.test.ts:41](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:41). These violate [AGENTS.md:67](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:67) and [tests.md:188](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:188). The final tree cannot establish which historical commands ran.

15. **REFUTED — All deviations comply.** D10 records duplicate walks but supplies no exemption from the consolidation/export rules; D9’s browser-import constraint explains the chosen location without authorizing test infrastructure outside its prescribed setup home. Evidence: [u3-report.md:385](C:/Users/mikes/WebstormProjects/veneer/tmp/units/u3-report.md:385), [u3-report.md:400](C:/Users/mikes/WebstormProjects/veneer/tmp/units/u3-report.md:400), [tests.md:184](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:184). D11 also inherits the source-scope conflict in claim 3. D5, D7, D8, and the explicitly documented D12 limitation otherwise fit their stated purposes.

16. **UNDECIDABLE — Reproducible gates.** `npm.cmd run check` reproduced exit 0. The remaining Chromium/Edge results are report evidence only because rerunning test projects or the build was prohibited. Evidence: [u3-report.md:112](C:/Users/mikes/WebstormProjects/veneer/tmp/units/u3-report.md:112). The standing policy failure is not an additional finding.

Additional findings follow.

17. **Broken alpha example.** [tokens.md:82](C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:82) recommends `rgb(var(--vn-color-primary-rgb) / 0.5)`, but the token contains comma-separated channels. Substitution produces `rgb(8, 65, 234 / 0.5)`, mixing incompatible RGB syntaxes. Use the comma-alpha form or change the channel contract.

   **Failure scenario:** copying the guide’s expression into `background-color` produces an invalid color declaration.

18. **Customization overpromises alias propagation.** [tokens.md:175](C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:175) says every derived tier and alias follows an override, but the recipe changes the primary base while its RGB triplet remains literal at [_tokens.scss:18](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:18). The integration proof also omits the claimed emphasis and border results.

   **Failure scenario:** the guide’s green primary override makes `--bs-primary` green while an RGB-based Bootstrap consumer remains blue.

19. **Direction scanner misses physical properties.** The lists at [setupStyles.ts:5](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:5) and [setupStyles.ts:41](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:41) omit `scroll-margin-left`, `scroll-padding-right`, and `text-align-last: right`. Direct calls returned `undefined` for each.

   **Failure scenario:** adding `scroll-margin-left: 1px` passes the scanner while the byte-copied RTL stylesheet retains the physical offset.

20. **Tag-pair detection ignores selector relationships.** [setupStyles.ts:481](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:481) reduces selectors to tag names. Direct calls accepted `details + summary` and `:is(h1)+:is(p)`, while rejecting the independent selector list `h1, p`.

   **Failure scenario:** a prohibited sibling treatment passes because the predicate recognizes an ancestor/descendant name pair without checking its combinator.

21. **The literal-color prohibition remains unresolved.** [_tokens.scss:115](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:115) necessarily declares literal colors, while [styles.md:42](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md:42) says, “Never use literal colors,” without a token-source exception. The planner identified this conflict; the verdict does not resolve it.

   **Failure scenario:** U3 is accepted as contract-compliant while its required value authority still violates the governing rule; this needs an explicit authority ruling.

Verdict: fix round — claims 3, 5, 7, 14, 15, and findings 17–21.