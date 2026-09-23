# NAV (`nv`) audit round 1: objective lane verdict

Lane: objective. `reviewer` on Opus 5.5, native subagent, clean context, read-only. It ran in place of `analyst` on Astra.

## Numbered verdicts

1. **CONFIRMED.** Delta and scope hold.
   - Attack: look for a stray path in the status and a sixteenth shared file in the patch.
   - `nv-status.txt:1-5` lists only `CardSection.test.ts` (modified) and the four new owned files.
   - The `nv-shared.patch` headers (lines 1, 19, 101, 108, 283, 293, 319, 331, 452, 488, 563, 573, 694) name exactly the thirteen files the claim names.
   - No hunk touches `tests/setupServer.ts`, `tests/fixtures/**`, `tests/setupPolicy.ts`, `package*.json`, `README.md`, `ROADMAP.md`, `src/browser/**`, `src/core/**`, or a sibling's files.
   - The worktree `_nav.scss:53` and the stage `_nav.scss:53` agree, and the stage `nav.test.ts` case lines match the diff's offsets. The stage is the worktree's files plus the patch.

2. **CONFIRMED.** The partial holds. One sub-clause is vacuous.
   - Coverage: `/home/user/veneer-nv/src/styles/components/_nav.scss:10-179` writes every `nav` selector in `/home/user/veneer-nv/tests/fixtures/oracle/inventory.json:48387-49250` except the eight `.navbar`-bearing names (inventory lines 49093-49232). The declarations match the inventory, apart from the ledgered tokenizations.
   - The built cascade `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage/dist/src/styles/index.css` carries each rule, including:
     - `@media (forced-colors:active){.nav-link:focus-visible{outline:var(--vn-focus-width) solid var(--vn-focus-highlight)}`
     - `@media (prefers-reduced-motion:reduce){.nav-link{transition:none}`
     - `.nav-tabs .dropdown-menu{…}`
     - both pane rules
     - `.nav-justified .nav-item .nav-link{width:100%}`
   - Mixins: the only `transition` goes through the mixin (`_nav.scss:38-40`; mixin at `/home/user/veneer-nv/src/styles/_mixins.scss:171-176`). `forced-ring` sits beside the shadow at `_nav.scss:53` (R15).
   - Barrel: the stage `src/styles/index.scss:60-62` reads `button-group`, then `nav`, then `card`. In the built CSS, `.nav{` directly follows the button-group rules, and `.tab-content>.active{display:block}` directly precedes `.card{`.
   - Vacuous sub-clause: no nav rule reads `tokens.$dark`. R3 names only the accordion and navbar retunes (`b-collapse-design-verdict.md:39-45`). The inventory's nav key records no dark rule. No nav dark retune exists anywhere, so there is nothing to misplace. The claim's wording names a retune that does not exist.

