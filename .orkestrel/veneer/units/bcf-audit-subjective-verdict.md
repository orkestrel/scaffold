# Verdict: BCF audit round 1, subjective lane

Lane held: subjective (`reviewer` on Opus 5.5). This engine also wrote the unit (`opus` on Opus 5.5), so I attacked it harder. I edited nothing and ran nothing. I read every frame I cite from `/home/user/veneer-bcf/tmp/capture/states/`.

I also used the frames under `/home/user/veneer/tmp/capture/states/` as a before-fix control. The brief does not name that directory, so its provenance is unverified. It supports the rulings but does not decide any of them.

## Per-claim verdicts

**1. Scope — CONFIRMED.**
- `bcf-status.txt:1-7` lists the 7 owned files and nothing else.
- `bcf-shared.patch` has one target, `guides/veneer.md` (`bcf-shared.patch:1-2`).
- The diff adds no `FRAMES.page` call. The underline case uses `FRAMES.place` (`bcf.diff:287,307`), and the existing `FRAMES.page('nav-base-focus', …)` at `integration.test.ts:1854` is base code.
- `tests/setupBrowser.ts` appears in neither the status nor the diff; it is only imported (`bcf.diff:616,696`).
- I took the Orchestrator's apply check as given.

**2. V2 and V18 — CONFIRMED.**
- **Cause.** `bcf-v2-probe.log.txt:1-25` shows the dark pass's click on the `Dark mode` control. It records `mouseover` on `Scroll depots` at 296,134 and `Dark archive` at 296,134. After staging, the same pointer maps to 51,60. The light pass shows `entered: []` (`:89`).
- **Fix.** `releasePointer()` runs after each mode switch (`bcf.diff:198`), the lift gets a `pt-5` wrapper (`:207`), and the case asserts that no `mouseover` reached a copy (`:219-239`).
- **Mutations.**
  - Padding-only (the release reverted) reddens on `expect([...entered]).toStrictEqual([])`, listing every entered scenario (`bcf-mutation-v2-padding-only.log.txt:84,752`).
  - Fix reverted and release-only each redden the resting case (`bcf-mutations.log.txt:70-85`).
  - The assertions separate each mutation from the pass: 281 entered against none.
- **Frames.** `navbar-scroll--dark-390.png`, `navbar-inverted--dark-1280.png`, and `navbar-inverted-class--dark-1280.png` each show the active link white, the resting links in idle grey, and the disabled link dimmer. The control `/home/user/veneer/tmp/capture/states/navbar-scroll--dark-390.png` shows `Scroll depots` lit.

**3. V3 — CONFIRMED.**
- The proof `NavSection.test.ts:127` ran red at both widths before the fix (`bcf-red-sections.log.txt:355-356`).
- `v3-short-pane` reddens the 1280 case and `v3-menu-tab-third` reddens the 390 case (`bcf-mutations.log.txt:27-41`). The `escaped` array's `toStrictEqual([])` check separates both from the pass.
- All four `nav-tabs--{light,dark}-{390,1280}.png` frames hold the whole menu (both entries and the border). The base 390 control shows the menu running past the right edge.
- The finding F1 covers what this change costs at 390.

**4. V4 and V5 — CONFIRMED.**
- Every shown menu's toggle carries `show`. A search for `dropdown-menu[^"]*show` in `app/browser/constants.ts` finds 5 sites, and each toggle carries `show`.
- Mutations: `v4-toggle-at-rest` reddens `DropdownSection.test.ts:150`, which compares the `menu !== toggle` pairs. `v5-long-labels` reddens the 390 case at `:176` (`bcf-mutations.log.txt:11-25`).
- **Frames.** `dropdown-menu--light-1280.png` shows the toggle in a darker navy than the control's slate. `dropdown-menu--dark-390.png` shows a lighter slate than its control. `dropdown-align-xxl--dark-390.png` and `dropdown-align-sm--light-390.png` show both toggles inside their columns, where the control overruns.
- Adjacent: the 1280 variant of the fit case cannot redden on label length, because a `col-6` at 1280 is wide enough for any label.

