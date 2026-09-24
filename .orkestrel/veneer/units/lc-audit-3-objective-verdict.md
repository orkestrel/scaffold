1. **CONFIRMED — Fixture over Veneer’s fills.** [contrast.scss:43](/home/user/veneer-lc2/tests/src/styles/fixtures/contrast.scss:43) passes each role’s light and dark triplets to Veneer’s function and Bootstrap’s own function. [mixins.test.ts:584](/home/user/veneer-lc2/tests/src/styles/mixins.test.ts:584) compares their picks and checks the expected label. S1’s black light-primary pick is distinguished: [lc3-mutation-S1.log.txt:180](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-mutation-S1.log.txt:180) records that equality assertion failing, with build exit 0 and test exit 1. The prior fixture-coverage attack no longer succeeds.

2. **CONFIRMED — Consumer-scheme state fills.** [button.test.ts:175](/home/user/veneer-lc2/tests/src/styles/components/button.test.ts:175) checks the label, resting-fill equality, and separate hover and active readings against the declared/lowered expectations. S2 is distinguished at the added comparison: [lc3-mutation-S2.log.txt:7](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-mutation-S2.log.txt:7) records `[false, false]` against `[true, true]`; the declared case passes. [veneer.md:3002](/home/user/veneer-lc2/guides/veneer.md:3002) correctly limits the unchanged fill to rest and names the moving endpoints.

3. **CONFIRMED — Terminology and bytes.** The stale-name attack found consistent `$pair` and `$role-pairs` usage at [tokens:212](/home/user/veneer-lc2/src/styles/_tokens.scss:212), [mixins:221](/home/user/veneer-lc2/src/styles/_mixins.scss:221), and their callers. The rewritten comments use “channel triplet.” [lc3-build-base.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-build-base.log.txt:1) identifies the baseline; [lc3-gate-5.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-gate-5.log.txt:1) records byte identity. Independent SHA-256 readings match. An in-memory comparison accepts those files and rejects an appended-byte mutation.

4. **CONFIRMED — Titles, placement, and search retention.** Duplicating an island name in the markup and table is distinguished by [setupStyles.test.ts:2655](/home/user/veneer-lc2/tests/setupStyles.test.ts:2655); an in-memory duplicate control fails that condition. Self-transitions and repeated destinations are distinguished by the assertions at [setupStyles.test.ts:2670](/home/user/veneer-lc2/tests/setupStyles.test.ts:2670). The floor title names its actual readings. TypeScript’s parser confirms the separate documentation attachments at [setupStyles.ts:1185](/home/user/veneer-lc2/tests/setupStyles.ts:1185). [lc3-pin-search.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-pin-search.log.txt:1) retains the named searches and results. Search adequacy has the separate finding below.

5. **CONFIRMED — Enumerated syntax restrictions and recorded gate exits.** Inspection of [lc-3.diff:1](/home/user/scaffold/.orkestrel/veneer/units/lc-3.diff:1), corroborated by parsing the changed TypeScript, found no prohibited construct. Direct anonymous callbacks satisfy the stated exception. The individual gate logs agree with [lc3-gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-gates.log.txt:1): every named gate records exit 0. This ruling uses retained execution evidence; this lane ran no Vitest project or browser.

   The report’s test counts match the retained logs:

   | Reading | Reported result |
   |---|---|
   | Setup | `149 passed (149)` |
   | Guides | `20 passed (20)` |
   | Conformance | `26 passed (26)` |
   | Styles | `1431 passed (1431)` |
   | Scoped styles | `209 passed (209)` |

   The scoped result appears at [lc3-green-1.log.txt:180](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-green-1.log.txt:180).

**Outside the claims — F1: BROKEN, search patterns exclude ordinary color pins.** [lc3-pin-search.sh:16](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-pin-search.sh:16) uses `[^\n]*` in the label and `text-bg` patterns. In GNU grep’s extended regular expressions, that excludes the letter `n`.

Executing the exact patterns against stdin matches `.btn-primary { color: #fff; }` but misses `.btn-primary { font-weight: normal; color: #fff; }`. The corresponding tooltip and `text-bg-primary` controls behave identically. These remain single-line pins within the instrument’s claimed subject. Replacing the intervening expression with `.*` detects each control.

**Smallest fix:** replace `[^\n]*` with `.*`, rerun the named searches, and retain the corrected evidence. This finding concerns the search’s coverage; it establishes no surviving incorrect product pin. S1, S2, and the byte comparison remain valid.

**Attacked and held:** Reversing a transition can still satisfy the corrected “distinct” title; that title no longer claims ordering. An unlowered consumer declaration correctly preserves the shipped label and fills. Outline resting states remain outside the floor proof.

VERDICT: FAIL none; outside the claims: F1