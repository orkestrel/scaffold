# B-FORMS-CONTROL, round 3 (the prose micro-round) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

# B-FORMS-CONTROL round 3 (prose micro-round) — `reviewer` verdict

**Lane:** subjective, held by `reviewer` on Opus 5.5 (native subagent, clean context, read-only).

**Dispatch note:** there was no dispatch defect. Claim 5 asks for an `npm run check` run and names the objective lane, which is outside this lane's tools. I ruled it on the evidence this lane has.

## Numbered verdicts

1. **CONFIRMED.** I tried to find any change in the delta that the brief did not prescribe, and found none.
   - **Which files changed.** Between `bfo-2.diff` and `bfo-3.diff`, only the blobs of the owned files changed:
     - `guides/veneer.md` (3f31612 to b46a956)
     - `tests/app/browser/integration.test.ts` (c53efc5 to a33ff7c)
     - `tests/setup.ts` (618f06f to 903f8df)
     - `tests/setupStyles.ts` (5d00741 to 69bb76e)
     - `tests/src/styles/components/form-control.test.ts` (77d46b2 to 01de48d)
   - **Every other file has the same blob pair in both diffs.** For example, `tests/conformance.test.ts` is 31d5b4d..278cd87 and `src/styles/_mixins.scss` is c1e38c7..aa6953c in each.
   - **Hunk headers.** Only two hunks changed size:
     - The guide's `@@ -151` hunk grew from 8 to 10 lines, from the rewrap. It moves the later guide hunk starts by one line.
     - The integration `@@ -903` hunk grew from 16 to 17 lines, from the four-line comment.
   - **Each edit site matches the brief.**
     - Edit 1: bfo-3.diff:149-152 carries the same words as bfo-2.diff:148-150, with only the line breaks moved.
     - Edit 2: bfo-3.diff:334-339 against bfo-2.diff:331-336, with only the break after "margin" moved.
     - Edit 3: bfo-3.diff:1701-1723 has all six replacements.
     - Edit 4: bfo-3.diff:1466-1468.
     - Edit 5: bfo-3.diff:2311.
     - Edit 6: bfo-3.diff:1139-1142.
   - **Status.** `bfo-3-status.txt:1-19` lists the same file set as the `diff --git` lines of `bfo-2.diff`.
   - **Probe directory.** Glob `tmp/probe*` under `/home/user/veneer-bfo` returns nothing.
   - **Coverage.** I read the `tests/setup.ts` and `integration.test.ts` hunks in full on both sides, and they are identical outside the edits. Inside `guides/veneer.md`, `tests/setupStyles.ts`, and `form-control.test.ts`, I compared the regions outside the edit sites by hunk header only. Byte parity there is referred to the objective lane (referral R3).

2. **CONFIRMED.** I attacked each part of the claim, and each part held.
   - **Rung and map tokens.** Each carries its noun: "The `resolved` rung", "The `declared` rung", "The `compiled` rung", "The `excluded` rung", "The `values` map", "The `reads` map" (`tests/setupStyles.ts:3798-3817`).
   - **Scenario token.** `tests/setup.ts:963` reads "The `form-control-text` scenario".
   - **Temporal `once`.** `form-control.test.ts:56` reads "after".
   - **Journey comment.** `integration.test.ts:907-910` names the `Form control readonly` specimen, the `Form control date` specimen, and the installed `driveTraversal` walk. "itself" and "its date fields" can only mean the date specimen's control, so no pronoun has two referents.
   - **Banned terms and counts.** I swept the changed text for every row of the `writing.md` substitution table, case-insensitive and across inflections. There were no hits. "twice" is the walk's stopping condition, and "density factor of 1" is a value, so neither is a count.
   - **The guide paragraphs.** They keep a noun after every token: the `reset` layer, the `::file-selector-button` part, the `Excluded` owner.
   - **Adjacent reading that holds.** In `tests/setup.ts:964`, "this scenario" follows the new "`form-control-text` scenario". It cannot attach to that scenario, because that scenario sits in `CASCADE_KEYS` and "carries its own list" can only describe the scenario the block documents.
   - **A letter hit outside this claim.** The claim's general wording, "every changed sentence follows `writing.md`", is broken by the letter of the rule elsewhere in the changed sentences. This is referral R1, not a verdict.

