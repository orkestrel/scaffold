## Units

Propose parallel component authoring, followed by serial integration and acceptance of the complete family. The pinned inventory shares selectors across `nav`, `navbar`, and `dropdown`; their isolated partials cannot establish complete key coverage.

All paths below resolve against `/home/user/veneer`. Dispatch after CLOSE-GUIDE lands, from a named committed baseline. Each executor works directly, spawns nothing, and writes only its owned files.

### Shared scope and acceptance

Component writers return exact patches for the following shared files. B-DISCLOSURE-INTEGRATE applies those patches serially.

| Shared responsibility | Report-only files for component writers |
|---|---|
| Barrel, assets, and shared Sass mechanisms | `src/styles/index.scss`, `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/_mixins.scss` |
| Specimens and section registration | `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/Showcase.ts` |
| Capture subjects, scenarios, and journeys | `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts` |
| Case tables and shared styles proofs | `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/tokens.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/mixins.test.ts`, `tests/src/styles/integration.test.ts` |
| Enumerations and accounting | `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts` |
| Tailwind and capture variants | `tests/setup.css`, `tests/setupService.ts`, `tests/setupService.test.ts`, `tests/service/tailwind/profiles.test.ts`, `tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/preflight.test.ts`, `configs/app/vite.journey.config.ts`, `tests/config.test.ts` |
| Product record | `guides/veneer.md` |

`ROADMAP.md` remains report-only for every executor; the Orchestrator folds accepted rulings into it.

