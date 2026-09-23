# B-FORMS-CLOSE design — analyst proposal (objective lane, GPT-6 Astra through `codex exec --sandbox read-only`)

Retained verbatim from `tmp/codex/b-forms-close-design-analyst-last.md`; journal retained by session id `01a0cd42-b946-7ec2-9d59-4388aa37f5b5` (launch journal `tmp/codex/b-forms-close-design-analyst.jsonl`, swept at acceptance). The brief is `b-forms-close-design-brief.md` beside this file.

---

## Units

Propose `B-FORMS-CLOSE-SPECIMENS`, followed by `B-FORMS-CLOSE-CASCADE`, then independent host verification. Keep the cascade changes together because the forced-colour rules, range inventory, shared case tables, and ledger must agree.

The inspected checkout is clean at `d02bd46`, after `569076a`. Use `input-text` and `input-border`. The terrain needs these corrections:

- `INPUT_GROUP_CASES` already explains that its property map leaves literal values to value assertions.
- `tests/src/styles/components/form-range.test.ts` also consumes the range `reads` list and must change with its shape.
- Tokenizing the validated swatch’s base width preserves its default width. The existing `81px` assertions do not become false merely because the binding changes.

All paths below resolve against `/home/user/veneer`. The owned sets are disjoint. Shared files remain report-only. Each executor performs its assignment directly and spawns nothing.

### B-FORMS-CLOSE-SPECIMENS

**Role and engine:** `opus` on Opus 5.5, native in the dispatching Claude harness.

**Owned files:**

- `app/browser/constants.ts`
- `app/browser/styles/_shell.scss`
- `tests/setup.ts`
- `tests/setup.test.ts`
- `tests/app/browser/sections/InputGroupSection.test.ts`
- `tests/app/browser/integration.test.ts`

**Shared report-only files:** `guides/veneer.md`, `ROADMAP.md`, `tests/setupBrowser.ts`, and the showcase’s section and export inventories. Return any required guide correction to CASCADE.

**Off-limits files:** CASCADE’s owned files; published styles; capture configuration; manifests; fixtures; scaffold-owned files; every unlisted file.

**Order and dependencies:** Start after the Orchestrator settles tooltip layout and grants the shell file. Complete before CASCADE so its guide update describes the rendered result.

**Acceptance criteria, cheap-first:**

- Formatting, lint, and type checks accept the owned changes. The capture subjects and scenarios include `Input group valid tooltip` / `input-group-valid-tooltip` and `Input group invalid tooltip` / `input-group-invalid-tooltip`.
- Section assertions independently require each named specimen, its visible tooltip, unique control name, and resolving `aria-describedby` association. The invalid specimen exposes its invalid state.
- A shell-owned wrapper reserves space beneath the positioned `.input-group`. The shell changes wrapper layout alone. No inline style, unpublished utility, or override of the tooltip’s shipped treatment enters the specimen.
- The journey requires `display: block`, verifies the tooltip starts beneath its group, and checks that its complete rectangle fits inside the frame and precedes the following specimen. Read the original and lifted copy.
- Place each resting frame through `FRAMES.place(scenario, tooltip, wrapperFrame)`, using the tooltip as the inspected region and the complete wrapper as the captured element. Inspect the captures in the registered light/dark and narrow/wide variants.
- Rewrite the `CASCADE_KEYS` documentation and resting journey title around the registry’s purpose. Remove obsolete fixed inventories without replacing them with another enumeration.
- Rewrite the input-group focus comment to say that the button’s leading border paints over the shared border until the control lifts past it. Preserve the existing keyboard traversal and page-frame proof.

**Proofs and distinguishing mutations:**

| Proof | Mutation it must distinguish |
| --- | --- |
| Specimen and registry membership | Remove either specimen or scenario while leaving its sibling present. |
| Accessible association | Change a tooltip identifier without changing the control’s reference. |
| Tooltip visibility | Remove the matching validation state so the tooltip remains hidden. |
| Placement and reserved space | Remove the wrapper’s spacing, change the tooltip to static positioning, or move its containing block. |
| Capture containment | Capture the group alone, cropping the tooltip beneath it. |
| Existing grouped focus proof | Remove the control’s focus lift; the control must fail to reach the asserted stacking level. |

**Risks:** Visible overflow alone does not enlarge a screenshot’s bounds. Padding on the group changes the containing block against which `top: 100%` resolves; spacing belongs outside it. The tree ships no padding utility suitable for this wrapper, so assuming `.pb-*` exists would fail the class census. Preserve traversal starts after the date control where the existing journey requires them.

