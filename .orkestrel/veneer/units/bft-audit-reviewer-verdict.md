# `reviewer` verdict — B-FORMS-CLOSE-TABLES (`bft`), subjective lane (Opus 5.5, agent a9520d81ecc3271f1)

Retained verbatim from the lane's returned message.

---

Lane held: **subjective** (`reviewer` on Opus 5.5, native subagent, clean context). The subject is B-FORMS-CLOSE-TABLES (`bft`) in `/home/user/veneer-bft` over `d02bd46`, audited against `/home/user/scaffold/.orkestrel/veneer/units/bft-audit-claims.md`. The dispatch has no defect.

## Numbered verdicts

1. **CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/bft-status.txt:1-7` lists the seven owned files and nothing else. A search for `INPUT_GROUP_ROUNDING|until the control family lands|rounding rule` over `{src,tests,guides,app}/**` returns nothing. The attack was an off-list path in the status, or a surviving fixture token. Both failed.

2. **CONFIRMED.** Every item the claim lists is gone: the fixture, its doc block, its import, its exports entry, its freeze expectations, and its three `scene.load` calls (`bft.diff:174,182,359-371,600-615,672,680,715,731`). The freeze case's title drops the rounding clause.
   - **Case 1** (`/home/user/veneer-bft/tests/src/styles/components/input-group.test.ts:189-197`) holds the addon's and the control's kept corners to `shipped`, which the inline `var(--bs-border-radius)` span resolves.
   - **Floating case** (`:274-275`) holds the control's and the select's kept corners to `shipped`.
   - **Validation case** (`:225-226`) holds its kept corners to the ungrouped radius, which must be positive.
   - **Mutation.** Removing `border-radius` from the `input-border` mixin (`/home/user/veneer-bft/src/styles/_mixins.scss:59`) makes case 1 fail both `references.filter(r <= 0)` and `[text, round]`, the validation case fail `round > 0` and `radius > 0`, and the floating case fail `round > 0` and `[round, chosen]`. The assertions distinguish the mutation.
   - **The fixture was not inert.** It was inert only on the shipped tree. Under this mutation its `7px` rule in the elements layer would have supplied the radius and masked the fault, so retiring the fixture is what makes this mutation observable.
   - The voice of the floating case's comment is ruled under claim 7.

3. **CONFIRMED.** `FormRangeCase` (`/home/user/veneer-bft/tests/setupStyles.ts:3590-3603`) follows the `FormControlCase` voice (`:4889-4910`):
   - The summary sentence has the same shape.
   - The `condition` and `reads` doc lines are verbatim.
   - Every member is readonly.
   - `FORM_RANGE_CASES` is typed `readonly FormRangeCase[]`. Both reduced-motion twins are rows of their own (`bft.diff:506-511,538-543`). Every map and list is frozen, and `setupStyles.test.ts:1845-1850` asserts that.
   - The Node case compares each row with `toEqual` on the map (`/home/user/veneer-bft/tests/setupStyles.test.ts:1837-1844`).
   - **Mutation.** Swapping the thumb row's `width` and `margin-top` lists turns `{width:['--vn-space-2'],…}` against the written `{width:['--vn-space-8'],…}` red. The old `includes` over a joined string found both names somewhere in the rule and passed. The assertion distinguishes the mutation.

4. **CONFIRMED** (implementation). `setupStyles.test.ts:1825-1833` keeps only blocks whose `normalizeMediaCondition` value is in the set of the range key's recorded conditions. That set contains `undefined`, so blocks under no condition stay. A `(forced-colors: active)` block is excluded. A `.form-range:focus` block under reduced motion stays in and turns the key equality red. The comment at `:1821-1824` states both halves. `form-range.test.ts:111-127` reads the map shape on resting rows only.
   - **Adjacent fact:** deleting the filter leaves every assertion green at `d02bd46`, so no proof pins the exclusion yet (referral b).

5. **CONFIRMED.** `collectDeclarationReads` (`/home/user/veneer-bft/tests/setupServer.ts:1383-1401`) routes each value through `collectValueNames` (`:1291`) and follows the `collect*` prefix meaning. It sits beside `readCascadeBlocks` and `collectValueNames`, which is its natural home. It combines keying, merging, and filtering, so it is not a wrapper. No `@orkestrel/*` declaration exports a `collect*` or `read*` function over declarations, cascades, or values.
   - The only remaining `matchAll(/var` is in the floating case (`setupStyles.test.ts:2725`), which the brief leaves alone.
   - **Proof** (`/home/user/veneer-bft/tests/setupServer.test.ts:2029-2055`). Each mutation turns it red:
     - dropping the condition from the key fails the key-list assertion;
     - appending instead of replacing leaves `color` in the `.range:focus` entry;
     - keeping empty lists leaves `padding: []` in the `.range` entry.
   - Two findings outside the claims concern this helper: F1 and F2.

6. **CONFIRMED.** `/home/user/veneer-bft/tests/conformance.test.ts:189-201,217-226` appends one literal to the real expanded cascade in memory. It reuses the real inventory, the shipped keys, and the recorded additions. It asserts the exact line and uses the unmodified cascade as its control. The reader is unchanged.
   - **Mutation.** A reader that stops reporting declaration additions makes `planted.unrecorded` equal `[]`, which is red. The assertion distinguishes it.
   - The probe log (`bft-literal-probe.log.txt:80-81,122-123,146-148,176-178`) shows `test:setup` and the form-control browser proof green, then the named case red with the exact line. After the restore, the hash matches and the `src` status is empty.

7. **BROKEN.** The `FORM_CONTROL_CASES` sentence (`setupStyles.ts:4940-4942`) and the range remark's property-keyed paragraph (`:3624-3628`) are correct. No banned term appears in any changed comment. The following changed text breaks the `writing.md` code-token rule, the count ban, or the first-read rule.
   - **a.** `/home/user/veneer-bft/tests/setupStyles.ts:3622`
     - Wrong: "and `condition` names the at-rule" uses the code token as a subject with no noun after it.
     - Why it matters: the claim requires this remark to use the `FORM_CONTROL_CASES` voice, and that voice writes "The `reads` map".
     - Right: "and the `condition` field names the at-rule the twin sits under."
   - **b.** `/home/user/veneer-bft/tests/src/styles/components/form-range.test.ts:109`
     - Wrong: "and `findRule` returns the first rule".
     - Right: "and the `findRule` helper returns the first rule".
   - **c.** `/home/user/veneer-bft/tests/setupServer.ts:1370`
     - Wrong: "as {@link readCascadeBlocks} reads them".
     - Right: "as the {@link readCascadeBlocks} helper reads them".
   - **d.** `/home/user/veneer-bft/tests/setupServer.test.ts:2051`
     - Wrong: "Two rules under one key merge" states a count, which `AGENTS.md` § Writing bans.
     - Right: "Rules under one key merge, and the later declaration of a property replaces what the earlier one read, …"
   - **e.** `/home/user/veneer-bft/tests/src/styles/components/input-group.test.ts:252-253`
     - Wrong: "holds the same control and select outside a group, each the radius its own kind's kept corner is read against, and a span resolving …". The apposition calls the control and the select "the radius", so the sentence fails a first read. The writer rewrote this sentence, so it owns the fault.
     - Right: "The last box holds the same control and select outside a group, whose corners are the radius each kind's kept corner is read against, and a span that resolves the `--bs-border-radius` variable on its own."

8. **BROKEN.** The paragraph is at `/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-tables-report.md:158-166`. Its corner facts are true of the tree:
   - `input-border` writes `border-radius: var(--bs-border-radius)` (`_mixins.scss:57-60`), and `_form-control.scss:34` and `_form-select.scss:42` include it.
   - `.form-floating` writes `position: relative` and no border (`_form-floating.scss:18-20`).

   Its final sentence is wrong in these ways:
   - **A false reason.** "writes `position: relative` and no border, **so** the group's free-space and focus-lift rules are read on the wrapper". Those rules select the wrapper directly (`_input-group.scss:20-27,32-36`), and the proof reads them there because they select it (`input-group.test.ts:73-78,499-503`). The wrapper's `position: relative` is not the reason.
   - **Four ideas in one sentence**, joined by "so", "and", "which", and a semicolon. `AGENTS.md` § Writing requires one idea per sentence.
   - **"the floating rows render no label" has no antecedent.** "Rows" is the vocabulary of the `INPUT_GROUP_FLOATING_CASES` table, and the guide never introduces it. The limit also covers more than those rows: every wrapper the proof mounts has no label (`input-group.test.ts:71,484` and the table).
   - **A small precision fault.** "each write a `--bs-border-radius` corner" describes the declaration, which writes all four corners.

   Right text for the Orchestrator's integration edit:

   ```text
   The text control and select classes write their corners from `--bs-border-radius` through the
   `input-border` mixin. The proof holds every kept corner to the radius the same element carries
   outside a group, and it holds the control's and the select's kept corners to the value that
   `--bs-border-radius` resolves to. Every corner the group squares reads zero. The group's
   free-space and focus-lift rules select the floating wrapper, so the proof reads them on the
   wrapper. The wrapper draws no border, so the proof reads the corners the group squares on the
   control or select inside it. No wrapper the proof mounts holds a label, so the proof reads no
   floated label.
   ```

9. **UNRESOLVED.** The diff contains no `any`, no `as`, no non-null `!`, and no suppression. The only in-body declaration sits inside a callback passed directly as an argument (`form-range.test.ts:123-126`). Every interface member is readonly. The status shows no off-limits path. The `npm run check` exit code rests only on the writer's report, and this lane runs nothing. The objective lane's own run settles it.

## Findings outside the claims

- **F1.** `/home/user/veneer-bft/tests/setupServer.ts:1367,1371`
  - Wrong: the summary says "rule by rule" and the `@returns` tag says "One entry per rule". Both are false. `readCascadeBlocks` emits one block per selector (`:1356-1362`), so `.a, .b {}` yields two entries. Blocks that share a key merge (`:1390-1393`, and the helper's own proof at `setupServer.test.ts:2051-2053`), so two rules can yield one entry.
  - Why it matters: the exported TSDoc contradicts the helper's own remark and its proof.
  - Right:
    - Summary: "Collects the custom properties each declaration of a compiled cascade reads, keyed by selector and condition."
    - `@returns`: "One entry per selector and condition, in the order each key is first written, keyed by the selector for a block under no condition and by the selector, a space, and the condition otherwise. …"
- **F2.** The helper's key format is rebuilt at every caller.
  - Evidence: the `condition === undefined ? selector : \`${selector} ${condition}\`` expression appears in the helper (`setupServer.ts:1388-1389`) and at `setupStyles.test.ts:1802-1807,1838-1839,1874-1879,1910-1911,2702,2708`. The range case builds the same key for the same rows twice: `cased` at `:1805-1807` and the loop key at `:1838-1839`. The writer flags this as a weak claim.
  - Why it matters: the key is `collectDeclarationReads`'s lookup contract, yet each caller rebuilds it. `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") and its leaf test ("key, format … → exported helper") both apply.
  - Right: export one pure key helper from `tests/setupServer.ts` beside the extraction, for example `renderRuleKey(rule: Pick<CascadeBlock, 'selector' | 'condition'>): string`, and test it. Route `collectDeclarationReads` and the range and text-control Node cases through it, and derive each range row's key once.
  - Carrier: the floating case's sites (`:2702,2708`) belong to `bfl` under R6. The Orchestrator names the carrier for the rest: this unit's fix round or `bfl`.

## Attacked and held

- **Claim 6's comment** (`conformance.test.ts:218-221`) says the plant passes both text-control proofs. The probe log shows the Node proof green (243) and the browser proof green (32) while the plant was in the file.
- **The `FORM_CONTROL_CASES` sentence.** Attack: a recorded literal colour that no row values would be a departure rather than an addition. It failed, because the plaintext row values its literal `background-color` (`setupStyles.ts:5188`).
- **The range remark's own clause.** "which is what separates a rule holding Bootstrap's own values from one this package routed onto tokens" replaces the text-control clause about value assertions correctly, because the range table holds no values.
- **Bare custom-property tokens.** The corner comments and the guide paragraph use tokens such as `--bs-border-radius` as bare nouns. That matches the guide's existing convention (`guides/veneer.md:1304`), so this lane does not require a change.

## Referrals (to the objective lane)

- **a.** Claim 9: report the `npm run check` exit code from `/home/user/veneer-bft`.
- **b.** R9: no proof pins the exclusion. Deleting `conditions.has(…)` at `setupStyles.test.ts:1830` stays green at `d02bd46`. The writer's evidence for the exclusion is a probe it has since deleted. Decide whether an in-memory planted forced block is owed now, in the conformance case's pattern, or whether `bff`'s block carries it.
- **c.** Routing through `collectValueNames` (`/var\(\s*(--…)/`, with `flatMap` dropping unmatched groups) widens the text-control and input-group readings. They previously used `/var\((--…)/` with `?? ''`. The input-group lookup (`setupStyles.test.ts:2530-2536`) looks up a key built from the selector alone, against keys that carry a condition suffix. Confirm that neither change hides a row.

VERDICT: FAIL 7, 8, 9; outside the claims: F1, F2
