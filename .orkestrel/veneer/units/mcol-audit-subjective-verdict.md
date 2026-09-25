# E-ID-MOTION-COLLAPSE audit: subjective lane verdict

**Lane:** `reviewer` on Opus 5.5, holding the **subjective** lane, in a clean context. The work under audit was written by `opus` on Opus 5.5, which is this lane's engine, so I attacked it harder. This is a source-and-log review: I read the retained logs, the diff, and the worktree at `/home/user/veneer-mcol` (`9e1fe4e`), and executed nothing.

**Dispatch note:** the brief names no report file and assigns no command, so it has no dispatch defect.

## Numbered verdicts

**1. The panel motion: CONFIRMED.**
- **Rules:** `/home/user/veneer-mcol/src/styles/components/_collapse.scss:21` and `:30` write `height` and `width` over `var(--vn-motion-panel) var(--vn-ease-panel)` through the `transition` mixin, and nothing else.
- **Proof:** the motion case in `tests/src/styles/components/collapse.test.ts`, the case at line 176 in `mcol-red.log.txt`, checks the following:
  - the declared `transition-property` is the size alone;
  - the running list is the sampled transition alone;
  - the duration and curve equal the token specimen;
  - a doubled factor gives a ratio of 2;
  - at a zero factor and at every factor under reduced motion, nothing is sampled, `getAnimations()` is empty, and each panel settles at its end size.
- **Root `interpolate-size`:** the change writes none, so the design verdict row holds. The cascade does carry a pre-existing `html { interpolate-size: allow-keywords }` at `/home/user/veneer-mcol/src/styles/elements/_html.scss:5`. The collapse motion does not depend on it, because the engine writes pixels in both directions (`src/browser/Collapse.ts`, where `hide` removes the inline size around line 415). See referral R2.

**2. The chevron motion: CONFIRMED.**
- **Rule:** `/home/user/veneer-mcol/src/styles/components/_accordion.scss:36` declares `transform var(--vn-motion-feedback) var(--vn-ease-standard)`. `:80-83` keeps `transform: var(--bs-accordion-btn-icon-transform)`, which is `rotate(-180deg)` at `:33`, on `:not(.collapsed)::after`. `:94` applies the transition through the mixin.
- **Button:** `--bs-accordion-transition` (`:18-22`) is not in the diff.
- **Proof:** `accordion.test.ts:616` pins the expanded start frame as `matrix(-1, 0, 0, -1, 0, 0)`. This claim is about the rendered cascade. The guide's wording about it is ruled under claim 6.

**3. The proofs: CONFIRMED.**
- **Red, then green.** `mcol-red.log.txt` lines 84–188 show the four listed cases failing with `AssertionError`, exit 1. `mcol-green.log.txt` reads 51 passed, exit 0.
- **The chevron case sits at line 562 in the red run and in every plant log.** That agrees with the report's statement that only the case's comment changed, and that the change kept the comment's line count.
- **The plants.** Each plant log names an `AssertionError` and records a restore with `identical=true`:
  - `mcol-plant-collapse-literal.log.txt:92-123, 148`;
  - `mcol-plant-chevron-literal.log.txt:92-120, 154`;
  - `mcol-plant-collapse-opacity.log.txt:94-148, 165`;
  - `mcol-plant-fade-order.log.txt:89-90, 116`.
- **`sampleTransition` takes no pseudo-element.** Its signature at `/home/user/veneer-mcol/tests/setupBrowser.ts:2176` is `(element, property)`, and it reads `element.getAnimations()` with no subtree.

For each case, this is the mutation that breaks it and whether the assertions tell it apart from the passing case:
- **Collapse declaration case.** Mutations: the `0.35s ease` literal restored, or opacity added. Both change the declared text, and the plants read red. The case distinguishes both.
- **Collapse motion case.**
  - The release timing restored gives `[350, 'ease', …]` against the specimen.
  - A literal `0.25s cubic-bezier(…)` gives a doubled ratio of 1, not 2.
  - An opacity entry breaks the declared-list assertion.
  - A transition written outside the mixin samples a transition under reduced motion, where `undefined` is expected.
  - A deleted transition fails the presence assertion (`toBeDefined`) with an `AssertionError`.
  - The case distinguishes every one of these.
  - Limit: the midpoint assertion ("past half the travel") also passes on the release's `ease`. The curve's identity rests on the easing-string equality, not on the frame.
