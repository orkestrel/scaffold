NAVBAR (`nb`) audit, round 1. Lane: **subjective**, `reviewer` on Opus 5.5. This is a read-only source review. I ran nothing, and no capture portfolio was supplied. Where a verdict below says "derivation", it rests on reading source, not on a run.

## Per-claim verdicts

**1. BROKEN.** The error is in the claim's record only. No code change is needed.
- The file sets hold:
  - `/home/user/scaffold/.orkestrel/veneer/units/nb-status.txt:1-5` lists exactly the five named paths.
  - The hunks in `nb-shared.patch` touch exactly the fifteen shared files.
  - `nb-offlimits.patch` touches only `_mixins.scss` and `_nav.scss`.
  - `nb-retirement.patch` touches only the four named files.
  - No patch touches a vendored file, a sibling unit's file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, or `README.md`.
- The claim says "the removals are …" as a complete list, and two code removals are missing from it:
  - `nb-shared.patch:636-658` deletes the `nav case tables` partition that `readDeferrals()` drove: the `withheld` set and its two `expect` lines. These are assertions, not "sentences the patch rewrites".
  - `nb.diff:12` and `nb.diff:16` delete the base theme case's two `--bs-navbar-toggler-icon-bg` assertions.
- Fix: add both removals to the claim's removal list.

**2. BROKEN.**
- The claim says `nb-instruments/nb-gates.log.txt` carries the built-cascade reading (`navbar-light` absent, each `@media (width>=Npx){.navbar-expand-*` block present). It does not.
  - `nb-gates.log.txt:4` reads only `build-src | exit 0 | ✓ built in 1.50s`.
  - `nb-gates.sh:13` keeps only the summary lines, so no instrument recorded that reading.
- The property itself is evidenced another way:
  - The navbar layer case in `navbar.test.ts` holds `NAVBAR_SELECTORS` against the built components layer.
  - That case also refuses any selector containing `navbar-light`. The mutation "a light class rule written" goes red at `nb-mutations.log.txt:13`.
  - The `navbar case tables` case binds `NAVBAR_SELECTORS` to the inventory.
- By reading, the partial covers every group the claim lists:
  - the bar, brand, and list (through the `nav-list` mixin);
  - the current and open link rule, the menu rule, the text, the collapsible content, and the toggler with its mixins;
  - the icon, the `75vh` fallback, and the `breakpoint-each` ramp;
  - both dark spellings, and the dark icon rule reading `tokens.$dark`.
- Fix: point the claim and the report at the layer case and its mutation, or retain an actual grep of `dist/src/styles/index.css`.

**3. UNRESOLVED.**
- Every styles mutation and every section mutation has a retained red reading (`nb-mutations.log.txt:1-17,25-27`, `nb-mutations-2.log.txt:2-4`, `nb-mutations-3.log.txt:1`), with green controls at `46 passed (46)` and `2 passed (2)`.
- By reading `navbar.test.ts`, each assertion tells its mutation apart from the passing case:
  - **Neighbouring boundary:** the ramp case reads the boundary and one pixel below it.
  - **No infix gated at `sm`:** the 375-pixel reading expects `flex`.
  - **`.navbar-dark` dropped:** the class row's `matched` field goes false, and the attribute row stays green.
  - **Asset left at theme scope:** `expect(plain).toBe('')`.
  - **`75vh` missing:** `max-height` must be close to `innerHeight * 0.75`.
  - **Slot reassignment dropped:** the plain link must match `--bs-navbar-color`.
  - **Offcanvas panel or header rule dropped:** the `expanded` object includes `header: 'none'`.
  - **Ring dropped:** the shadow layer must be `[0, 0, 0, 4]`.
  - **`forced-ring` omitted:** `outline-style` must be `solid`.
  - **Transition written bare:** the media conditions must equal `[REDUCED_MOTION]`.
  - **Text inset written as a literal:** the density case expects 16.
  - **`!important` dropped:** only the conformance priority case catches this. The collapse and navbar rules tie on specificity, and the navbar partial loads later, so `navbar.test.ts` cannot tell.
- Two readings rest on the report alone, so the claim cannot be confirmed:
  - The theme case going red first against the `a658879` case (`1 failed | 5 passed (6)`).
  - The retirement asset case's red and green pair.
  - No `nb-mutate*.py` carries a theme mutation, and `nb-retire-gates.log.txt:1-7` records only green runs.
  - To settle it: retain the log of each run.
