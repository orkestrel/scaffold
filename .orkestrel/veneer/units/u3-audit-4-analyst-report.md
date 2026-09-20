The supplied [claims file](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-4.md:18) defines claims 1–11. Its claim 8 concerns the cascade reader, while your dispatch assigns installed-export substitutions to claim 8. I retain the file’s numbering and include the requested substitutions afterward. Veneer paths below are relative to `C:/Users/mikes/WebstormProjects/veneer`.

1. **REFUTED — scanner.** Every explicitly listed input returned the claimed result in memory, and the cases exist at `tests/setupStyles.test.ts:328`. The broader TSDoc claim fails: `matchesLooseTagPair(':is(.title[title="("], h1)+p')` returns `false`; replacing the quoted `(` with `x` returns `true`. Also, `h1[title="("], p` incorrectly returns `true`, while its `x` control returns `false`. Lightning CSS accepts these selectors. `splitTopLevelList` counts quoted parentheses as nesting at `tests/setupStyles.ts:725`; `extractCompoundTags` and `matchesLooseTagPair` consume that result at lines 904 and 962. Make that splitter respect quotation and escapes while preserving the named passing inputs.

2. **REFUTED — normalizer.** The named whitespace-preservation readings passed. However, the valid selector `h1\+p` becomes `h1\ + p` in memory. Lightning CSS preserves the original escaped identifier. The normalizer treats the escaped `+` as a combinator at `tests/setupStyles.ts:773`, contradicting its promise to normalize a complex selector. Preserve escaped characters outside quotations as well.

3. **CONFIRMED — tallies and substitutions.** The case-insensitive sweep over the owned source, setup modules, proofs, fixtures, and guides found only the admitted senses. Examples: fixed comparison arity at `tests/setupBrowser.ts:236`, CSS shorthand grammar at `tests/setupStyles.ts:148`, and named members at `tests/setup.ts:12`. The substitution sweep found permitted uses such as the JavaScript `new` operator, `Courier New`, frequency-qualified `once`, and numeric “below zero.”

4. **REFUTED as worded — include population.** The asset change holds: `_theme.scss:21` iterates `tokens.$assets`, reads `tokens.$dark`, and contains no literal colour. The snapshot buffers are identical; compiling the live Sass in memory reproduces their URL values. But the claim’s restriction to includes **under `src/styles/**`** is false: `role-each` has its source include at `_mixins.scss:60`, with another include in the test fixture at line 33. `reduced-motion` likewise has its source include at `_mixins.scss:11` and a fixture include at line 19. Correct the claim’s population; this evidence does not justify deleting those shared mechanisms.

5. **CONFIRMED — recipe coupling.** `tests/setupStyles.test.ts:519` compares the guide text with `CUSTOMIZATION_RECIPE`. Executed in memory, the comparison passes unchanged and fails after changing the guide’s density value from `1.25` to `1.5`. The negative browser case at `tests/src/styles/integration.test.ts:59` reads the triplet-painted colour before and after loading `FILL_ONLY_RECIPE`, while separately requiring the fill to change. The retained writer control records the triplet mutation’s failing assertion in `scaffold/.orkestrel/veneer/units/u3-report-5.md:230`. I did not rerun that browser control.

6. **CONFIRMED — member wording.** `guides/veneer.md:85` reads: “A group's own value takes the `base` member”.

7. **CONFIRMED — factor table.** `guides/veneer.md:90` excludes the factor table from the `Source` convention. Its introduction names each scale, and the table carries `Token`, `Value`, and `Alias`. The retained legend clause describes target-valued rows including `--vn-text-code`, `--vn-surface-tertiary-base`, and `--vn-focus-color`.

