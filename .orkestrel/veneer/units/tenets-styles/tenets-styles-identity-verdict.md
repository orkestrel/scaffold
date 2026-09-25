**Lens:** subjective lane, identity lens (reviewer, Opus 5.5). Scope: the tenets "Make Elements the visual and interaction reference" and "Preserve Bootstrap compatibility while owning the implementation", and exit criteria 2, 3, and 8. I read the source only and ran nothing, because this lane has no shell. Every mutation below is derived from the code, and each one names the command that would settle it.

## Numbered verdicts

**8. Elements identity is recorded: BROKEN.**
- **What breaks it:** the Elements values that ship through canonical tokens are not rows of § Departures or § Additions. The accounting gate compares text, so it cannot see them.
- **Primary fill:** the `--bs-primary` value on the `:root` selector ships Elements' `oklch(0.48 0.255 264)` (the primary row of § Semantic roles, around guides/veneer.md:6967). Bootstrap's value is `#0d6efd`.
  - § Departures records only `#0d6efd → var(--vn-color-primary-base)`, labelled `tokenized` (guides/veneer.md:9760).
  - No Departures or Additions row carries the Elements value.
- **The label hides identity changes:** two rows share the `tokenized` label, and only one of them changes the value.
  - `.btn --bs-btn-font-size`: `1rem → var(--vn-size-2)` (7472). The `--vn-size-2` token is `0.875rem` from Elements (7107), so this row changes the look.
  - `.accordion --bs-accordion-btn-padding-y`: `1rem → var(--vn-space-8)` (7424). The `--vn-space-8` token is `1rem` (7122), so this row changes nothing.
- **The guide's definition is false for identity rows:** it says a `tokenized` row "routes the release value through a Veneer token" (7413).
- **The code confirms the gap:**
  - The `classifyDeparture` function returns `tokenized` whenever a `--vn-*` name appears in the value, whatever the token resolves to (tests/setupServer.ts:1631).
  - The `collectAdditions` function skips every registry name (tests/setupServer.ts:2643, 2660).
  - The guide says so itself: § Outside the ledger states that "the ledger compares no canonical value" (10209–10217).
- **Mutation:** set the light primary fill in src/styles/_tokens.scss to `#0d6efd`, which reverts the identity to stock Bootstrap.
  - Derived result: every case in `describe('cascade ledger')` stays green (tests/conformance.test.ts:286–373).
  - Only the reference-map proof and the calibrated-tier proof redden (tests/src/styles/tokens.test.ts:70–137 and :155–170). Those guard the identity, but neither is the accounting gate, and neither writes a departure.
  - Settle it with the mutation, then `npm run test:conformance`.
- **Fix — invariant:** a Departures row whose Veneer value resolves to something other than the release value must be told apart from a row that only routes the release value. The ledger must redden when a token's value changes but its row's class does not.
  - Proposed way: classify a read of a token whose § Reference map `Source` cell is `elements` as its own departure member, for example `retuned`, separate from `tokenized`. The `collectReferenceRows` function already returns that `Source` cell.
  - Then correct the definition at guides/veneer.md:7413 and the paragraph at 10213–10217.
- **Fix — constraint:** keep the ledger textual. Do not replace it with a computed-value comparison, because rows that differ only in notation, such as `transparent` against `rgba(0, 0, 0, 0)`, are recorded on purpose (7405–7407).

**9. The accounting gate: CONFIRMED.**
- **Unminified compile:** the `compileExpandedCascade` function compiles with `style: 'expanded'` (tests/setupServer.ts:1496–1503). Its output is compared against the recorded values in inventory.json (`collectValueGaps`, 2483–2571).
- Every gate and every proof reads its verdict from the same `scanLedgerDrift` function (2755–2766).

Each of the four cases has a proof that fails under a named mutation:

- **Unrecorded value difference.** The gate is at conformance.test.ts:333–335.
  - Proof: tests/setupServer.test.ts:2354–2369 lists 7 unrecorded rows. The theme dark plant at conformance.test.ts:294–310 and 326–329 expects a non-empty list of theme rows.
  - Mutation: make `unrecorded` return `[]`. Both assertions fail, so they tell the mutation apart from the passing case.
- **Unrecorded extra name.** The gate is at conformance.test.ts:341–343.
  - Proof: the `.form-control { letter-spacing }` plant (311–321 and 349–356), plus setupServer.test.ts:2380–2389 and 2305–2352.
  - Mutation: stop `collectAdditions` from emitting `declaration` or `property` rows. The expected non-empty lists fail.
