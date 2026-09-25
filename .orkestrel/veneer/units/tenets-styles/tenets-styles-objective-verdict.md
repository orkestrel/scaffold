1. **CONFIRMED** — The PostCSS scan of [dist/src/styles/index.css:1](/home/user/veneer-probe/dist/src/styles/index.css:1) found no `:has()`, no unclassed tag-context selector, and no tag-only selector outside `reset` or `elements`. Controls containing `section:has(p)`, `h1 + p`, and a components-layer `p` were detected. Class-qualified composition and keyframe positions are correctly outside this prohibition.

2. **CONFIRMED** — The compiled selector inventory contains only Bootstrap’s anchor exclusions and the expressly excluded button scope. The anchor selectors match [bootstrap.css:359](/home/user/veneer-probe/node_modules/bootstrap/dist/css/bootstrap.css:359). A `div:not([class])` control was detected. E-ID-BUTTON-CASCADE remains outside this ruling.

3. **CONFIRMED** — Comparing parsed selector/property pairs found no important declaration in `reset`, `elements`, or `components` without an important Bootstrap twin. A novel important declaration was rejected by the comparison. The escape is documented accurately at [guides/veneer.md:3129](/home/user/veneer-probe/guides/veneer.md:3129): the consumer reopens the utility’s layer. Mutation: remove the utility’s `!important`; the unlayered override would then move the value, contradicting [tokens.test.ts:581](/home/user/veneer-probe/tests/src/styles/tokens.test.ts:581). Those assertions distinguish the mutation.

4. **BROKEN** — “Every layered rule under an unlayered consumer rule” is false for important declarations. The concrete counterexample is `.row-gap-1`: an unlayered `row-gap: 2rem !important` leaves the shipped value in place; reopening `utilities` wins. [tokens.test.ts:574](/home/user/veneer-probe/tests/src/styles/tokens.test.ts:574) asserts that distinction.

   The normal-declaration proofs are substantive: removing the quotation class’s resets breaks [quote.test.ts:33](/home/user/veneer-probe/tests/src/styles/components/quote.test.ts:33), and making the stack declaration important defeats the consumer override asserted at [stacks.test.ts:83](/home/user/veneer-probe/tests/src/styles/components/stacks.test.ts:83). Smallest correction: qualify the precedence claim as applying to normal declarations; preserve the documented important-utility contract.

5. **BROKEN** — `--vn-focus-reset` is declared at [src/styles/_mixins.scss:466](/home/user/veneer-probe/src/styles/_mixins.scss:466), but has no compiled `var()` reader or browser-source reader. The mixin default at [src/styles/_mixins.scss:363](/home/user/veneer-probe/src/styles/_mixins.scss:363) never becomes a shipped reader: every caller supplies `--vn-button-shadow` instead. [guides/veneer.md:7188](/home/user/veneer-probe/guides/veneer.md:7188) describes a reset consumer that the shipped cascade lacks. Changing this token cannot move that consumer; declaration-value assertions do not establish otherwise. Bind a real consumer and prove its override, or explicitly resolve the unused public-token contract. The excluded motion tokens are not this finding.

6. **BROKEN** — The canonical validation group lacks the claimed override proof. [validation.test.ts:624](/home/user/veneer-probe/tests/src/styles/components/validation.test.ts:624) overrides `--bs-form-valid-color`, not `--vn-form-valid` or `--vn-form-invalid`.

   Mutation: replace the canonical-token reads at [src/styles/_mixins.scss:503](/home/user/veneer-probe/src/styles/_mixins.scss:503) with their success/danger emphasis expressions. Default paints and mode differences remain identical, and overriding the Bootstrap alias still works. The rendered assertions do not distinguish this bypass of the canonical customization contract. Add canonical-token overrides and read the resulting feedback colors and control borders. The accounting gate’s declaration comparison is not that rendered proof.

