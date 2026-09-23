# `reviewer` verdict — B-FORMS-CLOSE-FORCED (`bff`), rounds 2 and 3, subjective lane (Opus 5.5, agent a89c061f9ec5ed8f8)

Retained verbatim from the lane's returned message.

---

# B-FORMS-CLOSE-FORCED (`bff`), rounds 2 and 3: `reviewer` verdict, subjective lane

I held the subjective lane on Opus 5.5, as a native clean-context subagent.

- **Ruled against:** `/home/user/scaffold/.orkestrel/veneer/units/bff-2-audit-claims.md`.
- **Evidence read:**
  - `bff-2.diff` and `bff-2-status.txt`
  - round 1's `bff.diff`, `bff-status.txt`, `bff-audit-verdict.md`, and `bff-audit-reviewer-verdict.md`
  - the round-2 and round-3 briefs and reports
  - the worktree `/home/user/veneer-bff`
- **What I ran:** nothing. This lane holds `Read`, `Grep`, and `Glob` only. Wherever a runtime fact rests only on the writer's run, I say so.

## Numbered verdicts

1. **CONFIRMED.** The rounds 2 and 3 delta is what the briefs grant.
   - Attack: I compared the index hashes in `bff.diff` against those in `bff-2.diff`. They are identical for `_form-check.scss` (`37ff13b`), `_form-control.scss` (`84f7302`), `_form-range.scss` (`8c9ba0d`), `_form-select.scss` (`f8fbdec`), `_validation.scss` (`93c8d53`), and `mixins.test.ts` (`74354fd`).
   - `_mixins.scss` moved from `bf31474` to `dee8703`. Comparing `bff.diff:516-519` with `bff-2.diff:528-531` shows the change is in the comment lines only; the mixin body is byte-identical.
   - The guide's delta over round 1 is exactly four paragraphs: the § Validation classes proof list, the plaintext sentences, the `focus-ring` paragraph, and the § Compatibility sentence.
   - `bff-2-status.txt:1-14` is `bff-status.txt:1-13` plus `tests/setupStyles.test.ts`, and nothing else.

2. **CONFIRMED.** Each of the forms proofs carries the round-2 title, and none claims a colour.
   - The titles sit at `form-control.test.ts:333`, `form-select.test.ts:804`, `form-check.test.ts:704`, `form-range.test.ts:774`, and `validation.test.ts:378` (the first four cite `bff-2.diff` lines, the last cites the worktree file).
   - A case-insensitive search for `system.highlight` over `/home/user/veneer-bff/tests` returns no title and no comment.
   - The case bodies match round 1 line for line (compare `bff.diff:641-657` with `bff-2.diff:704-720`, and likewise for the control, select, and range cases). The one exception is the validation case's focus step (claim 6).
   - Mutation: change the `$highlight` default of the `forced-ring` mixin to `CanvasText`. No assertion distinguishes it, and no title now claims it, so the titles no longer name a property the cases cannot fail on.
   - Mutation: write a literal outline width equal to the published token value. Only `form-control.test.ts` distinguishes it, through its retune. The phrase "at the focus width" still holds in the resolved sense the gauge compares, because every include shares the mixin's one default.

3. **CONFIRMED.** The density case at `validation.test.ts:403-473` does what the claim says:
   - It mounts the `.was-validated` form with a disabled resting swatch and a stated swatch (`:409-412`), and sets the state through the `setCustomValidity` method (`:421`).
   - It asserts that the resting swatch matches neither state and that the stated swatch matches its state (`:422-423`).
   - It reads the room, the doubled width and room, and the overridden width and room on both pairs, through labelled soft expectations (`:436-471`).
   - Mutation: the `3rem` literal on the scoped selectors alone. At density 2 the scoped stated swatch is 48 + 36 = 84 against a resting 96, which reads −12. Under the override it is 84 against 64, which reads 20. Both scoped readings expect 36, so the assertions distinguish the mutation.
   - Density 1 alone does not distinguish it (84 − 48 = 36), and the case does not rely on density 1.
   - The soft readings let every `class` reading keep running, so the class-form readings run and report even while the scoped readings fail.
   - This arithmetic predicts the report's −12 and 20 independently. The run itself is the writer's.
   - The scoped stated swatch carries no `is-*` class, so only the scoped rule can widen it. Its density-1 room reading is therefore the evidence that the scoped rule applies at all.

