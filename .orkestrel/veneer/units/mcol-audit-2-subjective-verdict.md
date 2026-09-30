E-ID-MOTION-COLLAPSE audit, round 2: subjective-lane verdict

Lane: `reviewer` on Opus 5.5. I held the subjective lane in a clean context. Opus 5.5 also wrote the work under audit, so I attacked it harder. I ran nothing and edited nothing, so every ruling here comes from source and retained logs. I read the diff, the shared diff, the status, the worktree at `6c6a0ce`, the built `dist/src/styles/index.css`, and these logs, all under `/home/user/scaffold/.orkestrel/veneer/units/mcol-instruments-2/`: `mcol-red-2-reader.log.txt`, `mcol-red-2-chevron.log.txt`, every `mcol-plant-*.log.txt`, and every gate log. The brief names no report file and assigns no command, so it has no dispatch defect.

## Numbered verdicts

**1. The reader: CONFIRMED.**
- **Reader code.** `/home/user/veneer-mcol/tests/setupBrowser.ts:2185-2211` does what the claim says:
  - it reads `getAnimations({ subtree: pseudo !== undefined })`;
  - it keeps the `CSSTransition` whose effect is a `KeyframeEffect` with `target === element` and `pseudoElement === (pseudo ?? null)`;
  - it reads both frames through `readStyle(element, property, pseudo)`;
  - a transition with no keyframe effect fails the filter and returns `undefined`.
- **Doc block against the signature.**
  - `@param pseudo` (`:2149-2151`) mirrors the `readStyle` third parameter and states the default.
  - `@returns` (`:2152-2154`) matches the early return.
  - `@throws` (`:2155`) lists exactly the remaining throws (`:2203-2205`).
  - The removed guard leaves no unreachable clause, so round 1's R1 is closed.
  - The signature and the doc block read as one contract.
- **Red, then green.**
  - `mcol-red-2-reader.log.txt:35-36` shows the pseudo-element case failing with an `AssertionError` at `:2179`.
  - `mcol-red-2-reader.log.txt:47-48` shows the renamed case failing with the old throw. See referral R2.
  - `mcol-setup-browser-2.log.txt:30,34` reads 101 passed, exit 0.
- **Plants.** Each names an `AssertionError` in the pseudo-element case and restores identically:
  - `reader-pseudo` fails at `:2177`, where `::before` read the `::after` transition (`mcol-plant-reader-pseudo.log.txt:45,59-63,71`);
  - `reader-target` fails at `:2195` (`mcol-plant-reader-target.log.txt:45,71`).
- **Mutations and whether the case distinguishes them.**
  - A reader that takes the element's own list only (the round-1 shape) fails at `:2179`. Distinguished.
  - Dropping the pseudo-element filter fails at `:2177`. Distinguished.
  - Dropping the target filter fails at `:2195`. Distinguished.
  - Reading the frames from the host instead of the pseudo-element fails at `:2181`, because `start` is not `'10px'`. Distinguished, but by reading, not by a run.
  - A reader that never pauses fails at `:2187`. Distinguished.
  - A reader that always reads the subtree list with every filter intact behaves identically. That is not a defect.

**2. The chevron proof: CONFIRMED.**
- **What the case reads.** `/home/user/veneer-mcol/tests/src/styles/components/accordion.test.ts:585-597` samples `sampleTransition(button, 'transform', '::after')` on the closing button and on the opening button, then calls `finish` and reads the settled frame. The assertions:
  - `:626-630` compares the duration, the easing, and the start frame against `readDuration(specimen)`, the specimen's curve, and the frame each chevron left;
  - `:625` requires the midpoint to be neither end frame;
  - `:619` and `:632` require the settled frames to be `['none', turn]` for the closing and the opening button;
  - `:634-643` requires a doubled ratio of 2 on the same curve;
  - `:645-665` requires, at the zero factor and under reduced motion, no sample, each chevron already on its end frame, and the listed transition values.
