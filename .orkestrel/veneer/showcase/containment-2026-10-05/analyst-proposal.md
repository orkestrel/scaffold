## Design

Recommend **(c), a narrowly bounded hybrid**:

- Remove structural `w-100` from elements that already carry `ratio`. The component supplies `width: 100%`.
- For every other structural percentage use, retain Bootstrap’s spelling under `bootstrap` and select Tailwind’s fraction or full spelling under both Tailwind faces.
- Keep original names on explicit raw reference specimens. They demonstrate the conflict, remain present under every face, and preserve registry coverage.
- Update the corresponding caption tokens when the structural spelling changes.
- Keep the stylesheet partition intact.

This preserves percentage relationships, not identical pixel dimensions across faces. Padding, typography, and mapped tokens still affect available space.

The corrected recipe premise is confirmed: [tests/conformance.test.ts:2334](/home/user/veneer/tests/conformance.test.ts:2334) asserts the sorted registry-plus-`TAILWIND_CLASSES` union, then compares both committed fields with compiles over that list.

For references below, repository-relative paths resolve under `/home/user/veneer`; scaffold paths are absolute. “Flip verdict” names [design-verdict.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md).

The structural spelling map is:

| Bootstrap | Both Tailwind faces | Percentage intent |
|---|---|---|
| `w-25` | `w-1/4` | Quarter width |
| `w-50` | `w-1/2` | Half width |
| `w-75` | `w-3/4` | Three-quarter width |
| `w-100` | `w-full` | Full width, except redundant ratio-stage usage |
| `h-25` | `h-1/4` | Quarter height |
| `h-50` | `h-1/2` | Half height |
| `h-75` | `h-3/4` | Three-quarter height |
| `h-100` | `h-full` | Full height |
| `top-50` | `top-1/2` | Half the containing block’s height |
| `top-100` | `top-full` | Its full height |
| `bottom-50` | `bottom-1/2` | Half-height bottom inset |
| `bottom-100` | `bottom-full` | Full-height bottom inset |
| `start-50` | `start-1/2` | Half-width inline-start inset |
| `start-100` | `start-full` | Full-width inline-start inset |
| `end-50` | `end-1/2` | Half-width inline-end inset |
| `end-100` | `end-full` | Full-width inline-end inset |

The fraction compile record confirms these spellings, including `h-1/4` and `h-3/4`: [stdout.log:1](/home/user/veneer/tmp/units/journey-cost/runs/containment-fractions-1/stdout.log:1).

## Alternatives

Each option receives a separate ruling.

| Option | Ruling | Deciding constraint |
|---|---|---|
| **a. Invariant markup throughout** | Admissible, but not selected. Removing redundant ratio widths fits. Reconstructing positioned badges, arrows, translated markers, and half-height panels introduces more structural changes than the percentage defect requires. An image’s `max-width` also does not express full-width expansion. | The named component patterns preserve specific anatomy: scaffold `enterprise-bootstrap/references/components.md:152`, `:288`, `:406`. Architecture favors the smallest complete implementation: `/home/user/scaffold/.claude/rules/architecture.md:316`. |
| **b. Face-aware spelling throughout** | Admissible only with a raw-reference boundary. A global replacement that removes original names from their last witnesses fails registry coverage. Mapping a ratio stage’s redundant width also adds unnecessary runtime work. | `tests/app/browser/integration.test.ts:1053`; `src/bootstrap/components/_ratio.scss:4`. |
| **c. Hybrid** | **Selected.** Component-owned ratio width stays static; remaining structural percentages use the map. Raw references retain original names. | `src/bootstrap/components/_ratio.scss:4`; `tests/conformance.test.ts:2334`; `app/browser/Showcase.ts:199`. |
| **d. Enlarge stages around Tailwind’s readings** | Refused as the complete repair. Larger stages cannot make a 400 px alert fill a narrow available width or make a fixed 200 px panel remain half its stage at both viewports. | Brief acceptance criterion at `/home/user/scaffold/tmp/claude/showcase-containment-brief.md:56`; narrow measurements at `tmp/units/containment/census-1.json:655`. |