4. **CONFIRMED.** The Node case at `setupStyles.test.ts:1873-1904` has the shape the claim describes, and its comment states that a caller's content shares the mixin's media block (`:1874-1878`).
   - Mutation: emit the button's reset in a second `forced-colors` block. Two independent assertions distinguish it:
     - `:1893` lists `button:focus-visible` and the `.btn` focus keys as holding more than one block.
     - `:1894-1903` reads `['outline']` instead of `['outline', 'box-shadow']` from the first block.
   - Mutation: drop `@content` from the `forced-ring` mixin. The declaration-order loop distinguishes it.
   - Mutation: remove any listed forms include. `arrayContaining` distinguishes it.
   - The claim that the expanded compile keeps the split blocks apart rests on round 1's analyst reading and on the writer's run, and I did not re-run it.
   - The ruling on the `arrayContaining` floor is under § Unknowns ruled.

5. **CONFIRMED.** Each sentence matches criterion 4 of `b-forms-close-forced-brief-2.md` word for word; only the line wrapping differs.
   - The `forced-ring` comment is at `_mixins.scss:184-187`.
   - The plaintext sentences are at `guides/veneer.md:1217-1219`.
   - The `focus-ring` clause is at `:2072-2073`.
   - The § Compatibility sentence is at `bff-2.diff:513-514`.
   - The § Validation classes list is at `bff-2.diff:25-29`, and the following sentence is unchanged.
   - Attack on `writing.md`:
     - Every code token takes a noun ("the `forced-ring` mixin", "the release's `outline: 0` declaration").
     - A CSS token such as `box-shadow` is its own noun under the standing ruling.
     - No changed sentence carries a banned term or a count.
     - The plaintext pronoun ambiguity round 1 flagged is gone.
   - The `focus-ring` clause is textually right but false for one of its members. That is a truth defect, not a form defect, so it is finding RANGE-RING rather than a break of this claim.

6. **UNRESOLVED.** The code parts hold. The runtime part rests only on the writer's run.
   - **From the code (`validation.test.ts:386-399`):**
     - The case focuses the control directly and then sends a key (`control.focus()` and `await pressKeys('{ArrowRight}')`). This is the pattern the ring cases use at `:121-124`, `:143-145`, and `:361-363`.
     - No Tab walk runs from whatever held focus before, so the empty-trail failure of round 1 cannot arise.
     - The readings (`none`, `solid`, the gauge width, `none`) and the `:focus-visible` assertion match `bff.diff:833-842`.
     - The comment at `:386-387` names how focus is reached.
     - The unused `traverseAccessible` import is gone from `:2-13`.
   - **Not settled:** the claim that the case passes when it runs alone and first in a fresh frame. That depends on how Chromium matches `:focus` and `:focus-visible` there.
     - None of the file's ring cases runs first, so they give no independent evidence.
     - The only run that exercises it is the writer's `-t "forced-colors outline"` run in `b-forms-close-forced-report-3.md:66-71`.
     - To settle it, the Orchestrator runs that command and the whole-file command from criterion 2 of `b-forms-close-forced-brief-3.md` on the host. The objective lane's sandbox runs no Vitest project.

7. **CONFIRMED** for the parts this lane can read. Across the rounds 2 and 3 delta I found none of the following:
   - `any`, a non-null `!`, or a suppression
   - an `as`: `querySelector<HTMLInputElement>` and `querySelectorAll<HTMLInputElement>` pass type arguments, not assertions
   - a nested function: every arrow is a callback passed directly to `filter`, `map`, or `it.each`
   - a helper that repeats the job of an installed export: `Map.groupBy` is native, and the case calls the exported `readCascadeBlocks`, `compileExpandedCascade`, `renderRuleKey`, and `normalizeMediaCondition` functions
   - The off-limits files hold, per claim 1.
   - The claim assigns the `npm run check` exit code to the objective lane, and this lane holds no verdict on it (Referral D).