7. **BROKEN** — The universal resolved-motion proof is absent for range thumbs. [form-range.test.ts:230](/home/user/veneer-probe/tests/src/styles/components/form-range.test.ts:230) explicitly substitutes declaration and media-query readings because the thumb’s computed transition is unavailable.

   Mutation: add a more-specific reduced-motion transition on `.form-range:enabled::-webkit-slider-thumb`. The exact-selector declaration checks and token readings remain unchanged; they do not distinguish the effective transition. The compiled scan found reduced-motion twins for the shipped non-panel transitions, so this finding concerns proof coverage, not an observed moving thumb. Supply a rendered temporal proof with a control that restores visible motion.

8. **BROKEN** — Canonical Elements values are explicitly outside the ledger at [guides/veneer.md:10213](/home/user/veneer-probe/guides/veneer.md:10213). Addition rows also record names rather than values.

   Executed in-memory mutation: replace `blockquote`’s `border-left: var(--vn-space-2) solid currentColor` with `97px solid currentColor`. Departure and addition drift remained empty. The addition row at [guides/veneer.md:10067](/home/user/veneer-probe/guides/veneer.md:10067) cannot distinguish those values. Doubling the canonical radius likewise produced no ledger drift. The separate token-reference proof can detect canonical-value drift; the claimed accounting gate cannot. Incorporate value-bearing checks for additions and the canonical reference map into accounting acceptance.

9. **BROKEN** — An unrecorded name outside known component prefixes escapes the accounting gate. Executed in-memory plant:

   ```css
   @layer components {
     .audit-unrecorded { color: red }
   }
   ```

   Departure and addition drift remained empty because [tests/setupServer.ts:2619](/home/user/veneer-probe/tests/setupServer.ts:2619) skips an unattributed selector. The control changing `.btn`’s color reported an unrecorded departure; an added `.btn` declaration also reported. Existing stale-departure and shipped-deferral controls distinguished their mutations. The hole is the membership boundary. Reject unattributed emitted rules or require explicit accounting for them.

10. **CONFIRMED** — The complete gate covers the pinned inventory despite its presence helper’s narrower scope. The explicit list compared at [tests/conformance.test.ts:258](/home/user/veneer-probe/tests/conformance.test.ts:258) equals the pinned inventory’s key set. Executed mutations removing each pinned key’s guide rows all changed that asserted list; none escaped. Removing `.link-opacity-10-hover:hover` also produced the expected missing-selector diagnostic. The assertions distinguish omission from the passing case. This confirmation concerns the pinned record, not automatic coverage of future inventory additions.

11. **NOT-EVIDENCED** — The supplied evidence does not establish component-class precedence over preflight across the claimed property population. [preflight.test.ts:211](/home/user/veneer-probe/tests/service/tailwind/preflight.test.ts:211) mounts the unclassed fixtures at [tests/setupStyles.ts:1891](/home/user/veneer-probe/tests/setupStyles.ts:1891) and measures element-layer treatments. The component consumer comparison at [consumer.test.ts:143](/home/user/veneer-probe/tests/service/tailwind/consumer.test.ts:143) uses the recipe without preflight.

   Mutation: remove a `.form-control` border declaration; the neutral preflight fixtures cannot distinguish that component regression. Missing evidence: an executed component/preflight overlap matrix reading resolved properties without important overrides. The supplied landing log carries no Tailwind service-stage result that settles this gap.

12. **BROKEN** — Disabled `.btn-link` paint has no corresponding rendered case. Its distinct disabled-color binding ships at [src/styles/components/_button.scss:199](/home/user/veneer-probe/src/styles/components/_button.scss:199). The link-specific style case at [button.test.ts:363](/home/user/veneer-probe/tests/src/styles/components/button.test.ts:363) exercises resting, hover, and press states; the journey at [integration.test.ts:1498](/home/user/veneer-probe/tests/app/browser/integration.test.ts:1498) adds keyboard focus, but never disables that specimen. The filled and outline role matrices exclude `link`.

   Mutation: change only `.btn-link`’s disabled-color binding. Those rendered assertions do not distinguish it. Add a disabled link-button case asserting its resolved paint. Existing role-state coverage and the separate declaration ledger do not supply that missing observation.

Outside the claims: none.

VERDICT: FAIL 4, 5, 6, 7, 8, 9, 11, 12; outside the claims: none