Option (a)’s progress-inline branch is explicitly in the user’s decision space. The skill’s inline-style restriction does not independently veto that authorized option. The selected design uses class spellings for progress and needs no inline-style exception.

## Constraints

The following constraints decide the implementation.

| Constraint | Evidence and consequence |
|---|---|
| Shared utilities remain Tailwind-owned. | Flip verdict `:7`: Bootstrap yields by absence. No percentage restoration rule, important fraction override, or change under `src/**` enters this repair. |
| Faces retain their stylesheet definitions. | `app/browser/types.ts:5`; `app/browser/Showcase.ts:14`. Spelling changes supplement the existing stylesheet switch. |
| Every registry name remains demonstrated. | `tests/app/browser/sections/integration.test.ts:58`; `tests/app/browser/integration.test.ts:1053`. Preserve sizing matrices and add raw inset references before replacing the last structural occurrence of an inset name. |
| The candidate list controls compilation. | `tests/conformance.test.ts:2334`; `guides/veneer.md:2325`. Add adopted spellings to `TAILWIND_CLASSES`, regenerate both compiles, and rebuild the page. |
| Ratio already owns full width. | `src/bootstrap/components/_ratio.scss:4`. Remove redundant structural `w-100` there; retain raw utility targets elsewhere. |
| Captions undergo factory normalization. | `app/browser/factories.ts:622`. Bind caption tokens after normalization, or preserve bindings through `createClassList`; replacing source text alone is insufficient. |
| Runtime work preserves mounted nodes. | `guides/veneer.md:2382`; `app/browser/main.ts:9`. Change owned class tokens and caption text without rebuilding sections, restarting the engine, or replacing controls. |
| Constants and behavior have separate homes. | `/home/user/scaffold/AGENTS.md:60`; `/home/user/scaffold/.claude/rules/architecture.md:44`. Export the frozen map from `constants.ts`; put document mutation in `Showcase` methods. |
| Browser census has an escaped-selector limit. | `node_modules/@orkestrel/test/dist/src/browser/index.js:2196`; `guides/veneer.md:2344`. Fraction tokens need explicit expected census limitations plus resolved-value proofs. |
| Node recipe census handles escapes. | `tests/setupServer.ts:1286`; `tests/setup.ts:2116`. The conformance case needs no parser or assertion change for fraction candidates. |
| Existing partition grouping assumes stable class signatures. | `tests/app/browser/integration.test.ts:1455`. Include the canonical percentage binding in signature identity, so a mapped structural specimen and an unmapped raw witness never collapse into one representative. |
| Proofs measure behavior and retain controls. | `/home/user/scaffold/.claude/rules/tests.md:35`; `/home/user/scaffold/.claude/rules/quality.md:32`. Class replacement alone does not prove containment. |
| Installed primitives take precedence. | `/home/user/scaffold/AGENTS.md:45`; `tests/setupBrowser.ts:1347`. Reuse `applyFace`, `applyTheme`, `resolveSpecimen`, `readStyle`, and published journey/census helpers. |
| Landing follows journey-cost acceptance. | Brief `:25`. Run the candidate’s journey gate after that dependency clears; claim no timing improvement. |

## Refusals

These refusals apply to implementations of the options, not to invented prohibitions against an entire admissible option.

