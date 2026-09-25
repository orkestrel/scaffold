# LEDGER-ADDITIONS audit round 2: subjective-lane verdict

**Lane:** subjective, held by `reviewer` on Opus 5.5 in a clean context. The same engine wrote this round (`opus`), so I attacked the naming, the prose, and the case titles hardest. I edited nothing and ran nothing. Every citation is to the uncommitted worktree `/home/user/veneer-lad` or to the evidence under `/home/user/scaffold/.orkestrel/veneer/units/`.

## Numbered verdicts

1. **CONFIRMED.** The `collectSubjectClasses` function (`tests/setupServer.ts:1875-1898`) reads a class inside an argument only when every open group is an `:is(` or `:where(` parenthesis (line 1883-1885). An attribute bracket is never readable, and quoted text is skipped as literal (line 1880).
   - The case at `tests/setupServer.test.ts:2914-2936` covers `:not()`, `:has()`, `:nth-child(… of …)`, nesting both ways, uppercase, and quoted attribute values.
   - **Mutation:** drop `where` from the regex. The case fails with `expected [] to deeply equal [ 'nav-link' ]` (`lad-2-plant-where-dropped.log.txt:15`). The assertion separates this mutation from the passing code.
   - **Mutation:** add `not` to the regex. The case fails with `expected [ 'nav-link', 'disabled' ]` (`lad-2-plant-not-read.log.txt:15`). The assertion separates this one too.
   - Two mutations were not planted, but the assertions would catch them. Reading `:has()` would break the `.card:has(.card-img)` → `['card']` assertion (line 2921). Dropping the `readable.every(Boolean)` nesting guard would break `:not(:where(.hidden))` → `[]` (line 2920).
   - The `collectSelectorClasses` function is byte-unchanged (line 1842-1851), and its other callers still call it (line 2067, 2314, 2349).
   - What this claim states holds. Its TSDoc and its name are ruled in finding N1.

2. **CONFIRMED.** In the before and after logs (`lad-2-sweep-before.log.txt`, `lad-2-sweep-after.log.txt`), only the `ATTRIBUTE` lines differ. Each `selector=` and `measured=` value moves from `(none)` to the `owned=` key already on that line. `:where(button.page-link)` stays `(none)`. Every `ADDITION` line is identical, and neither log has a `DEPARTURE` line.
   - **Mutation:** a reading that sends a reset rule to a key other than the one its row named. The after log would show a `measured=` value that differs from `owned=`, so the sweep separates it.
   - The coverage statement holds. The two readers differ only inside a parenthesis that opens after `:is` or `:where`, and the sweep's filter (`lad-2-sweep.test.ts:26`) selects exactly the selectors that write one. Referral A covers one gap in that filter.

3. **CONFIRMED.** Only `.caption-bottom` (`guides/veneer.md:10291-10292`) and `:where(button.page-link)` (line 10360-10374) remain without a measured owner.
   - The inventory reasons hold. A search of `tests/fixtures/oracle/inventory.json` finds no `caption-bottom` and no `button.page-link`. `".page-link"` occurs 12 times, and no `page`, `caption`, or `page-link` key exists, so the `matchShippedKey` function cannot answer for either class.
   - The case at `tests/conformance.test.ts:~241-252` pins exactly that pair.
   - **Mutation:** the where-dropped plant. The case receives ten rules, with the eight reset rules added beside the kept pair (`lad-2-plant-where-dropped.log.txt:53-70`). The assertion separates the mutation. It also closes the gap the first run exposed, where the rows took ownership back and the gate stayed green.

4. **CONFIRMED.**
   - The writer (`lad-2-table-writer.test.ts:35-40`) calls the `collectLedger` function with the guide's own rows as owners, which is how the gate calls it. It seeds no component by hand.
   - It throws on `missing` (a measured row with no reason) or `uncarried` (a recorded row no measured line equals) (line 48-57). Its run reports `MISSING []` and `UNCARRIED []` with exit 0 (`lad-2-table-writer.log.txt:10-21`).
   - Its formatted output diffs empty against the guide table (`lad-2-table-diff.log.txt`, exit 0).
   - **Mutation:** hand-edit a measured row's `Component` cell in the guide. The lookup by exact line and the lookup by selector row both miss, `MISSING` fills, and the run throws. The writer separates this mutation.
   - The failure branches were never executed. See Referral B.