3. **BROKEN**, in the proof-matrix clause only. The mutation proof holds.
   - **The mutation proof holds.** Every mutation the claim names is recorded red with its named case:
     - `mutate-final-1.log.txt:1-25` and `mutate-final-2.log.txt:1-4`, instrument `nv-instruments/mutate.py:9-39`.
     - The unmutated control is `59 passed (59)` (`gates.log.txt:288`).
     - The partial build was restored (`mutate-final-2.log.txt:5`). The first run was cap-killed (`mutate-final.log.txt:26` `exit=124`). The second run's `assert pristine.count(old) == 1` at `mutate.py:51` passed for `item link width dropped`, so the stage was pristine when it resumed.
     - Each mutation edits only its own declaration. Each reddens a case that reads that declaration's resolved value: the ring pair (`nav.test.ts` ring case), `forced-ring` (the outline-style/width case), the seam, show, menu, rows, panes, card order, the link slot, and the fixed palette (both mode cases).
   - **The matrix clause is falsified.** R19 requires each recorded selector's distinguishing mutation. Some rows name a mutation that leaves the selector's rule intact, or name no mutation at all:
     - `b-collapse-nv-report.md:189`, `.nav-underline .nav-link.active` → "underline show twin left out". `mutate.py:31` removes only `.nav-underline .show > .nav-link` and leaves the `.active` rule in place.
     - `report:192`, `.nav-fill .nav-item` → "`.nav` layout dropped; justified written as fill". Neither mutation (`mutate.py:15,21`) touches `.nav-fill .nav-item`.
     - `report:181-183`, the `.nav-pills` rows → "pill slots (read by the color cases)", "the radius read by the length case", and "the palette read by the color cases". These are descriptions, not mutations, and none was run.
     - `report:174`, `.nav-tabs` → "nav loads after card; tab margin dropped". Neither removes a `.nav-tabs` declaration.
   - The proof itself distinguishes each of these selectors by reasoning: the layer case holds every `NAV_SELECTORS` name, and the color and length cases read those rules. The defect is the recorded matrix. Rows naming unrun mutations are writer-only.
   - Fix: add a mutation per affected row to `mutate.py`. For example, drop the `.nav-underline .nav-link.active` selector, drop `.nav-fill .nav-item`, drop `.nav-pills .nav-link { border-radius }`, drop the `.nav-pills .nav-link.active` paint, and drop the `.nav-tabs` `border-bottom`. Run them, record the red cases in a log, and correct those matrix rows to name the executed mutation.

4. **CONFIRMED.** The section, specimens, and card header hold.
   - Section: `NavSection.ts` (diff lines 49-57) is a `SpecimenSection` fed by `NAV_COPY` and `NAV_SPECIMENS` (`nv-shared.patch` constants hunk).
   - Specimens: the names are in the claimed order, and `NavSection.test.ts` asserts them (diff lines 270-278). `[style]` is asserted null (diff line 266), and the specimen markup carries no `style` attribute.
   - `Nav tabs` carries the release's open-menu markup: `nav-item dropdown show`, `dropdown-toggle`, `aria-expanded="true"`, `dropdown-menu show`, and `data-bs-popper="static"`.
   - Card header: `Card tabs` and `Card pills` take `nav nav-tabs|nav-pills card-header-*` with `.nav-item` wrappers. `CardSection.test.ts` asserts that shape, the children, and `aria-current` (diff lines 14-27). No card `CASCADE_KEYS` row changes.
   - Attack: the reduced markup reinstated. The `.nav.nav-tabs.card-header-tabs > .nav-item > .nav-link.active` selector assertion reddens under it.

5. **UNRESOLVED.**
   - The registry half holds:
     - Seven `CASCADE_KEYS` rows, three `DRIVEN_KEYS` rows, and the `CaptureSubject` members (`nv-shared.patch` `tests/setup.ts` hunk, lines 488-562).
     - No `CaptureState` member is added.
     - The journey case uses `FRAMES.place` for both hover frames and `FRAMES.page` for `nav-base-focus` (`report:685,710`).
   - The journey half is not settled:
     - The logs record only `light-390` and `dark-1280`, each at `1 failed | 38 passed (39)` with the census case as the only failure (`journey-light-390.log.txt:80-104`, `journey-dark-1280.log.txt:78,102`).
     - `light-1280` was recorded only with the stage probe partial (`journey-light-1280.log.txt:79`).
     - `dark-390` was never run.
     - Every journey run (13:36-13:40) predates the gate run (13:51, `gates.log.txt:1`). Nothing shows the owned files or `integration.test.ts` unchanged in between.
   - Settle it: after the final `nv-sync.sh`, run `nv-instruments/journey.sh` in the stage for all four variants. Or take the Orchestrator's landing journey run after DROPDOWN.

