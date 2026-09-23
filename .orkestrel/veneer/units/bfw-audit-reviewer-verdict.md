# bfw audit, subjective lane (`reviewer` on Opus 5.5) — verdict

Brief: `units/bfw-audit-reviewer-brief.md`. Claims: `units/bfw-audit-claims.md`.

Lane: subjective (shape, naming, ergonomics, guide voice, design fit), held by `reviewer` on Opus 5.5. The writer (`opus`) ran on the same engine as this lane, so I attacked this work harder than usual. I read the diff, the status file, both briefs, both reports, and the worktree `/home/user/veneer-bfw`. I ran nothing.

## Numbered verdicts

1. **CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/bfw-status.txt:1-10` lists exactly the ten owned paths. Two are `A` (the new section and its proof) and eight are `M`. The diff headers at `bfw.diff` lines 1, 27, 88, 100, 126, 163, 184, 263, 426, and 445 name the same ten files. Attack that failed: I searched the status and the diff headers for any path under `src/`, `guides/`, `tests/setupStyles.ts`, `tests/src/`, or `tests/fixtures/`, and found none.

2. **CONFIRMED.**
   - **Section and order:** `/home/user/veneer-bfw/app/browser/sections/FormLabelSection.ts:12-19` follows the `FormFloatingSection` shape word for word, and its doc block ("Renders the declared label and help-text specimens into a named region.") matches the sibling's voice. The region name and paragraph in `constants.ts` are ruling E's text verbatim. The specimen order is stacked, horizontal, large, small, legend.
   - **Specimen shapes:** the large and small rows come from one `.map` list, the same ramp `INPUT_GROUP_SPECIMENS` uses at `constants.ts:1546-1554`. The columns are `col-5`/`col-7` with no breakpoint. The ids use the `form-label-` prefix. The names Dispatch email, Depot, Large depot, Small depot, and Pickup date are all unique; the Form control section uses "Due date", not "Pickup date". No specimen has a `style` attribute.
   - **Doc block voice:** it reuses the house sentences from `FORM_CHECK_SPECIMENS` ("each `id` is unique to the showcase so a label names one control") and `INPUT_GROUP_SPECIMENS` ("one ramp … rather than written twice", "the pairing … exists to hold").
   - **Ruling on the unknown, the `.container-fluid` wrapper:** it is the right frame and not a departure from ruling E. Ruling E fixes the `.row` or `fieldset.row` and its label and column children, and the wrapper changes none of them.
     - Bootstrap's grid expects a row inside a container.
     - The Layout specimens set the precedent at `constants.ts:539-573`.
     - Without the wrapper, the report measures the row running 12px past each edge of the 390-wide page.
     - The cost is that horizontal label text sits one gutter inside the stacked label's left edge. That inset is the grid's own geometry, and the doc block records the choice (`constants.ts` around line 1655, "Each row sits in a fluid container…").
   - Attack that failed: I compared each specimen against ruling E's text and against the sibling doc blocks, and found no shape or voice gap. The token-noun defects in that doc block are ruled under claim 8.

3. **CONFIRMED.** `Showcase.ts:106-109` constructs the sections in the order `FormControlSection`, `FormFloatingSection`, `FormLabelSection`, `FormRangeSection`. `index.ts:24` re-exports the module. The regions literal is at `Showcase.test.ts:103-105`, the specimen concatenation at `:134-136`, and the portfolio list at `integration.test.ts` around line 1654.
   - **Mutation:** revert the Control/Floating order in `Showcase.ts`. `Showcase.test.ts:87` compares the rendered `aria-label` sequence with `toStrictEqual`, and `:115-146` compares the specimen-name sequence with `toEqual`. Both are order-sensitive, so both distinguish the mutation.

4. **CONFIRMED.**
   - **`CaptureSubject`:** `tests/setup.ts:139-143` lists the five names in alphabetical order.
   - **`CASCADE_KEYS`:** the five rows sit at the end of the registry, and their selectors and properties match ruling E exactly; the legend row is at `setup.ts` around line 1086. No driven list changed.
   - **Registry check:** `tests/setup.test.ts:155` holds the regex and `:149-151` its comment. The comment says what the regex admits and refuses, and it gives the true reason: a bare element names no class. It no longer gives round 1's false reason, and it reads in the house voice.
   - **Design fit:** widening the shared check is the better shape than the owned-only alternative `.row > .col-form-label`. The key's subject is the legend element, and the element-qualified selector says so.
   - **Mutation:** set the legend selector to `legend`. Then `/^[a-z]*\./u.test('legend')` is false, the row enters the filter, and `toStrictEqual([])` fails, so the check distinguishes the mutation. It still admits every existing class-led row, including `.form-control[readonly]`. `.col-form-label` and `legend.col-form-label` are distinct strings, so the selector-uniqueness check at `:161` holds.

5. **CONFIRMED.** Each mutation, checked against `tests/app/browser/sections/FormLabelSection.test.ts`:
   - **`for` dropped, or id mismatched:** the control's name reads empty. That breaks `:41-43` (name equals label text), `:44` (`label.control` identity), and `:45-51` (the literal names). The id list at `:54-60` also catches a mismatched id. All distinguish.
   - **`aria-describedby` names a missing id:** `:76` `querySelector('#…')` returns `null`, which is not `help`. This distinguishes the mutation, while `readStates` at `:78` alone would not, and the report states that correctly.
   - **Reordered list:** the name-order literal at `:24-30` distinguishes it. The `innerHTML`-against-constant check at `:31-33` would not, but that check is the siblings' shape too.
   - **Legend control loses its `aria-label`:** `:51` and `:130` distinguish it.
   - The teardown case is the sibling's verbatim.
   - Readability note, not a defect: the positional slices (`.slice(0, 4)` at `:40`, `rows[3]` at `:124`, `controls[4]` at `:125`) make a reader count specimens. Filtering on `element.querySelector('label')` would name the population.

6. **UNRESOLVED.** The shape is sound, but the claim that every other journey case passes in every variant rests only on the writer's run. The Orchestrator's integrated journey run settles it.
   - **Floating case:** `integration.test.ts:1016-1024` hoists the start lookup out of the loop, and `:1038` refocuses on each iteration. That is clean.
   - **Range case:** `:978-985` focuses the legend's date control, presses Tab twice, asserts focus is still on it, then walks. Under the installed walk this is the least machinery available.
   - **Ruling on the unknown:** the assertion at `:985` distinguishes an overshoot: a third Tab leaves the control and fails it. It does not distinguish an undershoot: dropping one or both Tab presses leaves focus on the control and it still passes. Only the traversal assertion at `:987` can catch the undershoot.
   - **Comment note:** the comment at `:976-977` ("across the day to the year") names the en-US field order. The journey config does not pin a locale (`configs/app/vite.journey.config.ts`), though two Tab presses reach the last field of any three-field date control.

7. **CONFIRMED.**
   - **§ Showcase sentence** (report lines 130-134): it follows the rendered order in `Showcase.ts:99-116`. That order is Validation after Table; Form check, control, floating, label, range, and select after Spinner; and Input group after Close. It reuses the guide's own phrase "each carrying that key's own specimens" from `guides/veneer.md:3859-3860`, and it has the serial comma and no banned term.
   - **Stem rows** (report lines 139-143): each subject matches its `CASCADE_KEYS` selector. Four read the label and `form-label-legend` reads the legend. They follow the phrase pattern of the table at `guides/veneer.md:3902-3926`.
   - Attack that failed: I checked each region adjacency against `Showcase.ts`, and each stem against its selector.

8. **BROKEN.** Several changed prose lines break `writing.md` § Code tokens: a code token not followed by a noun. The claim names that rule explicitly.
   - `/home/user/veneer-bfw/app/browser/constants.ts:1650`: "names its control through `for`". Right: "through its `for` attribute".
   - `constants.ts:1651`: "each `id` is unique to the showcase". Right: "each `id` attribute is unique to the showcase".
   - `constants.ts:1652`: "names its help text through `aria-describedby`". Right: "through its `aria-describedby` attribute".
   - `/home/user/veneer-bfw/tests/app/browser/sections/FormLabelSection.test.ts:37`: "tied to its control by `for`". Right: "by its `for` attribute".
   - Why it matters: these lines are the unit's own authored prose, and claim 8 promises they conform.
   - In the same edit, recast `constants.ts:1650` "so every control announces the label's text as its name" to "so each labelled control announces its label's text as its name". As written, the sentence reads as covering the legend row's control, which has no label and announces its own `aria-label`.
   - The `FORM_CHECK_SPECIMENS` sentence at `constants.ts:1041` has the same `id` defect. It predates this diff, so it is outside this change; the Orchestrator can assign a carrier.
   - The rest of the claim held when I read the diff: no `any`, `as`, `!`, or suppression, and every callback is passed directly. The position words in `integration.test.ts:972-977` and `:1016` are permitted, because the position ("last before this region", "last field") is the property the start depends on and each item is also named.

## Findings outside the claims

None at the BROKEN standard.

## Attacked and held

- **Size order:** large before small in the label ramp is ruling E's order and matches Input group. It differs from Form control and Form select, which run small before large. That is a ruling, not unit drift.
- **Legend name proof:** the group name the legend gives the fieldset is proved by structure (`FormLabelSection.test.ts:126-131`), because the installed `readName` computes no fieldset name. That is honest, and the report flags it.
- **Barrel order:** `index.ts` places `FormRangeSection` before `FormFloatingSection`, but that order predates this diff and the barrel's order has no behavioural effect.

## Referrals

- **To the objective lane:**
  - Run `npm run check` from `/home/user/veneer-bfw` and report its exit code (claim 8).
  - Settle whether dropping one Tab press at `integration.test.ts:983-984` reddens `:987`. That traversal assertion is the only guard against an undershoot (claim 6).
- **To the Orchestrator, ruling E's date control:** the date control in the legend row makes the range journey depend on the date control's field count. A text control would let the walk start from the legend control with no Tab presses; ruling K's `FORM_LABEL_MARKUP` already uses one. The unit followed its ruling, so this is a design question, not a unit defect.
- **To the Orchestrator, for `bfl`'s integration:** the § Tests stem table at `guides/veneer.md:3902-3926` has no row for any other forms key (check, control, floating, range, select). Adding only the five label rows makes the label key the only forms key the table shows. Rule whether the table takes these rows, or rows for every forms key, or none.

VERDICT: FAIL 6, 8; outside the claims: none