**5. V6 — CONFIRMED.**
- **Accordion.** The last-expanded case reads the button at 0 against 5, and the panel at 6. `v6-accordion-last-collapsed` reddens it (`bcf-mutations.log.txt:60-68`). The `accordion-last-expanded--{light-390,dark-390,dark-1280}.png` frames show the last item expanded with rounded outer corners.
- **Underline hover and focus.** The hover frame is shot over the specimen. The focus frame is shot over the `p-2` wrapper holding the lifted specimen (`integration.test.ts:1940`), not over the specimen as brief V6 says; the report records that choice.
  - All four `nav-underline-focus--*.png` frames show the whole ring inside the padding.
  - The `nav-underline-hover--*.png` frames show the `currentcolor` underline.
  - Its named mutation, `v6-underline-unregistered`, reddens it on the registry assertion (`bcf-mutation-v6-underline-unregistered.log.txt:84-98`).
- **Navbar with open menu.**
  - `v6-navbar-collapsed-bar` reddens the hang case and `v6-navbar-no-room` reddens both room widths (`bcf-mutations.log.txt:43-58`).
  - All four `navbar-with-open-menu--*.png` frames show the menu hanging over the card body inside the frame.
  - The replaced assertion expected `closest('.navbar')` to fail `[class*="navbar-expand"]`, which is false for the `navbar-expand` specimen. The DOM query settles that.
- A proof gap goes to referral R1.

**6. V14 — CONFIRMED.**
- The release's `.dropdown-header` rule (`node_modules/bootstrap/dist/css/bootstrap.css:3666-3673`) declares no weight, and neither does Veneer's (`src/styles/components/_dropdown.scss:267-274`).
- The specimen header is an `h6` element (`constants.ts:1995,2071`). The ledger row `guides/veneer.md:6258` reads `reboot | h6 | font-weight | 500 | var(--vn-weight-heading)`.
- The planted row reddens `names no departure the compiled cascade no longer carries` (`bcf-v14-ledger-planted.log.txt:30-39`). The same case passes in the baseline (`bcf-v14-ledger-baseline.log.txt:11`).
- The guide sentence states all of this (`bcf-shared.patch:8-12`).

**7. Accordion derivation — CONFIRMED.**
- The state and corner cases iterate `ACCORDION_SPECIMENS.map` (`bcf.diff:384,433`).
- `accordion-specimen-added` reddens the render-order, state, and corner cases (`bcf-mutations.log.txt:1-9`). An unlisted specimen changes the expected tuple list, so the mutation is distinguished.

**8. Frames and guide — CONFIRMED.**
- Every added and changed frame I opened shows what the report says (see claims 2 to 5).
- Each changed guide sentence reads true against the specimens and the journey:
  - The Dropdown sentence's values are 600 against 500.
  - The Navbar sentence's room holds at both widths, per `navbar-with-open-menu--*.png`.
  - In the Accordion sentence, the last panel carries the outer corners.
  - The Tests sentence covers the release and the padded lift.
- The voice defects in those sentences are finding F3.

**9. Law and report — BROKEN.**
- **Code-token clause fails.** The report leaves code tokens without a following noun, which the brief's Output section and `w2-w3-note-1.md:7-9` forbid:
  - `b-collapse-bcf-report.md:8`: "`:hover` and `:focus` are read again"
  - `:16`: "`applyTheme(DARK)` clicks"
  - `:28`: "`releasePointer` on its own parks"
  - `:60`: "In `DROPDOWN_SPECIMENS`, every shown specimen's toggle carries `show`"
  - `:86` and `:95`: "`CASCADE_KEYS` gets the row …" and "`DRIVEN_KEYS` gets the rows …"
  - `:130`: "the value `500` becoming `var(--vn-weight-heading)`"
  - **Fix:** add the noun each time: "the `releasePointer` function", "the `CASCADE_KEYS` table", "the `500` value".
- **Other clauses hold.**
  - No `any`, no `as`, no non-null `!`, no suppression, and no nested function. The `mouseover` listener is an anonymous argument callback.
  - The added rows are `Object.freeze`d inside their tables.
  - The report uses no temporal word: "above" and "once" at `:34,188` are the permitted senses.
  - Every result line the report quotes matches its log. Some logs are filtered, which is referral R3.
