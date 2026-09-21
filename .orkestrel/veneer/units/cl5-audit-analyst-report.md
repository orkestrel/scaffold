CL5 needs a fix round for incomplete token-indirection coverage and duplicated implementation. Selector coverage is complete in the inspected built artifact.

This is a source-and-artifact audit. I ran the existing read-only shared-block sweep; it exited `0` with `result: no shared block`. I did not rerun browser tests, gates, or mutation plants. Historical runs remain report-only.

The claim rulings follow the supplied numbering. Paths below are relative to Veneer unless marked scaffold.

| Claim | Ruling | Deciding evidence |
|---|---|---|
| **1** | **CONFIRMED** | `src/styles/index.scss:44` loads the partials after Button; each uses `@layer components`. Comparing the scoped entries in `tests/fixtures/oracle/inventory.json:4969` onward with `dist/src/styles/index.css:1` finds every required selector, including the compound selectors. Each scoped inventory `properties` object is empty. `guides/veneer.md:769` onward supplies shipped selector rows without variable rows. `tests/conformance.test.ts:55` lists the same shipped population and compares it with `collectShippedComponents` using exact equality at `:78`. |
| **2** | **UNDECIDABLE — historical run is report-only** | The mechanism is sound on inspection: `tests/setupConformance.ts:633` parses CSS and checks each shipped inventory selector; its missing-selector branch names the component and selector. `tests/setupStyles.ts:1862` canonicalizes legacy pseudo-elements, matching the built `.blockquote-footer:before` to the inventory’s `::before`. Scaffold’s `cl5-report.md:173` records the `.initialism` red/green pair; I did not reproduce it. |
| **3** | **REFUTED — forces a fix round** | [type.test.ts:29](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/type.test.ts:29) directly compares each heading class with its tag. That part holds. The retune case at `:55` exercises only `h3`, `.h3`, and `.display-3`. Other levels receive default-value assertions only. It therefore does not prove token indirection at every level. Extend the retune matrix across the heading and display families. An unexecuted counterexample is a default-equivalent literal on `.display-1`: no existing retune assertion observes that level. |
| **4** | **CONFIRMED** | `components/_type.scss:8` reproduces `elements/_heading.scss:8`, including weight, line height, color, and margin. Their size loops select the same tokens. Bootstrap `_type.scss:5` extends the heading tag; `_reboot.scss:79` supplies its shared treatment. `guides/veneer.md:694` records Veneer’s size, weight, and margin departures. Scaffold’s report explicitly records the ruling. |
| **5** | **REFUTED as an absolute claim; no independent fix round** | Heading sizes, weight, and margin are deliberate departures, so “every value … retained from Bootstrap” is false. Those departures are already recorded. After accounting for them, the fixed display sizing, the authorized logical-property substitutions, and existing token bindings, I found no unexplained declaration among the scoped classes. The inventory declarations and installed Bootstrap `_type.scss`, `_images.scss`, `_reboot.scss`, and `_variables.scss` support the remaining values. |
| **6** | **REFUTED on a factual comparison; measurement provenance remains report-only** | The Veneer values agree with the emitted declarations and test expectations. However, the heading row’s Bootstrap fluid-size statement includes `h5` and `h6`: the pinned inventory at `:5003` and `:5087` gives those selectors unconditional `1rem` and `1.25rem`, without a media condition. The display and image comparisons hold. This does not identify an implementation defect or independently force another round. |
| **7** | **UNDECIDABLE — historical run is report-only** | The implementation closes the independent-control gap: literal markup expectations appear in `ContentSection.test.ts:69`, `TypeSection.test.ts:46`, and `MediaSection.test.ts:29`, separate from the rendered-versus-table assertions. The retained plant changes attributes or text without changing names or element names. Scaffold’s report records red then green, but that execution was not reproduced here. |
| **8** | **UNDECIDABLE for the historical control; present component-only result confirmed** | Running `node tmp/sweep-shared.mjs` returned `result: no shared block`. Its inspected implementation compiles the component partials and compares declaration intersections between different partials. Its population excludes `elements/**`; it cannot discharge the cross-layer duplication finding. The planted-control run remains report-only. |
| **9** | **CONFIRMED on implementation** | `TypeSection.ts:22` and `MediaSection.ts:22` implement `SectionInterface`, render their specimen tables, and remove their regions. `Showcase.ts:68` constructs them in the stored sequence; `:42` destroys that sequence. `app/browser/index.ts:6` exports them. They reuse `ContentSpecimen`. Their mirrored proofs cover rendering and repeated destruction. |
| **10** | **REFUTED on law; gate independence is UNDECIDABLE** | The supplied status and diff support the stated implementation scope and barrel-proof exception. The named off-limits implementation files are unchanged. However, the duplication findings below prevent a clean law ruling. The writer’s `tmp/gates.log.txt` and `tmp/edge.log.txt` record `EXIT=0`; they do not establish the claimed independent verifier run or its before/after status comparison. |

The additional implementation findings are:

**11. Cross-layer declaration duplication — forces a fix round.**  
[components/_type.scss:8](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_type.scss:8) repeats the heading treatment in `elements/_heading.scss:8`. Also, `components/_image.scss:4` repeats the fluid-sizing block in `elements/_img.scss:4`. Scaffold’s `.claude/rules/styles.md:45` requires shared patterns to live in `_mixins.scss`.

Failure scenario: changing the element treatment alone leaves the corresponding class treatment on its separately maintained block.

The report’s carried heading finding is real, but incomplete because image sizing has the same issue. Closing this requires an explicit scope grant for the element partials; the component-only sweep does not waive the rule.

**12. Repeated specimen renderer — forces a fix round.**  
[TypeSection.ts:22](C:/Users/mikes/WebstormProjects/veneer/app/browser/sections/TypeSection.ts:22), `MediaSection.ts:22`, and `ContentSection.ts:22` repeat the same mounting and destruction implementation, differing in their copy and specimen inputs. Scaffold’s `.claude/rules/architecture.md:298` requires centralization.

Failure scenario: a mounting correction applied to one section leaves the other sections executing the duplicated, unchanged implementation.

The report’s carried finding is real. Its off-scope dependency requires a successor scope grant, rather than acceptance of the duplicated implementation.

**13. Image fixture remains local and duplicated — mechanical correction; does not independently require another audit round.**  
[image.test.ts:7](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/image.test.ts:7) declares `SOURCE` locally, repeating the SVG fixture embedded in `elements/img.test.ts:16`. The shared-test-infrastructure rule places reusable fixtures in setup.

Failure scenario: changing the fixture dimensions in one proof leaves the related image proof using a different fixture.

The report’s carried mark/caption observation needs qualification. Veneer’s differences are real, and the class declarations retain Bootstrap’s values. But Bootstrap does **not** make bare `figcaption` equivalent to `.figure-caption`: its shipped CSS at `node_modules/bootstrap/dist/css/bootstrap.css:736` explicitly adds smaller, secondary-colored caption text. That observation does not justify a CL5 class correction. The report’s table-placement item is outside this implementation-only audit and contributes no finding.

Verdict: fix round with claims 3, 10, 11, and 12.