- **Mutations the case distinguishes.**
  - **The release's `0.2s ease-in-out` restored.** It fails at `:626` (`mcol-plant-chevron-literal.log.txt:119-120`).
  - **A literal `0.15s ease`.** The doubled ratio reads 1, and at the zero factor a sample exists where `undefined` is expected. Distinguished, by reading.
  - **A frozen turn written with `steps(1, end)`.** It fails at `:625` (`mcol-plant-chevron-frozen.log.txt:119-120`).
  - **The transition written outside the mixin.** Under reduced motion a sample exists and the `transition` values differ. Distinguished.
  - **A transition declared for one direction only.** That button has no sample, so `:621` fails. Distinguished.
  - **`--bs-accordion-btn-icon-transform: none`.** `left` reads `[rest, rest]` at `:618`. Distinguished.
- **Mutations the case does not distinguish.** No claim covers either one:
  - a positive `transition-delay`;
  - `rotate(180deg)` in place of `rotate(-180deg)`, which turns the chevron the other way. Both serialize to `matrix(-1, 0, 0, -1, 0, 0)`, and the midpoint only has to avoid both end frames.
- **The other cases the report lists.**
  - **Reduced-motion slot case.** Mutation: the chevron literal restored, or the frozen easing. Both are distinguished: `mcol-plant-chevron-literal.log.txt:92-93` and `mcol-plant-chevron-frozen.log.txt:93-94`.
  - **Both collapse cases.** Mutation: the collapse literal restored, or opacity added. Both are distinguished: `mcol-plant-collapse-literal.log.txt:92-123` and `mcol-plant-collapse-opacity.log.txt:92-123`.
  - **Fade case.** Mutation: the fade rule loaded after the collapse rule. It is distinguished at `fade.test.ts:252` (`mcol-plant-fade-order.log.txt:89-90`). A collapsing transition equal to the fade's also fails, at `:250`.
  - **The `setup:browser` cases.** See claim 1.
- **Design verdict.** The case now meets § Proof of `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md:37-40`: timing from `getAnimations()`, plus seeks to 0 and to the midpoint. Round 1's claims 3 and 7 are closed.

**3. The guide: CONFIRMED.**
- **§ Accordion classes, the motion paragraph.** `/home/user/veneer-mcol/guides/veneer.md:5298-5300` states that the chevron turns between `none` and `rotate(-180deg)` on the feedback token and the standard curve. That covers both directions and the timing.
- **The proof paragraph.** `:5340-5346` names every reading the case takes: the timing against the specimen, the start frame, the midpoint, the settled frames, the doubled ratio, and no turn at a zero factor or under the staged preference.
- **"The expanded button".** In `:5344` the phrase follows the section's own definition at `:5250` ("A button without the `collapsed` class is the expanded one"), so it names the button that ends expanded. The sentence is true.
- **§ Collapse classes, the departure bullet.** At `:4867-4870` the control points are right. The panel curve starts with a slope of 0.72/0.32 = 2.25. The release's `ease` starts with a slope of 0.1/0.25 = 0.4. Both curves end with zero slope. So "starts at speed rather than easing in" and "Both curves settle" are both true.
- **Repetition.** Each fact is stated once within its role: the motion paragraph, the departure bullet, and the proof paragraph. That is the established section structure.
- **Round 1's claim 6** is closed.

**4. The comments: CONFIRMED.**
- **The `_accordion.scss` header.** At `/home/user/veneer-mcol/src/styles/components/_accordion.scss:6-7` the header names the chevron's turn among the departures, running "on the feedback motion tokens in place of the release's timing". That is true. The half turn at `:34` stays the release's, and the relative clause says the timing is what departs.
- **The chevron comment.** At `:35-36` it states both directions.
- **The `_collapse.scss` comment.** At `/home/user/veneer-mcol/src/styles/components/_collapse.scss:11-12` the text is true against `src/browser/Collapse.ts`:
  - `show` writes the scroll size (`:269-277`);
  - `hide` removes the inline size (`:415`).
- **The fade case.** `/home/user/veneer-mcol/tests/src/styles/components/fade.test.ts:250` now asserts `closing` differs from `fading`. The comment at `:238-240` ("pins the order and none of that rule's values") is now true.
- **Round 1's F1 to F3** are closed.

