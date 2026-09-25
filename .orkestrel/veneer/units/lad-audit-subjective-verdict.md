LEDGER-ADDITIONS audit — subjective lane (`reviewer`, Opus 5.5)

I held the subjective lane. The lane is read-only, so I derived every mutation below from source and the retained logs. I ran none of them.

Numbered verdicts

1. **CONFIRMED.** Additions carry values, as Ruling 4 requires.
   - `emitted` is a member of `Addition` (`/home/user/scaffold/.orkestrel/veneer/units/lad.diff:1225`).
   - `readAdditions` requires `Veneer` and maps it through `readValueCell` (`/home/user/veneer-lad/tests/setupServer.ts:1241`, lad.diff:1288-1305).
   - `describeAddition` appends `describeValueCell(row.emitted)` (`/home/user/veneer-lad/tests/setupServer.ts:2824-2832`).
   - Every declaration under an added selector gets its own row, named `selector { property }` (`setupServer.ts:2731-2747`).
   - A custom property the vocabulary lacks takes the `property` category, not `declaration`. The claim's second clause and the guide (`/home/user/veneer-lad/guides/veneer.md:10056-10058`) both state this, so I read "its own value-bearing row" as the claim's intent.
   - Mutation A: drop the value from `describeAddition`. The case `reports an addition whose recorded value differs…` (lad.diff:1059-1111) then loses its `1px`/`2px` and `(empty)`/`—` lines. The assertions tell this apart from the passing case.
   - Mutation B: map `''` to `undefined` in the collector. The same case expects `… | property | (empty)`, so the assertions tell this apart.
   - Mutation C: store the raw cell in `readAdditions`. The reader case expects `emitted: undefined` (lad.diff:873), so absence is told apart. The `(empty)` reading at lad.diff:884-886 is not told apart, because `'(empty)'` round-trips through `describeValueCell`. That mutation changes nothing any comparison reads, so it does not break the claim.

2. **CONFIRMED.** Unattributed rules report, as Ruling 5 requires.
   - `collectUnattributed` returns `layer | selector | condition` lines (`setupServer.ts:2652`, lad.diff:1374-1387).
   - The case `attributes every emitted rule to a shipped component` expects the plant named and `measured.unattributed` empty (`/home/user/veneer-lad/tests/conformance.test.ts:235-240`).
   - The keyframes refusal still throws (`setupServer.ts:2755-2758`; `setupServer.test.ts:2273-2279`).
   - Mutation: make `collectUnattributed` return `[]`. The conformance case expects `.audit-orphan`, and the setup case (`/home/user/veneer-lad/tests/setupServer.test.ts:2502-2505`) expects two lines, so the assertions tell this apart.
   - Placement: the ruling says "beside `unrecorded` and `stale`", but the list sits on `CascadeLedger`, not on `LedgerDrift`. That is the better home, because the list measures the cascade rather than comparing it with the guide. It is not a defect.

3. **CONFIRMED.** The ownership rule is narrow as stated (`setupServer.ts:2610-2632`).
   - `claimable` requires all three: `attributeSelector` answers nothing, `!recording.has`, and a layer that maps to no component.
   - The row must match `category`, `name`, and exact `condition`. The owner must ship and must have a vocabulary.
   - A stale owner row is an ordinary `selector` row, so `scanLedgerDrift` reports it as `stale`.
   - Mutation: drop the condition match. `owned.unattributed` then loses the `@media print` line (`setupServer.test.ts:2509`), so the assertions tell this apart.
   - Mutation: drop `!recording.has`. The `.caption-top`/`btn` case (`setupServer.test.ts:2529-2537`) then reads `[]`, so the assertions tell this apart.
   - Mutation: drop the shipped check. `setupServer.test.ts:2525-2528` catches it.
   - Mutation: drop the layer clause (`setupServer.ts:2621`). No case tells this apart; see R2.

4. **CONFIRMED.** The owner rows are true. I checked each against the inventory and the partials myself, not against the writer's report.
   - Each unwrapped selector is recorded only under its owner key in `/home/user/veneer-lad/tests/fixtures/oracle/inventory.json`:
     - `.dropdown-item` at line 42246 (`dropdown`)
     - `.nav-link` at 48443 (`nav`)
     - `.navbar-toggler` at 50464 (`navbar`)
     - `.accordion-button` at 64088 (`accordion`)
     - `.page-link` at 65478 (`pagination`)
     - `.list-group-item` at 61142 (`list-group`)
     - `.carousel-control-prev` at 74319 and `.carousel-indicators [data-bs-target]` at 74779 (`carousel`)
   - `.btn-close` is recorded under both `btn` (33898) and `btn-close` (67430). The exact-class tier at `setupServer.ts:2417-2421` picks `btn-close`.
   - The partial for each rule matches: `/home/user/veneer-lad/src/styles/components/_dropdown.scss:228`, `_nav.scss:21`, `_navbar.scss:105`, `_accordion.scss:42`, `_pagination.scss:45`, `_list-group.scss:42`, `_close.scss:6`, `_carousel.scss:86,172`, and `_table.scss:56`.
   - `.caption-bottom` appears nowhere in the inventory.