## Findings outside the claims

- **HIGHLIGHT-REASON: the guide contradicts itself on the forced outline's colour.**
  - **Where:**
    - `guides/veneer.md:1214-1215`: "Under forced colors the focused control also draws an outline in the system highlight". The same wording sits at `:1072-1073` (check), `:1144-1145` (select), `:1293-1294` (range), and `:2069-2071` (`focus-ring`).
    - `guides/veneer.md:1250-1252`, in the same § Form control classes section: "The outline is read … by its style and width, because forced colors replace every color a rule writes."
    - The same reason appears in the proof comments at `validation.test.ts:394`, `form-control.test.ts:330`, `form-select.test.ts:382`, `form-check.test.ts:351`, and `form-range.test.ts:116`.
  - **What is wrong:** the rule writes `var(--vn-focus-highlight)`, which is `Highlight` (`_tokens.scss:18`). The two statements cannot both hold:
    - If forced colors keep an author-written system colour, then "every color a rule writes" is false.
    - If they replace it, then "draws an outline in the system highlight" is false.
    - Round 1 raised this dilemma as its Referral B. Its reconciliation corrected only the § Compatibility sentence, so this contradiction has no carrier.
  - **Why it matters:** `documentation.md` asks for prose that is re-read against what shipped. A reader of § Form control classes meets both sentences nine lines apart and cannot tell which to trust. The colour is also unmeasured, so a "draws … in" sentence is a rendered claim the reader cannot check.
  - **What right looks like:** use wording that is true whichever way Referral B lands.
    - Recast each forms-section sentence as a statement of what the rule writes. For example: "Under forced colors the focused control's rule also writes an outline in the system highlight color through the `forced-ring` mixin, because forced colors paint no shadow ring. § Additions records it."
    - Replace the reason at `:1251-1252` with the one the tree supports: "by its style and width, because a color reading cannot fail under forced colors: the installed color reader resolves each side through a probe whose color forced colors also replace."
    - Give the proof comments the same reason. `mixins.test.ts:82-84` already states it.

- **RANGE-RING: the `focus-ring` paragraph says the range's focus rule keeps a shadow ring.**
  - **Where:** `guides/veneer.md:2071-2074`: "The `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`, and `.form-range:focus` rules include the `forced-ring` mixin beside the shadow ring they keep from the release".
  - **What is wrong:** `_form-range.scss:25-28` writes `.form-range:focus { outline: 0; @include forced-ring; }`, with no shadow. The ring is on `.form-range:focus#{$thumb}` (`:44-48`). The range section at `:1293-1294` and the Additions row at `bff-2.diff:502` both say so correctly. Round 1 dropped the same inaccuracy as claims-file wording, but the guide sentence carries it too.
  - **What right looks like:** "The `.form-control:focus`, `.form-select:focus`, and `.form-check-input:focus` rules include the `forced-ring` mixin beside the shadow ring they keep from the release, and the `.form-range:focus` rule includes it on the host, because the range's ring sits on its thumb. Forced colors paint no shadow, so those controls would otherwise show no focus indicator there."

- **DENSITY-NAMES: the density case uses two names for one element.**
  - **Where:** `validation.test.ts:414-431`.
  - **What is wrong:**
    - The disabled swatch is called "resting" by its `aria-label` ("Scoped resting shade", `:410`), by its `requireValue` message (`:416`), by the comment ("keeps the resting width", `:420`), and by the pair (`resting: settled`, `:430`). The local variable calls it `settled`.
    - `scoped` names only the stated swatch, although both swatches sit in the scope.
    - `first` through `fourth` are position names.
    - The file's own convention names stateless controls "quiet" (`:200`, `:479`) or "resting". This breaks the "one concept, one term" design law in the part of the case this lane was asked to judge.
  - **What right looks like:** query each swatch by its `aria-label`, as `form-control.test.ts` does, and name it by role. For example: `const scope = { resting: requireValue(container.querySelector<HTMLInputElement>('[aria-label="Scoped resting shade"]'), 'No scoped resting swatch'), stated: requireValue(container.querySelector<HTMLInputElement>('[aria-label="Scoped stated shade"]'), 'No scoped stated swatch') }`. Then call `scope.stated.setCustomValidity(…)`, assert on `scope.resting` and `scope.stated`, and build the pair as `{ form: 'scope', ...scope }`. The readings do not change.