- **Counts the report states (for the record):**
  - `Tests 10 failed | 16 passed (26)`
  - `Tests 26 passed (26)`, twice
  - `Test Files 5 passed (5)`
  - `Test Files 4 passed (4)` and `Tests 287 passed (287)`
  - `Tests 19 passed (19)`
  - `Tests 1 failed | 45 passed (46)`, once per variant
  - The diffstat "7 files changed, 511 insertions(+), 60 deletions(-)" (`:258`), stated without the command that produced it. It tallies a set that can grow.

## Findings outside the claims

**F1 — The `nav-tabs` frames at 390 hide the disabled tab.**
- **What's wrong:** in `nav-tabs--light-390.png` and `nav-tabs--dark-390.png`, the open menu lies over the strip's wrapped second row and covers `Tabs audit`. The control `/home/user/veneer/tmp/capture/states/nav-tabs--light-390.png` shows that tab.
- **Why it matters:** the `NAV_SPECIMENS` TSDoc (`constants.ts:2121`, around "The pane after the strip is the room the menu hangs over") names only the pane as the menu's room, so it does not record the trade.
- **Fix:** add one sentence to that TSDoc. It must say that at the narrow width the menu also lies over the strip's wrapped row, as the release would place it, and that the disabled tab reads in the 1280 frame.

**F2 — The label `Navbar with open menu` does not name what sets the specimen apart.**
- **What's wrong:** `Navbar opened` (`constants.ts:3465-3467`) also carries an open menu (`dropdown-menu show`). The distinguishing fact is that the menu hangs from an expanded bar.
- **Why it matters:** every prose site uses that word:
  - the `NAVBAR_SPECIMENS` TSDoc says "The bar whose menu hangs open" (`:3430`);
  - the `NAVBAR_COPY` paragraph says "whose menu hangs open";
  - the guide patch says "whose open menu hangs over" (`bcf-shared.patch:31`);
  - the case title says "hangs an open menu out of flow".
  The rule "one concept, one term" is broken. The stem also becomes the key that pairs this frame with the counterpart portfolio (`guides/veneer.md:7730`).
- **Fix:** rename it `Navbar hanging menu` with the stem `navbar-hanging-menu`. No existing stem is a prefix of it. Update `constants.ts`, the `CaptureSubject` union and the `CASCADE_KEYS` row in `tests/setup.ts`, and the name list in `NavbarSection.test.ts`.

**F3 — Guide patch voice.**
- **(a) Ambiguous subject in the Navbar sentence (`bcf-shared.patch:33-35`).** "That bar's card body …" follows a list that ends on the offcanvas bar and includes the dark bars, which are "each on a card". **Fix:** "The hanging-menu bar's card body is the room …"
- **(b) V14 sentence (`:8-12`).** The token `600` has no noun, which breaks `w2-w3-note-1.md:7-9` and `writing.md`. The sentence also carries four ideas. **Fix:** split it into three sentences:
  - "The header's weight does not come from the partial."
  - "Neither the release's `.dropdown-header` rule nor Veneer's declares a weight, so a header written as the release's `h6` element takes the heading weight."
  - "The `reboot` row for the `h6` element in § Departures records that departure: the release's `500` value becomes the `var(--vn-weight-heading)` value, which resolves to the `600` weight."
- **(c) Accordion sentence (`:52-55`).** Appositives and embedded "so" clauses hide which items are list members on a first read. **Fix:** give the three specimens their own sentence, then state each consequence in a separate sentence.
- **(d) Tests sentence (`:67-69`).** It introduces "each copy" in a paragraph that never says resting frames are shot on lifted copies. **Fix:** "The journey shoots each resting element frame on a copy of its specimen lifted to the document's start below a padded top, after releasing the pointer, so …"

**F4 — The unit copied the containment measurement a second and third time.**
- **What's wrong:** the added `NavSection.test.ts:127` and `NavbarSection.test.ts:209` cases repeat the `DropdownSection.test.ts:215-266` loop almost verbatim. The `beforeAll` block that imports the styles is repeated too.
- **Why it matters:** `.claude/rules/tests.md:184` says a near-duplicate helper is a defect. Its home, `tests/setupBrowser.ts`, is off-limits to this unit. The unit should have raised this as a deviation instead of copying the loop.
- **Fix:** carry this to a successor unit that owns `tests/setupBrowser.ts` after PAGE-FRAME lands. That unit exports one helper, for example a `readEscapedMenus` function returning `{ measured, escaped }` at a width, and all three sections use it.

