# E-ID-MOTION-OFFCANVAS audit: subjective lane verdict

I held the subjective lane, on Opus 5.5. I ran nothing. Where a claim says something was executed, my evidence is the retained logs in `/home/user/scaffold/.orkestrel/veneer/units/moff-instruments/`, not the writer's report text. All line numbers are approximate. Locate each by the construct named beside it.

## Per-claim verdicts

**1. The panel motion: CONFIRMED.**
- `/home/user/veneer-moff/src/styles/components/_offcanvas.scss` has the rest and the shown states:
  - `$panel` writes `opacity: 0` beside `visibility: hidden` (around line 20).
  - `'&.showing, &.show:not(.hiding)'` writes `opacity: 1` beside `transform: none` (around line 59).
- The variable block writes `transform var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-out)` (around lines 94–96).
- Both emit sites go through `@include transition(...)`: the responsive panel below its boundary (around line 115) and the bare panel (around line 155).
- The placement maps keep `translateX/Y(±100%)`.
- `moff-green.log.txt` shows 82 passed, exit 0.
- Design fit: opacity is keyed to exactly the selectors that already clear the slide. The fade and the slide are therefore one state decision in one map, not a second mechanism.

**2. The in-flow ranges: CONFIRMED.**
- The transparent rest and the transition are emitted only inside `breakpoint-down`. The `breakpoint-up` block writes neither (`_offcanvas.scss`, around lines 111–141).
- `/home/user/veneer-moff/src/styles/components/_navbar.scss` writes `opacity: 1` in `.navbar-expand#{$infix} .offcanvas` (around line 209).
- The comment's reason holds. Both partials sit in `@layer components` (`_navbar.scss` line 5). The bar's (0,2,0) rule beats the rest's (0,1,0). Every other panel selector that writes opacity writes `1`, so neither order nor the missing `!important` can flip the result.
- The navbar reset reads as one decision, not a patch. It sits beside the release's own `visibility`, `transform`, and `transition` resets and clears the last property the fixed-panel rest writes.
- The asymmetry with its `!important` siblings is stated in the comment: "outranks that rest by specificity alone" (around lines 161–163).
- The diff (`moff.diff`) adds no opacity or transition declaration anywhere else.

**3. The proofs: CONFIRMED.**
- `moff-red-final.log.txt` shows 19 failed, and every failure is an `AssertionError` (lines 77–455). `moff-green.log.txt` shows 82 passed.
- Each plant log ends `exit=1` with its reported failure count. The plant script restores each file with `cmp`.

Per case, the mutation and whether the assertions distinguish it:

| Case | Mutation | Distinguished? |
| --- | --- | --- |
| State case, `paints a panel carrying "$classes"…` | Drop `opacity: 0` from `$panel`, or widen the shown rule to `&.show` so it loses `:not(.hiding)`. | Yes. The expected opacity is keyed to `slid` (around line 467 in `/home/user/veneer-moff/tests/src/styles/components/offcanvas.test.ts`), so `''`, `hiding`, and `show hiding` read `'1'` where `'0'` is expected. The opacity plant kills the first mutation. The second was not planted, but `show hiding` still separates it. |
| Slide-and-fade case, `slides the $placement panel…` | The `0.3s ease-in-out` literal, the fade dropped, or the fade on the slide's curve. | Yes. The duration and curves are compared against a specimen resolved from the tokens, and the two curves resolve to different strings (`_tokens.scss:451–452`). The literal and transition plants kill the first two. A change to the `±100%` travel is **not** separated here, because `edge` is read from the mutated panel itself. The state case's `-OFFCANVAS_GEOMETRY.width` pin separates it instead. |
| In-flow case, `keeps the $name panel opaque and still…` | The rest or the transition written outside `breakpoint-down`. | Yes, structurally: `resting: '1'` and `durations: [undefined, undefined]` at and above the boundary. That half was never observed red (see Referral R1). |
| Factor case, `doubles the running slide and fade…` | A literal duration. | Yes. The ratio reads `1`, not `2`, and the literal plant kills it. |
| Factor case | A transition written without the mixin. | Yes. The `reduced` expectation is all `undefined`. This mutation was not planted as written (see Referral R2). |
| `lays a shown and a resting panel into the $name expanded bar…` and the `navbar.test.ts` row case | Remove the navbar `opacity: 1`. | Yes. The resting panel reads `'0'` where `'1'` is expected. The navbar-reset plant shows 7 failed, `xs` included. |

Each case is named for what it asserts.

**4. The ledger rows: CONFIRMED.**
- `moff-conformance.log.txt` shows 45 passed, exit 0. The conformance proof reddens on any row that differs, so the recorded rows equal what the gate prints.
- Each Reason cell is true of its declaration:
  - **Rest:** the panel fades in as it slides in from its edge. Elements' drawer also fades opacity on `ease-out` (`/home/user/elements/src/styles/components/_aside.scss`, around lines 652–659), so "Elements' panel motion" is fair for the fade.
  - **State:** read as describing the rule pair.
  - **Navbar:** true.
- LEDGER-RETUNE would reclassify the six `--bs-offcanvas-transition` rows under `#### offcanvas`, for `.offcanvas` and `.offcanvas-{xxl,xl,lg,md,sm}` (around `guides/veneer.md:9419–9444`).
  - By the legend (around line 7827), `tokenized` "routes the release value through a Veneer token". `250ms` on `cubic-bezier(0.32, 0.72, 0, 1)` plus an opacity term does not do that, so these rows are `declared`.
  - The § Additions rows carry no departure member and stay as they are.
  - This is inferred from the legend. I did not read LEDGER-RETUNE's resolver.