8. **CONFIRMED — cascade reader in the supplied file.** `tests/setupConformance.ts:12` imports the path; line 222 exports the reader. Its case is at `tests/setupConformance.test.ts:62`. Oracle calls occur at `tests/setupStyles.test.ts:421`, `:430`, and `:478`. The rendered hunks at `scaffold/tmp/audit/u3-diff-4.patch:1558` contain only the reader, imports, export expectation, and corresponding case.

9. **CONFIRMED — structural law over the diff.** The TypeScript AST inspection found no prohibited assertions, `any`, added nested function declarations or assigned nested functions, hidden top-level bindings, or forbidden default exports. Public collection shapes are readonly. The rendered patch’s postimage lines match the live files. Placement follows the source and setup rules; `tests/src/styles/fixtures/` contains `mixins.scss` alone. The behavioural documentation failures are recorded under claims 1 and 2.

10. **CONFIRMED — scope.** Every path in the supplied status belongs to the original ownership, the grants in briefs 4–7, or the integrated configuration and distribution patches. Deciding grants: `scaffold/.orkestrel/veneer/units/u3-brief-4.md:116`, `u3-brief-5.md:41`, and `u3-brief-7.md:22`.

11. **UNDECIDABLE — gates.** No retained round-4 verifier report was available. Earlier gate reports concern earlier trees. The writer’s report also leaves distribution to the Orchestrator at `u3-report-5.md:294`.

12. **UNDECIDABLE.** No claim 12 appears in the supplied or retained round-4 claims file. Its authoritative text is needed.

13. **UNDECIDABLE.** No claim 13 appears in those files. Its authoritative text is needed.

14. **UNDECIDABLE.** No claim 14 appears in those files. Its authoritative text is needed.

15. **UNDECIDABLE — Orchestrator’s gate claim.** As instructed, this remains undecidable without a retained verifier report for the audited tree.

For the requested installed-export substitutions, the following are source-level, in-memory substitutions against the named assertions, not newly executed browser results. I read the installed declarations and implementations.

| Local capability → installed rival | Would the named case redden? |
|---|---|
| `SpecimenManager.mount` → `render` | **Yes.** The recorded-container case at `tests/setupBrowser.test.ts:149` requires removal after `clear`; installed `render` records nothing (`node_modules/@orkestrel/test/dist/src/browser/index.js:1299`). |
| `SpecimenManager.load` → `mount(build('style', …))` | **Yes.** The case at line 162 requires `document.head`; installed `mount` appends to `document.body` (`index.js:1295`). |
| `SpecimenManager.clear` → installed cleanup | **No equivalent export exists.** A no-op would fail the removal cases, but that is not an installed-export substitution. |
| `readPaintedColor` → `parseCSSColor` | **Yes.** The modern-colour case at line 175 requires readable channels. The installed reader delegates the computed string to `parseColor` (`index.js:1475`); the retained control records absence for the `oklab` input. |
| `matchesPaintedColor` → `matchesColor` | **Yes.** The case at line 137 explicitly requires the local result to be `true` and the installed result to be `false` for the same mix and recording. |
| `readCascadeSheet` → `readRules` | **Yes, with an incompatible return shape.** The case at line 191 requires stylesheet identity; `readRules` returns a rule collection (`index.d.ts:2132`). It is not a type-compatible replacement. |
| `collectNestedRules` → `readRules` | **Yes.** The case at line 215 requires depth-first order; the installed implementation appends nested rules after top-level rules (`index.js:1867`). |
| `collectScopeProperties` → `findRule`’s declarations | **Yes.** The case at line 252 requires the split scope’s union; the installed lookup returns the first substring match (`index.js:1902`). |
| `collectLayer` → filtered `readRules` | **Yes.** The case at line 205 requires an exception when the cascade is absent; filtering returns an empty collection. |

`extractStyles`, `readContrast`, and `blendColor` return extracted text, a contrast ratio, and a composite colour respectively. Their installed declarations provide no interchangeable replacement for these local capabilities.

Verdict: fix round with claims 1, 2, 4, 11, 12, 13, 14, and 15.