### B-FORMS-CLOSE-CASCADE

**Role and engine:** `sol` on GPT-6 Astra, through the Codex writing route. Supply browser and capture measurements from the host when the bench cannot run the required browser server.

**Owned files:**

- `src/styles/_mixins.scss`
- `src/styles/components/_form-control.scss`
- `src/styles/components/_form-select.scss`
- `src/styles/components/_form-range.scss`
- `src/styles/components/_form-check.scss`
- `src/styles/components/_validation.scss`
- `tests/setupStyles.ts`
- `tests/setupStyles.test.ts`
- `tests/src/styles/components/input-group.test.ts`
- `tests/src/styles/components/form-control.test.ts`
- `tests/src/styles/components/form-select.test.ts`
- `tests/src/styles/components/form-range.test.ts`
- `tests/src/styles/components/form-check.test.ts`
- `tests/src/styles/components/validation.test.ts`
- `tests/src/styles/mixins.test.ts`
- `tests/src/styles/fixtures/mixins.scss`
- `tests/conformance.test.ts`
- `guides/veneer.md`

The unit also authors its bounded forced-colour capture instrument under `tmp/units/`. The Orchestrator retains that instrument with the campaign evidence before sweeping temporary files.

**Shared report-only files:** `ROADMAP.md`, SPECIMENS’ owned files, `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/setupBrowser.ts`.

**Off-limits files:** SPECIMENS’ owned files; `_tokens.scss`, `_theme.scss`, `_input-group.scss`, `_form-floating.scss`, and other unlisted partials; published TypeScript; manifests; configuration; oracle fixtures; scaffold-owned files. Preserve D33, D34, D39a, and D40a.

**Order and dependencies:** Follow SPECIMENS and the Orchestrator’s width, forced-colour, literal-reading, and ownership rulings. Complete the guide and measured ledger in this unit.

**Acceptance criteria, cheap-first:**

- Formatting, lint, and type checks accept the complete owned set.
- Retire `INPUT_GROUP_ROUNDING`, its import, loads, export-inventory entry, fixture assertions, and obsolete comments. The group corner proofs use the shipped radii and require positive standalone reference radii before comparing kept and squared corners.
- Give `FORM_RANGE_CASES` a readonly, frozen property-to-reference map. Update its Node and browser consumers. Compare exact property bindings rather than searching joined declaration text.
- Preserve selector-and-condition completeness. Account explicitly for reduced-motion rules and the approved forced-colour additions; do not merge their declarations into normal rules or relax the comparison to a subset. A condition-bearing case shape can follow the existing `FormControlCase` precedent.
- Plant an otherwise unrecorded literal declaration on `.form-control` in an in-memory copy of the real expanded cascade. Run the existing `collectLedger` → `scanLedgerDrift` path against the real inventory, shipped keys, and guide. Require the exact unrecorded declaration addition, with the unmodified cascade as the control. Keep the reader unchanged.
- Bind validated colour width according to the ruling. Read default geometry, a direct token override, and density factors `1` and `2`; restore root overrides after failures as well as successes. Exercise class validation and scoped native validation.
- Add the approved forced-colour treatment to text controls, plaintext controls, selects, checks/radios/switches, and the range host. Preserve normal-media treatments, including the range thumb’s layered shadow.
- Stage `stageMedia({ forced: true, motion: false })`, reach keyboard focus, and read the outline’s style, width, and system-colour result. Cover validation overrides and grouped/floating contexts. Release media in teardown.
- Read the emitted forced-colour declarations as well as the rendered result. Forced colours suppress shadows themselves, so a computed `box-shadow: none` assertion alone cannot prove that the authored reset exists.
- Replace the mixin test’s direct protocol staging and obsolete “no forced-colors axis” explanation with the installed `stageMedia` capability.
- Refresh the departure and addition tables from the existing ledger output. Preserve D39a’s priority gate. Correct the guide’s radius, floating-wrapper, validated-width, range-evidence, and forced-colour explanations.
- Run the scoped setup, style, conformance, and guide checks. Obtain host captures of the forced-colour focused controls, including the range host and grouped control. Treat browser-denied bench commands as observations requiring host evidence.

**Proofs and distinguishing mutations:**