5. **CONFIRMED.**
   - **Layer clause:** dropping the layer clause fails the ownership case on the `elements` assertion (`expected [] to deeply equal [ 'elements | .audit-unrecorded | —' ]`, `lad-2-plant-layer-clause.log.txt:16`). The case at `tests/setupServer.test.ts:~2427-2438` sets up a layer that answers to a withheld component. That is the only state in which the clause decides the result, because a layer whose component ships returns before any row is read.
   - **De-duplication by name:** the case `names one custom property declared at two selectors once at each selector` receives two rows where it expects three (`lad-2-plant-name-dedupe.log.txt:146-147`). The lost row is the de-duplication itself, not a spelling change. A mutation that de-duplicates on the bare property but keeps the `selector { property }` text would also produce two rows, so this case separates it.

6. **CONFIRMED.**
   - Relabelling the kept `.caption-bottom` selector row alone fails three conformance cases. They name the declaration row, which still carries `table` (`lad-2-plant-owner-relabel.log.txt:17-66`).
   - The claim that relabelling every row together stays green rests on a source reading, not a run:
     - The `attributeBlock` function returns the row's component unchanged (`tests/setupServer.ts:~2708-2715`).
     - It reaches a row only when the recording index lacks the selector, so no vocabulary gives either owned rule a site.
     - Neither owned rule declares a custom property (guide line 10292 and line 10361-10374), so no category depends on the owner's vocabulary.
   - That reading bounds the claim. The joint relabel stays green only when the new component ships with an official vocabulary. A withheld component reddens `attributes every emitted rule to a shipped component`, and the guide says so at line 10081-10082.
   - The § Additions preamble names both unmeasured cells at line 10067-10068.

7. **BROKEN.** The ownership paragraph gives a false reason for the reading it states. `guides/veneer.md:10070-10071` says: "Attribution reads a class written inside an `:is()` or a `:where()` argument as the rule's own, because that argument matches the element the rule matches." Two rules the round itself places contradict that reason.
   - `:where(.carousel-indicators [data-bs-target])` (line 10422). Its argument is a complex selector, and `.carousel-indicators` sits on the indicator's container. The row's own `Reason` cell says "The release gives a resting indicator no class".
   - `:where(button.carousel-control-prev, button.carousel-control-next)` (line 10407). An element matches one of the two alternatives, not both.
   - The attribution result is correct. The stated reason is not.
   - **Smallest fix:** replace the clause after "as the rule's own" with: "because an `:is()` or `:where()` argument is part of the selector the rule matches through, while a `:not()` argument names what the rule excludes and a `:has()` argument names a relative."
   - The other parts of this claim hold:
     - The F2 clause reads exactly as claimed (line 10056-10057).
     - Both kept rows are named with true reasons (line 10075-10079).
     - § Outside the ledger lost the paragraph and its list item (diff line 587-605), and the remaining sequence ("first", "next", "follow", "close the list") still reads in order.
     - § Tests names only what the added cases run.

8. **CONFIRMED.** Each gate log records the claimed result:
   - `lad-2-setup.log.txt`: 118 passed, exit 0.
   - `lad-2-test-conformance.log.txt`: 29 passed, exit 0.
   - `lad-2-test-guides.log.txt`: exit 0.
   - `lad-2-test-policy.log.txt`: exit 0.
   - `lad-2-check.log.txt`: exit 0.
   - `lad-2-lint-check.log.txt`: exit 0.
   - `lad-2-oxfmt-owned.log.txt`: exit 0.
   - The table writer and the table diff: exit 0.