**F5 — One entry in the report's red-before-fix list is false.**
- **What's wrong:** `b-collapse-bcf-report.md:149-156` lists `NavbarSection > keeps each open menu inside the specimen that holds it at a %i-pixel viewport` under "Case titles added (red before the fix)". The red run it cites fails 10 cases and does not include that one (`bcf-red-sections.log.txt:79-432`); it passed with the constants held at `dc92a09`. Its only red run is the `v6-navbar-no-room` mutation (`bcf-mutations.log.txt:43-50`).
- **Fix:** move that title under a line saying it runs red through that mutation.

## Referrals (to the objective lane)

- **R1 — The ring-containment check is not bound to the frame that was shot.**
  - The check computes `const frame = lifted.getBoundingClientRect()` (`integration.test.ts:1952`), independent of the element passed to `FRAMES.place` (`:1940`).
  - Mutation: place the focus frame on `specimen` instead. The frame then crops the ring, and `inside` still reads four `true` values. The assertions do not separate this mutation from the pass.
  - Also, `v6-underline-unregistered` ran without `CAPTURE=1`, so the held-after-shot assertions were exercised against a placement that took no shot.
- **R2 — Literal case populations in test files, which `w2-w3-note-1.md` items 2 and 5 forbid:**
  - `['Accordion base', 'Accordion last expanded']` in `AccordionSection.test.ts`, around line 211;
  - `['sm','md','lg','xl','xxl']` in the `DropdownSection.test.ts` fit case.
- **R3 — Retention and bare output.**
  - No full log is retained for `v2-unfixed`, `v2-release-only`, or any section mutation. Only the summary lines in `bcf-mutations.log.txt` exist.
  - `bcf-gates.log.txt` keeps filtered summary lines, not bare runner output.
  - `bcf-v14-weight.log.txt` is a one-line paraphrase, not runner output.
  - The V14 baseline exits 1 on an unrelated `ENOENT` case (`bcf-v14-ledger-baseline.log.txt:15-16`), and the report does not mention it.
- **R4 — The dark-1280 capture log may not match the file.** It places the portfolio case at `integration.test.ts:2142` after a mid-run Vite reload (`bcf-capture-dark-1280.log.txt:8,85`). The other three logs and the file place it at `:2442`. The `nav-underline-*--dark-1280.png` frames exist, which suggests the current file ran, but confirm it.
- **R5 — Uncovered placement.** No case reads the in-flow placement of the collapsed bar's menu any more. The hang case filters to `navbar-expand`, so the comment "the following cases read where each one lands" (`bcf.diff:723-724`) claims more than the cases do.
- **R6 — Stale neighbouring specimen.** The added TSDoc says the dropdown script writes the static placement attribute on a menu inside a bar. The base `Navbar opened` menu (`constants.ts:3467`) carries no `data-bs-popper` attribute. This predates the unit, but the neighbouring sentence now contradicts it.

## Referral (to the Orchestrator)

- **R7 — Landing collision in the guide.** The `bcf-shared.patch` hunk `@@ -7746` rewraps the element-frame paragraph, including the "first pixel" sentence. `pf-design-verdict.md` R8 rules that sentence false and gives it to PAGE-FRAME. A three-way merge will conflict there and could bring the false sentence back. Insert the BCF sentence without rewrapping the lines that follow it, or land it after PAGE-FRAME.

## Attacked and held

- **The pointer's second point.** I checked whether the second pointer position (51,60) was a separate cause the report omits. It is the same physical pointer after staging moves the tester. The fix covers both, because the release parks the pointer at 0,0, inside the 48 px padding (`bcf-v2-probe.log.txt:107-108`).
- **The padding depth.** I checked whether a specimen's negative gutter could pull a copy up into the padding. No specimen uses `g-5` or `gy-5`, and the `entered` assertion guards the case anyway.
- **The ramp labels.** I checked whether `Start from <step>` and `End from <step>` contradict the frames. They name the side the menu takes above its boundary. The 390 frames show the menus on the opposite side, below the boundary, which is the ramp's intended behaviour.
- **The hover target after the reorder.** I checked whether reordering the tabs changes which tab the hover scenario targets. The hover case selects the first resting tab by class (`integration.test.ts:1792-1796`), so the order does not matter.

VERDICT: FAIL 9; outside the claims: F1, F2, F3, F4, F5