| Proof | Mutation it must distinguish |
| --- | --- |
| Group corners without the fixture | Remove the shipped control/select radius, square an outer corner, or restore an inner corner. |
| Range property bindings | Move a required token to another property while preserving the selector’s token set. |
| Conditional range inventory | Drop a reduced-motion twin, remove a forced-colour rule, or emit that rule unconditionally. |
| Literal-declaration gate | Add `.form-control { isolation: isolate }` inside the components layer. The ledger must report `form-control | .form-control { isolation } | — | declaration`. |
| Validated width | Restore the `3rem` literal: default geometry remains equal, but token-override and density readings fail. |
| Scoped colour validation | Remove the scoped selector while retaining the class selector. Explicitly establish the invalid colour control with native custom validity; its colour value alone does not create that state. |
| Forced-colour focus | Remove a host’s outline, set its width to zero, or omit the plaintext/range host. |
| Media isolation | Move the forced-colour outline outside its media condition, changing normal focus. |
| Shared focus mechanism | Change the existing button caller’s normal or forced treatment during extraction. |
| Validation precedence | Leave a later validation shadow declaration overriding an authored forced-colour reset. |
| Ledger closure | Remove a required recorded addition or retain an obsolete departure row. |

**Risks:** Validation loads after the component partials and writes more-specific focus shadows. Include its focus rules in the forced-colour ruling if the contract requires the authored reset to win. Chromium’s slider-part computed styles do not prove rendered thumb styling; put the forced indicator on the host and retain the existing limits for normal thumb evidence. Under forced colours, `matchesColor` can equate different inputs after browser remapping; compare independently resolved system-colour references directly and read authored bindings separately.

### B-FORMS-CLOSE-VERIFY

**Role and engine:** `verifier` on Sonnet, native on the host.

**Owned files:** None in Veneer. Return command results and artifact paths; the Orchestrator retains the evidence.

**Shared report-only files:** The integrated tree, writer reports, capture instrument, and audit claims.

**Off-limits files:** Every source, test, guide, and configuration file. The verifier reports failures and makes no repairs.

**Order and dependencies:** Follow the integrated writers and their independent `analyst` / `reviewer` audits. Mechanical ownership and carrier accounting receive a checker reading. Supply intermediate host browser readings when CASCADE’s bench cannot obtain them.

**Acceptance criteria, cheap-first:**

- Confirm the diff stays within the ownership sets and the intended test files are collected.
- Run `npm run format:check` → `npm run lint:check` → `npm run check` → `npm run build` → `npm test`.
- Run `CAPTURE=1 npm run test:journey` across the declared variants and inspect the tooltip frames.
- Execute the retained forced-colour capture instrument and inspect its focused subjects.
- Confirm every named mutation produced its intended failure and the restored tree passes the corresponding check.

The verifier executes the mutations and proofs specified by the writers; it introduces no additional proof population.

**Risks:** Use the brief’s npm 11 path. Schedule authoritative runs after writers exit. A timeout, denied listener, or uncollected case is not evidence about the behaviour being tested.

## Rulings needed

The Orchestrator must settle the following choices before dispatch.

| Unknown | Options and cost | Recommendation |
| --- | --- | --- |
| Tooltip frame and overflow | A frame over the group alone crops absolutely positioned content. A surrounding wrapper needs shell layout and containment assertions. | Reserve token-backed space on a wrapper outside `.input-group`; capture that wrapper with the tooltip as the inspected region. Keep `position: absolute; top: 100%` unchanged. |
| Validated colour width | Retaining the literal preserves the density mismatch. Tokenizing its base adds override/density proof and changes the width ledger entries. | Use `calc(var(--vn-space-24) + 1.5em + 0.75rem)`. Preserve the relative icon-room terms. |
| Whole `focus-ring` or forced branch | Whole-mixin adoption changes ordinary outline declarations and adds normal shadows where plaintext and range hosts have none. Copying the branch across partials duplicates a shared decision. | Extract the forced branch into a shared mixin, with `focus-ring` delegating to it, and reuse that branch in forms. Preserve ordinary output. Grant `_mixins.scss` and its proofs explicitly. |
| Forced-colour population | Limiting the change to select and range leaves other classed controls that suppress outlines without an indicator. Thumb-only range treatment retains the inaccessible measurement surface. | Cover every forms host that suppresses its outline, including plaintext. Put the range’s forced indicator on its host. Include validation focus overrides so the authored reset survives their precedence. |
| Literal-declaration reading | A retained observation satisfies the carrier if the existing gate reports the plant. A permanent conformance case additionally preserves the real form-control path as a regression. | Add the small in-memory conformance plant. Reuse the existing reader; “adds the reading where none does” requires no replacement accounting mechanism because that reading already exists. |
| Shared-file restrictions | The family’s append-only and off-limits rules prohibit several required retirements and rewrites. Leaving them unchanged stops the writers. | Grant the named files as exclusive ownership for these units, including bounded rewrites and deletions. Keep all other shared files report-only. |