## Unknowns ruled

- **The `arrayContaining` floor is the right floor.** Keep it.
  - The case asserts a structural property that holds for every caller, and the key list exists only so an empty filter fails. `tests.md` asks for exactly this: assert the membership a set must have, and fail rather than pass on an empty population.
  - An exact list would enumerate a population that grows. It would go false when B-PASSIVE-CLOSE-B adds the `.page-link:focus` and `.btn-close:focus` callers under R10.
  - The forced-colours population's exact membership already has an owner: the Additions rows the conformance gate compares (`bff-2.diff:437-452`, `:477-478`, `:499-502`).
  - One gap: the case does not say why it lists these keys. Optionally add a clause such as "the listed keys hold the population to its known callers, so an empty filter fails".
- **The remaining "draws an outline in the system highlight" sentences read as statements about the cascade, not as proof claims.**
  - Each sits in its treatment section, beside the departures, and ends "§ Additions records it". After round 2, no proof paragraph claims a colour reading.
  - The partial comments ("takes the button's system-highlight outline") read the same way and hold.
  - The sentences still fail as written, because "draws … in" is a rendered claim and the guide's own reason sentence contradicts it. That defect is HIGHLIGHT-REASON.

## Attacked and held

- **Density case, soft readings:**
  - Each label names its form and its reading (`${form} room`, `${form} doubled width`, `${form} doubled room`, `${form} overridden width`, `${form} overridden room`), so a failure report names the failing form without a stack.
  - The comment at `:432-433` states why the readings are soft.
  - `expect.soft` is Vitest's own API, not a local helper.
- **Density title:** it names both forms ("through the state class and the scope"). "At any density" is round 1's wording and was accepted then.
- **Node case title and comment:**
  - The title names the property it pins and its purpose.
  - The comment explains why the case reads the expanded compile.
  - Placement between the range cases (`:1842` and `:1905`) splits that group. The deviation contract delegated the Node case's placement to the writer, so I raise no finding.
- **Validation forced title:** "keeps the forced-colors outline on a focused $state control, because the state ring writes no outline" names what the assertions read, and its reason is the one the case's comment gives (`:392-393`).
- **Plaintext sentences (`guides/veneer.md:1217-1219`):** each sentence carries one idea, and "The plaintext form" repeats its noun instead of using "it".

## Referrals

- **A (Orchestrator):** settle claim 6 on the host. Run `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts -t "forced-colors outline"`, then the whole-file command from criterion 2 of `b-forms-close-forced-brief-3.md`. The objective lane's sandbox runs no Vitest project.
- **B (objective lane):** under `stageMedia({ forced: true })` in Chromium, is the author's `Highlight` kept in the computed `outline-color` of the focused `.form-control`? The answer shows which half of HIGHLIGHT-REASON is false today. The fix given there holds either way.
- **C (Orchestrator):** `tests.md` § Cross-cutting proofs keeps each `tests/setup*.test.ts` proof "on exported test-infrastructure behavior" and says not to "duplicate production behavior there".
  - The Node case at `setupStyles.test.ts:1873-1904` asserts only the production cascade's shape and holds no setup table against it.
  - Its range neighbours at `:1796` and `:1842` hold `FORM_RANGE_CASES` and the `filterComparableBlocks` function against the cascade instead.
  - Round 1's reconciliation granted this location. Rule whether the rule reaches this case. I hold no verdict on it.
- **D (objective lane):** the `npm run check` exit code for claim 7.

VERDICT: FAIL 6; outside the claims: HIGHLIGHT-REASON, RANGE-RING, DENSITY-NAMES