Off-limits for every writing unit are `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `src/styles/elements/**`, `tests/setupServer.ts`, `tests/fixtures/**`, the manifests and lockfile, `README.md`, and configuration outside the explicit integration grant. The vendored `tests/setupPolicy.ts` and `tests/policy.test.ts` files remain off-limits. Another component unit’s owned files are also off-limits.

Acceptance proceeds cheap-first:

- Check ownership, formatting, lint, and types. These reject an unauthorized file change, malformed registry row, missing export, or invalid section contract.
- Compile the integrated source and run setup proofs. These reject missing barrel entries, incomplete case tables, and incorrect independent expectations.
- Run the scoped styles and section proofs described per unit.
- Run conformance and guide proofs. Removing a recorded selector, changing a declaration without its ledger row, retaining a shipped deferral, adding an unrecorded declaration, or altering recorded priority must fail.
- Run the Tailwind consumer proofs. Reintroducing Tailwind’s conflicting `collapse` utility must fail.
- Run journeys and captures, then review the rendered portfolio. A missing scenario, wrong subject, clipped menu, empty declared region, or mislabeled viewport must fail.

Parallel writers report checks blocked by unapplied shared patches. Their acceptance remains pending until the assembled candidate passes; no writer edits shared files to manufacture an isolated green result.

### B-COLLAPSE

**Keys:** `collapse`, `collapsing`, `accordion`.

**Route:** `opus` on the Opus route named by the launch; correctness audit by `analyst` on GPT-6 Astra.

**Owned files:** Proposed `src/styles/components/_collapse.scss` and `_accordion.scss`; their mirrored `collapse.test.ts` and `accordion.test.ts` files under `tests/src/styles/components/`; proposed `CollapseSection.ts` and `AccordionSection.ts` under `app/browser/sections/`; their mirrored section proofs.

**Shared and off-limits:** The shared scope and exclusions above apply.

**Order:** Author alongside B-DROPDOWN, B-NAV, and B-NAVBAR from the same baseline. Integrate the collapse rules before accepting navbar composition.

**Acceptance and distinguishing mutations:**

- Emit the recorded collapse block without importing Bootstrap Sass or adding the unrelated fade surface. Selector and condition coverage rejects a missing horizontal rule or reduced-motion branch.
- Render closed, shown, vertical collapsing, and horizontal collapsing specimens. Closed-state readings reject removal of `display: none`; shown-state readings reject an unconditional hide rule.
- Use authored inline dimensions only to expose a stationary collapsing state. Separate unstyled probes read the recorded zero dimension, overflow, transition property, and duration. These reject swapping the height and width contracts or masking a defective base declaration with the specimen’s inline size.
- Render expanded and collapsed accordion buttons, ordinary and flush groups, and boundary items. Geometry and pseudo-element readings reject swapped icon assets, missing rotation, incorrect end radii, and retained flush borders.
- Read component variables beside their consumers, retune them on their declaring elements, and read applicable density and radius factors. These reject literal consumer values that bypass the variable.
- Read normal and reduced motion, dark descendants, and nested theme islands. These reject an omitted motion override, a globally inherited asset replacing the component rule, or an unauthorized light reset.
- Section proofs bind specimen membership, authored ARIA, unique targets, and cleanup. Removing a required state specimen or mismatching its ARIA must fail.

**Risks:** An inline collapsing dimension can conceal defective CSS. Accordion dark declarations target `::after`, so reading only the button misses the relevant scope. Hidden subjects require visible surrounding frames.

### B-DROPDOWN

**Key:** `dropdown`; closes the Disclosure-owned relationships in already shipped button-group and input-group surfaces.

**Route:** `opus` on the launch-resolved Opus route; correctness audit by `analyst` on Astra.

**Owned files:** Proposed `_dropdown.scss` and its mirrored styles proof; existing `src/styles/components/_button-group.scss` and `_input-group.scss` with their mirrored styles proofs; proposed `DropdownSection.ts` and its mirrored section proof.

**Shared and off-limits:** The shared scope and exclusions apply. Button size declarations in `_button.scss` remain off-limits.

**Order:** Author in parallel. Accept after B-NAV and B-NAVBAR integrate their dropdown relationships.

**Acceptance and distinguishing mutations:**

- Emit the compiled release’s dropdown selectors and conditions, including split-toggle rules in `_button-group.scss` and the deferred corner rules in `_input-group.scss`. Removing each restored relationship must fail its matched geometry case.
- Render hidden and shown menus, ordinary and split toggles, directional and center wrappers, headers, dividers, text, active items, disabled items, and the legacy dark menu.
- Read placement with and without `[data-bs-popper]`. These cases reject unconditional positioning and incorrect top, bottom, left, right, or spacer declarations.
- Read start/end alignment at each recorded breakpoint using `visitBreakpoint` around the boundary. These reject an off-by-one media condition and a missing responsive modifier.
- Read `--bs-position` directly. Reversing `start` and `end` must fail even when a specimen’s visible position remains unchanged.
- Read caret pseudo-elements, including empty toggles and split toggles. These reject reversed borders, retained split spacing, and a visible trailing caret on a dropstart toggle.
- Pair each input-group threshold with a neighboring child arrangement that must retain its outer corner. Changing `n+3` or `n+4` must fail.
- Read variable overrides, factors, legacy dark values, and pseudo-class paint without activating a menu engine. Missing `.show`, wrong active paint, and ineffective component overrides must fail.

**Risks:** The upstream Sass contains conditional blocks that emit nothing under the pinned build. Source-text copying could add unrecorded selectors. Open menus can overflow every edge of their frame. Cross-key ledger ownership can change when navbar and nav become shipped.

### B-NAV

**Key:** `nav`, including the recorded tab-pane selectors.

**Route:** `opus` on the launch-resolved Opus route; correctness audit by `analyst` on Astra.

**Owned files:** Proposed `src/styles/components/_nav.scss`, its mirrored styles proof, `app/browser/sections/NavSection.ts`, and its mirrored section proof.

**Shared and off-limits:** The shared scope and exclusions apply. Existing card declarations remain with their owner.

**Order:** Author in parallel. Accept with B-NAVBAR and B-DROPDOWN because the inventory includes their relationships.

**Acceptance and distinguishing mutations:**

- Render plain navigation, tabs, pills, underline navigation, fill, justified navigation, disabled controls, active links, parent `.show` states, and active/inactive panes.
- Read `.nav-link.active` separately from each parent-state selector. Removing either spelling must fail.
- Read inactive pane hiding and active pane display with authored classes. Removing the child combinator or active override must fail.
- Read fill and justified distribution with unequal labels and direct-link versus item-wrapped markup. Replacing proportional distribution with equal sizing must fail.
- Read token bindings, local overrides, factors, modes, and reduced motion. Hardcoded consumer paint or a missing transition override must fail.
- Read the tab dropdown corner treatment and the existing card-header integration after assembly. Removing the tab menu adjustment or overriding the card’s active border must fail.
- Section proofs verify static state and ARIA consistency. A pane claiming selection inconsistent with its visible class must fail.

**Risks:** A shipped `nav` row requires selectors emitted by the navbar partial. Tab keyboard handling, activation, events, and focus movement belong to J-ENGINE.

### B-NAVBAR

**Key:** `navbar`.

**Route:** `opus` on the launch-resolved Opus route; correctness audit by `analyst` on Astra.

**Owned files:** Proposed `_navbar.scss` and its mirrored styles proof; existing `_container.scss` and `container.test.ts`; proposed `NavbarSection.ts` and its mirrored section proof.

**Shared and off-limits:** The shared scope and exclusions apply.

**Order:** Author in parallel. Accept on the assembled collapse, nav, and dropdown cascade.

**Acceptance and distinguishing mutations:**

- Move the existing `.navbar > .container*` declaration group into `_navbar.scss`, without changing its selectors or declarations. Retain the container regression readings. A missing container variant or styling a standalone container as flex must fail.
- Render brand, text, toggler, icon, scrollable navigation, closed and shown collapse, active/show links, menus, and every expand modifier.
- Read each expansion boundary at the preceding pixel, exact boundary, and following pixel. Assert wrapping, navigation direction, link padding, menu positioning, collapse display, toggler visibility, and overflow. Moving the threshold or dropping the collapse declaration’s `!important` must fail.
- Cover the unqualified `.navbar-expand` rule independently. Treating it as another minimum-width variant must fail.
- Emit and statically exercise the navbar-qualified offcanvas overrides recorded under this key. Removing a qualified override must fail; these proofs make no claim about the deferred offcanvas engine or its base component.
- Read the explicit dark navbar block independently from the dark descendant toggler rule and the legacy `.navbar-dark` class. Conflating those scopes must fail.
- Read component overrides, factors, reduced motion, and the chosen forced-colors treatment. A declared variable that no longer drives its consumer must fail.

**Risks:** The inherited parent wrapping value differs from a fixed wrapping value. `.navbar-light` emits no CSS in the pinned release. The existing capture widths do not exercise the expanded `xxl` variant.

### B-DISCLOSURE-INTEGRATE

**Keys:** Assembles the family’s cascade keys and records `scrollspy` and plugin deferrals.

**Route:** `sol` on GPT-6 Astra for constrained integration; independent audit by `reviewer` on Opus. The Orchestrator retains acceptance.

**Owned files:** Exactly the shared-file set listed earlier. Component implementation files remain owned by their component units.

**Shared report-only:** `ROADMAP.md` and the family record.

**Order:** Runs serially after component proposals are available. Applies their reviewed patches, produces the assembled candidate, and returns it for scoped verification. Integrate coupled navigation keys together rather than inventing temporary shipped claims.

**Acceptance and distinguishing mutations:**

- Register partials, sections, exports, specimens, capture subjects, and case tables. Removing an export, constructor entry, specimen, or scenario must fail the corresponding independent enumeration.
- Transfer accordion and navbar assets to their recorded component scopes. Remove the exhausted forward-asset mechanism only under the ruling below. Theme proofs reject a component asset still emitted globally or absent at its component.
- Update shipped-key lists, compatibility rows, departures, additions, and Disclosure deferrals. Retaining a deferred selector after emission or assigning a ledger difference to the wrong component must fail.
- Add accepted plugin obligations with an explicit J-ENGINE owner and no claimed proof step. A metadata proof rejects a missing owner, a CSS shipped claim for `scrollspy`, or a plugin row marked shipped.
- Update the Tailwind exclusion recipes and independent candidate floor for `collapse`. Removing that exclusion must expose the conflicting utility in the real paired browser proof.
- Separate generic overflow framing from the validation-tooltip-specific assertion. A clipped dropdown must fail containment; a validation tooltip painted beneath its following control must still fail its existing stacking proof.
- Preserve the filename grammar and add genuine capture variants needed for expanded `xxl` coverage. A frame’s recorded viewport must match its filename.
- Update guide sections by heading after CLOSE-GUIDE lands. Do not restore a complete showcase or stem enumeration.

**Risks:** This unit owns cross-cutting changes omitted from terrain § H, including theme assets, Tailwind recipes, and hanging-frame assumptions. A shared patch changes product behavior and requires independent review.

### B-DISCLOSURE-VERIFY

**Keys:** The assembled family and its explicit deferrals.

**Route:** `verifier` on the native verification tier; rendered review on Opus and correctness review on Astra, with the Orchestrator accepting.

**Owned files:** None.

**Shared report-only:** Every evidence-bearing file and `ROADMAP.md`. All source edits are off-limits.

**Order:** After serial integration and scoped repairs.

**Acceptance:** Run `format:check → lint:check → check → build → test`, the Tailwind service proofs, and `CAPTURE=1` journeys on the accepted candidate. Review the selector/condition-to-proof/specimen/capture matrix and actual portfolio. The distinguishing mutations are the unit cases and integration controls above; a green command without those controls does not establish closure.

**Risks:** Chromium timing and capture cost require a tracked authoritative run after writers exit. Source review alone cannot accept rendered coverage.

## Family rulings

The family record needs the following numbered rulings.

1. **Scope boundary.** Option: static CSS states with J-ENGINE-owned behavior. Cost: demonstrations cannot claim working disclosure, selection, or scroll tracking. Recommendation: bind D41 explicitly; author no engine, listener, event, observer, or behavioral activation proof.

2. **Inventory authority.** Option: derive closure from the pinned compiled inventory rather than Sass file boundaries. Cost: acceptance spans component units. Recommendation: include cross-key selectors, preserve emitted conditions and priority, and omit disabled Sass branches that emit no recorded CSS.

3. **State specimens.** Option: give each class state an authored specimen. Cost: more specimen markup and captures. Recommendation: use this form for disclosure, accordion, tab, menu, and navbar states. Keep `.show` and `.collapsed` in subject names rather than expanding `CaptureState` solely to describe static classes.

4. **Capture registries.** Option: resting class states in `CASCADE_KEYS`, actual pseudo-class readings in the flat `DRIVEN_KEYS` table. Cost: separate subjects for visibly different static states. Recommendation: retain the existing derived stem grammar and avoid per-family driven registries.

5. **Hidden and overflowing subjects.** Option: frame hidden states through their visible specimen region and contain open menus within an authored demonstration area. Cost: captures prove the surrounding presentation; explicit style readings prove invisibility. Recommendation: retain that distinction and verify menu containment on every edge.

6. **Proof matrix.** Option: map inventory selector and condition to owner, proof, distinguishing mutation, specimen, and capture scenario. Cost: explicit coverage accounting. Recommendation: make this matrix mandatory, including cross-partial relationships and selectors with no visible standalone box.

7. **Tokens and assets.** Option: reuse matching existing tokens and store literal glyph assets in the existing Sass maps. Cost: ledger rows for tokenized values and shared-file integration. Recommendation: introduce no canonical token merely to complete this baseline; preserve component-variable overrides on their actual declaring scope.

8. **Theme behavior.** Option: reproduce Bootstrap’s component selectors, including their descendant reach through nested light islands. Cost: a light island can retain an ancestor’s dark glyph. Recommendation: document and prove that limit, following D28; do not introduce an unrecorded reset.

9. **Motion.** Option: preserve recorded CSS transition behavior through the existing mixins and `REDUCED_MOTION` constant. Cost: separate declaration and resolved-style readings. Recommendation: photograph stationary states and defer transition lifecycle behavior to J-ENGINE.

10. **Relationship ownership.** Option: author relationships in Bootstrap’s corresponding partials. Cost: dropdown owns changes to existing button-group and input-group files; navbar owns the container-rule transfer. Recommendation: retain those owners and retire each deferral in the same integrated change that emits its selector.

11. **Accounting.** Option: keep existing departure and addition table schemas. Cost: re-run accounting after the complete shipped set changes. Recommendation: let `attributeSelector` choose the ledger component; record actual enclosing at-rules in `Condition`, with `—` when none exists. A dark attribute selector is part of `Selector`, not a condition.

12. **Guide and ordering homes.** Option: preserve CLOSE-GUIDE’s rule-based Showcase and capture prose. Cost: component sections must carry their own limits. Recommendation: add class sections, file and proof links, compatibility rows, and ledger rows; keep barrel-order policy in § Styles and leave passive-order repair with its carrier.

13. **Integration ownership.** Option: disjoint component files with shared patches applied by a serial integration unit. Cost: isolated authoring does not establish family acceptance. Recommendation: use the assembled candidate for authoritative checks and independently audit integration changes.

## Rulings needed

The Orchestrator must settle these choices before dispatch.

| Unknown | Option and cost | Recommendation |
|---|---|---|
| Static specimens or class-driven scenarios | Class-driven scenarios reduce markup but require state registration, restoration, and stronger correspondence checks. | Use authored specimens for class states. Reserve driven scenarios for CSS hover, focus, and active readings without invoking plugin behavior. |
| Navbar container declarations | Keeping the group in `_container.scss` preserves location but divides navbar ownership; copying it duplicates emitted rules. | Transfer the existing selector group unchanged to `_navbar.scss`. Use a grouped declaration block; no cross-partial placeholder or container mixin is needed. |
| Dropdown relationship closure | Placing every rule in `_dropdown.scss` avoids grants but changes partial ownership and order. | Grant B-DROPDOWN the button-group and input-group partials and mirrored proofs. Restore every Disclosure row in its corresponding partial. |
| Dark assets and theme islands | Retaining global asset aliases leaves the recorded component scopes unproved. Adding light resets changes Bootstrap behavior. | Emit the exact dark component rules, retain nested-island behavior, and remove transferred entries from `$assets`. After the map is exhausted, remove its temporary emission loop and obsolete configuration proof; keep the structural theme file. |
| Literal glyphs and legacy dark classes | Replacing assets with masks or treating `.dropdown-menu-dark` as a theme alias changes baseline output. | Add light assets to the existing `$icons` map, reuse `$dark` assets, and keep legacy class retunes distinct from theme scopes. Record differences produced by the actual compile. |
| Carets and `$enable-caret` | Exposing a Sass option creates an unsupported configuration surface for a CSS-only export. | Ship the pinned enabled-caret output. Keep physical spacing and border directions under D5. Use partial-local structure unless real cross-partial repetition warrants a shared mixin. |
| `--bs-position` and center placements | Invented positioning can make center specimens appear complete while asserting deferred Popper behavior. | Ship and read the recorded property and CSS. Render center wrappers honestly. Defer dynamic centering, flipping, collision handling, and reference geometry to J-ENGINE. |
| `scrollspy` accounting | A shipped CSS row or Deferred selectors entry requires inventory names that do not exist. | Add an accepted non-CSS compatibility obligation with `Proof` set to `—` and `Owner: J-ENGINE` in its obligation text. State that the key has no cascade. |
| Plugin owner-row schema | Adding a `deferred` status or an incompatible table would require reader changes. | Keep the accepted/shipped schema. Add accepted plugin rows for Collapse, Dropdown, Tab, and ScrollSpy, each explicitly naming J-ENGINE and the deferred obligations. Gate that metadata without pretending to prove behavior. |
| Cross-key acceptance | Separate green landings require temporary selector deferrals for navbar relationships recorded under nav and dropdown. | Author in parallel and accept the coupled navigation surface together. Avoid temporary ledger churn. |
| Breakpoints and captures | Capturing inside `visitBreakpoint` under an existing variant can mislabel the actual width. Expanding every boundary into a full journey variant increases capture cost. | Use `visitBreakpoint` for boundary readings at `b−1`, `b`, and `b+1`. Retain existing variants and add genuine light/dark `1400` variants for expanded `xxl` captures. Never relabel a temporary width. |
| Forced-colors focus | Strict shadow-only parity can leave accordion, nav, and navbar focus invisible. | Adopt the existing `forced-ring` treatment at the affected focus selectors, with condition-specific addition rows and real forced-colors readings. Rule this extension before writers apply it. |
| Existing barrel inversions | A total Bootstrap ordering cannot be achieved solely by inserting lines into the existing passive block. | Preserve existing lines, insert the family sequence at the corresponding dependency anchors, and keep total-order repair with B-PASSIVE-ORDER. Record the insertion anchors explicitly at launch. |

The tree resolves or corrects these terrain statements:

- At `87ff1d0`, the family depends on B-PASSIVE-CLOSE, engine carriers belong to J-ENGINE, and E-VUE follows J-ENGINE. Terrain § F’s earlier assignments are superseded by D41.
- The inventory contains the cascade keys and no `scrollspy` entry. It also records navbar selectors under `nav` and `dropdown`.
- `_container.scss` already emits the navbar container combinators.
- The capture loop’s hanging-element branch specifically expects validation-tooltip markup. Adding dropdown menus requires a framing change.
- The global asset map and its theme proof still carry navbar and accordion assets. Their transfer requires the integration grants.
- Bootstrap’s `.navbar-light` source block emits no selector. It earns no invented rule or compatibility addition.

## Files the result makes false

The following set comes from terrain § H plus bounded inspection of the inventory, enumerations, theme assets, capture loop, and Tailwind recipes. The implementation acceptance run must identify any further affected assertion.

| Unit | Assertions or records its result changes |
|---|---|
| B-COLLAPSE | The style barrel, Showcase constructor and export lists, specimen and capture populations, setup case tables, shipped-key enumerations in `tests/conformance.test.ts` and `tests/setupServer.test.ts`, and guide Files, classes, Compatibility, ledger, Tokens, Surface prose, and Tests sections. Accordion also changes `$assets`, `COMPONENT_DARK_ASSETS`, and theme-scope expectations. |
| B-DROPDOWN | Button-group and input-group proofs and comments that withhold split-toggle relationships; the Disclosure rows and related class prose; shared specimen, capture, export, shipped-key, and ledger populations. Open-menu specimens invalidate the journey’s assumption that hanging subjects are exclusively validation tooltips. |
| B-NAV | Shared populations and ledger tables; card prose assigning `.nav-link` to future Navigation work; static pane and selection documentation. Existing card declarations remain valid and receive composition coverage. |
| B-NAVBAR | `_container.scss` ownership of navbar combinators and its mirrored proof; theme asset placement and expectations; the shared populations and ledger; capture configuration lacking expanded `xxl` coverage. The roadmap carrier must distinguish shipped CSS relationships from deferred engine behavior. |
| B-DISCLOSURE-INTEGRATE | Tailwind exclusion recipes omit `collapse`; the candidate floor does not bind that conflict. The exhausted `$assets` mechanism and its configuration proof no longer describe a forward asset population. Guide prose assigning engine generalization to B-COLLAPSE must name J-ENGINE. All affected shared enumerations must reflect the assembled family. |
| B-DISCLOSURE-VERIFY | No authored file. A failing gate returns to the unit that owns the affected capability. |

The browser export list, browser interface tables, and Button-shaped engine implementation remain valid under D41. Update stale scheduling prose without expanding that API.

## Exit criterion

The family ends when these capabilities close:

1. **Cascade coverage:** `collapse`, `collapsing`, `accordion`, `nav`, `navbar`, and `dropdown` satisfy their recorded selector, declaration, variable, condition, and priority obligations, including cross-partial relationships.

2. **Static presentation:** Each required state and variant has an authored specimen, consistent static accessibility attributes, a distinguishing browser reading, and an accepted capture or an explicit hidden-region framing rule.

3. **Responsive presentation:** Navbar expansion and dropdown alignment pass boundary readings; captures include the expanded `xxl` state under an honestly named viewport.

4. **Customization and modes:** Component variables drive their consumers; supported factors, dark retunes, nested-island limits, reduced motion, and the ruled forced-colors treatment are proved.

5. **Relationship closure:** Every Disclosure-owned deferred selector ships from its designated partial and leaves the deferral table. Navbar container rules have a single owner.

6. **Accounting and compatibility:** Departures and additions match the assembled cascade, shipped-key enumerations agree, and standalone, Tailwind, and preflight proofs remain green.

7. **Engine deferral:** `scrollspy`, Collapse, Dropdown, Tab, and ScrollSpy have explicit J-ENGINE owner obligations. No static result is reported as engine completion.

8. **Acceptance evidence:** The integrated candidate passes the authoritative gates, the rendered portfolio receives independent review, and the guide and roadmap state the accepted scope without unresolved family work.

## Journal

Journal: `/home/user/scaffold/tmp/codex/b-collapse-design-analyst.jsonl`

Session id: `01a0ce36-859b-7861-a02c-cccad933d77f`