- Instrument notes for the record (none changes a result):
  - The label at `nb-mutate.py:33` and `nb-mutate3.py:14` reads "declared on a wrapper scope", but the edit deletes the declaration.
  - The "no-infix at sm" edit (`nb-mutate.py:17` with `apply`'s shared closing) wraps the whole loop, not only the no-infix rules. The 375-pixel reading still tells it apart.
  - Two padding runs came before the red one. One crashed (`nb-mutations.log.txt:18-24`) and one matched no test (`nb-mutations-2.log.txt:1`, `40 skipped (40)`). The report cites only the third run.

**4. BROKEN.**

What holds:
- **`container-fluid`:** every bar carries one (`nb-shared.patch:98-128`). This is the release's own navbar markup, and the `.navbar > .container-fluid` combinator ships from the container partial.
- **Labels and states:** every bar has an `aria-label`. The collapsed, opened, and ARIA states match the claim. No specimen carries a script, `data-bs-toggle`, or `style`.
- **Section and suite:** the region is constructed after `NavSection` and is exported and enumerated. `NavbarSection.test.ts` is green (`nb-gates.log.txt:7`) and `test:app` reads `78 passed (78)` (`nb-gates.log.txt:10`).
- **Section proof's mutations** (all red at `nb-mutations.log.txt:25-27`):
  - **Toggler drops `collapsed`:** `toggler.classList.contains('collapsed')` must equal `!open`.
  - **Content drops `show`:** the check that `aria-expanded` matches the content's `show` class goes red.
  - **Specimen drops `navbar-dark`:** the rendered-selector loop requires `.navbar-dark`.
- **Inverted names (D5):** held; see § Attacked and held.

Required changes:
- **(a) The `.card[data-bs-theme="dark"]` choice is wrong for the `Navbar inverted class` specimen.** I rule the Orchestrator's standing ruling on this choice wrong for that specimen. This is a derivation.
  - Where: `nb-shared.patch:120-124` wraps the `.navbar-dark` bar in a dark-mode card, and `NavbarSection.test.ts:123` pins that wrapper.
  - The dark scope sets `--bs-emphasis-color-rgb` to white (`/home/user/veneer-nb/src/styles/_tokens.scss:78-79`).
  - As a result, a plain `.navbar` inside the card already paints its brand `rgba(255, 255, 255, 1)`.
  - The `[data-bs-theme='dark'] .navbar-toggler-icon` rule gives the dark icon through the card either way.
  - If the `.navbar-dark` rule is deleted, the `navbar-inverted-class` row's registered reading (`color` on `.navbar-dark .navbar-brand`, `nb-shared.patch:211-216`) stays `rgb(255, 255, 255)`. The frame moves only by 0.05 to 0.1 alpha steps on the links and the toggler edge.
  - The section proof's own purpose for this specimen is therefore unmet. `NavbarSection.test.ts:35-38` says "a region rendering one spelling alone leaves the other rule photographed by nothing".
  - The family precedent puts a modifier over a dark surface without switching the mode: `Close inverted` sits in a light-mode `.table-dark` (`/home/user/veneer-nb/app/browser/constants.ts:1513`).
  - Recommended fix: add `data-bs-theme="light"` to the class bar (`<nav class="navbar navbar-dark" data-bs-theme="light" …>`). The class then paints the white text over the card's dark surface, and the brand reading turns near-black when the rule is gone. Bootstrap 5.3's navbar color-scheme examples document a light attribute on a navbar.
  - Knock-on edits: assert that attribute in `NavbarSection.test.ts`; update the `NAVBAR_SPECIMENS` docblock (`nb-shared.patch:85-87`) and the guide's region sentence (`nb-shared.patch:1113-1114`).
  - Keep the card as it is for the attribute specimen. Its own attribute is the release's dark mode, and the card is what supplies the surface there.
  - Run that settles it: render the class specimen with the `.navbar-dark,` selector line removed, read the brand's `color`, and expect `rgb(255, 255, 255)` both with and without the rule.
- **(b) The copy calls every state a class.** `NAVBAR_COPY.paragraph` (`nb-shared.patch:72`) says "each state set as a class in markup", but the `Navbar inverted` state is the `data-bs-theme` attribute. Fix: "each state set in markup".

**5. UNRESOLVED.**
- By reading, the registry holds:
  - The rows and selectors match the claim, and each rule writes the property its row reads (`nb-shared.patch:163-255`).
  - The `CaptureSubject` members, `CASCADE_KEYS` rows, and `DRIVEN_KEYS` rows are each appended at their table's end.
  - `NAVBAR_SPECIMENS` sits in the portfolio's declared list (`nb-shared.patch:894`), and no `CaptureState` member is added.
  - The driven states pass the grammar in `tests/setup.test.ts:98-110`.
- Three readings rest on the report alone:
  - the census reading `collapsed`;
  - the probe partial that turned the census green;
  - the navbar journey and resting cascade cases passing on light-390 and dark-1280.
- No journey log is retained under `nb-instruments/`, and no frame was supplied. The frames are NOT-EVIDENCED.
- To settle it: retain the journey logs and the capture portfolio.

**6. CONFIRMED.**
- `nb-shared.patch:259-798` carries every table, doc-comment correction, partition change, and case the claim names.
- The retirement patch drops the undeclared-key case.
- `test:conformance` reads `22 passed (22)` in the stage (`nb-gates.log.txt:11`) and in the retirement copy (`nb-retire-gates.log.txt:7`). That gate is the ledger's equality proof.
- Mutations the `navbar case tables` case tells apart, by reading:
  - **A selector added to `NAVBAR_SELECTORS`:** the set-equality check against the recorded selectors plus `icon` goes red.
  - **A dark value changed:** the per-rule `declarations` equality goes red.
  - **A published property left out of every table:** the sorted closed-set equality goes red.
  - **A length row's pixels changed:** the rem-times-16 equality goes red.

**7. BROKEN.**

What holds:
- **R17:** no guide sentence states script behavior. The state paragraph points at the Collapse and Dropdown `plugin` rows (`nb-shared.patch:1108-1111`).
- **D3:** the limit sentence names only the `xxl` bar, which is correct because the `xl` boundary is 1200 px (`nb-shared.patch:1115-1117`).
- **Positions:** the section, `#### navbar`, compatibility rows, Files row, Additions row, and § Tests link all sit where the claim says.
- **Nav section rewrite:** reads cleanly, and its departure lead-in is removed with the bullet.
- **ROADMAP:** both cells meet R2 and R10.

Required changes:
- **(a) Code tokens without a noun.** Family ruling 12 and `.claude/rules/writing.md` § Code tokens require one. The same guide already writes "the `--vn-factor-density` factor" at `/home/user/veneer-nb/guides/veneer.md:1358`.
  - `nb-shared.patch:1056`: "answer to `--vn-factor-density`" becomes "answer to the `--vn-factor-density` factor".
  - `:1057`: "read `--vn-size-5`" becomes "read the `--vn-size-5` token".
  - `:1094-1095`: "mixes over `--vn-palette-white-base`" becomes "mixes over the `--vn-palette-white-base` token".
  - `:1166`: "retunes `--bs-accordion-btn-icon` and `--bs-accordion-btn-active-icon` under" becomes "retunes the `--bs-accordion-btn-icon` and `--bs-accordion-btn-active-icon` properties under".
  - `:1171`: "`--bs-form-select-bg-img`, `--bs-form-switch-bg`, and `--bs-navbar-toggler-icon-bg` are declared" becomes "The `--bs-form-select-bg-img`, `--bs-form-switch-bg`, and `--bs-navbar-toggler-icon-bg` properties are declared".
- **(b) The Dropdown sentence leaves out the tab menu.**
  - `nb-shared.patch:1002-1003` says "the navigation menu names ship from the navbar partial".
  - The dropdown key also records `.nav-tabs .dropdown-menu` (`/home/user/veneer-nb/tests/fixtures/oracle/inventory.json:42757`, inside the `dropdown` key at line 41033). That name ships from the nav partial.
  - This unit's own `DROPDOWN_SELECTORS` doc (`nb-shared.patch:277-279`) says "tab, and navbar relationships".
  - Fix: "the tab and navbar menu names ship from the nav and navbar partials". Carry the same wording into the landing's TOGGLES merge.
- **(c) A sentence that fails a first read.**
  - `nb-shared.patch:1057-1059`: "because no scale token resolves to the one and the published focus width is a narrower ring than the other".
  - Split it: "The brand's `0.3125rem` block inset keeps the release's literal, because no scale token resolves to it. The toggler's `0.25rem` focus width keeps the release's literal too, because the published focus width is a narrower ring."

**8. BROKEN.**

What holds:
- **Code law:** the delta adds no `any`, no assertion beyond `as const`, no `!`, no suppression, no mock, no nested function beyond direct callbacks, and no new exported helper.
- **SCSS:** no literal color.
- **The `nav-list` cut is the right boundary.**
  - Bootstrap sets `--nav-link-padding-y` and `--nav-link-font-weight` from the same `$nav-link-padding-y` and `$nav-link-font-weight` variables in both lists (`node_modules/bootstrap/scss/_nav.scss:9,11`; `_navbar.scss:89,91`).
  - The navbar list builds on `.nav`, so the list reset belongs to that one shape.
  - The inline inset, the colors, and the wrap or stack diverge in the release, so each caller keeps them.
  - A cut carrying only the two slots would also clear the gate, at an overlap of 4. I reject it, because it splits one release shape across a mixin and two inline copies.
  - The name matches the tree's noun-pair mixins (`box-reset`, `list-space`, `code-surface`).

Required changes:
- **(a) Code tokens without a noun in comments and doc blocks.**
  - `/home/user/veneer-nb/src/styles/components/_navbar.scss:71`: "A link carrying `show` is the toggle of an open menu, and it paints as the current link."
    - This also restates the script-meaning wording that the NAV fix round removed from `_nav.scss` (`b-collapse-nv-report-2.md:110-112`).
    - Fix: "A link carrying the `show` class paints as the current link."
  - `nb-shared.patch:81`: "whose toggle and menu carry `show`" becomes "carry the `show` class".
  - `nb-shared.patch:367-368`: "the toggle and the menu carry `show`" becomes "carry the `show` class".
- **(b) The mixin comment is false for one caller.**
  - `nb-offlimits.patch:9` says "Each caller declares its own inline inset, link colors, and direction". The `.nav` rule declares `flex-wrap: wrap` and no direction (`nb-offlimits.patch:40`).
  - Fix: "and its flex flow".
- **(c) A report gate row matches no log.**
  - The `npm run build:src` row in the report (`b-collapse-nb-report.md:146`) states a cascade reading that no log carries (`nb-gates.log.txt:4`; see claim 2).
- **(d) Three deviation records lack the required fields.**
  - D6 has no Expected field (`b-collapse-nb-report.md:63-76`).
  - D7 has neither Expected nor Done or Not done (`:78-83`).
  - D8 is one sentence with no Expected, Found, or Evidence fields (`:85`).
- **(e) Two recorded choices are not bounded.**
  - The card choice (`:89`) states no cost. Claim 4(a) shows that the card masks the class retune.
  - The dropdown compatibility cell's change (`:100`) is recorded as column-width housekeeping. It is in fact the correction that makes the cell true: the navigation names no longer stay withheld.

Counts the report states, recorded for the file:
- "two changes are returned as patches" (`b-collapse-nb-report.md:13`).
- "(new, 235 lines)", "(new, 621 lines)", "(new, 20 lines)", "(new, 151 lines)", and "(+7 −3)" (`:108-112`).
- "One earlier `npm run test:setup` run … timed out once" (`:158`).
- Quoted result lines are measurements of the run that produced them, so they are allowed. These are the diff-stat output at `:118` and every "Tests … passed" or "failed" line.

## Findings outside the claims

None beyond the claims.

## Attacked and held

- **D5 names:** `Navbar inverted` for the attribute and `Navbar inverted class` for the class.
  - Attack: the precedent pair `Close refused by attribute` / `Close refused by class` (`/home/user/veneer-nb/tests/setup.ts:183-184`).
  - Why it held: Bootstrap 5.3 makes the attribute its canonical dark spelling and deprecates the class, so an asymmetric pair is justified. Both Close spellings are current, which is why that pair is symmetric.
- **`Navbar opened` versus the Collapse region's `shown`:** these names come from the brief's criterion 6, not from the unit.
- **The guide names "the Offcanvas unit of B-MODAL … B-CAROUSEL":** this has guide precedent (`guides/veneer.md:4227` names B-PASSIVE-CLOSE-B) and follows R10's wording.
- **The ledger's `color-mix( in srgb, … )` spacing:** this is the comparison's output and matches the `btn` rows.
- **The `.navbar-text` inset through `--vn-space-4`:** required by family ruling 5.
- **`breakpoint-each` placing the no-infix rules first:** bounded in the report; the classes are disjoint.
- **The new ROADMAP Item cell "Navbar offcanvas panel rendered without a specimen":** reads oddly next to R10's "rules … proved without a specimen". Optional polish; no change required.

## Referrals

To the Orchestrator:
- **R16 and ruling 9 still carry the old text.** D3 is accepted, but R16 at `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md:84-86` and family ruling 9 at `units/b-collapse-family.md:64-65` still name the `xl` bar.
- **Capture round, `Navbar expanded` at 390 pixels.** This is a derivation. The bar never collapses, carries a brand and four row links, and its list does not wrap. That is roughly 700 px of content in a 390 px frame, and no showcase or journey check measures horizontal overflow.
- **Capture round, `Navbar scroll`.** Its four links fall far below `75vh` of the 844-pixel-tall variants, so no frame shows the clamp. The guide records the `xxl` limit but not this one.
- **NAV precedent.** The same missing token nouns are in `guides/veneer.md:1464` ("answer to `--vn-factor-density`") and in NAV's docblock ("carry `show`"). They need a carrier unit outside NAVBAR.

To the objective lane:
- The instrument notes under claim 3.

VERDICT: FAIL 1, 2, 3, 4, 5, 7, 8; outside the claims: none