- **Refuse a CSS counter under any option.** Flip verdict `:7` states: “Bootstrap yields by absence.” Brief `:36` places `src/**` and the partition proofs off-limits.
- **Refuse unbounded replacement under (b) or (c).** Documentation requires: “Demonstrate public API in application source” at `/home/user/scaffold/.claude/rules/documentation.md:26`. Removing the final raw witness violates that requirement and the registry census.
- **Refuse clipping as the structural repair.** The utilities reference states: “Do not add `overflow-hidden` to an ancestor to conceal a layout bug” at `/home/user/scaffold/.agents/skills/enterprise-bootstrap/references/utilities.md:362`. Existing overflow demonstrations and explicitly labelled raw measurement frames retain their separate purpose.
- **Refuse (d) as sufficient.** The brief requires “panel width equals half the stage width under every face” at `:56`. Accommodating fixed Tailwind dimensions does not establish that relationship.
- **Refuse a replacement census implementation merely to recognize fractions.** `/home/user/scaffold/AGENTS.md:45` states: “Reuse a primitive whose semantics match; never wrap one to rename it.” Keep the installed census and document its exact limitation; resolved reads establish fraction behavior.
- **Refuse hidden token fixtures introduced solely to satisfy registry coverage.** `/home/user/scaffold/.claude/rules/tests.md:37` states: “Never assert an implementation against itself.” Raw references remain named demonstrations with independent value assertions.

## Measurements

The supplied census run identifies Chromium `141.0.7390.37`, the bundled executable, and the built showcase: [start.json:3](/home/user/veneer/tmp/units/journey-cost/runs/containment-census-1/start.json:3). Its viewport height is 900 px, from `census.ts:32`; the journey variants use 800 px and 844 px heights.

The record supplies these readings:

| Width | Face | Reported escapes | Z-index stage | `z-3` panel |
|---|---|---:|---:|---:|
| 1280 | Bootstrap | 1 | 410 × 175.703125 | 205 × 87.84375 |
| 1280 | Unexcluded | 1 | 410 × 175.703125 | 205 × 87.84375 |
| 1280 | Layer | 13 | 400 × 171.421875 | 200 × 200 |
| 390 | Bootstrap | 13 | 308 × 132 | 154 × 66 |
| 390 | Unexcluded | 13 | 308 × 132 | 154 × 66 |
| 390 | Layer | 46 | 324 × 138.84375 | 200 × 200 |

The record contains 328 figures per reading. The built page’s last modifying commit is `4d21de7`.

The tree confirms the shared set contains 209 names. Its 16 percentage conflicts match the brief, while the listed maximum-size and viewport-size utilities are outside that shared set. The oracle records all 16 spacing-multiple declarations at `tests/fixtures/tailwindcss/oracle.min.json:1`.

The usage inspection confirms the intent-bucket counts: 12 full-width images, 12 `progress-bar` widths, 31 translated placements, 16 other absolute placements, 13 `h-50`/`h-100` attributes, and 11 Tailwind-section wrappers. It also finds **three stacked-progress widths on outer `.progress` elements**, at `app/browser/sections/progress.html:191`, `:201`, and `:211`.

The brief and tree disagree at these points:

| Expected in brief | Tree reading | Consequence |
|---|---|---|
| 312 tokens inside 264 class attributes | 312 matches across whole section text; **286 matches inside 264 class attributes**, across 47 files. Captions account for the difference. | Use the attribute inventory for mutation ownership and a separate caption inventory. |
| Only `factories.test.ts:529` names an affected class | `tests/app/browser/sections/integration.test.ts:240` and `:242` also name `h-100` and `w-100`. | Preserve and extend the chrome guard. |
| Every other token is declared under every face | `tests/app/browser/integration.test.ts:1064` explicitly expects undeclared Tailwind tokens under Bootstrap, plus escaped-selector exceptions under Tailwind. | Preserve the actual census contract, not the brief’s shorthand. |
| Typography overflow occurs under every face | The record contains typography rows under Bootstrap and unexcluded at 390, **none under the layer face**. | Raw escape-count equality is unsuitable. Compare residual findings after narrowly named baseline exemptions. |
| Z-index panels extend 122 px below the card | At 1280, `z-2` has `bottom: 7`; `z-1` has `bottom: -122` and `top: 12`. At 390, those positive escapes are 39 px below and 44 px above. | The brief reverses the sign of the 122 px reading. See `census-1.json:234` and `:246`. |
| `recipe.json` carries correspondences | Its keys are `tailwindcss`, `sheet`, `candidates`, `recipe`, and `unexcluded`. Correspondences live in `tests/fixtures/tailwindcss/comparison.json:222`. | Use the comparison record for correspondence attribution. The corrected compile premise remains true. |
| Main carries F’s uncommitted patch | `git status --porcelain=v1` is empty; HEAD is `737a2f4`, “Close the A8 falsify round’s broken claims through fix unit F.” | Recheck landing dependencies against that commit; do not assume an outstanding patch. |