5. **CONFIRMED.** Shipped keys derive from the inventory, as Ruling 6 requires.
   - The `listed` array is deleted (lad.diff:605-755).
   - The new case compares the sorted inventory keys with `collectShippedComponents` through `scanLedgerDrift` and expects empty lists (`conformance.test.ts:126-137`).
   - The setup case plants `audit-key` and removes `alert`, and expects `{ unrecorded: ['audit-key'], stale: ['alert'] }` (lad.diff:1160-1185).
   - Mutation: swap the sides of `scanLedgerDrift`, or make it return empty lists. The setup case tells this apart.
   - The `.sort()` is order-irrelevant, because `scanLedgerDrift` uses `includes`.

6. **BROKEN.** The claim says no row was written from a reading of the partials, and that every row is measured. The owner rows' `Component` cell was written by hand.
   - Failing state: `/home/user/scaffold/.orkestrel/veneer/units/lad-instruments/lad-rows-probe.ts.txt:18-29` hand-seeds the ten owner tuples (`['dropdown', ':where(button.dropdown-item)', …]`) and passes them as owners (lines 39-43).
   - The report states that the owners came from the partials: "its partial and its comment name the component" (`/home/user/scaffold/.orkestrel/veneer/units/ledger-additions-report.md:43-55`).
   - `attributeBlock` then returns the row's `component` unchanged (`setupServer.ts:2622-2631`). The measured owner rows equal the seed by construction, so the green run proves nothing about that cell.
   - Bound: every other row, and every other cell of the owner rows, is measured. A wrong owner-row name owns nothing, and the rule then reports as unattributed.
   - Smallest fix: F1 (a) and (b). After that fix, `.caption-bottom` is the only row-owned rule, as Ruling 5 names it. Restate the claim so it excludes that one recorded cell.

7. **CONFIRMED.** The plants behaved as claimed.
   - Blockquote plant: `/home/user/scaffold/.orkestrel/veneer/units/lad-instruments/logs/lad-plant-blockquote.log.txt:34` names `… | 97px solid currentColor` as unrecorded, and line 55 names `… | var(--vn-space-2) solid currentColor` as stale. Both are `AssertionError` messages.
   - `.audit-unrecorded` plant: `lad-plant-unattributed.log.txt:23-31` fails only the attribution case (`1 failed | 27 passed`) and names the rule.
   - Both logs end with an empty diffstat and `cmp=identical`.
   - The run-1 logs start at 04:36:48 and 04:39:36 and carry the collision note. The report's plant table cites the run-2 logs, which start at 04:42:41 and 04:43:20.
   - Adjacent behaviour: the unattributed plant fails on the first assertion of that case, the control assertion, before `measured.unattributed` is read. The failure still names the rule.

8. **CONFIRMED.** The report-only patch is true.
   - `/home/user/veneer-lad/guides/veneer.md:10465-10468` says "the ledger measures none of them". That is false now that lines 10290-10429 record those rules.
   - `/home/user/scaffold/.orkestrel/veneer/units/lad-outside-ledger.patch` removes that paragraph and the "the button reboot rules" list item, and reflows the sentence. It makes no other change.
   - The button proof link stays in the guide at line 3310.
   - F1 (c) records the one consequence of the patch.

9. **CONFIRMED.** Scope, law, and gates hold.
   - `/home/user/scaffold/.orkestrel/veneer/units/lad-status.txt` shows exactly the four owned files.
   - The diff adds no `any`, `as`, `!` assertion, suppression, nested declaration, hidden helper, or mock.
   - `attributeBlock` and `collectUnattributed` are called directly in `setupServer.test.ts:2508-2518`.
   - The retained logs show `exit=0` for check, lint:check, setup (116 passed), conformance (28 passed), guides, and policy (109 passed, 1 skipped).
   - Every added title states what its case proves. The title `names each emitted rule no shipped component measures, and measures one its recorded selector row owns` leaves out the case's refusal half (lines 2523-2537). The title is incomplete, not false.

Findings outside the claims