9. **CONFIRMED.**
   - `lad-2-status.txt` lists exactly the four owned files, and every plant log ends with an empty `src diffstat:` line.
   - The added code has no `any`, no `as`, no `!`, no suppression, and no nested declaration. `_alert` is a rest-omission binding, which the rules allow.
   - `collectSubjectClasses` is exported, sits in the export list (`tests/setupServer.test.ts:~533`), and its TSDoc opens with a third-person `-s` verb and has `@example` and `@remarks`. The truth of that TSDoc is ruled in N1.
   - Each new case title states what its assertions check. `places by measurement every emitted rule but the ones a recorded selector row owns` holds under the ownership definition at `tests/setupServer.ts:~2689-2694`, because a row never owns a rule that measurement places.

## Findings outside the claims

**N1. The `collectSubjectClasses` function carries a name and TSDoc that misstate what it returns** (`tests/setupServer.ts:1853-1875`).
- **What is wrong:**
  - In the CSS Selectors specification, the *subject* of a selector is the element its last compound selector represents. This function returns classes from every compound.
  - The module's own case asserts `collectSubjectClasses(':is(.alpha, .beta) > .gamma')` → `['alpha', 'beta', 'gamma']` (`tests/setupServer.test.ts:2916`). There `.alpha` and `.beta` sit on the parent.
  - The summary "Collects every class a selector writes for the elements it matches" is false for that input.
  - The remark "An `:is()` or a `:where()` argument matches the element the selector matches" is false for the same input, and for the shipped `:where(.carousel-indicators [data-bs-target])`.
- **Why it matters:** `.claude/rules/names.md` § General vocabulary requires a name to describe what the thing is. A reader who knows the CSS term will expect only the classes of the last compound, and a later caller who relies on the name will misattribute a rule.
- **What right looks like:**
  - Rename the function to `collectRequiredClasses` and update both test files and the export list.
  - Rewrite the summary as "Collects every class a selector writes, reading through `:is()` and `:where()` arguments."
  - Replace the first remark with the reason given in claim 7's fix.
  - Keep the `@example`.

**N2. The TSDoc of the `matchSelectorKey` function still names the old class reader** (`tests/setupServer.ts:1812`).
- **What is wrong:** its `@param` says `classes` arrive "as the {@link collectSelectorClasses} helper reads them". Its only production caller, the `attributeSelector` function, passes `collectSubjectClasses` output (line 2464, 2471, 2485).
- **Why it matters:** the doc describes the code as it was before this round.
- **What right looks like:** point the link at the renamed reader from N1.

## Attacked and held

- I checked whether measurement could place `:where(button.page-link)` without a row, because the inventory records `.page-link` under `pagination`. The gate has no bare-class lookup tier, so this would be new capability rather than a defect. The design verdict and the round 1 audit verdict scope owner rows to what the class tier cannot place.
- I checked whether the conformance case's literal pair duplicates a fact the guide already holds. It cannot be derived from the table: every reset rule keeps a `selector` row as a measured addition, so a check that reads the table's selector rows would not catch the where-dropped plant. The literal is the instrument that works.
- I checked `collectSelectorClasses` and `collectSubjectClasses` for duplication. They share a loop shape but have different contracts, and the brief allowed a separate function beside the old one. That falls short of the consolidation law's bar.
- The not-read plant leaves conformance green (`lad-2-plant-not-read.log.txt:49-56`). This is correct: no emitted selector's attribution depends on a class inside `:not()`. The report says so honestly.

## Referrals to the objective lane

- **Referral A:** the sweep filter matches `':is('` and `':where('` case-sensitively (`lad-2-sweep.test.ts:26`), but the reading's regex is case-insensitive (`tests/setupServer.ts:1885`). Search the compiled cascade case-insensitively for `:is(` and `:where(`, and confirm no uppercase spelling was left out of the sweep's population.
- **Referral B:** no run exercised the table writer's `MISSING` or `UNCARRIED` branch, so the instrument has no failing control on record. Rule whether claim 4 needs one, for example a run with one guide `Component` cell edited.

VERDICT: FAIL 7; outside the claims: N1, N2