**5. Engine and showcase: NOT-EVIDENCED.**
- The engine half holds: `moff-browser.log.txt` shows 75 passed, exit 0, and `moff-app.log.txt` shows 223 passed.
- The claim that the showcase's `Navbar with offcanvas` specimen renders its panel opaque has no capture in the portfolio.
- The only app proof, `/home/user/veneer-moff/tests/app/browser/sections/NavbarSection.test.ts` (around lines 93–97), checks markup and the presence of `.offcanvas.show`. It never reads computed opacity.
- To settle it: a 390 and 1280 capture of that specimen, or an app assertion on its panel's computed `opacity`.

**6. The guide prose: BROKEN.**
- **Where:** `guides/veneer.md` § Offcanvas classes, in the motion paragraph (around lines 6149–6154) and the departure bullet "The panel moves on Elements' panel motion" (around lines 6169–6176).
- **What is wrong:** both name the timing only by its tokens. Neither says what the motion resolves to, or that the duration differs from the release's.
  - Every other motion passage in the guide states the resolved value at a factor of `1`. The modal passages do this: "resolves to `250ms` at a factor of `1`" (around line 5755) and "`250ms` duration on the `cubic-bezier(0.32, 0.72, 0, 1)` curve" (around line 5789). So do the `0.15s` passages (around lines 4792, 5057, 5139, 5283).
  - Each neighbouring offcanvas departure bullet ends by saying whether its token keeps the recorded value, for example "Each rung holds the release's number" and "Each token resolves to the recorded value".
- **Failing state:** a consumer asks whether the panel still moves in `0.3s`. The section gives no answer, and the ledger row beside it says `tokenized`, which the legend defines as routing the release value. So the section and the ledger together steer the consumer to the wrong answer, when in fact it is `250ms` on a different curve.
- **Smallest fix, motion paragraph:** add "so each move resolves to `250ms` at a factor of `1`, in place of the release's `0.3s`".
- **Smallest fix, departure bullet:** add "which resolves to a `250ms` slide on the `cubic-bezier(0.32, 0.72, 0, 1)` curve and a `250ms` fade on the `ease-out` curve at a factor of `1`", matching the modal bullet.
- **Optional:** in the same paragraph and in the partial comment (around line 75), replace "which fades nothing" with the plain "The release moves the transform alone."
- **What held:** the other sentences the report quotes are true and read on a first pass. The § Navbar paragraph, the § Factors list, the `## Engine` sentence, the placement, script, and responsive paragraphs, and the region paragraph's "a hiding panel rests past its edge" all hold.

**7. The design verdict: CONFIRMED.**
- The Offcanvas panel row in `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (line 23) is delivered item by item:
  - the slide over `--vn-motion-panel` on `--vn-ease-panel`;
  - the fade over `--vn-motion-panel` on `--vn-ease-out`;
  - the `±100%` travel;
  - `0` hidden and under `.hiding`, `1` under `.showing` and `.show:not(.hiding)`;
  - a responsive panel opaque in its in-flow range.
- It all goes through the mixin, with departure and addition rows. Unit 7's scope widened to the navbar partial only by brief 2's ruling.

**8. Scope and gates: CONFIRMED.**
- `moff-status.txt` names five files.
- Brief 1's owned set (around lines 89–92 of `e-id-motion-offcanvas-brief.md`) covers the offcanvas partial, its test, and the guide's § Offcanvas, § Factors, and `## Engine` clause.
- Brief 2 covers `_navbar.scss`, `navbar.test.ts`, and the § Navbar paragraph and rows.
- `moff-gates-summary.log.txt` reads `exit=0` for format, check, lint, guides, policy, setup, build-src, browser, app, and conformance.

## Findings outside the claims

None to the BROKEN standard.

## Referrals to the objective lane

- **R1.** The design verdict's § Risks names "a responsive offcanvas leaking opacity into its in-flow state". No run ever reddened the at-and-above half of the in-flow case:
  - Every base failure in `moff-red-final.log.txt` is a viewport below the boundary (575, 767, 991, 1199, 1399, at lines 174–290).
  - No plant moves `opacity: 0` or the `transition` include out of `breakpoint-down`.
  - Rule whether a leak plant is owed, for example `opacity: 0` written in the bare `.offcanvas-#{$name}` block.
- **R2.** The factor case's comment names "a transition written without the `transition` mixin" as the mutation it catches. The `transition` plant deletes both includes instead, which removes the transition entirely. Rule whether the named mutation needs its own plant.
- **R3.** In `offcanvas.test.ts`, around line 712, the `describe('offcanvas in an expanded navbar')` comment line "the resting panel in the row. Each panel sits in a block slot wider…" runs about 120 columns. The surrounding comments and `printWidth: 100` in `.oxfmtrc.json` suggest 100. The edit prefixed a clause without re-wrapping, and oxfmt does not wrap comments. This is a text-integrity question.

## Attacked and held

- **Hiding panel inside an expanded bar.** No selector writes opacity `0` there above (0,1,0), so the bar's rule wins, and the "specificity alone" wording holds.
- **Resizing a responsive panel down across its boundary.** It fades and slides out because the new style carries the transition. It already slid out under the release, and `visibility` flips at once, so no new visible behaviour appears.
- **`.offcanvas-lg` inside `.navbar-expand-lg`.** The bar's rule selects `.offcanvas` only, so no conflict arises.
- **Naming.** The title `keeps the $name panel opaque and still at and above its boundary` can be read at first as "still" meaning "yet". This is noted, not ruled a defect.

VERDICT: FAIL 5, 6; outside the claims: none