**5. The shared hunks: CONFIRMED on source.**
- **Scope of the hunks.** `mcol-2-shared.diff` changes only the `sampleTransition` doc block and function (`@@ -2139`, `-2158`, `-2173`) and the `describe('sampleTransition')` cases (`@@ -2148`, `-2168`).
- **Every other caller.** The callers pass no pseudo-element: `modal`, `nav`, `pagination`, `progress`, `navbar`, `form-floating`, `offcanvas`, `fade`, `mixins`, `collapse`, and the button case in `accordion`, plus the remaining `setup:browser` cases. With no pseudo-element, the reader keeps the own list, and the added filter terms hold for every CSS transition in it. So each of those callers reads as before, except for a transition whose effect was removed. See referral R1.

**6. No regression: CONFIRMED.**
- **Partials.** The `.scss` hunks change comment lines only (`mcol-2.diff:55-99`).
- **Built cascade.** It carries `.collapsing{height:0;transition:height var(--vn-motion-panel) var(--vn-ease-panel);…}` and `--bs-accordion-btn-icon-transition:transform var(--vn-motion-feedback) var(--vn-ease-standard);`.
- **Logs.** `collapse.test.ts` is unchanged, and the logs read as follows:
  - `mcol-green-2.log.txt:76,80`: 51 passed, exit 0;
  - `mcol-collapse-browser-2.log.txt:8,12`: 49 passed, exit 0;
  - `mcol-app-2.log.txt:1600,1604`: 223 passed, exit 0;
  - `mcol-conformance-2.log.txt:12,16`: 45 passed, exit 0.

**7. Scope and gates: CONFIRMED.**
- **Scope.** `mcol-2-status.txt` lists seven files. Each is owned by brief 2, or by brief 3's added lines in the shared files. The guide hunks sit in § Collapse classes and § Accordion classes.
- **Gates.** Each log reads `exit=0`:
  - the oxfmt check over all eight files (`mcol-oxfmt-check-2.log.txt:1,6`);
  - `check` (`:30`);
  - `lint:check` (`:6`);
  - `test:setup`: 357 passed;
  - `setup:browser`: 101 passed;
  - `build:src`;
  - `test:conformance`: 45 passed;
  - `test:guides`: 26 passed;
  - `test:policy`: 109 passed, 1 skipped;
  - the `Collapse` engine proof: 49 passed;
  - `test:app`: 223 passed.

## Findings outside the claims

**F1. The pseudo-element case's comment gives one reader two failing readings that belong to different readers.**
- **Where:** `/home/user/veneer-mcol/tests/setupBrowser.test.ts:2153-2155`: "A reader that ignored the pseudo-element would read no transition with it named on the first host, and one on the first host with `::before` named".
- **What is wrong:** a reader that ignores the pseudo-element reads the own list. It reads nothing with `::before` named, too.
  - `mcol-red-2-reader.log.txt:35-40` shows that reader passing `:2177` and failing at `:2179`.
  - The reader that returns a transition with `::before` named is a different one: it reads the subtree list without matching the pseudo-element (`mcol-plant-reader-pseudo.log.txt:2-4,45-63`).
- **Why it matters:** the comment names the case's mutations, and a reader of it cannot map either failing reading to the plant that proves it.
- **Right looks like:** "A reader that ignored the pseudo-element would read no transition with `::after` named on the first host; one that read the subtree list without matching the pseudo-element would read the `::after` transition with `::before` named; one that ignored which element an effect targets would read the child's `::after` transition with `::after` named on the second host."

**F2. The chevron case's comment uses the temporal `once`, and it collides with "at once" two lines later.**
- **Where:** `/home/user/veneer-mcol/tests/src/styles/components/accordion.test.ts:562`: "and the frame it settles at once finished".
- **What is wrong:**
  - `/home/user/scaffold/.claude/rules/writing.md` § Substitutions replaces a temporal `once` with `after`. The policy sweep leaves `once` unmatched, so the green gates do not clear it.
  - The same comment uses "at once" to mean immediately (`:563-564`, "lands on its end frame at once"). A reader first parses "settles at once" as settling immediately, which is the opposite of the reading `:587-590` takes after `finish`.