These readings are complete for the named text and records; candidate rendering remains unperformed. A single explanation fits the discrepancies: the brief combines whole-text counts, rounded geometry, and standing conditions from different inspection moments.

For the brief’s overflow unknown, the **additional** layer-face findings trace structurally to a conflicting name on the element, an ancestor, or a descendant that expands its flex ancestor. The exception is the existing tooltips row’s 7 px top escape, present under every face. The record alone does not establish causal removal; the candidate mutation controls do.

The class-token search finds no statechart action targeting a percentage class. That does not establish geometry independence. The wider dependency includes the wrapping factory proof at `factories.test.ts:526`, signature collection at journey `:1455`, component preservation at `:1135`, and paired engine positioning at `:958`.

Missing readings are candidate geometry, candidate captions, the fraction rules under the complete regenerated recipe, negative-control results, and the candidate journey gate. The screenshots themselves are absent from the supplied file set. The census is a box classifier, not a paint or occlusion measurement: it skips fixed descendants and descendants beneath any non-visible overflow ancestor (`census.ts:52` and `:61`).

## Units

Run these units serially in an isolated worktree under `/home/user/.wave/`. Each executor performs its unit and spawns nothing. Preserve the journey-cost landing dependency.

**Containment proofs, `builder` on GPT-6 Sol.** Own `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and the containment additions to `tests/app/browser/integration.test.ts`. Begin before markup changes to record the named regressions red; finish acceptance after the runtime and record units. Gates run instrument controls first, then focused regression cases, then the touched browser projects.

The containment reader remains a domain-specific four-edge figure comparison. The installed `clipsOverflow` helper reads vertical document clipping; it does not implement this figure census. Reuse installed readers and native rectangles rather than copying their surrounding infrastructure.

The exact regression assertions are:

| Proof title | Assertions and control |
|---|---|
| **`keeps specimen escapes at the Bootstrap baseline under every face and width`** | For each face at 1280 and 390, collect the original census population and report raw findings. Assert the figure population matches the mounted figure identities. After the bounded baseline exemptions below, assert `unexpected.bootstrap` equals `[]`, and each other face’s unexpected findings equal that Bootstrap reading. Plant an escaping descendant in an ordinary figure and require its identity and edge in the result; remove it and require the original result. |
| **`keeps every z-index panel at half its stage under every face`** | For `.z-3`, `.z-2`, and `.z-1`, require `abs(panel.width - stage.width / 2) <= 1` and the equivalent height assertion. Require every panel rectangle within the stage within 1 px. Require the first panel at the stage origin, the middle panel’s center at the stage center, and the last panel at its bottom/end edges. Require stage width equal to its parent’s available content width within 1 px. Restore the original percentage classes under the layer face as the control. |
| **`fills structural full-width specimens under every face`** | Read ratio stages, image widths, ordinary full-width wrappers, and the Tailwind section’s wrappers against their containing content widths. Require differences within 1 px. Keep table-layout subjects in their own bucket rather than assuming a table cell follows block layout. Restore an alert’s raw `w-100` at 390 as the control. |
| **`paints progress widths from their announced values under every face`** | For ordinary progress, compare the inner bar width with `(valuenow - valuemin) / (valuemax - valuemin)` times the progress content width. For stacked progress, compare each outer `.progress` width with that fraction of `.progress-stacked`. Tolerance is 1 px. Restore one `w-25` under the layer face and require failure. |
| **`keeps percentage spellings and captions synchronized through every face transition`** | Exercise every pair of faces, including self-transitions. Assert the expected mapped class is present, its counterpart absent on bound structural elements, caption tokens match, raw references retain their original names, and unrelated engine classes, nodes, values, and focus survive. |
| **Existing registry census** | Retain the exact registry token membership assertion and planted HTML/SVG controls. Add a removed raw-inset witness control that makes the owning section fail. This proof passes on the baseline; it is a preservation gate, not an invented baseline regression. |

The first regression compares **residual findings**, not raw counts. Its exemptions are:

- The row directly inside the figure labelled `tooltips-placements-title`, for its top edge only, bounded by the recorded 7 px plus the 1 px tolerance.
- At 390, the recorded `dl`, `dt`, and `dd` identities inside `typography-documented-description-title`, for their right edge only, bounded by 10 px plus tolerance, under Bootstrap and unexcluded.

Report exemption membership separately. No whole-section exemption applies. No additional edge or descendant inherits an exemption.

On the supplied baseline, residual layer findings number 12 at 1280 and 45 at 390. The z-index width assertion already passes at 1280 because `200 = 400 / 2`; height fails there, and width fails at 390 because `200 ≠ 324 / 2`. These are predictions directly supported by recorded rectangles, not executed test results.

**Specimen bindings and references, `builder` on GPT-6 Sol.** Own `app/browser/sections/*.html`, `app/browser/factories.ts`, `app/browser/constants.ts`, and their factory/section proofs. Depend on the baseline proof reading.

Export a frozen `PERCENTAGE_CLASSES` map containing the preceding spellings. Use an explicit canonical binding such as `data-showcase-percent="w-50 h-50"` on structural targets. Raw references carry an explicit boundary such as `data-showcase-raw`.

Apply this complete bucket assignment:

| Intent bucket | Implementation |
|---|---|
| Structural `.ratio.w-100` stages | Remove `w-100`; retain the ratio component and its existing ratio modifier. |
| Other full-width wrappers | Bind `w-100` to `w-full`, including all 11 wrappers in `tailwindcss.html`. |
| Carousel and engine-state images | Preserve `d-block`; bind width to `w-full`. Do not substitute `img-fluid`, which supplies a maximum rather than full-width expansion. |
| Ordinary progress bars | Bind their existing width percentages through the map. |
| Stacked progress | Bind the outer `.progress` segment width; leave the inner bar’s component behavior intact. |
| Table quarter-width cells | Bind `w-25`; preserve table anatomy and prove the rendered table separately. |
| Truncation and other fractional widths | Bind `w-75`, `w-50`, or `w-25` according to the existing intent. |
| Frozen offcanvas panels | Bind `w-75` or `h-50`; retain frozen engine-state classes and route exclusions. |
| Backdrops and full-height content | Bind `w-100`/`h-100`; preserve their positioned containing blocks. |
| Translated placements, badges, arrows, watermark | Bind the affected inset names; retain zero insets and `translate-middle*`. |
| Other absolute placements | Bind the affected size/inset names without replacing their positioning model. |
| Factory support geometry | Bind container/item `w-100` at `factories.ts:145` and `:183`, wrap-child `w-50` at `:170`, and margin-support `w-75` at `:261`. |
| Registry sizing targets | Keep the original names untouched in the generated size matrices. |
| Raw inset references | Add named reference matrices in `position-utilities.html` carrying every affected inset name without binding. |
| `h-25` and `h-75` | Retain their raw sizing witnesses. No structural fragment occurrence exists; demonstrate their mapped spellings in the Tailwind percentage reference. |
| Maximum/viewport sizes and zero insets | Retain unchanged. |

Audit all 47 inventory files. A file containing only a non-shared maximum-size class needs no mutation.

Add a Tailwind percentage reference specimen carrying every mapped spelling, with captions distinguishing Bootstrap’s absent rule from the percentage rule under both Tailwind faces. This makes every added `TAILWIND_CLASSES` member an actual demonstration under the existing exact token census.

Raw inset frames use explicit bounded measurement viewports, with a centered smaller containing block formed from Bootstrap grid and ratio structure. Their labels remain visible when a raw spacing-multiple marker leaves the viewport. Their captions state that behavior. They do not conceal a defect in an ordinary component specimen.

Gates run map membership and binding classification first, then factory/section tests. Require every affected occurrence to be structural, redundant ratio width, or an explicit raw witness. Preserve unique IDs, references, engine-route exclusions, and the no-authored-style assertion.

**Face projection, `builder` on GPT-6 Sol.** Own `app/browser/Showcase.ts` and `tests/app/browser/Showcase.test.ts`. Depend on the binding unit.

At a face transition, project the immutable canonical bindings into class tokens. Remove both spellings of each bound property, then add the spelling selected by the face. Update bound caption tokens from the same canonical value. Derive the face from the existing stylesheet state; introduce no second face flag.

Mutate no unbound token. Preserve DOM identity, control values, engine state, and stylesheet order. Theme-only changes leave spellings intact. Restart mounts canonical Bootstrap markup; destroy releases the existing mount normally.

Gates run transition, self-transition, theme, restart, and destroy cases first, followed by the complete Showcase test file and `check:app:browser`.

**Recipe record, `builder` on GPT-6 Sol.** Own `app/browser/recipe.json` and its writer under the worktree’s `tmp/units/`. Depend on the final candidate list.

Regenerate the record with the same two compile helpers and sorted union the existing conformance case names. Use a Vitest writer, following flip verdict `:85`. Preserve package and sheet bindings. Do not edit fixture records or conformance assertions.

Gates run the named recipe case first, then `test:conformance`.

**Proof integration, `builder` on GPT-6 Sol.** Resume the proof ownership after the recipe unit.

Keep the existing census token-set equality because the raw and Tailwind reference specimens carry both vocabularies. Under Tailwind faces, extend the known escaped-selector list with these exact tokens:

`w-1/4`, `w-1/2`, `w-3/4`, `h-1/4`, `h-1/2`, `h-3/4`, `top-1/2`, `bottom-1/2`, `start-1/2`, `end-1/2`.

Keep `md:flex`, `mt-[1rem]`, the engine marker, and icon exceptions. Pair every fraction with a resolved-value assertion and a missing-rule control; an expected census limitation never substitutes for a working rule.

Include the canonical binding in partition signature grouping. Read winners against the actual class tokens of each face. Keep all shared-name membership represented by raw witnesses, and retain the existing planted partition controls.

Gates run setup controls, focused geometry cases, factory/section/Showcase files, `test:setup:browser`, and `test:app:browser`, followed by the required `test:journey` pass through the host queue.

**Guide and artifact, `builder` on GPT-6 Sol.** Own `guides/veneer.md` within Showcase/Faces, `ROADMAP.md`, and regenerated `showcase/browser.html`. Depend on candidate proof results.

Apply these exact guide changes:

- Replace the opening at `guides/veneer.md:2081` with:

  > The showcase demonstrates every Bootstrap registry name under three stylesheet faces. Structural specimens preserve their percentage dimensions and offsets by selecting the spelling each face provides. Raw reference specimens retain the original names and expose their different values. The markup carries no stylesheet of its own and no authored style attribute.

- Extend the caption sentence at `:2103` with:

  > A structural specimen’s caption names its active percentage classes. Raw reference captions keep the literal names they measure.

- Replace the same-markup sentence at `:2163` with:

  > The faces share one mounted DOM. A face switch replaces the stylesheet elements and selects percentage spellings on explicitly bound structural specimens and their caption tokens. Raw reference specimens keep their class names.

- Add beside that paragraph:

  > A ratio stage takes its full width from the ratio component. Other structural percentages use Bootstrap’s numeric names under Bootstrap and the fraction or full spellings in the percentage table under both Tailwind faces.

- Replace the signature description at `:2206` with:

  > The partition groups elements by tag, canonical percentage binding, class signature, nearest color-mode attribute, and open state. It reads the active class tokens under each face; raw references keep every shared name represented.

- Extend Class coverage at `:2278` with:

  > The sizing matrices and raw inset references retain every original percentage name. The Tailwind percentage reference carries every mapped spelling, including spellings absent from Bootstrap’s sheet.

- Extend the candidate-field sentence at `:2325` with:

  > The Tailwind candidate constant includes the percentage spellings used by structural specimens and the percentage reference.

- Replace the escaped-selector explanation’s exact exception list at `:2344` with:

  > Under both Tailwind faces, the browser census reports the fraction spellings in the percentage table, `md:flex`, and `mt-[1rem]` as undeclared because its selector reader stops at an escape. The recipe conformance case reads their emitted rules, and the percentage proofs read their resolved values. The census retains this exact limitation beside its engine-marker and icon exceptions.

- Replace the opening interaction sentence at `:2382` with:

  > Every specimen interacts as its displayed markup does on a consumer’s page. The showcase additionally selects percentage spellings when the stylesheet face changes.

Keep the consumer statement at `guides/veneer.md:1321` intact. It remains true about consumer markup that retains a shared name.

Add this roadmap sentence to the Showcase record:

> The containment repair keeps component-owned ratio widths static, selects percentage spellings on structural specimens, preserves raw shared-name references, and proves containment and percentage geometry under every face at the declared widths.

For the scaffold-owned flip verdict, return these amendments verbatim:

**Ruling 8 replacement:**

> Chrome retains the Bootstrap-only replacements for `h-100`, card-body `w-100`, `gap-3`, `rounded`, and `border`. Remaining chrome spacing reads the selected face’s scale. That acceptance does not extend to structural percentage dimensions or offsets: ratio stages take their component width, and other structural percentage uses select the spelling declared by the active face.

**Ruling 14 replacement:**

> Shared percentage names retain Tailwind’s spacing-multiple meaning under the layer, as R1 requires. Raw sizing and inset references demonstrate that meaning. Structural specimens preserve percentage intent through the published spelling map, including their factory-built elements and caption tokens. Every adopted Tailwind spelling enters the candidate constant and both committed compiles.

**Chrome paragraph replacement for its specimen clause at `:79`:**

> Inside specimens, a ratio stage uses the ratio component’s full width. Other structural percentage uses retain Bootstrap’s numeric spelling under Bootstrap and select Tailwind’s fraction or full spelling under both Tailwind faces. Raw reference specimens retain the original names. The showcase changes markup spellings and adds no CSS counter.

**Ruling 4 clarification:**

> Bootstrap’s documented consumer markup that retains a shared name reads Tailwind’s meaning under the recipe. The layer repairs none of those names. The showcase’s structural spelling selection is application behavior.

Gates run guide parity, app build, showcase rebuild, and the candidate’s named containment readings against the rebuilt artifact.

**Acceptance review, `reviewer` on Opus; gates, `verifier` on GPT-6 Sol.** Own no source. Review the numbered behavior claims, raw-reference boundary, census exceptions, caption truth, and lifecycle preservation. Run scoped checks independently, read outputs without filtering, and record the required journey result. The Orchestrator applies scaffold amendments and accepts landing after the journey-cost dependency clears.

## Tensions

The design preserves both useful component geometry and visible evidence of incompatible shared names. Those goals require an explicit distinction between structural specimens and raw references.

The same-DOM promise survives; the same-class-list promise does not. The guide states that change directly.

The literal raw census cannot equal Bootstrap’s at 390 while typography remains outside scope: the supplied layer record has no corresponding typography findings. Equality therefore applies to the bounded residual census. Raw findings and exemptions remain visible in the report.

The reference matrices add teaching content and page height. That is a product cost, not a measured performance result.

## Risks

- Incorrect binding scope can rewrite a raw witness or miss a factory support element. Exhaustive classification and removed-witness controls guard that boundary.
- Caption normalization can discard metadata. Bind after normalization and test nested caption code tokens.
- Fraction classes can disappear from a stale committed recipe while class-list tests stay green. Compile equality and resolved-value controls cover that failure.
- Runtime class changes can alter partition representative selection. Canonical bindings must participate in grouping.
- The geometric census misses clipping and fixed-position failures. Bucket-specific geometry proofs cover those specimens separately.
- Candidate pixels, state continuity, and journey duration remain unmeasured. The design carries no acceptance or timing claim before those readings exist.