6. **BROKEN.** The `nav case tables` partition assertion goes red at the landing base the Orchestrator ruled in D3 (DROPDOWN lands before NAV).
   - The test builds `withheld` from every guide deferral row whose owner is `Navbar` (`nv-shared.patch:607-611`). It then asserts `new Set([...NAV_SELECTORS, ...withheld])` equals the nav inventory's selector set (`nv-shared.patch:615-616`).
   - DROPDOWN's shared patch adds seven `Navbar`-owner rows (`/home/user/scaffold/.orkestrel/veneer/units/dd-shared.patch:913-919`):
     - `.navbar-nav .dropdown-menu`
     - the `.navbar-expand-sm|md|lg|xl|xxl` and bare `.navbar-expand` forms of `.navbar-nav .dropdown-menu`
   - These are `dropdown`-key selectors (the `dropdown` key spans `inventory.json:41033-44333`; the rows sit at lines 42779-42868) and absent from the nav key.
   - Failing state: the guide after DROPDOWN's landing. `withheld` holds 15 names, and the union exceeds the recorded set by those seven, so `toEqual` fails.
   - The stage reading (`test:setup` `251 passed`, `gates.log.txt:137`) is green only because the stage lacks DROPDOWN.
   - The rest of the claim holds:
     - The property closure: 7 length + 9 color + 3 named properties equal the 19 inventory keys at `inventory.json:49799-49914`.
     - The rem-to-pixel and palette-hex bindings.
     - The departure rows against `test:conformance` `22 passed` (`gates.log.txt:334`).
     - The order case gains `nav`.
   - Smallest fix, in the `setupStyles.test.ts` hunk: bound `withheld` to the nav key instead of the owner alone. For example, `readDeferrals().filter((row) => row.owner === 'Navbar' && row.name.includes('.nav-link'))`, following the `.input-group` owner-plus-name precedent at `/home/user/veneer-nv/tests/setupStyles.test.ts:2499-2501`. Or intersect with the recorded names and separately assert every `.navbar`-bearing recorded name is a `Navbar` row. Prove it by applying DROPDOWN's deferral hunk in the stage and running `npm run test:setup` red before the fix and green after.

7. **CONFIRMED.** The guide content is present.
   - `### Nav classes` (`nv-shared.patch` guide hunk at 882): the classes are set in markup, with a pointer to § Compatibility for Tab and ScrollSpy.
   - The `nav` `selector` and `variable` rows.
   - The Tab and ScrollSpy `plugin` rows, each ending "Owner: J-ENGINE.".
   - The R8 sentence.
   - Eight `Navbar` deferral rows (stage `guides/veneer.md:1810-1817`, under § Styles › § Deferred selectors, line 1774).
   - The `_nav.scss` § Files row.
   - The `### Card classes` rewrite. Its specificity and order statement matches `nav.test.ts` "drops the strip line…" and the barrel order.
   - The § Showcase sentence.
   - Attack: look for a sentence stating Veneer script behaviour. None found. The sentence naming Tab and ScrollSpy attributes the class movement to J-ENGINE obligations (see the R17 referral).