3. **BROKEN.** The sentence the claim quotes is not the wording the `INPUT_GROUP_CASES` remark carries. As a result, the family's per-property tables use two terms for the same member.
   - **The two remarks differ.**
     - CONTROL (`/home/user/veneer-bfo/tests/setupStyles.ts:3817-3820`): "The `reads` map is keyed by property. A property the **map** leaves out … so an empty **map** separates …"
     - GROUP (`/home/user/veneer/tests/setupStyles.ts:4210-4214`, the session branch): "`reads` is keyed by property … A property the **row** leaves out … so an empty **row** separates …"
   - **What breaks.** After the landing, one file calls one concept a "row" in one remark and a "map" in the next. That breaks the "one concept, one term" law, which the claim puts forward as the reason for choosing this wording. GROUP's bare `reads` token also carries no noun.
   - **The CONTROL wording is correct, and the fault is in GROUP.**
     - "map" is the precise word for the CONTROL table. A CONTROL row also carries `values`, so "a property the row leaves out" would be false for a property that `values` records and `reads` omits.
     - "row" is loose even in GROUP, because a row that holds a selector is never empty.
   - **Missing sibling (a side note, not a finding).** `INPUT_GROUP_CASES` does not exist in the subject tree `/home/user/veneer-bfo`, so "in the same file" becomes true only after the landing.
   - **The Node-case half holds.** I attacked whether the sentence claims more than the Node case proves, and the attack failed:
     - The Node case keeps only the properties whose declaration reads a `var()` and compares that map to `reads` with `toEqual` (`tests/setupStyles.test.ts:1819-1833`). So "a property the map leaves out … writes no `var()`" is proven.
     - I checked whether "routed onto tokens" misclassifies the rows that read only Bootstrap-named properties: `.form-control:disabled` (`--bs-secondary-bg`), `::placeholder` (`--bs-secondary-color`), and the file button's hover rule. It does not. The guide states that Veneer "declares one canonical token per value and one `--bs-*` alias per Bootstrap root variable" (`guides/veneer.md:1148`), so those reads resolve through Veneer's token registry.
     - "Holding Bootstrap's own values" rests on the value assertions for recorded literals. The unrecorded-literal gap is R1, which B-FORMS-CLOSE already carries.
   - **Required change.**
     - Where: GROUP's remark, `/home/user/veneer/tests/setupStyles.ts:4210-4214`.
     - What: write "The `reads` map is keyed by property, across every rule the selector heads: …", then "A property the map leaves out is the claim that its declaration writes no `var()`, so an empty map separates …". Keep the rest word for word.
     - Why now: B-FORMS-CLOSE writes a third per-property `reads` remark for `FORM_RANGE_CASES` (row 22 of `bfo-integration.py`), and it copies whichever sibling it reads.
     - Carrier: put this edit in the B-FORMS-CLOSE brief beside that remark, or route it to a writer before CONTROL lands. Integration applies only returned patches.
     - What stays: the CONTROL writes stand unchanged, and no successor CONTROL round is needed.

4. **CONFIRMED.** I checked the comment against the prescribed text, the installed source, and the retained trail, and it matched each one.
   - **Prescribed text.** `integration.test.ts:907-910` matches `bfo-fix-audit-reviewer-verdict.md:98` and brief-3 edit 6 word for word.
   - **Installed source.** In `/home/user/veneer-bfo/node_modules/@orkestrel/test/dist/src/browser/index.js`:
     - `traverseAccessible` calls `driveTraversal` (line 826).
     - `driveTraversal` reads `document.activeElement` (line 877) and breaks on `visited.has(focused)` (line 886).
   - **Retained trail.** `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfo2/journey-1-light-1280.log.txt:14` ends `TEXTAREA: > INPUT: > INPUT:`, which is the file control and then the date control.
   - **Specimen order.** It agrees with the comment: `Form control readonly` comes after `Form control date` (`app/browser/constants.ts:1072`, `1091`).
   - **Family voice.** The comment opens the way its sibling does: "The traversal starts from … rather than from the document's own start" (`integration.test.ts:870`).

5. **UNRESOLVED.** The only evidence for the `npm run check` exit is the writer's report (`b-forms-control-report-3.md:55`, exit 0).
   - **What this lane found.** The round-3 delta changes only comments and guide prose. No code token, table, or member changed, so no law surface moved in this round.
   - **Off-limits files.** They keep their round-2 blobs: `tests/conformance.test.ts` 31d5b4d..278cd87, and `src/**` unchanged between the diffs. `package.json` and `tests/setupServer.test.ts` are absent from the status.
   - **What settles it.** The objective lane's own `npm run check` exit code.

## Findings outside the claims

None that meet the BROKEN standard.

## Referrals

- **R1 (to the Orchestrator): the prose seam has reached its round budget.** By the letter of `writing.md` § Code tokens, some code tokens in the changed sentences lack a noun:
  - `overflow` and `clip` (`tests/setupStyles.ts:3801-3802`)
  - `` !important`` (line 3811)
  - `var()` (line 3818)

  The fix-round lanes, this lane included, read these same sentences and prescribed text that contains `var()`. GROUP's remark carries the same form (`/home/user/veneer/tests/setupStyles.ts:4212`). This is the third round on the prose seam (`quality.md` § Rounds and verdicts). Recommendation: rule once, for the whole family, whether the noun rule covers CSS property, value, and function tokens. Do not open a fourth repair on this remark alone, because fixing CONTROL alone would split the family voice again.
- **R2 (to the Orchestrator): the report's evidence statement is wrong, and its evidence is not retained.**
  - `b-forms-control-report-3.md:87` says the walk stops at "the date control's own field". `driveTraversal` compares `document.activeElement`, which a date control keeps on itself. The round-2 report says so itself (`b-forms-control-report-2.md:281-283`). The element reached twice is the date control, as the brief prescribed.
  - The same statement also mixes up the traversal's start at the readonly control with the failing walk from the document's start.
  - The journey logs this statement rests on exist only in the Orchestrator's scratchpad (`.../scratchpad/bfo2/journey-1-*.log.txt`). Retain them under `/home/user/scaffold/.orkestrel/veneer/` before the sweep.
- **R3 (to the objective lane): byte parity inside three owned files is not checked.** Mechanically diff `bfo-2.diff` against `bfo-3.diff` inside `guides/veneer.md`, `tests/setupStyles.ts`, and `tests/src/styles/components/form-control.test.ts`. This lane compared the regions outside the edit sites by hunk header only.

## Attacked and held

- **The guide rewraps.** I compared every word, and each paragraph is word-identical to round 2.
- **The journey comment.** I checked it against `traverseAccessible` rather than `driveTraversal`. Naming `driveTraversal` is accurate, because the public wrapper delegates to it and the stopping rule lives there.

VERDICT: FAIL 3, 5; outside the claims: none