- **Accordion reduced-motion slot case.** Mutation: the chevron literal restored. It is distinguished (plant red).
- **Chevron case.** The case reads frames and longhands, not a running transition. Mutations:
  - **Another duration or curve.** The resolved longhands then differ from the specimen. A transition takes its timing from the after-change longhands, so the case distinguishes this.
  - **A chevron that never turns**, for example with `--bs-accordion-btn-icon-transform: none`. `from` becomes `[rest, rest]` against `[turn, rest]`, so it is distinguished.
  - **A turn that jumps**, with a zero duration or no transition. The resting `to` differs from `from`, so it is distinguished.
  - **A transition declared for one direction only.** That button's `to` differs from `from`, so it is distinguished.
  - **A transition written outside the mixin.** The reduced-motion readings differ from `['none', '0s', 'ease']`, so it is distinguished.
  - **Not distinguished:** a positive `transition-delay` and the rendered midpoint of the curve. No claim covers either one.
- **Rewritten fade case.** Mutation: the fade rule loaded after the collapse rule. It is distinguished (plant red). The case pins no collapse duration or curve, so "without pinning the collapse timing" holds. Its comment overstates what it avoids pinning; see F3.
- **Is the frames proof the right shape?** Yes, for this unit. The brief made `tests/setupBrowser.ts` report-only and said "add no reader", and the frames proof separates every mutation the claim names.
  - It is an interim shape. Section § Proof of the design verdict asks for `getAnimations()` timing and a midpoint seek. The returned patch, an optional `pseudo` parameter that mirrors `readStyle(element, property, pseudo)`, is the right end state.
  - After that patch lands, the chevron case must switch to `sampleTransition(button, 'transform', '::after')`, including the midpoint. See R3.

**4. The ledger rows: CONFIRMED.**
- **Equality.** `mcol-conformance-first.log.txt:55-57` prints the accordion icon-transition row and both `collapsing` rows. They equal `guides/veneer.md:7848` and `:8240-8241`. `mcol-conformance.log.txt` reads 45 passed, exit 0.
- **Additions.** No added selector or declaration exists, so no § Additions row applies.
- **Reclassification.** The LEDGER-RETUNE resolver would reclassify **all three rows as `retuned`**:
  - the chevron resolves to `0.15s ease` against the release's `0.2s ease-in-out`;
  - both `collapsing` rows resolve to `0.25s cubic-bezier(0.32, 0.72, 0, 1)` against the release's `0.35s ease`.
  - Rule 1 of `ledger-values-design-verdict.md` decides a retune by the resolved value.
- **Until then**, each row is false under the legend at `guides/veneer.md:7835`. The MODAL verdict (`mmod-audit-verdict.md:23, 36-37`) already carries that defect to LEDGER-RETUNE. The unchanged `--bs-accordion-transition` row resolves to the release value at a factor of 1 and stays `tokenized`.

**5. Engine and showcase: CONFIRMED.**
- **My own searches came back empty:**
  - `0\.35s|\b350\b|0\.2s|\b200\b|ease-in-out|0\.25s|\b250\b|cubic-bezier` over `tests/src/browser/Collapse*.ts` and `tests/app/**/*.ts`;
  - `0\.35s|0\.2s|\b350\b` over `app/`;
  - a case-insensitive search over all of `tests/` for a collapse or accordion subject within 120 characters of those literals.
- **`Collapse.test.ts` asserts only positive durations**, at lines 61, 63, 433, and 440, as E32 requires.
- **Logs.** `mcol-collapse-browser.log.txt` reads 49 passed, exit 0, and `mcol-app.log.txt` reads 223 passed, exit 0.
- **Size mechanism.** `src/browser/**` is absent from `mcol-status.txt`, so J-COLLAPSE-SIZE's size mechanism is untouched.

