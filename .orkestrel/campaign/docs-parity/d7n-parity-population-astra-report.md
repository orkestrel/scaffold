1. CONFIRMED — Independent report groups can preserve caller selection.

   Guide’s earlier assertions separately required function examples and method examples; scaffold’s earlier assertions required a configured-language fence and matched-title equality. See [Guide’s retained checks](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/evidence/d7n-guide-parity-core-pack/diff-before.txt:1343) and [scaffold’s retained presence check](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/evidence/d7n-scripts-ownership/product.diff.txt:2401).

   The attack removes a member’s source example and guide invocation while retaining its declaration and method table. Root’s [built-artifact reading](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-parity-population-root-reading.md:23) reports example coverage failure while method membership and matched drift remain empty. These are distinct assertions.

   Replace the `ParityReport.examples` array with a readonly `ParityExampleReport` containing independently assertable finding arrays. Use this population mapping:

   | Member | Finding population |
   | --- | --- |
   | `fences` | Indexed guides without a fence in `ParityOptions.language` |
   | `functions` | Documented functions lacking the existing fence-mention or source-example evidence |
   | `methods` | Documented methods lacking the existing interface/class example evidence |
   | `titles` | Indexed guides without a guide-fence title matching a top-level source example |

   Scaffold asserts `examples.fences` and selects its own spec from `examples.titles`. Guide asserts `examples.functions`, `examples.methods`, and its own spec’s `examples.titles`. Each caller retains an explicit own-row existence assertion. Leave language admission in `report.fences`.

2. CONFIRMED — The report can preserve the title pin without downstream recomputation, provided its population remains explicit.

   The existing pin uses the no-argument `Source.examples()` method. It does not include member examples. See [scaffold’s pin](/C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:262) and [Guide’s pin](/C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:100).

   The attack removes every top-level pairing while retaining an equal member pairing. A replacement based on `collectTitles` would accept that input because [the helper includes documented members](/C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:2455). That replacement would weaken the earlier pin.

   Compute `examples.titles` from top-level source examples and guide fences, without a language filter. Keep `report.drift` on the existing broader head/member population. A title-presence finding must remain independent of an equality finding: matching titles with unequal bodies must pass presence and fail equality.

   Implement these computations in [Parity](/C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:251), declare the report shape in [types.ts](/C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:183), and replace the consumer loops with report selection. Do not change `collectTitles` or `findDrift` to accommodate the narrower presence pin.

3. CONFIRMED — Output grouping fits the accepted boundary better than input switches, but preserving scaffold requires supplemental method populations.

   Input switches would make an empty report ambiguous: inspection might have found agreement, or the caller might have disabled inspection. Output grouping computes the findings independently and leaves assertions with the caller, as the [accepted extraction ruling requires](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guides-extraction-design-verdict.md:12). Keep `ParityOptions` unchanged.

   Preserve the existing `report.methods` population for Guide. Add independently assertable `sections` and `declarations` finding arrays for scaffold’s earlier checks:

   - `sections` reports missing required headings and vacant documented populations, including an empty Methods population.
   - `declarations` traverses the public source surface and reports a behavioral declaration lacking its required method table, or a nonempty implementing class whose members differ from its named interface.

   These additions preserve the caller distinction without forcing Guide to adopt scaffold’s source-driven checks. Retain the earlier nonempty-member admission rule; do not introduce a requirement for declarations the earlier check skipped.

   Guide also needs a global `report.input` assertion before iterating `parity.rows()`. Its earlier loop required every indexed guide text. The replacement [iterates only constructed rows](/C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:130), while [row construction skips absent specs](/C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:129).

   Update the owning guide’s report documentation and consumer assertions with these contracts. Inventory gathering, filesystem writes, command handling, and executable demonstrations remain downstream.

4. UNRESOLVED — The required permanent controls have not been demonstrated against the corrected contract.

   Root’s executed readings establish defects in the held artifact. They do not establish the proposed report or its permanent tests. Add the following discriminating controls to [Parity’s direct tests](/C:/Users/mikes/WebstormProjects/guide/tests/src/core/Parity.test.ts:48), then exercise the actual consumer selections:

   - Remove a function’s coverage evidence while retaining method coverage; reverse the affected population in a separate case.
   - Leave only admitted fences in a language different from the configured example language. Admission must pass while configured-language presence fails.
   - Retain an equal member-only pairing after removing top-level pairings. Drift must remain empty while top-level title presence fails.
   - Retain matching titles but change the paired body or language. Presence must pass while drift fails.
   - Put a valid pairing in another indexed guide while the caller’s own guide lacks one. Selecting the caller’s spec must still fail.
   - Remove a behavioral declaration’s entire method table while retaining the declaration. Source-driven coverage must fail even though documented-group iteration has no work.
   - Retain an implementing class method while omitting another documented interface method. The supplemental declaration check must fail.
   - Add an indexed missing spec. Guide’s global input assertion must fail before omitted rows can disappear from its assertions.

   Keep these tests on real `Guide`, `Source`, and `Parity` implementations. Record their failing and corrected readings; preserve the actual scaffold command proof.

Findings outside the numbered claims concern the held extraction’s acceptance, rather than the feasibility of the recommended contract:

- **M — Required method populations disappeared.** Removing the fixture’s Methods section leaves `Source.methods('WidgetInterface')` populated and `report.methods` empty. Root reproduced this through the built API; see [the method-population reading](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-parity-method-population-root-reading.md:9). Root also reproduced the narrower class mismatch: interface members `open` and `render`, implementation member `render`, and an empty methods report. The retained [source-driven loop](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/evidence/d7n-scripts-ownership/product.diff.txt:2969) rejects these states. The supplemental groups described in claim 3 carry this repair.

Attacked and held: reporting missing example coverage is valid even when scaffold does not assert that coverage. Guide’s existing exhaustive assertions remain required. Untitled examples remain coverage evidence, unmatched titles remain outside equality, and member pairings remain valid equality subjects. None of those behaviors satisfies the narrower top-level title-presence pin.

VERDICT: FAIL 4; outside the claims: M