**F1. The unit records nine owners it could derive, and a guide sentence is now false.**

This is my ruling on the design question.

- **Location:** `/home/user/veneer-lad/guides/veneer.md:10067-10068` ("The `Reason` cell is the only cell no measurement fixes") and `:10070-10072`. Mechanism: `/home/user/veneer-lad/tests/setupServer.ts:2618-2631`.
- **What is wrong:** an owner row's `Component` cell feeds the measurement, so no measurement fixes it.
- **Failing state:** relabel every `:where(button.nav-link)` row (lines 10305-10319) from `nav` to `dropdown`. `attributeSelector` answers `undefined`, because `collectSelectorClasses` skips depth above 0 (`setupServer.ts:1846`). The selector is not in `recording`, and `components` maps to no layer component. The row's `dropdown` is therefore returned, `collectAdditions` emits `dropdown | :where(button.nav-link) …` rows, and `test:conformance` stays green with a false owner. This is derived, not run. The settling plant is exactly that relabel followed by `npm run test:conformance`.
- **Why it matters:**
  - AGENTS.md "Derive state" forbids storing a fact the code can compute.
  - Nine of the ten owner rules have a derivable owner. Claim 4's own test is "the key `attributeSelector` gives the selector without its `:where()` wrapper".
  - The analyst source of Ruling 5 limited row ownership to "an intentional addition without an inventory or prefix owner" (`/home/user/scaffold/.orkestrel/veneer/units/ledger-values-design-analyst-proposal.md:27`).
  - `:where()` and `:is()` match exactly what their argument matches, so the class inside them belongs to the subject. This differs from `:not()` and `:has()`.
  - The unit's choice follows the brief's "record any further unattributed rule the same way" and the letter of Ruling 5. It does not follow the rule or the intent of that ruling.
- **What right looks like:**
  - (a) Attribution reads the classes inside a `:where()` or `:is()` argument as the subject's own, never those inside `:not()` or `:has()`. Keep this out of `collectSelectorClasses`'s contract for its other callers. The nine rules then attribute by class, and their existing rows become ordinary measured `selector` rows. The § Additions rows do not change.
  - (b) `.caption-bottom` stays the only row-owned rule. The preamble then says the `Reason` cell, and the `Component` cell of a row that owns its rule, are the cells no measurement fixes.
  - (c) The paragraph at 10070-10072 drops "each button reboot rule written on a `:where()` selector". If (a) is declined, the paragraph must instead state why the class inside `:where()` does not attribute. That is the reason the claim-8 patch deletes from § Outside the ledger, and nothing else in the guide would carry it.

**F2. A preamble sentence reads two ways.**

- **Location:** `/home/user/veneer-lad/guides/veneer.md:10056-10057`: "a `declaration` the release omits at a site it does write or that an added selector carries".
- **What is wrong:** "that an added selector carries" can attach to "site" instead of to "declaration". That reading says the release omits declarations at added-selector sites, which is wrong.
- **Why it matters:** AGENTS.md § Writing requires a sentence the reader understands on the first read.
- **What right looks like:** "a `declaration` the release omits at a site it writes, or any declaration under an added selector".

Referrals to the objective lane (`analyst`, GPT-6 Astra)

- **R1.** `guides/veneer.md:10059-10060` says a canonical token under an added selector needs no row "because § Reference map records it". § Reference map (lines 6912-6916) records each token's value per mode, not at a component site. Enumerate every registry-named declaration the built cascade writes under a selector other than `:root` or `[data-bs-theme=…]`. Any hit is a value neither ledger reads.
- **R2.** Test sufficiency:
  - No case tells apart a mutation that drops the layer clause of `attributeBlock` (`setupServer.ts:2621`).
  - No case tells apart de-duplicating a custom property by name across sites. No fixture declares one custom property at two selectors.
- **R3.** Before F1 (a) lands, sweep every emitted selector that contains `:is(` or `:where(` to confirm that reading their argument classes moves no other attribution or departure.

Attacked and held

- The cells of an owner row other than `Component` cannot be forged. A misspelled `Name` or `Condition` owns nothing, and the rule reports as unattributed.
- The repeated `Reason` text on each declaration row (for example 10291-10304) looks like copy drift. Ruling 4's per-declaration rows and the required `Reason` cell cause it, and it is correct.
- Removing `.sort()` in the Ruling 6 case changes nothing.
- The run-1 extra failures are timeouts under load (`lad-plant-blockquote-run1.log.txt:27,40,116,129,142`), not ledger assertions.

VERDICT: FAIL 6; outside the claims: F1, F2