**6. The guide prose: BROKEN.**
- **Failing state.** A button that takes the `collapsed` class. Its chevron turns to `none`, not to `rotate(-180deg)`. The unit's own zero-factor reading shows this at `accordion.test.ts:631-634`, where the button that took `collapsed` settles at `rest`.
- **The false sentence.** `/home/user/veneer-mcol/guides/veneer.md:5296-5298` reads "The chevron turns its `transform` over the same `--vn-motion-feedback` token on the `--vn-ease-standard` curve, and ends at the release's own `rotate(-180deg)` half turn." That holds for one direction only. The partial comment at `_accordion.scss:34-35` ("the half turn it ends at") has the same fault.
- **Required change.** Rewrite the guide sentence, for example: "The chevron turns its `transform` between `none` and the release's own `rotate(-180deg)` half turn over the same `--vn-motion-feedback` token on the `--vn-ease-standard` curve." Make the same correction to `_accordion.scss:34-35`.
- **Second required change, the lesser item.** Line 4867-4868 of `guides/veneer.md` says a panel "decelerates into its end size". That sentence is a departure bullet, but it names no difference from the release. The release's `ease` curve, `cubic-bezier(0.25, 0.1, 0.25, 1)`, also ends at zero slope. The difference a consumer sees is that the panel curve starts at speed and has no ease-in. Name that difference, for example: "…sooner than the release's, starting at speed rather than easing in, and settling into its end size". The fade bullet at `:4812-4813` shows the contrast form.
- **What held:**
  - the § Factors exception list at `:7334-7341`, which is true against every partial's literals;
  - both proof paragraphs, at `:4876-4884` and `:5329-5341`, which match their cases;
  - the chevron departure bullet at `:5317-5320`;
  - the collapse motion paragraph at `:4850-4857`.
- **Stale text.** No remaining `0.35s` or `0.2s` sentence about collapse or the chevron is left; the only hits are the release values the bullets and rows quote.

**7. The design verdict: CONFIRMED.**
- **Collapse panel row:** the size moves over panel tokens, with no opacity and no root `interpolate-size` written. Delivered.
- **Accordion chevron row:** Elements' marker timing, `transform` over `--vn-motion-feedback` on `--vn-ease-standard`, with `rotate(-180deg)` kept and the button transition kept. Delivered.
- **Unit 3:** its owned partials and tests. Delivered, and each value has a departure row and bullet.
- **Exception.** The chevron's proof falls short of § Proof, which asks for `getAnimations()` timing and a midpoint seek. That is a declared deviation with a returned patch, not a defect in the change; it needs a carrier (R3).

**8. Scope and gates: CONFIRMED.**
- **Scope.** `mcol-status.txt` lists only the six owned files. The guide hunks fall inside the owned sections: § Collapse classes, § Accordion classes, § Factors, and the § Departures tables. The `fade.test.ts` hunk is the single case brief 2 granted.
- **Gates.** Each gate log shows `exit=0`:
  - oxfmt `--check` over the owned files;
  - `npm run check`;
  - `npm run lint:check`;
  - `npm run test:setup`: 357 passed;
  - `npm run test:conformance`: 45 passed;
  - `npm run test:guides`: 26 passed;
  - `npm run test:policy`: 109 passed, 1 skipped;
  - `npm run build:src`;
  - the engine proofs;
  - `npm run test:app`.

## Findings outside the claims

**F1. The collapse partial's comment misstates the close.**
- **Where:** `/home/user/veneer-mcol/src/styles/components/_collapse.scss:11` says "An engine writes the size each move ends at inline."
- **What is wrong:** a closing move ends at this rule's `height: 0`, not at an inline size. Three sources show it:
  - `Collapse.ts` `hide` writes the measured start size, then calls `host.style.removeProperty(dimension)` around line 415;
  - `guides/veneer.md:1092-1095` says "clears the inline size, so the cascade's zero height transitions";
  - the unit's own test comment at `collapse.test.ts:223` says "its removal hands the size to the closing rule's zero".