- **Stale departure.** The gate is at conformance.test.ts:337–339.
  - Proof: setupServer.test.ts:2370–2379 rewrites `#fff` to `#eee` in a scratch guide that `readDepartures(path)` reads. It expects exactly one stale line.
  - Mutation: make `stale` return `[]`. The assertion fails.
- **Stale deferral.** The gate is at conformance.test.ts:363–365, which runs `scanShippedDeferrals` over the built cascade.
  - Proof: setupServer.test.ts:2395–2409 covers a selector with its combinator spacing and a custom property.
  - Mutation: make the scan return `[]`. The `['.btn>.label']` and `['--bs-btn-color']` assertions fail.

**10. Baseline coverage: BROKEN.**
- **What holds today:** every component key in tests/fixtures/oracle/inventory.json (the `components` map, lines 7–111006) appears in the shipped list. I checked this by hand against tests/conformance.test.ts:118–253.
- **What breaks:** no gate reads the inventory's key set to check this partition.
  - The shipped list is written by hand. It is compared only with `collectShippedComponents(rows)` (258), which derives from the guide's rows (tests/setupServer.ts:2932–2953).
  - The `scanCompatibilityPresence` function walks only the guide's rows and its deferrals (2979–3031).
  - The only code that reads `Object.keys(inventory.components)` is the spacing-grammar case (tests/setupStyles.test.ts:2555), the selector index (tests/setupServer.ts:2352), and the Excluded candidates (2997).
- **Failing state:**
  - The inventory carries the `vr` key (inventory.json:81213, with empty properties at 81282).
  - Delete its only Compatibility row (guides/veneer.md:10374) and the `'vr'` entry (tests/conformance.test.ts:248).
  - `vr` is then shipped, deferred, and excluded in none of the guide's states. Its rules fall outside the ledger through the withheld-key branch (tests/setupServer.ts:2417 returns `undefined`, and 2620 skips it).
  - No stale ledger row reddens, because `vr` has no Departures or Additions rows (grep for `` ^\| `vr` `` returns nothing).
  - Derived result: the suite stays green. A re-pinned inventory that adds a key reddens nothing either.
  - Settle it with the mutation, then `npm run test:conformance`.
- **Fix:** in conformance.test.ts, assert that the sorted `Object.keys(readOracleInventory().components)` equals `collectShippedComponents(rows)` plus the keys whose every selector and property is a deferral row with an owner or `Excluded`. Derive the list at 118–254 from that assertion instead of writing it by hand.

## Findings outside the claims

None substantiated beyond the breaks recorded under claims 8 and 10.

## Attacked and held

- **Claim 9, same scan:**
  - Attack: the plants might prove a different comparison than the gate.
  - Result: held. Both gate and plants use `scanLedgerDrift` and the real `readDepartures` and `readAdditions` readers on a scratch guide.
- **Claim 9, built cascade:**
  - Attack: the gate might read the minified build.
  - Result: held. Value comparison uses the expanded compile. The deferral scan reads the built cascade, which is correct for a presence check.
- **Priority, which the ledger cannot see:**
  - Adjacent case: the ledger does not compare `!important`.
  - Result: correct. The `declaration priority` case owns that comparison (conformance.test.ts:375–408).
- **Claim 10, withheld keys:**
  - Attack: a key could sit at `accepted` status.
  - Result: held. The only `accepted` rows are engine rows and Button's non-CSS rows (guides/veneer.md:10329–10337 and 10497–10517). They withhold no CSS key.
- **Claim 8, literal values:**
  - Adjacent case: Elements values written as literals in the partials, for example the `dl` grid and the `blockquote` rule.
  - Result: correct. They are recorded as § Additions rows (10057–10075), and the ledger reddens on any value that is not recorded.

## Referrals (to the objective lane)

- **Unclaimed rules:** the `collectAdditions` function drops any rule no shipped key claims (tests/setupServer.ts:2619–2620), and no case asserts that set is empty. Exit criterion 2 requires every emitted selector to map to a record. Run a sweep of the unclaimed set over the expanded compile.
- **Source provenance:** no gate checks a § Reference map `Source` cell against the release. The retained-alias lists pin only some `bootstrap` rows (tests/setupStyles.ts:4135–4198). Decide whether a `bootstrap` label can carry a value other than the release's without any gate reddening.

VERDICT: FAIL 8, 10; outside the claims: none