8. **CONFIRMED.** Law and report hold.
   - No `any`, non-null `!`, type assertion other than `as const`, suppression, mock, spy, or nested function appears in `nv.diff` or `nv-shared.patch`. Callbacks are passed directly to `it.each`, `map`, `filter`, and `flatMap`.
   - `as const` (the integration hunk and `nav.test.ts` "reads one link and tab paint…") follows existing precedent at `setupStyles.test.ts:446`, and `lint:check` passed (`gates.log.txt:16`).
   - SCSS: no literal color (styles.md:42). The transition goes only through the mixin (styles.md:51). `@use '../mixins' as *`.
   - The `scene.load('@layer components { .dropdown-menu … }')` rule matches the consumer-rule precedent in `close.test.ts:66` and `badge.test.ts:44`. The tabs override it disproves does not depend on DROPDOWN's rule.
   - Banned-term sweep: case-insensitive, over `nv.diff` and `nv-shared.patch`, with the pattern `should|simply|easy|easier|just|currently|now|new|latest|via|utilize|leverage|in order to|e.g.|i.e.|etc.|performant|robust|and/or|since|once|above|below|please|dummy|ensure|guarantee`.
     - `new` hits: code (`new Set`, `new Map`, `new NavSection`) or diff metadata.
     - `below` is spatial.
     - `once` counts ("once each", "once as list items").
     - `above` hits sit in unchanged context lines.
     - Every hit is permitted.
   - The report records each gate's command and result, matching `gates.log.txt:10,16,46,104,137,288,301,318,334,350,382`.
   - Recorded but not ruled (counts the report states): "The other four files are untracked" and "exactly those five paths" (`report:69-70`); "both row cases" (`report:152,195-196`); the file sizes "180 lines", "497 lines", "20 lines", and "110 lines" (`report:60-65`).
   - Borderline counts in authored comments, also recorded: "render their items twice" (`NAV_SPECIMENS` remark) and "records `.nav-link` twice" (`NAV_SELECTORS` remark).

## Findings outside the claims

- **F1: the conformance comment overclaims for the disclosure partials.**
  - Location: `nv-shared.patch:467-468`, the order case in `tests/conformance.test.ts`. It adds "each disclosure and navigation partial joins the block at the release's own position inside it."
  - Why it is false: R11 loads `collapse` and `dropdown` before `button-group` (`b-collapse-design-verdict.md:70-73`). The block's `passiveNames` begins at `'button-group'` (`nv-shared.patch:474-477`), and DROPDOWN's patch does not extend the order case (no match in `dd-shared.patch`). So a disclosure partial does not join the block.
  - Why it matters: a later unit reads this comment as the rule for where its partial belongs.
  - Right: "and the nav partial joins the block at the release's position between the button group and the card".

## Attacked and held

- **The seam case survives the missing dropdown partial.** It removes the `.nav-item.show` item before measuring (`nav.test.ts` seam case), so an unpositioned menu cannot stretch the strip. After DROPDOWN lands, the menu without `.show` is `display: none`, and the computed `margin-top` still reads `-1px`.
- **The menu case holds against DROPDOWN's rule.** `.nav-tabs .dropdown-menu` (0,2,0) beats both the injected `.dropdown-menu` and DROPDOWN's `.dropdown-menu[data-bs-popper]` (0,2,0), because nav loads after dropdown (R11), matching the release.
- **The empty `--bs-nav-link-font-weight` slot matches.** It compiles to `--bs-nav-link-font-weight: ;` (built CSS), matching the inventory's `" "`. The type case proves the inherit-then-override behaviour.
- **The focus ring value equals the release.** `color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` equals `rgba(13,110,253,0.25)` when the palette blue is `#0d6efd`. The mode cases pin the pill paint to `rgb(13, 110, 253)` in both modes.
- **Dropped underline padding is still caught.** No browser case reads `.nav-underline .nav-link` `padding-left/right: 0`. The ledger gate measures an absent declaration: the guide's departure table carries absent-declaration rows, and `scanLedgerDrift` sits at `tests/setupServer.ts:2391`.

## Referrals (to the Orchestrator)

- **Writer's engine.** The brief names `opus` on Opus 5 (`b-collapse-nv-brief.md:5`), but the report header states "`opus` on Opus 5.5" (`b-collapse-nv-report.md:3`). Settle which engine wrote the unit in the routing ledger. That decides whether this lane ran on the writer's engine.
- **R17 wording (subjective lane).** Rule on whether "The Tab and ScrollSpy behaviors that move those classes from a click or from the scroll position are engine obligations…" in `### Nav classes` states script behaviour.
- **`test:policy` timeout.** The chain run failed (`gates.log.txt:367-386`). The "0 alone" reading is writer-only, and your own run decides it, as ruled.

VERDICT: FAIL 3, 5, 6; outside the claims: F1