- **Right looks like:** "…; and the frame it settles at after it finishes."

**F3. The pseudo-element case names its width sample after a turn and after a different pseudo-element.**
- **Where:** `/home/user/veneer-mcol/tests/setupBrowser.test.ts:2178` (`const marker`) and `:2180` (`const turning`).
- **What is wrong:**
  - Nothing in the fixture turns. The sample is a `::after` width transition.
  - `marker` names the `::marker` pseudo-element, in a case whose subject is which pseudo-element the reader reads.
  - The sibling case names its samples for their motion, at `:2108-2109` (`fading`, `widening`).
- **Right looks like:** `const sample = sampleTransition(bare, 'width', '::after')` and `const widening = requireValue(sample, 'No pseudo-element transition')`, with every later use updated.

## Attacked and held

- **The `TransitionSample` summary still says "on one element".** `/home/user/veneer-mcol/tests/setupBrowser.ts:2125` is not false: a pseudo-element's transition has a keyframe effect whose `target` is the element. Adding "or one of its pseudo-elements" would match the function summary at `:2142`. That line was off-limits under brief 3, so this is optional and has no carrier.
- **"Targets neither".** The doc-block sentence at `:2168` ("targets neither, so it reads as `undefined`") sits in the pseudo-element paragraph but holds for both branches. It reads true.
- **The matrix comment.** The chevron case's comment at `:578-579` says the resting chevron serializes as `none`. That is true of the collapsed resting chevron, which is the one that makes the matrix normalization necessary.
- **The pseudo-element case's title.** "reads none there when no pseudo-element is named" refers to the first host, whose only transition is on its pseudo-element. The second host's own reading at `:2192-2194` is a separate assertion.
- **Vocabulary.** "The chevron turns on the feedback motion tokens" (guide `:5319`, header `:7`) groups `--vn-ease-standard` with the feedback timing. This matches the design verdict's reading of token kinds.
- **The `_collapse.scss` comment.** It omits the start size that `hide` writes before clearing the inline size. That omission makes no sentence false.

## Referrals

- **R1, to the objective lane.** The round changed a shared reader that the `modal`, `nav`, `pagination`, `progress`, `navbar`, `form-floating`, `offcanvas`, and `mixins` style tests call. No retained round-2 log runs those files: `mcol-green-2.log.txt` covers `collapse`, `accordion`, and `fade`, and the other gates run other projects. Claim 5 holds on source equivalence alone. Rule whether an executed styles run is owed.
- **R2, to the objective lane.** The renamed case `reads no transition for a named transition that carries no effect` does not fail with an `AssertionError` in either state that matters. At the base it fails with a plain `Error` (`mcol-red-2-reader.log.txt:47-48`). Under its own named mutation, a reader that reads the effect before checking it, it would fail with a thrown `TypeError`, and that mutation also fails `npm run check`. Under the round's kill rule, neither state counts as a kill. Rule whether the case needs a `not.toThrow` shape, and whether its comment names a mutation the type checker already rejects.
- **R3, to the Orchestrator.** § Proof of the design verdict (`e-id-motion-design-verdict.md:40-41`) still says `sampleTransition` "lands in `tests/setupStyles.ts`". It lives at `/home/user/veneer-mcol/tests/setupBrowser.ts:2185`. This was the second half of round 1's R3, and `mcol-audit-verdict.md` gave it no carrier.

## Round 1's findings

- **Claim 6:** closed (claim 3 here).
- **F1, F2, and F3:** closed (claim 4 here).
- **R1:** closed (claim 1 here).
- **R3, the patch and the chevron reading:** closed (claim 2 here).
- **R3, the § Proof location:** open (R3 here).
- **R2:** ruled in the reconciled verdict.

VERDICT: FAIL none; outside the claims: F1, F2, F3