- **Why it matters:** a reader of the partial will believe the engine drives both ends of the move inline.
- **Right looks like:** "An engine writes inline the size an opening panel grows to, and clears the inline size so a closing panel shrinks to this rule's zero."

**F2. The accordion partial's header comment is false after this change.**
- **Where:** `/home/user/veneer-mcol/src/styles/components/_accordion.scss:6` says "Every value here is Bootstrap 5.3.8's own, apart from the forced-colors focus outline."
- **What is wrong:** at `:36`, the chevron now turns at `0.15s ease` against the release's `0.2s ease-in-out`. The ledger records that row at `guides/veneer.md:7848`, and the header's list of exceptions does not include it. Before this change, the chevron carried the release's own value, so this change is what makes the sentence false.
- **Right looks like:** add the chevron timing to the exceptions, for example: "apart from the forced-colors focus outline and the chevron's timing, which turns on the feedback motion tokens".

**F3. The rewritten fade case's comment overstates what it avoids pinning.**
- **Where:** `/home/user/veneer-mcol/tests/src/styles/components/fade.test.ts:238-239` says "the case pins the order and none of that rule's values".
- **What is wrong:** line 250, `expect(closing?.[0]).toBe('height')`, pins the collapsing rule's property. The collapse-opacity plant reddened this load-order case on exactly that pin: `mcol-plant-collapse-opacity.log.txt:147-148` reads `expected 'height, opacity' to be 'height'`.
- **Why it matters:** brief 2 made this case prove load order alone. The pin couples it to the collapse's property list and adds no discrimination. With the collapsing rule absent, `closing` reads `['all', '0s', 'ease']` and the `compound` equals `closing` assertion (`toEqual(closing)`) already fails.
- **Right looks like:** replace line 250 with `expect(closing).not.toEqual(fading)`, which is the "rather than that of the fade rule" the title states, and keep the comment. The fade-order plant still fails through line 252. The other option is to keep the pin and reword the comment to "none of that rule's timing".

## Attacked and held

- **Chevron bullet's lead.** "The chevron turns on the feedback motion tokens" (`guides/veneer.md:5317`) names `--vn-ease-standard` as a feedback token. It matches the section's "panel motion tokens" lead and the design verdict's reading of `--vn-motion-*` as a kind of motion. Held as coherent vocabulary.
- **"Closing box" vocabulary.** The phrase "closing box" for `.collapsing` (`guides/veneer.md:4834, 4850`; `collapse.test.ts:211`) sits beside "marks an opening panel and a closing one alike". The term predates this change. It is adjacent, not a defect of this change.
- **"Staged preference" and "reduced-motion condition."** Both appear in the collapse proof paragraph. They name different readings: the emulated media and the declared rule condition. Held as deliberate.
- **Collapse midpoint assertion.** It does not separate the panel curve from `ease`. It does not claim to; the easing equality carries the curve.
- **Test titles.** Each new or rewritten title names what its case proves, and each "The mutation this catches" comment matches a plant that reads red.

## Referrals

- **R1, to the objective lane.** The returned `sampleTransition` patch filters on `animation.effect instanceof KeyframeEffect`. That makes the `@throws Thrown when the transition carries no effect` line (`tests/setupBrowser.ts:2150`) and the `requireValue(transition.effect, …)` guard (`:2184-2187`) unreachable. The patch updates neither.
- **R2, to the Orchestrator.** Claim 1's "no root `interpolate-size` is written" holds only if it means "by this change". The cascade ships `interpolate-size: allow-keywords` on `html` at `src/styles/elements/_html.scss:5`. State which reading a successor claim intends.
- **R3, to the Orchestrator.** The `sampleTransition` pseudo-element patch has no named carrier. Neither does the chevron case's move to a running-transition reading with a midpoint, which § Proof requires. Section § Proof of the design verdict also says the helper "lands in `tests/setupStyles.ts`", but it lives at `tests/setupBrowser.ts:2176`.

VERDICT: FAIL 6; outside the claims: F1, F2, F3