For the width ruling, an in-memory Sass compilation produced `calc(var(--vn-space-24) + 1.5em + 0.75rem)`. Record that Veneer value as `tokenized` for the class-valid, class-invalid, scoped-valid, and scoped-invalid width entries, retaining Bootstrap’s recorded value.

The existing swatch fixtures omit `.form-control`. At their declared `14px` type and a `16px` root, the expected width remains `81px` at density `1` and becomes `129px` at density `2`. A composed `.form-control.form-control-color` fixture uses `16px` type, giving expected widths of `84px` and `132px`. These are proposed browser expectations, not measured browser results from this lane.

Record the forced-colour declarations under their actual media condition. The existing additions reader treats properties on an inventory selector at an unrecorded condition as declaration additions; do not describe the change solely as ordinary value departures.

D20’s driven-table consolidation remains with B-PASSIVE-CLOSE. The obsolete Button capability sentence may be corrected to acknowledge the installed `forced` option, but that correction must not claim an unperformed Button-specific proof.

## Files the result makes false

The terrain and inspected consumers give the following closure set.

| Unit | Statements, assertions, or structures invalidated |
| --- | --- |
| SPECIMENS | `app/browser/constants.ts`: the input-group tooltip omission and the validation commentary that needs to identify where tooltip specimens live. |
| SPECIMENS | `tests/app/browser/sections/InputGroupSection.test.ts`: the fixed specimen list and null tooltip assertion. |
| SPECIMENS | `tests/setup.ts`: omitted capture subjects/scenarios and the restricted `CASCADE_KEYS` prose. |
| SPECIMENS | `tests/setup.test.ts`: registry expectations where explicit membership is added. |
| SPECIMENS | `tests/app/browser/integration.test.ts`: the restricted resting title, absent tooltip containment readings, and outer-column focus comment. |
| SPECIMENS | `app/browser/styles/_shell.scss`: layout documentation must accommodate the wrapper’s reserved space while preserving specimen paint ownership. |
| CASCADE | `tests/setupStyles.ts`: the rounding fixture and its doc block; the range list-shaped `reads` contract. The renamed input-group map explanation already holds. |
| CASCADE | `tests/setupStyles.test.ts`: the fixture export/freeze assertions, joined-token range comparison, and exact range condition population. |
| CASCADE | `tests/src/styles/components/input-group.test.ts`: fixture imports/loads and the claim that the control awaits a shipped radius. Preserve the true distinction between the borderless floating wrapper and its bordered child. |
| CASCADE | `tests/src/styles/components/form-range.test.ts`: iteration over the old `reads` list and any selector-only lookup used for condition-specific assertions. |
| CASCADE | The owned focus partials and their proofs: unconditional descriptions of outline suppression and the absence of forced-colour readings. |
| CASCADE | `_validation.scss` and `validation.test.ts`: literal width binding and missing retune proof. Default `81px` expectations remain valid for their existing markup. |
| CASCADE | `tests/src/styles/mixins.test.ts`: the assertion that `MediaOptions` lacks a forced-colour axis. |
| CASCADE | `guides/veneer.md`: consumer-supplied radius, unrendered floating treatment, validated-width mismatch, width departure cells, forced-colour accounting, and the obsolete Test capability explanation. |
| VERIFY | No product file. A failing result invalidates the corresponding completion claim and returns to its owning unit. |

## Exit criterion

B-FORMS-CLOSE ends when these capabilities close:

- Validation tooltip specimens render, announce their associated text, and receive complete resting frames without overlap or clipping.
- `INPUT_GROUP_ROUNDING` and every dependency on it are retired; corner proofs use shipped radii.
- Input-group prose describes the shipped borders, floating wrapper, and focus stacking.
- Cascade-key prose describes the registry without a stale fixed inventory.
- Validated colour width follows the settled binding, with default, override, density, and ledger evidence.
- Range bindings are checked per property without losing engine or media-condition coverage.
- A planted unrecorded literal declaration is demonstrably reported by the existing additions gate.
- Forms retain visible keyboard focus under forced colours, with ordinary-media behaviour preserved and rendered evidence supplied.
- Independent audits and host gates accept the integrated result, and the Orchestrator closes each corresponding `B-FORMS-CLOSE` carrier row.

## Journal

Journal: `/home/user/scaffold/tmp/codex/b-forms-close-design-analyst.jsonl`

Session: `01a0cd42-b946-7ec2-9d59-4388aa37f5b5`